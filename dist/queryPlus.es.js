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
import "idb-keyval";
const encodedJs = "dmFyIGs9T2JqZWN0LmRlZmluZVByb3BlcnR5LGo9T2JqZWN0LmRlZmluZVByb3BlcnRpZXM7dmFyIEE9T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnM7dmFyIFc9T2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9sczt2YXIgUT1PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LHY9T2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTt2YXIgQj0oaCxkLGwpPT5kIGluIGg/ayhoLGQse2VudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwLHZhbHVlOmx9KTpoW2RdPWwsWj0oaCxkKT0+e2Zvcih2YXIgbCBpbiBkfHwoZD17fSkpUS5jYWxsKGQsbCkmJkIoaCxsLGRbbF0pO2lmKFcpZm9yKHZhciBsIG9mIFcoZCkpdi5jYWxsKGQsbCkmJkIoaCxsLGRbbF0pO3JldHVybiBofSxUPShoLGQpPT5qKGgsQShkKSk7KGZ1bmN0aW9uKCl7InVzZSBzdHJpY3QiO2Z1bmN0aW9uIGgodCl7cmV0dXJuIG5ldyBQcm9taXNlKChlLG4pPT57dC5vbmNvbXBsZXRlPXQub25zdWNjZXNzPSgpPT5lKHQucmVzdWx0KSx0Lm9uYWJvcnQ9dC5vbmVycm9yPSgpPT5uKHQuZXJyb3IpfSl9ZnVuY3Rpb24gZCh0LGUpe2NvbnN0IG49aW5kZXhlZERCLm9wZW4odCk7bi5vbnVwZ3JhZGVuZWVkZWQ9KCk9Pm4ucmVzdWx0LmNyZWF0ZU9iamVjdFN0b3JlKGUpO2NvbnN0IGM9aChuKTtyZXR1cm4oYSxyKT0+Yy50aGVuKGk9PnIoaS50cmFuc2FjdGlvbihlLGEpLm9iamVjdFN0b3JlKGUpKSl9bGV0IGw7ZnVuY3Rpb24gdygpe3JldHVybiBsfHwobD1kKCJrZXl2YWwtc3RvcmUiLCJrZXl2YWwiKSksbH1mdW5jdGlvbiBEKHQsZT13KCkpe3JldHVybiBlKCJyZWFkb25seSIsbj0+aChuLmdldCh0KSkpfWZ1bmN0aW9uIEModCxlLG49dygpKXtyZXR1cm4gbigicmVhZHdyaXRlIixjPT4oYy5wdXQoZSx0KSxoKGMudHJhbnNhY3Rpb24pKSl9ZnVuY3Rpb24gTih0LGUsbj13KCkpe3JldHVybiBuKCJyZWFkd3JpdGUiLGM9Pm5ldyBQcm9taXNlKChhLHIpPT57Yy5nZXQodCkub25zdWNjZXNzPWZ1bmN0aW9uKCl7dHJ5e2MucHV0KGUodGhpcy5yZXN1bHQpLHQpLGEoaChjLnRyYW5zYWN0aW9uKSl9Y2F0Y2goaSl7cihpKX19fSkpfWZ1bmN0aW9uIEYodCxlPXcoKSl7cmV0dXJuIGUoInJlYWR3cml0ZSIsbj0+KG4uZGVsZXRlKHQpLGgobi50cmFuc2FjdGlvbikpKX1mdW5jdGlvbiB4KCl7Y29uc3Qgbj1kKCJ1c2VzdG9yZS1kYiIsInVzZXN0b3JlLWRiIik7cmV0dXJue3JlbW92ZTpvPT5GKG8sbiksZ2V0RGF0YTpvPT5EKG8sbiksc2V0RGF0YToobyxmKT0+QyhvLGYsbiksdXBkYXRlRGF0YToobyxmKT0+TihvLGYsbil9fWNvbnN0IFU9KHQsZSk9PmU/dCtlPERhdGUubm93KCk6ITAsZz10PT50eXBlb2YgdD09Im9iamVjdCImJiFBcnJheS5pc0FycmF5KHQpJiZ0IT09bnVsbCxZPSh0LGUsbj17fSk9PihPYmplY3Qua2V5cyh0KS5mb3JFYWNoKGM9PntsZXQgYT1lP2UrIi4iK2M6YztnKHRbY10pP1kodFtjXSxhLG4pOm5bYV09QXJyYXkuaXNBcnJheSh0W2NdKT90W2NdLnNvcnQoKTp0W2NdfSksT2JqZWN0LmVudHJpZXMobikuc29ydCgpKSxKPXQ9PnQuZmxhdE1hcChlPT5nKGUpP1koZSk6W2VdKS5zb3J0KCksTT10PT57dmFyIGUsbjtyZXR1cm4obj0oZT10PT1udWxsP3ZvaWQgMDp0Lm1ldGhvZCk9PW51bGw/dm9pZCAwOmUudG9VcHBlckNhc2UoKSkhPW51bGw/bjoiR0VUIn0sRz0odCxlLG4pPT57bGV0IGM9QXJyYXkuaXNBcnJheSh0KT8iYXJyYXkiOnR5cGVvZiB0LGE9QXJyYXkuaXNBcnJheShlKT8iYXJyYXkiOnR5cGVvZiBlO3JldHVybiBjIT09YT8hMTpjIT09Im9iamVjdCImJmMhPT0iYXJyYXkiP2M9PT1hOm4mJmM9PT0ib2JqZWN0Ij9uLm1hcChyPT50W3JdPT09ZVtyXSkuZXZlcnkocj0+cik6KGM9PT0iYXJyYXkiJiYodD1KKHQpLGU9SihlKSksIW4mJmM9PT0ib2JqZWN0IiYmKHQ9WSh0KSxlPVkoZSkpLEpTT04uc3RyaW5naWZ5KHQpPT09SlNPTi5zdHJpbmdpZnkoZSkpfSxMPXQ9PnQ/bmV3IEZ1bmN0aW9uKGByZXR1cm4gJHtkZWNvZGVVUkkodCl9YCkoKTplPT5lLFA9ImRtRnlJRzA5VDJKcVpXTjBMbVJsWm1sdVpWQnliM0JsY25SNUxGUTlUMkpxWldOMExtUmxabWx1WlZCeWIzQmxjblJwWlhNN2RtRnlJRVE5VDJKcVpXTjBMbWRsZEU5M2JsQnliM0JsY25SNVJHVnpZM0pwY0hSdmNuTTdkbUZ5SUdjOVQySnFaV04wTG1kbGRFOTNibEJ5YjNCbGNuUjVVM2x0WW05c2N6dDJZWElnVFQxUFltcGxZM1F1Y0hKdmRHOTBlWEJsTG1oaGMwOTNibEJ5YjNCbGNuUjVMRTg5VDJKcVpXTjBMbkJ5YjNSdmRIbHdaUzV3Y205d1pYSjBlVWx6Ulc1MWJXVnlZV0pzWlR0MllYSWdaRDBvYVN4ekxHNHBQVDV6SUdsdUlHay9iU2hwTEhNc2UyVnVkVzFsY21GaWJHVTZJVEFzWTI5dVptbG5kWEpoWW14bE9pRXdMSGR5YVhSaFlteGxPaUV3TEhaaGJIVmxPbTU5S1RwcFczTmRQVzRzYUQwb2FTeHpLVDArZTJadmNpaDJZWElnYmlCcGJpQnpmSHdvY3oxN2ZTa3BUUzVqWVd4c0tITXNiaWttSm1Rb2FTeHVMSE5iYmwwcE8ybG1LR2NwWm05eUtIWmhjaUJ1SUc5bUlHY29jeWtwVHk1allXeHNLSE1zYmlrbUptUW9hU3h1TEhOYmJsMHBPM0psZEhWeWJpQnBmU3h3UFNocExITXBQVDVVS0drc1JDaHpLU2s3S0daMWJtTjBhVzl1S0NsN0luVnpaU0J6ZEhKcFkzUWlPMk52Ym5OMElHazlZWE41Ym1Nb2UyWnVPblFzZG1Gc2FXUmhkR1U2WlN4cGJuUmxjblpoYkRwaExHMWhlRUYwZEdWdGNIUnpPbklzWVhSMFpXMXdkSE02WXowd2ZTazlQbnRoYzNsdVl5Qm1kVzVqZEdsdmJpQm1LSFVzZVNsN2RISjVlMk52Ym5OMElHdzlZWGRoYVhRZ2RDZ3BPMmxtS0dNckt5eGxLR3dwS1h0cFppaHlKaVpqUFQwOWNpbHlaWFIxY200Z2VTaHVaWGNnUlhKeWIzSW9Ja1Y0WTJWbFpHVmtJRzFoZUNCaGRIUmxiWEIwY3lJcEtUdGhkMkZwZENCelpYUlVhVzFsYjNWMEtHWXNZU3gxTEhrcGZXVnNjMlVnY21WMGRYSnVJSFVvYkNsOVkyRjBZMmdvYkNsN1kyOXVjMjlzWlM1bGNuSnZjaWhnY0c5c2JHbHVaeUJGY25KdmNqb2dKSHNvYkQwOWJuVnNiRDkyYjJsa0lEQTZiQzV0WlhOellXZGxLWHg4SW1OdmJtNWxZM1JwYjI0Z1ptRnBiR1ZrSW4xZ0tYMTljbVYwZFhKdUlHNWxkeUJRY205dGFYTmxLR1lwZlN4elBYUTlQblI1Y0dWdlppQjBQVDBpYjJKcVpXTjBJaVltSVVGeWNtRjVMbWx6UVhKeVlYa29kQ2ttSm5RaFBUMXVkV3hzTEc0OUtIUXNaU3hoUFh0OUtUMCtLRTlpYW1WamRDNXJaWGx6S0hRcExtWnZja1ZoWTJnb2NqMCtlMnhsZENCalBXVS9aU3NpTGlJcmNqcHlPM01vZEZ0eVhTay9iaWgwVzNKZExHTXNZU2s2WVZ0alhUMUJjbkpoZVM1cGMwRnljbUY1S0hSYmNsMHBQM1JiY2wwdWMyOXlkQ2dwT25SYmNsMTlLU3hQWW1wbFkzUXVaVzUwY21sbGN5aGhLUzV6YjNKMEtDa3BMRUU5ZEQwK2RDNW1iR0YwVFdGd0tHVTlQbk1vWlNrL2JpaGxLVHBiWlYwcExuTnZjblFvS1N4M1BTaDBMR1VzWVNrOVBudHNaWFFnY2oxQmNuSmhlUzVwYzBGeWNtRjVLSFFwUHlKaGNuSmhlU0k2ZEhsd1pXOW1JSFFzWXoxQmNuSmhlUzVwYzBGeWNtRjVLR1VwUHlKaGNuSmhlU0k2ZEhsd1pXOW1JR1U3Y21WMGRYSnVJSEloUFQxalB5RXhPbkloUFQwaWIySnFaV04wSWlZbWNpRTlQU0poY25KaGVTSS9jajA5UFdNNllTWW1jajA5UFNKdlltcGxZM1FpUDJFdWJXRndLR1k5UG5SYlpsMDlQVDFsVzJaZEtTNWxkbVZ5ZVNobVBUNW1LVG9vY2owOVBTSmhjbkpoZVNJbUppaDBQVUVvZENrc1pUMUJLR1VwS1N3aFlTWW1jajA5UFNKdlltcGxZM1FpSmlZb2REMXVLSFFwTEdVOWJpaGxLU2tzU2xOUFRpNXpkSEpwYm1kcFpua29kQ2s5UFQxS1UwOU9Mbk4wY21sdVoybG1lU2hsS1NsOU8zTmxiR1l1WVdSa1JYWmxiblJNYVhOMFpXNWxjaWdpYldWemMyRm5aU0lzZEQwK2UyTnZibk4wZTNSNWNHVTZaWDA5ZEM1a1lYUmhPMnhsZENCaFBXNWxkeUJCWW05eWRFTnZiblJ5YjJ4c1pYSXNjajFoUFQxdWRXeHNQM1p2YVdRZ01EcGhMbk5wWjI1aGJEdHBaaWhsUFQwOUltTmhibU5sYkNJbUppaGhQVDF1ZFd4c2ZIeGhMbUZpYjNKMEtDa3BMR1U5UFQwaWNHOXNiQ0lwZTJOdmJuTjBlM1Z5YkRwakxHOXdkR2x2Ym5NNlppeHBiblJsY25aaGJEcDFMRzFoZUVGMGRHVnRjSFJ6T25rc1pYaHBjM1JwYm1kRVlYUmhPbXdzWTI5dGNHRnlaVXRsZVhNNlJYMDlkQzVrWVhSaE8ya29lMlp1T2lncFBUNW1aWFJqYUNoakxHWS9jQ2hvS0h0OUxHWXBMSHR6YVdkdVlXdzZjbjBwT250emFXZHVZV3c2Y24wcExuUm9aVzRvYnowK2UybG1LQ0Z2TG05cmZIeHZMbk4wWVhSMWN6MDlQVFF3TkNsMGFISnZkeUJ1WlhjZ1JYSnliM0lvWUVoVVZGQWdaWEp5YjNJaElGTjBZWFIxY3pvZ0pIdHZMbk4wWVhSMWMzMWdLVHRwWmlodkxuTjBZWFIxY3owOVBUUXdNeWwwYUhKdmR5QnVaWGNnUlhKeWIzSW9JbFZ1WVhWMGFHOXlhWHBsWkNFaUtUdHlaWFIxY200Z2J5NXFjMjl1S0NsOUtTeHBiblJsY25aaGJEcDFMRzFoZUVGMGRHVnRjSFJ6T25rc2RtRnNhV1JoZEdVNmJ6MCtJWGNvYkN4dkxFVXBmU2t1ZEdobGJpaHZQVDU3YzJWc1ppNXdiM04wVFdWemMyRm5aU2g3ZEhsd1pUb2lSRUZVUVNJc1pHRjBZVHB2ZlNsOUtTNWpZWFJqYUNodlBUNTdjMlZzWmk1d2IzTjBUV1Z6YzJGblpTaDdkSGx3WlRwdkxtMWxjM05oWjJWOGZDSlZibXR1YjNkdUlHVnljbTl5SW4wcGZTbDlmU2w5S1NncE93bz0iLEk9dHlwZW9mIHdpbmRvdyE9InVuZGVmaW5lZCImJndpbmRvdy5CbG9iJiZuZXcgQmxvYihbYXRvYihQKV0se3R5cGU6InRleHQvamF2YXNjcmlwdDtjaGFyc2V0PXV0Zi04In0pO2Z1bmN0aW9uIE8oKXtjb25zdCB0PUkmJih3aW5kb3cuVVJMfHx3aW5kb3cud2Via2l0VVJMKS5jcmVhdGVPYmplY3RVUkwoSSk7dHJ5e3JldHVybiB0P25ldyBXb3JrZXIodCx7fSk6bmV3IFdvcmtlcigiZGF0YTphcHBsaWNhdGlvbi9qYXZhc2NyaXB0O2Jhc2U2NCwiK1Ase3R5cGU6Im1vZHVsZSJ9KX1maW5hbGx5e3QmJih3aW5kb3cuVVJMfHx3aW5kb3cud2Via2l0VVJMKS5yZXZva2VPYmplY3RVUkwodCl9fWNvbnN0e3JlbW92ZTpFLGdldERhdGE6eixzZXREYXRhOlgsdXBkYXRlRGF0YTpWfT14KCksUz10PT57aWYoIXQub2t8fHQuc3RhdHVzPT09NDA0KXRocm93IG5ldyBFcnJvcihgSFRUUCBlcnJvciEgU3RhdHVzOiAke3Quc3RhdHVzfWApO2lmKHQuc3RhdHVzPT09NDAzKXRocm93IG5ldyBFcnJvcigiVW5hdXRob3JpemVkISIpO3JldHVybiB0Lmpzb24oKX0sUj10PT57c2VsZi5wb3N0TWVzc2FnZSh7dHlwZTp0Lm1lc3NhZ2V8fCJVbmtub3duIGVycm9yIn0pfTtzZWxmLmFkZEV2ZW50TGlzdGVuZXIoIm1lc3NhZ2UiLHQ9Pntjb25zdHt0eXBlOmV9PXQuZGF0YTtsZXQgbj1uZXcgQWJvcnRDb250cm9sbGVyLGM9bj09bnVsbD92b2lkIDA6bi5zaWduYWwsYT1uZXcgTztpZihlPT09ImNhbmNlbCImJihuPT1udWxsfHxuLmFib3J0KCksYT09bnVsbHx8YS5wb3N0TWVzc2FnZSh7dHlwZToiY2FuY2VsIn0pLGEudGVybWluYXRlKCkpLGU9PT0icG9sbCIpe2xldHtleGlzdGluZ0RhdGE6cix1cmw6aSxvcHRpb25zOm8saW50ZXJ2YWw6ZixtYXhBdHRlbXB0czp1LGNvbXBhcmVLZXlzOm19PXQuZGF0YTtmZXRjaChpLG8/VChaKHt9LG8pLHtzaWduYWw6Y30pOntzaWduYWw6Y30pLnRoZW4oUykudGhlbihwPT57RyhyLHAsbSk/c2VsZi5wb3N0TWVzc2FnZSh7dHlwZToiQ0FDSEVEIixkYXRhOnB9KTooWChpLHt0aW1lc3RhbXA6RGF0ZS5ub3coKSxkYXRhOnB9KSxzZWxmLnBvc3RNZXNzYWdlKHt0eXBlOiJEQVRBIixkYXRhOnB9KSl9KS5jYXRjaChSKS5maW5hbGx5KCgpPT57YT09bnVsbHx8YS5wb3N0TWVzc2FnZSh7dHlwZTplLHVybDppLG9wdGlvbnM6byxpbnRlcnZhbDpmLG1heEF0dGVtcHRzOnUsZXhpc3RpbmdEYXRhOnIsY29tcGFyZUtleXM6bX0pfSksYT09bnVsbHx8YS5hZGRFdmVudExpc3RlbmVyKCJtZXNzYWdlIiwoe2RhdGE6cH0pPT57c2VsZi5wb3N0TWVzc2FnZShwKX0pfWlmKGU9PT0icHJlLWZldGNoIil7bGV0e3ByZWZldGNoOnJ9PXQuZGF0YTtyLmZvckVhY2goKHttaWRkbGV3YXJlOmksdXJsOm8sb3B0aW9uczpmLG1heEFnZTp1fSk9PntsZXQgbT1MKGkpO2ZldGNoKG8udG9TdHJpbmcoKSxaKHtzaWduYWw6Y30sZikpLnRoZW4oUykudGhlbihwPT57WChvLnRvU3RyaW5nKCkse3RpbWVzdGFtcDpEYXRlLm5vdygpLGRhdGE6bShwKSxtYXhBZ2U6dX0pLnRoZW4oKCk9Pntjb25zb2xlLmxvZyhgc2F2ZWQgcHJlZmV0Y2ggJHtvfWApfSkuY2F0Y2goYj0+e2NvbnNvbGUubG9nKGBlcnJvciBzYXZpbmcgcHJlZmV0Y2ggJHtvfWAsYil9KX0pLmNhdGNoKCgpPT57Y29uc29sZS5pbmZvKCJubyBkYXRhIGZvdW5kIil9KX0pfWlmKGU9PT0iZmV0Y2giKXtsZXR7ZXhpc3RpbmdEYXRhOnIsdXJsOmksb3B0aW9uczpvLG1heEFnZTpmLG1pZGRsZXdhcmU6dSx1cGRhdGU6bX09dC5kYXRhO2NvbnN0IHA9cz0+e3M9TCh1KShzKSwoIXJ8fCFHKHIscykpJiYoc2VsZi5wb3N0TWVzc2FnZSh7dHlwZToiREFUQSIsZGF0YTpzfSksWChpLnRvU3RyaW5nKCkse2RhdGE6cyx0aW1lc3RhbXA6RGF0ZS5ub3coKSxtYXhBZ2U6Zn0pLnRoZW4oKCk9Pntjb25zb2xlLmluZm8oInNhdmVkIGRhdGEiKX0pLmNhdGNoKCgpPT57Y29uc29sZS5pbmZvKCJjb3VsZG4ndCBhY2Nlc3MgaW5kZXhlZERCIHRvIHNhdmUgZGF0YSIpfSkpLHNlbGYucG9zdE1lc3NhZ2Uoe3R5cGU6IkNPTVBMRVRFIn0pfTtsZXQgYj1NKG8pO2I9PT0iREVMRVRFIiYmKEUoaS50b1N0cmluZygpKSxmZXRjaChpLG8pLnRoZW4oKCk9PnttP2ZldGNoKG0udXJsLG0ub3B0aW9ucykudGhlbihTKS50aGVuKHApLmNhdGNoKHM9Pnt0aHJvdyBzfSk6c2VsZi5wb3N0TWVzc2FnZSh7dHlwZToiQ09NUExFVEUifSl9KS5jYXRjaChSKSksYj09PSJHRVQiJiYoeihpLnRvU3RyaW5nKCkpLnRoZW4ocz0+e2lmKCFzKXRocm93IG5ldyBFcnJvcigibm8gdmFsdWUgZm91bmQgaW4gZGIiKTtpZihVKHM9PW51bGw/dm9pZCAwOnMubWF4QWdlLHM9PW51bGw/dm9pZCAwOnMudGltZXN0YW1wKSl0aHJvdyBFKGkudG9TdHJpbmcoKSksbmV3IEVycm9yKCJkYXRhIGV4cGlyZWQiKTtzZWxmLnBvc3RNZXNzYWdlKEcocixzPT1udWxsP3ZvaWQgMDpzLmRhdGEpP3t0eXBlOiJDQUNIRUQifTp7dHlwZToiUFJFX0xPQUQiLGRhdGE6cz09bnVsbD92b2lkIDA6cy5kYXRhfSl9KS5jYXRjaChzPT57Y29uc29sZS5pbmZvKHM9PW51bGw/dm9pZCAwOnMubWVzc2FnZSl9KSxmZXRjaChpLG8/VChaKHt9LG8pLHtzaWduYWw6Y30pOntzaWduYWw6Y30pLnRoZW4oUykudGhlbihwKS5jYXRjaChSKSksKGI9PT0iUFVUInx8Yj09PSJQT1NUIikmJmZldGNoKGksbz9UKFooe30sbykse3NpZ25hbDpjfSk6e3NpZ25hbDpjfSkudGhlbihTKS50aGVuKHM9PnttP2ZldGNoKG0udXJsLG0ub3B0aW9ucykudGhlbihTKS50aGVuKHApLmNhdGNoKHk9Pnt0aHJvdyB5fSk6VihpLnRvU3RyaW5nKCkseT0+e2xldCBLPURhdGUubm93KCksSD1nKHMpJiZnKHk9PW51bGw/dm9pZCAwOnkuZGF0YSk/WihaKHt9LHkuZGF0YSkscyk6cztyZXR1cm4gc2VsZi5wb3N0TWVzc2FnZSh7dHlwZTpiLGRhdGE6SH0pLHt0aW1lc3RhbXA6SyxtYXhBZ2U6ZixkYXRhOkh9fSkuY2F0Y2goKCk9Pntjb25zb2xlLmluZm8oInVwZGF0ZSBzdG9yZSBmYWlsZWQiKX0pLmZpbmFsbHkoKCk9PntzZWxmLnBvc3RNZXNzYWdlKHt0eXBlOiJDT01QTEVURSJ9KX0pfSkuY2F0Y2goUil9fSl9KSgpOwo=";
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
const serializeFunction = (f) => f ? encodeURI(f.toString()) : void 0;
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
    worker == null ? void 0 : worker.postMessage({
      type: "fetch",
      url,
      options,
      existingData: state.data,
      middleware: serializeFunction(middleware),
      maxAge
    });
  };
  useEffect(() => {
    workerRef.current = new WorkerWrapper();
    return () => {
      cleanupWorker(workerRef.current);
    };
  }, []);
  return __spreadValues({
    fetchWorker
  }, state);
}
function usePoll(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const worker = useRef(new WorkerWrapper());
  useEffect(() => {
    var _a, _b;
    if (props && worker.current) {
      dispatch({
        type: "loading",
        loading: true
      });
      (_a = worker.current) == null ? void 0 : _a.addEventListener("message", ({
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
      (_b = worker.current) == null ? void 0 : _b.postMessage(__spreadProps(__spreadValues({
        type: "poll"
      }, props), {
        existingData: state.data
      }));
    }
  }, [props, worker.current]);
  useEffect(() => {
    return () => {
      cleanupWorker(worker.current);
    };
  }, []);
  return __spreadValues({}, state);
}
function usePreFetch(prefetch) {
  const worker = useRef(new WorkerWrapper());
  useEffect(() => {
    var _a;
    if (prefetch && worker.current) {
      (_a = worker.current) == null ? void 0 : _a.postMessage({
        type: "pre-fetch",
        prefetch: prefetch.map((p) => __spreadProps(__spreadValues({}, p), {
          middleware: serializeFunction(p.middleware)
        }))
      });
    }
  }, [prefetch, worker.current]);
  useEffect(() => {
    worker.current = new WorkerWrapper();
    return () => {
      cleanupWorker(worker.current);
    };
  }, []);
}
export { useFetch, usePoll, usePreFetch };
