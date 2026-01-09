import { NextResponse, type NextRequest } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { z } from "zod"

// Webhook payload validation schema
const WebhookSchema = z.object({
  organization_slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/),
  customer_name: z.string().min(1).max(200),
  customer_email: z.string().email().optional().or(z.literal("")),
  customer_phone: z.string().regex(/^[\d\s\-\+\(\)]+$/).max(20).optional().or(z.literal("")),
  address: z.string().min(1).max(500),
  service_type: z.string().max(200).optional().or(z.literal("")),
  source: z.string().max(50).optional().or(z.literal("")),
  problem_description: z.string().max(1000).optional().or(z.literal("")),
})

// Use service role key for webhook handler (bypasses RLS)
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate webhook payload with Zod
    let validatedPayload
    try {
      validatedPayload = WebhookSchema.parse(body)
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        return NextResponse.json(
          { error: "Invalid request payload", details: validationError.errors },
          { status: 400 },
        )
      }
      throw validationError
    }

    // Find organization by slug
    const { data: org, error: orgError } = await supabase
      .from("organizations")
      .select("id")
      .eq("slug", validatedPayload.organization_slug)
      .single()

    if (orgError || !org) {
      // Return generic error to prevent organization enumeration
      return NextResponse.json({ error: "Webhook validation failed" }, { status: 400 })
    }

    // Log the webhook with validated payload
    const { data: log } = await supabase
      .from("webhook_logs")
      .insert({
        organization_id: org.id,
        source: validatedPayload.source || "webhook",
        payload: validatedPayload,
        status: "received",
      })
      .select()
      .single()

    // Find service type if provided
    let serviceTypeId = null
    if (validatedPayload.service_type) {
      const { data: serviceType } = await supabase
        .from("service_types")
        .select("id")
        .eq("organization_id", org.id)
        .ilike("name", `%${validatedPayload.service_type}%`)
        .single()

      serviceTypeId = serviceType?.id
    }

    // Create service request
    const { data: request_, error: requestError } = await supabase
      .from("service_requests")
      .insert({
        organization_id: org.id,
        customer_name: validatedPayload.customer_name,
        customer_email: validatedPayload.customer_email || null,
        customer_phone: validatedPayload.customer_phone || null,
        service_type_id: serviceTypeId,
        address: validatedPayload.address,
        problem_description: validatedPayload.problem_description || null,
        status: "pending",
      })
      .select()
      .single()

    if (requestError) {
      throw new Error(`Failed to create request: ${requestError.message}`)
    }

    return NextResponse.json(
      {
        success: true,
        message: "Service request created successfully",
        webhook_log_id: log?.id,
        request_id: request_?.id,
      },
      { status: 201 },
    )
  } catch (error) {
    // Log error securely (never expose sensitive details in production)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    console.error("Webhook processing error (details hidden in production)")

    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 },
    )
  }
}
