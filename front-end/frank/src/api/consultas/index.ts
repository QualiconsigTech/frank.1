import axios from "axios";

export const Extract = async (prop:string, username:string) => {
  const url = `http://192.168.4.88:3333/consult/consultAdm`
  
  try {
    const response = await axios.post(url, {
      nb: prop,
      username
    })
    return response.data
  } catch (err) {
    return 'Não foi possivel fazer a busca'
  }
 
}

export const ExtractFiveDays = async (prop:string, username:string) => {
  const url = `http://192.168.4.88:3333/consult/consultConsultor`
  try {
    const response = await axios.post(url, {
      nb: prop,
      username
    })
    return response.data
  } catch (err) {
    return 'Não foi possivel fazer a busca'
  }
}

export const GetTotalTokens = async (username:string) => {
  const url = `http://192.168.4.88:3333/users/tok`
  
  try {
    const response = await axios.post(url, {
      username
    })
    return (response.data)
  } catch (err) {
    return 'Erro'
  }
}