/* ===== Hearts ===== */
const heartBase=(S,c,t='translate(14 18)')=>S.fill(HEART,c,{t})+S.gloss(40,38,16,9,-35,.85);
[['heart','Red heart',PINK,'love'],['orange-heart','Orange heart',ORANGE],['yellow-heart','Yellow heart',GOLD],['green-heart','Green heart',LEAF],
 ['blue-heart','Blue heart',NAVY],['purple-heart','Purple heart',PURPLE],['pink-heart','Pink heart',ROSE],['brown-heart','Brown heart',BROWN],
 ['black-heart','Black heart',BLACK],['white-heart','White heart',WHITE]].forEach(([k,n,c,t])=>add('hearts',k,n,S=>{S.shadow(64,123,30);return heartBase(S,c)},'beat','love '+(t||'')));
add('hearts','broken-heart','Broken heart',S=>{S.shadow(64,123,30);
  const L='M64 36L56 50L66 62L58 76L64 108C34 88 16 70 16 48C16 32 28 22 42 22C52 22 60 28 64 36Z',R='M64 36C68 28 76 22 86 22C100 22 112 32 112 48C112 70 94 88 68 106L62 76L70 62L60 50Z';
  return G('p-crackL',S.fill(L,PINK)+S.gloss(36,38,8,6,-35,.8))+G('p-crackR',S.fill(R,PINK))},'','sad heartbreak');
add('hearts','sparkling-heart','Sparkling heart',S=>{S.shadow(64,123,30);
  return heartBase(S,ROSE,'translate(14 22) scale(.92)')+G('p-twinkle',S.fill(sparkle(108,22,13),GOLD,{ow:3.5}))+G('p-twinkle t2',S.fill(sparkle(18,96,9),GOLD,{ow:3}))+G('p-twinkle t3',S.fill(sparkle(100,98,8),GOLD,{ow:3}))},'beat','love shine');
add('hearts','two-hearts','Two hearts',S=>G('p-float',S.fill(HEART,PINK,{t:'translate(6 40) scale(.66)'}))+G('p-float t2',S.fill(HEART,ROSE,{t:'translate(66 8) scale(.52)'})),'','love');
add('hearts','heart-arrow','Heart with arrow',S=>{S.shadow(64,123,30);
  return S.line('M10 104L46 72',5,'#B9700A')+S.fill('M4 104L14 96L18 112Z',GOLD,{ow:3})+heartBase(S,PINK,'translate(18 18) scale(.9)')+S.line('M88 46L118 20',5,'#B9700A')+S.fill('M118 20L104 22L116 34Z',GOLD,{round:2,ow:3})},'beat','cupid love');
add('hearts','heart-ribbon','Heart with ribbon',S=>{S.shadow(64,123,30);
  return heartBase(S,PINK)+S.fill('M64 34L44 18Q36 30 44 40Z',GOLD,{round:3,ow:3.5})+S.fill('M64 34L84 18Q92 30 84 40Z',GOLD,{round:3,ow:3.5})+S.fill(E(64,34,7),GOLD,{ow:3.5})+S.line('M64 40V106',5,'#E38A0B',{op:.9})},'beat','gift love');
add('hearts','mending-heart','Mending heart',S=>{S.shadow(64,123,30);
  return heartBase(S,PINK)+S.fill(RR(30,46,68,18,9),CREAM,{t:'rotate(-30 64 55)',ow:3.5})+S.line('M56 50L58 54M66 46L68 50M62 58L64 62',2,'#C49A5A',{t:'rotate(-30 64 55)'})},'beat','healing');

/* ===== Hands & body ===== */
const fUp=(S,cx,top,w=14,rot=0)=>S.fill(RR(cx-w/2,top,w,(S.out?72:86)-top,w/2),SKIN,{t:rot?`rotate(${rot} ${cx} 86)`:'',ow:4.5});
const fFold=(S,cx,w=14)=>S.fill(RR(cx-w/2,52,w,30,w/2),SKIN,{ow:4.5});
const palm=S=>S.fill(RR(34,62,60,58,24),SKIN)+S.gloss(58,74,18,7,0,.5);
const thumbOut=S=>S.fill(RR(16,60,16,42,8),SKIN,{t:'rotate(-35 26 100)',ow:4.5});
const thumbFold=S=>S.fill(RR(36,80,44,16,8),SKIN,{t:'rotate(-14 58 88)',ow:4.5});
const raised=S=>fUp(S,44,28)+fUp(S,58.5,20)+fUp(S,72.5,24)+fUp(S,85.5,36,12)+thumbOut(S)+palm(S);
const thumbsUp=S=>S.fill(RR(58,10,20,56,10),SKIN,{ow:4.5})+S.fill(RR(46,50,48,64,18),SKIN)+S.gloss(70,62,14,6,0,.5)+[0,1,2,3].map(i=>S.fill(RR(28,54+i*14,38,15,7.5),SKIN,{ow:4})).join('')+S.fill(RR(92,52,16,64,5),NAVY,{ow:4});
add('people','raised-hand','Raised hand',S=>{S.shadow(64,124,26);return raised(S)},'hover','hi stop high five');
add('people','wave','Waving hand',S=>{S.shadow(64,124,26);return G('p-wave',raised(S))+S.line('M14 30Q8 40 12 50M22 22Q12 36 18 52',3.5,'#E3940F')+S.line('M110 22Q118 34 112 46',3.5,'#E3940F')},'','hello hi bye');
add('people','thumbs-up','Thumbs up',S=>{S.shadow(64,124,30);return thumbsUp(S)},'bounce','like yes approve good');
add('people','thumbs-down','Thumbs down',S=>{S.shadow(64,124,30);return T('rotate(180 64 64)',thumbsUp(S))},'droop','dislike no bad');
add('people','victory','Victory hand',S=>{S.shadow(64,124,26);return fUp(S,46,22,14,-10)+fUp(S,62,18,14,8)+fFold(S,76)+fFold(S,88,12)+palm(S)+thumbFold(S)},'sway','peace two');
add('people','point-up','Pointing up',S=>{S.shadow(64,124,26);return fUp(S,46,10)+fFold(S,60)+fFold(S,74)+fFold(S,87,12)+palm(S)+thumbFold(S)},'bounce','one first');
add('people','point-right','Pointing right',S=>T('rotate(90 64 64)',fUp(S,46,10)+fFold(S,60)+fFold(S,74)+fFold(S,87,12)+palm(S)+thumbFold(S)),'nudge','next this');
add('people','metal','Sign of the horns',S=>{S.shadow(64,124,26);return fUp(S,46,22,14,-8)+fFold(S,60)+fFold(S,74)+fUp(S,86,26,13,8)+palm(S)+thumbFold(S)},'shake','rock on');
add('people','ok-hand','OK hand',S=>{S.shadow(64,124,26);return fUp(S,58.5,18)+fUp(S,72.5,22)+fUp(S,85.5,32,12)+palm(S)+S.fill(E(40,66,17)+E(40,66,7),SKIN,{rule:'evenodd',ow:4.5})},'bounce','okay perfect');
add('people','fist','Raised fist',S=>{S.shadow(64,124,28);return S.fill(RR(30,44,68,74,26),SKIN)+S.gloss(60,52,20,6,0,.5)+[0,1,2,3].map(i=>S.fill(RR(32+i*15.5,40,16,36,8),SKIN,{ow:4})).join('')+S.fill(RR(30,72,44,17,8.5),SKIN,{ow:4})},'jump','power solidarity');
add('people','clap','Clapping hands',S=>T('rotate(-18 64 70) translate(-10 6) scale(.86)',raised(S))+T('rotate(20 64 70) translate(14 10) scale(.86)',raised(S))+G('p-twinkle',S.line('M14 26L22 36M8 46H20M30 14L32 26',3.5,'#E3940F'))+G('p-twinkle t2',S.line('M114 26L106 36M120 46H108M98 14L96 26',3.5,'#E3940F')),'bounce','applause bravo');
add('people','pray','Folded hands',S=>{S.shadow(64,124,30);return S.fill('M64 14C56 14 50 22 46 34L32 84Q28 98 40 104H64Z',SKIN)+S.fill('M64 14C72 14 78 22 82 34L96 84Q100 98 88 104H64Z',SKIN)+S.line('M64 18V102',3,'#D98A0E',{op:.8})+S.fill(RR(38,62,16,30,8),SKIN,{t:'rotate(-14 46 77)',ow:4})+S.fill(RR(74,62,16,30,8),SKIN,{t:'rotate(14 82 77)',ow:4})+S.gloss(54,36,4,14,10,.6)+S.fill(RR(30,102,68,20,6),NAVY,{ow:4})+G('p-twinkle',S.line('M18 30L26 38M12 52H22M108 30L100 38M116 52H106',3.5,'#E3940F'))},'breathe','please thanks hope');
add('people','muscle','Flexed biceps',S=>{S.shadow(64,124,36);return S.fill('M8 118V88Q8 72 26 70H54Q60 56 56 44L50 28Q46 10 62 8H78Q94 10 90 28L82 48Q104 54 110 76Q114 104 84 114Q60 122 8 118Z',SKIN)+S.line('M52 72Q70 58 92 70M62 16V30M74 16V30',3,'#D98A0E',{op:.75})+S.gloss(30,80,16,5,0,.5)+S.gloss(88,70,8,12,-30,.6)},'beat','strong flex gym');
add('people','eyes','Eyes',S=>[42,86].map(x=>(S.out?`<path d="${E(x,64,22,34)}" fill="none" stroke="currentColor" stroke-width="5"/>`:S.fill(E(x,64,22,34),['#FFFFFF','#F5F6FA','#C9CEDB'])+`<path d="${E(x,64,22,34)}" fill="none" stroke="#3a3f55" stroke-width="2.5" stroke-opacity=".35"/>`)+G('p-look',S.ink(E(x+8,74,10,12))+S.catch(x+11,70,3.4))).join(''),'','look see watch');
add('people','lips','Kiss mark',S=>S.fill('M10 62Q30 34 50 42Q58 46 64 52Q70 46 78 42Q98 34 118 62Q96 64 64 66Q32 64 10 62Z',PINK,{round:2})+S.fill('M10 62Q32 64 64 66Q96 64 118 62Q100 98 64 100Q28 98 10 62Z',['#FF8FA3','#E5344F','#9E1430'],{round:2})+S.gloss(40,48,10,4,-10,.7)+S.gloss(70,80,14,5,0,.5),'beat','lipstick kiss');
add('people','brain','Brain',S=>{S.shadow(64,123,40);return S.fill('M64 18C50 8 30 14 28 30C14 34 10 52 18 62C8 74 16 94 32 96C36 112 56 114 64 104C72 114 92 112 96 96C112 94 120 74 110 62C118 52 114 34 100 30C98 14 78 8 64 18Z',ROSE)+S.gloss(48,30,14,6,-10,.7)+S.line('M64 18V104M40 40Q52 44 50 56M30 64Q44 62 48 74M88 40Q76 44 78 56M98 64Q84 62 80 74M44 92Q52 84 60 88M84 92Q76 84 68 88',3.5,'#D2577A',{op:.85})},'breathe','smart think mind');
