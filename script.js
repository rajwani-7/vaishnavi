/* ===== Customize your surprise here ===== */
const sisterName = 'Tai';
const photos = ['images/p1.jpeg','images/p2.jpeg','images/p3.jpeg','images/ps.jpeg'];
/* To add music: put an MP3 at music/rakhi-music.mp3 */

document.querySelectorAll('.sister-name').forEach(el => el.textContent = sisterName);
const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

// Reveal the letter one thought at a time.
document.querySelectorAll('.letter p').forEach((paragraph, index) => {
  paragraph.classList.add('letter-line');
  paragraph.style.transitionDelay = `${index * 120}ms`;
  revealObserver.observe(paragraph);
});

// Gentle desktop parallax for the memory cards.
const gallery = document.querySelector('.gallery');
window.addEventListener('scroll', () => {
  if (innerWidth < 761) return;
  const offset = gallery.getBoundingClientRect().top - innerHeight / 2;
  document.querySelectorAll('.polaroid').forEach((card, index) => {
    card.style.translate = `0 ${Math.max(-14, Math.min(14, offset * (index % 2 ? -1 : 1) * .025))}px`;
  });
}, { passive: true });

function sparkles(amount=20){for(let i=0;i<amount;i++){const s=document.createElement('i');s.className='burst';s.textContent=i%3?'✦':'♥';s.style.cssText=`position:fixed;z-index:80;left:${20+Math.random()*60}vw;top:${25+Math.random()*45}vh;color:${i%3?'#d6a74f':'#b93d60'};font-style:normal;font-size:${10+Math.random()*20}px;pointer-events:none;transition:all ${.8+Math.random()}s ease-out;`;document.body.append(s);requestAnimationFrame(()=>{s.style.transform=`translate(${(Math.random()-.5)*280}px,${-80-Math.random()*180}px) rotate(180deg)`;s.style.opacity='0'});setTimeout(()=>s.remove(),1900)}}
document.getElementById('openSurprise').onclick=()=>{sparkles(13);document.getElementById('memories').scrollIntoView({behavior:'smooth'})};
const gift=document.getElementById('openGift');function beginGift(){gift.classList.add('open');sparkles(20);setTimeout(()=>document.getElementById('question').scrollIntoView({behavior:'smooth'}),700)}gift.onclick=beginGift;document.getElementById('openGiftText').onclick=beginGift;

const yes=document.getElementById('yesButton'),tease=document.getElementById('tease');let tries=0;const words=['Are you sure? 👀','Nice try 😂','You really want that gift, huh?','Almost there… one more time! 😄'];
function dodge(e){e.preventDefault();tries+=1;if(tries===5){tease.textContent='Okay okay! You win 😂❤️';yes.classList.remove('moving');setTimeout(revealGift,700);return}tease.textContent=words[tries-1];yes.classList.add('moving');const pad=18,w=yes.offsetWidth,h=yes.offsetHeight;yes.style.left=`${pad+Math.random()*(innerWidth-w-pad*2)}px`;yes.style.top=`${Math.max(90,pad+Math.random()*(innerHeight-h-pad*2))}px`}
yes.addEventListener('pointerdown',dodge);function revealGift(){yes.classList.remove('moving');const finalGift=document.getElementById('finalGift');finalGift.hidden=false;sparkles(32);finalGift.scrollIntoView({behavior:'smooth'})}
const noMessage=document.getElementById('noMessage');document.getElementById('noButton').onclick=()=>{noMessage.hidden=false;noMessage.classList.add('visible');document.getElementById('noButton').disabled=true;document.getElementById('noButton').style.opacity='.45'};document.getElementById('showGift').onclick=revealGift;
document.getElementById('lastSurprise').onclick=()=>{sparkles(25);document.getElementById('lastPhoto').scrollIntoView({behavior:'smooth'})};
const audio=document.getElementById('music'),music=document.getElementById('musicToggle');music.onclick=()=>{if(audio.paused){audio.play().then(()=>{music.classList.add('active');music.setAttribute('aria-label','Pause background music')}).catch(()=>alert('Add an MP3 file at music/rakhi-music.mp3 to use music.'))}else{audio.pause();music.classList.remove('active')}};
