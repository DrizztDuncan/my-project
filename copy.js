document.getElementById("copy-text-btn").onclick = function () {
  navigator.clipboard
    .writeText(document.getElementById("copy-text").innerText)
    .then(function () {
      alert("Email has been copied!");
    });
};
