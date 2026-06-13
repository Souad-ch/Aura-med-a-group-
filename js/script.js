// LOADER — يختفي فور تحميل الصفحة (بحد أقصى قصير لإظهار الأنيميشن)
function hideLoader(){
  const l=document.getElementById('loader');
  if(!l||l.classList.contains('hide'))return;
  l.classList.add('hide');
  setTimeout(()=>l.style.display='none',800);
}
window.addEventListener('load',()=>setTimeout(hideLoader,600));
// شبكة أمان: لا تعلّق الصفحة أبداً خلف اللودر
setTimeout(hideLoader,2500);

// CURSOR
const cur=document.getElementById('cur'),curR=document.getElementById('curR');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx-4+'px';cur.style.top=my-4+'px';});
function animR(){rx+=(mx-rx-18)*.12;ry+=(my-ry-18)*.12;curR.style.left=rx+'px';curR.style.top=ry+'px';requestAnimationFrame(animR);}
animR();
document.querySelectorAll('a,button').forEach(el=>{
  el.addEventListener('mouseenter',()=>{curR.style.width='60px';curR.style.height='60px';});
  el.addEventListener('mouseleave',()=>{curR.style.width='36px';curR.style.height='36px';});
});

// NAV
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>{
  nav.classList.toggle('scrolled',window.scrollY>60);
  document.getElementById('stickyBar').classList.toggle('show',window.scrollY>400);
});

// HAMBURGER
const ham=document.getElementById('ham'),mob=document.getElementById('mobMenu');
ham.addEventListener('click',()=>{ham.classList.toggle('open');mob.classList.toggle('open');document.body.style.overflow=mob.classList.contains('open')?'hidden':'';});
function closeMenu(){ham.classList.remove('open');mob.classList.remove('open');document.body.style.overflow='';}

// THEME
const tBtn=document.getElementById('themeBtn');
if(localStorage.getItem('aura-theme')==='light')document.body.classList.add('light');
tBtn.addEventListener('click',()=>{document.body.classList.toggle('light');localStorage.setItem('aura-theme',document.body.classList.contains('light')?'light':'dark');});

// REVEAL
const revEls=document.querySelectorAll('.reveal');
new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');}),{threshold:.1}).observe=function(el){this._orig(el);};
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');}),{threshold:.1});
revEls.forEach(el=>io.observe(el));

// PARTICLES
const pc=document.getElementById('ptcl');
for(let i=0;i<25;i++){const p=document.createElement('div');p.className='particle';const s=Math.random()*2+1;p.style.cssText=`width:${s}px;height:${s}px;left:${Math.random()*100}%;animation-duration:${8+Math.random()*12}s;animation-delay:${Math.random()*8}s;`;pc.appendChild(p);}

// FORM
const cForm=document.getElementById('cForm');
cForm.addEventListener('submit',async e=>{
  e.preventDefault();
  const btn=cForm.querySelector('.form-submit');
  btn.textContent='جاري الإرسال...';btn.disabled=true;
  try{
    const res=await fetch('https://api.web3forms.com/submit',{method:'POST',body:new FormData(cForm)});
    const data=await res.json();
    if(data.success){
      cForm.reset();
      document.getElementById('formOk').style.display='block';
      setTimeout(()=>{document.getElementById('thankyou').classList.add('active');},1000);
    }else{btn.textContent='حدث خطأ، حاول مجدداً';btn.disabled=false;}
  }catch{btn.textContent='حدث خطأ، حاول مجدداً';btn.disabled=false;}
});
