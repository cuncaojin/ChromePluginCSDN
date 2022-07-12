let changeColor = document.getElementById("changeColor");
// 将存储的内容同步到所有登录了同一账号的 chrome 浏览器中
chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// chrome.storage.sync.get("color", (data) => {
//   changeColor.style.backgroundColor = data;
// });

console.log("cuncaojin: js/popup.js");

// var author = document.getElementById("author");
// author.addEventListener("click", function () {
//   console.log("11111");
// });

document.getElementById("author").addEventListener("click", function () {
  // alert(111);
  document.getElementById("author").innerHTML = "欢迎使用";
  var out = setTimeout(function () {
    clearTimeout(out);
    document.getElementById("author").innerHTML = "cuncaojin";
  }, 2000);
  // document.getElementById("demo").innerHTML = "Hello World";
});

// document.querySelector("#author").addEventListener("click", function () {
//   console.log("cuncaojin: addEventListener");
// });
