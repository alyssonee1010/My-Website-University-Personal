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

    if (opening === closing) {
      toggleColorButton.innerText = `Opening and closing must be different. You entered "${opening}" for both — not allowed.`;
      extraInput1.value = "";
      extraInput2.value = "";
      extraInput1.focus();
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
  setTimeout(() => {
    const text = input.value;
    const result = checkBalanced(text, pairs);
    toggleColorButton.className = result ? 'good' : 'bad';
  }, 0);
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
    if (extraInput1.style.display === 'block' && extraInput2.style.display === 'block') {
        extraInput1.style.display = 'none';
        extraInput2.style.display = 'none';
        return;
    }
    extraInput1.style.display = 'block';
    extraInput2.style.display = 'block';
});