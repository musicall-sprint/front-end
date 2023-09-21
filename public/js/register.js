
async function Register() {

  const url = "http://localhost:8080/api/register"

  const email = document.getElementById("inp_email").value;
  const name = document.getElementById("inp_name").value;
  const cpfLimpo = document.getElementById("inp_cpf").value;
  const birthdate = document.getElementById("inp_birthdate").value;
  const celLimpo = document.getElementById("inp_cel").value;
  const pwd = document.getElementById("inp_pwd").value;
  const pwdconfirm = document.getElementById("inp_pwdconfirm").value;

  const cel = celLimpo.replace(/[-\s]/g, '')
  const cpf = cpfLimpo.replace(/[\.-]/g, '')

  console.log(cel)
  console.log(cpf)
  console.log(birthdate)

  let type = ""

  if (opt_msc.checked == false && opt_org.checked == false) {
    document.getElementById("modal-title").innerHTML = "Usuário não selecionado!"

    document.getElementById("modal-body").innerHTML = "Por favor, selecione um tipo de usuário e tente novamente."


    var modalHeader = document.querySelector('.modal-header');

    // Remove a classe existente ("bg-success")
    modalHeader.classList.remove('bg-success');

    // Adiciona a nova classe ("bg-danger") 
    modalHeader.classList.add('bg-danger');
    return openModal()
  } else
    if (opt_msc.checked == true) {
      type = "MSC"
    } else {
      type = "ORG"
    }

  if (validarEmail(email)) {
    console.log("E-mail valido")
  } else {
    document.getElementById("modal-title").innerHTML = "E-mail Inválido!"

    document.getElementById("modal-body").innerHTML = "Por favor, confira se escreveu o e-mail corretamente e tente novamente."


    var modalHeader = document.querySelector('.modal-header');

    // Remove a classe existente ("bg-success")
    modalHeader.classList.remove('bg-success');

    // Adiciona a nova classe ("bg-danger") 
    modalHeader.classList.add('bg-danger');
    return openModal()
  }

  if (validarNome(name)) {
    console.log("Nome Válido")
  } else {
    document.getElementById("modal-title").innerHTML = "Nome Inválido!"

    document.getElementById("modal-body").innerHTML = "Por favor, confira se todos os caracteres estão corretos ou se o campo não está em branco e tente novamente."


    var modalHeader = document.querySelector('.modal-header');

    // Remove a classe existente ("bg-success")
    modalHeader.classList.remove('bg-success');

    // Adiciona a nova classe ("bg-danger") 
    modalHeader.classList.add('bg-danger');
    return openModal()
  }

  if (validarCPF(cpf)) {
    console.log("CPF válido");
  } else {
    document.getElementById("modal-title").innerHTML = "CPF Inválido!"

    document.getElementById("modal-body").innerHTML = "Por favor, confira se todos os números estão corretos ou se o campo não está em branco e tente novamente."


    var modalHeader = document.querySelector('.modal-header');

    // Remove a classe existente ("bg-success")
    modalHeader.classList.remove('bg-success');

    // Adiciona a nova classe ("bg-danger") 
    modalHeader.classList.add('bg-danger');
    return openModal()
  }

  validarDataNascimento(birthdate)

  if (validarCelular(celLimpo)) {
    console.log("Telefone Válido")
  } else {
    document.getElementById("modal-title").innerHTML = "Telefone Inválido!"

    document.getElementById("modal-body").innerHTML = "Por favor, confira se segue nossa formatação e tente novamente "


    var modalHeader = document.querySelector('.modal-header');

    // Remove a classe existente ("bg-success")
    modalHeader.classList.remove('bg-success');

    // Adiciona a nova classe ("bg-danger") 
    modalHeader.classList.add('bg-danger');
    return openModal()
  }

  if (validarSenha(pwd)) {
    console.log("Senha Válida")
  } else {
    document.getElementById("modal-title").innerHTML = "Senha Inválida!"

    document.getElementById("modal-body").innerHTML = "Sua senha deve conter os seguintes requisitos: 1 Letra Minúscula, 1 Letra Maiúscula, 1 Número e 1 Caractere Especial."


    var modalHeader = document.querySelector('.modal-header');

    // Remove a classe existente ("bg-success")
    modalHeader.classList.remove('bg-success');

    // Adiciona a nova classe ("bg-danger") 
    modalHeader.classList.add('bg-danger');
    return openModal()

  }

  if (pwd != pwdconfirm) {
    document.getElementById("modal-title").innerHTML = "As senhas não coincidem!"

    document.getElementById("modal-body").innerHTML = "Por favor, confira se ambas as senhas estão corretas e tente novamente"


    var modalHeader = document.querySelector('.modal-header');

    // Remove a classe existente ("bg-success")
    modalHeader.classList.remove('bg-success');

    // Adiciona a nova classe ("bg-danger") 
    modalHeader.classList.add('bg-danger');
    return openModal()

  }


  const user = {
    "type": type,
    "name": name,
    "cpf": cpf,
    "birthDate": birthdate,
    "telephone": celLimpo,
    "email": email,
    "password": pwd
  }


  const respostaCadastro = await fetch(url, {
    method: "POST",
    body: JSON.stringify(user),
    headers: { "Content-type": "application/json" }
  });

  if (respostaCadastro.status == 201) {
    document.getElementById("modal-title").innerHTML = "Cadastro Realizado!"

    document.getElementById("modal-body").innerHTML = "Agora você será redirecionado para o Login..."

    var modalHeader = document.querySelector('.modal-header');

    // Remove a classe existente ("bg-danger")
    modalHeader.classList.remove('bg-danger');

    // Adiciona a nova classe ("bg-success") 
    modalHeader.classList.add('bg-success');

    openModal()

    return setTimeout(function () {
      window.location.href = "auth-login.html"
    }, 4000)


  } else if (respostaCadastro.status == 409) {
    document.getElementById("modal-title").innerHTML = "Usuário já existe!"

    document.getElementById("modal-body").innerHTML = "Este usuário já existe."


    var modalHeader = document.querySelector('.modal-header');

    // Remove a classe existente ("bg-success")
    modalHeader.classList.remove('bg-success');

    // Adiciona a nova classe ("bg-danger") 
    modalHeader.classList.add('bg-danger');
    return openModal()

  } else if (400) {
    document.getElementById("modal-title").innerHTML = "Erro ao realizar o Cadastro."

    document.getElementById("modal-body").innerHTML = "Sei lá que porra que deu aqui"

    var modalHeader = document.querySelector('.modal-header');

    // Remove a classe existente ("bg-success")
    modalHeader.classList.remove('bg-success');

    // Adiciona a nova classe ("bg-danger") 
    modalHeader.classList.add('bg-danger');

    return openModal()
  } else {
    document.getElementById("modal-title").innerHTML = "Erro ao realizar o Cadastro!"

    document.getElementById("modal-body").innerHTML = "Verifique todas as credenciais e tente novamente."


    var modalHeader = document.querySelector('.modal-header');

    // Remove a classe existente ("bg-success")
    modalHeader.classList.remove('bg-success');

    // Adiciona a nova classe ("bg-danger") 
    modalHeader.classList.add('bg-danger');
    return openModal()

  }


}

// Funções de Validação
function openModal() {
  var modal = new bootstrap.Modal(document.getElementById('success'));

  modal.show();
}


function validarEmail(email) {
  // Expressão regular para validar o formato do e-mail
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Testa se o e-mail corresponde ao formato da expressão regular
  return regex.test(email);
}

function validarNome(name) {
  // Expressão regular para validar o nome
  const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+([\s'][A-Za-zÀ-ÖØ-öø-ÿ]+)*([\s][A-Za-zÀ-ÖØ-öø-ÿ]+)+$/;

  // Testa se o nome corresponde ao formato da expressão regular
  return regex.test(name);
}

function validarCPF(cpf) {
  // Remove caracteres não numéricos do CPF
  cpf = cpf.replace(/\D/g, '');

  // Verifica se o CPF tem 11 dígitos
  if (cpf.length !== 11) {
    return false;
  }

  // Verifica se todos os dígitos são iguais (ex.: 111.111.111-11)
  if (/^(\d)\1+$/.test(cpf)) {
    return false;
  }

  // Calcula o primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let digit = 11 - (sum % 11);
  if (digit === 10 || digit === 11) {
    digit = 0;
  }
  if (digit !== parseInt(cpf.charAt(9))) {
    return false;
  }

  // Calcula o segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  digit = 11 - (sum % 11);
  if (digit === 10 || digit === 11) {
    digit = 0;
  }
  if (digit !== parseInt(cpf.charAt(10))) {
    return false;
  }

  // CPF válido
  return true;
}

function autocompletarCpf() {
  const validInput = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
  const validCommand = new Set(["Backspace", "ArrowLeft", "ArrowRight", "Tab"])
  const in_size = inp_cpf.value.length

  if (!validCommand.has(event.key)) {
    if (validInput.has(event.key) && in_size <= 13) {
      if (in_size == 3 || in_size == 7) inp_cpf.value += "."
      if (in_size == 11) inp_cpf.value += "-"
    }
    else {
      event.preventDefault()
    }

  }
}
function autocompletarTelefone() {
  const validInput = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
  const validCommand = new Set(["Backspace", "ArrowLeft", "ArrowRight", "Tab"])
  const in_size = inp_cel.value.length

  if (!validCommand.has(event.key)) {
    if (validInput.has(event.key) && in_size <= 12) {
      if (in_size == 2) inp_cel.value += " "
      if (in_size == 8) inp_cel.value += "-"
    }
    else {
      event.preventDefault()
    }

  }
}


function validarDataNascimento(birthdate) {

  const hoje = new Date();
  const dataNascimentoObj = new Date(birthdate);
  const limiteIdade = new Date();
  limiteIdade.setFullYear(limiteIdade.getFullYear() - 100);

  if (dataNascimentoObj > hoje || dataNascimentoObj < limiteIdade) {
    document.getElementById("modal-title").innerHTML = "Data de Nascimento Inválida!"

    document.getElementById("modal-body").innerHTML = "Verifique se sua data de nascimento está correta e tente novamente"


    var modalHeader = document.querySelector('.modal-header');

    // Remove a classe existente ("bg-success")
    modalHeader.classList.remove('bg-success');

    // Adiciona a nova classe ("bg-danger") 
    modalHeader.classList.add('bg-danger');
    return openModal()

  } else {
    console.log("Data de nascimento válida.");
  }
}

function validarCelular(celLimpo) {

  const regex = /^[1-9]{2} [9][0-9][0-9]{3}\-[0-9]{4}$/

  return regex.test(celLimpo);
}

function validarSenha(pwd) {

  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*\d).+$/

  return regex.test(pwd)
}

async function verificarProspect() {
  event.preventDefault()
  const email = inp_email.value
  const url = "http://localhost:8080/api/prospect/" + email

  if (validarEmail(email)) {
    console.log("Email válido")
  } else {
    document.getElementById("modal-title").innerHTML = "E-mail Inválido!"
    document.getElementById("paragraph1").innerHTML = "Por favor, forneça um e-mail válido ou verifique se o campo não está em branco."
    return abrirModal()
  }

  const response = await fetch(url);

  if (response.status == 204) {
    document.getElementById("modal-title").innerHTML = "Email Promocional não encontrado!"

    document.getElementById("modal-body").innerHTML = "Prossiga normalmente com o cadastro"


    var modalHeader = document.querySelector('.modal-header');

    // Remove a classe existente ("bg-success")
    modalHeader.classList.remove('bg-success');

    // Adiciona a nova classe ("bg-danger") 
    modalHeader.classList.add('bg-danger');
    return openModal()
  }

  else if (response.status == 200) {


    const data = await response.json()
    console.log(data)
    inp_name.value = data.name
    inp_cel.value = data.telefone
    document.getElementById("modal-title").innerHTML = "Email Promocional Encontrado!"

    document.getElementById("modal-body").innerHTML = `Vimos que você respondeu nosso formulário que acessou através do ${data.midia}! Finalize o cadastro normalmente.`


    var modalHeader = document.querySelector('.modal-header');

    // Remove a classe existente ("bg-success")
    modalHeader.classList.remove('bg-success');

    // Adiciona a nova classe ("bg-danger") 
    modalHeader.classList.add('bg-danger');
    return openModal()


  }
}


