import React, { useEffect, useState } from "react";
import type { Contacto } from "../Interfaces/contacto.interface";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import * as service from "./services/contactService";

function App() {
  const [contacts, setContacts] = useState<Contacto[]>([]);
  const [editing, setEditing] = useState<Contacto | null>(null);

  const [busqueda, setBusqueda] = useState("");
  const [soloPendientes, setSoloPendientes] = useState(false);

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

  const contactosFiltrados = contacts.filter((contacto) => {
    const texto = busqueda.toLowerCase();

    const coincideBusqueda =
      contacto.nombreCompleto.toLowerCase().includes(texto) ||
      contacto.empresaOrganizacion.toLowerCase().includes(texto) ||
      contacto.etiquetasGrupos.some((etiqueta) =>
        etiqueta.toLowerCase().includes(texto),
      );

    const coincidePendiente =
      !soloPendientes ||
      (contacto.proximoSeguimiento &&
        contacto.proximoSeguimiento.trim().length > 0);

    return coincideBusqueda && coincidePendiente;
  });

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
        📒 Agenda de Contactos
      </h1>
      <div className="relative mb-5">
        <span className="absolute left-4 top-3 text-gray-400 text-lg">🔍</span>

        <input
          type="text"
          placeholder="Buscar por nombre, empresa o etiqueta..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border-2 border-blue-200 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />

        <div className="mb-6 flex justify-center">
          <button
            onClick={() => setSoloPendientes(!soloPendientes)}
            className={`px-5 py-3 rounded-xl font-semibold shadow transition-all duration-300 ${
              soloPendientes
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-blue-400 hover:bg-blue-600 text-white"
            }`}
          >
            {soloPendientes
              ? "✅ Mostrando solo pendientes"
              : "📋 Mostrando todos los contactos"}
          </button>
        </div>
      </div>
      <div className="flex gap-8 items-start">
        <div className="flex-1">
          <ContactList
            contacts={contactosFiltrados}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
        <aside className="w-96">
          <ContactForm
            onSave={handleSave}
            contact={editing}
            onCancel={() => setEditing(null)}
          />
        </aside>
      </div>
    </div>
  );
}

export default App;
