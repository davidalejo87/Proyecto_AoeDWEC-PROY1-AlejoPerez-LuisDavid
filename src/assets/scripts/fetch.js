

(() => {
    const $fetch = document.getElementById("sectionPersonajes"),
    // Variable para crear un fragmento del DOM
    $fragment = document.createDocumentFragment(); 

   fetch("http://hp-api.herokuapp.com/api/characters/staff")

   // Validamos errores con el primer then
   .then((res) => (res.ok ? res.json(): Promise.reject(res)))
   .then( json =>{
   
        // Por cada elemento que traiga el arreglo de la variable json ...
        json.forEach((element) => {
            const $ul = document.createElement("ul");
            $ul.innerHTML = `<h3>${element.name}</h3><p>House: ${element.house}</p><p>Gender: ${element.gender}</p><p>Year of Birdth: ${element.yearOfBirth}</p>`;
            $fragment.appendChild($ul);
        });
        
        $fetch.appendChild($fragment);
    })
   .catch(err =>{
        console.log(err);
        let message = err.statusText || "Ocurrió un error";
        $fetch.innerHTML = `Error ${err.status}:${message}`;
    });

})();