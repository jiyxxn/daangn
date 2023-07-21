$(document).ready(function (){

  var bMove = false;
  var startX = 0;
  var scrollLeft = 0;
  var slider = document.querySelector("dl.active > div");
  console.log(slider)

  slider.addEventListener("mousedown", function(e){
    bMove = true;
    startX = e.pageX - slider.offsetLeft;
    // 페이지 내 X축의 위치 찾기
    scrollLeft = slider.scrollLeft;
    // 횡이동을 담당하는 api가 scrollLeft. scrollRight는 없음
  });

  slider.addEventListener("mouseleave", function (){
    bMove = false;
    // 마우스 포커싱 이동이 끝났음을 알림
  });

  slider.addEventListener("mouseup", function(){
    bMove = false;
    // 마우스 클릭을 중단하면 이동이 끝났음을 알림
  });

  slider.addEventListener("mousemove", function(e) {
    e.preventDefault();
    if(bMove){
      const x = e.pageX - slider.offsetLeft;
      const walk = x - startX;
      slider.scrollLeft = scrollLeft - walk;
      console.log(scrollLeft, x, startX)
    }
  });


});