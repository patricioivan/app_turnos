<template>
<div class="col-12 q-pa-sm q-gutter-y-md">
      <q-card>
        <q-tabs
        outside-arrows
        mobile-arrows
        v-model="tab"
        narrow-indicator
        dense
        align="justify"
        class="text-primary text-caption"
      >
        <q-tab class="fontActivo" :ripple="false" name="activos"  icon="alarm_on" label="Activos" />
        <q-tab class="fontActivo" :ripple="false" name="expirados"  icon="lock_clock" label="Expirados" />
        <q-tab class="fontActivo" :ripple="false" name="utilizados"  icon="restore" label="Utilizados" />
        <q-tab class="fontActivo" :ripple="false" name="cancelados"  icon="auto_delete" label="Cancelados" />
      </q-tabs>
        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="activos">
            
            <div class="text-h6">Turnos Activos</div>
              <q-list bordered padding class="rounded-borders" >
                 
                <q-item v-if="!turnosActivos">
                  No hay turnos activos
                </q-item>
                <q-item 
                v-else

                v-for="(turnoActivo,componentKey) in turnosActivos"
                :key="componentKey"
                clickable 
                @click="
                turno = turnoActivo;
                card = true
                "
                v-ripple>
                  <q-item-section avatar top>
                    <q-avatar icon="qr_code" color="primary" text-color="white" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label >{{turnoActivo.negocio.nombre}}</q-item-label>
                     <q-item-label caption>Fecha: {{turnoActivo.fecha}}</q-item-label>
                     <q-item-label caption>{{turnoActivo.horario.diaTraducido}}</q-item-label>
                     <q-item-label caption>De {{turnoActivo.horario.inicio}} a {{turnoActivo.horario.fin}}</q-item-label>
                  </q-item-section>

                </q-item>
              </q-list>
                    <!-- MODAL COMIENZO -->
               <q-dialog v-model="card">
                  <q-card class="my-card">
                    <q-img :src="this.turno.codeURL">
                     
                    </q-img>
                     <q-card-section>
                       <div class="text-subtitle1 text-primary text-center text-bold">{{this.turno.negocio.nombre}}</div>
                    </q-card-section>

                    <q-list class="q-pa-sm">
                      <q-item>
                        <q-item-section avatar>
                          <q-icon color="primary" name="location_on" />
                        </q-item-section>
              
                        <q-item-section>
                          <q-item-label>Direccion</q-item-label>
                          <q-item-label  caption>{{this.turno.negocio.direccion.calle}} 
                          {{this.turno.negocio.direccion.numero}} {{this.turno.negocio.direccion.provincia}}, {{this.turno.negocio.direccion.localidad}}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                     <q-list class="q-pa-sm">
                      <q-item>
                        <q-item-section avatar>
                          <q-icon color="deep-orange" name="date_range" />
                        </q-item-section>
              
                        <q-item-section>
                          <q-item-label>Fecha</q-item-label>
                          <q-item-label  caption>{{this.turno.fecha}}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                    <q-list class="q-pa-sm">
                      <q-item>
                        <q-item-section avatar>
                          <q-icon color="secondary" name="today" />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>Dia</q-item-label>
                          <q-item-label caption>
                            <span>{{this.turno.horario.diaTraducido}}</span>
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>

                    <q-list class="q-pa-sm">
                      <q-item>
                        <q-item-section avatar>
                          <q-icon color="purple" name="alarm" />
                        </q-item-section>
              
                        <q-item-section>
                          <q-item-label>Horario Inicio - Horario Fin</q-item-label>
                          <q-item-label caption>De {{this.turno.horario.inicio}} a {{this.turno.horario.fin}}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>

                     <q-list class="q-pa-sm">
                      <q-item>
                        <q-item-section avatar>
                          <q-icon color="info" name="group" />
                        </q-item-section>
              
                        <q-item-section>
                          <q-item-label>Reserva</q-item-label>
                          <q-item-label caption>{{this.turno.capacidad}} persona(s)</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>

                    
                      <q-card-actions align="right">
                      <q-btn @click="confirm = true" v-close-popup flat color="primary" label="Cancelar Turno"  round icon="event" />
                      <q-btn round color="primary" icon="close" @click="card = false" />
                    </q-card-actions>
                  </q-card>
               </q-dialog>
                <!-- ESTO CONFIRMA LA ELIMINACION -->
                <q-dialog v-model="confirm">
              <q-card>
                <q-card-section class="row items-center">
                  <span class="q-ml-sm">¿Estas seguro que desea cancelar este turno?</span>
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn flat label="Volver" color="primary" v-close-popup />
                  <q-btn flat label="Cancelar Turno" @click="cancelarTurno(turno._id)"  color="primary" v-close-popup />
                </q-card-actions>
              </q-card>
            </q-dialog>
                 
               
          </q-tab-panel>

          <q-tab-panel name="expirados">
            <div class="text-h6">Turnos Expirados</div>
               <q-list bordered padding class="rounded-borders" >
                <q-item v-if="!turnosExpirados">
                No hay turnos expirados
                </q-item>

                <q-item v-else
                v-for="(turnoExpirado,componentKey) in turnosExpirados"
                :key="componentKey"
                v-ripple>
                  <q-item-section avatar top>
                    <q-avatar icon="qr_code_2" color="primary" text-color="white" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label >{{turnoExpirado.negocio.nombre}}</q-item-label>
                     <q-item-label caption>Fecha: {{turnoExpirado.fecha}}</q-item-label>
                     <q-item-label caption>{{turnoExpirado.horario.diaTraducido}}</q-item-label>
                     <q-item-label caption>De {{turnoExpirado.horario.inicio}} a {{turnoExpirado.horario.fin}}</q-item-label>
                  </q-item-section>

                  <q-item-section side>
                    <q-icon name="notifications_off" color="primary" />
                  </q-item-section>
                </q-item>
              </q-list>
          </q-tab-panel>

          <q-tab-panel name="utilizados">
            <div class="text-h6">Turnos Utilizados</div>
             <q-list bordered padding class="rounded-borders" >
              <q-item v-if="!turnosUtilizados">
                No hay turnos utilizados
              </q-item>
                <q-item v-else
                v-for="(turnoUtilizado,componentKey) in turnosUtilizados"
                :key="componentKey"
                v-ripple>
                  <q-item-section avatar top>
                    <q-avatar icon="qr_code" color="primary" text-color="white" />
                  </q-item-section>

                   <q-item-section>
                    <q-item-label >{{turnoUtilizado.negocio.nombre}}</q-item-label>
                     <q-item-label caption>Fecha: {{turnoUtilizado.fecha}}</q-item-label>
                     <q-item-label caption>{{turnoUtilizado.horario.diaTraducido}}</q-item-label>
                     <q-item-label caption>De {{turnoUtilizado.horario.inicio}} a {{turnoUtilizado.horario.fin}}</q-item-label>
                  </q-item-section>

                  <q-item-section side>
                    <q-icon name="check_circle_outline" color="secondary" />
                  </q-item-section>
                </q-item>
              </q-list>
          </q-tab-panel>

          <q-tab-panel name="cancelados">
            <div class="text-h6">Turnos Cancelados</div>
              <q-list bordered padding class="rounded-borders" >
                <q-item v-if="!turnosCancelados">
                  No hay turnos cancelados
                </q-item>
                <q-item v-else
                v-for="(turnoCancelado,componentKey) in turnosCancelados"
                :key="componentKey"
                v-ripple>
                  <q-item-section avatar top>
                    <q-avatar icon="qr_code_2" color="primary" text-color="white" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label >{{turnoCancelado.negocio.nombre}}</q-item-label>
                     <q-item-label caption>Fecha: {{turnoCancelado.fecha}}</q-item-label>
                     <q-item-label caption>{{turnoCancelado.horario.diaTraducido}}</q-item-label>
                     <q-item-label caption>De {{turnoCancelado.horario.inicio}} a {{turnoCancelado.horario.fin}}</q-item-label>
                  </q-item-section>

                  <q-item-section side>
                    <q-icon name="report" color="primary" />
                  </q-item-section>
                </q-item>
              </q-list>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
</div>

</template>

<script>
import * as axios from 'axios'
import {mapState, mapGetters, mapActions} from 'vuex'
export default {
  name: 'PageTurnos',
   data () {
    return {
      confirm: false,
      tab: 'activos',
      card: false,
      turno: {
        codeURL: '',
        _id: '',
        negocio: {
          direccion: {
            calle:'',
            provincia:'',
            localidad:'',
            numero:''
          },
          nombre: '',
        },
        horario: {
          dia:'',
          inicio:'',
          fin: '',
        }
      },
    }
  },
   computed: {

     ...mapState({
      activos: state => state.turnosActivos,
      expirados: state => state.turnosExpirados,
      cancelados: state => state.turnosCancelados,
      utilizados: state => state.turnosUtilizados,
      
    }),
    ...mapGetters(['turnosActivos','turnosExpirados','turnosCancelados','turnosUtilizados']),
    
    
    
    },
  methods: { 
        ...mapActions({
      loadTurnosActivos: 'loadTurnosActivos',
      loadTurnosExpirados: 'loadTurnosExpirados',
      loadTurnosCancelados: 'loadTurnosCancelados',
      loadTurnosUtilizados: 'loadTurnosUtilizados',
    }),
   cancelarTurno: async function (id) {
      try {
          await axios
            .put('http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/turnos/'+id+'/cancelar')
              this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: "Turno cancelado correctamente"
            })
            this.loadTurnosActivos()
            this.loadTurnosCancelados()
        } catch (error) {
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
      this.loadTurnosActivos()
      this.loadTurnosExpirados()
      this.loadTurnosCancelados()
      this.loadTurnosUtilizados()
  },
}
</script>

<style lang="scss" scoped>

  .fontActivo
  {
    font-size: 50px !important;
  }

</style>



