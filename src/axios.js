import Axios from 'axios';
export const axios=Axios.create({baseURL:"http://localhost:9000",
header:{Auth:"simple AUTH"},
timeout:5000,
});