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
        body.classList.add('DownMove');
        body.classList.remove('UpMove');
    } else {
        body.classList.add('UpMove');
        body.classList.remove('DownMove');
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
    
    var scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition !== null) {
        window.scrollTo(0, parseInt(scrollPosition));
    }
  }
  setTimeout(() => {
      // スクロール時にスクロール位置を保存する
      window.addEventListener('scroll', saveScrollPosition);
  }, 10);