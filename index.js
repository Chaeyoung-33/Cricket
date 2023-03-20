// 1) Scroll Navigation
var aTags = document.querySelectorAll('header a');
for(var i = 0; i < aTags.length; i ++) {
    aTags[i].onclick = function(e) {
        e.preventDefault() ;
        var target = document.querySelector(this.getAttribute('href'));

        window.scrollTo ({
            'behavior': 'smooth',
            'top': target.offsetTop
        })
    }
}


// 2) Image Slider

var slider = document.querySelector('#slider');
var slides = slider.querySelector('.slides');
var slide = slides.querySelectorAll('.slide');

var currentSlide = 0;   // 현재 보여지는 슬라이드

setInterval(function() {
    var from = -(1024 * currentSlide);  // 현재 위치
    var to = from - 1024;   // 이동할 위치, 슬라이드는 왼쪽으로 이동하니 -값
    slides.animate({
        marginLeft: [from + "px", to + "px"]    // from에서 to까지 이동
    }, {
        duration: 500,  // 500ms동안 이동할게
        easing: "ease", // 애니메이션 실행 속도
        iterations: 1,  // 1회 반복
        fill: "both"
    });
    currentSlide++;     // 현재 이미지가 바뀌었으니 슬라이드 번호도 변화
    if (currentSlide === (slide.length - 1)) {  // 현재 슬라이드 = 마지막 슬라이드일 때, 
        currentSlide = 0;   // 현재 슬라이드는 0번째 슬라이드로!
    }
}, 3000);   // 3000ms 간격으로 슬라이드 넘기기 실행


// 3) Tabs

var links = document.querySelectorAll('.tabs-list li a')  // 탭 버튼
var items = document.querySelectorAll('.tabs-list li') // 탭 버튼 아래 리스트
for (var i = 0; i < links.length; i++) {
    links[i].onclick = function(e) {
        e.preventDefault();     // <a>의 기본 기능(해당 지점으로 이동) 정지
    }
}

for (var i = 0; i < items.length; i++) {
    items[i].onclick = function() {     // items 클릭 시, 함수 실행
        var tabId = this.querySelector("a").getAttribute('href');   // <a>의 href, 즉 링크 주소 가져오기
        console.log(this.classList);
        document.querySelectorAll(".tabs-list li, .tabs div.tab").forEach(function(item) {
            item.classList.remove("active");    // 기존 active 클래스는 제거할게
            console.log(item);
        });
        document.querySelector(tabId).classList.add("active");  // 우리가 선택한 <a>의 href를 active해줄게(CSS에서 보면, active는 display : block !important(중요하니까 앞에 설정 싹 지워 지금 이게 맞음!))
        this.classList.add("active");
    }  
} 


// 4) Click Image Slider
// 오른쪽 화살표 클릭 시, 다음 이미지 슬라이드로 넘어가도록
document.querySelector(".right-arrow").onclick = function () {  // 오른쪽 화살표의 클릭 이벤트
    var currentSlide = document.querySelector("#photo .slide.active");  // 현재 슬라이드가 뭔지 체크
    var nextSlide = currentSlide.nextElementSibling;    // 다음 슬라이드, 즉 현재 슬라이드의 다음 형제 요소
    if (nextSlide === null) {   // 다음 슬라이드가 없을 때 = 현재 슬라이드가 막내일 때
        nextSlide = currentSlide.parentElement.firstElementChild;
    }   // 다음 슬라이드는 현재 슬라이드의 부모 요소의 첫번째 자식 요소, 즉 첫 형제로 할게
        currentSlide.animate({  // 현재 슬라이드에 애니메이션 적용
        opacity: [1, 0]     // 불투명도: 100%(불투명) -> 0%(투명)
    }, {
        duration: 500,
        easing: "ease",
        iterations: 1,
        fill: "both"    // 애니메이션 끝난 뒤, 설정(both: 그 자리에 남아있어줘)
    });
    currentSlide.classList.remove("active");    // 현재 슬라이드 active 삭제
    nextSlide.animate({     // 다음 슬라이드에 애니메이션 적용
        opacity: [0, 1]     // 불투명도: 0%(투명) -> 100%(불투명)
    }, {
        duration: 500,
        easing: "ease",
        iterations: 1,
        fill: "both"
    });
    nextSlide.classList.add("active");      // 다음 슬라이드 active 추가
}

//왼쪽 이미지 슬라이드 기능 구현
document.querySelector('.left-arrow').onclick = function() {
    var currentSlide = document.querySelector('#photo .slide.active');
    var previousSlide = currentSlide.previousElementSibling;
    if (previousSlide === null) {
        previousSlide = currentSlide.parentElement.lastElementChild;
    }
    currentSlide.animate({
        opacity: [1, 0]
    }, {
        duration: 500,
        easing: 'ease',
        iteration: 1,
        fill: 'both'
    })
    currentSlide.classList.remove('active');
    previousSlide.animate({
        opacity: [0, 1]
    }, {
        duration: 500,
        easing: 'ease',
        iteration: 1,
        fill: 'both'
    })
    previousSlide.classList.add('active');
}


