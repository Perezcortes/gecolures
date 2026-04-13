// src/utils/calculadoraGeco.ts

export function calcularPrecioYPiezas(modelo: string, talla: string, colorNombre: string, clasificacionColor: string = "Sólido") {
  let precio = 115;
  let piezas = 8;

  const nombreModelo = modelo.toUpperCase();
  const tallaLimpia = talla.replace('"', '').trim(); 
  
  // 1. ¿Es Laminado? (Leemos la nueva bandera de la BD, o buscamos 'LAM' como respaldo de seguridad)
  const esLaminado = clasificacionColor.toUpperCase() === 'LAMINADO' || colorNombre.toUpperCase().includes('LAM');

  // 2. MATRIZ DE PRECIOS SOLO PARA STICKS
  if (nombreModelo.includes('STICK')) {
    if (tallaLimpia === '3' || tallaLimpia === '3.5') {
      precio = 100;
      piezas = esLaminado ? 10 : 12;
    } 
    else if (tallaLimpia === '4' || tallaLimpia === '5') {
      precio = 100;
      piezas = esLaminado ? 8 : 10;
    } 
    else if (tallaLimpia === '6') {
      piezas = 8;
      precio = esLaminado ? 110 : 100;
    }
  }

  return { 
    precioFormateado: `$${precio} MXN`, 
    piezas, 
    textoPaquete: `PAQUETE CON ${piezas} PZAS` 
  };
}