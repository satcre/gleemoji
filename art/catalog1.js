/* ===== Registry ===== */
const ALL={}, CATS=[
  ['smileys','Smileys'],['hearts','Hearts'],['people','Hands & body'],['animals','Animals'],
  ['food','Food & drink'],['nature','Nature & weather'],['objects','Objects'],['symbols','Symbols']];
const ORDER={};CATS.forEach(([k])=>ORDER[k]=[]);
function add(cat,key,name,draw,a,tags=''){ALL[key]={n:name,a,draw,cat,tags:(name+' '+key.replace(/-/g,' ')+' '+tags).toLowerCase()};ORDER[cat].push(key)}

/* ===== Smileys ===== */
const FACES=[
 ['grinning','Grinning',{eyes:'dot',mouth:'grin',a:'bounce'},'happy smile'],
 ['beaming','Beaming',{eyes:'happy',mouth:'grin',extras:['blush'],a:'bounce'},'happy'],
 ['slight-smile','Slight smile',{eyes:'dot',mouth:'smile',a:'breathe'},'happy'],
 ['smile','Smile',{eyes:'happy',mouth:'smile',extras:['blush'],a:'breathe'},'happy'],
 ['laughing','Laughing',{eyes:'laugh',mouth:'grin',a:'shake'},'lol xd'],
 ['joy','Tears of joy',{eyes:'laugh',mouth:'grin',extras:['tears'],a:'shake'},'lol laugh cry'],
 ['rofl','Rolling on the floor',{eyes:'laugh',mouth:'grin',extras:['tears'],a:'roll'},'lol laugh'],
 ['sweat-smile','Sweat smile',{eyes:'happy',mouth:'grin',extras:['sweat'],a:'sway'},'nervous phew'],
 ['wink','Wink',{eyes:'wink',mouth:'tongue',a:'sway'},'playful'],
 ['relieved','Relieved',{eyes:'sleepy',mouth:'smile',extras:['blush'],a:'breathe'},'calm content'],
 ['halo','Halo',{eyes:'happy',mouth:'smile',extras:['halo'],a:'breathe'},'angel innocent'],
 ['smiling-hearts','Smiling with hearts',{eyes:'happy',mouth:'smile',extras:['blush','hearts3'],a:'sway'},'love adore'],
 ['heart-eyes','Heart eyes',{eyes:'hearts',mouth:'grin',a:'breathe'},'love crush'],
 ['star-struck','Star-struck',{eyes:'stars',mouth:'grin',a:'bounce'},'wow amazing'],
 ['kiss','Kiss',{eyes:'wink',mouth:'kiss',extras:['blush','kissheart'],a:'sway'},'love'],
 ['kiss-closed','Kissing',{eyes:'happy',mouth:'kiss',extras:['blush'],a:'breathe'},'love'],
 ['yum','Yum',{eyes:'happy',mouth:'tongue',extras:['blush'],a:'breathe'},'delicious tasty'],
 ['tongue','Tongue out',{eyes:'dot',mouth:'tongue',a:'bounce'},'silly'],
 ['zany','Zany',{eyes:'zany',mouth:'tongue',a:'wobble'},'crazy silly goofy'],
 ['money-mouth','Money mouth',{eyes:'money',mouth:'grin',a:'bounce'},'rich dollar'],
 ['cool','Cool',{eyes:'shades',mouth:'smirk',a:'tilt'},'sunglasses'],
 ['nerd','Nerd',{eyes:'dot',mouth:'teeth',extras:['nerd'],a:'bounce'},'geek glasses'],
 ['cowboy','Cowboy',{eyes:'dot',mouth:'grin',extras:['cowboy'],a:'sway'},'hat yeehaw'],
 ['party','Party',{eyes:'happy',mouth:'grin',extras:['hat','confetti'],a:'bounce'},'celebrate birthday'],
 ['monocle','Monocle',{eyes:'dot',brows:'raise',mouth:'hmm',extras:['monocle'],a:'tilt'},'fancy inspect'],
 ['smirk','Smirk',{eyes:'half',mouth:'smirk',a:'tilt'},'sly'],
 ['raised-brow','Raised eyebrow',{eyes:'dot',brows:'raise',mouth:'flat'},'skeptical doubt'],
 ['neutral','Neutral',{eyes:'dot',mouth:'flat'},'meh'],
 ['expressionless','Expressionless',{eyes:'line',mouth:'flat',a:'breathe'},'blank'],
 ['unamused','Unamused',{eyes:'side',mouth:'smallFrown'},'annoyed side eye'],
 ['eye-roll','Eye roll',{eyes:'roll',mouth:'smirk'},'whatever'],
 ['grimace','Grimacing',{eyes:'dot',mouth:'grimace',a:'shiver'},'awkward eek'],
 ['zipper','Zipper mouth',{eyes:'dot',mouth:'zip'},'secret quiet'],
 ['thinking','Hmm',{eyes:'dot',brows:'raise',mouth:'hmm',a:'tilt'},'thinking ponder'],
 ['pensive','Pensive',{eyes:'sleepy',brows:'sad',mouth:'smallFrown',a:'droop'},'sad thoughtful'],
 ['sleepy','Sleepy',{eyes:'sleepy',mouth:'smallO',extras:['zzz'],a:'breathe'},'sleep tired'],
 ['drooling','Drooling',{eyes:'sleepy',mouth:'drool',a:'breathe'},'hungry'],
 ['tired','Tired',{eyes:'sleepy',brows:'sad',mouth:'wavy',a:'droop'},'exhausted weary'],
 ['mask','Face mask',{eyes:'dot',mouth:'none',extras:['mask'],a:'breathe'},'sick medical'],
 ['nauseated','Nauseated',{c:GREEN,eyes:'line',mouth:'wavy',extras:['sweat'],a:'sway'},'sick gross'],
 ['hot','Hot',{c:RED,eyes:'sleepy',mouth:'tongue',extras:['sweat'],a:'breathe'},'heat sweating'],
 ['freezing','Freezing',{c:BLUE,eyes:'wide',mouth:'grimace',a:'shiver'},'cold'],
 ['woozy','Woozy',{eyes:'woozy',mouth:'wavy',extras:['blush'],a:'wobble'},'drunk dizzy'],
 ['dizzy','Dizzy',{eyes:'spiral',mouth:'o',a:'wobble'},'confused spin'],
 ['knocked-out','Knocked out',{eyes:'xx',mouth:'o'},'dead ko'],
 ['shocked','Shocked',{eyes:'wide',brows:'up',mouth:'o',a:'jump'},'surprised wow omg'],
 ['astonished','Astonished',{eyes:'wide',brows:'up',mouth:'scream',a:'jump'},'surprised'],
 ['scream','Screaming',{c:['#E8F4FF','#B8D8F2','#6C9CC9'],eyes:'wide',brows:'worry',mouth:'scream',a:'shiver'},'scared fear horror'],
 ['fearful','Fearful',{eyes:'wide',brows:'worry',mouth:'gasp',extras:['sweat'],a:'shiver'},'scared'],
 ['worried','Worried',{eyes:'dot',brows:'worry',mouth:'wavy',a:'droop'},'nervous anxious'],
 ['pleading','Pleading',{eyes:'big',brows:'worry',mouth:'smallFrown',extras:['blush'],a:'breathe'},'puppy eyes please'],
 ['sad','Sad',{eyes:'dot',brows:'sad',mouth:'frown',a:'droop'},'unhappy'],
 ['disappointed','Disappointed',{eyes:'sleepy',brows:'sad',mouth:'frown',a:'droop'},'let down'],
 ['tear-smile','Smiling with tear',{eyes:'happy',mouth:'smile',extras:['tear1'],a:'breathe'},'grateful touched'],
 ['crying','Crying',{eyes:'sleepy',brows:'sad',mouth:'frown',extras:['cry'],a:'droop'},'sad tears'],
 ['sobbing','Sobbing',{eyes:'tight',mouth:'wail',extras:['bigcry'],a:'shiver'},'loudly crying'],
 ['persevering','Persevering',{eyes:'laugh',mouth:'frown',a:'shiver'},'struggle'],
 ['angry','Angry',{c:RED,eyes:'dot',brows:'angry',mouth:'frown',a:'shiver'},'mad'],
 ['furious','Furious',{c:['#FF8F80','#D9302A','#8E1414'],eyes:'dot',brows:'angry',mouth:'grimace',extras:['anger'],a:'shiver'},'rage'],
 ['triumph','Huffing',{eyes:'tight',brows:'angry',mouth:'smallFrown',extras:['steam'],a:'shiver'},'triumph steam'],
 ['devil','Devil',{c:PURPLE,eyes:'dot',brows:'angry',mouth:'grin',extras:['horns'],a:'bounce'},'evil mischief'],
];
FACES.forEach(([k,n,o,t])=>add('smileys',k,n,S=>drawFace(S,o),o.a,t));

add('smileys','skull','Skull',S=>{S.shadow(64,123,30);
  return S.fill('M64 8C34 8 16 30 16 56C16 72 24 82 34 88V104Q34 112 42 112H86Q94 112 94 104V88C104 82 112 72 112 56C112 30 94 8 64 8Z',WHITE)+S.gloss(52,22,22,8,-8,.8)+
  S.ink(E(44,60,12,13),'#2C2F3D')+S.ink(E(84,60,12,13),'#2C2F3D')+S.ink('M64 74L58 86H70Z','#2C2F3D')+S.line('M52 96V110M64 96V112M76 96V110',3,'#9AA3B8')},'shake','dead');
add('smileys','ghost','Ghost',S=>{S.shadow(64,124,26);
  return S.fill('M24 60C24 30 42 10 64 10C86 10 104 30 104 60V112L92 102L80 114L68 102L56 114L44 102L32 114L24 106Z',WHITE)+S.gloss(54,24,18,8,-10,.8)+
  S.ink(E(50,52,7,10))+S.ink(E(78,52,7,10))+S.catch(52,48,2.4)+S.catch(80,48,2.4)+(S.out?S.line(E(64,76,7,9),4):S.ink(E(64,76,7,9)))+S.solid(E(40,66,7,4),'#FF8FA8','opacity=".5"')+S.solid(E(88,66,7,4),'#FF8FA8','opacity=".5"')},'hover','boo spooky halloween');
add('smileys','alien','Alien',S=>{S.shadow(64,123,26);
  return S.fill('M64 8C32 8 16 32 16 54C16 84 44 118 64 118C84 118 112 84 112 54C112 32 96 8 64 8Z',['#D8F7B8','#7FD35B','#3E8F2A'])+S.gloss(52,22,22,9,-12,.7)+
  S.fill('M30 56Q34 40 54 52Q58 70 44 76Q30 72 30 56Z',BLACK,{ow:4})+S.fill('M98 56Q94 40 74 52Q70 70 84 76Q98 72 98 56Z',BLACK,{ow:4})+S.catch(42,54,3)+S.catch(84,54,3)+S.line('M58 96Q64 99 70 96',3.5,'#2F6A1F')},'hover','ufo space');
add('smileys','robot','Robot',S=>{S.shadow(64,123,40);
  return S.line('M64 22V10',4,'#7A8296')+S.fill(E(64,8,6),RED,{ow:3.5})+S.fill(RR(8,52,12,30,5),GREY,{ow:4})+S.fill(RR(108,52,12,30,5),GREY,{ow:4})+
  S.fill(RR(16,22,96,92,22),SILVER)+S.gloss(54,32,30,8,0,.8)+S.fill(RR(28,40,72,40,14),['#3A4058','#1E2233','#0C0E18'],{ow:4})+
  (S.out?S.line(E(48,60,7),4)+S.line(E(80,60,7),4):`<circle cx="48" cy="60" r="7" fill="#5BE3FF"/><circle cx="80" cy="60" r="7" fill="#5BE3FF"/>`)+S.line('M44 96H84M52 90V102M64 90V102M76 90V102',3,'#7A8296')},'bounce','bot machine ai');
add('smileys','poop','Pile of poo',S=>{S.shadow(64,123,46);
  return S.fill('M14 106Q8 90 26 84Q20 66 40 62Q38 44 58 42Q60 22 78 14Q74 30 88 40Q92 56 82 62Q102 64 98 82Q118 86 112 106Q110 116 98 116H28Q16 116 14 106Z',DARKBROWN)+S.gloss(56,52,14,5,-10,.45)+
  S.fill(E(50,82,9,10),WHITE,{ow:3.5})+S.fill(E(78,82,9,10),WHITE,{ow:3.5})+S.ink(E(52,84,4,5))+S.ink(E(80,84,4,5))+S.line('M52 100Q64 108 76 100',4,'#2A1408')},'bounce','poop silly');
add('smileys','clown','Clown',S=>{S.shadow();
  return S.ball(22,46,20,ORANGE)+S.ball(106,46,20,ORANGE)+S.face(WHITE)+S.gloss(60,30,32,16,-8,.75)+S.solid(E(44,54,12,14),'#7AB8FF','opacity=".5"')+S.solid(E(84,54,12,14),'#7AB8FF','opacity=".5"')+
  G('p-blink',EYES.dot(S))+S.fill(E(64,74,10),RED,{ow:4})+S.fill('M36 86Q64 112 92 86Q64 96 36 86Z',RED,{ow:4})},'bounce','circus funny');
