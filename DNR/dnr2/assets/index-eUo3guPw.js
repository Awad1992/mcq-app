(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();function Bg(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var Wg={exports:{}},Rl={},Hg={exports:{}},he={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var yo=Symbol.for("react.element"),Qw=Symbol.for("react.portal"),Jw=Symbol.for("react.fragment"),Yw=Symbol.for("react.strict_mode"),Xw=Symbol.for("react.profiler"),Zw=Symbol.for("react.provider"),e1=Symbol.for("react.context"),t1=Symbol.for("react.forward_ref"),n1=Symbol.for("react.suspense"),r1=Symbol.for("react.memo"),s1=Symbol.for("react.lazy"),mp=Symbol.iterator;function i1(t){return t===null||typeof t!="object"?null:(t=mp&&t[mp]||t["@@iterator"],typeof t=="function"?t:null)}var qg={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Kg=Object.assign,Gg={};function Ws(t,e,n){this.props=t,this.context=e,this.refs=Gg,this.updater=n||qg}Ws.prototype.isReactComponent={};Ws.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Ws.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function Qg(){}Qg.prototype=Ws.prototype;function kh(t,e,n){this.props=t,this.context=e,this.refs=Gg,this.updater=n||qg}var Ah=kh.prototype=new Qg;Ah.constructor=kh;Kg(Ah,Ws.prototype);Ah.isPureReactComponent=!0;var gp=Array.isArray,Jg=Object.prototype.hasOwnProperty,Ch={current:null},Yg={key:!0,ref:!0,__self:!0,__source:!0};function Xg(t,e,n){var r,s={},i=null,o=null;if(e!=null)for(r in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(i=""+e.key),e)Jg.call(e,r)&&!Yg.hasOwnProperty(r)&&(s[r]=e[r]);var l=arguments.length-2;if(l===1)s.children=n;else if(1<l){for(var u=Array(l),h=0;h<l;h++)u[h]=arguments[h+2];s.children=u}if(t&&t.defaultProps)for(r in l=t.defaultProps,l)s[r]===void 0&&(s[r]=l[r]);return{$$typeof:yo,type:t,key:i,ref:o,props:s,_owner:Ch.current}}function o1(t,e){return{$$typeof:yo,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Rh(t){return typeof t=="object"&&t!==null&&t.$$typeof===yo}function a1(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var yp=/\/+/g;function Su(t,e){return typeof t=="object"&&t!==null&&t.key!=null?a1(""+t.key):e.toString(36)}function wa(t,e,n,r,s){var i=typeof t;(i==="undefined"||i==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(i){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case yo:case Qw:o=!0}}if(o)return o=t,s=s(o),t=r===""?"."+Su(o,0):r,gp(s)?(n="",t!=null&&(n=t.replace(yp,"$&/")+"/"),wa(s,e,n,"",function(h){return h})):s!=null&&(Rh(s)&&(s=o1(s,n+(!s.key||o&&o.key===s.key?"":(""+s.key).replace(yp,"$&/")+"/")+t)),e.push(s)),1;if(o=0,r=r===""?".":r+":",gp(t))for(var l=0;l<t.length;l++){i=t[l];var u=r+Su(i,l);o+=wa(i,e,n,u,s)}else if(u=i1(t),typeof u=="function")for(t=u.call(t),l=0;!(i=t.next()).done;)i=i.value,u=r+Su(i,l++),o+=wa(i,e,n,u,s);else if(i==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function Yo(t,e,n){if(t==null)return t;var r=[],s=0;return wa(t,r,"","",function(i){return e.call(n,i,s++)}),r}function l1(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var wt={current:null},Ea={transition:null},u1={ReactCurrentDispatcher:wt,ReactCurrentBatchConfig:Ea,ReactCurrentOwner:Ch};function Zg(){throw Error("act(...) is not supported in production builds of React.")}he.Children={map:Yo,forEach:function(t,e,n){Yo(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return Yo(t,function(){e++}),e},toArray:function(t){return Yo(t,function(e){return e})||[]},only:function(t){if(!Rh(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};he.Component=Ws;he.Fragment=Jw;he.Profiler=Xw;he.PureComponent=kh;he.StrictMode=Yw;he.Suspense=n1;he.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=u1;he.act=Zg;he.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var r=Kg({},t.props),s=t.key,i=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(i=e.ref,o=Ch.current),e.key!==void 0&&(s=""+e.key),t.type&&t.type.defaultProps)var l=t.type.defaultProps;for(u in e)Jg.call(e,u)&&!Yg.hasOwnProperty(u)&&(r[u]=e[u]===void 0&&l!==void 0?l[u]:e[u])}var u=arguments.length-2;if(u===1)r.children=n;else if(1<u){l=Array(u);for(var h=0;h<u;h++)l[h]=arguments[h+2];r.children=l}return{$$typeof:yo,type:t.type,key:s,ref:i,props:r,_owner:o}};he.createContext=function(t){return t={$$typeof:e1,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:Zw,_context:t},t.Consumer=t};he.createElement=Xg;he.createFactory=function(t){var e=Xg.bind(null,t);return e.type=t,e};he.createRef=function(){return{current:null}};he.forwardRef=function(t){return{$$typeof:t1,render:t}};he.isValidElement=Rh;he.lazy=function(t){return{$$typeof:s1,_payload:{_status:-1,_result:t},_init:l1}};he.memo=function(t,e){return{$$typeof:r1,type:t,compare:e===void 0?null:e}};he.startTransition=function(t){var e=Ea.transition;Ea.transition={};try{t()}finally{Ea.transition=e}};he.unstable_act=Zg;he.useCallback=function(t,e){return wt.current.useCallback(t,e)};he.useContext=function(t){return wt.current.useContext(t)};he.useDebugValue=function(){};he.useDeferredValue=function(t){return wt.current.useDeferredValue(t)};he.useEffect=function(t,e){return wt.current.useEffect(t,e)};he.useId=function(){return wt.current.useId()};he.useImperativeHandle=function(t,e,n){return wt.current.useImperativeHandle(t,e,n)};he.useInsertionEffect=function(t,e){return wt.current.useInsertionEffect(t,e)};he.useLayoutEffect=function(t,e){return wt.current.useLayoutEffect(t,e)};he.useMemo=function(t,e){return wt.current.useMemo(t,e)};he.useReducer=function(t,e,n){return wt.current.useReducer(t,e,n)};he.useRef=function(t){return wt.current.useRef(t)};he.useState=function(t){return wt.current.useState(t)};he.useSyncExternalStore=function(t,e,n){return wt.current.useSyncExternalStore(t,e,n)};he.useTransition=function(){return wt.current.useTransition()};he.version="18.3.1";Hg.exports=he;var W=Hg.exports;const Ph=Bg(W);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var c1=W,h1=Symbol.for("react.element"),d1=Symbol.for("react.fragment"),f1=Object.prototype.hasOwnProperty,p1=c1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,m1={key:!0,ref:!0,__self:!0,__source:!0};function ey(t,e,n){var r,s={},i=null,o=null;n!==void 0&&(i=""+n),e.key!==void 0&&(i=""+e.key),e.ref!==void 0&&(o=e.ref);for(r in e)f1.call(e,r)&&!m1.hasOwnProperty(r)&&(s[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)s[r]===void 0&&(s[r]=e[r]);return{$$typeof:h1,type:t,key:i,ref:o,props:s,_owner:p1.current}}Rl.Fragment=d1;Rl.jsx=ey;Rl.jsxs=ey;Wg.exports=Rl;var f=Wg.exports,uc={},ty={exports:{}},bt={},ny={exports:{}},ry={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(z,Y){var X=z.length;z.push(Y);e:for(;0<X;){var de=X-1>>>1,le=z[de];if(0<s(le,Y))z[de]=Y,z[X]=le,X=de;else break e}}function n(z){return z.length===0?null:z[0]}function r(z){if(z.length===0)return null;var Y=z[0],X=z.pop();if(X!==Y){z[0]=X;e:for(var de=0,le=z.length,ve=le>>>1;de<ve;){var $=2*(de+1)-1,Z=z[$],Ce=$+1,ce=z[Ce];if(0>s(Z,X))Ce<le&&0>s(ce,Z)?(z[de]=ce,z[Ce]=X,de=Ce):(z[de]=Z,z[$]=X,de=$);else if(Ce<le&&0>s(ce,X))z[de]=ce,z[Ce]=X,de=Ce;else break e}}return Y}function s(z,Y){var X=z.sortIndex-Y.sortIndex;return X!==0?X:z.id-Y.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;t.unstable_now=function(){return i.now()}}else{var o=Date,l=o.now();t.unstable_now=function(){return o.now()-l}}var u=[],h=[],p=1,m=null,y=3,w=!1,A=!1,R=!1,V=typeof setTimeout=="function"?setTimeout:null,T=typeof clearTimeout=="function"?clearTimeout:null,E=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function I(z){for(var Y=n(h);Y!==null;){if(Y.callback===null)r(h);else if(Y.startTime<=z)r(h),Y.sortIndex=Y.expirationTime,e(u,Y);else break;Y=n(h)}}function D(z){if(R=!1,I(z),!A)if(n(u)!==null)A=!0,ue(L);else{var Y=n(h);Y!==null&&me(D,Y.startTime-z)}}function L(z,Y){A=!1,R&&(R=!1,T(g),g=-1),w=!0;var X=y;try{for(I(Y),m=n(u);m!==null&&(!(m.expirationTime>Y)||z&&!C());){var de=m.callback;if(typeof de=="function"){m.callback=null,y=m.priorityLevel;var le=de(m.expirationTime<=Y);Y=t.unstable_now(),typeof le=="function"?m.callback=le:m===n(u)&&r(u),I(Y)}else r(u);m=n(u)}if(m!==null)var ve=!0;else{var $=n(h);$!==null&&me(D,$.startTime-Y),ve=!1}return ve}finally{m=null,y=X,w=!1}}var N=!1,_=null,g=-1,x=5,k=-1;function C(){return!(t.unstable_now()-k<x)}function P(){if(_!==null){var z=t.unstable_now();k=z;var Y=!0;try{Y=_(!0,z)}finally{Y?S():(N=!1,_=null)}}else N=!1}var S;if(typeof E=="function")S=function(){E(P)};else if(typeof MessageChannel<"u"){var J=new MessageChannel,Ae=J.port2;J.port1.onmessage=P,S=function(){Ae.postMessage(null)}}else S=function(){V(P,0)};function ue(z){_=z,N||(N=!0,S())}function me(z,Y){g=V(function(){z(t.unstable_now())},Y)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(z){z.callback=null},t.unstable_continueExecution=function(){A||w||(A=!0,ue(L))},t.unstable_forceFrameRate=function(z){0>z||125<z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):x=0<z?Math.floor(1e3/z):5},t.unstable_getCurrentPriorityLevel=function(){return y},t.unstable_getFirstCallbackNode=function(){return n(u)},t.unstable_next=function(z){switch(y){case 1:case 2:case 3:var Y=3;break;default:Y=y}var X=y;y=Y;try{return z()}finally{y=X}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(z,Y){switch(z){case 1:case 2:case 3:case 4:case 5:break;default:z=3}var X=y;y=z;try{return Y()}finally{y=X}},t.unstable_scheduleCallback=function(z,Y,X){var de=t.unstable_now();switch(typeof X=="object"&&X!==null?(X=X.delay,X=typeof X=="number"&&0<X?de+X:de):X=de,z){case 1:var le=-1;break;case 2:le=250;break;case 5:le=1073741823;break;case 4:le=1e4;break;default:le=5e3}return le=X+le,z={id:p++,callback:Y,priorityLevel:z,startTime:X,expirationTime:le,sortIndex:-1},X>de?(z.sortIndex=X,e(h,z),n(u)===null&&z===n(h)&&(R?(T(g),g=-1):R=!0,me(D,X-de))):(z.sortIndex=le,e(u,z),A||w||(A=!0,ue(L))),z},t.unstable_shouldYield=C,t.unstable_wrapCallback=function(z){var Y=y;return function(){var X=y;y=Y;try{return z.apply(this,arguments)}finally{y=X}}}})(ry);ny.exports=ry;var g1=ny.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var y1=W,Nt=g1;function F(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var sy=new Set,Bi={};function Hr(t,e){Cs(t,e),Cs(t+"Capture",e)}function Cs(t,e){for(Bi[t]=e,t=0;t<e.length;t++)sy.add(e[t])}var Sn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),cc=Object.prototype.hasOwnProperty,v1=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,vp={},_p={};function _1(t){return cc.call(_p,t)?!0:cc.call(vp,t)?!1:v1.test(t)?_p[t]=!0:(vp[t]=!0,!1)}function w1(t,e,n,r){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function E1(t,e,n,r){if(e===null||typeof e>"u"||w1(t,e,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function Et(t,e,n,r,s,i,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=r,this.attributeNamespace=s,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=i,this.removeEmptyString=o}var rt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){rt[t]=new Et(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];rt[e]=new Et(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){rt[t]=new Et(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){rt[t]=new Et(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){rt[t]=new Et(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){rt[t]=new Et(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){rt[t]=new Et(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){rt[t]=new Et(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){rt[t]=new Et(t,5,!1,t.toLowerCase(),null,!1,!1)});var Nh=/[\-:]([a-z])/g;function bh(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Nh,bh);rt[e]=new Et(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Nh,bh);rt[e]=new Et(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Nh,bh);rt[e]=new Et(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){rt[t]=new Et(t,1,!1,t.toLowerCase(),null,!1,!1)});rt.xlinkHref=new Et("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){rt[t]=new Et(t,1,!1,t.toLowerCase(),null,!0,!0)});function Dh(t,e,n,r){var s=rt.hasOwnProperty(e)?rt[e]:null;(s!==null?s.type!==0:r||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(E1(e,n,s,r)&&(n=null),r||s===null?_1(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):s.mustUseProperty?t[s.propertyName]=n===null?s.type===3?!1:"":n:(e=s.attributeName,r=s.attributeNamespace,n===null?t.removeAttribute(e):(s=s.type,n=s===3||s===4&&n===!0?"":""+n,r?t.setAttributeNS(r,e,n):t.setAttribute(e,n))))}var Vn=y1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Xo=Symbol.for("react.element"),rs=Symbol.for("react.portal"),ss=Symbol.for("react.fragment"),Oh=Symbol.for("react.strict_mode"),hc=Symbol.for("react.profiler"),iy=Symbol.for("react.provider"),oy=Symbol.for("react.context"),Vh=Symbol.for("react.forward_ref"),dc=Symbol.for("react.suspense"),fc=Symbol.for("react.suspense_list"),Lh=Symbol.for("react.memo"),$n=Symbol.for("react.lazy"),ay=Symbol.for("react.offscreen"),wp=Symbol.iterator;function di(t){return t===null||typeof t!="object"?null:(t=wp&&t[wp]||t["@@iterator"],typeof t=="function"?t:null)}var Ve=Object.assign,ku;function Ei(t){if(ku===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);ku=e&&e[1]||""}return`
`+ku+t}var Au=!1;function Cu(t,e){if(!t||Au)return"";Au=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(h){var r=h}Reflect.construct(t,[],e)}else{try{e.call()}catch(h){r=h}t.call(e.prototype)}else{try{throw Error()}catch(h){r=h}t()}}catch(h){if(h&&r&&typeof h.stack=="string"){for(var s=h.stack.split(`
`),i=r.stack.split(`
`),o=s.length-1,l=i.length-1;1<=o&&0<=l&&s[o]!==i[l];)l--;for(;1<=o&&0<=l;o--,l--)if(s[o]!==i[l]){if(o!==1||l!==1)do if(o--,l--,0>l||s[o]!==i[l]){var u=`
`+s[o].replace(" at new "," at ");return t.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",t.displayName)),u}while(1<=o&&0<=l);break}}}finally{Au=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?Ei(t):""}function T1(t){switch(t.tag){case 5:return Ei(t.type);case 16:return Ei("Lazy");case 13:return Ei("Suspense");case 19:return Ei("SuspenseList");case 0:case 2:case 15:return t=Cu(t.type,!1),t;case 11:return t=Cu(t.type.render,!1),t;case 1:return t=Cu(t.type,!0),t;default:return""}}function pc(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case ss:return"Fragment";case rs:return"Portal";case hc:return"Profiler";case Oh:return"StrictMode";case dc:return"Suspense";case fc:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case oy:return(t.displayName||"Context")+".Consumer";case iy:return(t._context.displayName||"Context")+".Provider";case Vh:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Lh:return e=t.displayName||null,e!==null?e:pc(t.type)||"Memo";case $n:e=t._payload,t=t._init;try{return pc(t(e))}catch{}}return null}function x1(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return pc(e);case 8:return e===Oh?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function hr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function ly(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function I1(t){var e=ly(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),r=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var s=n.get,i=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return s.call(this)},set:function(o){r=""+o,i.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Zo(t){t._valueTracker||(t._valueTracker=I1(t))}function uy(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),r="";return t&&(r=ly(t)?t.checked?"true":"false":t.value),t=r,t!==n?(e.setValue(t),!0):!1}function za(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function mc(t,e){var n=e.checked;return Ve({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Ep(t,e){var n=e.defaultValue==null?"":e.defaultValue,r=e.checked!=null?e.checked:e.defaultChecked;n=hr(e.value!=null?e.value:n),t._wrapperState={initialChecked:r,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function cy(t,e){e=e.checked,e!=null&&Dh(t,"checked",e,!1)}function gc(t,e){cy(t,e);var n=hr(e.value),r=e.type;if(n!=null)r==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(r==="submit"||r==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?yc(t,e.type,n):e.hasOwnProperty("defaultValue")&&yc(t,e.type,hr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Tp(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var r=e.type;if(!(r!=="submit"&&r!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function yc(t,e,n){(e!=="number"||za(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var Ti=Array.isArray;function gs(t,e,n,r){if(t=t.options,e){e={};for(var s=0;s<n.length;s++)e["$"+n[s]]=!0;for(n=0;n<t.length;n++)s=e.hasOwnProperty("$"+t[n].value),t[n].selected!==s&&(t[n].selected=s),s&&r&&(t[n].defaultSelected=!0)}else{for(n=""+hr(n),e=null,s=0;s<t.length;s++){if(t[s].value===n){t[s].selected=!0,r&&(t[s].defaultSelected=!0);return}e!==null||t[s].disabled||(e=t[s])}e!==null&&(e.selected=!0)}}function vc(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(F(91));return Ve({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function xp(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(F(92));if(Ti(n)){if(1<n.length)throw Error(F(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:hr(n)}}function hy(t,e){var n=hr(e.value),r=hr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),r!=null&&(t.defaultValue=""+r)}function Ip(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function dy(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function _c(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?dy(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var ea,fy=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,r,s){MSApp.execUnsafeLocalFunction(function(){return t(e,n,r,s)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(ea=ea||document.createElement("div"),ea.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=ea.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function Wi(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Ri={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},S1=["Webkit","ms","Moz","O"];Object.keys(Ri).forEach(function(t){S1.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),Ri[e]=Ri[t]})});function py(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||Ri.hasOwnProperty(t)&&Ri[t]?(""+e).trim():e+"px"}function my(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var r=n.indexOf("--")===0,s=py(n,e[n],r);n==="float"&&(n="cssFloat"),r?t.setProperty(n,s):t[n]=s}}var k1=Ve({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function wc(t,e){if(e){if(k1[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(F(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(F(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(F(61))}if(e.style!=null&&typeof e.style!="object")throw Error(F(62))}}function Ec(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Tc=null;function Mh(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var xc=null,ys=null,vs=null;function Sp(t){if(t=wo(t)){if(typeof xc!="function")throw Error(F(280));var e=t.stateNode;e&&(e=Ol(e),xc(t.stateNode,t.type,e))}}function gy(t){ys?vs?vs.push(t):vs=[t]:ys=t}function yy(){if(ys){var t=ys,e=vs;if(vs=ys=null,Sp(t),e)for(t=0;t<e.length;t++)Sp(e[t])}}function vy(t,e){return t(e)}function _y(){}var Ru=!1;function wy(t,e,n){if(Ru)return t(e,n);Ru=!0;try{return vy(t,e,n)}finally{Ru=!1,(ys!==null||vs!==null)&&(_y(),yy())}}function Hi(t,e){var n=t.stateNode;if(n===null)return null;var r=Ol(n);if(r===null)return null;n=r[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(F(231,e,typeof n));return n}var Ic=!1;if(Sn)try{var fi={};Object.defineProperty(fi,"passive",{get:function(){Ic=!0}}),window.addEventListener("test",fi,fi),window.removeEventListener("test",fi,fi)}catch{Ic=!1}function A1(t,e,n,r,s,i,o,l,u){var h=Array.prototype.slice.call(arguments,3);try{e.apply(n,h)}catch(p){this.onError(p)}}var Pi=!1,$a=null,Ba=!1,Sc=null,C1={onError:function(t){Pi=!0,$a=t}};function R1(t,e,n,r,s,i,o,l,u){Pi=!1,$a=null,A1.apply(C1,arguments)}function P1(t,e,n,r,s,i,o,l,u){if(R1.apply(this,arguments),Pi){if(Pi){var h=$a;Pi=!1,$a=null}else throw Error(F(198));Ba||(Ba=!0,Sc=h)}}function qr(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function Ey(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function kp(t){if(qr(t)!==t)throw Error(F(188))}function N1(t){var e=t.alternate;if(!e){if(e=qr(t),e===null)throw Error(F(188));return e!==t?null:t}for(var n=t,r=e;;){var s=n.return;if(s===null)break;var i=s.alternate;if(i===null){if(r=s.return,r!==null){n=r;continue}break}if(s.child===i.child){for(i=s.child;i;){if(i===n)return kp(s),t;if(i===r)return kp(s),e;i=i.sibling}throw Error(F(188))}if(n.return!==r.return)n=s,r=i;else{for(var o=!1,l=s.child;l;){if(l===n){o=!0,n=s,r=i;break}if(l===r){o=!0,r=s,n=i;break}l=l.sibling}if(!o){for(l=i.child;l;){if(l===n){o=!0,n=i,r=s;break}if(l===r){o=!0,r=i,n=s;break}l=l.sibling}if(!o)throw Error(F(189))}}if(n.alternate!==r)throw Error(F(190))}if(n.tag!==3)throw Error(F(188));return n.stateNode.current===n?t:e}function Ty(t){return t=N1(t),t!==null?xy(t):null}function xy(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=xy(t);if(e!==null)return e;t=t.sibling}return null}var Iy=Nt.unstable_scheduleCallback,Ap=Nt.unstable_cancelCallback,b1=Nt.unstable_shouldYield,D1=Nt.unstable_requestPaint,ze=Nt.unstable_now,O1=Nt.unstable_getCurrentPriorityLevel,jh=Nt.unstable_ImmediatePriority,Sy=Nt.unstable_UserBlockingPriority,Wa=Nt.unstable_NormalPriority,V1=Nt.unstable_LowPriority,ky=Nt.unstable_IdlePriority,Pl=null,rn=null;function L1(t){if(rn&&typeof rn.onCommitFiberRoot=="function")try{rn.onCommitFiberRoot(Pl,t,void 0,(t.current.flags&128)===128)}catch{}}var Jt=Math.clz32?Math.clz32:F1,M1=Math.log,j1=Math.LN2;function F1(t){return t>>>=0,t===0?32:31-(M1(t)/j1|0)|0}var ta=64,na=4194304;function xi(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Ha(t,e){var n=t.pendingLanes;if(n===0)return 0;var r=0,s=t.suspendedLanes,i=t.pingedLanes,o=n&268435455;if(o!==0){var l=o&~s;l!==0?r=xi(l):(i&=o,i!==0&&(r=xi(i)))}else o=n&~s,o!==0?r=xi(o):i!==0&&(r=xi(i));if(r===0)return 0;if(e!==0&&e!==r&&!(e&s)&&(s=r&-r,i=e&-e,s>=i||s===16&&(i&4194240)!==0))return e;if(r&4&&(r|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=r;0<e;)n=31-Jt(e),s=1<<n,r|=t[n],e&=~s;return r}function U1(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function z1(t,e){for(var n=t.suspendedLanes,r=t.pingedLanes,s=t.expirationTimes,i=t.pendingLanes;0<i;){var o=31-Jt(i),l=1<<o,u=s[o];u===-1?(!(l&n)||l&r)&&(s[o]=U1(l,e)):u<=e&&(t.expiredLanes|=l),i&=~l}}function kc(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Ay(){var t=ta;return ta<<=1,!(ta&4194240)&&(ta=64),t}function Pu(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function vo(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-Jt(e),t[e]=n}function $1(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var r=t.eventTimes;for(t=t.expirationTimes;0<n;){var s=31-Jt(n),i=1<<s;e[s]=0,r[s]=-1,t[s]=-1,n&=~i}}function Fh(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var r=31-Jt(n),s=1<<r;s&e|t[r]&e&&(t[r]|=e),n&=~s}}var Te=0;function Cy(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var Ry,Uh,Py,Ny,by,Ac=!1,ra=[],Zn=null,er=null,tr=null,qi=new Map,Ki=new Map,Wn=[],B1="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Cp(t,e){switch(t){case"focusin":case"focusout":Zn=null;break;case"dragenter":case"dragleave":er=null;break;case"mouseover":case"mouseout":tr=null;break;case"pointerover":case"pointerout":qi.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ki.delete(e.pointerId)}}function pi(t,e,n,r,s,i){return t===null||t.nativeEvent!==i?(t={blockedOn:e,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[s]},e!==null&&(e=wo(e),e!==null&&Uh(e)),t):(t.eventSystemFlags|=r,e=t.targetContainers,s!==null&&e.indexOf(s)===-1&&e.push(s),t)}function W1(t,e,n,r,s){switch(e){case"focusin":return Zn=pi(Zn,t,e,n,r,s),!0;case"dragenter":return er=pi(er,t,e,n,r,s),!0;case"mouseover":return tr=pi(tr,t,e,n,r,s),!0;case"pointerover":var i=s.pointerId;return qi.set(i,pi(qi.get(i)||null,t,e,n,r,s)),!0;case"gotpointercapture":return i=s.pointerId,Ki.set(i,pi(Ki.get(i)||null,t,e,n,r,s)),!0}return!1}function Dy(t){var e=Ar(t.target);if(e!==null){var n=qr(e);if(n!==null){if(e=n.tag,e===13){if(e=Ey(n),e!==null){t.blockedOn=e,by(t.priority,function(){Py(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Ta(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Cc(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var r=new n.constructor(n.type,n);Tc=r,n.target.dispatchEvent(r),Tc=null}else return e=wo(n),e!==null&&Uh(e),t.blockedOn=n,!1;e.shift()}return!0}function Rp(t,e,n){Ta(t)&&n.delete(e)}function H1(){Ac=!1,Zn!==null&&Ta(Zn)&&(Zn=null),er!==null&&Ta(er)&&(er=null),tr!==null&&Ta(tr)&&(tr=null),qi.forEach(Rp),Ki.forEach(Rp)}function mi(t,e){t.blockedOn===e&&(t.blockedOn=null,Ac||(Ac=!0,Nt.unstable_scheduleCallback(Nt.unstable_NormalPriority,H1)))}function Gi(t){function e(s){return mi(s,t)}if(0<ra.length){mi(ra[0],t);for(var n=1;n<ra.length;n++){var r=ra[n];r.blockedOn===t&&(r.blockedOn=null)}}for(Zn!==null&&mi(Zn,t),er!==null&&mi(er,t),tr!==null&&mi(tr,t),qi.forEach(e),Ki.forEach(e),n=0;n<Wn.length;n++)r=Wn[n],r.blockedOn===t&&(r.blockedOn=null);for(;0<Wn.length&&(n=Wn[0],n.blockedOn===null);)Dy(n),n.blockedOn===null&&Wn.shift()}var _s=Vn.ReactCurrentBatchConfig,qa=!0;function q1(t,e,n,r){var s=Te,i=_s.transition;_s.transition=null;try{Te=1,zh(t,e,n,r)}finally{Te=s,_s.transition=i}}function K1(t,e,n,r){var s=Te,i=_s.transition;_s.transition=null;try{Te=4,zh(t,e,n,r)}finally{Te=s,_s.transition=i}}function zh(t,e,n,r){if(qa){var s=Cc(t,e,n,r);if(s===null)Uu(t,e,r,Ka,n),Cp(t,r);else if(W1(s,t,e,n,r))r.stopPropagation();else if(Cp(t,r),e&4&&-1<B1.indexOf(t)){for(;s!==null;){var i=wo(s);if(i!==null&&Ry(i),i=Cc(t,e,n,r),i===null&&Uu(t,e,r,Ka,n),i===s)break;s=i}s!==null&&r.stopPropagation()}else Uu(t,e,r,null,n)}}var Ka=null;function Cc(t,e,n,r){if(Ka=null,t=Mh(r),t=Ar(t),t!==null)if(e=qr(t),e===null)t=null;else if(n=e.tag,n===13){if(t=Ey(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return Ka=t,null}function Oy(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(O1()){case jh:return 1;case Sy:return 4;case Wa:case V1:return 16;case ky:return 536870912;default:return 16}default:return 16}}var Jn=null,$h=null,xa=null;function Vy(){if(xa)return xa;var t,e=$h,n=e.length,r,s="value"in Jn?Jn.value:Jn.textContent,i=s.length;for(t=0;t<n&&e[t]===s[t];t++);var o=n-t;for(r=1;r<=o&&e[n-r]===s[i-r];r++);return xa=s.slice(t,1<r?1-r:void 0)}function Ia(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function sa(){return!0}function Pp(){return!1}function Dt(t){function e(n,r,s,i,o){this._reactName=n,this._targetInst=s,this.type=r,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var l in t)t.hasOwnProperty(l)&&(n=t[l],this[l]=n?n(i):i[l]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?sa:Pp,this.isPropagationStopped=Pp,this}return Ve(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=sa)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=sa)},persist:function(){},isPersistent:sa}),e}var Hs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Bh=Dt(Hs),_o=Ve({},Hs,{view:0,detail:0}),G1=Dt(_o),Nu,bu,gi,Nl=Ve({},_o,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Wh,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==gi&&(gi&&t.type==="mousemove"?(Nu=t.screenX-gi.screenX,bu=t.screenY-gi.screenY):bu=Nu=0,gi=t),Nu)},movementY:function(t){return"movementY"in t?t.movementY:bu}}),Np=Dt(Nl),Q1=Ve({},Nl,{dataTransfer:0}),J1=Dt(Q1),Y1=Ve({},_o,{relatedTarget:0}),Du=Dt(Y1),X1=Ve({},Hs,{animationName:0,elapsedTime:0,pseudoElement:0}),Z1=Dt(X1),eE=Ve({},Hs,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),tE=Dt(eE),nE=Ve({},Hs,{data:0}),bp=Dt(nE),rE={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},sE={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},iE={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function oE(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=iE[t])?!!e[t]:!1}function Wh(){return oE}var aE=Ve({},_o,{key:function(t){if(t.key){var e=rE[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Ia(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?sE[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Wh,charCode:function(t){return t.type==="keypress"?Ia(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Ia(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),lE=Dt(aE),uE=Ve({},Nl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Dp=Dt(uE),cE=Ve({},_o,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Wh}),hE=Dt(cE),dE=Ve({},Hs,{propertyName:0,elapsedTime:0,pseudoElement:0}),fE=Dt(dE),pE=Ve({},Nl,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),mE=Dt(pE),gE=[9,13,27,32],Hh=Sn&&"CompositionEvent"in window,Ni=null;Sn&&"documentMode"in document&&(Ni=document.documentMode);var yE=Sn&&"TextEvent"in window&&!Ni,Ly=Sn&&(!Hh||Ni&&8<Ni&&11>=Ni),Op=" ",Vp=!1;function My(t,e){switch(t){case"keyup":return gE.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function jy(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var is=!1;function vE(t,e){switch(t){case"compositionend":return jy(e);case"keypress":return e.which!==32?null:(Vp=!0,Op);case"textInput":return t=e.data,t===Op&&Vp?null:t;default:return null}}function _E(t,e){if(is)return t==="compositionend"||!Hh&&My(t,e)?(t=Vy(),xa=$h=Jn=null,is=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Ly&&e.locale!=="ko"?null:e.data;default:return null}}var wE={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Lp(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!wE[t.type]:e==="textarea"}function Fy(t,e,n,r){gy(r),e=Ga(e,"onChange"),0<e.length&&(n=new Bh("onChange","change",null,n,r),t.push({event:n,listeners:e}))}var bi=null,Qi=null;function EE(t){Jy(t,0)}function bl(t){var e=ls(t);if(uy(e))return t}function TE(t,e){if(t==="change")return e}var Uy=!1;if(Sn){var Ou;if(Sn){var Vu="oninput"in document;if(!Vu){var Mp=document.createElement("div");Mp.setAttribute("oninput","return;"),Vu=typeof Mp.oninput=="function"}Ou=Vu}else Ou=!1;Uy=Ou&&(!document.documentMode||9<document.documentMode)}function jp(){bi&&(bi.detachEvent("onpropertychange",zy),Qi=bi=null)}function zy(t){if(t.propertyName==="value"&&bl(Qi)){var e=[];Fy(e,Qi,t,Mh(t)),wy(EE,e)}}function xE(t,e,n){t==="focusin"?(jp(),bi=e,Qi=n,bi.attachEvent("onpropertychange",zy)):t==="focusout"&&jp()}function IE(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return bl(Qi)}function SE(t,e){if(t==="click")return bl(e)}function kE(t,e){if(t==="input"||t==="change")return bl(e)}function AE(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Xt=typeof Object.is=="function"?Object.is:AE;function Ji(t,e){if(Xt(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),r=Object.keys(e);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var s=n[r];if(!cc.call(e,s)||!Xt(t[s],e[s]))return!1}return!0}function Fp(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Up(t,e){var n=Fp(t);t=0;for(var r;n;){if(n.nodeType===3){if(r=t+n.textContent.length,t<=e&&r>=e)return{node:n,offset:e-t};t=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Fp(n)}}function $y(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?$y(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function By(){for(var t=window,e=za();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=za(t.document)}return e}function qh(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function CE(t){var e=By(),n=t.focusedElem,r=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&$y(n.ownerDocument.documentElement,n)){if(r!==null&&qh(n)){if(e=r.start,t=r.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var s=n.textContent.length,i=Math.min(r.start,s);r=r.end===void 0?i:Math.min(r.end,s),!t.extend&&i>r&&(s=r,r=i,i=s),s=Up(n,i);var o=Up(n,r);s&&o&&(t.rangeCount!==1||t.anchorNode!==s.node||t.anchorOffset!==s.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(s.node,s.offset),t.removeAllRanges(),i>r?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var RE=Sn&&"documentMode"in document&&11>=document.documentMode,os=null,Rc=null,Di=null,Pc=!1;function zp(t,e,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Pc||os==null||os!==za(r)||(r=os,"selectionStart"in r&&qh(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Di&&Ji(Di,r)||(Di=r,r=Ga(Rc,"onSelect"),0<r.length&&(e=new Bh("onSelect","select",null,e,n),t.push({event:e,listeners:r}),e.target=os)))}function ia(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var as={animationend:ia("Animation","AnimationEnd"),animationiteration:ia("Animation","AnimationIteration"),animationstart:ia("Animation","AnimationStart"),transitionend:ia("Transition","TransitionEnd")},Lu={},Wy={};Sn&&(Wy=document.createElement("div").style,"AnimationEvent"in window||(delete as.animationend.animation,delete as.animationiteration.animation,delete as.animationstart.animation),"TransitionEvent"in window||delete as.transitionend.transition);function Dl(t){if(Lu[t])return Lu[t];if(!as[t])return t;var e=as[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in Wy)return Lu[t]=e[n];return t}var Hy=Dl("animationend"),qy=Dl("animationiteration"),Ky=Dl("animationstart"),Gy=Dl("transitionend"),Qy=new Map,$p="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function gr(t,e){Qy.set(t,e),Hr(e,[t])}for(var Mu=0;Mu<$p.length;Mu++){var ju=$p[Mu],PE=ju.toLowerCase(),NE=ju[0].toUpperCase()+ju.slice(1);gr(PE,"on"+NE)}gr(Hy,"onAnimationEnd");gr(qy,"onAnimationIteration");gr(Ky,"onAnimationStart");gr("dblclick","onDoubleClick");gr("focusin","onFocus");gr("focusout","onBlur");gr(Gy,"onTransitionEnd");Cs("onMouseEnter",["mouseout","mouseover"]);Cs("onMouseLeave",["mouseout","mouseover"]);Cs("onPointerEnter",["pointerout","pointerover"]);Cs("onPointerLeave",["pointerout","pointerover"]);Hr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Hr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Hr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Hr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Hr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Hr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ii="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),bE=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ii));function Bp(t,e,n){var r=t.type||"unknown-event";t.currentTarget=n,P1(r,e,void 0,t),t.currentTarget=null}function Jy(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var r=t[n],s=r.event;r=r.listeners;e:{var i=void 0;if(e)for(var o=r.length-1;0<=o;o--){var l=r[o],u=l.instance,h=l.currentTarget;if(l=l.listener,u!==i&&s.isPropagationStopped())break e;Bp(s,l,h),i=u}else for(o=0;o<r.length;o++){if(l=r[o],u=l.instance,h=l.currentTarget,l=l.listener,u!==i&&s.isPropagationStopped())break e;Bp(s,l,h),i=u}}}if(Ba)throw t=Sc,Ba=!1,Sc=null,t}function Pe(t,e){var n=e[Vc];n===void 0&&(n=e[Vc]=new Set);var r=t+"__bubble";n.has(r)||(Yy(e,t,2,!1),n.add(r))}function Fu(t,e,n){var r=0;e&&(r|=4),Yy(n,t,r,e)}var oa="_reactListening"+Math.random().toString(36).slice(2);function Yi(t){if(!t[oa]){t[oa]=!0,sy.forEach(function(n){n!=="selectionchange"&&(bE.has(n)||Fu(n,!1,t),Fu(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[oa]||(e[oa]=!0,Fu("selectionchange",!1,e))}}function Yy(t,e,n,r){switch(Oy(e)){case 1:var s=q1;break;case 4:s=K1;break;default:s=zh}n=s.bind(null,e,n,t),s=void 0,!Ic||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(s=!0),r?s!==void 0?t.addEventListener(e,n,{capture:!0,passive:s}):t.addEventListener(e,n,!0):s!==void 0?t.addEventListener(e,n,{passive:s}):t.addEventListener(e,n,!1)}function Uu(t,e,n,r,s){var i=r;if(!(e&1)&&!(e&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var l=r.stateNode.containerInfo;if(l===s||l.nodeType===8&&l.parentNode===s)break;if(o===4)for(o=r.return;o!==null;){var u=o.tag;if((u===3||u===4)&&(u=o.stateNode.containerInfo,u===s||u.nodeType===8&&u.parentNode===s))return;o=o.return}for(;l!==null;){if(o=Ar(l),o===null)return;if(u=o.tag,u===5||u===6){r=i=o;continue e}l=l.parentNode}}r=r.return}wy(function(){var h=i,p=Mh(n),m=[];e:{var y=Qy.get(t);if(y!==void 0){var w=Bh,A=t;switch(t){case"keypress":if(Ia(n)===0)break e;case"keydown":case"keyup":w=lE;break;case"focusin":A="focus",w=Du;break;case"focusout":A="blur",w=Du;break;case"beforeblur":case"afterblur":w=Du;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":w=Np;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":w=J1;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":w=hE;break;case Hy:case qy:case Ky:w=Z1;break;case Gy:w=fE;break;case"scroll":w=G1;break;case"wheel":w=mE;break;case"copy":case"cut":case"paste":w=tE;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":w=Dp}var R=(e&4)!==0,V=!R&&t==="scroll",T=R?y!==null?y+"Capture":null:y;R=[];for(var E=h,I;E!==null;){I=E;var D=I.stateNode;if(I.tag===5&&D!==null&&(I=D,T!==null&&(D=Hi(E,T),D!=null&&R.push(Xi(E,D,I)))),V)break;E=E.return}0<R.length&&(y=new w(y,A,null,n,p),m.push({event:y,listeners:R}))}}if(!(e&7)){e:{if(y=t==="mouseover"||t==="pointerover",w=t==="mouseout"||t==="pointerout",y&&n!==Tc&&(A=n.relatedTarget||n.fromElement)&&(Ar(A)||A[kn]))break e;if((w||y)&&(y=p.window===p?p:(y=p.ownerDocument)?y.defaultView||y.parentWindow:window,w?(A=n.relatedTarget||n.toElement,w=h,A=A?Ar(A):null,A!==null&&(V=qr(A),A!==V||A.tag!==5&&A.tag!==6)&&(A=null)):(w=null,A=h),w!==A)){if(R=Np,D="onMouseLeave",T="onMouseEnter",E="mouse",(t==="pointerout"||t==="pointerover")&&(R=Dp,D="onPointerLeave",T="onPointerEnter",E="pointer"),V=w==null?y:ls(w),I=A==null?y:ls(A),y=new R(D,E+"leave",w,n,p),y.target=V,y.relatedTarget=I,D=null,Ar(p)===h&&(R=new R(T,E+"enter",A,n,p),R.target=I,R.relatedTarget=V,D=R),V=D,w&&A)t:{for(R=w,T=A,E=0,I=R;I;I=Zr(I))E++;for(I=0,D=T;D;D=Zr(D))I++;for(;0<E-I;)R=Zr(R),E--;for(;0<I-E;)T=Zr(T),I--;for(;E--;){if(R===T||T!==null&&R===T.alternate)break t;R=Zr(R),T=Zr(T)}R=null}else R=null;w!==null&&Wp(m,y,w,R,!1),A!==null&&V!==null&&Wp(m,V,A,R,!0)}}e:{if(y=h?ls(h):window,w=y.nodeName&&y.nodeName.toLowerCase(),w==="select"||w==="input"&&y.type==="file")var L=TE;else if(Lp(y))if(Uy)L=kE;else{L=IE;var N=xE}else(w=y.nodeName)&&w.toLowerCase()==="input"&&(y.type==="checkbox"||y.type==="radio")&&(L=SE);if(L&&(L=L(t,h))){Fy(m,L,n,p);break e}N&&N(t,y,h),t==="focusout"&&(N=y._wrapperState)&&N.controlled&&y.type==="number"&&yc(y,"number",y.value)}switch(N=h?ls(h):window,t){case"focusin":(Lp(N)||N.contentEditable==="true")&&(os=N,Rc=h,Di=null);break;case"focusout":Di=Rc=os=null;break;case"mousedown":Pc=!0;break;case"contextmenu":case"mouseup":case"dragend":Pc=!1,zp(m,n,p);break;case"selectionchange":if(RE)break;case"keydown":case"keyup":zp(m,n,p)}var _;if(Hh)e:{switch(t){case"compositionstart":var g="onCompositionStart";break e;case"compositionend":g="onCompositionEnd";break e;case"compositionupdate":g="onCompositionUpdate";break e}g=void 0}else is?My(t,n)&&(g="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(g="onCompositionStart");g&&(Ly&&n.locale!=="ko"&&(is||g!=="onCompositionStart"?g==="onCompositionEnd"&&is&&(_=Vy()):(Jn=p,$h="value"in Jn?Jn.value:Jn.textContent,is=!0)),N=Ga(h,g),0<N.length&&(g=new bp(g,t,null,n,p),m.push({event:g,listeners:N}),_?g.data=_:(_=jy(n),_!==null&&(g.data=_)))),(_=yE?vE(t,n):_E(t,n))&&(h=Ga(h,"onBeforeInput"),0<h.length&&(p=new bp("onBeforeInput","beforeinput",null,n,p),m.push({event:p,listeners:h}),p.data=_))}Jy(m,e)})}function Xi(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Ga(t,e){for(var n=e+"Capture",r=[];t!==null;){var s=t,i=s.stateNode;s.tag===5&&i!==null&&(s=i,i=Hi(t,n),i!=null&&r.unshift(Xi(t,i,s)),i=Hi(t,e),i!=null&&r.push(Xi(t,i,s))),t=t.return}return r}function Zr(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Wp(t,e,n,r,s){for(var i=e._reactName,o=[];n!==null&&n!==r;){var l=n,u=l.alternate,h=l.stateNode;if(u!==null&&u===r)break;l.tag===5&&h!==null&&(l=h,s?(u=Hi(n,i),u!=null&&o.unshift(Xi(n,u,l))):s||(u=Hi(n,i),u!=null&&o.push(Xi(n,u,l)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var DE=/\r\n?/g,OE=/\u0000|\uFFFD/g;function Hp(t){return(typeof t=="string"?t:""+t).replace(DE,`
`).replace(OE,"")}function aa(t,e,n){if(e=Hp(e),Hp(t)!==e&&n)throw Error(F(425))}function Qa(){}var Nc=null,bc=null;function Dc(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Oc=typeof setTimeout=="function"?setTimeout:void 0,VE=typeof clearTimeout=="function"?clearTimeout:void 0,qp=typeof Promise=="function"?Promise:void 0,LE=typeof queueMicrotask=="function"?queueMicrotask:typeof qp<"u"?function(t){return qp.resolve(null).then(t).catch(ME)}:Oc;function ME(t){setTimeout(function(){throw t})}function zu(t,e){var n=e,r=0;do{var s=n.nextSibling;if(t.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"){if(r===0){t.removeChild(s),Gi(e);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=s}while(n);Gi(e)}function nr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function Kp(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var qs=Math.random().toString(36).slice(2),tn="__reactFiber$"+qs,Zi="__reactProps$"+qs,kn="__reactContainer$"+qs,Vc="__reactEvents$"+qs,jE="__reactListeners$"+qs,FE="__reactHandles$"+qs;function Ar(t){var e=t[tn];if(e)return e;for(var n=t.parentNode;n;){if(e=n[kn]||n[tn]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Kp(t);t!==null;){if(n=t[tn])return n;t=Kp(t)}return e}t=n,n=t.parentNode}return null}function wo(t){return t=t[tn]||t[kn],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function ls(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(F(33))}function Ol(t){return t[Zi]||null}var Lc=[],us=-1;function yr(t){return{current:t}}function Ne(t){0>us||(t.current=Lc[us],Lc[us]=null,us--)}function ke(t,e){us++,Lc[us]=t.current,t.current=e}var dr={},pt=yr(dr),It=yr(!1),Vr=dr;function Rs(t,e){var n=t.type.contextTypes;if(!n)return dr;var r=t.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===e)return r.__reactInternalMemoizedMaskedChildContext;var s={},i;for(i in n)s[i]=e[i];return r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=s),s}function St(t){return t=t.childContextTypes,t!=null}function Ja(){Ne(It),Ne(pt)}function Gp(t,e,n){if(pt.current!==dr)throw Error(F(168));ke(pt,e),ke(It,n)}function Xy(t,e,n){var r=t.stateNode;if(e=e.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var s in r)if(!(s in e))throw Error(F(108,x1(t)||"Unknown",s));return Ve({},n,r)}function Ya(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||dr,Vr=pt.current,ke(pt,t),ke(It,It.current),!0}function Qp(t,e,n){var r=t.stateNode;if(!r)throw Error(F(169));n?(t=Xy(t,e,Vr),r.__reactInternalMemoizedMergedChildContext=t,Ne(It),Ne(pt),ke(pt,t)):Ne(It),ke(It,n)}var gn=null,Vl=!1,$u=!1;function Zy(t){gn===null?gn=[t]:gn.push(t)}function UE(t){Vl=!0,Zy(t)}function vr(){if(!$u&&gn!==null){$u=!0;var t=0,e=Te;try{var n=gn;for(Te=1;t<n.length;t++){var r=n[t];do r=r(!0);while(r!==null)}gn=null,Vl=!1}catch(s){throw gn!==null&&(gn=gn.slice(t+1)),Iy(jh,vr),s}finally{Te=e,$u=!1}}return null}var cs=[],hs=0,Xa=null,Za=0,Vt=[],Lt=0,Lr=null,yn=1,vn="";function Ir(t,e){cs[hs++]=Za,cs[hs++]=Xa,Xa=t,Za=e}function ev(t,e,n){Vt[Lt++]=yn,Vt[Lt++]=vn,Vt[Lt++]=Lr,Lr=t;var r=yn;t=vn;var s=32-Jt(r)-1;r&=~(1<<s),n+=1;var i=32-Jt(e)+s;if(30<i){var o=s-s%5;i=(r&(1<<o)-1).toString(32),r>>=o,s-=o,yn=1<<32-Jt(e)+s|n<<s|r,vn=i+t}else yn=1<<i|n<<s|r,vn=t}function Kh(t){t.return!==null&&(Ir(t,1),ev(t,1,0))}function Gh(t){for(;t===Xa;)Xa=cs[--hs],cs[hs]=null,Za=cs[--hs],cs[hs]=null;for(;t===Lr;)Lr=Vt[--Lt],Vt[Lt]=null,vn=Vt[--Lt],Vt[Lt]=null,yn=Vt[--Lt],Vt[Lt]=null}var Pt=null,Rt=null,be=!1,Gt=null;function tv(t,e){var n=jt(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function Jp(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,Pt=t,Rt=nr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,Pt=t,Rt=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Lr!==null?{id:yn,overflow:vn}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=jt(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,Pt=t,Rt=null,!0):!1;default:return!1}}function Mc(t){return(t.mode&1)!==0&&(t.flags&128)===0}function jc(t){if(be){var e=Rt;if(e){var n=e;if(!Jp(t,e)){if(Mc(t))throw Error(F(418));e=nr(n.nextSibling);var r=Pt;e&&Jp(t,e)?tv(r,n):(t.flags=t.flags&-4097|2,be=!1,Pt=t)}}else{if(Mc(t))throw Error(F(418));t.flags=t.flags&-4097|2,be=!1,Pt=t}}}function Yp(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Pt=t}function la(t){if(t!==Pt)return!1;if(!be)return Yp(t),be=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Dc(t.type,t.memoizedProps)),e&&(e=Rt)){if(Mc(t))throw nv(),Error(F(418));for(;e;)tv(t,e),e=nr(e.nextSibling)}if(Yp(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(F(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){Rt=nr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}Rt=null}}else Rt=Pt?nr(t.stateNode.nextSibling):null;return!0}function nv(){for(var t=Rt;t;)t=nr(t.nextSibling)}function Ps(){Rt=Pt=null,be=!1}function Qh(t){Gt===null?Gt=[t]:Gt.push(t)}var zE=Vn.ReactCurrentBatchConfig;function yi(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(F(309));var r=n.stateNode}if(!r)throw Error(F(147,t));var s=r,i=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===i?e.ref:(e=function(o){var l=s.refs;o===null?delete l[i]:l[i]=o},e._stringRef=i,e)}if(typeof t!="string")throw Error(F(284));if(!n._owner)throw Error(F(290,t))}return t}function ua(t,e){throw t=Object.prototype.toString.call(e),Error(F(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Xp(t){var e=t._init;return e(t._payload)}function rv(t){function e(T,E){if(t){var I=T.deletions;I===null?(T.deletions=[E],T.flags|=16):I.push(E)}}function n(T,E){if(!t)return null;for(;E!==null;)e(T,E),E=E.sibling;return null}function r(T,E){for(T=new Map;E!==null;)E.key!==null?T.set(E.key,E):T.set(E.index,E),E=E.sibling;return T}function s(T,E){return T=or(T,E),T.index=0,T.sibling=null,T}function i(T,E,I){return T.index=I,t?(I=T.alternate,I!==null?(I=I.index,I<E?(T.flags|=2,E):I):(T.flags|=2,E)):(T.flags|=1048576,E)}function o(T){return t&&T.alternate===null&&(T.flags|=2),T}function l(T,E,I,D){return E===null||E.tag!==6?(E=Qu(I,T.mode,D),E.return=T,E):(E=s(E,I),E.return=T,E)}function u(T,E,I,D){var L=I.type;return L===ss?p(T,E,I.props.children,D,I.key):E!==null&&(E.elementType===L||typeof L=="object"&&L!==null&&L.$$typeof===$n&&Xp(L)===E.type)?(D=s(E,I.props),D.ref=yi(T,E,I),D.return=T,D):(D=Na(I.type,I.key,I.props,null,T.mode,D),D.ref=yi(T,E,I),D.return=T,D)}function h(T,E,I,D){return E===null||E.tag!==4||E.stateNode.containerInfo!==I.containerInfo||E.stateNode.implementation!==I.implementation?(E=Ju(I,T.mode,D),E.return=T,E):(E=s(E,I.children||[]),E.return=T,E)}function p(T,E,I,D,L){return E===null||E.tag!==7?(E=br(I,T.mode,D,L),E.return=T,E):(E=s(E,I),E.return=T,E)}function m(T,E,I){if(typeof E=="string"&&E!==""||typeof E=="number")return E=Qu(""+E,T.mode,I),E.return=T,E;if(typeof E=="object"&&E!==null){switch(E.$$typeof){case Xo:return I=Na(E.type,E.key,E.props,null,T.mode,I),I.ref=yi(T,null,E),I.return=T,I;case rs:return E=Ju(E,T.mode,I),E.return=T,E;case $n:var D=E._init;return m(T,D(E._payload),I)}if(Ti(E)||di(E))return E=br(E,T.mode,I,null),E.return=T,E;ua(T,E)}return null}function y(T,E,I,D){var L=E!==null?E.key:null;if(typeof I=="string"&&I!==""||typeof I=="number")return L!==null?null:l(T,E,""+I,D);if(typeof I=="object"&&I!==null){switch(I.$$typeof){case Xo:return I.key===L?u(T,E,I,D):null;case rs:return I.key===L?h(T,E,I,D):null;case $n:return L=I._init,y(T,E,L(I._payload),D)}if(Ti(I)||di(I))return L!==null?null:p(T,E,I,D,null);ua(T,I)}return null}function w(T,E,I,D,L){if(typeof D=="string"&&D!==""||typeof D=="number")return T=T.get(I)||null,l(E,T,""+D,L);if(typeof D=="object"&&D!==null){switch(D.$$typeof){case Xo:return T=T.get(D.key===null?I:D.key)||null,u(E,T,D,L);case rs:return T=T.get(D.key===null?I:D.key)||null,h(E,T,D,L);case $n:var N=D._init;return w(T,E,I,N(D._payload),L)}if(Ti(D)||di(D))return T=T.get(I)||null,p(E,T,D,L,null);ua(E,D)}return null}function A(T,E,I,D){for(var L=null,N=null,_=E,g=E=0,x=null;_!==null&&g<I.length;g++){_.index>g?(x=_,_=null):x=_.sibling;var k=y(T,_,I[g],D);if(k===null){_===null&&(_=x);break}t&&_&&k.alternate===null&&e(T,_),E=i(k,E,g),N===null?L=k:N.sibling=k,N=k,_=x}if(g===I.length)return n(T,_),be&&Ir(T,g),L;if(_===null){for(;g<I.length;g++)_=m(T,I[g],D),_!==null&&(E=i(_,E,g),N===null?L=_:N.sibling=_,N=_);return be&&Ir(T,g),L}for(_=r(T,_);g<I.length;g++)x=w(_,T,g,I[g],D),x!==null&&(t&&x.alternate!==null&&_.delete(x.key===null?g:x.key),E=i(x,E,g),N===null?L=x:N.sibling=x,N=x);return t&&_.forEach(function(C){return e(T,C)}),be&&Ir(T,g),L}function R(T,E,I,D){var L=di(I);if(typeof L!="function")throw Error(F(150));if(I=L.call(I),I==null)throw Error(F(151));for(var N=L=null,_=E,g=E=0,x=null,k=I.next();_!==null&&!k.done;g++,k=I.next()){_.index>g?(x=_,_=null):x=_.sibling;var C=y(T,_,k.value,D);if(C===null){_===null&&(_=x);break}t&&_&&C.alternate===null&&e(T,_),E=i(C,E,g),N===null?L=C:N.sibling=C,N=C,_=x}if(k.done)return n(T,_),be&&Ir(T,g),L;if(_===null){for(;!k.done;g++,k=I.next())k=m(T,k.value,D),k!==null&&(E=i(k,E,g),N===null?L=k:N.sibling=k,N=k);return be&&Ir(T,g),L}for(_=r(T,_);!k.done;g++,k=I.next())k=w(_,T,g,k.value,D),k!==null&&(t&&k.alternate!==null&&_.delete(k.key===null?g:k.key),E=i(k,E,g),N===null?L=k:N.sibling=k,N=k);return t&&_.forEach(function(P){return e(T,P)}),be&&Ir(T,g),L}function V(T,E,I,D){if(typeof I=="object"&&I!==null&&I.type===ss&&I.key===null&&(I=I.props.children),typeof I=="object"&&I!==null){switch(I.$$typeof){case Xo:e:{for(var L=I.key,N=E;N!==null;){if(N.key===L){if(L=I.type,L===ss){if(N.tag===7){n(T,N.sibling),E=s(N,I.props.children),E.return=T,T=E;break e}}else if(N.elementType===L||typeof L=="object"&&L!==null&&L.$$typeof===$n&&Xp(L)===N.type){n(T,N.sibling),E=s(N,I.props),E.ref=yi(T,N,I),E.return=T,T=E;break e}n(T,N);break}else e(T,N);N=N.sibling}I.type===ss?(E=br(I.props.children,T.mode,D,I.key),E.return=T,T=E):(D=Na(I.type,I.key,I.props,null,T.mode,D),D.ref=yi(T,E,I),D.return=T,T=D)}return o(T);case rs:e:{for(N=I.key;E!==null;){if(E.key===N)if(E.tag===4&&E.stateNode.containerInfo===I.containerInfo&&E.stateNode.implementation===I.implementation){n(T,E.sibling),E=s(E,I.children||[]),E.return=T,T=E;break e}else{n(T,E);break}else e(T,E);E=E.sibling}E=Ju(I,T.mode,D),E.return=T,T=E}return o(T);case $n:return N=I._init,V(T,E,N(I._payload),D)}if(Ti(I))return A(T,E,I,D);if(di(I))return R(T,E,I,D);ua(T,I)}return typeof I=="string"&&I!==""||typeof I=="number"?(I=""+I,E!==null&&E.tag===6?(n(T,E.sibling),E=s(E,I),E.return=T,T=E):(n(T,E),E=Qu(I,T.mode,D),E.return=T,T=E),o(T)):n(T,E)}return V}var Ns=rv(!0),sv=rv(!1),el=yr(null),tl=null,ds=null,Jh=null;function Yh(){Jh=ds=tl=null}function Xh(t){var e=el.current;Ne(el),t._currentValue=e}function Fc(t,e,n){for(;t!==null;){var r=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,r!==null&&(r.childLanes|=e)):r!==null&&(r.childLanes&e)!==e&&(r.childLanes|=e),t===n)break;t=t.return}}function ws(t,e){tl=t,Jh=ds=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(xt=!0),t.firstContext=null)}function zt(t){var e=t._currentValue;if(Jh!==t)if(t={context:t,memoizedValue:e,next:null},ds===null){if(tl===null)throw Error(F(308));ds=t,tl.dependencies={lanes:0,firstContext:t}}else ds=ds.next=t;return e}var Cr=null;function Zh(t){Cr===null?Cr=[t]:Cr.push(t)}function iv(t,e,n,r){var s=e.interleaved;return s===null?(n.next=n,Zh(e)):(n.next=s.next,s.next=n),e.interleaved=n,An(t,r)}function An(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var Bn=!1;function ed(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function ov(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Tn(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function rr(t,e,n){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,ye&2){var s=r.pending;return s===null?e.next=e:(e.next=s.next,s.next=e),r.pending=e,An(t,n)}return s=r.interleaved,s===null?(e.next=e,Zh(r)):(e.next=s.next,s.next=e),r.interleaved=e,An(t,n)}function Sa(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,Fh(t,n)}}function Zp(t,e){var n=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var s=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?s=i=o:i=i.next=o,n=n.next}while(n!==null);i===null?s=i=e:i=i.next=e}else s=i=e;n={baseState:r.baseState,firstBaseUpdate:s,lastBaseUpdate:i,shared:r.shared,effects:r.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function nl(t,e,n,r){var s=t.updateQueue;Bn=!1;var i=s.firstBaseUpdate,o=s.lastBaseUpdate,l=s.shared.pending;if(l!==null){s.shared.pending=null;var u=l,h=u.next;u.next=null,o===null?i=h:o.next=h,o=u;var p=t.alternate;p!==null&&(p=p.updateQueue,l=p.lastBaseUpdate,l!==o&&(l===null?p.firstBaseUpdate=h:l.next=h,p.lastBaseUpdate=u))}if(i!==null){var m=s.baseState;o=0,p=h=u=null,l=i;do{var y=l.lane,w=l.eventTime;if((r&y)===y){p!==null&&(p=p.next={eventTime:w,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var A=t,R=l;switch(y=e,w=n,R.tag){case 1:if(A=R.payload,typeof A=="function"){m=A.call(w,m,y);break e}m=A;break e;case 3:A.flags=A.flags&-65537|128;case 0:if(A=R.payload,y=typeof A=="function"?A.call(w,m,y):A,y==null)break e;m=Ve({},m,y);break e;case 2:Bn=!0}}l.callback!==null&&l.lane!==0&&(t.flags|=64,y=s.effects,y===null?s.effects=[l]:y.push(l))}else w={eventTime:w,lane:y,tag:l.tag,payload:l.payload,callback:l.callback,next:null},p===null?(h=p=w,u=m):p=p.next=w,o|=y;if(l=l.next,l===null){if(l=s.shared.pending,l===null)break;y=l,l=y.next,y.next=null,s.lastBaseUpdate=y,s.shared.pending=null}}while(!0);if(p===null&&(u=m),s.baseState=u,s.firstBaseUpdate=h,s.lastBaseUpdate=p,e=s.shared.interleaved,e!==null){s=e;do o|=s.lane,s=s.next;while(s!==e)}else i===null&&(s.shared.lanes=0);jr|=o,t.lanes=o,t.memoizedState=m}}function em(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var r=t[e],s=r.callback;if(s!==null){if(r.callback=null,r=n,typeof s!="function")throw Error(F(191,s));s.call(r)}}}var Eo={},sn=yr(Eo),eo=yr(Eo),to=yr(Eo);function Rr(t){if(t===Eo)throw Error(F(174));return t}function td(t,e){switch(ke(to,e),ke(eo,t),ke(sn,Eo),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:_c(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=_c(e,t)}Ne(sn),ke(sn,e)}function bs(){Ne(sn),Ne(eo),Ne(to)}function av(t){Rr(to.current);var e=Rr(sn.current),n=_c(e,t.type);e!==n&&(ke(eo,t),ke(sn,n))}function nd(t){eo.current===t&&(Ne(sn),Ne(eo))}var De=yr(0);function rl(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Bu=[];function rd(){for(var t=0;t<Bu.length;t++)Bu[t]._workInProgressVersionPrimary=null;Bu.length=0}var ka=Vn.ReactCurrentDispatcher,Wu=Vn.ReactCurrentBatchConfig,Mr=0,Oe=null,We=null,Qe=null,sl=!1,Oi=!1,no=0,$E=0;function lt(){throw Error(F(321))}function sd(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!Xt(t[n],e[n]))return!1;return!0}function id(t,e,n,r,s,i){if(Mr=i,Oe=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,ka.current=t===null||t.memoizedState===null?qE:KE,t=n(r,s),Oi){i=0;do{if(Oi=!1,no=0,25<=i)throw Error(F(301));i+=1,Qe=We=null,e.updateQueue=null,ka.current=GE,t=n(r,s)}while(Oi)}if(ka.current=il,e=We!==null&&We.next!==null,Mr=0,Qe=We=Oe=null,sl=!1,e)throw Error(F(300));return t}function od(){var t=no!==0;return no=0,t}function en(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Qe===null?Oe.memoizedState=Qe=t:Qe=Qe.next=t,Qe}function $t(){if(We===null){var t=Oe.alternate;t=t!==null?t.memoizedState:null}else t=We.next;var e=Qe===null?Oe.memoizedState:Qe.next;if(e!==null)Qe=e,We=t;else{if(t===null)throw Error(F(310));We=t,t={memoizedState:We.memoizedState,baseState:We.baseState,baseQueue:We.baseQueue,queue:We.queue,next:null},Qe===null?Oe.memoizedState=Qe=t:Qe=Qe.next=t}return Qe}function ro(t,e){return typeof e=="function"?e(t):e}function Hu(t){var e=$t(),n=e.queue;if(n===null)throw Error(F(311));n.lastRenderedReducer=t;var r=We,s=r.baseQueue,i=n.pending;if(i!==null){if(s!==null){var o=s.next;s.next=i.next,i.next=o}r.baseQueue=s=i,n.pending=null}if(s!==null){i=s.next,r=r.baseState;var l=o=null,u=null,h=i;do{var p=h.lane;if((Mr&p)===p)u!==null&&(u=u.next={lane:0,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null}),r=h.hasEagerState?h.eagerState:t(r,h.action);else{var m={lane:p,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null};u===null?(l=u=m,o=r):u=u.next=m,Oe.lanes|=p,jr|=p}h=h.next}while(h!==null&&h!==i);u===null?o=r:u.next=l,Xt(r,e.memoizedState)||(xt=!0),e.memoizedState=r,e.baseState=o,e.baseQueue=u,n.lastRenderedState=r}if(t=n.interleaved,t!==null){s=t;do i=s.lane,Oe.lanes|=i,jr|=i,s=s.next;while(s!==t)}else s===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function qu(t){var e=$t(),n=e.queue;if(n===null)throw Error(F(311));n.lastRenderedReducer=t;var r=n.dispatch,s=n.pending,i=e.memoizedState;if(s!==null){n.pending=null;var o=s=s.next;do i=t(i,o.action),o=o.next;while(o!==s);Xt(i,e.memoizedState)||(xt=!0),e.memoizedState=i,e.baseQueue===null&&(e.baseState=i),n.lastRenderedState=i}return[i,r]}function lv(){}function uv(t,e){var n=Oe,r=$t(),s=e(),i=!Xt(r.memoizedState,s);if(i&&(r.memoizedState=s,xt=!0),r=r.queue,ad(dv.bind(null,n,r,t),[t]),r.getSnapshot!==e||i||Qe!==null&&Qe.memoizedState.tag&1){if(n.flags|=2048,so(9,hv.bind(null,n,r,s,e),void 0,null),Je===null)throw Error(F(349));Mr&30||cv(n,e,s)}return s}function cv(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=Oe.updateQueue,e===null?(e={lastEffect:null,stores:null},Oe.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function hv(t,e,n,r){e.value=n,e.getSnapshot=r,fv(e)&&pv(t)}function dv(t,e,n){return n(function(){fv(e)&&pv(t)})}function fv(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Xt(t,n)}catch{return!0}}function pv(t){var e=An(t,1);e!==null&&Yt(e,t,1,-1)}function tm(t){var e=en();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ro,lastRenderedState:t},e.queue=t,t=t.dispatch=HE.bind(null,Oe,t),[e.memoizedState,t]}function so(t,e,n,r){return t={tag:t,create:e,destroy:n,deps:r,next:null},e=Oe.updateQueue,e===null?(e={lastEffect:null,stores:null},Oe.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(r=n.next,n.next=t,t.next=r,e.lastEffect=t)),t}function mv(){return $t().memoizedState}function Aa(t,e,n,r){var s=en();Oe.flags|=t,s.memoizedState=so(1|e,n,void 0,r===void 0?null:r)}function Ll(t,e,n,r){var s=$t();r=r===void 0?null:r;var i=void 0;if(We!==null){var o=We.memoizedState;if(i=o.destroy,r!==null&&sd(r,o.deps)){s.memoizedState=so(e,n,i,r);return}}Oe.flags|=t,s.memoizedState=so(1|e,n,i,r)}function nm(t,e){return Aa(8390656,8,t,e)}function ad(t,e){return Ll(2048,8,t,e)}function gv(t,e){return Ll(4,2,t,e)}function yv(t,e){return Ll(4,4,t,e)}function vv(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function _v(t,e,n){return n=n!=null?n.concat([t]):null,Ll(4,4,vv.bind(null,e,t),n)}function ld(){}function wv(t,e){var n=$t();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&sd(e,r[1])?r[0]:(n.memoizedState=[t,e],t)}function Ev(t,e){var n=$t();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&sd(e,r[1])?r[0]:(t=t(),n.memoizedState=[t,e],t)}function Tv(t,e,n){return Mr&21?(Xt(n,e)||(n=Ay(),Oe.lanes|=n,jr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,xt=!0),t.memoizedState=n)}function BE(t,e){var n=Te;Te=n!==0&&4>n?n:4,t(!0);var r=Wu.transition;Wu.transition={};try{t(!1),e()}finally{Te=n,Wu.transition=r}}function xv(){return $t().memoizedState}function WE(t,e,n){var r=ir(t);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Iv(t))Sv(e,n);else if(n=iv(t,e,n,r),n!==null){var s=_t();Yt(n,t,r,s),kv(n,e,r)}}function HE(t,e,n){var r=ir(t),s={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Iv(t))Sv(e,s);else{var i=t.alternate;if(t.lanes===0&&(i===null||i.lanes===0)&&(i=e.lastRenderedReducer,i!==null))try{var o=e.lastRenderedState,l=i(o,n);if(s.hasEagerState=!0,s.eagerState=l,Xt(l,o)){var u=e.interleaved;u===null?(s.next=s,Zh(e)):(s.next=u.next,u.next=s),e.interleaved=s;return}}catch{}finally{}n=iv(t,e,s,r),n!==null&&(s=_t(),Yt(n,t,r,s),kv(n,e,r))}}function Iv(t){var e=t.alternate;return t===Oe||e!==null&&e===Oe}function Sv(t,e){Oi=sl=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function kv(t,e,n){if(n&4194240){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,Fh(t,n)}}var il={readContext:zt,useCallback:lt,useContext:lt,useEffect:lt,useImperativeHandle:lt,useInsertionEffect:lt,useLayoutEffect:lt,useMemo:lt,useReducer:lt,useRef:lt,useState:lt,useDebugValue:lt,useDeferredValue:lt,useTransition:lt,useMutableSource:lt,useSyncExternalStore:lt,useId:lt,unstable_isNewReconciler:!1},qE={readContext:zt,useCallback:function(t,e){return en().memoizedState=[t,e===void 0?null:e],t},useContext:zt,useEffect:nm,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,Aa(4194308,4,vv.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Aa(4194308,4,t,e)},useInsertionEffect:function(t,e){return Aa(4,2,t,e)},useMemo:function(t,e){var n=en();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var r=en();return e=n!==void 0?n(e):e,r.memoizedState=r.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},r.queue=t,t=t.dispatch=WE.bind(null,Oe,t),[r.memoizedState,t]},useRef:function(t){var e=en();return t={current:t},e.memoizedState=t},useState:tm,useDebugValue:ld,useDeferredValue:function(t){return en().memoizedState=t},useTransition:function(){var t=tm(!1),e=t[0];return t=BE.bind(null,t[1]),en().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var r=Oe,s=en();if(be){if(n===void 0)throw Error(F(407));n=n()}else{if(n=e(),Je===null)throw Error(F(349));Mr&30||cv(r,e,n)}s.memoizedState=n;var i={value:n,getSnapshot:e};return s.queue=i,nm(dv.bind(null,r,i,t),[t]),r.flags|=2048,so(9,hv.bind(null,r,i,n,e),void 0,null),n},useId:function(){var t=en(),e=Je.identifierPrefix;if(be){var n=vn,r=yn;n=(r&~(1<<32-Jt(r)-1)).toString(32)+n,e=":"+e+"R"+n,n=no++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=$E++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},KE={readContext:zt,useCallback:wv,useContext:zt,useEffect:ad,useImperativeHandle:_v,useInsertionEffect:gv,useLayoutEffect:yv,useMemo:Ev,useReducer:Hu,useRef:mv,useState:function(){return Hu(ro)},useDebugValue:ld,useDeferredValue:function(t){var e=$t();return Tv(e,We.memoizedState,t)},useTransition:function(){var t=Hu(ro)[0],e=$t().memoizedState;return[t,e]},useMutableSource:lv,useSyncExternalStore:uv,useId:xv,unstable_isNewReconciler:!1},GE={readContext:zt,useCallback:wv,useContext:zt,useEffect:ad,useImperativeHandle:_v,useInsertionEffect:gv,useLayoutEffect:yv,useMemo:Ev,useReducer:qu,useRef:mv,useState:function(){return qu(ro)},useDebugValue:ld,useDeferredValue:function(t){var e=$t();return We===null?e.memoizedState=t:Tv(e,We.memoizedState,t)},useTransition:function(){var t=qu(ro)[0],e=$t().memoizedState;return[t,e]},useMutableSource:lv,useSyncExternalStore:uv,useId:xv,unstable_isNewReconciler:!1};function qt(t,e){if(t&&t.defaultProps){e=Ve({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Uc(t,e,n,r){e=t.memoizedState,n=n(r,e),n=n==null?e:Ve({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Ml={isMounted:function(t){return(t=t._reactInternals)?qr(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var r=_t(),s=ir(t),i=Tn(r,s);i.payload=e,n!=null&&(i.callback=n),e=rr(t,i,s),e!==null&&(Yt(e,t,s,r),Sa(e,t,s))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var r=_t(),s=ir(t),i=Tn(r,s);i.tag=1,i.payload=e,n!=null&&(i.callback=n),e=rr(t,i,s),e!==null&&(Yt(e,t,s,r),Sa(e,t,s))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=_t(),r=ir(t),s=Tn(n,r);s.tag=2,e!=null&&(s.callback=e),e=rr(t,s,r),e!==null&&(Yt(e,t,r,n),Sa(e,t,r))}};function rm(t,e,n,r,s,i,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,i,o):e.prototype&&e.prototype.isPureReactComponent?!Ji(n,r)||!Ji(s,i):!0}function Av(t,e,n){var r=!1,s=dr,i=e.contextType;return typeof i=="object"&&i!==null?i=zt(i):(s=St(e)?Vr:pt.current,r=e.contextTypes,i=(r=r!=null)?Rs(t,s):dr),e=new e(n,i),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Ml,t.stateNode=e,e._reactInternals=t,r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=s,t.__reactInternalMemoizedMaskedChildContext=i),e}function sm(t,e,n,r){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,r),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,r),e.state!==t&&Ml.enqueueReplaceState(e,e.state,null)}function zc(t,e,n,r){var s=t.stateNode;s.props=n,s.state=t.memoizedState,s.refs={},ed(t);var i=e.contextType;typeof i=="object"&&i!==null?s.context=zt(i):(i=St(e)?Vr:pt.current,s.context=Rs(t,i)),s.state=t.memoizedState,i=e.getDerivedStateFromProps,typeof i=="function"&&(Uc(t,e,i,n),s.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(e=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),e!==s.state&&Ml.enqueueReplaceState(s,s.state,null),nl(t,n,s,r),s.state=t.memoizedState),typeof s.componentDidMount=="function"&&(t.flags|=4194308)}function Ds(t,e){try{var n="",r=e;do n+=T1(r),r=r.return;while(r);var s=n}catch(i){s=`
Error generating stack: `+i.message+`
`+i.stack}return{value:t,source:e,stack:s,digest:null}}function Ku(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function $c(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var QE=typeof WeakMap=="function"?WeakMap:Map;function Cv(t,e,n){n=Tn(-1,n),n.tag=3,n.payload={element:null};var r=e.value;return n.callback=function(){al||(al=!0,Xc=r),$c(t,e)},n}function Rv(t,e,n){n=Tn(-1,n),n.tag=3;var r=t.type.getDerivedStateFromError;if(typeof r=="function"){var s=e.value;n.payload=function(){return r(s)},n.callback=function(){$c(t,e)}}var i=t.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){$c(t,e),typeof r!="function"&&(sr===null?sr=new Set([this]):sr.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function im(t,e,n){var r=t.pingCache;if(r===null){r=t.pingCache=new QE;var s=new Set;r.set(e,s)}else s=r.get(e),s===void 0&&(s=new Set,r.set(e,s));s.has(n)||(s.add(n),t=uT.bind(null,t,e,n),e.then(t,t))}function om(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function am(t,e,n,r,s){return t.mode&1?(t.flags|=65536,t.lanes=s,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Tn(-1,1),e.tag=2,rr(n,e,1))),n.lanes|=1),t)}var JE=Vn.ReactCurrentOwner,xt=!1;function vt(t,e,n,r){e.child=t===null?sv(e,null,n,r):Ns(e,t.child,n,r)}function lm(t,e,n,r,s){n=n.render;var i=e.ref;return ws(e,s),r=id(t,e,n,r,i,s),n=od(),t!==null&&!xt?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~s,Cn(t,e,s)):(be&&n&&Kh(e),e.flags|=1,vt(t,e,r,s),e.child)}function um(t,e,n,r,s){if(t===null){var i=n.type;return typeof i=="function"&&!gd(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=i,Pv(t,e,i,r,s)):(t=Na(n.type,null,r,e,e.mode,s),t.ref=e.ref,t.return=e,e.child=t)}if(i=t.child,!(t.lanes&s)){var o=i.memoizedProps;if(n=n.compare,n=n!==null?n:Ji,n(o,r)&&t.ref===e.ref)return Cn(t,e,s)}return e.flags|=1,t=or(i,r),t.ref=e.ref,t.return=e,e.child=t}function Pv(t,e,n,r,s){if(t!==null){var i=t.memoizedProps;if(Ji(i,r)&&t.ref===e.ref)if(xt=!1,e.pendingProps=r=i,(t.lanes&s)!==0)t.flags&131072&&(xt=!0);else return e.lanes=t.lanes,Cn(t,e,s)}return Bc(t,e,n,r,s)}function Nv(t,e,n){var r=e.pendingProps,s=r.children,i=t!==null?t.memoizedState:null;if(r.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},ke(ps,Ct),Ct|=n;else{if(!(n&1073741824))return t=i!==null?i.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,ke(ps,Ct),Ct|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,ke(ps,Ct),Ct|=r}else i!==null?(r=i.baseLanes|n,e.memoizedState=null):r=n,ke(ps,Ct),Ct|=r;return vt(t,e,s,n),e.child}function bv(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function Bc(t,e,n,r,s){var i=St(n)?Vr:pt.current;return i=Rs(e,i),ws(e,s),n=id(t,e,n,r,i,s),r=od(),t!==null&&!xt?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~s,Cn(t,e,s)):(be&&r&&Kh(e),e.flags|=1,vt(t,e,n,s),e.child)}function cm(t,e,n,r,s){if(St(n)){var i=!0;Ya(e)}else i=!1;if(ws(e,s),e.stateNode===null)Ca(t,e),Av(e,n,r),zc(e,n,r,s),r=!0;else if(t===null){var o=e.stateNode,l=e.memoizedProps;o.props=l;var u=o.context,h=n.contextType;typeof h=="object"&&h!==null?h=zt(h):(h=St(n)?Vr:pt.current,h=Rs(e,h));var p=n.getDerivedStateFromProps,m=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function";m||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==r||u!==h)&&sm(e,o,r,h),Bn=!1;var y=e.memoizedState;o.state=y,nl(e,r,o,s),u=e.memoizedState,l!==r||y!==u||It.current||Bn?(typeof p=="function"&&(Uc(e,n,p,r),u=e.memoizedState),(l=Bn||rm(e,n,l,r,y,u,h))?(m||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=u),o.props=r,o.state=u,o.context=h,r=l):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),r=!1)}else{o=e.stateNode,ov(t,e),l=e.memoizedProps,h=e.type===e.elementType?l:qt(e.type,l),o.props=h,m=e.pendingProps,y=o.context,u=n.contextType,typeof u=="object"&&u!==null?u=zt(u):(u=St(n)?Vr:pt.current,u=Rs(e,u));var w=n.getDerivedStateFromProps;(p=typeof w=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==m||y!==u)&&sm(e,o,r,u),Bn=!1,y=e.memoizedState,o.state=y,nl(e,r,o,s);var A=e.memoizedState;l!==m||y!==A||It.current||Bn?(typeof w=="function"&&(Uc(e,n,w,r),A=e.memoizedState),(h=Bn||rm(e,n,h,r,y,A,u)||!1)?(p||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,A,u),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,A,u)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&y===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&y===t.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=A),o.props=r,o.state=A,o.context=u,r=h):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&y===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&y===t.memoizedState||(e.flags|=1024),r=!1)}return Wc(t,e,n,r,i,s)}function Wc(t,e,n,r,s,i){bv(t,e);var o=(e.flags&128)!==0;if(!r&&!o)return s&&Qp(e,n,!1),Cn(t,e,i);r=e.stateNode,JE.current=e;var l=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return e.flags|=1,t!==null&&o?(e.child=Ns(e,t.child,null,i),e.child=Ns(e,null,l,i)):vt(t,e,l,i),e.memoizedState=r.state,s&&Qp(e,n,!0),e.child}function Dv(t){var e=t.stateNode;e.pendingContext?Gp(t,e.pendingContext,e.pendingContext!==e.context):e.context&&Gp(t,e.context,!1),td(t,e.containerInfo)}function hm(t,e,n,r,s){return Ps(),Qh(s),e.flags|=256,vt(t,e,n,r),e.child}var Hc={dehydrated:null,treeContext:null,retryLane:0};function qc(t){return{baseLanes:t,cachePool:null,transitions:null}}function Ov(t,e,n){var r=e.pendingProps,s=De.current,i=!1,o=(e.flags&128)!==0,l;if((l=o)||(l=t!==null&&t.memoizedState===null?!1:(s&2)!==0),l?(i=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(s|=1),ke(De,s&1),t===null)return jc(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=r.children,t=r.fallback,i?(r=e.mode,i=e.child,o={mode:"hidden",children:o},!(r&1)&&i!==null?(i.childLanes=0,i.pendingProps=o):i=Ul(o,r,0,null),t=br(t,r,n,null),i.return=e,t.return=e,i.sibling=t,e.child=i,e.child.memoizedState=qc(n),e.memoizedState=Hc,t):ud(e,o));if(s=t.memoizedState,s!==null&&(l=s.dehydrated,l!==null))return YE(t,e,o,r,l,s,n);if(i){i=r.fallback,o=e.mode,s=t.child,l=s.sibling;var u={mode:"hidden",children:r.children};return!(o&1)&&e.child!==s?(r=e.child,r.childLanes=0,r.pendingProps=u,e.deletions=null):(r=or(s,u),r.subtreeFlags=s.subtreeFlags&14680064),l!==null?i=or(l,i):(i=br(i,o,n,null),i.flags|=2),i.return=e,r.return=e,r.sibling=i,e.child=r,r=i,i=e.child,o=t.child.memoizedState,o=o===null?qc(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},i.memoizedState=o,i.childLanes=t.childLanes&~n,e.memoizedState=Hc,r}return i=t.child,t=i.sibling,r=or(i,{mode:"visible",children:r.children}),!(e.mode&1)&&(r.lanes=n),r.return=e,r.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=r,e.memoizedState=null,r}function ud(t,e){return e=Ul({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function ca(t,e,n,r){return r!==null&&Qh(r),Ns(e,t.child,null,n),t=ud(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function YE(t,e,n,r,s,i,o){if(n)return e.flags&256?(e.flags&=-257,r=Ku(Error(F(422))),ca(t,e,o,r)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(i=r.fallback,s=e.mode,r=Ul({mode:"visible",children:r.children},s,0,null),i=br(i,s,o,null),i.flags|=2,r.return=e,i.return=e,r.sibling=i,e.child=r,e.mode&1&&Ns(e,t.child,null,o),e.child.memoizedState=qc(o),e.memoizedState=Hc,i);if(!(e.mode&1))return ca(t,e,o,null);if(s.data==="$!"){if(r=s.nextSibling&&s.nextSibling.dataset,r)var l=r.dgst;return r=l,i=Error(F(419)),r=Ku(i,r,void 0),ca(t,e,o,r)}if(l=(o&t.childLanes)!==0,xt||l){if(r=Je,r!==null){switch(o&-o){case 4:s=2;break;case 16:s=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:s=32;break;case 536870912:s=268435456;break;default:s=0}s=s&(r.suspendedLanes|o)?0:s,s!==0&&s!==i.retryLane&&(i.retryLane=s,An(t,s),Yt(r,t,s,-1))}return md(),r=Ku(Error(F(421))),ca(t,e,o,r)}return s.data==="$?"?(e.flags|=128,e.child=t.child,e=cT.bind(null,t),s._reactRetry=e,null):(t=i.treeContext,Rt=nr(s.nextSibling),Pt=e,be=!0,Gt=null,t!==null&&(Vt[Lt++]=yn,Vt[Lt++]=vn,Vt[Lt++]=Lr,yn=t.id,vn=t.overflow,Lr=e),e=ud(e,r.children),e.flags|=4096,e)}function dm(t,e,n){t.lanes|=e;var r=t.alternate;r!==null&&(r.lanes|=e),Fc(t.return,e,n)}function Gu(t,e,n,r,s){var i=t.memoizedState;i===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:s}:(i.isBackwards=e,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=s)}function Vv(t,e,n){var r=e.pendingProps,s=r.revealOrder,i=r.tail;if(vt(t,e,r.children,n),r=De.current,r&2)r=r&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&dm(t,n,e);else if(t.tag===19)dm(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}r&=1}if(ke(De,r),!(e.mode&1))e.memoizedState=null;else switch(s){case"forwards":for(n=e.child,s=null;n!==null;)t=n.alternate,t!==null&&rl(t)===null&&(s=n),n=n.sibling;n=s,n===null?(s=e.child,e.child=null):(s=n.sibling,n.sibling=null),Gu(e,!1,s,n,i);break;case"backwards":for(n=null,s=e.child,e.child=null;s!==null;){if(t=s.alternate,t!==null&&rl(t)===null){e.child=s;break}t=s.sibling,s.sibling=n,n=s,s=t}Gu(e,!0,n,null,i);break;case"together":Gu(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Ca(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Cn(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),jr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(F(153));if(e.child!==null){for(t=e.child,n=or(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=or(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function XE(t,e,n){switch(e.tag){case 3:Dv(e),Ps();break;case 5:av(e);break;case 1:St(e.type)&&Ya(e);break;case 4:td(e,e.stateNode.containerInfo);break;case 10:var r=e.type._context,s=e.memoizedProps.value;ke(el,r._currentValue),r._currentValue=s;break;case 13:if(r=e.memoizedState,r!==null)return r.dehydrated!==null?(ke(De,De.current&1),e.flags|=128,null):n&e.child.childLanes?Ov(t,e,n):(ke(De,De.current&1),t=Cn(t,e,n),t!==null?t.sibling:null);ke(De,De.current&1);break;case 19:if(r=(n&e.childLanes)!==0,t.flags&128){if(r)return Vv(t,e,n);e.flags|=128}if(s=e.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),ke(De,De.current),r)break;return null;case 22:case 23:return e.lanes=0,Nv(t,e,n)}return Cn(t,e,n)}var Lv,Kc,Mv,jv;Lv=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Kc=function(){};Mv=function(t,e,n,r){var s=t.memoizedProps;if(s!==r){t=e.stateNode,Rr(sn.current);var i=null;switch(n){case"input":s=mc(t,s),r=mc(t,r),i=[];break;case"select":s=Ve({},s,{value:void 0}),r=Ve({},r,{value:void 0}),i=[];break;case"textarea":s=vc(t,s),r=vc(t,r),i=[];break;default:typeof s.onClick!="function"&&typeof r.onClick=="function"&&(t.onclick=Qa)}wc(n,r);var o;n=null;for(h in s)if(!r.hasOwnProperty(h)&&s.hasOwnProperty(h)&&s[h]!=null)if(h==="style"){var l=s[h];for(o in l)l.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else h!=="dangerouslySetInnerHTML"&&h!=="children"&&h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&h!=="autoFocus"&&(Bi.hasOwnProperty(h)?i||(i=[]):(i=i||[]).push(h,null));for(h in r){var u=r[h];if(l=s!=null?s[h]:void 0,r.hasOwnProperty(h)&&u!==l&&(u!=null||l!=null))if(h==="style")if(l){for(o in l)!l.hasOwnProperty(o)||u&&u.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in u)u.hasOwnProperty(o)&&l[o]!==u[o]&&(n||(n={}),n[o]=u[o])}else n||(i||(i=[]),i.push(h,n)),n=u;else h==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,l=l?l.__html:void 0,u!=null&&l!==u&&(i=i||[]).push(h,u)):h==="children"?typeof u!="string"&&typeof u!="number"||(i=i||[]).push(h,""+u):h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&(Bi.hasOwnProperty(h)?(u!=null&&h==="onScroll"&&Pe("scroll",t),i||l===u||(i=[])):(i=i||[]).push(h,u))}n&&(i=i||[]).push("style",n);var h=i;(e.updateQueue=h)&&(e.flags|=4)}};jv=function(t,e,n,r){n!==r&&(e.flags|=4)};function vi(t,e){if(!be)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null}}function ut(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,r=0;if(e)for(var s=t.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags&14680064,r|=s.flags&14680064,s.return=t,s=s.sibling;else for(s=t.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags,r|=s.flags,s.return=t,s=s.sibling;return t.subtreeFlags|=r,t.childLanes=n,e}function ZE(t,e,n){var r=e.pendingProps;switch(Gh(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ut(e),null;case 1:return St(e.type)&&Ja(),ut(e),null;case 3:return r=e.stateNode,bs(),Ne(It),Ne(pt),rd(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(t===null||t.child===null)&&(la(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Gt!==null&&(th(Gt),Gt=null))),Kc(t,e),ut(e),null;case 5:nd(e);var s=Rr(to.current);if(n=e.type,t!==null&&e.stateNode!=null)Mv(t,e,n,r,s),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!r){if(e.stateNode===null)throw Error(F(166));return ut(e),null}if(t=Rr(sn.current),la(e)){r=e.stateNode,n=e.type;var i=e.memoizedProps;switch(r[tn]=e,r[Zi]=i,t=(e.mode&1)!==0,n){case"dialog":Pe("cancel",r),Pe("close",r);break;case"iframe":case"object":case"embed":Pe("load",r);break;case"video":case"audio":for(s=0;s<Ii.length;s++)Pe(Ii[s],r);break;case"source":Pe("error",r);break;case"img":case"image":case"link":Pe("error",r),Pe("load",r);break;case"details":Pe("toggle",r);break;case"input":Ep(r,i),Pe("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},Pe("invalid",r);break;case"textarea":xp(r,i),Pe("invalid",r)}wc(n,i),s=null;for(var o in i)if(i.hasOwnProperty(o)){var l=i[o];o==="children"?typeof l=="string"?r.textContent!==l&&(i.suppressHydrationWarning!==!0&&aa(r.textContent,l,t),s=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(i.suppressHydrationWarning!==!0&&aa(r.textContent,l,t),s=["children",""+l]):Bi.hasOwnProperty(o)&&l!=null&&o==="onScroll"&&Pe("scroll",r)}switch(n){case"input":Zo(r),Tp(r,i,!0);break;case"textarea":Zo(r),Ip(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=Qa)}r=s,e.updateQueue=r,r!==null&&(e.flags|=4)}else{o=s.nodeType===9?s:s.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=dy(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof r.is=="string"?t=o.createElement(n,{is:r.is}):(t=o.createElement(n),n==="select"&&(o=t,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):t=o.createElementNS(t,n),t[tn]=e,t[Zi]=r,Lv(t,e,!1,!1),e.stateNode=t;e:{switch(o=Ec(n,r),n){case"dialog":Pe("cancel",t),Pe("close",t),s=r;break;case"iframe":case"object":case"embed":Pe("load",t),s=r;break;case"video":case"audio":for(s=0;s<Ii.length;s++)Pe(Ii[s],t);s=r;break;case"source":Pe("error",t),s=r;break;case"img":case"image":case"link":Pe("error",t),Pe("load",t),s=r;break;case"details":Pe("toggle",t),s=r;break;case"input":Ep(t,r),s=mc(t,r),Pe("invalid",t);break;case"option":s=r;break;case"select":t._wrapperState={wasMultiple:!!r.multiple},s=Ve({},r,{value:void 0}),Pe("invalid",t);break;case"textarea":xp(t,r),s=vc(t,r),Pe("invalid",t);break;default:s=r}wc(n,s),l=s;for(i in l)if(l.hasOwnProperty(i)){var u=l[i];i==="style"?my(t,u):i==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&fy(t,u)):i==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&Wi(t,u):typeof u=="number"&&Wi(t,""+u):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(Bi.hasOwnProperty(i)?u!=null&&i==="onScroll"&&Pe("scroll",t):u!=null&&Dh(t,i,u,o))}switch(n){case"input":Zo(t),Tp(t,r,!1);break;case"textarea":Zo(t),Ip(t);break;case"option":r.value!=null&&t.setAttribute("value",""+hr(r.value));break;case"select":t.multiple=!!r.multiple,i=r.value,i!=null?gs(t,!!r.multiple,i,!1):r.defaultValue!=null&&gs(t,!!r.multiple,r.defaultValue,!0);break;default:typeof s.onClick=="function"&&(t.onclick=Qa)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return ut(e),null;case 6:if(t&&e.stateNode!=null)jv(t,e,t.memoizedProps,r);else{if(typeof r!="string"&&e.stateNode===null)throw Error(F(166));if(n=Rr(to.current),Rr(sn.current),la(e)){if(r=e.stateNode,n=e.memoizedProps,r[tn]=e,(i=r.nodeValue!==n)&&(t=Pt,t!==null))switch(t.tag){case 3:aa(r.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&aa(r.nodeValue,n,(t.mode&1)!==0)}i&&(e.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[tn]=e,e.stateNode=r}return ut(e),null;case 13:if(Ne(De),r=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(be&&Rt!==null&&e.mode&1&&!(e.flags&128))nv(),Ps(),e.flags|=98560,i=!1;else if(i=la(e),r!==null&&r.dehydrated!==null){if(t===null){if(!i)throw Error(F(318));if(i=e.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(F(317));i[tn]=e}else Ps(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;ut(e),i=!1}else Gt!==null&&(th(Gt),Gt=null),i=!0;if(!i)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(r=r!==null,r!==(t!==null&&t.memoizedState!==null)&&r&&(e.child.flags|=8192,e.mode&1&&(t===null||De.current&1?qe===0&&(qe=3):md())),e.updateQueue!==null&&(e.flags|=4),ut(e),null);case 4:return bs(),Kc(t,e),t===null&&Yi(e.stateNode.containerInfo),ut(e),null;case 10:return Xh(e.type._context),ut(e),null;case 17:return St(e.type)&&Ja(),ut(e),null;case 19:if(Ne(De),i=e.memoizedState,i===null)return ut(e),null;if(r=(e.flags&128)!==0,o=i.rendering,o===null)if(r)vi(i,!1);else{if(qe!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=rl(t),o!==null){for(e.flags|=128,vi(i,!1),r=o.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),e.subtreeFlags=0,r=n,n=e.child;n!==null;)i=n,t=r,i.flags&=14680066,o=i.alternate,o===null?(i.childLanes=0,i.lanes=t,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=o.childLanes,i.lanes=o.lanes,i.child=o.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=o.memoizedProps,i.memoizedState=o.memoizedState,i.updateQueue=o.updateQueue,i.type=o.type,t=o.dependencies,i.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return ke(De,De.current&1|2),e.child}t=t.sibling}i.tail!==null&&ze()>Os&&(e.flags|=128,r=!0,vi(i,!1),e.lanes=4194304)}else{if(!r)if(t=rl(o),t!==null){if(e.flags|=128,r=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),vi(i,!0),i.tail===null&&i.tailMode==="hidden"&&!o.alternate&&!be)return ut(e),null}else 2*ze()-i.renderingStartTime>Os&&n!==1073741824&&(e.flags|=128,r=!0,vi(i,!1),e.lanes=4194304);i.isBackwards?(o.sibling=e.child,e.child=o):(n=i.last,n!==null?n.sibling=o:e.child=o,i.last=o)}return i.tail!==null?(e=i.tail,i.rendering=e,i.tail=e.sibling,i.renderingStartTime=ze(),e.sibling=null,n=De.current,ke(De,r?n&1|2:n&1),e):(ut(e),null);case 22:case 23:return pd(),r=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==r&&(e.flags|=8192),r&&e.mode&1?Ct&1073741824&&(ut(e),e.subtreeFlags&6&&(e.flags|=8192)):ut(e),null;case 24:return null;case 25:return null}throw Error(F(156,e.tag))}function eT(t,e){switch(Gh(e),e.tag){case 1:return St(e.type)&&Ja(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return bs(),Ne(It),Ne(pt),rd(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return nd(e),null;case 13:if(Ne(De),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(F(340));Ps()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return Ne(De),null;case 4:return bs(),null;case 10:return Xh(e.type._context),null;case 22:case 23:return pd(),null;case 24:return null;default:return null}}var ha=!1,dt=!1,tT=typeof WeakSet=="function"?WeakSet:Set,H=null;function fs(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){je(t,e,r)}else n.current=null}function Gc(t,e,n){try{n()}catch(r){je(t,e,r)}}var fm=!1;function nT(t,e){if(Nc=qa,t=By(),qh(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var s=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var o=0,l=-1,u=-1,h=0,p=0,m=t,y=null;t:for(;;){for(var w;m!==n||s!==0&&m.nodeType!==3||(l=o+s),m!==i||r!==0&&m.nodeType!==3||(u=o+r),m.nodeType===3&&(o+=m.nodeValue.length),(w=m.firstChild)!==null;)y=m,m=w;for(;;){if(m===t)break t;if(y===n&&++h===s&&(l=o),y===i&&++p===r&&(u=o),(w=m.nextSibling)!==null)break;m=y,y=m.parentNode}m=w}n=l===-1||u===-1?null:{start:l,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(bc={focusedElem:t,selectionRange:n},qa=!1,H=e;H!==null;)if(e=H,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,H=t;else for(;H!==null;){e=H;try{var A=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(A!==null){var R=A.memoizedProps,V=A.memoizedState,T=e.stateNode,E=T.getSnapshotBeforeUpdate(e.elementType===e.type?R:qt(e.type,R),V);T.__reactInternalSnapshotBeforeUpdate=E}break;case 3:var I=e.stateNode.containerInfo;I.nodeType===1?I.textContent="":I.nodeType===9&&I.documentElement&&I.removeChild(I.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(F(163))}}catch(D){je(e,e.return,D)}if(t=e.sibling,t!==null){t.return=e.return,H=t;break}H=e.return}return A=fm,fm=!1,A}function Vi(t,e,n){var r=e.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var s=r=r.next;do{if((s.tag&t)===t){var i=s.destroy;s.destroy=void 0,i!==void 0&&Gc(e,n,i)}s=s.next}while(s!==r)}}function jl(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var r=n.create;n.destroy=r()}n=n.next}while(n!==e)}}function Qc(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function Fv(t){var e=t.alternate;e!==null&&(t.alternate=null,Fv(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[tn],delete e[Zi],delete e[Vc],delete e[jE],delete e[FE])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function Uv(t){return t.tag===5||t.tag===3||t.tag===4}function pm(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||Uv(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Jc(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Qa));else if(r!==4&&(t=t.child,t!==null))for(Jc(t,e,n),t=t.sibling;t!==null;)Jc(t,e,n),t=t.sibling}function Yc(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(r!==4&&(t=t.child,t!==null))for(Yc(t,e,n),t=t.sibling;t!==null;)Yc(t,e,n),t=t.sibling}var Xe=null,Kt=!1;function Un(t,e,n){for(n=n.child;n!==null;)zv(t,e,n),n=n.sibling}function zv(t,e,n){if(rn&&typeof rn.onCommitFiberUnmount=="function")try{rn.onCommitFiberUnmount(Pl,n)}catch{}switch(n.tag){case 5:dt||fs(n,e);case 6:var r=Xe,s=Kt;Xe=null,Un(t,e,n),Xe=r,Kt=s,Xe!==null&&(Kt?(t=Xe,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Xe.removeChild(n.stateNode));break;case 18:Xe!==null&&(Kt?(t=Xe,n=n.stateNode,t.nodeType===8?zu(t.parentNode,n):t.nodeType===1&&zu(t,n),Gi(t)):zu(Xe,n.stateNode));break;case 4:r=Xe,s=Kt,Xe=n.stateNode.containerInfo,Kt=!0,Un(t,e,n),Xe=r,Kt=s;break;case 0:case 11:case 14:case 15:if(!dt&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){s=r=r.next;do{var i=s,o=i.destroy;i=i.tag,o!==void 0&&(i&2||i&4)&&Gc(n,e,o),s=s.next}while(s!==r)}Un(t,e,n);break;case 1:if(!dt&&(fs(n,e),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){je(n,e,l)}Un(t,e,n);break;case 21:Un(t,e,n);break;case 22:n.mode&1?(dt=(r=dt)||n.memoizedState!==null,Un(t,e,n),dt=r):Un(t,e,n);break;default:Un(t,e,n)}}function mm(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new tT),e.forEach(function(r){var s=hT.bind(null,t,r);n.has(r)||(n.add(r),r.then(s,s))})}}function Ht(t,e){var n=e.deletions;if(n!==null)for(var r=0;r<n.length;r++){var s=n[r];try{var i=t,o=e,l=o;e:for(;l!==null;){switch(l.tag){case 5:Xe=l.stateNode,Kt=!1;break e;case 3:Xe=l.stateNode.containerInfo,Kt=!0;break e;case 4:Xe=l.stateNode.containerInfo,Kt=!0;break e}l=l.return}if(Xe===null)throw Error(F(160));zv(i,o,s),Xe=null,Kt=!1;var u=s.alternate;u!==null&&(u.return=null),s.return=null}catch(h){je(s,e,h)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)$v(e,t),e=e.sibling}function $v(t,e){var n=t.alternate,r=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Ht(e,t),Zt(t),r&4){try{Vi(3,t,t.return),jl(3,t)}catch(R){je(t,t.return,R)}try{Vi(5,t,t.return)}catch(R){je(t,t.return,R)}}break;case 1:Ht(e,t),Zt(t),r&512&&n!==null&&fs(n,n.return);break;case 5:if(Ht(e,t),Zt(t),r&512&&n!==null&&fs(n,n.return),t.flags&32){var s=t.stateNode;try{Wi(s,"")}catch(R){je(t,t.return,R)}}if(r&4&&(s=t.stateNode,s!=null)){var i=t.memoizedProps,o=n!==null?n.memoizedProps:i,l=t.type,u=t.updateQueue;if(t.updateQueue=null,u!==null)try{l==="input"&&i.type==="radio"&&i.name!=null&&cy(s,i),Ec(l,o);var h=Ec(l,i);for(o=0;o<u.length;o+=2){var p=u[o],m=u[o+1];p==="style"?my(s,m):p==="dangerouslySetInnerHTML"?fy(s,m):p==="children"?Wi(s,m):Dh(s,p,m,h)}switch(l){case"input":gc(s,i);break;case"textarea":hy(s,i);break;case"select":var y=s._wrapperState.wasMultiple;s._wrapperState.wasMultiple=!!i.multiple;var w=i.value;w!=null?gs(s,!!i.multiple,w,!1):y!==!!i.multiple&&(i.defaultValue!=null?gs(s,!!i.multiple,i.defaultValue,!0):gs(s,!!i.multiple,i.multiple?[]:"",!1))}s[Zi]=i}catch(R){je(t,t.return,R)}}break;case 6:if(Ht(e,t),Zt(t),r&4){if(t.stateNode===null)throw Error(F(162));s=t.stateNode,i=t.memoizedProps;try{s.nodeValue=i}catch(R){je(t,t.return,R)}}break;case 3:if(Ht(e,t),Zt(t),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Gi(e.containerInfo)}catch(R){je(t,t.return,R)}break;case 4:Ht(e,t),Zt(t);break;case 13:Ht(e,t),Zt(t),s=t.child,s.flags&8192&&(i=s.memoizedState!==null,s.stateNode.isHidden=i,!i||s.alternate!==null&&s.alternate.memoizedState!==null||(dd=ze())),r&4&&mm(t);break;case 22:if(p=n!==null&&n.memoizedState!==null,t.mode&1?(dt=(h=dt)||p,Ht(e,t),dt=h):Ht(e,t),Zt(t),r&8192){if(h=t.memoizedState!==null,(t.stateNode.isHidden=h)&&!p&&t.mode&1)for(H=t,p=t.child;p!==null;){for(m=H=p;H!==null;){switch(y=H,w=y.child,y.tag){case 0:case 11:case 14:case 15:Vi(4,y,y.return);break;case 1:fs(y,y.return);var A=y.stateNode;if(typeof A.componentWillUnmount=="function"){r=y,n=y.return;try{e=r,A.props=e.memoizedProps,A.state=e.memoizedState,A.componentWillUnmount()}catch(R){je(r,n,R)}}break;case 5:fs(y,y.return);break;case 22:if(y.memoizedState!==null){ym(m);continue}}w!==null?(w.return=y,H=w):ym(m)}p=p.sibling}e:for(p=null,m=t;;){if(m.tag===5){if(p===null){p=m;try{s=m.stateNode,h?(i=s.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(l=m.stateNode,u=m.memoizedProps.style,o=u!=null&&u.hasOwnProperty("display")?u.display:null,l.style.display=py("display",o))}catch(R){je(t,t.return,R)}}}else if(m.tag===6){if(p===null)try{m.stateNode.nodeValue=h?"":m.memoizedProps}catch(R){je(t,t.return,R)}}else if((m.tag!==22&&m.tag!==23||m.memoizedState===null||m===t)&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===t)break e;for(;m.sibling===null;){if(m.return===null||m.return===t)break e;p===m&&(p=null),m=m.return}p===m&&(p=null),m.sibling.return=m.return,m=m.sibling}}break;case 19:Ht(e,t),Zt(t),r&4&&mm(t);break;case 21:break;default:Ht(e,t),Zt(t)}}function Zt(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(Uv(n)){var r=n;break e}n=n.return}throw Error(F(160))}switch(r.tag){case 5:var s=r.stateNode;r.flags&32&&(Wi(s,""),r.flags&=-33);var i=pm(t);Yc(t,i,s);break;case 3:case 4:var o=r.stateNode.containerInfo,l=pm(t);Jc(t,l,o);break;default:throw Error(F(161))}}catch(u){je(t,t.return,u)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function rT(t,e,n){H=t,Bv(t)}function Bv(t,e,n){for(var r=(t.mode&1)!==0;H!==null;){var s=H,i=s.child;if(s.tag===22&&r){var o=s.memoizedState!==null||ha;if(!o){var l=s.alternate,u=l!==null&&l.memoizedState!==null||dt;l=ha;var h=dt;if(ha=o,(dt=u)&&!h)for(H=s;H!==null;)o=H,u=o.child,o.tag===22&&o.memoizedState!==null?vm(s):u!==null?(u.return=o,H=u):vm(s);for(;i!==null;)H=i,Bv(i),i=i.sibling;H=s,ha=l,dt=h}gm(t)}else s.subtreeFlags&8772&&i!==null?(i.return=s,H=i):gm(t)}}function gm(t){for(;H!==null;){var e=H;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:dt||jl(5,e);break;case 1:var r=e.stateNode;if(e.flags&4&&!dt)if(n===null)r.componentDidMount();else{var s=e.elementType===e.type?n.memoizedProps:qt(e.type,n.memoizedProps);r.componentDidUpdate(s,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=e.updateQueue;i!==null&&em(e,i,r);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}em(e,o,n)}break;case 5:var l=e.stateNode;if(n===null&&e.flags&4){n=l;var u=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var h=e.alternate;if(h!==null){var p=h.memoizedState;if(p!==null){var m=p.dehydrated;m!==null&&Gi(m)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(F(163))}dt||e.flags&512&&Qc(e)}catch(y){je(e,e.return,y)}}if(e===t){H=null;break}if(n=e.sibling,n!==null){n.return=e.return,H=n;break}H=e.return}}function ym(t){for(;H!==null;){var e=H;if(e===t){H=null;break}var n=e.sibling;if(n!==null){n.return=e.return,H=n;break}H=e.return}}function vm(t){for(;H!==null;){var e=H;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{jl(4,e)}catch(u){je(e,n,u)}break;case 1:var r=e.stateNode;if(typeof r.componentDidMount=="function"){var s=e.return;try{r.componentDidMount()}catch(u){je(e,s,u)}}var i=e.return;try{Qc(e)}catch(u){je(e,i,u)}break;case 5:var o=e.return;try{Qc(e)}catch(u){je(e,o,u)}}}catch(u){je(e,e.return,u)}if(e===t){H=null;break}var l=e.sibling;if(l!==null){l.return=e.return,H=l;break}H=e.return}}var sT=Math.ceil,ol=Vn.ReactCurrentDispatcher,cd=Vn.ReactCurrentOwner,Ft=Vn.ReactCurrentBatchConfig,ye=0,Je=null,Be=null,tt=0,Ct=0,ps=yr(0),qe=0,io=null,jr=0,Fl=0,hd=0,Li=null,Tt=null,dd=0,Os=1/0,mn=null,al=!1,Xc=null,sr=null,da=!1,Yn=null,ll=0,Mi=0,Zc=null,Ra=-1,Pa=0;function _t(){return ye&6?ze():Ra!==-1?Ra:Ra=ze()}function ir(t){return t.mode&1?ye&2&&tt!==0?tt&-tt:zE.transition!==null?(Pa===0&&(Pa=Ay()),Pa):(t=Te,t!==0||(t=window.event,t=t===void 0?16:Oy(t.type)),t):1}function Yt(t,e,n,r){if(50<Mi)throw Mi=0,Zc=null,Error(F(185));vo(t,n,r),(!(ye&2)||t!==Je)&&(t===Je&&(!(ye&2)&&(Fl|=n),qe===4&&Hn(t,tt)),kt(t,r),n===1&&ye===0&&!(e.mode&1)&&(Os=ze()+500,Vl&&vr()))}function kt(t,e){var n=t.callbackNode;z1(t,e);var r=Ha(t,t===Je?tt:0);if(r===0)n!==null&&Ap(n),t.callbackNode=null,t.callbackPriority=0;else if(e=r&-r,t.callbackPriority!==e){if(n!=null&&Ap(n),e===1)t.tag===0?UE(_m.bind(null,t)):Zy(_m.bind(null,t)),LE(function(){!(ye&6)&&vr()}),n=null;else{switch(Cy(r)){case 1:n=jh;break;case 4:n=Sy;break;case 16:n=Wa;break;case 536870912:n=ky;break;default:n=Wa}n=Yv(n,Wv.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function Wv(t,e){if(Ra=-1,Pa=0,ye&6)throw Error(F(327));var n=t.callbackNode;if(Es()&&t.callbackNode!==n)return null;var r=Ha(t,t===Je?tt:0);if(r===0)return null;if(r&30||r&t.expiredLanes||e)e=ul(t,r);else{e=r;var s=ye;ye|=2;var i=qv();(Je!==t||tt!==e)&&(mn=null,Os=ze()+500,Nr(t,e));do try{aT();break}catch(l){Hv(t,l)}while(!0);Yh(),ol.current=i,ye=s,Be!==null?e=0:(Je=null,tt=0,e=qe)}if(e!==0){if(e===2&&(s=kc(t),s!==0&&(r=s,e=eh(t,s))),e===1)throw n=io,Nr(t,0),Hn(t,r),kt(t,ze()),n;if(e===6)Hn(t,r);else{if(s=t.current.alternate,!(r&30)&&!iT(s)&&(e=ul(t,r),e===2&&(i=kc(t),i!==0&&(r=i,e=eh(t,i))),e===1))throw n=io,Nr(t,0),Hn(t,r),kt(t,ze()),n;switch(t.finishedWork=s,t.finishedLanes=r,e){case 0:case 1:throw Error(F(345));case 2:Sr(t,Tt,mn);break;case 3:if(Hn(t,r),(r&130023424)===r&&(e=dd+500-ze(),10<e)){if(Ha(t,0)!==0)break;if(s=t.suspendedLanes,(s&r)!==r){_t(),t.pingedLanes|=t.suspendedLanes&s;break}t.timeoutHandle=Oc(Sr.bind(null,t,Tt,mn),e);break}Sr(t,Tt,mn);break;case 4:if(Hn(t,r),(r&4194240)===r)break;for(e=t.eventTimes,s=-1;0<r;){var o=31-Jt(r);i=1<<o,o=e[o],o>s&&(s=o),r&=~i}if(r=s,r=ze()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*sT(r/1960))-r,10<r){t.timeoutHandle=Oc(Sr.bind(null,t,Tt,mn),r);break}Sr(t,Tt,mn);break;case 5:Sr(t,Tt,mn);break;default:throw Error(F(329))}}}return kt(t,ze()),t.callbackNode===n?Wv.bind(null,t):null}function eh(t,e){var n=Li;return t.current.memoizedState.isDehydrated&&(Nr(t,e).flags|=256),t=ul(t,e),t!==2&&(e=Tt,Tt=n,e!==null&&th(e)),t}function th(t){Tt===null?Tt=t:Tt.push.apply(Tt,t)}function iT(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var s=n[r],i=s.getSnapshot;s=s.value;try{if(!Xt(i(),s))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Hn(t,e){for(e&=~hd,e&=~Fl,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-Jt(e),r=1<<n;t[n]=-1,e&=~r}}function _m(t){if(ye&6)throw Error(F(327));Es();var e=Ha(t,0);if(!(e&1))return kt(t,ze()),null;var n=ul(t,e);if(t.tag!==0&&n===2){var r=kc(t);r!==0&&(e=r,n=eh(t,r))}if(n===1)throw n=io,Nr(t,0),Hn(t,e),kt(t,ze()),n;if(n===6)throw Error(F(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Sr(t,Tt,mn),kt(t,ze()),null}function fd(t,e){var n=ye;ye|=1;try{return t(e)}finally{ye=n,ye===0&&(Os=ze()+500,Vl&&vr())}}function Fr(t){Yn!==null&&Yn.tag===0&&!(ye&6)&&Es();var e=ye;ye|=1;var n=Ft.transition,r=Te;try{if(Ft.transition=null,Te=1,t)return t()}finally{Te=r,Ft.transition=n,ye=e,!(ye&6)&&vr()}}function pd(){Ct=ps.current,Ne(ps)}function Nr(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,VE(n)),Be!==null)for(n=Be.return;n!==null;){var r=n;switch(Gh(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Ja();break;case 3:bs(),Ne(It),Ne(pt),rd();break;case 5:nd(r);break;case 4:bs();break;case 13:Ne(De);break;case 19:Ne(De);break;case 10:Xh(r.type._context);break;case 22:case 23:pd()}n=n.return}if(Je=t,Be=t=or(t.current,null),tt=Ct=e,qe=0,io=null,hd=Fl=jr=0,Tt=Li=null,Cr!==null){for(e=0;e<Cr.length;e++)if(n=Cr[e],r=n.interleaved,r!==null){n.interleaved=null;var s=r.next,i=n.pending;if(i!==null){var o=i.next;i.next=s,r.next=o}n.pending=r}Cr=null}return t}function Hv(t,e){do{var n=Be;try{if(Yh(),ka.current=il,sl){for(var r=Oe.memoizedState;r!==null;){var s=r.queue;s!==null&&(s.pending=null),r=r.next}sl=!1}if(Mr=0,Qe=We=Oe=null,Oi=!1,no=0,cd.current=null,n===null||n.return===null){qe=1,io=e,Be=null;break}e:{var i=t,o=n.return,l=n,u=e;if(e=tt,l.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var h=u,p=l,m=p.tag;if(!(p.mode&1)&&(m===0||m===11||m===15)){var y=p.alternate;y?(p.updateQueue=y.updateQueue,p.memoizedState=y.memoizedState,p.lanes=y.lanes):(p.updateQueue=null,p.memoizedState=null)}var w=om(o);if(w!==null){w.flags&=-257,am(w,o,l,i,e),w.mode&1&&im(i,h,e),e=w,u=h;var A=e.updateQueue;if(A===null){var R=new Set;R.add(u),e.updateQueue=R}else A.add(u);break e}else{if(!(e&1)){im(i,h,e),md();break e}u=Error(F(426))}}else if(be&&l.mode&1){var V=om(o);if(V!==null){!(V.flags&65536)&&(V.flags|=256),am(V,o,l,i,e),Qh(Ds(u,l));break e}}i=u=Ds(u,l),qe!==4&&(qe=2),Li===null?Li=[i]:Li.push(i),i=o;do{switch(i.tag){case 3:i.flags|=65536,e&=-e,i.lanes|=e;var T=Cv(i,u,e);Zp(i,T);break e;case 1:l=u;var E=i.type,I=i.stateNode;if(!(i.flags&128)&&(typeof E.getDerivedStateFromError=="function"||I!==null&&typeof I.componentDidCatch=="function"&&(sr===null||!sr.has(I)))){i.flags|=65536,e&=-e,i.lanes|=e;var D=Rv(i,l,e);Zp(i,D);break e}}i=i.return}while(i!==null)}Gv(n)}catch(L){e=L,Be===n&&n!==null&&(Be=n=n.return);continue}break}while(!0)}function qv(){var t=ol.current;return ol.current=il,t===null?il:t}function md(){(qe===0||qe===3||qe===2)&&(qe=4),Je===null||!(jr&268435455)&&!(Fl&268435455)||Hn(Je,tt)}function ul(t,e){var n=ye;ye|=2;var r=qv();(Je!==t||tt!==e)&&(mn=null,Nr(t,e));do try{oT();break}catch(s){Hv(t,s)}while(!0);if(Yh(),ye=n,ol.current=r,Be!==null)throw Error(F(261));return Je=null,tt=0,qe}function oT(){for(;Be!==null;)Kv(Be)}function aT(){for(;Be!==null&&!b1();)Kv(Be)}function Kv(t){var e=Jv(t.alternate,t,Ct);t.memoizedProps=t.pendingProps,e===null?Gv(t):Be=e,cd.current=null}function Gv(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=eT(n,e),n!==null){n.flags&=32767,Be=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{qe=6,Be=null;return}}else if(n=ZE(n,e,Ct),n!==null){Be=n;return}if(e=e.sibling,e!==null){Be=e;return}Be=e=t}while(e!==null);qe===0&&(qe=5)}function Sr(t,e,n){var r=Te,s=Ft.transition;try{Ft.transition=null,Te=1,lT(t,e,n,r)}finally{Ft.transition=s,Te=r}return null}function lT(t,e,n,r){do Es();while(Yn!==null);if(ye&6)throw Error(F(327));n=t.finishedWork;var s=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(F(177));t.callbackNode=null,t.callbackPriority=0;var i=n.lanes|n.childLanes;if($1(t,i),t===Je&&(Be=Je=null,tt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||da||(da=!0,Yv(Wa,function(){return Es(),null})),i=(n.flags&15990)!==0,n.subtreeFlags&15990||i){i=Ft.transition,Ft.transition=null;var o=Te;Te=1;var l=ye;ye|=4,cd.current=null,nT(t,n),$v(n,t),CE(bc),qa=!!Nc,bc=Nc=null,t.current=n,rT(n),D1(),ye=l,Te=o,Ft.transition=i}else t.current=n;if(da&&(da=!1,Yn=t,ll=s),i=t.pendingLanes,i===0&&(sr=null),L1(n.stateNode),kt(t,ze()),e!==null)for(r=t.onRecoverableError,n=0;n<e.length;n++)s=e[n],r(s.value,{componentStack:s.stack,digest:s.digest});if(al)throw al=!1,t=Xc,Xc=null,t;return ll&1&&t.tag!==0&&Es(),i=t.pendingLanes,i&1?t===Zc?Mi++:(Mi=0,Zc=t):Mi=0,vr(),null}function Es(){if(Yn!==null){var t=Cy(ll),e=Ft.transition,n=Te;try{if(Ft.transition=null,Te=16>t?16:t,Yn===null)var r=!1;else{if(t=Yn,Yn=null,ll=0,ye&6)throw Error(F(331));var s=ye;for(ye|=4,H=t.current;H!==null;){var i=H,o=i.child;if(H.flags&16){var l=i.deletions;if(l!==null){for(var u=0;u<l.length;u++){var h=l[u];for(H=h;H!==null;){var p=H;switch(p.tag){case 0:case 11:case 15:Vi(8,p,i)}var m=p.child;if(m!==null)m.return=p,H=m;else for(;H!==null;){p=H;var y=p.sibling,w=p.return;if(Fv(p),p===h){H=null;break}if(y!==null){y.return=w,H=y;break}H=w}}}var A=i.alternate;if(A!==null){var R=A.child;if(R!==null){A.child=null;do{var V=R.sibling;R.sibling=null,R=V}while(R!==null)}}H=i}}if(i.subtreeFlags&2064&&o!==null)o.return=i,H=o;else e:for(;H!==null;){if(i=H,i.flags&2048)switch(i.tag){case 0:case 11:case 15:Vi(9,i,i.return)}var T=i.sibling;if(T!==null){T.return=i.return,H=T;break e}H=i.return}}var E=t.current;for(H=E;H!==null;){o=H;var I=o.child;if(o.subtreeFlags&2064&&I!==null)I.return=o,H=I;else e:for(o=E;H!==null;){if(l=H,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:jl(9,l)}}catch(L){je(l,l.return,L)}if(l===o){H=null;break e}var D=l.sibling;if(D!==null){D.return=l.return,H=D;break e}H=l.return}}if(ye=s,vr(),rn&&typeof rn.onPostCommitFiberRoot=="function")try{rn.onPostCommitFiberRoot(Pl,t)}catch{}r=!0}return r}finally{Te=n,Ft.transition=e}}return!1}function wm(t,e,n){e=Ds(n,e),e=Cv(t,e,1),t=rr(t,e,1),e=_t(),t!==null&&(vo(t,1,e),kt(t,e))}function je(t,e,n){if(t.tag===3)wm(t,t,n);else for(;e!==null;){if(e.tag===3){wm(e,t,n);break}else if(e.tag===1){var r=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(sr===null||!sr.has(r))){t=Ds(n,t),t=Rv(e,t,1),e=rr(e,t,1),t=_t(),e!==null&&(vo(e,1,t),kt(e,t));break}}e=e.return}}function uT(t,e,n){var r=t.pingCache;r!==null&&r.delete(e),e=_t(),t.pingedLanes|=t.suspendedLanes&n,Je===t&&(tt&n)===n&&(qe===4||qe===3&&(tt&130023424)===tt&&500>ze()-dd?Nr(t,0):hd|=n),kt(t,e)}function Qv(t,e){e===0&&(t.mode&1?(e=na,na<<=1,!(na&130023424)&&(na=4194304)):e=1);var n=_t();t=An(t,e),t!==null&&(vo(t,e,n),kt(t,n))}function cT(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),Qv(t,n)}function hT(t,e){var n=0;switch(t.tag){case 13:var r=t.stateNode,s=t.memoizedState;s!==null&&(n=s.retryLane);break;case 19:r=t.stateNode;break;default:throw Error(F(314))}r!==null&&r.delete(e),Qv(t,n)}var Jv;Jv=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||It.current)xt=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return xt=!1,XE(t,e,n);xt=!!(t.flags&131072)}else xt=!1,be&&e.flags&1048576&&ev(e,Za,e.index);switch(e.lanes=0,e.tag){case 2:var r=e.type;Ca(t,e),t=e.pendingProps;var s=Rs(e,pt.current);ws(e,n),s=id(null,e,r,t,s,n);var i=od();return e.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,St(r)?(i=!0,Ya(e)):i=!1,e.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,ed(e),s.updater=Ml,e.stateNode=s,s._reactInternals=e,zc(e,r,t,n),e=Wc(null,e,r,!0,i,n)):(e.tag=0,be&&i&&Kh(e),vt(null,e,s,n),e=e.child),e;case 16:r=e.elementType;e:{switch(Ca(t,e),t=e.pendingProps,s=r._init,r=s(r._payload),e.type=r,s=e.tag=fT(r),t=qt(r,t),s){case 0:e=Bc(null,e,r,t,n);break e;case 1:e=cm(null,e,r,t,n);break e;case 11:e=lm(null,e,r,t,n);break e;case 14:e=um(null,e,r,qt(r.type,t),n);break e}throw Error(F(306,r,""))}return e;case 0:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:qt(r,s),Bc(t,e,r,s,n);case 1:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:qt(r,s),cm(t,e,r,s,n);case 3:e:{if(Dv(e),t===null)throw Error(F(387));r=e.pendingProps,i=e.memoizedState,s=i.element,ov(t,e),nl(e,r,null,n);var o=e.memoizedState;if(r=o.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=i,e.memoizedState=i,e.flags&256){s=Ds(Error(F(423)),e),e=hm(t,e,r,n,s);break e}else if(r!==s){s=Ds(Error(F(424)),e),e=hm(t,e,r,n,s);break e}else for(Rt=nr(e.stateNode.containerInfo.firstChild),Pt=e,be=!0,Gt=null,n=sv(e,null,r,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Ps(),r===s){e=Cn(t,e,n);break e}vt(t,e,r,n)}e=e.child}return e;case 5:return av(e),t===null&&jc(e),r=e.type,s=e.pendingProps,i=t!==null?t.memoizedProps:null,o=s.children,Dc(r,s)?o=null:i!==null&&Dc(r,i)&&(e.flags|=32),bv(t,e),vt(t,e,o,n),e.child;case 6:return t===null&&jc(e),null;case 13:return Ov(t,e,n);case 4:return td(e,e.stateNode.containerInfo),r=e.pendingProps,t===null?e.child=Ns(e,null,r,n):vt(t,e,r,n),e.child;case 11:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:qt(r,s),lm(t,e,r,s,n);case 7:return vt(t,e,e.pendingProps,n),e.child;case 8:return vt(t,e,e.pendingProps.children,n),e.child;case 12:return vt(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(r=e.type._context,s=e.pendingProps,i=e.memoizedProps,o=s.value,ke(el,r._currentValue),r._currentValue=o,i!==null)if(Xt(i.value,o)){if(i.children===s.children&&!It.current){e=Cn(t,e,n);break e}}else for(i=e.child,i!==null&&(i.return=e);i!==null;){var l=i.dependencies;if(l!==null){o=i.child;for(var u=l.firstContext;u!==null;){if(u.context===r){if(i.tag===1){u=Tn(-1,n&-n),u.tag=2;var h=i.updateQueue;if(h!==null){h=h.shared;var p=h.pending;p===null?u.next=u:(u.next=p.next,p.next=u),h.pending=u}}i.lanes|=n,u=i.alternate,u!==null&&(u.lanes|=n),Fc(i.return,n,e),l.lanes|=n;break}u=u.next}}else if(i.tag===10)o=i.type===e.type?null:i.child;else if(i.tag===18){if(o=i.return,o===null)throw Error(F(341));o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),Fc(o,n,e),o=i.sibling}else o=i.child;if(o!==null)o.return=i;else for(o=i;o!==null;){if(o===e){o=null;break}if(i=o.sibling,i!==null){i.return=o.return,o=i;break}o=o.return}i=o}vt(t,e,s.children,n),e=e.child}return e;case 9:return s=e.type,r=e.pendingProps.children,ws(e,n),s=zt(s),r=r(s),e.flags|=1,vt(t,e,r,n),e.child;case 14:return r=e.type,s=qt(r,e.pendingProps),s=qt(r.type,s),um(t,e,r,s,n);case 15:return Pv(t,e,e.type,e.pendingProps,n);case 17:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:qt(r,s),Ca(t,e),e.tag=1,St(r)?(t=!0,Ya(e)):t=!1,ws(e,n),Av(e,r,s),zc(e,r,s,n),Wc(null,e,r,!0,t,n);case 19:return Vv(t,e,n);case 22:return Nv(t,e,n)}throw Error(F(156,e.tag))};function Yv(t,e){return Iy(t,e)}function dT(t,e,n,r){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function jt(t,e,n,r){return new dT(t,e,n,r)}function gd(t){return t=t.prototype,!(!t||!t.isReactComponent)}function fT(t){if(typeof t=="function")return gd(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Vh)return 11;if(t===Lh)return 14}return 2}function or(t,e){var n=t.alternate;return n===null?(n=jt(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Na(t,e,n,r,s,i){var o=2;if(r=t,typeof t=="function")gd(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case ss:return br(n.children,s,i,e);case Oh:o=8,s|=8;break;case hc:return t=jt(12,n,e,s|2),t.elementType=hc,t.lanes=i,t;case dc:return t=jt(13,n,e,s),t.elementType=dc,t.lanes=i,t;case fc:return t=jt(19,n,e,s),t.elementType=fc,t.lanes=i,t;case ay:return Ul(n,s,i,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case iy:o=10;break e;case oy:o=9;break e;case Vh:o=11;break e;case Lh:o=14;break e;case $n:o=16,r=null;break e}throw Error(F(130,t==null?t:typeof t,""))}return e=jt(o,n,e,s),e.elementType=t,e.type=r,e.lanes=i,e}function br(t,e,n,r){return t=jt(7,t,r,e),t.lanes=n,t}function Ul(t,e,n,r){return t=jt(22,t,r,e),t.elementType=ay,t.lanes=n,t.stateNode={isHidden:!1},t}function Qu(t,e,n){return t=jt(6,t,null,e),t.lanes=n,t}function Ju(t,e,n){return e=jt(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function pT(t,e,n,r,s){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Pu(0),this.expirationTimes=Pu(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Pu(0),this.identifierPrefix=r,this.onRecoverableError=s,this.mutableSourceEagerHydrationData=null}function yd(t,e,n,r,s,i,o,l,u){return t=new pT(t,e,n,l,u),e===1?(e=1,i===!0&&(e|=8)):e=0,i=jt(3,null,null,e),t.current=i,i.stateNode=t,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},ed(i),t}function mT(t,e,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:rs,key:r==null?null:""+r,children:t,containerInfo:e,implementation:n}}function Xv(t){if(!t)return dr;t=t._reactInternals;e:{if(qr(t)!==t||t.tag!==1)throw Error(F(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(St(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(F(171))}if(t.tag===1){var n=t.type;if(St(n))return Xy(t,n,e)}return e}function Zv(t,e,n,r,s,i,o,l,u){return t=yd(n,r,!0,t,s,i,o,l,u),t.context=Xv(null),n=t.current,r=_t(),s=ir(n),i=Tn(r,s),i.callback=e??null,rr(n,i,s),t.current.lanes=s,vo(t,s,r),kt(t,r),t}function zl(t,e,n,r){var s=e.current,i=_t(),o=ir(s);return n=Xv(n),e.context===null?e.context=n:e.pendingContext=n,e=Tn(i,o),e.payload={element:t},r=r===void 0?null:r,r!==null&&(e.callback=r),t=rr(s,e,o),t!==null&&(Yt(t,s,o,i),Sa(t,s,o)),o}function cl(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Em(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function vd(t,e){Em(t,e),(t=t.alternate)&&Em(t,e)}function gT(){return null}var e0=typeof reportError=="function"?reportError:function(t){console.error(t)};function _d(t){this._internalRoot=t}$l.prototype.render=_d.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(F(409));zl(t,e,null,null)};$l.prototype.unmount=_d.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Fr(function(){zl(null,t,null,null)}),e[kn]=null}};function $l(t){this._internalRoot=t}$l.prototype.unstable_scheduleHydration=function(t){if(t){var e=Ny();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Wn.length&&e!==0&&e<Wn[n].priority;n++);Wn.splice(n,0,t),n===0&&Dy(t)}};function wd(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Bl(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Tm(){}function yT(t,e,n,r,s){if(s){if(typeof r=="function"){var i=r;r=function(){var h=cl(o);i.call(h)}}var o=Zv(e,r,t,0,null,!1,!1,"",Tm);return t._reactRootContainer=o,t[kn]=o.current,Yi(t.nodeType===8?t.parentNode:t),Fr(),o}for(;s=t.lastChild;)t.removeChild(s);if(typeof r=="function"){var l=r;r=function(){var h=cl(u);l.call(h)}}var u=yd(t,0,!1,null,null,!1,!1,"",Tm);return t._reactRootContainer=u,t[kn]=u.current,Yi(t.nodeType===8?t.parentNode:t),Fr(function(){zl(e,u,n,r)}),u}function Wl(t,e,n,r,s){var i=n._reactRootContainer;if(i){var o=i;if(typeof s=="function"){var l=s;s=function(){var u=cl(o);l.call(u)}}zl(e,o,t,s)}else o=yT(n,e,t,s,r);return cl(o)}Ry=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=xi(e.pendingLanes);n!==0&&(Fh(e,n|1),kt(e,ze()),!(ye&6)&&(Os=ze()+500,vr()))}break;case 13:Fr(function(){var r=An(t,1);if(r!==null){var s=_t();Yt(r,t,1,s)}}),vd(t,1)}};Uh=function(t){if(t.tag===13){var e=An(t,134217728);if(e!==null){var n=_t();Yt(e,t,134217728,n)}vd(t,134217728)}};Py=function(t){if(t.tag===13){var e=ir(t),n=An(t,e);if(n!==null){var r=_t();Yt(n,t,e,r)}vd(t,e)}};Ny=function(){return Te};by=function(t,e){var n=Te;try{return Te=t,e()}finally{Te=n}};xc=function(t,e,n){switch(e){case"input":if(gc(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var r=n[e];if(r!==t&&r.form===t.form){var s=Ol(r);if(!s)throw Error(F(90));uy(r),gc(r,s)}}}break;case"textarea":hy(t,n);break;case"select":e=n.value,e!=null&&gs(t,!!n.multiple,e,!1)}};vy=fd;_y=Fr;var vT={usingClientEntryPoint:!1,Events:[wo,ls,Ol,gy,yy,fd]},_i={findFiberByHostInstance:Ar,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},_T={bundleType:_i.bundleType,version:_i.version,rendererPackageName:_i.rendererPackageName,rendererConfig:_i.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Vn.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=Ty(t),t===null?null:t.stateNode},findFiberByHostInstance:_i.findFiberByHostInstance||gT,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var fa=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!fa.isDisabled&&fa.supportsFiber)try{Pl=fa.inject(_T),rn=fa}catch{}}bt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=vT;bt.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!wd(e))throw Error(F(200));return mT(t,e,null,n)};bt.createRoot=function(t,e){if(!wd(t))throw Error(F(299));var n=!1,r="",s=e0;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(r=e.identifierPrefix),e.onRecoverableError!==void 0&&(s=e.onRecoverableError)),e=yd(t,1,!1,null,null,n,!1,r,s),t[kn]=e.current,Yi(t.nodeType===8?t.parentNode:t),new _d(e)};bt.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(F(188)):(t=Object.keys(t).join(","),Error(F(268,t)));return t=Ty(e),t=t===null?null:t.stateNode,t};bt.flushSync=function(t){return Fr(t)};bt.hydrate=function(t,e,n){if(!Bl(e))throw Error(F(200));return Wl(null,t,e,!0,n)};bt.hydrateRoot=function(t,e,n){if(!wd(t))throw Error(F(405));var r=n!=null&&n.hydratedSources||null,s=!1,i="",o=e0;if(n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=Zv(e,null,t,1,n??null,s,!1,i,o),t[kn]=e.current,Yi(t),r)for(t=0;t<r.length;t++)n=r[t],s=n._getVersion,s=s(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,s]:e.mutableSourceEagerHydrationData.push(n,s);return new $l(e)};bt.render=function(t,e,n){if(!Bl(e))throw Error(F(200));return Wl(null,t,e,!1,n)};bt.unmountComponentAtNode=function(t){if(!Bl(t))throw Error(F(40));return t._reactRootContainer?(Fr(function(){Wl(null,null,t,!1,function(){t._reactRootContainer=null,t[kn]=null})}),!0):!1};bt.unstable_batchedUpdates=fd;bt.unstable_renderSubtreeIntoContainer=function(t,e,n,r){if(!Bl(n))throw Error(F(200));if(t==null||t._reactInternals===void 0)throw Error(F(38));return Wl(t,e,n,!1,r)};bt.version="18.3.1-next-f1338f8080-20240426";function t0(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t0)}catch(t){console.error(t)}}t0(),ty.exports=bt;var wT=ty.exports,xm=wT;uc.createRoot=xm.createRoot,uc.hydrateRoot=xm.hydrateRoot;var Im={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const n0=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},ET=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[n++],o=t[n++],l=t[n++],u=((s&7)<<18|(i&63)<<12|(o&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=t[n++],o=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},r0={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const i=t[s],o=s+1<t.length,l=o?t[s+1]:0,u=s+2<t.length,h=u?t[s+2]:0,p=i>>2,m=(i&3)<<4|l>>4;let y=(l&15)<<2|h>>6,w=h&63;u||(w=64,o||(y=64)),r.push(n[p],n[m],n[y],n[w])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(n0(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):ET(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const i=n[t.charAt(s++)],l=s<t.length?n[t.charAt(s)]:0;++s;const h=s<t.length?n[t.charAt(s)]:64;++s;const m=s<t.length?n[t.charAt(s)]:64;if(++s,i==null||l==null||h==null||m==null)throw new TT;const y=i<<2|l>>4;if(r.push(y),h!==64){const w=l<<4&240|h>>2;if(r.push(w),m!==64){const A=h<<6&192|m;r.push(A)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class TT extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const xT=function(t){const e=n0(t);return r0.encodeByteArray(e,!0)},hl=function(t){return xT(t).replace(/\./g,"")},s0=function(t){try{return r0.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function IT(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ST=()=>IT().__FIREBASE_DEFAULTS__,kT=()=>{if(typeof process>"u"||typeof Im>"u")return;const t=Im.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},AT=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&s0(t[1]);return e&&JSON.parse(e)},Hl=()=>{try{return ST()||kT()||AT()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},i0=t=>{var e,n;return(n=(e=Hl())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},CT=t=>{const e=i0(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},o0=()=>{var t;return(t=Hl())===null||t===void 0?void 0:t.config},a0=t=>{var e;return(e=Hl())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RT{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function PT(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",s=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},t);return[hl(JSON.stringify(n)),hl(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function NT(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(mt())}function bT(){var t;const e=(t=Hl())===null||t===void 0?void 0:t.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function DT(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function OT(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function VT(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function LT(){const t=mt();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function MT(){return!bT()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function jT(){try{return typeof indexedDB=="object"}catch{return!1}}function FT(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const UT="FirebaseError";class Ln extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=UT,Object.setPrototypeOf(this,Ln.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,To.prototype.create)}}class To{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?zT(i,r):"Error",l=`${this.serviceName}: ${o} (${s}).`;return new Ln(s,l,r)}}function zT(t,e){return t.replace($T,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const $T=/\{\$([^}]+)}/g;function BT(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function dl(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const i=t[s],o=e[s];if(Sm(i)&&Sm(o)){if(!dl(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function Sm(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xo(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function WT(t,e){const n=new HT(t,e);return n.subscribe.bind(n)}class HT{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");qT(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=Yu),s.error===void 0&&(s.error=Yu),s.complete===void 0&&(s.complete=Yu);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function qT(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Yu(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bt(t){return t&&t._delegate?t._delegate:t}class Ur{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kr="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KT{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new RT;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(QT(e))try{this.getOrInitializeService({instanceIdentifier:kr})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=kr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=kr){return this.instances.has(e)}getOptions(e=kr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);r===l&&o.resolve(s)}return s}onInit(e,n){var r;const s=this.normalizeInstanceIdentifier(n),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:GT(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=kr){return this.component?this.component.multipleInstances?e:kr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function GT(t){return t===kr?void 0:t}function QT(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JT{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new KT(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var pe;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(pe||(pe={}));const YT={debug:pe.DEBUG,verbose:pe.VERBOSE,info:pe.INFO,warn:pe.WARN,error:pe.ERROR,silent:pe.SILENT},XT=pe.INFO,ZT={[pe.DEBUG]:"log",[pe.VERBOSE]:"log",[pe.INFO]:"info",[pe.WARN]:"warn",[pe.ERROR]:"error"},ex=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=ZT[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ed{constructor(e){this.name=e,this._logLevel=XT,this._logHandler=ex,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in pe))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?YT[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,pe.DEBUG,...e),this._logHandler(this,pe.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,pe.VERBOSE,...e),this._logHandler(this,pe.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,pe.INFO,...e),this._logHandler(this,pe.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,pe.WARN,...e),this._logHandler(this,pe.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,pe.ERROR,...e),this._logHandler(this,pe.ERROR,...e)}}const tx=(t,e)=>e.some(n=>t instanceof n);let km,Am;function nx(){return km||(km=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function rx(){return Am||(Am=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const l0=new WeakMap,nh=new WeakMap,u0=new WeakMap,Xu=new WeakMap,Td=new WeakMap;function sx(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(ar(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&l0.set(n,t)}).catch(()=>{}),Td.set(e,t),e}function ix(t){if(nh.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});nh.set(t,e)}let rh={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return nh.get(t);if(e==="objectStoreNames")return t.objectStoreNames||u0.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return ar(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function ox(t){rh=t(rh)}function ax(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(Zu(this),e,...n);return u0.set(r,e.sort?e.sort():[e]),ar(r)}:rx().includes(t)?function(...e){return t.apply(Zu(this),e),ar(l0.get(this))}:function(...e){return ar(t.apply(Zu(this),e))}}function lx(t){return typeof t=="function"?ax(t):(t instanceof IDBTransaction&&ix(t),tx(t,nx())?new Proxy(t,rh):t)}function ar(t){if(t instanceof IDBRequest)return sx(t);if(Xu.has(t))return Xu.get(t);const e=lx(t);return e!==t&&(Xu.set(t,e),Td.set(e,t)),e}const Zu=t=>Td.get(t);function ux(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),l=ar(o);return r&&o.addEventListener("upgradeneeded",u=>{r(ar(o.result),u.oldVersion,u.newVersion,ar(o.transaction),u)}),n&&o.addEventListener("blocked",u=>n(u.oldVersion,u.newVersion,u)),l.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),l}const cx=["get","getKey","getAll","getAllKeys","count"],hx=["put","add","delete","clear"],ec=new Map;function Cm(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(ec.get(e))return ec.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=hx.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||cx.includes(n)))return;const i=async function(o,...l){const u=this.transaction(o,s?"readwrite":"readonly");let h=u.store;return r&&(h=h.index(l.shift())),(await Promise.all([h[n](...l),s&&u.done]))[0]};return ec.set(e,i),i}ox(t=>({...t,get:(e,n,r)=>Cm(e,n)||t.get(e,n,r),has:(e,n)=>!!Cm(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dx{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(fx(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function fx(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const sh="@firebase/app",Rm="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rn=new Ed("@firebase/app"),px="@firebase/app-compat",mx="@firebase/analytics-compat",gx="@firebase/analytics",yx="@firebase/app-check-compat",vx="@firebase/app-check",_x="@firebase/auth",wx="@firebase/auth-compat",Ex="@firebase/database",Tx="@firebase/data-connect",xx="@firebase/database-compat",Ix="@firebase/functions",Sx="@firebase/functions-compat",kx="@firebase/installations",Ax="@firebase/installations-compat",Cx="@firebase/messaging",Rx="@firebase/messaging-compat",Px="@firebase/performance",Nx="@firebase/performance-compat",bx="@firebase/remote-config",Dx="@firebase/remote-config-compat",Ox="@firebase/storage",Vx="@firebase/storage-compat",Lx="@firebase/firestore",Mx="@firebase/vertexai-preview",jx="@firebase/firestore-compat",Fx="firebase",Ux="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ih="[DEFAULT]",zx={[sh]:"fire-core",[px]:"fire-core-compat",[gx]:"fire-analytics",[mx]:"fire-analytics-compat",[vx]:"fire-app-check",[yx]:"fire-app-check-compat",[_x]:"fire-auth",[wx]:"fire-auth-compat",[Ex]:"fire-rtdb",[Tx]:"fire-data-connect",[xx]:"fire-rtdb-compat",[Ix]:"fire-fn",[Sx]:"fire-fn-compat",[kx]:"fire-iid",[Ax]:"fire-iid-compat",[Cx]:"fire-fcm",[Rx]:"fire-fcm-compat",[Px]:"fire-perf",[Nx]:"fire-perf-compat",[bx]:"fire-rc",[Dx]:"fire-rc-compat",[Ox]:"fire-gcs",[Vx]:"fire-gcs-compat",[Lx]:"fire-fst",[jx]:"fire-fst-compat",[Mx]:"fire-vertex","fire-js":"fire-js",[Fx]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fl=new Map,$x=new Map,oh=new Map;function Pm(t,e){try{t.container.addComponent(e)}catch(n){Rn.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Vs(t){const e=t.name;if(oh.has(e))return Rn.debug(`There were multiple attempts to register component ${e}.`),!1;oh.set(e,t);for(const n of fl.values())Pm(n,t);for(const n of $x.values())Pm(n,t);return!0}function xd(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function nn(t){return t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bx={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},lr=new To("app","Firebase",Bx);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wx{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Ur("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw lr.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ks=Ux;function c0(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:ih,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw lr.create("bad-app-name",{appName:String(s)});if(n||(n=o0()),!n)throw lr.create("no-options");const i=fl.get(s);if(i){if(dl(n,i.options)&&dl(r,i.config))return i;throw lr.create("duplicate-app",{appName:s})}const o=new JT(s);for(const u of oh.values())o.addComponent(u);const l=new Wx(n,r,o);return fl.set(s,l),l}function h0(t=ih){const e=fl.get(t);if(!e&&t===ih&&o0())return c0();if(!e)throw lr.create("no-app",{appName:t});return e}function ur(t,e,n){var r;let s=(r=zx[t])!==null&&r!==void 0?r:t;n&&(s+=`-${n}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const l=[`Unable to register library "${s}" with version "${e}":`];i&&l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&l.push("and"),o&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Rn.warn(l.join(" "));return}Vs(new Ur(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hx="firebase-heartbeat-database",qx=1,oo="firebase-heartbeat-store";let tc=null;function d0(){return tc||(tc=ux(Hx,qx,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(oo)}catch(n){console.warn(n)}}}}).catch(t=>{throw lr.create("idb-open",{originalErrorMessage:t.message})})),tc}async function Kx(t){try{const n=(await d0()).transaction(oo),r=await n.objectStore(oo).get(f0(t));return await n.done,r}catch(e){if(e instanceof Ln)Rn.warn(e.message);else{const n=lr.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Rn.warn(n.message)}}}async function Nm(t,e){try{const r=(await d0()).transaction(oo,"readwrite");await r.objectStore(oo).put(e,f0(t)),await r.done}catch(n){if(n instanceof Ln)Rn.warn(n.message);else{const r=lr.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Rn.warn(r.message)}}}function f0(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gx=1024,Qx=30*24*60*60*1e3;class Jx{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Xx(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=bm();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i)?void 0:(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const l=new Date(o.date).valueOf();return Date.now()-l<=Qx}),this._storage.overwrite(this._heartbeatsCache))}catch(r){Rn.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=bm(),{heartbeatsToSend:r,unsentEntries:s}=Yx(this._heartbeatsCache.heartbeats),i=hl(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(n){return Rn.warn(n),""}}}function bm(){return new Date().toISOString().substring(0,10)}function Yx(t,e=Gx){const n=[];let r=t.slice();for(const s of t){const i=n.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),Dm(n)>e){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),Dm(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class Xx{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return jT()?FT().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Kx(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return Nm(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return Nm(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Dm(t){return hl(JSON.stringify({version:2,heartbeats:t})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zx(t){Vs(new Ur("platform-logger",e=>new dx(e),"PRIVATE")),Vs(new Ur("heartbeat",e=>new Jx(e),"PRIVATE")),ur(sh,Rm,t),ur(sh,Rm,"esm2017"),ur("fire-js","")}Zx("");var eI="firebase",tI="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ur(eI,tI,"app");function Id(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(t);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(t,r[s])&&(n[r[s]]=t[r[s]]);return n}function p0(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const nI=p0,m0=new To("auth","Firebase",p0());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pl=new Ed("@firebase/auth");function rI(t,...e){pl.logLevel<=pe.WARN&&pl.warn(`Auth (${Ks}): ${t}`,...e)}function ba(t,...e){pl.logLevel<=pe.ERROR&&pl.error(`Auth (${Ks}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pn(t,...e){throw Sd(t,...e)}function on(t,...e){return Sd(t,...e)}function g0(t,e,n){const r=Object.assign(Object.assign({},nI()),{[e]:n});return new To("auth","Firebase",r).create(e,{appName:t.name})}function xn(t){return g0(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Sd(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return m0.create(t,...e)}function se(t,e,...n){if(!t)throw Sd(e,...n)}function _n(t){const e="INTERNAL ASSERTION FAILED: "+t;throw ba(e),new Error(e)}function Nn(t,e){t||_n(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ah(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function sI(){return Om()==="http:"||Om()==="https:"}function Om(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iI(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(sI()||OT()||"connection"in navigator)?navigator.onLine:!0}function oI(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Io{constructor(e,n){this.shortDelay=e,this.longDelay=n,Nn(n>e,"Short delay should be less than long delay!"),this.isMobile=NT()||VT()}get(){return iI()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kd(t,e){Nn(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class y0{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;_n("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;_n("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;_n("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aI={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lI=new Io(3e4,6e4);function So(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function Gs(t,e,n,r,s={}){return v0(t,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const l=xo(Object.assign({key:t.config.apiKey},o)).slice(1),u=await t._getAdditionalHeaders();u["Content-Type"]="application/json",t.languageCode&&(u["X-Firebase-Locale"]=t.languageCode);const h=Object.assign({method:e,headers:u},i);return DT()||(h.referrerPolicy="no-referrer"),y0.fetch()(_0(t,t.config.apiHost,n,l),h)})}async function v0(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},aI),e);try{const s=new uI(t),i=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw pa(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const l=i.ok?o.errorMessage:o.error.message,[u,h]=l.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw pa(t,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw pa(t,"email-already-in-use",o);if(u==="USER_DISABLED")throw pa(t,"user-disabled",o);const p=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw g0(t,p,h);Pn(t,p)}}catch(s){if(s instanceof Ln)throw s;Pn(t,"network-request-failed",{message:String(s)})}}async function Ad(t,e,n,r,s={}){const i=await Gs(t,e,n,r,s);return"mfaPendingCredential"in i&&Pn(t,"multi-factor-auth-required",{_serverResponse:i}),i}function _0(t,e,n,r){const s=`${e}${n}?${r}`;return t.config.emulator?kd(t.config,s):`${t.config.apiScheme}://${s}`}class uI{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(on(this.auth,"network-request-failed")),lI.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function pa(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=on(t,e,r);return s.customData._tokenResponse=n,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cI(t,e){return Gs(t,"POST","/v1/accounts:delete",e)}async function w0(t,e){return Gs(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ji(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function hI(t,e=!1){const n=Bt(t),r=await n.getIdToken(e),s=Cd(r);se(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:ji(nc(s.auth_time)),issuedAtTime:ji(nc(s.iat)),expirationTime:ji(nc(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function nc(t){return Number(t)*1e3}function Cd(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return ba("JWT malformed, contained fewer than 3 sections"),null;try{const s=s0(n);return s?JSON.parse(s):(ba("Failed to decode base64 JWT payload"),null)}catch(s){return ba("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Vm(t){const e=Cd(t);return se(e,"internal-error"),se(typeof e.exp<"u","internal-error"),se(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ao(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof Ln&&dI(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function dI({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fI{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lh{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=ji(this.lastLoginAt),this.creationTime=ji(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ml(t){var e;const n=t.auth,r=await t.getIdToken(),s=await ao(t,w0(n,{idToken:r}));se(s==null?void 0:s.users.length,n,"internal-error");const i=s.users[0];t._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?E0(i.providerUserInfo):[],l=mI(t.providerData,o),u=t.isAnonymous,h=!(t.email&&i.passwordHash)&&!(l!=null&&l.length),p=u?h:!1,m={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:l,metadata:new lh(i.createdAt,i.lastLoginAt),isAnonymous:p};Object.assign(t,m)}async function pI(t){const e=Bt(t);await ml(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function mI(t,e){return[...t.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function E0(t){return t.map(e=>{var{providerId:n}=e,r=Id(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gI(t,e){const n=await v0(t,{},async()=>{const r=xo({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=t.config,o=_0(t,s,"/v1/token",`key=${i}`),l=await t._getAdditionalHeaders();return l["Content-Type"]="application/x-www-form-urlencoded",y0.fetch()(o,{method:"POST",headers:l,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function yI(t,e){return Gs(t,"POST","/v2/accounts:revokeToken",So(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ts{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){se(e.idToken,"internal-error"),se(typeof e.idToken<"u","internal-error"),se(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Vm(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){se(e.length!==0,"internal-error");const n=Vm(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(se(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:i}=await gI(e,n);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:i}=n,o=new Ts;return r&&(se(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(se(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(se(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Ts,this.toJSON())}_performRefresh(){return _n("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zn(t,e){se(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class wn{constructor(e){var{uid:n,auth:r,stsTokenManager:s}=e,i=Id(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new fI(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new lh(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await ao(this,this.stsTokenManager.getToken(this.auth,e));return se(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return hI(this,e)}reload(){return pI(this)}_assign(e){this!==e&&(se(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new wn(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){se(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await ml(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(nn(this.auth.app))return Promise.reject(xn(this.auth));const e=await this.getIdToken();return await ao(this,cI(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,s,i,o,l,u,h,p;const m=(r=n.displayName)!==null&&r!==void 0?r:void 0,y=(s=n.email)!==null&&s!==void 0?s:void 0,w=(i=n.phoneNumber)!==null&&i!==void 0?i:void 0,A=(o=n.photoURL)!==null&&o!==void 0?o:void 0,R=(l=n.tenantId)!==null&&l!==void 0?l:void 0,V=(u=n._redirectEventId)!==null&&u!==void 0?u:void 0,T=(h=n.createdAt)!==null&&h!==void 0?h:void 0,E=(p=n.lastLoginAt)!==null&&p!==void 0?p:void 0,{uid:I,emailVerified:D,isAnonymous:L,providerData:N,stsTokenManager:_}=n;se(I&&_,e,"internal-error");const g=Ts.fromJSON(this.name,_);se(typeof I=="string",e,"internal-error"),zn(m,e.name),zn(y,e.name),se(typeof D=="boolean",e,"internal-error"),se(typeof L=="boolean",e,"internal-error"),zn(w,e.name),zn(A,e.name),zn(R,e.name),zn(V,e.name),zn(T,e.name),zn(E,e.name);const x=new wn({uid:I,auth:e,email:y,emailVerified:D,displayName:m,isAnonymous:L,photoURL:A,phoneNumber:w,tenantId:R,stsTokenManager:g,createdAt:T,lastLoginAt:E});return N&&Array.isArray(N)&&(x.providerData=N.map(k=>Object.assign({},k))),V&&(x._redirectEventId=V),x}static async _fromIdTokenResponse(e,n,r=!1){const s=new Ts;s.updateFromServerResponse(n);const i=new wn({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await ml(i),i}static async _fromGetAccountInfoResponse(e,n,r){const s=n.users[0];se(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?E0(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),l=new Ts;l.updateFromIdToken(r);const u=new wn({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:o}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new lh(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,h),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lm=new Map;function En(t){Nn(t instanceof Function,"Expected a class definition");let e=Lm.get(t);return e?(Nn(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Lm.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class T0{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}T0.type="NONE";const Mm=T0;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Da(t,e,n){return`firebase:${t}:${e}:${n}`}class xs{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Da(this.userKey,s.apiKey,i),this.fullPersistenceKey=Da("persistence",s.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?wn._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new xs(En(Mm),e,r);const s=(await Promise.all(n.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||En(Mm);const o=Da(r,e.config.apiKey,e.name);let l=null;for(const h of n)try{const p=await h._get(o);if(p){const m=wn._fromJSON(e,p);h!==i&&(l=m),i=h;break}}catch{}const u=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new xs(i,e,r):(i=u[0],l&&await i._set(o,l.toJSON()),await Promise.all(n.map(async h=>{if(h!==i)try{await h._remove(o)}catch{}})),new xs(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jm(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(k0(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(x0(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(C0(e))return"Blackberry";if(R0(e))return"Webos";if(I0(e))return"Safari";if((e.includes("chrome/")||S0(e))&&!e.includes("edge/"))return"Chrome";if(A0(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function x0(t=mt()){return/firefox\//i.test(t)}function I0(t=mt()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function S0(t=mt()){return/crios\//i.test(t)}function k0(t=mt()){return/iemobile/i.test(t)}function A0(t=mt()){return/android/i.test(t)}function C0(t=mt()){return/blackberry/i.test(t)}function R0(t=mt()){return/webos/i.test(t)}function Rd(t=mt()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function vI(t=mt()){var e;return Rd(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function _I(){return LT()&&document.documentMode===10}function P0(t=mt()){return Rd(t)||A0(t)||R0(t)||C0(t)||/windows phone/i.test(t)||k0(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function N0(t,e=[]){let n;switch(t){case"Browser":n=jm(mt());break;case"Worker":n=`${jm(mt())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Ks}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wI{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=i=>new Promise((o,l)=>{try{const u=e(i);o(u)}catch(u){l(u)}});r.onAbort=n,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function EI(t,e={}){return Gs(t,"GET","/v2/passwordPolicy",So(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TI=6;class xI{constructor(e){var n,r,s,i;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:TI,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,s,i,o,l;const u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(n=u.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),u.isValid&&(u.isValid=(r=u.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),u.isValid&&(u.isValid=(s=u.containsLowercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(i=u.containsUppercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(o=u.containsNumericCharacter)!==null&&o!==void 0?o:!0),u.isValid&&(u.isValid=(l=u.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),u}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class II{constructor(e,n,r,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Fm(this),this.idTokenSubscription=new Fm(this),this.beforeStateQueue=new wI(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=m0,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=En(n)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await xs.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await w0(this,{idToken:e}),r=await wn._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(nn(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(l,l))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,l=s==null?void 0:s._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===l)&&(u!=null&&u.user)&&(s=u.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return se(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await ml(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=oI()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(nn(this.app))return Promise.reject(xn(this));const n=e?Bt(e):null;return n&&se(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&se(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return nn(this.app)?Promise.reject(xn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return nn(this.app)?Promise.reject(xn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(En(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await EI(this),n=new xI(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new To("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await yI(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&En(e)||this._popupRedirectResolver;se(n,this,"argument-error"),this.redirectPersistenceManager=await xs.create(this,[En(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let o=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(se(l,this,"internal-error"),l.then(()=>{o||i(this.currentUser)}),typeof n=="function"){const u=e.addObserver(n,r,s);return()=>{o=!0,u()}}else{const u=e.addObserver(n);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return se(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=N0(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(n["X-Firebase-AppCheck"]=s),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&rI(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function ko(t){return Bt(t)}class Fm{constructor(e){this.auth=e,this.observer=null,this.addObserver=WT(n=>this.observer=n)}get next(){return se(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Pd={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function SI(t){Pd=t}function kI(t){return Pd.loadJS(t)}function AI(){return Pd.gapiScript}function CI(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function RI(t,e){const n=xd(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),i=n.getOptions();if(dl(i,e??{}))return s;Pn(s,"already-initialized")}return n.initialize({options:e})}function PI(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(En);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function NI(t,e,n){const r=ko(t);se(r._canInitEmulator,r,"emulator-config-failed"),se(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=b0(e),{host:o,port:l}=bI(e),u=l===null?"":`:${l}`;r.config.emulator={url:`${i}//${o}${u}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:l,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),DI()}function b0(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function bI(t){const e=b0(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Um(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:Um(o)}}}function Um(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function DI(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class D0{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return _n("not implemented")}_getIdTokenResponse(e){return _n("not implemented")}_linkToIdToken(e,n){return _n("not implemented")}_getReauthenticationResolver(e){return _n("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Is(t,e){return Ad(t,"POST","/v1/accounts:signInWithIdp",So(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const OI="http://localhost";class zr extends D0{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new zr(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):Pn("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=n,i=Id(n,["providerId","signInMethod"]);if(!r||!s)return null;const o=new zr(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Is(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,Is(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Is(e,n)}buildRequest(){const e={requestUri:OI,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=xo(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O0{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ao extends O0{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qn extends Ao{constructor(){super("facebook.com")}static credential(e){return zr._fromParams({providerId:qn.PROVIDER_ID,signInMethod:qn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return qn.credentialFromTaggedObject(e)}static credentialFromError(e){return qn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return qn.credential(e.oauthAccessToken)}catch{return null}}}qn.FACEBOOK_SIGN_IN_METHOD="facebook.com";qn.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kn extends Ao{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return zr._fromParams({providerId:Kn.PROVIDER_ID,signInMethod:Kn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Kn.credentialFromTaggedObject(e)}static credentialFromError(e){return Kn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return Kn.credential(n,r)}catch{return null}}}Kn.GOOGLE_SIGN_IN_METHOD="google.com";Kn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gn extends Ao{constructor(){super("github.com")}static credential(e){return zr._fromParams({providerId:Gn.PROVIDER_ID,signInMethod:Gn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Gn.credentialFromTaggedObject(e)}static credentialFromError(e){return Gn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Gn.credential(e.oauthAccessToken)}catch{return null}}}Gn.GITHUB_SIGN_IN_METHOD="github.com";Gn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qn extends Ao{constructor(){super("twitter.com")}static credential(e,n){return zr._fromParams({providerId:Qn.PROVIDER_ID,signInMethod:Qn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Qn.credentialFromTaggedObject(e)}static credentialFromError(e){return Qn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return Qn.credential(n,r)}catch{return null}}}Qn.TWITTER_SIGN_IN_METHOD="twitter.com";Qn.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function VI(t,e){return Ad(t,"POST","/v1/accounts:signUp",So(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,s=!1){const i=await wn._fromIdTokenResponse(e,r,s),o=zm(r);return new bn({user:i,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const s=zm(r);return new bn({user:e,providerId:s,_tokenResponse:r,operationType:n})}}function zm(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function LI(t){var e;if(nn(t.app))return Promise.reject(xn(t));const n=ko(t);if(await n._initializationPromise,!((e=n.currentUser)===null||e===void 0)&&e.isAnonymous)return new bn({user:n.currentUser,providerId:null,operationType:"signIn"});const r=await VI(n,{returnSecureToken:!0}),s=await bn._fromIdTokenResponse(n,"signIn",r,!0);return await n._updateCurrentUser(s.user),s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gl extends Ln{constructor(e,n,r,s){var i;super(n.code,n.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,gl.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,s){return new gl(e,n,r,s)}}function V0(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?gl._fromErrorAndOperation(t,i,e,r):i})}async function MI(t,e,n=!1){const r=await ao(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return bn._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jI(t,e,n=!1){const{auth:r}=t;if(nn(r.app))return Promise.reject(xn(r));const s="reauthenticate";try{const i=await ao(t,V0(r,s,e,t),n);se(i.idToken,r,"internal-error");const o=Cd(i.idToken);se(o,r,"internal-error");const{sub:l}=o;return se(t.uid===l,r,"user-mismatch"),bn._forOperation(t,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&Pn(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function FI(t,e,n=!1){if(nn(t.app))return Promise.reject(xn(t));const r="signIn",s=await V0(t,r,e),i=await bn._fromIdTokenResponse(t,r,s);return n||await t._updateCurrentUser(i.user),i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function UI(t,e){return Ad(t,"POST","/v1/accounts:signInWithCustomToken",So(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zI(t,e){if(nn(t.app))return Promise.reject(xn(t));const n=ko(t),r=await UI(n,{token:e,returnSecureToken:!0}),s=await bn._fromIdTokenResponse(n,"signIn",r);return await n._updateCurrentUser(s.user),s}function $I(t,e,n,r){return Bt(t).onIdTokenChanged(e,n,r)}function BI(t,e,n){return Bt(t).beforeAuthStateChanged(e,n)}function WI(t,e,n,r){return Bt(t).onAuthStateChanged(e,n,r)}const yl="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L0{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(yl,"1"),this.storage.removeItem(yl),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HI=1e3,qI=10;class M0 extends L0{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=P0(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),s=this.localCache[n];r!==s&&e(n,s,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,l,u)=>{this.notifyListeners(o,u)});return}const r=e.key;n?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);_I()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,qI):s()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},HI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}M0.type="LOCAL";const KI=M0;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j0 extends L0{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}j0.type="SESSION";const F0=j0;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function GI(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ql{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const r=new ql(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:s,data:i}=n.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const l=Array.from(o).map(async h=>h(n.origin,i)),u=await GI(l);n.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ql.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nd(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QI{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((l,u)=>{const h=Nd("",20);s.port1.start();const p=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(m){const y=m;if(y.data.eventId===h)switch(y.data.status){case"ack":clearTimeout(p),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),l(y.data.response);break;default:clearTimeout(p),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function an(){return window}function JI(t){an().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function U0(){return typeof an().WorkerGlobalScope<"u"&&typeof an().importScripts=="function"}async function YI(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function XI(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function ZI(){return U0()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const z0="firebaseLocalStorageDb",eS=1,vl="firebaseLocalStorage",$0="fbase_key";class Co{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Kl(t,e){return t.transaction([vl],e?"readwrite":"readonly").objectStore(vl)}function tS(){const t=indexedDB.deleteDatabase(z0);return new Co(t).toPromise()}function uh(){const t=indexedDB.open(z0,eS);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(vl,{keyPath:$0})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(vl)?e(r):(r.close(),await tS(),e(await uh()))})})}async function $m(t,e,n){const r=Kl(t,!0).put({[$0]:e,value:n});return new Co(r).toPromise()}async function nS(t,e){const n=Kl(t,!1).get(e),r=await new Co(n).toPromise();return r===void 0?null:r.value}function Bm(t,e){const n=Kl(t,!0).delete(e);return new Co(n).toPromise()}const rS=800,sS=3;class B0{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await uh(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>sS)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return U0()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ql._getInstance(ZI()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await YI(),!this.activeServiceWorker)return;this.sender=new QI(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||XI()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await uh();return await $m(e,yl,"1"),await Bm(e,yl),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>$m(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>nS(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Bm(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Kl(s,!1).getAll();return new Co(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),rS)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}B0.type="LOCAL";const iS=B0;new Io(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oS(t,e){return e?En(e):(se(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bd extends D0{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Is(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Is(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Is(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function aS(t){return FI(t.auth,new bd(t),t.bypassAuthState)}function lS(t){const{auth:e,user:n}=t;return se(n,e,"internal-error"),jI(n,new bd(t),t.bypassAuthState)}async function uS(t){const{auth:e,user:n}=t;return se(n,e,"internal-error"),MI(n,new bd(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W0{constructor(e,n,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:s,tenantId:i,error:o,type:l}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:n,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(u))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return aS;case"linkViaPopup":case"linkViaRedirect":return uS;case"reauthViaPopup":case"reauthViaRedirect":return lS;default:Pn(this.auth,"internal-error")}}resolve(e){Nn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Nn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cS=new Io(2e3,1e4);class ms extends W0{constructor(e,n,r,s,i){super(e,n,s,i),this.provider=r,this.authWindow=null,this.pollId=null,ms.currentPopupAction&&ms.currentPopupAction.cancel(),ms.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return se(e,this.auth,"internal-error"),e}async onExecution(){Nn(this.filter.length===1,"Popup operations only handle one event");const e=Nd();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(on(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(on(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,ms.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(on(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,cS.get())};e()}}ms.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hS="pendingRedirect",Oa=new Map;class dS extends W0{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=Oa.get(this.auth._key());if(!e){try{const r=await fS(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}Oa.set(this.auth._key(),e)}return this.bypassAuthState||Oa.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function fS(t,e){const n=gS(e),r=mS(t);if(!await r._isAvailable())return!1;const s=await r._get(n)==="true";return await r._remove(n),s}function pS(t,e){Oa.set(t._key(),e)}function mS(t){return En(t._redirectPersistence)}function gS(t){return Da(hS,t.config.apiKey,t.name)}async function yS(t,e,n=!1){if(nn(t.app))return Promise.reject(xn(t));const r=ko(t),s=oS(r,e),o=await new dS(r,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vS=10*60*1e3;class _S{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!wS(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!H0(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(on(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=vS&&this.cachedEventUids.clear(),this.cachedEventUids.has(Wm(e))}saveEventToCache(e){this.cachedEventUids.add(Wm(e)),this.lastProcessedEventTime=Date.now()}}function Wm(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function H0({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function wS(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return H0(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ES(t,e={}){return Gs(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TS=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,xS=/^https?/;async function IS(t){if(t.config.emulator)return;const{authorizedDomains:e}=await ES(t);for(const n of e)try{if(SS(n))return}catch{}Pn(t,"unauthorized-domain")}function SS(t){const e=ah(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!xS.test(n))return!1;if(TS.test(t))return r===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kS=new Io(3e4,6e4);function Hm(){const t=an().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function AS(t){return new Promise((e,n)=>{var r,s,i;function o(){Hm(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Hm(),n(on(t,"network-request-failed"))},timeout:kS.get()})}if(!((s=(r=an().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=an().gapi)===null||i===void 0)&&i.load)o();else{const l=CI("iframefcb");return an()[l]=()=>{gapi.load?o():n(on(t,"network-request-failed"))},kI(`${AI()}?onload=${l}`).catch(u=>n(u))}}).catch(e=>{throw Va=null,e})}let Va=null;function CS(t){return Va=Va||AS(t),Va}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RS=new Io(5e3,15e3),PS="__/auth/iframe",NS="emulator/auth/iframe",bS={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},DS=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function OS(t){const e=t.config;se(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?kd(e,NS):`https://${t.config.authDomain}/${PS}`,r={apiKey:e.apiKey,appName:t.name,v:Ks},s=DS.get(t.config.apiHost);s&&(r.eid=s);const i=t._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${xo(r).slice(1)}`}async function VS(t){const e=await CS(t),n=an().gapi;return se(n,t,"internal-error"),e.open({where:document.body,url:OS(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:bS,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=on(t,"network-request-failed"),l=an().setTimeout(()=>{i(o)},RS.get());function u(){an().clearTimeout(l),s(r)}r.ping(u).then(u,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const LS={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},MS=500,jS=600,FS="_blank",US="http://localhost";class qm{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function zS(t,e,n,r=MS,s=jS){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const u=Object.assign(Object.assign({},LS),{width:r.toString(),height:s.toString(),top:i,left:o}),h=mt().toLowerCase();n&&(l=S0(h)?FS:n),x0(h)&&(e=e||US,u.scrollbars="yes");const p=Object.entries(u).reduce((y,[w,A])=>`${y}${w}=${A},`,"");if(vI(h)&&l!=="_self")return $S(e||"",l),new qm(null);const m=window.open(e||"",l,p);se(m,t,"popup-blocked");try{m.focus()}catch{}return new qm(m)}function $S(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BS="__/auth/handler",WS="emulator/auth/handler",HS=encodeURIComponent("fac");async function Km(t,e,n,r,s,i){se(t.config.authDomain,t,"auth-domain-config-required"),se(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:Ks,eventId:s};if(e instanceof O0){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",BT(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[p,m]of Object.entries({}))o[p]=m}if(e instanceof Ao){const p=e.getScopes().filter(m=>m!=="");p.length>0&&(o.scopes=p.join(","))}t.tenantId&&(o.tid=t.tenantId);const l=o;for(const p of Object.keys(l))l[p]===void 0&&delete l[p];const u=await t._getAppCheckToken(),h=u?`#${HS}=${encodeURIComponent(u)}`:"";return`${qS(t)}?${xo(l).slice(1)}${h}`}function qS({config:t}){return t.emulator?kd(t,WS):`https://${t.authDomain}/${BS}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rc="webStorageSupport";class KS{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=F0,this._completeRedirectFn=yS,this._overrideRedirectResult=pS}async _openPopup(e,n,r,s){var i;Nn((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await Km(e,n,r,ah(),s);return zS(e,o,Nd())}async _openRedirect(e,n,r,s){await this._originValidation(e);const i=await Km(e,n,r,ah(),s);return JI(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:i}=this.eventManagers[n];return s?Promise.resolve(s):(Nn(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await VS(e),r=new _S(e);return n.register("authEvent",s=>(se(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(rc,{type:rc},s=>{var i;const o=(i=s==null?void 0:s[0])===null||i===void 0?void 0:i[rc];o!==void 0&&n(!!o),Pn(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=IS(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return P0()||I0()||Rd()}}const GS=KS;var Gm="@firebase/auth",Qm="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QS{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){se(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function JS(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function YS(t){Vs(new Ur("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:l}=r.options;se(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:o,authDomain:l,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:N0(t)},h=new II(r,s,i,u);return PI(h,n),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),Vs(new Ur("auth-internal",e=>{const n=ko(e.getProvider("auth").getImmediate());return(r=>new QS(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),ur(Gm,Qm,JS(t)),ur(Gm,Qm,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const XS=5*60,ZS=a0("authIdTokenMaxAge")||XS;let Jm=null;const ek=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>ZS)return;const s=n==null?void 0:n.token;Jm!==s&&(Jm=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function tk(t=h0()){const e=xd(t,"auth");if(e.isInitialized())return e.getImmediate();const n=RI(t,{popupRedirectResolver:GS,persistence:[iS,KI,F0]}),r=a0("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=ek(i.toString());BI(n,o,()=>o(n.currentUser)),$I(n,l=>o(l))}}const s=i0("auth");return s&&NI(n,`http://${s}`),n}function nk(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}SI({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=s=>{const i=on("internal-error");i.customData=s,n(i)},r.type="text/javascript",r.charset="UTF-8",nk().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});YS("Browser");var Ym=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Dr,q0;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(_,g){function x(){}x.prototype=g.prototype,_.D=g.prototype,_.prototype=new x,_.prototype.constructor=_,_.C=function(k,C,P){for(var S=Array(arguments.length-2),J=2;J<arguments.length;J++)S[J-2]=arguments[J];return g.prototype[C].apply(k,S)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(_,g,x){x||(x=0);var k=Array(16);if(typeof g=="string")for(var C=0;16>C;++C)k[C]=g.charCodeAt(x++)|g.charCodeAt(x++)<<8|g.charCodeAt(x++)<<16|g.charCodeAt(x++)<<24;else for(C=0;16>C;++C)k[C]=g[x++]|g[x++]<<8|g[x++]<<16|g[x++]<<24;g=_.g[0],x=_.g[1],C=_.g[2];var P=_.g[3],S=g+(P^x&(C^P))+k[0]+3614090360&4294967295;g=x+(S<<7&4294967295|S>>>25),S=P+(C^g&(x^C))+k[1]+3905402710&4294967295,P=g+(S<<12&4294967295|S>>>20),S=C+(x^P&(g^x))+k[2]+606105819&4294967295,C=P+(S<<17&4294967295|S>>>15),S=x+(g^C&(P^g))+k[3]+3250441966&4294967295,x=C+(S<<22&4294967295|S>>>10),S=g+(P^x&(C^P))+k[4]+4118548399&4294967295,g=x+(S<<7&4294967295|S>>>25),S=P+(C^g&(x^C))+k[5]+1200080426&4294967295,P=g+(S<<12&4294967295|S>>>20),S=C+(x^P&(g^x))+k[6]+2821735955&4294967295,C=P+(S<<17&4294967295|S>>>15),S=x+(g^C&(P^g))+k[7]+4249261313&4294967295,x=C+(S<<22&4294967295|S>>>10),S=g+(P^x&(C^P))+k[8]+1770035416&4294967295,g=x+(S<<7&4294967295|S>>>25),S=P+(C^g&(x^C))+k[9]+2336552879&4294967295,P=g+(S<<12&4294967295|S>>>20),S=C+(x^P&(g^x))+k[10]+4294925233&4294967295,C=P+(S<<17&4294967295|S>>>15),S=x+(g^C&(P^g))+k[11]+2304563134&4294967295,x=C+(S<<22&4294967295|S>>>10),S=g+(P^x&(C^P))+k[12]+1804603682&4294967295,g=x+(S<<7&4294967295|S>>>25),S=P+(C^g&(x^C))+k[13]+4254626195&4294967295,P=g+(S<<12&4294967295|S>>>20),S=C+(x^P&(g^x))+k[14]+2792965006&4294967295,C=P+(S<<17&4294967295|S>>>15),S=x+(g^C&(P^g))+k[15]+1236535329&4294967295,x=C+(S<<22&4294967295|S>>>10),S=g+(C^P&(x^C))+k[1]+4129170786&4294967295,g=x+(S<<5&4294967295|S>>>27),S=P+(x^C&(g^x))+k[6]+3225465664&4294967295,P=g+(S<<9&4294967295|S>>>23),S=C+(g^x&(P^g))+k[11]+643717713&4294967295,C=P+(S<<14&4294967295|S>>>18),S=x+(P^g&(C^P))+k[0]+3921069994&4294967295,x=C+(S<<20&4294967295|S>>>12),S=g+(C^P&(x^C))+k[5]+3593408605&4294967295,g=x+(S<<5&4294967295|S>>>27),S=P+(x^C&(g^x))+k[10]+38016083&4294967295,P=g+(S<<9&4294967295|S>>>23),S=C+(g^x&(P^g))+k[15]+3634488961&4294967295,C=P+(S<<14&4294967295|S>>>18),S=x+(P^g&(C^P))+k[4]+3889429448&4294967295,x=C+(S<<20&4294967295|S>>>12),S=g+(C^P&(x^C))+k[9]+568446438&4294967295,g=x+(S<<5&4294967295|S>>>27),S=P+(x^C&(g^x))+k[14]+3275163606&4294967295,P=g+(S<<9&4294967295|S>>>23),S=C+(g^x&(P^g))+k[3]+4107603335&4294967295,C=P+(S<<14&4294967295|S>>>18),S=x+(P^g&(C^P))+k[8]+1163531501&4294967295,x=C+(S<<20&4294967295|S>>>12),S=g+(C^P&(x^C))+k[13]+2850285829&4294967295,g=x+(S<<5&4294967295|S>>>27),S=P+(x^C&(g^x))+k[2]+4243563512&4294967295,P=g+(S<<9&4294967295|S>>>23),S=C+(g^x&(P^g))+k[7]+1735328473&4294967295,C=P+(S<<14&4294967295|S>>>18),S=x+(P^g&(C^P))+k[12]+2368359562&4294967295,x=C+(S<<20&4294967295|S>>>12),S=g+(x^C^P)+k[5]+4294588738&4294967295,g=x+(S<<4&4294967295|S>>>28),S=P+(g^x^C)+k[8]+2272392833&4294967295,P=g+(S<<11&4294967295|S>>>21),S=C+(P^g^x)+k[11]+1839030562&4294967295,C=P+(S<<16&4294967295|S>>>16),S=x+(C^P^g)+k[14]+4259657740&4294967295,x=C+(S<<23&4294967295|S>>>9),S=g+(x^C^P)+k[1]+2763975236&4294967295,g=x+(S<<4&4294967295|S>>>28),S=P+(g^x^C)+k[4]+1272893353&4294967295,P=g+(S<<11&4294967295|S>>>21),S=C+(P^g^x)+k[7]+4139469664&4294967295,C=P+(S<<16&4294967295|S>>>16),S=x+(C^P^g)+k[10]+3200236656&4294967295,x=C+(S<<23&4294967295|S>>>9),S=g+(x^C^P)+k[13]+681279174&4294967295,g=x+(S<<4&4294967295|S>>>28),S=P+(g^x^C)+k[0]+3936430074&4294967295,P=g+(S<<11&4294967295|S>>>21),S=C+(P^g^x)+k[3]+3572445317&4294967295,C=P+(S<<16&4294967295|S>>>16),S=x+(C^P^g)+k[6]+76029189&4294967295,x=C+(S<<23&4294967295|S>>>9),S=g+(x^C^P)+k[9]+3654602809&4294967295,g=x+(S<<4&4294967295|S>>>28),S=P+(g^x^C)+k[12]+3873151461&4294967295,P=g+(S<<11&4294967295|S>>>21),S=C+(P^g^x)+k[15]+530742520&4294967295,C=P+(S<<16&4294967295|S>>>16),S=x+(C^P^g)+k[2]+3299628645&4294967295,x=C+(S<<23&4294967295|S>>>9),S=g+(C^(x|~P))+k[0]+4096336452&4294967295,g=x+(S<<6&4294967295|S>>>26),S=P+(x^(g|~C))+k[7]+1126891415&4294967295,P=g+(S<<10&4294967295|S>>>22),S=C+(g^(P|~x))+k[14]+2878612391&4294967295,C=P+(S<<15&4294967295|S>>>17),S=x+(P^(C|~g))+k[5]+4237533241&4294967295,x=C+(S<<21&4294967295|S>>>11),S=g+(C^(x|~P))+k[12]+1700485571&4294967295,g=x+(S<<6&4294967295|S>>>26),S=P+(x^(g|~C))+k[3]+2399980690&4294967295,P=g+(S<<10&4294967295|S>>>22),S=C+(g^(P|~x))+k[10]+4293915773&4294967295,C=P+(S<<15&4294967295|S>>>17),S=x+(P^(C|~g))+k[1]+2240044497&4294967295,x=C+(S<<21&4294967295|S>>>11),S=g+(C^(x|~P))+k[8]+1873313359&4294967295,g=x+(S<<6&4294967295|S>>>26),S=P+(x^(g|~C))+k[15]+4264355552&4294967295,P=g+(S<<10&4294967295|S>>>22),S=C+(g^(P|~x))+k[6]+2734768916&4294967295,C=P+(S<<15&4294967295|S>>>17),S=x+(P^(C|~g))+k[13]+1309151649&4294967295,x=C+(S<<21&4294967295|S>>>11),S=g+(C^(x|~P))+k[4]+4149444226&4294967295,g=x+(S<<6&4294967295|S>>>26),S=P+(x^(g|~C))+k[11]+3174756917&4294967295,P=g+(S<<10&4294967295|S>>>22),S=C+(g^(P|~x))+k[2]+718787259&4294967295,C=P+(S<<15&4294967295|S>>>17),S=x+(P^(C|~g))+k[9]+3951481745&4294967295,_.g[0]=_.g[0]+g&4294967295,_.g[1]=_.g[1]+(C+(S<<21&4294967295|S>>>11))&4294967295,_.g[2]=_.g[2]+C&4294967295,_.g[3]=_.g[3]+P&4294967295}r.prototype.u=function(_,g){g===void 0&&(g=_.length);for(var x=g-this.blockSize,k=this.B,C=this.h,P=0;P<g;){if(C==0)for(;P<=x;)s(this,_,P),P+=this.blockSize;if(typeof _=="string"){for(;P<g;)if(k[C++]=_.charCodeAt(P++),C==this.blockSize){s(this,k),C=0;break}}else for(;P<g;)if(k[C++]=_[P++],C==this.blockSize){s(this,k),C=0;break}}this.h=C,this.o+=g},r.prototype.v=function(){var _=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);_[0]=128;for(var g=1;g<_.length-8;++g)_[g]=0;var x=8*this.o;for(g=_.length-8;g<_.length;++g)_[g]=x&255,x/=256;for(this.u(_),_=Array(16),g=x=0;4>g;++g)for(var k=0;32>k;k+=8)_[x++]=this.g[g]>>>k&255;return _};function i(_,g){var x=l;return Object.prototype.hasOwnProperty.call(x,_)?x[_]:x[_]=g(_)}function o(_,g){this.h=g;for(var x=[],k=!0,C=_.length-1;0<=C;C--){var P=_[C]|0;k&&P==g||(x[C]=P,k=!1)}this.g=x}var l={};function u(_){return-128<=_&&128>_?i(_,function(g){return new o([g|0],0>g?-1:0)}):new o([_|0],0>_?-1:0)}function h(_){if(isNaN(_)||!isFinite(_))return m;if(0>_)return V(h(-_));for(var g=[],x=1,k=0;_>=x;k++)g[k]=_/x|0,x*=4294967296;return new o(g,0)}function p(_,g){if(_.length==0)throw Error("number format error: empty string");if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(_.charAt(0)=="-")return V(p(_.substring(1),g));if(0<=_.indexOf("-"))throw Error('number format error: interior "-" character');for(var x=h(Math.pow(g,8)),k=m,C=0;C<_.length;C+=8){var P=Math.min(8,_.length-C),S=parseInt(_.substring(C,C+P),g);8>P?(P=h(Math.pow(g,P)),k=k.j(P).add(h(S))):(k=k.j(x),k=k.add(h(S)))}return k}var m=u(0),y=u(1),w=u(16777216);t=o.prototype,t.m=function(){if(R(this))return-V(this).m();for(var _=0,g=1,x=0;x<this.g.length;x++){var k=this.i(x);_+=(0<=k?k:4294967296+k)*g,g*=4294967296}return _},t.toString=function(_){if(_=_||10,2>_||36<_)throw Error("radix out of range: "+_);if(A(this))return"0";if(R(this))return"-"+V(this).toString(_);for(var g=h(Math.pow(_,6)),x=this,k="";;){var C=D(x,g).g;x=T(x,C.j(g));var P=((0<x.g.length?x.g[0]:x.h)>>>0).toString(_);if(x=C,A(x))return P+k;for(;6>P.length;)P="0"+P;k=P+k}},t.i=function(_){return 0>_?0:_<this.g.length?this.g[_]:this.h};function A(_){if(_.h!=0)return!1;for(var g=0;g<_.g.length;g++)if(_.g[g]!=0)return!1;return!0}function R(_){return _.h==-1}t.l=function(_){return _=T(this,_),R(_)?-1:A(_)?0:1};function V(_){for(var g=_.g.length,x=[],k=0;k<g;k++)x[k]=~_.g[k];return new o(x,~_.h).add(y)}t.abs=function(){return R(this)?V(this):this},t.add=function(_){for(var g=Math.max(this.g.length,_.g.length),x=[],k=0,C=0;C<=g;C++){var P=k+(this.i(C)&65535)+(_.i(C)&65535),S=(P>>>16)+(this.i(C)>>>16)+(_.i(C)>>>16);k=S>>>16,P&=65535,S&=65535,x[C]=S<<16|P}return new o(x,x[x.length-1]&-2147483648?-1:0)};function T(_,g){return _.add(V(g))}t.j=function(_){if(A(this)||A(_))return m;if(R(this))return R(_)?V(this).j(V(_)):V(V(this).j(_));if(R(_))return V(this.j(V(_)));if(0>this.l(w)&&0>_.l(w))return h(this.m()*_.m());for(var g=this.g.length+_.g.length,x=[],k=0;k<2*g;k++)x[k]=0;for(k=0;k<this.g.length;k++)for(var C=0;C<_.g.length;C++){var P=this.i(k)>>>16,S=this.i(k)&65535,J=_.i(C)>>>16,Ae=_.i(C)&65535;x[2*k+2*C]+=S*Ae,E(x,2*k+2*C),x[2*k+2*C+1]+=P*Ae,E(x,2*k+2*C+1),x[2*k+2*C+1]+=S*J,E(x,2*k+2*C+1),x[2*k+2*C+2]+=P*J,E(x,2*k+2*C+2)}for(k=0;k<g;k++)x[k]=x[2*k+1]<<16|x[2*k];for(k=g;k<2*g;k++)x[k]=0;return new o(x,0)};function E(_,g){for(;(_[g]&65535)!=_[g];)_[g+1]+=_[g]>>>16,_[g]&=65535,g++}function I(_,g){this.g=_,this.h=g}function D(_,g){if(A(g))throw Error("division by zero");if(A(_))return new I(m,m);if(R(_))return g=D(V(_),g),new I(V(g.g),V(g.h));if(R(g))return g=D(_,V(g)),new I(V(g.g),g.h);if(30<_.g.length){if(R(_)||R(g))throw Error("slowDivide_ only works with positive integers.");for(var x=y,k=g;0>=k.l(_);)x=L(x),k=L(k);var C=N(x,1),P=N(k,1);for(k=N(k,2),x=N(x,2);!A(k);){var S=P.add(k);0>=S.l(_)&&(C=C.add(x),P=S),k=N(k,1),x=N(x,1)}return g=T(_,C.j(g)),new I(C,g)}for(C=m;0<=_.l(g);){for(x=Math.max(1,Math.floor(_.m()/g.m())),k=Math.ceil(Math.log(x)/Math.LN2),k=48>=k?1:Math.pow(2,k-48),P=h(x),S=P.j(g);R(S)||0<S.l(_);)x-=k,P=h(x),S=P.j(g);A(P)&&(P=y),C=C.add(P),_=T(_,S)}return new I(C,_)}t.A=function(_){return D(this,_).h},t.and=function(_){for(var g=Math.max(this.g.length,_.g.length),x=[],k=0;k<g;k++)x[k]=this.i(k)&_.i(k);return new o(x,this.h&_.h)},t.or=function(_){for(var g=Math.max(this.g.length,_.g.length),x=[],k=0;k<g;k++)x[k]=this.i(k)|_.i(k);return new o(x,this.h|_.h)},t.xor=function(_){for(var g=Math.max(this.g.length,_.g.length),x=[],k=0;k<g;k++)x[k]=this.i(k)^_.i(k);return new o(x,this.h^_.h)};function L(_){for(var g=_.g.length+1,x=[],k=0;k<g;k++)x[k]=_.i(k)<<1|_.i(k-1)>>>31;return new o(x,_.h)}function N(_,g){var x=g>>5;g%=32;for(var k=_.g.length-x,C=[],P=0;P<k;P++)C[P]=0<g?_.i(P+x)>>>g|_.i(P+x+1)<<32-g:_.i(P+x);return new o(C,_.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,q0=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=p,Dr=o}).apply(typeof Ym<"u"?Ym:typeof self<"u"?self:typeof window<"u"?window:{});var ma=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var K0,Si,G0,La,ch,Q0,J0,Y0;(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,c,d){return a==Array.prototype||a==Object.prototype||(a[c]=d.value),a};function n(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof ma=="object"&&ma];for(var c=0;c<a.length;++c){var d=a[c];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=n(this);function s(a,c){if(c)e:{var d=r;a=a.split(".");for(var v=0;v<a.length-1;v++){var b=a[v];if(!(b in d))break e;d=d[b]}a=a[a.length-1],v=d[a],c=c(v),c!=v&&c!=null&&e(d,a,{configurable:!0,writable:!0,value:c})}}function i(a,c){a instanceof String&&(a+="");var d=0,v=!1,b={next:function(){if(!v&&d<a.length){var O=d++;return{value:c(O,a[O]),done:!1}}return v=!0,{done:!0,value:void 0}}};return b[Symbol.iterator]=function(){return b},b}s("Array.prototype.values",function(a){return a||function(){return i(this,function(c,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},l=this||self;function u(a){var c=typeof a;return c=c!="object"?c:a?Array.isArray(a)?"array":c:"null",c=="array"||c=="object"&&typeof a.length=="number"}function h(a){var c=typeof a;return c=="object"&&a!=null||c=="function"}function p(a,c,d){return a.call.apply(a.bind,arguments)}function m(a,c,d){if(!a)throw Error();if(2<arguments.length){var v=Array.prototype.slice.call(arguments,2);return function(){var b=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(b,v),a.apply(c,b)}}return function(){return a.apply(c,arguments)}}function y(a,c,d){return y=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?p:m,y.apply(null,arguments)}function w(a,c){var d=Array.prototype.slice.call(arguments,1);return function(){var v=d.slice();return v.push.apply(v,arguments),a.apply(this,v)}}function A(a,c){function d(){}d.prototype=c.prototype,a.aa=c.prototype,a.prototype=new d,a.prototype.constructor=a,a.Qb=function(v,b,O){for(var B=Array(arguments.length-2),Se=2;Se<arguments.length;Se++)B[Se-2]=arguments[Se];return c.prototype[b].apply(v,B)}}function R(a){const c=a.length;if(0<c){const d=Array(c);for(let v=0;v<c;v++)d[v]=a[v];return d}return[]}function V(a,c){for(let d=1;d<arguments.length;d++){const v=arguments[d];if(u(v)){const b=a.length||0,O=v.length||0;a.length=b+O;for(let B=0;B<O;B++)a[b+B]=v[B]}else a.push(v)}}class T{constructor(c,d){this.i=c,this.j=d,this.h=0,this.g=null}get(){let c;return 0<this.h?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function E(a){return/^[\s\xa0]*$/.test(a)}function I(){var a=l.navigator;return a&&(a=a.userAgent)?a:""}function D(a){return D[" "](a),a}D[" "]=function(){};var L=I().indexOf("Gecko")!=-1&&!(I().toLowerCase().indexOf("webkit")!=-1&&I().indexOf("Edge")==-1)&&!(I().indexOf("Trident")!=-1||I().indexOf("MSIE")!=-1)&&I().indexOf("Edge")==-1;function N(a,c,d){for(const v in a)c.call(d,a[v],v,a)}function _(a,c){for(const d in a)c.call(void 0,a[d],d,a)}function g(a){const c={};for(const d in a)c[d]=a[d];return c}const x="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function k(a,c){let d,v;for(let b=1;b<arguments.length;b++){v=arguments[b];for(d in v)a[d]=v[d];for(let O=0;O<x.length;O++)d=x[O],Object.prototype.hasOwnProperty.call(v,d)&&(a[d]=v[d])}}function C(a){var c=1;a=a.split(":");const d=[];for(;0<c&&a.length;)d.push(a.shift()),c--;return a.length&&d.push(a.join(":")),d}function P(a){l.setTimeout(()=>{throw a},0)}function S(){var a=Y;let c=null;return a.g&&(c=a.g,a.g=a.g.next,a.g||(a.h=null),c.next=null),c}class J{constructor(){this.h=this.g=null}add(c,d){const v=Ae.get();v.set(c,d),this.h?this.h.next=v:this.g=v,this.h=v}}var Ae=new T(()=>new ue,a=>a.reset());class ue{constructor(){this.next=this.g=this.h=null}set(c,d){this.h=c,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let me,z=!1,Y=new J,X=()=>{const a=l.Promise.resolve(void 0);me=()=>{a.then(de)}};var de=()=>{for(var a;a=S();){try{a.h.call(a.g)}catch(d){P(d)}var c=Ae;c.j(a),100>c.h&&(c.h++,a.next=c.g,c.g=a)}z=!1};function le(){this.s=this.s,this.C=this.C}le.prototype.s=!1,le.prototype.ma=function(){this.s||(this.s=!0,this.N())},le.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function ve(a,c){this.type=a,this.g=this.target=c,this.defaultPrevented=!1}ve.prototype.h=function(){this.defaultPrevented=!0};var $=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var a=!1,c=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const d=()=>{};l.addEventListener("test",d,c),l.removeEventListener("test",d,c)}catch{}return a}();function Z(a,c){if(ve.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var d=this.type=a.type,v=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=c,c=a.relatedTarget){if(L){e:{try{D(c.nodeName);var b=!0;break e}catch{}b=!1}b||(c=null)}}else d=="mouseover"?c=a.fromElement:d=="mouseout"&&(c=a.toElement);this.relatedTarget=c,v?(this.clientX=v.clientX!==void 0?v.clientX:v.pageX,this.clientY=v.clientY!==void 0?v.clientY:v.pageY,this.screenX=v.screenX||0,this.screenY=v.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:Ce[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&Z.aa.h.call(this)}}A(Z,ve);var Ce={2:"touch",3:"pen",4:"mouse"};Z.prototype.h=function(){Z.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var ce="closure_listenable_"+(1e6*Math.random()|0),G=0;function Q(a,c,d,v,b){this.listener=a,this.proxy=null,this.src=c,this.type=d,this.capture=!!v,this.ha=b,this.key=++G,this.da=this.fa=!1}function U(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function q(a){this.src=a,this.g={},this.h=0}q.prototype.add=function(a,c,d,v,b){var O=a.toString();a=this.g[O],a||(a=this.g[O]=[],this.h++);var B=re(a,c,v,b);return-1<B?(c=a[B],d||(c.fa=!1)):(c=new Q(c,this.src,O,!!v,b),c.fa=d,a.push(c)),c};function Ee(a,c){var d=c.type;if(d in a.g){var v=a.g[d],b=Array.prototype.indexOf.call(v,c,void 0),O;(O=0<=b)&&Array.prototype.splice.call(v,b,1),O&&(U(c),a.g[d].length==0&&(delete a.g[d],a.h--))}}function re(a,c,d,v){for(var b=0;b<a.length;++b){var O=a[b];if(!O.da&&O.listener==c&&O.capture==!!d&&O.ha==v)return b}return-1}var Ie="closure_lm_"+(1e6*Math.random()|0),Ot={};function dn(a,c,d,v,b){if(Array.isArray(c)){for(var O=0;O<c.length;O++)dn(a,c[O],d,v,b);return null}return d=_f(d),a&&a[ce]?a.K(c,d,h(v)?!!v.capture:!1,b):ww(a,c,d,!1,v,b)}function ww(a,c,d,v,b,O){if(!c)throw Error("Invalid event type");var B=h(b)?!!b.capture:!!b,Se=au(a);if(Se||(a[Ie]=Se=new q(a)),d=Se.add(c,d,v,B,O),d.proxy)return d;if(v=Ew(),d.proxy=v,v.src=a,v.listener=d,a.addEventListener)$||(b=B),b===void 0&&(b=!1),a.addEventListener(c.toString(),v,b);else if(a.attachEvent)a.attachEvent(vf(c.toString()),v);else if(a.addListener&&a.removeListener)a.addListener(v);else throw Error("addEventListener and attachEvent are unavailable.");return d}function Ew(){function a(d){return c.call(a.src,a.listener,d)}const c=Tw;return a}function yf(a,c,d,v,b){if(Array.isArray(c))for(var O=0;O<c.length;O++)yf(a,c[O],d,v,b);else v=h(v)?!!v.capture:!!v,d=_f(d),a&&a[ce]?(a=a.i,c=String(c).toString(),c in a.g&&(O=a.g[c],d=re(O,d,v,b),-1<d&&(U(O[d]),Array.prototype.splice.call(O,d,1),O.length==0&&(delete a.g[c],a.h--)))):a&&(a=au(a))&&(c=a.g[c.toString()],a=-1,c&&(a=re(c,d,v,b)),(d=-1<a?c[a]:null)&&ou(d))}function ou(a){if(typeof a!="number"&&a&&!a.da){var c=a.src;if(c&&c[ce])Ee(c.i,a);else{var d=a.type,v=a.proxy;c.removeEventListener?c.removeEventListener(d,v,a.capture):c.detachEvent?c.detachEvent(vf(d),v):c.addListener&&c.removeListener&&c.removeListener(v),(d=au(c))?(Ee(d,a),d.h==0&&(d.src=null,c[Ie]=null)):U(a)}}}function vf(a){return a in Ot?Ot[a]:Ot[a]="on"+a}function Tw(a,c){if(a.da)a=!0;else{c=new Z(c,this);var d=a.listener,v=a.ha||a.src;a.fa&&ou(a),a=d.call(v,c)}return a}function au(a){return a=a[Ie],a instanceof q?a:null}var lu="__closure_events_fn_"+(1e9*Math.random()>>>0);function _f(a){return typeof a=="function"?a:(a[lu]||(a[lu]=function(c){return a.handleEvent(c)}),a[lu])}function it(){le.call(this),this.i=new q(this),this.M=this,this.F=null}A(it,le),it.prototype[ce]=!0,it.prototype.removeEventListener=function(a,c,d,v){yf(this,a,c,d,v)};function gt(a,c){var d,v=a.F;if(v)for(d=[];v;v=v.F)d.push(v);if(a=a.M,v=c.type||c,typeof c=="string")c=new ve(c,a);else if(c instanceof ve)c.target=c.target||a;else{var b=c;c=new ve(v,a),k(c,b)}if(b=!0,d)for(var O=d.length-1;0<=O;O--){var B=c.g=d[O];b=Vo(B,v,!0,c)&&b}if(B=c.g=a,b=Vo(B,v,!0,c)&&b,b=Vo(B,v,!1,c)&&b,d)for(O=0;O<d.length;O++)B=c.g=d[O],b=Vo(B,v,!1,c)&&b}it.prototype.N=function(){if(it.aa.N.call(this),this.i){var a=this.i,c;for(c in a.g){for(var d=a.g[c],v=0;v<d.length;v++)U(d[v]);delete a.g[c],a.h--}}this.F=null},it.prototype.K=function(a,c,d,v){return this.i.add(String(a),c,!1,d,v)},it.prototype.L=function(a,c,d,v){return this.i.add(String(a),c,!0,d,v)};function Vo(a,c,d,v){if(c=a.i.g[String(c)],!c)return!0;c=c.concat();for(var b=!0,O=0;O<c.length;++O){var B=c[O];if(B&&!B.da&&B.capture==d){var Se=B.listener,Ye=B.ha||B.src;B.fa&&Ee(a.i,B),b=Se.call(Ye,v)!==!1&&b}}return b&&!v.defaultPrevented}function wf(a,c,d){if(typeof a=="function")d&&(a=y(a,d));else if(a&&typeof a.handleEvent=="function")a=y(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(c)?-1:l.setTimeout(a,c||0)}function Ef(a){a.g=wf(()=>{a.g=null,a.i&&(a.i=!1,Ef(a))},a.l);const c=a.h;a.h=null,a.m.apply(null,c)}class xw extends le{constructor(c,d){super(),this.m=c,this.l=d,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:Ef(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Zs(a){le.call(this),this.h=a,this.g={}}A(Zs,le);var Tf=[];function xf(a){N(a.g,function(c,d){this.g.hasOwnProperty(d)&&ou(c)},a),a.g={}}Zs.prototype.N=function(){Zs.aa.N.call(this),xf(this)},Zs.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var uu=l.JSON.stringify,Iw=l.JSON.parse,Sw=class{stringify(a){return l.JSON.stringify(a,void 0)}parse(a){return l.JSON.parse(a,void 0)}};function cu(){}cu.prototype.h=null;function If(a){return a.h||(a.h=a.i())}function Sf(){}var ei={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function hu(){ve.call(this,"d")}A(hu,ve);function du(){ve.call(this,"c")}A(du,ve);var _r={},kf=null;function Lo(){return kf=kf||new it}_r.La="serverreachability";function Af(a){ve.call(this,_r.La,a)}A(Af,ve);function ti(a){const c=Lo();gt(c,new Af(c))}_r.STAT_EVENT="statevent";function Cf(a,c){ve.call(this,_r.STAT_EVENT,a),this.stat=c}A(Cf,ve);function yt(a){const c=Lo();gt(c,new Cf(c,a))}_r.Ma="timingevent";function Rf(a,c){ve.call(this,_r.Ma,a),this.size=c}A(Rf,ve);function ni(a,c){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){a()},c)}function ri(){this.g=!0}ri.prototype.xa=function(){this.g=!1};function kw(a,c,d,v,b,O){a.info(function(){if(a.g)if(O)for(var B="",Se=O.split("&"),Ye=0;Ye<Se.length;Ye++){var _e=Se[Ye].split("=");if(1<_e.length){var ot=_e[0];_e=_e[1];var at=ot.split("_");B=2<=at.length&&at[1]=="type"?B+(ot+"="+_e+"&"):B+(ot+"=redacted&")}}else B=null;else B=O;return"XMLHTTP REQ ("+v+") [attempt "+b+"]: "+c+`
`+d+`
`+B})}function Aw(a,c,d,v,b,O,B){a.info(function(){return"XMLHTTP RESP ("+v+") [ attempt "+b+"]: "+c+`
`+d+`
`+O+" "+B})}function Qr(a,c,d,v){a.info(function(){return"XMLHTTP TEXT ("+c+"): "+Rw(a,d)+(v?" "+v:"")})}function Cw(a,c){a.info(function(){return"TIMEOUT: "+c})}ri.prototype.info=function(){};function Rw(a,c){if(!a.g)return c;if(!c)return null;try{var d=JSON.parse(c);if(d){for(a=0;a<d.length;a++)if(Array.isArray(d[a])){var v=d[a];if(!(2>v.length)){var b=v[1];if(Array.isArray(b)&&!(1>b.length)){var O=b[0];if(O!="noop"&&O!="stop"&&O!="close")for(var B=1;B<b.length;B++)b[B]=""}}}}return uu(d)}catch{return c}}var Mo={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Pf={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},fu;function jo(){}A(jo,cu),jo.prototype.g=function(){return new XMLHttpRequest},jo.prototype.i=function(){return{}},fu=new jo;function Mn(a,c,d,v){this.j=a,this.i=c,this.l=d,this.R=v||1,this.U=new Zs(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Nf}function Nf(){this.i=null,this.g="",this.h=!1}var bf={},pu={};function mu(a,c,d){a.L=1,a.v=$o(fn(c)),a.m=d,a.P=!0,Df(a,null)}function Df(a,c){a.F=Date.now(),Fo(a),a.A=fn(a.v);var d=a.A,v=a.R;Array.isArray(v)||(v=[String(v)]),Kf(d.i,"t",v),a.C=0,d=a.j.J,a.h=new Nf,a.g=hp(a.j,d?c:null,!a.m),0<a.O&&(a.M=new xw(y(a.Y,a,a.g),a.O)),c=a.U,d=a.g,v=a.ca;var b="readystatechange";Array.isArray(b)||(b&&(Tf[0]=b.toString()),b=Tf);for(var O=0;O<b.length;O++){var B=dn(d,b[O],v||c.handleEvent,!1,c.h||c);if(!B)break;c.g[B.key]=B}c=a.H?g(a.H):{},a.m?(a.u||(a.u="POST"),c["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,c)):(a.u="GET",a.g.ea(a.A,a.u,null,c)),ti(),kw(a.i,a.u,a.A,a.l,a.R,a.m)}Mn.prototype.ca=function(a){a=a.target;const c=this.M;c&&pn(a)==3?c.j():this.Y(a)},Mn.prototype.Y=function(a){try{if(a==this.g)e:{const at=pn(this.g);var c=this.g.Ba();const Xr=this.g.Z();if(!(3>at)&&(at!=3||this.g&&(this.h.h||this.g.oa()||ep(this.g)))){this.J||at!=4||c==7||(c==8||0>=Xr?ti(3):ti(2)),gu(this);var d=this.g.Z();this.X=d;t:if(Of(this)){var v=ep(this.g);a="";var b=v.length,O=pn(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){wr(this),si(this);var B="";break t}this.h.i=new l.TextDecoder}for(c=0;c<b;c++)this.h.h=!0,a+=this.h.i.decode(v[c],{stream:!(O&&c==b-1)});v.length=0,this.h.g+=a,this.C=0,B=this.h.g}else B=this.g.oa();if(this.o=d==200,Aw(this.i,this.u,this.A,this.l,this.R,at,d),this.o){if(this.T&&!this.K){t:{if(this.g){var Se,Ye=this.g;if((Se=Ye.g?Ye.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!E(Se)){var _e=Se;break t}}_e=null}if(d=_e)Qr(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,yu(this,d);else{this.o=!1,this.s=3,yt(12),wr(this),si(this);break e}}if(this.P){d=!0;let Wt;for(;!this.J&&this.C<B.length;)if(Wt=Pw(this,B),Wt==pu){at==4&&(this.s=4,yt(14),d=!1),Qr(this.i,this.l,null,"[Incomplete Response]");break}else if(Wt==bf){this.s=4,yt(15),Qr(this.i,this.l,B,"[Invalid Chunk]"),d=!1;break}else Qr(this.i,this.l,Wt,null),yu(this,Wt);if(Of(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),at!=4||B.length!=0||this.h.h||(this.s=1,yt(16),d=!1),this.o=this.o&&d,!d)Qr(this.i,this.l,B,"[Invalid Chunked Response]"),wr(this),si(this);else if(0<B.length&&!this.W){this.W=!0;var ot=this.j;ot.g==this&&ot.ba&&!ot.M&&(ot.j.info("Great, no buffering proxy detected. Bytes received: "+B.length),xu(ot),ot.M=!0,yt(11))}}else Qr(this.i,this.l,B,null),yu(this,B);at==4&&wr(this),this.o&&!this.J&&(at==4?ap(this.j,this):(this.o=!1,Fo(this)))}else Kw(this.g),d==400&&0<B.indexOf("Unknown SID")?(this.s=3,yt(12)):(this.s=0,yt(13)),wr(this),si(this)}}}catch{}finally{}};function Of(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function Pw(a,c){var d=a.C,v=c.indexOf(`
`,d);return v==-1?pu:(d=Number(c.substring(d,v)),isNaN(d)?bf:(v+=1,v+d>c.length?pu:(c=c.slice(v,v+d),a.C=v+d,c)))}Mn.prototype.cancel=function(){this.J=!0,wr(this)};function Fo(a){a.S=Date.now()+a.I,Vf(a,a.I)}function Vf(a,c){if(a.B!=null)throw Error("WatchDog timer not null");a.B=ni(y(a.ba,a),c)}function gu(a){a.B&&(l.clearTimeout(a.B),a.B=null)}Mn.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(Cw(this.i,this.A),this.L!=2&&(ti(),yt(17)),wr(this),this.s=2,si(this)):Vf(this,this.S-a)};function si(a){a.j.G==0||a.J||ap(a.j,a)}function wr(a){gu(a);var c=a.M;c&&typeof c.ma=="function"&&c.ma(),a.M=null,xf(a.U),a.g&&(c=a.g,a.g=null,c.abort(),c.ma())}function yu(a,c){try{var d=a.j;if(d.G!=0&&(d.g==a||vu(d.h,a))){if(!a.K&&vu(d.h,a)&&d.G==3){try{var v=d.Da.g.parse(c)}catch{v=null}if(Array.isArray(v)&&v.length==3){var b=v;if(b[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<a.F)Go(d),qo(d);else break e;Tu(d),yt(18)}}else d.za=b[1],0<d.za-d.T&&37500>b[2]&&d.F&&d.v==0&&!d.C&&(d.C=ni(y(d.Za,d),6e3));if(1>=jf(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else Tr(d,11)}else if((a.K||d.g==a)&&Go(d),!E(c))for(b=d.Da.g.parse(c),c=0;c<b.length;c++){let _e=b[c];if(d.T=_e[0],_e=_e[1],d.G==2)if(_e[0]=="c"){d.K=_e[1],d.ia=_e[2];const ot=_e[3];ot!=null&&(d.la=ot,d.j.info("VER="+d.la));const at=_e[4];at!=null&&(d.Aa=at,d.j.info("SVER="+d.Aa));const Xr=_e[5];Xr!=null&&typeof Xr=="number"&&0<Xr&&(v=1.5*Xr,d.L=v,d.j.info("backChannelRequestTimeoutMs_="+v)),v=d;const Wt=a.g;if(Wt){const Jo=Wt.g?Wt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Jo){var O=v.h;O.g||Jo.indexOf("spdy")==-1&&Jo.indexOf("quic")==-1&&Jo.indexOf("h2")==-1||(O.j=O.l,O.g=new Set,O.h&&(_u(O,O.h),O.h=null))}if(v.D){const Iu=Wt.g?Wt.g.getResponseHeader("X-HTTP-Session-Id"):null;Iu&&(v.ya=Iu,Re(v.I,v.D,Iu))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-a.F,d.j.info("Handshake RTT: "+d.R+"ms")),v=d;var B=a;if(v.qa=cp(v,v.J?v.ia:null,v.W),B.K){Ff(v.h,B);var Se=B,Ye=v.L;Ye&&(Se.I=Ye),Se.B&&(gu(Se),Fo(Se)),v.g=B}else ip(v);0<d.i.length&&Ko(d)}else _e[0]!="stop"&&_e[0]!="close"||Tr(d,7);else d.G==3&&(_e[0]=="stop"||_e[0]=="close"?_e[0]=="stop"?Tr(d,7):Eu(d):_e[0]!="noop"&&d.l&&d.l.ta(_e),d.v=0)}}ti(4)}catch{}}var Nw=class{constructor(a,c){this.g=a,this.map=c}};function Lf(a){this.l=a||10,l.PerformanceNavigationTiming?(a=l.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Mf(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function jf(a){return a.h?1:a.g?a.g.size:0}function vu(a,c){return a.h?a.h==c:a.g?a.g.has(c):!1}function _u(a,c){a.g?a.g.add(c):a.h=c}function Ff(a,c){a.h&&a.h==c?a.h=null:a.g&&a.g.has(c)&&a.g.delete(c)}Lf.prototype.cancel=function(){if(this.i=Uf(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Uf(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let c=a.i;for(const d of a.g.values())c=c.concat(d.D);return c}return R(a.i)}function bw(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(u(a)){for(var c=[],d=a.length,v=0;v<d;v++)c.push(a[v]);return c}c=[],d=0;for(v in a)c[d++]=a[v];return c}function Dw(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(u(a)||typeof a=="string"){var c=[];a=a.length;for(var d=0;d<a;d++)c.push(d);return c}c=[],d=0;for(const v in a)c[d++]=v;return c}}}function zf(a,c){if(a.forEach&&typeof a.forEach=="function")a.forEach(c,void 0);else if(u(a)||typeof a=="string")Array.prototype.forEach.call(a,c,void 0);else for(var d=Dw(a),v=bw(a),b=v.length,O=0;O<b;O++)c.call(void 0,v[O],d&&d[O],a)}var $f=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Ow(a,c){if(a){a=a.split("&");for(var d=0;d<a.length;d++){var v=a[d].indexOf("="),b=null;if(0<=v){var O=a[d].substring(0,v);b=a[d].substring(v+1)}else O=a[d];c(O,b?decodeURIComponent(b.replace(/\+/g," ")):"")}}}function Er(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof Er){this.h=a.h,Uo(this,a.j),this.o=a.o,this.g=a.g,zo(this,a.s),this.l=a.l;var c=a.i,d=new ai;d.i=c.i,c.g&&(d.g=new Map(c.g),d.h=c.h),Bf(this,d),this.m=a.m}else a&&(c=String(a).match($f))?(this.h=!1,Uo(this,c[1]||"",!0),this.o=ii(c[2]||""),this.g=ii(c[3]||"",!0),zo(this,c[4]),this.l=ii(c[5]||"",!0),Bf(this,c[6]||"",!0),this.m=ii(c[7]||"")):(this.h=!1,this.i=new ai(null,this.h))}Er.prototype.toString=function(){var a=[],c=this.j;c&&a.push(oi(c,Wf,!0),":");var d=this.g;return(d||c=="file")&&(a.push("//"),(c=this.o)&&a.push(oi(c,Wf,!0),"@"),a.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&a.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(oi(d,d.charAt(0)=="/"?Mw:Lw,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",oi(d,Fw)),a.join("")};function fn(a){return new Er(a)}function Uo(a,c,d){a.j=d?ii(c,!0):c,a.j&&(a.j=a.j.replace(/:$/,""))}function zo(a,c){if(c){if(c=Number(c),isNaN(c)||0>c)throw Error("Bad port number "+c);a.s=c}else a.s=null}function Bf(a,c,d){c instanceof ai?(a.i=c,Uw(a.i,a.h)):(d||(c=oi(c,jw)),a.i=new ai(c,a.h))}function Re(a,c,d){a.i.set(c,d)}function $o(a){return Re(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function ii(a,c){return a?c?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function oi(a,c,d){return typeof a=="string"?(a=encodeURI(a).replace(c,Vw),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function Vw(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Wf=/[#\/\?@]/g,Lw=/[#\?:]/g,Mw=/[#\?]/g,jw=/[#\?@]/g,Fw=/#/g;function ai(a,c){this.h=this.g=null,this.i=a||null,this.j=!!c}function jn(a){a.g||(a.g=new Map,a.h=0,a.i&&Ow(a.i,function(c,d){a.add(decodeURIComponent(c.replace(/\+/g," ")),d)}))}t=ai.prototype,t.add=function(a,c){jn(this),this.i=null,a=Jr(this,a);var d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(c),this.h+=1,this};function Hf(a,c){jn(a),c=Jr(a,c),a.g.has(c)&&(a.i=null,a.h-=a.g.get(c).length,a.g.delete(c))}function qf(a,c){return jn(a),c=Jr(a,c),a.g.has(c)}t.forEach=function(a,c){jn(this),this.g.forEach(function(d,v){d.forEach(function(b){a.call(c,b,v,this)},this)},this)},t.na=function(){jn(this);const a=Array.from(this.g.values()),c=Array.from(this.g.keys()),d=[];for(let v=0;v<c.length;v++){const b=a[v];for(let O=0;O<b.length;O++)d.push(c[v])}return d},t.V=function(a){jn(this);let c=[];if(typeof a=="string")qf(this,a)&&(c=c.concat(this.g.get(Jr(this,a))));else{a=Array.from(this.g.values());for(let d=0;d<a.length;d++)c=c.concat(a[d])}return c},t.set=function(a,c){return jn(this),this.i=null,a=Jr(this,a),qf(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[c]),this.h+=1,this},t.get=function(a,c){return a?(a=this.V(a),0<a.length?String(a[0]):c):c};function Kf(a,c,d){Hf(a,c),0<d.length&&(a.i=null,a.g.set(Jr(a,c),R(d)),a.h+=d.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],c=Array.from(this.g.keys());for(var d=0;d<c.length;d++){var v=c[d];const O=encodeURIComponent(String(v)),B=this.V(v);for(v=0;v<B.length;v++){var b=O;B[v]!==""&&(b+="="+encodeURIComponent(String(B[v]))),a.push(b)}}return this.i=a.join("&")};function Jr(a,c){return c=String(c),a.j&&(c=c.toLowerCase()),c}function Uw(a,c){c&&!a.j&&(jn(a),a.i=null,a.g.forEach(function(d,v){var b=v.toLowerCase();v!=b&&(Hf(this,v),Kf(this,b,d))},a)),a.j=c}function zw(a,c){const d=new ri;if(l.Image){const v=new Image;v.onload=w(Fn,d,"TestLoadImage: loaded",!0,c,v),v.onerror=w(Fn,d,"TestLoadImage: error",!1,c,v),v.onabort=w(Fn,d,"TestLoadImage: abort",!1,c,v),v.ontimeout=w(Fn,d,"TestLoadImage: timeout",!1,c,v),l.setTimeout(function(){v.ontimeout&&v.ontimeout()},1e4),v.src=a}else c(!1)}function $w(a,c){const d=new ri,v=new AbortController,b=setTimeout(()=>{v.abort(),Fn(d,"TestPingServer: timeout",!1,c)},1e4);fetch(a,{signal:v.signal}).then(O=>{clearTimeout(b),O.ok?Fn(d,"TestPingServer: ok",!0,c):Fn(d,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(b),Fn(d,"TestPingServer: error",!1,c)})}function Fn(a,c,d,v,b){try{b&&(b.onload=null,b.onerror=null,b.onabort=null,b.ontimeout=null),v(d)}catch{}}function Bw(){this.g=new Sw}function Ww(a,c,d){const v=d||"";try{zf(a,function(b,O){let B=b;h(b)&&(B=uu(b)),c.push(v+O+"="+encodeURIComponent(B))})}catch(b){throw c.push(v+"type="+encodeURIComponent("_badmap")),b}}function Bo(a){this.l=a.Ub||null,this.j=a.eb||!1}A(Bo,cu),Bo.prototype.g=function(){return new Wo(this.l,this.j)},Bo.prototype.i=function(a){return function(){return a}}({});function Wo(a,c){it.call(this),this.D=a,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}A(Wo,it),t=Wo.prototype,t.open=function(a,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=c,this.readyState=1,ui(this)},t.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const c={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(c.body=a),(this.D||l).fetch(new Request(this.A,c)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,li(this)),this.readyState=0},t.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,ui(this)),this.g&&(this.readyState=3,ui(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Gf(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function Gf(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}t.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var c=a.value?a.value:new Uint8Array(0);(c=this.v.decode(c,{stream:!a.done}))&&(this.response=this.responseText+=c)}a.done?li(this):ui(this),this.readyState==3&&Gf(this)}},t.Ra=function(a){this.g&&(this.response=this.responseText=a,li(this))},t.Qa=function(a){this.g&&(this.response=a,li(this))},t.ga=function(){this.g&&li(this)};function li(a){a.readyState=4,a.l=null,a.j=null,a.v=null,ui(a)}t.setRequestHeader=function(a,c){this.u.append(a,c)},t.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],c=this.h.entries();for(var d=c.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=c.next();return a.join(`\r
`)};function ui(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(Wo.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Qf(a){let c="";return N(a,function(d,v){c+=v,c+=":",c+=d,c+=`\r
`}),c}function wu(a,c,d){e:{for(v in d){var v=!1;break e}v=!0}v||(d=Qf(d),typeof a=="string"?d!=null&&encodeURIComponent(String(d)):Re(a,c,d))}function Me(a){it.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}A(Me,it);var Hw=/^https?$/i,qw=["POST","PUT"];t=Me.prototype,t.Ha=function(a){this.J=a},t.ea=function(a,c,d,v){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);c=c?c.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():fu.g(),this.v=this.o?If(this.o):If(fu),this.g.onreadystatechange=y(this.Ea,this);try{this.B=!0,this.g.open(c,String(a),!0),this.B=!1}catch(O){Jf(this,O);return}if(a=d||"",d=new Map(this.headers),v)if(Object.getPrototypeOf(v)===Object.prototype)for(var b in v)d.set(b,v[b]);else if(typeof v.keys=="function"&&typeof v.get=="function")for(const O of v.keys())d.set(O,v.get(O));else throw Error("Unknown input type for opt_headers: "+String(v));v=Array.from(d.keys()).find(O=>O.toLowerCase()=="content-type"),b=l.FormData&&a instanceof l.FormData,!(0<=Array.prototype.indexOf.call(qw,c,void 0))||v||b||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[O,B]of d)this.g.setRequestHeader(O,B);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Zf(this),this.u=!0,this.g.send(a),this.u=!1}catch(O){Jf(this,O)}};function Jf(a,c){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=c,a.m=5,Yf(a),Ho(a)}function Yf(a){a.A||(a.A=!0,gt(a,"complete"),gt(a,"error"))}t.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,gt(this,"complete"),gt(this,"abort"),Ho(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Ho(this,!0)),Me.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?Xf(this):this.bb())},t.bb=function(){Xf(this)};function Xf(a){if(a.h&&typeof o<"u"&&(!a.v[1]||pn(a)!=4||a.Z()!=2)){if(a.u&&pn(a)==4)wf(a.Ea,0,a);else if(gt(a,"readystatechange"),pn(a)==4){a.h=!1;try{const B=a.Z();e:switch(B){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break e;default:c=!1}var d;if(!(d=c)){var v;if(v=B===0){var b=String(a.D).match($f)[1]||null;!b&&l.self&&l.self.location&&(b=l.self.location.protocol.slice(0,-1)),v=!Hw.test(b?b.toLowerCase():"")}d=v}if(d)gt(a,"complete"),gt(a,"success");else{a.m=6;try{var O=2<pn(a)?a.g.statusText:""}catch{O=""}a.l=O+" ["+a.Z()+"]",Yf(a)}}finally{Ho(a)}}}}function Ho(a,c){if(a.g){Zf(a);const d=a.g,v=a.v[0]?()=>{}:null;a.g=null,a.v=null,c||gt(a,"ready");try{d.onreadystatechange=v}catch{}}}function Zf(a){a.I&&(l.clearTimeout(a.I),a.I=null)}t.isActive=function(){return!!this.g};function pn(a){return a.g?a.g.readyState:0}t.Z=function(){try{return 2<pn(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(a){if(this.g){var c=this.g.responseText;return a&&c.indexOf(a)==0&&(c=c.substring(a.length)),Iw(c)}};function ep(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function Kw(a){const c={};a=(a.g&&2<=pn(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let v=0;v<a.length;v++){if(E(a[v]))continue;var d=C(a[v]);const b=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const O=c[b]||[];c[b]=O,O.push(d)}_(c,function(v){return v.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function ci(a,c,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||c}function tp(a){this.Aa=0,this.i=[],this.j=new ri,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=ci("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=ci("baseRetryDelayMs",5e3,a),this.cb=ci("retryDelaySeedMs",1e4,a),this.Wa=ci("forwardChannelMaxRetries",2,a),this.wa=ci("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new Lf(a&&a.concurrentRequestLimit),this.Da=new Bw,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=tp.prototype,t.la=8,t.G=1,t.connect=function(a,c,d,v){yt(0),this.W=a,this.H=c||{},d&&v!==void 0&&(this.H.OSID=d,this.H.OAID=v),this.F=this.X,this.I=cp(this,null,this.W),Ko(this)};function Eu(a){if(np(a),a.G==3){var c=a.U++,d=fn(a.I);if(Re(d,"SID",a.K),Re(d,"RID",c),Re(d,"TYPE","terminate"),hi(a,d),c=new Mn(a,a.j,c),c.L=2,c.v=$o(fn(d)),d=!1,l.navigator&&l.navigator.sendBeacon)try{d=l.navigator.sendBeacon(c.v.toString(),"")}catch{}!d&&l.Image&&(new Image().src=c.v,d=!0),d||(c.g=hp(c.j,null),c.g.ea(c.v)),c.F=Date.now(),Fo(c)}up(a)}function qo(a){a.g&&(xu(a),a.g.cancel(),a.g=null)}function np(a){qo(a),a.u&&(l.clearTimeout(a.u),a.u=null),Go(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&l.clearTimeout(a.s),a.s=null)}function Ko(a){if(!Mf(a.h)&&!a.s){a.s=!0;var c=a.Ga;me||X(),z||(me(),z=!0),Y.add(c,a),a.B=0}}function Gw(a,c){return jf(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=c.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=ni(y(a.Ga,a,c),lp(a,a.B)),a.B++,!0)}t.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const b=new Mn(this,this.j,a);let O=this.o;if(this.S&&(O?(O=g(O),k(O,this.S)):O=this.S),this.m!==null||this.O||(b.H=O,O=null),this.P)e:{for(var c=0,d=0;d<this.i.length;d++){t:{var v=this.i[d];if("__data__"in v.map&&(v=v.map.__data__,typeof v=="string")){v=v.length;break t}v=void 0}if(v===void 0)break;if(c+=v,4096<c){c=d;break e}if(c===4096||d===this.i.length-1){c=d+1;break e}}c=1e3}else c=1e3;c=sp(this,b,c),d=fn(this.I),Re(d,"RID",a),Re(d,"CVER",22),this.D&&Re(d,"X-HTTP-Session-Id",this.D),hi(this,d),O&&(this.O?c="headers="+encodeURIComponent(String(Qf(O)))+"&"+c:this.m&&wu(d,this.m,O)),_u(this.h,b),this.Ua&&Re(d,"TYPE","init"),this.P?(Re(d,"$req",c),Re(d,"SID","null"),b.T=!0,mu(b,d,null)):mu(b,d,c),this.G=2}}else this.G==3&&(a?rp(this,a):this.i.length==0||Mf(this.h)||rp(this))};function rp(a,c){var d;c?d=c.l:d=a.U++;const v=fn(a.I);Re(v,"SID",a.K),Re(v,"RID",d),Re(v,"AID",a.T),hi(a,v),a.m&&a.o&&wu(v,a.m,a.o),d=new Mn(a,a.j,d,a.B+1),a.m===null&&(d.H=a.o),c&&(a.i=c.D.concat(a.i)),c=sp(a,d,1e3),d.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),_u(a.h,d),mu(d,v,c)}function hi(a,c){a.H&&N(a.H,function(d,v){Re(c,v,d)}),a.l&&zf({},function(d,v){Re(c,v,d)})}function sp(a,c,d){d=Math.min(a.i.length,d);var v=a.l?y(a.l.Na,a.l,a):null;e:{var b=a.i;let O=-1;for(;;){const B=["count="+d];O==-1?0<d?(O=b[0].g,B.push("ofs="+O)):O=0:B.push("ofs="+O);let Se=!0;for(let Ye=0;Ye<d;Ye++){let _e=b[Ye].g;const ot=b[Ye].map;if(_e-=O,0>_e)O=Math.max(0,b[Ye].g-100),Se=!1;else try{Ww(ot,B,"req"+_e+"_")}catch{v&&v(ot)}}if(Se){v=B.join("&");break e}}}return a=a.i.splice(0,d),c.D=a,v}function ip(a){if(!a.g&&!a.u){a.Y=1;var c=a.Fa;me||X(),z||(me(),z=!0),Y.add(c,a),a.v=0}}function Tu(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=ni(y(a.Fa,a),lp(a,a.v)),a.v++,!0)}t.Fa=function(){if(this.u=null,op(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=ni(y(this.ab,this),a)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,yt(10),qo(this),op(this))};function xu(a){a.A!=null&&(l.clearTimeout(a.A),a.A=null)}function op(a){a.g=new Mn(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var c=fn(a.qa);Re(c,"RID","rpc"),Re(c,"SID",a.K),Re(c,"AID",a.T),Re(c,"CI",a.F?"0":"1"),!a.F&&a.ja&&Re(c,"TO",a.ja),Re(c,"TYPE","xmlhttp"),hi(a,c),a.m&&a.o&&wu(c,a.m,a.o),a.L&&(a.g.I=a.L);var d=a.g;a=a.ia,d.L=1,d.v=$o(fn(c)),d.m=null,d.P=!0,Df(d,a)}t.Za=function(){this.C!=null&&(this.C=null,qo(this),Tu(this),yt(19))};function Go(a){a.C!=null&&(l.clearTimeout(a.C),a.C=null)}function ap(a,c){var d=null;if(a.g==c){Go(a),xu(a),a.g=null;var v=2}else if(vu(a.h,c))d=c.D,Ff(a.h,c),v=1;else return;if(a.G!=0){if(c.o)if(v==1){d=c.m?c.m.length:0,c=Date.now()-c.F;var b=a.B;v=Lo(),gt(v,new Rf(v,d)),Ko(a)}else ip(a);else if(b=c.s,b==3||b==0&&0<c.X||!(v==1&&Gw(a,c)||v==2&&Tu(a)))switch(d&&0<d.length&&(c=a.h,c.i=c.i.concat(d)),b){case 1:Tr(a,5);break;case 4:Tr(a,10);break;case 3:Tr(a,6);break;default:Tr(a,2)}}}function lp(a,c){let d=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(d*=2),d*c}function Tr(a,c){if(a.j.info("Error code "+c),c==2){var d=y(a.fb,a),v=a.Xa;const b=!v;v=new Er(v||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||Uo(v,"https"),$o(v),b?zw(v.toString(),d):$w(v.toString(),d)}else yt(2);a.G=0,a.l&&a.l.sa(c),up(a),np(a)}t.fb=function(a){a?(this.j.info("Successfully pinged google.com"),yt(2)):(this.j.info("Failed to ping google.com"),yt(1))};function up(a){if(a.G=0,a.ka=[],a.l){const c=Uf(a.h);(c.length!=0||a.i.length!=0)&&(V(a.ka,c),V(a.ka,a.i),a.h.i.length=0,R(a.i),a.i.length=0),a.l.ra()}}function cp(a,c,d){var v=d instanceof Er?fn(d):new Er(d);if(v.g!="")c&&(v.g=c+"."+v.g),zo(v,v.s);else{var b=l.location;v=b.protocol,c=c?c+"."+b.hostname:b.hostname,b=+b.port;var O=new Er(null);v&&Uo(O,v),c&&(O.g=c),b&&zo(O,b),d&&(O.l=d),v=O}return d=a.D,c=a.ya,d&&c&&Re(v,d,c),Re(v,"VER",a.la),hi(a,v),v}function hp(a,c,d){if(c&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return c=a.Ca&&!a.pa?new Me(new Bo({eb:d})):new Me(a.pa),c.Ha(a.J),c}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function dp(){}t=dp.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function Qo(){}Qo.prototype.g=function(a,c){return new At(a,c)};function At(a,c){it.call(this),this.g=new tp(c),this.l=a,this.h=c&&c.messageUrlParams||null,a=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(a?a["X-WebChannel-Content-Type"]=c.messageContentType:a={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.va&&(a?a["X-WebChannel-Client-Profile"]=c.va:a={"X-WebChannel-Client-Profile":c.va}),this.g.S=a,(a=c&&c.Sb)&&!E(a)&&(this.g.m=a),this.v=c&&c.supportsCrossDomainXhr||!1,this.u=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!E(c)&&(this.g.D=c,a=this.h,a!==null&&c in a&&(a=this.h,c in a&&delete a[c])),this.j=new Yr(this)}A(At,it),At.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},At.prototype.close=function(){Eu(this.g)},At.prototype.o=function(a){var c=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.u&&(d={},d.__data__=uu(a),a=d);c.i.push(new Nw(c.Ya++,a)),c.G==3&&Ko(c)},At.prototype.N=function(){this.g.l=null,delete this.j,Eu(this.g),delete this.g,At.aa.N.call(this)};function fp(a){hu.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var c=a.__sm__;if(c){e:{for(const d in c){a=d;break e}a=void 0}(this.i=a)&&(a=this.i,c=c!==null&&a in c?c[a]:void 0),this.data=c}else this.data=a}A(fp,hu);function pp(){du.call(this),this.status=1}A(pp,du);function Yr(a){this.g=a}A(Yr,dp),Yr.prototype.ua=function(){gt(this.g,"a")},Yr.prototype.ta=function(a){gt(this.g,new fp(a))},Yr.prototype.sa=function(a){gt(this.g,new pp)},Yr.prototype.ra=function(){gt(this.g,"b")},Qo.prototype.createWebChannel=Qo.prototype.g,At.prototype.send=At.prototype.o,At.prototype.open=At.prototype.m,At.prototype.close=At.prototype.close,Y0=function(){return new Qo},J0=function(){return Lo()},Q0=_r,ch={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Mo.NO_ERROR=0,Mo.TIMEOUT=8,Mo.HTTP_ERROR=6,La=Mo,Pf.COMPLETE="complete",G0=Pf,Sf.EventType=ei,ei.OPEN="a",ei.CLOSE="b",ei.ERROR="c",ei.MESSAGE="d",it.prototype.listen=it.prototype.K,Si=Sf,Me.prototype.listenOnce=Me.prototype.L,Me.prototype.getLastError=Me.prototype.Ka,Me.prototype.getLastErrorCode=Me.prototype.Ba,Me.prototype.getStatus=Me.prototype.Z,Me.prototype.getResponseJson=Me.prototype.Oa,Me.prototype.getResponseText=Me.prototype.oa,Me.prototype.send=Me.prototype.ea,Me.prototype.setWithCredentials=Me.prototype.Ha,K0=Me}).apply(typeof ma<"u"?ma:typeof self<"u"?self:typeof window<"u"?window:{});const Xm="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ht{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}ht.UNAUTHENTICATED=new ht(null),ht.GOOGLE_CREDENTIALS=new ht("google-credentials-uid"),ht.FIRST_PARTY=new ht("first-party-uid"),ht.MOCK_USER=new ht("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Qs="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $r=new Ed("@firebase/firestore");function wi(){return $r.logLevel}function K(t,...e){if($r.logLevel<=pe.DEBUG){const n=e.map(Dd);$r.debug(`Firestore (${Qs}): ${t}`,...n)}}function Dn(t,...e){if($r.logLevel<=pe.ERROR){const n=e.map(Dd);$r.error(`Firestore (${Qs}): ${t}`,...n)}}function Ls(t,...e){if($r.logLevel<=pe.WARN){const n=e.map(Dd);$r.warn(`Firestore (${Qs}): ${t}`,...n)}}function Dd(t){if(typeof t=="string")return t;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(n){return JSON.stringify(n)}(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ie(t="Unexpected state"){const e=`FIRESTORE (${Qs}) INTERNAL ASSERTION FAILED: `+t;throw Dn(e),new Error(e)}function xe(t,e){t||ie()}function ae(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const j={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class ee extends Ln{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Or{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X0{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class rk{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(ht.UNAUTHENTICATED))}shutdown(){}}class sk{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class ik{constructor(e){this.t=e,this.currentUser=ht.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){xe(this.o===void 0);let r=this.i;const s=u=>this.i!==r?(r=this.i,n(u)):Promise.resolve();let i=new Or;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Or,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const u=i;e.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},l=u=>{K("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(u=>l(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?l(u):(K("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Or)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(K("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(xe(typeof r.accessToken=="string"),new X0(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return xe(e===null||typeof e=="string"),new ht(e)}}class ok{constructor(e,n,r){this.l=e,this.h=n,this.P=r,this.type="FirstParty",this.user=ht.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class ak{constructor(e,n,r){this.l=e,this.h=n,this.P=r}getToken(){return Promise.resolve(new ok(this.l,this.h,this.P))}start(e,n){e.enqueueRetryable(()=>n(ht.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class lk{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class uk{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,n){xe(this.o===void 0);const r=i=>{i.error!=null&&K("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.R;return this.R=i.token,K("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{K("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?s(i):K("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(xe(typeof n.token=="string"),this.R=n.token,new lk(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ck(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z0{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const s=ck(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<n&&(r+=e.charAt(s[i]%e.length))}return r}}function we(t,e){return t<e?-1:t>e?1:0}function Ms(t,e,n){return t.length===e.length&&t.every((r,s)=>n(r,e[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ke{constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new ee(j.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new ee(j.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<-62135596800)throw new ee(j.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new ee(j.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return Ke.fromMillis(Date.now())}static fromDate(e){return Ke.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*n));return new Ke(n,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?we(this.nanoseconds,e.nanoseconds):we(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oe{constructor(e){this.timestamp=e}static fromTimestamp(e){return new oe(e)}static min(){return new oe(new Ke(0,0))}static max(){return new oe(new Ke(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lo{constructor(e,n,r){n===void 0?n=0:n>e.length&&ie(),r===void 0?r=e.length-n:r>e.length-n&&ie(),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return lo.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof lo?e.forEach(r=>{n.push(r)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let s=0;s<r;s++){const i=e.get(s),o=n.get(s);if(i<o)return-1;if(i>o)return 1}return e.length<n.length?-1:e.length>n.length?1:0}}class Fe extends lo{construct(e,n,r){return new Fe(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new ee(j.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(s=>s.length>0))}return new Fe(n)}static emptyPath(){return new Fe([])}}const hk=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class et extends lo{construct(e,n,r){return new et(e,n,r)}static isValidIdentifier(e){return hk.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),et.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new et(["__name__"])}static fromServerFormat(e){const n=[];let r="",s=0;const i=()=>{if(r.length===0)throw new ee(j.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let o=!1;for(;s<e.length;){const l=e[s];if(l==="\\"){if(s+1===e.length)throw new ee(j.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new ee(j.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else l==="`"?(o=!o,s++):l!=="."||o?(r+=l,s++):(i(),s++)}if(i(),o)throw new ee(j.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new et(n)}static emptyPath(){return new et([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class te{constructor(e){this.path=e}static fromPath(e){return new te(Fe.fromString(e))}static fromName(e){return new te(Fe.fromString(e).popFirst(5))}static empty(){return new te(Fe.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Fe.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return Fe.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new te(new Fe(e.slice()))}}function dk(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,s=oe.fromTimestamp(r===1e9?new Ke(n+1,0):new Ke(n,r));return new fr(s,te.empty(),e)}function fk(t){return new fr(t.readTime,t.key,-1)}class fr{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new fr(oe.min(),te.empty(),-1)}static max(){return new fr(oe.max(),te.empty(),-1)}}function pk(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=te.comparator(t.documentKey,e.documentKey),n!==0?n:we(t.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mk="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class gk{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ro(t){if(t.code!==j.FAILED_PRECONDITION||t.message!==mk)throw t;K("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&ie(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new M((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(n,i).next(r,s)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof M?n:M.resolve(n)}catch(n){return M.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):M.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):M.reject(n)}static resolve(e){return new M((n,r)=>{n(e)})}static reject(e){return new M((n,r)=>{r(e)})}static waitFor(e){return new M((n,r)=>{let s=0,i=0,o=!1;e.forEach(l=>{++s,l.next(()=>{++i,o&&i===s&&n()},u=>r(u))}),o=!0,i===s&&n()})}static or(e){let n=M.resolve(!1);for(const r of e)n=n.next(s=>s?M.resolve(s):r());return n}static forEach(e,n){const r=[];return e.forEach((s,i)=>{r.push(n.call(this,s,i))}),this.waitFor(r)}static mapArray(e,n){return new M((r,s)=>{const i=e.length,o=new Array(i);let l=0;for(let u=0;u<i;u++){const h=u;n(e[h]).next(p=>{o[h]=p,++l,l===i&&r(o)},p=>s(p))}})}static doWhile(e,n){return new M((r,s)=>{const i=()=>{e()===!0?n().next(()=>{i()},s):r()};i()})}}function yk(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function Po(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Od{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this.ie(r),this.se=r=>n.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}Od.oe=-1;function Gl(t){return t==null}function _l(t){return t===0&&1/t==-1/0}function vk(t){return typeof t=="number"&&Number.isInteger(t)&&!_l(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zm(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function Js(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function e_(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Le{constructor(e,n){this.comparator=e,this.root=n||Ze.EMPTY}insert(e,n){return new Le(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,Ze.BLACK,null,null))}remove(e){return new Le(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ze.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return n+r.left.size;s<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,r)=>(e(n,r),!1))}toString(){const e=[];return this.inorderTraversal((n,r)=>(e.push(`${n}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new ga(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new ga(this.root,e,this.comparator,!1)}getReverseIterator(){return new ga(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new ga(this.root,e,this.comparator,!0)}}class ga{constructor(e,n,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=n?r(e.key,n):1,n&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Ze{constructor(e,n,r,s,i){this.key=e,this.value=n,this.color=r??Ze.RED,this.left=s??Ze.EMPTY,this.right=i??Ze.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,s,i){return new Ze(e??this.key,n??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,n,r),null):i===0?s.copy(null,n,null,null,null):s.copy(null,null,null,null,s.right.insert(e,n,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Ze.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,s=this;if(n(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),n(e,s.key)===0){if(s.right.isEmpty())return Ze.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Ze.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Ze.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw ie();const e=this.left.check();if(e!==this.right.check())throw ie();return e+(this.isRed()?0:1)}}Ze.EMPTY=null,Ze.RED=!0,Ze.BLACK=!1;Ze.EMPTY=new class{constructor(){this.size=0}get key(){throw ie()}get value(){throw ie()}get color(){throw ie()}get left(){throw ie()}get right(){throw ie()}copy(e,n,r,s,i){return this}insert(e,n,r){return new Ze(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt{constructor(e){this.comparator=e,this.data=new Le(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,r)=>(e(n),!1))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;n(s.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new eg(this.data.getIterator())}getIteratorFrom(e){return new eg(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(r=>{n=n.add(r)}),n}isEqual(e){if(!(e instanceof nt)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new nt(this.comparator);return n.data=e,n}}class eg{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qt{constructor(e){this.fields=e,e.sort(et.comparator)}static empty(){return new Qt([])}unionWith(e){let n=new nt(et.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new Qt(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return Ms(this.fields,e.fields,(n,r)=>n.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t_ extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class st{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new t_("Invalid base64 string: "+i):i}}(e);return new st(n)}static fromUint8Array(e){const n=function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i}(e);return new st(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return we(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}st.EMPTY_BYTE_STRING=new st("");const _k=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function pr(t){if(xe(!!t),typeof t=="string"){let e=0;const n=_k.exec(t);if(xe(!!n),n[1]){let s=n[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Ue(t.seconds),nanos:Ue(t.nanos)}}function Ue(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function Br(t){return typeof t=="string"?st.fromBase64String(t):st.fromUint8Array(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vd(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function Ld(t){const e=t.mapValue.fields.__previous_value__;return Vd(e)?Ld(e):e}function uo(t){const e=pr(t.mapValue.fields.__local_write_time__.timestampValue);return new Ke(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wk{constructor(e,n,r,s,i,o,l,u,h){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=l,this.longPollingOptions=u,this.useFetchStreams=h}}class co{constructor(e,n){this.projectId=e,this.database=n||"(default)"}static empty(){return new co("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof co&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ya={mapValue:{}};function Wr(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?Vd(t)?4:Tk(t)?9007199254740991:Ek(t)?10:11:ie()}function cn(t,e){if(t===e)return!0;const n=Wr(t);if(n!==Wr(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return uo(t).isEqual(uo(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=pr(s.timestampValue),l=pr(i.timestampValue);return o.seconds===l.seconds&&o.nanos===l.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(s,i){return Br(s.bytesValue).isEqual(Br(i.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(s,i){return Ue(s.geoPointValue.latitude)===Ue(i.geoPointValue.latitude)&&Ue(s.geoPointValue.longitude)===Ue(i.geoPointValue.longitude)}(t,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return Ue(s.integerValue)===Ue(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=Ue(s.doubleValue),l=Ue(i.doubleValue);return o===l?_l(o)===_l(l):isNaN(o)&&isNaN(l)}return!1}(t,e);case 9:return Ms(t.arrayValue.values||[],e.arrayValue.values||[],cn);case 10:case 11:return function(s,i){const o=s.mapValue.fields||{},l=i.mapValue.fields||{};if(Zm(o)!==Zm(l))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(l[u]===void 0||!cn(o[u],l[u])))return!1;return!0}(t,e);default:return ie()}}function ho(t,e){return(t.values||[]).find(n=>cn(n,e))!==void 0}function js(t,e){if(t===e)return 0;const n=Wr(t),r=Wr(e);if(n!==r)return we(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return we(t.booleanValue,e.booleanValue);case 2:return function(i,o){const l=Ue(i.integerValue||i.doubleValue),u=Ue(o.integerValue||o.doubleValue);return l<u?-1:l>u?1:l===u?0:isNaN(l)?isNaN(u)?0:-1:1}(t,e);case 3:return tg(t.timestampValue,e.timestampValue);case 4:return tg(uo(t),uo(e));case 5:return we(t.stringValue,e.stringValue);case 6:return function(i,o){const l=Br(i),u=Br(o);return l.compareTo(u)}(t.bytesValue,e.bytesValue);case 7:return function(i,o){const l=i.split("/"),u=o.split("/");for(let h=0;h<l.length&&h<u.length;h++){const p=we(l[h],u[h]);if(p!==0)return p}return we(l.length,u.length)}(t.referenceValue,e.referenceValue);case 8:return function(i,o){const l=we(Ue(i.latitude),Ue(o.latitude));return l!==0?l:we(Ue(i.longitude),Ue(o.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return ng(t.arrayValue,e.arrayValue);case 10:return function(i,o){var l,u,h,p;const m=i.fields||{},y=o.fields||{},w=(l=m.value)===null||l===void 0?void 0:l.arrayValue,A=(u=y.value)===null||u===void 0?void 0:u.arrayValue,R=we(((h=w==null?void 0:w.values)===null||h===void 0?void 0:h.length)||0,((p=A==null?void 0:A.values)===null||p===void 0?void 0:p.length)||0);return R!==0?R:ng(w,A)}(t.mapValue,e.mapValue);case 11:return function(i,o){if(i===ya.mapValue&&o===ya.mapValue)return 0;if(i===ya.mapValue)return 1;if(o===ya.mapValue)return-1;const l=i.fields||{},u=Object.keys(l),h=o.fields||{},p=Object.keys(h);u.sort(),p.sort();for(let m=0;m<u.length&&m<p.length;++m){const y=we(u[m],p[m]);if(y!==0)return y;const w=js(l[u[m]],h[p[m]]);if(w!==0)return w}return we(u.length,p.length)}(t.mapValue,e.mapValue);default:throw ie()}}function tg(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return we(t,e);const n=pr(t),r=pr(e),s=we(n.seconds,r.seconds);return s!==0?s:we(n.nanos,r.nanos)}function ng(t,e){const n=t.values||[],r=e.values||[];for(let s=0;s<n.length&&s<r.length;++s){const i=js(n[s],r[s]);if(i)return i}return we(n.length,r.length)}function Fs(t){return hh(t)}function hh(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(n){const r=pr(n);return`time(${r.seconds},${r.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?function(n){return Br(n).toBase64()}(t.bytesValue):"referenceValue"in t?function(n){return te.fromName(n).toString()}(t.referenceValue):"geoPointValue"in t?function(n){return`geo(${n.latitude},${n.longitude})`}(t.geoPointValue):"arrayValue"in t?function(n){let r="[",s=!0;for(const i of n.values||[])s?s=!1:r+=",",r+=hh(i);return r+"]"}(t.arrayValue):"mapValue"in t?function(n){const r=Object.keys(n.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${hh(n.fields[o])}`;return s+"}"}(t.mapValue):ie()}function dh(t){return!!t&&"integerValue"in t}function Md(t){return!!t&&"arrayValue"in t}function rg(t){return!!t&&"nullValue"in t}function sg(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function Ma(t){return!!t&&"mapValue"in t}function Ek(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="__vector__"}function Fi(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return Js(t.mapValue.fields,(n,r)=>e.mapValue.fields[n]=Fi(r)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=Fi(t.arrayValue.values[n]);return e}return Object.assign({},t)}function Tk(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mt{constructor(e){this.value=e}static empty(){return new Mt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!Ma(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=Fi(n)}setAll(e){let n=et.emptyPath(),r={},s=[];e.forEach((o,l)=>{if(!n.isImmediateParentOf(l)){const u=this.getFieldsMap(n);this.applyChanges(u,r,s),r={},s=[],n=l.popLast()}o?r[l.lastSegment()]=Fi(o):s.push(l.lastSegment())});const i=this.getFieldsMap(n);this.applyChanges(i,r,s)}delete(e){const n=this.field(e.popLast());Ma(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return cn(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=n.mapValue.fields[e.get(r)];Ma(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=s),n=s}return n.mapValue.fields}applyChanges(e,n,r){Js(n,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new Mt(Fi(this.value))}}function n_(t){const e=[];return Js(t.fields,(n,r)=>{const s=new et([n]);if(Ma(r)){const i=n_(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)}),new Qt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ft{constructor(e,n,r,s,i,o,l){this.key=e,this.documentType=n,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=l}static newInvalidDocument(e){return new ft(e,0,oe.min(),oe.min(),oe.min(),Mt.empty(),0)}static newFoundDocument(e,n,r,s){return new ft(e,1,n,oe.min(),r,s,0)}static newNoDocument(e,n){return new ft(e,2,n,oe.min(),oe.min(),Mt.empty(),0)}static newUnknownDocument(e,n){return new ft(e,3,n,oe.min(),oe.min(),Mt.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(oe.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Mt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Mt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=oe.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof ft&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new ft(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wl{constructor(e,n){this.position=e,this.inclusive=n}}function ig(t,e,n){let r=0;for(let s=0;s<t.position.length;s++){const i=e[s],o=t.position[s];if(i.field.isKeyField()?r=te.comparator(te.fromName(o.referenceValue),n.key):r=js(o,n.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function og(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!cn(t.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class El{constructor(e,n="asc"){this.field=e,this.dir=n}}function xk(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let r_=class{};class He extends r_{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new Sk(e,n,r):n==="array-contains"?new Ck(e,r):n==="in"?new Rk(e,r):n==="not-in"?new Pk(e,r):n==="array-contains-any"?new Nk(e,r):new He(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new kk(e,r):new Ak(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&this.matchesComparison(js(n,this.value)):n!==null&&Wr(this.value)===Wr(n)&&this.matchesComparison(js(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return ie()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class hn extends r_{constructor(e,n){super(),this.filters=e,this.op=n,this.ae=null}static create(e,n){return new hn(e,n)}matches(e){return s_(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function s_(t){return t.op==="and"}function i_(t){return Ik(t)&&s_(t)}function Ik(t){for(const e of t.filters)if(e instanceof hn)return!1;return!0}function fh(t){if(t instanceof He)return t.field.canonicalString()+t.op.toString()+Fs(t.value);if(i_(t))return t.filters.map(e=>fh(e)).join(",");{const e=t.filters.map(n=>fh(n)).join(",");return`${t.op}(${e})`}}function o_(t,e){return t instanceof He?function(r,s){return s instanceof He&&r.op===s.op&&r.field.isEqual(s.field)&&cn(r.value,s.value)}(t,e):t instanceof hn?function(r,s){return s instanceof hn&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,o,l)=>i&&o_(o,s.filters[l]),!0):!1}(t,e):void ie()}function a_(t){return t instanceof He?function(n){return`${n.field.canonicalString()} ${n.op} ${Fs(n.value)}`}(t):t instanceof hn?function(n){return n.op.toString()+" {"+n.getFilters().map(a_).join(" ,")+"}"}(t):"Filter"}class Sk extends He{constructor(e,n,r){super(e,n,r),this.key=te.fromName(r.referenceValue)}matches(e){const n=te.comparator(e.key,this.key);return this.matchesComparison(n)}}class kk extends He{constructor(e,n){super(e,"in",n),this.keys=l_("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class Ak extends He{constructor(e,n){super(e,"not-in",n),this.keys=l_("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function l_(t,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(r=>te.fromName(r.referenceValue))}class Ck extends He{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return Md(n)&&ho(n.arrayValue,this.value)}}class Rk extends He{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&ho(this.value.arrayValue,n)}}class Pk extends He{constructor(e,n){super(e,"not-in",n)}matches(e){if(ho(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&!ho(this.value.arrayValue,n)}}class Nk extends He{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!Md(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>ho(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bk{constructor(e,n=null,r=[],s=[],i=null,o=null,l=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=l,this.ue=null}}function ag(t,e=null,n=[],r=[],s=null,i=null,o=null){return new bk(t,e,n,r,s,i,o)}function jd(t){const e=ae(t);if(e.ue===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(r=>fh(r)).join(","),n+="|ob:",n+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),Gl(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>Fs(r)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>Fs(r)).join(",")),e.ue=n}return e.ue}function Fd(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!xk(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!o_(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!og(t.startAt,e.startAt)&&og(t.endAt,e.endAt)}function ph(t){return te.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ql{constructor(e,n=null,r=[],s=[],i=null,o="F",l=null,u=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=l,this.endAt=u,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function Dk(t,e,n,r,s,i,o,l){return new Ql(t,e,n,r,s,i,o,l)}function Ud(t){return new Ql(t)}function lg(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function Ok(t){return t.collectionGroup!==null}function Ui(t){const e=ae(t);if(e.ce===null){e.ce=[];const n=new Set;for(const i of e.explicitOrderBy)e.ce.push(i),n.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let l=new nt(et.comparator);return o.filters.forEach(u=>{u.getFlattenedFilters().forEach(h=>{h.isInequality()&&(l=l.add(h.field))})}),l})(e).forEach(i=>{n.has(i.canonicalString())||i.isKeyField()||e.ce.push(new El(i,r))}),n.has(et.keyField().canonicalString())||e.ce.push(new El(et.keyField(),r))}return e.ce}function ln(t){const e=ae(t);return e.le||(e.le=Vk(e,Ui(t))),e.le}function Vk(t,e){if(t.limitType==="F")return ag(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new El(s.field,i)});const n=t.endAt?new wl(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new wl(t.startAt.position,t.startAt.inclusive):null;return ag(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}function mh(t,e,n){return new Ql(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function Jl(t,e){return Fd(ln(t),ln(e))&&t.limitType===e.limitType}function u_(t){return`${jd(ln(t))}|lt:${t.limitType}`}function es(t){return`Query(target=${function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map(s=>a_(s)).join(", ")}]`),Gl(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map(s=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(s)).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map(s=>Fs(s)).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map(s=>Fs(s)).join(",")),`Target(${r})`}(ln(t))}; limitType=${t.limitType})`}function Yl(t,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):te.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(t,e)&&function(r,s){for(const i of Ui(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(t,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(t,e)&&function(r,s){return!(r.startAt&&!function(o,l,u){const h=ig(o,l,u);return o.inclusive?h<=0:h<0}(r.startAt,Ui(r),s)||r.endAt&&!function(o,l,u){const h=ig(o,l,u);return o.inclusive?h>=0:h>0}(r.endAt,Ui(r),s))}(t,e)}function Lk(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function c_(t){return(e,n)=>{let r=!1;for(const s of Ui(t)){const i=Mk(s,e,n);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function Mk(t,e,n){const r=t.field.isKeyField()?te.comparator(e.key,n.key):function(i,o,l){const u=o.data.field(i),h=l.data.field(i);return u!==null&&h!==null?js(u,h):ie()}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return ie()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ys{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,n]);s.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[n]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Js(this.inner,(n,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return e_(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jk=new Le(te.comparator);function On(){return jk}const h_=new Le(te.comparator);function ki(...t){let e=h_;for(const n of t)e=e.insert(n.key,n);return e}function d_(t){let e=h_;return t.forEach((n,r)=>e=e.insert(n,r.overlayedDocument)),e}function Pr(){return zi()}function f_(){return zi()}function zi(){return new Ys(t=>t.toString(),(t,e)=>t.isEqual(e))}const Fk=new Le(te.comparator),Uk=new nt(te.comparator);function fe(...t){let e=Uk;for(const n of t)e=e.add(n);return e}const zk=new nt(we);function $k(){return zk}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zd(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:_l(e)?"-0":e}}function p_(t){return{integerValue:""+t}}function Bk(t,e){return vk(e)?p_(e):zd(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xl{constructor(){this._=void 0}}function Wk(t,e,n){return t instanceof fo?function(s,i){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Vd(i)&&(i=Ld(i)),i&&(o.fields.__previous_value__=i),{mapValue:o}}(n,e):t instanceof po?g_(t,e):t instanceof mo?y_(t,e):function(s,i){const o=m_(s,i),l=ug(o)+ug(s.Pe);return dh(o)&&dh(s.Pe)?p_(l):zd(s.serializer,l)}(t,e)}function Hk(t,e,n){return t instanceof po?g_(t,e):t instanceof mo?y_(t,e):n}function m_(t,e){return t instanceof Tl?function(r){return dh(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class fo extends Xl{}class po extends Xl{constructor(e){super(),this.elements=e}}function g_(t,e){const n=v_(e);for(const r of t.elements)n.some(s=>cn(s,r))||n.push(r);return{arrayValue:{values:n}}}class mo extends Xl{constructor(e){super(),this.elements=e}}function y_(t,e){let n=v_(e);for(const r of t.elements)n=n.filter(s=>!cn(s,r));return{arrayValue:{values:n}}}class Tl extends Xl{constructor(e,n){super(),this.serializer=e,this.Pe=n}}function ug(t){return Ue(t.integerValue||t.doubleValue)}function v_(t){return Md(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qk{constructor(e,n){this.field=e,this.transform=n}}function Kk(t,e){return t.field.isEqual(e.field)&&function(r,s){return r instanceof po&&s instanceof po||r instanceof mo&&s instanceof mo?Ms(r.elements,s.elements,cn):r instanceof Tl&&s instanceof Tl?cn(r.Pe,s.Pe):r instanceof fo&&s instanceof fo}(t.transform,e.transform)}class Gk{constructor(e,n){this.version=e,this.transformResults=n}}class In{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new In}static exists(e){return new In(void 0,e)}static updateTime(e){return new In(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function ja(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class Zl{}function __(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new E_(t.key,In.none()):new No(t.key,t.data,In.none());{const n=t.data,r=Mt.empty();let s=new nt(et.comparator);for(let i of e.fields)if(!s.has(i)){let o=n.field(i);o===null&&i.length>1&&(i=i.popLast(),o=n.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new Kr(t.key,r,new Qt(s.toArray()),In.none())}}function Qk(t,e,n){t instanceof No?function(s,i,o){const l=s.value.clone(),u=hg(s.fieldTransforms,i,o.transformResults);l.setAll(u),i.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(t,e,n):t instanceof Kr?function(s,i,o){if(!ja(s.precondition,i))return void i.convertToUnknownDocument(o.version);const l=hg(s.fieldTransforms,i,o.transformResults),u=i.data;u.setAll(w_(s)),u.setAll(l),i.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(t,e,n):function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,n)}function $i(t,e,n,r){return t instanceof No?function(i,o,l,u){if(!ja(i.precondition,o))return l;const h=i.value.clone(),p=dg(i.fieldTransforms,u,o);return h.setAll(p),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null}(t,e,n,r):t instanceof Kr?function(i,o,l,u){if(!ja(i.precondition,o))return l;const h=dg(i.fieldTransforms,u,o),p=o.data;return p.setAll(w_(i)),p.setAll(h),o.convertToFoundDocument(o.version,p).setHasLocalMutations(),l===null?null:l.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(m=>m.field))}(t,e,n,r):function(i,o,l){return ja(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):l}(t,e,n)}function Jk(t,e){let n=null;for(const r of t.fieldTransforms){const s=e.data.field(r.field),i=m_(r.transform,s||null);i!=null&&(n===null&&(n=Mt.empty()),n.set(r.field,i))}return n||null}function cg(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Ms(r,s,(i,o)=>Kk(i,o))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class No extends Zl{constructor(e,n,r,s=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Kr extends Zl{constructor(e,n,r,s,i=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function w_(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function hg(t,e,n){const r=new Map;xe(t.length===n.length);for(let s=0;s<n.length;s++){const i=t[s],o=i.transform,l=e.data.field(i.field);r.set(i.field,Hk(o,l,n[s]))}return r}function dg(t,e,n){const r=new Map;for(const s of t){const i=s.transform,o=n.data.field(s.field);r.set(s.field,Wk(i,o,e))}return r}class E_ extends Zl{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Yk extends Zl{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xk{constructor(e,n,r,s){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&Qk(i,e,r[s])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=$i(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=$i(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=f_();return this.mutations.forEach(s=>{const i=e.get(s.key),o=i.overlayedDocument;let l=this.applyToLocalView(o,i.mutatedFields);l=n.has(s.key)?null:l;const u=__(o,l);u!==null&&r.set(s.key,u),o.isValidDocument()||o.convertToNoDocument(oe.min())}),r}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),fe())}isEqual(e){return this.batchId===e.batchId&&Ms(this.mutations,e.mutations,(n,r)=>cg(n,r))&&Ms(this.baseMutations,e.baseMutations,(n,r)=>cg(n,r))}}class $d{constructor(e,n,r,s){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=s}static from(e,n,r){xe(e.mutations.length===r.length);let s=function(){return Fk}();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new $d(e,n,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zk{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eA{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var $e,ge;function tA(t){switch(t){default:return ie();case j.CANCELLED:case j.UNKNOWN:case j.DEADLINE_EXCEEDED:case j.RESOURCE_EXHAUSTED:case j.INTERNAL:case j.UNAVAILABLE:case j.UNAUTHENTICATED:return!1;case j.INVALID_ARGUMENT:case j.NOT_FOUND:case j.ALREADY_EXISTS:case j.PERMISSION_DENIED:case j.FAILED_PRECONDITION:case j.ABORTED:case j.OUT_OF_RANGE:case j.UNIMPLEMENTED:case j.DATA_LOSS:return!0}}function T_(t){if(t===void 0)return Dn("GRPC error has no .code"),j.UNKNOWN;switch(t){case $e.OK:return j.OK;case $e.CANCELLED:return j.CANCELLED;case $e.UNKNOWN:return j.UNKNOWN;case $e.DEADLINE_EXCEEDED:return j.DEADLINE_EXCEEDED;case $e.RESOURCE_EXHAUSTED:return j.RESOURCE_EXHAUSTED;case $e.INTERNAL:return j.INTERNAL;case $e.UNAVAILABLE:return j.UNAVAILABLE;case $e.UNAUTHENTICATED:return j.UNAUTHENTICATED;case $e.INVALID_ARGUMENT:return j.INVALID_ARGUMENT;case $e.NOT_FOUND:return j.NOT_FOUND;case $e.ALREADY_EXISTS:return j.ALREADY_EXISTS;case $e.PERMISSION_DENIED:return j.PERMISSION_DENIED;case $e.FAILED_PRECONDITION:return j.FAILED_PRECONDITION;case $e.ABORTED:return j.ABORTED;case $e.OUT_OF_RANGE:return j.OUT_OF_RANGE;case $e.UNIMPLEMENTED:return j.UNIMPLEMENTED;case $e.DATA_LOSS:return j.DATA_LOSS;default:return ie()}}(ge=$e||($e={}))[ge.OK=0]="OK",ge[ge.CANCELLED=1]="CANCELLED",ge[ge.UNKNOWN=2]="UNKNOWN",ge[ge.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ge[ge.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ge[ge.NOT_FOUND=5]="NOT_FOUND",ge[ge.ALREADY_EXISTS=6]="ALREADY_EXISTS",ge[ge.PERMISSION_DENIED=7]="PERMISSION_DENIED",ge[ge.UNAUTHENTICATED=16]="UNAUTHENTICATED",ge[ge.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ge[ge.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ge[ge.ABORTED=10]="ABORTED",ge[ge.OUT_OF_RANGE=11]="OUT_OF_RANGE",ge[ge.UNIMPLEMENTED=12]="UNIMPLEMENTED",ge[ge.INTERNAL=13]="INTERNAL",ge[ge.UNAVAILABLE=14]="UNAVAILABLE",ge[ge.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nA(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rA=new Dr([4294967295,4294967295],0);function fg(t){const e=nA().encode(t),n=new q0;return n.update(e),new Uint8Array(n.digest())}function pg(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Dr([n,r],0),new Dr([s,i],0)]}class Bd{constructor(e,n,r){if(this.bitmap=e,this.padding=n,this.hashCount=r,n<0||n>=8)throw new Ai(`Invalid padding: ${n}`);if(r<0)throw new Ai(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Ai(`Invalid hash count: ${r}`);if(e.length===0&&n!==0)throw new Ai(`Invalid padding when bitmap length is 0: ${n}`);this.Ie=8*e.length-n,this.Te=Dr.fromNumber(this.Ie)}Ee(e,n,r){let s=e.add(n.multiply(Dr.fromNumber(r)));return s.compare(rA)===1&&(s=new Dr([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const n=fg(e),[r,s]=pg(n);for(let i=0;i<this.hashCount;i++){const o=this.Ee(r,s,i);if(!this.de(o))return!1}return!0}static create(e,n,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new Bd(i,s,n);return r.forEach(l=>o.insert(l)),o}insert(e){if(this.Ie===0)return;const n=fg(e),[r,s]=pg(n);for(let i=0;i<this.hashCount;i++){const o=this.Ee(r,s,i);this.Ae(o)}}Ae(e){const n=Math.floor(e/8),r=e%8;this.bitmap[n]|=1<<r}}class Ai extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eu{constructor(e,n,r,s,i){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const s=new Map;return s.set(e,bo.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new eu(oe.min(),s,new Le(we),On(),fe())}}class bo{constructor(e,n,r,s,i){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new bo(r,n,fe(),fe(),fe())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fa{constructor(e,n,r,s){this.Re=e,this.removedTargetIds=n,this.key=r,this.Ve=s}}class x_{constructor(e,n){this.targetId=e,this.me=n}}class I_{constructor(e,n,r=st.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=s}}class mg{constructor(){this.fe=0,this.ge=yg(),this.pe=st.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=fe(),n=fe(),r=fe();return this.ge.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:n=n.add(s);break;case 1:r=r.add(s);break;default:ie()}}),new bo(this.pe,this.ye,e,n,r)}Ce(){this.we=!1,this.ge=yg()}Fe(e,n){this.we=!0,this.ge=this.ge.insert(e,n)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,xe(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class sA{constructor(e){this.Le=e,this.Be=new Map,this.ke=On(),this.qe=gg(),this.Qe=new Le(we)}Ke(e){for(const n of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(n,e.Ve):this.Ue(n,e.key,e.Ve);for(const n of e.removedTargetIds)this.Ue(n,e.key,e.Ve)}We(e){this.forEachTarget(e,n=>{const r=this.Ge(n);switch(e.state){case 0:this.ze(n)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(n);break;case 3:this.ze(n)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(n)&&(this.je(n),r.De(e.resumeToken));break;default:ie()}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.Be.forEach((r,s)=>{this.ze(s)&&n(s)})}He(e){const n=e.targetId,r=e.me.count,s=this.Je(n);if(s){const i=s.target;if(ph(i))if(r===0){const o=new te(i.path);this.Ue(n,o,ft.newNoDocument(o,oe.min()))}else xe(r===1);else{const o=this.Ye(n);if(o!==r){const l=this.Ze(e),u=l?this.Xe(l,e,o):1;if(u!==0){this.je(n);const h=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(n,h)}}}}}Ze(e){const n=e.me.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=n;let o,l;try{o=Br(r).toUint8Array()}catch(u){if(u instanceof t_)return Ls("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{l=new Bd(o,s,i)}catch(u){return Ls(u instanceof Ai?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return l.Ie===0?null:l}Xe(e,n,r){return n.me.count===r-this.nt(e,n.targetId)?0:2}nt(e,n){const r=this.Le.getRemoteKeysForTarget(n);let s=0;return r.forEach(i=>{const o=this.Le.tt(),l=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(l)||(this.Ue(n,i,null),s++)}),s}rt(e){const n=new Map;this.Be.forEach((i,o)=>{const l=this.Je(o);if(l){if(i.current&&ph(l.target)){const u=new te(l.target.path);this.ke.get(u)!==null||this.it(o,u)||this.Ue(o,u,ft.newNoDocument(u,e))}i.be&&(n.set(o,i.ve()),i.Ce())}});let r=fe();this.qe.forEach((i,o)=>{let l=!0;o.forEachWhile(u=>{const h=this.Je(u);return!h||h.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(i))}),this.ke.forEach((i,o)=>o.setReadTime(e));const s=new eu(e,n,this.Qe,this.ke,r);return this.ke=On(),this.qe=gg(),this.Qe=new Le(we),s}$e(e,n){if(!this.ze(e))return;const r=this.it(e,n.key)?2:0;this.Ge(e).Fe(n.key,r),this.ke=this.ke.insert(n.key,n),this.qe=this.qe.insert(n.key,this.st(n.key).add(e))}Ue(e,n,r){if(!this.ze(e))return;const s=this.Ge(e);this.it(e,n)?s.Fe(n,1):s.Me(n),this.qe=this.qe.insert(n,this.st(n).delete(e)),r&&(this.ke=this.ke.insert(n,r))}removeTarget(e){this.Be.delete(e)}Ye(e){const n=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let n=this.Be.get(e);return n||(n=new mg,this.Be.set(e,n)),n}st(e){let n=this.qe.get(e);return n||(n=new nt(we),this.qe=this.qe.insert(e,n)),n}ze(e){const n=this.Je(e)!==null;return n||K("WatchChangeAggregator","Detected inactive target",e),n}Je(e){const n=this.Be.get(e);return n&&n.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new mg),this.Le.getRemoteKeysForTarget(e).forEach(n=>{this.Ue(e,n,null)})}it(e,n){return this.Le.getRemoteKeysForTarget(e).has(n)}}function gg(){return new Le(te.comparator)}function yg(){return new Le(te.comparator)}const iA={asc:"ASCENDING",desc:"DESCENDING"},oA={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},aA={and:"AND",or:"OR"};class lA{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function gh(t,e){return t.useProto3Json||Gl(e)?e:{value:e}}function xl(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function S_(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function uA(t,e){return xl(t,e.toTimestamp())}function un(t){return xe(!!t),oe.fromTimestamp(function(n){const r=pr(n);return new Ke(r.seconds,r.nanos)}(t))}function Wd(t,e){return yh(t,e).canonicalString()}function yh(t,e){const n=function(s){return new Fe(["projects",s.projectId,"databases",s.database])}(t).child("documents");return e===void 0?n:n.child(e)}function k_(t){const e=Fe.fromString(t);return xe(N_(e)),e}function vh(t,e){return Wd(t.databaseId,e.path)}function sc(t,e){const n=k_(e);if(n.get(1)!==t.databaseId.projectId)throw new ee(j.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new ee(j.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new te(C_(n))}function A_(t,e){return Wd(t.databaseId,e)}function cA(t){const e=k_(t);return e.length===4?Fe.emptyPath():C_(e)}function _h(t){return new Fe(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function C_(t){return xe(t.length>4&&t.get(4)==="documents"),t.popFirst(5)}function vg(t,e,n){return{name:vh(t,e),fields:n.value.mapValue.fields}}function hA(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:ie()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(h,p){return h.useProto3Json?(xe(p===void 0||typeof p=="string"),st.fromBase64String(p||"")):(xe(p===void 0||p instanceof Buffer||p instanceof Uint8Array),st.fromUint8Array(p||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,l=o&&function(h){const p=h.code===void 0?j.UNKNOWN:T_(h.code);return new ee(p,h.message||"")}(o);n=new I_(r,s,i,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=sc(t,r.document.name),i=un(r.document.updateTime),o=r.document.createTime?un(r.document.createTime):oe.min(),l=new Mt({mapValue:{fields:r.document.fields}}),u=ft.newFoundDocument(s,i,o,l),h=r.targetIds||[],p=r.removedTargetIds||[];n=new Fa(h,p,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=sc(t,r.document),i=r.readTime?un(r.readTime):oe.min(),o=ft.newNoDocument(s,i),l=r.removedTargetIds||[];n=new Fa([],l,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=sc(t,r.document),i=r.removedTargetIds||[];n=new Fa([],i,s,null)}else{if(!("filter"in e))return ie();{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new eA(s,i),l=r.targetId;n=new x_(l,o)}}return n}function dA(t,e){let n;if(e instanceof No)n={update:vg(t,e.key,e.value)};else if(e instanceof E_)n={delete:vh(t,e.key)};else if(e instanceof Kr)n={update:vg(t,e.key,e.data),updateMask:EA(e.fieldMask)};else{if(!(e instanceof Yk))return ie();n={verify:vh(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(r=>function(i,o){const l=o.transform;if(l instanceof fo)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof po)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof mo)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof Tl)return{fieldPath:o.field.canonicalString(),increment:l.Pe};throw ie()}(0,r))),e.precondition.isNone||(n.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:uA(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:ie()}(t,e.precondition)),n}function fA(t,e){return t&&t.length>0?(xe(e!==void 0),t.map(n=>function(s,i){let o=s.updateTime?un(s.updateTime):un(i);return o.isEqual(oe.min())&&(o=un(i)),new Gk(o,s.transformResults||[])}(n,e))):[]}function pA(t,e){return{documents:[A_(t,e.path)]}}function mA(t,e){const n={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=A_(t,s);const i=function(h){if(h.length!==0)return P_(hn.create(h,"and"))}(e.filters);i&&(n.structuredQuery.where=i);const o=function(h){if(h.length!==0)return h.map(p=>function(y){return{field:ts(y.field),direction:vA(y.dir)}}(p))}(e.orderBy);o&&(n.structuredQuery.orderBy=o);const l=gh(t,e.limit);return l!==null&&(n.structuredQuery.limit=l),e.startAt&&(n.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{_t:n,parent:s}}function gA(t){let e=cA(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){xe(r===1);const p=n.from[0];p.allDescendants?s=p.collectionId:e=e.child(p.collectionId)}let i=[];n.where&&(i=function(m){const y=R_(m);return y instanceof hn&&i_(y)?y.getFilters():[y]}(n.where));let o=[];n.orderBy&&(o=function(m){return m.map(y=>function(A){return new El(ns(A.field),function(V){switch(V){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(A.direction))}(y))}(n.orderBy));let l=null;n.limit&&(l=function(m){let y;return y=typeof m=="object"?m.value:m,Gl(y)?null:y}(n.limit));let u=null;n.startAt&&(u=function(m){const y=!!m.before,w=m.values||[];return new wl(w,y)}(n.startAt));let h=null;return n.endAt&&(h=function(m){const y=!m.before,w=m.values||[];return new wl(w,y)}(n.endAt)),Dk(e,s,o,i,l,"F",u,h)}function yA(t,e){const n=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return ie()}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function R_(t){return t.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=ns(n.unaryFilter.field);return He.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=ns(n.unaryFilter.field);return He.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=ns(n.unaryFilter.field);return He.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=ns(n.unaryFilter.field);return He.create(o,"!=",{nullValue:"NULL_VALUE"});default:return ie()}}(t):t.fieldFilter!==void 0?function(n){return He.create(ns(n.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return ie()}}(n.fieldFilter.op),n.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(n){return hn.create(n.compositeFilter.filters.map(r=>R_(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return ie()}}(n.compositeFilter.op))}(t):ie()}function vA(t){return iA[t]}function _A(t){return oA[t]}function wA(t){return aA[t]}function ts(t){return{fieldPath:t.canonicalString()}}function ns(t){return et.fromServerFormat(t.fieldPath)}function P_(t){return t instanceof He?function(n){if(n.op==="=="){if(sg(n.value))return{unaryFilter:{field:ts(n.field),op:"IS_NAN"}};if(rg(n.value))return{unaryFilter:{field:ts(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(sg(n.value))return{unaryFilter:{field:ts(n.field),op:"IS_NOT_NAN"}};if(rg(n.value))return{unaryFilter:{field:ts(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:ts(n.field),op:_A(n.op),value:n.value}}}(t):t instanceof hn?function(n){const r=n.getFilters().map(s=>P_(s));return r.length===1?r[0]:{compositeFilter:{op:wA(n.op),filters:r}}}(t):ie()}function EA(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function N_(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xn{constructor(e,n,r,s,i=oe.min(),o=oe.min(),l=st.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=l,this.expectedCount=u}withSequenceNumber(e){return new Xn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new Xn(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Xn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Xn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TA{constructor(e){this.ct=e}}function xA(t){const e=gA({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?mh(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IA{constructor(){this.un=new SA}addToCollectionParentIndex(e,n){return this.un.add(n),M.resolve()}getCollectionParents(e,n){return M.resolve(this.un.getEntries(n))}addFieldIndex(e,n){return M.resolve()}deleteFieldIndex(e,n){return M.resolve()}deleteAllFieldIndexes(e){return M.resolve()}createTargetIndexes(e,n){return M.resolve()}getDocumentsMatchingTarget(e,n){return M.resolve(null)}getIndexType(e,n){return M.resolve(0)}getFieldIndexes(e,n){return M.resolve([])}getNextCollectionGroupToUpdate(e){return M.resolve(null)}getMinOffset(e,n){return M.resolve(fr.min())}getMinOffsetFromCollectionGroup(e,n){return M.resolve(fr.min())}updateCollectionGroup(e,n,r){return M.resolve()}updateIndexEntries(e,n){return M.resolve()}}class SA{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n]||new nt(Fe.comparator),i=!s.has(r);return this.index[n]=s.add(r),i}has(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n];return s&&s.has(r)}getEntries(e){return(this.index[e]||new nt(Fe.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Us{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new Us(0)}static kn(){return new Us(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kA{constructor(){this.changes=new Ys(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,ft.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?M.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AA{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CA{constructor(e,n,r,s){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,n))).next(s=>(r!==null&&$i(r.mutation,s,Qt.empty(),Ke.now()),s))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.getLocalViewOfDocuments(e,r,fe()).next(()=>r))}getLocalViewOfDocuments(e,n,r=fe()){const s=Pr();return this.populateOverlays(e,s,n).next(()=>this.computeViews(e,n,s,r).next(i=>{let o=ki();return i.forEach((l,u)=>{o=o.insert(l,u.overlayedDocument)}),o}))}getOverlayedDocuments(e,n){const r=Pr();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,fe()))}populateOverlays(e,n,r){const s=[];return r.forEach(i=>{n.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((o,l)=>{n.set(o,l)})})}computeViews(e,n,r,s){let i=On();const o=zi(),l=function(){return zi()}();return n.forEach((u,h)=>{const p=r.get(h.key);s.has(h.key)&&(p===void 0||p.mutation instanceof Kr)?i=i.insert(h.key,h):p!==void 0?(o.set(h.key,p.mutation.getFieldMask()),$i(p.mutation,h,p.mutation.getFieldMask(),Ke.now())):o.set(h.key,Qt.empty())}),this.recalculateAndSaveOverlays(e,i).next(u=>(u.forEach((h,p)=>o.set(h,p)),n.forEach((h,p)=>{var m;return l.set(h,new AA(p,(m=o.get(h))!==null&&m!==void 0?m:null))}),l))}recalculateAndSaveOverlays(e,n){const r=zi();let s=new Le((o,l)=>o-l),i=fe();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(o=>{for(const l of o)l.keys().forEach(u=>{const h=n.get(u);if(h===null)return;let p=r.get(u)||Qt.empty();p=l.applyToLocalView(h,p),r.set(u,p);const m=(s.get(l.batchId)||fe()).add(u);s=s.insert(l.batchId,m)})}).next(()=>{const o=[],l=s.getReverseIterator();for(;l.hasNext();){const u=l.getNext(),h=u.key,p=u.value,m=f_();p.forEach(y=>{if(!i.has(y)){const w=__(n.get(y),r.get(y));w!==null&&m.set(y,w),i=i.add(y)}}),o.push(this.documentOverlayCache.saveOverlays(e,h,m))}return M.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,n,r,s){return function(o){return te.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):Ok(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r,s):this.getDocumentsMatchingCollectionQuery(e,n,r,s)}getNextDocuments(e,n,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,s).next(i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,s-i.size):M.resolve(Pr());let l=-1,u=i;return o.next(h=>M.forEach(h,(p,m)=>(l<m.largestBatchId&&(l=m.largestBatchId),i.get(p)?M.resolve():this.remoteDocumentCache.getEntry(e,p).next(y=>{u=u.insert(p,y)}))).next(()=>this.populateOverlays(e,h,i)).next(()=>this.computeViews(e,u,h,fe())).next(p=>({batchId:l,changes:d_(p)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new te(n)).next(r=>{let s=ki();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,n,r,s){const i=n.collectionGroup;let o=ki();return this.indexManager.getCollectionParents(e,i).next(l=>M.forEach(l,u=>{const h=function(m,y){return new Ql(y,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)}(n,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,r,s).next(p=>{p.forEach((m,y)=>{o=o.insert(m,y)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,n,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next(o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,i,s))).next(o=>{i.forEach((u,h)=>{const p=h.getKey();o.get(p)===null&&(o=o.insert(p,ft.newInvalidDocument(p)))});let l=ki();return o.forEach((u,h)=>{const p=i.get(u);p!==void 0&&$i(p.mutation,h,Qt.empty(),Ke.now()),Yl(n,h)&&(l=l.insert(u,h))}),l})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RA{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,n){return M.resolve(this.hr.get(n))}saveBundleMetadata(e,n){return this.hr.set(n.id,function(s){return{id:s.id,version:s.version,createTime:un(s.createTime)}}(n)),M.resolve()}getNamedQuery(e,n){return M.resolve(this.Pr.get(n))}saveNamedQuery(e,n){return this.Pr.set(n.name,function(s){return{name:s.name,query:xA(s.bundledQuery),readTime:un(s.readTime)}}(n)),M.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PA{constructor(){this.overlays=new Le(te.comparator),this.Ir=new Map}getOverlay(e,n){return M.resolve(this.overlays.get(n))}getOverlays(e,n){const r=Pr();return M.forEach(n,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,n,r){return r.forEach((s,i)=>{this.ht(e,n,i)}),M.resolve()}removeOverlaysForBatchId(e,n,r){const s=this.Ir.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Ir.delete(r)),M.resolve()}getOverlaysForCollection(e,n,r){const s=Pr(),i=n.length+1,o=new te(n.child("")),l=this.overlays.getIteratorFrom(o);for(;l.hasNext();){const u=l.getNext().value,h=u.getKey();if(!n.isPrefixOf(h.path))break;h.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return M.resolve(s)}getOverlaysForCollectionGroup(e,n,r,s){let i=new Le((h,p)=>h-p);const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===n&&h.largestBatchId>r){let p=i.get(h.largestBatchId);p===null&&(p=Pr(),i=i.insert(h.largestBatchId,p)),p.set(h.getKey(),h)}}const l=Pr(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((h,p)=>l.set(h,p)),!(l.size()>=s)););return M.resolve(l)}ht(e,n,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.Ir.get(s.largestBatchId).delete(r.key);this.Ir.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new Zk(n,r));let i=this.Ir.get(n);i===void 0&&(i=fe(),this.Ir.set(n,i)),this.Ir.set(n,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NA{constructor(){this.sessionToken=st.EMPTY_BYTE_STRING}getSessionToken(e){return M.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,M.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hd{constructor(){this.Tr=new nt(Ge.Er),this.dr=new nt(Ge.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,n){const r=new Ge(e,n);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,n){e.forEach(r=>this.addReference(r,n))}removeReference(e,n){this.Vr(new Ge(e,n))}mr(e,n){e.forEach(r=>this.removeReference(r,n))}gr(e){const n=new te(new Fe([])),r=new Ge(n,e),s=new Ge(n,e+1),i=[];return this.dr.forEachInRange([r,s],o=>{this.Vr(o),i.push(o.key)}),i}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const n=new te(new Fe([])),r=new Ge(n,e),s=new Ge(n,e+1);let i=fe();return this.dr.forEachInRange([r,s],o=>{i=i.add(o.key)}),i}containsKey(e){const n=new Ge(e,0),r=this.Tr.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class Ge{constructor(e,n){this.key=e,this.wr=n}static Er(e,n){return te.comparator(e.key,n.key)||we(e.wr,n.wr)}static Ar(e,n){return we(e.wr,n.wr)||te.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bA{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.Sr=1,this.br=new nt(Ge.Er)}checkEmpty(e){return M.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,s){const i=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new Xk(i,n,r,s);this.mutationQueue.push(o);for(const l of s)this.br=this.br.add(new Ge(l.key,i)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return M.resolve(o)}lookupMutationBatch(e,n){return M.resolve(this.Dr(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,s=this.vr(r),i=s<0?0:s;return M.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return M.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return M.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new Ge(n,0),s=new Ge(n,Number.POSITIVE_INFINITY),i=[];return this.br.forEachInRange([r,s],o=>{const l=this.Dr(o.wr);i.push(l)}),M.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new nt(we);return n.forEach(s=>{const i=new Ge(s,0),o=new Ge(s,Number.POSITIVE_INFINITY);this.br.forEachInRange([i,o],l=>{r=r.add(l.wr)})}),M.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,s=r.length+1;let i=r;te.isDocumentKey(i)||(i=i.child(""));const o=new Ge(new te(i),0);let l=new nt(we);return this.br.forEachWhile(u=>{const h=u.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(l=l.add(u.wr)),!0)},o),M.resolve(this.Cr(l))}Cr(e){const n=[];return e.forEach(r=>{const s=this.Dr(r);s!==null&&n.push(s)}),n}removeMutationBatch(e,n){xe(this.Fr(n.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return M.forEach(n.mutations,s=>{const i=new Ge(s.key,n.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.br=r})}On(e){}containsKey(e,n){const r=new Ge(n,0),s=this.br.firstAfterOrEqual(r);return M.resolve(n.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,M.resolve()}Fr(e,n){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const n=this.vr(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DA{constructor(e){this.Mr=e,this.docs=function(){return new Le(te.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,s=this.docs.get(r),i=s?s.size:0,o=this.Mr(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return M.resolve(r?r.document.mutableCopy():ft.newInvalidDocument(n))}getEntries(e,n){let r=On();return n.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():ft.newInvalidDocument(s))}),M.resolve(r)}getDocumentsMatchingQuery(e,n,r,s){let i=On();const o=n.path,l=new te(o.child("")),u=this.docs.getIteratorFrom(l);for(;u.hasNext();){const{key:h,value:{document:p}}=u.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||pk(fk(p),r)<=0||(s.has(p.key)||Yl(n,p))&&(i=i.insert(p.key,p.mutableCopy()))}return M.resolve(i)}getAllFromCollectionGroup(e,n,r,s){ie()}Or(e,n){return M.forEach(this.docs,r=>n(r))}newChangeBuffer(e){return new OA(this)}getSize(e){return M.resolve(this.size)}}class OA extends kA{constructor(e){super(),this.cr=e}applyChanges(e){const n=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?n.push(this.cr.addEntry(e,s)):this.cr.removeEntry(r)}),M.waitFor(n)}getFromCache(e,n){return this.cr.getEntry(e,n)}getAllFromCache(e,n){return this.cr.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VA{constructor(e){this.persistence=e,this.Nr=new Ys(n=>jd(n),Fd),this.lastRemoteSnapshotVersion=oe.min(),this.highestTargetId=0,this.Lr=0,this.Br=new Hd,this.targetCount=0,this.kr=Us.Bn()}forEachTarget(e,n){return this.Nr.forEach((r,s)=>n(s)),M.resolve()}getLastRemoteSnapshotVersion(e){return M.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return M.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),M.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.Lr&&(this.Lr=n),M.resolve()}Kn(e){this.Nr.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.kr=new Us(n),this.highestTargetId=n),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,n){return this.Kn(n),this.targetCount+=1,M.resolve()}updateTargetData(e,n){return this.Kn(n),M.resolve()}removeTargetData(e,n){return this.Nr.delete(n.target),this.Br.gr(n.targetId),this.targetCount-=1,M.resolve()}removeTargets(e,n,r){let s=0;const i=[];return this.Nr.forEach((o,l)=>{l.sequenceNumber<=n&&r.get(l.targetId)===null&&(this.Nr.delete(o),i.push(this.removeMatchingKeysForTargetId(e,l.targetId)),s++)}),M.waitFor(i).next(()=>s)}getTargetCount(e){return M.resolve(this.targetCount)}getTargetData(e,n){const r=this.Nr.get(n)||null;return M.resolve(r)}addMatchingKeys(e,n,r){return this.Br.Rr(n,r),M.resolve()}removeMatchingKeys(e,n,r){this.Br.mr(n,r);const s=this.persistence.referenceDelegate,i=[];return s&&n.forEach(o=>{i.push(s.markPotentiallyOrphaned(e,o))}),M.waitFor(i)}removeMatchingKeysForTargetId(e,n){return this.Br.gr(n),M.resolve()}getMatchingKeysForTargetId(e,n){const r=this.Br.yr(n);return M.resolve(r)}containsKey(e,n){return M.resolve(this.Br.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LA{constructor(e,n){this.qr={},this.overlays={},this.Qr=new Od(0),this.Kr=!1,this.Kr=!0,this.$r=new NA,this.referenceDelegate=e(this),this.Ur=new VA(this),this.indexManager=new IA,this.remoteDocumentCache=function(s){return new DA(s)}(r=>this.referenceDelegate.Wr(r)),this.serializer=new TA(n),this.Gr=new RA(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new PA,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this.qr[e.toKey()];return r||(r=new bA(n,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,n,r){K("MemoryPersistence","Starting transaction:",e);const s=new MA(this.Qr.next());return this.referenceDelegate.zr(),r(s).next(i=>this.referenceDelegate.jr(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Hr(e,n){return M.or(Object.values(this.qr).map(r=>()=>r.containsKey(e,n)))}}class MA extends gk{constructor(e){super(),this.currentSequenceNumber=e}}class qd{constructor(e){this.persistence=e,this.Jr=new Hd,this.Yr=null}static Zr(e){return new qd(e)}get Xr(){if(this.Yr)return this.Yr;throw ie()}addReference(e,n,r){return this.Jr.addReference(r,n),this.Xr.delete(r.toString()),M.resolve()}removeReference(e,n,r){return this.Jr.removeReference(r,n),this.Xr.add(r.toString()),M.resolve()}markPotentiallyOrphaned(e,n){return this.Xr.add(n.toString()),M.resolve()}removeTarget(e,n){this.Jr.gr(n.targetId).forEach(s=>this.Xr.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next(s=>{s.forEach(i=>this.Xr.add(i.toString()))}).next(()=>r.removeTargetData(e,n))}zr(){this.Yr=new Set}jr(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return M.forEach(this.Xr,r=>{const s=te.fromPath(r);return this.ei(e,s).next(i=>{i||n.removeEntry(s,oe.min())})}).next(()=>(this.Yr=null,n.apply(e)))}updateLimboDocument(e,n){return this.ei(e,n).next(r=>{r?this.Xr.delete(n.toString()):this.Xr.add(n.toString())})}Wr(e){return 0}ei(e,n){return M.or([()=>M.resolve(this.Jr.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Hr(e,n)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kd{constructor(e,n,r,s){this.targetId=e,this.fromCache=n,this.$i=r,this.Ui=s}static Wi(e,n){let r=fe(),s=fe();for(const i of n.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Kd(e,n.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jA{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FA{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return MT()?8:yk(mt())>0?6:4}()}initialize(e,n){this.Ji=e,this.indexManager=n,this.Gi=!0}getDocumentsMatchingQuery(e,n,r,s){const i={result:null};return this.Yi(e,n).next(o=>{i.result=o}).next(()=>{if(!i.result)return this.Zi(e,n,s,r).next(o=>{i.result=o})}).next(()=>{if(i.result)return;const o=new jA;return this.Xi(e,n,o).next(l=>{if(i.result=l,this.zi)return this.es(e,n,o,l.size)})}).next(()=>i.result)}es(e,n,r,s){return r.documentReadCount<this.ji?(wi()<=pe.DEBUG&&K("QueryEngine","SDK will not create cache indexes for query:",es(n),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),M.resolve()):(wi()<=pe.DEBUG&&K("QueryEngine","Query:",es(n),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Hi*s?(wi()<=pe.DEBUG&&K("QueryEngine","The SDK decides to create cache indexes for query:",es(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,ln(n))):M.resolve())}Yi(e,n){if(lg(n))return M.resolve(null);let r=ln(n);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(n.limit!==null&&s===1&&(n=mh(n,null,"F"),r=ln(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const o=fe(...i);return this.Ji.getDocuments(e,o).next(l=>this.indexManager.getMinOffset(e,r).next(u=>{const h=this.ts(n,l);return this.ns(n,h,o,u.readTime)?this.Yi(e,mh(n,null,"F")):this.rs(e,h,n,u)}))})))}Zi(e,n,r,s){return lg(n)||s.isEqual(oe.min())?M.resolve(null):this.Ji.getDocuments(e,r).next(i=>{const o=this.ts(n,i);return this.ns(n,o,r,s)?M.resolve(null):(wi()<=pe.DEBUG&&K("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),es(n)),this.rs(e,o,n,dk(s,-1)).next(l=>l))})}ts(e,n){let r=new nt(c_(e));return n.forEach((s,i)=>{Yl(e,i)&&(r=r.add(i))}),r}ns(e,n,r,s){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const i=e.limitType==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Xi(e,n,r){return wi()<=pe.DEBUG&&K("QueryEngine","Using full collection scan to execute query:",es(n)),this.Ji.getDocumentsMatchingQuery(e,n,fr.min(),r)}rs(e,n,r,s){return this.Ji.getDocumentsMatchingQuery(e,r,s).next(i=>(n.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UA{constructor(e,n,r,s){this.persistence=e,this.ss=n,this.serializer=s,this.os=new Le(we),this._s=new Ys(i=>jd(i),Fd),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new CA(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.os))}}function zA(t,e,n,r){return new UA(t,e,n,r)}async function b_(t,e){const n=ae(t);return await n.persistence.runTransaction("Handle user change","readonly",r=>{let s;return n.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,n.ls(e),n.mutationQueue.getAllMutationBatches(r))).next(i=>{const o=[],l=[];let u=fe();for(const h of s){o.push(h.batchId);for(const p of h.mutations)u=u.add(p.key)}for(const h of i){l.push(h.batchId);for(const p of h.mutations)u=u.add(p.key)}return n.localDocuments.getDocuments(r,u).next(h=>({hs:h,removedBatchIds:o,addedBatchIds:l}))})})}function $A(t,e){const n=ae(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=n.cs.newChangeBuffer({trackRemovals:!0});return function(l,u,h,p){const m=h.batch,y=m.keys();let w=M.resolve();return y.forEach(A=>{w=w.next(()=>p.getEntry(u,A)).next(R=>{const V=h.docVersions.get(A);xe(V!==null),R.version.compareTo(V)<0&&(m.applyToRemoteDocument(R,h),R.isValidDocument()&&(R.setReadTime(h.commitVersion),p.addEntry(R)))})}),w.next(()=>l.mutationQueue.removeMutationBatch(u,m))}(n,r,e,i).next(()=>i.apply(r)).next(()=>n.mutationQueue.performConsistencyCheck(r)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let u=fe();for(let h=0;h<l.mutationResults.length;++h)l.mutationResults[h].transformResults.length>0&&(u=u.add(l.batch.mutations[h].key));return u}(e))).next(()=>n.localDocuments.getDocuments(r,s))})}function D_(t){const e=ae(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.Ur.getLastRemoteSnapshotVersion(n))}function BA(t,e){const n=ae(t),r=e.snapshotVersion;let s=n.os;return n.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=n.cs.newChangeBuffer({trackRemovals:!0});s=n.os;const l=[];e.targetChanges.forEach((p,m)=>{const y=s.get(m);if(!y)return;l.push(n.Ur.removeMatchingKeys(i,p.removedDocuments,m).next(()=>n.Ur.addMatchingKeys(i,p.addedDocuments,m)));let w=y.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(m)!==null?w=w.withResumeToken(st.EMPTY_BYTE_STRING,oe.min()).withLastLimboFreeSnapshotVersion(oe.min()):p.resumeToken.approximateByteSize()>0&&(w=w.withResumeToken(p.resumeToken,r)),s=s.insert(m,w),function(R,V,T){return R.resumeToken.approximateByteSize()===0||V.snapshotVersion.toMicroseconds()-R.snapshotVersion.toMicroseconds()>=3e8?!0:T.addedDocuments.size+T.modifiedDocuments.size+T.removedDocuments.size>0}(y,w,p)&&l.push(n.Ur.updateTargetData(i,w))});let u=On(),h=fe();if(e.documentUpdates.forEach(p=>{e.resolvedLimboDocuments.has(p)&&l.push(n.persistence.referenceDelegate.updateLimboDocument(i,p))}),l.push(WA(i,o,e.documentUpdates).next(p=>{u=p.Ps,h=p.Is})),!r.isEqual(oe.min())){const p=n.Ur.getLastRemoteSnapshotVersion(i).next(m=>n.Ur.setTargetsMetadata(i,i.currentSequenceNumber,r));l.push(p)}return M.waitFor(l).next(()=>o.apply(i)).next(()=>n.localDocuments.getLocalViewOfDocuments(i,u,h)).next(()=>u)}).then(i=>(n.os=s,i))}function WA(t,e,n){let r=fe(),s=fe();return n.forEach(i=>r=r.add(i)),e.getEntries(t,r).next(i=>{let o=On();return n.forEach((l,u)=>{const h=i.get(l);u.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(l)),u.isNoDocument()&&u.version.isEqual(oe.min())?(e.removeEntry(l,u.readTime),o=o.insert(l,u)):!h.isValidDocument()||u.version.compareTo(h.version)>0||u.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(u),o=o.insert(l,u)):K("LocalStore","Ignoring outdated watch update for ",l,". Current version:",h.version," Watch version:",u.version)}),{Ps:o,Is:s}})}function HA(t,e){const n=ae(t);return n.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function qA(t,e){const n=ae(t);return n.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return n.Ur.getTargetData(r,e).next(i=>i?(s=i,M.resolve(s)):n.Ur.allocateTargetId(r).next(o=>(s=new Xn(e,o,"TargetPurposeListen",r.currentSequenceNumber),n.Ur.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=n.os.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.os=n.os.insert(r.targetId,r),n._s.set(e,r.targetId)),r})}async function wh(t,e,n){const r=ae(t),s=r.os.get(e),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,o=>r.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!Po(o))throw o;K("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.os=r.os.remove(e),r._s.delete(s.target)}function _g(t,e,n){const r=ae(t);let s=oe.min(),i=fe();return r.persistence.runTransaction("Execute query","readwrite",o=>function(u,h,p){const m=ae(u),y=m._s.get(p);return y!==void 0?M.resolve(m.os.get(y)):m.Ur.getTargetData(h,p)}(r,o,ln(e)).next(l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(o,l.targetId).next(u=>{i=u})}).next(()=>r.ss.getDocumentsMatchingQuery(o,e,n?s:oe.min(),n?i:fe())).next(l=>(KA(r,Lk(e),l),{documents:l,Ts:i})))}function KA(t,e,n){let r=t.us.get(e)||oe.min();n.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),t.us.set(e,r)}class wg{constructor(){this.activeTargetIds=$k()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class GA{constructor(){this.so=new wg,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e,n=!0){return n&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,n,r){this.oo[e]=n}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new wg,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QA{_o(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eg{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){K("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){K("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let va=null;function ic(){return va===null?va=function(){return 268435456+Math.round(2147483648*Math.random())}():va++,"0x"+va.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JA={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YA{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ct="WebChannelConnection";class XA extends class{constructor(n){this.databaseInfo=n,this.databaseId=n.databaseId;const r=n.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+n.host,this.vo=`projects/${s}/databases/${i}`,this.Co=this.databaseId.database==="(default)"?`project_id=${s}`:`project_id=${s}&database_id=${i}`}get Fo(){return!1}Mo(n,r,s,i,o){const l=ic(),u=this.xo(n,r.toUriEncodedString());K("RestConnection",`Sending RPC '${n}' ${l}:`,u,s);const h={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(h,i,o),this.No(n,u,h,s).then(p=>(K("RestConnection",`Received RPC '${n}' ${l}: `,p),p),p=>{throw Ls("RestConnection",`RPC '${n}' ${l} failed with error: `,p,"url: ",u,"request:",s),p})}Lo(n,r,s,i,o,l){return this.Mo(n,r,s,i,o)}Oo(n,r,s){n["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Qs}(),n["Content-Type"]="text/plain",this.databaseInfo.appId&&(n["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((i,o)=>n[o]=i),s&&s.headers.forEach((i,o)=>n[o]=i)}xo(n,r){const s=JA[n];return`${this.Do}/v1/${r}:${s}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,n,r,s){const i=ic();return new Promise((o,l)=>{const u=new K0;u.setWithCredentials(!0),u.listenOnce(G0.COMPLETE,()=>{try{switch(u.getLastErrorCode()){case La.NO_ERROR:const p=u.getResponseJson();K(ct,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(p)),o(p);break;case La.TIMEOUT:K(ct,`RPC '${e}' ${i} timed out`),l(new ee(j.DEADLINE_EXCEEDED,"Request time out"));break;case La.HTTP_ERROR:const m=u.getStatus();if(K(ct,`RPC '${e}' ${i} failed with status:`,m,"response text:",u.getResponseText()),m>0){let y=u.getResponseJson();Array.isArray(y)&&(y=y[0]);const w=y==null?void 0:y.error;if(w&&w.status&&w.message){const A=function(V){const T=V.toLowerCase().replace(/_/g,"-");return Object.values(j).indexOf(T)>=0?T:j.UNKNOWN}(w.status);l(new ee(A,w.message))}else l(new ee(j.UNKNOWN,"Server responded with status "+u.getStatus()))}else l(new ee(j.UNAVAILABLE,"Connection failed."));break;default:ie()}}finally{K(ct,`RPC '${e}' ${i} completed.`)}});const h=JSON.stringify(s);K(ct,`RPC '${e}' ${i} sending request:`,s),u.send(n,"POST",h,r,15)})}Bo(e,n,r){const s=ic(),i=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=Y0(),l=J0(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(u.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Oo(u.initMessageHeaders,n,r),u.encodeInitMessageHeaders=!0;const p=i.join("");K(ct,`Creating RPC '${e}' stream ${s}: ${p}`,u);const m=o.createWebChannel(p,u);let y=!1,w=!1;const A=new YA({Io:V=>{w?K(ct,`Not sending because RPC '${e}' stream ${s} is closed:`,V):(y||(K(ct,`Opening RPC '${e}' stream ${s} transport.`),m.open(),y=!0),K(ct,`RPC '${e}' stream ${s} sending:`,V),m.send(V))},To:()=>m.close()}),R=(V,T,E)=>{V.listen(T,I=>{try{E(I)}catch(D){setTimeout(()=>{throw D},0)}})};return R(m,Si.EventType.OPEN,()=>{w||(K(ct,`RPC '${e}' stream ${s} transport opened.`),A.yo())}),R(m,Si.EventType.CLOSE,()=>{w||(w=!0,K(ct,`RPC '${e}' stream ${s} transport closed`),A.So())}),R(m,Si.EventType.ERROR,V=>{w||(w=!0,Ls(ct,`RPC '${e}' stream ${s} transport errored:`,V),A.So(new ee(j.UNAVAILABLE,"The operation could not be completed")))}),R(m,Si.EventType.MESSAGE,V=>{var T;if(!w){const E=V.data[0];xe(!!E);const I=E,D=I.error||((T=I[0])===null||T===void 0?void 0:T.error);if(D){K(ct,`RPC '${e}' stream ${s} received error:`,D);const L=D.status;let N=function(x){const k=$e[x];if(k!==void 0)return T_(k)}(L),_=D.message;N===void 0&&(N=j.INTERNAL,_="Unknown error status: "+L+" with message "+D.message),w=!0,A.So(new ee(N,_)),m.close()}else K(ct,`RPC '${e}' stream ${s} received:`,E),A.bo(E)}}),R(l,Q0.STAT_EVENT,V=>{V.stat===ch.PROXY?K(ct,`RPC '${e}' stream ${s} detected buffering proxy`):V.stat===ch.NOPROXY&&K(ct,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{A.wo()},0),A}}function oc(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tu(t){return new lA(t,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O_{constructor(e,n,r=1e3,s=1.5,i=6e4){this.ui=e,this.timerId=n,this.ko=r,this.qo=s,this.Qo=i,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const n=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),s=Math.max(0,n-r);s>0&&K("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ko} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,s,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V_{constructor(e,n,r,s,i,o,l,u){this.ui=e,this.Ho=r,this.Jo=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=l,this.listener=u,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new O_(e,n)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,n){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():n&&n.code===j.RESOURCE_EXHAUSTED?(Dn(n.toString()),Dn("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):n&&n.code===j.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(n)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),n=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.Yo===n&&this.P_(r,s)},r=>{e(()=>{const s=new ee(j.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(s)})})}P_(e,n){const r=this.h_(this.Yo);this.stream=this.T_(e,n),this.stream.Eo(()=>{r(()=>this.listener.Eo())}),this.stream.Ro(()=>{r(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(s=>{r(()=>this.I_(s))}),this.stream.onMessage(s=>{r(()=>++this.e_==1?this.E_(s):this.onNext(s))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return K("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return n=>{this.ui.enqueueAndForget(()=>this.Yo===e?n():(K("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class ZA extends V_{constructor(e,n,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}T_(e,n){return this.connection.Bo("Listen",e,n)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const n=hA(this.serializer,e),r=function(i){if(!("targetChange"in i))return oe.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?oe.min():o.readTime?un(o.readTime):oe.min()}(e);return this.listener.d_(n,r)}A_(e){const n={};n.database=_h(this.serializer),n.addTarget=function(i,o){let l;const u=o.target;if(l=ph(u)?{documents:pA(i,u)}:{query:mA(i,u)._t},l.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){l.resumeToken=S_(i,o.resumeToken);const h=gh(i,o.expectedCount);h!==null&&(l.expectedCount=h)}else if(o.snapshotVersion.compareTo(oe.min())>0){l.readTime=xl(i,o.snapshotVersion.toTimestamp());const h=gh(i,o.expectedCount);h!==null&&(l.expectedCount=h)}return l}(this.serializer,e);const r=yA(this.serializer,e);r&&(n.labels=r),this.a_(n)}R_(e){const n={};n.database=_h(this.serializer),n.removeTarget=e,this.a_(n)}}class e2 extends V_{constructor(e,n,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,n){return this.connection.Bo("Write",e,n)}E_(e){return xe(!!e.streamToken),this.lastStreamToken=e.streamToken,xe(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){xe(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const n=fA(e.writeResults,e.commitTime),r=un(e.commitTime);return this.listener.g_(r,n)}p_(){const e={};e.database=_h(this.serializer),this.a_(e)}m_(e){const n={streamToken:this.lastStreamToken,writes:e.map(r=>dA(this.serializer,r))};this.a_(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t2 extends class{}{constructor(e,n,r,s){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=s,this.y_=!1}w_(){if(this.y_)throw new ee(j.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,n,r,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.Mo(e,yh(n,r),s,i,o)).catch(i=>{throw i.name==="FirebaseError"?(i.code===j.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new ee(j.UNKNOWN,i.toString())})}Lo(e,n,r,s,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,l])=>this.connection.Lo(e,yh(n,r),s,o,l,i)).catch(o=>{throw o.name==="FirebaseError"?(o.code===j.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new ee(j.UNKNOWN,o.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class n2{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(Dn(n),this.D_=!1):K("OnlineStateTracker",n)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r2{constructor(e,n,r,s,i){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=i,this.k_._o(o=>{r.enqueueAndForget(async()=>{Gr(this)&&(K("RemoteStore","Restarting streams for network reachability change."),await async function(u){const h=ae(u);h.L_.add(4),await Do(h),h.q_.set("Unknown"),h.L_.delete(4),await nu(h)}(this))})}),this.q_=new n2(r,s)}}async function nu(t){if(Gr(t))for(const e of t.B_)await e(!0)}async function Do(t){for(const e of t.B_)await e(!1)}function L_(t,e){const n=ae(t);n.N_.has(e.targetId)||(n.N_.set(e.targetId,e),Yd(n)?Jd(n):Xs(n).r_()&&Qd(n,e))}function Gd(t,e){const n=ae(t),r=Xs(n);n.N_.delete(e),r.r_()&&M_(n,e),n.N_.size===0&&(r.r_()?r.o_():Gr(n)&&n.q_.set("Unknown"))}function Qd(t,e){if(t.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(oe.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}Xs(t).A_(e)}function M_(t,e){t.Q_.xe(e),Xs(t).R_(e)}function Jd(t){t.Q_=new sA({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>t.N_.get(e)||null,tt:()=>t.datastore.serializer.databaseId}),Xs(t).start(),t.q_.v_()}function Yd(t){return Gr(t)&&!Xs(t).n_()&&t.N_.size>0}function Gr(t){return ae(t).L_.size===0}function j_(t){t.Q_=void 0}async function s2(t){t.q_.set("Online")}async function i2(t){t.N_.forEach((e,n)=>{Qd(t,e)})}async function o2(t,e){j_(t),Yd(t)?(t.q_.M_(e),Jd(t)):t.q_.set("Unknown")}async function a2(t,e,n){if(t.q_.set("Online"),e instanceof I_&&e.state===2&&e.cause)try{await async function(s,i){const o=i.cause;for(const l of i.targetIds)s.N_.has(l)&&(await s.remoteSyncer.rejectListen(l,o),s.N_.delete(l),s.Q_.removeTarget(l))}(t,e)}catch(r){K("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Il(t,r)}else if(e instanceof Fa?t.Q_.Ke(e):e instanceof x_?t.Q_.He(e):t.Q_.We(e),!n.isEqual(oe.min()))try{const r=await D_(t.localStore);n.compareTo(r)>=0&&await function(i,o){const l=i.Q_.rt(o);return l.targetChanges.forEach((u,h)=>{if(u.resumeToken.approximateByteSize()>0){const p=i.N_.get(h);p&&i.N_.set(h,p.withResumeToken(u.resumeToken,o))}}),l.targetMismatches.forEach((u,h)=>{const p=i.N_.get(u);if(!p)return;i.N_.set(u,p.withResumeToken(st.EMPTY_BYTE_STRING,p.snapshotVersion)),M_(i,u);const m=new Xn(p.target,u,h,p.sequenceNumber);Qd(i,m)}),i.remoteSyncer.applyRemoteEvent(l)}(t,n)}catch(r){K("RemoteStore","Failed to raise snapshot:",r),await Il(t,r)}}async function Il(t,e,n){if(!Po(e))throw e;t.L_.add(1),await Do(t),t.q_.set("Offline"),n||(n=()=>D_(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{K("RemoteStore","Retrying IndexedDB access"),await n(),t.L_.delete(1),await nu(t)})}function F_(t,e){return e().catch(n=>Il(t,n,e))}async function ru(t){const e=ae(t),n=mr(e);let r=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;l2(e);)try{const s=await HA(e.localStore,r);if(s===null){e.O_.length===0&&n.o_();break}r=s.batchId,u2(e,s)}catch(s){await Il(e,s)}U_(e)&&z_(e)}function l2(t){return Gr(t)&&t.O_.length<10}function u2(t,e){t.O_.push(e);const n=mr(t);n.r_()&&n.V_&&n.m_(e.mutations)}function U_(t){return Gr(t)&&!mr(t).n_()&&t.O_.length>0}function z_(t){mr(t).start()}async function c2(t){mr(t).p_()}async function h2(t){const e=mr(t);for(const n of t.O_)e.m_(n.mutations)}async function d2(t,e,n){const r=t.O_.shift(),s=$d.from(r,e,n);await F_(t,()=>t.remoteSyncer.applySuccessfulWrite(s)),await ru(t)}async function f2(t,e){e&&mr(t).V_&&await async function(r,s){if(function(o){return tA(o)&&o!==j.ABORTED}(s.code)){const i=r.O_.shift();mr(r).s_(),await F_(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await ru(r)}}(t,e),U_(t)&&z_(t)}async function Tg(t,e){const n=ae(t);n.asyncQueue.verifyOperationInProgress(),K("RemoteStore","RemoteStore received new credentials");const r=Gr(n);n.L_.add(3),await Do(n),r&&n.q_.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.L_.delete(3),await nu(n)}async function p2(t,e){const n=ae(t);e?(n.L_.delete(2),await nu(n)):e||(n.L_.add(2),await Do(n),n.q_.set("Unknown"))}function Xs(t){return t.K_||(t.K_=function(n,r,s){const i=ae(n);return i.w_(),new ZA(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(t.datastore,t.asyncQueue,{Eo:s2.bind(null,t),Ro:i2.bind(null,t),mo:o2.bind(null,t),d_:a2.bind(null,t)}),t.B_.push(async e=>{e?(t.K_.s_(),Yd(t)?Jd(t):t.q_.set("Unknown")):(await t.K_.stop(),j_(t))})),t.K_}function mr(t){return t.U_||(t.U_=function(n,r,s){const i=ae(n);return i.w_(),new e2(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(t.datastore,t.asyncQueue,{Eo:()=>Promise.resolve(),Ro:c2.bind(null,t),mo:f2.bind(null,t),f_:h2.bind(null,t),g_:d2.bind(null,t)}),t.B_.push(async e=>{e?(t.U_.s_(),await ru(t)):(await t.U_.stop(),t.O_.length>0&&(K("RemoteStore",`Stopping write stream with ${t.O_.length} pending writes`),t.O_=[]))})),t.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xd{constructor(e,n,r,s,i){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Or,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,s,i){const o=Date.now()+r,l=new Xd(e,n,o,s,i);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new ee(j.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Zd(t,e){if(Dn("AsyncQueue",`${e}: ${t}`),Po(t))return new ee(j.UNAVAILABLE,`${e}: ${t}`);throw t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ss{constructor(e){this.comparator=e?(n,r)=>e(n,r)||te.comparator(n.key,r.key):(n,r)=>te.comparator(n.key,r.key),this.keyedMap=ki(),this.sortedSet=new Le(this.comparator)}static emptySet(e){return new Ss(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,r)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof Ss)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new Ss;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xg{constructor(){this.W_=new Le(te.comparator)}track(e){const n=e.doc.key,r=this.W_.get(n);r?e.type!==0&&r.type===3?this.W_=this.W_.insert(n,e):e.type===3&&r.type!==1?this.W_=this.W_.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.W_=this.W_.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.W_=this.W_.remove(n):e.type===1&&r.type===2?this.W_=this.W_.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):ie():this.W_=this.W_.insert(n,e)}G_(){const e=[];return this.W_.inorderTraversal((n,r)=>{e.push(r)}),e}}class zs{constructor(e,n,r,s,i,o,l,u,h){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=l,this.excludesMetadataChanges=u,this.hasCachedResults=h}static fromInitialDocuments(e,n,r,s,i){const o=[];return n.forEach(l=>{o.push({type:0,doc:l})}),new zs(e,n,Ss.emptySet(n),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Jl(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let s=0;s<n.length;s++)if(n[s].type!==r[s].type||!n[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class m2{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class g2{constructor(){this.queries=Ig(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(n,r){const s=ae(n),i=s.queries;s.queries=Ig(),i.forEach((o,l)=>{for(const u of l.j_)u.onError(r)})})(this,new ee(j.ABORTED,"Firestore shutting down"))}}function Ig(){return new Ys(t=>u_(t),Jl)}async function y2(t,e){const n=ae(t);let r=3;const s=e.query;let i=n.queries.get(s);i?!i.H_()&&e.J_()&&(r=2):(i=new m2,r=e.J_()?0:1);try{switch(r){case 0:i.z_=await n.onListen(s,!0);break;case 1:i.z_=await n.onListen(s,!1);break;case 2:await n.onFirstRemoteStoreListen(s)}}catch(o){const l=Zd(o,`Initialization of query '${es(e.query)}' failed`);return void e.onError(l)}n.queries.set(s,i),i.j_.push(e),e.Z_(n.onlineState),i.z_&&e.X_(i.z_)&&ef(n)}async function v2(t,e){const n=ae(t),r=e.query;let s=3;const i=n.queries.get(r);if(i){const o=i.j_.indexOf(e);o>=0&&(i.j_.splice(o,1),i.j_.length===0?s=e.J_()?0:1:!i.H_()&&e.J_()&&(s=2))}switch(s){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function _2(t,e){const n=ae(t);let r=!1;for(const s of e){const i=s.query,o=n.queries.get(i);if(o){for(const l of o.j_)l.X_(s)&&(r=!0);o.z_=s}}r&&ef(n)}function w2(t,e,n){const r=ae(t),s=r.queries.get(e);if(s)for(const i of s.j_)i.onError(n);r.queries.delete(e)}function ef(t){t.Y_.forEach(e=>{e.next()})}var Eh,Sg;(Sg=Eh||(Eh={})).ea="default",Sg.Cache="cache";class E2{constructor(e,n,r){this.query=e,this.ta=n,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new zs(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.na?this.ia(e)&&(this.ta.next(e),n=!0):this.sa(e,this.onlineState)&&(this.oa(e),n=!0),this.ra=e,n}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let n=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),n=!0),n}sa(e,n){if(!e.fromCache||!this.J_())return!0;const r=n!=="Offline";return(!this.options._a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const n=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}oa(e){e=zs.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==Eh.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $_{constructor(e){this.key=e}}class B_{constructor(e){this.key=e}}class T2{constructor(e,n){this.query=e,this.Ta=n,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=fe(),this.mutatedKeys=fe(),this.Aa=c_(e),this.Ra=new Ss(this.Aa)}get Va(){return this.Ta}ma(e,n){const r=n?n.fa:new xg,s=n?n.Ra:this.Ra;let i=n?n.mutatedKeys:this.mutatedKeys,o=s,l=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((p,m)=>{const y=s.get(p),w=Yl(this.query,m)?m:null,A=!!y&&this.mutatedKeys.has(y.key),R=!!w&&(w.hasLocalMutations||this.mutatedKeys.has(w.key)&&w.hasCommittedMutations);let V=!1;y&&w?y.data.isEqual(w.data)?A!==R&&(r.track({type:3,doc:w}),V=!0):this.ga(y,w)||(r.track({type:2,doc:w}),V=!0,(u&&this.Aa(w,u)>0||h&&this.Aa(w,h)<0)&&(l=!0)):!y&&w?(r.track({type:0,doc:w}),V=!0):y&&!w&&(r.track({type:1,doc:y}),V=!0,(u||h)&&(l=!0)),V&&(w?(o=o.add(w),i=R?i.add(p):i.delete(p)):(o=o.delete(p),i=i.delete(p)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const p=this.query.limitType==="F"?o.last():o.first();o=o.delete(p.key),i=i.delete(p.key),r.track({type:1,doc:p})}return{Ra:o,fa:r,ns:l,mutatedKeys:i}}ga(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r,s){const i=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const o=e.fa.G_();o.sort((p,m)=>function(w,A){const R=V=>{switch(V){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return ie()}};return R(w)-R(A)}(p.type,m.type)||this.Aa(p.doc,m.doc)),this.pa(r),s=s!=null&&s;const l=n&&!s?this.ya():[],u=this.da.size===0&&this.current&&!s?1:0,h=u!==this.Ea;return this.Ea=u,o.length!==0||h?{snapshot:new zs(this.query,e.Ra,i,o,e.mutatedKeys,u===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:l}:{wa:l}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new xg,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(n=>this.Ta=this.Ta.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Ta=this.Ta.delete(n)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=fe(),this.Ra.forEach(r=>{this.Sa(r.key)&&(this.da=this.da.add(r.key))});const n=[];return e.forEach(r=>{this.da.has(r)||n.push(new B_(r))}),this.da.forEach(r=>{e.has(r)||n.push(new $_(r))}),n}ba(e){this.Ta=e.Ts,this.da=fe();const n=this.ma(e.documents);return this.applyChanges(n,!0)}Da(){return zs.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class x2{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class I2{constructor(e){this.key=e,this.va=!1}}class S2{constructor(e,n,r,s,i,o){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Ca={},this.Fa=new Ys(l=>u_(l),Jl),this.Ma=new Map,this.xa=new Set,this.Oa=new Le(te.comparator),this.Na=new Map,this.La=new Hd,this.Ba={},this.ka=new Map,this.qa=Us.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function k2(t,e,n=!0){const r=Q_(t);let s;const i=r.Fa.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Da()):s=await W_(r,e,n,!0),s}async function A2(t,e){const n=Q_(t);await W_(n,e,!0,!1)}async function W_(t,e,n,r){const s=await qA(t.localStore,ln(e)),i=s.targetId,o=t.sharedClientState.addLocalQueryTarget(i,n);let l;return r&&(l=await C2(t,e,i,o==="current",s.resumeToken)),t.isPrimaryClient&&n&&L_(t.remoteStore,s),l}async function C2(t,e,n,r,s){t.Ka=(m,y,w)=>async function(R,V,T,E){let I=V.view.ma(T);I.ns&&(I=await _g(R.localStore,V.query,!1).then(({documents:_})=>V.view.ma(_,I)));const D=E&&E.targetChanges.get(V.targetId),L=E&&E.targetMismatches.get(V.targetId)!=null,N=V.view.applyChanges(I,R.isPrimaryClient,D,L);return Ag(R,V.targetId,N.wa),N.snapshot}(t,m,y,w);const i=await _g(t.localStore,e,!0),o=new T2(e,i.Ts),l=o.ma(i.documents),u=bo.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",s),h=o.applyChanges(l,t.isPrimaryClient,u);Ag(t,n,h.wa);const p=new x2(e,n,o);return t.Fa.set(e,p),t.Ma.has(n)?t.Ma.get(n).push(e):t.Ma.set(n,[e]),h.snapshot}async function R2(t,e,n){const r=ae(t),s=r.Fa.get(e),i=r.Ma.get(s.targetId);if(i.length>1)return r.Ma.set(s.targetId,i.filter(o=>!Jl(o,e))),void r.Fa.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await wh(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),n&&Gd(r.remoteStore,s.targetId),Th(r,s.targetId)}).catch(Ro)):(Th(r,s.targetId),await wh(r.localStore,s.targetId,!0))}async function P2(t,e){const n=ae(t),r=n.Fa.get(e),s=n.Ma.get(r.targetId);n.isPrimaryClient&&s.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),Gd(n.remoteStore,r.targetId))}async function N2(t,e,n){const r=j2(t);try{const s=await function(o,l){const u=ae(o),h=Ke.now(),p=l.reduce((w,A)=>w.add(A.key),fe());let m,y;return u.persistence.runTransaction("Locally write mutations","readwrite",w=>{let A=On(),R=fe();return u.cs.getEntries(w,p).next(V=>{A=V,A.forEach((T,E)=>{E.isValidDocument()||(R=R.add(T))})}).next(()=>u.localDocuments.getOverlayedDocuments(w,A)).next(V=>{m=V;const T=[];for(const E of l){const I=Jk(E,m.get(E.key).overlayedDocument);I!=null&&T.push(new Kr(E.key,I,n_(I.value.mapValue),In.exists(!0)))}return u.mutationQueue.addMutationBatch(w,h,T,l)}).next(V=>{y=V;const T=V.applyToLocalDocumentSet(m,R);return u.documentOverlayCache.saveOverlays(w,V.batchId,T)})}).then(()=>({batchId:y.batchId,changes:d_(m)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(o,l,u){let h=o.Ba[o.currentUser.toKey()];h||(h=new Le(we)),h=h.insert(l,u),o.Ba[o.currentUser.toKey()]=h}(r,s.batchId,n),await Oo(r,s.changes),await ru(r.remoteStore)}catch(s){const i=Zd(s,"Failed to persist write");n.reject(i)}}async function H_(t,e){const n=ae(t);try{const r=await BA(n.localStore,e);e.targetChanges.forEach((s,i)=>{const o=n.Na.get(i);o&&(xe(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?o.va=!0:s.modifiedDocuments.size>0?xe(o.va):s.removedDocuments.size>0&&(xe(o.va),o.va=!1))}),await Oo(n,r,e)}catch(r){await Ro(r)}}function kg(t,e,n){const r=ae(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const s=[];r.Fa.forEach((i,o)=>{const l=o.view.Z_(e);l.snapshot&&s.push(l.snapshot)}),function(o,l){const u=ae(o);u.onlineState=l;let h=!1;u.queries.forEach((p,m)=>{for(const y of m.j_)y.Z_(l)&&(h=!0)}),h&&ef(u)}(r.eventManager,e),s.length&&r.Ca.d_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function b2(t,e,n){const r=ae(t);r.sharedClientState.updateQueryState(e,"rejected",n);const s=r.Na.get(e),i=s&&s.key;if(i){let o=new Le(te.comparator);o=o.insert(i,ft.newNoDocument(i,oe.min()));const l=fe().add(i),u=new eu(oe.min(),new Map,new Le(we),o,l);await H_(r,u),r.Oa=r.Oa.remove(i),r.Na.delete(e),tf(r)}else await wh(r.localStore,e,!1).then(()=>Th(r,e,n)).catch(Ro)}async function D2(t,e){const n=ae(t),r=e.batch.batchId;try{const s=await $A(n.localStore,e);K_(n,r,null),q_(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Oo(n,s)}catch(s){await Ro(s)}}async function O2(t,e,n){const r=ae(t);try{const s=await function(o,l){const u=ae(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let p;return u.mutationQueue.lookupMutationBatch(h,l).next(m=>(xe(m!==null),p=m.keys(),u.mutationQueue.removeMutationBatch(h,m))).next(()=>u.mutationQueue.performConsistencyCheck(h)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(h,p,l)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,p)).next(()=>u.localDocuments.getDocuments(h,p))})}(r.localStore,e);K_(r,e,n),q_(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await Oo(r,s)}catch(s){await Ro(s)}}function q_(t,e){(t.ka.get(e)||[]).forEach(n=>{n.resolve()}),t.ka.delete(e)}function K_(t,e,n){const r=ae(t);let s=r.Ba[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(n?i.reject(n):i.resolve(),s=s.remove(e)),r.Ba[r.currentUser.toKey()]=s}}function Th(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Ma.get(e))t.Fa.delete(r),n&&t.Ca.$a(r,n);t.Ma.delete(e),t.isPrimaryClient&&t.La.gr(e).forEach(r=>{t.La.containsKey(r)||G_(t,r)})}function G_(t,e){t.xa.delete(e.path.canonicalString());const n=t.Oa.get(e);n!==null&&(Gd(t.remoteStore,n),t.Oa=t.Oa.remove(e),t.Na.delete(n),tf(t))}function Ag(t,e,n){for(const r of n)r instanceof $_?(t.La.addReference(r.key,e),V2(t,r)):r instanceof B_?(K("SyncEngine","Document no longer in limbo: "+r.key),t.La.removeReference(r.key,e),t.La.containsKey(r.key)||G_(t,r.key)):ie()}function V2(t,e){const n=e.key,r=n.path.canonicalString();t.Oa.get(n)||t.xa.has(r)||(K("SyncEngine","New document in limbo: "+n),t.xa.add(r),tf(t))}function tf(t){for(;t.xa.size>0&&t.Oa.size<t.maxConcurrentLimboResolutions;){const e=t.xa.values().next().value;t.xa.delete(e);const n=new te(Fe.fromString(e)),r=t.qa.next();t.Na.set(r,new I2(n)),t.Oa=t.Oa.insert(n,r),L_(t.remoteStore,new Xn(ln(Ud(n.path)),r,"TargetPurposeLimboResolution",Od.oe))}}async function Oo(t,e,n){const r=ae(t),s=[],i=[],o=[];r.Fa.isEmpty()||(r.Fa.forEach((l,u)=>{o.push(r.Ka(u,e,n).then(h=>{var p;if((h||n)&&r.isPrimaryClient){const m=h?!h.fromCache:(p=n==null?void 0:n.targetChanges.get(u.targetId))===null||p===void 0?void 0:p.current;r.sharedClientState.updateQueryState(u.targetId,m?"current":"not-current")}if(h){s.push(h);const m=Kd.Wi(u.targetId,h);i.push(m)}}))}),await Promise.all(o),r.Ca.d_(s),await async function(u,h){const p=ae(u);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",m=>M.forEach(h,y=>M.forEach(y.$i,w=>p.persistence.referenceDelegate.addReference(m,y.targetId,w)).next(()=>M.forEach(y.Ui,w=>p.persistence.referenceDelegate.removeReference(m,y.targetId,w)))))}catch(m){if(!Po(m))throw m;K("LocalStore","Failed to update sequence numbers: "+m)}for(const m of h){const y=m.targetId;if(!m.fromCache){const w=p.os.get(y),A=w.snapshotVersion,R=w.withLastLimboFreeSnapshotVersion(A);p.os=p.os.insert(y,R)}}}(r.localStore,i))}async function L2(t,e){const n=ae(t);if(!n.currentUser.isEqual(e)){K("SyncEngine","User change. New user:",e.toKey());const r=await b_(n.localStore,e);n.currentUser=e,function(i,o){i.ka.forEach(l=>{l.forEach(u=>{u.reject(new ee(j.CANCELLED,o))})}),i.ka.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Oo(n,r.hs)}}function M2(t,e){const n=ae(t),r=n.Na.get(e);if(r&&r.va)return fe().add(r.key);{let s=fe();const i=n.Ma.get(e);if(!i)return s;for(const o of i){const l=n.Fa.get(o);s=s.unionWith(l.view.Va)}return s}}function Q_(t){const e=ae(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=H_.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=M2.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=b2.bind(null,e),e.Ca.d_=_2.bind(null,e.eventManager),e.Ca.$a=w2.bind(null,e.eventManager),e}function j2(t){const e=ae(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=D2.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=O2.bind(null,e),e}class Sl{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=tu(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,n){return null}Ha(e,n){return null}za(e){return zA(this.persistence,new FA,e.initialUser,this.serializer)}Ga(e){return new LA(qd.Zr,this.serializer)}Wa(e){return new GA}async terminate(){var e,n;(e=this.gcScheduler)===null||e===void 0||e.stop(),(n=this.indexBackfillerScheduler)===null||n===void 0||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Sl.provider={build:()=>new Sl};class xh{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>kg(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=L2.bind(null,this.syncEngine),await p2(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new g2}()}createDatastore(e){const n=tu(e.databaseInfo.databaseId),r=function(i){return new XA(i)}(e.databaseInfo);return function(i,o,l,u){return new t2(i,o,l,u)}(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return function(r,s,i,o,l){return new r2(r,s,i,o,l)}(this.localStore,this.datastore,e.asyncQueue,n=>kg(this.syncEngine,n,0),function(){return Eg.D()?new Eg:new QA}())}createSyncEngine(e,n){return function(s,i,o,l,u,h,p){const m=new S2(s,i,o,l,u,h);return p&&(m.Qa=!0),m}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){var e,n;await async function(s){const i=ae(s);K("RemoteStore","RemoteStore shutting down."),i.L_.add(5),await Do(i),i.k_.shutdown(),i.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(n=this.eventManager)===null||n===void 0||n.terminate()}}xh.provider={build:()=>new xh};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F2{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):Dn("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,n){setTimeout(()=>{this.muted||e(n)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U2{constructor(e,n,r,s,i){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=s,this.user=ht.UNAUTHENTICATED,this.clientId=Z0.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async o=>{K("FirestoreClient","Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(K("FirestoreClient","Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Or;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=Zd(n,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function ac(t,e){t.asyncQueue.verifyOperationInProgress(),K("FirestoreClient","Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(async s=>{r.isEqual(s)||(await b_(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function Cg(t,e){t.asyncQueue.verifyOperationInProgress();const n=await z2(t);K("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(r=>Tg(e.remoteStore,r)),t.setAppCheckTokenChangeListener((r,s)=>Tg(e.remoteStore,s)),t._onlineComponents=e}async function z2(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){K("FirestoreClient","Using user provided OfflineComponentProvider");try{await ac(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!function(s){return s.name==="FirebaseError"?s.code===j.FAILED_PRECONDITION||s.code===j.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(n))throw n;Ls("Error using user provided cache. Falling back to memory cache: "+n),await ac(t,new Sl)}}else K("FirestoreClient","Using default OfflineComponentProvider"),await ac(t,new Sl);return t._offlineComponents}async function J_(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(K("FirestoreClient","Using user provided OnlineComponentProvider"),await Cg(t,t._uninitializedComponentsProvider._online)):(K("FirestoreClient","Using default OnlineComponentProvider"),await Cg(t,new xh))),t._onlineComponents}function $2(t){return J_(t).then(e=>e.syncEngine)}async function Rg(t){const e=await J_(t),n=e.eventManager;return n.onListen=k2.bind(null,e.syncEngine),n.onUnlisten=R2.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=A2.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=P2.bind(null,e.syncEngine),n}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Y_(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pg=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function B2(t,e,n){if(!n)throw new ee(j.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function W2(t,e,n,r){if(e===!0&&r===!0)throw new ee(j.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function Ng(t){if(!te.isDocumentKey(t))throw new ee(j.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function nf(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":ie()}function ks(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new ee(j.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=nf(t);throw new ee(j.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bg{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new ee(j.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new ee(j.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}W2("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Y_((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new ee(j.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new ee(j.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new ee(j.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class rf{constructor(e,n,r,s){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new bg({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new ee(j.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new ee(j.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new bg(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new rk;switch(r.type){case"firstParty":return new ak(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new ee(j.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=Pg.get(n);r&&(K("ComponentProvider","Removing Datastore"),Pg.delete(n),r.terminate())}(this),Promise.resolve()}}function H2(t,e,n,r={}){var s;const i=(t=ks(t,rf))._getSettings(),o=`${e}:${n}`;if(i.host!=="firestore.googleapis.com"&&i.host!==o&&Ls("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),t._setSettings(Object.assign(Object.assign({},i),{host:o,ssl:!1})),r.mockUserToken){let l,u;if(typeof r.mockUserToken=="string")l=r.mockUserToken,u=ht.MOCK_USER;else{l=PT(r.mockUserToken,(s=t._app)===null||s===void 0?void 0:s.options.projectId);const h=r.mockUserToken.sub||r.mockUserToken.user_id;if(!h)throw new ee(j.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");u=new ht(h)}t._authCredentials=new sk(new X0(l,u))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class su{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new su(this.firestore,e,this._query)}}class Ut{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new go(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Ut(this.firestore,e,this._key)}}class go extends su{constructor(e,n,r){super(e,n,Ud(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Ut(this.firestore,null,new te(e))}withConverter(e){return new go(this.firestore,e,this._path)}}function Dg(t,e,...n){if(t=Bt(t),arguments.length===1&&(e=Z0.newId()),B2("doc","path",e),t instanceof rf){const r=Fe.fromString(e,...n);return Ng(r),new Ut(t,null,new te(r))}{if(!(t instanceof Ut||t instanceof go))throw new ee(j.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Fe.fromString(e,...n));return Ng(r),new Ut(t.firestore,t instanceof go?t.converter:null,new te(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Og{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new O_(this,"async_queue_retry"),this.Vu=()=>{const r=oc();r&&K("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const n=oc();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const n=oc();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const n=new Or;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!Po(e))throw e;K("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const n=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;const s=function(o){let l=o.message||"";return o.stack&&(l=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),l}(r);throw Dn("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.du=!1,r))));return this.mu=n,n}enqueueAfterDelay(e,n,r){this.fu(),this.Ru.indexOf(e)>-1&&(n=0);const s=Xd.createAndSchedule(this,e,n,r,i=>this.yu(i));return this.Tu.push(s),s}fu(){this.Eu&&ie()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const n of this.Tu)if(n.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.Tu)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const n=this.Tu.indexOf(e);this.Tu.splice(n,1)}}function Vg(t){return function(n,r){if(typeof n!="object"||n===null)return!1;const s=n;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1}(t,["next","error","complete"])}class kl extends rf{constructor(e,n,r,s){super(e,n,r,s),this.type="firestore",this._queue=new Og,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Og(e),this._firestoreClient=void 0,await e}}}function q2(t,e){const n=typeof t=="object"?t:h0(),r=typeof t=="string"?t:"(default)",s=xd(n,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=CT("firestore");i&&H2(s,...i)}return s}function X_(t){if(t._terminated)throw new ee(j.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||K2(t),t._firestoreClient}function K2(t){var e,n,r;const s=t._freezeSettings(),i=function(l,u,h,p){return new wk(l,u,h,p.host,p.ssl,p.experimentalForceLongPolling,p.experimentalAutoDetectLongPolling,Y_(p.experimentalLongPollingOptions),p.useFetchStreams)}(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,s);t._componentsProvider||!((n=s.localCache)===null||n===void 0)&&n._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(t._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),t._firestoreClient=new U2(t._authCredentials,t._appCheckCredentials,t._queue,i,t._componentsProvider&&function(l){const u=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(u),_online:u}}(t._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $s{constructor(e){this._byteString=e}static fromBase64String(e){try{return new $s(st.fromBase64String(e))}catch(n){throw new ee(j.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new $s(st.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sf{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new ee(j.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new et(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class of{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class af{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new ee(j.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new ee(j.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return we(this._lat,e._lat)||we(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lf{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const G2=/^__.*__$/;class Q2{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new Kr(e,this.data,this.fieldMask,n,this.fieldTransforms):new No(e,this.data,n,this.fieldTransforms)}}function Z_(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw ie()}}class uf{constructor(e,n,r,s,i,o){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.vu(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new uf(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.Fu({path:r,xu:!1});return s.Ou(e),s}Nu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.Fu({path:r,xu:!1});return s.vu(),s}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return Al(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(Z_(this.Cu)&&G2.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class J2{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||tu(e)}Qu(e,n,r,s=!1){return new uf({Cu:e,methodName:n,qu:r,path:et.emptyPath(),xu:!1,ku:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Y2(t){const e=t._freezeSettings(),n=tu(t._databaseId);return new J2(t._databaseId,!!e.ignoreUndefinedProperties,n)}function X2(t,e,n,r,s,i={}){const o=t.Qu(i.merge||i.mergeFields?2:0,e,n,s);rw("Data must be an object, but it was:",o,r);const l=tw(r,o);let u,h;if(i.merge)u=new Qt(o.fieldMask),h=o.fieldTransforms;else if(i.mergeFields){const p=[];for(const m of i.mergeFields){const y=Z2(e,m,n);if(!o.contains(y))throw new ee(j.INVALID_ARGUMENT,`Field '${y}' is specified in your field mask but missing from your input data.`);tC(p,y)||p.push(y)}u=new Qt(p),h=o.fieldTransforms.filter(m=>u.covers(m.field))}else u=null,h=o.fieldTransforms;return new Q2(new Mt(l),u,h)}class cf extends of{_toFieldTransform(e){return new qk(e.path,new fo)}isEqual(e){return e instanceof cf}}function ew(t,e){if(nw(t=Bt(t)))return rw("Unsupported field value:",e,t),tw(t,e);if(t instanceof of)return function(r,s){if(!Z_(s.Cu))throw s.Bu(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Bu(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(r,s){const i=[];let o=0;for(const l of r){let u=ew(l,s.Lu(o));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),o++}return{arrayValue:{values:i}}}(t,e)}return function(r,s){if((r=Bt(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Bk(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=Ke.fromDate(r);return{timestampValue:xl(s.serializer,i)}}if(r instanceof Ke){const i=new Ke(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:xl(s.serializer,i)}}if(r instanceof af)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof $s)return{bytesValue:S_(s.serializer,r._byteString)};if(r instanceof Ut){const i=s.databaseId,o=r.firestore._databaseId;if(!o.isEqual(i))throw s.Bu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Wd(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof lf)return function(o,l){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:o.toArray().map(u=>{if(typeof u!="number")throw l.Bu("VectorValues must only contain numeric values.");return zd(l.serializer,u)})}}}}}}(r,s);throw s.Bu(`Unsupported field value: ${nf(r)}`)}(t,e)}function tw(t,e){const n={};return e_(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Js(t,(r,s)=>{const i=ew(s,e.Mu(r));i!=null&&(n[r]=i)}),{mapValue:{fields:n}}}function nw(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof Ke||t instanceof af||t instanceof $s||t instanceof Ut||t instanceof of||t instanceof lf)}function rw(t,e,n){if(!nw(n)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(n)){const r=nf(n);throw r==="an object"?e.Bu(t+" a custom object"):e.Bu(t+" "+r)}}function Z2(t,e,n){if((e=Bt(e))instanceof sf)return e._internalPath;if(typeof e=="string")return sw(t,e);throw Al("Field path arguments must be of type string or ",t,!1,void 0,n)}const eC=new RegExp("[~\\*/\\[\\]]");function sw(t,e,n){if(e.search(eC)>=0)throw Al(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new sf(...e.split("."))._internalPath}catch{throw Al(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Al(t,e,n,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let l=`Function ${e}() called with invalid data`;n&&(l+=" (via `toFirestore()`)"),l+=". ";let u="";return(i||o)&&(u+=" (found",i&&(u+=` in field ${r}`),o&&(u+=` in document ${s}`),u+=")"),new ee(j.INVALID_ARGUMENT,l+t+u)}function tC(t,e){return t.some(n=>n.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iw{constructor(e,n,r,s,i){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Ut(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new nC(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(ow("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class nC extends iw{data(){return super.data()}}function ow(t,e){return typeof e=="string"?sw(t,e):e instanceof sf?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rC(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new ee(j.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class sC{convertValue(e,n="none"){switch(Wr(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Ue(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(Br(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw ie()}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const r={};return Js(e,(s,i)=>{r[s]=this.convertValue(i,n)}),r}convertVectorValue(e){var n,r,s;const i=(s=(r=(n=e.fields)===null||n===void 0?void 0:n.value.arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map(o=>Ue(o.doubleValue));return new lf(i)}convertGeoPoint(e){return new af(Ue(e.latitude),Ue(e.longitude))}convertArray(e,n){return(e.values||[]).map(r=>this.convertValue(r,n))}convertServerTimestamp(e,n){switch(n){case"previous":const r=Ld(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(uo(e));default:return null}}convertTimestamp(e){const n=pr(e);return new Ke(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=Fe.fromString(e);xe(N_(r));const s=new co(r.get(1),r.get(3)),i=new te(r.popFirst(5));return s.isEqual(n)||Dn(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iC(t,e,n){let r;return r=t?t.toFirestore(e):e,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ci{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class aw extends iw{constructor(e,n,r,s,i,o){super(e,n,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new Ua(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(ow("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}}class Ua extends aw{data(e={}){return super.data(e)}}class oC{constructor(e,n,r,s){this._firestore=e,this._userDataWriter=n,this._snapshot=s,this.metadata=new Ci(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(r=>{e.call(n,new Ua(this._firestore,this._userDataWriter,r.key,r,new Ci(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new ee(j.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map(l=>{const u=new Ua(s._firestore,s._userDataWriter,l.doc.key,l.doc,new Ci(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}})}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(l=>i||l.type!==3).map(l=>{const u=new Ua(s._firestore,s._userDataWriter,l.doc.key,l.doc,new Ci(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,p=-1;return l.type!==0&&(h=o.indexOf(l.doc.key),o=o.delete(l.doc.key)),l.type!==1&&(o=o.add(l.doc),p=o.indexOf(l.doc.key)),{type:aC(l.type),doc:u,oldIndex:h,newIndex:p}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}}function aC(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return ie()}}class lw extends sC{constructor(e){super(),this.firestore=e}convertBytes(e){return new $s(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new Ut(this.firestore,null,n)}}function lC(t,e,n){t=ks(t,Ut);const r=ks(t.firestore,kl),s=iC(t.converter,e);return cC(r,[X2(Y2(r),"setDoc",t._key,s,t.converter!==null,n).toMutation(t._key,In.none())])}function uC(t,...e){var n,r,s;t=Bt(t);let i={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||Vg(e[o])||(i=e[o],o++);const l={includeMetadataChanges:i.includeMetadataChanges,source:i.source};if(Vg(e[o])){const m=e[o];e[o]=(n=m.next)===null||n===void 0?void 0:n.bind(m),e[o+1]=(r=m.error)===null||r===void 0?void 0:r.bind(m),e[o+2]=(s=m.complete)===null||s===void 0?void 0:s.bind(m)}let u,h,p;if(t instanceof Ut)h=ks(t.firestore,kl),p=Ud(t._key.path),u={next:m=>{e[o]&&e[o](hC(h,t,m))},error:e[o+1],complete:e[o+2]};else{const m=ks(t,su);h=ks(m.firestore,kl),p=m._query;const y=new lw(h);u={next:w=>{e[o]&&e[o](new oC(h,y,m,w))},error:e[o+1],complete:e[o+2]},rC(t._query)}return function(y,w,A,R){const V=new F2(R),T=new E2(w,V,A);return y.asyncQueue.enqueueAndForget(async()=>y2(await Rg(y),T)),()=>{V.Za(),y.asyncQueue.enqueueAndForget(async()=>v2(await Rg(y),T))}}(X_(h),p,l,u)}function cC(t,e){return function(r,s){const i=new Or;return r.asyncQueue.enqueueAndForget(async()=>N2(await $2(r),s,i)),i.promise}(X_(t),e)}function hC(t,e,n){const r=n.docs.get(e._key),s=new lw(t);return new aw(t,s,e._key,r,new Ci(n.hasPendingWrites,n.fromCache),e.converter)}function dC(){return new cf("serverTimestamp")}(function(e,n=!0){(function(s){Qs=s})(Ks),Vs(new Ur("firestore",(r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),l=new kl(new ik(r.getProvider("auth-internal")),new uk(r.getProvider("app-check-internal")),function(h,p){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new ee(j.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new co(h.options.projectId,p)}(o,s),o);return i=Object.assign({useFetchStreams:n},i),l._setSettings(i),l},"PUBLIC").setMultipleInstances(!0)),ur(Xm,"4.7.3",e),ur(Xm,"4.7.3","esm2017")})();var uw={exports:{}};(function(t){var e=function(){var n=String.fromCharCode,r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",i={};function o(u,h){if(!i[u]){i[u]={};for(var p=0;p<u.length;p++)i[u][u.charAt(p)]=p}return i[u][h]}var l={compressToBase64:function(u){if(u==null)return"";var h=l._compress(u,6,function(p){return r.charAt(p)});switch(h.length%4){default:case 0:return h;case 1:return h+"===";case 2:return h+"==";case 3:return h+"="}},decompressFromBase64:function(u){return u==null?"":u==""?null:l._decompress(u.length,32,function(h){return o(r,u.charAt(h))})},compressToUTF16:function(u){return u==null?"":l._compress(u,15,function(h){return n(h+32)})+" "},decompressFromUTF16:function(u){return u==null?"":u==""?null:l._decompress(u.length,16384,function(h){return u.charCodeAt(h)-32})},compressToUint8Array:function(u){for(var h=l.compress(u),p=new Uint8Array(h.length*2),m=0,y=h.length;m<y;m++){var w=h.charCodeAt(m);p[m*2]=w>>>8,p[m*2+1]=w%256}return p},decompressFromUint8Array:function(u){if(u==null)return l.decompress(u);for(var h=new Array(u.length/2),p=0,m=h.length;p<m;p++)h[p]=u[p*2]*256+u[p*2+1];var y=[];return h.forEach(function(w){y.push(n(w))}),l.decompress(y.join(""))},compressToEncodedURIComponent:function(u){return u==null?"":l._compress(u,6,function(h){return s.charAt(h)})},decompressFromEncodedURIComponent:function(u){return u==null?"":u==""?null:(u=u.replace(/ /g,"+"),l._decompress(u.length,32,function(h){return o(s,u.charAt(h))}))},compress:function(u){return l._compress(u,16,function(h){return n(h)})},_compress:function(u,h,p){if(u==null)return"";var m,y,w={},A={},R="",V="",T="",E=2,I=3,D=2,L=[],N=0,_=0,g;for(g=0;g<u.length;g+=1)if(R=u.charAt(g),Object.prototype.hasOwnProperty.call(w,R)||(w[R]=I++,A[R]=!0),V=T+R,Object.prototype.hasOwnProperty.call(w,V))T=V;else{if(Object.prototype.hasOwnProperty.call(A,T)){if(T.charCodeAt(0)<256){for(m=0;m<D;m++)N=N<<1,_==h-1?(_=0,L.push(p(N)),N=0):_++;for(y=T.charCodeAt(0),m=0;m<8;m++)N=N<<1|y&1,_==h-1?(_=0,L.push(p(N)),N=0):_++,y=y>>1}else{for(y=1,m=0;m<D;m++)N=N<<1|y,_==h-1?(_=0,L.push(p(N)),N=0):_++,y=0;for(y=T.charCodeAt(0),m=0;m<16;m++)N=N<<1|y&1,_==h-1?(_=0,L.push(p(N)),N=0):_++,y=y>>1}E--,E==0&&(E=Math.pow(2,D),D++),delete A[T]}else for(y=w[T],m=0;m<D;m++)N=N<<1|y&1,_==h-1?(_=0,L.push(p(N)),N=0):_++,y=y>>1;E--,E==0&&(E=Math.pow(2,D),D++),w[V]=I++,T=String(R)}if(T!==""){if(Object.prototype.hasOwnProperty.call(A,T)){if(T.charCodeAt(0)<256){for(m=0;m<D;m++)N=N<<1,_==h-1?(_=0,L.push(p(N)),N=0):_++;for(y=T.charCodeAt(0),m=0;m<8;m++)N=N<<1|y&1,_==h-1?(_=0,L.push(p(N)),N=0):_++,y=y>>1}else{for(y=1,m=0;m<D;m++)N=N<<1|y,_==h-1?(_=0,L.push(p(N)),N=0):_++,y=0;for(y=T.charCodeAt(0),m=0;m<16;m++)N=N<<1|y&1,_==h-1?(_=0,L.push(p(N)),N=0):_++,y=y>>1}E--,E==0&&(E=Math.pow(2,D),D++),delete A[T]}else for(y=w[T],m=0;m<D;m++)N=N<<1|y&1,_==h-1?(_=0,L.push(p(N)),N=0):_++,y=y>>1;E--,E==0&&(E=Math.pow(2,D),D++)}for(y=2,m=0;m<D;m++)N=N<<1|y&1,_==h-1?(_=0,L.push(p(N)),N=0):_++,y=y>>1;for(;;)if(N=N<<1,_==h-1){L.push(p(N));break}else _++;return L.join("")},decompress:function(u){return u==null?"":u==""?null:l._decompress(u.length,32768,function(h){return u.charCodeAt(h)})},_decompress:function(u,h,p){var m=[],y=4,w=4,A=3,R="",V=[],T,E,I,D,L,N,_,g={val:p(0),position:h,index:1};for(T=0;T<3;T+=1)m[T]=T;for(I=0,L=Math.pow(2,2),N=1;N!=L;)D=g.val&g.position,g.position>>=1,g.position==0&&(g.position=h,g.val=p(g.index++)),I|=(D>0?1:0)*N,N<<=1;switch(I){case 0:for(I=0,L=Math.pow(2,8),N=1;N!=L;)D=g.val&g.position,g.position>>=1,g.position==0&&(g.position=h,g.val=p(g.index++)),I|=(D>0?1:0)*N,N<<=1;_=n(I);break;case 1:for(I=0,L=Math.pow(2,16),N=1;N!=L;)D=g.val&g.position,g.position>>=1,g.position==0&&(g.position=h,g.val=p(g.index++)),I|=(D>0?1:0)*N,N<<=1;_=n(I);break;case 2:return""}for(m[3]=_,E=_,V.push(_);;){if(g.index>u)return"";for(I=0,L=Math.pow(2,A),N=1;N!=L;)D=g.val&g.position,g.position>>=1,g.position==0&&(g.position=h,g.val=p(g.index++)),I|=(D>0?1:0)*N,N<<=1;switch(_=I){case 0:for(I=0,L=Math.pow(2,8),N=1;N!=L;)D=g.val&g.position,g.position>>=1,g.position==0&&(g.position=h,g.val=p(g.index++)),I|=(D>0?1:0)*N,N<<=1;m[w++]=n(I),_=w-1,y--;break;case 1:for(I=0,L=Math.pow(2,16),N=1;N!=L;)D=g.val&g.position,g.position>>=1,g.position==0&&(g.position=h,g.val=p(g.index++)),I|=(D>0?1:0)*N,N<<=1;m[w++]=n(I),_=w-1,y--;break;case 2:return V.join("")}if(y==0&&(y=Math.pow(2,A),A++),m[_])R=m[_];else if(_===w)R=E+E.charAt(0);else return null;V.push(R),m[w++]=E+R.charAt(0),y--,E=R,y==0&&(y=Math.pow(2,A),A++)}}};return l}();t!=null?t.exports=e:typeof angular<"u"&&angular!=null&&angular.module("LZString",[]).factory("LZString",function(){return e})})(uw);var fC=uw.exports;const cw=Bg(fC);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var pC={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mC=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),ne=(t,e)=>{const n=W.forwardRef(({color:r="currentColor",size:s=24,strokeWidth:i=2,absoluteStrokeWidth:o,className:l="",children:u,...h},p)=>W.createElement("svg",{ref:p,...pC,width:s,height:s,stroke:r,strokeWidth:o?Number(i)*24/Number(s):i,className:["lucide",`lucide-${mC(t)}`,l].join(" "),...h},[...e.map(([m,y])=>W.createElement(m,y)),...Array.isArray(u)?u:[u]]));return n.displayName=`${t}`,n};/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iu=ne("AlertCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gC=ne("ArrowRightCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 12h8",key:"1wcyev"}],["path",{d:"m12 16 4-4-4-4",key:"1i9zcv"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yC=ne("BarChart2",[["line",{x1:"18",x2:"18",y1:"20",y2:"10",key:"1xfpm4"}],["line",{x1:"12",x2:"12",y1:"20",y2:"4",key:"be30l9"}],["line",{x1:"6",x2:"6",y1:"20",y2:"14",key:"1r4le6"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vC=ne("BookOpen",[["path",{d:"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z",key:"vv98re"}],["path",{d:"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",key:"1cyq3y"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hf=ne("BrainCircuit",[["path",{d:"M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08 2.5 2.5 0 0 0 4.91.05L12 20V4.5Z",key:"ixwj2a"}],["path",{d:"M16 8V5c0-1.1.9-2 2-2",key:"13dx7u"}],["path",{d:"M12 13h4",key:"1ku699"}],["path",{d:"M12 18h6a2 2 0 0 1 2 2v1",key:"105ag5"}],["path",{d:"M12 8h8",key:"1lhi5i"}],["path",{d:"M20.5 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z",key:"1s25gz"}],["path",{d:"M16.5 13a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z",key:"127460"}],["path",{d:"M20.5 21a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z",key:"fys062"}],["path",{d:"M18.5 3a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z",key:"1vib61"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _C=ne("Calendar",[["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",ry:"2",key:"eu3xkr"}],["line",{x1:"16",x2:"16",y1:"2",y2:"6",key:"m3sa8f"}],["line",{x1:"8",x2:"8",y1:"2",y2:"6",key:"18kwsl"}],["line",{x1:"3",x2:"21",y1:"10",y2:"10",key:"xt86sb"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const df=ne("CheckCircle2",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hw=ne("CheckSquare",[["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}],["path",{d:"M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",key:"1jnkn4"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cl=ne("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wC=ne("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dw=ne("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ff=ne("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const EC=ne("CloudLightning",[["path",{d:"M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973",key:"1cez44"}],["path",{d:"m13 12-3 5h4l-3 5",key:"1t22er"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const TC=ne("CloudOff",[["path",{d:"m2 2 20 20",key:"1ooewy"}],["path",{d:"M5.782 5.782A7 7 0 0 0 9 19h8.5a4.5 4.5 0 0 0 1.307-.193",key:"yfwify"}],["path",{d:"M21.532 16.5A4.5 4.5 0 0 0 17.5 10h-1.79A7.008 7.008 0 0 0 10 5.07",key:"jlfiyv"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xC=ne("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const IC=ne("EyeOff",[["path",{d:"M9.88 9.88a3 3 0 1 0 4.24 4.24",key:"1jxqfv"}],["path",{d:"M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68",key:"9wicm4"}],["path",{d:"M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61",key:"1jreej"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lg=ne("Eye",[["path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z",key:"rwhkz3"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const SC=ne("FileJson",[["path",{d:"M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z",key:"1nnpy2"}],["polyline",{points:"14 2 14 8 20 8",key:"1ew0cm"}],["path",{d:"M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1",key:"1oajmo"}],["path",{d:"M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1",key:"mpwhp6"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kC=ne("Filter",[["polygon",{points:"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3",key:"1yg77f"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bs=ne("Flag",[["path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z",key:"i9b6wo"}],["line",{x1:"4",x2:"4",y1:"22",y2:"15",key:"1cm3nv"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const AC=ne("GraduationCap",[["path",{d:"M22 10v6M2 10l10-5 10 5-10 5z",key:"1ef52a"}],["path",{d:"M6 12v5c3 3 9 3 12 0v-5",key:"1f75yj"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const CC=ne("History",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M12 7v5l4 2",key:"1fdv2h"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const RC=ne("Image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fw=ne("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pf=ne("LayoutGrid",[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1",key:"1g98yp"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1",key:"6d4xhi"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1",key:"nxv5o0"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1",key:"1bb6yr"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mf=ne("Library",[["path",{d:"m16 6 4 14",key:"ji33uf"}],["path",{d:"M12 6v14",key:"1n7gus"}],["path",{d:"M8 8v12",key:"1gg7y9"}],["path",{d:"M4 4v16",key:"6qkkli"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cr=ne("Loader2",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const PC=ne("MessageSquare",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const NC=ne("Moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pw=ne("MousePointer2",[["path",{d:"m4 4 7.07 17 2.51-7.39L21 11.07z",key:"1vqm48"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bC=ne("PanelRightClose",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M15 3v18",key:"14nvp0"}],["path",{d:"m8 9 3 3-3 3",key:"12hl5m"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const DC=ne("PanelRightOpen",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M15 3v18",key:"14nvp0"}],["path",{d:"m10 15-3-3 3-3",key:"1pgupc"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const OC=ne("PieChart",[["path",{d:"M21.21 15.89A10 10 0 1 1 8 2.83",key:"k2fpak"}],["path",{d:"M22 12A10 10 0 0 0 12 2v10z",key:"1rfc4y"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const VC=ne("Play",[["polygon",{points:"5 3 19 12 5 21 5 3",key:"191637"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mw=ne("PlusCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 12h8",key:"1wcyev"}],["path",{d:"M12 8v8",key:"napkw2"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gw=ne("RotateCcw",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yw=ne("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const LC=ne("Send",[["path",{d:"m22 2-7 20-4-9-9-4Z",key:"1q3vgg"}],["path",{d:"M22 2 11 13",key:"nzbqef"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const MC=ne("Shuffle",[["path",{d:"M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22",key:"1wmou1"}],["path",{d:"m18 2 4 4-4 4",key:"pucp1d"}],["path",{d:"M2 6h1.9c1.5 0 2.9.9 3.6 2.2",key:"10bdb2"}],["path",{d:"M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8",key:"vgxac0"}],["path",{d:"m18 14 4 4-4 4",key:"10pe0f"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gf=ne("Sparkles",[["path",{d:"m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z",key:"17u4zn"}],["path",{d:"M5 3v4",key:"bklmnn"}],["path",{d:"M19 17v4",key:"iiml17"}],["path",{d:"M3 5h4",key:"nem4j1"}],["path",{d:"M17 19h4",key:"lbex7p"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lc=ne("SquarePen",[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z",key:"1lpok0"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jC=ne("StickyNote",[["path",{d:"M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z",key:"1wis1t"}],["path",{d:"M15 3v6h6",key:"edgan2"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const FC=ne("Sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ih=ne("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sh=ne("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const UC=ne("Volume2",[["polygon",{points:"11 5 6 9 2 9 2 15 6 15 11 19 11 5",key:"16drj5"}],["path",{d:"M15.54 8.46a5 5 0 0 1 0 7.07",key:"ltjumu"}],["path",{d:"M19.07 4.93a10 10 0 0 1 0 14.14",key:"1kegas"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zC=ne("VolumeX",[["polygon",{points:"11 5 6 9 2 9 2 15 6 15 11 19 11 5",key:"16drj5"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15",key:"1ewh16"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15",key:"5ykzw1"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $C=ne("Wifi",[["path",{d:"M5 13a10 10 0 0 1 14 0",key:"6v8j51"}],["path",{d:"M8.5 16.5a5 5 0 0 1 7 0",key:"sej527"}],["path",{d:"M2 8.82a15 15 0 0 1 20 0",key:"dnpr2z"}],["line",{x1:"12",x2:"12.01",y1:"20",y2:"20",key:"of4bc4"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vw=ne("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),Mg="icu_resident_master_v2",_w="AIzaSyD9wy-5wZToEmGiWM6CooJh4te48YpU-iw",jg=[];class BC extends Ph.Component{constructor(e){super(e),this.state={hasError:!1,error:null}}static getDerivedStateFromError(e){return{hasError:!0,error:e}}componentDidCatch(e,n){console.error("ErrorBoundary caught an error",e,n)}render(){var e;return this.state.hasError?f.jsxs("div",{className:"p-8 text-center flex flex-col items-center justify-center h-full bg-red-50 rounded-xl border border-red-100 m-4",children:[f.jsx(iu,{className:"w-12 h-12 text-red-800 mb-4"}),f.jsx("h2",{className:"text-xl font-bold text-red-800 mb-2",children:"Something went wrong"}),f.jsx("p",{className:"text-red-600 mb-6 max-w-md text-sm font-mono bg-white p-3 rounded border border-red-200",children:((e=this.state.error)==null?void 0:e.toString())||"Unknown Error"}),f.jsx("button",{onClick:()=>this.setState({hasError:!1}),className:"px-6 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors shadow-sm",children:"Reload Component"})]}):this.props.children}}const WC=t=>{const e=[...t];for(let n=e.length-1;n>0;n--){const r=Math.floor(Math.random()*(n+1));[e[n],e[r]]=[e[r],e[n]]}return e},Fg=t=>JSON.parse(JSON.stringify(t)),Ug=t=>{try{if(!t)return"";const e=JSON.stringify(t);return cw.compressToBase64(e)}catch(e){return console.error("Compression failed",e),""}},zg=(t,e=[])=>{try{if(!t||typeof t!="string")return e;const n=cw.decompressFromBase64(t);return n?JSON.parse(n):e}catch(n){return console.error("Decompression failed",n),e}},$g=t=>{if(!t)return"N/A";const e=t.toDate?t.toDate():new Date(t);return isNaN(e)?"N/A":e.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",second:"2-digit"})+" "+e.toLocaleDateString("en-US",{month:"short",day:"numeric"})};async function As(t,e="tutor"){var l,u,h,p,m;const n={fix:"You are a JSON syntax correction bot. Your ONLY job is to fix the provided invalid JSON string and return ONLY the corrected JSON array. Do not include markdown formatting, explanations, or extra text.",tutor:"You are an expert medical tutor and analyst. Your knowledge base and recommendations must be strictly derived from 'Irwin & Rippe's Intensive Care Medicine (9th Edition)'. Provide concise, high-yield, board-relevant explanations and study plans.",chat:"You are 'Professor Irwin', a senior ICU attending. You are answering a resident's specific follow-up question about a clinical case. Be Socratic, concise, and friendly. Do not lecture; answer the specific question directly using evidence-based ICU principles.",mnemonic:"You are a creative visual artist. Create a vivid, surreal, and memorable visual description (prompt) that represents a mnemonic for the provided medical concept. The output should be a single paragraph describing an image that, if painted, would help a student remember the fact. Do not explain the mnemonic, just describe the visual scene."},r=n[e]||n.tutor,s=`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${_w}`,i=y=>new Promise(w=>setTimeout(w,y)),o={contents:[{parts:[{text:t}]}],systemInstruction:{parts:[{text:r}]}};for(let y=0;y<3;y++)try{const w=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)});if(!w.ok)throw new Error("API Error");const R=(m=(p=(h=(u=(l=(await w.json()).candidates)==null?void 0:l[0])==null?void 0:u.content)==null?void 0:h.parts)==null?void 0:p[0])==null?void 0:m.text;if(!R)throw new Error("No text returned");return R}catch(w){if(y===2)return"Connection Error: "+w.message;await i(1e3*(y+1))}return"Failed to connect to AI."}async function HC(t){var r,s;const e=`https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${_w}`,n={instances:[{prompt:t}],parameters:{sampleCount:1}};try{const i=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});if(!i.ok)throw new Error(`Imagen API Error: ${i.statusText}`);const l=(s=(r=(await i.json()).predictions)==null?void 0:r[0])==null?void 0:s.bytesBase64Encoded;if(!l)throw new Error("No image data returned");return`data:image/png;base64,${l}`}catch(i){throw console.error(i),i}}function qC({notification:t,onClose:e}){return t?f.jsxs("div",{className:`fixed bottom-6 right-6 z-50 p-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300 border ${t.type==="error"?"bg-rose-50 border-rose-200 text-rose-800":"bg-emerald-50 border-emerald-200 text-emerald-800"}`,children:[f.jsx("div",{className:`p-2 rounded-full ${t.type==="error"?"bg-rose-100 text-rose-600":"bg-emerald-100 text-emerald-600"}`,children:t.type==="error"?f.jsx(iu,{size:20}):f.jsx(df,{size:20})}),f.jsxs("div",{children:[f.jsx("h4",{className:"font-bold text-sm",children:t.type==="error"?"Action Failed":"Success"}),f.jsx("p",{className:"text-xs opacity-90 font-medium",children:t.message})]}),f.jsx("button",{onClick:e,className:"ml-4 p-1 rounded-full hover:bg-black/5 transition-colors",children:f.jsx(vw,{size:16})})]}):null}function KC({options:t,selected:e,onChange:n,placeholder:r,darkMode:s}){const[i,o]=W.useState(!1),l=W.useRef(null);W.useEffect(()=>{const m=y=>{l.current&&!l.current.contains(y.target)&&o(!1)};return document.addEventListener("mousedown",m),()=>document.removeEventListener("mousedown",m)},[]);const u=m=>{e.includes(m)?n(e.filter(y=>y!==m)):n([...e,m])},h=()=>n(t),p=()=>n([]);return f.jsxs("div",{className:"relative",ref:l,children:[f.jsxs("button",{onClick:()=>o(!i),className:`w-full md:w-auto p-2 rounded-lg border text-sm flex items-center justify-between gap-2 min-w-[150px] ${s?"bg-slate-950 border-slate-700 text-white":"bg-white border-slate-200 text-slate-700"}`,children:[f.jsx("span",{className:"truncate max-w-[150px]",children:e.length===0?r:`${e.length} Selected`}),f.jsx(wC,{size:14})]}),i&&f.jsxs("div",{className:`absolute top-full left-0 mt-1 w-64 max-h-80 overflow-y-auto rounded-xl border shadow-xl z-50 ${s?"bg-slate-900 border-slate-700":"bg-white border-slate-200"}`,children:[f.jsxs("div",{className:`p-2 border-b flex justify-between ${s?"border-slate-800":"border-slate-100"}`,children:[f.jsx("button",{onClick:h,className:"text-xs font-bold text-indigo-500 hover:underline",children:"All"}),f.jsx("button",{onClick:p,className:"text-xs font-bold text-slate-400 hover:underline",children:"Clear"})]}),t.map(m=>f.jsxs("div",{onClick:()=>u(m),className:`p-2 text-xs flex items-center gap-2 cursor-pointer hover:bg-opacity-50 ${e.includes(m)?"bg-indigo-50 dark:bg-indigo-900/30":""} ${s?"hover:bg-slate-800 text-slate-300":"hover:bg-slate-50 text-slate-700"}`,children:[f.jsx("div",{className:`w-4 h-4 rounded border flex items-center justify-center ${e.includes(m)?"bg-indigo-600 border-indigo-600":"border-slate-400"}`,children:e.includes(m)&&f.jsx(Cl,{size:10,className:"text-white"})}),f.jsx("span",{className:"truncate",children:m})]},m))]})]})}const xr=({active:t,onClick:e,icon:n,label:r})=>f.jsxs("button",{onClick:e,className:`w-12 h-12 rounded-xl flex items-center justify-center transition-all mb-4 relative group ${t?"bg-indigo-600 text-white shadow-lg":"text-slate-400 hover:bg-slate-800 hover:text-white"}`,children:[Ph.cloneElement(n,{size:24}),f.jsx("span",{className:"absolute left-14 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 font-bold shadow-lg",children:r})]});function _a({label:t,value:e,icon:n,darkMode:r}){return f.jsxs("div",{className:`p-4 rounded-xl border flex items-center gap-4 ${r?"bg-slate-900 border-slate-800":"bg-white border-slate-200 shadow-sm"}`,children:[f.jsx("div",{className:`p-3 rounded-lg ${r?"bg-slate-800":"bg-slate-50"}`,children:n}),f.jsxs("div",{children:[f.jsx("div",{className:"text-2xl font-bold",children:e}),f.jsx("div",{className:"text-xs text-slate-500 uppercase tracking-wider font-medium",children:t})]})]})}function GC({syncStatus:t,activeView:e,darkMode:n,fallbackMode:r,lastCloudUpdate:s,sessionStartTime:i,onManualSync:o}){const l=$g(s),u=$g(i);return f.jsxs("header",{className:`pt-[env(safe-area-inset-top)] border-b flex items-center justify-between px-6 shrink-0 z-30 sticky top-0 transition-all ${n?"bg-slate-950 border-slate-800":"bg-white border-slate-200"} h-auto min-h-[4rem]`,children:[f.jsxs("h2",{className:"font-bold text-lg capitalize flex items-center gap-2 py-3",children:[e==="control"?"Command Center":e==="generator"?"AI Generator":e,t==="syncing"&&f.jsx(cr,{size:14,className:"animate-spin text-indigo-500"}),t==="saved"&&f.jsx(df,{size:14,className:"text-emerald-500"}),t==="error"&&f.jsx(TC,{size:14,className:"text-rose-500"})]}),f.jsxs("div",{className:"flex items-center gap-3 text-right",children:[f.jsxs("div",{className:"flex flex-col text-xs space-y-0.5 hidden md:flex",children:[f.jsxs("span",{className:`font-bold ${n?"text-slate-300":"text-slate-700"}`,children:["Last Cloud Sync: ",l]}),f.jsxs("span",{className:`text-slate-500 ${r?"text-rose-500":""}`,children:["Session Started: ",u]})]}),f.jsx("button",{onClick:o,className:"p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-indigo-500 transition-colors",title:"Force Sync",children:f.jsx(gw,{size:16})}),f.jsxs("div",{className:`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono border ${n?"border-slate-800 text-slate-400":"border-slate-200 text-slate-500 bg-slate-100"}`,children:[f.jsx($C,{size:14,className:r?"text-slate-400":"text-emerald-500"})," ",r?"Local":"Online"]})]})]})}function QC({library:t,onCreate:e,darkMode:n,notify:r}){const[s,i]=W.useState("all"),[o,l]=W.useState(!1),[u,h]=W.useState([]),[p,m]=W.useState(""),[y,w]=W.useState(null),[A,R]=W.useState(!1),[V,T]=W.useState(!1),E=W.useRef(!1),I=W.useRef(!0),D=W.useMemo(()=>[...new Set(t.map(J=>J.package))],[t]);W.useEffect(()=>{h(D)},[t]);const L=J=>{if(!V&&window.matchMedia("(hover: none)").matches)return;E.current=!0;const Ae=u.includes(J);I.current=!Ae,x(J,I.current)},N=J=>{E.current&&x(J,I.current)},_=()=>{E.current=!1},g=J=>{x(J,!u.includes(J))},x=(J,Ae)=>{h(ue=>Ae&&!ue.includes(J)?[...ue,J]:!Ae&&ue.includes(J)?ue.filter(me=>me!==J):ue)};W.useEffect(()=>(window.addEventListener("mouseup",_),()=>window.removeEventListener("mouseup",_)),[]);const k=()=>h(D),C=()=>h([]),P=t.filter(J=>u.includes(J.package)?s==="wrong"?J.globalState.status==="wrong":s==="flagged"?J.globalState.flagged:s==="unanswered"?J.globalState.status==="unanswered":!0:!1).length,S=async()=>{if(!p.trim()||A)return;R(!0);const J=D.map(me=>{const z=t.filter(le=>le.package===me).length,Y=t.filter(le=>le.package===me&&le.globalState.status!=="unanswered").length,X=t.filter(le=>le.package===me&&le.globalState.status==="correct").length,de=Y>0?X/Y*100:0;return{name:me,total:z,answered:Y,accuracy:de.toFixed(0)}}).filter(me=>me.total>0),Ae=`
      USER GOAL: "${p}"
      AVAILABLE PACKAGES:
      ${J.map(me=>`${me.name}: ${me.total} / ${me.answered} / ${me.accuracy}%`).join(`
`)}

      Generate a highly actionable study plan based on Irwin & Rippe (9th Ed.) structured into 3 prioritized steps. Suggest specific packages/modes. Output using Markdown.
    `,ue=await As(Ae,"tutor");w(ue),R(!1)};return f.jsxs("div",{className:"p-8 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4",children:[f.jsx("div",{className:"flex justify-between items-end mb-8",children:f.jsxs("div",{children:[f.jsx("h1",{className:`text-3xl font-bold mb-2 ${n?"text-white":"text-slate-900"}`,children:"Command Center"}),f.jsx("p",{className:`${n?"text-slate-400":"text-slate-500"}`,children:"Auto-Sync Active. Ready to study."})]})}),f.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:[f.jsxs("div",{className:`p-6 rounded-2xl border flex flex-col ${n?"bg-slate-900 border-slate-800":"bg-white border-slate-200 shadow-sm"}`,children:[f.jsxs("div",{className:"flex items-center justify-between mb-4",children:[f.jsxs("div",{className:"flex items-center gap-2 text-indigo-500 font-bold uppercase text-xs tracking-wider",children:[f.jsx(mf,{size:14})," Sources"]}),f.jsxs("div",{className:"flex items-center gap-2",children:[f.jsxs("button",{onClick:()=>T(!V),className:`p-1.5 rounded-lg text-xs font-bold transition-all ${V?"bg-indigo-600 text-white":"bg-slate-200 text-slate-500"}`,title:"Toggle Selection Mode (Fixes Scroll)",children:[f.jsx(pw,{size:14})," ",V?"Paint ON":"Paint OFF"]}),f.jsxs("div",{className:"flex gap-2 text-xs font-bold",children:[f.jsx("button",{onClick:k,className:"hover:text-indigo-500",children:"All"}),f.jsx("span",{className:"text-slate-300",children:"|"}),f.jsx("button",{onClick:C,className:"hover:text-indigo-500",children:"None"})]})]})]}),f.jsxs("div",{className:"space-y-2 max-h-60 overflow-y-auto custom-scrollbar select-none flex-1 touch-pan-y",style:{touchAction:V?"none":"auto"},children:[D.map(J=>f.jsxs("div",{onMouseDown:()=>L(J),onMouseEnter:()=>N(J),onClick:()=>g(J),onTouchStart:()=>L(J),onTouchMove:Ae=>{if(V&&E.current){const ue=Ae.touches[0],me=document.elementFromPoint(ue.clientX,ue.clientY),z=me==null?void 0:me.closest("[data-pkg]");z&&x(z.dataset.pkg,I.current)}},"data-pkg":J,className:`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${u.includes(J)?"border-indigo-500 bg-indigo-50 text-indigo-900":n?"border-slate-700 text-slate-400 hover:bg-slate-800":"border-slate-100 text-slate-600 hover:bg-slate-50"}`,children:[f.jsx("span",{className:"text-sm font-medium truncate pr-2",children:J}),u.includes(J)&&f.jsx(df,{size:16,className:"text-indigo-600 shrink-0"})]},J)),D.length===0&&f.jsx("div",{className:"text-center text-slate-400 text-sm py-8",children:"Library empty. Import data or use AI Gen."})]}),f.jsx("div",{className:"text-xs text-center text-slate-400 mt-2",children:V?"Slide finger to select multiple":"Click to select or Toggle Paint Mode"})]}),f.jsxs("div",{className:`p-6 rounded-2xl border ${n?"bg-slate-900 border-slate-800":"bg-white border-slate-200 shadow-sm"}`,children:[f.jsxs("div",{className:"flex items-center gap-2 mb-4 text-rose-500 font-bold uppercase text-xs tracking-wider",children:[f.jsx(kC,{size:14})," Mode"]}),f.jsx("div",{className:"space-y-2",children:[{id:"all",l:"All Questions",i:f.jsx(pf,{size:16})},{id:"unanswered",l:"Unanswered Only",i:f.jsx(hw,{size:16})},{id:"wrong",l:"Mistakes Only",i:f.jsx(iu,{size:16})},{id:"flagged",l:"Flagged Only",i:f.jsx(Bs,{size:16})}].map(J=>f.jsxs("button",{onClick:()=>i(J.id),className:`w-full flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-all ${s===J.id?"bg-slate-800 text-white":n?"hover:bg-slate-800 text-slate-400":"hover:bg-slate-100 text-slate-600"}`,children:[J.i," ",J.l]},J.id))}),f.jsx("div",{className:"mt-6 pt-6 border-t border-slate-100 dark:border-slate-800",children:f.jsxs("button",{onClick:()=>l(!o),className:`w-full flex items-center justify-between p-3 rounded-xl text-sm font-medium ${o?"bg-emerald-50 text-emerald-700 border border-emerald-200":n?"bg-slate-800 text-slate-400":"bg-slate-50 text-slate-500"}`,children:[f.jsxs("span",{className:"flex items-center gap-2",children:[f.jsx(MC,{size:16})," Shuffle Deck"]}),f.jsx("div",{className:`w-4 h-4 rounded-full border ${o?"bg-emerald-500 border-emerald-500":"border-slate-400"}`})]})})]}),f.jsxs("div",{className:`p-6 rounded-2xl border flex flex-col justify-between ${n?"bg-slate-900 border-slate-800":"bg-white border-slate-200 shadow-sm"}`,children:[f.jsxs("div",{children:[f.jsxs("div",{className:"flex items-center gap-2 mb-4 text-emerald-500 font-bold uppercase text-xs tracking-wider",children:[f.jsx(VC,{size:14})," Launch"]}),f.jsxs("div",{className:"text-center py-8",children:[f.jsx("div",{className:`text-5xl font-bold mb-2 ${n?"text-white":"text-slate-900"}`,children:P}),f.jsx("div",{className:"text-sm text-slate-500",children:"Questions Selected"})]})]}),f.jsx("button",{onClick:()=>{e({mode:s,shuffle:o,packages:u}),r(`Session started with ${P} questions.`,"success")},disabled:P===0,className:"w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/30 transition-all active:scale-95 disabled:opacity-50",children:"Start Session"})]})]}),f.jsxs("div",{className:`mt-6 p-6 rounded-2xl border ${n?"bg-slate-900 border-slate-700":"bg-white border-slate-200 shadow-lg"}`,children:[f.jsxs("h2",{className:`text-xl font-bold mb-3 flex items-center gap-2 ${n?"text-white":"text-slate-800"}`,children:[f.jsx(hf,{className:"text-teal-500"})," AI Study Plan Generator"]}),f.jsx("input",{type:"text",value:p,onChange:J=>m(J.target.value),placeholder:"e.g., Master all CVC/Arterial line topics before my next shift.",className:`w-full p-3 rounded-lg border-2 mb-3 outline-none ${n?"bg-slate-950 border-slate-800 text-white":"bg-slate-50 border-slate-200 text-slate-900"}`}),f.jsxs("button",{onClick:S,disabled:A||!p.trim()||D.length===0,className:"px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-bold transition-all disabled:opacity-50 flex items-center gap-2 text-sm",children:[A?f.jsx(cr,{className:"animate-spin",size:16}):f.jsx(gf,{size:16}),A?"Generating Plan...":"Generate Plan"]}),y&&f.jsxs("div",{className:`mt-4 p-4 rounded-xl text-sm ${n?"bg-slate-800 text-slate-300":"bg-slate-50 text-slate-700"}`,children:[f.jsx("h3",{className:"font-bold text-teal-500 mb-2",children:"Recommended Study Strategy:"}),f.jsx("div",{className:"prose dark:prose-invert",dangerouslySetInnerHTML:{__html:y}})]})]})]})}function JC({sessions:t,onResume:e,onDelete:n,activeId:r,darkMode:s,notify:i}){return f.jsxs("div",{className:"p-8 max-w-5xl mx-auto",children:[f.jsx("h1",{className:`text-3xl font-bold mb-6 ${s?"text-white":"text-slate-900"}`,children:"Session Manager"}),f.jsxs("div",{className:"grid gap-4",children:[t.map(o=>{var w;const l=o.questions.length,u=o.questions.filter(A=>A.sessionState.status!=="unanswered").length,h=o.questions.filter(A=>A.sessionState.status==="wrong").length,p=o.questions.filter(A=>A.globalState.flagged).length,m=Math.round(u/Math.max(1,l)*100),y=o.id===r;return f.jsxs("div",{className:`p-6 rounded-2xl border flex items-center justify-between transition-all ${y?"border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/10":s?"bg-slate-900 border-slate-800":"bg-white border-slate-200 shadow-sm"}`,children:[f.jsxs("div",{className:"flex items-center gap-6",children:[f.jsx("div",{className:`w-16 h-16 rounded-xl flex flex-col items-center justify-center border ${s?"bg-slate-700 bg-slate-800":"bg-slate-200 bg-slate-50"}`,children:f.jsxs("span",{className:`text-xl font-bold ${s?"text-white":"text-slate-700"}`,children:[m,"%"]})}),f.jsxs("div",{children:[f.jsxs("div",{className:"flex items-center gap-3 mb-1",children:[f.jsx("h3",{className:`font-bold text-lg ${s?"text-white":"text-slate-800"}`,children:o.name}),y&&f.jsx("span",{className:"bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase",children:"Active"})]}),f.jsxs("div",{className:"flex items-center gap-4 text-xs text-slate-500",children:[f.jsxs("span",{className:"flex items-center gap-1",children:[f.jsx(_C,{size:12})," ",new Date(o.createdAt).toLocaleDateString()]}),f.jsxs("span",{className:"flex items-center gap-1",children:[f.jsx(pf,{size:12})," ",l," Qs"]}),f.jsxs("span",{className:"flex items-center gap-1",children:[f.jsx(iu,{size:12})," ",h," Wrong"]}),f.jsxs("span",{className:"flex items-center gap-1",children:[f.jsx(Bs,{size:12})," ",p," Flagged"]})]}),f.jsxs("div",{className:"text-xs text-slate-400 mt-1",children:["Filters: ",(w=o.config)==null?void 0:w.mode]})]})]}),f.jsxs("div",{className:"flex gap-3",children:[f.jsx("button",{onClick:()=>{n(o.id),i("Session deleted.","success")},className:"p-3 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors",children:f.jsx(Ih,{size:20})}),f.jsxs("button",{onClick:()=>e(o.id),className:"px-6 py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg",children:[y?"Continue":"Resume"," ",f.jsx(gC,{size:18})]})]})]},o.id)}),t.length===0&&f.jsx("div",{className:"text-center py-20 text-slate-400",children:"No active sessions. Start one in Command Center."})]})]})}function YC({session:t,onNavigate:e,darkMode:n}){const{questions:r,currentIndex:s}=t;return f.jsxs("div",{className:"h-full flex flex-col",children:[f.jsx("div",{className:`p-4 border-b ${n?"border-slate-800":"bg-slate-200 bg-slate-50"}`,children:f.jsx("h3",{className:"text-xs font-bold uppercase tracking-wider opacity-50",children:"Session Map"})}),f.jsx("div",{className:"flex-1 overflow-y-auto p-3 custom-scrollbar",children:f.jsx("div",{className:"grid grid-cols-5 gap-2",children:r.map((i,o)=>{var h;let l=n?"bg-slate-800 text-slate-500":"bg-slate-100 text-slate-400";i.sessionState.status==="correct"&&(l="bg-emerald-500 text-white"),i.sessionState.status==="wrong"&&(l="bg-rose-500 text-white");const u=o===s;return f.jsxs("button",{onClick:()=>e(o),className:`h-8 rounded-md text-xs font-bold relative ${l} ${u?"ring-2 ring-indigo-500 ring-offset-1":""}`,children:[o+1,((h=i.globalState)==null?void 0:h.flagged)&&f.jsx("div",{className:"absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full border border-white"})]},i.id)})})})]})}function XC({session:t,onUpdate:e,onNavigate:n,darkMode:r}){const{questions:s,currentIndex:i}=t,o=s[i];return f.jsxs("div",{className:"max-w-3xl mx-auto p-6 pb-32",children:[f.jsxs("div",{className:"mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider opacity-50",children:[f.jsx("span",{children:o.package||"General"}),f.jsx(ff,{size:12}),f.jsxs("span",{children:["Question ",i+1," of ",s.length]})]}),f.jsx(ZC,{data:o,sessionId:t.id,onUpdate:e,darkMode:r,total:s.length,index:i,onNext:()=>n(Math.min(s.length-1,i+1)),onPrev:()=>n(Math.max(0,i-1))},o.id)]})}function ZC({data:t,sessionId:e,onUpdate:n,darkMode:r,total:s,index:i,onNext:o,onPrev:l}){var Q;const[u,h]=W.useState(t.sessionState.selectedIndex),[p,m]=W.useState(t.sessionState.status!=="unanswered"),[y,w]=W.useState(t.sessionState.notes||""),[A,R]=W.useState(!1),[V,T]=W.useState(!1),[E,I]=W.useState(null),[D,L]=W.useState(!1),[N,_]=W.useState(null),[g,x]=W.useState(!1),[k,C]=W.useState([]),[P,S]=W.useState(""),[J,Ae]=W.useState(!1),[ue,me]=W.useState(null),[z,Y]=W.useState(!1),[X,de]=W.useState(!1);W.useEffect(()=>{h(t.sessionState.selectedIndex),m(t.sessionState.status!=="unanswered"),w(t.sessionState.notes||""),I(null),_(null),C([]),x(!1),me(null),window.speechSynthesis.cancel(),de(!1),T(!1)},[t.id]);const le=U=>{if(p)return;const q=U===t.correctIndex;h(U),m(!0),n(e,t.id,{status:q?"correct":"wrong",selectedIndex:U,notes:y})},ve=()=>n(e,t.id,{notes:y}),$=()=>{var U;return n(e,t.id,{flagged:!((U=t.globalState)!=null&&U.flagged)})},Z=async U=>{L(!0),_(U),I(null);let q="";U==="explain"&&(q=`Explain strictly for a medical professional based on Irwin & Rippe's ICU Medicine: "${t.question}". Why is ${t.options[t.correctIndex]} correct? Be concise.`),U==="pearl"&&(q=`Give me one high-yield clinical pearl related to this topic from Irwin & Rippe's ICU Medicine: "${t.question}".`),U==="mnemonic"&&(q=`Create a short text-based memory aid or mnemonic to remember the answer to: "${t.question}" which is "${t.options[t.correctIndex]}".`);const Ee=await As(q,"tutor");I(Ee),L(!1)},Ce=async()=>{if(!ue){Y(!0);try{const U=`Create a surreal, vivid visual mnemonic description to help a student remember that the answer to "${t.question}" is "${t.options[t.correctIndex]}". Describe the scene in 2 sentences max.`,q=await As(U,"mnemonic"),Ee=await HC(q);me(Ee)}catch{alert("Failed to generate mnemonic image. Try again.")}finally{Y(!1)}}},ce=()=>{if(X)window.speechSynthesis.cancel(),de(!1);else{const U=`${t.question}. Option A: ${t.options[0]}. Option B: ${t.options[1]}. Option C: ${t.options[2]}. Option D: ${t.options[3]}.`,q=new SpeechSynthesisUtterance(U);q.onend=()=>de(!1),window.speechSynthesis.speak(q),de(!0)}},G=async U=>{if(U.preventDefault(),!P.trim())return;const q={role:"user",text:P};C(re=>[...re,q]),S(""),Ae(!0);const Ee=`
        CURRENT QUESTION: ${t.question}
        CORRECT ANSWER: ${t.options[t.correctIndex]}
        EXPLANATION: ${t.explanation}
        
        USER QUESTION: ${q.text}
      `;try{const re=await As(Ee,"chat");C(Ie=>[...Ie,{role:"ai",text:re}])}catch{C(Ie=>[...Ie,{role:"ai",text:"Error connecting to Professor Irwin."}])}finally{Ae(!1)}};return f.jsxs("div",{className:"animate-in fade-in slide-in-from-bottom-4 duration-500",children:[f.jsxs("div",{className:"flex justify-between items-start mb-6",children:[f.jsx("h2",{className:"text-xl md:text-2xl font-serif font-medium leading-relaxed flex-1 mr-4",children:t.question}),f.jsxs("div",{className:"flex gap-2",children:[f.jsx("button",{onClick:()=>R(!A),className:`transition-all p-2 rounded-full hover:bg-slate-100 ${A?"text-indigo-600 bg-indigo-50":"text-slate-300"}`,title:"Flashcard Mode",children:A?f.jsx(IC,{size:20}):f.jsx(Lg,{size:20})}),f.jsx("button",{onClick:ce,className:`transition-all p-2 rounded-full hover:bg-slate-100 ${X?"text-indigo-600 bg-indigo-50 animate-pulse":"text-slate-300"}`,children:X?f.jsx(UC,{size:20}):f.jsx(zC,{size:20})}),f.jsx("button",{onClick:$,className:`transition-all active:scale-90 ${(Q=t.globalState)!=null&&Q.flagged?"text-amber-500 fill-amber-500":"text-slate-300 hover:text-slate-400"}`,children:f.jsx(Bs,{})})]})]}),f.jsx("div",{className:`p-8 rounded-2xl border mb-6 ${r?"bg-slate-900 border-slate-800":"bg-white border-slate-200 shadow-sm"}`,children:f.jsx("div",{className:"space-y-3",children:A&&!V&&!p?f.jsxs("div",{onClick:()=>T(!0),className:"h-40 flex flex-col items-center justify-center cursor-pointer opacity-50 hover:opacity-100 transition-opacity",children:[f.jsx(Lg,{size:48,className:"mb-2"}),f.jsx("p",{className:"font-bold text-sm",children:"Tap to Reveal Options"})]}):t.options.map((U,q)=>{const Ee=u===q,re=q===t.correctIndex;let Ie="w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3 ";return p?re?Ie+="border-emerald-500 bg-emerald-500/10 text-emerald-600":Ee?Ie+="border-rose-500 bg-rose-500/10 text-rose-600":Ie+="opacity-50 border-transparent":Ie+=r?"border-slate-800 hover:bg-slate-800":"border-slate-100 hover:border-indigo-200 hover:bg-indigo-50",f.jsxs("button",{onClick:()=>le(q),disabled:p,className:Ie,children:[f.jsx("div",{className:`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold ${p?re?"bg-emerald-500 border-emerald-500 text-white":Ee?"bg-rose-500 border-rose-500 text-white":"border-slate-300":"border-slate-300"}`,children:String.fromCharCode(65+q)}),f.jsx("span",{children:U})]},q)})})}),f.jsxs("div",{className:"flex justify-between items-center py-4 mb-6",children:[f.jsxs("button",{onClick:l,disabled:i===0,className:"flex items-center gap-2 font-bold opacity-50 hover:opacity-100 disabled:opacity-20",children:[f.jsx(dw,{})," Prev"]}),f.jsxs("button",{onClick:o,disabled:i===s-1,className:"px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/30 transition-all active:scale-95 flex items-center gap-2",children:["Next Question ",f.jsx(ff,{})]})]}),p&&f.jsxs("div",{className:"space-y-6 animate-in slide-in-from-bottom-8 border-t pt-8 dark:border-slate-800",children:[f.jsxs("div",{className:`p-8 rounded-2xl border ${r?"bg-indigo-900/10 border-slate-800":"bg-indigo-50/50 border-indigo-100"}`,children:[f.jsxs("h3",{className:"text-xs font-bold uppercase text-indigo-500 mb-2 flex items-center gap-2",children:[f.jsx(fw,{size:14})," Explanation"]}),f.jsx("p",{className:"leading-relaxed opacity-90 mb-6 whitespace-pre-line",children:t.explanation}),f.jsxs("div",{className:"flex flex-wrap gap-2 border-t pt-4 dark:border-slate-700",children:[f.jsxs("button",{onClick:()=>Z("explain"),className:`text-xs px-3 py-2 rounded-lg flex items-center gap-2 font-bold transition-colors ${N==="explain"?"bg-indigo-600 text-white":"bg-white border text-indigo-600 hover:bg-indigo-50"}`,children:[D&&N==="explain"?f.jsx(cr,{className:"animate-spin",size:14}):f.jsx(hf,{size:14})," Explain"]}),f.jsxs("button",{onClick:()=>Z("pearl"),className:`text-xs px-3 py-2 rounded-lg flex items-center gap-2 font-bold transition-colors ${N==="pearl"?"bg-indigo-600 text-white":"bg-white border text-indigo-600 hover:bg-indigo-50"}`,children:[D&&N==="pearl"?f.jsx(cr,{className:"animate-spin",size:14}):f.jsx(EC,{size:14})," Pearl"]}),f.jsxs("button",{onClick:Ce,disabled:z,className:`text-xs px-3 py-2 rounded-lg flex items-center gap-2 font-bold transition-colors ${ue?"bg-purple-600 text-white":"bg-white border text-purple-600 hover:bg-purple-50"}`,children:[z?f.jsx(cr,{className:"animate-spin",size:14}):f.jsx(RC,{size:14})," ",ue?"Mnemonic Ready":"Visual Mnemonic ✨"]}),f.jsxs("button",{onClick:()=>x(!g),className:`text-xs px-3 py-2 rounded-lg flex items-center gap-2 font-bold transition-colors ${g?"bg-teal-600 text-white":"bg-white border text-teal-600 hover:bg-teal-50"}`,children:[f.jsx(PC,{size:14})," Ask Professor Irwin"]})]}),E&&f.jsxs("div",{className:"mt-4 bg-white p-4 rounded-xl border text-sm prose dark:prose-invert prose-sm animate-in fade-in shadow-sm",children:[f.jsx("div",{className:"font-bold text-xs text-slate-400 uppercase mb-1",children:"Smart Tutor"}),E]}),ue&&f.jsxs("div",{className:"mt-4 bg-purple-50 p-4 rounded-xl border border-purple-100 animate-in fade-in shadow-sm",children:[f.jsxs("div",{className:"font-bold text-xs text-purple-600 uppercase mb-2 flex items-center gap-2",children:[f.jsx(gf,{size:12})," AI Visual Mnemonic"]}),f.jsx("img",{src:ue,alt:"AI Mnemonic",className:"rounded-lg w-full h-auto max-h-80 object-contain bg-white shadow-sm border"}),f.jsx("p",{className:"text-[10px] text-purple-400 mt-2 text-center",children:"Generated by Imagen 3"})]}),g&&f.jsxs("div",{className:"mt-4 bg-teal-50/50 rounded-xl border border-teal-100 overflow-hidden animate-in slide-in-from-top-2",children:[f.jsxs("div",{className:"bg-teal-100/50 p-2 text-xs font-bold text-teal-800 uppercase px-4 flex justify-between items-center",children:[f.jsx("span",{children:"Chatting with Prof. Irwin"}),f.jsx("button",{onClick:()=>x(!1),children:f.jsx(vw,{size:14})})]}),f.jsxs("div",{className:"p-4 h-60 overflow-y-auto custom-scrollbar flex flex-col gap-3",children:[k.length===0&&f.jsx("div",{className:"text-center text-teal-400 text-sm py-10 italic",children:"Ask a specific question about this case..."}),k.map((U,q)=>f.jsx("div",{className:`flex ${U.role==="user"?"justify-end":"justify-start"}`,children:f.jsx("div",{className:`max-w-[80%] p-3 rounded-xl text-sm ${U.role==="user"?"bg-teal-600 text-white rounded-br-none":"bg-white border shadow-sm rounded-bl-none"}`,children:U.text})},q)),J&&f.jsx("div",{className:"text-xs text-teal-500 animate-pulse",children:"Professor is typing..."})]}),f.jsxs("form",{onSubmit:G,className:"p-2 border-t bg-white flex gap-2",children:[f.jsx("input",{value:P,onChange:U=>S(U.target.value),placeholder:"Type your question...",className:"flex-1 text-sm p-2 outline-none"}),f.jsx("button",{type:"submit",disabled:!P||J,className:"p-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50",children:f.jsx(LC,{size:16})})]})]})]}),f.jsxs("div",{className:`p-6 rounded-2xl border ${r?"bg-amber-900/10 border-slate-800":"bg-amber-50 border-amber-100"}`,children:[f.jsxs("h3",{className:"text-xs font-bold uppercase text-amber-600 mb-2 flex items-center gap-2",children:[f.jsx(jC,{size:14})," My Notes"]}),f.jsx("textarea",{className:`w-full p-3 rounded-lg text-sm bg-transparent border focus:ring-2 focus:ring-amber-400 outline-none ${r?"border-slate-700":"border-amber-200"}`,rows:2,placeholder:"Add clinical note...",value:y,onChange:U=>w(U.target.value),onBlur:ve})]})]})]})}function eR({library:t,darkMode:e}){const[n,r]=W.useState(null),[s,i]=W.useState(!1),o=t.length,l=t.filter(w=>w.globalState.status!=="unanswered").length,u=t.filter(w=>w.globalState.status==="correct").length;t.filter(w=>w.globalState.status==="wrong").length;const h=t.filter(w=>w.globalState.flagged).length,p=l>0?Math.round(u/l*100):0,m=W.useMemo(()=>{const w={};return t.forEach(A=>{A.globalState.status!=="unanswered"&&(w[A.package]||(w[A.package]={total:0,correct:0,timesWrong:0}),w[A.package].total++,A.globalState.status==="correct"?w[A.package].correct++:w[A.package].timesWrong++)}),Object.entries(w).map(([A,R])=>({name:A,total:R.total,timesWrong:R.timesWrong,accuracy:R.total>0?Math.round(R.correct/R.total*100):0})).sort((A,R)=>A.accuracy-R.accuracy).filter(A=>A.total>0&&A.total>=3)},[t]),y=async()=>{if(s)return;if(m.length===0){r("Start studying first! We need at least three answered questions in three different packages to perform a meaningful analysis.");return}i(!0);const A=`
      Analyze the following user performance data:
      
      --- USER WEAKNESS DATA ---
      ${m.slice(0,3).map(V=>`Topic: ${V.name}, Accuracy: ${V.accuracy}%, Total Attempts: ${V.total}`).join(`
`)}
      --- END DATA ---

      Based on this data, provide a single, high-yield conceptual weakness for the user to focus on next. Frame your answer as a concise, single paragraph response. Do not use bullet points or lists. Identify the specific knowledge gap (e.g., 'Hemodynamic Management Principles' or 'Pathophysiology of CIM vs CIP') rather than just naming the weakest chapter.
    `,R=await As(A,"tutor");r(R),i(!1)};return f.jsxs("div",{className:"p-8 max-w-5xl mx-auto animate-in fade-in",children:[f.jsx("h1",{className:`text-3xl font-bold mb-6 ${e?"text-white":"text-slate-900"}`,children:"Performance Stats"}),f.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-4 mb-8",children:[f.jsx(_a,{label:"Total Questions",value:o,icon:f.jsx(mf,{className:"text-indigo-500"}),darkMode:e}),f.jsx(_a,{label:"Questions Answered",value:l,icon:f.jsx(hw,{className:"text-blue-500"}),darkMode:e}),f.jsx(_a,{label:"Overall Accuracy",value:`${p}%`,icon:f.jsx(OC,{className:p>=70?"text-emerald-500":"text-amber-500"}),darkMode:e}),f.jsx(_a,{label:"Flagged Items",value:h,icon:f.jsx(Bs,{className:"text-red-500"}),darkMode:e})]}),f.jsxs("div",{className:`p-6 rounded-2xl border mb-8 ${e?"bg-slate-900 border-slate-700":"bg-white border-slate-200 shadow-lg"}`,children:[f.jsxs("h2",{className:`text-xl font-bold mb-4 flex items-center gap-2 ${e?"text-white":"text-slate-800"}`,children:[f.jsx(hf,{className:"text-indigo-500"})," AI Weakness Analyzer"]}),f.jsxs("button",{onClick:y,disabled:s||m.length<1,className:"px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold transition-all disabled:opacity-50 flex items-center gap-2",children:[s?f.jsx(cr,{className:"animate-spin",size:16}):f.jsx(gf,{size:16}),s?"Analyzing Data...":"Generate Study Focus"]}),(n||!l)&&f.jsx("div",{className:`mt-4 p-4 rounded-xl text-sm ${e?"bg-slate-800 text-slate-300":"bg-slate-50 text-slate-700"}`,children:n?f.jsx("p",{children:n}):f.jsx("p",{children:"Answer a few questions in different chapters to generate your personalized study recommendation!"})})]}),f.jsxs("div",{className:`p-6 rounded-2xl border ${e?"bg-slate-900 border-slate-800":"bg-white border-slate-200"}`,children:[f.jsx("h2",{className:`text-lg font-bold mb-4 ${e?"text-white":"text-slate-800"}`,children:"Chapter Breakdown"}),f.jsxs("div",{className:"space-y-4",children:[m.map(w=>f.jsxs("div",{children:[f.jsxs("div",{className:"flex justify-between text-sm mb-1",children:[f.jsx("span",{className:e?"text-slate-300":"text-slate-700",children:w.name}),f.jsxs("span",{className:e?"text-slate-400":"text-slate-500",children:[w.accuracy,"% (",w.total," Qs)"]})]}),f.jsx("div",{className:"h-2 bg-slate-100 rounded-full overflow-hidden dark:bg-slate-800",children:f.jsx("div",{className:`h-full rounded-full ${w.accuracy>=70?"bg-emerald-500":w.accuracy>=50?"bg-amber-500":"bg-red-500"}`,style:{width:`${w.accuracy}%`}})})]},w.name)),m.length===0&&f.jsx("p",{className:"text-slate-400 italic",children:"No data available yet."})]})]})]})}function tR({library:t,darkMode:e,onUpdate:n}){const[r,s]=W.useState(""),[i,o]=W.useState(new Set),[l,u]=W.useState(null),[h,p]=W.useState({}),[m,y]=W.useState(!1),[w,A]=W.useState([]),[R,V]=W.useState("All"),[T,E]=W.useState("All"),[I,D]=W.useState(1),[L,N]=W.useState(20),_=W.useRef(!1),g=W.useRef(!0),x=W.useMemo(()=>{const $=new Set;return t.forEach(Z=>{const Ce=Z.package&&Z.package.trim()?Z.package:"No Chapter";$.add(Ce)}),Array.from($)},[t]),k=W.useMemo(()=>{let $=t;if(r){const Z=r.toLowerCase();$=$.filter(Ce=>Ce.question.toLowerCase().includes(Z))}return w.length>0&&($=$.filter(Z=>{const Ce=Z.package&&Z.package.trim()?Z.package:"No Chapter";return w.includes(Ce)})),R!=="All"&&(R==="Correct"&&($=$.filter(Z=>Z.globalState.status==="correct")),R==="Wrong"&&($=$.filter(Z=>Z.globalState.status==="wrong")),R==="Unanswered"&&($=$.filter(Z=>Z.globalState.status==="unanswered"))),T!=="All"&&($=$.filter(Z=>Z.globalState.flagged===(T==="Flagged"))),$},[t,r,w,R,T]),C=Math.ceil(k.length/L),P=k.slice((I-1)*L,I*L);W.useEffect(()=>D(1),[r,w,R,T]);const S=$=>{if(!m&&window.matchMedia("(hover: none)").matches)return;_.current=!0;const Z=i.has($);g.current=!Z,ue($,g.current)},J=$=>{_.current&&ue($,g.current)},Ae=()=>_.current=!1,ue=($,Z)=>{o(Ce=>{const ce=new Set(Ce);return Z?ce.add($):ce.delete($),ce})},me=($,Z)=>{Z.stopPropagation(),ue($,!i.has($))};W.useEffect(()=>(window.addEventListener("mouseup",Ae),()=>window.removeEventListener("mouseup",Ae)),[]);const z=()=>o(new Set),Y=()=>{if(confirm(`Delete ${i.size} questions?`)){const $=t.filter(Z=>!i.has(Z.id));n($),o(new Set)}},X=()=>{if(i.size===0)return;const $=prompt(`Set chapter name for ${i.size} questions (leave empty to clear):`,"");if($===null)return;const Z=$.trim(),Ce=t.map(ce=>i.has(ce.id)?{...ce,package:Z}:ce);n(Ce)},de=()=>{if(i.size===0)return;const $=t.map(Z=>i.has(Z.id)?{...Z,globalState:{...Z.globalState||{},flagged:!1}}:Z);n($)},le=$=>{u($.id),p({...$})},ve=()=>{const $=t.map(Z=>Z.id===l?h:Z);n($),u(null)};return f.jsxs("div",{className:"p-6 md:p-8 max-w-7xl mx-auto h-full flex flex-col overflow-hidden relative",children:[f.jsxs("div",{className:"flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4",children:[f.jsxs("div",{children:[f.jsx("h2",{className:`text-2xl font-bold ${e?"text-white":"text-slate-900"}`,children:"Question Library"}),f.jsxs("p",{className:"text-xs opacity-50",children:[t.length," Total Questions • ",k.length," Shown"]})]}),f.jsxs("div",{className:"flex gap-2 flex-wrap",children:[f.jsxs("button",{onClick:()=>y(!m),className:`px-3 py-2 rounded-lg font-bold text-xs flex items-center gap-2 transition-all ${m?"bg-indigo-600 text-white":"bg-slate-200 text-slate-600"}`,children:[f.jsx(pw,{size:16})," ",m?"Painting ON":"Paint Select"]}),i.size>0&&f.jsxs(f.Fragment,{children:[f.jsxs("button",{onClick:X,className:"px-3 py-2 bg-emerald-600 text-white rounded-lg font-bold text-xs flex items-center gap-2 hover:bg-emerald-700",children:[f.jsx(lc,{size:16})," Edit Chapter (",i.size,")"]}),f.jsxs("button",{onClick:de,className:"px-3 py-2 bg-amber-500 text-white rounded-lg font-bold text-xs flex items-center gap-2 hover:bg-amber-600",children:[f.jsx(Bs,{size:16})," Unflag"]}),f.jsxs("button",{onClick:Y,className:"px-3 py-2 bg-rose-600 text-white rounded-lg font-bold text-xs flex items-center gap-2 hover:bg-rose-700",children:[f.jsx(Ih,{size:16})," Delete (",i.size,")"]})]})]})]}),f.jsxs("div",{className:`p-4 rounded-xl mb-4 border flex flex-col md:flex-row gap-4 items-center ${e?"bg-slate-900 border-slate-800":"bg-white border-slate-200 shadow-sm"}`,children:[f.jsxs("div",{className:"relative flex-1 w-full",children:[f.jsx(yw,{className:"absolute left-3 top-2.5 text-slate-400",size:18}),f.jsx("input",{className:`w-full pl-9 p-2 rounded-lg border text-sm ${e?"bg-slate-950 border-slate-700 text-white":"bg-slate-50 border-slate-200"}`,placeholder:"Search...",value:r,onChange:$=>s($.target.value)})]}),f.jsx(KC,{options:x,selected:w,onChange:A,placeholder:"All Chapters",darkMode:e}),f.jsxs("select",{value:R,onChange:$=>V($.target.value),className:`p-2 rounded-lg border text-sm w-full md:w-auto ${e?"bg-slate-950 border-slate-700 text-white":"bg-white border-slate-200"}`,children:[f.jsx("option",{value:"All",children:"All Status"}),f.jsx("option",{value:"Correct",children:"Correct"}),f.jsx("option",{value:"Wrong",children:"Wrong"}),f.jsx("option",{value:"Unanswered",children:"Unanswered"})]}),f.jsxs("select",{value:T,onChange:$=>E($.target.value),className:`p-2 rounded-lg border text-sm w-full md:w-auto ${e?"bg-slate-950 border-slate-700 text-white":"bg-white border-slate-200"}`,children:[f.jsx("option",{value:"All",children:"Any Flag"}),f.jsx("option",{value:"Flagged",children:"Flagged Only"}),f.jsx("option",{value:"Unflagged",children:"No Flag"})]})]}),f.jsxs("div",{className:`flex-1 overflow-hidden rounded-xl border flex flex-col ${e?"bg-slate-900 border-slate-800":"bg-white border-slate-200 shadow-sm"}`,children:[f.jsxs("div",{className:`grid grid-cols-12 gap-4 p-3 border-b text-xs font-bold uppercase tracking-wider sticky top-0 z-10 ${e?"bg-slate-950 border-slate-800 text-slate-400":"bg-slate-50 border-slate-200 text-slate-500"}`,children:[f.jsx("div",{className:"col-span-1 text-center",children:"Sel"}),f.jsx("div",{className:"col-span-1 text-center",children:"#"}),f.jsx("div",{className:"col-span-1 text-center",children:"Stat"}),f.jsx("div",{className:"col-span-2",children:"Chapter"}),f.jsx("div",{className:"col-span-6",children:"Question"}),f.jsx("div",{className:"col-span-1 text-right",children:"Edit"})]}),f.jsxs("div",{className:"flex-1 overflow-y-auto custom-scrollbar touch-pan-y pb-20",style:{touchAction:m?"none":"auto"},children:[P.map(($,Z)=>{const Ce=(I-1)*L+Z+1;return f.jsx("div",{onMouseDown:()=>S($.id),onMouseEnter:()=>J($.id),onTouchStart:()=>S($.id),onTouchMove:ce=>{if(m&&_.current){const G=ce.touches[0],Q=document.elementFromPoint(G.clientX,G.clientY),U=Q==null?void 0:Q.closest("[data-qid]");U&&ue(U.dataset.qid,g.current)}},"data-qid":$.id,className:`grid grid-cols-12 gap-4 p-3 border-b items-start text-sm transition-colors cursor-pointer animate-in fade-in duration-300 ${i.has($.id)?"bg-indigo-500/20 border-indigo-500":e?"border-slate-800 hover:bg-slate-800":"border-slate-100 hover:bg-slate-50"}`,children:l===$.id?f.jsx("div",{className:"col-span-12",onClick:ce=>ce.stopPropagation(),children:f.jsxs("div",{className:"space-y-4 bg-white dark:bg-slate-900 p-4 rounded-xl border shadow-lg",children:[f.jsx("h4",{className:"font-bold text-indigo-500 uppercase text-xs",children:"Editing Question"}),f.jsxs("div",{children:[f.jsx("label",{className:"text-xs font-bold opacity-50 block mb-1",children:"Question Text"}),f.jsx("textarea",{className:"w-full p-2 border rounded text-sm h-20",value:h.question,onChange:ce=>p({...h,question:ce.target.value})})]}),f.jsxs("div",{children:[f.jsx("label",{className:"text-xs font-bold opacity-50 block mb-1",children:"Package / Chapter"}),f.jsx("input",{className:"w-full p-2 border rounded text-sm",value:h.package,onChange:ce=>p({...h,package:ce.target.value})})]}),f.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:h.options.map((ce,G)=>f.jsxs("div",{className:"flex items-center gap-2",children:[f.jsx("input",{type:"radio",name:"correct_edit",checked:h.correctIndex===G,onChange:()=>p({...h,correctIndex:G}),className:"w-4 h-4 text-emerald-600"}),f.jsx("input",{className:"flex-1 p-2 border rounded text-sm",value:ce,onChange:Q=>{const U=[...h.options];U[G]=Q.target.value,p({...h,options:U})}})]},G))}),f.jsxs("div",{children:[f.jsx("label",{className:"text-xs font-bold opacity-50 block mb-1",children:"Explanation"}),f.jsx("textarea",{className:"w-full p-2 border rounded text-sm h-24",value:h.explanation,onChange:ce=>p({...h,explanation:ce.target.value})})]}),f.jsxs("div",{className:"flex justify-end gap-2 pt-2",children:[f.jsx("button",{onClick:()=>u(null),className:"px-4 py-2 text-sm bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 font-bold",children:"Cancel"}),f.jsxs("button",{onClick:ve,className:"px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-bold flex items-center gap-2",children:[f.jsx(Cl,{size:16})," Save Changes"]})]})]})}):f.jsxs(f.Fragment,{children:[f.jsx("div",{className:"col-span-1 text-center flex justify-center pt-1",children:f.jsx("div",{onClick:ce=>me($.id,ce),className:`w-5 h-5 rounded border flex items-center justify-center transition-all ${i.has($.id)?"bg-indigo-600 border-indigo-600":"border-slate-300 bg-white dark:bg-transparent"}`,children:i.has($.id)&&f.jsx(Cl,{size:12,className:"text-white"})})}),f.jsx("div",{className:"col-span-1 text-center opacity-50 font-mono text-xs pt-1.5",children:Ce}),f.jsxs("div",{className:"col-span-1 text-center flex justify-center pt-1",children:[$.globalState.status==="correct"&&f.jsx("span",{className:"bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full",children:"OK"}),$.globalState.status==="wrong"&&f.jsx("span",{className:"bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full",children:"ERR"}),$.globalState.status==="unanswered"&&f.jsx("span",{className:"bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-full",children:"-"})]}),f.jsx("div",{className:`col-span-2 text-xs opacity-70 font-medium pt-1.5 break-words ${!$.package||!$.package.trim()?"text-slate-400 italic":""}`,children:$.package&&$.package.trim()?$.package:"No Chapter Assigned"}),f.jsx("div",{className:"col-span-6 font-medium pr-4 pt-1.5",children:$.question}),f.jsx("div",{className:"col-span-1 text-right pt-1",children:f.jsx("button",{onClick:ce=>{ce.stopPropagation(),le($)},className:"p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-indigo-500 transition-colors",children:f.jsx(lc,{size:16})})})]})},$.id)}),P.length===0&&f.jsx("div",{className:"p-8 text-center opacity-50",children:"No questions found."})]}),i.size>0&&f.jsxs("div",{className:"absolute bottom-16 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom-10 z-50",children:[f.jsxs("span",{className:"font-bold text-sm",children:[i.size," Selected"]}),f.jsx("div",{className:"h-4 w-px bg-slate-700"}),f.jsx("button",{onClick:z,className:"text-xs font-bold hover:text-slate-300",children:"Unselect All"}),f.jsxs("button",{onClick:X,className:"text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1",children:[f.jsx(lc,{size:14})," Chapter"]}),f.jsxs("button",{onClick:de,className:"text-xs font-bold text-amber-300 hover:text-amber-200 flex items-center gap-1",children:[f.jsx(Bs,{size:14})," Unflag"]}),f.jsxs("button",{onClick:Y,className:"text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1",children:[f.jsx(Ih,{size:14})," Delete"]})]}),f.jsxs("div",{className:`p-3 border-t flex justify-between items-center text-xs ${e?"bg-slate-950 border-slate-800":"bg-slate-50 border-slate-200"}`,children:[f.jsxs("div",{className:"flex items-center gap-2",children:[f.jsx("span",{children:"Rows:"}),f.jsxs("select",{value:L,onChange:$=>N(Number($.target.value)),className:`p-1 rounded border ${e?"bg-slate-900 border-slate-700":"bg-white"}`,children:[f.jsx("option",{value:10,children:"10"}),f.jsx("option",{value:20,children:"20"}),f.jsx("option",{value:50,children:"50"}),f.jsx("option",{value:100,children:"100"})]})]}),f.jsxs("div",{className:"flex items-center gap-2",children:[f.jsx("button",{onClick:()=>D(Math.max(1,I-1)),disabled:I===1,className:"p-1 rounded hover:bg-black/5 disabled:opacity-30",children:f.jsx(dw,{size:16})}),f.jsxs("span",{children:["Page ",I," of ",C||1]}),f.jsx("button",{onClick:()=>D(Math.min(C,I+1)),disabled:I===C,className:"p-1 rounded hover:bg-black/5 disabled:opacity-30",children:f.jsx(ff,{size:16})})]})]})]})]})}function nR({onImport:t,darkMode:e,onRestore:n,notify:r}){const[s,i]=W.useState(""),[o,l]=W.useState(!1),u=W.useRef(null),h=w=>{const A=w.target.files[0];n(A),w.target.value=null},p=w=>{const A=w.target.files[0];if(!A)return;const R=new FileReader;R.onload=V=>{const T=V.target.result;try{JSON.parse(T),t(T),r("Questions imported from file!","success")}catch{i(T),r("File has syntax errors. Loaded into editor for AI Repair.","warning")}},R.readAsText(A),w.target.value=null},m=()=>{u.current.click()},y=async()=>{if(s.trim()){l(!0);try{const w=JSON.parse(s);t(JSON.stringify(w)),i(""),r("Manual import successful!","success")}catch{console.warn("JSON Parse failed, attempting AI repair..."),r("Detecting corruption. Attempting AI repair...","error");try{const A=`The following JSON string has syntax errors. Correct it to be valid JSON. Output ONLY the corrected JSON with no markdown or explanation: 

${s}`,R=await As(A,"fix");t(R),r("AI repaired and imported data!","success"),i("")}catch{r("Data too corrupted for repair.","error")}}finally{l(!1)}}};return f.jsxs("div",{className:"p-8 max-w-4xl mx-auto",children:[f.jsx("h2",{className:"text-2xl font-bold mb-6",children:"Data Management"}),f.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[f.jsxs("div",{className:`p-6 rounded-2xl border flex flex-col ${e?"bg-slate-900 border-slate-800":"bg-white border-slate-200 shadow-sm"}`,children:[f.jsxs("h3",{className:"font-bold mb-3 text-lg flex items-center gap-2",children:[f.jsx(mw,{size:18})," Import Questions"]}),f.jsx("p",{className:"text-xs text-slate-500 mb-4",children:"Add new questions to your library. Use the text box for raw JSON or upload a JSON file."}),f.jsx("textarea",{className:`w-full flex-1 min-h-[150px] p-3 rounded-lg border font-mono text-xs mb-4 ${e?"bg-slate-950 border-slate-700":"bg-slate-50 border-slate-200"}`,value:s,onChange:w=>i(w.target.value),placeholder:"Paste JSON array here..."}),f.jsxs("div",{className:"flex gap-2",children:[f.jsxs("button",{onClick:y,disabled:!s||o,className:"flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 flex items-center justify-center gap-2 disabled:opacity-50 text-sm",children:[o?f.jsx(cr,{className:"animate-spin",size:16}):f.jsx(Cl,{size:16}),o?"Processing...":"Add Text"]}),f.jsx("input",{type:"file",accept:".json",ref:u,onChange:p,className:"hidden"}),f.jsxs("button",{onClick:m,className:`px-4 py-3 rounded-xl font-bold border flex items-center gap-2 text-sm ${e?"border-slate-700 hover:bg-slate-800":"border-slate-200 hover:bg-slate-50"}`,title:"Upload JSON File",children:[f.jsx(SC,{size:18})," Upload File"]})]})]}),f.jsxs("div",{className:"space-y-6",children:[f.jsxs("div",{className:`p-6 rounded-2xl border ${e?"bg-slate-900 border-slate-800":"bg-white border-slate-200 shadow-sm"}`,children:[f.jsxs("h3",{className:"font-bold mb-3 text-lg flex items-center gap-2",children:[f.jsx(Sh,{size:18})," Restore Full Backup"]}),f.jsx("p",{className:"text-xs text-slate-500 mb-4",children:"Danger Zone: This will overwrite your current library and sessions with the backup file."}),f.jsxs("label",{className:"w-full flex items-center justify-center gap-2 bg-rose-600 text-white p-3 rounded-xl text-sm font-bold hover:bg-rose-700 cursor-pointer transition-colors",children:[f.jsx(Sh,{size:16})," Restore System Backup",f.jsx("input",{type:"file",accept:".json",onChange:h,className:"hidden"})]})]}),f.jsxs("div",{className:`p-6 rounded-2xl border ${e?"bg-slate-900 border-slate-800":"bg-white border-slate-200 shadow-sm"}`,children:[f.jsxs("h3",{className:"font-bold mb-3 text-lg flex items-center gap-2",children:[f.jsx(fw,{size:18})," Data Integrity"]}),f.jsxs("p",{className:"text-xs text-slate-500",children:[f.jsx("strong",{children:"Auto-Repair:"}),' If your uploaded JSON is broken, the text will appear in the editor on the left. Click "Add Text" to let AI fix it.']})]})]})]})]})}function rR(){const[t,e]=W.useState(null),[n,r]=W.useState("connecting"),[s,i]=W.useState(!1),[o,l]=W.useState(null),[u]=W.useState(Date.now()),[h,p]=W.useState("control"),[m,y]=W.useState(!0),[w,A]=W.useState(!1),[R,V]=W.useState([]),[T,E]=W.useState([]),[I,D]=W.useState(null),[L,N]=W.useState(null),_=W.useRef(null),g=JSON.parse(__firebase_config),x=c0(g),k=tk(x),C=q2(x),P=typeof __app_id<"u"?__app_id:"default-app-id",S=(G,Q="success")=>{N({message:G,type:Q,id:Date.now()}),setTimeout(()=>N(null),3e3)};W.useEffect(()=>((async()=>{typeof __initial_auth_token<"u"&&__initial_auth_token?await zI(k,__initial_auth_token):await LI(k)})(),WI(k,e)),[]),W.useEffect(()=>{if(!t)return;const G=Dg(C,"artifacts",P,"public","data","shared_study_data",Mg),Q=uC(G,U=>{if(U.exists()){const q=U.data();let Ee=[],re=[];q.masterLibraryCompressed||q.sessionsCompressed?(Ee=zg(q.masterLibraryCompressed,q.masterLibrary||[]),re=zg(q.sessionsCompressed,q.sessions||[])):(Ee=q.masterLibrary||[],re=q.sessions||[]),V(Ee),E(re),D(q.activeSessionId),l(q.lastUpdated),r("idle"),i(!1),console.log("Firestore Data Synced: Master Library size",Ee.length)}else jg.length>0?Ae():r("idle"),console.log("Firestore Initialized (Clean State)")},U=>{console.error("Cloud Sync Error:",U),i(!0),r("error"),J()});return()=>Q()},[t]);const J=()=>{try{const G=localStorage.getItem("ICU_PRO_FALLBACK");if(G){const Q=JSON.parse(G);V(Q.masterLibrary||[]),E(Q.sessions||[]),D(Q.activeSessionId),console.log("Local Fallback Loaded: Master Library size",(Q.masterLibrary||[]).length)}else Ae(!0)}catch{}},Ae=async(G=!1)=>{const Q=jg.map(U=>({...U,importedAt:Date.now(),globalState:{status:"unanswered",timesWrong:0,flagged:!1}}));if(G){V(Q);return}await ue({masterLibrary:Q,sessions:[],activeSessionId:null,view:"control"})},ue=async G=>{const Q=G.masterLibrary||R,U=G.sessions||T,q=G.activeSessionId!==void 0?G.activeSessionId:I,Ee=G.view||h,re={masterLibrary:Q,sessions:U,activeSessionId:q,view:Ee,lastUpdated:Date.now()};if(V(Q),E(U),D(q),localStorage.setItem("ICU_PRO_FALLBACK",JSON.stringify(Fg(re))),s||!t)return;const Ie={masterLibraryCompressed:Ug(Q),sessionsCompressed:Ug(U),activeSessionId:q,view:Ee,lastUpdated:dC()};if((Ie.masterLibraryCompressed?Ie.masterLibraryCompressed.length:0)+(Ie.sessionsCompressed?Ie.sessionsCompressed.length:0)+1024>9e5){console.warn("Cloud payload too large, skipping Firestore save. Data kept locally only."),i(!0),r("error");return}r("syncing");try{const dn=Dg(C,"artifacts",P,"public","data","shared_study_data",Mg);await lC(dn,Fg(Ie)),r("saved"),setTimeout(()=>r("idle"),1500)}catch(dn){console.error("Save failed",dn),r("error"),i(!0)}},me=G=>{let Q=[...R];G.packages.length>0&&(Q=Q.filter(re=>G.packages.includes(re.package))),G.mode==="wrong"&&(Q=Q.filter(re=>re.globalState.status==="wrong")),G.mode==="flagged"&&(Q=Q.filter(re=>re.globalState.flagged)),G.mode==="unanswered"&&(Q=Q.filter(re=>re.globalState.status==="unanswered")),G.shuffle&&(Q=WC(Q));const U=Q.map(re=>({...re,sessionState:{status:"unanswered",selectedIndex:null,notes:""}})),q={id:`sess_${Date.now()}`,name:`Session ${T.length+1}`,createdAt:Date.now(),config:G,questions:U,currentIndex:0},Ee=[q,...T];ue({sessions:Ee,activeSessionId:q.id,view:"study"}),p("study")},z=G=>{const Q=T.filter(q=>q.id!==G),U=I===G?null:I;ue({sessions:Q,activeSessionId:U}),U||p("sessions")},Y=(G,Q,U)=>{const q=T.map(re=>{if(re.id!==G)return re;const Ie=re.questions.map(Ot=>{if(Ot.id!==Q)return Ot;let dn={...Ot,sessionState:{...Ot.sessionState,...U}};return U.flagged!==void 0&&(dn.globalState={...Ot.globalState,flagged:U.flagged}),dn});return{...re,questions:Ie}});let Ee=R;U.status&&U.status!=="unanswered"&&(Ee=R.map(re=>re.id!==Q?re:{...re,globalState:{...re.globalState,status:U.status,timesWrong:U.status==="wrong"?(re.globalState.timesWrong||0)+1:re.globalState.timesWrong}})),U.flagged!==void 0&&(Ee=R.map(re=>re.id===Q?{...re,globalState:{...re.globalState,flagged:U.flagged}}:re)),ue({sessions:q,masterLibrary:Ee})},X=()=>{const G={masterLibrary:R,sessions:T,activeSessionId:I},Q=new Blob([JSON.stringify(G,null,2)],{type:"application/json"}),U=URL.createObjectURL(Q),q=document.createElement("a");q.href=U,q.download=`icu_local_backup_${new Date().toISOString().slice(0,10)}_${new Date().toLocaleTimeString("en-US",{hour12:!1,hour:"2-digit",minute:"2-digit",second:"2-digit"}).replace(/:/g,"-")}.json`,document.body.appendChild(q),q.click(),document.body.removeChild(q),URL.revokeObjectURL(U),S("Local backup saved!","success")},de=G=>{if(!G)return;const Q=new FileReader;Q.readAsText(G,"UTF-8"),Q.onload=U=>{try{const q=JSON.parse(U.target.result);if(!q.masterLibrary||!Array.isArray(q.sessions))throw new Error("Invalid backup file format.");ue({masterLibrary:q.masterLibrary,sessions:q.sessions,activeSessionId:q.activeSessionId}),S("Data restored & synced!","success")}catch{S("Restore failed: Invalid file.","error")}}},le=async()=>{window.confirm("Are you sure you want to overwrite current data with the last cloud backup? This guarantees the latest online data is pulled.")&&(r("connecting"),setTimeout(()=>{S("Cloud data refreshed.","success"),r("idle")},2e3))},ve=W.useMemo(()=>T.find(G=>G.id===I),[T,I]),$=G=>{try{const Q=G.replace(/```json/g,"").replace(/```/g,"").trim();let U=JSON.parse(Q);Array.isArray(U)||(U=[U]);const q=new Set(R.map(Ie=>Ie.question)),Ee=U.filter(Ie=>!q.has(Ie.question)).map((Ie,Ot)=>({...Ie,id:`imp_${Date.now()}_${Ot}`,globalState:{status:"unanswered",timesWrong:0,flagged:!1},importedAt:Date.now()}));if(Ee.length===0){S("No new questions (duplicates skipped).","error");return}const re=[...R,...Ee];ue({masterLibrary:re}),S(`Imported ${Ee.length} questions!`,"success"),p("library")}catch{S("Import failed: Invalid JSON.","error")}},Z=G=>{ue({masterLibrary:G})},Ce=()=>{_.current.click()},ce=G=>{const Q=G.target.files[0];de(Q),G.target.value=null};return t?f.jsxs("div",{className:`flex h-screen font-sans overflow-hidden transition-colors duration-300 ${w?"bg-slate-950 text-slate-100":"bg-slate-50 text-slate-900"}`,children:[f.jsxs("nav",{className:`w-20 flex flex-col items-center py-6 z-50 shrink-0 border-r ${w?"bg-slate-900 border-slate-800":"bg-white border-slate-200"}`,children:[f.jsx("div",{className:"mb-8 p-2 bg-indigo-600 rounded-xl text-white shadow-lg",children:f.jsx(vC,{size:24})}),f.jsxs("div",{className:"space-y-6 w-full flex flex-col items-center",children:[f.jsx(xr,{active:h==="control",onClick:()=>p("control"),icon:f.jsx(pf,{}),label:"Control"}),f.jsx(xr,{active:h==="stats",onClick:()=>p("stats"),icon:f.jsx(yC,{}),label:"Stats"}),f.jsx(xr,{active:h==="sessions",onClick:()=>p("sessions"),icon:f.jsx(CC,{}),label:"Sessions"}),f.jsx(xr,{active:h==="study",onClick:()=>{p(I?"study":"sessions")},icon:f.jsx(AC,{}),label:"Study"}),f.jsx(xr,{active:h==="library",onClick:()=>p("library"),icon:f.jsx(mf,{}),label:"Library"}),f.jsx(xr,{active:h==="import",onClick:()=>p("import"),icon:f.jsx(mw,{}),label:"Import"})]}),f.jsxs("div",{className:"mt-auto space-y-4 w-full flex flex-col items-center pb-4",children:[f.jsx("button",{onClick:le,className:"text-slate-400 hover:text-indigo-500 p-2 rounded-lg hover:bg-slate-100",title:"Manual Cloud Sync/Restore",children:f.jsx(gw,{size:24})}),f.jsx("input",{type:"file",accept:".json",ref:_,onChange:ce,className:"hidden"}),f.jsx("button",{onClick:Ce,className:"text-slate-400 hover:text-indigo-500 p-2 rounded-lg hover:bg-slate-100",title:"Restore Local Backup",children:f.jsx(Sh,{size:24})}),f.jsx("button",{onClick:X,className:"text-slate-400 hover:text-emerald-500 p-2 rounded-lg hover:bg-slate-100",title:"Download Local Backup",children:f.jsx(xC,{size:24})}),f.jsx(xr,{active:w,onClick:()=>A(!w),icon:w?f.jsx(FC,{}):f.jsx(NC,{}),label:"Theme"})]})]}),f.jsxs("main",{className:"flex-1 flex flex-col min-w-0 relative overflow-hidden",children:[f.jsx(GC,{syncStatus:n,activeView:h,darkMode:w,fallbackMode:s,lastCloudUpdate:o,sessionStartTime:u,onManualSync:le}),f.jsx(qC,{notification:L,onClose:()=>N(null)}),f.jsx(BC,{children:f.jsxs("div",{className:"flex-1 overflow-y-auto scroll-smooth custom-scrollbar relative",children:[h==="control"&&f.jsx(QC,{library:R,onCreate:me,darkMode:w,notify:S}),h==="stats"&&f.jsx(eR,{library:R,darkMode:w}),h==="sessions"&&f.jsx(JC,{sessions:T,onResume:G=>{D(G),p("study")},onDelete:z,activeId:I,darkMode:w,notify:S}),h==="study"&&ve&&f.jsxs("div",{className:"flex h-full",children:[f.jsxs("div",{className:"flex-1 overflow-y-auto relative",children:[f.jsx("button",{onClick:()=>y(!m),className:`absolute top-4 right-4 z-20 p-2 rounded-lg ${w?"bg-slate-800 text-slate-400 hover:text-white":"bg-white text-slate-500 shadow-sm border border-slate-200 hover:text-slate-800"}`,children:m?f.jsx(bC,{size:18}):f.jsx(DC,{size:18})}),f.jsx(XC,{session:ve,onUpdate:Y,onNavigate:G=>{const Q=T.map(U=>U.id===ve.id?{...U,currentIndex:G}:U);E(Q),ue({sessions:Q})},darkMode:w})]}),f.jsx("div",{className:`${m?"w-80":"w-0"} border-l transition-all duration-300 flex flex-col ${w?"bg-slate-900 border-slate-800":"bg-white border-slate-200"}`,children:f.jsx(YC,{session:ve,onNavigate:G=>{const Q=T.map(U=>U.id===ve.id?{...U,currentIndex:G}:U);E(Q),ue({sessions:Q})},darkMode:w})})]}),h==="study"&&!ve&&f.jsxs("div",{className:"h-full flex flex-col items-center justify-center opacity-50",children:[f.jsx(yw,{size:48,className:"mb-4"}),f.jsx("p",{children:"No active session."}),f.jsx("button",{onClick:()=>p("control"),className:"mt-4 text-indigo-500 font-bold",children:"Start New Session"})]}),h==="library"&&f.jsx(tR,{library:R,darkMode:w,onUpdate:Z}),h==="import"&&f.jsx(nR,{onImport:$,darkMode:w,onRestore:de,notify:S})]})})]})]}):f.jsxs("div",{className:"h-screen flex items-center justify-center bg-slate-50 text-slate-500",children:[f.jsx(cr,{className:"animate-spin mr-2"})," Secure Connecting..."]})}typeof window<"u"&&!window.__firebase_config&&(window.__firebase_config=JSON.stringify({apiKey:"AIzaSyD9wy-5wZToEmGiWM6CooJh4te48YpU-iw",authDomain:"icu-mcq.firebaseapp.com",projectId:"icu-mcq",storageBucket:"icu-mcq.firebasestorage.app",messagingSenderId:"",appId:"1:373977621930:web:7b7721dcd9341bf1fdb7d3"}));uc.createRoot(document.getElementById("root")).render(f.jsx(Ph.StrictMode,{children:f.jsx(rR,{})}));
