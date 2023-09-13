// apple will be 2, but gets error
const dpr = 1 || window.devicePixelRatio;
const INCH = 25.4; //1inch = 25.4 mm
// gw2780 = 27

export function mmToPx(screenInch: number, mm: number) {
  const { width, height } = window.screen;
  // not always 96, 27 is screen size in inch
  const ppi = getPPI(width, height, screenInch);
  return ((mm / INCH) * ppi) / dpr;
}

export function pxToMm(screenInch: number, px: number) {
  const { width, height } = window.screen;
  // not always 96, 27 is screen size in inch
  const ppi = getPPI(width, height, screenInch);
  return (px * INCH * dpr) / ppi;
}

function getPPI(hRes: number, vRes: number, diagSize: number) {
  const diagRes = Math.sqrt(Math.pow(hRes, 2) + Math.pow(vRes, 2));
  return Math.round(diagRes / diagSize);
}
