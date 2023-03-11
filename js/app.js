// スクロール位置を保存するコールバック関数
function saveScrollPosition() {
    sessionStorage.setItem('scrollPosition', window.scrollY);
}
// スクロール位置が0の時にbodyにpageTopクラスを付与するコールバック関数
function pageTopToggle() {
    var body = document.querySelector('body');
    body.classList.toggle('pageTop', window.scrollY === 0);
} 
// navbarがスクロールで消え、上にスクロールしたら再度表示する
let beforeScroll = 0;
function navAnimation() {
    let body = document.querySelector('body');
    let startpoint = document.querySelector('.MV-message').offsetTop;
    let scroll = window.pageYOffset;
    if (startpoint > scroll || 0 > scroll - beforeScroll) {
        body.classList.remove('is-hide');
    } else {
        if(!body.classList.contains('nav-open')) body.classList.add('is-hide');
    }
    beforeScroll = scroll;
}
// Elementのアニメーション
function scrollAnimation() {
    let scrollTimer;
    let Target_1_once = false;
    let Target_2_once = false;
    let Target_3_once = false;
        window.addEventListener('scroll', function() {
            if(scrollTimer !== null){
                clearTimeout(scrollTimer);
            }
            scrollTimer = setTimeout(function() {
                const Target_1_Element = document.getElementById('Web_team');
                const Target_2_Element = document.getElementById('Game_team');
                const Target_3_Element = document.getElementById('ML_team');
            
                const Target_1_Position = Target_1_Element.getBoundingClientRect().top;
                const Target_2_Position = Target_2_Element.getBoundingClientRect().top;
                const Target_3_Position = Target_3_Element.getBoundingClientRect().top;
            
                if (window.innerHeight > Target_1_Position && Target_1_once === false) {
                    Target_1_once = true;
                    Target_1_Element.classList.add('show');
                    setTimeout(() => {
                        Target_1_Element.classList.remove('show');
                    }, 5000);
                }
                if (window.innerHeight > Target_2_Position && Target_2_once === false) {
                    Target_2_once = true;
                    Target_2_Element.classList.add('show');
                    setTimeout(() => {
                        Target_2_Element.classList.remove('show');
                    }, 5000);
                }
                if (window.innerHeight > Target_3_Position && Target_3_once === false) {
                    Target_3_once = true;
                    Target_3_Element.classList.add('show');
                    setTimeout(() => {
                        Target_3_Element.classList.remove('show');
                    }, 5000);
                }
            }, 10);
        });
};

// 初期化関数
function init() {
    pageTopToggle();
    newsTicker();
    
    var scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition !== null) {
        window.scrollTo(0, parseInt(scrollPosition));
    }

    setTimeout(() => {
        let scrollTimer;
        scrollAnimation();
        window.addEventListener('scroll', function() {
            if(scrollTimer !== null){
                clearTimeout(scrollTimer);
            }
            scrollTimer = setTimeout(function() {
                pageTopToggle();
                saveScrollPosition();
                navAnimation();
            }, 10);
        });
    }, 200);
};


// ページ読み込み時に実行
document.addEventListener('DOMContentLoaded', init());
const body = document.querySelector('body');


// ハンバーガーメニュー
const navButton = document.querySelector('.nav-toggle');
const main = document.querySelector('main');
const footer = document.querySelector('footer');
const flyout = document.querySelector('.flyout');
navButton.addEventListener('click', function() {
    document.body.classList.toggle('nav-open');

    
    // inert属性で不活性化する
    if(document.body.classList.contains('nav-open')){
        main.inert = true;
        footer.inert = true;
        flyout.inert = false;
    } else {
        main.inert = false;
        footer.inert = false;
        flyout.inert = true;
    }
});
const flyLinks = document.querySelectorAll('.fly-link-block');
for (let i = 0; i < flyLinks.length; i++) {
    flyLinks[i].addEventListener('click', function() {
        main.inert = false;
        footer.inert = false;
        flyout.inert = true;
    });
}

// resizeイベント
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

// フライアウトメニューのリンクをクリックした時にnav-openクラスを削除
const flyout_link_titles = document.querySelectorAll('.fly-link-title');
flyout_link_titles.forEach(function(flyout_link_title) {
    flyout_link_title.addEventListener('click', function() {
        body.classList.toggle('nav-open');
    });
});

// newsTicker
function newsTicker () {
    const animTime = 5000; // アニメーション時間(ms)
    const speed = 100; // 移動速度(px)
    const limit = 0; // ブレークポイント(px)
    let animId;
    let isRunning = false;

    const newsTicker = document.querySelector('.newsTicker');
    const newsTickercontents = newsTicker.querySelector('.newsTicker-contents');
    loadTicker();

    function loadTicker() {
        newsTickerAnim();
        animId = setInterval(newsTickerAnim, animTime);
        isRunning = true;
    }

    function newsTickerAnim() {
        const items = newsTickercontents.querySelectorAll('.newsTicker-item'); 
        const running = newsTickercontents.querySelector('.run');   
        let idx, link, first, next;
        if (!running) {
            first = items[0];
            link = first.querySelector('a');
            first.classList.add('fadeInDown', 'run');
            first.style.zIndex = 1;
            setTimeout(textMove, 1000, link);
        } else {
            for(let i = 0; i < items.length; i++) {
                if(items[i].classList.contains('run')) {
                    idx = i;
                    break;
                }
            }
            next = items[(idx + 1) % items.length];
            running.classList.replace('fadeInDown', 'fadeOutDown');
            setTimeout(() => {
                running.classList.remove('run', 'fadeOutDown');
                running.style.zIndex = 0;
                link = running.querySelector('a');
                link.style.transform = 'none';
                next.classList.add('fadeInDown', 'run');
                next.style.zIndex = 1;
                link = next.querySelector('a');
                setTimeout(textMove, 1000, link);
            }, 1000);
        }
    }

    function textMove(link) {
        const move = link.parentNode.clientWidth - link.clientWidth;
        if (move < 0) {
            link.style.transform = `translateX(${move}px)`;
            link.style.transition = `transform ${Math.abs(move) / speed}s linear`;
        }
    }
}