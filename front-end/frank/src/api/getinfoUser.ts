import axios from 'axios'

export const FindUser = async (data:any) => {
    console.log(data)
    const office = await data.office
    const url = `http://192.168.4.88:3333/users/findUser`
    const ur = axios.create({
      baseURL: url
    })
    const response = await axios.post(url, {
        office
    });
    return response.data
  }


 
  const apiUrl = 'http://216.245.202.234/infraprev/extratoJSON.php?servico=extrato&login=emillyjson&pass=salvador2024&nb=337&saldo';
  
  
 export const creditoTotal = await axios.get(apiUrl)
    .then(response => {
      
      return(response.data);
    })
    .catch(error => {
      console.log('erro')
      
    });
  