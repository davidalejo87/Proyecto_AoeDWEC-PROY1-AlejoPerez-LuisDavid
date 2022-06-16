'use strict';

// Variable para acceder al formulario
const form = document.getElementById("form");

// Variable para almacenar los inputs del formulario
const inputs = document.querySelectorAll("#form input");

// Expresiones regulares para validar nuestro formulario
const expressions = {
	user: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	phone: /^\d{7,14}$/ // 7 a 14 numeros.
};

// Objeto fields con los campos que tenemos que rellenar, en principio lo ponemos en false porque estarán vacios
const fields = {
	user: false,
	name: false,
	password: false,
	email: false,
	phone: false
}

// Función para validar los inputs del formulario
const validateForm = (e) =>{
	switch (e.target.name){
		case "user":
			validations(expressions.user, e.target, 'user');
		break;
		case "name":
			validations(expressions.name, e.target, 'name');
		break;
		case "password":
			validations(expressions.password, e.target, 'password');
			validationPassword2();
		break;
		case "password2":
			validationPassword2();
		break;
		case "email":
			validations(expressions.email, e.target, 'email');
		break;
		case "phone":
			validations(expressions.phone, e.target, 'phone');
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

// Función para validar la contraseña 2
const validationPassword2 = () =>{
	const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('password2');

	if (inputPassword1.value !== inputPassword2.value) {
		document.getElementById('group__password2').classList.add('form__group-incorrecto');
		document.getElementById('group__password2').classList.remove('form__group-correcto');
		document.querySelector('#group__password2 i').classList.add('fa-times-circle');
		document.querySelector('#group__password2 i').classList.remove('fa-check-circle');
		document.querySelector('#group__password2 .form__input-error').classList.add('form__input-error-active');
		fields['password'] = false;
	} else {
		document.getElementById('group__password2').classList.remove('form__group-incorrecto');
		document.getElementById('group__password2').classList.add('form__group-correcto');
		document.querySelector('#group__password2 i').classList.remove('fa-times-circle');
		document.querySelector('#group__password2 i').classList.add('fa-check-circle');
		document.querySelector('#group__password2 .form__input-error').classList.remove('form__input-error-active');
		fields['password'] = true;
	}
}

// Comprobamos cada vez que el usuario teclea dentro de un input o pincha fuera del formulario con el ratón
inputs.forEach((input) => {
	input.addEventListener('keyup',validateForm );
	input.addEventListener('blur',validateForm );
});



form.addEventListener('submit',(e)=>{
	// No deja enviar 
	e.preventDefault();

	const terms = document.getElementById('terms');
	/*
	* Comprobamos que todos los campos son validos e imitamos como si enviaramos el formulario a la bbdd y se resetearan los
	* valores, si faltara algún campo no saldría un mensaje de error (clase "form__message-active" ) previamente configurado en sass
	*/
	if(fields.user && fields.name && fields.password && fields.email && fields.phone && terms.checked){
		form.reset();

		// Agregamos la clase "form__message-succes-active" cuando el formulario se ha realizado correctamente
		document.getElementById('form__message-succes').classList.add('form__message-succes-active');
		
		// Utilizamos setTimeout para borrar el mensaje a los 5 segundos
		setTimeout(() => {
			document.getElementById('form__message-succes').classList.remove('form__message-succes-active');
		}, 5000);

		// Borramos los iconos de los label
		document.querySelectorAll(".form__group-correcto").forEach((icon)=>{
			icon.classList.remove("form__group-correcto");
		})
		// Borramos la clase "form__message-active" si estuviera activa
		document.getElementById("form__message").classList.remove("form__message-active");
	} else {
		document.getElementById("form__message").classList.add("form__message-active");
	}
});