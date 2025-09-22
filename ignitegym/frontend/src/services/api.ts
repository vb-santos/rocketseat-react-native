import axios from "axios";

import { AppError } from "@utils/AppError";

const api = axios.create({
  baseURL: "http://192.168.1.5:3333",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
})

api.interceptors.response.use((response) => response, (error) => {
  if (error.response && error.response.data) { // Parâmetros variam de acordo com o modo de construção do Back
    return Promise.reject(new AppError(error.response.data.message)) // Nesse caso é se o BackEnd devolver o erro com tratamento
  } else {
    return Promise.reject(error);
  }
})

export { api };