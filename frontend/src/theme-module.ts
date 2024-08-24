import { SimplePaletteColorOptions } from "@mui/material"


declare module '@mui/material/styles' {
    // allow configuration using `createTheme`
    interface Palette {
        white: SimplePaletteColorOptions
        gray: SimplePaletteColorOptions
        lime: SimplePaletteColorOptions
        lightgray: SimplePaletteColorOptions
        blue: SimplePaletteColorOptions
    }
    interface PaletteOptions {
        white?: SimplePaletteColorOptions
        gray?: SimplePaletteColorOptions
        lime?: SimplePaletteColorOptions
        lightgray?: SimplePaletteColorOptions
        blue?: SimplePaletteColorOptions
    }

    interface Theme {
        palette: Palette & {
            blue: SimplePaletteColorOptions
        }
    }

}

declare module '@mui/material/SvgIcon'{
    interface SvgIconPropsColorOverrides {
        white: true;
        gray: true
        lightgray: true
      }
}


declare module '@mui/material'{
    interface ButtonPropsColorOverrides {
        blue: true;
    }
}
