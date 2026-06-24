export default function Dashboard() {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <h1 className="text-3xl font-bold text-slate-800 mb-2">
        Bienvenido a Agenda CRM
      </h1>

      <p className="text-slate-500 mb-6">
        Administra tus contactos, calendario y notas desde un solo lugar.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <h2 className="text-lg font-semibold text-blue-800">
            Contactos
          </h2>
          <p className="text-blue-600 text-sm">
            Crea y consulta tus contactos.
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
          <h2 className="text-lg font-semibold text-emerald-800">
            Calendario
          </h2>
          <p className="text-emerald-600 text-sm">
            Revisa tus próximos seguimientos.
          </p>
        </div>

        <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
          <h2 className="text-lg font-semibold text-purple-800">
            Notas
          </h2>
          <p className="text-purple-600 text-sm">
            Guarda observaciones importantes.
          </p>
        </div>
      </div>
    </section>
  );
}