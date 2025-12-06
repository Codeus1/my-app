import { Search, MonitorPlay, ShoppingCart, Play, Smartphone, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const adTypes = [
  {
    icon: Search,
    title: "Búsqueda",
    description:
      "Consigue más ventas, clientes potenciales o tráfico en tu sitio mostrando tu empresa a personas que buscan activamente en Google productos o servicios que ofreces.",
  },
  {
    icon: MonitorPlay,
    title: "Display",
    description:
      "Aumenta el alcance y la notoriedad de tu marca con anuncios gráficos que aparecen en millones de sitios web y aplicaciones.",
  },
  {
    icon: ShoppingCart,
    title: "Shopping",
    description:
      "Promociona tus productos en línea, atrae a más compradores y aumenta las ventas mostrando imágenes de productos directamente en los resultados de búsqueda.",
  },
  {
    icon: Play,
    title: "Vídeo",
    description:
      "Capta la atención de clientes potenciales con anuncios de vídeo atractivos en YouTube y en toda la Web.",
  },
  {
    icon: Smartphone,
    title: "Aplicación",
    description:
      "Promociona tu aplicación para aumentar las instalaciones, la interacción y las compras dentro de la aplicación.",
  },
]

export default function AdTypes() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <h2 className="mb-16 text-center text-4xl font-normal text-gray-900 text-balance">
          Google Ads te ofrece muchas formas de llegar a los usuarios
        </h2>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left Column - Icons List */}
          <div className="space-y-4">
            {adTypes.map((type, index) => (
              <button
                key={index}
                className="flex w-full items-center gap-4 rounded-lg p-4 text-left transition-colors hover:bg-white"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900">
                  <type.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-lg font-medium text-gray-900">{type.title}</span>
              </button>
            ))}
          </div>

          {/* Right Column - Search Example */}
          <div className="rounded-lg bg-white p-8 shadow-sm">
            <h3 className="mb-6 text-2xl font-normal text-gray-900">Empieza con anuncios de búsqueda</h3>
            <p className="mb-8 text-gray-700 leading-relaxed">
              Consigue más ventas, clientes potenciales o tráfico en tu sitio mostrando tu empresa a personas que buscan
              activamente en Google productos o servicios que ofreces.
            </p>

            {/* Google Search Mockup */}
            <div className="mb-8 rounded-lg border border-gray-200 p-6">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <svg className="h-8 w-8" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="text-sm text-gray-600">Muebles modernos</span>
                </div>
              </div>
              <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
                <div className="mb-2 flex items-start gap-2">
                  <span className="rounded bg-white px-2 py-1 text-xs font-medium text-gray-700">Anuncio</span>
                  <span className="text-xs text-gray-600">· example-business.com</span>
                </div>
                <h4 className="mb-2 text-base font-medium text-blue-600">Compañía moderna</h4>
                <p className="text-sm text-gray-700">Los mejores muebles modernos para tu hogar.</p>
              </div>
            </div>

            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              Explorar anuncios de búsqueda
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
