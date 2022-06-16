'use strict';

// Variable para acceder al formulario
const form = document.getElementById("form");

// Variable para almacenar los inputs del formulario
const inputs = document.querySelectorAll("#form input");

// Expresiones regulares para validar nuestro formulario
const expressions = {
	name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
};

// Objeto fields con los campos que tenemos que rellenar, en principio lo ponemos en false porque estarán vacios
const fields = {
	name: false,
	email: false,
}

// Función para validar los inputs del formulario
const validateForm = (e) =>{
	switch (e.target.name){
		case "name":
			validations(expressions.name, e.target, 'name');
		break;
		case "email":
			validations(expressions.email, e.target, 'email');
		break;

	};
};

// Función para validaciones
const validations = (expression, input, field ) => {
	if(expression.test(input.value)){
		document.getElementById(`group__${field}`).classList.remove('form__group-incorrecto');
		document.getElementById(`group__${field}`).classList.add('form__group-correcto');
		document.querySelector(`#group__${field} i`).classList.add('fa-check-circle');
		document.querySelector(`#group__${field} i`).classList.remove('fa-times-circle');
		document.querySelector(`#group__${field} .form__input-error`).classList.remove('form__input-error-active');
		fields[field] = true;
		
	}else{
		document.getElementById(`group__${field}`).classList.add('form__group-incorrecto');
		document.getElementById(`group__${field}`).classList.remove('form__group-correcto');
		document.querySelector(`#group__${field} i`).classList.add('fa-times-circle');
		document.querySelector(`#group__${field} i`).classList.remove('fa-check-circle');
		document.querySelector(`#group__${field} .form__input-error`).classList.add('form__input-error-active');
		fields[field] = false;
	}
}


const captcha = document.querySelector(".captcha");
const reloadButton = document.querySelector(".reload-button");
const inputField = document.querySelector(".input__captcha");
const checkButton = document.querySelector(".check-button");
const statusTxt = document.querySelector(".status-txt");

// Todos los caracteres posibles para el captcha
let allCharacters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
					  'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
					   0,1,2,3,4,5,6,7,8,9];


function getCaptcha(){
	// Bucle para elegir 6 caracteres aleatorios
	for(let i=0; i<6; i++){
		let randomChar = allCharacters[Math.floor(Math.random()*allCharacters.length)];
		// Mostramos los 6 caracteres del captcha
		captcha.innerText += `${randomChar}`;
	}
}	

getCaptcha();

// Evento para que al darle al boton de cargar, cargue otros 6 caracteres al azar
reloadButton.addEventListener("click", ()=>{
	captcha.innerText = "";
	getCaptcha();
})

//
checkButton.addEventListener("click", e =>{
	// Prevenimos de que puedan darle al botón Check
	e.preventDefault();
	statusTxt.style.display = "block";
	if(inputField.value == captcha.innerText){
		// Reseteamos los valores imitando el envío de la información
		form.reset();
		statusTxt.style.color = "#FFBF00";
		statusTxt.innerText = "No eres un robot!";
	} else {
		statusTxt.style.color = "ff0000";
		statusTxt.innerText = "Captcha no válido, inténtelo de nuevo!"
	}


});


