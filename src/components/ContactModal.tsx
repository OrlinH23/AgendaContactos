import type { Contacto } from "../../Interfaces/contacto.interface";

type Props = {
  contact: Contacto | null;
  onClose: () => void;
  onEdit: (c: Contacto) => void;
  onDelete: (id: string) => void;
};

export default function ContactModal({ contact, onClose, onEdit, onDelete }: Props) {
  if (!contact) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          Detalles del contacto
        </h2>

        <div className="space-y-2 text-slate-700">
          <p><strong>Nombre:</strong> {contact.nombreCompleto}</p>
          <p><strong>Teléfono:</strong> {contact.telefono}</p>
          <p><strong>Correo:</strong> {contact.correo}</p>
          <p><strong>Empresa:</strong> {contact.empresaOrganizacion}</p>
          <p><strong>Etiquetas:</strong> {contact.etiquetasGrupos.join(", ")}</p>
          <p><strong>Próximo seguimiento:</strong> {contact.proximoSeguimiento}</p>
          <p><strong>Último contacto:</strong> {contact.fechaUltimoContacto}</p>
          <p><strong>Nota:</strong> {contact.notaGeneral}</p>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg"
          >
            Cerrar
          </button>

          <button
            onClick={() => onEdit(contact)}
            className="bg-yellow-400 text-black px-4 py-2 rounded-lg"
          >
            Editar
          </button>

          <button
            onClick={() => onDelete(contact.id)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}