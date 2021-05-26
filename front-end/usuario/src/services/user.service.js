import axios from 'axios';

const API_URL = 'http://ec2-18-235-243-39.compute-1.amazonaws.com:3000/api/usuarios';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user_cliente', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user_cliente');
  }

  register(user) {
    return axios.post(API_URL + 'register', {
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();