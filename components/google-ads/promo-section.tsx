export default function PromoSection() {
  return (
    <section className="bg-blue-50 py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-12 text-center shadow-sm">
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <svg className="h-8 w-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z" />
              </svg>
            </div>
          </div>
          <h2 className="mb-4 text-3xl font-normal text-gray-900 text-balance">
            Elige una oferta para registrarte y poner en marcha tu primera campaña
          </h2>
          <p className="mb-4 text-gray-700 leading-relaxed">
            Selecciona una oferta que corresponda con tu presupuesto mensual y regístrate cuando estés listo. Los
            anunciantes nuevos recibirán un crédito publicitario después de cumplir con el requisito de inversión mínima
            para la oferta seleccionada.
          </p>
          <a href="#" className="text-blue-600 underline hover:text-blue-700">
            Se aplican términos y condiciones
          </a>
        </div>
      </div>
    </section>
  )
}
