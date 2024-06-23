export type Account ={
    uuid: string;
    name: string;
    mail: string;
    password: string;
    role: string;
}

export type AccountCreate = {
    name: string;
    mail: string;
    password: string;
    role: string;
}