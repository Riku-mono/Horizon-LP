// windowのscrollイベントを監視して、スクロール位置が0の時にbodyにpageTopクラスを付与する
document.addEventListener('DOMContentLoaded', pageTopToggle);

window.addEventListener('scroll', pageTopToggle);

function pageTopToggle() {
    var body = document.querySelector('body');
    body.classList.toggle('pageTop', window.scrollY === 0);
}

// 
const navButton = document.querySelector('.nav-toggle');
navButton.addEventListener('click', function() {
    document.body.classList.toggle('nav-open');
});

// スクロール位置を保存するコールバック関数
function saveScrollPosition() {
    sessionStorage.setItem('scrollPosition', window.scrollY);
  }
  
  // ページ読み込み時にスクロール位置を復元する
  window.onload = function() {
    var scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition !== null) {
        window.scrollTo(0, parseInt(scrollPosition));
    }
  }
  setTimeout(() => {
      // スクロール時にスクロール位置を保存する
      window.addEventListener('scroll', saveScrollPosition);
  }, 10);