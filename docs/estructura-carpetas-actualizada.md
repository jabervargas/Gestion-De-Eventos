# Estructura de carpetas actualizada — SGDE

Con los módulos nuevos de la reunión del 28/08 (Hotel, Proveedores/Stock, Autenticación/Roles), la estructura queda así:

```
sgde/
├── backend/                        # Django + DRF
│   ├── config/                     # settings, urls raíz
│   ├── apps/
│   │   ├── usuarios/                # SGDE-24 → Login (SGDE-27), registrar usuario+rol (SGDE-28)
│   │   ├── hoteles/                 # SGDE-25 → Registrar hotel (SGDE-29)
│   │   ├── clientes/                # SGDE-1  → SGDE-9, SGDE-10
│   │   ├── empresas/                # SGDE-1  → SGDE-11
│   │   ├── salones/                 # SGDE-2  → SGDE-12, SGDE-13 (ahora con FK a hotel)
│   │   ├── disponibilidad/          # SGDE-3  → SGDE-14, SGDE-15 (rack + bloqueo, sin pasarela de pago)
│   │   ├── catalogo/                # SGDE-4  → SGDE-16, SGDE-17 (conceptos/precios)
│   │   ├── cotizaciones/            # SGDE-5  → SGDE-18, SGDE-19
│   │   ├── proveedores/             # SGDE-26 → SGDE-30, SGDE-31 (stock, comparación de precios)
│   │   ├── eventos/                 # SGDE-6, SGDE-7, SGDE-8 → SGDE-20 a SGDE-23
│   │   └── core/                    # auditoría, permisos, utilidades compartidas entre apps
│   ├── requirements.txt
│   └── manage.py
│
├── frontend/                       # React + Vite
│   ├── src/
│   │   ├── api/                     # un archivo por recurso: usuarios.js, hoteles.js, clientes.js, salones.js, cotizaciones.js, proveedores.js...
│   │   ├── components/              # reutilizables: Modal, Table, Badge de estado, SelectorHotel
│   │   ├── context/                 # AuthContext (usuario logueado, rol, hotel activo)
│   │   ├── pages/
│   │   │   ├── auth/                 # SGDE-27 → login
│   │   │   ├── usuarios/             # SGDE-28 → crear/listar usuarios y roles
│   │   │   ├── hoteles/              # SGDE-29 → crear/listar hoteles
│   │   │   ├── clientes/             # SGDE-9, SGDE-10, SGDE-11
│   │   │   ├── salones/              # SGDE-12, SGDE-13
│   │   │   ├── rack/                  # SGDE-14, SGDE-15 — calendario con colores
│   │   │   ├── catalogo/              # SGDE-16, SGDE-17
│   │   │   ├── cotizaciones/          # SGDE-18, SGDE-19, SGDE-20
│   │   │   ├── proveedores/           # SGDE-30, SGDE-31 — stock y comparación de precios
│   │   │   └── eventos/                # SGDE-21, SGDE-22, SGDE-23
│   │   ├── routes.jsx
│   │   └── App.jsx
│   └── package.json
│
├── database/                       # scripts de referencia, diagrama ER, datos semilla
└── docs/                           # requerimientos, backlog, actas, guías (todo lo ya generado)
```

## Qué cambia respecto a la estructura original

- **Nuevas apps de backend**: `usuarios` (antes no existía como app propia — vivía implícito en RNF-02), `hoteles`, `proveedores`.
- **`clientes` y `empresas` se separan** en dos apps en vez de compartir `clientes/` — con la llegada de `hoteles` y `usuarios` como entidades de primer nivel, separar clientes de empresas hace el código más claro (cada una tiene su propio ciclo de vida y CRUD).
- **`salones` ahora depende de `hoteles`**: cada salón tiene una FK obligatoria a un hotel (multi-tenant).
- **Nuevas páginas de frontend**: `auth/`, `usuarios/`, `hoteles/`, `proveedores/`.
- **`context/`** gana relevancia: además del usuario logueado, ahora necesita guardar el **hotel activo** (con qué hotel está trabajando el usuario en ese momento, si el admin gestiona varios).

## Orden sugerido para crear las apps de Django (según lo que pidió el profesor: primero infraestructura, CRUDs reutilizables)

1. `usuarios` (login + rol) — todo lo demás depende de poder autenticar
2. `hoteles` — segunda dependencia obligatoria (salones, y el resto, cuelgan de un hotel)
3. `clientes`, `empresas`, `salones` — en paralelo, ya con el patrón de CRUD definido en los dos primeros
4. `catalogo`, `proveedores` — catálogos de apoyo para cotizar
5. `disponibilidad`, `cotizaciones` — el núcleo de negocio, una vez existan salones y catálogo
6. `eventos` — cierre del ciclo, depende de que cotizaciones ya funcione

Esto coincide con el Sprint 1 ya definido (Login + Usuario + Hotel primero) — literalmente están construyendo las dos primeras apps de esta lista.
