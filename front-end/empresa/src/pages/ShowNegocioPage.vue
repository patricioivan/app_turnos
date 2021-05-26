<template>
<q-page>
  <div id="q-app">
   
      
    <div class="q-pa-md">
      <q-card class="my-card">
        <q-img :src="negocio.imagen">
          
          <div class="absolute-bottom">
            <div class="text-h6 q-pa-sm">{{negocio.nombre}}</div>
          </div>
        </q-img>
        <q-list class="q-pa-sm">
          <q-item>
            <q-item-section avatar>
              <q-icon color="primary" name="location_on" />
            </q-item-section>
  
            <q-item-section>
              <q-item-label>Direccion</q-item-label>
              <q-item-label v-if="negocio.direccion" caption>{{negocio.direccion.calle}} 
              {{negocio.direccion.numero}} {{negocio.direccion.provincia}}, {{negocio.direccion.localidad}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <q-list class="q-pa-sm">
          <q-item>
            <q-item-section avatar>
              <q-icon color="secondary" name="star" />
            </q-item-section>
  
            <q-item-section>
              <q-item-label>Puntuacion</q-item-label>
              <q-item-label caption> <q-rating disable size="16px" v-if="negocio.calificacion" :value="negocio.calificacion.promedio" color="secondary" /></q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <q-list class="q-pa-sm">
          <q-item>
            <q-item-section avatar>
              <q-icon color="yellow-10" name="store" />
            </q-item-section>
  
            <q-item-section>
              <q-item-label>Rubros</q-item-label>
              <q-item-label 
              caption 
               v-for="(rubro,componentKey) in negocio.rubros"
               :key="componentKey"
              >{{rubro.nombre}}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </div>
    
    <q-list class="col" bordered>
      <div class="col q-pa-md" >
    <q-toolbar class="bg-grey-10 text-white shadow-2 rounded-borders shadow-2" style=" width: 100%;">
      <q-toolbar-title>Jornadas Laborales</q-toolbar-title>
    </q-toolbar>
    
     <div v-if="jornadas.length == 0" >
        No hay fechas no laborales cargadas todavía
    </div>
    <div v-else>
     <jornada
      v-for="(jornada,componentKeygf) in jornadas"
      :key="componentKeygf"
      :jornada="jornada"
      >
      </jornada>
      
      </div>
      </div>
    </q-list>

    <q-list class="col" bordered>
      <div class="col q-pa-md" >
    <q-toolbar class="bg-grey-10 text-white shadow-2 rounded-borders shadow-2" style=" width: 100%;">
      <q-toolbar-title>Fechas No Laborales</q-toolbar-title>
    </q-toolbar>
    <div v-if="feriados.data">
     <div v-if=" feriados.data.dias.length == 0" >
        No hay fechas no laborales cargadas todavía
    </div>
    <div v-else>
     <feriado
      v-for="(feriado,componentKeygfe) in feriados.data.dias"
      :key="componentKeygfe"
      :feriado="feriado"
      >
      </feriado>
      
      </div>

    </div>
      </div>
    </q-list>

    <q-list class="col">
      <div class="col q-pa-md" >
    <q-toolbar class="bg-grey-10 text-white shadow-2 rounded-borders shadow-2" style=" width: 100%;">
      <q-toolbar-title>Turnos</q-toolbar-title>
    </q-toolbar>
         <div v-if="turnos_activos.length == 0" >
        No hay turnos activos
        </div>
        <div v-else>
        <turnos-activos
        v-for="(turno,componentKeygfee) in turnos_activos"
        :key="componentKeygfee"
        :turno="turno"
        >
        </turnos-activos>
        
        </div>
    </div>

   
    </q-list>

     <q-separator/>
   
   
    <q-list class="col" >
      <div class="col q-pa-md" >
    <q-toolbar class="bg-grey-10 text-white shadow-2 rounded-borders shadow-2" style=" width: 100%;">
      <q-toolbar-title>Comentarios</q-toolbar-title>
     
    </q-toolbar>

      <div v-if="calificaciones.length == 0" >
          <q-card>
           <q-card-section>
          <q-banner inline-actions outline class="">
            No hay calificaciones para este negocio.

        </q-banner>
        </q-card-section>
        </q-card>
        </div>
     <comentarios
       v-for="(calificacion,componentKey) in calificaciones"
      :key="componentKey"
      :calificacion="calificacion" 
     >
     </comentarios>
     
      </div>
    </q-list>

    
  </div>
</q-page>
</template>

<script>
import * as axios from 'axios'
import {mapState, mapGetters, mapActions} from 'vuex'
    //  :to="{ name: 'negocio.agregar_horario', params: { id: negocio._id }}" 
export default {
  name: 'ShowNegocio',
  data () {
    return {
       columns: [
        {
          
          name: 'dia',
          required: true,
          label: 'Dia',
          align: 'left',
          field: 'diaTraducido',
          sortable: true,
          classes: 'bg-grey-2 ellipsis',
          style: 'max-width: 100px',
          headerClasses: 'bg-primary text-white'
        },
        { name: 'inicio', align: 'center', label: 'Inicio', field: 'inicio', sortable: true },
        { name: 'fin', align: 'center', label: 'Fin', field: 'fin', sortable: true },
      ],
      horariosLista: false,
      horariosTraducidos: [],
      options: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
      cantidadPersonas: 1,
      events: [],
      myLocale: {
        /* starting with Sunday */
        days: 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split('_'),
        daysShort: 'Dom_Lun_Mar_Mié_Jue_Vie_Sáb'.split('_'),
        months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
        monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split('_'),
        firstDayOfWeek: 1
      },
      puntuacion: 1,
      comentario:'',
      horarioSeleccionado: {},
      componentKey: 0,

      id: '',
      card: false,
      card_rating: false,
    }
  },
   computed: {
     
     ...mapState({
      negocio: state => state.negocio,
      horarios: state => state.horarios,
      calificaciones: state => state.calificaciones,
      feriados: state => state.feriados,
      jornadas: state => state.jornadas,
      turnos_activos: state => state.turnos_activos

    }),
    ...mapGetters(['negocio','calificaciones','feriados','horarios', 'jornadas','turnos_activos']),
    
    },
  
        components: {
    'comentarios' : require('components/Comentario.vue').default,
    'jornada' : require('components/Jornadas/Jornada.vue').default,
    'feriado' : require('components/Jornadas/FechaNoLaborable.vue').default,
    'turnos-activos' : require('components/Turnos/TurnosActivos.vue').default
  },
  methods: {
        ...mapActions({
      loadNegocio: 'loadNegocio',
      loadCalificaciones: 'loadCalificaciones',
      loadFeriados: 'loadFeriados',
      loadJornadas: 'loadJornadas',
      loadTurnosActivos: 'loadTurnosActivos',
    }),

  },
  async mounted() {
      this.loadNegocio(this.$route.params.id)
      this.loadCalificaciones(this.$route.params.id)
      this.loadJornadas(this.$route.params.id)
      this.loadFeriados(this.$route.params.id)
      this.loadTurnosActivos(this.$route.params.id)

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

