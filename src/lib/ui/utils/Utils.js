class Utils {
  static parseId(id) {
    const idData = id.slice(5).split('%');
    return [Number(idData[0]), idData[1]];
  }

  static getValue(value, defaultValue) {
    if (value) {
      return value;
    } else {
      return defaultValue;
    }
  }

  static ternary(flag, value, defaultValue) {
    if (flag) {
      return value;
    } else {
      return defaultValue;
    }
  }
}

export default Utils;
