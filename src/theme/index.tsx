import * as React from "react"

export const DARK_COLORS = {
    BLACK: '#000',
    WHITE: '#FFF',
    DARK: '#17223b',
    LIGHT: '#f1f6f9',
    DARK_GREY: '#263859',
    GREY: '#6b778d',
    RED: '#ff6768',
    YELLOW: '#ffe05d',
    GREEN: '#4ecca3',
    ORANGE: '#ffc045',
}

export const LIGHT_COLORS = {
    BLACK: '#000',
    WHITE: '#FFF',
    DARK: '#17223b',
    LIGHT: '#f1f6f9',
    DARK_GREY: '#263859',
    GREY: '#6b778d',
    RED: '#ec524b',
    YELLOW: '#ffd700',
    GREEN: '#61b15a',
    ORANGE: '#f39233',
}

export enum ETheme {
    DARK = 'DARK',
    LIGHT = 'LIGHT',
}

export interface ITheme {
    DEFAULT_BG_COLOR: string
    DEFAULT_COLOR: string
}

const LightTheme: ITheme = {
    DEFAULT_BG_COLOR: LIGHT_COLORS.LIGHT,
    DEFAULT_COLOR: LIGHT_COLORS.DARK,
}

const DarkTheme: ITheme = {
    DEFAULT_BG_COLOR: DARK_COLORS.DARK,
    DEFAULT_COLOR: DARK_COLORS.LIGHT,
}

export const Theme = {
    LightTheme,
    DarkTheme,
}

export interface IThemedComponentProps {
    theme?: ITheme
}

export const ThemeContext = React.createContext(Theme.DarkTheme)