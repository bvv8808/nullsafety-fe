import { Cookies } from "react-cookie";

const cookie = new Cookies();

export const setToken = (token: string) => {
  return cookie.set("token", token);
};

export const getToken = () => {
  return cookie.get("token");
};
