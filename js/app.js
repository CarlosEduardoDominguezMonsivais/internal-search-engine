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
    filtrarAuto();
});

yearSelect.addEventListener('change',(e) =>{
    dataSearch.year =  parseInt(e.target.value);
    filtrarAuto();
});

priceMinSelect.addEventListener('change',(e) =>{
    dataSearch.minimo = parseInt(e.target.value);
    filtrarAuto();
});

priceMaxSelect.addEventListener('change',(e) =>{
    dataSearch.maximo = e.target.value;
    filtrarAuto();
});

doorsSelect.addEventListener('change',(e) =>{
    dataSearch.puertas = parseInt(e.target.value);
    filtrarAuto();
});

colorSelect.addEventListener('change',(e) =>{
    dataSearch.color = e.target.value;
    filtrarAuto();
});

transmissionSelect.addEventListener('change',(e) =>{
    dataSearch.transmision = e.target.value;
    filtrarAuto();
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

function filtrarAuto() {
    const resultado = autos.filter(filterMarca).filter(filterYear).filter(filterMinPrice).filter(filterMaxPrice).filter(filterDoors).filter(filterColor).filter(filterTransmission);
    showBD(resultado);
    noDataSearch(resultado);
}

//Funcion para mostrar mensaje de no se encontraron resultados

function noDataSearch(res){
    if (res.length == 0) {
        console.log('No se encontraron datos');
        const mensajeError = document.createElement('p');
        mensajeError.textContent = "No se encontraron resultados de la busqueda";
        mensajeError.classList.add('alerta', 'error');
        resultado.appendChild(mensajeError);
    }
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

//funcion para registrar los precios minimos y maximos

function filterMinPrice(auto) {
    const { minimo } = dataSearch;

    if(minimo){
        return auto.precio >= minimo;
        console.log(auto.precio >= minimo);
    }
    return auto;
}

function filterMaxPrice(auto) {
    const { maximo } = dataSearch;

    if(maximo){
        return auto.precio <= maximo;
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

function filterColor(auto){
    const { color } = dataSearch;
    if(color){
        return auto.color === color;
    }
    return auto;
}

function filterTransmission(auto){
    const { transmision } = dataSearch;
    if(transmision){
        return auto.transmision === transmision;
    }
    return auto;
}