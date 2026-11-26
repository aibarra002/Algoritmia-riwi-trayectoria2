# Café Origen- analitica bitacora

Café Origen es una tostadora de café de especialidad de Medellín que vende en su tienda física, en ferias y por pedidos en línea a varias ciudades del país. Hoy lleva sus ventas en hojas de cálculo y nadie sabe responder con certeza preguntas como “¿cuál fue nuestro producto más vendido?” o “¿qué ciudad nos compra más?”.

## 1. Diccionario de Datos (MiniReto 1)

| Propiedad | Tipo  | Significado y dominio |
| id | numero | Identificador único secuencial de cada transacción registrada. |
| fecha | string | Fecha de la venta en formato estándar. |
| cliente | string| Código identificador único del comprador . |
| producto | string | Nombre comercial del artículo vendido |
| ciudad | string | Ciudad donde se registró o despachó la compra. |
| cantidad | number | Número de unidades adquiridas en esa línea de venta. |
| precio | number | Precio unitario del producto en pesos colombianos (COP). |

---

## 2. Casos Borde Detectados en los Datos Crudos (MiniReto 1)

1. **Inconsistencia de capitalización en `ciudad` (Registro `id: 5`)**
   - **Problema:** La ciudad aparece escrita como `"medellín"` en minúscula inicial, mientras que en los registros `1`, `4` y `11` figura como `"Medellín"`. En JavaScript `"Medellín" !== "medellín"`, lo que duplicaría categorías al agrupar.
   - **Decisión:** Normalizar las cadenas de texto de `ciudad` con `.trim().toLowerCase()` antes de comparar o agrupar registros.

2. Venta con cantidad igual a cero (Registro id: 8)
   - **Problema:** El cliente C06 tiene registrado el producto "Origen Huila 500 g" con cantidad: 0 y precio: 42000`. Contar este registro distorsionaría el ticket promedio y el conteo de transacciones efectivas hacia abajo.
   - Decisión: Filtrar y excluir registros con cantidad <= 0 en todos los cálculos de ingresos, unidades, promedios y frecuencias.

3. **Recurrencia de clientes en múltiples registros (C01, C02, C03)**
   - **Problema**: Existen 12 registros en la muestra, pero solo 8 clientes únicos (c01 aparece 3 veces; c02 y C03 aparecen 2 veces cada uno).
   - Decisión: Tratar cada objeto del arreglo como una transacción individual y utilizar estructuras set o map cuando se requiera agrupar o deduplicar por cliente.

---

## 3. Plan en Pseudocódigo y Decisiones de Arreglos Vacíos (MiniReto 2)

### Pseudocódigo de Indicadores Básicos

FUNCIÓN valorVenta(venta)
  RETORNAR venta.cantidad * venta.precio
FIN FUNCIÓN

FUNCIÓN totalVendido(ventas)
  INICIAR total = 0
  PARA CADA venta EN ventas HACER
    SI venta.cantidad > 0 ENTONCES
      total = total + valorVenta(venta)
    FIN SI
  FIN PARA
  RETORNAR total
FIN FUNCIÓN

FUNCIÓN unidadesVendidas(ventas)
  INICIAR unidades = 0
  PARA CADA venta EN ventas HACER
    SI venta.cantidad > 0 ENTONCES
      unidades = unidades + venta.cantidad
    FIN SI
  FIN PARA
  RETORNAR unidades
FIN FUNCIÓN

FUNCIÓN ventaMayor(ventas)
  INICIAR mayor = null
  INICIAR maxValor = -1
  PARA CADA venta EN ventas HACER
    SI venta.cantidad > 0 ENTONCES
      valorActual = valorVenta(venta)
      SI valorActual > maxValor ENTONCES
        maxValor = valorActual
        mayor = venta
      FIN SI
    FIN SI
  FIN PARA
  RETORNAR mayor
FIN FUNCIÓN

FUNCIÓN ticketPromedio(ventas)
  INICIAR total = 0
  INICIAR ventasValidas = 0
  PARA CADA venta EN ventas HACER
    SI venta.cantidad > 0 ENTONCES
      total = total + valorVenta(venta)
      ventasValidas = ventasValidas + 1
    FIN SI
  FIN PARA
  SI ventasValidas == 0 ENTONCES
    RETORNAR 0
  FIN SI
  RETORNAR total / ventasValidas
FIN FUNCIÓN

FUNCIÓN ventasPorCiudad(ventas, ciudad)
  INICIAR totalCiudad = 0
  ciudadBuscada = ciudad.trim().toLowerCase()
  PARA CADA venta EN ventas HACER
    ciudadRegistro = venta.ciudad.trim().toLowerCase()
    SI venta.cantidad > 0 Y ciudadRegistro == ciudadBuscada ENTONCES
      totalCiudad = totalCiudad + valorVenta(venta)
    FIN SI
  FIN PARA
  RETORNAR totalCiudad
FIN FUNCIÓN