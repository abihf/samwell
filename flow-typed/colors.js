// @flow

declare module 'colors/safe' {
  declare interface Color {
    (str: string): string;

    black: Color;
    red: Color;
    green: Color;
    yellow: Color;
    blue: Color;
    magenta: Color;
    cyan: Color;
    white: Color;
    gray: Color;
    grey: Color;

    bgBlack: Color;
    bgRed: Color;
    bgGreen: Color;
    bgYellow: Color;
    bgBlue: Color;
    bgMagenta: Color;
    bgCyan: Color;
    bgWhite: Color;

    reset: Color;
    bold: Color;
    dim: Color;
    italic: Color;
    underline: Color;
    inverse: Color;
    hidden: Color;
    strikethrough: Color;

    rainbow: Color;
    zebra: Color;
    america: Color;
    trap: Color;
    random: Color;
    zalgo: Color;
  }

  declare module.exports: Color;
}
