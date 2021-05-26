import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from './auth.module';
import Ubicacion from './store-ubicacion';
import Negocios from './store-negocios';
import Negocio from './store-negocio';
import Rubros from './store-rubros';
import Turnos from './store-turnos';
import NegocioBuscado from './store-negocio-buscado'
import Calificaciones from './store-calificaciones'
import NegociosFavoritos from './store-negociosfavoritos.js'
import Usuario from './store-usuario.js'
import Feriado from './store-feriados.js'
import Horario from './store-horarios.js'
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
      Ubicacion,
      Negocios,
      Negocio,
      Rubros,
      NegocioBuscado,
      Turnos,
      Calificaciones,
      NegociosFavoritos,
      Usuario,
      Feriado,
      Horario
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
