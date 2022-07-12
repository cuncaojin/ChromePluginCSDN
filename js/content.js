// document.body.style.backgroundColor = 'orange';

console.log("cuncaojin: js/content.js");

// 1. 未登录，解除代码无法复制问题
var code1 = document.querySelectorAll("#content_views pre");
if (code1 != null) {
  code1.forEach(function (e) {
    e.style.userSelect = "text";
  });
}
var code2 = document.querySelectorAll("#content_views pre code");
if (code2 != null) {
  code2.forEach(function (e) {
    e.style.userSelect = "text";
  });
}

// 2. 解除"订阅专栏 解锁博文"问题
var articalContent = document.querySelectorAll("#article_content");
if (articalContent != null) {
  articalContent.forEach(function (e) {
    console.log(typeof e);
    e.removeAttribute("style");
  });
}
var hideArticleBox = document.querySelectorAll(".hide-article-box");
if (hideArticleBox != null) {
  hideArticleBox.forEach(function (e) {
    e.parentNode.removeChild(e);
  });
}
