document.documentElement.classList.add('js');
const header=document.querySelector('.nav');
const cards=document.querySelectorAll('.grid article,.catalog-grid article,.steps > div,.why > div,.trust > div,.choose-grid > div');
if('IntersectionObserver'in window){const reveal=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('revealed');reveal.unobserve(entry.target)}}),{threshold:.08});cards.forEach((card,index)=>{card.classList.add('reveal');card.style.setProperty('--delay',`${Math.min(index%4,3)*45}ms`);reveal.observe(card)})}else cards.forEach(card=>card.classList.add('revealed'));
if(header){const update=()=>header.classList.toggle('scrolled',scrollY>20);update();addEventListener('scroll',update,{passive:true})}
const toggle=document.getElementById('langToggle'),menu=document.getElementById('langMenu');
if(toggle&&menu){toggle.addEventListener('click',e=>{e.stopPropagation();const open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open))});document.addEventListener('click',()=>{menu.classList.remove('open');toggle.setAttribute('aria-expanded','false')});menu.addEventListener('click',e=>e.stopPropagation())}
const langButtons=document.querySelectorAll('[data-lang]');
function setLanguage(lang){document.documentElement.lang=lang;document.querySelectorAll('[data-en][data-sk]').forEach(el=>el.innerHTML=el.dataset[lang]);langButtons.forEach(btn=>btn.classList.toggle('active',btn.dataset.lang===lang));try{localStorage.setItem('miqd-lang',lang)}catch(e){}if(menu)menu.classList.remove('open');if(toggle)toggle.setAttribute('aria-expanded','false')}
let saved='en';try{saved=localStorage.getItem('miqd-lang')||((navigator.language||'').toLowerCase().startsWith('sk')?'sk':'en')}catch(e){}setLanguage(saved==='sk'?'sk':'en');langButtons.forEach(btn=>btn.addEventListener('click',()=>setLanguage(btn.dataset.lang)));
