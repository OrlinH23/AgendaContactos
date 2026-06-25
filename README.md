# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  # Agenda de Contactos (Proyecto universitario)

  Aplicación React + TypeScript creada con Vite. Este commit añade la funcionalidad pedida:

  - Gestión de contactos (CRUD) en el cliente.
  - Formularios para crear/editar contactos.
  - Persistencia usando LocalStorage.
  - Estilos únicamente con Tailwind CSS.

  Archivos claves añadidos/modificados:

  - `src/services/contactService.ts` — servicio para leer/escribir en LocalStorage.
  - `src/components/ContactForm.tsx` — formulario crear/editar.
  - `src/components/ContactList.tsx` — listado con acciones editar/eliminar.
  - `src/App.tsx` — integración del flujo CRUD.
  - `src/index.css`, `tailwind.config.cjs`, `postcss.config.cjs` — configuración e integración de Tailwind.

  Cómo probar localmente:

  1. Instalar dependencias:

  ```bash
  npm install
  ```

  2. Ejecutar el servidor de desarrollo:

  ```bash
  npm run dev
  ```

  Uso rápido:

  - Abrir la app en el navegador (Vite mostrará la URL, normalmente `http://localhost:5173`).
  - Añadir un contacto en el formulario; podrá editarse o eliminarse desde la lista.
  - Los datos se guardan en LocalStorage bajo la clave `agenda_contactos_v1`.

  Commit sugerido (ejecutar localmente):

  ```bash
  git add .
  git commit -m "feat: add contact management (CRUD) with LocalStorage and Tailwind"
  ```

  Si quieres que haga el commit por ti en el repositorio, dímelo y lo intento (necesitaré permisos/generar el commit desde aquí si deseas). Si prefieres, puedo crear un `CHANGELOG` o ampliar el `README` con más detalles.
      parserOptions: {
