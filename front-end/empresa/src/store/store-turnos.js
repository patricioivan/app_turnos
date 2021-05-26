import Vue from 'vue'
import axios from 'axios'
import { Notify } from 'quasar'

if(localStorage.getItem('user_empresa'))
{
const user = JSON.parse(localStorage.getItem('user_empresa'));

// axios.defaults.headers.common['x-auth'] = user.token;
}
  const state = { // data
    turnos_activos: [
     
    ]
  };

const getters = { // computed properties
    // getter (state, getters)
    turnos_activos: (state) => {
        return state.turnos_activos
    }
  };

  const actions = { // actions store methods
    // action (context)
    loadTurnosActivos: ({commit},id) => {
      axios
        .get('http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/negocios/'+id+'/turnos-activos')
        .then(response => response.data.turnos)
        .then(turnos_activos => {
          commit('setTurnosActivosToState', turnos_activos)
        })
    },
  };

  const mutations = {
    // mutation (state, payload)
    setTurnosActivosToState (state, turnos_activos) {
      state.turnos_activos = turnos_activos
    },
  };

export default {
    state,
    mutations,
    actions,
    getters,
}