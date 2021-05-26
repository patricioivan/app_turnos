<template>
<q-page>
  <div id="q-app">
    <div class="q-pa-md">
        <q-card class="my-card">
          <q-list class="bg-grey-10 text-white shadow-2 rounded-borders" style=" width: 100%;">
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <q-icon name="alarm_add" color="white" />
              </q-avatar>
            </q-item-section>
            <q-item-section>Agregar Jornada Laboral</q-item-section>
          </q-item>
          </q-list>
      <q-card-section>
        <q-form
          @submit="submitForm"
          ref="NegocioForm"
          class="q-gutter-lg "
          >
        <q-select 
           v-model="horario.dia" 
           :options="options" 
            color="positive"
           :value="options"
           class="q-pa-sm"
           lazy-rules
           :rules="[val => val || 'Elija el dia']"
           label="Dia"
           option-label="dia" option-value="value"
           >
           <template v-slot:prepend>
              <q-icon name="list" color="primary" />
              </template>
           </q-select>

           <div class=" row">
            <q-input label="Horario de Inicio" class="q-pa-sm col-12 col-md-6" v-model="horario.inicio" mask="time" name="time" :rules="['time']">
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-time format24h v-model="horario.inicio">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

            <q-input label="Horario de Finalizacion" class="q-pa-sm col-12 col-md-6" v-model="horario.fin" mask="time" name="time" :rules="['time']">
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-time format24h v-model="horario.fin">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
           </div>
          <!-- <div class="q-pa-md fit row wrap justify-start items-start content-start">
            <div class="q-pa-md col-6">
                <p>Hora de Inicio</p>
                <q-time
                v-model="horario.inicio"
                format24h
                
                />
            </div>

            <div class="q-pa-md col-6">
                <p>Hora de Finalizacion</p>
                <q-time
                v-model="horario.fin"
                format24h
                
                />
            </div> -->
             
              <q-item class="">
             
                <q-item-section side>
                  <q-icon color="primary" class="q-px-sm" name="people_outline" /> 
                </q-item-section>
                <q-item-section>
                  <q-input
                    v-model.number="horario.capacidad"
                    type="number"
                    class="col"
                    lazy-rules=""
                    :rules="[val => val > 0 || 'La capacidad tiene que ser mayor que 0']"
                    label="Capacidad"
                    />
                </q-item-section>
              </q-item>

          <q-select 
           v-model="horario.duracion" 
           :options="duraciones" 
            color="positive"
           :value="duraciones"
           lazy-rules
           :rules="[val => val || 'Elija la duracion del turno']"
           class="q-pa-sm"
           label="Duracion de Turno"
           option-label="duracion" option-value="value"
           >
           <template v-slot:prepend>
              <q-icon name="list" color="primary" />
              </template>
           </q-select>

         

                
     
          <div>
            <q-btn label="Agregar" type="submit" color="primary"/>
            <!-- <q-btn label="Limpiar" type="reset" color="primary" flat class="q-ml-sm" /> -->
          </div>
        </q-form>
        
      </q-card-section>
    </q-card>
    </div>

  </div>
</q-page>
</template>

<script> 
import Vue from 'vue'
import axios from 'axios'


export default {
  name: 'AgregarHorario',
  data () {
    return {
      duraciones: [
        {
          duracion: '15 minutos',
          value: '00:15'
        },
         {
          duracion: '30 minutos',
          value: '00:30'
        },
         {
          duracion: '45 minutos',
          value: '00:45'
        },
         {
          duracion: '1 hora',
          value: '01:00'
        },
         {
          duracion: '1 hora y 15 minutos',
          value: '01:15'
        },
         {
          duracion: '1 hora y 30 minutos',
          value: '01:30'
        },
         {
          duracion: '1 hora y 45 minutos',
          value: '01:45'
        },
         {
          duracion: '2 horas',
          value: '02:00'
        },
      ],
      options: [
          {
              dia: 'Lunes',
              value: 'Monday'
          },
          {
              dia: 'Martes',
              value: 'Tuesday'
          },
          {
              dia: 'Miercoles',
              value: 'Wednesday'
          },
          {
              dia: 'Jueves',
              value: 'Thursday'
          },
          {
              dia: 'Viernes',
              value: 'Friday'
          },
          {
              dia: 'Sabado',
              value: 'Saturday'
          },
          {
              dia: 'Domingo',
              value: 'Sunday'
          },
          
      ],
      horario: {
        dia: '',
        inicio:'',
        fin:'',
        capacidad:'1',
        duracion:'',
      }
    }
  },
    methods: {


      async submitForm() {
        try {
          await axios
            .post('http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/negocios/'+this.$route.params.id+'/jornadas', 
            { 
                dia: this.horario.dia.value,
                inicio:this.horario.inicio,
                fin:this.horario.fin,
                capacidadTurno:this.horario.capacidad,
                duracionTurno: this.horario.duracion.value

            })
              this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: "Jornada agregada correctamente"
            })
              this.$router.push("/negocio/"+this.$route.params.id)
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

