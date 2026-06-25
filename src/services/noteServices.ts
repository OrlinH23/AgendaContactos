export interface Nota {
  id: string;
  titulo: string;
  descripcion: string;
  color: string;
  fecha: string;
}

const STORAGE_KEY = "agenda_notas_v1";

function readStorage(): Nota[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function writeStorage(notas: Nota[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notas));
}

export function getNotas(): Nota[] {
  return readStorage();
}

export function addNota(nota: Omit<Nota, "id" | "fecha">) {
  const notas = readStorage();

  const nuevaNota: Nota = {
    id: String(Date.now()),
    ...nota,
    fecha: new Date().toLocaleDateString(),
  };

  writeStorage([...notas, nuevaNota]);

  return nuevaNota;
}

export function deleteNota(id: string) {
  const notas = readStorage();
  const nuevasNotas = notas.filter((nota) => nota.id !== id);
  writeStorage(nuevasNotas);
}