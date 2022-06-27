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
const encodedJs = "dmFyIGs9T2JqZWN0LmRlZmluZVByb3BlcnR5LEE9T2JqZWN0LmRlZmluZVByb3BlcnRpZXM7dmFyIGo9T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnM7dmFyIEI9T2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9sczt2YXIgUT1PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LHY9T2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTt2YXIgRD0oaCxkLGwpPT5kIGluIGg/ayhoLGQse2VudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwLHZhbHVlOmx9KTpoW2RdPWwseT0oaCxkKT0+e2Zvcih2YXIgbCBpbiBkfHwoZD17fSkpUS5jYWxsKGQsbCkmJkQoaCxsLGRbbF0pO2lmKEIpZm9yKHZhciBsIG9mIEIoZCkpdi5jYWxsKGQsbCkmJkQoaCxsLGRbbF0pO3JldHVybiBofSxUPShoLGQpPT5BKGgsaihkKSk7KGZ1bmN0aW9uKCl7InVzZSBzdHJpY3QiO2Z1bmN0aW9uIGgodCl7cmV0dXJuIG5ldyBQcm9taXNlKChlLG4pPT57dC5vbmNvbXBsZXRlPXQub25zdWNjZXNzPSgpPT5lKHQucmVzdWx0KSx0Lm9uYWJvcnQ9dC5vbmVycm9yPSgpPT5uKHQuZXJyb3IpfSl9ZnVuY3Rpb24gZCh0LGUpe2NvbnN0IG49aW5kZXhlZERCLm9wZW4odCk7bi5vbnVwZ3JhZGVuZWVkZWQ9KCk9Pm4ucmVzdWx0LmNyZWF0ZU9iamVjdFN0b3JlKGUpO2NvbnN0IGM9aChuKTtyZXR1cm4oaSxhKT0+Yy50aGVuKHI9PmEoci50cmFuc2FjdGlvbihlLGkpLm9iamVjdFN0b3JlKGUpKSl9bGV0IGw7ZnVuY3Rpb24gdSgpe3JldHVybiBsfHwobD1kKCJrZXl2YWwtc3RvcmUiLCJrZXl2YWwiKSksbH1mdW5jdGlvbiB4KHQsZT11KCkpe3JldHVybiBlKCJyZWFkb25seSIsbj0+aChuLmdldCh0KSkpfWZ1bmN0aW9uIEModCxlLG49dSgpKXtyZXR1cm4gbigicmVhZHdyaXRlIixjPT4oYy5wdXQoZSx0KSxoKGMudHJhbnNhY3Rpb24pKSl9ZnVuY3Rpb24gTih0LGUsbj11KCkpe3JldHVybiBuKCJyZWFkd3JpdGUiLGM9Pm5ldyBQcm9taXNlKChpLGEpPT57Yy5nZXQodCkub25zdWNjZXNzPWZ1bmN0aW9uKCl7dHJ5e2MucHV0KGUodGhpcy5yZXN1bHQpLHQpLGkoaChjLnRyYW5zYWN0aW9uKSl9Y2F0Y2gocil7YShyKX19fSkpfWZ1bmN0aW9uIEYodCxlPXUoKSl7cmV0dXJuIGUoInJlYWR3cml0ZSIsbj0+KG4uZGVsZXRlKHQpLGgobi50cmFuc2FjdGlvbikpKX1mdW5jdGlvbiBVKCl7Y29uc3Qgbj1kKCJ1c2VzdG9yZS1kYiIsInVzZXN0b3JlLWRiIik7cmV0dXJue3JlbW92ZTpzPT5GKHMsbiksZ2V0RGF0YTpzPT54KHMsbiksc2V0RGF0YToocyxwKT0+QyhzLHAsbiksdXBkYXRlRGF0YToocyxwKT0+TihzLHAsbil9fWNvbnN0IEw9KHQsZSk9PmU/dCtlPERhdGUubm93KCk6ITAsdz10PT50eXBlb2YgdD09Im9iamVjdCImJiFBcnJheS5pc0FycmF5KHQpJiZ0IT09bnVsbCxnPSh0LGUsbj17fSk9PihPYmplY3Qua2V5cyh0KS5mb3JFYWNoKGM9PntsZXQgaT1lP2UrIi4iK2M6Yzt3KHRbY10pP2codFtjXSxpLG4pOm5baV09QXJyYXkuaXNBcnJheSh0W2NdKT90W2NdLnNvcnQoKTp0W2NdfSksT2JqZWN0LmVudHJpZXMobikuc29ydCgpKSxQPXQ9PnQuZmxhdE1hcChlPT53KGUpP2coZSk6W2VdKS5zb3J0KCksTT10PT57dmFyIGUsbjtyZXR1cm4obj0oZT10PT1udWxsP3ZvaWQgMDp0Lm1ldGhvZCk9PW51bGw/dm9pZCAwOmUudG9VcHBlckNhc2UoKSkhPW51bGw/bjoiR0VUIn0sRz0odCxlLG4pPT57bGV0IGM9QXJyYXkuaXNBcnJheSh0KT8iYXJyYXkiOnR5cGVvZiB0LGk9QXJyYXkuaXNBcnJheShlKT8iYXJyYXkiOnR5cGVvZiBlO3JldHVybiBjIT09aT8hMTpjIT09Im9iamVjdCImJmMhPT0iYXJyYXkiP2M9PT1pOm4mJmM9PT0ib2JqZWN0Ij9uLm1hcChhPT50W2FdPT09ZVthXSkuZXZlcnkoYT0+YSk6KGM9PT0iYXJyYXkiJiYodD1QKHQpLGU9UChlKSksIW4mJmM9PT0ib2JqZWN0IiYmKHQ9Zyh0KSxlPWcoZSkpLEpTT04uc3RyaW5naWZ5KHQpPT09SlNPTi5zdHJpbmdpZnkoZSkpfSxPPXQ9Pm5ldyBGdW5jdGlvbihgcmV0dXJuICR7ZGVjb2RlVVJJKHQpfWApKCksRT0iZG1GeUlHMDlUMkpxWldOMExtUmxabWx1WlZCeWIzQmxjblI1TEZROVQySnFaV04wTG1SbFptbHVaVkJ5YjNCbGNuUnBaWE03ZG1GeUlFUTlUMkpxWldOMExtZGxkRTkzYmxCeWIzQmxjblI1UkdWelkzSnBjSFJ2Y25NN2RtRnlJR2M5VDJKcVpXTjBMbWRsZEU5M2JsQnliM0JsY25SNVUzbHRZbTlzY3p0MllYSWdUVDFQWW1wbFkzUXVjSEp2ZEc5MGVYQmxMbWhoYzA5M2JsQnliM0JsY25SNUxFODlUMkpxWldOMExuQnliM1J2ZEhsd1pTNXdjbTl3WlhKMGVVbHpSVzUxYldWeVlXSnNaVHQyWVhJZ1pEMG9hU3h6TEc0cFBUNXpJR2x1SUdrL2JTaHBMSE1zZTJWdWRXMWxjbUZpYkdVNklUQXNZMjl1Wm1sbmRYSmhZbXhsT2lFd0xIZHlhWFJoWW14bE9pRXdMSFpoYkhWbE9tNTlLVHBwVzNOZFBXNHNhRDBvYVN4ektUMCtlMlp2Y2loMllYSWdiaUJwYmlCemZId29jejE3ZlNrcFRTNWpZV3hzS0hNc2Jpa21KbVFvYVN4dUxITmJibDBwTzJsbUtHY3BabTl5S0haaGNpQnVJRzltSUdjb2N5a3BUeTVqWVd4c0tITXNiaWttSm1Rb2FTeHVMSE5iYmwwcE8zSmxkSFZ5YmlCcGZTeHdQU2hwTEhNcFBUNVVLR2tzUkNoektTazdLR1oxYm1OMGFXOXVLQ2w3SW5WelpTQnpkSEpwWTNRaU8yTnZibk4wSUdrOVlYTjVibU1vZTJadU9uUXNkbUZzYVdSaGRHVTZaU3hwYm5SbGNuWmhiRHBoTEcxaGVFRjBkR1Z0Y0hSek9uSXNZWFIwWlcxd2RITTZZejB3ZlNrOVBudGhjM2x1WXlCbWRXNWpkR2x2YmlCbUtIVXNlU2w3ZEhKNWUyTnZibk4wSUd3OVlYZGhhWFFnZENncE8ybG1LR01yS3l4bEtHd3BLWHRwWmloeUppWmpQVDA5Y2lseVpYUjFjbTRnZVNodVpYY2dSWEp5YjNJb0lrVjRZMlZsWkdWa0lHMWhlQ0JoZEhSbGJYQjBjeUlwS1R0aGQyRnBkQ0J6WlhSVWFXMWxiM1YwS0dZc1lTeDFMSGtwZldWc2MyVWdjbVYwZFhKdUlIVW9iQ2w5WTJGMFkyZ29iQ2w3WTI5dWMyOXNaUzVsY25KdmNpaGdjRzlzYkdsdVp5QkZjbkp2Y2pvZ0pIc29iRDA5Ym5Wc2JEOTJiMmxrSURBNmJDNXRaWE56WVdkbEtYeDhJbU52Ym01bFkzUnBiMjRnWm1GcGJHVmtJbjFnS1gxOWNtVjBkWEp1SUc1bGR5QlFjbTl0YVhObEtHWXBmU3h6UFhROVBuUjVjR1Z2WmlCMFBUMGliMkpxWldOMElpWW1JVUZ5Y21GNUxtbHpRWEp5WVhrb2RDa21KblFoUFQxdWRXeHNMRzQ5S0hRc1pTeGhQWHQ5S1QwK0tFOWlhbVZqZEM1clpYbHpLSFFwTG1admNrVmhZMmdvY2owK2UyeGxkQ0JqUFdVL1pTc2lMaUlyY2pweU8zTW9kRnR5WFNrL2JpaDBXM0pkTEdNc1lTazZZVnRqWFQxQmNuSmhlUzVwYzBGeWNtRjVLSFJiY2wwcFAzUmJjbDB1YzI5eWRDZ3BPblJiY2wxOUtTeFBZbXBsWTNRdVpXNTBjbWxsY3loaEtTNXpiM0owS0NrcExFRTlkRDArZEM1bWJHRjBUV0Z3S0dVOVBuTW9aU2svYmlobEtUcGJaVjBwTG5OdmNuUW9LU3gzUFNoMExHVXNZU2s5UG50c1pYUWdjajFCY25KaGVTNXBjMEZ5Y21GNUtIUXBQeUpoY25KaGVTSTZkSGx3Wlc5bUlIUXNZejFCY25KaGVTNXBjMEZ5Y21GNUtHVXBQeUpoY25KaGVTSTZkSGx3Wlc5bUlHVTdjbVYwZFhKdUlISWhQVDFqUHlFeE9uSWhQVDBpYjJKcVpXTjBJaVltY2lFOVBTSmhjbkpoZVNJL2NqMDlQV002WVNZbWNqMDlQU0p2WW1wbFkzUWlQMkV1YldGd0tHWTlQblJiWmwwOVBUMWxXMlpkS1M1bGRtVnllU2htUFQ1bUtUb29jajA5UFNKaGNuSmhlU0ltSmloMFBVRW9kQ2tzWlQxQktHVXBLU3doWVNZbWNqMDlQU0p2WW1wbFkzUWlKaVlvZEQxdUtIUXBMR1U5YmlobEtTa3NTbE5QVGk1emRISnBibWRwWm5rb2RDazlQVDFLVTA5T0xuTjBjbWx1WjJsbWVTaGxLU2w5TzNObGJHWXVZV1JrUlhabGJuUk1hWE4wWlc1bGNpZ2liV1Z6YzJGblpTSXNkRDArZTJOdmJuTjBlM1I1Y0dVNlpYMDlkQzVrWVhSaE8yeGxkQ0JoUFc1bGR5QkJZbTl5ZEVOdmJuUnliMnhzWlhJc2NqMWhQVDF1ZFd4c1AzWnZhV1FnTURwaExuTnBaMjVoYkR0cFppaGxQVDA5SW1OaGJtTmxiQ0ltSmloaFBUMXVkV3hzZkh4aExtRmliM0owS0NrcExHVTlQVDBpY0c5c2JDSXBlMk52Ym5OMGUzVnliRHBqTEc5d2RHbHZibk02Wml4cGJuUmxjblpoYkRwMUxHMWhlRUYwZEdWdGNIUnpPbmtzWlhocGMzUnBibWRFWVhSaE9td3NZMjl0Y0dGeVpVdGxlWE02UlgwOWRDNWtZWFJoTzJrb2UyWnVPaWdwUFQ1bVpYUmphQ2hqTEdZL2NDaG9LSHQ5TEdZcExIdHphV2R1WVd3NmNuMHBPbnR6YVdkdVlXdzZjbjBwTG5Sb1pXNG9iejArZTJsbUtDRnZMbTlyZkh4dkxuTjBZWFIxY3owOVBUUXdOQ2wwYUhKdmR5QnVaWGNnUlhKeWIzSW9ZRWhVVkZBZ1pYSnliM0loSUZOMFlYUjFjem9nSkh0dkxuTjBZWFIxYzMxZ0tUdHBaaWh2TG5OMFlYUjFjejA5UFRRd015bDBhSEp2ZHlCdVpYY2dSWEp5YjNJb0lsVnVZWFYwYUc5eWFYcGxaQ0VpS1R0eVpYUjFjbTRnYnk1cWMyOXVLQ2w5S1N4cGJuUmxjblpoYkRwMUxHMWhlRUYwZEdWdGNIUnpPbmtzZG1Gc2FXUmhkR1U2YnowK0lYY29iQ3h2TEVVcGZTa3VkR2hsYmlodlBUNTdjMlZzWmk1d2IzTjBUV1Z6YzJGblpTaDdkSGx3WlRvaVJFRlVRU0lzWkdGMFlUcHZmU2w5S1M1allYUmphQ2h2UFQ1N2MyVnNaaTV3YjNOMFRXVnpjMkZuWlNoN2RIbHdaVHB2TG0xbGMzTmhaMlY4ZkNKVmJtdHViM2R1SUdWeWNtOXlJbjBwZlNsOWZTbDlLU2dwT3dvPSIsST10eXBlb2Ygd2luZG93IT0idW5kZWZpbmVkIiYmd2luZG93LkJsb2ImJm5ldyBCbG9iKFthdG9iKEUpXSx7dHlwZToidGV4dC9qYXZhc2NyaXB0O2NoYXJzZXQ9dXRmLTgifSk7ZnVuY3Rpb24geigpe2NvbnN0IHQ9SSYmKHdpbmRvdy5VUkx8fHdpbmRvdy53ZWJraXRVUkwpLmNyZWF0ZU9iamVjdFVSTChJKTt0cnl7cmV0dXJuIHQ/bmV3IFdvcmtlcih0LHt9KTpuZXcgV29ya2VyKCJkYXRhOmFwcGxpY2F0aW9uL2phdmFzY3JpcHQ7YmFzZTY0LCIrRSx7dHlwZToibW9kdWxlIn0pfWZpbmFsbHl7dCYmKHdpbmRvdy5VUkx8fHdpbmRvdy53ZWJraXRVUkwpLnJldm9rZU9iamVjdFVSTCh0KX19Y29uc3R7cmVtb3ZlOlgsZ2V0RGF0YTpLLHNldERhdGE6Six1cGRhdGVEYXRhOlZ9PVUoKSxaPXQ9PntpZighdC5va3x8dC5zdGF0dXM9PT00MDQpdGhyb3cgbmV3IEVycm9yKGBIVFRQIGVycm9yISBTdGF0dXM6ICR7dC5zdGF0dXN9YCk7aWYodC5zdGF0dXM9PT00MDMpdGhyb3cgbmV3IEVycm9yKCJVbmF1dGhvcml6ZWQhIik7cmV0dXJuIHQuanNvbigpfSxZPXQ9PntzZWxmLnBvc3RNZXNzYWdlKHt0eXBlOnQubWVzc2FnZXx8IlVua25vd24gZXJyb3IifSl9O3NlbGYuYWRkRXZlbnRMaXN0ZW5lcigibWVzc2FnZSIsdD0+e2NvbnN0e3R5cGU6ZX09dC5kYXRhO2xldCBuPW5ldyBBYm9ydENvbnRyb2xsZXIsYz1uPT1udWxsP3ZvaWQgMDpuLnNpZ25hbCxpPW5ldyB6O2lmKGU9PT0iY2FuY2VsIiYmKG49PW51bGx8fG4uYWJvcnQoKSxpPT1udWxsfHxpLnBvc3RNZXNzYWdlKHt0eXBlOiJjYW5jZWwifSksaS50ZXJtaW5hdGUoKSksZT09PSJwb2xsIil7bGV0e2V4aXN0aW5nRGF0YTphLHVybDpyLG9wdGlvbnM6cyxpbnRlcnZhbDpwLG1heEF0dGVtcHRzOlIsY29tcGFyZUtleXM6Zn09dC5kYXRhO2ZldGNoKHIscz9UKHkoe30scykse3NpZ25hbDpjfSk6e3NpZ25hbDpjfSkudGhlbihaKS50aGVuKG09PntHKGEsbSxmKT9zZWxmLnBvc3RNZXNzYWdlKHt0eXBlOiJDQUNIRUQiLGRhdGE6bX0pOihKKHIse3RpbWVzdGFtcDpEYXRlLm5vdygpLGRhdGE6bX0pLHNlbGYucG9zdE1lc3NhZ2Uoe3R5cGU6IkRBVEEiLGRhdGE6bX0pKX0pLmNhdGNoKFkpLmZpbmFsbHkoKCk9PntpPT1udWxsfHxpLnBvc3RNZXNzYWdlKHt0eXBlOmUsdXJsOnIsb3B0aW9uczpzLGludGVydmFsOnAsbWF4QXR0ZW1wdHM6UixleGlzdGluZ0RhdGE6YSxjb21wYXJlS2V5czpmfSl9KSxpPT1udWxsfHxpLmFkZEV2ZW50TGlzdGVuZXIoIm1lc3NhZ2UiLCh7ZGF0YTptfSk9PntzZWxmLnBvc3RNZXNzYWdlKG0pfSl9aWYoZT09PSJwcmUtZmV0Y2giKXtsZXR7cHJlZmV0Y2g6YX09dC5kYXRhO2EuZm9yRWFjaChyPT57SyhyLnVybC50b1N0cmluZygpKS50aGVuKHM9PntpZighcyl0aHJvdyBuZXcgRXJyb3IoIm5vIHZhbHVlIGZvdW5kIGluIGRiIik7aWYoTChzPT1udWxsP3ZvaWQgMDpzLm1heEFnZSxzPT1udWxsP3ZvaWQgMDpzLnRpbWVzdGFtcCkpdGhyb3cgWChyLnVybC50b1N0cmluZygpKSxuZXcgRXJyb3IoImRhdGEgZXhwaXJlZCIpfSkuY2F0Y2goKCk9PntmZXRjaChyLnVybC50b1N0cmluZygpLHkoe3NpZ25hbDpjfSxyLm9wdGlvbnMpKS50aGVuKFopLnRoZW4ocz0+e2xldCBwPXIubWlkZGxld2FyZT9yLm1pZGRsZXdhcmUocyk6cztKKHIudXJsLnRvU3RyaW5nKCkse3RpbWVzdGFtcDpEYXRlLm5vdygpLGRhdGE6cCxtYXhBZ2U6ci5tYXhBZ2V9KX0pLmNhdGNoKCgpPT57Y29uc29sZS5pbmZvKCJubyBkYXRhIGZvdW5kIil9KX0pfSl9aWYoZT09PSJmZXRjaCIpe2xldHtleGlzdGluZ0RhdGE6YSx1cmw6cixvcHRpb25zOnMsbWF4QWdlOnAsbWlkZGxld2FyZTpSLHVwZGF0ZTpmfT10LmRhdGE7Y29uc3QgbT1vPT57UiYmKG89TyhSKShvKSksKCFhfHwhRyhhLG8pKSYmKHNlbGYucG9zdE1lc3NhZ2Uoe3R5cGU6IkRBVEEiLGRhdGE6b30pLEooci50b1N0cmluZygpLHtkYXRhOm8sdGltZXN0YW1wOkRhdGUubm93KCksbWF4QWdlOnB9KS50aGVuKCgpPT57Y29uc29sZS5pbmZvKCJzYXZlZCBkYXRhIil9KS5jYXRjaCgoKT0+e2NvbnNvbGUuaW5mbygiY291bGRuJ3QgYWNjZXNzIGluZGV4ZWREQiB0byBzYXZlIGRhdGEiKX0pKSxzZWxmLnBvc3RNZXNzYWdlKHt0eXBlOiJDT01QTEVURSJ9KX07bGV0IFM9TShzKTtTPT09IkRFTEVURSImJihYKHIudG9TdHJpbmcoKSksZmV0Y2gocixzKS50aGVuKCgpPT57Zj9mZXRjaChmLnVybCxmLm9wdGlvbnMpLnRoZW4oWikudGhlbihtKS5jYXRjaChvPT57dGhyb3cgb30pOnNlbGYucG9zdE1lc3NhZ2Uoe3R5cGU6IkNPTVBMRVRFIn0pfSkuY2F0Y2goWSkpLFM9PT0iR0VUIiYmKEsoci50b1N0cmluZygpKS50aGVuKG89PntpZighbyl0aHJvdyBuZXcgRXJyb3IoIm5vIHZhbHVlIGZvdW5kIGluIGRiIik7aWYoTChvPT1udWxsP3ZvaWQgMDpvLm1heEFnZSxvPT1udWxsP3ZvaWQgMDpvLnRpbWVzdGFtcCkpdGhyb3cgWChyLnRvU3RyaW5nKCkpLG5ldyBFcnJvcigiZGF0YSBleHBpcmVkIik7c2VsZi5wb3N0TWVzc2FnZShHKGEsbz09bnVsbD92b2lkIDA6by5kYXRhKT97dHlwZToiQ0FDSEVEIn06e3R5cGU6IlBSRV9MT0FEIixkYXRhOm89PW51bGw/dm9pZCAwOm8uZGF0YX0pfSkuY2F0Y2gobz0+e2NvbnNvbGUuaW5mbyhvPT1udWxsP3ZvaWQgMDpvLm1lc3NhZ2UpfSksZmV0Y2gocixzP1QoeSh7fSxzKSx7c2lnbmFsOmN9KTp7c2lnbmFsOmN9KS50aGVuKFopLnRoZW4obSkuY2F0Y2goWSkpLChTPT09IlBVVCJ8fFM9PT0iUE9TVCIpJiZmZXRjaChyLHM/VCh5KHt9LHMpLHtzaWduYWw6Y30pOntzaWduYWw6Y30pLnRoZW4oWikudGhlbihvPT57Zj9mZXRjaChmLnVybCxmLm9wdGlvbnMpLnRoZW4oWikudGhlbihtKS5jYXRjaChiPT57dGhyb3cgYn0pOlYoci50b1N0cmluZygpLGI9PntsZXQgSD1EYXRlLm5vdygpLFc9dyhvKSYmdyhiPT1udWxsP3ZvaWQgMDpiLmRhdGEpP3koeSh7fSxiLmRhdGEpLG8pOm87cmV0dXJuIHNlbGYucG9zdE1lc3NhZ2Uoe3R5cGU6UyxkYXRhOld9KSx7dGltZXN0YW1wOkgsbWF4QWdlOnAsZGF0YTpXfX0pLmNhdGNoKCgpPT57Y29uc29sZS5pbmZvKCJ1cGRhdGUgc3RvcmUgZmFpbGVkIil9KS5maW5hbGx5KCgpPT57c2VsZi5wb3N0TWVzc2FnZSh7dHlwZToiQ09NUExFVEUifSl9KX0pLmNhdGNoKFkpfX0pfSkoKTsK";
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
  var _a, _b;
  const [state, dispatch] = useReducer(reducer, initialState);
  const worker = useRef(new WorkerWrapper());
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
    return () => {
      cleanupWorker(worker.current);
    };
  }, []);
}
export { useFetch, usePoll, usePreFetch };
