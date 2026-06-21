import { Contacto } from '../../Interfaces/contacto.interface';

const STORAGE_KEY = 'agenda_contactos_v1';

function readStorage(): Contacto[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Contacto[];
  } catch (e) {
    console.error('Error leyendo LocalStorage', e);
    return [];
  }
}

function writeStorage(items: Contacto[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function getContacts(): Contacto[] {
  return readStorage();
}

export function addContact(contact: Omit<Contacto, 'id'>): Contacto {
  const contacts = readStorage();
  const id = String(Date.now()) + Math.floor(Math.random() * 1000);
  const newContact: Contacto = { id, ...contact } as Contacto;
  contacts.push(newContact);
  writeStorage(contacts);
  return newContact;
}

export function updateContact(updated: Contacto) {
  const contacts = readStorage();
  const idx = contacts.findIndex((c) => c.id === updated.id);
  if (idx === -1) return false;
  contacts[idx] = updated;
  writeStorage(contacts);
  return true;
}

export function deleteContact(id: string) {
  const contacts = readStorage();
  const next = contacts.filter((c) => c.id !== id);
  writeStorage(next);
}
