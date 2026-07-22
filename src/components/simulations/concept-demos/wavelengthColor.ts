/**
 * Approximate visible-spectrum wavelength (nm) → sRGB, after Dan Bruton's
 * classic public-domain algorithm. Good enough for an educational color
 * swatch — not colorimetrically exact, but the hue order (violet → red)
 * and roughly correct saturation are all this demo needs.
 */
export function wavelengthToRGB(nm: number): string {
  let r = 0;
  let g = 0;
  let b = 0;

  if (nm >= 380 && nm < 440) {
    r = -(nm - 440) / (440 - 380);
    g = 0;
    b = 1;
  } else if (nm >= 440 && nm < 490) {
    r = 0;
    g = (nm - 440) / (490 - 440);
    b = 1;
  } else if (nm >= 490 && nm < 510) {
    r = 0;
    g = 1;
    b = -(nm - 510) / (510 - 490);
  } else if (nm >= 510 && nm < 580) {
    r = (nm - 510) / (580 - 510);
    g = 1;
    b = 0;
  } else if (nm >= 580 && nm < 645) {
    r = 1;
    g = -(nm - 645) / (645 - 580);
    b = 0;
  } else if (nm >= 645 && nm <= 780) {
    r = 1;
    g = 0;
    b = 0;
  }

  let factor = 1;
  if (nm >= 380 && nm < 420) factor = 0.3 + (0.7 * (nm - 380)) / (420 - 380);
  else if (nm >= 700 && nm <= 780) factor = 0.3 + (0.7 * (780 - nm)) / (780 - 700);

  const toByte = (c: number) => Math.round(255 * Math.pow(c * factor, 0.8));
  return `rgb(${toByte(r)}, ${toByte(g)}, ${toByte(b)})`;
}
