# Todo App — Frontend

Aplicación web desarrollada con **React** y **Vite** para la gestión de tareas. Consume la API REST del backend.

---

## Tecnologías

- **React** — librería de UI
- **Vite** — bundler y servidor de desarrollo
- **Tailwind CSS v4** — estilos
- **Axios** — cliente HTTP
- **React Router DOM** — navegación entre páginas

---

## Requisitos previos

- Node.js >= 18
- npm
- Backend corriendo en `http://localhost:3000`

---

## Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd todo-app-frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar la aplicación

```bash
npm run dev
```

La aplicación quedará disponible en `http://localhost:5173`

> **Importante:** el backend debe estar corriendo antes de iniciar el frontend.

---

## Funcionalidades

- **Registro e inicio de sesión** con email y contraseña
- **Modo oscuro / modo claro** con persistencia en localStorage
- **Crear, editar y eliminar tareas**
- **Marcar tareas como completadas** con un click
- **Filtrar tareas** por estado (pendiente / completada) y prioridad (baja / media / alta)
- **Buscar tareas** por título o descripción en tiempo real
- **Categorías personalizadas** con nombre y color para organizar tareas
- **Estadísticas** — contador de tareas totales, pendientes y completadas

---

## Estructura del proyecto

```
src/
├── api/              → llamadas HTTP con axios
│   ├── axios.js      → configuración base e interceptores
│   ├── tasks.js      → endpoints de tareas
│   └── categories.js → endpoints de categorías
├── components/
│   ├── tasks/        → TaskCard, TaskModal
│   └── categories/   → CategoryBadge
├── context/
│   └── AuthContext.jsx → estado global de autenticación
├── hooks/
│   └── useTheme.js   → manejo de tema oscuro/claro
└── pages/
    ├── Login.jsx
    ├── Register.jsx
    └── Dashboard.jsx
```

---

## Decisiones técnicas

- **AuthContext** — el estado del usuario autenticado se maneja con React Context para que esté disponible en toda la aplicación sin prop drilling.
- **Interceptores de Axios** — el token JWT se agrega automáticamente en cada request desde un interceptor, sin necesidad de pasarlo manualmente en cada llamada. Si el backend devuelve 401, redirige al login automáticamente.
- **Rutas protegidas** — `PrivateRoute` redirige al login si no hay sesión activa. `PublicRoute` redirige al dashboard si ya hay sesión.
- **Tema oscuro/claro** — se implementó con variables CSS y un atributo `data-theme` en el elemento raíz. La preferencia se persiste en localStorage.
- **Pruebas unitarias** — fuera del alcance de esta versión. La cobertura de tests se encuentra en el backend.
- **Recuperación de contraseña** — fuera del alcance de esta versión. En caso de olvido, el administrador puede resetear la contraseña directamente en la base de datos.