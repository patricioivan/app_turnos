import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from './auth.module';
import Negocios from './store-negocios';
import Negocio from './store-negocio';
import Rubros from './store-rubros';
import Calificaciones from './store-calificaciones'
import Usuario from './store-usuario.js'
import Feriado from './store-feriados.js'
import Horario from './store-horarios.js'
import Turno from './store-turnos.js'
import Estadistica from './store-estadisticas.js'
// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth,
      Negocios,
      Negocio,
      Rubros,
      Calificaciones,
      Usuario,
      Feriado,
      Horario,
      Turno,
      Estadistica
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
