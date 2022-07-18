// MDN: https://developer.mozilla.org/zh-CN/docs/Web/API/Clipboard/writeText
// 类型判断
// Object.prototype.toString.call(obj)
// 删除元素
// toast.remove();

console.log("cuncaojin: js/content.js");

//////////////////////// 要隐藏的元素选择器 ////////////////////////
var hiddenElementSelectorContainer = new String();
function addHiddenElementSelector(selector) {
  if (hiddenElementSelectorContainer != "") {
    hiddenElementSelectorContainer = hiddenElementSelectorContainer.concat(",");
  }
  hiddenElementSelectorContainer =
    hiddenElementSelectorContainer.concat(selector);
}
function hideElementsBySelector(hiddenElementSelectorContainer) {
  var hiddenElements = document.querySelectorAll(
    hiddenElementSelectorContainer
  );
  if (hiddenElements) {
    hiddenElements.forEach(function (e) {
      e.style.visibility = "hidden";
    });
  }
}
//////////////////////// 要移除的元素选择器 ////////////////////////
var removeElementSelectorContainer = new String();
function addRemoveElementSelector(selector) {
  if (removeElementSelectorContainer != "") {
    removeElementSelectorContainer = removeElementSelectorContainer.concat(",");
  }
  removeElementSelectorContainer =
    removeElementSelectorContainer.concat(selector);
}
function removeElementsBySelector(removeElementSelectorContainer) {
  var removeElements = document.querySelectorAll(
    removeElementSelectorContainer
  );
  if (removeElements) {
    removeElements.forEach(function (e) {
      e.remove();
    });
  }
}

//////////////////////// Toast ////////////////////////
function toast(string, bgColor) {
  var toast = document.createElement("div");
  toast.innerText = string;
  // 没有使用toast类名，因为可能和三方冲突
  toast.setAttribute("class", "ccj_toast");
  if (bgColor) {
    toast.style.backgroundColor = bgColor;
  }
  // code.parentNode.insertBefore(newElement, code);
  // document.body.appendChild(toast);
  document.body.insertBefore(toast, null);

  //监听animation动画结束方法
  function onAnimationEnd(event) {
    toast.remove();
  }
  toast.addEventListener("webkitAnimationEnd", onAnimationEnd, false);
  toast.addEventListener("mozAnimationEnd", onAnimationEnd, false);
  toast.addEventListener("MSAnimationEnd", onAnimationEnd, false);
  toast.addEventListener("oanimationend", onAnimationEnd, false);
  toast.addEventListener("animationend", onAnimationEnd, false);
  // var t = setTimeout(function () {
  //   clearTimeout(t);
  //   toast.remove();
  // }, 1000);
}

//////////////////////// CSDN ////////////////////////
// 1. 未登录，解除代码无法复制问题
var code = document.querySelectorAll(
  "#content_views pre, #content_views pre code"
);
if (code != null) {
  code.forEach(function (e) {
    e.style.userSelect = "text";
  });
}

// 2. 解除"订阅专栏 解锁博文"问题
var articalContent = document.querySelectorAll("#article_content");
if (articalContent != null) {
  articalContent.forEach(function (e) {
    // 类型判断
    // console.log(Object.prototype.toString.call(e));
    e.removeAttribute("style");
  });
}
var hideArticleBox = document.querySelectorAll(".hide-article-box");
if (hideArticleBox != null) {
  hideArticleBox.forEach(function (e) {
    e.parentNode.removeChild(e);
  });
}

// 3. 增加CSDN自定义代码拷贝按钮
var codes = document.querySelectorAll("pre code");
if (codes) {
  var imgURL = chrome.runtime.getURL("image/save.png");
  console.log("imgURL: " + Object.prototype.toString.call(imgURL));

  codes.forEach(function (code) {
    var newElement = document.createElement("div");
    // newElement.innerText = "COPY";
    newElement.setAttribute("class", "copyBtn");
    newElement.setAttribute(
      "style",
      "background-image:url(" +
        imgURL +
        ");background-repeat: no-repeat;width:32px;height:32px"
    );
    code.parentNode.insertBefore(newElement, code);
    newElement.addEventListener("click", function (event) {
      // var x = event.pageX;
      // var y = event.pageY;
      // var rect = newElement.getBoundingClientRect();

      // 拷贝网页显示元素内容
      // var txt = code.innerText;
      // var txt = code.textContent;
      navigator.clipboard.writeText(code.textContent).then(
        /* clipboard successfully set */
        function () {
          console.log(code.textContent);
          toast("复制成功", "#00a4f0");
        },
        /* clipboard write failed */
        function () {
          console.log(code.textContent);
          toast("复制失败", "red");
        }
      );
    });
  });
}

// 4. 移除CSDN上广告 (谷歌和万维广告 https://wwads.cn)
addRemoveElementSelector(".box-shadow");
addRemoveElementSelector(".adsbygoogle");
addRemoveElementSelector("#recommendAdBox .wwads-cn");
addRemoveElementSelector("#recommendAdBox script");
addRemoveElementSelector(".aside-box script");
removeElementsBySelector(removeElementSelectorContainer);

// 5. 隐藏CSDN上hover登陆按钮
addHiddenElementSelector(".hljs-button.signin");
hideElementsBySelector(hiddenElementSelectorContainer);

// var imgURL = chrome.runtime.getURL("image/home.png");
// document.querySelector("article img").src = imgURL;
