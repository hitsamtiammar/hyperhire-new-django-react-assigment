import { PaletteColorOptions } from "@mui/material"

declare module '@mui/material/styles' {
    interface Theme {
        white: string
        gray: string;
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        white?: string
    }
    interface Palette {
        white: PaletteColorOptions
        gray: PaletteColorOptions
        lime: PaletteColorOptions
    }
    interface PaletteOptions {
        white?: PaletteColorOptions
        gray?: PaletteColorOptions
        lime?: PaletteColorOptions
    }
    
}

declare module '@mui/material/SvgIcon'{
    interface Palette {
        white: PaletteColorOptions
    }
    interface PaletteOptions {
        white?: PaletteColorOptions
    }
    interface SvgIconPropsColorOverrides {
        white: true;
        gray: true
      }
}
