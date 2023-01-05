export interface Dep {
    id: string,
    title: string,
    statusMsg: string,
    statusColor: DepStatusColors,
    added: boolean,
    expanded: boolean,
    supportMsgs: SupportMsgs,
    supportExpanded: boolean,
    thirdPartyItem: boolean,
    depInfo: DepInfo
}

export interface Deps {
    chainId: string,
    chain: Dep[],
    // chain: string,
    chainName: string,
    timestamp: number
}

export enum BkColours {
    White = "White",
    Black = "Black",
    Grey = "Grey",
    Custom = "Custom",
}

export enum Themes {
    NetMinded = "NetMinded",
    PTI = "PTI",
}

export enum DepStatusColors {
    Green = "Green",
    Amber = "Amber",
    Red = "Red",
    Default = "Grey",
}

export interface SupportMsgs {
    [DepStatusColors.Red]: string,
    [DepStatusColors.Amber]: string,
    [DepStatusColors.Green]: string,
    [DepStatusColors.Default]: string
}

export interface DepInfo {
    q1: string,
    q2: string,
    q3: string,
    q4: string,
    q5: string
}
