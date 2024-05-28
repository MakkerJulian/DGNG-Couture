import { jwtDecode } from "jwt-decode";
import { Token } from "../axios";

export const getRole = () => {
    const token = sessionStorage.getItem('token') ?? "";
    const decodedToken = jwtDecode(token) as Token;
    const role =decodedToken.role;
    return role;
}