import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment/min/moment-with-locales";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Swal from "sweetalert2";

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

  async function eliminarEvento(id: string) {
    const result = await Swal.fire({
      title: "¿Eliminar evento?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    calendarService.deleteEvento(id);

    cargarEventos();
    setEventoSeleccionado(null);

    Swal.fire({
      title: "Eliminado",
      text: "El evento fue eliminado correctamente.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
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

            <div className="space-y-3 text-slate-700">
              <p>
                <strong>Título:</strong> {eventoSeleccionado.title}
              </p>

              <p>
                <strong>Tipo:</strong> {eventoSeleccionado.tipo}
              </p>

              <p>
                <strong>Detalle:</strong> {eventoSeleccionado.detalle}
              </p>

              <p>
                <strong>Fecha:</strong>{" "}
                {new Date(eventoSeleccionado.start).toLocaleDateString(
                  "es-HN",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </p>

              <p>
                <strong>Hora:</strong>{" "}
                {new Date(eventoSeleccionado.start).toLocaleTimeString(
                  "es-HN",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}{" "}
                -{" "}
                {new Date(eventoSeleccionado.end).toLocaleTimeString(
                  "es-HN",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </p>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                className="bg-slate-200 px-4 py-2 rounded-lg hover:bg-slate-300"
                onClick={() => setEventoSeleccionado(null)}
              >
                Cerrar
              </button>

              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
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