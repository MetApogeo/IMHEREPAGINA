<template>
  <body>
    <div>a</div>
    <div style="margin-top: 60px;">
      <div class="container-fluid gradient">
        <div class="container ">
          <div class="row">
            <!-- GRAFICA 1 -->
            <div class="col-md-6">
              <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                  <h3>Sexo de los Usuarios</h3></div>
                <div class="col-md-3"></div>
              </div>
              <div class="row">
                <div id="chart1"></div>
              </div>
              
            </div>
            <!--GRAFICA 2-->
            <div class="col-md-6">
              <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                  <h3>Edades de los Usuarios</h3></div>
                <div class="col-md-3"></div>
              </div>
              <div class="row">
                <div id="chart2"></div>
              </div>
              
            </div>
          </div>
          <div class="row">
            <!-- GRAFICA 3 -->
            <div class="col-md-6">
              <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                  <h3>Inventario Productos</h3></div>
                <div class="col-md-3"></div>
              </div>
              <div class="row">
                <div id="chart3"></div>
              </div>
              
            </div>
            <!--GRAFICA 4-->
            <div class="col-md-6">
              <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-7">
                  <h3>Rango Precios Productos</h3></div>
                <div class="col-md-2"></div>
              </div>
              <div class="row">
                <div id="chart4"></div>
              </div>
              
            </div>
          </div>
          <div class="row">
            <!-- GRAFICA 5 -->
            <div class="col-md-6">
              <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-6"><h3>Estado de Compra</h3></div>
                <div class="col-md-3"></div>
              </div>
              <div class="row">
                <div id="chart5"></div>
              </div>
              
            </div>
            <!--GRAFICA 6-->
            <div class="col-md-6">
              <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-9">
                  <h3>Ganancias por mes en los últimos doce meses</h3></div>
                <div class="col-md-1"></div>
              </div>
              <div class="row">
                <div id="chart6"></div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
      
      
    </div>
  </body>
    
  
    
  
    
    
</template>
  
<script setup>
import ApexCharts from 'apexcharts';
import axios from 'axios';

const blanco = ['#dedede', '#838383', '#b8b8b8'];

const options1 = {
  chart: {
    height: 350,
    type: 'donut',
  },
  colors: blanco,
  series: [],
  labels: [],
  theme: {
    palette: blanco
  },
  legend: {
    labels:{
      colors: blanco
    }
    
  }
};

const options2 = {
  chart: {
    height: 350,
    type: 'bar',
  },
  series: [],
  colors: blanco,
  plotOptions: {
    bar: {
      columnWidth: '45%',
      distributed: true,
    }
  },
  dataLabels: {
    enabled: false
  },
  legend: {
    show: false
  },
  xaxis: {
    categories: [],
    labels: {
      style: {
        colors: blanco,
        fontSize: '12px'
      }
    }
  },
  yaxis: {
    categories: [],
    labels: {
      style: {
        colors: blanco,
        fontSize: '12px'
      },
    }
  },
  tooltip: {
    custom: function({ series, seriesIndex, dataPointIndex, w }) {
      const usuarios = series[0][dataPointIndex];
      const categoria = w.globals.labels[dataPointIndex];
      return `<div class=''>${categoria}:<br></div> <div>Cantidad: ${usuarios}</div>`;
    }
  }
};

const options3 = {
  chart: {
    height: 350,
    type: 'bar',
  },
  series: [],
  colors: blanco,
  theme: {
    palette: blanco
  },
  plotOptions: {
    bar: {
      columnWidth: '45%',
      distributed: true,
      horizontal: true,
    }
  },
  
  legend: {
    show: false
  },
  xaxis: {
    categories: [],
    labels: {
      style: {
        colors: blanco,
        fontSize: '12px'
      },
    }
  },
  tooltip: {
    custom: function({ series, seriesIndex, dataPointIndex, w }) {
      const inventario = series[0][dataPointIndex];
      const productos = w.globals.labels[dataPointIndex];
      return `<div class=''>${productos}:<br></div> <div>Cantidad: ${inventario}</div>`;
    }
  },
  yaxis: {
    categories: [],
    labels: {
      style: {
        colors: blanco,
        fontSize: '12px'
      },
    }
  },
};

const options4 = {
  chart: {
    type: 'polarArea',
  },
  colors: blanco,
  stroke: {
    colors: ['#fff']
  },
  fill: {
    opacity: 0.8
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        position: 'bottom'
      }
    }
  }],
  legend: {
    labels:{
      colors: blanco
    }
    
  }
};

const options5 = {
  chart: {
    type: 'pie',
  },
  labels: [],
  colors: blanco,
  legend: {
    labels:{
      colors: blanco
    }
    
  }
};

const options6 = {
  chart: {
    height: 350,
    type: 'line',
  },
  series: [],
  colors: blanco,
  xaxis: {
    type: 'datetime',
    labels: {
      format: 'MMM yyyy', // Formato del eje x para mostrar solo el mes y el año
      colors: blanco
    }
  },
  tooltip: {
    custom: function({ series, seriesIndex, dataPointIndex, w }) {
      const ganancias = series[0][dataPointIndex];
      return `<div>Ganancias: $${ganancias}</div>`;
      
    }
  }
  
};


axios.get('http://127.0.0.1:8000/api/usuario')
  .then(response => {
    const usuarios = response.data;
    const sexos = {};
    const edades = usuarios.map(usuario => {
      if (!usuario.fecha) {
        console.error('Fecha de nacimiento no proporcionada para el usuario:', usuario);
        return 0; // O cualquier otro valor predeterminado
      }
      return calcularEdad(usuario.fecha);
    });

    // Contar cuántos usuarios hay de cada sexo
    usuarios.forEach(usuario => {
      if (usuario.sexo in sexos) {
        sexos[usuario.sexo]++;
      } else {
        sexos[usuario.sexo] = 1;
      }
    });

    // Procesar los datos para el primer gráfico
    options1.series = Object.values(sexos);
    options1.labels = Object.keys(sexos);

    // Renderizar el primer gráfico
    const chart1 = new ApexCharts(document.querySelector("#chart1"), options1);
    chart1.render();

    // Contar cuántos usuarios hay en cada grupo de edad
    const counts = {};
    edades.forEach(edad => {
      if (edad in counts) {
        counts[edad]++;
      } else {
        counts[edad] = 1;
      }
    });

    // Procesar los datos para el segundo gráfico
    const series2Data = Object.values(counts);
    const categories = Object.keys(counts).map(edad => `${edad} años`);
    
    // Configurar el segundo gráfico
    options2.series = [{ data: series2Data }];
    options2.xaxis.categories = categories;

    // Renderizar el segundo gráfico
    const chart2 = new ApexCharts(document.querySelector("#chart2"), options2);
    chart2.render();
  })
  .catch(error => {
    console.error('Error al obtener los datos:', error);
  });

  function calcularEdad(fechaNacimiento) {
  if (!fechaNacimiento) {
    console.error('Fecha de nacimiento no proporcionada');
    return 0; // O cualquier otro valor predeterminado
  }
  
  const hoy = new Date();
  const fechaNac = new Date(fechaNacimiento);
  
  if (isNaN(fechaNac.getTime())) {
    console.error('Fecha de nacimiento no válida:', fechaNacimiento);
    return 0; // O cualquier otro valor predeterminado
  }
  let edad = hoy.getFullYear() - fechaNac.getFullYear();
  const mes = hoy.getMonth() - fechaNac.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
    edad--;
  }
  
  return edad;
  }

  axios.get('http://127.0.0.1:8000/api/producto')
  .then(response => {
    const productos = response.data;
    const nombresProductos = productos.map(producto => producto.nombre);
    const inventarios = productos.map(producto => producto.inventario);

    options3.series = [{ data: inventarios }];
    options3.xaxis.categories = nombresProductos;

    const chart3 = new ApexCharts(document.querySelector("#chart3"), options3);
    chart3.render();

    const precios = productos.map(producto => {
      if (producto.precio <= 50) {
        return 'Barato';
      } else if (producto.precio <= 100) {
        return 'Medio';
      } else {
        return 'Alto';
      }
    });

    const rangos = {};
    precios.forEach(rango => {
      if (rango in rangos) {
        rangos[rango]++;
      } else {
        rangos[rango] = 1;
      }
    });

    options4.series = Object.values(rangos);
    options4.labels = Object.keys(rangos);

    const chart4 = new ApexCharts(document.querySelector("#chart4"), options4);
    chart4.render();
  })
  .catch(error => {
    console.error('Error al obtener los datos de inventario de productos:', error);
  });

  axios.get('http://127.0.0.1:8000/api/carritocompras')
  .then(response => {
    const carritos = response.data;
    const estados = {};
    const hoy = new Date();
    const unAnioAtras = new Date();
    
    unAnioAtras.setFullYear(hoy.getFullYear() - 1); // Calcula la fecha hace un año

    const gananciasPorMes = {};
    
    carritos.forEach(carrito => {
      if (carrito.estado in estados) {
        estados[carrito.estado]++;
      } else {
        estados[carrito.estado] = 1;
      }
    });

    options5.series = Object.values(estados);
    options5.labels = Object.keys(estados);

    const chart5 = new ApexCharts(document.querySelector("#chart5"), options5);
    chart5.render();

    // Inicializa el objeto gananciasPorMes con cero ganancias para cada mes
    for (let i = 0; i < 12; i++) {
      const fecha = new Date(unAnioAtras);
      fecha.setMonth(fecha.getMonth() + i);
      gananciasPorMes[fecha.toISOString().slice(0, 7)] = 0; // Utiliza el formato AAAA-MM para las claves
    }

    // Suma las ganancias de cada carrito de compras al mes correspondiente
    carritos.forEach(carrito => {
      const fecha = new Date(carrito.created_at);
      const clave = fecha.toISOString().slice(0, 7); // Obtén el mes y el año en formato AAAA-MM
      gananciasPorMes[clave] += carrito.total;
    });

    // Prepara los datos para el gráfico
    const seriesData = Object.entries(gananciasPorMes).map(([mes, ganancias]) => {
      return {
        x: new Date(mes),
        y: ganancias
      };
    });

    options6.series = [{ data: seriesData }];

    // Crea y renderiza el gráfico
    const chart6 = new ApexCharts(document.querySelector("#chart6"), options6);
    chart6.render();
  })
  .catch(error => {
    console.error('Error al obtener los datos de carritos de compras:', error);
  });



</script>

<style>
  /* Estilos para el tooltip en modo diurno y nocturno */
.apexcharts-tooltip {
  background-color: rgba(255, 255, 255, 0.8) !important; /* Fondo blanco con transparencia */
  color: #333 !important; /* Texto gris oscuro */
  border: none !important; /* Sin borde */
  border-radius: 4px !important; /* Bordes redondeados */
  padding: 10px !important; /* Espaciado interior */
  font-family: Arial, sans-serif !important; /* Fuente */
  font-size: 12px !important; /* Tamaño del texto */
}

/* Estilos para el título del tooltip */
.apexcharts-tooltip-title {
  font-weight: bold !important; /* Texto en negrita */
  margin-bottom: 5px !important; /* Espaciado inferior */
}

/* Estilos para el valor del tooltip */
.apexcharts-tooltip-value {
  margin-left: 5px !important; /* Espaciado izquierdo */
}

.container-fluid.gradient{
  background: linear-gradient(to right, #282828, #0e0d0cc6);
    background-size: cover;
    min-height: 500px;
    position: relative;
    font-family:Bonechiller Free;
    color: #dedede;
}
</style>