import axios from "axios";

export const LoginMain = async (dados: any) => {
  const url = "http://localhost:3333/signin";
  
  try {
    const response = await axios.post(url, {
      username: dados.username,
      password: dados.password
    });

    const authToken = response.data.token;
    
    return response;
  } catch (error) {
    
    console.error("Login failed:", error);
    throw error;
  }
};

export const Extract = (prop:any) => {
  const url = `http://localhost:3333/`
  const ur = axios.create({
    baseURL: url
  })
 const getExt = ur.get(`rt/consult/${prop}`).then(response => (response.data))
 return getExt
}