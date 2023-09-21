async function autenticarUsuario() {
    const token = sessionStorage.getItem('TOKEN')

    const url = "http://localhost:8080/usr/auth"
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    });

    if (response.status != 200 && window.location != "http://localhost:3000/") {
      sessionStorage.removeItem('TOKEN')
      return window.location = "http://localhost:3000/"
    }
    else {
      const tipoUsuario = await response.json()
      autenticarTipo(tipoUsuario)
    }
    //     if (data == "MSC" && window.location != "http://localhost:3000/msc") {
    //         window.location = "http://localhost:3000/msc"
    //     }
    //     else if (data == "ORG" && window.location != "http://localhost:3000/org") {
    //         window.location = "http://localhost:3000/org"
    //     }
    // }
}

function autenticarTipo(tipoUsuario) {
    const urlSplit = window.location.href.split('/');
    const sizeUrl = urlSplit.length;
    const typeUrl = urlSplit[sizeUrl - 2];

    if (typeUrl.toUpperCase() != tipoUsuario) {
        console.log(urlSplit[sizeUrl - 2]);
        urlSplit[sizeUrl - 2] = tipoUsuario.toLowerCase();
        const newUrl = urlSplit.join("/");

        window.location = newUrl;
    }
}

function deslogar() {
    sessionStorage.TOKEN = ""
    window.location = "/"
}
