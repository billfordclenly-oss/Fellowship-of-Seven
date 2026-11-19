export const WORD_BANK = [
  'BRAVE','DREAM','FLAME','GRACE','HEART','LIGHT','MAGIC','NIGHT','QUEST','ROYAL',
  'SMILE','TRUST','PEACE','BLOOM','CROWN','DANCE','EARTH','FAITH','GLEAM','HONOR',
  'JEWEL','LAUGH','PRIDE','SHINE','SWEET','BRAVE','CLOCK','DROVE','FLUTE','GLOBE',
  'GROVE','HOPED','IVORY','JOKER','KARMA','LANKY','MAPLE','NOBLE','OLIVE','PIANO',
  'QUIRK','RIVER','STONE','TIGER','ULTRA','VITAL','WATER','XENON','YACHT','ZEBRA'
];

export function getRandomWord() {
  return WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)];
}

export const VALID_GUESSES = new Set(WORD_BANK);

export const RAP_QUESTIONS = [
  { id:1, prompt:"Which word rhymes with FIRE?", targetWord:"FIRE", options:["WIRE","STONE","GRASS","BOOK"], answer:"WIRE", explanation:"FIRE and WIRE both end in the '-ire' sound." },
  { id:2, prompt:"Which word rhymes with NIGHT?", targetWord:"NIGHT", options:["LIGHT","DARK","MOON","STAR"], answer:"LIGHT", explanation:"NIGHT and LIGHT both end in the '-ight' sound." },
  { id:3, prompt:"Which word rhymes with FLOW?", targetWord:"FLOW", options:["GROW","FAST","PUSH","FALL"], answer:"GROW", explanation:"FLOW and GROW both end in the '-ow' sound." },
  { id:4, prompt:"Which word does NOT rhyme with BEAT?", targetWord:"BEAT", options:["HEAT","SEAT","NEAT","BOAT"], answer:"BOAT", explanation:"BOAT has the '-oat' sound, not '-eat'." },
  { id:5, prompt:"Which word rhymes with KING?", targetWord:"KING", options:["RING","LOUD","BOLD","DARK"], answer:"RING", explanation:"KING and RING both end in the '-ing' sound." },
  { id:6, prompt:"Which word rhymes with GOLD?", targetWord:"GOLD", options:["BOLD","STEP","BURN","FAST"], answer:"BOLD", explanation:"GOLD and BOLD both end in the '-old' sound." },
  { id:7, prompt:"Which word rhymes with TRACK?", targetWord:"TRACK", options:["BACK","RUSH","PUSH","DIVE"], answer:"BACK", explanation:"TRACK and BACK both end in the '-ack' sound." },
  { id:8, prompt:"Which word rhymes with REAL?", targetWord:"REAL", options:["FEEL","FALL","RUSH","BOLD"], answer:"FEEL", explanation:"REAL and FEEL both end in the '-eal' sound." },
  { id:9, prompt:"Which word rhymes with RAIN?", targetWord:"RAIN", options:["PAIN","SNOW","WIND","FROST"], answer:"PAIN", explanation:"RAIN and PAIN both end in the '-ain' sound." },
  { id:10, prompt:"Which word rhymes with SHINE?", targetWord:"SHINE", options:["MINE","BURN","CAST","FLOW"], answer:"MINE", explanation:"SHINE and MINE both end in the '-ine' sound." },
  { id:11, prompt:"Complete the rhyme: 'The stars above begin to ___'", targetWord:"", options:["GLOW","FALL","RUSH","SPIN"], answer:"GLOW", explanation:"GLOW rhymes with the '-ow' pattern of a classic rhyme scheme." },
  { id:12, prompt:"Which word rhymes with FAME?", targetWord:"FAME", options:["GAME","FALL","STEP","RUSH"], answer:"GAME", explanation:"FAME and GAME both end in the '-ame' sound." },
  { id:13, prompt:"Which word does NOT rhyme with MIGHT?", targetWord:"MIGHT", options:["BITE","NIGHT","RIGHT","SIGHT"], answer:"BITE", explanation:"BITE has the '-ite' sound, not '-ight'." },
  { id:14, prompt:"Which word rhymes with DREAM?", targetWord:"DREAM", options:["CREAM","DRIFT","CLASH","GROAN"], answer:"CREAM", explanation:"DREAM and CREAM both end in the '-eam' sound." },
  { id:15, prompt:"Which word rhymes with BOLD?", targetWord:"BOLD", options:["TOLD","BEND","CLIP","FROG"], answer:"TOLD", explanation:"BOLD and TOLD both end in the '-old' sound." },
  { id:16, prompt:"Which word rhymes with GRACE?", targetWord:"GRACE", options:["PLACE","GROAN","DRIFT","CLASH"], answer:"PLACE", explanation:"GRACE and PLACE both end in the '-ace' sound." },
  { id:17, prompt:"Which word rhymes with CROWN?", targetWord:"CROWN", options:["TOWN","CLASH","GROAN","DRIFT"], answer:"TOWN", explanation:"CROWN and TOWN both end in the '-own' sound." },
  { id:18, prompt:"Which word rhymes with QUEST?", targetWord:"QUEST", options:["BEST","DRIFT","CLASH","GROAN"], answer:"BEST", explanation:"QUEST and BEST both end in the '-est' sound." },
  { id:19, prompt:"Which word rhymes with LIGHT?", targetWord:"LIGHT", options:["NIGHT","DRIFT","CLASH","GROAN"], answer:"NIGHT", explanation:"LIGHT and NIGHT both end in the '-ight' sound." },
  { id:20, prompt:"Which word does NOT belong in the rhyme group: SONG, LONG, STRONG?", targetWord:"", options:["WRONG","BEND","DONG","PRONG"], answer:"BEND", explanation:"BEND has the '-end' sound, while SONG, LONG, STRONG, WRONG, DONG, PRONG all share '-ong'." },
  { id:21, prompt:"Which word rhymes with HEART?", targetWord:"HEART", options:["START","GROAN","DRIFT","CLASH"], answer:"START", explanation:"HEART and START both end in the '-art' sound." },
  { id:22, prompt:"Which word rhymes with LOVE?", targetWord:"LOVE", options:["ABOVE","DRIFT","CLASH","GROAN"], answer:"ABOVE", explanation:"LOVE and ABOVE both end in the '-ove' (short) sound." },
];

export const PATTERN_QUESTIONS = [
  { id:1, sequence:"2, 4, 8, 16, ?", options:["32","20","24","18"], answer:"32", explanation:"Each number is doubled: 2×2=4, 4×2=8, 8×2=16, 16×2=32." },
  { id:2, sequence:"3, 6, 9, 12, ?", options:["15","13","16","14"], answer:"15", explanation:"Add 3 each time: 12+3=15." },
  { id:3, sequence:"1, 4, 9, 16, ?", options:["25","20","22","30"], answer:"25", explanation:"These are perfect squares: 1², 2², 3², 4², 5²=25." },
  { id:4, sequence:"1, 1, 2, 3, 5, ?", options:["8","7","6","9"], answer:"8", explanation:"Fibonacci sequence: each number is the sum of the previous two." },
  { id:5, sequence:"5, 10, 20, 40, ?", options:["80","60","50","70"], answer:"80", explanation:"Each number is doubled: 40×2=80." },
  { id:6, sequence:"100, 90, 80, 70, ?", options:["60","65","55","50"], answer:"60", explanation:"Subtract 10 each time: 70-10=60." },
  { id:7, sequence:"1, 3, 7, 15, ?", options:["31","25","29","27"], answer:"31", explanation:"Pattern: ×2+1 each time. 15×2+1=31." },
  { id:8, sequence:"2, 5, 10, 17, ?", options:["26","24","28","30"], answer:"26", explanation:"Add 3, 5, 7, 9... (odd numbers). 17+9=26." },
  { id:9, sequence:"64, 32, 16, 8, ?", options:["4","2","6","8"], answer:"4", explanation:"Divide by 2 each time: 8÷2=4." },
  { id:10, sequence:"0, 1, 4, 9, 16, ?", options:["25","20","23","27"], answer:"25", explanation:"Squares of 0,1,2,3,4,5: 5²=25." },
  { id:11, sequence:"1, 2, 6, 24, ?", options:["120","48","100","72"], answer:"120", explanation:"Factorials: 1!, 2!, 3!, 4!, 5!=120." },
  { id:12, sequence:"7, 14, 21, 28, ?", options:["35","30","32","38"], answer:"35", explanation:"Multiples of 7: 7×5=35." },
  { id:13, sequence:"1, 8, 27, 64, ?", options:["125","100","81","144"], answer:"125", explanation:"Cubes: 1³,2³,3³,4³,5³=125." },
  { id:14, sequence:"10, 7, 4, 1, ?", options:["-2","0","2","-1"], answer:"-2", explanation:"Subtract 3 each time: 1-3=-2." },
  { id:15, sequence:"2, 3, 5, 7, 11, ?", options:["13","12","15","14"], answer:"13", explanation:"Prime numbers: 2,3,5,7,11,13." },
  { id:16, sequence:"1, 2, 4, 7, 11, ?", options:["16","14","15","17"], answer:"16", explanation:"Add 1,2,3,4,5... 11+5=16." },
  { id:17, sequence:"3, 9, 27, 81, ?", options:["243","162","729","108"], answer:"243", explanation:"Multiply by 3: 81×3=243." },
];
