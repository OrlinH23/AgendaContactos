import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment/min/moment-with-locales";
import "react-big-calendar/lib/css/react-big-calendar.css";

import * as calendarService from "../services/calendarService";
import * as contactService from "../services/contactService";
import EventoModal from "../components/EventoModal";

moment.locale("es");

const localizer = momentLocalizer(moment);

export default function Calendario() {
  const [eventos, setEventos] = useState<any[]>([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date | null>(null);
  const [contactos] = useState(contactService.getContacts());
  const [eventoSeleccionado, setEventoSeleccionado] = useState<any | null>(null);

  function cargarEventos() {
    const eventosGuardados = calendarService.getEventos();

    const eventosConvertidos = eventosGuardados.map((evento) => ({
      ...evento,
      title: evento.titulo,
      start: new Date(evento.start),
      end: new Date(evento.end),
    }));

    setEventos(eventosConvertidos);
  }

  useEffect(() => {
    cargarEventos();
  }, []);

  function guardarEvento(evento: any) {
    calendarService.addEvento(evento);
    cargarEventos();
    setFechaSeleccionada(null);
  }

  function eliminarEvento(id: string) {
    if (!confirm("¿Eliminar este evento?")) return;

    calendarService.deleteEvento(id);
    cargarEventos();
    setEventoSeleccionado(null);
  }

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <h1 className="text-3xl font-bold text-slate-800 mb-4">
        Calendario
      </h1>

      <div className="h-[650px]">
        <Calendar
          localizer={localizer}
          events={eventos}
          startAccessor="start"
          endAccessor="end"
          culture="es"
          selectable
          onSelectSlot={(slotInfo) => {
            setFechaSeleccionada(slotInfo.start);
          }}
          onSelectEvent={(evento) => {
            setEventoSeleccionado(evento);
          }}
          messages={{
            next: "Siguiente",
            previous: "Anterior",
            today: "Hoy",
            month: "Mes",
            week: "Semana",
            day: "Día",
            agenda: "Agenda",
            date: "Fecha",
            time: "Hora",
            event: "Evento",
            noEventsInRange: "No hay eventos en este rango",
          }}
        />
      </div>

      <EventoModal
        fechaSeleccionada={fechaSeleccionada}
        contactos={contactos}
        onClose={() => setFechaSeleccionada(null)}
        onSave={guardarEvento}
      />

      {eventoSeleccionado && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Detalle del evento
            </h2>

            <div className="space-y-2 text-slate-700">
              <p>
                <strong>Título:</strong> {eventoSeleccionado.title}
              </p>
              <p>
                <strong>Tipo:</strong> {eventoSeleccionado.tipo}
              </p>
              <p>
                <strong>Detalle:</strong> {eventoSeleccionado.detalle}
              </p>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                className="bg-slate-200 px-4 py-2 rounded-lg"
                onClick={() => setEventoSeleccionado(null)}
              >
                Cerrar
              </button>

              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
                onClick={() => eliminarEvento(eventoSeleccionado.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}