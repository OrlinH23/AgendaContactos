import type { Contacto } from "../../Interfaces/contacto.interface";
import ContactForm from "../components/ContactForm";

type Props = {
  editing: Contacto | null;
  onSave: (data: Omit<Contacto, "id">, id?: string) => void;
  onCancel: () => void;
};

export default function CrearContacto({
  editing,
  onSave,
  onCancel,
}: Props) {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 max-w-xl">
      <h2 className="text-xl font-semibold text-slate-700 mb-4">
        {editing ? "Editar contacto" : "Nuevo contacto"}
      </h2>

      <ContactForm
        onSave={onSave}
        contact={editing}
        onCancel={onCancel}
      />
    </section>
  );
}