const inputA = document.getElementById('a');
const inputB = document.getElementById('b');
const addBtn = document.getElementById('add');
const relationsUL = document.getElementById('relations');
const relationsWrap = document.getElementById('relationsWrap');
const runBtn = document.getElementById('run');
const out = document.getElementById('out');
const clearBtn = document.getElementById('clear');

let dependencies = [];

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

function clearOutput(){
    dependencies = []
    renderRelations();
    clearBtn.style.visibility="hidden"
}

function normalize(s){
    return s.trim();
}

function addRelation(){
    const p1 = normalize(inputA.value);
    const p2 = normalize(inputB.value);
    if (!p1 || !p2) { 
        out.textContent = 'Tchja, beide fields müssen eingegeben werden';
        out.className = 'bad';
     return;
    }

    // avoid self-loop
    if (p1 === p2) {
    out.textContent = 'Selbstbeziehung nicht erlaubt';
    out.className = 'bad';
    return;
    }

    for (const [p3, p4] of dependencies) {
        if(p3 === p1 && p4 == p2 || p4 == p1 && p3 == p2){
            out.textContent = 'Paare ist schon hinzugefügt worden';
            out.className = 'bad';
        return;}
    };

    dependencies.push([p1, p2])
    renderRelations();
}
clearBtn.style.visibility="hidden"
addBtn.addEventListener('click', addRelation);
clearBtn.addEventListener('click', clearOutput);

inputB.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addRelation()
    }
});

inputA.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        inputB.focus()
    }
});

runBtn.addEventListener('click', () => {
    try {
        out.textContent = ""
        out.className = 'good';
        const result = topsort(dependencies)
        for (const word of result) {
            out.textContent = out.textContent == "" ? word :`${out.textContent}, ${word}`;
        }
        
    } catch (err) {
        console.log(err.message)
        out.textContent = `Topologische sortierung error:  ${err.message}`;
        out.className = 'bad';
    }
});

// initial render
renderRelations();

function topsort(dependencies) {
const adjacent = {};
const nodes = {};

// adjacent aufbauen
for (const [before, after] of dependencies) {
    if (!adjacent[before]) adjacent[before] = [];
    adjacent[before].push(after);
    nodes[before] = true;
    nodes[after] = true;
}

const visited = {};
const visiting = {};    // Cicle detection
const result = [];

function dfs(node) {
if (visited[node]) return;
if (visiting[node]) throw new Error("Cycle detected, break!");

visiting[node] = true;
const neighbors = adjacent[node] || [];
for (const neighbor of neighbors) {
    dfs(neighbor);
}
visiting[node] = false;

visited[node] = true;
result.push(node);
}

for (const node in nodes) {
if (!visited[node]) dfs(node);
}
return result.reverse();
}