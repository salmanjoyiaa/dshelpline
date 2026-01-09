import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export default function SignupSuccessPage() {
  return (
    <div className="w-full max-w-sm text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <Mail className="h-8 w-8 text-primary" />
      </div>

      <h1 className="mt-6 text-2xl font-bold tracking-tight">Check your email</h1>
      <p className="mt-3 text-muted-foreground">
        We&apos;ve sent a confirmation link to your email address. Click the link to activate your account.
      </p>

      <div className="mt-8 rounded-lg border border-border bg-muted/50 p-4">
        <p className="text-sm text-muted-foreground">
          Didn&apos;t receive the email? Check your spam folder or{" "}
          <Link href="/signup" className="font-medium text-primary hover:underline">
            try again with a different email
          </Link>
        </p>
      </div>

      <Button variant="outline" className="mt-6 w-full bg-transparent" asChild>
        <Link href="/login">Return to sign in</Link>
      </Button>
    </div>
  )
}
