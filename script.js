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
