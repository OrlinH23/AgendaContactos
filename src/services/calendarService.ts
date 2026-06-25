export type TipoEvento = "llamada" | "reunion" | "correo" | "nota";

export interface EventoCalendario {
  id: string;
  contactoId: string;
  titulo: string;
  tipo: TipoEvento;
  detalle: string;
  start: string;
  end: string;
}

const STORAGE_KEY = "agenda_eventos_v1";

function readStorage(): EventoCalendario[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function writeStorage(eventos: EventoCalendario[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(eventos));
}

export function getEventos(): EventoCalendario[] {
  return readStorage();
}

export function addEvento(evento: Omit<EventoCalendario, "id">) {
  const eventos = readStorage();

  const nuevoEvento: EventoCalendario = {
    id: String(Date.now()),
    ...evento,
  };

  writeStorage([...eventos, nuevoEvento]);

  return nuevoEvento;
}

export function deleteEvento(id: string) {
  const eventos = readStorage();
  const nuevosEventos = eventos.filter((evento) => evento.id !== id);
  writeStorage(nuevosEventos);
}