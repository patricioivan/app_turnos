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
            <q-item-section>Agregar Dia No Laboral</q-item-section>
          </q-item>
          </q-list>
      <q-card-section>
        <q-form
          @submit="submitForm"
          ref="NegocioForm"
          class="q-gutter-lg "
          >
            <div class="row">
                <div class="col-12">
                    <div class="q-pb-sm">
                    <q-badge color="teal">
                        Fecha Seleccionada: {{ fecha }}
                    </q-badge>
                    </div>

                    <q-date 
                    v-model="fecha" 
                    :options="optionsFn"
                    :locale="myLocale" 
                     lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Por favor seleccione una fecha']"
                    
                    />
                </div>

            </div>

            <div class="" >
                <label for="motivo">Motivo de Fecha No Laboral</label>
                <q-input
                 lazy-rules
                :rules="[ val => val && val.length > 0 || 'Por favor escriba el motivo ']"
                class="q-py-sm"
                id="motivo"
                v-model="motivo"
                filled
                autogrow
                />
            </div>
            <q-btn label="Agregar" type="submit" color="primary"/>
            <!-- <q-btn label="Limpiar" type="reset" color="primary" flat class="q-ml-sm" /> -->
       
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
        motivo:'',
        fecha: this.getCurrentDate(),
        myLocale: {
        /* starting with Sunday */
        days: 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split('_'),
        daysShort: 'Dom_Lun_Mar_Mié_Jue_Vie_Sáb'.split('_'),
        months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
        monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split('_'),
        firstDayOfWeek: 1
      }
    }
  },
    methods: {
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
      
        optionsFn (date) {
          return date >= this.getCurrentDate()
        },

      async submitForm() {
          if(!this.fecha) {
              this.$q.notify({
              color: 'red-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: "Seleccione una fecha"
            })
            return;
          }
        try {
          await axios
            .post('http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/negocios/'+this.$route.params.id+'/dias-no-laborales', 
            { 
                fecha: this.fecha,
                motivo:this.motivo,

            })
              this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: "Fecha cargada correctamente"
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

