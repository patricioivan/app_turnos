import axios from 'axios';

const API_URL = 'http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/soportes/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + '/login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
          axios.defaults.headers.common['x-auth'] = response.data.token;
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL, {
      nombre:user.nombre,
      apellido:user.apellido,
      documento:user.documento,
      celular:user.celular,
      email: user.email,
      password: user.password,
      admin:user.admin.value
    });
  }
}

export default new AuthService();