// スクロール位置を保存するコールバック関数
function saveScrollPosition() {
    sessionStorage.setItem('scrollPosition', window.scrollY);
}
// スクロール位置が0の時にbodyにpageTopクラスを付与するコールバック関数
function pageTopToggle() {
    var body = document.querySelector('body');
    body.classList.toggle('pageTop', window.scrollY === 0);
} 

// 初期化関数
function init() {
    pageTopToggle();
    
    var scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition !== null) {
        window.scrollTo(0, parseInt(scrollPosition));
    }

    setTimeout(() => {
        let scrollTimer;
        window.addEventListener('scroll', function() {
            if(scrollTimer !== null){
                clearTimeout(scrollTimer);
            }
            scrollTimer = setTimeout(function() {
                pageTopToggle();
                saveScrollPosition();
            }, 10);
        });
    }, 200);
};

// ページ読み込み時に実行
document.addEventListener('DOMContentLoaded', init());





// ハンバーガーメニュー
const navButton = document.querySelector('.nav-toggle');
navButton.addEventListener('click', function() {
    document.body.classList.toggle('nav-open');
});

// resizeイベントの負荷軽減
let resizeTimer;
window.addEventListener('resize', function() {
    if(resizeTimer !== null){
        clearTimeout(resizeTimer);
    }

    resizeTimer = setTimeout(function() {
        // 画面幅が900px以上の時にnav-openクラスを削除
        if (window.innerWidth >= 900) {
            document.body.classList.remove('nav-open');
        }
    }, 100);
});

