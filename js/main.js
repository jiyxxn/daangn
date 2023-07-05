// 점핑이벤트 삭제
document.addEventListener("click", (e) => {
  e.preventDefault();
});

// 중고거래 카테고리 클릭
var categoryBtn = document.querySelector(".category_title");

categoryBtn.addEventListener("click", function () {
  var menuWrap = document.querySelector(".menu_wrap");
  if (menuWrap.classList.contains("on")) {
    menuWrap.style.maxHeight = "0px";
  } else {
    menuWrap.style.height = menuWrap.scrollHeight + "px";
  }
  menuWrap.classList.toggle("on");
  categoryBtn.classList.toggle("on");
});

document.querySelectorAll(".slide_menu").forEach(function(menu) {
  menu.style.maxHeight = menu.scrollHeight + "px";
})
var menuTitles = document.querySelectorAll(".menu_title");

menuTitles.forEach(function (menuTitle) {
  menuTitle.addEventListener("click", function () {
    var ul = this.parentNode.nextElementSibling;
    var slideMenu = document.querySelector(".slide_menu");
    // 다른 menu_title 요소들에게서 클래스를 제거
    var allMenuTitles = document.querySelectorAll(".menu_title");
    if (ul.style.maxHeight){
      ul.style.maxHeight = null;
    } else {
      ul.style.maxHeight = ul.scrollHeight + "px";
    }
    allMenuTitles.forEach(function (menuTitleElement) {

      if (menuTitleElement !== menuTitle) {
      }
    });

    var menuWrap = document.querySelector(".menu_wrap");

    // 클릭한 ul 요소와 menu_title 요소에 클래스를 추가
    var ulToggled = ul.classList.toggle("active");
    if (ulToggled) {
      menuWrap.style.height = `${menuWrap.scrollHeight - ul.scrollHeight}px`;
    } else {
      menuWrap.style.height = `${menuWrap.scrollHeight + ul.scrollHeight}px`;
    }

    menuTitle.classList.toggle("active");
    
  });
});

// 슬라이드
var bannerFrame = document.querySelector(".banner_frame");
var bannerItems = document.querySelectorAll(".banner_item");
var actualBannerItems = document.querySelectorAll(".banner_item.actual");
var prevBtn = document.querySelector(".prev");
var nextBtn = document.querySelector(".next");
var paginationItems = document.querySelectorAll(".banner_roll li");
var bannerRollLinks = document.querySelectorAll(".banner_roll a");
var bannerRoll = document.querySelector(".banner_roll");

var prevIndex = 0;
var currentIndex = 1;
var pageIndex = 1;
var totalItems = actualBannerItems.length;
var bannerWidth = bannerItems[1].offsetWidth;

// 이전 버튼 클릭 이벤트
prevBtn.addEventListener("click", function () {
  prevIndex = currentIndex;
  currentIndex--;
  updateSlide();
});

// 다음 버튼 클릭 이벤트
nextBtn.addEventListener("click", function () {
  prevIndex = currentIndex;
  currentIndex++;
  updateSlide();
});
// 페이지네이션 클릭 이벤트
for (var i = 0; i < bannerRollLinks.length; i++) {
  bannerRollLinks[i].addEventListener("click", function () {
    prevIndex = currentIndex;
    currentIndex = parseInt(this.getAttribute("data-slide-index"));

    if(prevIndex == 4 && currentIndex == 1) {
      currentIndex = 5;
    } else if(prevIndex == 1 && currentIndex == 4) {
      currentIndex = 0;
    }

    updateSlide();
  });
}

// 슬라이드 업데이트 함수
function updateSlide() {
    // 일반적인 슬라이드 전환
    bannerFrame.style.transition = "transform 0.5s ease-in-out";
    bannerFrame.style.transform =
      "translateX(" + -bannerWidth * currentIndex + "px)";
    
    if (bannerItems[currentIndex].id === 'firstClone') {
      pageIndex = 1;
    } else if (bannerItems[currentIndex].id === 'lastClone') {
      pageIndex = totalItems;
    } else {
      pageIndex = currentIndex;
    }
    
    updatePagination(pageIndex);

    // 배너가 2번째와 4번째일 때만 banner_roll에 클래스 추가
    if (pageIndex === 2 || pageIndex === 4) {
      bannerRoll.classList.add("even");
    } else {
      bannerRoll.classList.remove("even");
    }
}

// 페이지네이션 업데이트 함수
function updatePagination(pageIndex) {
  for (var i = 0; i < paginationItems.length; i++) {
    paginationItems[i].classList.remove("active");
  }
  paginationItems[pageIndex-1].classList.add("active");

  // 배너 롤 링크에 클래스 추가
  for (var j = 0; j < bannerRollLinks.length; j++) {
    if (j === pageIndex-1) {
      bannerRollLinks[j].classList.add("active");
    } else {
      bannerRollLinks[j].classList.remove("active");
    }
  }

  // 배너가 2번째와 4번째일 때만 banner_roll에 클래스 추가
  if (pageIndex === 2 || pageIndex === 4) {
    bannerRoll.classList.add("special");
  } else {
    bannerRoll.classList.remove("special");
  }
}

// 초기 페이지네이션 표시
updatePagination(pageIndex);
updateSlide();

// transition 끝날때마다 실행되는 이벤트
bannerFrame.addEventListener('transitionend', () => {
  // 마지막 복제 슬라이드가 보이면
  if (bannerItems[currentIndex].id === 'firstClone') {
      bannerFrame.style.transition = "none";
      currentIndex = 1;
      bannerFrame.style.transform =
        "translateX(" + -bannerWidth * currentIndex + "px)";
  }

  // 첫 번째 복제 슬라이드가 보이면
  if (bannerItems[currentIndex].id === 'lastClone') {
      bannerFrame.style.transition = "none";
      currentIndex = totalItems;
      bannerFrame.style.transform =
        "translateX(" + -bannerWidth * currentIndex + "px)";
  }
});

//✅ 중고거래 인기매물 더보기 스크립트

window.onload=function(){
  const text_more_wrap = document.querySelector('.text_more_wrap');
  const text_downsize_wrap = document.querySelector('.text_downsize_wrap');
  const wrap_02_sht = document.querySelector('.wrap_02_sht');

  console.log(text_more_wrap, wrap_02_sht, text_downsize_wrap);

  text_more_wrap.addEventListener('click', function(){
    wrap_02_sht.style.display = 'block';
    text_more_wrap.style.opacity = '0';
  })
  
  text_downsize_wrap.addEventListener('click', function(){
    wrap_02_sht.style.display = 'none';
    text_more_wrap.style.opacity = '100';
    // text_more_wrap의 css를 display : block으로 했더니 기존의 flex가 망가지는 논리구조가 발생함
  })
}
