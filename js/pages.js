// pages.js — تفاعلات الصفحات الداخلية
(function(){
  // احترام ثيم الموقع المحفوظ
  if(localStorage.getItem('aura-theme')==='light')document.body.classList.add('light');

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(function(item){
    var q=item.querySelector('.faq-q');
    if(q)q.addEventListener('click',function(){item.classList.toggle('open');});
  });

  // reveal on scroll
  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}});
    },{threshold:.12});
    els.forEach(function(el){io.observe(el);});
  }else{els.forEach(function(el){el.classList.add('visible');});}

  // مشاركة المقال
  window.shareArticle=function(net){
    var url=encodeURIComponent(location.href), t=encodeURIComponent(document.title);
    var map={
      x:'https://twitter.com/intent/tweet?text='+t+'&url='+url,
      fb:'https://www.facebook.com/sharer/sharer.php?u='+url,
      wa:'https://wa.me/?text='+t+'%20'+url,
      ln:'https://www.linkedin.com/sharing/share-offsite/?url='+url
    };
    if(map[net])window.open(map[net],'_blank','noopener,width=600,height=500');
  };
})();
