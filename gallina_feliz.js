// Vars
startMusic = true;
moviendo = false;
score = 0;

// DOM Loaded
$(function() {
    // Centrar la gallina y mostrarla
    gallina = $('#gallina');
    gallina.css('left', $(window).width() / 2 - gallina.width() / 2);
    gallina.css('top', $(window).height() / 2 - gallina.height() / 2);
    gallina.show();

    // Posicionar puntos y mostrar
    puntosMove();

    // Pantalla completa
    fullScreen();
});

// Evento keypress
$(document).on('keypress', function(e) {
    if (!moviendo) {
        moverGallina();

        if (startMusic) {
            audio = document.getElementById('audio');
            audio.volume = 0.5;
            audio.play();
            startMusic = false;
        }

        score++;
        puntos = $('#puntos');
        puntos.text(score.toLocaleString('en-US', {minimumIntegerDigits: 3, useGrouping:false}));
    }
})

// Mover la gallina
function moverGallina() {

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    moviendo = true;

    gallina = $('#gallina')
    currentLeft = gallina.css('left');
    currentTop = gallina.css('top');

    // Salto
    gallina.animate({
        top: "-=50",
    }, 100, function() {
        gallina.animate({
            top: "+=50",
        }, 100, function() {
            // Mover a nuevo lugar
            newLeft = getRandomInt($(window).width() - gallina.width() - 10);
            newTop = getRandomInt($(window).height() - gallina.height() - 10);
            gallina.css('left', newLeft);
            gallina.css('top', newTop);

            moviendo = false;
        });
    });

    //Huevo
    huevo = `<img src=huevo.png alt="huevo" style="position: absolute; left: ${currentLeft}; top: ${currentTop};">`
    $('.container').prepend(huevo);

    // Sonido huevo
    sonido = document.getElementById('huevo');
    sonido.currentTime = 0;
    sonido.play();
}

$(window).on('resize', function() {
    puntosMove();
});

function puntosMove() {
    puntosFondo = $('#puntos_fondo');
    puntosFondo.css('left', $(window).width() - puntosFondo.width() - 10);
    puntosFondo.show();

    puntos = $('#puntos');
    puntos.css('left', $(window).width() - puntos.width() - 60);
    puntos.show();
}
