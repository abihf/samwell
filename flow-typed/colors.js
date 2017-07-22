
declare class ColorChain {
  black(str: string): ColorChain | string;
  red(str: string): ColorChain | string;
  green(str: string): ColorChain | string;
  yellow(str: string): ColorChain | string;
  blue(str: string): ColorChain | string;
  magenta(str: string): ColorChain | string;
  cyan(str: string): ColorChain | string;
  white(str: string): ColorChain | string;
  gray(str: string): ColorChain | string;
  grey(str: string): ColorChain | string;

  bgBlack(str: string): ColorChain | string;
  bgRed(str: string): ColorChain | string;
  bgGreen(str: string): ColorChain | string;
  bgYellow(str: string): ColorChain | string;
  bgBlue(str: string): ColorChain | string;
  bgMagenta(str: string): ColorChain | string;
  bgCyan(str: string): ColorChain | string;
  bgWhite(str: string): ColorChain | string;

  reset(str: string): ColorChain | string;
  bold(str: string): ColorChain | string;
  dim(str: string): ColorChain | string;
  italic(str: string): ColorChain | string;
  underline(str: string): ColorChain | string;
  inverse(str: string): ColorChain | string;
  hidden(str: string): ColorChain | string;
  strikethrough(str: string): ColorChain | string;

  rainbow(str: string): ColorChain | string;
  zebra(str: string): ColorChain | string;
  america(str: string): ColorChain | string;
  trap(str: string): ColorChain | string;
  random(str: string): ColorChain | string;
  zalgo(str: string): ColorChain | string;
}

declare module 'colors' {
  declare module.exports: ColorChain;
}

declare module 'colors/safe' {
  declare module.exports: ColorChain;
}
