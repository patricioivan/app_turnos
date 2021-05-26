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
              <q-icon color="purple" name="store" />
            </q-item-section>
  
            <q-item-section>
              <q-item-label>Rubros</q-item-label>
              <q-item-label caption
               v-for="(rubro,componentKey) in negocio.rubros"
               :key="componentKey"
              >
              {{rubro.nombre}}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        

          <div class="row q-pa-sm">
            <div class="col-12 col-md-4 col-md">
              <q-btn 
              flat
              :to="{ name: 'negocio.agregar_horario', params: { id: negocio._id }}" 
              round color="secondary" 
              icon="add">
              Agregar Jornada Laboral
              </q-btn>
            </div>
            <div class="col-12 col-md-4">
              <q-btn 
                flat
                :to="{ name: 'negocio.agregar_fecha_no_laboral', params: { id: negocio._id }}" 
                round color="secondary" 
                icon="add">
                Agregar Fecha no laboral          
                </q-btn>
            </div>
            <div class="col-12 col-md-4">
              <q-btn 
                flat
                :to="{ name: 'negocio.edit', params: { id: negocio._id }}" 
                round color="secondary" 
                icon="create">
                Editar Negocio        
                </q-btn>
            </div>
          </div>

      </q-card>
    </div>

    <q-list class="col" bordered>
      <div class="col q-pa-md" >
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Jornadas Laborales</q-toolbar-title>
    </q-toolbar>
     <jornada
      v-for="(jornada,componentKeygf) in jornadas"
      :key="componentKeygf"
      :jornada="jornada"
      
      >
      
      </jornada>
      
      </div>
    </q-list>

     <q-list class="col" bordered>
      <div class="col q-pa-md" >
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Fechas No Laborales</q-toolbar-title>
    </q-toolbar>
     <fechas-no-laborales
      v-for="(fecha,componentKeygf) in feriados"
      :key="componentKeygf"
      :fecha="fecha"
      
      >
      
      </fechas-no-laborales>
      
      </div>
    </q-list>
    

    <!-- <q-list class="col" bordered>
      <div class="col q-pa-md" >
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Turnos</q-toolbar-title>
    </q-toolbar>
     <horario
      v-for="(horario,componentKey) in horarios"
      :key="componentKey"
      :horario="horario"
      >

      </horario>
      </div>
    </q-list> -->
   
    
  </div>
</q-page>
</template>

<script>
import Horario from 'src/components/Horarios/Horario.vue'
import {mapState, mapGetters, mapActions} from 'vuex'
    //  :to="{ name: 'negocio.agregar_horario', params: { id: negocio._id }}" 
export default {
  name: 'ShowNegocio',
  data () {
    return {
      componentKey: 0,
      componentKeygf: 0,
      id: ''
    }
  },
components: {
    'horario' : require('components/Horarios/Horario.vue').default,
    'jornada' : require('components/Jornadas/Jornada.vue').default,
    'fechas-no-laborales' : require('components/Jornadas/FechaNoLaborable.vue').default
  },

   computed: {

     ...mapState({
      negocio: state => state.negocio,
      horarios: state => state.horarios,
      jornadas: state => state.jornadas,
      feriados: state => state.feriados
    }),
    ...mapGetters(['negocio','horarios','jornadas','feriados']),
    
    },
  methods: {
        ...mapActions({
      loadNegocio: 'loadNegocio',
      loadHorarios: 'loadHorarios',
      loadJornadas: 'loadJornadas',
      loadFeriados: 'loadFeriados',
    }),
  },
  mounted() {
      this.loadNegocio(this.$route.params.id)
      this.loadHorarios(this.$route.params.id)
      this.loadJornadas(this.$route.params.id)
      this.loadFeriados(this.$route.params.id)
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

