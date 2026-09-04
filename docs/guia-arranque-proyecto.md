# Guía de Arranque — Sistema de Gestión de Eventos (SGDE)

Stack definido: **React + JavaScript** (frontend), **Python** (backend), **PostgreSQL** (base de datos).

## 0. Decisión pendiente: Django REST Framework vs FastAPI

Mencionaron ambos. Mi recomendación es **Django + Django REST Framework (DRF)**, por esto:

- El proyecto es, en esencia, muchos **catálogos CRUD** (empresas, salones, montajes, conceptos) más unas cuantas reglas de negocio (bloqueo temporal, estados de evento). Django trae ORM, migraciones, panel de administración y autenticación de fábrica — construyen más rápido con menos código repetido.
- Necesitan **roles y trazabilidad** (RNF-02, RNF-03): el sistema de permisos y el admin de Django resuelven buena parte de esto sin librerías extra.
- FastAPI brilla en APIs muy asíncronas o de alto rendimiento puro; no es el cuello de botella aquí (es una app de gestión, no de streaming/alta concurrencia).

Si de todas formas prefieren FastAPI, la estructura de este documento se traduce casi 1:1 (SQLAlchemy + Alembic en vez de ORM/migraciones de Django, Pydantic en vez de serializers). Lo indico entre paréntesis donde aplica.

---

## 1. Estructura de repositorios

Sugiero **monorepo** para que sea más fácil de coordinar entre 6 personas en un proyecto académico:

```
sgde/
├── backend/          # Django + DRF
├── frontend/          # React
├── database/          # scripts SQL, diagrama, semillas (seed data)
└── docs/               # documentación de requerimientos, backlog, este archivo
```

---

## 2. Base de datos (PostgreSQL)

### 2.1 Script inicial (referencia — en la práctica se generará vía migraciones de Django, no a mano)

```sql
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE ciudad (
    codigo      VARCHAR(3) PRIMARY KEY,      -- ej. CTG, BOG
    nombre      VARCHAR(80) NOT NULL
);

CREATE TABLE empresa (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    razon_social    VARCHAR(150) NOT NULL,
    identificacion  VARCHAR(30) NOT NULL UNIQUE,
    contacto        VARCHAR(120),
    ciudad_codigo   VARCHAR(3) REFERENCES ciudad(codigo),
    creado_en       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE usuario (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre      VARCHAR(120) NOT NULL,
    usuario     VARCHAR(60) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    rol         VARCHAR(30) NOT NULL CHECK (rol IN ('ejecutivo','administrador','financiero')),
    activo      BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE cliente (
    id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tipo                    VARCHAR(10) NOT NULL CHECK (tipo IN ('natural','juridica')),
    nombre                  VARCHAR(150) NOT NULL,
    empresa_id              UUID REFERENCES empresa(id),
    forma_pago              VARCHAR(50),
    observaciones_internas  TEXT,
    creado_en               TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE salon (
    id      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre  VARCHAR(100) NOT NULL,
    altura  NUMERIC(5,2),
    ancho   NUMERIC(5,2)
);

CREATE TABLE montaje (
    id      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tipo    VARCHAR(50) NOT NULL UNIQUE  -- auditorio, escuela, imperial, coctel, espina de pescado...
);

CREATE TABLE salon_montaje (
    salon_id    UUID REFERENCES salon(id) ON DELETE CASCADE,
    montaje_id  UUID REFERENCES montaje(id) ON DELETE CASCADE,
    aforo       INTEGER NOT NULL CHECK (aforo > 0),
    foto_url    VARCHAR(255),
    PRIMARY KEY (salon_id, montaje_id)
);

CREATE TABLE concepto (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre          VARCHAR(120) NOT NULL,
    precio          NUMERIC(12,2) NOT NULL,
    impuesto_pct    NUMERIC(4,2) NOT NULL DEFAULT 0,  -- 19.00 (IVA) u 8.00 (impoconsumo)
    activo          BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE cotizacion (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cliente_id          UUID NOT NULL REFERENCES cliente(id),
    usuario_id          UUID NOT NULL REFERENCES usuario(id),
    salon_id            UUID NOT NULL REFERENCES salon(id),
    montaje_id          UUID NOT NULL REFERENCES montaje(id),
    estado              VARCHAR(20) NOT NULL DEFAULT 'cotizado'
                         CHECK (estado IN ('cotizado','bloqueado','confirmado','cancelado')),
    fecha_evento        DATE NOT NULL,
    validez_oferta      DATE,
    cantidad_personas   INTEGER NOT NULL,
    bloqueo_hasta       TIMESTAMPTZ,          -- RF-08: vencimiento del bloqueo temporal
    garantia_tipo       VARCHAR(30),
    garantia_monto      NUMERIC(12,2),
    penalizacion_pct    NUMERIC(5,2),
    creado_en           TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE cotizacion_item (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cotizacion_id       UUID NOT NULL REFERENCES cotizacion(id) ON DELETE CASCADE,
    concepto_id         UUID NOT NULL REFERENCES concepto(id),
    cantidad            INTEGER NOT NULL DEFAULT 1,
    precio_unitario     NUMERIC(12,2) NOT NULL
);

-- Trazabilidad (RNF-03)
CREATE TABLE auditoria (
    id          BIGSERIAL PRIMARY KEY,
    usuario_id  UUID REFERENCES usuario(id),
    entidad     VARCHAR(50) NOT NULL,
    entidad_id  UUID NOT NULL,
    accion      VARCHAR(20) NOT NULL,   -- crear, editar, cambiar_estado
    detalle     JSONB,
    creado_en   TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### 2.2 Restricción clave: no sobreventa (RF-08)

No se puede confirmar dos cotizaciones para el mismo `salon_id` + `fecha_evento` con `estado = 'confirmado'`. En Postgres esto se hace con un índice único parcial:

```sql
CREATE UNIQUE INDEX uq_salon_fecha_confirmado
ON cotizacion (salon_id, fecha_evento)
WHERE estado = 'confirmado';
```

Esto es más confiable que validarlo solo en el backend, porque protege la integridad aunque dos peticiones lleguen al mismo tiempo.

### 2.3 Quién lo hace y cómo

- Responsable sugerido: **Felipe Bernal** (ya venía en base de datos según la reunión).
- No escriban el DDL a mano en producción: modelen las tablas como **modelos de Django** (`backend/apps/*/models.py`) y dejen que `makemigrations` / `migrate` genere y versione el esquema. El SQL de arriba es la referencia para diseñar esos modelos, no el entregable final.
- Agreguen datos semilla (`ciudad`, `montaje` con los tipos ya mencionados en la reunión, algunos `concepto`) con un *fixture* de Django o un script `seed.py`, para que backend y frontend no dependan de cargar todo a mano.

---

## 3. Backend (Django + DRF)

### 3.1 Estructura de apps, mapeada a los epics de Jira

```
backend/
├── config/                # settings, urls raíz
├── apps/
│   ├── usuarios/           # SGDE-1 (auth, roles)
│   ├── clientes/           # SGDE-1 → HU: SGDE-9, SGDE-10, SGDE-11
│   ├── salones/            # SGDE-2 → HU: SGDE-12, SGDE-13
│   ├── disponibilidad/      # SGDE-3 → HU: SGDE-14, SGDE-15 (rack + bloqueo)
│   ├── catalogo/            # SGDE-4 → HU: SGDE-16, SGDE-17 (conceptos/precios)
│   ├── cotizaciones/         # SGDE-5 → HU: SGDE-18, SGDE-19
│   ├── eventos/              # SGDE-6, SGDE-7, SGDE-8 → HU: SGDE-20 a SGDE-23
│   └── core/                 # auditoría, permisos, utilidades compartidas
├── requirements.txt
└── manage.py
```

### 3.2 Endpoints sugeridos (primer corte)

| Método | Ruta | HU Jira | Notas |
|---|---|---|---|
| POST | `/api/auth/login/` | RNF-02 | JWT (usar `djangorestframework-simplejwt`) |
| GET/POST | `/api/clientes/` | SGDE-9 | filtros `?tipo=`, `?q=` para búsqueda (SGDE-10) |
| GET/POST | `/api/empresas/` | SGDE-11 | |
| GET/POST | `/api/salones/` | SGDE-12 | incluye subida de fotos (usar `django-storages` si suben a S3/Cloudinary, o `MEDIA_ROOT` local para el MVP) |
| GET/POST | `/api/montajes/` | SGDE-13 | |
| GET | `/api/disponibilidad/?salon=&desde=&hasta=` | SGDE-14 | devuelve estado por día para pintar el rack |
| POST | `/api/cotizaciones/{id}/bloquear/` | SGDE-15 | valida contra el índice único; guarda `bloqueo_hasta` |
| GET/POST | `/api/conceptos/` | SGDE-16 | |
| PATCH | `/api/conceptos/{id}/precio/` | SGDE-17 | registra en `auditoria` |
| POST | `/api/cotizaciones/` | SGDE-18 | valida aforo vs. `salon_montaje.aforo` |
| PATCH | `/api/cotizaciones/{id}/vigencia/` | SGDE-19 | |
| POST | `/api/cotizaciones/{id}/aceptar/` | SGDE-20 | registra garantía |
| POST | `/api/cotizaciones/{id}/confirmar/` | SGDE-21 | exige garantía registrada, cambia `estado` |
| POST | `/api/cotizaciones/{id}/cancelar/` | SGDE-22 | aplica `penalizacion_pct` |
| GET | `/api/eventos/historico/?cliente=&salon=&estado=&desde=&hasta=` | SGDE-23 | |

### 3.3 Tarea de fondo importante: liberar bloqueos vencidos (SGDE-15)

El vencimiento automático del bloqueo (RF-08) no puede depender de que alguien abra la app. Necesitan un job periódico:

- Opción simple: **Celery + Celery Beat** con una tarea cada 5–10 min que busque `cotizacion` con `estado='bloqueado'` y `bloqueo_hasta < now()`, y las pase a `estado='cotizado'` (libera el salón).
- Opción más simple para el MVP académico: validar el vencimiento **al leer** (si `bloqueo_hasta < now()`, tratarlo como liberado en la consulta) y correr un `management command` manual/cron una vez al día para limpiar datos. Empiecen así y migren a Celery si el tiempo lo permite.

### 3.4 Responsables sugeridos

Según lo que mencionaron en la reunión: **Andrés Camilo Flores** y **Lebron De La Rosa Castro** en backend.

---

## 4. Frontend (React + JavaScript)

### 4.1 Estructura sugerida

```
frontend/
├── src/
│   ├── api/                  # cliente HTTP (axios/fetch), un archivo por recurso
│   ├── components/            # componentes reutilizables (Modal, Table, Badge de estado)
│   ├── pages/
│   │   ├── clientes/           # SGDE-9, SGDE-10, SGDE-11
│   │   ├── salones/            # SGDE-12, SGDE-13
│   │   ├── rack/                # SGDE-14, SGDE-15 — el calendario con colores
│   │   ├── catalogo/             # SGDE-16, SGDE-17
│   │   ├── cotizaciones/          # SGDE-18, SGDE-19, SGDE-20
│   │   └── eventos/                # SGDE-21, SGDE-22, SGDE-23
│   ├── context/ o store/            # estado global (auth, usuario actual)
│   ├── routes.jsx
│   └── App.jsx
```

### 4.2 Recomendaciones puntuales

- **Rack de disponibilidad (SGDE-14)**: es la pantalla más compleja visualmente. Usen una librería de calendario (`react-big-calendar` o `FullCalendar` con su wrapper de React) en vez de construir el calendario a mano — les ahorra mucho tiempo.
- **Manejo de estado global**: con el tamaño de este proyecto, `Context API` de React alcanza (usuario logueado, rol). No necesitan Redux salvo que el rack o las cotizaciones crezcan mucho en complejidad.
- **Formularios de cotización (SGDE-18)**: es el formulario más largo (salón, montaje, personas, ítems). Usen `react-hook-form` para validaciones (aforo máximo, campos obligatorios) sin código repetitivo.
- **Autenticación**: guardar el JWT en memoria/`httpOnly cookie` (evitar `localStorage` por seguridad si el tiempo del curso lo permite); redirigir según el `rol` del usuario (RNF-02).

### 4.3 Responsables sugeridos

Según la reunión: **Javier Vargas** y **Brian Federosa** en frontend.

---

## 5. Orden sugerido de construcción (alineado al backlog de Jira)

No construyan todo en paralelo desde el día uno — hay dependencias reales entre epics:

1. **Sprint 1 — Cimientos**: `usuarios` (auth/roles) + `clientes`/`empresas` (SGDE-1) + modelos base de BD. Sin esto nadie más puede avanzar.
2. **Sprint 2 — Catálogos**: `salones`/`montajes` (SGDE-2) + `conceptos` (SGDE-4). Son prerequisito de las cotizaciones.
3. **Sprint 3 — Núcleo del negocio**: `cotizaciones` (SGDE-5) + `disponibilidad`/bloqueo (SGDE-3). Aquí está el mayor riesgo técnico (validación de aforo, índice único de sobreventa) — empiecen temprano.
4. **Sprint 4 — Cierre del ciclo**: confirmación/garantías (SGDE-6), cancelaciones (SGDE-7), histórico (SGDE-8).

Frontend puede ir un sprint detrás de backend por pantalla (o en paralelo si mockean la API con datos falsos mientras backend termina).

---

## 6. Flujo de trabajo en equipo

- **Ramas**: `main` (estable) ← `develop` ← `feature/SGDE-XX-nombre-corto` por cada historia. El número de la rama debe coincidir con el issue de Jira para trazabilidad.
- **Pull Request**: mínimo 1 revisión de otro compañero antes de mergear a `develop`.
- **Definition of Done** sugerida para cada historia: código + migración de BD (si aplica) + endpoint probado con Postman/Thunder Client + pantalla conectada (no solo mock) + movida a "Done" en Jira.

---

## 7. Checklist para arrancar esta semana

- [ ] Crear repos/carpetas según la estructura de la sección 1.
- [ ] Levantar PostgreSQL local (Docker recomendado: `docker run -p 5432:5432 -e POSTGRES_PASSWORD=... postgres:16`).
- [ ] Django: `django-admin startproject config .` + `python manage.py startapp usuarios` (y así con cada app de la sección 3.1).
- [ ] Configurar CORS (`django-cors-headers`) para que React pueda llamar a la API en local.
- [ ] React: `npm create vite@latest frontend -- --template react` (más liviano que Create React App).
- [ ] Definir el archivo `.env` para ambos lados (credenciales de BD, `SECRET_KEY`, URL de la API) y **no subirlo a git**.
- [ ] Mover la primera historia (SGDE-9, "Registrar cliente") a "En progreso" en Jira y arrancar el Sprint 1.
