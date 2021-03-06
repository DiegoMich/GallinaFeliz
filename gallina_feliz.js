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

    // Mostrar mensaje inicial
    pressStart();

    // Evento salto click
    $('body').on('click', {click: true}, salto);

    // Evento mute
    audio = document.getElementById('audio');
    audio.volume = 0.5;
    $('#sound').on('click', mute);
});

// Evento keypress salto teclas
$(document).on('keypress', {click: false}, salto);

// Evento keypress reset
$(document).keyup(function(e) {
    if (e.key === "Escape") { 
        location.reload();
    }
});

function salto(e) {

    if (e.target.nodeName == "LABEL")
    return;

    // Esconder leyenda
    $('#begin').hide();

    if (!moviendo) {
        moverGallina();

        if (startMusic) {
            audio = document.getElementById('audio');
            audio.play();
            startMusic = false;
        }

        score++;
        puntos = $('#puntos');
        puntos.text(score.toLocaleString('en-US', {minimumIntegerDigits: 3, useGrouping:false}));
    }
}


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

function pressStart() {
    msj = $('#begin');

    msj.css('left', $(window).width() / 2 - msj.width() / 2);
    msj.css('top', $(window).height() / 2 + 100);

    msj.show();    
}

function mute() {
    audio = document.getElementById('audio');
    isMuted = audio.volume == 0;

    if (isMuted) {
        audio.volume = 0.5;
        $('#sound').text('????');
    } else {
        audio.volume = 0;
        $('#sound').text('????');
    }
}