import Vue from 'vue'
import axios from 'axios'
import { Notify } from 'quasar'

if(localStorage.getItem('user_cliente'))
{
const user = JSON.parse(localStorage.getItem('user_cliente'));

axios.defaults.headers.common['x-auth'] = user.token;
}
  const state = { // data
    calificaciones: [

    ]
  };

const getters = { // computed properties
    // getter (state, getters)
    calificaciones: (state) => {
        return state.calificaciones
    }
  };

  const actions = { // actions store methods
    // action (context)
    loadCalificaciones: ({commit}, id) => {
        axios
          .get('http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/negocios/'+id+'/rating')
          .then(response => response.data.ratings)
          .then(ratings => {
            commit('setCalificacionesToState', ratings)
          })
      },
    };

  const mutations = {
    // mutation (state, payload)
    setCalificacionesToState (state, calificaciones) {
      state.calificaciones = calificaciones

    },
  };

export default {
    state,
    mutations,
    actions,
    getters,
}