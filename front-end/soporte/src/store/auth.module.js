import AuthService from '../services/auth.service';
import { Notify } from 'quasar'

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: false,
  state: initialState,
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          console.log("error");
          Notify.create({
            color: 'red-4',
            textColor: 'white',
            icon: 'error',
            message: "Email o Contraseña incorrectas"
          })
        }
      );
    },
    logout({ commit }) {
      console.log("chau");
      AuthService.logout();
      commit('logout');
    },
    async register({ commit }, user) {

      try {
        const response= await AuthService.register(user)
        commit('registerSuccess');
        Notify.create({
          color: 'green-4',
          textColor: 'white',
          icon: 'error',
          message: 'Usuario de soporte registrado correctamente',
        })
        return response;
        // return Promise.resolve(response.data);
      } catch (error) {
        const errorMessage = error.response.data.mensaje
        Notify.create({
          color: 'red-4',
          textColor: 'white',
          icon: 'error',
          message: errorMessage,
        })
          commit('registerFailure');
          // return Promise.reject(error);        
        }
    }
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = true;
    },
    registerFailure(state) {
      state.status.loggedIn = true;
    }
  }
};