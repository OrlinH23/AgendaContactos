import { useEffect, useState } from "react";
import type { Contacto } from "../../Interfaces/contacto.interface";
import * as service from "../services/contactService";

export function useContactos() {
  const [contacts, setContacts] = useState<Contacto[]>([]);
  const [editing, setEditing] = useState<Contacto | null>(null);

  useEffect(() => {
    setContacts(service.getContacts());
  }, []);

  function handleSave(data: Omit<Contacto, "id">, id?: string) {
    if (id) {
      const updated: Contacto = { id, ...data } as Contacto;
      service.updateContact(updated);
    } else {
      service.addContact(data);
    }

    setContacts(service.getContacts());
    setEditing(null);
  }

  function handleDelete(id: string) {
    if (!confirm("Eliminar contacto?")) return;

    service.deleteContact(id);
    setContacts(service.getContacts());
  }

  function handleEdit(c: Contacto) {
    setEditing(c);
  }

  function handleCancel() {
    setEditing(null);
  }

  return {
    contacts,
    editing,
    handleSave,
    handleDelete,
    handleEdit,
    handleCancel,
  };
}