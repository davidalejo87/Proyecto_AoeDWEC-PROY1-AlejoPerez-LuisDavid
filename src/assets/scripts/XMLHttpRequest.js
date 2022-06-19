/*
* 1º Paso ----> Instancia del objeto XMLHttpRequest()
* 2º Paso ----> Asignación del evento o eventos
* 3º Paso ----> Asignar la instrucción que va a abrir la petición
* 4º Paso ----> Enviar la petición
*/


// Variable que hace una instancia del objeto XMLHttp
const xhr = new XMLHttpRequest(),
    $xhr = document.getElementById("sectionPersonajes"),
    // Variable para crear un fragmento del DOM
    $fragment = document.createDocumentFragment(); 


// Evento que más se utiliza => xhr.onreadystatechange() pero utilzaremos el estandar addEventListener
xhr.addEventListener("readystatechange",element =>{
    if(xhr.readyState !== 4) return;
    // Validación código de respuesta entre 200 y 300 (Respuestas satisfactorias)
    if(xhr.status >=200 && xhr.status < 300){
        // Variable para convertir JSON a objetos
        let json = JSON.parse(xhr.responseText);
        // Por cada elemento que traiga el arreglo de la variable json ...
        json.forEach(element => {
            const $ul = document.createElement("ul");
            $ul.innerHTML = `<h3>${element.name}</h3><p>House: ${element.house}</p><p>Gender: ${element.gender}</p><p>Year of Birdth: ${element.yearOfBirth}</p>`;
            $fragment.appendChild($ul)
        });
        $xhr.appendChild($fragment);
    }else{
        let message = xhr.statusText || "Ocurrió un error";
        $xhr.innerHTML = `Error ${xhr.status}:${message}`
    }
    
});
xhr.open("GET","http://hp-api.herokuapp.com/api/characters/students")
// Enviar la petición, ejecutamos el método send()
xhr.send();

