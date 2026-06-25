import { useEffect, useState } from "react";
import Swal from "sweetalert2";
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

      Swal.fire({
        title: "Contacto actualizado",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      service.addContact(data);

      Swal.fire({
        title: "Contacto guardado",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }

    setContacts(service.getContacts());
    setEditing(null);
  }

  async function handleDelete(id: string) {
    const result = await Swal.fire({
      title: "¿Eliminar contacto?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) return;

    service.deleteContact(id);
    setContacts(service.getContacts());

    Swal.fire({
      title: "Eliminado",
      text: "El contacto fue eliminado correctamente.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
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