function isWechat(UA) {
  return /MicroMessenger/i.test(UA) ? true : false;
}

function isWeibo(UA) {
  return /Weibo/i.test(UA) ? true : false;
}

function isQQ(UA) {
  return /QQ/i.test(UA) ? true : false;
}

function isMoible(UA) {
  return /(Android|webOS|iPhone|iPod|tablet|BlackBerry|Mobile)/i.test(UA)
    ? true
    : false;
}

function isIOS(UA) {
  return /iPhone|iPad|iPod/i.test(UA) ? true : false;
}

function isAndroid(UA) {
  return /Android/i.test(UA) ? true : false;
}

export function deviceType(UA) {
  if (isMoible(UA)) {
    if (isIOS(UA)) {
      if (isWechat(UA)) {
        return {
          type: "ios",
          env: "wechat",
          masklayer: true,
        };
      }
      if (isWeibo(UA)) {
        return {
          type: "ios",
          env: "weibo",
          masklayer: true,
        };
      }
      if (isQQ(UA)) {
        return {
          type: "ios",
          env: "qq",
          masklayer: true,
        };
      }
      return {
        type: "ios",
      };
    }
    if (isAndroid(UA)) {
      if (isWechat(UA)) {
        return {
          type: "android",
          env: "wechat",
          masklayer: true,
        };
      }
      if (isWeibo(UA)) {
        return {
          type: "android",
          env: "weibo",
          masklayer: true,
        };
      }
      if (isQQ(UA)) {
        return {
          type: "android",
          env: "qq",
          masklayer: true,
        };
      }
      return {
        type: "android",
      };
    }

    return {
      type: "mobile",
    };
  } else {
    return {
      type: "pc",
    };
  }
}


