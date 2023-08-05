/* 판매내역 클릭 이벤트 */

// 판매중
const salesTitleBtn = document.querySelector("dt.sales_title");
const salesCont = document.querySelector("dd.sales_cont");

salesTitleBtn.addEventListener("click", (e) => {
  e.preventDefault();
  salesTitleBtn.classList.add("on");
  salesCont.classList.add("on");
  // 거래완료,숨김 on제거
  dealTitleBtn.classList.remove("on");
  dealCont.classList.remove("on");
  hideTitleBtn.classList.remove("on");
  hideCont.classList.remove("on");
})

// 거래완료
const dealTitleBtn = document.querySelector("dt.deal_title");
const dealCont = document.querySelector("dd.deal_cont");

dealTitleBtn.addEventListener("click", (e) => {
  e.preventDefault();
  dealTitleBtn.classList.add("on");
  dealCont.classList.add("on");
  // 판매중,숨김 on제거
  salesTitleBtn.classList.remove("on");
  salesCont.classList.remove("on");
  hideTitleBtn.classList.remove("on");
  hideCont.classList.remove("on");
})

// 숨김
const hideTitleBtn = document.querySelector("dt.hide_title");
const hideCont = document.querySelector("dd.hide_cont");

hideTitleBtn.addEventListener("click", (e) => {
  e.preventDefault();
  hideTitleBtn.classList.add("on");
  hideCont.classList.add("on");
  // 판매중,거래완료 on제거
  salesTitleBtn.classList.remove("on");
  salesCont.classList.remove("on");
  dealTitleBtn.classList.remove("on");
  dealCont.classList.remove("on");
})


/* 판매중 content - 클릭드래그 슬라이드 */
$(document).ready(function() {

  $('.slides').slick({
    arrows: false,
    dots: false,
    infinite: false,
    speed: 400,
    slidesToShow: 3.3,
    slidesToScroll: 3,
  })
});
