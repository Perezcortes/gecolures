// src/utils/calculadoraGeco.ts

export function calcularPrecioYPiezas(modelo: string, talla: string, colorNombre: string, clasificacionColor: string = "Sólido") {
  // Valores por defecto
  let precio = 115;
  let piezas = 8;

  const nombreModelo = modelo.toUpperCase();
  const tallaLimpia = talla.replace('"', '').trim(); 
  
  // 1. ¿Es Laminado? (Leemos la nueva bandera de la BD, o buscamos 'LAM' como respaldo de seguridad)
  const esLaminado = clasificacionColor.toUpperCase() === 'LAMINADO' || colorNombre.toUpperCase().includes('LAM');

  // 2. MATRIZ DE PRECIOS SOLO PARA STICKS
  if (nombreModelo.includes('STICK')) {
    
    // Todos los sticks arrancan en 115 por defecto según la nueva regla
    precio = 115;

    // TAMAÑO 3"
    if (tallaLimpia === '3') {
      piezas = esLaminado ? 10 : 12;
    } 
    // TAMAÑO 4" y 5"
    else if (tallaLimpia === '4' || tallaLimpia === '5') {
      piezas = esLaminado ? 8 : 10;
    } 
    // TAMAÑO 6"
    else if (tallaLimpia === '6') {
      piezas = 8;
      // Solo el laminado de 6" es más caro
      if (esLaminado) {
        precio = 125;
      }
    }
  }

  return { 
    precioFormateado: `$${precio} MXN`, 
    piezas, 
    textoPaquete: `PAQUETE CON ${piezas} PZAS` 
  };
}