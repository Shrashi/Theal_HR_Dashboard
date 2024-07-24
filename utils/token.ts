
import { jwtDecode } from "jwt-decode";

export const getPayload = (token: string) => {
 const {email, id, isAdmin, username, exp} : {email: string, id: string , isAdmin: boolean, username: string, exp:bigint}= jwtDecode(token)
 return {email, id, isAdmin, username, exp}
}

export const isTokenExpired = (token: string) => {
  if (!token) return true;
  try {
    const {exp} = getPayload(token)
    const currentTime = Date.now() / 1000;
    return exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};