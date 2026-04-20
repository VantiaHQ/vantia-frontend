-- Create metricas_camper table for AI sales agent monitoring
CREATE TABLE IF NOT EXISTS metricas_camper (
  id BIGINT PRIMARY KEY,
  conversaciones_iniciadas BIGINT NOT NULL DEFAULT 0,
  enlaces_enviados BIGINT NOT NULL DEFAULT 0,
  mensajes_enviados BIGINT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial data for Camper Nordest
INSERT INTO metricas_camper (id, conversaciones_iniciadas, enlaces_enviados, mensajes_enviados)
VALUES (1, 324, 218, 1847)
ON CONFLICT (id) DO UPDATE SET
  conversaciones_iniciadas = EXCLUDED.conversaciones_iniciadas,
  enlaces_enviados = EXCLUDED.enlaces_enviados,
  mensajes_enviados = EXCLUDED.mensajes_enviados,
  updated_at = CURRENT_TIMESTAMP;
