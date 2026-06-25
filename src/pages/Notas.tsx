import { useEffect, useState } from "react";
import * as noteService from "../services/noteServices";
import Swal from "sweetalert2";

export default function Notas() {
  const [notas, setNotas] = useState<noteService.Nota[]>([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [color, setColor] = useState("bg-yellow-200");
  const [modalAbierto, setModalAbierto] = useState(false);

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
    setModalAbierto(false);
    cargarNotas();
  }

  async function eliminarNota(id: string) {
  const result = await Swal.fire({
    title: "¿Eliminar nota?",
    text: "Esta acción no se puede deshacer.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#64748b",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  });

  if (!result.isConfirmed) return;

  noteService.deleteNota(id);
  cargarNotas();

  Swal.fire({
    title: "Nota eliminada",
    text: "La nota fue eliminada correctamente.",
    icon: "success",
    timer: 1500,
    showConfirmButton: false,
  });
}
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-5xl font-bold text-slate-800">Notas</h1>
          <br></br>
          <p className="text-slate-500">Crea notas rápidas tipo post-it.</p>
        </div>

        <button
          onClick={() => setModalAbierto(true)}
          className="bg-blue-600 text-white text-2xl size-12 rounded-full hover:bg-blue-700 text-center"
        >+
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {notas.map((nota) => (
          <div
            key={nota.id}
            className={`${nota.color} rounded-xl shadow p-4 min-h-40`}
          >
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              {nota.titulo}
            </h2>

            <p className="text-slate-700 mb-4">{nota.descripcion}</p>

            <p className="text-sm text-slate-500 mb-4">{nota.fecha}</p>

            <button
              className="bg-red-600 text-white px-3 py-1 rounded-lg"
              onClick={() => eliminarNota(nota.id)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      {modalAbierto && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <form
            onSubmit={guardarNota}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-3"
          >
            <h2 className="text-2xl font-bold text-slate-800">
              Nueva nota
            </h2>

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

            <div className="flex justify-end gap-2 pt-3">
              <button
                type="button"
                className="bg-slate-200 px-4 py-2 rounded-lg"
                onClick={() => setModalAbierto(false)}
              >
                Cancelar
              </button>

              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                Guardar
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}