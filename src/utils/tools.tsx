export function on<T extends Window | Document | HTMLElement | EventTarget>(
  obj: T | null,
  ...args: Parameters<T['addEventListener']> | [string, Function | null, ...any]
): void {
  if (obj && obj.addEventListener) {
    obj.addEventListener(...(args as Parameters<HTMLElement['addEventListener']>));
  }
}

export function off<T extends Window | Document | HTMLElement | EventTarget>(
  obj: T | null,
  ...args: Parameters<T['removeEventListener']> | [string, Function | null, ...any]
): void {
  if (obj && obj.removeEventListener) {
    obj.removeEventListener(...(args as Parameters<HTMLElement['removeEventListener']>));
  }
}

export const getKoreaNow = () =>{
  const now = new Date(); // 현재 시간
  const utcNow = now.getTime() + (now.getTimezoneOffset() * 60 * 1000); // 현재 시간을 utc로 변환한 밀리세컨드값
  const koreaTimeDiff = 9 * 60 * 60 * 1000; // 한국 시간은 UTC보다 9시간 빠름(9시간의 밀리세컨드 표현)
  const koreaNow = new Date(utcNow + koreaTimeDiff); // utc로 변환된 값을 한국 시간으로 변환시키기 위해 9시간(밀리세컨드)를 더함

  const year = koreaNow.getFullYear();
  const month = ('0' + (koreaNow.getMonth() + 1)).slice(-2);
  const day = ('0' + koreaNow.getDate()).slice(-2);

  const hours = ('0' + koreaNow.getHours()).slice(-2);
  const minutes = ('0' + koreaNow.getMinutes()).slice(-2);
  const seconds = ('0' + koreaNow.getSeconds()).slice(-2);

  return year + '/' + month + '/' + day + ' ' + hours + ':' + minutes + ':' + seconds;
};
