import Vue from 'vue'
import axios from 'axios'
import { Notify } from 'quasar'

if(localStorage.getItem('user'))
{
const user = JSON.parse(localStorage.getItem('user'));

axios.defaults.headers.common['x-auth'] = user.token;
}
  const state = { // data
    negocio: {

    },
    negocio_edit: {
      
    }
  };

const getters = { // computed properties
    // getter (state, getters)
    negocio: (state) => {
        return state.negocio
    },
    negocio_edit: (state) => {
      return state.negocio_edit
  }
  };

  const actions = { // actions store methods
    // action (context)
    loadNegocio: ({commit}, id) => {
      axios.get('http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/negocios/'+id)
          .then(response => response.data.negocio)
          .then(negocio => {
            commit('setNegocioToState', negocio)
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
    loadNegocioEdit: ({commit}, id) => {
      axios.get('http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/negocios/'+id+'/editar')
          .then(response => response.data.negocio)
          .then(negocio => {
            commit('setNegocioEditToState', negocio)
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
  };

  const mutations = {
    // mutation (state, payload)
    setNegocioToState (state, negocio) {
      state.negocio = negocio
    },
    setNegocioEditToState (state, negocio) {
      state.negocio_edit = negocio
    },
  };

export default {
    state,
    mutations,
    actions,
    getters,
}