function abrirModal(title, paragraph) {
  $('#meuModal').modal('show');
  console.log(title)
  document.getElementById("modal-title").innerHTML = title;
  document.getElementById("paragraph1").innerHTML = paragraph;
}


function abrirModalCriacaoEvento(date) {
  $('#meuModal').modal('show');
  document.getElementById("modal-title").innerHTML = "Criando evento";
  document.getElementById("paragraph1").innerHTML = JSON.stringify(date);
}

function getCreateEventHTML(date) {
  document.getElementById("modal-title").innerHTML = date
  return `
      <div class="row">
          <div class="card">
              <div class="card-body">
                  <div class="d-flex align-items-start align-items-sm-center">
                      <img src="../../dash/org/assets/images/avatar/avatar-1.png" alt="user-avatar" class="d-block rounded" height="100" width="100px" id="uploadedAvatar">
                      <div class="button-wrapper">
                          <label for="upload" class="btn btn-primary me-2 mb-4" tabindex="0">
                              <span class="d-none d-sm-block">Upload new photo</span>
                              <i class="bx bx-upload d-block d-sm-none"></i>
                              <input type="file" id="upload" class="account-file-input" hidden="" accept="image/png, image/jpeg">
                          </label>
                          <p class="text-muted mb-0">Allowed JPG, GIF or PNG. Max size of 800K</p>
                      </div>
                  </div>
              </div>

              <div class="card-body">
                  <div class="row">
                      <div class="mb-3 col-md-6 position-relative">
                          <label for="name" class="form-label">Nome</label>
                          <input class="form-control input-field" type="text" id="inp_name" name="firstName">
                          <div class="invalid-feedback" id="inp_name_message"></div>
                      </div>

                      <div class="mb-3 col-md-6 position-relative">
                          <label for="lastName" class="form-label">Sobre o evento</label>
                          <input class="form-control input-field" type="text" id="inp_about_event">
                          <div class="invalid-feedback" id="inp_about_event_message"></div>
                      </div>

                      <div class="mb-3 col-md-6 position-relative">
                          <label for="cep" class="form-label">Cep</label>
                          <input onkeypress="formatCEPInput()" class="form-control input-field" type="text" id="inp_cep" name="email">
                          <div class="invalid-feedback" id="inp_cep_message"></div>
                      </div>

                      <div class="mb-3 col-md-6 position-relative">
                          <label for="number" class="form-label">Número</label>
                          <input type="text" class="form-control input-field" id="inp_number" name="organization">
                          <div class="invalid-feedback" id="inp_number_message"></div>
                      </div>

                      <div class="mb-3 col-md-6 position-relative">
                          <label for="complement" class="form-label">Complemento</label>
                          <input type="text" class="form-control input-field" id="inp_complement" name="organization">
                          <div class="invalid-feedback" id="inp_complement_message"></div>
                      </div>

                      <div class="mb-3 col-md-6 position-relative">
                          <label for="startHour" class="form-label">Horário de início</label>
                          <input pattern="([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]" class="form-control input-field" id="inp_start_hour" name="organization">
                          <div class="invalid-feedback" id="inp_start_hour_message"></div>
                      </div>

                      <div class="mb-3 col-md-6 position-relative">
                          <label for="durationHours" class="form-label">Duração evento em horas</label>
                          <input type="text" class="form-control input-field" id="inp_duration_hours" name="organization">
                          <div class="invalid-feedback" id="inp_duration_hours_message"></div>
                      </div>


                      <div class="mb-3 col-md-6 position-relative">
                          <select id="multipleSelect" multiple name="native-select" placeholder="Escolha um ou mais instrumentos"
                            data-search="true" data-silent-initial-value-set="true">
                            <option value="1">Violão</option>
                            <option value="2">Guitarra</option>
                            <option value="3">Bateria</option>
                          </select>
                          <div class="invalid-feedback" id="inp_duration_hours_message"></div>
                          </div>
                     </div>


                      <div class="mt-2">
                          <button onclick="createNewEvent()" class="btn btn-primary me-2">Criar evento</button>
                      </div>

                  </div>
              </div>
  `
}


function getCreateEventJobHTML() {
  return `
      <div class="row">
          <div class="card">
              <div class="card-body">

                  <div class="dropdown">
                          <button class="btn btn-primary dropdown-toggle me-1" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              Primary
                          </button>
                          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                              <div class="form-check">
                                  <div class="checkbox">
                                      <input type="checkbox" id="checkbox1" class="form-check-input" checked="">
                                      <label for="checkbox1">Touch me!</label>
                                  </div>
                              </div>
                              <div class="form-check">
                                  <input type="checkbox" id="checkbox1" class="form-check-input" checked="">
                                  <label for="checkbox1">Touch me!</label>
                              </div>
                              <div class="form-check">
                                  <input type="checkbox" id="checkbox1" class="form-check-input" checked="">
                                  <label for="checkbox1">Touch me!</label>
                              </div>
                          </div>
                      </div>

              </div>
  `
}

function createCustomModal(content) {
  const modalBody = document.getElementById('modal-body');
  modalBody.innerHTML = content;
  $('#meuModal').modal('show');
}

function abrirModal() {

  $('#meuModal').modal('show');
}

function fecharModal() {
  $('#meuModal').modal('hide');
}

function fecharModal2() {
  $('#viewModal').modal('hide');
}

function abrirModalBootStrap(tipo='') {
  const modalHeader = document.querySelector('.modal-header');
  const modal = new bootstrap.Modal(document.getElementById('success'));
  if (tipo == 'error')  {
      modalHeader.classList.remove('bg-success');
      modalHeader.classList.add('bg-danger');
      document.getElementById("modal-title-alert").innerHTML = "Criação evento inválida"
      document.getElementById("modal-body-alert").innerHTML = "Não foi possível criar o evento"
  }

  modal.show()
}

