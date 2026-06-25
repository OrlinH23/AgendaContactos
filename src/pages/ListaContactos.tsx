import { useState } from "react";
import type { Contacto } from "../../Interfaces/contacto.interface";
import ContactList from "../components/ContactList";
import ContactModal from "../components/ContactModal";

type Props = {
  contacts: Contacto[];
  onEdit: (c: Contacto) => void;
  onDelete: (id: string) => void;
};

export default function ListaContactos({
  contacts,
  onEdit,
  onDelete,
}: Props) {
  const [selectedContact, setSelectedContact] = useState<Contacto | null>(null);

  function handleEditModal(contact: Contacto) {
    onEdit(contact);
    setSelectedContact(null);
  }

  function handleDeleteModal(id: string) {
    onDelete(id);
    setSelectedContact(null);
  }

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
      <h2 className="text-3xl font-semibold text-slate-700 mb-4">
        Lista de contactos
      </h2>

      <ContactList
        contacts={contacts}
        onEdit={handleEditModal}
        onDelete={handleDeleteModal}
        onView={setSelectedContact}
      />

      <ContactModal
        contact={selectedContact}
        onClose={() => setSelectedContact(null)}
        onEdit={handleEditModal}
        onDelete={handleDeleteModal}
      />
    </section>
  );
}