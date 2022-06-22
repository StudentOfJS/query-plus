(function(n,t){typeof exports=="object"&&typeof module!="undefined"?t(exports,require("react"),require("idb-keyval")):typeof define=="function"&&define.amd?define(["exports","react","idb-keyval"],t):(n=typeof globalThis!="undefined"?globalThis:n||self,t(n["react-fetch"]={},n.React,n.idbKeyval))})(this,function(n,t,r){"use strict";var k=Object.defineProperty,D=Object.defineProperties;var M=Object.getOwnPropertyDescriptors;var S=Object.getOwnPropertySymbols;var x=Object.prototype.hasOwnProperty,O=Object.prototype.propertyIsEnumerable;var W=(n,t,r)=>t in n?k(n,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):n[t]=r,u=(n,t)=>{for(var r in t||(t={}))x.call(t,r)&&W(n,r,t[r]);if(S)for(var r of S(t))O.call(t,r)&&W(n,r,t[r]);return n},b=(n,t)=>D(n,M(t));const Z="dmFyIHU9T2JqZWN0LmRlZmluZVByb3BlcnR5LGg9T2JqZWN0LmRlZmluZVByb3BlcnRpZXM7dmFyIGc9T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnM7dmFyIG49T2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9sczt2YXIgZD1PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LHc9T2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTt2YXIgbD0ocyx0LGUpPT50IGluIHM/dShzLHQse2VudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwLHZhbHVlOmV9KTpzW3RdPWUsYz0ocyx0KT0+e2Zvcih2YXIgZSBpbiB0fHwodD17fSkpZC5jYWxsKHQsZSkmJmwocyxlLHRbZV0pO2lmKG4pZm9yKHZhciBlIG9mIG4odCkpdy5jYWxsKHQsZSkmJmwocyxlLHRbZV0pO3JldHVybiBzfSxpPShzLHQpPT5oKHMsZyh0KSk7KGZ1bmN0aW9uKCl7InVzZSBzdHJpY3QiO3NlbGYuYWRkRXZlbnRMaXN0ZW5lcigibWVzc2FnZSIscz0+e2NvbnN0e3R5cGU6dH09cy5kYXRhO2xldCBlPW5ldyBBYm9ydENvbnRyb2xsZXIsYT1lLnNpZ25hbDtpZih0PT09ImNhbmNlbCImJmUuc2lnbmFsLmFib3J0KCksdD09PSJmZXRjaCIpe2NvbnN0e3VybDpmLG9wdGlvbnM6b309cy5kYXRhO2ZldGNoKGYsbz9pKGMoe30sbykse3NpZ25hbDphfSk6e3NpZ25hbDphfSkudGhlbihyPT57aWYoIXIub2t8fHIuc3RhdHVzPT09NDA0KXRocm93IG5ldyBFcnJvcihgSFRUUCBlcnJvciEgU3RhdHVzOiAke3Iuc3RhdHVzfWApO2lmKHIuc3RhdHVzPT09NDAzKXRocm93IG5ldyBFcnJvcigiVW5hdXRob3JpemVkISIpO3JldHVybiByLmpzb24oKX0pLnRoZW4ocj0+e3NlbGYucG9zdE1lc3NhZ2Uoe3R5cGU6InN1Y2Nlc3MiLGRhdGE6cn0pLGU9dm9pZCAwfSkuY2F0Y2gocj0+e3NlbGYucG9zdE1lc3NhZ2Uoe3R5cGU6ci5tZXNzYWdlfHwiVW5rbm93biBlcnJvciJ9KX0pfX0pfSkoKTsK",g=typeof window!="undefined"&&window.Blob&&new Blob([atob(Z)],{type:"text/javascript;charset=utf-8"});function B(){const e=g&&(window.URL||window.webkitURL).createObjectURL(g);try{return e?new Worker(e,{}):new Worker("data:application/javascript;base64,"+Z,{type:"module"})}finally{e&&(window.URL||window.webkitURL).revokeObjectURL(e)}}const Y="usestore-db",H="usestore-db",G=(e=!0,o=H)=>{const c=t.useRef();return t.useEffect(()=>(c.current=r.createStore(Y,o),()=>{!e&&r.clear(c.current),c.current=void 0}),[]),{del:d=>r.del(d,c.current),get:d=>r.get(d,c.current),getMany:d=>r.getMany(d,c.current),set:(d,s)=>r.set(d,s,c.current),setMany:d=>r.setMany(d,c.current),update:(d,s)=>r.update(d,s,c.current)}},N=24*60*60*1e3;function y(e){e==null||e.postMessage({type:"cancel"}),e==null||e.terminate(),e=void 0}const I=(e,o=0)=>o+e>Date.now(),T=e=>{var c;let o=((c=e==null?void 0:e.method)==null?void 0:c.toUpperCase())||"GET";return{isGet:o==="GET",isPost:o==="POST",isPut:o==="PUT",isDelete:o==="DELETE"}};function J(){const{del:e,get:o,set:c}=G(),[d,s]=t.useReducer(E,U),m=t.useRef({worker:void 0,controller:new AbortController});let{worker:a,controller:R}=m.current;return t.useEffect(()=>{var l,f,p;return!window&&!((p=(f=(l=m==null?void 0:m.current)==null?void 0:l.controller)==null?void 0:f.signal)!=null&&p.aborted)&&(s({type:"loading",loading:!1}),s({type:"error",error:new Error("window is not defined")}),y(a)),()=>{y(a)}},[window,m.current.controller]),u({fetchWorker:async({url:l,fetchOptions:f,cache:p=!1,maxAge:z=N})=>{y(a);let h=T(f),X=h.isGet?await o(l.toString()).then(i=>i!=null&&i.timestamp?I(z,i==null?void 0:i.timestamp)?(console.log("cache hit",l.toString()),s({type:p?"data":"pre-load",data:i==null?void 0:i.data}),!p):(e(l.toString()),!0):!0):!0;window&&X&&(h.isGet&&e(l.toString()),a=new B,s({type:"loading",loading:!0}),a.postMessage({type:"fetch",url:l,fetchOptions:f}),a.addEventListener("message",({data:{data:i,type:w}})=>{var L;if(!((L=R==null?void 0:R.signal)!=null&&L.aborted))if(w==="success"){if(h.isDelete||!i)return s({type:"loading",loading:!1});if(s({type:"data",data:i}),p&&h.isGet){let V={timestamp:Date.now(),data:i};c(l.toString(),V).then(()=>{console.log("saved data")}).catch(()=>{console.error("couldn't access indexedDB to save data")})}}else s({type:"error",error:new Error(w)});y(a)}))}},d)}const U={data:void 0,error:void 0,loading:!1,update:!0};function E(e,o){switch(o.type){case"pre-load":return b(u({},e),{data:o.data});case"data":return b(u({},e),{data:o.data,loading:!1,error:void 0});case"clearError":return b(u({},e),{error:void 0});case"error":return b(u({},e),{error:o.error,loading:!1});case"loading":return b(u({},e),{loading:o.loading});default:return e}}n.useFetch=J,n.useStore=G,Object.defineProperties(n,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
