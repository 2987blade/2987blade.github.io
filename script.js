const cur=document.getElementById('cur'),ring=document.getElementById('cur-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px'});
(function ar(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(ar)})();
document.querySelectorAll('a,button').forEach(el=>{el.addEventListener('mouseenter',()=>{ring.style.width='44px';ring.style.height='44px';ring.style.borderColor='var(--orange)'});el.addEventListener('mouseleave',()=>{ring.style.width='28px';ring.style.height='28px';ring.style.borderColor='var(--teal)'})});

// Particle BG
const bgC=document.getElementById('bg-canvas'),ctx=bgC.getContext('2d');
let W,H,pts=[];
function resize(){W=bgC.width=innerWidth;H=bgC.height=innerHeight}resize();window.addEventListener('resize',resize);
function mkP(){return{x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25,r:Math.random()*1.2+.3,a:Math.random()}}
for(let i=0;i<110;i++)pts.push(mkP());
(function draw(){ctx.clearRect(0,0,W,H);
pts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(0,240,212,${p.a*.35})`;ctx.fill()});
for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<120){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(0,240,212,${(1-d/120)*.08})`;ctx.lineWidth=.5;ctx.stroke()}}
requestAnimationFrame(draw)})();

// Radar
const rc=document.getElementById('radar-canvas'),rctx=rc.getContext('2d');
const cx=170,cy=170;let ang=0;
(function radar(){rctx.clearRect(0,0,340,340);
[130,100,70,40].forEach((r,i)=>{rctx.beginPath();rctx.arc(cx,cy,r,0,Math.PI*2);rctx.strokeStyle=`rgba(0,240,212,${.06+i*.04})`;rctx.lineWidth=1;rctx.stroke()});
rctx.strokeStyle='rgba(0,240,212,.08)';rctx.lineWidth=.8;
rctx.beginPath();rctx.moveTo(cx-135,cy);rctx.lineTo(cx+135,cy);rctx.stroke();
rctx.beginPath();rctx.moveTo(cx,cy-135);rctx.lineTo(cx,cy+135);rctx.stroke();
rctx.save();rctx.translate(cx,cy);
const sg=rctx.createLinearGradient(0,0,Math.cos(ang)*130,Math.sin(ang)*130);
sg.addColorStop(0,'rgba(0,240,212,0.18)');sg.addColorStop(1,'rgba(0,240,212,0)');
rctx.fillStyle=sg;rctx.beginPath();rctx.moveTo(0,0);rctx.arc(0,0,130,ang-.7,ang);rctx.closePath();rctx.fill();rctx.restore();
rctx.beginPath();rctx.arc(cx,cy,134,0,Math.PI*2);rctx.strokeStyle='rgba(0,240,212,.2)';rctx.lineWidth=1.5;rctx.stroke();
ang+=.018;requestAnimationFrame(radar)})();

// Scroll reveal
const io=new IntersectionObserver(entries=>{let d=0;entries.forEach(e=>{if(e.isIntersecting){setTimeout(()=>e.target.classList.add('in'),d);d+=60;io.unobserve(e.target)}})},{threshold:.07});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Side-index scroll-spy — highlights the section currently centered in view
const siLinks=document.querySelectorAll('.si-list a');
const siMap={};
siLinks.forEach(a=>siMap[a.dataset.sec]=a);
const spyObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      siLinks.forEach(a=>a.classList.remove('active'));
      const link=siMap[e.target.id];
      if(link)link.classList.add('active');
    }
  });
},{rootMargin:'-45% 0px -45% 0px',threshold:0});
['intro','skills','projects','labs','achievements','blog','education','contact'].forEach(id=>{
  const el=document.getElementById(id);if(el)spyObs.observe(el);
});

// Hide side-index while the hero/radar is on screen so nothing overlaps it
const sideIndex=document.querySelector('.side-index'),heroEl=document.getElementById('hero');
if(sideIndex&&heroEl){
  const heroObs=new IntersectionObserver(([entry])=>{sideIndex.classList.toggle('show',!entry.isIntersecting)},{threshold:0});
  heroObs.observe(heroEl);
}
const QUOTES=[
  {t:"The supreme art of war is to subdue the enemy without fighting.",a:"Sun Tzu"},
  {t:"Appear weak when you are strong, and strong when you are weak.",a:"Sun Tzu"},
  {t:"In the midst of chaos, there is also opportunity.",a:"Sun Tzu"},
  {t:"All warfare is based on deception.",a:"Sun Tzu"},
  {t:"Supreme excellence consists of breaking the enemy's resistance without fighting.",a:"Sun Tzu"},
  {t:"There is no instance of a nation benefiting from prolonged warfare.",a:"Sun Tzu"},
  {t:"Thus the expert in battle moves the enemy, and is not moved by him.",a:"Sun Tzu"},
  {t:"Know your enemy and know yourself, win without danger.",a:"Sun Tzu"},
  {t:"The opportunity of defeating the enemy is provided by the enemy himself.",a:"Sun Tzu"},
  {t:"One need not destroy one's enemy. One need only destroy his willingness to engage.",a:"Sun Tzu"},
  {t:"He will win who knows how to handle both superior and inferior forces.",a:"Sun Tzu"},
  {t:"If you know Heaven and know Earth, you may make your victory complete.",a:"Sun Tzu"},
  {t:"When you surround an army, leave an outlet free.",a:"Sun Tzu"},
  {t:"Do not press a desperate foe too hard.",a:"Sun Tzu"},
  {t:"Victory is reserved for those who are willing to pay its price.",a:"Sun Tzu"},
  {t:"He will win who knows when to fight and when not to fight.",a:"Sun Tzu"},
  {t:"There is no patch for stupidity.",a:"Kevin Mitnick"},
  {t:"Social engineering bypasses all technologies, including firewalls.",a:"Kevin Mitnick"},
  {t:"To some people I'll always be the bad guy.",a:"Kevin Mitnick"},
  {t:"Anything out there is vulnerable to attack given enough time and resources.",a:"Kevin Mitnick"},
  {t:"Choosing a hard-to-guess, but easy-to-remember password is important!",a:"Kevin Mitnick"},
  {t:"My primary goal of hacking was the intellectual curiosity, the seduction of adventure.",a:"Kevin Mitnick"},
  {t:"You can't go to Windows Update and get a patch for stupidity.",a:"Kevin Mitnick"},
  {t:"At the end of the day, my goal was to be the best hacker.",a:"Kevin Mitnick"},
  {t:"I saw myself as an electronic joy rider.",a:"Kevin Mitnick"},
  {t:"As a young boy, I was taught in high school that hacking was cool.",a:"Kevin Mitnick"},
  {t:"New security loopholes are constantly popping up because of wireless networking.",a:"Kevin Mitnick"},
  {t:"The cat-and-mouse game between hackers and system administrators is still in full swing.",a:"Kevin Mitnick"},
  {t:"If they told the reality, no one would care.",a:"Kevin Mitnick"},
  {t:"The weakest link in the security chain is the human element.",a:"Kevin Mitnick"},
  {t:"Should we fear hackers? Intention is at the heart of this discussion.",a:"Kevin Mitnick"},
  {t:"You can never protect yourself 100%.",a:"Kevin Mitnick"},
  {t:"Software is like sex: it's better when it's free.",a:"Linus Torvalds"},
  {t:"We all know Linux is great...it does infinite loops in 5 seconds.",a:"Linus Torvalds"},
  {t:"Talk is cheap. Show me the code.",a:"Linus Torvalds"},
  {t:"Sharing knowledge is the most fundamental act of friendship.",a:"Richard Stallman"},
  {t:"'Free software' is a matter of liberty, not price.",a:"Richard Stallman"},
  {t:"So happy hacking.",a:"Richard Stallman"},
  {t:"All the best people in life seem to like LINUX.",a:"Steve Wozniak"},
  {t:"Never trust a computer you can't throw out a window.",a:"Steve Wozniak"},
  {t:"Never underestimate the determination of a kid who is time-rich and cash-poor.",a:"Cory Doctorow"},
  {t:"It is impossible to work in information technology without also engaging in social engineering.",a:"Jaron Lanier"},
  {t:"Cryptography is the ultimate form of non-violent direct action.",a:"Julian Assange"},
  {t:"Security is a process, not a product.",a:"Bruce Schneier"},
  {t:"Amateurs hack systems, professionals hack people.",a:"Bruce Schneier"},
  {t:"Surveillance is the business model of the Internet.",a:"Bruce Schneier"},
  {t:"If something is free, you're not the customer; you're the product.",a:"Bruce Schneier"},
  {t:"The more technological a society is, the greater the security gap is.",a:"Bruce Schneier"},
  {t:"The user's going to pick dancing pigs over security every time.",a:"Bruce Schneier"},
  {t:"If someone steals your password, you can change it.",a:"Bruce Schneier"},
  {t:"This is our world now.",a:"The Mentor"},
  {t:"We exist without skin color, without nationality, without religious bias.",a:"The Mentor"},
  {t:"We explore\u2026 and you call us criminals.",a:"The Mentor"},
  {t:"We seek after knowledge\u2026 and you call us criminals.",a:"The Mentor"},
  {t:"My crime is that of curiosity.",a:"The Mentor"},
  {t:"You may stop this individual, but you can't stop us all.",a:"The Mentor"},
  {t:"We don't have to ask for our privacy, we can take it back.",a:"Edward Snowden"},
  {t:"I would rather be without a state than without a voice.",a:"Edward Snowden"},
  {t:"Privacy is a function of liberty.",a:"Edward Snowden"},
  {t:"Truth is coming and it cannot be stopped.",a:"Edward Snowden"},
  {t:"What is right is not always the same as what is legal.",a:"Edward Snowden"},
  {t:"Even if you're not doing anything wrong, you are being watched and recorded.",a:"Edward Snowden"},
  {t:"If you're not acting on your beliefs, then they probably aren't real.",a:"Edward Snowden"},
  {t:"Sometimes the scandal is not what law was broken, but what the law allows.",a:"Edward Snowden"},
  {t:"To tell the truth is not a crime.",a:"Edward Snowden"},
  {t:"The immoral cannot be made moral through the use of secret law.",a:"Edward Snowden"},
  {t:"A child born today will grow up with no conception of privacy at all.",a:"Edward Snowden"},
  {t:"Your rights matter, because you never know when you're going to need them.",a:"Edward Snowden"},
  {t:"We need to think about encryption not as this sort of arcane, black art.",a:"Edward Snowden"},
  {t:"If it's Smart, it's Vulnerable.",a:"Mikko Hypponen"},
  {t:"Today the hackers we see are not just graffiti artists, they are organized criminals.",a:"Mikko Hypponen"},
  {t:"Security isn't a feature\u2014it's a mindset.",a:"Katie Moussouris"},
  {t:"Cyber risk is business risk.",a:"George Kurtz"},
  {t:"The most sophisticated attack is a well-written email.",a:"Kevin Mandia"},
  {t:"Don't wait to be breached to start protecting yourself.",a:"Nicole Perlroth"},
  {t:"Your data footprint is your digital fingerprint\u2014treat it with care.",a:"Eva Galperin"},
  {t:"We do not forgive. We do not forget.",a:"Anonymous"},
  {t:"Information wants to be free.",a:"Stewart Brand"},
  {t:"Security through obscurity is not security.",a:"Infosec Proverb"},
  {t:"Complexity is the enemy of security.",a:"Infosec Proverb"},
  {t:"Don't be the low-hanging fruit.",a:"Security Proverb"}
];
// Quote rotator — shuffles the pool once per pass so it never repeats until
// every quote has shown, then reshuffles for the next loop.
function shuffle(arr){
  const a=arr.slice();
  for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}
  return a;
}
const qTextEl=document.getElementById('quote-text'),qByEl=document.getElementById('quote-by'),qRotator=document.getElementById('quote-rotator');
if(qTextEl&&qByEl&&qRotator&&QUOTES.length){
  let order=shuffle(QUOTES),qi=0;
  qTextEl.textContent='"'+order[0].t+'"';
  qByEl.textContent='— '+order[0].a;
  setInterval(()=>{
    qRotator.classList.add('quote-fade');
    setTimeout(()=>{
      qi++;
      if(qi>=order.length){order=shuffle(QUOTES);qi=0}
      qTextEl.textContent='"'+order[qi].t+'"';
      qByEl.textContent='— '+order[qi].a;
      qRotator.classList.remove('quote-fade');
    },500);
  },6000);
}

// Scroll progress bar + banner parallax — one rAF-throttled handler for both
const progressBar=document.getElementById('scroll-progress');
const bannerSvg=document.querySelector('.banner-svg');
let scrollTicking=false;
function onScrollFrame(){
  const scrollTop=window.scrollY||document.documentElement.scrollTop;
  const docHeight=document.documentElement.scrollHeight-window.innerHeight;
  const pct=docHeight>0?(scrollTop/docHeight)*100:0;
  if(progressBar)progressBar.style.width=pct+'%';
  if(bannerSvg)bannerSvg.style.transform='translateY('+Math.min(scrollTop*0.12,50)+'px)';
  scrollTicking=false;
}
document.addEventListener('scroll',()=>{
  if(!scrollTicking){requestAnimationFrame(onScrollFrame);scrollTicking=true}
},{passive:true});
onScrollFrame();
