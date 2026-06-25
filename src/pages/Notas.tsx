import { useEffect, useState } from "react";
import * as noteService from "../services/noteServices";

export default function Notas() {
  const [notas, setNotas] = useState<noteService.Nota[]>([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [color, setColor] = useState("bg-yellow-200");

  function cargarNotas() {
    setNotas(noteService.getNotas());
  }

  useEffect(() => {
    cargarNotas();
  }, []);

  function guardarNota(e: React.FormEvent) {
    e.preventDefault();

    if (!titulo || !descripcion) {
      alert("Complete el título y la descripción");
      return;
    }

    noteService.addNota({
      titulo,
      descripcion,
      color,
    });

    setTitulo("");
    setDescripcion("");
    setColor("bg-yellow-200");
    cargarNotas();
  }

  function eliminarNota(id: string) {
    if (!confirm("¿Eliminar esta nota?")) return;

    noteService.deleteNota(id);
    cargarNotas();
  }

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <h1 className="text-3xl font-bold text-slate-800 mb-2">
        Notas
      </h1>

      <p className="text-slate-500 mb-6">
        Crea notas rápidas tipo post-it.
      </p>

      <form onSubmit={guardarNota} className="bg-slate-50 rounded-xl p-4 mb-6 space-y-3">
        <input
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Título de la nota"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <textarea
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />

        <select
          className="w-full border rounded-lg px-3 py-2"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        >
          <option value="bg-yellow-200">Amarillo</option>
          <option value="bg-green-200">Verde</option>
          <option value="bg-blue-200">Azul</option>
          <option value="bg-pink-200">Rosa</option>
        </select>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Guardar nota
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {notas.map((nota) => (
          <div
            key={nota.id}
            className={`${nota.color} rounded-xl shadow p-4 min-h-40`}
          >
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              {nota.titulo}
            </h2>

            <p className="text-slate-700 mb-4">
              {nota.descripcion}
            </p>

            <p className="text-sm text-slate-500 mb-4">
              {nota.fecha}
            </p>

            <button
              className="bg-red-600 text-white px-3 py-1 rounded-lg"
              onClick={() => eliminarNota(nota.id)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}