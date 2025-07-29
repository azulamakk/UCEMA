# Mercado de Servicios Rurales

Una aplicación web full-stack que conecta a productores agrícolas con proveedores de servicios rurales. La plataforma facilita conexiones para servicios como consultorías agronómicas, servicios con drones, apoyo veterinario y alquiler de maquinaria agrícola.
Trabajo práctico realizado para la materia ORGANIZACION DE LOS SISTEMAS DE INFORMACION del posgrado Desarrollo y Gestión de Agtechs de la Universidad del CEMA. Integrantes:
- Patricio Velazquez
- Rocío Gregorio
- Geronimo Fisch
- Azul de los Angeles Makk

## Tecnologías Utilizadas
- **Frontend**: React 18, React Router, React Bootstrap, Axios
- **Backend**: Django 4.2, Django REST Framework, Autenticación JWT
- **Base de Datos**: PostgreSQL 15
- **Contenedores**: Docker & Docker Compose

## Funcionalidades
### Para Productores Agrícolas
- Explorar y buscar listados de servicios
- Filtrar servicios por categoría y ubicación
- Contactar proveedores y solicitar cotizaciones
- Gestionar solicitudes de servicios

### Para Proveedores de Servicios
- Crear y gestionar listados de servicios
- Establecer precios, disponibilidad y descripciones de servicios
- Recibir y gestionar solicitudes de productores

### Panel de Administración
- Gestión de usuarios (productores y proveedores)
- Gestión de categorías de servicios
- Supervisión de listados de servicios
- Monitoreo de solicitudes

## Inicio Rápido
### Requisitos Previos
- Docker y Docker Compose instalados en tu sistema
- Git (para clonar el repositorio)

### Instalación y Configuración
  1. **Clonar el repositorio**
  ```bash
  git clone https://github.com/azulamakk/UCEMA
  cd UCEMA
   ```

2. **Construir e iniciar los servicios**
   ```bash
   docker-compose up --build
   ```

3. **Acceder a las aplicaciones**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000/api
   - Django Admin: http://localhost:8000/admin

4. **Configurar la base de datos (en una nueva terminal)**
   ```bash
    # Ejecutar migraciones
   docker-compose exec backend python manage.py migrate

   # Crear superusuario para acceso administrativo
   docker-compose exec backend python manage.py createsuperuser

   # Poblar categorías de servicios iniciales
   docker-compose exec backend python manage.py populate_data
   ```

## API Endpoints

### Autenticación
- `POST /api/auth/register/` - Registro de usuario
- `POST /api/auth/login/` - Login de usuario
- `POST /api/auth/token/refresh/` - Refrescar token JWT
- `GET /api/auth/profile/` - Obtener perfil del usuario
- `PATCH /api/auth/profile/` - Actualizar perfil del usuario

### Services
- `GET /api/categories/` - Listar categorías de servicios
- `GET /api/services/` - Listar todos los servicios (con filtros)
- `POST /api/services/` - Crear nuevo servicio (solo proveedores)
- `GET /api/services/{id}/` - Obtener detalles del servicio
- `PATCH /api/services/{id}/` - Actualizar servicio (solo propietario)
- `DELETE /api/services/{id}/` - Eliminar servicio (solo propietario)
- `GET /api/my-services/` - Obtener servicios del usuario actual

### Service Requests
- `GET /api/requests/` - Listar solicitudes de servicio del usuario
- `POST /api/requests/` - Crear nueva solicitud de servicio
- `PATCH /api/requests/{id}/` - Actualizar estado de la solicitud

## Development

### Project Structure
```
├── backend/
│   ├── rural_marketplace/          # Configuración del proyecto Django
│   ├── accounts/                   # Aplicación de gestión de usuarios
│   ├── services/                   # Aplicación de servicios y solicitudes
│   ├── requirements.txt
│   ├── Dockerfile
│   └── manage.py
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/             # Componentes reutilizables de React
│   │   ├── contexts/               # Contextos de React (Autenticación)
│   │   ├── pages/                  # Componentes de páginas
│   │   ├── services/               # Funciones de servicio API
│   │   └── App.js
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

### Variables de entorno

**Backend (archivo .env en directorio backend/ - opcional)**
```
DEBUG=1
SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://postgres:password@db:5432/rural_marketplace
```

**Frontend**
```
REACT_APP_API_URL=http://localhost:8000/api
```

### Cómo correrlo en modo desarrolador

1. **Iniciar la base de datos**
   ```bash
   docker-compose up db
   ```

2. **Correr el backend localmente**
   ```bash
   cd backend
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```

3. **Correr el frontend localmente**
   ```bash
   cd frontend
   npm install
   npm start
   ```

## User Types

### Productor agricultor
- Puede explorar y buscar servicios
- Puede solicitar cotizaciones a proveedores
- Puede gestionar sus solicitudes de servicio

### Proveedor de servicio
- Puede crear y gestionar listados de servicios
- Puede establecer precios y disponibilidad
- Puede recibir y responder a solicitudes de servicio

## Categoría de servicios

La plataforma incluye las siguientes categorías de servicios predefinidas:

- Consultoría Agronómica
- Servicios con Drones
- Apoyo Veterinario
- Alquiler de Maquinaria
- Gestión de Fincas
- Control de Plagas

## Esquema de base de datos

### Modelos clave
- **User**: Modelo de usuario personalizado con tipos productor/proveedor
- **ServiceCategory**: Categorías para organizar servicios
- **Service**: Listados de servicios creados por proveedores
- **ServiceRequest**: Solicitudes realizadas por productores a proveedores

## ¿Cómo contribuir a este proyecto?

1. Hacé un fork de este repositorio
2. Crea una rama para tu funcionalidad
3. Realizá tus cambios
4. Testealos
5. Envía un pull request

## Troubleshooting

### Problemas más frecuentes

1. **Conflictos de puertos**: Si los puertos 3000, 8000 o 5432 están en uso, modifica los puertos en docker-compose.yml

2. **Problemas de conexión a la base de datos**: Asegúrate que el contenedor PostgreSQL esté en ejecución y saludable antes de iniciar el backend

3. **Problemas de CORS**: Asegúrate que la URL del frontend esté incluida en CORS_ALLOWED_ORIGINS de Django

4. **Errores de migración**: Ejecuta 'docker-compose exec backend python manage.py migrate' para aplicar migraciones de base de datos

### Logs
Ver logs para depuración:
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs backend
docker-compose logs frontend
docker-compose logs db
```
