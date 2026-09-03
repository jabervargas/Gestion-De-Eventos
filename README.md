# Gestion-De-Eventos
Sistema de Gestión de Eventos (SGDE)

Software de gestión de eventos y salones para el sector de congresos y convenciones de Cartagena (hoteles, centros de convenciones y casas de eventos). Cubre todo el ciclo comercial de un evento — desde la cotización hasta la confirmación, ejecución y cierre — de forma ágil, trazable y estandarizada.

Proyecto académico desarrollado para el programa de Administración de Empresas Turísticas y Hoteleras, en conjunto con un cliente real del sector.

Este README describe la versión beta: cubre únicamente los requerimientos funcionales RF-01 a RF-12 definidos en docs/. Facturación e inscripción de asistentes a eventos quedan fuera de alcance (se gestionan con herramientas externas).

Funcionalidades
Gestión de clientes (personas naturales y jurídicas) y empresas
Gestión de salones y tipos de montaje, con aforo por combinación salón/montaje
Calendario de disponibilidad con bloqueo temporal de espacios
Catálogo de conceptos (productos/servicios) con precios e impuestos
Generación de cotizaciones con vigencia
Registro de garantías y confirmación de eventos
Cancelaciones con política de penalización
Histórico de eventos
Stack
Capa	Tecnología
Frontend	React + JavaScript (Vite)
Backend	Python — Django + Django REST Framework
Base de datos	PostgreSQL
Autenticación	JWT (djangorestframework-simplejwt)
Gestión del proyecto	Jira (SGDE)
