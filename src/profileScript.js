const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("userId");
console.log("userId: ", id);

// =========== get data =============

// console.log(id);
toggleLoader(true);
axios.get(`https://tarmeezacademy.com/api/v1/users/${id}`).then((res) => {
  const data = res.data.data;
  console.log(data);
  document.getElementById("profile_name").innerHTML = data.name;
  document.getElementById("username-profile").innerHTML = data.name;
  document.getElementById("profile_username").innerHTML = data.username;
  document.getElementById("profile_email").innerHTML = data.email;
  document.getElementById("profile_posts_count").innerHTML = data.posts_count;
  document.getElementById("profile_comments_count").innerHTML =
    data.comments_count;

  if (Object.keys(data.profile_image).length !== 0) {
    document.getElementById("profile_image").src = data.profile_image;
  }
  toggleLoader(false);
});

// ================ Show Posts ===================
function getPosts() {
  toggleLoader(true);
  axios
    .get(`https://tarmeezacademy.com/api/v1/users/${id}/posts`)
    .then((res) => {
      let posts = res.data.data;

      document.getElementById("showPostsProfile").innerHTML = "";
      posts.map((post) => {
        //  ========== if profile image is existing =========
        let profileImageElement = "../assets/person.png";
        if (Object.keys(post.author.profile_image).length !== 0) {
          profileImageElement = post.author.profile_image;
        }

        //  ========== if body image is existing =========
        let bodyImageElement = "";
        if (Object.keys(post.image).length !== 0) {
          bodyImageElement = `
        <img
        src=${post.image}
        alt=""
        class="w-full h-full rounded"
        />
        `;
        }
        //  ========== if title is existing =========
        let titleElement = "";
        if (post.title) {
          titleElement = `
          <p class="text-gray-800 text-lg font-medium">${post.title}</p>
        `;
        }

        let content = `
      <div class="bg-white rounded-md shadow">
        <!-- header post -->
        
  
        <div class="flex items-center justify-between">
          <div
            class="flex items-center gap-3 p-2  w-fit"
          >
            <img
              src=${profileImageElement}
              alt="person image"
              class="w-10 h-10 rounded-full border"
            />
            <p class="font-medium">${post.author.username}</p>
          </div>
          
          <div class="${
            post.author.id == userDetails?.id ? "flex" : "hidden"
          } items-center gap-2 px-4" >
            <button class="bg-blue-500 px-3 py-1 rounded-md text-white" onclick="handleClickBtnEditPost('${encodeURIComponent(
              JSON.stringify(post)
            )}')">Edit</button>
            <button class="bg-red-500 px-3 py-1 rounded-md text-white" onclick="handleClickBtnDeletePost(${
              post.id
            })">Delete</button>
          </div>
        </div>
        <!-- image post -->
        <div class="p-2.5 pb-0 border-t cursor-pointer" onclick="handleClickPostDetails(${
          post.id
        })">
        ${bodyImageElement}
        </div>
        <!-- footer post  -->
        <div class="flex flex-col gap-1 p-2.5">
          <p class="text-gray-400 text-sm font-medium">${post.created_at}</p>
          ${titleElement}
  
          <p class="text-gray-800 cursor-pointer" onclick="handleClickPostDetails(${
            post.id
          })">
            ${post.body}
          </p>
          <hr class="border-t-2 my-2" />
          <div class="flex items-center gap-3 flex-wrap">
            <!-- comments -->
            <div class="text-gray-500 cursor-pointer" onclick="handleClickPostDetails(${
              post.id
            })">
              (<span>${post.comments_count}</span>) comments
            </div>
  
            <!-- tags -->
            <div class="flex items-center gap-1 flex-wrap" id="post-tags-${
              post.id
            }">
              <p class="px-2 py-1 bg-gray-500 text-white rounded-full">
                #gaza_under_attack
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
        document.getElementById("showPostsProfile").innerHTML += content;
        const currentPostTagsId = `post-tags-${post.id}`;
        // document.getElementById(currentPostTagsId).innerHTML = "";
        for (tag of post.tags) {
          let tagsContent = `
          <p class="px-2 py-1 bg-gray-500 text-white rounded-full">
            ${tag.name}
          </p>
        `;
          document.getElementById(currentPostTagsId).innerHTML += tagsContent;
        }
      });
      toggleLoader(false);
    });
}
getPosts();

// when click button user details
// ===================== handle click button user details ====================

document.getElementById("userDetailsButton").addEventListener("click", () => {
  const token = localStorage.getItem("token");
  if (token) {
    let userDetails = document.getElementById("userDetails");
    if (userDetails.classList.contains("hidden")) {
      userDetails.classList.remove("hidden");
      userDetails.classList.add("flex");
    } else {
      userDetails.classList.remove("flex");
      userDetails.classList.add("hidden");
    }
    setTimeout(() => {
      userDetails.classList.remove("flex");
      userDetails.classList.add("hidden");
    }, 10000);
  } else {
    let auth = document.getElementById("login&register");
    if (auth.classList.contains("hidden")) {
      auth.classList.remove("hidden");
      auth.classList.add("flex");
    } else {
      auth.classList.remove("flex");
      auth.classList.add("hidden");
    }
    setTimeout(() => {
      auth.classList.remove("flex");
      auth.classList.add("hidden");
    }, 10000);
  }
});

// ========= user details ========

const userDetails = JSON.parse(localStorage.getItem("user"));
// console.log(userDetails);

if (userDetails) {
  document.getElementById("userDetail-name").innerHTML = userDetails.name;
  document.getElementById("userDetail-email").innerHTML = userDetails.email;

  // console.log(userDetails.profile_image);
  if (Object.keys(userDetails.profile_image).length !== 0) {
    document.getElementById("person-picture").src = userDetails.profile_image;
  }
} else {
  // ====== hidden button logout from profile page ======
  document.getElementById("profile-logout").classList.add("hidden");
}

// =====================================================

if (userDetails.id != id) {
  document.getElementById("profile-logout").classList.add("hidden");
}

function handleClickBtnProfilePage() {
  window.location = `profile.html?userId=${userDetails.id}`;
}

// ============== handles click post details ===============

function handleClickPostDetails(id) {
  // console.log(id);
  window.location.assign(`./postdetails.html?postId=${id}`);
}

// ============ handle Click Btn Edit Post ============

const updatePostModal = document.getElementById("updatePostModal");
function handleClickBtnEditPost(postObj) {
  let post = JSON.parse(decodeURIComponent(postObj));
  console.log(post);

  document.getElementById("updatePostId").value = post.id;
  document.getElementById("updatePostTitle").value = post.title;
  document.getElementById("updatePostDescription").value = post.body;
  updatePostModal.classList.remove("hidden");
}

function handleClickUpdatePost() {
  const token = localStorage.getItem("token");

  let id = document.getElementById("updatePostId").value;
  let title = document.getElementById("updatePostTitle").value;
  let body = document.getElementById("updatePostDescription").value;

  const data = {
    title: title,
    body: body,
  };
  toggleLoader(true);
  axios
    .put(`https://tarmeezacademy.com/api/v1/posts/${id}`, data, {
      headers: {
        Accept: "application/json",
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      getPosts();
      updatePostModal.classList.add("hidden");
      toggleLoader(false);
    });

  console.log(id, title, body);
}

document
  .getElementById("closeButtonUpdatePost")
  .addEventListener("click", () => {
    updatePostModal.classList.add("hidden");
  });
document
  .getElementById("closeButtonUpdatePostForm")
  .addEventListener("click", () => {
    updatePostModal.classList.add("hidden");
  });

// ============ handle Click Btn Delete Post ============

const deletePostModal = document.getElementById("deletePostModal");
function handleClickBtnDeletePost(postId) {
  console.log(postId);
  document.getElementById("deletePostId").value = postId;
  deletePostModal.classList.remove("hidden");
}

function handleClickBtnDeletePostModal() {
  const token = localStorage.getItem("token");
  let id = document.getElementById("deletePostId").value;
  console.log(id);
  toggleLoader(true);
  axios
    .delete(`https://tarmeezacademy.com/api/v1/posts/${id}`, {
      headers: {
        Accept: "application/json",
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      location.reload();
      deletePostModal.classList.add("hidden");
      toggleLoader(false);
    });
}
function handleClickBtnCloseDeleteModal() {
  deletePostModal.classList.add("hidden");
}

// ========================== LOADER ==========================

function toggleLoader(show = true) {
  if (show) {
    document.getElementById("loader").style.visibility = "visible";
  } else {
    document.getElementById("loader").style.visibility = "hidden";
  }
}
