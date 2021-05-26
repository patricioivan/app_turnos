<template>
  <q-page class="q-pa-md">
    <q-input 
    outlined
    class="col"
    v-model.lazy="query" 
    @keydown.enter.prevent="onSubmit"
    label="Buscar Empresa" >
        <template v-slot:append>
         
          <q-btn 
          clickable 
          outline 
          color="primary"
          name="search"
          icon="search"
          label="Buscar"
          @click="onSubmit" />
        </template>

        <template v-slot:hint>
          Buscador
        </template>
    </q-input>
    <div class="q-pa-md">
     <q-btn 
          clickable 
          outline 
          color="secondary"
          name="search"
          icon="list"
          label="Listar todas"
          @click="listarTodos" />

    </div>

    <template>
    <div class="q-pa-md">
      
      <q-table
        :data="Object.values(empresas)"
        :columns="columns"
        row-key="_id"
        @row-click="showEmpresas"
        
      />
    </div>
  </template>
  
     <!-- <empresa
      v-for="(empresa,componentKey) in empresas"
      :key="componentKey"
      :empresa="empresa"
      >

      </empresa> -->
  </q-page>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
export default {
  name: 'BuscarEmpresa',
    data() {
      return {
         query:"",
          columns: [
        {
          
          name: 'nombre',
          required: true,
          label: 'Nombre',
          align: 'left',
          field: 'nombre',
          sortable: true,
          classes: 'bg-grey-2 ellipsis',
          style: 'max-width: 100px',
          headerClasses: 'bg-primary text-white'
        },
        { name: 'razonSocial', align: 'center', label: 'Razon Social', field: 'razonSocial', sortable: true },
        { name: 'email', align: 'center', label: 'Email', field: 'email', sortable: true },
      ],

   }
},
    
    components: {
    'search' : require('components/Search.vue').default,
    'empresa' : require('components/Empresas/Empresa.vue').default

  },
  computed: {

     ...mapState({
      empresas: state =>  state.empresas
    }),
    ...mapGetters(['empresas']),
    
    },
  methods: {
        ...mapActions({
      loadEmpresas: 'loadEmpresas',
    }),
    onSubmit () {
      this.loadEmpresas(this.query)
    },
      listarTodos()
    {
      this.loadEmpresas('')
    },
    showEmpresas (evt, row) {
      this.$router.push({ name: 'empresa.show', params: { id: row._id }})
    }
  },
   mounted()   {
     this.loadEmpresas()
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

<style lang="scss" scoped>
.q-notification__badge {
  display:none !important;
}
</style>>
