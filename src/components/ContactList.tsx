import React from 'react';
import { Contacto } from '../../Interfaces/contacto.interface';

type Props = {
  contacts: Contacto[];
  onEdit: (c: Contacto) => void;
  onDelete: (id: string) => void;
};

export default function ContactList({ contacts, onEdit, onDelete }: Props) {
  if (!contacts.length) return <div className="text-gray-500">No hay contactos.</div>;

  return (
    <div className="bg-white shadow rounded overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Nombre</th>
            <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Teléfono</th>
            <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Correo</th>
            <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Empresa</th>
            <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Etiquetas</th>
            <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {contacts.map((c) => (
            <tr key={c.id}>
              <td className="px-3 py-2 text-sm text-gray-700">{c.nombreCompleto}</td>
              <td className="px-3 py-2 text-sm text-gray-700">{c.telefono}</td>
              <td className="px-3 py-2 text-sm text-gray-700">{c.correo}</td>
              <td className="px-3 py-2 text-sm text-gray-700">{c.empresaOrganizacion}</td>
              <td className="px-3 py-2 text-sm text-gray-700">{(c.etiquetasGrupos || []).join(', ')}</td>
              <td className="px-3 py-2 text-sm">
                <button className="bg-yellow-400 text-black px-2 py-1 rounded mr-2" onClick={() => onEdit(c)}>Editar</button>
                <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={() => onDelete(c.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
