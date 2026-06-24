import Sidebar from "./components/SideBar";
import CrearContacto from "./pages/CrearContacto";
import ListaContactos from "./pages/ListaContactos";
import Calendario from "./pages/Calendario";
import Notas from "./pages/Notas";
import Dashboard from "./pages/Dashboard";
import { useContactos } from "./Hooks/useContactos";
import { Routes, Route } from "react-router-dom";

function App() {
  const {
    contacts,
    editing,
    handleSave,
    handleDelete,
    handleEdit,
    handleCancel,
  } = useContactos();

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 bg-slate-100 px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route
              path="/crear"
              element={
                <CrearContacto
                  editing={editing}
                  onSave={handleSave}
                  onCancel={handleCancel}
                />
              }
            />

            <Route
              path="/contactos"
              element={
                <ListaContactos
                  contacts={contacts}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              }
            />

            <Route path="/calendario" element={<Calendario />} />
            <Route path="/notas" element={<Notas />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;