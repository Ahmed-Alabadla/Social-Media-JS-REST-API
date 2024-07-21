// ========= when click button logout =========

document.getElementById("logout").addEventListener("click", () => {
  const token = localStorage.getItem("token");
  toggleLoader(true);
  axios
    .post(
      "https://tarmeezacademy.com/api/v1/logout",
      {},
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      // console.log(res.data);
      toggleLoader(false);
      localStorage.clear();
      // window.location.reload();
      document.getElementById("person-picture").src = "../assets/person.png";

      // ====== hidden button create post ======
      document.getElementById("createPostButton").classList.remove("flex");
      document.getElementById("createPostButton").classList.add("hidden");

      document.getElementById("profile-logout").classList.add("hidden");
    });
});

// ========= when click button profile logout =========

function handleClickBtnLogoutProfile() {
  const token = localStorage.getItem("token");
  toggleLoader(true);
  axios
    .post(
      "https://tarmeezacademy.com/api/v1/logout",
      {},
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      // console.log(res.data);
      toggleLoader(false);
      localStorage.clear();
      // window.location.reload();
      document.getElementById("person-picture").src = "../assets/person.png";

      // ====== hidden button create post ======
      document.getElementById("createPostButton").classList.remove("flex");
      document.getElementById("createPostButton").classList.add("hidden");

      document.getElementById("profile-logout").classList.add("hidden");
      location.reload();
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
