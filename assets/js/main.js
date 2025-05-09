const loginForm = document.querySelector("#login-form");

const registerForm = document.querySelector("#register-form");

const disconnectBtn = document.querySelector(".disconnect-btn");

function ShowMessage({ text, type }) {
  const div = document.createElement("div");
  div.id = "message-box";
  const p = document.createElement("p");
  p.innerText = text;
  p.classList.add(type);
  div.appendChild(p);
  const btn = document.createElement("button");
  btn.type = "button";
  btn.innerHTML = "Fermer";
  btn.id = "btn-close-message";
  div.appendChild(btn);
  const messageBoxContainer = document.querySelector(".message-box-container");
  messageBoxContainer.appendChild(div);
  btn.addEventListener("click", (e) => {
    div.remove();
  });
}

if (loginForm) {
  const loginFormEmail = document.querySelector("#email");
  const loginFormPasswd = document.querySelector("#passwd");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const mail = loginFormEmail.value.toLowerCase();
    const passwd = loginFormPasswd.value;

    if (!checkAuth({ mail, passwd })) {
      ShowMessage({
        text: "Vous n'avez pas rentré un nom d'utilisateur correct et/ou le bon mot de passe",
        type: "error",
      });
    } else {
      Auth();
      window.location.href = "/synopsis.html";
    }
  });

  function checkAuth({ mail, passwd }) {
    const LsMail = localStorage.getItem("mail");
    const LsPasswd = localStorage.getItem("passwd");

    return mail === LsMail && passwd === LsPasswd ? true : false;
  }

  function Auth() {
    localStorage.setItem("Auth", true);
  }
}

if (registerForm) {
  const registerFormEmail = document.querySelector("#register-mail");
  const registerFormPass1 = document.querySelector("#passwd1");
  const registerFormPass2 = document.querySelector("#passwd2");

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    /* naive implementation, email should pass RegEx test, password should respesct complexity rules */
    if (registerFormPass1.value !== registerFormPass2.value) {
      if (!document.querySelector("#error-passwd")) {
        const pEl = document.createElement("p");
        pEl.innerText = "Les mots de passe doivent être identique";
        pEl.classList.add("error-form");
        pEl.id = "error-passwd";
        registerFormPass2.after(pEl);
        registerFormPass2.setAttribute("aria-describedBy", "error-passwd");
      }
    } else if (
      registerFormEmail.value &&
      registerFormPass1.value &&
      registerFormPass2.value
    ) {
      if (document.querySelector("#error-passwd")) {
        document.querySelector("#error-passwd").remove();
      }

      ShowMessage({
        text: "vous avez crée un nouvel utilisateur, vous pouvez vous connecter avec celui-ci",
        type: "success",
      });

      registerUser({
        mail: registerFormEmail.value,
        passwd: registerFormPass1.value,
      });
    }
  });

  // naive implementation, we should create mutiple account
  function registerUser({ mail, passwd }) {
    const lowerizedMail = mail.toLowerCase();
    localStorage.setItem("mail", lowerizedMail);
    localStorage.setItem("passwd", passwd);
  }
}

if (disconnectBtn) {
  disconnectBtn.addEventListener("click", (e) => {
    localStorage.removeItem("Auth");
    window.location.href = "/";
  });
}
