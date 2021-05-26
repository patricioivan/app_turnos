<template>
<div>
      <q-item 
      class="q-my-sm" 
       v-ripple
       clickable>
        <q-item-section>
          <q-item-label >

               {{fecha.fecha}} - Motivo: {{fecha.motivo}} 
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
          <span class="q-ml-sm">¿Estas seguro que quieres eliminar esta fecha no laboral?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Eliminar" @click="deleteFecha(fecha._id)"  color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
</div>

</template>

<script>
import axios from 'axios'
import {mapState, mapGetters, mapActions} from 'vuex'
export default {
    props: ['fecha','id'],
    data () {
    return {
        confirm: false,
    }
   
  },
 methods: {
          ...mapActions({
      loadFeriados: 'loadFeriados',
    }),
       async deleteFecha(id) {
        try {
          await axios
            .delete('http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/negocios/'+this.$route.params.id+'/dias-no-laborales/'+id)
              this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: "Fecha eliminada correctamente"
            })
            this.loadFeriados(this.$route.params.id)
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