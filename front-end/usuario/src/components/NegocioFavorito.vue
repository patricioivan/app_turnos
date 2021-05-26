<template>
    <!-- <q-item 

       v-ripple
       clickable
       :to="{ name: 'negocio.show', params: { id: negocio._id }}" 
       >
        <q-item-section>{{negocio.nombre}}</q-item-section>
        <q-item-section avatar>
          <q-icon color="primary" name="view_list" />
        </q-item-section>
      </q-item> -->
        
        <div class="q-pa-lg col-12 col-lg-6">
        <q-card clickable  class="my-card">
        <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

        <q-card-section>
           <q-rating
            @click="negocio.estaEnFavoritos? sacarFavorito(negocio._id) : agregarFavorito(negocio._id)"
            v-model="favorito"
            max="1"
            size="3em"
            color="red"
            color-selected="red-9"
            icon="favorite_border"
            icon-selected="favorite"
            icon-half="favorite"
            no-dimming
          />
          <q-btn
            fab
            color="primary"
            icon="location_on"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%);"
            :to="{ name: 'negocio.show', params: { id: negocio._id }}" 
          />

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis nombre-negocio">
              {{negocio.nombre}}
            </div>
            <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"> 
              <p>{{getKilometros(getLat,getLong, negocio.location.coordinates[1], negocio.location.coordinates[0])}} mts</p> 
              
            </div>
          </div>  

          <q-rating disable size="32px"  :value="negocio.calificacion.promedio" color="purple" />
        </q-card-section>


        <q-separator />

        <q-card-actions>
      
          <q-btn 
          icon="add"  
          flat color="primary"
          :to="{ name: 'negocio.show', params: { id: negocio._id }}" 
          >
          Solicitar turnos
          </q-btn>
        </q-card-actions>
      </q-card>
      </div>
  
</template>

<script>
import * as axios from 'axios'
export default {
    props: ['negocio','id'],
     data () {
    return {
      favorito: 0
    }
     
    },
    computed: {
      getLong: function() {
        return localStorage.getItem('long');
      },
      getLat: function() {
        return localStorage.getItem('lat')
      }
    },
    methods: {
       getKilometros: function(lat1,lon1,lat2,lon2)
        {
        const rad = function(x) {return x*Math.PI/180;}
        var R = 6378.137; //Radio de la tierra en km
        var dLat = rad( lat2 - lat1 );
        var dLong = rad( lon2 - lon1 );
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        return d.toFixed(5)*1000; //Retorna tres decimales
        },
         async agregarFavorito(id) 
        {
          try {
            await axios
              .post('http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/negocios/'+id+'/favoritos')
                this.$q.notify({
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: "Negocio agregado a favoritos"
              })
              this.favorito = 1;
              this.negocio.estaEnFavoritos = true;
            } 
          catch (error) {
            console.log(error)
              this.$q.notify({
                color: 'red-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: error.response.data.mensaje
              })
          }

      
      },
         async verificarNegocioEnFavoritos(id) 
        {
          try {
            const response = await axios.get('http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/usuarios/favoritos');
            const favoritos = response.data.favoritos;
              const estaEnFavoritos = favoritos.some((favorito) => {
              return favorito.negocio._id == id;
            });
            if (estaEnFavoritos) {
              this.favorito = 1;                
              this.negocio.estaEnFavoritos = estaEnFavoritos;
            }
            } 
          catch (error) {
            console.log(error)
              this.$q.notify({
                color: 'red-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: error.response.data.mensaje
              })
          }

      
      },
      sacarFavorito: async function(id) 
      {
        try {
            await axios
              .delete('http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/negocios/'+id+'/favoritos')
                this.$q.notify({
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: "Negocio eliminado de favoritos"
              })
              this.favorito = 0;
              this.negocio.estaEnFavoritos = false;
            } 
          catch (error) {
            console.log(error)
              this.$q.notify({
                color: 'red-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: error.response.data.mensaje
              })
          }
      }
    },
    mounted() {
      this.verificarNegocioEnFavoritos(this.negocio._id)
  },
}
</script>

<style lang="scss" scoped>
@media (max-width: 600px)
  {
    .nombre-negocio {
      font-size: 12px !important;
    }
    .texto-direccion {
      font-size: 12px !important;
    }

  }
</style>