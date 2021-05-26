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
    <q-list class="col">
      <div class="col q-pa-md" >
    <q-toolbar class="bg-yellow-10 text-white shadow-2">
      <q-toolbar-title>Turnos</q-toolbar-title>
    </q-toolbar>

    <q-item>

    <div class="row">
          <div class="col-12 q-pa-md">
            <q-date
              @input="mostrarLista()"
              :locale="myLocale"
              v-model="fecha"
              :options="optionsFn"
              :events="events"
              event-color="orange"
            />
          </div>
    </div>
    </q-item>
    
    <div v-if="fecha && !events.includes(fecha)" >
      
     <!-- <q-item 
      v-model="horariosLista"
      v-for="(horario,componentKey) in horarios"
      :key="componentKey"
      class="q-my-sm" 
      clickable 
      v-ripple 
      @click="card = true; horarioSeleccionado = horario;"> -->
      <q-table
        :data="Object.values(horarios)"
        :columns="columns"
        no-data-label="No hay horarios disponibles para esa fecha."
        row-key="_id"
        @row-click="abrirModal"
        
      />
        <!-- <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            <span v-if="horario.dia == 'Monday'">Lu</span>
            <span v-if="horario.dia == 'Tuesday'">Ma</span>
            <span v-if="horario.dia == 'Wednesday'">Mi</span>
            <span v-if="horario.dia == 'Thursday'">Ju</span>
            <span v-if="horario.dia == 'Friday'">Vi</span>
            <span v-if="horario.dia == 'Saturday'">Sa</span>
            <span v-if="horario.dia == 'Sunday'">Do</span>
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>
            <span v-if="horario.dia == 'Monday'">Lunes</span>
            <span v-if="horario.dia == 'Tuesday'">Martes</span>
            <span v-if="horario.dia == 'Wednesday'">Miercoles</span>
            <span v-if="horario.dia == 'Thursday'">Jueves</span>
            <span v-if="horario.dia == 'Friday'">Viernes</span>
            <span v-if="horario.dia == 'Saturday'">Sabado</span>
            <span v-if="horario.dia == 'Sunday'">Domingo</span>
            </q-item-label>
          <q-item-label caption >Inicio: {{ horario.inicio }} - Fin : {{horario.fin}}</q-item-label>
          <q-item-label caption >Disponibilidad: <span v-if="horario.completo">Sin lugar</span>
           <span v-else>Lugares disponibles</span>
          </q-item-label>
           <q-item-label caption >Capacidad disponible : {{horario.capacidadDisponible}}</q-item-label>
        </q-item-section>

        

        <q-item-section side>
          <q-icon name="alarm" color="green" />
        </q-item-section>
      </q-item> -->
      </div>
      <div v-else>
          <div v-if="events.includes(fecha)">
            <q-table
          :columns="columns"
          no-data-label="El negocio no abre este dia"
          />
          </div>
          <div v-else>
          <q-table
          :columns="columns"
          no-data-label="Seleccione una fecha por favor"
          />

          </div>
      </div>
      </div>
    </q-list>

     <q-separator/>
             <!-- COMIENZO DE MODAAL -->
     <q-dialog v-model="card">
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
              <q-icon color="secondary" name="today" />
            </q-item-section>
  
            <q-item-section>
               
              <q-item-label>Fecha</q-item-label>
              <q-item-label caption v-if="horarioSeleccionado">{{fecha}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <q-list class="q-pa-sm">
          <q-item>
            <q-item-section avatar>
              <q-icon color="warning" name="calendar_view_day" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Dia</q-item-label>
              <q-item-label caption>
               <span>{{horarioSeleccionado.diaTraducido}}</span>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <q-list class="q-pa-sm">
          <q-item>
            <q-item-section avatar>
              <q-icon color="purple" name="alarm" />
            </q-item-section>
  
            <q-item-section>
               
              <q-item-label>Horario Inicio - Horario Fin</q-item-label>
              <q-item-label caption v-if="horarioSeleccionado">De {{ horarioSeleccionado.inicio }} a : {{horarioSeleccionado.fin}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <q-list class="q-pa-sm">
          <q-item>
            <q-item-section avatar>
              <q-icon color="deep-orange" name="reduce_capacity" />
            </q-item-section>
  
            <q-item-section>
              <q-item-label>Disponibilidad</q-item-label>
              <q-item-label caption>{{ horarioSeleccionado.estado }} ({{ horarioSeleccionado.capacidadDisponible }} personas)</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        
         <q-list class="q-pa-sm">
          <q-item>
            <q-item-section avatar>
              <q-icon color="info" name="supervisor_account" />
            </q-item-section>
  
            <q-item-section>
                <q-input 
                v-mask="'#'"
                color="purple-12" 
                v-model="cantidadPersonas" 
                label="Nº Personas">

                  
                 <template v-slot:prepend>
                   <q-icon name="event" />
                  </template>
               </q-input>
            </q-item-section>
          </q-item>
        </q-list>
          <q-card-actions align="right">
          <q-btn @click="reservarTurno()" v-close-popup flat color="primary" label="Reservar Turno"  round icon="event" />
          <q-btn round color="primary" icon="close" @click="card = false" />
        </q-card-actions>
      </q-card>
   
    </q-dialog>
   
    <q-list class="col" >
      <div class="col q-pa-md" >
    <q-toolbar class="bg-yellow-10 text-white shadow-2">
      <q-toolbar-title>Comentarios</q-toolbar-title>
     
    </q-toolbar>

      <div v-if="calificaciones.length == 0" >
          <q-card>
           <q-card-section>
          <q-banner inline-actions outline class="">
            No hay calificaciones para este negocio.
            <q-btn 
              flat 
              style="color:#1b578c;" 
              label="Deja un comentario" 
              clickable 
              v-ripple 
              @click="card_rating = true;" 
              />
        </q-banner>
        </q-card-section>
        </q-card>
        </div>
        <div v-else class="q-pa-md">
           <q-btn 
       flat 
       style="color:#1b578c;" 
       label="Añadir un comentario" 
       clickable 
       v-ripple 
       @click="card_rating = true;" 
       />
        </div>
     <comentarios
       v-for="(calificacion,componentKey) in calificaciones"
      :key="componentKey"
      :calificacion="calificacion" 
     >
     </comentarios>
     
      </div>
    </q-list>

      <!-- MODAL DIALOG DE RATING -->
    <q-dialog v-model="card_rating">
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
        <q-separator/>
        <q-form @submit="onSubmit(negocio._id)" >
          <q-card-section class="q-pt-2">
            
              <q-rating
                required
                :rules="[ val => val && val > 0 || 'Por favor elija una puntuacion']"
                name="quality"
                v-model="puntuacion"
                max="5"
                size="2.5em"
                color="yellow"
                icon="star_border"
                icon-selected="star"
                no-dimming
                />
              <q-input class="q-pt-md" autogrow label="Comentario" dense v-model="comentario" autofocus @keyup.enter="prompt = false" />
              
            
            
          </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Añadir comentario" type="submit" icon="add_comment" v-close-popup />
          <q-btn round color="primary"  flat label="Cancel" v-close-popup />
        </q-card-actions>
        </q-form>
      </q-card>
   
    </q-dialog>
   
    
  </div>
</q-page>
</template>

<script>
import * as axios from 'axios'

import Vue from 'vue'
import {mapState, mapGetters, mapActions} from 'vuex'
import VueMask from 'v-mask'
Vue.use(VueMask); 
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

      cantidadPersonas: 1,
      fecha: this.getCurrentDate(),
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
      feriados: state => state.feriados
    }),
    ...mapGetters(['negocio','calificaciones','feriados','horarios']),
    
    },
  
        components: {
    'comentarios' : require('components/Comentario.vue').default,
  },
  methods: {
        ...mapActions({
      loadNegocio: 'loadNegocio',
      loadCalificaciones: 'loadCalificaciones',
      loadFeriados: 'loadFeriados',
      loadHorarios: 'loadHorarios'
    }),
     optionsFn (date) {
      return date >= this.getCurrentDate()
    },

    abrirModal(evt,horario) {
      this.card = true;
      this.horarioSeleccionado = horario;
    },
 
    mostrarLista() {
      if(this.fecha) {

        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const d = new Date(this.fecha);
      const dayName = days[d.getDay()];
      this.loadHorarios({
        id : this.$route.params.id,
                    fecha : this.fecha,
                    dia : dayName
                  });
      this.horariosLista = true;
        }
    },

    getCurrentDate() {
        let date = new Date()

        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        if(month < 10)
        {
            return `${year}/0${month}/${day}`
        } 
        else 
        {
            return `${year}/${month}/${day}`
        }
      },
    async reservarTurno() 
    {
      if(this.cantidadPersonas == 0)
      {
         this.$q.notify({
              color: 'red-4',
              textColor: 'white',
              icon: 'warning',
              message: "Elije una cantidad de personas"
            })
            return;
      }
      try {
        await axios
            .post('http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/negocios/'+this.$route.params.id+'/horarios/'+this.horarioSeleccionado._id+'/turnos', 
            {
              fecha: this.fecha,
                  capacidad: this.cantidadPersonas
            })
              this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: "Se reservo el turno seleccionado"
            })
       
        } catch (error) {
            this.$q.notify({
              color: 'red-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: error.response.data.mensaje
            })
        }

      
    },
    async onSubmit(id) {
      console.log("comentario:",this.comentario)
        try {
          await axios
            .post('http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/negocios/'+id+'/rating', 
            { 
                rating: this.puntuacion,
                comentario: this.comentario,
            })
            
              this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: "Comentario agregado correctamente"})
              this.loadNegocio(this.$route.params.id)
              this.loadCalificaciones(this.$route.params.id)
        } catch (error) {
            this.$q.notify({
              color: 'red-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: error.response.data.mensaje
            })
        }

      },
  },

  async mounted() {
      this.loadNegocio(this.$route.params.id)
      this.loadCalificaciones(this.$route.params.id)
      await this.loadFeriados(this.$route.params.id);
       if (this.feriados.data.dias.length > 0) {
         this.feriados.data.dias.forEach((dia) => {
              this.events.push(dia.fecha);
        });
      } 
      this.mostrarLista();
      this.horariosLista = false;

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

