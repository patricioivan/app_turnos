<template>
<div>
      
      <q-item 
      class="q-my-sm" 
       v-ripple
        >
        <q-item-section>
          <q-item-label >
               {{feriado.fecha}} - Motivo: {{feriado.motivo}} 
          </q-item-label>
        </q-item-section>
      </q-item>
</div>

</template>

<script>
import axios from 'axios'
import {mapState, mapGetters, mapActions} from 'vuex'
export default {
    props: ['feriado','id'],
}
</script>

<style lang="sass">
.my-menu-link
  color: white
  background: #F2C037
</style>