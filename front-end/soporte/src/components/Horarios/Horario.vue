<template>
    <!-- <q-item 
       v-ripple
       >
        <q-item-section>{{horario.dia}}</q-item-section>
        <q-item-section>Inicio: {{horario.inicio}} Fin: {{horario.fin}}</q-item-section>
        <q-item-section>{{horario.capacidad}} personas</q-item-section>
        <q-item-section avatar>
          <q-icon color="primary" name="view_list" />
        </q-item-section>
      </q-item> -->
       <!-- :active="link === 'inbox'"
        @click="link = 'inbox'" -->
      <!-- <q-item
        clickable
        v-ripple

        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="calendar_today" />
        </q-item-section>

        <q-item-section>
          <span v-if="horario.dia == 'Monday'">Lunes</span>
          <span v-if="horario.dia == 'Tuesday'">Martes</span>
          <span v-if="horario.dia == 'Wednesday'">Miercoles</span>
          <span v-if="horario.dia == 'Thursday'">Jueves</span>
          <span v-if="horario.dia == 'Friday'">Viernes</span>
          <span v-if="horario.dia == 'Saturday'">Sabado</span>
          <span v-if="horario.dia == 'Sunday'">Domingo</span>
        </q-item-section>
        <q-item-section>
         <span>Inicio: {{horario.inicio}}</span>
        </q-item-section>
        <q-item-section>
         <span>Fin: {{horario.fin}}</span>
         </q-item-section>
        <q-item-section>
          <span>Capacidad: {{horario.capacidad}}</span>
        </q-item-section>
      </q-item> -->


      <q-item class="q-my-sm" clickable v-ripple>
        <q-item-section avatar>
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
          <q-item-label caption lines="1">Inicio: {{ horario.inicio }} - Fin : {{horario.fin}}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="alarm" color="green" />
        </q-item-section>
      </q-item>


</template>

<script>
export default {
    props: ['horario','id'],
    data () {
    return {
    
    }
  }
}
</script>

<style lang="sass">
.my-menu-link
  color: white
  background: #F2C037
</style>