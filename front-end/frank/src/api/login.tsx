import axios from "axios";

export const LoginMain =  (dados:any) => {
  const url = "http://localhost:3333/signin";
  
    axios.post(url, {
      username: dados.username,
      password: dados.password
    }).then(function(response){
      const authToken = response.data.token
      localStorage.setItem('token', authToken)
      console.log(response)
    })
};