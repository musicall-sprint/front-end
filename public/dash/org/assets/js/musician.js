const eventHash = {}
function metersToKilometers(meters) {
    // 1 kilometer is equal to 1000 meters
    const kilometers = meters / 1000;
    return kilometers.toFixed(1);
  }
  
  function loadMusicianView(data) {
      const tableMusician = document.getElementById("table-musician");
      const content = data.content;
  
      tableMusician.innerHTML = "";
      for (let i = 0; i < content.length; i++) {
          tableMusician.innerHTML += `
                  <tr>
                      <td> <div class="d-flex align-items-center">
                              <img
                              src="${content[i].imageUrl}"
                              class="rounded-circle"
                              alt=""
                              style="width: 45px; height: 45px"
                              />
                              <div class="ms-3">
                                  <p class="fw-bold mb-1">${content[i].name}</p>
                              </div>
                          </div>
                      </td>
                      <td>${content[i].instrumentName}</td>
                      <td>${metersToKilometers(content[i].distance)}Km</td>
                      <td><button class="btn btn-primary me-2">Convidar</button></td>
  
                  </tr>
          `
      }
  }
  
  
  async function loadMusicianFetch(inpInstrumentId) {
      const request = {};
      const instrumentId = inpInstrumentId;
      const url = `http://localhost:8080/org/musician/event-job/${instrumentId}?page=0&size=10`;
      const token = sessionStorage.TOKEN;
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Authorization': 'Bearer ' + token,
              'Content-Type': "application/json"
          },
          body: JSON.stringify(request)
      }).then(res => res.json());
  
      return response;
  }
  
  async function loadMusician(id=1) {
      const data = await loadMusicianFetch(id);
  
      loadMusicianView(data);
  }
  
  function loadSelectEventView(data) {
    const dataSize = data.length;
    const selectEvent = document.getElementById("select-event");

    document.getElementById('dropdownMenuButtonSec');

    console.log(selectEvent);
    console.log(dataSize);

    for (let i = 0; i < dataSize; i++) {
        eventHash[data[i].id] = data[i];
        selectEvent.innerHTML += 
            `<a onclick="loadEventJob(${data[i].id})" class="dropdown-item" href="#">${data[i].name}</a>`
        
    }
}  
async function loadSelectEvent() {
    const data = await getEventInfo();

    loadSelectEventView(data);
}

async function getEventInfo() {
    const url = "http://localhost:8080/org/event";
    const token = sessionStorage.TOKEN
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    }).then(res => res.json());
    return response;
}

function loadEventJob(id) {
    const data = eventHash[id].eventJobs;
    document.getElementById("dropdownMenuButtonSec").innerHTML = eventHash[id].name

    const selectVagas = document.getElementById('select-vaga');
    selectVagas.innerHTML = ""
    console.log("oie");
    console.log(eventHash);
    for (let i = 0; i < data.length; i++) {
        console.log(selectVagas);
        if (!instrumentHashSet[data[i].instrumentName]){
            selectVagas.innerHTML += `<a value="${data[i].id}" onclick="changeEventJobName('${data[i].instrumentName}')" class="dropdown-item" href="#">${data[i].instrumentName}</a>`
            instrumentHashSet[data[i].instrumentName] = true;
        }
    }
}