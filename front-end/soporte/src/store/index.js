import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth.module';
import rubros from './store-rubros';
import empresas from './store-empresas';
import empresa from './store-empresa';
import negocio from './store-negocios-empresa';
import negocioSolo from './store-negocio';
import horarios from './store-horarios';
import usuarios from './store-usuarios';
import usuario from './store-usuario';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    rubros,
    empresas,
    empresa,
    negocio,
    negocioSolo,
    horarios,
    usuarios,
    usuario
  }
});