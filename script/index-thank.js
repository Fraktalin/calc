document.addEventListener("click", deleteLocal);

function deleteLocal() {
  localStorage.removeItem("UserData");
  window.location.href = "index.html";
}
