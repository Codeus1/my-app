import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <section className="container mx-auto px-6 py-16">
      {/* Promotional Banner */}
      <div className="mb-12 flex items-center gap-4 rounded-lg bg-blue-50 p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
          <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z" />
          </svg>
        </div>
        <p className="flex-1 text-sm text-gray-700">
          ¿Es la primera vez que usas Google Ads? Elige una oferta para conseguir hasta 1200 € de crédito publicitario y
          poner en marcha tu primera campaña.
        </p>
        <Button variant="ghost" className="text-sm text-blue-600 hover:text-blue-700">
          Elígela ahora
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Hero Content */}
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <img src="/google-ads-analytics-dashboard-with-charts-and-bus.jpg" alt="Google Ads Dashboard" className="h-auto w-full" />
        </div>
        <div className="order-1 lg:order-2">
          <h1 className="mb-6 text-5xl font-normal leading-tight text-gray-900 text-balance">
            Controla tu inversión y maximiza tu ROI <span className="font-medium text-blue-600">con Google Ads</span>
          </h1>
          <p className="mb-8 text-lg text-gray-700 leading-relaxed">
            Llega a clientes que buscan tus productos y servicios. Con Google Ads, controlas tu presupuesto y mides
            resultados reales. Empieza a crecer hoy.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-blue-600 px-8 py-6 text-base text-white hover:bg-blue-700">Empieza hoy</Button>
            <Button variant="outline" className="px-8 py-6 text-base text-blue-600 hover:bg-blue-50 bg-transparent">
              Contacta con un experto
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
