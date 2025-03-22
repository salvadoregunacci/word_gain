export enum ViewType {
    filled = "filled",
    border = "border",
}

export enum ViewVariant {
    primary = "primary"
}

export enum Theme {
    dark = "dark",
    light = "light",
}

export enum AlertVariant {
    success = "success",
    warning = "warning",
    danger = "danger",
}

export interface IList {
    name: string,
    words: Record<string, string>
    lang_1: string,
    lang_2: string,
}

export interface IListWithCategory extends IList {
    category: string
}

export interface ICategory {
    name: string,
    lists: IList[],
}

export interface ISavedData {
    categories: ICategory[],
}

export interface IChallange {
    step: number,
    list: IList,
}

export interface IAlert {
    variant: AlertVariant,
    text: string,
    lifetime: number,
}