import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; error_description?: string }>
}) {
  const params = await searchParams

  return (
    <div className="w-full max-w-sm text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
        <AlertCircle className="h-8 w-8 text-destructive" />
      </div>

      <h1 className="mt-6 text-2xl font-bold tracking-tight">Authentication Error</h1>
      <p className="mt-3 text-muted-foreground">
        {params.error_description || params.error || "An error occurred during authentication."}
      </p>

      <div className="mt-8 flex flex-col gap-3">
        <Button asChild>
          <Link href="/login">Try again</Link>
        </Button>
        <Button variant="outline" className="bg-transparent" asChild>
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </div>
  )
}
