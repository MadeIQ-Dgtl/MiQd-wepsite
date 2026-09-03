document.documentElement.classList.add('js');
const header=document.querySelector('.nav');
const cards=document.querySelectorAll('.grid article,.catalog-grid article,.steps > div,.why > div,.trust > div,.choose-grid > div');
if('IntersectionObserver'in window){const reveal=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('revealed');reveal.unobserve(entry.target)}})},{threshold:.12});cards.forEach((card,index)=>{card.classList.add('reveal');card.style.setProperty('--delay',`${Math.min(index%6,5)*55}ms`);reveal.observe(card)})}else cards.forEach(card=>card.classList.add('revealed'));
if(header){const updateHeader=()=>header.classList.toggle('scrolled',window.scrollY>20);updateHeader();window.addEventListener('scroll',updateHeader,{passive:true})}
const langButtons=document.querySelectorAll('[data-lang]');
function setLanguage(lang){document.documentElement.lang=lang;document.querySelectorAll('[data-en][data-sk]').forEach(el=>{el.innerHTML=el.dataset[lang]});langButtons.forEach(btn=>btn.classList.toggle('active',btn.dataset.lang===lang));try{localStorage.setItem('miqd-lang',lang)}catch(e){}}
let saved='en';try{saved=localStorage.getItem('miqd-lang')||((navigator.language||'').toLowerCase().startsWith('sk')?'sk':'en')}catch(e){}
setLanguage(saved==='sk'?'sk':'en');langButtons.forEach(btn=>btn.addEventListener('click',()=>setLanguage(btn.dataset.lang)));
const hash=window.location.hash;if(hash&&hash.startsWith('#product-')){const target=document.querySelector(hash);if(target){target.classList.add('product-focus');setTimeout(()=>target.classList.remove('product-focus'),2200)}}