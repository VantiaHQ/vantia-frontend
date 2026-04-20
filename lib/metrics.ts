import { supabase } from './supabase'

export interface MetricasData {
  conversaciones_iniciadas: number
  enlaces_enviados: number
  mensajes_enviados: number
  tasa_conversion: number
  creditos_totales: number
  creditos_gastados: number
  creditos_disponibles: number
}

export async function fetchMetricasFromSupabase(): Promise<MetricasData> {
  try {
    console.log('[v0] Fetching metrics from Supabase (latest period)...')
    const { data, error } = await supabase
      .from('metricas_camper')
      .select('*')
      .order('periodo', { ascending: false })
      .limit(1)
      .single()

    console.log('[v0] Supabase response:', { data, error })

    if (error) {
      console.error('[v0] Supabase fetch error:', error)
      throw new Error(`Error fetching metrics: ${error.message}`)
    }

    if (!data) {
      throw new Error('No data returned from metricas_camper table')
    }

    console.log('[v0] Data received:', data)

    // Calculate conversion rate with zero-division protection
    const conversacionesIniciadas = data.conversaciones_iniciadas || 0
    const enlacesSend = data.enlaces_enviados || 0
    const tasaConversion =
      conversacionesIniciadas > 0
        ? (enlacesSend / conversacionesIniciadas) * 100
        : 0

    const result = {
      conversaciones_iniciadas: conversacionesIniciadas,
      enlaces_enviados: enlacesSend,
      mensajes_enviados: data.mensajes_enviados || 0,
      tasa_conversion: Math.round(tasaConversion * 10) / 10, // Round to 1 decimal
      creditos_totales: data.creditos_totales || 0,
      creditos_gastados: data.creditos_gastados || 0,
      creditos_disponibles: data.creditos_disponibles || 0,
    }

    console.log('[v0] Final metrics:', result)
    return result
  } catch (error) {
    console.error('[v0] Failed to fetch metrics:', error)
    throw error
  }
}
