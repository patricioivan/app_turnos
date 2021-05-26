<template>
<q-page>
      <div id="q-app">
    <div class="q-pa-md">
     <q-card class="my-card">
             <q-list class="bg-grey-10 text-white shadow-2 rounded-borders" style=" width: 100%;">
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <q-icon name="data_saver_off" color="white" />
                </q-avatar>
              </q-item-section>
              <q-item-section>Estadistica de Calificaciones Globales</q-item-section>
            </q-item>
            </q-list>
             <q-card-section >
                    <apexchart type="radialBar" height="390" :options="data_empresa.chartOptions" :series="data_empresa.series"></apexchart>
                    <div v-if="this.$q.platform.is.mobile" class="q-pa-sm">
                        <p style="color:#1ab7ea">Cantidad de Opiniones: {{data_empresa.series[0]}}</p>
                        <p style="color:#2ab84b">Cantidad de Puntos: {{data_empresa.series[1] }}</p>
                    </div>
            </q-card-section>

                <q-list class="bg-grey-10 text-white shadow-2 rounded-borders" style=" width: 100%;">
                    <q-item>
                        <q-item-section avatar>
                            <q-avatar>
                                <q-icon name="data_saver_off" color="white" />
                            </q-avatar>
                        </q-item-section>
                        <q-item-section>Promedio General de la Empresa</q-item-section>
                    </q-item>
                </q-list>
                        
            <q-card-section>
                <apexchart type="radialBar" height="350" :options="data_promedio.chartOptions" :series="data_promedio.series"></apexchart>
            </q-card-section>

            <q-list class="bg-grey-10 text-white shadow-2 rounded-borders" style=" width: 100%;">
                <q-item>
                <q-item-section avatar>
                    <q-avatar>
                    <q-icon name="data_saver_off" color="white" />
                    </q-avatar>

                </q-item-section>
                <q-item-section>Estadistica de Turnos Globales</q-item-section>
                </q-item>
            </q-list>
            <q-card-section >
                <div class="row justify-center">
                        <apexchart class="grafico justify-center " width="500"  type="donut" :options="options" :series="turnos_cantidad"></apexchart>
                 </div>
            </q-card-section>

            <q-list class="bg-grey-10 text-white shadow-2 rounded-borders" style=" width: 100%;">
                    <q-item>
                    <q-item-section avatar>
                        <q-avatar>
                        <q-icon name="data_saver_off" color="white" />
                        </q-avatar>
                    </q-item-section>
                    <q-item-section>Estadisticas de Calificaciones por Negocio</q-item-section>
                    </q-item>
            </q-list>

            <q-card-section >
            <div class="row">
            <div  class="col " v-if="this.sucursales_nombre.length > 0" id="chart">
                <apexchart type="bar" height="350" :options="data.chartOptions" :series="data.calificacion"></apexchart>
            </div>
            <div class="col-12" v-else>
                No hay estadisticas de negocios
            </div>

            </div>
            
            
            </q-card-section>
      <q-separator />
    </q-card>
    </div>
 
  </div>
   

</q-page>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
import Vue from 'vue'
import VueApexCharts from 'vue-apexcharts'

Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
export default {
  name: 'Estadisticas',
    data: function() {
    return {
      options: {
          labels: ['Activos', 'Expirados', 'Cancelados', 'Utilizados'],
           legend: {
              show: true,
              fontSize: '16px',
              position: 'bottom',
            },
          responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 280
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
      },
      turnos_cantidad: [],


      sucursales_promedio: [],
      sucursales_nombre: [],
    
       data: {
          
          calificacion: [{
            name: 'Calificacion:',
            data: []
          }],
          chartOptions: {
            chart: {
              height: 350,
              type: 'bar',
              toolbar: {
                show: false
              },
              events: {
                click: function(chart, w, e) {
                  // console.log(chart, w, e)
                }
              }
            },
            plotOptions: {
              bar: {
                borderRadius: 6,
                columnWidth: '20%',
                distributed: true,
              }
            },
            dataLabels: {
              enabled: false
            },
            legend: {
              show: true
            },
            xaxis: {
              categories: [],
              labels: {
                style: {
                  fontSize: '0px'
                }
              }
            }

            
          }
       },




      // ACA VA EL DATA DEL PRIMER GRAFICO
    //  data_empresa: {
    //       series: [],
    //       chartOptions: {
    //         chart: {
    //           height: 350,
    //           type: 'radialBar',
    //         },
    //         plotOptions: {
    //           radialBar: {
    //             dataLabels: {
    //               name: {
    //                 fontSize: '22px',
    //               },
    //               value: {
    //                 fontSize: '16px',
    //               },
    //               total: {
    //                 show: false,
    //                 label: 'Estadisticas de Empresa',
                    
    //               }
    //             }
    //           }
    //         },
    //         labels: ['Cantidad de Opiniones', 'Cantidad de Puntos', 'Promedio (0-5)'],
    //       },
          
          
    //     },
        data_empresa: {
          
           series: [],
          chartOptions: {
            chart: {
              height: 390,
              type: 'radialBar',
            },
            plotOptions: {
              radialBar: {
                offsetY: 0,
                startAngle: 0,
                endAngle: 270,
                hollow: {
                  margin: 5,
                  size: '30%',
                  background: 'transparent',
                  image: undefined,
                },
                dataLabels: {
                  name: {
                    show: false,
                  },
                  value: {
                    show: false,
                  }
                }
              }
            },
            colors: ['#1ab7ea', '#2ab84b'],
            labels: ['Cantidad de Opiniones', 'Cantidad de Puntos'],
            legend: {
              show: true,
              floating: true,
              fontSize: '16px',
              position: 'left',
              offsetX: 160,
              offsetY: 15,
              labels: {
                useSeriesColors: true,
              },
              markers: {
                size: 0
              },
              formatter: function(seriesName, opts) {
                return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
              },
              itemMargin: {
                vertical: 3
              }
            },
            responsive: [{
              breakpoint: 1154,
              options: {
                legend: {
                    show: false,
                    
                }
              }
            }]
          },
          
          
        },


        new_promedio_empresa: 0,

        // ACA VA EL COMPONNENTE DEL PROMEDIO
        data_promedio: {
          
          series: [],
          chartOptions: {
            chart: {
              height: 350,
              type: 'radialBar',
              toolbar: {
                show: false
              }
            },
            plotOptions: {
              radialBar: {
                startAngle: -135,
                endAngle: 225,
                 hollow: {
                  margin: 0,
                  size: '70%',
                  background: '#fff',
                  image: undefined,
                  imageOffsetX: 0,
                  imageOffsetY: 0,
                  position: 'front',
                  dropShadow: {
                    enabled: true,
                    top: 3,
                    left: 0,
                    blur: 4,
                    opacity: 0.24
                  }
                },
                track: {
                  background: '#fff',
                  strokeWidth: '67%',
                  margin: 0, // margin is in pixels
                  dropShadow: {
                    enabled: true,
                    top: -3,
                    left: 0,
                    blur: 4,
                    opacity: 0.35
                  }
                },
            
                dataLabels: {
                  show: true,
                  name: {
                    offsetY: -10,
                    show: true,
                    color: '#888',
                    fontSize: '17px'
                  },
                  value: {
                    formatter: function(val) {
                        const promedio = val * 5 / 100;
                      return parseFloat(val * promedio / 100).toFixed(2);
                    },
                    color: '#111',
                    fontSize: '36px',
                    show: true,
                  }
                }
              }
            },
            fill: {
              type: 'gradient',
              gradient: {
                shade: 'dark',
                type: 'horizontal',
                shadeIntensity: 0.5,
                gradientToColors: ['#ABE5A1'],
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0,100]
              }
            },
            stroke: {
              lineCap: 'round'
            },
            labels: ['Promedio'],
          },
          
          
        },
    }
},
   computed: {
     
     ...mapState({
      estadisticas: state => state.estadisticas,

    }),
    ...mapGetters(['estadisticas']),
    
    },
      methods: {
        ...mapActions({
      loadEstadisticas: 'loadEstadisticas',
    }),
    async obtenerCantidadTurnos() {
        const estadisticas = await this.loadEstadisticas();
        this.turnos_cantidad.push(estadisticas.cantidadTurnosActivos)
        this.turnos_cantidad.push(estadisticas.cantidadTurnosExpirados)
        this.turnos_cantidad.push(estadisticas.cantidadTurnosCancelados)
        this.turnos_cantidad.push(estadisticas.cantidadTurnosUsados)
        
        },

      async obtenerPromedioSucursales() {
        const estadisticas = await this.loadEstadisticas();
        for (const negocio of estadisticas.negocios) {
            this.sucursales_nombre.push(negocio.nombre);
            this.sucursales_promedio.push(parseFloat(negocio.calificacion.promedio).toFixed(2))
            this.data.chartOptions.xaxis.categories.push([negocio.nombre])
            this.data.calificacion[0].data.push(parseFloat(negocio.calificacion.promedio).toFixed(2))
             }
                console.log('sucursales nombre', this.sucursales_nombre);
                console.log('sucursales promedio', this.sucursales_promedio)
        },
        async obtenerPromedioEmpresa() {
        const estadisticas = await this.loadEstadisticas();
            this.data_empresa.series.push(estadisticas.empresaEstadisticas.calificacion.cantidadOpiniones)
            this.data_empresa.series.push(estadisticas.empresaEstadisticas.calificacion.cantidadPuntos)
            
            this.data_promedio.series.push(estadisticas.empresaEstadisticas.calificacion.promedio * 100 / 5);

        },

        async obtenerPromedio() {
        const estadisticas = await this.loadEstadisticas();
            this. new_promedio_empresa = estadisticas.empresaEstadisticas.calificacion.promedio;

        }   

  },
  mounted() {
      this.loadEstadisticas();
       this.obtenerCantidadTurnos();
       this.obtenerPromedioEmpresa()
        this.obtenerPromedioSucursales()
        this.obtenerPromedio();
  },

    async created() 
  {
      

    if (!this.$store.state.auth.status.loggedIn)
    {
      this.$router.push("/login").catch(error => {
        if (error.name != "NavigationDuplicated") {
          throw error;
        }
       });
    }
  }

    

}
</script>
