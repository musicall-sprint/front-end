async function loadArtist() {
    const boxInfo = document.querySelector(".box_events");
    const filterDiv = boxInfo.querySelector(".icon_filter");

    const instruments = document.getElementsByClassName("instruments");

    const instrumentsId = [];
    for (let i = 0; i < instruments.length; i++) {
        if (instruments[i].checked) instrumentsId.push(instruments[i].id);
    }

    const url = "http://localhost:8080/org/musician/event-job/1";
    const filterEventsRequest = {
        date: checkbox_data.checked && filter_inpt_date.value != null ? filter_inpt_date.value : null,
        cep: checkbox_cep.checked && filter_inpt_cep.value != null ? filter_inpt_cep.value : null,
        instrumentsId: instrumentsId.length > 0 ? instrumentsId : null
    };

    console.log(filterEventsRequest);

    const token = sessionStorage.TOKEN;
    console.log("Objeto enviado: " + JSON.stringify(filterEventsRequest));

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(filterEventsRequest)
    });

    try {
        const eventsResponse = await response.json();
        console.log(eventsResponse);
        boxInfo.innerHTML = `
        <div class="icon_filter" onclick="showFilter()">
            <img src="img/icon-filter.png" alt="">
            <p>Filtrar</p>
        </div>`;
        eventsResponse.forEach(function (artist) {
            // const dataFormatada = converterFormatoData(artist.eventDate);

            const newDiv = document.createElement("div");
            newDiv.className = "box_info";
            newDiv.innerHTML = `
            <div class="img_info_artist"><img src="${artist.imageUrl}" alt=""></div>
                <div class="more_info">
                    <h1 class="more_info_artist">+</h1>
                    <ul class="info_artist">
                        <li class="name_artist">${artist.name}</li>
                        <li>${artist.instrumentName}</li>
                        <li>Distância: ${formatMetersToKilometers(artist.distance)}</li>
                    </ul>
                </div>
            </div>`;
            boxInfo.insertBefore(newDiv, filterDiv.nextSibling);
        });
    } catch (error) {
        boxInfo.innerHTML = `
        <div class="icon_filter" onclick="showFilter()">
            <img src="img/icon-filter.png" alt="">
            <p>Filtrar</p>
        </div>`;
        document.getElementById("modal-title").innerHTML = "Não encontramos artistas";
        document.getElementById("paragraph1").innerHTML = "Procure novamente";
        return abrirModal();
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
    loadArtist(filtros);
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

function abrirModal() {
    $('#meuModal').modal('show');
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