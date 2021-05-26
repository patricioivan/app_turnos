import Vue from 'vue'
import axios from 'axios'
import { Notify } from 'quasar'

if(localStorage.getItem('user'))
{
const user = JSON.parse(localStorage.getItem('user'));

axios.defaults.headers.common['x-auth'] = user.token;
}
  const state = { // data
    feriados: [

    ],
    jornadas: [

    ]
  };

const getters = { // computed properties
    // getter (state, getters)

    feriados: (state) => {
      return state.feriados
    },
    jornadas: (state) => {
      return state.jornadas
    },
  };

  const actions = { // actions store methods
  loadFeriados: async ({commit}, id) => {
      try {
          const dias = await axios.get('http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/negocios/'+id+'/dias-no-laborales')
          commit('setFeriadosToState', dias)
      }
      catch(error) {
          Notify.create({
            color: 'red-4',
            textColor: 'white',
            icon: 'error',
            message: error.response.data.mensaje
        })
      }
    },
    loadJornadas: ({commit}, id) => {
      axios.get('http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/negocios/'+id+'/jornadas')
          .then(response => response.data.jornadas)
          .then(jornadas => {
            commit('setJornadasToState', jornadas)
          })
          .catch((error) => {
            Notify.create({
              color: 'red-4',
              textColor: 'white',
              icon: 'error',
              message: error.response.data.mensaje
          })
        })
    },
  }

  const mutations = {
    // mutation (state, payload)
    setFeriadosToState (state, feriados) {
      state.feriados = feriados
    },
    setJornadasToState (state, jornadas) {
      state.jornadas = jornadas
    },

    
  };

export default {
    state,
    mutations,
    actions,
    getters,
}