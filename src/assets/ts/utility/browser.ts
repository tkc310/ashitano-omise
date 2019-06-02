export function getUA(): string {
  return window.navigator.userAgent.toLowerCase();
}

export function getDevice(): 'mobile' | 'tablet' | 'other' {
  const ua = getUA();
  if (
    ua.indexOf('iphone') > 0 ||
    ua.indexOf('ipod') > 0 ||
    (ua.indexOf('android') > 0 && ua.indexOf('mobile') > 0)
  ) {
    return 'mobile';
  }
  else if (
    ua.indexOf('ipad') > 0 ||
    ua.indexOf('android') > 0 ||
    ua.indexOf('silk') > 0 ||
    ua.indexOf('kindle') > 0
  ) {
    return 'tablet';
  }
  else {
    return 'other';
  }
}

export function isPC(): boolean {
  const device = getDevice();
  return device === 'other';
}

export function isMobile(): boolean {
  const device = getDevice();
  return device === 'mobile';
}

export function isTablet(): boolean {
  const device = getDevice();
  return device === 'tablet';
}
