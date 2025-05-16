const inputName = document.getElementById('name');
const inputPrice = document.getElementById('prix');
const inputQuantity = document.getElementById('quantite');
const messageHTML = document.querySelector('.message');
const totalHTML = document.querySelector('.total--price');
const btnGenerate = document.querySelector('.btn');

const commandesTab = [];
let total = 0
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
        return `${this.quantity}x ${this.name} - Total ${this.total}€`
    }
}

// === Afficher commande dans l'HTML ===
function displayTab() {
    messageHTML.innerHTML = "";
    
    commandesTab.forEach(commande => {
        let div = document.createElement('div');
        div.className = `${commande.name} commande`;
        div.innerHTML += `${commande.returnCommande()}`
        messageHTML.append(div);
    })
};

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
    totalHTML.textContent = total;
}


// === Event Listner btn ===
btnGenerate.addEventListener('click', (e) => {
    e.preventDefault();
    commandesTab.push(new Commande(inputName.value,inputQuantity.value, inputPrice.value));
    displayTab();
    totalPrice();
    resetInput();
})