
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