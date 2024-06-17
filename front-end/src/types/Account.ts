export type Account ={
    uuid: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    role: string;
}

export type AccountCreate = {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: string;
}