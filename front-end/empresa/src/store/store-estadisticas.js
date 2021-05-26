import Vue from 'vue'
import axios from 'axios'
import { Notify } from 'quasar'

if(localStorage.getItem('user_empresa'))
{
const user = JSON.parse(localStorage.getItem('user_empresa'));

axios.defaults.headers.common['x-auth'] = user.token;
}
  const state = { // data
    estadisticas: [

    ]
  };

const getters = { // computed properties
    // getter (state, getters)
    estadisticas: (state) => {
        return state.estadisticas
    }
  };

  const actions = { // actions store methods
    // action (context)
    loadEstadisticas: async ({commit}) => {
        const response = await axios
          .get('http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/empresas/estadisticas')
        
        const estadisticas = response.data.estadisticas
        commit('setEstadisticasToState', estadisticas)
        return estadisticas
      },
    };

  const mutations = {
    // mutation (state, payload)
    setEstadisticasToState (state, estadisticas) {
      state.estadisticas = estadisticas

    },
  };

export default {
    state,
    mutations,
    actions,
    getters,
}