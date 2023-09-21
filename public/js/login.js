
async function Login() {

  let resultFromVerifyDataUser = false  

    const email = document.getElementById("inp_email").value;
    const pwd = document.getElementById("inp_pwd").value;
    

    let type = ""

    if(opt_msc.checked == false && opt_org.checked == false) { 
      document.getElementById("modal-title").innerHTML = "Usuário não selecionado!"
    
      document.getElementById("modal-body").innerHTML = "Por favor, selecione um tipo de usuário e tente novamente."
  
  
      var modalHeader = document.querySelector('.modal-header');
  
      // Remove a classe existente ("bg-success")
      modalHeader.classList.remove('bg-success');
  
      // Adiciona a nova classe ("bg-danger") 
      modalHeader.classList.add('bg-danger');
      return openModal()
    } else 
    if(opt_msc.checked == true) {
        type = "MSC"   
    } else {
        type = "ORG"
    }            
    
    if(validarEmail(email)) {
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


 



    url = "http://localhost:8080/api/login"

    const login = {
        "email": email,
        "password": pwd,
        "type": type
    }


    const responseLogin = await fetch(url, {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(login),
    })
    const data = await responseLogin.json()

    var token = data.token
    var id = data.id
    var nome = data.name
    
    sessionStorage.setItem('TOKEN', token)
    sessionStorage.setItem('ID', id)
    sessionStorage.setItem('NOME', nome)

    if(type == 'MSC') {
    resultFromVerifyDataUser = await verifyDataUser(id, token);
    
  }

  

    if(responseLogin.status == 200) {
      if(type == 'MSC' && resultFromVerifyDataUser == true) {
      
      document.getElementById("modal-title").innerHTML = "Logando!"
    
      document.getElementById("modal-body").innerHTML = "Por favor, aguarde..."
      
      var modalHeader = document.querySelector('.modal-header');
  
      // Remove a classe existente ("bg-success")
      modalHeader.classList.remove('bg-danger');
  
      // Adiciona a nova classe ("bg-danger") 
      modalHeader.classList.add('bg-success');

      openModal()

    
     
       return setTimeout(function () {
          window.location.href = "../public/dash/msc/search-event.html"
        }, 4000)

      

       

    } else if(type == "MSC" && resultFromVerifyDataUser == false) {
            
      document.getElementById("modal-title").innerHTML = "Faltam alguns dados!"
    
      document.getElementById("modal-body").innerHTML = "Por favor, aguarde..."
      
      var modalHeader = document.querySelector('.modal-header');
  
      // Remove a classe existente ("bg-success")
      modalHeader.classList.remove('bg-danger');
  
      // Adiciona a nova classe ("bg-danger") 
      modalHeader.classList.add('bg-success');

      openModal()

      return setTimeout(function () {
      window.location.href = "auth-register-musician.html"
      }, 4000)

    }
   else if(type == "ORG") {
            
    document.getElementById("modal-title").innerHTML = "Logando!"
  
    document.getElementById("modal-body").innerHTML = "Por favor, aguarde..."
    
    var modalHeader = document.querySelector('.modal-header');

    // Remove a classe existente ("bg-success")
    modalHeader.classList.remove('bg-danger');

    // Adiciona a nova classe ("bg-danger") 
    modalHeader.classList.add('bg-success');

    openModal()

    return setTimeout(function () {
      window.location.href = "../public/dash/org/events.html"
    }, 4000)

  }else {
      document.getElementById("modal-title").innerHTML = "Login não encontrado!"
    
      document.getElementById("modal-body").innerHTML = "Por favor, confira as credenciais e tente novamente."
  
  
      var modalHeader = document.querySelector('.modal-header');
  
      // Remove a classe existente ("bg-success")
      modalHeader.classList.remove('bg-success');
  
      // Adiciona a nova classe ("bg-danger") 
      modalHeader.classList.add('bg-danger');
      return openModal()
    }
  }
    
}

async function verifyDataUser(id, token) {
  const url = `http://localhost:8080/msc/validation-register/${id}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {"Authorization": `Bearer ${token}`},
    });

    if (!response.ok) {
      throw new Error('Resposta não OK');
    }

    const data = await response.json();
    console.log(data)

    return data === true;
  } catch (error) {
    console.error("Deu erro", error);
    throw error;
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




