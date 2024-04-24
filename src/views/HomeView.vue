<script setup>
import TheWelcome from '../components/TheWelcome.vue'

</script>

<template>
<body>
    <main>
        <!-- PRIMERA SECCION -->
        <div class="gradient-background container scroll " style="height: 50rem; padding-top: 20rem;  " >
            <div class="row" style="padding-left: 28rem">
                <h1 class="text-white scroll-text">
                    I´M HERE
                </h1>
              </div>
            </div>
            <!-- <section>
              <div>
                <h1>
                  <span>NUEVO</span>
                  <br>
                  <span>Iphone 15 pro</span>
                </h1>
              </div>
            </section>
            <section>
              <h3>y todo con css</h3>
            </section> -->

        <!-- SEGUNDA SECCION -->
        <div class="gradient" style="height: 42rem; padding-top: 3rem;align-items: center; ">
        <div class="contenedor animar">
            <!-- Contenido del primer contenedor -->
            <div class="row" >
              <div class="col-lg-5 ">
                <!-- la siponisi -->
                <h1 id="titulo">!!CONOCE LOS TEMORES DE LILITH!!</h1>
                <br>
                <p id="introduccion">Adéntrate en el inquietante mundo de I'm here y acompaña a Lilith 
                  en un escalofriante
                  viaje hacia las profundidades de sus pesadillas y traumas 
                  más oscuros.</p>
                <div class="row" id="datos">
                  <div class="col-md-4">
                    <div class="container">
                      <h6 id="info">20/Abril/2024</h6>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="container">
                      <h6>Genero: Terror</h6>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="container">
                      <h6>Desarrollador UTM</h6>
                    </div>
                  </div>
                </div>
                <div class="row" style="padding-left: 17.5rem; padding-top: 2rem;">
                 
                    <button type="button" class="btn btn-outline-light" style="width: 7rem;">COMPRAR</button>
                 
                </div>
              </div>
              <div class="col-md-6 col-xs-12" style="padding-left: 9rem;">
                <!-- video -->
  <div class="container" style="position: relative; width: 100%; max-width: 800px; margin: 0 auto; padding-top: 5rem;">
    <video style="max-width: 100%; height: auto;" controls autoplay loop muted>
                          <source src="../assets/IMG/imhere.mp4" type="video/mp4">">
                      </video>
  </div>
              </div>
            </div>
            </div>
          </div>
        
            <!-- TECERA SECCION -->
            <!-- Contenido del segundo contenedor -->
            <div class=" SecSec tercerasec" style="height: 50rem; padding-top: 2rem;">
                <div class="container">
                    <div class="row">
                    <!-- titulo -->
                    <div class="col-md-12">
                        <h1 class="Titulo3">CARACTERISTICAS</h1>
                    </div>
                    <!-- fila 1 -->
                        <div class="row">
                            <div class="col-md-6">
                                <img class="juego1 img-fluid mt-2"  src="../assets/IMG/juego1.jpg" alt="juego imhere">
                            </div>
                            <div class="col-md-6">
                                <div class="container bg-white baner">
                                    <h5 id="tiles">enbárcate a un lugar de aventuras</h5>
                                </div>
                                <h4 id="text" >Prepárate para experimentar un juego de terror psicológico como ningún otro,
                            donde los límites entre la realidad y la imaginación se desdibujan </h4>
                            </div>
                        </div>
                        <!-- fila 2 -->
                        <div class="row justify-content-center" style="padding-top: 2rem;">
                            <div class="col-md-6">
                                <div class="container bg-white baner2">
                                    <h5 id="tiles">REVIVE TUS RECURDOS BUSCANDO LOS COFRES</h5>
                                </div>
                                <h4 id="text" >Al adentrarte en el mundo inquietante y desafiante del videojuego, te
                            encontrarás con numerosos cofres misteriosos que resguardan poderosos powerups.
                            Sin embargo, para acceder a estos tesoros, deberás recolectar las llaves
                            necesarias que se encuentran ocultas en distintos lugares del escenario.</h4>
                            </div>
                            <div class="col-md-6">
                                <img class="juego1 img-fluid mt-2"  src="../assets/IMG/juego1.jpg" alt="juego imhere">
                            </div>
                        </div>
                        
                        <!-- fila3 -->
                        <div class="row" style="padding-top: 2rem;">
                        <div class="col-md-6">
                            <img class="juego1 img-fluid mt-2"  src="../assets/IMG/juego1.jpg" alt="juego imhere">
                        </div>
                        <div class="col-md-6">
                            <div class="comntainer bg-white baner3">
                                <h5 id="tiles">adskalsdaskd</h5>
                            </div>
                            <p id="text" >Con ingenio y astucia, deberás explorar cada rincón del juego para encontrar
                            estas preciadas llaves. El mapa estará lleno de secretos y acertijos que
                            deberás resolver, lo que te llevará a sumergirte aún más en la atmósfera
                            enigmática del juego
                            </p>
                        </div>
                        </div>
                        </div>
                </div>
                    </div>
                
            <!-- CUARTA SECCION -->
            <div class="personas"style="height: 51rem; padding-top: 8rem;">
              <div class="row">
                <h1 id="enemigos">PERSONAJES</h1>
              </div>
              <div id="carouselExampleIndicators" class="carousel slide">
    <div class="carousel-inner carruselch">
        <div class="carousel-item active ">
          <div class="card" style="width: 18rem;">
  <img src="../assets/IMG/pesas.png" class="card-img-top" id="pesas" alt="...">
  <div class="card-body">
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
        </div>

        <div class="carousel-item">
          <div class="card" style="width: 18rem;">
  <img src="../assets/IMG/lilith.png" class="card-img-top" id="lilith" alt="...">
  <div class="card-body">
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>

        </div>
        <div class="carousel-item">
          <div class="card" style="width: 18rem;">
  <img src="../assets/IMG/flaca.png" class="card-img-top" id="flaca" alt="...">
  <div class="card-body">
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
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


        <!-- QUINTA SECCION -->
        <div class="gradient new" style="height: 42rem; padding-top: 3rem;align-items: center; ">
          <div class="row">
            <h1 id="newprox">PROXIMANTE</h1>
            <div class="col-md-6">
              <div class="container">
                <div class="card" style="max-width: 750px; height: 30rem;margin-left: 45px;">
  <img src=".." class="card-img-top" alt="...">
  <div class="card-body">
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
              </div>
            </div>
            <div class="col-md-6 ">
              <div class="row">
                <div class="card mb-3" style="max-width: 540px; height: 10rem;margin-left: 100px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="..." class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h3>Mas Demonios estan a la asecha, ayuda a LILITH a convatirlos</h3>
      </div>
    </div>
  </div>
                </div>
              </div>
              <div class="row">
                <div class="card mb-3" style="max-width: 540px; height: 10rem;  margin-left: 100px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="..." class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <p>hola</p>
      </div>
    </div>
  </div>
                </div>
              </div>
              <div class="row">
                <div class="card mb-3" style="max-width: 540px; height: 10rem;  margin-left: 100px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="..." class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <p>hola</p>
      </div>
    </div>
  </div>
  </div>
              </div>
            </div>
          </div>
          </div>
        </main>
</body>

</template>

<style scoped>
@import url('../assets/main.css');

/* fondo completo */
body{
    background: url(../assets/IMG/degradado2.jpg);
    background-size: cover; /* Para que la imagen cubra todo el fondo */
    background-attachment: fixed;
}

/* primera seccion */
.scroll-text{
  font-size: 16px; /* Tamaño de fuente normal */
  transition: font-size 0.3s; /* Transición suave para el cambio de tamaño de fuente */
}
.container:hover .scroll-text {
  font-size: 100px; /* Tamaño de fuente más grande cuando el mouse está sobre el contenedor */
}

/* segunda seccion */
.gradient{
    background-image: url(../assets/IMG/roto.jpg);
    opacity: 0.60; 
    min-height: 200px;
    position: relative;
    font-family:BLOODY;
    color: white;
    background-size: cover; /* Para que la imagen cubra todo el fondo */
    
}

#introduccion{
    font-family:Bonechiller Free;
    font-size: 25px;
    text-align: center;
    padding-left: 40px;
}
#titulo{
  font-family:Bonechiller Free;
    font-size: 70px;
    text-align: center;
    padding-left: 30px;
}
#datos{
  text-align: center;
    padding-left: 30px;
}


    /* TERCERA SECCION */

    /* fondo */
    .tercerasec{
    background-image: url(../assets/IMG/aa.jpg);
    /* opacity: 0.60;  */
    min-height: 200px;
    position: relative;
    font-family:Bonechiller Free;
    color: white;
    background-size: cover; /* Para que la imagen cubra todo el fondo */
    }
    /* imagen1 */
    .juego1{
        margin-top: 10%;
        width: 500px;
        height: 200px;
    }
    /* titulo de carcateristicas */
    .Titulo3{
        font-family:Bonechiller Free;
        font-size: 300%;
    }
    .contexto{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    #tiles{
      color: black;
      font-size: 2rem;
    }
    #text{
      text-align: center;
    }
    /* CUARTA SECCION */

    .personas{
      background-image: url(../assets/IMG/personaje.jpeg);
    /* opacity: 0.60;  */
    min-height: 200px;
    position: relative;
    font-family:Bonechiller Free;
    color: white;
    background-size: cover; /* Para que la imagen cubra todo el fondo */
    }

.card{
  margin-left: 40%;
  background: none;
  margin-top: 5%;
}

.contexto{
    font-family:Bonechiller Free;
    color: black;
}

#pesas{
  width: 300px; /* Define el ancho deseado */
  height:380px; /* Define la altura deseada */

}
#lilith{
  width: 300px; /* Define el ancho deseado */
  height:380px; /* Define la altura deseada */
}
#flaca{
  width: 300px; /* Define el ancho deseado */
  height:380px; /* Define la altura deseada */
}
#enemigos{
  margin-left: 5%;
}

/* QUINTA SECCION */
.new{
  background-image: url(../assets/IMG/door.jpeg);
    /* opacity: 0.1;  */
    min-height: 200px;
    position: relative;
    font-family:BLOODY;
    color: white;
    background-size: cover; /* Para que la imagen cubra todo el fondo */
    
}
.newdata{
  align-content: center;
}
.card-body{
  background-color: rgba(255, 255, 255, 0.5); /* Establece el color de fondo con transparencia */
}
#newprox{
  margin-left: 40px;
}

</style>



