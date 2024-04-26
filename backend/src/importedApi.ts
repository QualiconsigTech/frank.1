import axios from 'axios';

const url = axios.create({
  baseURL: 'http://localhost:3333'
});

export const getConsulta = async (nb:any) => {
  try {
    const response = await url.get(`/rt/consultas:`+nb);
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer a requisição:', error);
    throw error; // Você pode optar por lançar o erro para que quem chama a função possa lidar com ele
  }
};

export const Simula = async () => {
  try {
    const response = await url.get(`/rt/teste`);
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer a requisição:', error);
    throw error; // Você pode optar por lançar o erro para que quem chama a função possa lidar com ele
  }
};



