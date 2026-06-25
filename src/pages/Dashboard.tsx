import * as contactService from "../services/contactService";
import * as calendarService from "../services/calendarService";
import * as noteService from "../services/noteServices";

export default function Dashboard() {
  const totalContactos = contactService.getContacts().length;
  const totalEventos = calendarService.getEventos().length;
  const totalNotas = noteService.getNotas().length;

  const fechaHoy = new Date().toLocaleDateString("es-HN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <h1 className="text-3xl font-bold text-slate-800 mb-2">
        Bienvenido tu Agenda de Contactos
      </h1>

      <p className="text-slate-500 mb-2">
        Administra tus contactos, calendario y notas.
      </p>

      <p className="text-slate-600 mb-6 capitalize">
        Hoy es {fechaHoy}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <h2 className="text-lg font-semibold text-blue-800">Contactos</h2>
          <p className="text-4xl font-bold text-blue-700 mt-2">
            {totalContactos}
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
          <h2 className="text-lg font-semibold text-emerald-800">Eventos</h2>
          <p className="text-4xl font-bold text-emerald-700 mt-2">
            {totalEventos}
          </p>
        </div>

        <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
          <h2 className="text-lg font-semibold text-purple-800">Notas</h2>
          <p className="text-4xl font-bold text-purple-700 mt-2">
            {totalNotas}
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <h2 className="text-lg font-semibold text-slate-800">Fecha</h2>
          <p className="text-sm font-medium text-slate-600 mt-2 capitalize">
            {fechaHoy}
          </p>
        </div>
      </div>
    </section>
  );
}