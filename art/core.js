/* ===== Gleemoji core: drawing kit + helpers ===== */
let U=0;
const INK='#46260F';
const Y=['#FFEC94','#FFC93C','#EF9414'], RED=['#FFA184','#F2563F','#BC2A20'], BLUE=['#CDEEFF','#72C6F5','#2C81C6'], GREEN=['#E1F7A6','#A9D95C','#689C2B'];
const PINK=['#FF9DB0','#F43F5E','#B0123A'], WATER=['#C9EEFF','#5AB8F5','#2276C2'], GOLD=['#FFF2A6','#FFC83D','#E38A0B'];
const ORANGE=['#FFD08A','#FF8A1F','#D9500C'], PURPLE=['#D9C8FF','#8B5CF6','#5427C2'], BROWN=['#D9A57A','#9A5B33','#5E3218'];
const GREY=['#F2F4F8','#B9C0CE','#7A8296'], WHITE=['#FFFFFF','#F2F4F9','#C6CDDB'], BLACK=['#6A6F84','#2C2F3D','#0E0F16'];
const LEAF=['#B8F08A','#4CBF4A','#23802F'], TAN=['#F8DDB4','#E7B57C','#B9824A'], SKIN=['#FFE58A','#FFC83D','#E3940F'];
const CREAM=['#FFFBEA','#FBEFCB','#D8C28C'], ROSE=['#FFD3DC','#FF9DB4','#E0607E'], TEAL=['#B5F2EA','#2FC2B0','#138476'];
const NAVY=['#8FA7FF','#3557E0','#1C2F99'], SILVER=['#FFFFFF','#E3E8F2','#A3AEC5'], DARKBROWN=['#A9714A','#6B3F22','#3D2010'];

const E=(cx,cy,rx,ry=rx)=>`M${cx-rx} ${cy}a${rx} ${ry} 0 1 0 ${2*rx} 0a${rx} ${ry} 0 1 0 ${-2*rx} 0Z`;
const RR=(x,y,w,h,r)=>{r=Math.min(r,w/2,h/2);return `M${x+r} ${y}H${x+w-r}A${r} ${r} 0 0 1 ${x+w} ${y+r}V${y+h-r}A${r} ${r} 0 0 1 ${x+w-r} ${y+h}H${x+r}A${r} ${r} 0 0 1 ${x} ${y+h-r}V${y+r}A${r} ${r} 0 0 1 ${x+r} ${y}Z`};
const star=(cx,cy,R,r,n=5,rot=0)=>{let d='';for(let i=0;i<n*2;i++){const a=-Math.PI/2+rot+i*Math.PI/n,q=i%2?r:R;d+=(i?'L':'M')+(cx+q*Math.cos(a)).toFixed(1)+' '+(cy+q*Math.sin(a)).toFixed(1)}return d+'Z'};
const HEART="M50 90C20 70 2 52 2 30C2 14 14 4 28 4C38 4 46 10 50 18C54 10 62 4 72 4C86 4 98 14 98 30C98 52 80 70 50 90Z";
const DROP="M50 0C50 0 90 45 90 66A40 40 0 0 1 10 66C10 45 50 0 50 0Z";
const CLOUD='M30 92A22 22 0 0 1 32 48A28 28 0 0 1 86 40A24 24 0 0 1 104 92Z';
const G=(cls,inner)=>`<g class="anim ${cls}">${inner}</g>`;
const T=(t,inner)=>`<g transform="${t}">${inner}</g>`;
const sparkle=(x,y,R)=>`M${x} ${y-R}Q${x} ${y} ${x+R} ${y}Q${x} ${y} ${x} ${y+R}Q${x} ${y} ${x-R} ${y}Q${x} ${y} ${x} ${y-R}Z`;

function kit(style){
  let defs='';const id=()=>'gm'+(++U);const out=style==='outline',gl=style==='glossy';
  const paint=c=>{ if(style==='flat') return c[1];
    const g=id();defs+=`<linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c[0]}"/><stop offset=".55" stop-color="${c[1]}"/><stop offset="1" stop-color="${c[2]}"/></linearGradient>`;return `url(#${g})`};
  const S={style,out,gl,sh:'',
    fill(d,c,o={}){const t=o.t?` transform="${o.t}"`:'',v=o.t?' vector-effect="non-scaling-stroke"':'',r=o.rule?` fill-rule="${o.rule}"`:'',op=o.op?` opacity="${o.op}"`:'';
      if(out) return o.noOut?'':`<path d="${d}"${t}${r} fill="none" stroke="currentColor" stroke-width="${o.ow||5}" stroke-linejoin="round" stroke-linecap="round"${v}/>`;
      const p=paint(c);return `<path d="${d}"${t}${r}${op} fill="${p}"${o.round?` stroke="${p}" stroke-width="${o.round}" stroke-linejoin="round"${v}`:''}/>`},
    line(d,w=6,col,o={}){const t=o.t?` transform="${o.t}"`:'';return `<path d="${d}"${t} fill="none" stroke="${out?'currentColor':(col||INK)}" stroke-width="${out?Math.min(w,o.ow||5):w}" stroke-linecap="round" stroke-linejoin="round"${o.op&&!out?` opacity="${o.op}"`:''}/>`},
    ink(d,col){return `<path d="${d}" fill="${out?'currentColor':(col||INK)}"/>`},
    solid(d,col,extra=''){return out?'':`<path d="${d}" fill="${col}" ${extra}/>`},
    gloss(cx,cy,rx,ry,rot=0,op=.8){if(!gl)return'';const g=id();defs+=`<linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="${op}"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>`;return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#${g})" transform="rotate(${rot} ${cx} ${cy})"/>`},
    shadow(cx=64,cy=123,rx=38){if(gl)S.sh=`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="3.5" fill="#000" opacity=".13"/>`;return ''},
    catch(x,y,r=2.6){return out?'':`<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity="${gl?.9:.75}"/>`},
    face(c,cx=64,cy=64,r=56){if(out)return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="currentColor" stroke-width="6"/>`;
      if(style==='flat') return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${c[1]}"/><path d="M${cx-r} ${cy}A${r} ${r} 0 0 0 ${cx+r} ${cy}A${r} ${r*.82} 0 0 1 ${cx-r} ${cy}Z" fill="${c[2]}" opacity=".35"/>`;
      const g=id();defs+=`<radialGradient id="${g}" cx=".42" cy=".3" r=".78"><stop offset="0" stop-color="${c[0]}"/><stop offset=".55" stop-color="${c[1]}"/><stop offset="1" stop-color="${c[2]}"/></radialGradient>`;
      return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${g})"/><circle cx="${cx}" cy="${cy}" r="${r-.8}" fill="none" stroke="${c[2]}" stroke-opacity=".45" stroke-width="1.6"/>`},
    ball(cx,cy,r,c){return S.face(c,cx,cy,r)+S.gloss(cx-r*.07,cy-r*.6,r*.58,r*.28,-8,.7)},
    clip(d){const g=id();defs+=`<clipPath id="${g}"><path d="${d}"/></clipPath>`;return g},
    defs:()=>defs};
  return S;
}

/* ===== face parts ===== */
const EYES={
  dot:S=>S.ink(E(44,54,6,9))+S.ink(E(84,54,6,9))+S.catch(46,50)+S.catch(86,50),
  happy:S=>S.line('M35 58Q44 46 53 58')+S.line('M75 58Q84 46 93 58'),
  laugh:S=>S.line('M36 45L52 54L36 63')+S.line('M92 45L76 54L92 63'),
  wink:S=>S.ink(E(44,54,6,9))+S.catch(46,50)+S.line('M75 56Q84 48 93 56'),
  line:S=>S.line('M36 56H52')+S.line('M76 56H92'),
  sleepy:S=>S.line('M35 54Q44 62 53 54')+S.line('M75 54Q84 62 93 54'),
  wide:S=>[44,84].map(x=>(S.out?`<path d="${E(x,54,11,13)}" fill="none" stroke="currentColor" stroke-width="4"/>`:`<path d="${E(x,54,11,13)}" fill="#fff" stroke="${INK}" stroke-width="3"/>`)+S.ink(E(x,56,5.5,6.5))+S.catch(x+2,53,2)).join(''),
  roll:S=>[44,84].map(x=>S.out?`<path d="${E(x,56,11,12)}" fill="none" stroke="currentColor" stroke-width="4"/>`:`<path d="${E(x,56,11,12)}" fill="#fff" stroke="${INK}" stroke-width="3"/>`).join('')+G('p-roll',S.ink(E(46,49,5.5,5))+S.ink(E(86,49,5.5,5))),
  side:S=>[44,84].map(x=>S.out?`<path d="${E(x,56,11,10)}" fill="none" stroke="currentColor" stroke-width="4"/>`:`<path d="${E(x,56,11,10)}" fill="#fff" stroke="${INK}" stroke-width="3"/>`).join('')+G('p-look2',S.ink(E(38,57,5,5.5))+S.ink(E(78,57,5,5.5)))+S.line('M32 48H56M72 48H96',4),
  hearts:S=>G('p-pulse',S.fill(HEART,PINK,{t:'translate(30 40) scale(.29)',ow:4})+S.catch(37,48,2.4))+G('p-pulse',S.fill(HEART,PINK,{t:'translate(70 40) scale(.29)',ow:4})+S.catch(77,48,2.4)),
  stars:S=>G('p-spin',S.fill(star(44,54,14,6.5),GOLD,{round:3,ow:4}))+G('p-spin',S.fill(star(84,54,14,6.5),GOLD,{round:3,ow:4})),
  shades:S=>{const L='M28 46H60Q62 46 61 53Q58 70 45 70Q31 70 29 53Q28 46 28 46Z',R='M68 46H100Q100 46 99 53Q97 70 83 70Q70 70 67 53Q66 46 68 46Z';
    return S.line('M60 50H68',4,'#1A1C2A')+S.line('M28 49L12 44',4,'#1A1C2A')+S.line('M100 49L116 44',4,'#1A1C2A')+S.fill(L,BLACK,{ow:4})+S.fill(R,BLACK,{ow:4})+
      (S.out?'':'<path d="M34 50L44 50L36 62Z M74 50L84 50L76 62Z" fill="#fff" opacity=".32"/>')},
  woozy:S=>S.line('M36 56Q44 50 52 57')+S.ink(E(84,54,8,10))+S.catch(86,50,3),
  zany:S=>S.ink(E(42,52,9,11))+S.catch(45,48,3)+S.ink(E(86,58,4.5,5.5))+S.catch(87,56,1.6),
  half:S=>S.ink(E(44,58,6,6))+S.ink(E(84,58,6,6))+S.line('M34 52H54M74 52H94',5),
  big:S=>S.ink(E(44,56,11,13))+S.ink(E(84,56,11,13))+(S.out?'':`<circle cx="48" cy="51" r="4.5" fill="#fff"/><circle cx="88" cy="51" r="4.5" fill="#fff"/><circle cx="40" cy="61" r="2.2" fill="#fff"/><circle cx="80" cy="61" r="2.2" fill="#fff"/>`),
  spiral:S=>[44,84].map(x=>G('p-spin',S.line(`M${x} 54m-1.5 0a1.5 1.5 0 1 1 3 0a4 4 0 1 1 -8 0a6.5 6.5 0 1 1 13 0a9 9 0 1 1 -18 0`,3.2))).join(''),
  xx:S=>S.line('M37 47L51 61M51 47L37 61',5)+S.line('M77 47L91 61M91 47L77 61',5),
  tight:S=>S.line('M34 50L52 56M94 50L76 56',5),
  money:S=>[44,84].map(x=>S.fill(E(x,54,11),['#C9F7D4','#3CC46A','#1F8545'],{ow:4})+S.line(`M${x+4} ${48}Q${x-5} ${47} ${x-4} ${52}Q${x+5} ${56} ${x+4} ${59}Q${x-4} ${62} ${x-5} ${59}M${x} 44V64`,2.6,'#fff')).join(''),
};
const BROWS={
  sad:S=>S.line('M34 40Q43 39 51 32',5)+S.line('M94 40Q85 39 77 32',5),
  angry:S=>S.line('M33 34L52 43',6)+S.line('M95 34L76 43',6),
  up:S=>S.line('M34 34Q43 26 52 31',5)+S.line('M76 31Q85 26 94 34',5),
  raise:S=>S.line('M34 40H52',5)+S.line('M76 32Q85 24 94 32',5),
  worry:S=>S.line('M34 38Q43 36 51 30',5)+S.line('M94 38Q85 36 77 30',5),
};
const GRIN='M36 74Q64 80 92 74Q90 106 64 106Q38 106 36 74Z';
const MOUTHS={
  smile:S=>S.line('M42 80Q64 100 86 80'),
  small:S=>S.line('M50 84Q64 94 78 84'),
  grin:S=>{if(S.out)return S.line(GRIN,5)+S.line('M50 98Q64 91 78 98',4);const c=S.clip(GRIN);
    return S.ink(GRIN)+`<g clip-path="url(#${c})"><ellipse cx="64" cy="106" rx="20" ry="11" fill="#F0607A"/><path d="M34 70H94V83Q64 89 34 83Z" fill="#fff"/></g>`},
  teeth:S=>S.line('M40 80Q64 96 88 80')+(S.out?S.line('M58 88V96H70V88',3.5):`<path d="M57 87H71V97Q71 99 69 99H59Q57 99 57 97Z" fill="#fff" stroke="${INK}" stroke-width="2.5"/><path d="M64 87V99" stroke="${INK}" stroke-width="2"/>`),
  frown:S=>S.line('M44 94Q64 76 84 94'),
  smallFrown:S=>S.line('M52 92Q64 84 76 92'),
  o:S=>S.out?S.line(E(64,88,9,12),5):S.ink(E(64,88,9,12)),
  smallO:S=>S.out?S.line(E(64,88,5,6),4):S.ink(E(64,88,5,6)),
  scream:S=>S.out?S.line(E(64,92,13,20),5):S.ink(E(64,92,13,20))+`<ellipse cx="64" cy="104" rx="8" ry="5" fill="#F0607A"/>`,
  gasp:S=>{const d='M40 98Q64 70 88 98Q64 92 40 98Z';return S.out?S.line(d,5):S.ink(d)},
  wail:S=>{const d='M32 104Q64 60 96 104Q64 96 32 104Z';return S.out?S.line(d,5):S.ink(d)+`<path d="M46 98Q64 88 82 98Q64 95 46 98Z" fill="#F0607A"/>`},
  flat:S=>S.line('M48 86H80'),
  side:S=>S.line('M50 90L80 82'),
  tongue:S=>G('p-wag',S.fill('M58 86Q56 106 67 106Q78 106 77 86Z',['#FF9DB0','#F0607A','#C93652'],{ow:4})+(S.out?'':'<path d="M67 90V100" stroke="#C93652" stroke-width="2" stroke-linecap="round"/>'))+S.line('M42 80Q64 96 86 80'),
  smirk:S=>S.line('M48 88Q70 92 86 76'),
  kiss:S=>S.line('M60 74Q72 78 62 84Q72 90 60 96',5),
  grimace:S=>{const d='M38 78H90Q97 78 97 86Q97 94 90 94H38Q31 94 31 86Q31 78 38 78Z';
    return (S.out?S.line(d,4):`<path d="${d}" fill="#fff" stroke="${INK}" stroke-width="3.5"/>`)+S.line('M32 86H96M50 79V93M64 79V93M78 79V93',2.5)},
  wavy:S=>S.line('M40 88Q48 80 56 88T72 88T88 88'),
  zip:S=>S.line('M38 86H90',5)+S.line('M44 81V91M52 81V91M60 81V91M68 81V91M76 81V91M84 81V91',2.5)+S.fill(RR(84,80,12,12,3),SILVER,{ow:3}),
  none:S=>'',
  w:S=>S.line('M52 84Q58 92 64 84Q70 92 76 84',4.5),
  drool:S=>S.line('M46 88Q64 96 82 86')+G('p-drip',S.fill(DROP,WATER,{t:'translate(76 86) scale(.14)',ow:3})),
  hmm:S=>S.line('M54 88Q64 84 76 88',5),
};
const EXTRAS={
  blush:S=>S.solid(E(31,72,10,6),'#FF6F7F','opacity=".38"')+S.solid(E(97,72,10,6),'#FF6F7F','opacity=".38"'),
  tears:S=>G('p-drip',S.fill(DROP,WATER,{t:'translate(8 56) scale(.2)',ow:3.5}))+G('p-drip',S.fill(DROP,WATER,{t:'translate(100 56) scale(.2)',ow:3.5})),
  cry:S=>G('p-flow',S.line('M40 64Q37 86 42 108',7,'#5AB8F5'))+G('p-flow',S.line('M88 64Q91 86 86 108',7,'#5AB8F5')),
  bigcry:S=>G('p-flow',S.line('M36 60Q24 84 30 112',9,'#5AB8F5'))+G('p-flow',S.line('M92 60Q104 84 98 112',9,'#5AB8F5')),
  tear1:S=>G('p-drip',S.fill(DROP,WATER,{t:'translate(80 62) scale(.17)',ow:3})),
  sweat:S=>G('p-drip',S.fill(DROP,WATER,{t:'translate(94 14) scale(.22)',ow:3.5})+S.catch(101,26,1.8)),
  zzz:S=>G('p-float',S.line('M96 6H110L96 20H110',4,'#5A63B8'))+G('p-float t2',S.line('M112 26H120L112 34H120',3,'#5A63B8')),
  kissheart:S=>G('p-float',S.fill(HEART,PINK,{t:'translate(84 66) scale(.24)',ow:3.5})),
  hearts3:S=>G('p-float',S.fill(HEART,PINK,{t:'translate(2 20) scale(.2)',ow:3}))+G('p-float t2',S.fill(HEART,PINK,{t:'translate(104 34) scale(.18)',ow:3}))+G('p-float t3',S.fill(HEART,PINK,{t:'translate(96 96) scale(.16)',ow:3})),
  haloBack:S=>S.out?'':G('p-halo',`<ellipse cx="64" cy="12" rx="36" ry="8" fill="none" stroke="${S.gl?'#E9A817':GOLD[1]}" stroke-width="6"/>`),
  halo:S=>G('p-halo',S.out?`<ellipse cx="64" cy="10" rx="34" ry="7" fill="none" stroke="currentColor" stroke-width="4"/>`:`<path d="M28 12A36 8 0 0 0 100 12" fill="none" stroke="${GOLD[1]}" stroke-width="6"/>`+(S.gl?'<path d="M40 18A30 5 0 0 0 70 19" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="2" stroke-linecap="round"/>':'')),
  hat:S=>G('p-hat',S.fill('M12 38L22 4L52 16Z',PURPLE,{round:4,ow:4})+(S.out?'':'<path d="M17 21L37 10" stroke="#FFD34D" stroke-width="4" stroke-linecap="round"/><path d="M14 31L45 14" stroke="#FF6F91" stroke-width="4" stroke-linecap="round"/>')+S.fill(E(22,5,6),GOLD,{ow:3.5})),
  confetti:S=>[[112,14,'#FF6F91',20],[118,40,'#4FB6FF',-30],[10,104,'#7C5CFF',35],[114,108,'#22C55E',-15],[100,6,'#FFC83D',50]].map(([x,y,c,r],i)=>G('p-confetti t'+(i%3+1),`<g transform="rotate(${r} ${x} ${y})">`+(S.out?`<rect x="${x-3}" y="${y-5}" width="6" height="10" rx="1.5" fill="none" stroke="currentColor" stroke-width="2.5"/>`:`<rect x="${x-3}" y="${y-5}" width="6" height="10" rx="1.5" fill="${c}"/>`)+'</g>')).join(''),
  steam:S=>G('p-puff',S.fill('M22 100a9 9 0 0 1 4-16a9 9 0 0 1 14 2a8 8 0 0 1 2 14Z',WHITE,{ow:3.5}))+G('p-puff t2',S.fill('M86 100a8 8 0 0 1 -2-14a9 9 0 0 1 14-2a9 9 0 0 1 4 16Z',WHITE,{ow:3.5})),
  horns:S=>S.fill('M24 34Q14 18 20 2Q30 18 42 22Z',PURPLE,{round:3,ow:4})+S.fill('M104 34Q114 18 108 2Q98 18 86 22Z',PURPLE,{round:3,ow:4}),
  mask:S=>S.line('M28 76L10 62M100 76L118 62M28 98L12 104M100 98L116 104',3,'#9AA6BF')+S.fill('M28 74Q64 66 100 74V100Q64 112 28 100Z',WHITE,{ow:4})+S.line('M36 84Q64 78 92 84M36 92Q64 86 92 92',2.5,'#B9C2D6'),
  cowboy:S=>S.fill('M6 34Q64 52 122 34Q112 46 64 48Q16 46 6 34Z',BROWN,{ow:4})+S.fill('M34 36Q30 6 50 8Q58 14 64 10Q70 14 78 8Q98 6 94 36Q64 42 34 36Z',BROWN,{ow:4})+S.solid('M36 30Q64 36 92 30V34Q64 40 36 34Z','#5E3218')+S.gloss(48,16,6,4,0,.5),
  nerd:S=>(S.out?'':`<circle cx="44" cy="54" r="14" fill="#fff" fill-opacity=".35"/><circle cx="84" cy="54" r="14" fill="#fff" fill-opacity=".35"/>`)+S.line('M30 54A14 14 0 1 0 58 54A14 14 0 1 0 30 54M70 54A14 14 0 1 0 98 54A14 14 0 1 0 70 54M58 52Q64 48 70 52M30 52L14 46M98 52L114 46',4.5,'#2A2D3A'),
  monocle:S=>S.line('M73 56A12 12 0 1 0 97 56A12 12 0 1 0 73 56M90 66Q98 90 92 116',3.5,'#B9700A'),
  anger:S=>G('p-pulse',S.line('M100 14Q106 20 112 14M100 28Q106 22 112 28M98 16Q104 21 98 26M114 16Q108 21 114 26',3.5,'#E5344F')),
};
const BLINKS=new Set(['dot','line','wide','woozy','wink','half','big','zany','side']);
function drawFace(S,o){
  const ex=o.extras||[];let b='';
  if(ex.includes('halo'))b+=EXTRAS.haloBack(S);
  if(ex.includes('horns'))b+=EXTRAS.horns(S);
  b+=S.shadow()+S.face(o.c||Y)+S.gloss(60,30,32,16,-8,.75);
  if(ex.includes('blush'))b+=EXTRAS.blush(S);
  const eyes=EYES[o.eyes](S);b+=BLINKS.has(o.eyes)?G('p-blink',eyes):eyes;
  if(o.brows)b+=BROWS[o.brows](S);b+=MOUTHS[o.mouth](S);
  ex.filter(e=>!['blush','horns'].includes(e)).forEach(e=>b+=EXTRAS[e](S));
  return b;
}
