// Variable para llevar el registro del último turno asignado
class Paciente {
  constructor(nombre, telefono) {
    this.nombre = nombre;
    this.telefono = telefono;
  }
}

class Medico {
  constructor(nombre, especialidad) {
    this.nombre = nombre;
    this.especialidad = especialidad;
  }
}

class Cita {
  constructor(paciente, medico, fecha, hora) {
    this.paciente = paciente;
    this.medico = medico;
    this.fecha = fecha;
    this.hora = hora;
  }
}

const pacientes = [];
const medicos = [];
const citas = [];

function agregarPaciente() {
  const nombre = prompt("Ingrese el nombre del paciente:");
  const telefono = prompt("Ingrese el teléfono del paciente:");
  const paciente = new Paciente(nombre, telefono);
  pacientes.push(paciente);
  alert("Paciente agregado exitosamente.");
}

function agregarMedico() {
  const nombre = prompt("Ingrese el nombre del médico:");
  const especialidad = prompt("Ingrese la especialidad del médico:");
  const medico = new Medico(nombre, especialidad);
  medicos.push(medico);
  alert("Médico agregado exitosamente.");
}

function programarCita() {
  const pacienteNombre = prompt("Ingrese el nombre del paciente:");
  const medicoNombre = prompt("Ingrese el nombre del médico:");
  const fecha = prompt("Ingrese la fecha de la cita (YYYY-MM-DD):");
  const hora = prompt("Ingrese la hora de la cita (HH:MM AM/PM):");

  const paciente = pacientes.find(p => p.nombre === pacienteNombre);
  const medico = medicos.find(m => m.nombre === medicoNombre);

  if (!paciente || !medico) {
    alert("Paciente o médico no encontrado. Verifique los nombres.");
    return;
  }

  const cita = new Cita(paciente, medico, fecha, hora);
  citas.push(cita);
  alert("Cita programada exitosamente.");
}

function buscarCitasDisponibles() {
  const medicoNombre = prompt("Ingrese el nombre del médico:");
  const fecha = prompt("Ingrese la fecha de la cita (YYYY-MM-DD):");
  const hora = prompt("Ingrese la hora de la cita (HH:MM AM/PM):");

  const medico = medicos.find(m => m.nombre === medicoNombre);

  if (!medico) {
    alert("Médico no encontrado. Verifique el nombre.");
    return;
  }

  const citasDisponibles = citas.filter(cita => cita.medico === medico && cita.fecha === fecha && cita.hora === hora);

  if (citasDisponibles.length > 0) {
    alert("Citas disponibles encontradas:\n" + citasDisponibles.map(c => `Paciente: ${c.paciente.nombre}, Fecha: ${c.fecha}, Hora: ${c.hora}`).join("\n"));
  } else {
    alert("No hay citas disponibles para el médico, fecha y hora especificados.");
  }
}

while (true) {
  const opcion = prompt("Seleccione una opción:\n1. Agregar Paciente\n2. Agregar Médico\n3. Programar Cita\n4. Buscar Citas Disponibles\n5. Salir");

  switch (opcion) {
    case "1":
      agregarPaciente();
      break;
    case "2":
      agregarMedico();
      break;
    case "3":
      programarCita();
      break;
    case "4":
      buscarCitasDisponibles();
      break;
    case "5":
      alert("¡Hasta luego!");
      // Finalizar la ejecución del programa
      throw new Error("Programa finalizado");
    default:
      alert("Opción no válida. Por favor, seleccione una opción válida.");
  }
}