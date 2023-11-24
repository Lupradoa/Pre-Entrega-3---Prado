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

document.getElementById('patientPhone').addEventListener('input', function (event) {
  const inputValue = event.target.value;
  const sanitizedValue = inputValue.replace(/[^0-9 -()+]/g, '');
  event.target.value = sanitizedValue;
});

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

  Swal.fire({
    icon: 'success',
    title: 'Paciente Agregado',
    text: 'El paciente ha sido agregado exitosamente.',
  });
});

document.getElementById('addAppointmentForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const appointmentPatient = document.getElementById('appointmentPatient').value;
  const appointmentDoctor = document.getElementById('appointmentDoctor').value;
  const appointmentDate = document.getElementById('appointmentDate').value;
  const appointmentTime = document.getElementById('appointmentTime').value;

  if (pacientes.length === 0) {
    // Muestra una alerta de SweetAlert
    Swal.fire({
      icon: 'warning',
      title: 'Advertencia',
      text: 'Primero debes agregar pacientes antes de programar una cita.',
    });
    return;
  }

  const patient = pacientes.find(p => p.nombre === appointmentPatient);

  if (!patient) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Paciente no encontrado. Verifica el nombre.',
    });
    return;
  }

  const doctor = new Medico(appointmentDoctor, ''); 

  const newAppointment = new Cita(patient, doctor, appointmentDate, appointmentTime);
  citas.push(newAppointment);
  document.getElementById('appointmentPatient').value = '';
  document.getElementById('appointmentDate').value = '';
  document.getElementById('appointmentTime').value = '';
  guardarDatosEnLocalStorage();
  updateOutput();

  
  Swal.fire({
    icon: 'success',
    title: 'Cita Programada',
    text: 'La cita ha sido programada exitosamente.',
  });
});

updateOutput();
