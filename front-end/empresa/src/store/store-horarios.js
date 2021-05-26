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

  };

const getters = { // computed properties
    // getter (state, getters)
    horarios: (state) => {
        return state.horarios
    },

  };

  const actions = { // actions store methods
    // action (context)
    loadHorarios: ({commit}, opciones) => {
        console.log("id, fecha y dia:", opciones.id, opciones.fecha, opciones.dia)
      axios.post('http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/negocios/'+opciones.id+'/horarios-segun-dia',
      {
        fecha: opciones.fecha,
        dia: opciones.dia
      })
          .then(response => response.data.horarios)
          .then(horarios => {
            
            commit('setHorariosToState', horarios)
          })
          .catch((error) => {
              console.log(error.response.data)
            Notify.create({
              color: 'red-4',
              textColor: 'white',
              icon: 'error',
              timeout: 130,
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
  };

export default {
    state,
    mutations,
    actions,
    getters,
}