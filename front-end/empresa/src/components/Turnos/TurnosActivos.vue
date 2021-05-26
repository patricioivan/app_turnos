<template>
<div>
  
      <q-item 
      class="q-my-sm" 
       
       >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            <span v-if="turno.horario.dia == 'Monday'">Lu</span>
            <span v-if="turno.horario.dia == 'Tuesday'">Ma</span>
            <span v-if="turno.horario.dia == 'Wednesday'">Mi</span>
            <span v-if="turno.horario.dia == 'Thursday'">Ju</span>
            <span v-if="turno.horario.dia == 'Friday'">Vi</span>
            <span v-if="turno.horario.dia == 'Saturday'">Sa</span>
            <span v-if="turno.horario.dia == 'Sunday'">Do</span>
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>
              
            <span>{{turno.horario.diaTraducido}}</span>
            </q-item-label>
          <q-item-label caption lines="1">Inicio: {{ turno.horario.inicio }} - Fin : {{turno.horario.fin}}</q-item-label>
           <q-item-label caption lines="1">Capacidad: {{ turno.capacidad }}</q-item-label>
           <q-item-label caption >Fecha : 
                {{turno.fecha}}
            </q-item-label>
             <q-item-label caption>Solicitante: {{ turno.usuario.nombre }} {{turno.usuario.apellido}}</q-item-label>

        </q-item-section>
      </q-item>

</div>

</template>

<script>

export default {
    props: ['turno','id'],

}
</script>

<style lang="sass">
.my-menu-link
  color: white
  background: #F2C037
</style>