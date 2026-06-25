import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import type { Contacto } from '../../Interfaces/contacto.interface';

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

  const isSaveDisabled = !data.nombreCompleto.trim() || !data.telefono.trim();

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    if (name === 'etiquetasGrupos') {
      setData((s) => ({ ...s, etiquetasGrupos: value.split(',').map((t) => t.trim()).filter(Boolean) }));
      return;
    }

    if (name === 'telefono') {
      const digitsOnly = value.replace(/\D+/g, '');
      setData((s) => ({ ...s, telefono: digitsOnly } as any));
      return;
    }

    setData((s) => ({ ...s, [name]: value } as any));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();

    if (!data.nombreCompleto.trim()) {
      return Swal.fire({
        icon: 'warning',
        title: 'Nombre requerido',
        text: 'Por favor ingresa el nombre del contacto.',
      });
    }

    if (!data.telefono.trim()) {
      return Swal.fire({
        icon: 'warning',
        title: 'Teléfono requerido',
        text: 'Por favor ingresa el número de teléfono.',
      });
    }

    if (!/^[0-9]+$/.test(data.telefono.trim())) {
      return Swal.fire({
        icon: 'warning',
        title: 'Teléfono inválido',
        text: 'El teléfono solo puede contener dígitos.',
      });
    }

    if (data.correo.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.correo.trim())) {
      return Swal.fire({
        icon: 'warning',
        title: 'Correo inválido',
        text: 'Por favor ingresa un correo electrónico válido.',
      });
    }

    Swal.fire({
      title: '¿Guardar contacto?',
      text: 'Confirma para guardar este contacto.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (!result.isConfirmed) return;
      onSave(data, contact?.id);
      setData(empty());
    });
  }

  return (
    <form className="bg-white shadow rounded p-4 space-y-3" onSubmit={submit}>
      <h2 className="text-lg font-medium">{contact ? 'Editar contacto' : 'Nuevo contacto'}</h2>
      <p className="text-sm text-slate-500">Los campos marcados con <span className="text-red-500">*</span> son obligatorios.</p>

      <label className="block text-sm font-medium text-slate-700">
        Nombre completo <span className="text-red-500">*</span>
        <input
          className="mt-1 w-full px-3 py-2 border rounded"
          name="nombreCompleto"
          placeholder="Nombre completo"
          value={data.nombreCompleto}
          onChange={handleChange}
          aria-required="true"
        />
      </label>

      <label className="block text-sm font-medium text-slate-700">
        Empresa / Organización
        <input
          className="mt-1 w-full px-3 py-2 border rounded"
          name="empresaOrganizacion"
          placeholder="Empresa / Organización"
          value={data.empresaOrganizacion}
          onChange={handleChange}
        />
      </label>

      <label className="block text-sm font-medium text-slate-700">
        Teléfono <span className="text-red-500">*</span>
        <input
          className="mt-1 w-full px-3 py-2 border rounded"
          name="telefono"
          placeholder="Teléfono"
          value={data.telefono}
          onChange={handleChange}
          aria-required="true"
        />
      </label>

      <label className="block text-sm font-medium text-slate-700">
        Correo
        <input
          className="mt-1 w-full px-3 py-2 border rounded"
          name="correo"
          placeholder="Correo"
          value={data.correo}
          onChange={handleChange}
        />
      </label>

      <label className="block text-sm font-medium text-slate-700">
        Etiquetas (separadas por coma)
        <input
          className="mt-1 w-full px-3 py-2 border rounded"
          name="etiquetasGrupos"
          placeholder="Etiquetas (separadas por coma)"
          value={data.etiquetasGrupos.join(', ')}
          onChange={handleChange}
        />
      </label>

      <label className="block text-sm font-medium text-slate-700">
        Próximo seguimiento (YYYY-MM-DD)
        <input
          className="mt-1 w-full px-3 py-2 border rounded"
          name="proximoSeguimiento"
          placeholder="Próximo seguimiento (YYYY-MM-DD)"
          value={data.proximoSeguimiento}
          onChange={handleChange}
        />
      </label>

      <label className="block text-sm font-medium text-slate-700">
        Fecha último contacto (YYYY-MM-DD)
        <input
          className="mt-1 w-full px-3 py-2 border rounded"
          name="fechaUltimoContacto"
          placeholder="Fecha último contacto (YYYY-MM-DD)"
          value={data.fechaUltimoContacto}
          onChange={handleChange}
        />
      </label>

      <label className="block text-sm font-medium text-slate-700">
        Nota
        <textarea
          className="mt-1 w-full px-3 py-2 border rounded"
          name="notaGeneral"
          placeholder="Nota"
          value={data.notaGeneral}
          onChange={handleChange}
        />
      </label>

      <div className="flex gap-2">
        <button
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-3 py-1 rounded"
          type="submit"
          disabled={isSaveDisabled}
        >
          Guardar
        </button>
        {onCancel && (
          <button type="button" className="bg-gray-200 text-gray-800 px-3 py-1 rounded" onClick={onCancel}>Cancelar</button>
        )}
      </div>
    </form>
  );
}
