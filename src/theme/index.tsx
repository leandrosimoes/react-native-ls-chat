import * as React from "react"

export const COMMON_COLORS = {
    BLACK: '#000',
    WHITE: '#FFF',
    GREY: '#6b778d',
    DARK_GREY: '#263859',
}

export const DARK_COLORS = {
    DARK: '#17223b',
    LIGHT: '#f1f6f9',
    RED: '#ff6768',
    YELLOW: '#ffe05d',
    GREEN: '#4ecca3',
    ORANGE: '#ffc045',
    BLUE: '#2470a0',
    VERY_LIGHT_BLUE: '#b1e8ed',
    ...COMMON_COLORS
}

export const LIGHT_COLORS = {
    DARK: '#17223b',
    LIGHT: '#f1f6f9',
    RED: '#ec524b',
    YELLOW: '#ffd700',
    GREEN: '#61b15a',
    ORANGE: '#f39233',
    BLUE: '#6bc5d2',
    VERY_LIGHT_GREY: '#eff8ff',
    ...COMMON_COLORS
}

export enum ETheme {
    DARK = 'DARK',
    LIGHT = 'LIGHT',
}

export interface ITheme {
    DEFAULT_BG_COLOR: string
    DEFAULT_COLOR: string
    INPUT_BG_COLOR: string
    INPUT_FG_COLOR: string
    PRIMARY_BUTTON_BG_COLOR: string
    PRIMARY_BUTTON_FG_COLOR: string
    MESSAGE_BG_COLOR: string
}

const LightTheme: ITheme = {
    DEFAULT_BG_COLOR: LIGHT_COLORS.LIGHT,
    DEFAULT_COLOR: LIGHT_COLORS.DARK,
    INPUT_BG_COLOR: LIGHT_COLORS.GREY,
    INPUT_FG_COLOR: LIGHT_COLORS.DARK,
    PRIMARY_BUTTON_BG_COLOR: LIGHT_COLORS.BLUE,
    PRIMARY_BUTTON_FG_COLOR: LIGHT_COLORS.LIGHT,
    MESSAGE_BG_COLOR: LIGHT_COLORS.VERY_LIGHT_GREY,
}

const DarkTheme: ITheme = {
    DEFAULT_BG_COLOR: DARK_COLORS.DARK,
    DEFAULT_COLOR: DARK_COLORS.LIGHT,
    INPUT_BG_COLOR: DARK_COLORS.DARK_GREY,
    INPUT_FG_COLOR: DARK_COLORS.LIGHT,
    PRIMARY_BUTTON_BG_COLOR: DARK_COLORS.BLUE,
    PRIMARY_BUTTON_FG_COLOR: DARK_COLORS.LIGHT,
    MESSAGE_BG_COLOR: DARK_COLORS.VERY_LIGHT_BLUE,
}

export const Theme = {
    LightTheme,
    DarkTheme,
}

export interface IThemedComponentProps {
    theme?: ITheme
}

export const ThemeContext = React.createContext(Theme.DarkTheme)