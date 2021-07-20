import api from './api'

export const authService = {
    async login(payload) {
      const res = await api.post('/login', payload)
      if (res.status == 200) {
        const token = res.data.data.token;
        const profile = JSON.stringify(res.data.data.user)
        return { token, profile }
      } else {
        throw Error(handleResponses(res.status))
      }
    },
    async register(payload) {
      const res = await api.post('/register', payload)
      if (res.ok) {
        return await res.json()
      } else {
        throw Error(handleResponses(res.status))
      }
    },
    /*
    async getInfo(token) {
      const response = await fetch(`${API_URL}/auth`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
      });
      return await response.json();
    }  */
  }


  function handleResponses(code) {
    let message = "";
    switch (code) {
      case 401:
        message = "Não está autorizado a executar esta ação!";
        break;
      case 403:
        message = "Dados das credenciais errados!";
        break;
      case 406:
        message = "Dados do utilizador já existentes!";
        break;
      default:
        message = "Mensagem desconhecida";
        break;
    }
    return message;
  }
  
  export default authService;