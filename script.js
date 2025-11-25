const input = document.getElementById('theonlytext');
const extraInput1 = document.getElementById('extraInput1');
const extraInput2 = document.getElementById('extraInput2');
const toggleColorButton = document.getElementById('theonlybutton');
const pairsDisplay = document.getElementById('pairsDisplay');

const stack = [];

const pairs = {
    ')': '(',
    ']': '[',
    '}': '{'
  };


function renderRelations(){
    relationsUL.innerHTML = '';
    if (dependencies.length > 0){
        dependencies.forEach(([p1,p2]) => {
            const li = document.createElement('li');
            li.textContent = `${p1} -> ${p2}`
            relationsUL.appendChild(li)
        });
        clearBtn.style.visibility="visible"
    } else {
    relationsUL.innerHTML = '<li class="small">Keine Relationen</li>';
    }
}

// extraInput1.addEventListener('keydown', (e) => {
//   if (Object.values(pairs).includes(e.key) || Object.keys(pairs).includes(e.key)) {
//     toggleColorButton.innerText = `You entered "${e.key}", but that's already in pairs.`;
//     e.preventDefault();
//     extraInput1.value = "";
//     return;
//   }

//   if (e.key === 'Enter') {
//     const opening = extraInput1.value.trim();
//     if (!opening) {
//       toggleColorButton.innerText = "Please enter a valid opening symbol first!";
//       e.preventDefault();
//       return;
//     }
//     extraInput2.focus();
//     e.preventDefault();
//   }
// });

// // --- Handle second input (closing symbol)
// extraInput2.addEventListener('keydown', (e) => {
//   if (Object.values(pairs).includes(e.key) || Object.keys(pairs).includes(e.key)) {
//     toggleColorButton.innerText = `You entered "${e.key}", but that's already in pairs.`;
//     e.preventDefault();
//     extraInput2.value = "";
//     return;
//   }

//   if (e.key === 'Enter') {
//     const closing = extraInput2.value.trim();
//     const opening = extraInput1.value.trim();

//     if (!closing || !opening) {
//       toggleColorButton.innerText = "Please enter valid symbols before pressing Enter!";
//       e.preventDefault();
//       return;
//     }

//     if (opening === closing) {
//       toggleColorButton.innerText = `Opening and closing must be different. You entered "${opening}" for both — not allowed.`;
//       extraInput1.value = "";
//       extraInput2.value = "";
//       extraInput1.focus();
//       return;
//     }

//     // Add new pair
//     pairs[closing] = opening;
//     toggleColorButton.innerText = `Added new pair: ${opening} → ${closing}`;

//     // Reset inputs
//     extraInput1.value = "";
//     extraInput2.value = "";
//     updatePairsDisplay();
//     e.preventDefault();
//   }
// });

function checkBalanced(text, pairs) {
  const stack = [];
  const openers = Object.values(pairs);
  const closers = Object.keys(pairs);

  // Go through the text scanning substrings
  for (let i = 0; i < text.length; i++) {
    // Check if any opener starts here
    const opener = openers.find(o => text.startsWith(o, i));
    if (opener) {
      stack.push(opener);
      i += opener.length - 1; // skip ahead
      continue;
    }

    // Check if any closer starts here
    const closer = closers.find(c => text.startsWith(c, i));
    if (closer) {
      const expectedOpener = pairs[closer];
      const lastOpener = stack.pop();
      if (lastOpener !== expectedOpener) {
        return false;
      }
      i += closer.length - 1; // skip ahead
    }
  }

  return stack.length === 0;
}


input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    return;
  }
  const value = input.value + e.key;
  
  if (!isNaN(value)) {
      pairsDisplay.innerText = "Valid number entered.";
      pairsDisplay.style.color = "green";
      return
  } 

  pairsDisplay.innerText = "Please enter a valid number.";
  pairsDisplay.style.color = "red";
  return;
});


toggleColorButton.addEventListener('click', () => {
  if (!isNaN(input.value)) {
    let result = counter.inc();
    if (input.value == 100) {
      result = counter.dec();
    }
    pairsDisplay.innerText = `Result: ${result}`;
    pairsDisplay.style.color = "green";
  } else {
    pairsDisplay.innerText = "Please enter a valid number.";
    pairsDisplay.style.color = "red";
  }
    // if (extraInput1.style.display === 'block' && extraInput2.style.display === 'block') {
    //     extraInput1.style.display = 'none';
    //     extraInput2.style.display = 'none';
    //     return;
    // }
    // extraInput1.style.display = 'block';
    // extraInput2.style.display = 'block';
});

const curry = (f, a) => {
  return (b) => f(a, b);
}

const add = (x, y) => x + y;

const mul = (x, y) => x * y;

const double = (x) => x * 2;

const inc = (x) => x + 1;

function methodize(binary) {
  return function(arg) {
    return binary(arg, arg);
  };
}

function composeu(fun1, fun2) {
  return function(x) {
    return fun2(fun1(x));
  }
}

function composeub(fun1, fun2) {
  return function(x, y, z) {
    return fun2(fun1(x, y), z);
  }
}

function once(fun) {
  let done = false;
    return function(x,y) {
        if (!done) {
          done = true;
          return fun(x,y);
        } else {
          throw Error("Function can only be called once");
        }
    }
}

const counterf = (x) => {
  return {
    inc: () => ++x,
    dec: () => --x
  }
}

let counter = counterf(10);

let add_once = once(add)

const stopwords = [
  "a","ab","aber","ach","acht","achte","achten","achter","achtes","ag","alle","allein","allem","allen","aller","allerdings","alles","allgemeinen","als","also","am","an","ander","andere","anderem","anderen","anderer","anderes","anderm","andern","anderr","anders","au","auch","auf","aus","ausser","ausserdem","außer","außerdem","b","bald","bei","beide","beiden","beim","beispiel","bekannt","bereits","besonders","besser","besten","bin","bis","bisher","bist","c","d","d.h","da","dabei","dadurch","dafür","dagegen","daher","dahin","dahinter","damals","damit","danach","daneben","dank","dann","daran","darauf","daraus","darf","darfst","darin","darum","darunter","darüber","das","dasein","daselbst","dass","dasselbe","davon","davor","dazu","dazwischen","daß","dein","deine","deinem","deinen","deiner","deines","dem","dementsprechend","demgegenüber","demgemäss","demgemäß","demselben","demzufolge","den","denen","denn","denselben","der","deren","derer","derjenige","derjenigen","dermassen","dermaßen","derselbe","derselben","des","deshalb","desselben","dessen","deswegen","dich","die","diejenige","diejenigen","dies","diese","dieselbe","dieselben","diesem","diesen","dieser","dieses","dir","doch","dort","drei","drin","dritte","dritten","dritter","drittes","du","durch","durchaus","durfte","durften","dürfen","dürft","e","eben","ebenso","ehrlich","ei","ei,","eigen","eigene","eigenen","eigener","eigenes","ein","einander","eine","einem","einen","einer","eines","einig","einige","einigem","einigen","einiger","einiges","einmal","eins","elf","en","ende","endlich","entweder","er","ernst","erst","erste","ersten","erster","erstes","es","etwa","etwas","euch","euer","eure","eurem","euren","eurer","eures","f","folgende","früher","fünf","fünfte","fünften","fünfter","fünftes","für","g","gab","ganz","ganze","ganzen","ganzer","ganzes","gar","gedurft","gegen","gegenüber","gehabt","gehen","geht","gekannt","gekonnt","gemacht","gemocht","gemusst","genug","gerade","gern","gesagt","geschweige","gewesen","gewollt","geworden","gibt","ging","gleich","gott","gross","grosse","grossen","grosser","grosses","groß","große","großen","großer","großes","gut","gute","guter","gutes","h","hab","habe","haben","habt","hast","hat","hatte","hatten","hattest","hattet","heisst","her","heute","hier","hin","hinter","hoch","hätte","hätten","i","ich","ihm","ihn","ihnen","ihr","ihre","ihrem","ihren","ihrer","ihres","im","immer","in","indem","infolgedessen","ins","irgend","ist","j","ja","jahr","jahre","jahren","je","jede","jedem","jeden","jeder","jedermann","jedermanns","jedes","jedoch","jemand","jemandem","jemanden","jene","jenem","jenen","jener","jenes","jetzt","k","kam","kann","kannst","kaum","kein","keine","keinem","keinen","keiner","keines","kleine","kleinen","kleiner","kleines","kommen","kommt","konnte","konnten","kurz","können","könnt","könnte","l","lang","lange","leicht","leide","lieber","los","m","machen","macht","machte","mag","magst","mahn","mal","man","manche","manchem","manchen","mancher","manches","mann","mehr","mein","meine","meinem","meinen","meiner","meines","mensch","menschen","mich","mir","mit","mittel","mochte","mochten","morgen","muss","musst","musste","mussten","muß","mußt","möchte","mögen","möglich","mögt","müssen","müsst","müßt","n","na","nach","nachdem","nahm","natürlich","neben","nein","neue","neuen","neun","neunte","neunten","neunter","neuntes","nicht","nichts","nie","niemand","niemandem","niemanden","noch","nun","nur","o","ob","oben","oder","offen","oft","ohne","ordnung","p","q","r","recht","rechte","rechten","rechter","rechtes","richtig","rund","s","sa","sache","sagt","sagte","sah","satt","schlecht","schluss","schon","sechs","sechste","sechsten","sechster","sechstes","sehr","sei","seid","seien","sein","seine","seinem","seinen","seiner","seines","seit","seitdem","selbst","sich","sie","sieben","siebente","siebenten","siebenter","siebentes","sind","so","solang","solche","solchem","solchen","solcher","solches","soll","sollen","sollst","sollt","sollte","sollten","sondern","sonst","soweit","sowie","später","startseite","statt","steht","suche","t","tag","tage","tagen","tat","teil","tel","tritt","trotzdem","tun","u","uhr","um","und","und?","uns","unse","unsem","unsen","unser","unsere","unserer","unses","unter","v","vergangenen","viel","viele","vielem","vielen","vielleicht","vier","vierte","vierten","vierter","viertes","vom","von","vor","w","wahr?","wann","war","waren","warst","wart","warum","was","weg","wegen","weil","weit","weiter","weitere","weiteren","weiteres","welche","welchem","welchen","welcher","welches","wem","wen","wenig","wenige","weniger","weniges","wenigstens","wenn","wer","werde","werden","werdet","weshalb","wessen","wie","wieder","wieso","will","willst","wir","wird","wirklich","wirst","wissen","wo","woher","wohin","wohl","wollen","wollt","wollte","wollten","worden","wurde","wurden","während","währenddem","währenddessen","wäre","würde","würden","x","y","z","z.b","zehn","zehnte","zehnten","zehnter","zehntes","zeit","zu","zuerst","zugleich","zum","zunächst","zur","zurück","zusammen","zwanzig","zwar","zwei","zweite","zweiten","zweiter","zweites","zwischen","zwölf","über","überhaupt","übrigens"
];

const text = `
Plagiatsresolution und maßnahmen: Plagiatsresolution und -maßnahmen
Resolution zum akademischen Ethos und zu den akademischen Standards

In guter Tradition und anlässlich der öffentlichen Diskussion zum Plagiatsthema
sieht sich die Hochschule Bonn-Rhein-Sieg in der Pflicht, ihre Position klar und
eindeutig zu bekunden und hochschulweit Maßnahmen einzuleiten.

1. Die Hochschule Bonn-Rhein-Sieg bekennt sich mit dieser Resolution öffentlich zum
akademischen Ethos und den akademischen Standards.

2. Die Hochschule Bonn-Rhein-Sieg sieht sich verpflichtet, alle Studierende frühzeitig
im Studium sowohl über den wissenschaftlichen Auftrag und den akademischen Ethos
als auch über die Konsequenzen seiner Missachtung aufzuklären.

...
`;

// 1. HTML-Tags entfernen (falls vorhanden) und alles kleinschreiben
const cleaned = text
  .replace(/<[^>]*>/g, " ") // HTML-Tags raus
  .toLowerCase();

// 2. Wörter extrahieren (inkl. Umlaute, ß, etc.)
const tokens = cleaned.match(/\p{L}+/gu) || []; // \p{L} = Buchstaben, u-Flag für Unicode

// 3. Stoppwörter und zu kurze Wörter filtern (FILTER)
const filteredWords = tokens.filter(
  w => w.length > 2 && !stopwords.includes(w)
);

// 4. Häufigkeiten zählen (REDUCE)
const frequencyMap = filteredWords.reduce((acc, word) => {
  acc[word] = (acc[word] || 0) + 1;
  return acc;
}, {});

// 5. Map → Array, sortieren, Top 3 (MAP + weitere Verarbeitung)
const top3 = Object.entries(frequencyMap)    // [ [wort, count], ... ]
  .sort((a, b) => b[1] - a[1])              // nach Häufigkeit absteigend
  .slice(0, 3)                              // Top 3
  .map(([word, count]) => ({ word, count })); // MAP: zu Objekten

console.log(top3);

