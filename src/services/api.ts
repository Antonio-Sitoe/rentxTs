import axios from "axios";

const api = axios.create({
  // baseURL: "http://192.168.43.84:3333",
  baseURL: "http://192.168.18.37:3333", //void
});

export { api };
