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

let pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
let medicos = JSON.parse(localStorage.getItem('medicos')) || [];
let citas = JSON.parse(localStorage.getItem('citas')) || [];

function guardarDatosEnLocalStorage() {
  localStorage.setItem('pacientes', JSON.stringify(pacientes));
  localStorage.setItem('medicos', JSON.stringify(medicos));
  localStorage.setItem('citas', JSON.stringify(citas));
}

function updateOutput() {
  const output = document.getElementById('output');
  output.innerHTML = '<h2>Lista de Pacientes</h2>';
  pacientes.forEach(patient => {
    output.innerHTML += `<p>Nombre: ${patient.nombre}, Teléfono: ${patient.telefono}</p>`;
  });
  
  output.innerHTML += '<h2>Lista de Citas</h2>';
  citas.forEach(appointment => {
    output.innerHTML += `<p>Paciente: ${appointment.paciente.nombre}, Médico: ${appointment.medico.nombre}, Fecha: ${appointment.fecha}, Hora: ${appointment.hora}</p>`;
  });
}

document.getElementById('addPatientForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const patientName = document.getElementById('patientName').value;
  const patientPhone = document.getElementById('patientPhone').value;
  const newPatient = new Paciente(patientName, patientPhone);
  pacientes.push(newPatient);
  document.getElementById('patientName').value = '';
  document.getElementById('patientPhone').value = '';
  guardarDatosEnLocalStorage();
  updateOutput();
});

document.getElementById('addAppointmentForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const appointmentPatient = document.getElementById('appointmentPatient').value;
  const appointmentDoctor = document.getElementById('appointmentDoctor').value;
  const appointmentDate = document.getElementById('appointmentDate').value;
  const appointmentTime = document.getElementById('appointmentTime').value;

  const patient = pacientes.find(p => p.nombre === appointmentPatient);
  const doctor = medicos.find(m => m.nombre === appointmentDoctor);

  if (!patient || !doctor) {
    alert("Paciente o médico no encontrado. Verifique los nombres.");
    return;
  }

  const newAppointment = new Cita(patient, doctor, appointmentDate, appointmentTime);
  citas.push(newAppointment);
  document.getElementById('appointmentPatient').value = '';
  document.getElementById('appointmentDoctor').value = '';
  document.getElementById('appointmentDate').value = '';
  document.getElementById('appointmentTime').value = '';
  guardarDatosEnLocalStorage();
  updateOutput();
});

updateOutput();