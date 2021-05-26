import Vue from 'vue'
import axios from 'axios'
import { Notify } from 'quasar'

if(localStorage.getItem('user_cliente'))
{
const user = JSON.parse(localStorage.getItem('user_cliente'));

axios.defaults.headers.common['x-auth'] = user.token;
}
  const state = { // data
    usuario: {

    }
  };

const getters = { // computed properties
    // getter (state, getters)
    usuario: (state) => {
        return state.usuario
    }
  };

  const actions = { // actions store methods
    // action (context)
    loadUsuario: ({commit}) => {
      axios.get('http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/usuarios/cuenta')
          .then(response => response.data.usuario)
          .then(usuario => {
            commit('setusuarioToState', usuario)
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
    setusuarioToState (state, usuario) {
      state.usuario = usuario
    },
  };

export default {
    state,
    mutations,
    actions,
    getters,
}