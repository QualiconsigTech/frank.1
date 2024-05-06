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
    throw 'Problema';
  }
};

export const CreateUser = async (dados: any) => {
  const url = "http://localhost:3333/signup";
 
  try {
    const response = await axios.post(url, {
      username: dados.username,
      password: dados.password,
      officeId: dados.office,
    });
    return response;
  } catch(err) {
    console.log("Usuário ou senha inválidos");
    
  }
};

export const Update = async (dados: any) => {

  const url = "http://localhost:3333/patch";
 
  try {
    const response = await axios.patch(url, {
      username: dados.username,
      officeId: dados.office,
    });
    console.log(response)
    return response;
  } catch(err) {
    console.log("Usuario não pode ser alterado");
    
  }
}

export const Extract = (prop:any) => {
  const url = `http://localhost:3333/`
  const ur = axios.create({
    baseURL: url
  })
 const getExt = ur.get(`rt/consult/${prop}`).then(response => (response.data))
 return getExt
}


export const ExtractForBackoffice = (prop:any) => {
  const url = `http://localhost:3333/`
  const ur = axios.create({
    baseURL: url
  })
 const getExt = ur.get(`rt/consultBackoffice/${prop}`).then(response => (response.data))
 return getExt
}

export const ExtractForAdm = (prop:any) => {
  const url = `http://localhost:3333/`
  const ur = axios.create({
    baseURL: url
  })
 const getExt = ur.get(`rt/consultAdm/${prop}`).then(response => (response.data))
 return getExt
}