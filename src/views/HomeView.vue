<script setup>
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
<body >
    <main>
        <!-- PRIMERA SECCION -->
        <div class="gradient-background">
            <div class="contenedorsito">
                <div class="texto">
                    <div class="col-12 mt-auto mb-5 text-center">
                        <h3 style="padding-top: 7rem;" class="letter">VEN Y ADENTRATE EN</h3>
                        <h1 class="text-black mb-5 titulo">I´m Here</h1>
                        <button type="button" class="btn btn-outline-light">JUEGA AHORA</button>
                        <br>
                        <br>
                        <!-- <a class="jugar-ahora" href="">Juega Ahora</a> -->
                        <h2 class="text-justify mb-5 text-white parrafo">
                            Conoce las pesadillas más grandes que habitan en su casa
                        </h2>
                    </div>
                </div>
            </div>
        </div>

        <!-- SEGUNDA SECCION -->
        <div class="gradient">
        <div class="contenedor animar">
            <!-- Contenido del primer contenedor -->
            <div class="container SecSec">
                <div class="container inter">
                    <div class="row">
                    <div class="col-md-6">
                        <!-- <img src="../assets/IMG/juego1.jpg" class="img-thumbnail" alt="..."> -->
                        <h1>Sipnopsis</h1>
                        <br>
                        <p class="sipno">
                            Adéntrate en el inquietante mundo de I'm here y acompaña a Lilith en un escalofriante
                            viaje hacia las profundidades de sus pesadillas y traumas más oscuros. <br><br>
                            Prepárate para experimentar un juego de terror psicológico como ningún otro,
                            donde los límites entre la realidad y la imaginación se desdibujan <br><br>
                            En este cautivador videojuego, serás testigo de la compleja psique de Lilith
                            mientras lucha contra sus miedos y enfrenta desafíos perturbadores. <br><br>
                            ¿Estás listo para desafiar tus propios límites mentales y emocionales?
                        </p>
                    </div>
                    <div class="col-md-6">
                        <img src="../assets/IMG/juego1.jpg" class="img-thumbnail" alt="...">
                        <br>
                        <br>
                        <img  src="../assets/IMG/juego3.jpg" class="img-thumbnail .right-aligned"  alt="...">
                </div>
                </div>
                </div>
            </div>
        </div>
    </div>

            <!-- TECERA SECCION -->
        <div class="contenedor animar powerUp">
            <!-- Contenido del segundo contenedor -->
            <div class="container SecSec">
                <div class="container inter">
                <div class="row">
                    <div class="col-md-6">

                    </div>
                    <div class="col-md-6">
                        <h1 class="power">Desbloqueo de Power Ups</h1>
                        <br>
                        <p class="contexto">
                            Al adentrarte en el mundo inquietante y desafiante del videojuego, te
                            encontrarás con numerosos cofres misteriosos que resguardan poderosos powerups.
                            Sin embargo, para acceder a estos tesoros, deberás recolectar las llaves
                            necesarias que se encuentran ocultas en distintos lugares del escenario.<br><br>
                            Con ingenio y astucia, deberás explorar cada rincón del juego para encontrar
                            estas preciadas llaves. El mapa estará lleno de secretos y acertijos que
                            deberás resolver, lo que te llevará a sumergirte aún más en la atmósfera
                            enigmática del juego.<br><br>
                        </p>
                    </div>
                  </div>
                    
                  
                </div>
            </div>
        </div>

            <!-- CUARTA SECCION -->
        <div class="contenedor animar enemigos">
            <!-- Contenido del tercer contenedor -->

            <div class="container SecSec">
                <div class="container inter">
                    <div class="row">
                    <div class="col-md-6">
                        <h1 class="enemy">Variedad de enemigos</h1>
                        <br>
                        <br>
                        <p class="parrfo">
                            En esta aterradora aventura, te sumergirás en un mundo plagado de demonios
                            y terrores psicológicos. Enfrenta al demonio Scarly, una entidad que
                            personifica el abuso que Lilith sufrió; desafía al imponente Heaver,
                            el demonio que representa los traumas causados por desastres naturales
                            y violencia doméstica; y enfrenta tus propios miedos con Verbrannt,
                            el demonio de fuego que simboliza el incendio que marcó el destino de Lilith. <br><br>

                            Cada enemigo te presentará desafíos únicos y te pondrá a prueba tanto
                            mental como emocionalmente. ¿Tienes lo necesario para escapar de estos
                            temibles seres y ayudar a Lilith a encontrar la fuerza para superar sus traumas?
                        </p>
                    </div>
                    <div class="col-md-3">
                        <div class="card" style="width: 18rem;">
                        <img src="../assets/IMG/flaca.png" class="card-img-top" alt="...">
                        <div class="card-body">
                            <p class="card-text">Su cabello largo y enmarañado cae como sombras negras a su alrededor, creando una
                                            apariencia que evoca la oscuridad y el caos. Su cuerpo es extremadamente flaco y alargado,
                                            como si la crueldad y el sufrimiento hubieran desgastado su esencia, dejándola como una
                                            figura espectral y emaciada.</p>
                        </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card" style="width: 18rem;">
                        <img src="../assets/IMG/pesas.png" class="card-img-top" alt="...">
                        <div class="card-body">
                            <p class="card-text">Heaver, el demonio que personifica los traumas causados por terremotos y
                                            fenómenos naturales, así como la violencia doméstica, es una figura imponente
                                            y aterradora que refleja el peso devastador de estas experiencias.Su aspecto corpulento y gordo denota una presencia amenazante y dominante.</p>
                        </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>


        <!-- VIDEO
        <div class="container-fluid contenedor animar" style="margin-top: 15px;">
            <video id="video" src="{{asset('public/VIDEO/ImHereFinaFinal.mp4')}}" controls loop>
                Tu navegador no admite el elemento de video.
                <script src="{{asset('public/JS/video.js')}}"></script>
            </video>

        </div> -->


        <!--*? Sección de Personajes-->
        <div class="container SecSec  personajes">
            <div class="container">
                <br>
                <div class="col-md-12">
                    <div class="señal-llamativa">
                        <h2>Conoce a nuestros personajes:</h2>
                    </div>
                </div>

                <!-- CARRUSEL -->
                    <div id="carouselExampleIndicators" class="carousel slide">
    <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
    </div>
    <div class="carousel-inner">
        <div class="carousel-item active">
        <img src="../assets/IMG/pesas.png" class="d-block w-100 img-fluid" alt="...">
        </div>
        <div class="carousel-item">
        <img src="../assets/IMG/lilith.png" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
        <img src="../assets/IMG/flaca.png" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
        <img src="../assets/IMG/f.png" class="d-block w-100" alt="...">
        </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>
    </div>
                    </div>
                </div>
        </main>

    <br>
    <div class="container">
    <div class="card bg-dark text-white">
                <div class="row">
                    <!-- Columna para la imagen -->
                    <div class="col-md-6">
                        <img src="../assets/IMG/oso.png" class="img-responsive" alt="Logo">
                    </div>

                    <!-- Columna para el texto -->
                    <div class="col-md-6">
                        <div class="card-body">
                            <h3 class="card-title">Sé parte de esta <br> espantosa travesía. <br> ¡Descargalo Ya!</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>

</body>

</template>

<style scoped>
@import url('../assets/main.css');

/* body{
  /* font-family:Bonechiller Free; */


  /* Color de la primera seccion */
.gradient-background{
    background: linear-gradient(to right, #000000c0, #7d7c7bc6);
    background: url(../assets/IMG/fondooo.png);
    background-size: cover;
    min-height: 500px;
    position: relative;
}
.titulo{
    font-family:HelpMe;
    color: black;
}
.letter{
    color: white;
    font-family:Carnage In The Office;
    letter-spacing: 2px;
}
.parrafo{
    font-family: Carnage In The Office;
}
/* Color de la segunda seccion */
.gradient{
    background: linear-gradient(to right, #282828, #0e0d0cc6);
    background-size: cover;
    min-height: 500px;
    position: relative;
    font-family:Bonechiller Free;
    color: white;
}
.sipno{
    font-family:Bonechiller Free;
    font-size: 15px;
}
/* imagenes de sipnosis */
    .img-thumbnail{
        width: 300px;
    height: 200px;
    }
    .right-aligned{
        margin-left: auto;
    margin-right: 0;
    display: block;
    }

    /* TERCERA SECCION */
    .power{
        font-family:Bonechiller Free;
    }
    .contexto{
    display: flex;
    align-items: center;
    justify-content: center;
    }
/* Personajes */
.señal-llamativa{
    font-family:Bonechiller Free;
}
.personajes{
    background: linear-gradient(to right, #282828, #0e0d0cc6);
    background-size: cover;
    min-height: 500px;
    position: relative;
    font-family:Bonechiller Free;
    color: white;
}
/* TERCERA SECCION */
.powerUp{
    background: linear-gradient(to right, #545252, #575654c6);
    background-size: cover;
    min-height: 500px;
    position: relative;
    /* font-family:Bonechiller Free; */
    color: white;
}
.enemigos{
    background: linear-gradient(to right, #555454, #c9c6c4c6);
    background-size: cover;
    min-height: 500px;
    position: relative;
    font-family:Bonechiller Free;
    color: white;
}
.contexto{
    font-family:Bonechiller Free;
    font-size: 20px;
    color: black;
}
/* JUEGA AHORA */
.card{
        margin: auto;
        margin-bottom: 3%;
    }
    /* ENEMIGOS */
    .enemy{
        font-family:Bonechiller Free;
    }
    .parrfo{
        color: black;
        font-family:Bonechiller Free;
        font-size: 20px;
    }

</style>