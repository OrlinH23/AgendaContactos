import Sidebar from "./components/SideBar";
import CrearContacto from "./pages/CrearContacto";
import ListaContactos from "./pages/ListaContactos";
import Calendario from "./pages/Calendario";
import Notas from "./pages/Notas";
import Dashboard from "./pages/Dashboard";
import { useContactos } from "./Hooks/useContactos";
import { Routes, Route, useNavigate } from "react-router-dom";
import type { Contacto } from "./Interfaces/contacto.interface";

function App() {
  const navigate = useNavigate();
  const {
    contacts,
    editing,
    handleSave,
    handleDelete,
    handleEdit,
    handleCancel,
  } = useContactos();

  function handleEditContact(contact: Contacto) {
    handleEdit(contact);
    navigate("/crear");
  }

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
                  onEdit={handleEditContact}
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