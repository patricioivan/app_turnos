<template>
  <div>
    <q-item 

       v-ripple
       >
       
        <q-item-section>{{rubro.nombre}}</q-item-section>
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
          <span class="q-ml-sm">¿Estas seguro que quieres eliminar este rubro?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Eliminar" @click="deleteRubro(rubro._id)"  color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
</div>
</template>

<script>

import axios from 'axios'
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
    props: ['rubro','id'],
    data () {
    return {
        confirm: false,
    }
   
  },
     computed: {
  
    ...mapState({
      rubros: state =>  state.rubros
    }),
    
    ...mapGetters(['rubros']),
    
    
    },
  methods: {
        ...mapActions({
      loadRubros: 'loadRubros',
    }),
     async deleteRubro(id) {
        try {
          await axios
            .delete('http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/rubros/'+id)
              this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: "Rubro eliminado"
            })
            this.loadRubros()
        } catch (error) {
            console.log(error)
            this.$q.notify({
              color: 'red-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: error.response.data.mensaje
            })
        }

      },
    
  }
}
</script>