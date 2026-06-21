import React, { useEffect, useState } from 'react';
import { Contacto } from '../../Interfaces/contacto.interface';

type Props = {
  onSave: (data: Omit<Contacto, 'id'>, id?: string) => void;
  onCancel?: () => void;
  contact?: Contacto | null;
};

const empty = (): Omit<Contacto, 'id'> => ({
  nombreCompleto: '',
  empresaOrganizacion: '',
  telefono: '',
  correo: '',
  etiquetasGrupos: [],
  proximoSeguimiento: '',
  notaGeneral: '',
  fechaUltimoContacto: '',
});

export default function ContactForm({ onSave, onCancel, contact }: Props) {
  const [data, setData] = useState<Omit<Contacto, 'id'>>(empty());

  useEffect(() => {
    if (contact) {
      setData({
        nombreCompleto: contact.nombreCompleto || '',
        empresaOrganizacion: contact.empresaOrganizacion || '',
        telefono: contact.telefono || '',
        correo: contact.correo || '',
        etiquetasGrupos: contact.etiquetasGrupos || [],
        proximoSeguimiento: contact.proximoSeguimiento || '',
        notaGeneral: contact.notaGeneral || '',
        fechaUltimoContacto: contact.fechaUltimoContacto || '',
      });
    } else {
      setData(empty());
    }
  }, [contact]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    if (name === 'etiquetasGrupos') {
      setData((s) => ({ ...s, etiquetasGrupos: value.split(',').map((t) => t.trim()).filter(Boolean) }));
    } else {
      setData((s) => ({ ...s, [name]: value } as any));
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!data.nombreCompleto) return alert('Nombre requerido');
    onSave(data, contact?.id);
    setData(empty());
  }

  return (
    <form className="bg-white shadow rounded p-4 space-y-3" onSubmit={submit}>
      <h2 className="text-lg font-medium">{contact ? 'Editar contacto' : 'Nuevo contacto'}</h2>
      <input className="w-full px-3 py-2 border rounded" name="nombreCompleto" placeholder="Nombre completo" value={data.nombreCompleto} onChange={handleChange} />
      <input className="w-full px-3 py-2 border rounded" name="empresaOrganizacion" placeholder="Empresa / Organización" value={data.empresaOrganizacion} onChange={handleChange} />
      <input className="w-full px-3 py-2 border rounded" name="telefono" placeholder="Teléfono" value={data.telefono} onChange={handleChange} />
      <input className="w-full px-3 py-2 border rounded" name="correo" placeholder="Correo" value={data.correo} onChange={handleChange} />
      <input className="w-full px-3 py-2 border rounded" name="etiquetasGrupos" placeholder="Etiquetas (separadas por coma)" value={data.etiquetasGrupos.join(', ')} onChange={handleChange} />
      <input className="w-full px-3 py-2 border rounded" name="proximoSeguimiento" placeholder="Próximo seguimiento (YYYY-MM-DD)" value={data.proximoSeguimiento} onChange={handleChange} />
      <input className="w-full px-3 py-2 border rounded" name="fechaUltimoContacto" placeholder="Fecha último contacto (YYYY-MM-DD)" value={data.fechaUltimoContacto} onChange={handleChange} />
      <textarea className="w-full px-3 py-2 border rounded" name="notaGeneral" placeholder="Nota" value={data.notaGeneral} onChange={handleChange} />

      <div className="flex gap-2">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded" type="submit">Guardar</button>
        {onCancel && (
          <button type="button" className="bg-gray-200 text-gray-800 px-3 py-1 rounded" onClick={onCancel}>Cancelar</button>
        )}
      </div>
    </form>
  );
}
