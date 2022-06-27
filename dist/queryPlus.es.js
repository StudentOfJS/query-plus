var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import { useReducer, useRef, useEffect } from "react";
const encodedJs = "dmFyIGs9T2JqZWN0LmRlZmluZVByb3BlcnR5LGo9T2JqZWN0LmRlZmluZVByb3BlcnRpZXM7dmFyIEE9T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnM7dmFyIFc9T2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9sczt2YXIgUT1PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LHY9T2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTt2YXIgQj0ocixhLGwpPT5hIGluIHI/ayhyLGEse2VudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwLHZhbHVlOmx9KTpyW2FdPWwsZj0ocixhKT0+e2Zvcih2YXIgbCBpbiBhfHwoYT17fSkpUS5jYWxsKGEsbCkmJkIocixsLGFbbF0pO2lmKFcpZm9yKHZhciBsIG9mIFcoYSkpdi5jYWxsKGEsbCkmJkIocixsLGFbbF0pO3JldHVybiByfSxHPShyLGEpPT5qKHIsQShhKSk7KGZ1bmN0aW9uKCl7InVzZSBzdHJpY3QiO2Z1bmN0aW9uIHIodCl7cmV0dXJuIG5ldyBQcm9taXNlKChlLG4pPT57dC5vbmNvbXBsZXRlPXQub25zdWNjZXNzPSgpPT5lKHQucmVzdWx0KSx0Lm9uYWJvcnQ9dC5vbmVycm9yPSgpPT5uKHQuZXJyb3IpfSl9ZnVuY3Rpb24gYSh0LGUpe2NvbnN0IG49aW5kZXhlZERCLm9wZW4odCk7bi5vbnVwZ3JhZGVuZWVkZWQ9KCk9Pm4ucmVzdWx0LmNyZWF0ZU9iamVjdFN0b3JlKGUpO2NvbnN0IGM9cihuKTtyZXR1cm4obyxkKT0+Yy50aGVuKGk9PmQoaS50cmFuc2FjdGlvbihlLG8pLm9iamVjdFN0b3JlKGUpKSl9bGV0IGw7ZnVuY3Rpb24gdSgpe3JldHVybiBsfHwobD1hKCJrZXl2YWwtc3RvcmUiLCJrZXl2YWwiKSksbH1mdW5jdGlvbiBDKHQsZT11KCkpe3JldHVybiBlKCJyZWFkb25seSIsbj0+cihuLmdldCh0KSkpfWZ1bmN0aW9uIE4odCxlLG49dSgpKXtyZXR1cm4gbigicmVhZHdyaXRlIixjPT4oYy5wdXQoZSx0KSxyKGMudHJhbnNhY3Rpb24pKSl9ZnVuY3Rpb24gRih0LGUsbj11KCkpe3JldHVybiBuKCJyZWFkd3JpdGUiLGM9Pm5ldyBQcm9taXNlKChvLGQpPT57Yy5nZXQodCkub25zdWNjZXNzPWZ1bmN0aW9uKCl7dHJ5e2MucHV0KGUodGhpcy5yZXN1bHQpLHQpLG8ocihjLnRyYW5zYWN0aW9uKSl9Y2F0Y2goaSl7ZChpKX19fSkpfWZ1bmN0aW9uIHgodCxlPXUoKSl7cmV0dXJuIGUoInJlYWR3cml0ZSIsbj0+KG4uZGVsZXRlKHQpLHIobi50cmFuc2FjdGlvbikpKX1jb25zdCBVPSh0LGUpPT5lP3QrZTxEYXRlLm5vdygpOiEwLFM9dD0+dHlwZW9mIHQ9PSJvYmplY3QiJiYhQXJyYXkuaXNBcnJheSh0KSYmdCE9PW51bGwsdz0odCxlLG49e30pPT4oT2JqZWN0LmtleXModCkuZm9yRWFjaChjPT57bGV0IG89ZT9lKyIuIitjOmM7Uyh0W2NdKT93KHRbY10sbyxuKTpuW29dPUFycmF5LmlzQXJyYXkodFtjXSk/dFtjXS5zb3J0KCk6dFtjXX0pLE9iamVjdC5lbnRyaWVzKG4pLnNvcnQoKSksSj10PT50LmZsYXRNYXAoZT0+UyhlKT93KGUpOltlXSkuc29ydCgpLEQ9dD0+e3ZhciBlLG47cmV0dXJuKG49KGU9dD09bnVsbD92b2lkIDA6dC5tZXRob2QpPT1udWxsP3ZvaWQgMDplLnRvVXBwZXJDYXNlKCkpIT1udWxsP246IkdFVCJ9LFg9KHQsZSxuKT0+e2xldCBjPUFycmF5LmlzQXJyYXkodCk/ImFycmF5Ijp0eXBlb2YgdCxvPUFycmF5LmlzQXJyYXkoZSk/ImFycmF5Ijp0eXBlb2YgZTtyZXR1cm4gYyE9PW8/ITE6YyE9PSJvYmplY3QiJiZjIT09ImFycmF5Ij9jPT09bzpuJiZjPT09Im9iamVjdCI/bi5tYXAoZD0+dFtkXT09PWVbZF0pLmV2ZXJ5KGQ9PmQpOihjPT09ImFycmF5IiYmKHQ9Sih0KSxlPUooZSkpLCFuJiZjPT09Im9iamVjdCImJih0PXcodCksZT13KGUpKSxKU09OLnN0cmluZ2lmeSh0KT09PUpTT04uc3RyaW5naWZ5KGUpKX0sTT10PT5uZXcgRnVuY3Rpb24oYHJldHVybiAke2RlY29kZVVSSSh0KX1gKSgpLEw9ImRtRnlJRzA5VDJKcVpXTjBMbVJsWm1sdVpWQnliM0JsY25SNUxGUTlUMkpxWldOMExtUmxabWx1WlZCeWIzQmxjblJwWlhNN2RtRnlJRVE5VDJKcVpXTjBMbWRsZEU5M2JsQnliM0JsY25SNVJHVnpZM0pwY0hSdmNuTTdkbUZ5SUdjOVQySnFaV04wTG1kbGRFOTNibEJ5YjNCbGNuUjVVM2x0WW05c2N6dDJZWElnVFQxUFltcGxZM1F1Y0hKdmRHOTBlWEJsTG1oaGMwOTNibEJ5YjNCbGNuUjVMRTg5VDJKcVpXTjBMbkJ5YjNSdmRIbHdaUzV3Y205d1pYSjBlVWx6Ulc1MWJXVnlZV0pzWlR0MllYSWdaRDBvYVN4ekxHNHBQVDV6SUdsdUlHay9iU2hwTEhNc2UyVnVkVzFsY21GaWJHVTZJVEFzWTI5dVptbG5kWEpoWW14bE9pRXdMSGR5YVhSaFlteGxPaUV3TEhaaGJIVmxPbTU5S1RwcFczTmRQVzRzYUQwb2FTeHpLVDArZTJadmNpaDJZWElnYmlCcGJpQnpmSHdvY3oxN2ZTa3BUUzVqWVd4c0tITXNiaWttSm1Rb2FTeHVMSE5iYmwwcE8ybG1LR2NwWm05eUtIWmhjaUJ1SUc5bUlHY29jeWtwVHk1allXeHNLSE1zYmlrbUptUW9hU3h1TEhOYmJsMHBPM0psZEhWeWJpQnBmU3h3UFNocExITXBQVDVVS0drc1JDaHpLU2s3S0daMWJtTjBhVzl1S0NsN0luVnpaU0J6ZEhKcFkzUWlPMk52Ym5OMElHazlZWE41Ym1Nb2UyWnVPblFzZG1Gc2FXUmhkR1U2WlN4cGJuUmxjblpoYkRwaExHMWhlRUYwZEdWdGNIUnpPbklzWVhSMFpXMXdkSE02WXowd2ZTazlQbnRoYzNsdVl5Qm1kVzVqZEdsdmJpQm1LSFVzZVNsN2RISjVlMk52Ym5OMElHdzlZWGRoYVhRZ2RDZ3BPMmxtS0dNckt5eGxLR3dwS1h0cFppaHlKaVpqUFQwOWNpbHlaWFIxY200Z2VTaHVaWGNnUlhKeWIzSW9Ja1Y0WTJWbFpHVmtJRzFoZUNCaGRIUmxiWEIwY3lJcEtUdGhkMkZwZENCelpYUlVhVzFsYjNWMEtHWXNZU3gxTEhrcGZXVnNjMlVnY21WMGRYSnVJSFVvYkNsOVkyRjBZMmdvYkNsN1kyOXVjMjlzWlM1bGNuSnZjaWhnY0c5c2JHbHVaeUJGY25KdmNqb2dKSHNvYkQwOWJuVnNiRDkyYjJsa0lEQTZiQzV0WlhOellXZGxLWHg4SW1OdmJtNWxZM1JwYjI0Z1ptRnBiR1ZrSW4xZ0tYMTljbVYwZFhKdUlHNWxkeUJRY205dGFYTmxLR1lwZlN4elBYUTlQblI1Y0dWdlppQjBQVDBpYjJKcVpXTjBJaVltSVVGeWNtRjVMbWx6UVhKeVlYa29kQ2ttSm5RaFBUMXVkV3hzTEc0OUtIUXNaU3hoUFh0OUtUMCtLRTlpYW1WamRDNXJaWGx6S0hRcExtWnZja1ZoWTJnb2NqMCtlMnhsZENCalBXVS9aU3NpTGlJcmNqcHlPM01vZEZ0eVhTay9iaWgwVzNKZExHTXNZU2s2WVZ0alhUMUJjbkpoZVM1cGMwRnljbUY1S0hSYmNsMHBQM1JiY2wwdWMyOXlkQ2dwT25SYmNsMTlLU3hQWW1wbFkzUXVaVzUwY21sbGN5aGhLUzV6YjNKMEtDa3BMRUU5ZEQwK2RDNW1iR0YwVFdGd0tHVTlQbk1vWlNrL2JpaGxLVHBiWlYwcExuTnZjblFvS1N4M1BTaDBMR1VzWVNrOVBudHNaWFFnY2oxQmNuSmhlUzVwYzBGeWNtRjVLSFFwUHlKaGNuSmhlU0k2ZEhsd1pXOW1JSFFzWXoxQmNuSmhlUzVwYzBGeWNtRjVLR1VwUHlKaGNuSmhlU0k2ZEhsd1pXOW1JR1U3Y21WMGRYSnVJSEloUFQxalB5RXhPbkloUFQwaWIySnFaV04wSWlZbWNpRTlQU0poY25KaGVTSS9jajA5UFdNNllTWW1jajA5UFNKdlltcGxZM1FpUDJFdWJXRndLR1k5UG5SYlpsMDlQVDFsVzJaZEtTNWxkbVZ5ZVNobVBUNW1LVG9vY2owOVBTSmhjbkpoZVNJbUppaDBQVUVvZENrc1pUMUJLR1VwS1N3aFlTWW1jajA5UFNKdlltcGxZM1FpSmlZb2REMXVLSFFwTEdVOWJpaGxLU2tzU2xOUFRpNXpkSEpwYm1kcFpua29kQ2s5UFQxS1UwOU9Mbk4wY21sdVoybG1lU2hsS1NsOU8zTmxiR1l1WVdSa1JYWmxiblJNYVhOMFpXNWxjaWdpYldWemMyRm5aU0lzZEQwK2UyTnZibk4wZTNSNWNHVTZaWDA5ZEM1a1lYUmhPMnhsZENCaFBXNWxkeUJCWW05eWRFTnZiblJ5YjJ4c1pYSXNjajFoUFQxdWRXeHNQM1p2YVdRZ01EcGhMbk5wWjI1aGJEdHBaaWhsUFQwOUltTmhibU5sYkNJbUppaGhQVDF1ZFd4c2ZIeGhMbUZpYjNKMEtDa3BMR1U5UFQwaWNHOXNiQ0lwZTJOdmJuTjBlM1Z5YkRwakxHOXdkR2x2Ym5NNlppeHBiblJsY25aaGJEcDFMRzFoZUVGMGRHVnRjSFJ6T25rc1pYaHBjM1JwYm1kRVlYUmhPbXdzWTI5dGNHRnlaVXRsZVhNNlJYMDlkQzVrWVhSaE8ya29lMlp1T2lncFBUNW1aWFJqYUNoakxHWS9jQ2hvS0h0OUxHWXBMSHR6YVdkdVlXdzZjbjBwT250emFXZHVZV3c2Y24wcExuUm9aVzRvYnowK2UybG1LQ0Z2TG05cmZIeHZMbk4wWVhSMWN6MDlQVFF3TkNsMGFISnZkeUJ1WlhjZ1JYSnliM0lvWUVoVVZGQWdaWEp5YjNJaElGTjBZWFIxY3pvZ0pIdHZMbk4wWVhSMWMzMWdLVHRwWmlodkxuTjBZWFIxY3owOVBUUXdNeWwwYUhKdmR5QnVaWGNnUlhKeWIzSW9JbFZ1WVhWMGFHOXlhWHBsWkNFaUtUdHlaWFIxY200Z2J5NXFjMjl1S0NsOUtTeHBiblJsY25aaGJEcDFMRzFoZUVGMGRHVnRjSFJ6T25rc2RtRnNhV1JoZEdVNmJ6MCtJWGNvYkN4dkxFVXBmU2t1ZEdobGJpaHZQVDU3YzJWc1ppNXdiM04wVFdWemMyRm5aU2g3ZEhsd1pUb2lSRUZVUVNJc1pHRjBZVHB2ZlNsOUtTNWpZWFJqYUNodlBUNTdjMlZzWmk1d2IzTjBUV1Z6YzJGblpTaDdkSGx3WlRwdkxtMWxjM05oWjJWOGZDSlZibXR1YjNkdUlHVnljbTl5SW4wcGZTbDlmU2w5S1NncE93bz0iLFA9dHlwZW9mIHdpbmRvdyE9InVuZGVmaW5lZCImJndpbmRvdy5CbG9iJiZuZXcgQmxvYihbYXRvYihMKV0se3R5cGU6InRleHQvamF2YXNjcmlwdDtjaGFyc2V0PXV0Zi04In0pO2Z1bmN0aW9uIE8oKXtjb25zdCB0PVAmJih3aW5kb3cuVVJMfHx3aW5kb3cud2Via2l0VVJMKS5jcmVhdGVPYmplY3RVUkwoUCk7dHJ5e3JldHVybiB0P25ldyBXb3JrZXIodCx7fSk6bmV3IFdvcmtlcigiZGF0YTphcHBsaWNhdGlvbi9qYXZhc2NyaXB0O2Jhc2U2NCwiK0wse3R5cGU6Im1vZHVsZSJ9KX1maW5hbGx5e3QmJih3aW5kb3cuVVJMfHx3aW5kb3cud2Via2l0VVJMKS5yZXZva2VPYmplY3RVUkwodCl9fWNvbnN0IFk9YSgidXNlc3RvcmUtZGIiLCJ1c2VzdG9yZS1kYiIpLEk9dD0+eCh0LFkpLHo9dD0+Qyh0LFkpLEs9KHQsZSk9Pk4odCxlLFkpLFY9KHQsZSk9PkYodCxlLFkpLHk9dD0+e2lmKCF0Lm9rfHx0LnN0YXR1cz09PTQwNCl0aHJvdyBuZXcgRXJyb3IoYEhUVFAgZXJyb3IhIFN0YXR1czogJHt0LnN0YXR1c31gKTtpZih0LnN0YXR1cz09PTQwMyl0aHJvdyBuZXcgRXJyb3IoIlVuYXV0aG9yaXplZCEiKTtyZXR1cm4gdC5qc29uKCl9LFI9dD0+e3NlbGYucG9zdE1lc3NhZ2Uoe3R5cGU6dC5tZXNzYWdlfHwiVW5rbm93biBlcnJvciJ9KX07c2VsZi5hZGRFdmVudExpc3RlbmVyKCJtZXNzYWdlIix0PT57Y29uc3R7dHlwZTplfT10LmRhdGE7bGV0IG49bmV3IEFib3J0Q29udHJvbGxlcixjPW49PW51bGw/dm9pZCAwOm4uc2lnbmFsLG89bmV3IE87aWYoZT09PSJjYW5jZWwiJiYobj09bnVsbHx8bi5hYm9ydCgpLG89PW51bGx8fG8ucG9zdE1lc3NhZ2Uoe3R5cGU6ImNhbmNlbCJ9KSxvLnRlcm1pbmF0ZSgpKSxlPT09InBvbGwiKXtsZXR7ZXhpc3RpbmdEYXRhOmQsdXJsOmksb3B0aW9uczpoLGludGVydmFsOlQsbWF4QXR0ZW1wdHM6Zyxjb21wYXJlS2V5czptfT10LmRhdGE7ZmV0Y2goaSxoP0coZih7fSxoKSx7c2lnbmFsOmN9KTp7c2lnbmFsOmN9KS50aGVuKHkpLnRoZW4ocD0+e1goZCxwLG0pP3NlbGYucG9zdE1lc3NhZ2Uoe3R5cGU6IkNBQ0hFRCIsZGF0YTpwfSk6KEsoaSx7dGltZXN0YW1wOkRhdGUubm93KCksZGF0YTpwfSksc2VsZi5wb3N0TWVzc2FnZSh7dHlwZToiREFUQSIsZGF0YTpwfSkpfSkuY2F0Y2goUikuZmluYWxseSgoKT0+e289PW51bGx8fG8ucG9zdE1lc3NhZ2Uoe3R5cGU6ZSx1cmw6aSxvcHRpb25zOmgsaW50ZXJ2YWw6VCxtYXhBdHRlbXB0czpnLGV4aXN0aW5nRGF0YTpkLGNvbXBhcmVLZXlzOm19KX0pLG89PW51bGx8fG8uYWRkRXZlbnRMaXN0ZW5lcigibWVzc2FnZSIsKHtkYXRhOnB9KT0+e3NlbGYucG9zdE1lc3NhZ2UocCl9KX1pZihlPT09ImZldGNoIil7bGV0e2V4aXN0aW5nRGF0YTpkLHVybDppLG9wdGlvbnM6aCxtYXhBZ2U6VCxtaWRkbGV3YXJlOmcsdXBkYXRlOm19PXQuZGF0YTtjb25zdCBwPXM9PntnJiYocz1NKGcpKHMpKSwoIWR8fCFYKGQscykpJiYoc2VsZi5wb3N0TWVzc2FnZSh7dHlwZToiREFUQSIsZGF0YTpzfSksSyhpLnRvU3RyaW5nKCkse2RhdGE6cyx0aW1lc3RhbXA6RGF0ZS5ub3coKSxtYXhBZ2U6VH0pLnRoZW4oKCk9Pntjb25zb2xlLmluZm8oInNhdmVkIGRhdGEiKX0pLmNhdGNoKCgpPT57Y29uc29sZS5pbmZvKCJjb3VsZG4ndCBhY2Nlc3MgaW5kZXhlZERCIHRvIHNhdmUgZGF0YSIpfSkpLHNlbGYucG9zdE1lc3NhZ2Uoe3R5cGU6IkNPTVBMRVRFIn0pfTtsZXQgWj1EKGgpO1o9PT0iREVMRVRFIiYmKEkoaS50b1N0cmluZygpKSxmZXRjaChpLGgpLnRoZW4oKCk9PnttP2ZldGNoKG0udXJsLG0ub3B0aW9ucykudGhlbih5KS50aGVuKHApLmNhdGNoKHM9Pnt0aHJvdyBzfSk6c2VsZi5wb3N0TWVzc2FnZSh7dHlwZToiQ09NUExFVEUifSl9KS5jYXRjaChSKSksWj09PSJHRVQiJiYoeihpLnRvU3RyaW5nKCkpLnRoZW4ocz0+e2lmKCFzKXRocm93IG5ldyBFcnJvcigibm8gdmFsdWUgZm91bmQgaW4gZGIiKTtpZihVKHM9PW51bGw/dm9pZCAwOnMubWF4QWdlLHM9PW51bGw/dm9pZCAwOnMudGltZXN0YW1wKSl0aHJvdyBJKGkudG9TdHJpbmcoKSksbmV3IEVycm9yKCJkYXRhIGV4cGlyZWQiKTtzZWxmLnBvc3RNZXNzYWdlKFgoZCxzPT1udWxsP3ZvaWQgMDpzLmRhdGEpP3t0eXBlOiJDQUNIRUQifTp7dHlwZToiUFJFX0xPQUQiLGRhdGE6cz09bnVsbD92b2lkIDA6cy5kYXRhfSl9KS5jYXRjaChzPT57Y29uc29sZS5pbmZvKHM9PW51bGw/dm9pZCAwOnMubWVzc2FnZSl9KSxmZXRjaChpLGg/RyhmKHt9LGgpLHtzaWduYWw6Y30pOntzaWduYWw6Y30pLnRoZW4oeSkudGhlbihwKS5jYXRjaChSKSksKFo9PT0iUFVUInx8Wj09PSJQT1NUIikmJmZldGNoKGksaD9HKGYoe30saCkse3NpZ25hbDpjfSk6e3NpZ25hbDpjfSkudGhlbih5KS50aGVuKHM9PnttP2ZldGNoKG0udXJsLG0ub3B0aW9ucykudGhlbih5KS50aGVuKHApLmNhdGNoKGI9Pnt0aHJvdyBifSk6VihpLnRvU3RyaW5nKCksYj0+e2xldCBFPURhdGUubm93KCksSD1TKHMpJiZTKGI9PW51bGw/dm9pZCAwOmIuZGF0YSk/ZihmKHt9LGIuZGF0YSkscyk6cztyZXR1cm4gc2VsZi5wb3N0TWVzc2FnZSh7dHlwZTpaLGRhdGE6SH0pLHt0aW1lc3RhbXA6RSxtYXhBZ2U6VCxkYXRhOkh9fSkuY2F0Y2goKCk9Pntjb25zb2xlLmluZm8oInVwZGF0ZSBzdG9yZSBmYWlsZWQiKX0pLmZpbmFsbHkoKCk9PntzZWxmLnBvc3RNZXNzYWdlKHt0eXBlOiJDT01QTEVURSJ9KX0pfSkuY2F0Y2goUil9fSl9KSgpOwo=";
const blob = typeof window !== "undefined" && window.Blob && new Blob([atob(encodedJs)], { type: "text/javascript;charset=utf-8" });
function WorkerWrapper() {
  const objURL = blob && (window.URL || window.webkitURL).createObjectURL(blob);
  try {
    return objURL ? new Worker(objURL, {}) : new Worker("data:application/javascript;base64," + encodedJs, { type: "module" });
  } finally {
    objURL && (window.URL || window.webkitURL).revokeObjectURL(objURL);
  }
}
const initialState = {
  data: void 0,
  error: void 0,
  loading: false,
  preload: false,
  update: true
};
function reducer(state, action) {
  switch (action.type) {
    case "pre-load":
      return __spreadProps(__spreadValues({}, state), { data: action.data, loading: false, preload: true, error: void 0 });
    case "data":
      return __spreadProps(__spreadValues({}, state), { data: action.data, loading: false, preload: false, error: void 0 });
    case "error":
      return __spreadProps(__spreadValues({}, state), { error: action.error, loading: false, preload: false });
    case "loading":
      return __spreadProps(__spreadValues({}, state), { loading: action.loading });
    default:
      return state;
  }
}
const DAY = 24 * 60 * 60 * 1e3;
function cleanupWorker(worker) {
  worker == null ? void 0 : worker.postMessage({ type: "cancel" });
  worker == null ? void 0 : worker.terminate();
  worker = void 0;
}
const serializeFunction = (f) => encodeURI(f.toString());
function useFetch() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const workerRef = useRef();
  const fetchWorker = async ({
    url,
    options,
    maxAge = DAY,
    middleware
  }) => {
    let worker = workerRef.current;
    dispatch({
      type: "loading",
      loading: true
    });
    worker == null ? void 0 : worker.addEventListener("message", ({
      data: {
        type,
        data
      }
    }) => {
      switch (type) {
        case "CACHED":
        case "COMPLETE":
          dispatch({
            type: "loading",
            loading: false
          });
          break;
        case "DATA":
          dispatch({
            type: "data",
            data
          });
          break;
        case "PRE_LOAD":
          dispatch({
            type: "pre-load",
            data
          });
          break;
        default:
          dispatch({
            type: "error",
            error: new Error(type)
          });
          break;
      }
    });
    let serializedMw = middleware ? serializeFunction(middleware) : void 0;
    worker == null ? void 0 : worker.postMessage({
      type: "fetch",
      url,
      options,
      existingData: state.data,
      middleware: serializedMw,
      maxAge
    });
  };
  const pollWorker = async ({
    url,
    interval = 5e3,
    options,
    maxAttempts = 100,
    compareKeys
  }) => {
    let worker = workerRef.current;
    dispatch({
      type: "loading",
      loading: true
    });
    worker == null ? void 0 : worker.addEventListener("message", ({
      data: {
        type,
        data
      }
    }) => {
      if (type === "COMPLETE")
        dispatch({
          type: "loading",
          loading: false
        });
      else if (type === "DATA")
        dispatch({
          type: "data",
          data
        });
      else
        dispatch({
          type: "error",
          error: new Error(type)
        });
    });
    worker == null ? void 0 : worker.postMessage({
      type: "poll",
      url,
      interval,
      maxAttempts,
      options,
      existingData: state.data,
      compareKeys
    });
  };
  useEffect(() => {
    workerRef.current = new WorkerWrapper();
    return () => {
      cleanupWorker(workerRef.current);
    };
  }, []);
  return __spreadValues({
    fetchWorker,
    pollWorker
  }, state);
}
export { useFetch };
