<template>
        <div class="q-pa-lg col-12 col-lg-6">
            <q-card class="my-card">
            <q-img :src="negocio.imagen" />

            <q-card-section>
              <div class="row no-wrap items-center">
                <div class="col text-h6 ellipsis">
                  {{negocio.nombre}}
                </div>
              </div>

              <q-rating disable size="32px"  :value="negocio.calificacion.promedio"/>
                
            </q-card-section>

            <q-card-section class="q-pt-none">
              <div class="text-subtitle1">
                Direccion
              </div>
              <div class="text-caption text-grey">
              {{negocio.direccion.provincia }} - {{negocio.direccion.localidad }} - {{negocio.direccion.calle }} {{negocio.direccion.numero }}
              </div>
            </q-card-section>

            <q-separator />

            <q-card-actions>
              <q-btn 
              :to="{ name: 'negocio.show', params: { id: negocio._id }}" 
              flat 
              color="primary">
                Ver Negocio
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

    }
     
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