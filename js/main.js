const inputName = document.getElementById('name');
const inputPrice = document.getElementById('prix');
const inputQuantity = document.getElementById('quantite');
const messageHTML = document.querySelector('.message');
const totalHTML = document.querySelector('.total--price');
const commandeHTML = document.querySelector('.commande');

const btnGenerate = document.querySelector('.btn');
const btnDelete = document.querySelector('.btn--delete');

const commandesTab = [];
let total = Number.parseFloat(0).toFixed(2);
totalHTML.textContent = total;

// === Class Commande ===
class Commande{
    constructor(name, price, quantity){
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.total = price * quantity; 
    }
    returnCommande(){
        return `${this.quantity}x ${this.name} - Total ${Number.parseFloat(this.total).toFixed(2)}€`
    }
}

// === Afficher commande dans l'HTML ===
function displayTab() {
    messageHTML.innerHTML = "";
    
    commandesTab.forEach(commande => {
        let div = document.createElement('div');
        div.className = `${commande.name} commande`;
        div.setAttribute("data-index", `${commandesTab.indexOf(commande)}`);
        div.innerHTML += `${commande.returnCommande()} <i class="fa-solid fa-square-minus btn--delete"></i>`
        messageHTML.append(div);
    })
    if (commandesTab.length === 0) {
    messageHTML.innerHTML = "<p>⛔ Aucune commande ajoutée.</p>";
}
}

displayTab();

// === Reset les input ===
function resetInput() {
    inputPrice.value = inputName.value = inputQuantity.value = "";
    inputName.focus();
}

// === Afficher prix total ===
function totalPrice() {
    total = 0;
    commandesTab.forEach(commande => {
        total += commande.total;
    })
    totalHTML.textContent = Number.parseFloat(total).toFixed(2);
}




// === Event Listner btn ===
// == Add
btnGenerate.addEventListener('click', (e) => {
    if (inputName.value && !isNaN(inputPrice.value) && !isNaN(inputQuantity.value)) {
        e.preventDefault();
        commandesTab.push(new Commande(inputName.value,inputQuantity.value, inputPrice.value));
        displayTab();
        totalPrice();
        resetInput();
    } else {
        alert('Veuillez remplir les champs du formulaire.');
    }
    
    
})

// == Delete
messageHTML.addEventListener('click', (e) =>{
    if (e.target.classList.contains('btn--delete')) {
      let index = Number(e.target.parentElement.dataset.index);
      commandesTab.splice(index, 1);
      
      displayTab();
      totalPrice();
    }
})