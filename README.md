# Café Origen — Motor de Analítica 

Motor de procesamiento y analítica de datos transaccionales desarrollado en **Node.js** para **Café Origen**. Diseñado para analizar historiales de cientos de miles de ventas en milisegundos con bajo consumo de memoria, cumpliendo los estándares de rendimiento exigidos por el marketplace.

## Preguntas de negocio que responde

- Indicadores ejecutivos: ¿Cuánto se vendió en total, cuántas unidades salieron, cuál fue la venta más alta y cuál es el ticket promedio?
- Desempeño regional: ¿Cuánto factura cada ciudad ?
- Catálogo y productos: ¿Cuáles son los productos con mayores ingresos y cuál es el producto mas vendido en cada ciudad?
- Fidelización de clientes:¿Qué clientes compran de forma recurrente y quién fue el primer comprador único de la temporada para enviarle un cupón de regreso?
- Recomendaciones comerciales:¿Qué par de productos suma exactamente el valor de una tarjeta regalo  y qué par se acerca más sin superar un presupuesto corporativo ?
- Tendencias temporales: ¿Cuál fue la mejor racha de 7 días consecutivos de ventas en el mes?

## Estructura del proyecto

- `src/analitica.js`: Motor principal con todas las funciones optimizadas 
- `src/catalogo.js`: Catálogo oficial de productos y precios unitarios de Café Origen.
- `src/datos.js`: Muestra histórica del Día 1 (12 registros transaccionales).
- `src/generador.js`: Generador de historiales realistas de tamaño .
- `src/explorar.js`: Script de inspección inicial y validación de casos borde.
- `src/medir.js`: Instrumentación de operaciones básicas (Big O)
- `src/reporte.js`: Punto de entrada principal por consola para generar el reporte
- `bitacora.md`: Diccionario de datos, casos borde detectados, trazas manuales y resumen de los 12 MiniRetos.
- `RENDIMIENTO.md`: Clasificación Big O en tiempo y memoria, proyecciones a 1.000.000 de ventas
- `README.md`: Documentación general del producto.

## Requisitos e instalación

- Node.js v18 LTS o superior.
