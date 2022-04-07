'use strict';

//variables
const resultado = document.querySelector('#resultado');
const marcaSelect = document.querySelector('#marca');
const yearSelect = document.querySelector('#year');
const priceMinSelect = document.querySelector('#minimo');
const priceMaxSelect = document.querySelector('#maximo');
const doorsSelect = document.querySelector('#puertas');
const colorSelect = document.querySelector('#color');
const transmissionSelect = document.querySelector('#transmision');
const maxYear = new Date().getFullYear();
const minYear = maxYear - 10;

const dataSearch = {
    marca: '',
    year: '', 
    minimo: '', 
    maximo: '',
    puertas: '', 
    color: '', 
    transmision: '' 
}

//Eventos
document.addEventListener('DOMContentLoaded', ()=>{
    showBD(autos); //Muestra los carros al cargar
    generateYears(); //Genera las opciones de años
});

//Event Listeners para los select de busqueda 
marcaSelect.addEventListener('change',(e) =>{
    dataSearch.marca = e.target.value;
    filtarAuto();
});

yearSelect.addEventListener('change',(e) =>{
    dataSearch.year =  parseInt(e.target.value);
    filtarAuto();
});

priceMinSelect.addEventListener('change',(e) =>{
    dataSearch.minimo = e.target.value;
});

priceMaxSelect.addEventListener('change',(e) =>{
    dataSearch.maximo = e.target.value;
});

doorsSelect.addEventListener('change',(e) =>{
    dataSearch.puertas = parseInt(e.target.value);
    filtarAuto();
});

colorSelect.addEventListener('change',(e) =>{
    dataSearch.color = e.target.value;
});

transmissionSelect.addEventListener('change',(e) =>{
    dataSearch.transmision = e.target.value;
    console.log(dataSearch);
});

//Funciones

//Funcion para mostrar BD de los autos
function showBD(autos) {

    cleanHtml(); //Limipia el HTML previo
    
    autos.forEach((auto) => {
        const {marca, modelo, year, precio, puertas, color, transmision} = auto;
        const autoHtml = document.createElement('p');
        autoHtml.textContent = `
        ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: ${precio} - Color: ${color}
        `;
        resultado.appendChild(autoHtml);
    })
}

//Funcion limipiar HTML
function cleanHtml(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

//Funcion para generar las fechas en el selector
function generateYears(){
    for (let i = maxYear; i >= minYear; i--) {
        const optionYear = document.createElement('option');
        optionYear.textContent = i;
        yearSelect.appendChild(optionYear);
    }
}

//Function para filtrar en base a la busqueda

function filtarAuto() {
    const resultado = autos.filter(filterMarca).filter(filterYear).filter(filterDoors);
    showBD(resultado);
}

//Funciones de alto nivel es una funcion que se ejecuta como paramentro dentro de otra funcion

function filterMarca(auto){
    const { marca } = dataSearch;
    if(marca){
        return auto.marca === marca;
    }
    return auto;
}

function filterYear(auto){
    const { year } = dataSearch;
    if(year){
        return auto.year === year;
    }
    return auto;
}

function filterDoors(auto){
    const { puertas } = dataSearch;
    if(puertas){
        return auto.puertas === puertas;
    }
    return auto;
}