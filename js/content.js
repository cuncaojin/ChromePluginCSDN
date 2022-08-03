// https://developer.chrome.com/docs/extensions/mv3/content_scripts/
// MDN: https://developer.mozilla.org/zh-CN/docs/Web/API/Clipboard/writeText
// 类型判断
// Object.prototype.toString.call(obj)
// 删除元素
// toast.remove();
console.log("cuncaojin: js/content.js");

// window.addEventListener("DOMContentLoaded", (event) => {
console.info("loaded");
function doWork() {
  //////////////////////// 向上搜索选择器 ////////////////////////
  function getParentSelecter(rootElementTagName, sonElement) {
    var e = sonElement;
    console.log(e.parentElement.nodeName);
    while (
      e.parentElement.nodeName.toUpperCase() != rootElementTagName &&
      e.parentElement.nodeName.toUpperCase() != "BODY"
    ) {
      e = e.parentElement;
    }
    return e.parentElement;
  }

  //////////////////////// 要点击的元素选择器 ////////////////////////
  var clickElementSelectorContainer = new String();
  function addClickElementSelector(selector) {
    if (clickElementSelectorContainer != "") {
      clickElementSelectorContainer = clickElementSelectorContainer.concat(",");
    }
    clickElementSelectorContainer =
      clickElementSelectorContainer.concat(selector);
  }
  function clickElementsBySelector() {
    var clickElements = document.querySelectorAll(
      clickElementSelectorContainer
    );
    if (clickElements) {
      clickElements.forEach(function (e) {
        e.click();
      });
    }
  }
  //////////////////////// 要隐藏的元素选择器 ////////////////////////
  var hiddenElementSelectorContainer = new String();
  function addHiddenElementSelector(selector) {
    if (hiddenElementSelectorContainer != "") {
      hiddenElementSelectorContainer =
        hiddenElementSelectorContainer.concat(",");
    }
    hiddenElementSelectorContainer =
      hiddenElementSelectorContainer.concat(selector);
  }
  function hideElementsBySelector() {
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
      removeElementSelectorContainer =
        removeElementSelectorContainer.concat(",");
    }
    removeElementSelectorContainer =
      removeElementSelectorContainer.concat(selector);
  }
  function removeElementsBySelector() {
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
      // TODO 代码不优美，不能兼容快速去广告，且知乎隐藏文章加载快
      // https://blog.csdn.net/cuncaojin/article/details/125750007
      // https://www.zhihu.com/question/21277368/answer/550671387
      if (code.style.cuncaojinFlag != "1") {
        code.style.cuncaojinFlag = "1";
        var newElement = document.createElement("div");
        // newElement.innerText = "COPY";
        newElement.setAttribute("class", "copyBtn");
        newElement.style.backgroundImage = "url(" + imgURL + ")";
        if (location.hostname.match(".*.zhihu.com.*")) {
          newElement.style.float = "right";
          newElement.style.position = "inherit";
        } else if (location.hostname.match(".*.csdn.net.*")) {
          newElement.style.position = "absolute";
          newElement.style.top = "2px";
          newElement.style.right = "2px";
        }
        // let preStyle = window.getComputedStyle(code.parentElement, null);
        // let prePaddingTop = parseFloat(preStyle.getPropertyValue("padding-top"));
        // let prePaddingRight = parseFloat(preStyle.getPropertyValue("padding-right"));
        let codeStyle = window.getComputedStyle(code, null);
        let paddingTop = parseFloat(codeStyle.getPropertyValue("padding-top"));
        let paddingRight = parseFloat(
          codeStyle.getPropertyValue("padding-right")
        );
        // let w = parseFloat(codeStyle.getPropertyValue('width')); // 获取实际宽度
        // let concentW = Number(w = paddingL - paddingR ); //实际内容宽度
        // 拷贝按钮和代码区域保持2px距离
        newElement.style.marginRight = paddingRight + 0 + "px";
        newElement.style.marginTop = paddingTop + 0 + "px";

        code.parentNode.insertBefore(newElement, code);
        // code.insertBefore(newElement, code.firstChild);
        // code.style.padding = "0px";
        // var rect = newElement.getBoundingClientRect();
        // newElement.style.top = rect.top;

        newElement.addEventListener("click", function (event) {
          // var x = event.pageX;
          // var y = event.pageY;

          // 拷贝网页显示元素内容
          // innerText 有换行效果，不含hidden内容
          var txt = code.innerText;
          // var txt = code.textContent;
          navigator.clipboard.writeText(txt).then(
            /* clipboard successfully set */
            function () {
              console.log(txt);
              toast("复制成功", "#00a4f0");
            },
            /* clipboard write failed */
            function () {
              console.log(txt);
              toast("复制失败", "red");
            }
          );
        });
      }
    });
  }

  // 4. 移除CSDN上广告 (谷歌和万维广告 https://wwads.cn)
  addRemoveElementSelector(".box-shadow");
  addRemoveElementSelector(".picture-ad");
  addRemoveElementSelector(".adsbygoogle");
  addRemoveElementSelector("#recommendAdBox .wwads-cn");
  addRemoveElementSelector("#recommendAdBox script");
  addRemoveElementSelector(".aside-box script");
  // 屏蔽必应搜索结果广告
  addRemoveElementSelector(".b_ad");
  removeElementsBySelector();
  // document.querySelectorAll(".ad_fls").forEach(function (e) {
  //   // addRemoveElementSelector(".ad_fls");
  //   getParentSelecter("li", e).remove();
  // });

  // 5. 隐藏CSDN上hover登陆按钮
  addHiddenElementSelector(".hljs-button.signin");
  addHiddenElementSelector(".hljs-button");
  hideElementsBySelector();

  // 6. 处理CSDN/知乎恶心的自作聪明代码展示不全、隐藏部分美化效果但不实用现象
  addClickElementSelector(".hide-preCode-bt");
  addClickElementSelector("button.ContentItem-expandButton");
  console.log(clickElementSelectorContainer);
  clickElementsBySelector();

  // 7. 屏蔽恶心的链接跳转确认按钮
  if (location.href.startsWith("https://link.csdn.net/?target")) {
    // document.querySelector("a.loading-btn").click();
    var url = document.querySelector("a.loading-btn").href;
    window.close();
    window.open(url);
  }

  //////////////////////// 知乎 //////////////////////////
  // 1. 屏蔽恶心的链接跳转确认按钮
  if (location.href.startsWith("https://link.zhihu.com/?target=")) {
    var url = document.querySelector("a.button").href;
    window.close();
    window.open(url);
  }

  // 掘金
  if (location.href.startsWith("https://link.juejin.cn/?target")) {
    var url = document.querySelector("button.btn").href;
    window.close();
    window.open(url);
  }
}

doWork();
// document.addEventListener("DOMContentLoaded", doWork);
// window.addEventListener("load", doWork);
window.addEventListener("load", (event) => {
  doWork();
});

switch (document.readyState) {
  case "loading":
    // 表示文档还在加载中，即处于“正在加载”状态。
    break;
  case "interactive":
    // 文档已经结束了“正在加载”状态，DOM 元素可以被访问。
    // 但是像图像，样式表和框架等资源依然还在加载。
    break;
  case "complete":
    // 页面所有内容都已被完全加载。
    let CSS_rule = document.styleSheets[0].cssRules[0].cssText;
    console.log(`The first CSS rule is: ${CSS_rule}`);
    break;
}
