import axios from 'axios';

const API_URL = 'http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/empresas';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + '/login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user_empresa', JSON.stringify(response.data));
          localStorage.removeItem('long');
          localStorage.removeItem('lat');
          axios.defaults.headers.common['x-auth'] = response.data.token;
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('long');
    localStorage.removeItem('lat');
    localStorage.removeItem('user_empresa');
  }

  register(user) {
    localStorage.removeItem('long');
    localStorage.removeItem('lat');
    return axios.post(API_URL, {
      nombre:user.nombre,
      apellido:user.apellido,
      email: user.email,
      password: user.password,
    });
    
  }
}

export default new AuthService();