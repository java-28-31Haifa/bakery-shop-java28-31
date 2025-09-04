import type {Paths} from "./paths.ts";

export type NavItemType =    {
        route: Paths,
        itemName: string
    }

export type LoginData = {
    login: string,
    password: string
}