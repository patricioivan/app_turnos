<template>
<div>
      <q-item 
      class="q-my-sm" 
       
       >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            <span v-if="jornada.dia == 'Monday'">Lu</span>
            <span v-if="jornada.dia == 'Tuesday'">Ma</span>
            <span v-if="jornada.dia == 'Wednesday'">Mi</span>
            <span v-if="jornada.dia == 'Thursday'">Ju</span>
            <span v-if="jornada.dia == 'Friday'">Vi</span>
            <span v-if="jornada.dia == 'Saturday'">Sa</span>
            <span v-if="jornada.dia == 'Sunday'">Do</span>
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>
              
            <span v-if="jornada.dia == 'Monday'">Lunes</span>
            <span v-if="jornada.dia == 'Tuesday'">Martes</span>
            <span v-if="jornada.dia == 'Wednesday'">Miercoles</span>
            <span v-if="jornada.dia == 'Thursday'">Jueves</span>
            <span v-if="jornada.dia == 'Friday'">Viernes</span>
            <span v-if="jornada.dia == 'Saturday'">Sabado</span>
            <span v-if="jornada.dia == 'Sunday'">Domingo</span>
            </q-item-label>
          <q-item-label caption lines="1">Inicio: {{ jornada.inicio }} - Fin : {{jornada.fin}}</q-item-label>
           <q-item-label caption lines="1">Capacidad: {{ jornada.capacidadTurno }}</q-item-label>
           <q-item-label caption >Duracion de Turnos : 
               
                <span v-if="jornada.duracionTurno[1] != 0">{{jornada.duracionTurno}} Hora(s)</span>
                <span v-else>{{jornada.duracionTurno}} Minutos</span>
            
            </q-item-label>

        </q-item-section>

        <q-item-section side>
          <q-btn 
          @click="confirm = true" 
          clickable 
          flat
          name="delete"
          icon="delete"
          color="red" />

        </q-item-section>
      </q-item>

        <q-dialog v-model="confirm">
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">¿Estas seguro que quieres eliminar esta jornada laboral? Eliminarás todos los turnos relacionados a esta jornada..</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Eliminar" @click="deleteJornada(jornada._id)"  color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
</div>

</template>

<script>
import axios from 'axios'
import {mapState, mapGetters, mapActions} from 'vuex'
export default {
    props: ['jornada','id'],
    data () {
    return {
        confirm: false,
    }
   
  },
 methods: {
          ...mapActions({
      loadJornadas: 'loadJornadas',
      loadHorarios: 'loadHorarios',
    }),
       async deleteJornada(id) {
        try {
          await axios
            .delete('http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/negocios/'+this.$route.params.id+'/jornadas/'+id)
              this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: "Jornada eliminada correctamente"
            })
            this.loadJornadas(this.$route.params.id)
            this.loadHorarios(this.$route.params.id)
        } catch (error) {
            console.log(error)
            this.$q.notify({
              color: 'red-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: error.response
            })
        }

      },
 }
}
</script>

<style lang="sass">
.my-menu-link
  color: white
  background: #F2C037
</style>