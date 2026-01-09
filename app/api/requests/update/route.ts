import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { id, status, assigned_provider_id } = body
    if (!id || !status) return NextResponse.json({ error: 'missing fields' }, { status: 400 })

    const supabase = createServerClient()
    const update: any = { status, updated_at: new Date().toISOString() }
    if (typeof assigned_provider_id !== 'undefined') update.assigned_provider_id = assigned_provider_id

    const { error } = await supabase.from('service_requests').update(update).eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ ok: true })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'unknown' }, { status: 500 })
  }
}
