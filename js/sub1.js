// 판매내역 - 탭메뉴 클릭하면 해당하는 내용물 나오기

const tabMenu = document.querySelectorAll("div.content2 > dl > dt")
const selling = document.querySelector("dd.selling")
const complete = document.querySelector("dd.complete")
const hide = document.querySelector("dd.hide")
const all = document.querySelectorAll("div.content2 > dl > dd")


for(let i = 0; i < tabMenu.length; i++){
  tabMenu[i].addEventListener("click", (e)=> {
    e.preventDefault();
    tabMenu.forEach(item => {
      item.classList.remove("on")
    })
    e.currentTarget.classList.add("on")
    all.forEach(item => {
      item.style.display = "none"
    })

    let className = e.currentTarget.getAttribute("class"); 
    switch(className) {
      case "selling on":
        selling.style.display = "block"
        break;
  
      case "complete on":
        complete.style.display = "block"
        break;
  
      case "hide on": 
        hide.style.display = "block"
        break;
      
      default:
        break;
    }

  })
}

// 드래그 이벤트
const productList = document.querySelector("dd.selling > ul");
const scrollWidth = productList.scrollWidth; //가려진 영역을 포함한 ul의 가로 길이
const clientWidth = productList.clientWidth; //가려진 영역을 제외한 ul의 가로 길이

let startX = 0; 
let nowX = 0;
let endX = 0;
let listX = 0;

// 스크롤이 종료된 위치는 요소의 translateX값으로 알 수 있다. getComputedStyle 메소드를 사용하면 요소가 가진 CSS의 속성값을 불러올수 있는데 
// transform의 경우 x,y,z 값을 반환하므로 정규표현식을 통해 x값만 추출한다 
const getTranslateX = () => {
  return parseInt(getComputedStyle(productList).transform.split(/[^\-0-9]+/g)[5]);
};

// 스크롤이 될때마다 요소의 위치를 조정해주는 함수 
const setTranslateX = (x) => {
  productList.style.transform = `translateX(${x}px)`;
};

// 스크롤 시작 이벤트 함수  - 스크롤을 시작하게 되면 마우스로 스크롤한 지점을 startX 변수에 저장 
const onScrollStart = e => {
  startX = e.clientX  //e.clientX : 마우스로 클릭한 지점의 X축 좌표
  console.log(startX)
  window.addEventListener("mousemove", onScrollMove);
  // window.addEventListener("touchmove", onScrollMove);
  window.addEventListener("mouseup", onScrollEnd);
  // window.addEventListener("touchend", onScrollEnd);
}; 

// 스크롤 진행 이벤트 함수
const onScrollMove = e => {
  nowX = e.clientX; //스크롤 중에 현재 마우스 포인터가 위치하는 X축 좌표
  setTranslateX(listX + nowX - startX) //시작지점인 startx와 현재지점인 nowx의 차이만큼 이동한다
  //listX는 최초 스크롤시에는 필요없지만 두번째 스크롤때부터 필요하다. listX는 현재 이동한 거리(getTranslateX 함수 안에서 할당)를 나타내는데, listx로 이동한 거리를 계산해주지 않으면 매 스크롤 순간 최초위치(translatex=0)에서 시작된다
}; 

// 스크롤 종료 이벤트 함수
// 기차가 정해진 범위를 벗어나면 그 이상 더 움직이지 않도록 컨트롤하고, 모든 이벤트를 제거
const onScrollEnd = e => {
  endX = e.clientX;
  listX = getTranslateX();
  if (listX > 0) { //translateX 값이 양수면 (즉 막다른 길인데 오른쪽으로 더 이동할려고하면)
    setTranslateX(0);
    productList.style.transition = `all 0.3s ease`; //범위를 벗어나면 유효 범위로 자연스럽게 돌아올 수 있도록 애니메이션 효과 
    listX = 0;
  } else if (listX < clientWidth - scrollWidth) { //clientWidth - scrollWidth는 translateX로 기차를 이동시킬수 있는 최대 범위(음수)
    setTranslateX(clientWidth - scrollWidth);
    productList.style.transition = `all 0.3s ease`;
    listX = clientWidth - scrollWidth;
  }

  window.removeEventListener('mousedown', onScrollStart);
  window.removeEventListener('touchstart', onScrollStart);
  window.removeEventListener('mousemove', onScrollMove);
  window.removeEventListener('touchmove', onScrollMove);
  window.removeEventListener('mouseup', onScrollEnd);
  window.removeEventListener('touchend', onScrollEnd);

  //애니메이션이 0.3초동안 진행되기때문에 제거한 이벤트를 0.3초 이후에 다시 실행시킬 수 있도록 setTimeout 사용
  setTimeout(()=> {
    productList.addEventListener("mousedown", onScrollStart);
    productList.style.transition = ""
  },300)
}; 


productList.addEventListener("mousedown", onScrollStart);
