import axios from "axios";
const customUrl = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
   headers:{
      'Access-Control-Allow-Origin': 'https://nutty-bass-nightshirt.cyclic.app',
     }
 
});

export { customUrl };
