import { useState } from "react";
import type { Contacto } from "../../Interfaces/contacto.interface";
import type { TipoEvento } from "../services/calendarService";

type Props = {
  fechaSeleccionada: Date | null;
  contactos: Contacto[];
  onClose: () => void;
  onSave: (evento: {
    contactoId: string;
    titulo: string;
    tipo: TipoEvento;
    detalle: string;
    start: string;
    end: string;
  }) => void;
};

export default function EventoModal({
  fechaSeleccionada,
  contactos,
  onClose,
  onSave,
}: Props) {
  const [contactoId, setContactoId] = useState("");
  const [tipo, setTipo] = useState<TipoEvento>("llamada");
  const [hora, setHora] = useState("09:00");
  const [detalle, setDetalle] = useState("");

  if (!fechaSeleccionada) return null;

  function guardarEvento() {
    if (!contactoId || !detalle) {
      alert("Seleccione un contacto y escriba un detalle");
      return;
    }

    const contacto = contactos.find((c) => c.id === contactoId);

    const [horas, minutos] = hora.split(":").map(Number);

    const inicio = new Date(fechaSeleccionada as Date);
    inicio.setHours(horas, minutos, 0);

    const fin = new Date(inicio);
    fin.setHours(fin.getHours() + 1);

    onSave({
      contactoId,
      titulo: `${tipo} - ${contacto?.nombreCompleto}`,
      tipo,
      detalle,
      start: inicio.toISOString(),
      end: fin.toISOString(),
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          Nuevo seguimiento
        </h2>

        <div className="space-y-3">
          <select
            className="w-full border rounded-lg px-3 py-2"
            value={contactoId}
            onChange={(e) => setContactoId(e.target.value)}
          >
            <option value="">Seleccione un contacto</option>
            {contactos.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombreCompleto}
              </option>
            ))}
          </select>

          <select
            className="w-full border rounded-lg px-3 py-2"
            value={tipo}
            onChange={(e) => setTipo(e.target.value as TipoEvento)}
          >
            <option value="llamada">Llamada</option>
            <option value="reunion">Reunión</option>
            <option value="correo">Correo</option>
            <option value="nota">Nota</option>
          </select>

          <input
            type="time"
            className="w-full border rounded-lg px-3 py-2"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
          />

          <textarea
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Detalle del seguimiento"
            value={detalle}
            onChange={(e) => setDetalle(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2 mt-5">
          <button
            className="bg-slate-200 px-4 py-2 rounded-lg"
            onClick={onClose}
          >
            Cancelar
          </button>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            onClick={guardarEvento}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}