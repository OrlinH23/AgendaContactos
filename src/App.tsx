import React, { useEffect, useState } from 'react';
import { Contacto } from '../Interfaces/contacto.interface';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import * as service from './services/contactService';

function App() {
  const [contacts, setContacts] = useState<Contacto[]>([]);
  const [editing, setEditing] = useState<Contacto | null>(null);

  useEffect(() => {
    setContacts(service.getContacts());
  }, []);

  function handleSave(data: Omit<Contacto, 'id'>, id?: string) {
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
    if (!confirm('Eliminar contacto?')) return;
    service.deleteContact(id);
    setContacts(service.getContacts());
  }

  function handleEdit(c: Contacto) {
    setEditing(c);
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Agenda de Contactos</h1>
      <div className="flex gap-6">
        <div className="flex-1">
          <ContactList contacts={contacts} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
        <aside className="w-96">
          <ContactForm onSave={handleSave} contact={editing} onCancel={() => setEditing(null)} />
        </aside>
      </div>
    </div>
  );
}

export default App;
