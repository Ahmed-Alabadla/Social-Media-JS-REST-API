// authentication-login

let loginButton = document.getElementById("loginButton");
let loginModal = document.getElementById("authentication-login");
let closeButtonLogin = document.getElementById("closeButtonLogin");
let createAccount = document.getElementById("createAccount");

loginButton.addEventListener("click", () => {
  document.getElementById("login&register").classList.add("hidden");
  document.getElementById("login&register").classList.remove("flex");

  loginModal.classList.remove("hidden");
  loginModal.classList.add("block");

  setTimeout(() => {
    loginModal.classList.remove("block");
    loginModal.classList.add("hidden");
  }, 60000);
});

closeButtonLogin.addEventListener("click", () => {
  loginModal.classList.remove("block");
  loginModal.classList.add("hidden");
});

createAccount.addEventListener("click", () => {
  document.getElementById("authentication-register").classList.add("block");
  document.getElementById("authentication-register").classList.remove("hidden");
  loginModal.classList.remove("block");
  loginModal.classList.add("hidden");
});

// ============= get data ========

function loginBtnClick() {
  let username = document.getElementById("username-login").value;
  let password = document.getElementById("password-login").value;
  const data = {
    username: username,
    password: password,
  };
  // console.log(data);
  toggleLoader(true);
  axios
    .post("https://tarmeezacademy.com/api/v1/login", data, {
      headers: {
        Accept: "application/json",
      },
    })
    .then((res) => {
      // console.log(res.data);
      toggleLoader(false);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      // window.location.reload();

      // ===================
      let userDetails = res.data.user;
      // console.log(userDetails);

      document.getElementById("userDetail-name").innerHTML = userDetails.name;
      document.getElementById("userDetail-email").innerHTML = userDetails.email;
      if (Object.keys(userDetails.profile_image).length !== 0) {
        document.getElementById("person-picture").src =
          userDetails.profile_image;
      }
      // ========= hidden login modal  =========

      loginModal.classList.remove("block");
      loginModal.classList.add("hidden");

      // ====== show button create post ======
      document.getElementById("createPostButton").classList.remove("hidden");
      document.getElementById("createPostButton").classList.add("flex");
    })
    .catch((err) => {
      const loginError = document.getElementById("loginError");
      loginError.classList.remove("hidden");
      loginError.classList.add("block");
      loginError.innerHTML = err.response.data.message;
      // alert(err.response.data.message);
      // console.log(err.response.data.message);
    });
}
// ========================== LOADER ==========================

function toggleLoader(show = true) {
  if (show) {
    document.getElementById("loader").style.visibility = "visible";
  } else {
    document.getElementById("loader").style.visibility = "hidden";
  }
}
