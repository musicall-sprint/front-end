function sendChangePasswordRequest() {
  const emailInput = document.getElementById("inp_email");
  const email = emailInput.value;
  const passwordResetRequest = { email: email };


  fetch('http://localhost:8080/api/password_reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(passwordResetRequest),
  })
  .then(response => {
    if (response.ok) {
        console.log('Password reset request successful.');
        document.getElementById("modal-title").innerHTML = "Código Enviado!"
    
        document.getElementById("modal-body").innerHTML = "Por favor, confira seu e-mail para prosseguir com a mudança de senha"
        
        var modalHeader = document.querySelector('.modal-header');
    
        // Remove a classe existente ("bg-success")
        modalHeader.classList.remove('bg-danger');
    
        // Adiciona a nova classe ("bg-danger") 
        modalHeader.classList.add('bg-success');
  
        return openModal()
    } else if (response.status == 404) {
        document.getElementById("modal-title").innerHTML = "E-mail não encontrado!"
    
        document.getElementById("modal-body").innerHTML = "Por favor, verifique seu e-mail e tente novamente"
        
        var modalHeader = document.querySelector('.modal-header');
    
        // Remove a classe existente ("bg-success")
        modalHeader.classList.remove('bg-success');
    
        // Adiciona a nova classe ("bg-danger") 
        modalHeader.classList.add('bg-danger');
  
        return openModal()
    } else {
        console.error('Password reset request failed.');
        console.log(response)
        document.getElementById("modal-title").innerHTML = "E-mail Inválido!"
    
        document.getElementById("modal-body").innerHTML = "Por favor, insira um e-mail válido e tente novamente"
        
        var modalHeader = document.querySelector('.modal-header');
    
        // Remove a classe existente ("bg-success")
        modalHeader.classList.remove('bg-success');
    
        // Adiciona a nova classe ("bg-danger") 
        modalHeader.classList.add('bg-danger');
  
        return openModal()
    }

    abrirModal()
  })
  .catch(error => {
    console.error('An error occurred:', error);
  });
}

function validateResetPasswordToken() {

    const password = document.getElementById("inp_new_pass")
    const confirmPassword = document.getElementById("inp_confirm_pass")
    const modal = document.getElementById("modal-title");
    const paragraph = document.getElementById("paragraph1");


    console.log(password.value)
    console.log(confirmPassword.value)
    if (password.value != confirmPassword.value) {
        modal.innerHTML = "As senhas não coincidem";
        paragraph.innerHTML = "Por favor, insira duas senhas iguais.";
        return abrirModal()
    }

    const sizePass = password.value.length 
    if (sizePass < 8 || sizePass > 30) {
        modal.innerHTML = "A nova senha é inválida";
        paragraph.innerHTML = "O tamanho da senha deve estar entra 8 a 30 caracteres";
        return abrirModal()
    }

    const url = window.location.href; 
    const token = url.substring(url.lastIndexOf('/') + 1, url.length);
    const requestData = {
        password: password.value,
        token: token
    };


    console.log(`Trying to make a request to /api/password_reset using token: ${token}`)
    console.log(requestData)

    fetch('http://localhost:8080/api/password_reset', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => {
        if (response.ok) {
            console.log('Password reset successful.');
            modal.innerHTML = "Senha alterada com sucesso";
            paragraph.innerHTML = "Parabéns, agora você pode acessar sua conta com sua nova senha";
            
            abrirModal()

        } else {
            console.error('Password reset failed.');
            modal.innerHTML = "Código inválido";
            paragraph.innerHTML = "Por favor, clique no link enviado para o seu e-mail";
            
            abrirModal()
        }
    })
    .catch(error => {
        console.error('An error occurred:', error);
    });
}


function openModal() {
    var modal = new bootstrap.Modal(document.getElementById('success'));
    
    modal.show();
  }

