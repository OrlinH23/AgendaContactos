import React from 'react';
import type { Contacto } from '../../Interfaces/contacto.interface';

type Props = {
  contacts: Contacto[];
  onEdit: (c: Contacto) => void;
  onDelete: (id: string) => void;
  onView: (c: Contacto) => void;
};

export default function ContactList({
  contacts,
  onEdit,
  onDelete,
  onView,
}: Props) {

  if (!contacts.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-slate-500">
        No hay contactos.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-1 border-b border-slate-200 bg-slate-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="text-sm font-semibold text-slate-700">Contactos</p>
          <p className="text-xs text-slate-500">{contacts.length} contacto{contacts.length === 1 ? '' : 's'}</p>
        </div>
        <p className="text-xs text-slate-500">Desliza para ver más columnas en pantallas pequeñas</p>
      </div>

      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-100 text-slate-600">
          <tr>
            <th className="px-4 py-3 font-semibold uppercase tracking-wider">Nombre</th>
            <th className="px-4 py-3 font-semibold uppercase tracking-wider">Teléfono</th>
            <th className="px-4 py-3 font-semibold uppercase tracking-wider">Correo</th>
            <th className="px-4 py-3 font-semibold uppercase tracking-wider">Empresa</th>
            <th className="px-4 py-3 font-semibold uppercase tracking-wider">Etiquetas</th>
            <th className="px-4 py-3 font-semibold uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200">
          {contacts.map((c) => (
            <tr key={c.id} className="transition hover:bg-slate-50">
              <td className="px-4 py-4 text-slate-800">
                <div className="font-medium">{c.nombreCompleto}</div>
                <div className="text-xs text-slate-500 sm:hidden">{c.empresaOrganizacion || 'Sin empresa'}</div>
              </td>

              <td className="px-4 py-4 text-slate-700">{c.telefono}</td>
              <td className="px-4 py-4 text-slate-700">{c.correo || '—'}</td>
              <td className="hidden px-4 py-4 text-slate-700 sm:table-cell">{c.empresaOrganizacion || '—'}</td>
              <td className="px-4 py-4 text-slate-700">{(c.etiquetasGrupos || []).join(', ') || '—'}</td>

              <td className="px-4 py-4">
                <button
                  className="rounded-md bg-slate-700 px-3 py-1 text-white transition hover:bg-slate-800"
                  onClick={() => onView(c)}
                >
                  Ver
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
