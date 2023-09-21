hashSetEventDate = {};
function isDateFreeFromOtherEvents(date) {
    return hashSetEventDate[date] == undefined;
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if needed

    return `${year}-${month}-${day}`;
}

function formatCEPInput() {
  const value = inp_cep.value.replace(/\D/g, ''); // Remove non-digit characters

  if (value.length > 4) {
    inp_cep.value = value.slice(0, 5) + '-' + value.slice(5, 7);
  } else {
    inp_cep.value = value;
  }
}

function isDateOlderOrEqual(date) {
    const today = new Date();

    if (isNaN(date)) {
        return false;
    }

    return date >= today;
}

async function loadEvents() {
    const url = "http://localhost:8080/org/event";
    const token = sessionStorage.TOKEN
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    }).then(res => res.json());

    console.log(response);

    const responseSize = response.length;

    const eventsTest = [];

    for (let i = 0; i < responseSize; i++) {
        hashSetEventDate[response[i].eventDate] = true;
        eventsTest.push({
            id: response[i].id,
            title: response[i].name,
            start: response[i].eventDate
        })
    }

    console.log(eventsTest);


    $(document).ready(function() {
        $('#test-calendar').fullCalendar({
            defaultView: 'month',
            events: eventsTest,
            selectable: true,
            select: function(start) {

                clearInputValidationClasses();
                loadInstruments();
                if (!isDateFreeFromOtherEvents(formatDate(start._d))){
                    return alert("Already have an event in this date");
                }
                if (!isDateOlderOrEqual(start._d)){
                    return alert("Date must be in the future");
                }

                abrirModal();
                //abrirModal(formatDate(start._d),"");
            },
            eventClick: async function(info) {
                $('#viewModal').modal('show');
                const data = await getDadosEvent(info.id)
                const vagas = uniqueInstrument(data[0].vagas)
                getVagasView(vagas)
                getDadosEventView(data)
                console.log(data)
                console.log(info);
               
            },

        });
    });

    return response
}

function validarCEP(cep) {
    cep = cep.replace(/\D/g, '');

    if (cep.length === 8 || cep.length === 9) {
        const regex = /^[0-9]{8}$/; // CEP format XXXXXXXX (8 digits)

        return regex.test(cep);
    }

    return false;
}
function validateDate(eventDate) {
    const currentDate = new Date();
    return !isNaN(eventDate) && eventDate >= currentDate
}

function validateHourFormat(startHour) {
    console.log(startHour);
    const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;

    return timeRegex.test(startHour)
}

function clearInputValidationClasses() {
    const inputElements = document.querySelectorAll('.input-field');

    inputElements.forEach((element) => {
        element.classList.remove('is-invalid', 'is-valid');
    });
}

function validateInput(requestBody) {


    let isFormValid = true; // Flag to track overall form validity

    // Validation for 'name'
    if (requestBody.name.length >= 1) {
        document.getElementById("inp_name").classList.remove("is-invalid");
        document.getElementById("inp_name").classList.add("is-valid");
    } else {
        isFormValid = false;
        document.getElementById("inp_name").classList.remove("is-valid");
        document.getElementById("inp_name").classList.add("is-invalid");
        document.getElementById("inp_name_message").innerText = "Nome é obrigatório.";
    }

    // Validation for 'aboutEvent'
    if (requestBody.aboutEvent.length >= 1) {
        document.getElementById("inp_about_event").classList.remove("is-invalid");
        document.getElementById("inp_about_event").classList.add("is-valid");
    } else {
        isFormValid = false;
        document.getElementById("inp_about_event").classList.remove("is-valid");
        document.getElementById("inp_about_event").classList.add("is-invalid");
        document.getElementById("inp_about_event_message").innerText = "Descrição do evento é obrigatória.";
    }

    // Validation for 'cep'
    if (validarCEP(requestBody.cep)) {
        document.getElementById("inp_cep").classList.remove("is-invalid");
        document.getElementById("inp_cep").classList.add("is-valid");
    } else {
        isFormValid = false;
        document.getElementById("inp_cep").classList.remove("is-valid");
        document.getElementById("inp_cep").classList.add("is-invalid");
        document.getElementById("inp_cep_message").innerText = "CEP inválido.";
    }

    // Validation for 'number'
    if (requestBody.number >= 1) {
        document.getElementById("inp_number").classList.remove("is-invalid");
        document.getElementById("inp_number").classList.add("is-valid");
    } else {
        isFormValid = false;
        document.getElementById("inp_number").classList.remove("is-valid");
        document.getElementById("inp_number").classList.add("is-invalid");
        document.getElementById("inp_number_message").innerText = "Número é obrigatório.";
    }

    // Validation for 'complement'
    if (requestBody.complement.length >= 1) {
        document.getElementById("inp_complement").classList.remove("is-invalid");
        document.getElementById("inp_complement").classList.add("is-valid");
    } else {
        isFormValid = false;
        document.getElementById("inp_complement").classList.remove("is-valid");
        document.getElementById("inp_complement").classList.add("is-invalid");
        document.getElementById("inp_complement_message").innerText = "Complemento é obrigatório.";
    }

    // Validation for 'startHour'
    if (validateHourFormat(requestBody.startHour)) {
        document.getElementById("inp_start_hour").classList.remove("is-invalid");
        document.getElementById("inp_start_hour").classList.add("is-valid");
    } else {
        isFormValid = false;
        document.getElementById("inp_start_hour").classList.remove("is-valid");
        document.getElementById("inp_start_hour").classList.add("is-invalid");
        document.getElementById("inp_start_hour_message").innerText = "Formato de hora inválido (HH:MM:SS).";
    }

    // Validation for 'durationHours'
    if (!isNaN(requestBody.durationHours) && requestBody.durationHours >= 1) {
        document.getElementById("inp_duration_hours").classList.remove("is-invalid");
        document.getElementById("inp_duration_hours").classList.add("is-valid");
    } else {
        isFormValid = false;
        document.getElementById("inp_duration_hours").classList.remove("is-valid");
        document.getElementById("inp_duration_hours").classList.add("is-invalid");
        document.getElementById("inp_duration_hours_message").innerText = "Duração inválida.";
    }

    return isFormValid;
}

async function createNewEvent() {
    const url = "http://localhost:8080/org/event";
    const token = sessionStorage.TOKEN


    const requestBody = {
        "name": document.getElementById('inp_name').value,
        "aboutEvent": document.getElementById('inp_about_event').value,
        "cep": document.getElementById('inp_cep').value,
        "number": Number(document.getElementById('inp_number').value),
        "complement": document.getElementById('inp_complement').value,
        "eventDate": document.getElementById("modal-title").innerHTML,
        "startHour": document.getElementById('inp_start_hour').value,
        "durationHours": document.getElementById('inp_duration_hours').value,
        "imageUrl": "https://i.imgur.com/6girfvz.png"
    };
    console.log(requestBody);

    if (!validateInput(requestBody)) return false

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        createCustomModal(getCreateEventJobHTML());
        console.log("Event created:", data);
    } catch (error) {
        console.error("Error creating event:", error);
    }

}

async function loadInstruments() {
    const url = "http://localhost:8080/usr/instruments";
    const token = sessionStorage.TOKEN
    const instruments = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    }).then(res => res.json());

    const multipleSelect = document.querySelector('#multipleSelect');
    for (let i = 0; i < instruments.length; i++) {
        multipleSelect.addOption({
            label:`${instruments[i].name}`,
            value:`${instruments[i].id}`
        });
    }
}

function incrementValue(idValue) {
    const input = document.getElementById(idValue);
    const value = Number(input.getAttribute('value'));


    if (value <= 30) input.innerHTML=value + 1;
    input["value"]++;
}

function decrementValue(idValue) {
    const input = document.getElementById(idValue);
    const value = Number(input.innerHTML);

    if (value >= 1) input.innerHTML=value - 1;
}


async function getDadosEvent(id) {
  const url = `http://localhost:8080/org/event/${id}`;
  const token = sessionStorage.TOKEN
  const eventData = await fetch(url, {
      method: 'GET',
      headers: {
          'Authorization': 'Bearer ' + token,
      }
  }).then(res => res.json());

  
  
  return eventData
}

function getDadosEventView(list) {

  
  const nameParagraph = document.getElementById('name_p');
  const about_eventParagraph = document.getElementById('about_event_p');
  const cepParagraph = document.getElementById('cep_p');
  const numberParagraph = document.getElementById('number_p');
  const complementParagraph = document.getElementById('complement_p');
  const startHourParagraph = document.getElementById('startHour_p');
  const durationHoursParagraph = document.getElementById('durationHours_p');
  const instrumentosParagraph = document.getElementById('instrumentos_p')

  
  const data = list[0]

  console.log(data)
  console.log(data.name)
  if (nameParagraph) {
    nameParagraph.innerHTML = data.name || '';
}
if (about_eventParagraph) {
    about_eventParagraph.innerHTML = data.aboutEvent || '';
}
if (cepParagraph) {
    cepParagraph.innerHTML = data.cep || '';
}
if (numberParagraph) {
    numberParagraph.innerHTML = data.numero || '';
}
if (complementParagraph) {
    complementParagraph.innerHTML = data.complemento || '';
}
if (startHourParagraph) {
    startHourParagraph.innerHTML = data.horaioInicio || '';
}
if (durationHoursParagraph) {
    durationHoursParagraph.innerHTML = data.duracaoEvento || '';
}
if (instrumentosParagraph) {
    instrumentosParagraph.innerHTML = data.vagas || '';
}
}

function uniqueInstrument(data) {
  hashMap = {}
  listUnique = []

  const dataSize = data.length;
  for (let i = 0; i < dataSize; i++) {
      if (!hashMap[data[i].instrumentName]){
          listUnique.push({
              instrumento: data[i].instrumentName,
              quantidade: 0
          });
          hashMap[data[i].instrumentName] = 1;
      }
      else {
          hashMap[data[i].instrumentName] = hashMap[data[i].instrumentName] + 1;
      }
  }

  const listUniqueSize = listUnique.length;
  for  (let j = 0; j < listUniqueSize; j++) {
      listUnique[j].quantidade = hashMap[listUnique[j].instrumento];
  }

  return listUnique;
}

function getVagasView(vagas) {
  const selectEvent = document.getElementById("select-vaga")

  selectEvent.innerHTML = ''

  const dataSize = vagas.length;
    for (let i = 0; i < dataSize; i++) {
        selectEvent.innerHTML += 
            `<a class="dropdown-item" href="#">${vagas[i].instrumento} - Quantidade: ${vagas[i].quantidade}</a>`
        
    }
}