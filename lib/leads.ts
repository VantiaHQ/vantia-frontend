import { supabase } from './supabase'

export interface MonthlyActivityData {
  day: string
  date: string
  conversaciones: number
  mensajes: number
}

export async function fetchActivityLast30Days(): Promise<MonthlyActivityData[]> {
  try {
    console.log('[v0] Fetching activity data from both logs tables (30 days)...')
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()

    // Fetch conversaciones
    const { data: conversacionesData, error: conversacionesError } = await supabase
      .from('logs_conversaciones')
      .select('created_at')
      .gte('created_at', thirtyDaysAgo)
      .order('created_at', { ascending: true })

    console.log('[v0] Conversaciones response:', { count: conversacionesData?.length, error: conversacionesError })

    if (conversacionesError) {
      console.error('[v0] Error fetching conversaciones:', conversacionesError)
      throw new Error(`Error fetching conversaciones: ${conversacionesError.message}`)
    }

    // Fetch mensajes
    const { data: mensajesData, error: mensajesError } = await supabase
      .from('logs_mensajes')
      .select('created_at')
      .gte('created_at', thirtyDaysAgo)
      .order('created_at', { ascending: true })

    console.log('[v0] Mensajes response:', { count: mensajesData?.length, error: mensajesError })

    if (mensajesError) {
      console.error('[v0] Error fetching mensajes:', mensajesError)
      throw new Error(`Error fetching mensajes: ${mensajesError.message}`)
    }

    // Group both by day (30 days)
    const grouped = groupActivityBy30Days(
      conversacionesData || [],
      mensajesData || []
    )
    console.log('[v0] Grouped activity data (30 days):', grouped)

    return grouped
  } catch (error) {
    console.error('[v0] Failed to fetch activity:', error)
    throw error
  }
}

function groupActivityBy30Days(
  conversaciones: Array<{ created_at: string }>,
  mensajes: Array<{ created_at: string }>
): MonthlyActivityData[] {
  const conversacionesCounts = new Map<string, number>()
  const mensajesCounts = new Map<string, number>()

  // Get the last 30 days starting from today
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const thirtyDaysAgo = new Date(today)
  thirtyDaysAgo.setDate(today.getDate() - 29)

  // Initialize all 30 days with 0
  for (let i = 0; i < 30; i++) {
    const date = new Date(thirtyDaysAgo)
    date.setDate(thirtyDaysAgo.getDate() + i)
    const dateKey = date.toISOString().split('T')[0]
    conversacionesCounts.set(dateKey, 0)
    mensajesCounts.set(dateKey, 0)
  }

  // Count conversaciones for each day
  conversaciones.forEach((log) => {
    const date = new Date(log.created_at)
    const dateKey = date.toISOString().split('T')[0]
    if (conversacionesCounts.has(dateKey)) {
      conversacionesCounts.set(dateKey, (conversacionesCounts.get(dateKey) || 0) + 1)
    }
  })

  // Count mensajes for each day
  mensajes.forEach((log) => {
    const date = new Date(log.created_at)
    const dateKey = date.toISOString().split('T')[0]
    if (mensajesCounts.has(dateKey)) {
      mensajesCounts.set(dateKey, (mensajesCounts.get(dateKey) || 0) + 1)
    }
  })

  // Build result array with day numbers (1-30)
  const result: MonthlyActivityData[] = []
  for (let i = 0; i < 30; i++) {
    const date = new Date(thirtyDaysAgo)
    date.setDate(thirtyDaysAgo.getDate() + i)
    const dateKey = date.toISOString().split('T')[0]
    const day = date.getDate()

    result.push({
      day: day.toString(),
      date: dateKey,
      conversaciones: conversacionesCounts.get(dateKey) || 0,
      mensajes: mensajesCounts.get(dateKey) || 0,
    })
  }

  return result
}
