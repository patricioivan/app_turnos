<template>
<q-page>
  <div id="q-app">
    <div class="q-pa-md">
        <q-card class="my-card">
          <q-list class="bg-grey-10 text-white shadow-2 rounded-borders" style=" width: 100%;">
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <q-icon name="add_business" color="white" />
                </q-avatar>
              </q-item-section>
              <q-item-section>Agregar Nuevo Rubro</q-item-section>
            </q-item>
          </q-list>
      <q-card-section>
        <q-form
          
          ref="rubroForm"
          @submit="onSubmit"
          class="q-gutter-lg "
          >
          <q-input 
            class="size-lg"
            color="positive"
            name="name"
            v-model="rubro.nombre"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor escriba el nombre del rubro que quiere agregar']"
            label="Nombre de Rubro"
            ref="email">
                <template v-slot:prepend>
                <q-icon name="add_task" color="primary" />
                </template>
          </q-input>
          

          <div>
            <q-btn label="Agregar" type="submit" color="primary"/>
            <q-btn label="Limpiar" @click="onReset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
        
      </q-card-section>
        <q-list bordered>
          
      <rubro
      v-for="(rubro,componentKey) in rubros"
      :key="componentKey"
      :rubro="rubro"
      > 
      </rubro>
      
    </q-list>
    </q-card>
    </div>
  
  </div>
</q-page>
</template>

<script>

import Rubro from 'src/components/Rubros/Rubro.vue'

import {mapState, mapGetters, mapActions} from 'vuex'
export default {
  name: 'AgregarRubro',
  data () {
    return {
      componentKey: 0,
      rubro: {
        nombre: '',
      }
    }
  },
  components: {
    'rubro' : require('components/Rubros/Rubro.vue').default
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
      submitRubro: 'submitRubro'
    }),
    onSubmit () {
        this.submitRubro(this.rubro)
        this.componentKey += 1;
      
    },
    onReset () {
      this.rubro.nombre = ''
    },
   
  },

   mounted()   {
     this.loadRubros()
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

