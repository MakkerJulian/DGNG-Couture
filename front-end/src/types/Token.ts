import { JwtPayload } from "jwt-decode";

export type Token =  JwtPayload & {
    role: string;
};