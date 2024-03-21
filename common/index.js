export const getRandom = (num) => {
  let random = Math.floor((Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, num - 1));
  return random
}

export const formatFloat = (num, decimalNum) => {
  let floatNum = parseFloat(num);
  if (isNaN(floatNum)) {
    return '0.00';
  }

  let x = decimalNum > 2 ? 10000 : (decimalNum === 0 ? 1 : 100)
  floatNum = Math.floor(num * x) / x;
  let str = floatNum.toString();
  let decimal = str.indexOf('.');

  if (decimal < 0 && decimalNum !== 0) {
    decimal = str.length;
    str += '.';
  }
  let n = decimalNum ? decimalNum : (decimalNum === 0 ? 0 : 2)
  while (str.length <= decimal + n) {
    str += '0';
  }

  return str;
}

export const minPriceFormatFloat = (num) => {
  let floatNum = parseFloat(num);
  if (isNaN(floatNum)) {
    return '0.00';
  }

  let str = floatNum.toString();
  let arr = str.split('.')

  if (!arr[1]) {
    return arr[0] + '.00'
  }
  if (arr[1].length === 1) {
    return arr[0] + '.' + arr[1] + '0'
  }

  if (arr[1].length === 2) {
    return arr[0] + '.' + arr[1]
  }


  if (arr[1].length > 2) {
    return arr[0] + '.' + arr[1].substring(0, 1) + (Number(arr[1].substring(1, 2)) + 1)
  }





}