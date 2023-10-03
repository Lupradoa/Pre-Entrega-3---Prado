// Variable para llevar el registro del último turno asignado
let ultimoTurno = 0;

// Función para solicitar un nombre y asignar un turno
function asignarTurno() {
  // Definimos el número máximo de cupos utilizando la variable turno
  let turno;
  for (turno = 1; turno <= 15; turno++) {
    // Solicitamos el nombre al usuario
    const nombre = prompt("Por favor, ingrese su nombre:");

    // Verificamos si se ingresó un nombre
    if (nombre) {
      // Incrementamos el contador de turno
      ultimoTurno++;

      // Mostramos un alert con el nombre y el turno asignado
      alert(`Hola, ${nombre}. Su turno es el número ${ultimoTurno}.`);

      // Verificamos si se alcanzó el máximo de cupos
      if (turno === 15) {
        alert("No hay más disponibilidad de turnos. ¡Lo esperamos mañana!");
      }
    } else {
      alert("Nombre no ingresado. El proceso ha sido cancelado.");
      ultimoTurno--; // Disminuimos el contador de turno si no se ingresó un nombre
      break; // Salimos del bucle si no se ingresó un nombre
    }
  }
}

// Llamamos a la función para asignar turnos
asignarTurno();
