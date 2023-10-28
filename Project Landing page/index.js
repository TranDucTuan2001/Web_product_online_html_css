const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const fullNameRegister = $('#fullName-register');
const fullNameLogin = $('#fullName-login');
const emailRegister = $('#email-register');
const emailLogin = $('#email-login');
const passwordRegister = $('#password-register');
const passwordLogin = $('#password-login');
const btnRegister = $('#btn-register');
const btnLogin = $('#btn-login');
const messageSuccess = $('.message-success');
const messageWarning = $('.message-warning');
const messageError = $('.message-error');
const loading = $('.loader');
const overlay = $('.overlay');

const URLRegister =
  'https://server-test-app-login.herokuapp.com/v1/api/auth/register';
const URLLogin =
  'https://server-test-app-login.herokuapp.com/v1/api/auth/login';

// Handle event click button register
btnRegister.addEventListener('click', (e) => {
  e.preventDefault();
  btnRegister.setAttribute('disabled', true);

  fetch(URLRegister, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: emailRegister.value,
      fullName: fullNameRegister.value,
      password: passwordRegister.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      if (data.status) showLoading(showSuccessRegister);

      if (data.message === 'register failed! (length Password < 6)')
        showLoading(showErrorRegister);

      if (data.message === 'register failed! (Email existed)')
        showLoading(showWarningRegister);
    })
    .catch((err) => {
      console.log(err);
      showLoading(showErrorRegister);
    })
    .finally(() => btnRegister.removeAttribute('disabled'));
});

// Fetch Login
async function fetchLogin() {
  const res = await fetch(URLLogin, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: emailLogin.value,
      password: passwordLogin.value,
    }),
  });

  const data = await res.json();
  return data;
}

// Handle event click button login
btnLogin.onclick = (e) => {
  e.preventDefault();
  btnLogin.setAttribute('disabled', true);

  fetchLogin()
    .then((data) => {
      console.log(data);
      if (data.status) showLoading(showSuccessLogin);

      if (data.message === 'register failed! (length Password < 6)')
        showLoading(showErrorLoginPassword);

      if (data.message === 'login failed! (Email not found)')
        showLoading(showErrorLogin);
    })
    .catch((err) => {
      console.log(err);
      showLoading(showErrorLogin);
    })
    .finally(() => btnLogin.removeAttribute('disabled'));
};

// Log message
function message({
  title = '',
  message = '',
  type = 'success',
  duration = 500,
  delay = 2000,
}) {
  const messMain = $('#message-container');

  if (messMain) {
    const messItem = document.createElement('div');

    const autoRemoveId = setTimeout(() => {
      messMain.removeChild(messItem);
    }, delay + duration);

    messItem.onclick = (e) => {
      if (e.target.closest('.icon-times')) {
        messItem.style.animation = `fadeRightOut linear .3s 1s forwards`;
        setTimeout(() => {
          messMain.removeChild(messItem);
        }, 1000);
        clearTimeout(autoRemoveId);
      }
    };

    const icons = {
      success: 'fa-regular fa-circle-check',
      warning: 'fa-solid fa-circle-exclamation',
      error: 'fa-solid fa-bug',
    };
    const icon = icons[type];
    const animationDelay = (delay / 1000).toFixed(2);
    const animationDuration = (duration / 1000).toFixed(2);

    messItem.classList.add('message', `message-${type}`);
    messItem.style.animation = `slideInLeft linear 0.4s, fadeRightOut linear ${animationDuration}s ${animationDelay}s forwards`;

    messItem.innerHTML = `
      <i class="icon ${icon}"></i>
      <div class="box-text">
        <h3>${title}</h3>
        <p>${message}</p>
      </div>
      <i class="icon icon-times fa-solid fa-xmark"></i>
    `;

    messMain.appendChild(messItem);
  }
}

function showSuccessRegister() {
  message({
    title: 'Success',
    message: 'You have successfully registered.',
    type: 'success',
    duration: 500,
    delay: 2000,
  });
}

function showSuccessLogin() {
  message({
    title: 'Success',
    message: 'You have successfully logged.',
    type: 'success',
    duration: 500,
    delay: 2000,
  });
}

function showWarningRegister() {
  message({
    title: 'Warning',
    message: 'Your account already exists!',
    type: 'warning',
    duration: 500,
    delay: 2000,
  });
}

function showErrorRegister() {
  message({
    title: 'Error',
    message: 'You register failed!!',
    type: 'error',
    duration: 500,
    delay: 2000,
  });
}

function showErrorLogin() {
  message({
    title: 'Error',
    message: 'You login failed!!',
    type: 'error',
    duration: 500,
    delay: 2000,
  });
}

function showErrorLoginEmail() {
  message({
    title: 'Error',
    message: 'You entered incorrect email!!',
    type: 'error',
    duration: 500,
    delay: 2000,
  });
}

function showErrorLoginPassword() {
  message({
    title: 'Error',
    message: 'You entered incorrect password!!',
    type: 'error',
    duration: 500,
    delay: 2000,
  });
}

// Loading fetch
function showLoading(showMessage) {
  loading.classList.add('show');
  overlay.classList.add('show');

  setTimeout(() => {
    loading.classList.remove('show');
    overlay.classList.remove('show');

    setTimeout(() => showMessage(), 400);
  }, 1000);
}
// //form validate
let send=document.getElementById('send');
send.addEventListener("click",(e)=>{
    alert('Send message succsesfull !')

});
// vaqlid
