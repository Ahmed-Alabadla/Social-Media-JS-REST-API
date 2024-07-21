// authentication-register

let registerButton = document.getElementById("registerButton");
let registerModal = document.getElementById("authentication-register");
let closeButtonRegister = document.getElementById("closeButtonRegister");
let signUp = document.getElementById("signUp");

registerButton.addEventListener("click", () => {
  document.getElementById("login&register").classList.add("hidden");
  document.getElementById("login&register").classList.remove("flex");

  registerModal.classList.remove("hidden");
  registerModal.classList.add("block");

  // setTimeout(() => {
  //   registerModal.classList.remove("block");
  //   registerModal.classList.add("hidden");
  // }, 60000);
});

closeButtonRegister.addEventListener("click", () => {
  registerModal.classList.remove("block");
  registerModal.classList.add("hidden");
});

signUp.addEventListener("click", () => {
  registerModal.classList.remove("block");
  registerModal.classList.add("hidden");

  document.getElementById("authentication-login").classList.remove("hidden");
  document.getElementById("authentication-login").classList.add("block");
});

// ============= get data ========

document
  .getElementById("register-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    getDataFromRegister(e.target);
  });

function getDataFromRegister(form) {
  let formData = new FormData(form);
  let data = Object.fromEntries(formData);
  // console.log(data);
  toggleLoader(true);
  axios
    .post("https://tarmeezacademy.com/api/v1/register", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    })
    .then((res) => {
      toggleLoader(false);
      // console.log(res.data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // window.location.reload();

      // ===================
      let userDetails = res.data.user;
      // console.log(userDetails);

      document.getElementById("userDetail-name").innerHTML = userDetails.name;
      document.getElementById("userDetail-email").innerHTML = userDetails.email;
      // console.log(userDetails.profile_image);
      if (Object.keys(userDetails.profile_image).length !== 0) {
        document.getElementById("person-picture").src =
          userDetails.profile_image;
      }
      // ========= hidden register modal =========
      registerModal.classList.remove("block");
      registerModal.classList.add("hidden");

      // ====== show button create post ======
      document.getElementById("createPostButton").classList.remove("hidden");
      document.getElementById("createPostButton").classList.add("flex");
    })
    .catch((err) => {
      document.getElementById("register-error").classList.remove("hidden");
      document.getElementById("register-error").classList.add("block");
      document.getElementById("register-error").innerHTML =
        err.response.data.message;

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
