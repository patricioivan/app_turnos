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
        <q-card clickable class="my-card">
        <q-img  alt="https://cdn.quasar.dev/img/chicken-salad.jpg" :src="negocio.imagen" />

        <q-card-section>
          
          <q-btn
            fab
            color="primary"
            icon="add"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%);"
            :to="{ name: 'negocio.agregar_horario', params: { id: negocio._id }}" 
          />

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis nombre-negocio">
              {{negocio.nombre}}
            </div>
            <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"> 
              Agregar Jornada
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
          Ver más informacion
          </q-btn>
        </q-card-actions>
      </q-card>
      </div>
  
</template>

<script>
export default {
    props: ['negocio','id'],

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