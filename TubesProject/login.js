// DATA ADMIN
const admin = {
  username: "admin",
  password: "12345"
};

// LOGIN FUNCTION
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (
    username === admin.username &&
    password === admin.password
  ) {

    // simpan session
    localStorage.setItem("isLogin", "true");

    // pindah dashboard
    window.location.href = "dashboard.html";

  } else {

    document.getElementById("error").innerText =
      "Username atau Password salah!";
  }
}