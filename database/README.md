# database/

Esta carpeta NO contiene las migraciones reales (esas viven dentro de cada app de Django, en `backend/apps/<app>/migrations/`, generadas con `python manage.py makemigrations`).

Aquí va solo material de referencia y diseño:

- `scripts/` — DDL de referencia en SQL puro (ver `Documentacion/guia-arranque-proyecto.md`, sección 2.1), útil para diseñar los modelos de Django, no para ejecutar directamente en producción.
- `seeds/` — datos semilla documentados (ciudades, tipos de montaje) para cargar en desarrollo.
- `diagramas/` — diagrama entidad-relación del modelo de dominio.
