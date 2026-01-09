import { AIBackground } from "@/components/ui/ai-background"

const testimonials = [
  {
    quote: "ServiceFlow reduced our average response time by 40%. The AI matching is incredibly accurate.",
    author: "Sarah Johnson",
    role: "Operations Director",
    company: "ProServ HVAC",
  },
  {
    quote: "We went from manually dispatching 50 jobs a day to handling 200+ with the same team. Game changer.",
    author: "Michael Chen",
    role: "CEO",
    company: "QuickFix Plumbing",
  },
  {
    quote:
      "The real-time tracking alone is worth the investment. Our customers love knowing exactly when help arrives.",
    author: "Emily Rodriguez",
    role: "Customer Success Manager",
    company: "EliteGuard Security",
  },
]

export function TestimonialsSection() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <AIBackground intensity="light" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Loved by service teams everywhere</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            See what our customers have to say about transforming their operations with ServiceFlow.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.author} className="rounded-xl glass-effect p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <blockquote className="mt-4 text-muted-foreground">&ldquo;{testimonial.quote}&rdquo;</blockquote>

              <div className="mt-6 flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-full bg-muted"
                  style={{
                    backgroundImage: `url(/placeholder.svg?height=40&width=40&query=professional headshot ${testimonial.author})`,
                    backgroundSize: "cover",
                  }}
                />
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
