console.log('main.js Loaded')

// het ophalen van classes/elementen
const boterKaasEnEieren = document.querySelector('.b-k-e-img');
const whackAMole = document.querySelector('.w-a-m-img');
const boterKaasEnEierenBtn = document.querySelector('.b-k-e-btn')
const whackAMoleBtn = document.querySelector('.w-a-m-btn')

// image functioning
// var check waarde
if (boterKaasEnEieren) {
    // eventlistener voor het clicken 
    boterKaasEnEieren.addEventListener('click', function() {
        window.open("b-k-e.html", "_self")
    });
};
// var check waarde
if(whackAMole) {
    // eventlistener voor het clicken
    whackAMole.addEventListener('click', function() {
        window.open("w-a-m.html", "_self")
    });
};

// button functioning 
// var check waarde
if(boterKaasEnEierenBtn) {
    // eventlistener voor het clicken
    boterKaasEnEierenBtn.addEventListener('click', function() {
        window.open("b-k-e.html", "_self")
    });
};

// var check waarde
if(whackAMoleBtn) {
    // eventlistener voor het clicken
    whackAMoleBtn.addEventListener('click', function() {
        window.open("w-a-m.html", "_self")
    });
};