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

// SERVICE PAGES
function openPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-'+id).classList.add('active');
  document.body.style.overflow='hidden';
  window.scrollTo(0,0);
}
function closePage(){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.body.style.overflow='';
}

// FAQ
document.querySelectorAll('.faq-item').forEach(item=>{
  item.querySelector('.faq-q').addEventListener('click',()=>item.classList.toggle('open'));
});

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

// BLOG DATA
const blogs = {
  1: {
    cat: 'استراتيجية رقمية',
    title: 'لماذا معظم العلامات التجارية تُخفق رقمياً رغم الميزانيات الضخمة؟',
    meta: '٥ دقائق قراءة · Aura Media Group',
    body: `
      <p>في كل أسبوع، نلتقي بأصحاب علامات تجارية أنفقوا آلاف الدولارات على إعلانات، تصاميم، ومحتوى — لكن النتيجة كانت الصمت الرقمي.</p>
      <p>المشكلة لم تكن في الميزانية أبداً. كانت في <strong>غياب الهندسة.</strong></p>
      <h3>الفرق بين التواجد والحضور</h3>
      <p>التواجد الرقمي يعني أنك موجود — حساب هنا، موقع هناك، منشور بين حين وآخر. الحضور الرقمي يعني أنك <strong>تُشعَر به</strong> حتى حين تصمت.</p>
      <p>العلامات التي تُهاب رقمياً لا تنفق أكثر — تُفكّر بشكل مختلف. هي تبني نظاماً متكاملاً لا مجرد قطع متفرقة.</p>
      <h3>الأخطاء الثلاثة الأكثر شيوعاً</h3>
      <p><strong>١. البداية من التصميم لا من الاستراتيجية:</strong> الشعار الجميل لا يبني علامة — الرسالة الواضحة هي من تفعل ذلك.</p>
      <p><strong>٢. مطاردة الترند بدل بناء الهوية:</strong> كل موجة تنتهي. الهوية الراسخة تبقى.</p>
      <p><strong>٣. قياس الكم لا الأثر:</strong> ألف متابع من جمهورك الحقيقي يساوي مليوناً من غيره.</p>
      <h3>الحل؟ ابدأ بالهندسة</h3>
      <p>قبل أن تنفق دولاراً واحداً على إعلان، اسأل نفسك: هل علامتي واضحة؟ هل رسالتي محددة؟ هل تجربة عميلي متسقة؟</p>
      <p>إذا كان الجواب لا — فأنت لا تحتاج ميزانية أكبر. تحتاج <strong>هندسة أذكى.</strong></p>
    `
  },
  2: {
    cat: 'Personal Branding',
    title: 'العلامة الشخصية: كيف تجعل اسمك يُذكر قبل شركتك؟',
    meta: '٧ دقائق قراءة · Aura Media Group',
    body: `
      <p>حين يحتاج شخص ما خدمة في مجالك — من يتبادر إلى ذهنه أولاً؟ إذا لم يكن اسمك، فهذا المقال لك.</p>
      <h3>لماذا الاسم أقوى من الشعار؟</h3>
      <p>الناس لا يثقون في شركات — يثقون في أشخاص. حين تبني علامة شخصية قوية، أنت تبني <strong>جسر ثقة مباشر</strong> مع جمهورك لا يمكن لأي منافس نسخه.</p>
      <p>Jeff Bezos قال: "علامتك الشخصية هي ما يقوله الناس عنك حين تغادر الغرفة." السؤال: ماذا يقولون؟</p>
      <h3>ركائز العلامة الشخصية القوية</h3>
      <p><strong>١. زاوية النظر الفريدة (POV):</strong> ما الذي تراه في مجالك بشكل مختلف عن الجميع؟ هذا هو بذرة علامتك.</p>
      <p><strong>٢. الاتساق لا الكمال:</strong> الظهور المنتظم يبني الثقة أكثر من المنشور المثالي كل شهر.</p>
      <p><strong>٣. القصة قبل المعلومة:</strong> الناس لا يتذكرون الأرقام — يتذكرون القصص والمواقف.</p>
      <h3>من أين تبدأ؟</h3>
      <p>اسأل نفسك: ما المشكلة التي أحلها أفضل من أي شخص آخر؟ ابنِ كل محتواك حول هذه الإجابة، وستجد أن جمهورك يجدك — لا أنت تبحث عنه.</p>
    `
  },
  3: {
    cat: 'براندينغ فاخر',
    title: 'الفخامة الرقمية: ما الذي يجعل علامة ما تبدو بمليون وأخرى بألف؟',
    meta: '٦ دقائق قراءة · Aura Media Group',
    body: `
      <p>فتحت موقعين في نفس اللحظة. الأول جعلك تشعر أنك تتصفح متجر راقٍ في دبي. الثاني شعرت أنك في سوق شعبي مزدحم. نفس الخدمة، نفس السعر — لكن التجربة مختلفة تماماً.</p>
      <p>ما الذي صنع هذا الفرق؟</p>
      <h3>الفراغ يتكلم</h3>
      <p>العلامات الفاخرة لا تخاف المساحات الفارغة — تحتفي بها. كل مساحة بيضاء هي نَفَس يأخذه المتصفح قبل أن يستوعب رسالتك. <strong>الازدحام البصري = الرخص البصري.</strong></p>
      <h3>الخط الواحد أقوى من العشرة</h3>
      <p>العلامات التي تُهاب تختار خطاً واحداً وتتقنه. التنوع الزائد في الخطوط والألوان يُشتت ويُضعف — البساطة المقصودة هي الفخامة الحقيقية.</p>
      <h3>الصوت قبل الصورة</h3>
      <p>أكثر ما يُفرّق علامة فاخرة عن غيرها هو <strong>كيف تتكلم</strong> لا كيف تبدو. النبرة الواثقة، الكلمات المنتقاة، الجمل القصيرة الحادة — هذا ما يجعل العميل يشعر أنه أمام شيء استثنائي.</p>
      <h3>الخلاصة</h3>
      <p>الفخامة الرقمية ليست سعراً — إنها مجموع قرارات صغيرة صحيحة تتراكم لتبني شعوراً لا يُنسى. وهذا بالضبط ما نفعله في Aura.</p>
    `
  }
};

function openBlog(id) {
  const b = blogs[id];
  document.getElementById('bCat').textContent = b.cat;
  document.getElementById('bTitle').textContent = b.title;
  document.getElementById('bMeta').textContent = b.meta;
  document.getElementById('bBody').innerHTML = b.body;
  document.getElementById('bModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeBlog(e) {
  if (e.target === document.getElementById('bModal')) closeBlogBtn();
}
function closeBlogBtn() {
  document.getElementById('bModal').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeBlogBtn(); });

