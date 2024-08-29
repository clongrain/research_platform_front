import moment from "moment/moment";
export const formatDateString = x => (x ? moment(x).format('yyyy-MM-DD') : '');
export const formatDatetimeString = x =>
  x ? moment(x).utc().format('yyyy-MM-DD HH:mm:ss') : '';
export const formatDatetimeStringWithoutYear = x =>
  x ? moment(x).utc().format('MM-DD HH:mm:ss') : '';

export const fontFamily = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"';

export function handleLinkWithoutProtocol(link) {
  if (typeof link != 'string') {
    return link;
  }
  if (link.startsWith('https://') || link.startsWith('http://')) {
    return link;
  }
  return 'https://' + link;
}

export function transformVersion(version) {
  if (!version) {
    return "";
  }
  return version.patch;
  // return parseInt(version.major) + "." + parseInt(version.minor) + "." + parseInt(version.patch);
}

export function checkVersionFormat(version) {
  if (!version) {
    return null;
  }
  try {
    const version_arr = version.split(".")
    if (version_arr.length !== 3) {
      return null;
    }
    return {
      major: version_arr[0],
      minor: version_arr[1],
      patch: version_arr[2]
    }
  } catch (error) {
    return null;
  }
}

export const shadowStyle = {
  boxShadow: "0px 0px 12px 0px rgba(38, 46, 53, 0.12)",
  p: "12px"
}

export const digitInCircle = (num, circleSize = 30, circleBgColor = "#E45C3F", circleFontColor = "#FFFFFF") => {
  /**
   * - num: 在圆圈中显示的数字
   * - circleSize: 圆圈的大小，自动使文字适配大小，单位px
   * - circleBgColor: 圆圈背景颜色
   * - circleFontColor: 字体颜色，默认 #FFFFFF
   */
  const top = -(circleSize / 2);
  const right = -(circleSize / 2 - 1);
  const radius = circleSize / 2;
  const lineHeight = circleSize / 4;
  return `<div style='width:${circleSize}px; height:${circleSize}px; border-radius:${radius}px; background-color:${circleBgColor}; color:${circleFontColor}; text-align:center; position:absolute; top:${top}px; right:${right}px; font-size:${radius}px; line-height:${circleSize}px; font-family:Open Sans;'> \
    ${num} \
  </div>`;
}

export const textUnderPolygon = (text, fontSize = 15, fontColor = "#000000", bgcolor = null, top = 50) => {
  /**
   * - num: 在圆圈中显示的数字
   * - circleSize: 圆圈的大小，自动使文字适配大小，单位px
   * - circleBgColor: 圆圈背景颜色
   * - circleFontColor: 字体颜色，默认 #FFFFFF
   */
  return `<div class='polygon_text' style='height:${fontSize}px; color:${fontColor}; ${bgcolor === null ? '' : 'background-color:' + bgcolor + ";"} text-align:center; position:absolute; top:${top}px; font-size:${fontSize}px; line-height:${fontSize}px; font-family:Open Sans;'> \
    ${text} \
  </div>`;
}

export const digitInCircleSkewing = (num, circleSize = 30, circleBgColor = "#E45C3F", circleFontColor = "#FFFFFF") => {
  /**
   * - num: 在圆圈中显示的数字
   * - circleSize: 圆圈的大小，自动使文字适配大小，单位px
   * - circleBgColor: 圆圈背景颜色
   * - circleFontColor: 字体颜色，默认 #FFFFFF
   */
  const top = -(10 + circleSize / 2);
  const right = -(10 + circleSize / 2);
  const radius = circleSize / 2;
  const lineHeight = circleSize / 4;
  return `<div style='width:${circleSize}px; height:${circleSize}px; border-radius:${radius}px; background-color:${circleBgColor}; color:${circleFontColor}; text-align:center; position:absolute; top:${top}px; right:${right}px; font-size:${radius}px; line-height:${circleSize}px; font-family:Open Sans;'>${num}</div>`;

}

export const decodeInterfaceSymbol = (symbol) => {
  const sub_symbol_arr = symbol.split("::");
  if (sub_symbol_arr.length !== 2) {
    throw new Error(`Interface symbol: '${symbol}' cannot be decode correctly.`);
  }
  return sub_symbol_arr
}

export const stringToColor = (string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export const stringAvatar = (name, size, fontSize) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: size,
      height: size,
      fontSize: fontSize
    },
    children: name.includes(' ') ? `${name.split(' ')[0][0]}${name.split(' ')[1][0]}` : name.substring(name.length - 2, name.length),
  };
}

export const roundOrTakeDecimal = (number) => {
  if (number > 1) {
    return Math.round(number * 10) / 10
  }
  else {
    return Math.round(number * 100) / 100
  }
}

export function returnFileSize(number) {
  if (number < 1024) {
    return `${number} bytes`;
  } else if (number >= 1024 && number < 1048576) {
    return `${(number / 1024).toFixed(1)} KB`;
  } else if (number >= 1048576) {
    return `${(number / 1048576).toFixed(1)} MB`;
  }
}
export const sortby = (attr, ascending) => {
  return (a, b) => {
    a = a[attr]
    b = b[attr]
    if (a === null && b === null) return 0
    else if (b === null) return ascending
    else if (a === null) return -1 * ascending
    else {
      if (typeof a === 'number') return a >= b ? ascending : -1 * ascending
      return a.localeCompare(b, 'zh') * ascending
    }
  }
}
export const getCurrentDate = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  return year + '-' + month + '-' + day
}

export function isNumber (string = ""){
  return /^\d+$/.test(string);
}

export function isChinese(str) {
  return /^[\u4E00-\u9FFF]+$/.test(str);
}