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

extraInput1.addEventListener('keydown', (e) => {
  if (Object.values(pairs).includes(e.key) || Object.keys(pairs).includes(e.key)) {
    toggleColorButton.innerText = `You entered "${e.key}", but that's already in pairs.`;
    e.preventDefault();
    extraInput1.value = "";
    return;
  }

  if (e.key === 'Enter') {
    const opening = extraInput1.value.trim();
    if (!opening) {
      toggleColorButton.innerText = "Please enter a valid opening symbol first!";
      e.preventDefault();
      return;
    }
    extraInput2.focus();
    e.preventDefault();
  }
});

// --- Handle second input (closing symbol)
extraInput2.addEventListener('keydown', (e) => {
  if (Object.values(pairs).includes(e.key) || Object.keys(pairs).includes(e.key)) {
    toggleColorButton.innerText = `You entered "${e.key}", but that's already in pairs.`;
    e.preventDefault();
    extraInput2.value = "";
    return;
  }

  if (e.key === 'Enter') {
    const closing = extraInput2.value.trim();
    const opening = extraInput1.value.trim();

    if (!closing || !opening) {
      toggleColorButton.innerText = "Please enter valid symbols before pressing Enter!";
      e.preventDefault();
      return;
    }

    // Add new pair
    pairs[closing] = opening;
    toggleColorButton.innerText = `Added new pair: ${opening} → ${closing}`;

    // Reset inputs
    extraInput1.value = "";
    extraInput2.value = "";
    updatePairsDisplay();
    e.preventDefault();
  }
});

input.addEventListener('keydown', (e) => {
    if (e.key === '{' || e.key === '}' || e.key === '(' || e.key === ')' || e.key === '[' || e.key === ']') {
        input.value += e.key;
        e.preventDefault();
        stack.length = 0;
        for (const char of input.value) {
            if (Object.values(pairs).includes(char)) {
                stack.push(char);
            } else if (Object.keys(pairs).includes(char) && stack.length === 0) {
                toggleColorButton.className = 'bad';
                break;
            } else if (Object.keys(pairs).includes(char)) {
                if (stack.pop() !== pairs[char]) {
                    toggleColorButton.className = 'bad';
                    break
                }
            }
            if (stack.length === 0) toggleColorButton.className = 'good';
            else toggleColorButton.className = 'bad';
        }
    }
    if (e.key === 'Enter') {
        e.preventDefault();
    }
});

function updatePairsDisplay() {
  pairsDisplay.innerHTML = "<h3>Current pairs:</h3><ul>" +
    Object.entries(pairs)
      .map(([key, value]) => `<li>${value} → ${key}</li>`)
      .join('') +
    "</ul>";
}

updatePairsDisplay();


toggleColorButton.addEventListener('click', () => {
    extraInput1.style.display = 'block';
    extraInput2.style.display = 'block';
});