import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-xl font-medium text-gray-700">Google Ads</span>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            <a href="#" className="text-sm text-gray-700 hover:text-gray-900">
              Objetivos
            </a>
            <a href="#" className="text-sm text-gray-700 hover:text-gray-900">
              Cómo funciona
            </a>
            <a href="#" className="text-sm text-gray-700 hover:text-gray-900">
              Coste
            </a>
            <a href="#" className="text-sm text-gray-700 hover:text-gray-900">
              Artículos y casos de éxito
            </a>
            <a href="#" className="text-sm text-gray-700 hover:text-gray-900">
              Ayuda de expertos
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-sm text-blue-600 hover:text-blue-700">
            Programa una reunión
          </Button>
          <Button variant="ghost" className="text-sm text-gray-700 hover:text-gray-900">
            Iniciar sesión
          </Button>
          <Button className="bg-blue-600 text-sm text-white hover:bg-blue-700">Empezar</Button>
        </div>
      </div>
    </header>
  )
}
