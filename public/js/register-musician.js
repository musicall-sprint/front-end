document.addEventListener('DOMContentLoaded', function () {
  var nome = sessionStorage.getItem('NOME');
  console.log(nome);
  document.getElementById("nomeDinamico").innerHTML += ` ${nome}!`;
});


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

async function Register() {

  let token = sessionStorage.getItem('TOKEN')

  let urlRegister = "http://localhost:8080/msc/register"

  let urlInstruments = "http://localhost:8080/msc/instrument"

  let cep = document.getElementById("inp_cep").value
  let dadosExtra = document.getElementById("inp_textarea").value
  let instruments = document.querySelector('#multipleSelect').value;

  var instrumentsID = instruments.map(function(element) {
    return parseInt(element, 10); // Converte a string para um número inteiro
  
  });
  
  console.log(instrumentsID)


  let validationResult = await validarCEP(cep); // Usando await para aguardar a validação



  if(validationResult.erro) {
    document.getElementById("modal-title").innerHTML = "CEP Inválido!"

    document.getElementById("modal-body").innerHTML = "Verifique seu CEP e tente novamente."

    var modalHeader = document.querySelector('.modal-header');

    // Remove a classe existente ("bg-danger")
    modalHeader.classList.remove('bg-success');

    // Adiciona a nova classe ("bg-success") 
    modalHeader.classList.add('bg-danger');

    return openModal()
  }

  if (dadosExtra == '') {
    document.getElementById("modal-title").innerHTML = "Sua descrição está vazia!"

    document.getElementById("modal-body").innerHTML = "Esses dados serão divulgados para os organizadores de eventos, então por favor, preencha!"

    var modalHeader = document.querySelector('.modal-header');

    // Remove a classe existente ("bg-danger")
    modalHeader.classList.remove('bg-success');

    // Adiciona a nova classe ("bg-success") 
    modalHeader.classList.add('bg-danger');

    return openModal()
  }

  if(instrumentsID.length == 0) {
    document.getElementById("modal-title").innerHTML = "Escolha pelo menos 1 instrumento!"

    document.getElementById("modal-body").innerHTML = "Você não pode prosseguir sem ao menos 1 instrumento cadastrado. Escolha seus instrumentos e tente novamente."

    var modalHeader = document.querySelector('.modal-header');

    // Remove a classe existente ("bg-danger")
    modalHeader.classList.remove('bg-success');

    // Adiciona a nova classe ("bg-success") 
    modalHeader.classList.add('bg-danger');

    return openModal()
  }

  const instrumentRegister = {
    "fkInstrument": instrumentsID
  }

  const musicianRegister = {
    "description" : dadosExtra,
    "cep" : cep
  }


  const respostaMusicianRegister = await fetch(urlRegister, {
    method: "POST",
    body: JSON.stringify(musicianRegister),
    headers: {
       "Content-type": "application/json",
       "Authorization": `Bearer ${token}`
      }
  });

  const respostaInstrumentRegister = await fetch(urlInstruments, {
    method: "POST",
    body: JSON.stringify(instrumentRegister),
    headers: {
      "Authorization": `Bearer ${token}`, 
      "Content-type": "application/json" }
  });

  

  if(respostaMusicianRegister.status==201 && respostaInstrumentRegister.status==201) {
    document.getElementById("modal-title").innerHTML = "Cadastro finalizado com sucesso!"

    document.getElementById("modal-body").innerHTML = "Te redirecionaremos para a plataforma..."

    var modalHeader = document.querySelector('.modal-header');

    // Remove a classe existente ("bg-danger")
    modalHeader.classList.remove('bg-danger');

    // Adiciona a nova classe ("bg-success") 
    modalHeader.classList.add('bg-success');

    openModal()

    return setTimeout(function () {
      window.location.href = "../public/dash/msc/search-event.html"
    }, 3000)
  } else {
    document.getElementById("modal-title").innerHTML = "Houve um erro ao realizar seu cadastro!"

    document.getElementById("modal-body").innerHTML = "Tente novamente mais tarde."

    var modalHeader = document.querySelector('.modal-header');

    // Remove a classe existente ("bg-danger")
    modalHeader.classList.remove('bg-success');

    // Adiciona a nova classe ("bg-success") 
    modalHeader.classList.add('bg-danger');

    return openModal()
  }

} 
  




async function validarCEP(cep) {
  let url = `https://viacep.com.br/ws/${cep}/json`

  try {
    let response = await fetch(url); // Usando await para aguardar a resposta
    let data = await response.json(); // Usando await para aguardar o JSON

    return data; // Retornando os dados obtidos
  } catch (error) {
    console.error("Erro ao validar CEP:", error);
    return { erro: true };
  }
  

}

function openModal() {
  var modal = new bootstrap.Modal(document.getElementById('success'));
  
  modal.show();
}

function autocompletarCep() {
  const validInput = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
  const validCommand = new Set(["Backspace", "ArrowLeft", "ArrowRight", "Tab"])
  const in_size = inp_cep.value.length

  if (!validCommand.has(event.key)) {
    if (validInput.has(event.key) && in_size <= 7) {
    }
    else {
      event.preventDefault()
    }

  }


}

