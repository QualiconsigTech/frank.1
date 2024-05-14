import axios from "axios";

export const LoginMain = async (dados: any) => {
  const url = "http://192.168.4.88:3333/users/signin";
  
  try {
    const response = await axios.post(url, {
      username: dados.username,
      password: dados.password
    });
    const authToken = response.data.token;
    return response;
  } catch (error) {
    
    console.error("Login failed:", error);
    throw 'Problema';
  }
};

export const CreateUser = async (dados: any) => {
  const url = "http://192.168.4.88:3333/users/signup";
 
  try {
    const response = await axios.post(url, {
      username: dados.username,
      password: dados.password,
      office: dados.office,
    });
    return response;
  } catch(err) {
    console.log("Usuário ou senha inválidos");
    
  }
};

export const Update = async (dados: any) => {

  const url = "http://192.168.4.88:3333/patch";
 
  try {
    const response = await axios.patch(url, {
      username: dados.username,
      officeId: dados.officeId,
    });
    console.log(response)
    return response;
  } catch(err) {
    console.log("Usuario não pode ser alterado");
    
  }
}

export const getInfoCredits = (prop:any) => {
  const url = `http://192.168.4.145:3333/`
  const ur = axios.create({
    baseURL: url
  })
 const getCredits = ur.get(`/office/credits/${prop}`).then(response => (response.data))
 return getCredits
}

export const AddTokens = async (data:any) => {
  console.log(data)
  const username = await data.username
  const tokens = await parseFloat(data.credit)
  const url = `http://192.168.4.88:3333/officetokens/tokens`
  const ur = axios.create({
    baseURL: url
  })
  const response = await axios.post(url, {
    username: username,
    tokens: tokens
  });
  return response.data
}