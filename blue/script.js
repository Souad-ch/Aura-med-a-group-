// Aura — نسخة زرقاء
const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// LOADER
function hideLoader(){
  const l=document.getElementById('loader');
  if(!l||l.classList.contains('hide'))return;
  l.classList.add('hide'); setTimeout(()=>l.style.display='none',700);
}
setTimeout(hideLoader, RM?300:2300);

// NAV scroll
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>40));

// HAMBURGER
const ham=document.getElementById('ham'), mob=document.getElementById('mob');
ham.addEventListener('click',()=>{
  ham.classList.toggle('open'); mob.classList.toggle('open');
  document.body.style.overflow=mob.classList.contains('open')?'hidden':'';
});
mob.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  ham.classList.remove('open'); mob.classList.remove('open'); document.body.style.overflow='';
}));

// REVEAL
const els=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window && !RM){
  const io=new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target);}
  }),{threshold:.12});
  els.forEach(el=>io.observe(el));
}else{els.forEach(el=>el.classList.add('show'));}

// FORM
const form=document.querySelector('.cta-form');
if(form){
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    const btn=form.querySelector('button');
    const old=btn.textContent; btn.textContent='جاري الإرسال...'; btn.disabled=true;
    try{
      const res=await fetch('https://api.web3forms.com/submit',{method:'POST',body:new FormData(form)});
      const data=await res.json();
      if(data.success){form.reset();btn.textContent='✓ وصلنا طلبك — سنتواصل خلال 24 ساعة';}
      else{btn.textContent='حدث خطأ، حاول مجدداً';btn.disabled=false;}
    }catch{btn.textContent='حدث خطأ، حاول مجدداً';btn.disabled=false;}
  });
}
