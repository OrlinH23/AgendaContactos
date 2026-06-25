import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-600 text-white p-5">
      <h2 className="text-2xl font-bold mb-8 ">
        Agenda 
      </h2>

      <nav className="space-y-3">

        <Link
          to="/"
          className="block w-full px-4 py-3 rounded-lg hover:bg-slate-800 transition"
        >
          Dashboard
        </Link>

        <Link
          to="/crear"
          className="block w-full px-4 py-3 rounded-lg hover:bg-slate-800 transition"
        >
          Nuevo contacto
        </Link>

        <Link
          to="/contactos"
          className="block w-full px-4 py-3 rounded-lg hover:bg-slate-800 transition"
        >
          Lista de contactos
        </Link>

        <Link
          to="/calendario"
          className="block w-full px-4 py-3 rounded-lg hover:bg-slate-800 transition"
        >
          Calendario
        </Link>

        <Link
          to="/notas"
          className="block w-full px-4 py-3 rounded-lg hover:bg-slate-800 transition"
        >
          Notas
        </Link>

      </nav>
    </aside>
  );
}