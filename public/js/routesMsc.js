

async function loadEvents() {

   
   
    
    var checkboxData = document.getElementById("checkbox1");
    var checkboxCEP = document.getElementById("checkbox2");
    var checkboxInstruments = document.getElementById("checkbox3");

    let instruments = document.querySelector('#multipleSelect').value;

    var instrumentsID = instruments.map(function(element) {
      return parseInt(element, 10); // Converte a string para um número inteiro
    
    });

    // const instrumentsId = []
    // for (let i = 0; i < instruments.length; i++) {
    //     if (instruments[i].checked) instrumentsId.push(instruments[i].id)
    // }

    const url = "http://localhost:8080/msc/event";
    const filterEventsRequest = {
        date: checkboxData.checked && filter_inpt_date.value != null ? filter_inpt_date.value : null,
        cep: checkboxCEP.checked && filter_inpt_cep.value != null ? filter_inpt_cep.value : null,
        instrumentsId:checkboxInstruments.checked && instrumentsID.length > 0 ? instrumentsID : null
    };

    console.log(filterEventsRequest)

    const token = sessionStorage.TOKEN
    console.log("Objeto enviado: " + JSON.stringify(filterEventsRequest))

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(filterEventsRequest)
    });
    const tbody = document.getElementById("tableBody");

    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
    
    try {
    const eventsResponse = await response.json();

        console.log(eventsResponse)
        

        eventsResponse.forEach(function (item) {
            const dataFormatada = converterFormatoData(item.eventDate);
            const distanciaFormatada = formatMetersToKilometers(item.distance)
            const row = document.createElement("tr");

            const idCell = document.createElement("td");
            idCell.textContent = item.id;

            const nomeCell = document.createElement("td");
            nomeCell.textContent = item.nome;
      
            const imageUrlCell = document.createElement("td");
            const imageUrlImg = document.createElement("img");
            imageUrlImg.src = item.imageUrl;
            imageUrlCell.appendChild(imageUrlImg);
      
            const eventDateCell = document.createElement("td");
            
            eventDateCell.textContent = dataFormatada;
      
            const startHourCell = document.createElement("td");
            startHourCell.textContent = item.startHour;
      
            const cepCell = document.createElement("td");
            cepCell.textContent = item.cep;
      
            const distanceCell = document.createElement("td");
            distanceCell.textContent = distanciaFormatada;
      
            const detalhesCell = document.createElement("td");
            const detalhesButton = document.createElement("button");
            detalhesButton.classList.add("btn", "btn-primary");
            detalhesButton.textContent = "Ver Detalhes";
            detalhesCell.appendChild(detalhesButton);
            
            
            row.appendChild(nomeCell)
            row.appendChild(eventDateCell);
            row.appendChild(startHourCell);
            row.appendChild(distanceCell);
            row.appendChild(detalhesCell);
      
            tbody.appendChild(row);
        });
    } catch(error) {
        if (error instanceof SyntaxError && error.message === 'Unexpected end of JSON input') {
            document.getElementById("modal-title").innerHTML = "Não encontramos eventos!"

            document.getElementById("modal-body").innerHTML = "Use outros filtros e tente novamente"

            openModal()
            return resetModal()
        } else {
            throw error; 
        }
    }
}
    


function formatMetersToKilometers(meters) {
    if (meters < 50) {
        return '50 m';
    }

    const kilometers = meters / 1000;

    if (kilometers < 1) {
        const formattedMeters = Math.round(meters);
        return formattedMeters + ' m';
    }

    const formattedKilometers = kilometers.toFixed(2);
    return formattedKilometers + ' km';
}



async function login() {
    const url = "http://localhost:8080/api/login";
    const data = {
        email: "john2.doe@example.com",
        password: "password123",
        type: "MSC"
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(data.token);

        var token = response.token

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
        }

        // Resto do código em caso de sucesso

    } catch (error) {
        console.log('Erro na requisição:', error);
    }


    sessionStorage.TOKEN = token
}

function getSelectedFilters() {
    var filtros = {};

    // Verifica se a data está selecionada
    var checkboxData = document.querySelector('input[name="checkbox_date"]');
    if (checkboxData.checked) {
        var data = document.querySelector('input[name="date_filter"]').value;
        filtros.data = data;
    }

    // Verifica se o CEP está selecionado
    var checkboxCEP = document.querySelector('input[name="checkbox_region"]');
    if (checkboxCEP.checked) {
        var cep = document.querySelector('.in_region').value;

        // Remove caracteres não numéricos do CEP
        cep = cep.replace(/\D/g, '');

        // Verifica se o CEP possui o formato correto
        if (validarCEP(cep)) {
            filtros.cep = cep;
        } else {
            // Trata quando o CEP digitado é inválido
            alert('CEP inválido! Por favor, digite um CEP válido.');
            return null;
        }
    }

    // Verifica se algum instrumento está selecionado
    var checkboxesInstrumentos = document.querySelectorAll('.filters_instruments input[type="checkbox"]');
    checkboxesInstrumentos.forEach(function (checkbox) {
        if (checkbox.checked) {
            if (!filtros.instrumentos) {
                filtros.instrumentos = [];
            }
            filtros.instrumentos.push(checkbox.id);
        }
    });

    // Retorna o objeto JSON com os filtros selecionados
    console.log("=================================")
    console.log(filtros);
    console.log("=================================")
    loadEvents(filtros);
}

function validarDataFutura(data) {
    // Obtém a data atual
    var dataAtual = new Date();

    // Converte a data fornecida para o objeto Date
    var dataSelecionada = new Date(data);

    // Verifica se a data selecionada é maior que a data atual
    if (dataSelecionada > dataAtual) {
        return true;
    } else {
        // Retorna false se a data selecionada não for futura
        return false;
    }
}

function formatCEPInput() {
    var inputCEP = document.querySelector('.in_region');

    inputCEP.addEventListener('input', function (e) {
        var cep = e.target.value;

        // Remove caracteres não numéricos
        cep = cep.replace(/\D/g, '');

        // Limita a quantidade de dígitos em 8
        if (cep.length > 8) {
            cep = cep.slice(0, 8);
        }

        // Formata o CEP no formato xxxxx-xxx
        if (cep.length > 5) {
            cep = cep.replace(/(\d{5})(\d{1,3})/, '$1-$2');
        }

        // Atualiza o valor do input com o CEP formatado
        e.target.value = cep;
    });

    inputCEP.addEventListener('keydown', function (e) {
        var cep = e.target.value;

        // Impede que continue digitando após atingir 8 dígitos
        if (cep.length >= 9 && e.key !== 'Backspace' && e.key !== 'Delete') {
            e.preventDefault();
        }
    });
}

function validarCEP(cep) {
    // Remove caracteres não numéricos do CEP
    cep = cep.replace(/\D/g, '');

    // Verifica se o CEP possui a quantidade correta de dígitos
    if (cep.length !== 8) {
        return false;
    }

    return true;
}

function converterFormatoData(data) {
    // Divide a data nos componentes de ano, mês e dia
    var partesData = data.split("-");
    var ano = partesData[0];
    var mes = partesData[1];
    var dia = partesData[2];

    // Cria um objeto Date com o formato original
    var dataObjeto = new Date(ano, mes - 1, dia);

    // Obtém os componentes individuais da data formatada
    var diaFormatado = String(dataObjeto.getDate()).padStart(2, '0');
    var mesFormatado = String(dataObjeto.getMonth() + 1).padStart(2, '0');
    var anoFormatado = dataObjeto.getFullYear();

    // Formata a data no formato desejado (dd/mm/yyyy)
    var dataFormatada = diaFormatado + "/" + mesFormatado + "/" + anoFormatado;

    return dataFormatada;
}



function autocompletarCep() {
    const validInput = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    const validCommand = new Set(["Backspace", "ArrowLeft", "ArrowRight", "Tab"])
    const in_size = filter_inpt_cep.value.length

    if (!validCommand.has(event.key)) {
        if (validInput.has(event.key) && in_size <= 7) {
        }
        else {
          event.preventDefault()
        }
    
      }
}

function loadInstruments() {


    const url = "http://localhost:8080/usr/instruments"
  
    const token = sessionStorage.getItem('TOKEN')
  
    fetch(url, {
      method: 'GET',
      headers: {
        // Aqui você pode definir os cabeçalhos da solicitação, se necessário
        // Por exemplo, headers: { 'Content-Type': 'application/json' }
        'Authorization': `Bearer ${token}`
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro de rede ou resposta não OK');
        }
        // Se a resposta for OK, você pode processar os dados aqui
        return response.json(); // ou response.text(), response.blob(), etc., dependendo do tipo de resposta
      })
      .then(data => {
        
        console.log(data);
     
        data.forEach(item => {
          
          document.querySelector('#multipleSelect').addOption({
              label:`${item.name}`, value:`${item.id}`
          });
  
        })
      })
  
      
    VirtualSelect.init({
      ele: 'select',
      multiple: true,
      searchPlaceholderText: 'Buscar...',
      allOptionsSelectedText: 'Todos',
      optionsSelectedText: 'opções selecionadas'
      });
  }
  function openModal() {
    var modal = new bootstrap.Modal(document.getElementById('modal'));
    
    modal.show();
  }
  function resetModal() {
    document.getElementById("modal-title").innerHTML = "Selecione os filtros que quer utilizar"

    document.getElementById("modal-body").innerHTML = `<input type="checkbox" id="checkbox3" class="form-check-input">
    <label for="checkbox3">Instrumentos</label>
    <div class="form-group">
        <select id="multipleSelect" name="native-select"
            placeholder="Escolha um ou mais instrumentos" data-search="true"
            data-silent-initial-value-set="true">
        </select>



        <script type="text/JavaScript" src="../../js/virtual-select.min.js"></script>

    </div>
    <br>
    <input type="checkbox" id="checkbox1" class="form-check-input">
    <label for="checkbox1">Data</label>
    <div class="form-group">

        <input id="filter_inpt_date" type="date" placeholder="Data do Evento"
            class="form-control" disabled>
    </div>
    <br>
    <input type="checkbox" id="checkbox2" class="form-check-input">
    <label for="checkbox2">CEP</label>
    <div class="form-group">

        <input id="filter_inpt_cep" type="text" placeholder="01406-000" class="form-control"
            onkeydown="autocompletarCep()" disabled>
    </div>
    `
  }
