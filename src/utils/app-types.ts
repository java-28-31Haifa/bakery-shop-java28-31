import type {Paths} from "./paths.ts";

export enum Roles {
    ALL, USER, ADMIN, NO_AUTH, USER_ONLY
}

export type NavItemType =    {
        route: Paths,
        itemName: string,
        role?: Roles
    }

export type LoginData = {
    login: string,
    password: string
}

export type SignUpData = {
    name:string,
    lastName?:string|null,
    email:string,
    password:string
}