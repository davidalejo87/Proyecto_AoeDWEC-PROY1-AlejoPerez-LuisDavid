'use strict';

// Variable para acceder a la clase container-carousel
const row = document.querySelector('.container__carousel');

// Variable para acceder a las clase shield
const shields = document.querySelectorAll('.shield');

// Variable para acceder a la flecha izquierda
const arrowLeft = document.getElementById('arrow-left');

// Variable para acceder a la flecha derecha
const arrowRigth = document.getElementById('arrow-rigth');


// Event Listener para la flecha derecha
arrowRigth.addEventListener('click', ()=>{
    row.scrollLeft += row.offsetWidth;
});

// Event Listener para la flecha izquierda
arrowLeft.addEventListener('click', ()=>{
    row.scrollLeft -= row.offsetWidth;
});

// Hover a las imagenes a través de js
shields.forEach((shield)=>{
    shield.addEventListener('mouseenter', (e)=>{
        const element = e.currentTarget;
        setTimeout(()=>{
            shields.forEach(shield => shield.classList.remove('hover'));
            element.classList.add('hover');
        }, 300);
    });
});

row.addEventListener('mouseleave', ()=>{
    shields.forEach(shield => shield.classList.remove('hover'));
})