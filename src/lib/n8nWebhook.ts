import 'server-only';

import { env } from '@/lib/env.server';

/**
 * Envía un POST JSON al webhook de n8n (opcional).
 * Si falla la red o el webhook, no lanza.
 */
export function isN8nWebhookConfigured(): boolean {
  return Boolean(env.N8N_WEBHOOK_URL);
}

function buildWebhookRequest(payload: Record<string, unknown>) {
  const url = env.N8N_WEBHOOK_URL;
  const body = {
    ...payload,
    submittedAt: new Date().toISOString(),
  };

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  if (env.N8N_WEBHOOK_SECRET) {
    headers.Authorization = `Bearer ${env.N8N_WEBHOOK_SECRET}`;
  }

  return { url, body, headers };
}

async function postWebhook(
  url: string,
  body: Record<string, unknown>,
  headers: Record<string, string>,
  signal: AbortSignal,
) {
  return fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
    signal,
  });
}

export async function notifyN8n(payload: Record<string, unknown>): Promise<void> {
  const { url, body, headers } = buildWebhookRequest(payload);
  if (!url) return;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15_000);
    let res = await postWebhook(url, body, headers, controller.signal);
    if (!res.ok && (res.status === 401 || res.status === 403) && headers.Authorization) {
      const { Authorization: _ignored, ...headersWithoutAuth } = headers;
      res = await postWebhook(url, body, headersWithoutAuth, controller.signal);
    }
    clearTimeout(timeout);
  } catch {
    // Webhook opcional: no bloquear reservas
  }
}

/**
 * Versión estricta: lanza si el webhook no está configurado o falla.
 */
export async function notifyN8nStrict(payload: Record<string, unknown>): Promise<void> {
  const { url, body, headers } = buildWebhookRequest(payload);
  if (!url) {
    throw new Error('N8N_WEBHOOK_URL no está configurada');
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);
  try {
    let res = await postWebhook(url, body, headers, controller.signal);
    if (!res.ok && (res.status === 401 || res.status === 403) && headers.Authorization) {
      const { Authorization: _ignored, ...headersWithoutAuth } = headers;
      res = await postWebhook(url, body, headersWithoutAuth, controller.signal);
    }

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`n8n respondió ${res.status}: ${text.slice(0, 300)}`);
    }
  } finally {
    clearTimeout(timeout);
  }
}
