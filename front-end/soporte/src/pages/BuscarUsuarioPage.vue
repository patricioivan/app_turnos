<template>
  <q-page class="q-pa-md">
    <q-input 
    outlined
    class="col"
    @keydown.enter.prevent="onSubmit"
    v-model="query" 
    label="Buscar Usuario" >
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
          label="Listar todos"
          @click="listarTodos" />

    </div>

    <template>
    <div class="q-pa-md">
      <q-table
        :data="Object.values(usuarios)"
        :columns="columns"
        row-key="_id"
        @row-click="showUsuarios"
        
      />
    </div>
  </template>
  </q-page>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
             
export default {
  name: 'BuscarUsuario',
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
        { name: 'apellido', align: 'center', label: 'Apellido', field: 'apellido', sortable: true },
        { name: 'email', align: 'center', label: 'Email', field: 'email', sortable: true },
      ],

   }
},
    
  computed: {

     ...mapState({
      usuarios: state =>  state.usuarios
    }),
    ...mapGetters(['usuarios']),
    
    },
  methods: {
        ...mapActions({
      loadUsuarios: 'loadUsuarios',
    }),
    onSubmit () {
      this.loadUsuarios(this.query)
    },
    listarTodos()
    {
      this.loadUsuarios('')
    },
    showUsuarios (evt, row) {
      this.$router.push({ name: 'usuario.show', params: { id: row._id }})
    }
  },
   mounted()   {
     this.loadUsuarios()
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
