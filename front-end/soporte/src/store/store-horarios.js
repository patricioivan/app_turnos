import Vue from 'vue'
import axios from 'axios'
import { Notify } from 'quasar'

if(localStorage.getItem('user'))
{
const user = JSON.parse(localStorage.getItem('user'));

axios.defaults.headers.common['x-auth'] = user.token;
}
  const state = { // data
    horarios: [
    
    ],
    jornadas: [

    ],

    feriados: [

    ]
  };

const getters = { // computed properties
    // getter (state, getters)
    horarios: (state) => {
        return state.horarios
    },
    jornadas: (state) => {
      return state.jornadas
    },
    feriados: (state) => {
      return state.feriados
    }
  };

  const actions = { // actions store methods
    // action (context)
    loadHorarios: ({commit}, id) => {
      axios.get('http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/negocios/'+id+'/horarios-todos')
          .then(response => response.data.horarios)
          .then(horarios => {
            commit('setHorariosToState', horarios)
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
  loadFeriados: ({commit}, id) => {
    axios.get('http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/negocios/'+id+'/dias-no-laborales')
        .then(response => response.data.dias)
        .then(dias => {
          commit('setFeriadosToState', dias)
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
    setHorariosToState (state, horarios) {
      state.horarios = horarios
    },

    setJornadasToState (state, jornadas) {
      state.jornadas = jornadas
    },

    setFeriadosToState (state, feriados) {
      state.feriados = feriados
    },
    
  };

export default {
    state,
    mutations,
    actions,
    getters,
}