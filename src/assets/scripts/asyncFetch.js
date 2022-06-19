const $fetchAsync = document.getElementById("sectionPersonajes"),
// Variable para crear un fragmento del DOM
$fragment = document.createDocumentFragment(); 
// Función asyncrona para utilizar Await
async function getData(){
    try{
        let res = await fetch("http://hp-api.herokuapp.com/api/characters"),
            json = await res.json();
        
        if(!res.ok) throw {status: res.status, statusText: res.statusText}
        // Por cada elemento que traiga el arreglo de la variable json ...
        json.forEach(element => {
            const $ul = document.createElement("ul");
            $ul.innerHTML = `<h3>${element.name}</h3><p>House: ${element.house}</p><p>Gender: ${element.gender}</p><p>Year of Birdth: ${element.yearOfBirth}</p>`;
            $fragment.appendChild($ul);
        });
    
        $fetchAsync.appendChild($fragment);
    }catch(err){
        let message = err.statusText || "Ocurrió un error";
        $fetchAsync.innerHTML = `Error ${err.status}:${message}`;
    }finally{
    }           
}
getData();