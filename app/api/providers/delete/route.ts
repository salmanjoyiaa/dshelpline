import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { id } = body
    if (!id) return NextResponse.json({ error: 'missing id' }, { status: 400 })

    const supabase = createServerClient()

    // Step 1: Orphan all service requests assigned to this provider
    // This prevents data inconsistency and broken foreign key references
    const { error: updateError } = await supabase
      .from('service_requests')
      .update({ assigned_provider_id: null })
      .eq('assigned_provider_id', id)

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    // Step 2: Soft delete the provider
    const { error: deleteError } = await supabase
      .from('service_providers')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id)

    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'unknown' }, { status: 500 })
  }
}
