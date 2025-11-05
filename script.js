const CRED = { user: 'alvaro', pass: 'tredict' };

const loginCard = document.getElementById('loginCard');
const dashCard = document.getElementById('dashCard');
const btnLogin = document.getElementById('btnLogin');
const btnLogout = document.getElementById('btnLogout');
const btnSend = document.getElementById('btnSend');
const btnDev = document.getElementById('btnDev');
const inUser = document.getElementById('inUser');
const inPass = document.getElementById('inPass');
const dateText = document.getElementById('dateText');
const popup = document.getElementById('popup');
const phoneInput = document.getElementById('phone');
const menuSelect = document.getElementById('menuSelect');
const connectedTextEl = document.getElementById('connectedText');

const modalBack = document.getElementById('modalBack');
const modalItems = Array.from(document.querySelectorAll('.modal .item'));

const CONNECTED_TEXT = '● CONNECTED';
let typingTimer = null;

function startTypingConnected(){
  clearInterval(typingTimer);
  connectedTextEl.textContent = '';
  const chars = Array.from(CONNECTED_TEXT);
  let idx = 0;
  typingTimer = setInterval(()=>{
    if(idx >= chars.length){
      clearInterval(typingTimer);
      setTimeout(()=> startTypingConnected(), 1400);
      return;
    }
    connectedTextEl.textContent += chars[idx++];
  }, 90);
}

function showPopup(message){
  popup.textContent = message;
  popup.classList.add('show');
  popup.style.pointerEvents = 'auto';
  setTimeout(()=>{
    popup.classList.remove('show');
    popup.style.pointerEvents = 'none';
  }, 3420);
}

btnLogin.addEventListener('click', ()=>{
  const u = inUser.value.trim();
  const p = inPass.value.trim();
  if(!u || !p){
    alert('Silakan isi username & password.');
    return;
  }
  if(u !== CRED.user || p !== CRED.pass){
    showPopup('❌ Login failed — check credentials');
    return;
  }
  loginCard.style.display = 'none';
  dashCard.style.display = 'block';
  dateText.textContent = new Date().toLocaleString();
  startTypingConnected();
  showPopup('✅ Login successful — Welcome ' + u);
});

btnLogout.addEventListener('click', ()=>{
  dashCard.style.display = 'none';
  loginCard.style.display = 'block';
  showPopup('✅ Logged out');
});

btnSend.addEventListener('click', ()=>{
  const phone = phoneInput.value.trim();
  const menu = menuSelect.value;
  const numberText = phone ? (' ' + phone) : '';
  const msg = `✅ PROCESS COMPLETED — NO TARGET DETECTED${numberText} ⚡`;
  showPopup(msg);
});

btnDev.addEventListener('click', ()=>{
  modalBack.style.display = 'flex';
});
modalBack.addEventListener('click', (e)=>{
  if(e.target === modalBack) modalBack.style.display = 'none';
});
modalItems.forEach(it=>{
  it.addEventListener('click', ()=>{
    modalItems.forEach(mi=> mi.style.background = '');
    it.style.background = 'rgba(0,0,0,0.06)';
    setTimeout(()=> modalBack.style.display = 'none', 180);
    showPopup('Selected: ' + it.dataset.value);
  });
});

[inUser,inPass].forEach(el=>{
  el.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter') btnLogin.click();
  });
});

const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let w = canvas.width = innerWidth;
let h = canvas.height = innerHeight;
const particles = [];
const COUNT = Math.max(28, Math.floor((w*h)/90000));

function rand(min,max){return Math.random()*(max-min)+min}
function Particle(){
  this.x = rand(0,w);
  this.y = rand(0,h);
  this.vx = rand(-0.12,0.12);
  this.vy = rand(-0.03,0.03);
  this.r = rand(0.6,2.2);
  this.color = Math.random() < 0.6 ? `rgba(138,43,226,${rand(0.04,0.14)})` : `rgba(0,191,255,${rand(0.03,0.10)})`;
  this.glow = rand(6,18);
}
for(let i=0;i<COUNT;i++) particles.push(new Particle());
function resize(){ w = canvas.width = innerWidth; h = canvas.height = innerHeight; }
addEventListener('resize', resize);
function draw(){
  ctx.clearRect(0,0,w,h);
  for(const p of particles){
    p.x += p.vx; p.y += p.vy;
    if(p.x < -10) p.x = w + 10;
    if(p.x > w + 10) p.x = -10;
    if(p.y < -10) p.y = h + 10;
    if(p.y > h + 10) p.y = -10;
    const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.glow);
    g.addColorStop(0,p.color); g.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
  }
  requestAnimationFrame(draw);
}
draw();

connectedTextEl.textContent = '';
