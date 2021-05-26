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
      </q-item>

</div>

</template>

<script>

export default {
    props: ['jornada','id'],

}
</script>

<style lang="sass">
.my-menu-link
  color: white
  background: #F2C037
</style>