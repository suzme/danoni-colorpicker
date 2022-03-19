(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = {exports: {}}).exports, mod), mod.exports;
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, {get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable});
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? {get: () => module.default, enumerable: true} : {value: module, enumerable: true})), module);
  };

  // node_modules/tinycolor2/tinycolor.js
  var require_tinycolor = __commonJS({
    "node_modules/tinycolor2/tinycolor.js"(exports, module) {
      (function(Math2) {
        var trimLeft = /^\s+/, trimRight = /\s+$/, tinyCounter = 0, mathRound = Math2.round, mathMin = Math2.min, mathMax = Math2.max, mathRandom = Math2.random;
        function tinycolor2(color, opts) {
          color = color ? color : "";
          opts = opts || {};
          if (color instanceof tinycolor2) {
            return color;
          }
          if (!(this instanceof tinycolor2)) {
            return new tinycolor2(color, opts);
          }
          var rgb = inputToRGB(color);
          this._originalInput = color, this._r = rgb.r, this._g = rgb.g, this._b = rgb.b, this._a = rgb.a, this._roundA = mathRound(100 * this._a) / 100, this._format = opts.format || rgb.format;
          this._gradientType = opts.gradientType;
          if (this._r < 1) {
            this._r = mathRound(this._r);
          }
          if (this._g < 1) {
            this._g = mathRound(this._g);
          }
          if (this._b < 1) {
            this._b = mathRound(this._b);
          }
          this._ok = rgb.ok;
          this._tc_id = tinyCounter++;
        }
        tinycolor2.prototype = {
          isDark: function() {
            return this.getBrightness() < 128;
          },
          isLight: function() {
            return !this.isDark();
          },
          isValid: function() {
            return this._ok;
          },
          getOriginalInput: function() {
            return this._originalInput;
          },
          getFormat: function() {
            return this._format;
          },
          getAlpha: function() {
            return this._a;
          },
          getBrightness: function() {
            var rgb = this.toRgb();
            return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1e3;
          },
          getLuminance: function() {
            var rgb = this.toRgb();
            var RsRGB, GsRGB, BsRGB, R, G, B;
            RsRGB = rgb.r / 255;
            GsRGB = rgb.g / 255;
            BsRGB = rgb.b / 255;
            if (RsRGB <= 0.03928) {
              R = RsRGB / 12.92;
            } else {
              R = Math2.pow((RsRGB + 0.055) / 1.055, 2.4);
            }
            if (GsRGB <= 0.03928) {
              G = GsRGB / 12.92;
            } else {
              G = Math2.pow((GsRGB + 0.055) / 1.055, 2.4);
            }
            if (BsRGB <= 0.03928) {
              B = BsRGB / 12.92;
            } else {
              B = Math2.pow((BsRGB + 0.055) / 1.055, 2.4);
            }
            return 0.2126 * R + 0.7152 * G + 0.0722 * B;
          },
          setAlpha: function(value) {
            this._a = boundAlpha(value);
            this._roundA = mathRound(100 * this._a) / 100;
            return this;
          },
          toHsv: function() {
            var hsv = rgbToHsv(this._r, this._g, this._b);
            return {h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a};
          },
          toHsvString: function() {
            var hsv = rgbToHsv(this._r, this._g, this._b);
            var h2 = mathRound(hsv.h * 360), s2 = mathRound(hsv.s * 100), v2 = mathRound(hsv.v * 100);
            return this._a == 1 ? "hsv(" + h2 + ", " + s2 + "%, " + v2 + "%)" : "hsva(" + h2 + ", " + s2 + "%, " + v2 + "%, " + this._roundA + ")";
          },
          toHsl: function() {
            var hsl = rgbToHsl(this._r, this._g, this._b);
            return {h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a};
          },
          toHslString: function() {
            var hsl = rgbToHsl(this._r, this._g, this._b);
            var h2 = mathRound(hsl.h * 360), s2 = mathRound(hsl.s * 100), l2 = mathRound(hsl.l * 100);
            return this._a == 1 ? "hsl(" + h2 + ", " + s2 + "%, " + l2 + "%)" : "hsla(" + h2 + ", " + s2 + "%, " + l2 + "%, " + this._roundA + ")";
          },
          toHex: function(allow3Char) {
            return rgbToHex(this._r, this._g, this._b, allow3Char);
          },
          toHexString: function(allow3Char) {
            return "#" + this.toHex(allow3Char);
          },
          toHex8: function(allow4Char) {
            return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
          },
          toHex8String: function(allow4Char) {
            return "#" + this.toHex8(allow4Char);
          },
          toRgb: function() {
            return {r: mathRound(this._r), g: mathRound(this._g), b: mathRound(this._b), a: this._a};
          },
          toRgbString: function() {
            return this._a == 1 ? "rgb(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" : "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
          },
          toPercentageRgb: function() {
            return {r: mathRound(bound01(this._r, 255) * 100) + "%", g: mathRound(bound01(this._g, 255) * 100) + "%", b: mathRound(bound01(this._b, 255) * 100) + "%", a: this._a};
          },
          toPercentageRgbString: function() {
            return this._a == 1 ? "rgb(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" : "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
          },
          toName: function() {
            if (this._a === 0) {
              return "transparent";
            }
            if (this._a < 1) {
              return false;
            }
            return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
          },
          toFilter: function(secondColor) {
            var hex8String = "#" + rgbaToArgbHex(this._r, this._g, this._b, this._a);
            var secondHex8String = hex8String;
            var gradientType = this._gradientType ? "GradientType = 1, " : "";
            if (secondColor) {
              var s2 = tinycolor2(secondColor);
              secondHex8String = "#" + rgbaToArgbHex(s2._r, s2._g, s2._b, s2._a);
            }
            return "progid:DXImageTransform.Microsoft.gradient(" + gradientType + "startColorstr=" + hex8String + ",endColorstr=" + secondHex8String + ")";
          },
          toString: function(format) {
            var formatSet = !!format;
            format = format || this._format;
            var formattedString = false;
            var hasAlpha = this._a < 1 && this._a >= 0;
            var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name");
            if (needsAlphaFormat) {
              if (format === "name" && this._a === 0) {
                return this.toName();
              }
              return this.toRgbString();
            }
            if (format === "rgb") {
              formattedString = this.toRgbString();
            }
            if (format === "prgb") {
              formattedString = this.toPercentageRgbString();
            }
            if (format === "hex" || format === "hex6") {
              formattedString = this.toHexString();
            }
            if (format === "hex3") {
              formattedString = this.toHexString(true);
            }
            if (format === "hex4") {
              formattedString = this.toHex8String(true);
            }
            if (format === "hex8") {
              formattedString = this.toHex8String();
            }
            if (format === "name") {
              formattedString = this.toName();
            }
            if (format === "hsl") {
              formattedString = this.toHslString();
            }
            if (format === "hsv") {
              formattedString = this.toHsvString();
            }
            return formattedString || this.toHexString();
          },
          clone: function() {
            return tinycolor2(this.toString());
          },
          _applyModification: function(fn, args) {
            var color = fn.apply(null, [this].concat([].slice.call(args)));
            this._r = color._r;
            this._g = color._g;
            this._b = color._b;
            this.setAlpha(color._a);
            return this;
          },
          lighten: function() {
            return this._applyModification(lighten, arguments);
          },
          brighten: function() {
            return this._applyModification(brighten, arguments);
          },
          darken: function() {
            return this._applyModification(darken, arguments);
          },
          desaturate: function() {
            return this._applyModification(desaturate, arguments);
          },
          saturate: function() {
            return this._applyModification(saturate, arguments);
          },
          greyscale: function() {
            return this._applyModification(greyscale, arguments);
          },
          spin: function() {
            return this._applyModification(spin, arguments);
          },
          _applyCombination: function(fn, args) {
            return fn.apply(null, [this].concat([].slice.call(args)));
          },
          analogous: function() {
            return this._applyCombination(analogous, arguments);
          },
          complement: function() {
            return this._applyCombination(complement, arguments);
          },
          monochromatic: function() {
            return this._applyCombination(monochromatic, arguments);
          },
          splitcomplement: function() {
            return this._applyCombination(splitcomplement, arguments);
          },
          triad: function() {
            return this._applyCombination(triad, arguments);
          },
          tetrad: function() {
            return this._applyCombination(tetrad, arguments);
          }
        };
        tinycolor2.fromRatio = function(color, opts) {
          if (typeof color == "object") {
            var newColor = {};
            for (var i2 in color) {
              if (color.hasOwnProperty(i2)) {
                if (i2 === "a") {
                  newColor[i2] = color[i2];
                } else {
                  newColor[i2] = convertToPercentage(color[i2]);
                }
              }
            }
            color = newColor;
          }
          return tinycolor2(color, opts);
        };
        function inputToRGB(color) {
          var rgb = {r: 0, g: 0, b: 0};
          var a2 = 1;
          var s2 = null;
          var v2 = null;
          var l2 = null;
          var ok = false;
          var format = false;
          if (typeof color == "string") {
            color = stringInputToObject(color);
          }
          if (typeof color == "object") {
            if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
              rgb = rgbToRgb(color.r, color.g, color.b);
              ok = true;
              format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
            } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
              s2 = convertToPercentage(color.s);
              v2 = convertToPercentage(color.v);
              rgb = hsvToRgb(color.h, s2, v2);
              ok = true;
              format = "hsv";
            } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
              s2 = convertToPercentage(color.s);
              l2 = convertToPercentage(color.l);
              rgb = hslToRgb(color.h, s2, l2);
              ok = true;
              format = "hsl";
            }
            if (color.hasOwnProperty("a")) {
              a2 = color.a;
            }
          }
          a2 = boundAlpha(a2);
          return {
            ok,
            format: color.format || format,
            r: mathMin(255, mathMax(rgb.r, 0)),
            g: mathMin(255, mathMax(rgb.g, 0)),
            b: mathMin(255, mathMax(rgb.b, 0)),
            a: a2
          };
        }
        function rgbToRgb(r2, g2, b2) {
          return {
            r: bound01(r2, 255) * 255,
            g: bound01(g2, 255) * 255,
            b: bound01(b2, 255) * 255
          };
        }
        function rgbToHsl(r2, g2, b2) {
          r2 = bound01(r2, 255);
          g2 = bound01(g2, 255);
          b2 = bound01(b2, 255);
          var max = mathMax(r2, g2, b2), min = mathMin(r2, g2, b2);
          var h2, s2, l2 = (max + min) / 2;
          if (max == min) {
            h2 = s2 = 0;
          } else {
            var d2 = max - min;
            s2 = l2 > 0.5 ? d2 / (2 - max - min) : d2 / (max + min);
            switch (max) {
              case r2:
                h2 = (g2 - b2) / d2 + (g2 < b2 ? 6 : 0);
                break;
              case g2:
                h2 = (b2 - r2) / d2 + 2;
                break;
              case b2:
                h2 = (r2 - g2) / d2 + 4;
                break;
            }
            h2 /= 6;
          }
          return {h: h2, s: s2, l: l2};
        }
        function hslToRgb(h2, s2, l2) {
          var r2, g2, b2;
          h2 = bound01(h2, 360);
          s2 = bound01(s2, 100);
          l2 = bound01(l2, 100);
          function hue2rgb(p3, q2, t2) {
            if (t2 < 0)
              t2 += 1;
            if (t2 > 1)
              t2 -= 1;
            if (t2 < 1 / 6)
              return p3 + (q2 - p3) * 6 * t2;
            if (t2 < 1 / 2)
              return q2;
            if (t2 < 2 / 3)
              return p3 + (q2 - p3) * (2 / 3 - t2) * 6;
            return p3;
          }
          if (s2 === 0) {
            r2 = g2 = b2 = l2;
          } else {
            var q = l2 < 0.5 ? l2 * (1 + s2) : l2 + s2 - l2 * s2;
            var p2 = 2 * l2 - q;
            r2 = hue2rgb(p2, q, h2 + 1 / 3);
            g2 = hue2rgb(p2, q, h2);
            b2 = hue2rgb(p2, q, h2 - 1 / 3);
          }
          return {r: r2 * 255, g: g2 * 255, b: b2 * 255};
        }
        function rgbToHsv(r2, g2, b2) {
          r2 = bound01(r2, 255);
          g2 = bound01(g2, 255);
          b2 = bound01(b2, 255);
          var max = mathMax(r2, g2, b2), min = mathMin(r2, g2, b2);
          var h2, s2, v2 = max;
          var d2 = max - min;
          s2 = max === 0 ? 0 : d2 / max;
          if (max == min) {
            h2 = 0;
          } else {
            switch (max) {
              case r2:
                h2 = (g2 - b2) / d2 + (g2 < b2 ? 6 : 0);
                break;
              case g2:
                h2 = (b2 - r2) / d2 + 2;
                break;
              case b2:
                h2 = (r2 - g2) / d2 + 4;
                break;
            }
            h2 /= 6;
          }
          return {h: h2, s: s2, v: v2};
        }
        function hsvToRgb(h2, s2, v2) {
          h2 = bound01(h2, 360) * 6;
          s2 = bound01(s2, 100);
          v2 = bound01(v2, 100);
          var i2 = Math2.floor(h2), f2 = h2 - i2, p2 = v2 * (1 - s2), q = v2 * (1 - f2 * s2), t2 = v2 * (1 - (1 - f2) * s2), mod = i2 % 6, r2 = [v2, q, p2, p2, t2, v2][mod], g2 = [t2, v2, v2, q, p2, p2][mod], b2 = [p2, p2, t2, v2, v2, q][mod];
          return {r: r2 * 255, g: g2 * 255, b: b2 * 255};
        }
        function rgbToHex(r2, g2, b2, allow3Char) {
          var hex = [
            pad2(mathRound(r2).toString(16)),
            pad2(mathRound(g2).toString(16)),
            pad2(mathRound(b2).toString(16))
          ];
          if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
            return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
          }
          return hex.join("");
        }
        function rgbaToHex(r2, g2, b2, a2, allow4Char) {
          var hex = [
            pad2(mathRound(r2).toString(16)),
            pad2(mathRound(g2).toString(16)),
            pad2(mathRound(b2).toString(16)),
            pad2(convertDecimalToHex(a2))
          ];
          if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
            return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
          }
          return hex.join("");
        }
        function rgbaToArgbHex(r2, g2, b2, a2) {
          var hex = [
            pad2(convertDecimalToHex(a2)),
            pad2(mathRound(r2).toString(16)),
            pad2(mathRound(g2).toString(16)),
            pad2(mathRound(b2).toString(16))
          ];
          return hex.join("");
        }
        tinycolor2.equals = function(color1, color2) {
          if (!color1 || !color2) {
            return false;
          }
          return tinycolor2(color1).toRgbString() == tinycolor2(color2).toRgbString();
        };
        tinycolor2.random = function() {
          return tinycolor2.fromRatio({
            r: mathRandom(),
            g: mathRandom(),
            b: mathRandom()
          });
        };
        function desaturate(color, amount) {
          amount = amount === 0 ? 0 : amount || 10;
          var hsl = tinycolor2(color).toHsl();
          hsl.s -= amount / 100;
          hsl.s = clamp01(hsl.s);
          return tinycolor2(hsl);
        }
        function saturate(color, amount) {
          amount = amount === 0 ? 0 : amount || 10;
          var hsl = tinycolor2(color).toHsl();
          hsl.s += amount / 100;
          hsl.s = clamp01(hsl.s);
          return tinycolor2(hsl);
        }
        function greyscale(color) {
          return tinycolor2(color).desaturate(100);
        }
        function lighten(color, amount) {
          amount = amount === 0 ? 0 : amount || 10;
          var hsl = tinycolor2(color).toHsl();
          hsl.l += amount / 100;
          hsl.l = clamp01(hsl.l);
          return tinycolor2(hsl);
        }
        function brighten(color, amount) {
          amount = amount === 0 ? 0 : amount || 10;
          var rgb = tinycolor2(color).toRgb();
          rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * -(amount / 100))));
          rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * -(amount / 100))));
          rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * -(amount / 100))));
          return tinycolor2(rgb);
        }
        function darken(color, amount) {
          amount = amount === 0 ? 0 : amount || 10;
          var hsl = tinycolor2(color).toHsl();
          hsl.l -= amount / 100;
          hsl.l = clamp01(hsl.l);
          return tinycolor2(hsl);
        }
        function spin(color, amount) {
          var hsl = tinycolor2(color).toHsl();
          var hue = (hsl.h + amount) % 360;
          hsl.h = hue < 0 ? 360 + hue : hue;
          return tinycolor2(hsl);
        }
        function complement(color) {
          var hsl = tinycolor2(color).toHsl();
          hsl.h = (hsl.h + 180) % 360;
          return tinycolor2(hsl);
        }
        function triad(color) {
          var hsl = tinycolor2(color).toHsl();
          var h2 = hsl.h;
          return [
            tinycolor2(color),
            tinycolor2({h: (h2 + 120) % 360, s: hsl.s, l: hsl.l}),
            tinycolor2({h: (h2 + 240) % 360, s: hsl.s, l: hsl.l})
          ];
        }
        function tetrad(color) {
          var hsl = tinycolor2(color).toHsl();
          var h2 = hsl.h;
          return [
            tinycolor2(color),
            tinycolor2({h: (h2 + 90) % 360, s: hsl.s, l: hsl.l}),
            tinycolor2({h: (h2 + 180) % 360, s: hsl.s, l: hsl.l}),
            tinycolor2({h: (h2 + 270) % 360, s: hsl.s, l: hsl.l})
          ];
        }
        function splitcomplement(color) {
          var hsl = tinycolor2(color).toHsl();
          var h2 = hsl.h;
          return [
            tinycolor2(color),
            tinycolor2({h: (h2 + 72) % 360, s: hsl.s, l: hsl.l}),
            tinycolor2({h: (h2 + 216) % 360, s: hsl.s, l: hsl.l})
          ];
        }
        function analogous(color, results, slices) {
          results = results || 6;
          slices = slices || 30;
          var hsl = tinycolor2(color).toHsl();
          var part = 360 / slices;
          var ret = [tinycolor2(color)];
          for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results; ) {
            hsl.h = (hsl.h + part) % 360;
            ret.push(tinycolor2(hsl));
          }
          return ret;
        }
        function monochromatic(color, results) {
          results = results || 6;
          var hsv = tinycolor2(color).toHsv();
          var h2 = hsv.h, s2 = hsv.s, v2 = hsv.v;
          var ret = [];
          var modification = 1 / results;
          while (results--) {
            ret.push(tinycolor2({h: h2, s: s2, v: v2}));
            v2 = (v2 + modification) % 1;
          }
          return ret;
        }
        tinycolor2.mix = function(color1, color2, amount) {
          amount = amount === 0 ? 0 : amount || 50;
          var rgb1 = tinycolor2(color1).toRgb();
          var rgb2 = tinycolor2(color2).toRgb();
          var p2 = amount / 100;
          var rgba = {
            r: (rgb2.r - rgb1.r) * p2 + rgb1.r,
            g: (rgb2.g - rgb1.g) * p2 + rgb1.g,
            b: (rgb2.b - rgb1.b) * p2 + rgb1.b,
            a: (rgb2.a - rgb1.a) * p2 + rgb1.a
          };
          return tinycolor2(rgba);
        };
        tinycolor2.readability = function(color1, color2) {
          var c1 = tinycolor2(color1);
          var c2 = tinycolor2(color2);
          return (Math2.max(c1.getLuminance(), c2.getLuminance()) + 0.05) / (Math2.min(c1.getLuminance(), c2.getLuminance()) + 0.05);
        };
        tinycolor2.isReadable = function(color1, color2, wcag2) {
          var readability = tinycolor2.readability(color1, color2);
          var wcag2Parms, out;
          out = false;
          wcag2Parms = validateWCAG2Parms(wcag2);
          switch (wcag2Parms.level + wcag2Parms.size) {
            case "AAsmall":
            case "AAAlarge":
              out = readability >= 4.5;
              break;
            case "AAlarge":
              out = readability >= 3;
              break;
            case "AAAsmall":
              out = readability >= 7;
              break;
          }
          return out;
        };
        tinycolor2.mostReadable = function(baseColor, colorList, args) {
          var bestColor = null;
          var bestScore = 0;
          var readability;
          var includeFallbackColors, level, size;
          args = args || {};
          includeFallbackColors = args.includeFallbackColors;
          level = args.level;
          size = args.size;
          for (var i2 = 0; i2 < colorList.length; i2++) {
            readability = tinycolor2.readability(baseColor, colorList[i2]);
            if (readability > bestScore) {
              bestScore = readability;
              bestColor = tinycolor2(colorList[i2]);
            }
          }
          if (tinycolor2.isReadable(baseColor, bestColor, {"level": level, "size": size}) || !includeFallbackColors) {
            return bestColor;
          } else {
            args.includeFallbackColors = false;
            return tinycolor2.mostReadable(baseColor, ["#fff", "#000"], args);
          }
        };
        var names = tinycolor2.names = {
          aliceblue: "f0f8ff",
          antiquewhite: "faebd7",
          aqua: "0ff",
          aquamarine: "7fffd4",
          azure: "f0ffff",
          beige: "f5f5dc",
          bisque: "ffe4c4",
          black: "000",
          blanchedalmond: "ffebcd",
          blue: "00f",
          blueviolet: "8a2be2",
          brown: "a52a2a",
          burlywood: "deb887",
          burntsienna: "ea7e5d",
          cadetblue: "5f9ea0",
          chartreuse: "7fff00",
          chocolate: "d2691e",
          coral: "ff7f50",
          cornflowerblue: "6495ed",
          cornsilk: "fff8dc",
          crimson: "dc143c",
          cyan: "0ff",
          darkblue: "00008b",
          darkcyan: "008b8b",
          darkgoldenrod: "b8860b",
          darkgray: "a9a9a9",
          darkgreen: "006400",
          darkgrey: "a9a9a9",
          darkkhaki: "bdb76b",
          darkmagenta: "8b008b",
          darkolivegreen: "556b2f",
          darkorange: "ff8c00",
          darkorchid: "9932cc",
          darkred: "8b0000",
          darksalmon: "e9967a",
          darkseagreen: "8fbc8f",
          darkslateblue: "483d8b",
          darkslategray: "2f4f4f",
          darkslategrey: "2f4f4f",
          darkturquoise: "00ced1",
          darkviolet: "9400d3",
          deeppink: "ff1493",
          deepskyblue: "00bfff",
          dimgray: "696969",
          dimgrey: "696969",
          dodgerblue: "1e90ff",
          firebrick: "b22222",
          floralwhite: "fffaf0",
          forestgreen: "228b22",
          fuchsia: "f0f",
          gainsboro: "dcdcdc",
          ghostwhite: "f8f8ff",
          gold: "ffd700",
          goldenrod: "daa520",
          gray: "808080",
          green: "008000",
          greenyellow: "adff2f",
          grey: "808080",
          honeydew: "f0fff0",
          hotpink: "ff69b4",
          indianred: "cd5c5c",
          indigo: "4b0082",
          ivory: "fffff0",
          khaki: "f0e68c",
          lavender: "e6e6fa",
          lavenderblush: "fff0f5",
          lawngreen: "7cfc00",
          lemonchiffon: "fffacd",
          lightblue: "add8e6",
          lightcoral: "f08080",
          lightcyan: "e0ffff",
          lightgoldenrodyellow: "fafad2",
          lightgray: "d3d3d3",
          lightgreen: "90ee90",
          lightgrey: "d3d3d3",
          lightpink: "ffb6c1",
          lightsalmon: "ffa07a",
          lightseagreen: "20b2aa",
          lightskyblue: "87cefa",
          lightslategray: "789",
          lightslategrey: "789",
          lightsteelblue: "b0c4de",
          lightyellow: "ffffe0",
          lime: "0f0",
          limegreen: "32cd32",
          linen: "faf0e6",
          magenta: "f0f",
          maroon: "800000",
          mediumaquamarine: "66cdaa",
          mediumblue: "0000cd",
          mediumorchid: "ba55d3",
          mediumpurple: "9370db",
          mediumseagreen: "3cb371",
          mediumslateblue: "7b68ee",
          mediumspringgreen: "00fa9a",
          mediumturquoise: "48d1cc",
          mediumvioletred: "c71585",
          midnightblue: "191970",
          mintcream: "f5fffa",
          mistyrose: "ffe4e1",
          moccasin: "ffe4b5",
          navajowhite: "ffdead",
          navy: "000080",
          oldlace: "fdf5e6",
          olive: "808000",
          olivedrab: "6b8e23",
          orange: "ffa500",
          orangered: "ff4500",
          orchid: "da70d6",
          palegoldenrod: "eee8aa",
          palegreen: "98fb98",
          paleturquoise: "afeeee",
          palevioletred: "db7093",
          papayawhip: "ffefd5",
          peachpuff: "ffdab9",
          peru: "cd853f",
          pink: "ffc0cb",
          plum: "dda0dd",
          powderblue: "b0e0e6",
          purple: "800080",
          rebeccapurple: "663399",
          red: "f00",
          rosybrown: "bc8f8f",
          royalblue: "4169e1",
          saddlebrown: "8b4513",
          salmon: "fa8072",
          sandybrown: "f4a460",
          seagreen: "2e8b57",
          seashell: "fff5ee",
          sienna: "a0522d",
          silver: "c0c0c0",
          skyblue: "87ceeb",
          slateblue: "6a5acd",
          slategray: "708090",
          slategrey: "708090",
          snow: "fffafa",
          springgreen: "00ff7f",
          steelblue: "4682b4",
          tan: "d2b48c",
          teal: "008080",
          thistle: "d8bfd8",
          tomato: "ff6347",
          turquoise: "40e0d0",
          violet: "ee82ee",
          wheat: "f5deb3",
          white: "fff",
          whitesmoke: "f5f5f5",
          yellow: "ff0",
          yellowgreen: "9acd32"
        };
        var hexNames = tinycolor2.hexNames = flip(names);
        function flip(o2) {
          var flipped = {};
          for (var i2 in o2) {
            if (o2.hasOwnProperty(i2)) {
              flipped[o2[i2]] = i2;
            }
          }
          return flipped;
        }
        function boundAlpha(a2) {
          a2 = parseFloat(a2);
          if (isNaN(a2) || a2 < 0 || a2 > 1) {
            a2 = 1;
          }
          return a2;
        }
        function bound01(n2, max) {
          if (isOnePointZero(n2)) {
            n2 = "100%";
          }
          var processPercent = isPercentage(n2);
          n2 = mathMin(max, mathMax(0, parseFloat(n2)));
          if (processPercent) {
            n2 = parseInt(n2 * max, 10) / 100;
          }
          if (Math2.abs(n2 - max) < 1e-6) {
            return 1;
          }
          return n2 % max / parseFloat(max);
        }
        function clamp01(val) {
          return mathMin(1, mathMax(0, val));
        }
        function parseIntFromHex(val) {
          return parseInt(val, 16);
        }
        function isOnePointZero(n2) {
          return typeof n2 == "string" && n2.indexOf(".") != -1 && parseFloat(n2) === 1;
        }
        function isPercentage(n2) {
          return typeof n2 === "string" && n2.indexOf("%") != -1;
        }
        function pad2(c2) {
          return c2.length == 1 ? "0" + c2 : "" + c2;
        }
        function convertToPercentage(n2) {
          if (n2 <= 1) {
            n2 = n2 * 100 + "%";
          }
          return n2;
        }
        function convertDecimalToHex(d2) {
          return Math2.round(parseFloat(d2) * 255).toString(16);
        }
        function convertHexToDecimal(h2) {
          return parseIntFromHex(h2) / 255;
        }
        var matchers = function() {
          var CSS_INTEGER = "[-\\+]?\\d+%?";
          var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";
          var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";
          var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
          var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
          return {
            CSS_UNIT: new RegExp(CSS_UNIT),
            rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
            rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
            hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
            hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
            hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
            hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
            hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
            hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
            hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
            hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
          };
        }();
        function isValidCSSUnit(color) {
          return !!matchers.CSS_UNIT.exec(color);
        }
        function stringInputToObject(color) {
          color = color.replace(trimLeft, "").replace(trimRight, "").toLowerCase();
          var named = false;
          if (names[color]) {
            color = names[color];
            named = true;
          } else if (color == "transparent") {
            return {r: 0, g: 0, b: 0, a: 0, format: "name"};
          }
          var match;
          if (match = matchers.rgb.exec(color)) {
            return {r: match[1], g: match[2], b: match[3]};
          }
          if (match = matchers.rgba.exec(color)) {
            return {r: match[1], g: match[2], b: match[3], a: match[4]};
          }
          if (match = matchers.hsl.exec(color)) {
            return {h: match[1], s: match[2], l: match[3]};
          }
          if (match = matchers.hsla.exec(color)) {
            return {h: match[1], s: match[2], l: match[3], a: match[4]};
          }
          if (match = matchers.hsv.exec(color)) {
            return {h: match[1], s: match[2], v: match[3]};
          }
          if (match = matchers.hsva.exec(color)) {
            return {h: match[1], s: match[2], v: match[3], a: match[4]};
          }
          if (match = matchers.hex8.exec(color)) {
            return {
              r: parseIntFromHex(match[1]),
              g: parseIntFromHex(match[2]),
              b: parseIntFromHex(match[3]),
              a: convertHexToDecimal(match[4]),
              format: named ? "name" : "hex8"
            };
          }
          if (match = matchers.hex6.exec(color)) {
            return {
              r: parseIntFromHex(match[1]),
              g: parseIntFromHex(match[2]),
              b: parseIntFromHex(match[3]),
              format: named ? "name" : "hex"
            };
          }
          if (match = matchers.hex4.exec(color)) {
            return {
              r: parseIntFromHex(match[1] + "" + match[1]),
              g: parseIntFromHex(match[2] + "" + match[2]),
              b: parseIntFromHex(match[3] + "" + match[3]),
              a: convertHexToDecimal(match[4] + "" + match[4]),
              format: named ? "name" : "hex8"
            };
          }
          if (match = matchers.hex3.exec(color)) {
            return {
              r: parseIntFromHex(match[1] + "" + match[1]),
              g: parseIntFromHex(match[2] + "" + match[2]),
              b: parseIntFromHex(match[3] + "" + match[3]),
              format: named ? "name" : "hex"
            };
          }
          return false;
        }
        function validateWCAG2Parms(parms) {
          var level, size;
          parms = parms || {"level": "AA", "size": "small"};
          level = (parms.level || "AA").toUpperCase();
          size = (parms.size || "small").toLowerCase();
          if (level !== "AA" && level !== "AAA") {
            level = "AA";
          }
          if (size !== "small" && size !== "large") {
            size = "small";
          }
          return {"level": level, "size": size};
        }
        if (typeof module !== "undefined" && module.exports) {
          module.exports = tinycolor2;
        } else if (typeof define === "function" && define.amd) {
          define(function() {
            return tinycolor2;
          });
        } else {
          window.tinycolor = tinycolor2;
        }
      })(Math);
    }
  });

  // node_modules/preact/dist/preact.module.js
  var n;
  var l;
  var u;
  var i;
  var t;
  var o;
  var r;
  var f;
  var e = {};
  var c = [];
  var s = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
  function a(n2, l2) {
    for (var u2 in l2)
      n2[u2] = l2[u2];
    return n2;
  }
  function h(n2) {
    var l2 = n2.parentNode;
    l2 && l2.removeChild(n2);
  }
  function v(l2, u2, i2) {
    var t2, o2, r2, f2 = {};
    for (r2 in u2)
      r2 == "key" ? t2 = u2[r2] : r2 == "ref" ? o2 = u2[r2] : f2[r2] = u2[r2];
    if (arguments.length > 2 && (f2.children = arguments.length > 3 ? n.call(arguments, 2) : i2), typeof l2 == "function" && l2.defaultProps != null)
      for (r2 in l2.defaultProps)
        f2[r2] === void 0 && (f2[r2] = l2.defaultProps[r2]);
    return y(l2, f2, t2, o2, null);
  }
  function y(n2, i2, t2, o2, r2) {
    var f2 = {type: n2, props: i2, key: t2, ref: o2, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: r2 == null ? ++u : r2};
    return r2 == null && l.vnode != null && l.vnode(f2), f2;
  }
  function p() {
    return {current: null};
  }
  function d(n2) {
    return n2.children;
  }
  function _(n2, l2) {
    this.props = n2, this.context = l2;
  }
  function k(n2, l2) {
    if (l2 == null)
      return n2.__ ? k(n2.__, n2.__.__k.indexOf(n2) + 1) : null;
    for (var u2; l2 < n2.__k.length; l2++)
      if ((u2 = n2.__k[l2]) != null && u2.__e != null)
        return u2.__e;
    return typeof n2.type == "function" ? k(n2) : null;
  }
  function b(n2) {
    var l2, u2;
    if ((n2 = n2.__) != null && n2.__c != null) {
      for (n2.__e = n2.__c.base = null, l2 = 0; l2 < n2.__k.length; l2++)
        if ((u2 = n2.__k[l2]) != null && u2.__e != null) {
          n2.__e = n2.__c.base = u2.__e;
          break;
        }
      return b(n2);
    }
  }
  function m(n2) {
    (!n2.__d && (n2.__d = true) && t.push(n2) && !g.__r++ || r !== l.debounceRendering) && ((r = l.debounceRendering) || o)(g);
  }
  function g() {
    for (var n2; g.__r = t.length; )
      n2 = t.sort(function(n3, l2) {
        return n3.__v.__b - l2.__v.__b;
      }), t = [], n2.some(function(n3) {
        var l2, u2, i2, t2, o2, r2;
        n3.__d && (o2 = (t2 = (l2 = n3).__v).__e, (r2 = l2.__P) && (u2 = [], (i2 = a({}, t2)).__v = t2.__v + 1, j(r2, t2, i2, l2.__n, r2.ownerSVGElement !== void 0, t2.__h != null ? [o2] : null, u2, o2 == null ? k(t2) : o2, t2.__h), z(u2, t2), t2.__e != o2 && b(t2)));
      });
  }
  function w(n2, l2, u2, i2, t2, o2, r2, f2, s2, a2) {
    var h2, v2, p2, _2, b2, m2, g2, w2 = i2 && i2.__k || c, A = w2.length;
    for (u2.__k = [], h2 = 0; h2 < l2.length; h2++)
      if ((_2 = u2.__k[h2] = (_2 = l2[h2]) == null || typeof _2 == "boolean" ? null : typeof _2 == "string" || typeof _2 == "number" || typeof _2 == "bigint" ? y(null, _2, null, null, _2) : Array.isArray(_2) ? y(d, {children: _2}, null, null, null) : _2.__b > 0 ? y(_2.type, _2.props, _2.key, null, _2.__v) : _2) != null) {
        if (_2.__ = u2, _2.__b = u2.__b + 1, (p2 = w2[h2]) === null || p2 && _2.key == p2.key && _2.type === p2.type)
          w2[h2] = void 0;
        else
          for (v2 = 0; v2 < A; v2++) {
            if ((p2 = w2[v2]) && _2.key == p2.key && _2.type === p2.type) {
              w2[v2] = void 0;
              break;
            }
            p2 = null;
          }
        j(n2, _2, p2 = p2 || e, t2, o2, r2, f2, s2, a2), b2 = _2.__e, (v2 = _2.ref) && p2.ref != v2 && (g2 || (g2 = []), p2.ref && g2.push(p2.ref, null, _2), g2.push(v2, _2.__c || b2, _2)), b2 != null ? (m2 == null && (m2 = b2), typeof _2.type == "function" && _2.__k === p2.__k ? _2.__d = s2 = x(_2, s2, n2) : s2 = P(n2, _2, p2, w2, b2, s2), typeof u2.type == "function" && (u2.__d = s2)) : s2 && p2.__e == s2 && s2.parentNode != n2 && (s2 = k(p2));
      }
    for (u2.__e = m2, h2 = A; h2--; )
      w2[h2] != null && (typeof u2.type == "function" && w2[h2].__e != null && w2[h2].__e == u2.__d && (u2.__d = k(i2, h2 + 1)), N(w2[h2], w2[h2]));
    if (g2)
      for (h2 = 0; h2 < g2.length; h2++)
        M(g2[h2], g2[++h2], g2[++h2]);
  }
  function x(n2, l2, u2) {
    for (var i2, t2 = n2.__k, o2 = 0; t2 && o2 < t2.length; o2++)
      (i2 = t2[o2]) && (i2.__ = n2, l2 = typeof i2.type == "function" ? x(i2, l2, u2) : P(u2, i2, i2, t2, i2.__e, l2));
    return l2;
  }
  function P(n2, l2, u2, i2, t2, o2) {
    var r2, f2, e2;
    if (l2.__d !== void 0)
      r2 = l2.__d, l2.__d = void 0;
    else if (u2 == null || t2 != o2 || t2.parentNode == null)
      n:
        if (o2 == null || o2.parentNode !== n2)
          n2.appendChild(t2), r2 = null;
        else {
          for (f2 = o2, e2 = 0; (f2 = f2.nextSibling) && e2 < i2.length; e2 += 2)
            if (f2 == t2)
              break n;
          n2.insertBefore(t2, o2), r2 = o2;
        }
    return r2 !== void 0 ? r2 : t2.nextSibling;
  }
  function C(n2, l2, u2, i2, t2) {
    var o2;
    for (o2 in u2)
      o2 === "children" || o2 === "key" || o2 in l2 || H(n2, o2, null, u2[o2], i2);
    for (o2 in l2)
      t2 && typeof l2[o2] != "function" || o2 === "children" || o2 === "key" || o2 === "value" || o2 === "checked" || u2[o2] === l2[o2] || H(n2, o2, l2[o2], u2[o2], i2);
  }
  function $(n2, l2, u2) {
    l2[0] === "-" ? n2.setProperty(l2, u2) : n2[l2] = u2 == null ? "" : typeof u2 != "number" || s.test(l2) ? u2 : u2 + "px";
  }
  function H(n2, l2, u2, i2, t2) {
    var o2;
    n:
      if (l2 === "style")
        if (typeof u2 == "string")
          n2.style.cssText = u2;
        else {
          if (typeof i2 == "string" && (n2.style.cssText = i2 = ""), i2)
            for (l2 in i2)
              u2 && l2 in u2 || $(n2.style, l2, "");
          if (u2)
            for (l2 in u2)
              i2 && u2[l2] === i2[l2] || $(n2.style, l2, u2[l2]);
        }
      else if (l2[0] === "o" && l2[1] === "n")
        o2 = l2 !== (l2 = l2.replace(/Capture$/, "")), l2 = l2.toLowerCase() in n2 ? l2.toLowerCase().slice(2) : l2.slice(2), n2.l || (n2.l = {}), n2.l[l2 + o2] = u2, u2 ? i2 || n2.addEventListener(l2, o2 ? T : I, o2) : n2.removeEventListener(l2, o2 ? T : I, o2);
      else if (l2 !== "dangerouslySetInnerHTML") {
        if (t2)
          l2 = l2.replace(/xlink[H:h]/, "h").replace(/sName$/, "s");
        else if (l2 !== "href" && l2 !== "list" && l2 !== "form" && l2 !== "tabIndex" && l2 !== "download" && l2 in n2)
          try {
            n2[l2] = u2 == null ? "" : u2;
            break n;
          } catch (n3) {
          }
        typeof u2 == "function" || (u2 != null && (u2 !== false || l2[0] === "a" && l2[1] === "r") ? n2.setAttribute(l2, u2) : n2.removeAttribute(l2));
      }
  }
  function I(n2) {
    this.l[n2.type + false](l.event ? l.event(n2) : n2);
  }
  function T(n2) {
    this.l[n2.type + true](l.event ? l.event(n2) : n2);
  }
  function j(n2, u2, i2, t2, o2, r2, f2, e2, c2) {
    var s2, h2, v2, y2, p2, k2, b2, m2, g2, x2, A, P2 = u2.type;
    if (u2.constructor !== void 0)
      return null;
    i2.__h != null && (c2 = i2.__h, e2 = u2.__e = i2.__e, u2.__h = null, r2 = [e2]), (s2 = l.__b) && s2(u2);
    try {
      n:
        if (typeof P2 == "function") {
          if (m2 = u2.props, g2 = (s2 = P2.contextType) && t2[s2.__c], x2 = s2 ? g2 ? g2.props.value : s2.__ : t2, i2.__c ? b2 = (h2 = u2.__c = i2.__c).__ = h2.__E : ("prototype" in P2 && P2.prototype.render ? u2.__c = h2 = new P2(m2, x2) : (u2.__c = h2 = new _(m2, x2), h2.constructor = P2, h2.render = O), g2 && g2.sub(h2), h2.props = m2, h2.state || (h2.state = {}), h2.context = x2, h2.__n = t2, v2 = h2.__d = true, h2.__h = []), h2.__s == null && (h2.__s = h2.state), P2.getDerivedStateFromProps != null && (h2.__s == h2.state && (h2.__s = a({}, h2.__s)), a(h2.__s, P2.getDerivedStateFromProps(m2, h2.__s))), y2 = h2.props, p2 = h2.state, v2)
            P2.getDerivedStateFromProps == null && h2.componentWillMount != null && h2.componentWillMount(), h2.componentDidMount != null && h2.__h.push(h2.componentDidMount);
          else {
            if (P2.getDerivedStateFromProps == null && m2 !== y2 && h2.componentWillReceiveProps != null && h2.componentWillReceiveProps(m2, x2), !h2.__e && h2.shouldComponentUpdate != null && h2.shouldComponentUpdate(m2, h2.__s, x2) === false || u2.__v === i2.__v) {
              h2.props = m2, h2.state = h2.__s, u2.__v !== i2.__v && (h2.__d = false), h2.__v = u2, u2.__e = i2.__e, u2.__k = i2.__k, u2.__k.forEach(function(n3) {
                n3 && (n3.__ = u2);
              }), h2.__h.length && f2.push(h2);
              break n;
            }
            h2.componentWillUpdate != null && h2.componentWillUpdate(m2, h2.__s, x2), h2.componentDidUpdate != null && h2.__h.push(function() {
              h2.componentDidUpdate(y2, p2, k2);
            });
          }
          h2.context = x2, h2.props = m2, h2.state = h2.__s, (s2 = l.__r) && s2(u2), h2.__d = false, h2.__v = u2, h2.__P = n2, s2 = h2.render(h2.props, h2.state, h2.context), h2.state = h2.__s, h2.getChildContext != null && (t2 = a(a({}, t2), h2.getChildContext())), v2 || h2.getSnapshotBeforeUpdate == null || (k2 = h2.getSnapshotBeforeUpdate(y2, p2)), A = s2 != null && s2.type === d && s2.key == null ? s2.props.children : s2, w(n2, Array.isArray(A) ? A : [A], u2, i2, t2, o2, r2, f2, e2, c2), h2.base = u2.__e, u2.__h = null, h2.__h.length && f2.push(h2), b2 && (h2.__E = h2.__ = null), h2.__e = false;
        } else
          r2 == null && u2.__v === i2.__v ? (u2.__k = i2.__k, u2.__e = i2.__e) : u2.__e = L(i2.__e, u2, i2, t2, o2, r2, f2, c2);
      (s2 = l.diffed) && s2(u2);
    } catch (n3) {
      u2.__v = null, (c2 || r2 != null) && (u2.__e = e2, u2.__h = !!c2, r2[r2.indexOf(e2)] = null), l.__e(n3, u2, i2);
    }
  }
  function z(n2, u2) {
    l.__c && l.__c(u2, n2), n2.some(function(u3) {
      try {
        n2 = u3.__h, u3.__h = [], n2.some(function(n3) {
          n3.call(u3);
        });
      } catch (n3) {
        l.__e(n3, u3.__v);
      }
    });
  }
  function L(l2, u2, i2, t2, o2, r2, f2, c2) {
    var s2, a2, v2, y2 = i2.props, p2 = u2.props, d2 = u2.type, _2 = 0;
    if (d2 === "svg" && (o2 = true), r2 != null) {
      for (; _2 < r2.length; _2++)
        if ((s2 = r2[_2]) && "setAttribute" in s2 == !!d2 && (d2 ? s2.localName === d2 : s2.nodeType === 3)) {
          l2 = s2, r2[_2] = null;
          break;
        }
    }
    if (l2 == null) {
      if (d2 === null)
        return document.createTextNode(p2);
      l2 = o2 ? document.createElementNS("http://www.w3.org/2000/svg", d2) : document.createElement(d2, p2.is && p2), r2 = null, c2 = false;
    }
    if (d2 === null)
      y2 === p2 || c2 && l2.data === p2 || (l2.data = p2);
    else {
      if (r2 = r2 && n.call(l2.childNodes), a2 = (y2 = i2.props || e).dangerouslySetInnerHTML, v2 = p2.dangerouslySetInnerHTML, !c2) {
        if (r2 != null)
          for (y2 = {}, _2 = 0; _2 < l2.attributes.length; _2++)
            y2[l2.attributes[_2].name] = l2.attributes[_2].value;
        (v2 || a2) && (v2 && (a2 && v2.__html == a2.__html || v2.__html === l2.innerHTML) || (l2.innerHTML = v2 && v2.__html || ""));
      }
      if (C(l2, p2, y2, o2, c2), v2)
        u2.__k = [];
      else if (_2 = u2.props.children, w(l2, Array.isArray(_2) ? _2 : [_2], u2, i2, t2, o2 && d2 !== "foreignObject", r2, f2, r2 ? r2[0] : i2.__k && k(i2, 0), c2), r2 != null)
        for (_2 = r2.length; _2--; )
          r2[_2] != null && h(r2[_2]);
      c2 || ("value" in p2 && (_2 = p2.value) !== void 0 && (_2 !== l2.value || d2 === "progress" && !_2 || d2 === "option" && _2 !== y2.value) && H(l2, "value", _2, y2.value, false), "checked" in p2 && (_2 = p2.checked) !== void 0 && _2 !== l2.checked && H(l2, "checked", _2, y2.checked, false));
    }
    return l2;
  }
  function M(n2, u2, i2) {
    try {
      typeof n2 == "function" ? n2(u2) : n2.current = u2;
    } catch (n3) {
      l.__e(n3, i2);
    }
  }
  function N(n2, u2, i2) {
    var t2, o2;
    if (l.unmount && l.unmount(n2), (t2 = n2.ref) && (t2.current && t2.current !== n2.__e || M(t2, null, u2)), (t2 = n2.__c) != null) {
      if (t2.componentWillUnmount)
        try {
          t2.componentWillUnmount();
        } catch (n3) {
          l.__e(n3, u2);
        }
      t2.base = t2.__P = null;
    }
    if (t2 = n2.__k)
      for (o2 = 0; o2 < t2.length; o2++)
        t2[o2] && N(t2[o2], u2, typeof n2.type != "function");
    i2 || n2.__e == null || h(n2.__e), n2.__e = n2.__d = void 0;
  }
  function O(n2, l2, u2) {
    return this.constructor(n2, u2);
  }
  function S(u2, i2, t2) {
    var o2, r2, f2;
    l.__ && l.__(u2, i2), r2 = (o2 = typeof t2 == "function") ? null : t2 && t2.__k || i2.__k, f2 = [], j(i2, u2 = (!o2 && t2 || i2).__k = v(d, null, [u2]), r2 || e, e, i2.ownerSVGElement !== void 0, !o2 && t2 ? [t2] : r2 ? null : i2.firstChild ? n.call(i2.childNodes) : null, f2, !o2 && t2 ? t2 : r2 ? r2.__e : i2.firstChild, o2), z(f2, u2);
  }
  n = c.slice, l = {__e: function(n2, l2) {
    for (var u2, i2, t2; l2 = l2.__; )
      if ((u2 = l2.__c) && !u2.__)
        try {
          if ((i2 = u2.constructor) && i2.getDerivedStateFromError != null && (u2.setState(i2.getDerivedStateFromError(n2)), t2 = u2.__d), u2.componentDidCatch != null && (u2.componentDidCatch(n2), t2 = u2.__d), t2)
            return u2.__E = u2;
        } catch (l3) {
          n2 = l3;
        }
    throw n2;
  }}, u = 0, i = function(n2) {
    return n2 != null && n2.constructor === void 0;
  }, _.prototype.setState = function(n2, l2) {
    var u2;
    u2 = this.__s != null && this.__s !== this.state ? this.__s : this.__s = a({}, this.state), typeof n2 == "function" && (n2 = n2(a({}, u2), this.props)), n2 && a(u2, n2), n2 != null && this.__v && (l2 && this.__h.push(l2), m(this));
  }, _.prototype.forceUpdate = function(n2) {
    this.__v && (this.__e = true, n2 && this.__h.push(n2), m(this));
  }, _.prototype.render = d, t = [], o = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, g.__r = 0, f = 0;

  // src/Slider.jsx
  var Slider = class extends _ {
    constructor(props) {
      super(props);
      this.state = {
        isDragging: false
      };
      this.myRef = p();
      this.mouseUp = this.mouseUp.bind(this);
      this.mouseDown = this.mouseDown.bind(this);
      this.mouseMove = this.mouseMove.bind(this);
    }
    componentDidMount() {
      document.addEventListener("mouseup", this.mouseUp);
      document.body.addEventListener("mousemove", this.mouseMove);
    }
    componentWillUnmount() {
      document.removeEventListener("mouseup", this.mouseUp);
      document.body.removeEventListener("mousemove", this.mouseMove);
    }
    drag(x2) {
      const left = this.myRef.current.getBoundingClientRect().left;
      const value = (x2 - left) / (this.props.width || 200);
      this.props.onChange(Math.max(0, Math.min(1, value)));
    }
    mouseDown(e2) {
      this.state.isDragging = true;
      this.drag(e2.clientX);
    }
    mouseUp() {
      this.state.isDragging = false;
    }
    mouseMove(e2) {
      if (this.state.isDragging) {
        this.drag(e2.clientX);
      }
    }
    render() {
      const val = Math.max(0, Math.min(1, this.props.value));
      const slider = {
        ref: this.myRef,
        onMouseDown: this.mouseDown,
        style: {
          position: "relative",
          background: this.props.background || "#666666",
          width: this.props.width || 200,
          height: this.props.height || 16,
          marginBottom: 4
        }
      };
      const handle = {
        style: {
          background: "#ffffff",
          boxShadow: "1px 1px 1px 1px rgba(0,0,0,0.2)",
          borderRadius: 50,
          position: "absolute",
          top: 0,
          left: Math.floor(val * slider.style.width - slider.style.height / 2),
          width: slider.style.height,
          height: slider.style.height
        }
      };
      return /* @__PURE__ */ v("div", {
        ...slider
      }, /* @__PURE__ */ v("div", {
        ...handle
      }));
    }
  };
  var Slider_default = Slider;

  // src/HSLPicker.jsx
  var import_tinycolor2 = __toModule(require_tinycolor());
  var HSLPicker = class extends _ {
    constructor(props) {
      super(props);
      const hsl = (0, import_tinycolor2.default)(props.color).toHsl();
      this.state = hsl;
      this.setState = this.setState.bind(this);
    }
    setHSL(hue, saturation, lightness) {
      if (isNaN(hue) || isNaN(saturation) || isNaN(lightness) || hue > 360 || saturation > 1 || lightness > 1 || hue < 0 || saturation < 0 || lightness < 0) {
        this.setState({...this.state});
        return;
      }
      const hsl = {h: hue, s: saturation, l: lightness};
      this.props.onChange((0, import_tinycolor2.default)(hsl).toHexString());
      this.setState(hsl);
    }
    componentDidUpdate(prevProps) {
      if (this.props.color === prevProps.color) {
        return;
      }
      const hexState = (0, import_tinycolor2.default)(this.state).toHexString();
      const hexProps = (0, import_tinycolor2.default)(this.props.color).toHexString();
      if (hexState !== hexProps) {
        const hsl = (0, import_tinycolor2.default)(hexProps).toHsl();
        this.setHSL(hsl.h, hsl.s, hsl.l);
      }
    }
    render() {
      const [hue, saturation, lightness] = [this.state.h, this.state.s, this.state.l];
      const s0 = (0, import_tinycolor2.default)({h: hue, s: 0, l: lightness}).toHexString();
      const s1 = (0, import_tinycolor2.default)({h: hue, s: 1, l: lightness}).toHexString();
      const l0 = (0, import_tinycolor2.default)({h: hue, s: saturation, l: 0}).toHexString();
      const l05 = (0, import_tinycolor2.default)({h: hue, s: saturation, l: 0.5}).toHexString();
      const l1 = (0, import_tinycolor2.default)({h: hue, s: saturation, l: 1}).toHexString();
      const hueBg = "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)";
      const saturationBg = `linear-gradient(to right, ${s0}, ${s1})`;
      const lightnessBg = `linear-gradient(to right, ${l0}, ${l05}, ${l1})`;
      const picker = {
        style: {
          background: "#f0f0f0",
          padding: 10,
          boxShadow: "1px 1px 1px 1px rgba(0,0,0,0.2)"
        }
      };
      const sliderWrapper = {
        style: {
          display: "flex"
        }
      };
      const textbox = {
        style: {
          width: 32,
          height: 16,
          marginLeft: 10,
          paddingRight: 2,
          border: "1px solid #cccccc",
          textAlign: "right"
        }
      };
      return /* @__PURE__ */ v("div", {
        ...picker
      }, /* @__PURE__ */ v("div", {
        ...sliderWrapper
      }, /* @__PURE__ */ v(Slider_default, {
        value: hue / 360,
        background: hueBg,
        onChange: (val) => this.setHSL(val * 360, saturation, lightness)
      }), /* @__PURE__ */ v("input", {
        type: "text",
        value: hue.toFixed(0),
        ...textbox,
        onBlur: (e2) => this.setHSL(Number(e2.target.value), saturation, lightness)
      })), /* @__PURE__ */ v("div", {
        ...sliderWrapper
      }, /* @__PURE__ */ v(Slider_default, {
        value: saturation,
        background: saturationBg,
        onChange: (val) => this.setHSL(hue, val, lightness)
      }), /* @__PURE__ */ v("input", {
        type: "text",
        value: (saturation * 100).toFixed(0),
        ...textbox,
        onBlur: (e2) => this.setHSL(hue, Number(e2.target.value) / 100, lightness)
      })), /* @__PURE__ */ v("div", {
        ...sliderWrapper
      }, /* @__PURE__ */ v(Slider_default, {
        value: lightness,
        background: lightnessBg,
        onChange: (val) => this.setHSL(hue, saturation, val)
      }), /* @__PURE__ */ v("input", {
        type: "text",
        value: (lightness * 100).toFixed(0),
        ...textbox,
        onBlur: (e2) => this.setHSL(hue, saturation, Number(e2.target.value) / 100)
      })));
    }
  };
  var HSLPicker_default = HSLPicker;

  // src/MaskImage.jsx
  var MaskImage = (props) => {
    const style = {
      width: props.width,
      height: props.height,
      maskImage: `url(${props.image})`,
      WebkitMaskImage: `url(${props.image})`,
      background: props.color
    };
    return /* @__PURE__ */ v("div", {
      style
    });
  };
  var MaskImage_default = MaskImage;

  // src/Arrow.jsx
  var Arrow = class extends _ {
    constructor(props) {
      super(props);
      this.state = {selected: false};
    }
    render() {
      const color = this.props.color;
      const gradient = `linear-gradient(to right, ${color}, ${this.props.middleColor}, ${color})`;
      const wrapper = {
        style: {
          position: "relative"
        },
        onClick: () => this.setState({selected: true})
      };
      const arrow = {
        width: this.props.width,
        height: this.props.height,
        color: this.props.defaultColorgrd ? gradient : color,
        image: this.props.image
      };
      const popover = {
        style: {
          display: this.state.selected ? "inline-block" : "none",
          position: "absolute",
          zIndex: 2
        }
      };
      const picker = {
        color: this.props.color,
        onChange: (color2) => this.props.onColorChange(color2)
      };
      const cover = {
        style: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        },
        onClick: (e2) => {
          this.setState({selected: false});
          e2.stopPropagation();
        }
      };
      return /* @__PURE__ */ v("div", {
        ...wrapper
      }, /* @__PURE__ */ v(MaskImage_default, {
        ...arrow
      }), /* @__PURE__ */ v("div", {
        ...popover
      }, /* @__PURE__ */ v("div", {
        ...cover
      })), /* @__PURE__ */ v("div", {
        ...popover
      }, /* @__PURE__ */ v(HSLPicker_default, {
        ...picker
      })));
    }
  };
  var Arrow_default = Arrow;

  // package.json
  var name = "danoni-colorpicker";
  var version = "0.2.3";
  var private2 = true;
  var license = "MIT";
  var scripts = {
    build: "node build.js",
    start: "node build.js -watch -g -inline-sourcemap",
    deploy: "gh-pages -d build"
  };
  var dependencies = {
    preact: "^10.6.6",
    tinycolor2: "^1.4.2"
  };
  var devDependencies = {
    estrella: "^1.4.1",
    "fs-extra": "^10.0.1",
    "gh-pages": "^3.2.3",
    path: "^0.12.7",
    "serve-http": "^1.0.6"
  };
  var package_default = {
    name,
    version,
    private: private2,
    license,
    scripts,
    dependencies,
    devDependencies
  };

  // src/App.jsx
  var defaultMiddleColor = "#eeeeee";
  var defaultColors = ["#6666ff", "#99ffff", "#ffffff", "#ffff99", "#ff9966"];
  var App = class extends _ {
    constructor(props) {
      super(props);
      this.state = {
        defaultColorgrd: false,
        colors: ["#cccccc", "#3277ff", "#ffffff", "#ff3284", "#d632ff"],
        middleColor: "#eeeeee",
        dosStr: ""
      };
      this.copy = this.copy.bind(this);
      this.generateDosStr = this.generateDosStr.bind(this);
      this.defaultColorgrdChange = this.defaultColorgrdChange.bind(this);
      this.dosBlur = this.dosBlur.bind(this);
    }
    render() {
      if (this.state.dosStr === "") {
        this.setState({
          dosStr: this.generateDosStr(this.state.colors, this.state.defaultColorgrd)
        });
      }
      const arrows = this.state.colors.map((color, index) => {
        const props = {
          key: index,
          image: index === 2 ? "./onigiri.svg" : "./arrow.svg",
          color,
          middleColor: this.state.middleColor,
          width: 48,
          height: 48,
          defaultColorgrd: this.state.defaultColorgrd,
          onColorChange: (color2) => {
            const colorsCopy = this.state.colors.slice();
            colorsCopy[index] = color2;
            this.setState({
              colors: colorsCopy,
              dosStr: this.generateDosStr(colorsCopy, this.state.defaultColorgrd)
            });
          }
        };
        return /* @__PURE__ */ v(Arrow_default, {
          ...props
        });
      });
      return /* @__PURE__ */ v("div", {
        className: "App"
      }, /* @__PURE__ */ v("div", {
        className: "arrows"
      }, arrows), /* @__PURE__ */ v("div", null, /* @__PURE__ */ v("input", {
        id: "gradient",
        type: "checkbox",
        onChange: this.defaultColorgrdChange,
        checked: this.state.defaultColorgrd
      }), /* @__PURE__ */ v("label", {
        htmlFor: "gradient",
        className: "checkboxLabel"
      }, "\u30B0\u30E9\u30C7\u30FC\u30B7\u30E7\u30F3(defaultColorgrd)")), /* @__PURE__ */ v("textarea", {
        id: "dos",
        value: this.state.dosStr,
        onBlur: this.dosBlur
      }), /* @__PURE__ */ v("div", null, /* @__PURE__ */ v("input", {
        type: "button",
        value: "\u30B3\u30D4\u30FC",
        onClick: this.copy
      })), /* @__PURE__ */ v("div", {
        className: "footer"
      }, /* @__PURE__ */ v("a", {
        href: "https://github.com/suzme/danoni-colorpicker"
      }, package_default.name, "@", package_default.version), /* @__PURE__ */ v("br", null), /* @__PURE__ */ v("a", {
        href: "THIRD_PARTY_NOTICES.TXT"
      }, "\u30AA\u30FC\u30D7\u30F3\u30BD\u30FC\u30B9\u30E9\u30A4\u30BB\u30F3\u30B9\u3092\u8868\u793A")));
    }
    copy() {
      navigator.clipboard.writeText(this.state.dosStr);
    }
    generateDosStr(colors, defaultColorgrd) {
      const defaultColorgrdStr = defaultColorgrd.toString() + (this.state.middleColor === defaultMiddleColor ? "" : "," + this.state.middleColor);
      return `|setColor=${colors.join(",")}|
|defaultColorgrd=${defaultColorgrdStr}|`;
    }
    defaultColorgrdChange(e2) {
      this.setState({
        defaultColorgrd: e2.target.checked,
        dosStr: this.generateDosStr(this.state.colors, e2.target.checked)
      });
    }
    dosBlur(e2) {
      const dosObj = Object.fromEntries(e2.target.value.replace(/\r|\n/g, "").split(/&|\|/).filter((a2) => a2.indexOf("=") > -1).map((a2) => a2.split("=")));
      if (dosObj.setColor) {
        const newColors = dosObj.setColor.split(",").map((c2) => c2.replace(/^0x/, "#"));
        for (let i2 = newColors.length; i2 < defaultColors.length; i2++) {
          newColors.push(defaultColors[i2]);
        }
        this.setState({
          colors: newColors
        });
      }
      if (dosObj.defaultColorgrd) {
        const [newDefaultColorgrd, newMiddleColor] = dosObj.defaultColorgrd.split(",");
        this.setState({
          defaultColorgrd: newDefaultColorgrd === "true",
          middleColor: newMiddleColor || defaultMiddleColor
        });
      }
    }
  };
  var App_default = App;

  // src/index.jsx
  S(/* @__PURE__ */ v(App_default, null), document.getElementById("root"));
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL3Rpbnljb2xvcjIvdGlueWNvbG9yLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9wcmVhY3Qvc3JjL2NvbnN0YW50cy5qcyIsICIuLi9ub2RlX21vZHVsZXMvcHJlYWN0L3NyYy91dGlsLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9wcmVhY3Qvc3JjL29wdGlvbnMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3ByZWFjdC9zcmMvY3JlYXRlLWVsZW1lbnQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3ByZWFjdC9zcmMvY29tcG9uZW50LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9wcmVhY3Qvc3JjL2NyZWF0ZS1jb250ZXh0LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9wcmVhY3Qvc3JjL2RpZmYvY2hpbGRyZW4uanMiLCAiLi4vbm9kZV9tb2R1bGVzL3ByZWFjdC9zcmMvZGlmZi9wcm9wcy5qcyIsICIuLi9ub2RlX21vZHVsZXMvcHJlYWN0L3NyYy9kaWZmL2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9wcmVhY3Qvc3JjL3JlbmRlci5qcyIsICIuLi9ub2RlX21vZHVsZXMvcHJlYWN0L3NyYy9jbG9uZS1lbGVtZW50LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9wcmVhY3Qvc3JjL2RpZmYvY2F0Y2gtZXJyb3IuanMiLCAiLi4vc3JjL1NsaWRlci5qc3giLCAiLi4vc3JjL0hTTFBpY2tlci5qc3giLCAiLi4vc3JjL01hc2tJbWFnZS5qc3giLCAiLi4vc3JjL0Fycm93LmpzeCIsICIuLi9zcmMvQXBwLmpzeCIsICIuLi9zcmMvaW5kZXguanN4Il0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUlBLE1BQUMsVUFBUyxPQUFNO0FBRWhCLFlBQUksV0FBVyxRQUNYLFlBQVksUUFDWixjQUFjLEdBQ2QsWUFBWSxNQUFLLE9BQ2pCLFVBQVUsTUFBSyxLQUNmLFVBQVUsTUFBSyxLQUNmLGFBQWEsTUFBSztBQUV0Qiw0QkFBb0IsT0FBTyxNQUFNO0FBRTdCLGtCQUFTLFFBQVMsUUFBUTtBQUMxQixpQkFBTyxRQUFRO0FBR2YsY0FBSSxpQkFBaUIsWUFBVztBQUM3QixtQkFBTztBQUFBO0FBR1YsY0FBSSxDQUFFLGlCQUFnQixhQUFZO0FBQzlCLG1CQUFPLElBQUksV0FBVSxPQUFPO0FBQUE7QUFHaEMsY0FBSSxNQUFNLFdBQVc7QUFDckIsZUFBSyxpQkFBaUIsT0FDdEIsS0FBSyxLQUFLLElBQUksR0FDZCxLQUFLLEtBQUssSUFBSSxHQUNkLEtBQUssS0FBSyxJQUFJLEdBQ2QsS0FBSyxLQUFLLElBQUksR0FDZCxLQUFLLFVBQVUsVUFBVSxNQUFJLEtBQUssTUFBTSxLQUN4QyxLQUFLLFVBQVUsS0FBSyxVQUFVLElBQUk7QUFDbEMsZUFBSyxnQkFBZ0IsS0FBSztBQU0xQixjQUFJLEtBQUssS0FBSyxHQUFHO0FBQUUsaUJBQUssS0FBSyxVQUFVLEtBQUs7QUFBQTtBQUM1QyxjQUFJLEtBQUssS0FBSyxHQUFHO0FBQUUsaUJBQUssS0FBSyxVQUFVLEtBQUs7QUFBQTtBQUM1QyxjQUFJLEtBQUssS0FBSyxHQUFHO0FBQUUsaUJBQUssS0FBSyxVQUFVLEtBQUs7QUFBQTtBQUU1QyxlQUFLLE1BQU0sSUFBSTtBQUNmLGVBQUssU0FBUztBQUFBO0FBR2xCLG1CQUFVLFlBQVk7QUFBQSxVQUNsQixRQUFRLFdBQVc7QUFDZixtQkFBTyxLQUFLLGtCQUFrQjtBQUFBO0FBQUEsVUFFbEMsU0FBUyxXQUFXO0FBQ2hCLG1CQUFPLENBQUMsS0FBSztBQUFBO0FBQUEsVUFFakIsU0FBUyxXQUFXO0FBQ2hCLG1CQUFPLEtBQUs7QUFBQTtBQUFBLFVBRWhCLGtCQUFrQixXQUFXO0FBQzNCLG1CQUFPLEtBQUs7QUFBQTtBQUFBLFVBRWQsV0FBVyxXQUFXO0FBQ2xCLG1CQUFPLEtBQUs7QUFBQTtBQUFBLFVBRWhCLFVBQVUsV0FBVztBQUNqQixtQkFBTyxLQUFLO0FBQUE7QUFBQSxVQUVoQixlQUFlLFdBQVc7QUFFdEIsZ0JBQUksTUFBTSxLQUFLO0FBQ2YsbUJBQVEsS0FBSSxJQUFJLE1BQU0sSUFBSSxJQUFJLE1BQU0sSUFBSSxJQUFJLE9BQU87QUFBQTtBQUFBLFVBRXZELGNBQWMsV0FBVztBQUVyQixnQkFBSSxNQUFNLEtBQUs7QUFDZixnQkFBSSxPQUFPLE9BQU8sT0FBTyxHQUFHLEdBQUc7QUFDL0Isb0JBQVEsSUFBSSxJQUFFO0FBQ2Qsb0JBQVEsSUFBSSxJQUFFO0FBQ2Qsb0JBQVEsSUFBSSxJQUFFO0FBRWQsZ0JBQUksU0FBUyxTQUFTO0FBQUMsa0JBQUksUUFBUTtBQUFBLG1CQUFhO0FBQUMsa0JBQUksTUFBSyxJQUFNLFNBQVEsU0FBUyxPQUFRO0FBQUE7QUFDekYsZ0JBQUksU0FBUyxTQUFTO0FBQUMsa0JBQUksUUFBUTtBQUFBLG1CQUFhO0FBQUMsa0JBQUksTUFBSyxJQUFNLFNBQVEsU0FBUyxPQUFRO0FBQUE7QUFDekYsZ0JBQUksU0FBUyxTQUFTO0FBQUMsa0JBQUksUUFBUTtBQUFBLG1CQUFhO0FBQUMsa0JBQUksTUFBSyxJQUFNLFNBQVEsU0FBUyxPQUFRO0FBQUE7QUFDekYsbUJBQVEsU0FBUyxJQUFNLFNBQVMsSUFBTSxTQUFTO0FBQUE7QUFBQSxVQUVuRCxVQUFVLFNBQVMsT0FBTztBQUN0QixpQkFBSyxLQUFLLFdBQVc7QUFDckIsaUJBQUssVUFBVSxVQUFVLE1BQUksS0FBSyxNQUFNO0FBQ3hDLG1CQUFPO0FBQUE7QUFBQSxVQUVYLE9BQU8sV0FBVztBQUNkLGdCQUFJLE1BQU0sU0FBUyxLQUFLLElBQUksS0FBSyxJQUFJLEtBQUs7QUFDMUMsbUJBQU8sQ0FBRSxHQUFHLElBQUksSUFBSSxLQUFLLEdBQUcsSUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsS0FBSztBQUFBO0FBQUEsVUFFekQsYUFBYSxXQUFXO0FBQ3BCLGdCQUFJLE1BQU0sU0FBUyxLQUFLLElBQUksS0FBSyxJQUFJLEtBQUs7QUFDMUMsZ0JBQUksS0FBSSxVQUFVLElBQUksSUFBSSxNQUFNLEtBQUksVUFBVSxJQUFJLElBQUksTUFBTSxLQUFJLFVBQVUsSUFBSSxJQUFJO0FBQ2xGLG1CQUFRLEtBQUssTUFBTSxJQUNqQixTQUFVLEtBQUksT0FBTyxLQUFJLFFBQVEsS0FBSSxPQUNyQyxVQUFVLEtBQUksT0FBTyxLQUFJLFFBQVEsS0FBSSxRQUFPLEtBQUssVUFBVTtBQUFBO0FBQUEsVUFFakUsT0FBTyxXQUFXO0FBQ2QsZ0JBQUksTUFBTSxTQUFTLEtBQUssSUFBSSxLQUFLLElBQUksS0FBSztBQUMxQyxtQkFBTyxDQUFFLEdBQUcsSUFBSSxJQUFJLEtBQUssR0FBRyxJQUFJLEdBQUcsR0FBRyxJQUFJLEdBQUcsR0FBRyxLQUFLO0FBQUE7QUFBQSxVQUV6RCxhQUFhLFdBQVc7QUFDcEIsZ0JBQUksTUFBTSxTQUFTLEtBQUssSUFBSSxLQUFLLElBQUksS0FBSztBQUMxQyxnQkFBSSxLQUFJLFVBQVUsSUFBSSxJQUFJLE1BQU0sS0FBSSxVQUFVLElBQUksSUFBSSxNQUFNLEtBQUksVUFBVSxJQUFJLElBQUk7QUFDbEYsbUJBQVEsS0FBSyxNQUFNLElBQ2pCLFNBQVUsS0FBSSxPQUFPLEtBQUksUUFBUSxLQUFJLE9BQ3JDLFVBQVUsS0FBSSxPQUFPLEtBQUksUUFBUSxLQUFJLFFBQU8sS0FBSyxVQUFVO0FBQUE7QUFBQSxVQUVqRSxPQUFPLFNBQVMsWUFBWTtBQUN4QixtQkFBTyxTQUFTLEtBQUssSUFBSSxLQUFLLElBQUksS0FBSyxJQUFJO0FBQUE7QUFBQSxVQUUvQyxhQUFhLFNBQVMsWUFBWTtBQUM5QixtQkFBTyxNQUFNLEtBQUssTUFBTTtBQUFBO0FBQUEsVUFFNUIsUUFBUSxTQUFTLFlBQVk7QUFDekIsbUJBQU8sVUFBVSxLQUFLLElBQUksS0FBSyxJQUFJLEtBQUssSUFBSSxLQUFLLElBQUk7QUFBQTtBQUFBLFVBRXpELGNBQWMsU0FBUyxZQUFZO0FBQy9CLG1CQUFPLE1BQU0sS0FBSyxPQUFPO0FBQUE7QUFBQSxVQUU3QixPQUFPLFdBQVc7QUFDZCxtQkFBTyxDQUFFLEdBQUcsVUFBVSxLQUFLLEtBQUssR0FBRyxVQUFVLEtBQUssS0FBSyxHQUFHLFVBQVUsS0FBSyxLQUFLLEdBQUcsS0FBSztBQUFBO0FBQUEsVUFFMUYsYUFBYSxXQUFXO0FBQ3BCLG1CQUFRLEtBQUssTUFBTSxJQUNqQixTQUFVLFVBQVUsS0FBSyxNQUFNLE9BQU8sVUFBVSxLQUFLLE1BQU0sT0FBTyxVQUFVLEtBQUssTUFBTSxNQUN2RixVQUFVLFVBQVUsS0FBSyxNQUFNLE9BQU8sVUFBVSxLQUFLLE1BQU0sT0FBTyxVQUFVLEtBQUssTUFBTSxPQUFPLEtBQUssVUFBVTtBQUFBO0FBQUEsVUFFbkgsaUJBQWlCLFdBQVc7QUFDeEIsbUJBQU8sQ0FBRSxHQUFHLFVBQVUsUUFBUSxLQUFLLElBQUksT0FBTyxPQUFPLEtBQUssR0FBRyxVQUFVLFFBQVEsS0FBSyxJQUFJLE9BQU8sT0FBTyxLQUFLLEdBQUcsVUFBVSxRQUFRLEtBQUssSUFBSSxPQUFPLE9BQU8sS0FBSyxHQUFHLEtBQUs7QUFBQTtBQUFBLFVBRXhLLHVCQUF1QixXQUFXO0FBQzlCLG1CQUFRLEtBQUssTUFBTSxJQUNqQixTQUFVLFVBQVUsUUFBUSxLQUFLLElBQUksT0FBTyxPQUFPLFFBQVEsVUFBVSxRQUFRLEtBQUssSUFBSSxPQUFPLE9BQU8sUUFBUSxVQUFVLFFBQVEsS0FBSyxJQUFJLE9BQU8sT0FBTyxPQUNySixVQUFVLFVBQVUsUUFBUSxLQUFLLElBQUksT0FBTyxPQUFPLFFBQVEsVUFBVSxRQUFRLEtBQUssSUFBSSxPQUFPLE9BQU8sUUFBUSxVQUFVLFFBQVEsS0FBSyxJQUFJLE9BQU8sT0FBTyxRQUFRLEtBQUssVUFBVTtBQUFBO0FBQUEsVUFFbEwsUUFBUSxXQUFXO0FBQ2YsZ0JBQUksS0FBSyxPQUFPLEdBQUc7QUFDZixxQkFBTztBQUFBO0FBR1gsZ0JBQUksS0FBSyxLQUFLLEdBQUc7QUFDYixxQkFBTztBQUFBO0FBR1gsbUJBQU8sU0FBUyxTQUFTLEtBQUssSUFBSSxLQUFLLElBQUksS0FBSyxJQUFJLFVBQVU7QUFBQTtBQUFBLFVBRWxFLFVBQVUsU0FBUyxhQUFhO0FBQzVCLGdCQUFJLGFBQWEsTUFBTSxjQUFjLEtBQUssSUFBSSxLQUFLLElBQUksS0FBSyxJQUFJLEtBQUs7QUFDckUsZ0JBQUksbUJBQW1CO0FBQ3ZCLGdCQUFJLGVBQWUsS0FBSyxnQkFBZ0IsdUJBQXVCO0FBRS9ELGdCQUFJLGFBQWE7QUFDYixrQkFBSSxLQUFJLFdBQVU7QUFDbEIsaUNBQW1CLE1BQU0sY0FBYyxHQUFFLElBQUksR0FBRSxJQUFJLEdBQUUsSUFBSSxHQUFFO0FBQUE7QUFHL0QsbUJBQU8sZ0RBQThDLGVBQWEsbUJBQWlCLGFBQVcsa0JBQWdCLG1CQUFpQjtBQUFBO0FBQUEsVUFFbkksVUFBVSxTQUFTLFFBQVE7QUFDdkIsZ0JBQUksWUFBWSxDQUFDLENBQUM7QUFDbEIscUJBQVMsVUFBVSxLQUFLO0FBRXhCLGdCQUFJLGtCQUFrQjtBQUN0QixnQkFBSSxXQUFXLEtBQUssS0FBSyxLQUFLLEtBQUssTUFBTTtBQUN6QyxnQkFBSSxtQkFBbUIsQ0FBQyxhQUFhLFlBQWEsWUFBVyxTQUFTLFdBQVcsVUFBVSxXQUFXLFVBQVUsV0FBVyxVQUFVLFdBQVcsVUFBVSxXQUFXO0FBRXJLLGdCQUFJLGtCQUFrQjtBQUdsQixrQkFBSSxXQUFXLFVBQVUsS0FBSyxPQUFPLEdBQUc7QUFDcEMsdUJBQU8sS0FBSztBQUFBO0FBRWhCLHFCQUFPLEtBQUs7QUFBQTtBQUVoQixnQkFBSSxXQUFXLE9BQU87QUFDbEIsZ0NBQWtCLEtBQUs7QUFBQTtBQUUzQixnQkFBSSxXQUFXLFFBQVE7QUFDbkIsZ0NBQWtCLEtBQUs7QUFBQTtBQUUzQixnQkFBSSxXQUFXLFNBQVMsV0FBVyxRQUFRO0FBQ3ZDLGdDQUFrQixLQUFLO0FBQUE7QUFFM0IsZ0JBQUksV0FBVyxRQUFRO0FBQ25CLGdDQUFrQixLQUFLLFlBQVk7QUFBQTtBQUV2QyxnQkFBSSxXQUFXLFFBQVE7QUFDbkIsZ0NBQWtCLEtBQUssYUFBYTtBQUFBO0FBRXhDLGdCQUFJLFdBQVcsUUFBUTtBQUNuQixnQ0FBa0IsS0FBSztBQUFBO0FBRTNCLGdCQUFJLFdBQVcsUUFBUTtBQUNuQixnQ0FBa0IsS0FBSztBQUFBO0FBRTNCLGdCQUFJLFdBQVcsT0FBTztBQUNsQixnQ0FBa0IsS0FBSztBQUFBO0FBRTNCLGdCQUFJLFdBQVcsT0FBTztBQUNsQixnQ0FBa0IsS0FBSztBQUFBO0FBRzNCLG1CQUFPLG1CQUFtQixLQUFLO0FBQUE7QUFBQSxVQUVuQyxPQUFPLFdBQVc7QUFDZCxtQkFBTyxXQUFVLEtBQUs7QUFBQTtBQUFBLFVBRzFCLG9CQUFvQixTQUFTLElBQUksTUFBTTtBQUNuQyxnQkFBSSxRQUFRLEdBQUcsTUFBTSxNQUFNLENBQUMsTUFBTSxPQUFPLEdBQUcsTUFBTSxLQUFLO0FBQ3ZELGlCQUFLLEtBQUssTUFBTTtBQUNoQixpQkFBSyxLQUFLLE1BQU07QUFDaEIsaUJBQUssS0FBSyxNQUFNO0FBQ2hCLGlCQUFLLFNBQVMsTUFBTTtBQUNwQixtQkFBTztBQUFBO0FBQUEsVUFFWCxTQUFTLFdBQVc7QUFDaEIsbUJBQU8sS0FBSyxtQkFBbUIsU0FBUztBQUFBO0FBQUEsVUFFNUMsVUFBVSxXQUFXO0FBQ2pCLG1CQUFPLEtBQUssbUJBQW1CLFVBQVU7QUFBQTtBQUFBLFVBRTdDLFFBQVEsV0FBVztBQUNmLG1CQUFPLEtBQUssbUJBQW1CLFFBQVE7QUFBQTtBQUFBLFVBRTNDLFlBQVksV0FBVztBQUNuQixtQkFBTyxLQUFLLG1CQUFtQixZQUFZO0FBQUE7QUFBQSxVQUUvQyxVQUFVLFdBQVc7QUFDakIsbUJBQU8sS0FBSyxtQkFBbUIsVUFBVTtBQUFBO0FBQUEsVUFFN0MsV0FBVyxXQUFXO0FBQ2xCLG1CQUFPLEtBQUssbUJBQW1CLFdBQVc7QUFBQTtBQUFBLFVBRTlDLE1BQU0sV0FBVztBQUNiLG1CQUFPLEtBQUssbUJBQW1CLE1BQU07QUFBQTtBQUFBLFVBR3pDLG1CQUFtQixTQUFTLElBQUksTUFBTTtBQUNsQyxtQkFBTyxHQUFHLE1BQU0sTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFHLE1BQU0sS0FBSztBQUFBO0FBQUEsVUFFdEQsV0FBVyxXQUFXO0FBQ2xCLG1CQUFPLEtBQUssa0JBQWtCLFdBQVc7QUFBQTtBQUFBLFVBRTdDLFlBQVksV0FBVztBQUNuQixtQkFBTyxLQUFLLGtCQUFrQixZQUFZO0FBQUE7QUFBQSxVQUU5QyxlQUFlLFdBQVc7QUFDdEIsbUJBQU8sS0FBSyxrQkFBa0IsZUFBZTtBQUFBO0FBQUEsVUFFakQsaUJBQWlCLFdBQVc7QUFDeEIsbUJBQU8sS0FBSyxrQkFBa0IsaUJBQWlCO0FBQUE7QUFBQSxVQUVuRCxPQUFPLFdBQVc7QUFDZCxtQkFBTyxLQUFLLGtCQUFrQixPQUFPO0FBQUE7QUFBQSxVQUV6QyxRQUFRLFdBQVc7QUFDZixtQkFBTyxLQUFLLGtCQUFrQixRQUFRO0FBQUE7QUFBQTtBQU05QyxtQkFBVSxZQUFZLFNBQVMsT0FBTyxNQUFNO0FBQ3hDLGNBQUksT0FBTyxTQUFTLFVBQVU7QUFDMUIsZ0JBQUksV0FBVztBQUNmLHFCQUFTLE1BQUssT0FBTztBQUNqQixrQkFBSSxNQUFNLGVBQWUsS0FBSTtBQUN6QixvQkFBSSxPQUFNLEtBQUs7QUFDWCwyQkFBUyxNQUFLLE1BQU07QUFBQSx1QkFFbkI7QUFDRCwyQkFBUyxNQUFLLG9CQUFvQixNQUFNO0FBQUE7QUFBQTtBQUFBO0FBSXBELG9CQUFRO0FBQUE7QUFHWixpQkFBTyxXQUFVLE9BQU87QUFBQTtBQWtCNUIsNEJBQW9CLE9BQU87QUFFdkIsY0FBSSxNQUFNLENBQUUsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO0FBQzNCLGNBQUksS0FBSTtBQUNSLGNBQUksS0FBSTtBQUNSLGNBQUksS0FBSTtBQUNSLGNBQUksS0FBSTtBQUNSLGNBQUksS0FBSztBQUNULGNBQUksU0FBUztBQUViLGNBQUksT0FBTyxTQUFTLFVBQVU7QUFDMUIsb0JBQVEsb0JBQW9CO0FBQUE7QUFHaEMsY0FBSSxPQUFPLFNBQVMsVUFBVTtBQUMxQixnQkFBSSxlQUFlLE1BQU0sTUFBTSxlQUFlLE1BQU0sTUFBTSxlQUFlLE1BQU0sSUFBSTtBQUMvRSxvQkFBTSxTQUFTLE1BQU0sR0FBRyxNQUFNLEdBQUcsTUFBTTtBQUN2QyxtQkFBSztBQUNMLHVCQUFTLE9BQU8sTUFBTSxHQUFHLE9BQU8sUUFBUSxNQUFNLFNBQVM7QUFBQSx1QkFFbEQsZUFBZSxNQUFNLE1BQU0sZUFBZSxNQUFNLE1BQU0sZUFBZSxNQUFNLElBQUk7QUFDcEYsbUJBQUksb0JBQW9CLE1BQU07QUFDOUIsbUJBQUksb0JBQW9CLE1BQU07QUFDOUIsb0JBQU0sU0FBUyxNQUFNLEdBQUcsSUFBRztBQUMzQixtQkFBSztBQUNMLHVCQUFTO0FBQUEsdUJBRUosZUFBZSxNQUFNLE1BQU0sZUFBZSxNQUFNLE1BQU0sZUFBZSxNQUFNLElBQUk7QUFDcEYsbUJBQUksb0JBQW9CLE1BQU07QUFDOUIsbUJBQUksb0JBQW9CLE1BQU07QUFDOUIsb0JBQU0sU0FBUyxNQUFNLEdBQUcsSUFBRztBQUMzQixtQkFBSztBQUNMLHVCQUFTO0FBQUE7QUFHYixnQkFBSSxNQUFNLGVBQWUsTUFBTTtBQUMzQixtQkFBSSxNQUFNO0FBQUE7QUFBQTtBQUlsQixlQUFJLFdBQVc7QUFFZixpQkFBTztBQUFBLFlBQ0g7QUFBQSxZQUNBLFFBQVEsTUFBTSxVQUFVO0FBQUEsWUFDeEIsR0FBRyxRQUFRLEtBQUssUUFBUSxJQUFJLEdBQUc7QUFBQSxZQUMvQixHQUFHLFFBQVEsS0FBSyxRQUFRLElBQUksR0FBRztBQUFBLFlBQy9CLEdBQUcsUUFBUSxLQUFLLFFBQVEsSUFBSSxHQUFHO0FBQUEsWUFDL0IsR0FBRztBQUFBO0FBQUE7QUFnQlgsMEJBQWtCLElBQUcsSUFBRyxJQUFFO0FBQ3RCLGlCQUFPO0FBQUEsWUFDSCxHQUFHLFFBQVEsSUFBRyxPQUFPO0FBQUEsWUFDckIsR0FBRyxRQUFRLElBQUcsT0FBTztBQUFBLFlBQ3JCLEdBQUcsUUFBUSxJQUFHLE9BQU87QUFBQTtBQUFBO0FBUTdCLDBCQUFrQixJQUFHLElBQUcsSUFBRztBQUV2QixlQUFJLFFBQVEsSUFBRztBQUNmLGVBQUksUUFBUSxJQUFHO0FBQ2YsZUFBSSxRQUFRLElBQUc7QUFFZixjQUFJLE1BQU0sUUFBUSxJQUFHLElBQUcsS0FBSSxNQUFNLFFBQVEsSUFBRyxJQUFHO0FBQ2hELGNBQUksSUFBRyxJQUFHLEtBQUssT0FBTSxPQUFPO0FBRTVCLGNBQUcsT0FBTyxLQUFLO0FBQ1gsaUJBQUksS0FBSTtBQUFBLGlCQUVQO0FBQ0QsZ0JBQUksS0FBSSxNQUFNO0FBQ2QsaUJBQUksS0FBSSxNQUFNLEtBQUssS0FBSSxNQUFNLE9BQU8sS0FBSyxPQUFNO0FBQy9DLG9CQUFPO0FBQUEsbUJBQ0U7QUFBRyxxQkFBSyxNQUFJLE1BQUssS0FBSyxNQUFJLEtBQUksSUFBSTtBQUFJO0FBQUEsbUJBQ3RDO0FBQUcscUJBQUssTUFBSSxNQUFLLEtBQUk7QUFBRztBQUFBLG1CQUN4QjtBQUFHLHFCQUFLLE1BQUksTUFBSyxLQUFJO0FBQUc7QUFBQTtBQUdqQyxrQkFBSztBQUFBO0FBR1QsaUJBQU8sQ0FBRSxHQUFHLElBQUcsR0FBRyxJQUFHLEdBQUc7QUFBQTtBQU81QiwwQkFBa0IsSUFBRyxJQUFHLElBQUc7QUFDdkIsY0FBSSxJQUFHLElBQUc7QUFFVixlQUFJLFFBQVEsSUFBRztBQUNmLGVBQUksUUFBUSxJQUFHO0FBQ2YsZUFBSSxRQUFRLElBQUc7QUFFZiwyQkFBaUIsSUFBRyxJQUFHLElBQUc7QUFDdEIsZ0JBQUcsS0FBSTtBQUFHLG9CQUFLO0FBQ2YsZ0JBQUcsS0FBSTtBQUFHLG9CQUFLO0FBQ2YsZ0JBQUcsS0FBSSxJQUFFO0FBQUcscUJBQU8sS0FBSyxNQUFJLE1BQUssSUFBSTtBQUNyQyxnQkFBRyxLQUFJLElBQUU7QUFBRyxxQkFBTztBQUNuQixnQkFBRyxLQUFJLElBQUU7QUFBRyxxQkFBTyxLQUFLLE1BQUksTUFBTSxLQUFFLElBQUksTUFBSztBQUM3QyxtQkFBTztBQUFBO0FBR1gsY0FBRyxPQUFNLEdBQUc7QUFDUixpQkFBSSxLQUFJLEtBQUk7QUFBQSxpQkFFWDtBQUNELGdCQUFJLElBQUksS0FBSSxNQUFNLEtBQUssS0FBSSxNQUFLLEtBQUksS0FBSSxLQUFJO0FBQzVDLGdCQUFJLEtBQUksSUFBSSxLQUFJO0FBQ2hCLGlCQUFJLFFBQVEsSUFBRyxHQUFHLEtBQUksSUFBRTtBQUN4QixpQkFBSSxRQUFRLElBQUcsR0FBRztBQUNsQixpQkFBSSxRQUFRLElBQUcsR0FBRyxLQUFJLElBQUU7QUFBQTtBQUc1QixpQkFBTyxDQUFFLEdBQUcsS0FBSSxLQUFLLEdBQUcsS0FBSSxLQUFLLEdBQUcsS0FBSTtBQUFBO0FBTzVDLDBCQUFrQixJQUFHLElBQUcsSUFBRztBQUV2QixlQUFJLFFBQVEsSUFBRztBQUNmLGVBQUksUUFBUSxJQUFHO0FBQ2YsZUFBSSxRQUFRLElBQUc7QUFFZixjQUFJLE1BQU0sUUFBUSxJQUFHLElBQUcsS0FBSSxNQUFNLFFBQVEsSUFBRyxJQUFHO0FBQ2hELGNBQUksSUFBRyxJQUFHLEtBQUk7QUFFZCxjQUFJLEtBQUksTUFBTTtBQUNkLGVBQUksUUFBUSxJQUFJLElBQUksS0FBSTtBQUV4QixjQUFHLE9BQU8sS0FBSztBQUNYLGlCQUFJO0FBQUEsaUJBRUg7QUFDRCxvQkFBTztBQUFBLG1CQUNFO0FBQUcscUJBQUssTUFBSSxNQUFLLEtBQUssTUFBSSxLQUFJLElBQUk7QUFBSTtBQUFBLG1CQUN0QztBQUFHLHFCQUFLLE1BQUksTUFBSyxLQUFJO0FBQUc7QUFBQSxtQkFDeEI7QUFBRyxxQkFBSyxNQUFJLE1BQUssS0FBSTtBQUFHO0FBQUE7QUFFakMsa0JBQUs7QUFBQTtBQUVULGlCQUFPLENBQUUsR0FBRyxJQUFHLEdBQUcsSUFBRyxHQUFHO0FBQUE7QUFPM0IsMEJBQWtCLElBQUcsSUFBRyxJQUFHO0FBRXhCLGVBQUksUUFBUSxJQUFHLE9BQU87QUFDdEIsZUFBSSxRQUFRLElBQUc7QUFDZixlQUFJLFFBQVEsSUFBRztBQUVmLGNBQUksS0FBSSxNQUFLLE1BQU0sS0FDZixLQUFJLEtBQUksSUFDUixLQUFJLEtBQUssS0FBSSxLQUNiLElBQUksS0FBSyxLQUFJLEtBQUksS0FDakIsS0FBSSxLQUFLLEtBQUssS0FBSSxNQUFLLEtBQ3ZCLE1BQU0sS0FBSSxHQUNWLEtBQUksQ0FBQyxJQUFHLEdBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxNQUN2QixLQUFJLENBQUMsSUFBRyxJQUFHLElBQUcsR0FBRyxJQUFHLElBQUcsTUFDdkIsS0FBSSxDQUFDLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxHQUFHO0FBRTNCLGlCQUFPLENBQUUsR0FBRyxLQUFJLEtBQUssR0FBRyxLQUFJLEtBQUssR0FBRyxLQUFJO0FBQUE7QUFPNUMsMEJBQWtCLElBQUcsSUFBRyxJQUFHLFlBQVk7QUFFbkMsY0FBSSxNQUFNO0FBQUEsWUFDTixLQUFLLFVBQVUsSUFBRyxTQUFTO0FBQUEsWUFDM0IsS0FBSyxVQUFVLElBQUcsU0FBUztBQUFBLFlBQzNCLEtBQUssVUFBVSxJQUFHLFNBQVM7QUFBQTtBQUkvQixjQUFJLGNBQWMsSUFBSSxHQUFHLE9BQU8sTUFBTSxJQUFJLEdBQUcsT0FBTyxNQUFNLElBQUksR0FBRyxPQUFPLE1BQU0sSUFBSSxHQUFHLE9BQU8sTUFBTSxJQUFJLEdBQUcsT0FBTyxNQUFNLElBQUksR0FBRyxPQUFPLElBQUk7QUFDcEksbUJBQU8sSUFBSSxHQUFHLE9BQU8sS0FBSyxJQUFJLEdBQUcsT0FBTyxLQUFLLElBQUksR0FBRyxPQUFPO0FBQUE7QUFHL0QsaUJBQU8sSUFBSSxLQUFLO0FBQUE7QUFPcEIsMkJBQW1CLElBQUcsSUFBRyxJQUFHLElBQUcsWUFBWTtBQUV2QyxjQUFJLE1BQU07QUFBQSxZQUNOLEtBQUssVUFBVSxJQUFHLFNBQVM7QUFBQSxZQUMzQixLQUFLLFVBQVUsSUFBRyxTQUFTO0FBQUEsWUFDM0IsS0FBSyxVQUFVLElBQUcsU0FBUztBQUFBLFlBQzNCLEtBQUssb0JBQW9CO0FBQUE7QUFJN0IsY0FBSSxjQUFjLElBQUksR0FBRyxPQUFPLE1BQU0sSUFBSSxHQUFHLE9BQU8sTUFBTSxJQUFJLEdBQUcsT0FBTyxNQUFNLElBQUksR0FBRyxPQUFPLE1BQU0sSUFBSSxHQUFHLE9BQU8sTUFBTSxJQUFJLEdBQUcsT0FBTyxNQUFNLElBQUksR0FBRyxPQUFPLE1BQU0sSUFBSSxHQUFHLE9BQU8sSUFBSTtBQUM1SyxtQkFBTyxJQUFJLEdBQUcsT0FBTyxLQUFLLElBQUksR0FBRyxPQUFPLEtBQUssSUFBSSxHQUFHLE9BQU8sS0FBSyxJQUFJLEdBQUcsT0FBTztBQUFBO0FBR2xGLGlCQUFPLElBQUksS0FBSztBQUFBO0FBTXBCLCtCQUF1QixJQUFHLElBQUcsSUFBRyxJQUFHO0FBRS9CLGNBQUksTUFBTTtBQUFBLFlBQ04sS0FBSyxvQkFBb0I7QUFBQSxZQUN6QixLQUFLLFVBQVUsSUFBRyxTQUFTO0FBQUEsWUFDM0IsS0FBSyxVQUFVLElBQUcsU0FBUztBQUFBLFlBQzNCLEtBQUssVUFBVSxJQUFHLFNBQVM7QUFBQTtBQUcvQixpQkFBTyxJQUFJLEtBQUs7QUFBQTtBQUtwQixtQkFBVSxTQUFTLFNBQVUsUUFBUSxRQUFRO0FBQ3pDLGNBQUksQ0FBQyxVQUFVLENBQUMsUUFBUTtBQUFFLG1CQUFPO0FBQUE7QUFDakMsaUJBQU8sV0FBVSxRQUFRLGlCQUFpQixXQUFVLFFBQVE7QUFBQTtBQUdoRSxtQkFBVSxTQUFTLFdBQVc7QUFDMUIsaUJBQU8sV0FBVSxVQUFVO0FBQUEsWUFDdkIsR0FBRztBQUFBLFlBQ0gsR0FBRztBQUFBLFlBQ0gsR0FBRztBQUFBO0FBQUE7QUFVWCw0QkFBb0IsT0FBTyxRQUFRO0FBQy9CLG1CQUFVLFdBQVcsSUFBSyxJQUFLLFVBQVU7QUFDekMsY0FBSSxNQUFNLFdBQVUsT0FBTztBQUMzQixjQUFJLEtBQUssU0FBUztBQUNsQixjQUFJLElBQUksUUFBUSxJQUFJO0FBQ3BCLGlCQUFPLFdBQVU7QUFBQTtBQUdyQiwwQkFBa0IsT0FBTyxRQUFRO0FBQzdCLG1CQUFVLFdBQVcsSUFBSyxJQUFLLFVBQVU7QUFDekMsY0FBSSxNQUFNLFdBQVUsT0FBTztBQUMzQixjQUFJLEtBQUssU0FBUztBQUNsQixjQUFJLElBQUksUUFBUSxJQUFJO0FBQ3BCLGlCQUFPLFdBQVU7QUFBQTtBQUdyQiwyQkFBbUIsT0FBTztBQUN0QixpQkFBTyxXQUFVLE9BQU8sV0FBVztBQUFBO0FBR3ZDLHlCQUFrQixPQUFPLFFBQVE7QUFDN0IsbUJBQVUsV0FBVyxJQUFLLElBQUssVUFBVTtBQUN6QyxjQUFJLE1BQU0sV0FBVSxPQUFPO0FBQzNCLGNBQUksS0FBSyxTQUFTO0FBQ2xCLGNBQUksSUFBSSxRQUFRLElBQUk7QUFDcEIsaUJBQU8sV0FBVTtBQUFBO0FBR3JCLDBCQUFrQixPQUFPLFFBQVE7QUFDN0IsbUJBQVUsV0FBVyxJQUFLLElBQUssVUFBVTtBQUN6QyxjQUFJLE1BQU0sV0FBVSxPQUFPO0FBQzNCLGNBQUksSUFBSSxRQUFRLEdBQUcsUUFBUSxLQUFLLElBQUksSUFBSSxVQUFVLE1BQU0sQ0FBRyxVQUFTO0FBQ3BFLGNBQUksSUFBSSxRQUFRLEdBQUcsUUFBUSxLQUFLLElBQUksSUFBSSxVQUFVLE1BQU0sQ0FBRyxVQUFTO0FBQ3BFLGNBQUksSUFBSSxRQUFRLEdBQUcsUUFBUSxLQUFLLElBQUksSUFBSSxVQUFVLE1BQU0sQ0FBRyxVQUFTO0FBQ3BFLGlCQUFPLFdBQVU7QUFBQTtBQUdyQix3QkFBaUIsT0FBTyxRQUFRO0FBQzVCLG1CQUFVLFdBQVcsSUFBSyxJQUFLLFVBQVU7QUFDekMsY0FBSSxNQUFNLFdBQVUsT0FBTztBQUMzQixjQUFJLEtBQUssU0FBUztBQUNsQixjQUFJLElBQUksUUFBUSxJQUFJO0FBQ3BCLGlCQUFPLFdBQVU7QUFBQTtBQUtyQixzQkFBYyxPQUFPLFFBQVE7QUFDekIsY0FBSSxNQUFNLFdBQVUsT0FBTztBQUMzQixjQUFJLE1BQU8sS0FBSSxJQUFJLFVBQVU7QUFDN0IsY0FBSSxJQUFJLE1BQU0sSUFBSSxNQUFNLE1BQU07QUFDOUIsaUJBQU8sV0FBVTtBQUFBO0FBUXJCLDRCQUFvQixPQUFPO0FBQ3ZCLGNBQUksTUFBTSxXQUFVLE9BQU87QUFDM0IsY0FBSSxJQUFLLEtBQUksSUFBSSxPQUFPO0FBQ3hCLGlCQUFPLFdBQVU7QUFBQTtBQUdyQix1QkFBZSxPQUFPO0FBQ2xCLGNBQUksTUFBTSxXQUFVLE9BQU87QUFDM0IsY0FBSSxLQUFJLElBQUk7QUFDWixpQkFBTztBQUFBLFlBQ0gsV0FBVTtBQUFBLFlBQ1YsV0FBVSxDQUFFLEdBQUksTUFBSSxPQUFPLEtBQUssR0FBRyxJQUFJLEdBQUcsR0FBRyxJQUFJO0FBQUEsWUFDakQsV0FBVSxDQUFFLEdBQUksTUFBSSxPQUFPLEtBQUssR0FBRyxJQUFJLEdBQUcsR0FBRyxJQUFJO0FBQUE7QUFBQTtBQUl6RCx3QkFBZ0IsT0FBTztBQUNuQixjQUFJLE1BQU0sV0FBVSxPQUFPO0FBQzNCLGNBQUksS0FBSSxJQUFJO0FBQ1osaUJBQU87QUFBQSxZQUNILFdBQVU7QUFBQSxZQUNWLFdBQVUsQ0FBRSxHQUFJLE1BQUksTUFBTSxLQUFLLEdBQUcsSUFBSSxHQUFHLEdBQUcsSUFBSTtBQUFBLFlBQ2hELFdBQVUsQ0FBRSxHQUFJLE1BQUksT0FBTyxLQUFLLEdBQUcsSUFBSSxHQUFHLEdBQUcsSUFBSTtBQUFBLFlBQ2pELFdBQVUsQ0FBRSxHQUFJLE1BQUksT0FBTyxLQUFLLEdBQUcsSUFBSSxHQUFHLEdBQUcsSUFBSTtBQUFBO0FBQUE7QUFJekQsaUNBQXlCLE9BQU87QUFDNUIsY0FBSSxNQUFNLFdBQVUsT0FBTztBQUMzQixjQUFJLEtBQUksSUFBSTtBQUNaLGlCQUFPO0FBQUEsWUFDSCxXQUFVO0FBQUEsWUFDVixXQUFVLENBQUUsR0FBSSxNQUFJLE1BQU0sS0FBSyxHQUFHLElBQUksR0FBRyxHQUFHLElBQUk7QUFBQSxZQUNoRCxXQUFVLENBQUUsR0FBSSxNQUFJLE9BQU8sS0FBSyxHQUFHLElBQUksR0FBRyxHQUFHLElBQUk7QUFBQTtBQUFBO0FBSXpELDJCQUFtQixPQUFPLFNBQVMsUUFBUTtBQUN2QyxvQkFBVSxXQUFXO0FBQ3JCLG1CQUFTLFVBQVU7QUFFbkIsY0FBSSxNQUFNLFdBQVUsT0FBTztBQUMzQixjQUFJLE9BQU8sTUFBTTtBQUNqQixjQUFJLE1BQU0sQ0FBQyxXQUFVO0FBRXJCLGVBQUssSUFBSSxJQUFNLEtBQUksSUFBSyxRQUFPLFdBQVcsS0FBTSxPQUFPLEtBQUssRUFBRSxXQUFXO0FBQ3JFLGdCQUFJLElBQUssS0FBSSxJQUFJLFFBQVE7QUFDekIsZ0JBQUksS0FBSyxXQUFVO0FBQUE7QUFFdkIsaUJBQU87QUFBQTtBQUdYLCtCQUF1QixPQUFPLFNBQVM7QUFDbkMsb0JBQVUsV0FBVztBQUNyQixjQUFJLE1BQU0sV0FBVSxPQUFPO0FBQzNCLGNBQUksS0FBSSxJQUFJLEdBQUcsS0FBSSxJQUFJLEdBQUcsS0FBSSxJQUFJO0FBQ2xDLGNBQUksTUFBTTtBQUNWLGNBQUksZUFBZSxJQUFJO0FBRXZCLGlCQUFPLFdBQVc7QUFDZCxnQkFBSSxLQUFLLFdBQVUsQ0FBRSxHQUFHLElBQUcsR0FBRyxJQUFHLEdBQUc7QUFDcEMsaUJBQUssTUFBSSxnQkFBZ0I7QUFBQTtBQUc3QixpQkFBTztBQUFBO0FBTVgsbUJBQVUsTUFBTSxTQUFTLFFBQVEsUUFBUSxRQUFRO0FBQzdDLG1CQUFVLFdBQVcsSUFBSyxJQUFLLFVBQVU7QUFFekMsY0FBSSxPQUFPLFdBQVUsUUFBUTtBQUM3QixjQUFJLE9BQU8sV0FBVSxRQUFRO0FBRTdCLGNBQUksS0FBSSxTQUFTO0FBRWpCLGNBQUksT0FBTztBQUFBLFlBQ1AsR0FBSyxNQUFLLElBQUksS0FBSyxLQUFLLEtBQUssS0FBSztBQUFBLFlBQ2xDLEdBQUssTUFBSyxJQUFJLEtBQUssS0FBSyxLQUFLLEtBQUs7QUFBQSxZQUNsQyxHQUFLLE1BQUssSUFBSSxLQUFLLEtBQUssS0FBSyxLQUFLO0FBQUEsWUFDbEMsR0FBSyxNQUFLLElBQUksS0FBSyxLQUFLLEtBQUssS0FBSztBQUFBO0FBR3RDLGlCQUFPLFdBQVU7QUFBQTtBQVVyQixtQkFBVSxjQUFjLFNBQVMsUUFBUSxRQUFRO0FBQzdDLGNBQUksS0FBSyxXQUFVO0FBQ25CLGNBQUksS0FBSyxXQUFVO0FBQ25CLGlCQUFRLE9BQUssSUFBSSxHQUFHLGdCQUFlLEdBQUcsa0JBQWdCLFFBQVMsT0FBSyxJQUFJLEdBQUcsZ0JBQWUsR0FBRyxrQkFBZ0I7QUFBQTtBQWFqSCxtQkFBVSxhQUFhLFNBQVMsUUFBUSxRQUFRLE9BQU87QUFDbkQsY0FBSSxjQUFjLFdBQVUsWUFBWSxRQUFRO0FBQ2hELGNBQUksWUFBWTtBQUVoQixnQkFBTTtBQUVOLHVCQUFhLG1CQUFtQjtBQUNoQyxrQkFBUSxXQUFXLFFBQVEsV0FBVztBQUFBLGlCQUM3QjtBQUFBLGlCQUNBO0FBQ0Qsb0JBQU0sZUFBZTtBQUNyQjtBQUFBLGlCQUNDO0FBQ0Qsb0JBQU0sZUFBZTtBQUNyQjtBQUFBLGlCQUNDO0FBQ0Qsb0JBQU0sZUFBZTtBQUNyQjtBQUFBO0FBRVIsaUJBQU87QUFBQTtBQWFYLG1CQUFVLGVBQWUsU0FBUyxXQUFXLFdBQVcsTUFBTTtBQUMxRCxjQUFJLFlBQVk7QUFDaEIsY0FBSSxZQUFZO0FBQ2hCLGNBQUk7QUFDSixjQUFJLHVCQUF1QixPQUFPO0FBQ2xDLGlCQUFPLFFBQVE7QUFDZixrQ0FBd0IsS0FBSztBQUM3QixrQkFBUSxLQUFLO0FBQ2IsaUJBQU8sS0FBSztBQUVaLG1CQUFTLEtBQUcsR0FBRyxLQUFJLFVBQVUsUUFBUyxNQUFLO0FBQ3ZDLDBCQUFjLFdBQVUsWUFBWSxXQUFXLFVBQVU7QUFDekQsZ0JBQUksY0FBYyxXQUFXO0FBQ3pCLDBCQUFZO0FBQ1osMEJBQVksV0FBVSxVQUFVO0FBQUE7QUFBQTtBQUl4QyxjQUFJLFdBQVUsV0FBVyxXQUFXLFdBQVcsQ0FBQyxTQUFRLE9BQU0sUUFBTyxVQUFVLENBQUMsdUJBQXVCO0FBQ25HLG1CQUFPO0FBQUEsaUJBRU47QUFDRCxpQkFBSyx3QkFBc0I7QUFDM0IsbUJBQU8sV0FBVSxhQUFhLFdBQVUsQ0FBQyxRQUFRLFNBQVE7QUFBQTtBQUFBO0FBUWpFLFlBQUksUUFBUSxXQUFVLFFBQVE7QUFBQSxVQUMxQixXQUFXO0FBQUEsVUFDWCxjQUFjO0FBQUEsVUFDZCxNQUFNO0FBQUEsVUFDTixZQUFZO0FBQUEsVUFDWixPQUFPO0FBQUEsVUFDUCxPQUFPO0FBQUEsVUFDUCxRQUFRO0FBQUEsVUFDUixPQUFPO0FBQUEsVUFDUCxnQkFBZ0I7QUFBQSxVQUNoQixNQUFNO0FBQUEsVUFDTixZQUFZO0FBQUEsVUFDWixPQUFPO0FBQUEsVUFDUCxXQUFXO0FBQUEsVUFDWCxhQUFhO0FBQUEsVUFDYixXQUFXO0FBQUEsVUFDWCxZQUFZO0FBQUEsVUFDWixXQUFXO0FBQUEsVUFDWCxPQUFPO0FBQUEsVUFDUCxnQkFBZ0I7QUFBQSxVQUNoQixVQUFVO0FBQUEsVUFDVixTQUFTO0FBQUEsVUFDVCxNQUFNO0FBQUEsVUFDTixVQUFVO0FBQUEsVUFDVixVQUFVO0FBQUEsVUFDVixlQUFlO0FBQUEsVUFDZixVQUFVO0FBQUEsVUFDVixXQUFXO0FBQUEsVUFDWCxVQUFVO0FBQUEsVUFDVixXQUFXO0FBQUEsVUFDWCxhQUFhO0FBQUEsVUFDYixnQkFBZ0I7QUFBQSxVQUNoQixZQUFZO0FBQUEsVUFDWixZQUFZO0FBQUEsVUFDWixTQUFTO0FBQUEsVUFDVCxZQUFZO0FBQUEsVUFDWixjQUFjO0FBQUEsVUFDZCxlQUFlO0FBQUEsVUFDZixlQUFlO0FBQUEsVUFDZixlQUFlO0FBQUEsVUFDZixlQUFlO0FBQUEsVUFDZixZQUFZO0FBQUEsVUFDWixVQUFVO0FBQUEsVUFDVixhQUFhO0FBQUEsVUFDYixTQUFTO0FBQUEsVUFDVCxTQUFTO0FBQUEsVUFDVCxZQUFZO0FBQUEsVUFDWixXQUFXO0FBQUEsVUFDWCxhQUFhO0FBQUEsVUFDYixhQUFhO0FBQUEsVUFDYixTQUFTO0FBQUEsVUFDVCxXQUFXO0FBQUEsVUFDWCxZQUFZO0FBQUEsVUFDWixNQUFNO0FBQUEsVUFDTixXQUFXO0FBQUEsVUFDWCxNQUFNO0FBQUEsVUFDTixPQUFPO0FBQUEsVUFDUCxhQUFhO0FBQUEsVUFDYixNQUFNO0FBQUEsVUFDTixVQUFVO0FBQUEsVUFDVixTQUFTO0FBQUEsVUFDVCxXQUFXO0FBQUEsVUFDWCxRQUFRO0FBQUEsVUFDUixPQUFPO0FBQUEsVUFDUCxPQUFPO0FBQUEsVUFDUCxVQUFVO0FBQUEsVUFDVixlQUFlO0FBQUEsVUFDZixXQUFXO0FBQUEsVUFDWCxjQUFjO0FBQUEsVUFDZCxXQUFXO0FBQUEsVUFDWCxZQUFZO0FB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
