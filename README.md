🧩 Kanto Systems - Gestión de Pokémon

Kanto Systems es una aplicación que permite gestionar Pokémon, movimientos y equipos. Cuenta con un backend en FastAPI y un frontend en Svelte, y expone una API REST para interactuar con los datos.

🚀 Tecnologías

Backend:

Python 3.13
FastAPI / SQLModel
SQLite / Alembic (migraciones)
Pytest (tests)

Frontend:

Svelte / SvelteKit
Vite
CSS

📁 Estructura de Carpetas
kanto-systems/
│
├── backend/
│   ├── main.py                    # App principal FastAPI
│   ├── models/                    # Modelos SQLModel
│   ├── database/                  # Conexión y funciones de acceso a DB
│   ├── routes/                    # Endpoints de Pokémon, movimientos y equipos
│   ├── alembic/                   # Migraciones de base de datos
│   ├── tests/                      # Tests unitarios y de rutas
│   ├── requirements.txt           # Dependencias Python
│   └── README.md                  # Documentación específica del backend
│
├── frontend/
│   ├── src/
│   │   ├── lib/                   # Componentes y utilidades
│   │   ├── routes/                # Páginas y rutas de la app
│   │   └── styles/                # CSS global
│   ├── static/                     # Imágenes, videos, íconos
│   ├── svelte.config.js
│   ├── vite.config.js
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore                      # Ignora archivos temporales
└── README.md                       # Documentación general

⚙️ Instalación

Backend

Crear entorno virtual:
    python -m venv .venv
    source .venv/bin/activate  # Linux/Mac
    .venv\Scripts\activate     # Windows

Instalar dependencias:
    pip install -r backend/requirements.txt
Inicializar la base de datos y migraciones:
    cd backend
    alembic upgrade head
Ejecutar el backend:
    uvicorn main:app --reload


Frontend

Instalar dependencias:
    cd frontend
    npm install
Ejecutar el frontend:
    npm run dev

🧪 Endpoints principales (API REST)
Pokémon
Método	Ruta	Descripción
GET	/pokemons/	Listar todos los Pokémon
GET	/pokemons/{id}	Obtener Pokémon por ID

Movimientos
Método	Ruta	Descripción
GET	/movimientos/	Listar todos los movimientos
GET	/movimientos/{id}	Obtener movimiento por ID

Equipos
Método	Ruta	Descripción
GET	/equipos/	Listar equipos
POST	/equipos/	Crear un equipo
PUT	/equipos/{id}	Modificar equipo
DELETE	/equipos/{id}	Eliminar equipo


✅ Funcionalidades
CRUD de Pokémon, movimientos y equipos
Gestión de relaciones Pokémon ↔ Movimientos ↔ Equipos
API REST documentada con Swagger UI (/docs)
Frontend interactivo en Svelte con rutas dinámicas
Tests unitarios para backend
