(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();function $w(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var Ug={exports:{}},Cl={},zg={exports:{}},ce={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var go=Symbol.for("react.element"),Bw=Symbol.for("react.portal"),Ww=Symbol.for("react.fragment"),Hw=Symbol.for("react.strict_mode"),qw=Symbol.for("react.profiler"),Kw=Symbol.for("react.provider"),Gw=Symbol.for("react.context"),Qw=Symbol.for("react.forward_ref"),Yw=Symbol.for("react.suspense"),Jw=Symbol.for("react.memo"),Xw=Symbol.for("react.lazy"),pp=Symbol.iterator;function Zw(t){return t===null||typeof t!="object"?null:(t=pp&&t[pp]||t["@@iterator"],typeof t=="function"?t:null)}var $g={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Bg=Object.assign,Wg={};function Us(t,e,n){this.props=t,this.context=e,this.refs=Wg,this.updater=n||$g}Us.prototype.isReactComponent={};Us.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Us.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function Hg(){}Hg.prototype=Us.prototype;function Ah(t,e,n){this.props=t,this.context=e,this.refs=Wg,this.updater=n||$g}var Ch=Ah.prototype=new Hg;Ch.constructor=Ah;Bg(Ch,Us.prototype);Ch.isPureReactComponent=!0;var mp=Array.isArray,qg=Object.prototype.hasOwnProperty,Rh={current:null},Kg={key:!0,ref:!0,__self:!0,__source:!0};function Gg(t,e,n){var r,s={},i=null,o=null;if(e!=null)for(r in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(i=""+e.key),e)qg.call(e,r)&&!Kg.hasOwnProperty(r)&&(s[r]=e[r]);var l=arguments.length-2;if(l===1)s.children=n;else if(1<l){for(var u=Array(l),h=0;h<l;h++)u[h]=arguments[h+2];s.children=u}if(t&&t.defaultProps)for(r in l=t.defaultProps,l)s[r]===void 0&&(s[r]=l[r]);return{$$typeof:go,type:t,key:i,ref:o,props:s,_owner:Rh.current}}function eE(t,e){return{$$typeof:go,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Ph(t){return typeof t=="object"&&t!==null&&t.$$typeof===go}function tE(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var gp=/\/+/g;function ku(t,e){return typeof t=="object"&&t!==null&&t.key!=null?tE(""+t.key):e.toString(36)}function _a(t,e,n,r,s){var i=typeof t;(i==="undefined"||i==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(i){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case go:case Bw:o=!0}}if(o)return o=t,s=s(o),t=r===""?"."+ku(o,0):r,mp(s)?(n="",t!=null&&(n=t.replace(gp,"$&/")+"/"),_a(s,e,n,"",function(h){return h})):s!=null&&(Ph(s)&&(s=eE(s,n+(!s.key||o&&o.key===s.key?"":(""+s.key).replace(gp,"$&/")+"/")+t)),e.push(s)),1;if(o=0,r=r===""?".":r+":",mp(t))for(var l=0;l<t.length;l++){i=t[l];var u=r+ku(i,l);o+=_a(i,e,n,u,s)}else if(u=Zw(t),typeof u=="function")for(t=u.call(t),l=0;!(i=t.next()).done;)i=i.value,u=r+ku(i,l++),o+=_a(i,e,n,u,s);else if(i==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function Yo(t,e,n){if(t==null)return t;var r=[],s=0;return _a(t,r,"","",function(i){return e.call(n,i,s++)}),r}function nE(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var vt={current:null},wa={transition:null},rE={ReactCurrentDispatcher:vt,ReactCurrentBatchConfig:wa,ReactCurrentOwner:Rh};function Qg(){throw Error("act(...) is not supported in production builds of React.")}ce.Children={map:Yo,forEach:function(t,e,n){Yo(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return Yo(t,function(){e++}),e},toArray:function(t){return Yo(t,function(e){return e})||[]},only:function(t){if(!Ph(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};ce.Component=Us;ce.Fragment=Ww;ce.Profiler=qw;ce.PureComponent=Ah;ce.StrictMode=Hw;ce.Suspense=Yw;ce.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=rE;ce.act=Qg;ce.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var r=Bg({},t.props),s=t.key,i=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(i=e.ref,o=Rh.current),e.key!==void 0&&(s=""+e.key),t.type&&t.type.defaultProps)var l=t.type.defaultProps;for(u in e)qg.call(e,u)&&!Kg.hasOwnProperty(u)&&(r[u]=e[u]===void 0&&l!==void 0?l[u]:e[u])}var u=arguments.length-2;if(u===1)r.children=n;else if(1<u){l=Array(u);for(var h=0;h<u;h++)l[h]=arguments[h+2];r.children=l}return{$$typeof:go,type:t.type,key:s,ref:i,props:r,_owner:o}};ce.createContext=function(t){return t={$$typeof:Gw,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:Kw,_context:t},t.Consumer=t};ce.createElement=Gg;ce.createFactory=function(t){var e=Gg.bind(null,t);return e.type=t,e};ce.createRef=function(){return{current:null}};ce.forwardRef=function(t){return{$$typeof:Qw,render:t}};ce.isValidElement=Ph;ce.lazy=function(t){return{$$typeof:Xw,_payload:{_status:-1,_result:t},_init:nE}};ce.memo=function(t,e){return{$$typeof:Jw,type:t,compare:e===void 0?null:e}};ce.startTransition=function(t){var e=wa.transition;wa.transition={};try{t()}finally{wa.transition=e}};ce.unstable_act=Qg;ce.useCallback=function(t,e){return vt.current.useCallback(t,e)};ce.useContext=function(t){return vt.current.useContext(t)};ce.useDebugValue=function(){};ce.useDeferredValue=function(t){return vt.current.useDeferredValue(t)};ce.useEffect=function(t,e){return vt.current.useEffect(t,e)};ce.useId=function(){return vt.current.useId()};ce.useImperativeHandle=function(t,e,n){return vt.current.useImperativeHandle(t,e,n)};ce.useInsertionEffect=function(t,e){return vt.current.useInsertionEffect(t,e)};ce.useLayoutEffect=function(t,e){return vt.current.useLayoutEffect(t,e)};ce.useMemo=function(t,e){return vt.current.useMemo(t,e)};ce.useReducer=function(t,e,n){return vt.current.useReducer(t,e,n)};ce.useRef=function(t){return vt.current.useRef(t)};ce.useState=function(t){return vt.current.useState(t)};ce.useSyncExternalStore=function(t,e,n){return vt.current.useSyncExternalStore(t,e,n)};ce.useTransition=function(){return vt.current.useTransition()};ce.version="18.3.1";zg.exports=ce;var B=zg.exports;const Nh=$w(B);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var sE=B,iE=Symbol.for("react.element"),oE=Symbol.for("react.fragment"),aE=Object.prototype.hasOwnProperty,lE=sE.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,uE={key:!0,ref:!0,__self:!0,__source:!0};function Yg(t,e,n){var r,s={},i=null,o=null;n!==void 0&&(i=""+n),e.key!==void 0&&(i=""+e.key),e.ref!==void 0&&(o=e.ref);for(r in e)aE.call(e,r)&&!uE.hasOwnProperty(r)&&(s[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)s[r]===void 0&&(s[r]=e[r]);return{$$typeof:iE,type:t,key:i,ref:o,props:s,_owner:lE.current}}Cl.Fragment=oE;Cl.jsx=Yg;Cl.jsxs=Yg;Ug.exports=Cl;var f=Ug.exports,cc={},Jg={exports:{}},bt={},Xg={exports:{}},Zg={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e($,Q){var J=$.length;$.push(Q);e:for(;0<J;){var ue=J-1>>>1,ae=$[ue];if(0<s(ae,Q))$[ue]=Q,$[J]=ae,J=ue;else break e}}function n($){return $.length===0?null:$[0]}function r($){if($.length===0)return null;var Q=$[0],J=$.pop();if(J!==Q){$[0]=J;e:for(var ue=0,ae=$.length,L=ae>>>1;ue<L;){var ee=2*(ue+1)-1,Me=$[ee],se=ee+1,ve=$[se];if(0>s(Me,J))se<ae&&0>s(ve,Me)?($[ue]=ve,$[se]=J,ue=se):($[ue]=Me,$[ee]=J,ue=ee);else if(se<ae&&0>s(ve,J))$[ue]=ve,$[se]=J,ue=se;else break e}}return Q}function s($,Q){var J=$.sortIndex-Q.sortIndex;return J!==0?J:$.id-Q.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;t.unstable_now=function(){return i.now()}}else{var o=Date,l=o.now();t.unstable_now=function(){return o.now()-l}}var u=[],h=[],p=1,m=null,v=3,_=!1,C=!1,P=!1,O=typeof setTimeout=="function"?setTimeout:null,S=typeof clearTimeout=="function"?clearTimeout:null,T=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function k($){for(var Q=n(h);Q!==null;){if(Q.callback===null)r(h);else if(Q.startTime<=$)r(h),Q.sortIndex=Q.expirationTime,e(u,Q);else break;Q=n(h)}}function D($){if(P=!1,k($),!C)if(n(u)!==null)C=!0,ye(F);else{var Q=n(h);Q!==null&&pe(D,Q.startTime-$)}}function F($,Q){C=!1,P&&(P=!1,S(y),y=-1),_=!0;var J=v;try{for(k(Q),m=n(u);m!==null&&(!(m.expirationTime>Q)||$&&!A());){var ue=m.callback;if(typeof ue=="function"){m.callback=null,v=m.priorityLevel;var ae=ue(m.expirationTime<=Q);Q=t.unstable_now(),typeof ae=="function"?m.callback=ae:m===n(u)&&r(u),k(Q)}else r(u);m=n(u)}if(m!==null)var L=!0;else{var ee=n(h);ee!==null&&pe(D,ee.startTime-Q),L=!1}return L}finally{m=null,v=J,_=!1}}var U=!1,E=null,y=-1,w=5,x=-1;function A(){return!(t.unstable_now()-x<w)}function R(){if(E!==null){var $=t.unstable_now();x=$;var Q=!0;try{Q=E(!0,$)}finally{Q?I():(U=!1,E=null)}}else U=!1}var I;if(typeof T=="function")I=function(){T(R)};else if(typeof MessageChannel<"u"){var G=new MessageChannel,Re=G.port2;G.port1.onmessage=R,I=function(){Re.postMessage(null)}}else I=function(){O(R,0)};function ye($){E=$,U||(U=!0,I())}function pe($,Q){y=O(function(){$(t.unstable_now())},Q)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function($){$.callback=null},t.unstable_continueExecution=function(){C||_||(C=!0,ye(F))},t.unstable_forceFrameRate=function($){0>$||125<$?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):w=0<$?Math.floor(1e3/$):5},t.unstable_getCurrentPriorityLevel=function(){return v},t.unstable_getFirstCallbackNode=function(){return n(u)},t.unstable_next=function($){switch(v){case 1:case 2:case 3:var Q=3;break;default:Q=v}var J=v;v=Q;try{return $()}finally{v=J}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function($,Q){switch($){case 1:case 2:case 3:case 4:case 5:break;default:$=3}var J=v;v=$;try{return Q()}finally{v=J}},t.unstable_scheduleCallback=function($,Q,J){var ue=t.unstable_now();switch(typeof J=="object"&&J!==null?(J=J.delay,J=typeof J=="number"&&0<J?ue+J:ue):J=ue,$){case 1:var ae=-1;break;case 2:ae=250;break;case 5:ae=1073741823;break;case 4:ae=1e4;break;default:ae=5e3}return ae=J+ae,$={id:p++,callback:Q,priorityLevel:$,startTime:J,expirationTime:ae,sortIndex:-1},J>ue?($.sortIndex=J,e(h,$),n(u)===null&&$===n(h)&&(P?(S(y),y=-1):P=!0,pe(D,J-ue))):($.sortIndex=ae,e(u,$),C||_||(C=!0,ye(F))),$},t.unstable_shouldYield=A,t.unstable_wrapCallback=function($){var Q=v;return function(){var J=v;v=Q;try{return $.apply(this,arguments)}finally{v=J}}}})(Zg);Xg.exports=Zg;var cE=Xg.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var hE=B,Nt=cE;function j(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var ey=new Set,zi={};function Br(t,e){Ss(t,e),Ss(t+"Capture",e)}function Ss(t,e){for(zi[t]=e,t=0;t<e.length;t++)ey.add(e[t])}var xn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),hc=Object.prototype.hasOwnProperty,dE=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,yp={},vp={};function fE(t){return hc.call(vp,t)?!0:hc.call(yp,t)?!1:dE.test(t)?vp[t]=!0:(yp[t]=!0,!1)}function pE(t,e,n,r){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function mE(t,e,n,r){if(e===null||typeof e>"u"||pE(t,e,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function _t(t,e,n,r,s,i,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=r,this.attributeNamespace=s,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=i,this.removeEmptyString=o}var tt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){tt[t]=new _t(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];tt[e]=new _t(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){tt[t]=new _t(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){tt[t]=new _t(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){tt[t]=new _t(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){tt[t]=new _t(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){tt[t]=new _t(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){tt[t]=new _t(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){tt[t]=new _t(t,5,!1,t.toLowerCase(),null,!1,!1)});var bh=/[\-:]([a-z])/g;function Dh(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(bh,Dh);tt[e]=new _t(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(bh,Dh);tt[e]=new _t(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(bh,Dh);tt[e]=new _t(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){tt[t]=new _t(t,1,!1,t.toLowerCase(),null,!1,!1)});tt.xlinkHref=new _t("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){tt[t]=new _t(t,1,!1,t.toLowerCase(),null,!0,!0)});function Oh(t,e,n,r){var s=tt.hasOwnProperty(e)?tt[e]:null;(s!==null?s.type!==0:r||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(mE(e,n,s,r)&&(n=null),r||s===null?fE(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):s.mustUseProperty?t[s.propertyName]=n===null?s.type===3?!1:"":n:(e=s.attributeName,r=s.attributeNamespace,n===null?t.removeAttribute(e):(s=s.type,n=s===3||s===4&&n===!0?"":""+n,r?t.setAttributeNS(r,e,n):t.setAttribute(e,n))))}var On=hE.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Jo=Symbol.for("react.element"),ts=Symbol.for("react.portal"),ns=Symbol.for("react.fragment"),Vh=Symbol.for("react.strict_mode"),dc=Symbol.for("react.profiler"),ty=Symbol.for("react.provider"),ny=Symbol.for("react.context"),Lh=Symbol.for("react.forward_ref"),fc=Symbol.for("react.suspense"),pc=Symbol.for("react.suspense_list"),Mh=Symbol.for("react.memo"),$n=Symbol.for("react.lazy"),ry=Symbol.for("react.offscreen"),_p=Symbol.iterator;function ci(t){return t===null||typeof t!="object"?null:(t=_p&&t[_p]||t["@@iterator"],typeof t=="function"?t:null)}var be=Object.assign,Au;function _i(t){if(Au===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Au=e&&e[1]||""}return`
`+Au+t}var Cu=!1;function Ru(t,e){if(!t||Cu)return"";Cu=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(h){var r=h}Reflect.construct(t,[],e)}else{try{e.call()}catch(h){r=h}t.call(e.prototype)}else{try{throw Error()}catch(h){r=h}t()}}catch(h){if(h&&r&&typeof h.stack=="string"){for(var s=h.stack.split(`
`),i=r.stack.split(`
`),o=s.length-1,l=i.length-1;1<=o&&0<=l&&s[o]!==i[l];)l--;for(;1<=o&&0<=l;o--,l--)if(s[o]!==i[l]){if(o!==1||l!==1)do if(o--,l--,0>l||s[o]!==i[l]){var u=`
`+s[o].replace(" at new "," at ");return t.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",t.displayName)),u}while(1<=o&&0<=l);break}}}finally{Cu=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?_i(t):""}function gE(t){switch(t.tag){case 5:return _i(t.type);case 16:return _i("Lazy");case 13:return _i("Suspense");case 19:return _i("SuspenseList");case 0:case 2:case 15:return t=Ru(t.type,!1),t;case 11:return t=Ru(t.type.render,!1),t;case 1:return t=Ru(t.type,!0),t;default:return""}}function mc(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case ns:return"Fragment";case ts:return"Portal";case dc:return"Profiler";case Vh:return"StrictMode";case fc:return"Suspense";case pc:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case ny:return(t.displayName||"Context")+".Consumer";case ty:return(t._context.displayName||"Context")+".Provider";case Lh:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Mh:return e=t.displayName||null,e!==null?e:mc(t.type)||"Memo";case $n:e=t._payload,t=t._init;try{return mc(t(e))}catch{}}return null}function yE(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return mc(e);case 8:return e===Vh?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function cr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function sy(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function vE(t){var e=sy(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),r=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var s=n.get,i=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return s.call(this)},set:function(o){r=""+o,i.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Xo(t){t._valueTracker||(t._valueTracker=vE(t))}function iy(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),r="";return t&&(r=sy(t)?t.checked?"true":"false":t.value),t=r,t!==n?(e.setValue(t),!0):!1}function Ua(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function gc(t,e){var n=e.checked;return be({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function wp(t,e){var n=e.defaultValue==null?"":e.defaultValue,r=e.checked!=null?e.checked:e.defaultChecked;n=cr(e.value!=null?e.value:n),t._wrapperState={initialChecked:r,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function oy(t,e){e=e.checked,e!=null&&Oh(t,"checked",e,!1)}function yc(t,e){oy(t,e);var n=cr(e.value),r=e.type;if(n!=null)r==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(r==="submit"||r==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?vc(t,e.type,n):e.hasOwnProperty("defaultValue")&&vc(t,e.type,cr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Ep(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var r=e.type;if(!(r!=="submit"&&r!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function vc(t,e,n){(e!=="number"||Ua(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var wi=Array.isArray;function ps(t,e,n,r){if(t=t.options,e){e={};for(var s=0;s<n.length;s++)e["$"+n[s]]=!0;for(n=0;n<t.length;n++)s=e.hasOwnProperty("$"+t[n].value),t[n].selected!==s&&(t[n].selected=s),s&&r&&(t[n].defaultSelected=!0)}else{for(n=""+cr(n),e=null,s=0;s<t.length;s++){if(t[s].value===n){t[s].selected=!0,r&&(t[s].defaultSelected=!0);return}e!==null||t[s].disabled||(e=t[s])}e!==null&&(e.selected=!0)}}function _c(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(j(91));return be({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Tp(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(j(92));if(wi(n)){if(1<n.length)throw Error(j(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:cr(n)}}function ay(t,e){var n=cr(e.value),r=cr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),r!=null&&(t.defaultValue=""+r)}function Ip(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function ly(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function wc(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?ly(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Zo,uy=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,r,s){MSApp.execUnsafeLocalFunction(function(){return t(e,n,r,s)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(Zo=Zo||document.createElement("div"),Zo.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Zo.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function $i(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Ai={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},_E=["Webkit","ms","Moz","O"];Object.keys(Ai).forEach(function(t){_E.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),Ai[e]=Ai[t]})});function cy(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||Ai.hasOwnProperty(t)&&Ai[t]?(""+e).trim():e+"px"}function hy(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var r=n.indexOf("--")===0,s=cy(n,e[n],r);n==="float"&&(n="cssFloat"),r?t.setProperty(n,s):t[n]=s}}var wE=be({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Ec(t,e){if(e){if(wE[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(j(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(j(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(j(61))}if(e.style!=null&&typeof e.style!="object")throw Error(j(62))}}function Tc(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ic=null;function jh(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var xc=null,ms=null,gs=null;function xp(t){if(t=_o(t)){if(typeof xc!="function")throw Error(j(280));var e=t.stateNode;e&&(e=Dl(e),xc(t.stateNode,t.type,e))}}function dy(t){ms?gs?gs.push(t):gs=[t]:ms=t}function fy(){if(ms){var t=ms,e=gs;if(gs=ms=null,xp(t),e)for(t=0;t<e.length;t++)xp(e[t])}}function py(t,e){return t(e)}function my(){}var Pu=!1;function gy(t,e,n){if(Pu)return t(e,n);Pu=!0;try{return py(t,e,n)}finally{Pu=!1,(ms!==null||gs!==null)&&(my(),fy())}}function Bi(t,e){var n=t.stateNode;if(n===null)return null;var r=Dl(n);if(r===null)return null;n=r[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(j(231,e,typeof n));return n}var Sc=!1;if(xn)try{var hi={};Object.defineProperty(hi,"passive",{get:function(){Sc=!0}}),window.addEventListener("test",hi,hi),window.removeEventListener("test",hi,hi)}catch{Sc=!1}function EE(t,e,n,r,s,i,o,l,u){var h=Array.prototype.slice.call(arguments,3);try{e.apply(n,h)}catch(p){this.onError(p)}}var Ci=!1,za=null,$a=!1,kc=null,TE={onError:function(t){Ci=!0,za=t}};function IE(t,e,n,r,s,i,o,l,u){Ci=!1,za=null,EE.apply(TE,arguments)}function xE(t,e,n,r,s,i,o,l,u){if(IE.apply(this,arguments),Ci){if(Ci){var h=za;Ci=!1,za=null}else throw Error(j(198));$a||($a=!0,kc=h)}}function Wr(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function yy(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Sp(t){if(Wr(t)!==t)throw Error(j(188))}function SE(t){var e=t.alternate;if(!e){if(e=Wr(t),e===null)throw Error(j(188));return e!==t?null:t}for(var n=t,r=e;;){var s=n.return;if(s===null)break;var i=s.alternate;if(i===null){if(r=s.return,r!==null){n=r;continue}break}if(s.child===i.child){for(i=s.child;i;){if(i===n)return Sp(s),t;if(i===r)return Sp(s),e;i=i.sibling}throw Error(j(188))}if(n.return!==r.return)n=s,r=i;else{for(var o=!1,l=s.child;l;){if(l===n){o=!0,n=s,r=i;break}if(l===r){o=!0,r=s,n=i;break}l=l.sibling}if(!o){for(l=i.child;l;){if(l===n){o=!0,n=i,r=s;break}if(l===r){o=!0,r=i,n=s;break}l=l.sibling}if(!o)throw Error(j(189))}}if(n.alternate!==r)throw Error(j(190))}if(n.tag!==3)throw Error(j(188));return n.stateNode.current===n?t:e}function vy(t){return t=SE(t),t!==null?_y(t):null}function _y(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=_y(t);if(e!==null)return e;t=t.sibling}return null}var wy=Nt.unstable_scheduleCallback,kp=Nt.unstable_cancelCallback,kE=Nt.unstable_shouldYield,AE=Nt.unstable_requestPaint,Fe=Nt.unstable_now,CE=Nt.unstable_getCurrentPriorityLevel,Fh=Nt.unstable_ImmediatePriority,Ey=Nt.unstable_UserBlockingPriority,Ba=Nt.unstable_NormalPriority,RE=Nt.unstable_LowPriority,Ty=Nt.unstable_IdlePriority,Rl=null,rn=null;function PE(t){if(rn&&typeof rn.onCommitFiberRoot=="function")try{rn.onCommitFiberRoot(Rl,t,void 0,(t.current.flags&128)===128)}catch{}}var Yt=Math.clz32?Math.clz32:DE,NE=Math.log,bE=Math.LN2;function DE(t){return t>>>=0,t===0?32:31-(NE(t)/bE|0)|0}var ea=64,ta=4194304;function Ei(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Wa(t,e){var n=t.pendingLanes;if(n===0)return 0;var r=0,s=t.suspendedLanes,i=t.pingedLanes,o=n&268435455;if(o!==0){var l=o&~s;l!==0?r=Ei(l):(i&=o,i!==0&&(r=Ei(i)))}else o=n&~s,o!==0?r=Ei(o):i!==0&&(r=Ei(i));if(r===0)return 0;if(e!==0&&e!==r&&!(e&s)&&(s=r&-r,i=e&-e,s>=i||s===16&&(i&4194240)!==0))return e;if(r&4&&(r|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=r;0<e;)n=31-Yt(e),s=1<<n,r|=t[n],e&=~s;return r}function OE(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function VE(t,e){for(var n=t.suspendedLanes,r=t.pingedLanes,s=t.expirationTimes,i=t.pendingLanes;0<i;){var o=31-Yt(i),l=1<<o,u=s[o];u===-1?(!(l&n)||l&r)&&(s[o]=OE(l,e)):u<=e&&(t.expiredLanes|=l),i&=~l}}function Ac(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Iy(){var t=ea;return ea<<=1,!(ea&4194240)&&(ea=64),t}function Nu(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function yo(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-Yt(e),t[e]=n}function LE(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var r=t.eventTimes;for(t=t.expirationTimes;0<n;){var s=31-Yt(n),i=1<<s;e[s]=0,r[s]=-1,t[s]=-1,n&=~i}}function Uh(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var r=31-Yt(n),s=1<<r;s&e|t[r]&e&&(t[r]|=e),n&=~s}}var Ee=0;function xy(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var Sy,zh,ky,Ay,Cy,Cc=!1,na=[],Zn=null,er=null,tr=null,Wi=new Map,Hi=new Map,Wn=[],ME="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Ap(t,e){switch(t){case"focusin":case"focusout":Zn=null;break;case"dragenter":case"dragleave":er=null;break;case"mouseover":case"mouseout":tr=null;break;case"pointerover":case"pointerout":Wi.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Hi.delete(e.pointerId)}}function di(t,e,n,r,s,i){return t===null||t.nativeEvent!==i?(t={blockedOn:e,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[s]},e!==null&&(e=_o(e),e!==null&&zh(e)),t):(t.eventSystemFlags|=r,e=t.targetContainers,s!==null&&e.indexOf(s)===-1&&e.push(s),t)}function jE(t,e,n,r,s){switch(e){case"focusin":return Zn=di(Zn,t,e,n,r,s),!0;case"dragenter":return er=di(er,t,e,n,r,s),!0;case"mouseover":return tr=di(tr,t,e,n,r,s),!0;case"pointerover":var i=s.pointerId;return Wi.set(i,di(Wi.get(i)||null,t,e,n,r,s)),!0;case"gotpointercapture":return i=s.pointerId,Hi.set(i,di(Hi.get(i)||null,t,e,n,r,s)),!0}return!1}function Ry(t){var e=Sr(t.target);if(e!==null){var n=Wr(e);if(n!==null){if(e=n.tag,e===13){if(e=yy(n),e!==null){t.blockedOn=e,Cy(t.priority,function(){ky(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Ea(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Rc(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var r=new n.constructor(n.type,n);Ic=r,n.target.dispatchEvent(r),Ic=null}else return e=_o(n),e!==null&&zh(e),t.blockedOn=n,!1;e.shift()}return!0}function Cp(t,e,n){Ea(t)&&n.delete(e)}function FE(){Cc=!1,Zn!==null&&Ea(Zn)&&(Zn=null),er!==null&&Ea(er)&&(er=null),tr!==null&&Ea(tr)&&(tr=null),Wi.forEach(Cp),Hi.forEach(Cp)}function fi(t,e){t.blockedOn===e&&(t.blockedOn=null,Cc||(Cc=!0,Nt.unstable_scheduleCallback(Nt.unstable_NormalPriority,FE)))}function qi(t){function e(s){return fi(s,t)}if(0<na.length){fi(na[0],t);for(var n=1;n<na.length;n++){var r=na[n];r.blockedOn===t&&(r.blockedOn=null)}}for(Zn!==null&&fi(Zn,t),er!==null&&fi(er,t),tr!==null&&fi(tr,t),Wi.forEach(e),Hi.forEach(e),n=0;n<Wn.length;n++)r=Wn[n],r.blockedOn===t&&(r.blockedOn=null);for(;0<Wn.length&&(n=Wn[0],n.blockedOn===null);)Ry(n),n.blockedOn===null&&Wn.shift()}var ys=On.ReactCurrentBatchConfig,Ha=!0;function UE(t,e,n,r){var s=Ee,i=ys.transition;ys.transition=null;try{Ee=1,$h(t,e,n,r)}finally{Ee=s,ys.transition=i}}function zE(t,e,n,r){var s=Ee,i=ys.transition;ys.transition=null;try{Ee=4,$h(t,e,n,r)}finally{Ee=s,ys.transition=i}}function $h(t,e,n,r){if(Ha){var s=Rc(t,e,n,r);if(s===null)zu(t,e,r,qa,n),Ap(t,r);else if(jE(s,t,e,n,r))r.stopPropagation();else if(Ap(t,r),e&4&&-1<ME.indexOf(t)){for(;s!==null;){var i=_o(s);if(i!==null&&Sy(i),i=Rc(t,e,n,r),i===null&&zu(t,e,r,qa,n),i===s)break;s=i}s!==null&&r.stopPropagation()}else zu(t,e,r,null,n)}}var qa=null;function Rc(t,e,n,r){if(qa=null,t=jh(r),t=Sr(t),t!==null)if(e=Wr(t),e===null)t=null;else if(n=e.tag,n===13){if(t=yy(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return qa=t,null}function Py(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(CE()){case Fh:return 1;case Ey:return 4;case Ba:case RE:return 16;case Ty:return 536870912;default:return 16}default:return 16}}var Yn=null,Bh=null,Ta=null;function Ny(){if(Ta)return Ta;var t,e=Bh,n=e.length,r,s="value"in Yn?Yn.value:Yn.textContent,i=s.length;for(t=0;t<n&&e[t]===s[t];t++);var o=n-t;for(r=1;r<=o&&e[n-r]===s[i-r];r++);return Ta=s.slice(t,1<r?1-r:void 0)}function Ia(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function ra(){return!0}function Rp(){return!1}function Dt(t){function e(n,r,s,i,o){this._reactName=n,this._targetInst=s,this.type=r,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var l in t)t.hasOwnProperty(l)&&(n=t[l],this[l]=n?n(i):i[l]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?ra:Rp,this.isPropagationStopped=Rp,this}return be(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=ra)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=ra)},persist:function(){},isPersistent:ra}),e}var zs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Wh=Dt(zs),vo=be({},zs,{view:0,detail:0}),$E=Dt(vo),bu,Du,pi,Pl=be({},vo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Hh,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==pi&&(pi&&t.type==="mousemove"?(bu=t.screenX-pi.screenX,Du=t.screenY-pi.screenY):Du=bu=0,pi=t),bu)},movementY:function(t){return"movementY"in t?t.movementY:Du}}),Pp=Dt(Pl),BE=be({},Pl,{dataTransfer:0}),WE=Dt(BE),HE=be({},vo,{relatedTarget:0}),Ou=Dt(HE),qE=be({},zs,{animationName:0,elapsedTime:0,pseudoElement:0}),KE=Dt(qE),GE=be({},zs,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),QE=Dt(GE),YE=be({},zs,{data:0}),Np=Dt(YE),JE={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},XE={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},ZE={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function e1(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=ZE[t])?!!e[t]:!1}function Hh(){return e1}var t1=be({},vo,{key:function(t){if(t.key){var e=JE[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Ia(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?XE[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Hh,charCode:function(t){return t.type==="keypress"?Ia(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Ia(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),n1=Dt(t1),r1=be({},Pl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),bp=Dt(r1),s1=be({},vo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Hh}),i1=Dt(s1),o1=be({},zs,{propertyName:0,elapsedTime:0,pseudoElement:0}),a1=Dt(o1),l1=be({},Pl,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),u1=Dt(l1),c1=[9,13,27,32],qh=xn&&"CompositionEvent"in window,Ri=null;xn&&"documentMode"in document&&(Ri=document.documentMode);var h1=xn&&"TextEvent"in window&&!Ri,by=xn&&(!qh||Ri&&8<Ri&&11>=Ri),Dp=" ",Op=!1;function Dy(t,e){switch(t){case"keyup":return c1.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Oy(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var rs=!1;function d1(t,e){switch(t){case"compositionend":return Oy(e);case"keypress":return e.which!==32?null:(Op=!0,Dp);case"textInput":return t=e.data,t===Dp&&Op?null:t;default:return null}}function f1(t,e){if(rs)return t==="compositionend"||!qh&&Dy(t,e)?(t=Ny(),Ta=Bh=Yn=null,rs=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return by&&e.locale!=="ko"?null:e.data;default:return null}}var p1={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Vp(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!p1[t.type]:e==="textarea"}function Vy(t,e,n,r){dy(r),e=Ka(e,"onChange"),0<e.length&&(n=new Wh("onChange","change",null,n,r),t.push({event:n,listeners:e}))}var Pi=null,Ki=null;function m1(t){qy(t,0)}function Nl(t){var e=os(t);if(iy(e))return t}function g1(t,e){if(t==="change")return e}var Ly=!1;if(xn){var Vu;if(xn){var Lu="oninput"in document;if(!Lu){var Lp=document.createElement("div");Lp.setAttribute("oninput","return;"),Lu=typeof Lp.oninput=="function"}Vu=Lu}else Vu=!1;Ly=Vu&&(!document.documentMode||9<document.documentMode)}function Mp(){Pi&&(Pi.detachEvent("onpropertychange",My),Ki=Pi=null)}function My(t){if(t.propertyName==="value"&&Nl(Ki)){var e=[];Vy(e,Ki,t,jh(t)),gy(m1,e)}}function y1(t,e,n){t==="focusin"?(Mp(),Pi=e,Ki=n,Pi.attachEvent("onpropertychange",My)):t==="focusout"&&Mp()}function v1(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Nl(Ki)}function _1(t,e){if(t==="click")return Nl(e)}function w1(t,e){if(t==="input"||t==="change")return Nl(e)}function E1(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Xt=typeof Object.is=="function"?Object.is:E1;function Gi(t,e){if(Xt(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),r=Object.keys(e);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var s=n[r];if(!hc.call(e,s)||!Xt(t[s],e[s]))return!1}return!0}function jp(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Fp(t,e){var n=jp(t);t=0;for(var r;n;){if(n.nodeType===3){if(r=t+n.textContent.length,t<=e&&r>=e)return{node:n,offset:e-t};t=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=jp(n)}}function jy(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?jy(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Fy(){for(var t=window,e=Ua();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Ua(t.document)}return e}function Kh(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function T1(t){var e=Fy(),n=t.focusedElem,r=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&jy(n.ownerDocument.documentElement,n)){if(r!==null&&Kh(n)){if(e=r.start,t=r.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var s=n.textContent.length,i=Math.min(r.start,s);r=r.end===void 0?i:Math.min(r.end,s),!t.extend&&i>r&&(s=r,r=i,i=s),s=Fp(n,i);var o=Fp(n,r);s&&o&&(t.rangeCount!==1||t.anchorNode!==s.node||t.anchorOffset!==s.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(s.node,s.offset),t.removeAllRanges(),i>r?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var I1=xn&&"documentMode"in document&&11>=document.documentMode,ss=null,Pc=null,Ni=null,Nc=!1;function Up(t,e,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Nc||ss==null||ss!==Ua(r)||(r=ss,"selectionStart"in r&&Kh(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Ni&&Gi(Ni,r)||(Ni=r,r=Ka(Pc,"onSelect"),0<r.length&&(e=new Wh("onSelect","select",null,e,n),t.push({event:e,listeners:r}),e.target=ss)))}function sa(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var is={animationend:sa("Animation","AnimationEnd"),animationiteration:sa("Animation","AnimationIteration"),animationstart:sa("Animation","AnimationStart"),transitionend:sa("Transition","TransitionEnd")},Mu={},Uy={};xn&&(Uy=document.createElement("div").style,"AnimationEvent"in window||(delete is.animationend.animation,delete is.animationiteration.animation,delete is.animationstart.animation),"TransitionEvent"in window||delete is.transitionend.transition);function bl(t){if(Mu[t])return Mu[t];if(!is[t])return t;var e=is[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in Uy)return Mu[t]=e[n];return t}var zy=bl("animationend"),$y=bl("animationiteration"),By=bl("animationstart"),Wy=bl("transitionend"),Hy=new Map,zp="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function mr(t,e){Hy.set(t,e),Br(e,[t])}for(var ju=0;ju<zp.length;ju++){var Fu=zp[ju],x1=Fu.toLowerCase(),S1=Fu[0].toUpperCase()+Fu.slice(1);mr(x1,"on"+S1)}mr(zy,"onAnimationEnd");mr($y,"onAnimationIteration");mr(By,"onAnimationStart");mr("dblclick","onDoubleClick");mr("focusin","onFocus");mr("focusout","onBlur");mr(Wy,"onTransitionEnd");Ss("onMouseEnter",["mouseout","mouseover"]);Ss("onMouseLeave",["mouseout","mouseover"]);Ss("onPointerEnter",["pointerout","pointerover"]);Ss("onPointerLeave",["pointerout","pointerover"]);Br("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Br("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Br("onBeforeInput",["compositionend","keypress","textInput","paste"]);Br("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Br("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Br("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ti="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),k1=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ti));function $p(t,e,n){var r=t.type||"unknown-event";t.currentTarget=n,xE(r,e,void 0,t),t.currentTarget=null}function qy(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var r=t[n],s=r.event;r=r.listeners;e:{var i=void 0;if(e)for(var o=r.length-1;0<=o;o--){var l=r[o],u=l.instance,h=l.currentTarget;if(l=l.listener,u!==i&&s.isPropagationStopped())break e;$p(s,l,h),i=u}else for(o=0;o<r.length;o++){if(l=r[o],u=l.instance,h=l.currentTarget,l=l.listener,u!==i&&s.isPropagationStopped())break e;$p(s,l,h),i=u}}}if($a)throw t=kc,$a=!1,kc=null,t}function ke(t,e){var n=e[Lc];n===void 0&&(n=e[Lc]=new Set);var r=t+"__bubble";n.has(r)||(Ky(e,t,2,!1),n.add(r))}function Uu(t,e,n){var r=0;e&&(r|=4),Ky(n,t,r,e)}var ia="_reactListening"+Math.random().toString(36).slice(2);function Qi(t){if(!t[ia]){t[ia]=!0,ey.forEach(function(n){n!=="selectionchange"&&(k1.has(n)||Uu(n,!1,t),Uu(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[ia]||(e[ia]=!0,Uu("selectionchange",!1,e))}}function Ky(t,e,n,r){switch(Py(e)){case 1:var s=UE;break;case 4:s=zE;break;default:s=$h}n=s.bind(null,e,n,t),s=void 0,!Sc||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(s=!0),r?s!==void 0?t.addEventListener(e,n,{capture:!0,passive:s}):t.addEventListener(e,n,!0):s!==void 0?t.addEventListener(e,n,{passive:s}):t.addEventListener(e,n,!1)}function zu(t,e,n,r,s){var i=r;if(!(e&1)&&!(e&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var l=r.stateNode.containerInfo;if(l===s||l.nodeType===8&&l.parentNode===s)break;if(o===4)for(o=r.return;o!==null;){var u=o.tag;if((u===3||u===4)&&(u=o.stateNode.containerInfo,u===s||u.nodeType===8&&u.parentNode===s))return;o=o.return}for(;l!==null;){if(o=Sr(l),o===null)return;if(u=o.tag,u===5||u===6){r=i=o;continue e}l=l.parentNode}}r=r.return}gy(function(){var h=i,p=jh(n),m=[];e:{var v=Hy.get(t);if(v!==void 0){var _=Wh,C=t;switch(t){case"keypress":if(Ia(n)===0)break e;case"keydown":case"keyup":_=n1;break;case"focusin":C="focus",_=Ou;break;case"focusout":C="blur",_=Ou;break;case"beforeblur":case"afterblur":_=Ou;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":_=Pp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":_=WE;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":_=i1;break;case zy:case $y:case By:_=KE;break;case Wy:_=a1;break;case"scroll":_=$E;break;case"wheel":_=u1;break;case"copy":case"cut":case"paste":_=QE;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":_=bp}var P=(e&4)!==0,O=!P&&t==="scroll",S=P?v!==null?v+"Capture":null:v;P=[];for(var T=h,k;T!==null;){k=T;var D=k.stateNode;if(k.tag===5&&D!==null&&(k=D,S!==null&&(D=Bi(T,S),D!=null&&P.push(Yi(T,D,k)))),O)break;T=T.return}0<P.length&&(v=new _(v,C,null,n,p),m.push({event:v,listeners:P}))}}if(!(e&7)){e:{if(v=t==="mouseover"||t==="pointerover",_=t==="mouseout"||t==="pointerout",v&&n!==Ic&&(C=n.relatedTarget||n.fromElement)&&(Sr(C)||C[Sn]))break e;if((_||v)&&(v=p.window===p?p:(v=p.ownerDocument)?v.defaultView||v.parentWindow:window,_?(C=n.relatedTarget||n.toElement,_=h,C=C?Sr(C):null,C!==null&&(O=Wr(C),C!==O||C.tag!==5&&C.tag!==6)&&(C=null)):(_=null,C=h),_!==C)){if(P=Pp,D="onMouseLeave",S="onMouseEnter",T="mouse",(t==="pointerout"||t==="pointerover")&&(P=bp,D="onPointerLeave",S="onPointerEnter",T="pointer"),O=_==null?v:os(_),k=C==null?v:os(C),v=new P(D,T+"leave",_,n,p),v.target=O,v.relatedTarget=k,D=null,Sr(p)===h&&(P=new P(S,T+"enter",C,n,p),P.target=k,P.relatedTarget=O,D=P),O=D,_&&C)t:{for(P=_,S=C,T=0,k=P;k;k=Jr(k))T++;for(k=0,D=S;D;D=Jr(D))k++;for(;0<T-k;)P=Jr(P),T--;for(;0<k-T;)S=Jr(S),k--;for(;T--;){if(P===S||S!==null&&P===S.alternate)break t;P=Jr(P),S=Jr(S)}P=null}else P=null;_!==null&&Bp(m,v,_,P,!1),C!==null&&O!==null&&Bp(m,O,C,P,!0)}}e:{if(v=h?os(h):window,_=v.nodeName&&v.nodeName.toLowerCase(),_==="select"||_==="input"&&v.type==="file")var F=g1;else if(Vp(v))if(Ly)F=w1;else{F=v1;var U=y1}else(_=v.nodeName)&&_.toLowerCase()==="input"&&(v.type==="checkbox"||v.type==="radio")&&(F=_1);if(F&&(F=F(t,h))){Vy(m,F,n,p);break e}U&&U(t,v,h),t==="focusout"&&(U=v._wrapperState)&&U.controlled&&v.type==="number"&&vc(v,"number",v.value)}switch(U=h?os(h):window,t){case"focusin":(Vp(U)||U.contentEditable==="true")&&(ss=U,Pc=h,Ni=null);break;case"focusout":Ni=Pc=ss=null;break;case"mousedown":Nc=!0;break;case"contextmenu":case"mouseup":case"dragend":Nc=!1,Up(m,n,p);break;case"selectionchange":if(I1)break;case"keydown":case"keyup":Up(m,n,p)}var E;if(qh)e:{switch(t){case"compositionstart":var y="onCompositionStart";break e;case"compositionend":y="onCompositionEnd";break e;case"compositionupdate":y="onCompositionUpdate";break e}y=void 0}else rs?Dy(t,n)&&(y="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(y="onCompositionStart");y&&(by&&n.locale!=="ko"&&(rs||y!=="onCompositionStart"?y==="onCompositionEnd"&&rs&&(E=Ny()):(Yn=p,Bh="value"in Yn?Yn.value:Yn.textContent,rs=!0)),U=Ka(h,y),0<U.length&&(y=new Np(y,t,null,n,p),m.push({event:y,listeners:U}),E?y.data=E:(E=Oy(n),E!==null&&(y.data=E)))),(E=h1?d1(t,n):f1(t,n))&&(h=Ka(h,"onBeforeInput"),0<h.length&&(p=new Np("onBeforeInput","beforeinput",null,n,p),m.push({event:p,listeners:h}),p.data=E))}qy(m,e)})}function Yi(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Ka(t,e){for(var n=e+"Capture",r=[];t!==null;){var s=t,i=s.stateNode;s.tag===5&&i!==null&&(s=i,i=Bi(t,n),i!=null&&r.unshift(Yi(t,i,s)),i=Bi(t,e),i!=null&&r.push(Yi(t,i,s))),t=t.return}return r}function Jr(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Bp(t,e,n,r,s){for(var i=e._reactName,o=[];n!==null&&n!==r;){var l=n,u=l.alternate,h=l.stateNode;if(u!==null&&u===r)break;l.tag===5&&h!==null&&(l=h,s?(u=Bi(n,i),u!=null&&o.unshift(Yi(n,u,l))):s||(u=Bi(n,i),u!=null&&o.push(Yi(n,u,l)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var A1=/\r\n?/g,C1=/\u0000|\uFFFD/g;function Wp(t){return(typeof t=="string"?t:""+t).replace(A1,`
`).replace(C1,"")}function oa(t,e,n){if(e=Wp(e),Wp(t)!==e&&n)throw Error(j(425))}function Ga(){}var bc=null,Dc=null;function Oc(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Vc=typeof setTimeout=="function"?setTimeout:void 0,R1=typeof clearTimeout=="function"?clearTimeout:void 0,Hp=typeof Promise=="function"?Promise:void 0,P1=typeof queueMicrotask=="function"?queueMicrotask:typeof Hp<"u"?function(t){return Hp.resolve(null).then(t).catch(N1)}:Vc;function N1(t){setTimeout(function(){throw t})}function $u(t,e){var n=e,r=0;do{var s=n.nextSibling;if(t.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"){if(r===0){t.removeChild(s),qi(e);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=s}while(n);qi(e)}function nr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function qp(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var $s=Math.random().toString(36).slice(2),tn="__reactFiber$"+$s,Ji="__reactProps$"+$s,Sn="__reactContainer$"+$s,Lc="__reactEvents$"+$s,b1="__reactListeners$"+$s,D1="__reactHandles$"+$s;function Sr(t){var e=t[tn];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Sn]||n[tn]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=qp(t);t!==null;){if(n=t[tn])return n;t=qp(t)}return e}t=n,n=t.parentNode}return null}function _o(t){return t=t[tn]||t[Sn],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function os(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(j(33))}function Dl(t){return t[Ji]||null}var Mc=[],as=-1;function gr(t){return{current:t}}function Ae(t){0>as||(t.current=Mc[as],Mc[as]=null,as--)}function xe(t,e){as++,Mc[as]=t.current,t.current=e}var hr={},dt=gr(hr),It=gr(!1),Dr=hr;function ks(t,e){var n=t.type.contextTypes;if(!n)return hr;var r=t.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===e)return r.__reactInternalMemoizedMaskedChildContext;var s={},i;for(i in n)s[i]=e[i];return r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=s),s}function xt(t){return t=t.childContextTypes,t!=null}function Qa(){Ae(It),Ae(dt)}function Kp(t,e,n){if(dt.current!==hr)throw Error(j(168));xe(dt,e),xe(It,n)}function Gy(t,e,n){var r=t.stateNode;if(e=e.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var s in r)if(!(s in e))throw Error(j(108,yE(t)||"Unknown",s));return be({},n,r)}function Ya(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||hr,Dr=dt.current,xe(dt,t),xe(It,It.current),!0}function Gp(t,e,n){var r=t.stateNode;if(!r)throw Error(j(169));n?(t=Gy(t,e,Dr),r.__reactInternalMemoizedMergedChildContext=t,Ae(It),Ae(dt),xe(dt,t)):Ae(It),xe(It,n)}var mn=null,Ol=!1,Bu=!1;function Qy(t){mn===null?mn=[t]:mn.push(t)}function O1(t){Ol=!0,Qy(t)}function yr(){if(!Bu&&mn!==null){Bu=!0;var t=0,e=Ee;try{var n=mn;for(Ee=1;t<n.length;t++){var r=n[t];do r=r(!0);while(r!==null)}mn=null,Ol=!1}catch(s){throw mn!==null&&(mn=mn.slice(t+1)),wy(Fh,yr),s}finally{Ee=e,Bu=!1}}return null}var ls=[],us=0,Ja=null,Xa=0,Ot=[],Vt=0,Or=null,gn=1,yn="";function Tr(t,e){ls[us++]=Xa,ls[us++]=Ja,Ja=t,Xa=e}function Yy(t,e,n){Ot[Vt++]=gn,Ot[Vt++]=yn,Ot[Vt++]=Or,Or=t;var r=gn;t=yn;var s=32-Yt(r)-1;r&=~(1<<s),n+=1;var i=32-Yt(e)+s;if(30<i){var o=s-s%5;i=(r&(1<<o)-1).toString(32),r>>=o,s-=o,gn=1<<32-Yt(e)+s|n<<s|r,yn=i+t}else gn=1<<i|n<<s|r,yn=t}function Gh(t){t.return!==null&&(Tr(t,1),Yy(t,1,0))}function Qh(t){for(;t===Ja;)Ja=ls[--us],ls[us]=null,Xa=ls[--us],ls[us]=null;for(;t===Or;)Or=Ot[--Vt],Ot[Vt]=null,yn=Ot[--Vt],Ot[Vt]=null,gn=Ot[--Vt],Ot[Vt]=null}var Pt=null,Rt=null,Ce=!1,Gt=null;function Jy(t,e){var n=Mt(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function Qp(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,Pt=t,Rt=nr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,Pt=t,Rt=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Or!==null?{id:gn,overflow:yn}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Mt(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,Pt=t,Rt=null,!0):!1;default:return!1}}function jc(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Fc(t){if(Ce){var e=Rt;if(e){var n=e;if(!Qp(t,e)){if(jc(t))throw Error(j(418));e=nr(n.nextSibling);var r=Pt;e&&Qp(t,e)?Jy(r,n):(t.flags=t.flags&-4097|2,Ce=!1,Pt=t)}}else{if(jc(t))throw Error(j(418));t.flags=t.flags&-4097|2,Ce=!1,Pt=t}}}function Yp(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Pt=t}function aa(t){if(t!==Pt)return!1;if(!Ce)return Yp(t),Ce=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Oc(t.type,t.memoizedProps)),e&&(e=Rt)){if(jc(t))throw Xy(),Error(j(418));for(;e;)Jy(t,e),e=nr(e.nextSibling)}if(Yp(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(j(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){Rt=nr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}Rt=null}}else Rt=Pt?nr(t.stateNode.nextSibling):null;return!0}function Xy(){for(var t=Rt;t;)t=nr(t.nextSibling)}function As(){Rt=Pt=null,Ce=!1}function Yh(t){Gt===null?Gt=[t]:Gt.push(t)}var V1=On.ReactCurrentBatchConfig;function mi(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(j(309));var r=n.stateNode}if(!r)throw Error(j(147,t));var s=r,i=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===i?e.ref:(e=function(o){var l=s.refs;o===null?delete l[i]:l[i]=o},e._stringRef=i,e)}if(typeof t!="string")throw Error(j(284));if(!n._owner)throw Error(j(290,t))}return t}function la(t,e){throw t=Object.prototype.toString.call(e),Error(j(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Jp(t){var e=t._init;return e(t._payload)}function Zy(t){function e(S,T){if(t){var k=S.deletions;k===null?(S.deletions=[T],S.flags|=16):k.push(T)}}function n(S,T){if(!t)return null;for(;T!==null;)e(S,T),T=T.sibling;return null}function r(S,T){for(S=new Map;T!==null;)T.key!==null?S.set(T.key,T):S.set(T.index,T),T=T.sibling;return S}function s(S,T){return S=or(S,T),S.index=0,S.sibling=null,S}function i(S,T,k){return S.index=k,t?(k=S.alternate,k!==null?(k=k.index,k<T?(S.flags|=2,T):k):(S.flags|=2,T)):(S.flags|=1048576,T)}function o(S){return t&&S.alternate===null&&(S.flags|=2),S}function l(S,T,k,D){return T===null||T.tag!==6?(T=Yu(k,S.mode,D),T.return=S,T):(T=s(T,k),T.return=S,T)}function u(S,T,k,D){var F=k.type;return F===ns?p(S,T,k.props.children,D,k.key):T!==null&&(T.elementType===F||typeof F=="object"&&F!==null&&F.$$typeof===$n&&Jp(F)===T.type)?(D=s(T,k.props),D.ref=mi(S,T,k),D.return=S,D):(D=Pa(k.type,k.key,k.props,null,S.mode,D),D.ref=mi(S,T,k),D.return=S,D)}function h(S,T,k,D){return T===null||T.tag!==4||T.stateNode.containerInfo!==k.containerInfo||T.stateNode.implementation!==k.implementation?(T=Ju(k,S.mode,D),T.return=S,T):(T=s(T,k.children||[]),T.return=S,T)}function p(S,T,k,D,F){return T===null||T.tag!==7?(T=Pr(k,S.mode,D,F),T.return=S,T):(T=s(T,k),T.return=S,T)}function m(S,T,k){if(typeof T=="string"&&T!==""||typeof T=="number")return T=Yu(""+T,S.mode,k),T.return=S,T;if(typeof T=="object"&&T!==null){switch(T.$$typeof){case Jo:return k=Pa(T.type,T.key,T.props,null,S.mode,k),k.ref=mi(S,null,T),k.return=S,k;case ts:return T=Ju(T,S.mode,k),T.return=S,T;case $n:var D=T._init;return m(S,D(T._payload),k)}if(wi(T)||ci(T))return T=Pr(T,S.mode,k,null),T.return=S,T;la(S,T)}return null}function v(S,T,k,D){var F=T!==null?T.key:null;if(typeof k=="string"&&k!==""||typeof k=="number")return F!==null?null:l(S,T,""+k,D);if(typeof k=="object"&&k!==null){switch(k.$$typeof){case Jo:return k.key===F?u(S,T,k,D):null;case ts:return k.key===F?h(S,T,k,D):null;case $n:return F=k._init,v(S,T,F(k._payload),D)}if(wi(k)||ci(k))return F!==null?null:p(S,T,k,D,null);la(S,k)}return null}function _(S,T,k,D,F){if(typeof D=="string"&&D!==""||typeof D=="number")return S=S.get(k)||null,l(T,S,""+D,F);if(typeof D=="object"&&D!==null){switch(D.$$typeof){case Jo:return S=S.get(D.key===null?k:D.key)||null,u(T,S,D,F);case ts:return S=S.get(D.key===null?k:D.key)||null,h(T,S,D,F);case $n:var U=D._init;return _(S,T,k,U(D._payload),F)}if(wi(D)||ci(D))return S=S.get(k)||null,p(T,S,D,F,null);la(T,D)}return null}function C(S,T,k,D){for(var F=null,U=null,E=T,y=T=0,w=null;E!==null&&y<k.length;y++){E.index>y?(w=E,E=null):w=E.sibling;var x=v(S,E,k[y],D);if(x===null){E===null&&(E=w);break}t&&E&&x.alternate===null&&e(S,E),T=i(x,T,y),U===null?F=x:U.sibling=x,U=x,E=w}if(y===k.length)return n(S,E),Ce&&Tr(S,y),F;if(E===null){for(;y<k.length;y++)E=m(S,k[y],D),E!==null&&(T=i(E,T,y),U===null?F=E:U.sibling=E,U=E);return Ce&&Tr(S,y),F}for(E=r(S,E);y<k.length;y++)w=_(E,S,y,k[y],D),w!==null&&(t&&w.alternate!==null&&E.delete(w.key===null?y:w.key),T=i(w,T,y),U===null?F=w:U.sibling=w,U=w);return t&&E.forEach(function(A){return e(S,A)}),Ce&&Tr(S,y),F}function P(S,T,k,D){var F=ci(k);if(typeof F!="function")throw Error(j(150));if(k=F.call(k),k==null)throw Error(j(151));for(var U=F=null,E=T,y=T=0,w=null,x=k.next();E!==null&&!x.done;y++,x=k.next()){E.index>y?(w=E,E=null):w=E.sibling;var A=v(S,E,x.value,D);if(A===null){E===null&&(E=w);break}t&&E&&A.alternate===null&&e(S,E),T=i(A,T,y),U===null?F=A:U.sibling=A,U=A,E=w}if(x.done)return n(S,E),Ce&&Tr(S,y),F;if(E===null){for(;!x.done;y++,x=k.next())x=m(S,x.value,D),x!==null&&(T=i(x,T,y),U===null?F=x:U.sibling=x,U=x);return Ce&&Tr(S,y),F}for(E=r(S,E);!x.done;y++,x=k.next())x=_(E,S,y,x.value,D),x!==null&&(t&&x.alternate!==null&&E.delete(x.key===null?y:x.key),T=i(x,T,y),U===null?F=x:U.sibling=x,U=x);return t&&E.forEach(function(R){return e(S,R)}),Ce&&Tr(S,y),F}function O(S,T,k,D){if(typeof k=="object"&&k!==null&&k.type===ns&&k.key===null&&(k=k.props.children),typeof k=="object"&&k!==null){switch(k.$$typeof){case Jo:e:{for(var F=k.key,U=T;U!==null;){if(U.key===F){if(F=k.type,F===ns){if(U.tag===7){n(S,U.sibling),T=s(U,k.props.children),T.return=S,S=T;break e}}else if(U.elementType===F||typeof F=="object"&&F!==null&&F.$$typeof===$n&&Jp(F)===U.type){n(S,U.sibling),T=s(U,k.props),T.ref=mi(S,U,k),T.return=S,S=T;break e}n(S,U);break}else e(S,U);U=U.sibling}k.type===ns?(T=Pr(k.props.children,S.mode,D,k.key),T.return=S,S=T):(D=Pa(k.type,k.key,k.props,null,S.mode,D),D.ref=mi(S,T,k),D.return=S,S=D)}return o(S);case ts:e:{for(U=k.key;T!==null;){if(T.key===U)if(T.tag===4&&T.stateNode.containerInfo===k.containerInfo&&T.stateNode.implementation===k.implementation){n(S,T.sibling),T=s(T,k.children||[]),T.return=S,S=T;break e}else{n(S,T);break}else e(S,T);T=T.sibling}T=Ju(k,S.mode,D),T.return=S,S=T}return o(S);case $n:return U=k._init,O(S,T,U(k._payload),D)}if(wi(k))return C(S,T,k,D);if(ci(k))return P(S,T,k,D);la(S,k)}return typeof k=="string"&&k!==""||typeof k=="number"?(k=""+k,T!==null&&T.tag===6?(n(S,T.sibling),T=s(T,k),T.return=S,S=T):(n(S,T),T=Yu(k,S.mode,D),T.return=S,S=T),o(S)):n(S,T)}return O}var Cs=Zy(!0),ev=Zy(!1),Za=gr(null),el=null,cs=null,Jh=null;function Xh(){Jh=cs=el=null}function Zh(t){var e=Za.current;Ae(Za),t._currentValue=e}function Uc(t,e,n){for(;t!==null;){var r=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,r!==null&&(r.childLanes|=e)):r!==null&&(r.childLanes&e)!==e&&(r.childLanes|=e),t===n)break;t=t.return}}function vs(t,e){el=t,Jh=cs=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(Tt=!0),t.firstContext=null)}function Ut(t){var e=t._currentValue;if(Jh!==t)if(t={context:t,memoizedValue:e,next:null},cs===null){if(el===null)throw Error(j(308));cs=t,el.dependencies={lanes:0,firstContext:t}}else cs=cs.next=t;return e}var kr=null;function ed(t){kr===null?kr=[t]:kr.push(t)}function tv(t,e,n,r){var s=e.interleaved;return s===null?(n.next=n,ed(e)):(n.next=s.next,s.next=n),e.interleaved=n,kn(t,r)}function kn(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var Bn=!1;function td(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function nv(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function En(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function rr(t,e,n){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,ge&2){var s=r.pending;return s===null?e.next=e:(e.next=s.next,s.next=e),r.pending=e,kn(t,n)}return s=r.interleaved,s===null?(e.next=e,ed(r)):(e.next=s.next,s.next=e),r.interleaved=e,kn(t,n)}function xa(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,Uh(t,n)}}function Xp(t,e){var n=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var s=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?s=i=o:i=i.next=o,n=n.next}while(n!==null);i===null?s=i=e:i=i.next=e}else s=i=e;n={baseState:r.baseState,firstBaseUpdate:s,lastBaseUpdate:i,shared:r.shared,effects:r.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function tl(t,e,n,r){var s=t.updateQueue;Bn=!1;var i=s.firstBaseUpdate,o=s.lastBaseUpdate,l=s.shared.pending;if(l!==null){s.shared.pending=null;var u=l,h=u.next;u.next=null,o===null?i=h:o.next=h,o=u;var p=t.alternate;p!==null&&(p=p.updateQueue,l=p.lastBaseUpdate,l!==o&&(l===null?p.firstBaseUpdate=h:l.next=h,p.lastBaseUpdate=u))}if(i!==null){var m=s.baseState;o=0,p=h=u=null,l=i;do{var v=l.lane,_=l.eventTime;if((r&v)===v){p!==null&&(p=p.next={eventTime:_,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var C=t,P=l;switch(v=e,_=n,P.tag){case 1:if(C=P.payload,typeof C=="function"){m=C.call(_,m,v);break e}m=C;break e;case 3:C.flags=C.flags&-65537|128;case 0:if(C=P.payload,v=typeof C=="function"?C.call(_,m,v):C,v==null)break e;m=be({},m,v);break e;case 2:Bn=!0}}l.callback!==null&&l.lane!==0&&(t.flags|=64,v=s.effects,v===null?s.effects=[l]:v.push(l))}else _={eventTime:_,lane:v,tag:l.tag,payload:l.payload,callback:l.callback,next:null},p===null?(h=p=_,u=m):p=p.next=_,o|=v;if(l=l.next,l===null){if(l=s.shared.pending,l===null)break;v=l,l=v.next,v.next=null,s.lastBaseUpdate=v,s.shared.pending=null}}while(!0);if(p===null&&(u=m),s.baseState=u,s.firstBaseUpdate=h,s.lastBaseUpdate=p,e=s.shared.interleaved,e!==null){s=e;do o|=s.lane,s=s.next;while(s!==e)}else i===null&&(s.shared.lanes=0);Lr|=o,t.lanes=o,t.memoizedState=m}}function Zp(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var r=t[e],s=r.callback;if(s!==null){if(r.callback=null,r=n,typeof s!="function")throw Error(j(191,s));s.call(r)}}}var wo={},sn=gr(wo),Xi=gr(wo),Zi=gr(wo);function Ar(t){if(t===wo)throw Error(j(174));return t}function nd(t,e){switch(xe(Zi,e),xe(Xi,t),xe(sn,wo),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:wc(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=wc(e,t)}Ae(sn),xe(sn,e)}function Rs(){Ae(sn),Ae(Xi),Ae(Zi)}function rv(t){Ar(Zi.current);var e=Ar(sn.current),n=wc(e,t.type);e!==n&&(xe(Xi,t),xe(sn,n))}function rd(t){Xi.current===t&&(Ae(sn),Ae(Xi))}var Pe=gr(0);function nl(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Wu=[];function sd(){for(var t=0;t<Wu.length;t++)Wu[t]._workInProgressVersionPrimary=null;Wu.length=0}var Sa=On.ReactCurrentDispatcher,Hu=On.ReactCurrentBatchConfig,Vr=0,Ne=null,$e=null,Ke=null,rl=!1,bi=!1,eo=0,L1=0;function ot(){throw Error(j(321))}function id(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!Xt(t[n],e[n]))return!1;return!0}function od(t,e,n,r,s,i){if(Vr=i,Ne=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Sa.current=t===null||t.memoizedState===null?U1:z1,t=n(r,s),bi){i=0;do{if(bi=!1,eo=0,25<=i)throw Error(j(301));i+=1,Ke=$e=null,e.updateQueue=null,Sa.current=$1,t=n(r,s)}while(bi)}if(Sa.current=sl,e=$e!==null&&$e.next!==null,Vr=0,Ke=$e=Ne=null,rl=!1,e)throw Error(j(300));return t}function ad(){var t=eo!==0;return eo=0,t}function en(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ke===null?Ne.memoizedState=Ke=t:Ke=Ke.next=t,Ke}function zt(){if($e===null){var t=Ne.alternate;t=t!==null?t.memoizedState:null}else t=$e.next;var e=Ke===null?Ne.memoizedState:Ke.next;if(e!==null)Ke=e,$e=t;else{if(t===null)throw Error(j(310));$e=t,t={memoizedState:$e.memoizedState,baseState:$e.baseState,baseQueue:$e.baseQueue,queue:$e.queue,next:null},Ke===null?Ne.memoizedState=Ke=t:Ke=Ke.next=t}return Ke}function to(t,e){return typeof e=="function"?e(t):e}function qu(t){var e=zt(),n=e.queue;if(n===null)throw Error(j(311));n.lastRenderedReducer=t;var r=$e,s=r.baseQueue,i=n.pending;if(i!==null){if(s!==null){var o=s.next;s.next=i.next,i.next=o}r.baseQueue=s=i,n.pending=null}if(s!==null){i=s.next,r=r.baseState;var l=o=null,u=null,h=i;do{var p=h.lane;if((Vr&p)===p)u!==null&&(u=u.next={lane:0,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null}),r=h.hasEagerState?h.eagerState:t(r,h.action);else{var m={lane:p,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null};u===null?(l=u=m,o=r):u=u.next=m,Ne.lanes|=p,Lr|=p}h=h.next}while(h!==null&&h!==i);u===null?o=r:u.next=l,Xt(r,e.memoizedState)||(Tt=!0),e.memoizedState=r,e.baseState=o,e.baseQueue=u,n.lastRenderedState=r}if(t=n.interleaved,t!==null){s=t;do i=s.lane,Ne.lanes|=i,Lr|=i,s=s.next;while(s!==t)}else s===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Ku(t){var e=zt(),n=e.queue;if(n===null)throw Error(j(311));n.lastRenderedReducer=t;var r=n.dispatch,s=n.pending,i=e.memoizedState;if(s!==null){n.pending=null;var o=s=s.next;do i=t(i,o.action),o=o.next;while(o!==s);Xt(i,e.memoizedState)||(Tt=!0),e.memoizedState=i,e.baseQueue===null&&(e.baseState=i),n.lastRenderedState=i}return[i,r]}function sv(){}function iv(t,e){var n=Ne,r=zt(),s=e(),i=!Xt(r.memoizedState,s);if(i&&(r.memoizedState=s,Tt=!0),r=r.queue,ld(lv.bind(null,n,r,t),[t]),r.getSnapshot!==e||i||Ke!==null&&Ke.memoizedState.tag&1){if(n.flags|=2048,no(9,av.bind(null,n,r,s,e),void 0,null),Ge===null)throw Error(j(349));Vr&30||ov(n,e,s)}return s}function ov(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=Ne.updateQueue,e===null?(e={lastEffect:null,stores:null},Ne.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function av(t,e,n,r){e.value=n,e.getSnapshot=r,uv(e)&&cv(t)}function lv(t,e,n){return n(function(){uv(e)&&cv(t)})}function uv(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Xt(t,n)}catch{return!0}}function cv(t){var e=kn(t,1);e!==null&&Jt(e,t,1,-1)}function em(t){var e=en();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:to,lastRenderedState:t},e.queue=t,t=t.dispatch=F1.bind(null,Ne,t),[e.memoizedState,t]}function no(t,e,n,r){return t={tag:t,create:e,destroy:n,deps:r,next:null},e=Ne.updateQueue,e===null?(e={lastEffect:null,stores:null},Ne.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(r=n.next,n.next=t,t.next=r,e.lastEffect=t)),t}function hv(){return zt().memoizedState}function ka(t,e,n,r){var s=en();Ne.flags|=t,s.memoizedState=no(1|e,n,void 0,r===void 0?null:r)}function Vl(t,e,n,r){var s=zt();r=r===void 0?null:r;var i=void 0;if($e!==null){var o=$e.memoizedState;if(i=o.destroy,r!==null&&id(r,o.deps)){s.memoizedState=no(e,n,i,r);return}}Ne.flags|=t,s.memoizedState=no(1|e,n,i,r)}function tm(t,e){return ka(8390656,8,t,e)}function ld(t,e){return Vl(2048,8,t,e)}function dv(t,e){return Vl(4,2,t,e)}function fv(t,e){return Vl(4,4,t,e)}function pv(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function mv(t,e,n){return n=n!=null?n.concat([t]):null,Vl(4,4,pv.bind(null,e,t),n)}function ud(){}function gv(t,e){var n=zt();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&id(e,r[1])?r[0]:(n.memoizedState=[t,e],t)}function yv(t,e){var n=zt();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&id(e,r[1])?r[0]:(t=t(),n.memoizedState=[t,e],t)}function vv(t,e,n){return Vr&21?(Xt(n,e)||(n=Iy(),Ne.lanes|=n,Lr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,Tt=!0),t.memoizedState=n)}function M1(t,e){var n=Ee;Ee=n!==0&&4>n?n:4,t(!0);var r=Hu.transition;Hu.transition={};try{t(!1),e()}finally{Ee=n,Hu.transition=r}}function _v(){return zt().memoizedState}function j1(t,e,n){var r=ir(t);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},wv(t))Ev(e,n);else if(n=tv(t,e,n,r),n!==null){var s=yt();Jt(n,t,r,s),Tv(n,e,r)}}function F1(t,e,n){var r=ir(t),s={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(wv(t))Ev(e,s);else{var i=t.alternate;if(t.lanes===0&&(i===null||i.lanes===0)&&(i=e.lastRenderedReducer,i!==null))try{var o=e.lastRenderedState,l=i(o,n);if(s.hasEagerState=!0,s.eagerState=l,Xt(l,o)){var u=e.interleaved;u===null?(s.next=s,ed(e)):(s.next=u.next,u.next=s),e.interleaved=s;return}}catch{}finally{}n=tv(t,e,s,r),n!==null&&(s=yt(),Jt(n,t,r,s),Tv(n,e,r))}}function wv(t){var e=t.alternate;return t===Ne||e!==null&&e===Ne}function Ev(t,e){bi=rl=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function Tv(t,e,n){if(n&4194240){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,Uh(t,n)}}var sl={readContext:Ut,useCallback:ot,useContext:ot,useEffect:ot,useImperativeHandle:ot,useInsertionEffect:ot,useLayoutEffect:ot,useMemo:ot,useReducer:ot,useRef:ot,useState:ot,useDebugValue:ot,useDeferredValue:ot,useTransition:ot,useMutableSource:ot,useSyncExternalStore:ot,useId:ot,unstable_isNewReconciler:!1},U1={readContext:Ut,useCallback:function(t,e){return en().memoizedState=[t,e===void 0?null:e],t},useContext:Ut,useEffect:tm,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,ka(4194308,4,pv.bind(null,e,t),n)},useLayoutEffect:function(t,e){return ka(4194308,4,t,e)},useInsertionEffect:function(t,e){return ka(4,2,t,e)},useMemo:function(t,e){var n=en();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var r=en();return e=n!==void 0?n(e):e,r.memoizedState=r.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},r.queue=t,t=t.dispatch=j1.bind(null,Ne,t),[r.memoizedState,t]},useRef:function(t){var e=en();return t={current:t},e.memoizedState=t},useState:em,useDebugValue:ud,useDeferredValue:function(t){return en().memoizedState=t},useTransition:function(){var t=em(!1),e=t[0];return t=M1.bind(null,t[1]),en().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var r=Ne,s=en();if(Ce){if(n===void 0)throw Error(j(407));n=n()}else{if(n=e(),Ge===null)throw Error(j(349));Vr&30||ov(r,e,n)}s.memoizedState=n;var i={value:n,getSnapshot:e};return s.queue=i,tm(lv.bind(null,r,i,t),[t]),r.flags|=2048,no(9,av.bind(null,r,i,n,e),void 0,null),n},useId:function(){var t=en(),e=Ge.identifierPrefix;if(Ce){var n=yn,r=gn;n=(r&~(1<<32-Yt(r)-1)).toString(32)+n,e=":"+e+"R"+n,n=eo++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=L1++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},z1={readContext:Ut,useCallback:gv,useContext:Ut,useEffect:ld,useImperativeHandle:mv,useInsertionEffect:dv,useLayoutEffect:fv,useMemo:yv,useReducer:qu,useRef:hv,useState:function(){return qu(to)},useDebugValue:ud,useDeferredValue:function(t){var e=zt();return vv(e,$e.memoizedState,t)},useTransition:function(){var t=qu(to)[0],e=zt().memoizedState;return[t,e]},useMutableSource:sv,useSyncExternalStore:iv,useId:_v,unstable_isNewReconciler:!1},$1={readContext:Ut,useCallback:gv,useContext:Ut,useEffect:ld,useImperativeHandle:mv,useInsertionEffect:dv,useLayoutEffect:fv,useMemo:yv,useReducer:Ku,useRef:hv,useState:function(){return Ku(to)},useDebugValue:ud,useDeferredValue:function(t){var e=zt();return $e===null?e.memoizedState=t:vv(e,$e.memoizedState,t)},useTransition:function(){var t=Ku(to)[0],e=zt().memoizedState;return[t,e]},useMutableSource:sv,useSyncExternalStore:iv,useId:_v,unstable_isNewReconciler:!1};function qt(t,e){if(t&&t.defaultProps){e=be({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function zc(t,e,n,r){e=t.memoizedState,n=n(r,e),n=n==null?e:be({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Ll={isMounted:function(t){return(t=t._reactInternals)?Wr(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var r=yt(),s=ir(t),i=En(r,s);i.payload=e,n!=null&&(i.callback=n),e=rr(t,i,s),e!==null&&(Jt(e,t,s,r),xa(e,t,s))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var r=yt(),s=ir(t),i=En(r,s);i.tag=1,i.payload=e,n!=null&&(i.callback=n),e=rr(t,i,s),e!==null&&(Jt(e,t,s,r),xa(e,t,s))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=yt(),r=ir(t),s=En(n,r);s.tag=2,e!=null&&(s.callback=e),e=rr(t,s,r),e!==null&&(Jt(e,t,r,n),xa(e,t,r))}};function nm(t,e,n,r,s,i,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,i,o):e.prototype&&e.prototype.isPureReactComponent?!Gi(n,r)||!Gi(s,i):!0}function Iv(t,e,n){var r=!1,s=hr,i=e.contextType;return typeof i=="object"&&i!==null?i=Ut(i):(s=xt(e)?Dr:dt.current,r=e.contextTypes,i=(r=r!=null)?ks(t,s):hr),e=new e(n,i),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Ll,t.stateNode=e,e._reactInternals=t,r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=s,t.__reactInternalMemoizedMaskedChildContext=i),e}function rm(t,e,n,r){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,r),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,r),e.state!==t&&Ll.enqueueReplaceState(e,e.state,null)}function $c(t,e,n,r){var s=t.stateNode;s.props=n,s.state=t.memoizedState,s.refs={},td(t);var i=e.contextType;typeof i=="object"&&i!==null?s.context=Ut(i):(i=xt(e)?Dr:dt.current,s.context=ks(t,i)),s.state=t.memoizedState,i=e.getDerivedStateFromProps,typeof i=="function"&&(zc(t,e,i,n),s.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(e=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),e!==s.state&&Ll.enqueueReplaceState(s,s.state,null),tl(t,n,s,r),s.state=t.memoizedState),typeof s.componentDidMount=="function"&&(t.flags|=4194308)}function Ps(t,e){try{var n="",r=e;do n+=gE(r),r=r.return;while(r);var s=n}catch(i){s=`
Error generating stack: `+i.message+`
`+i.stack}return{value:t,source:e,stack:s,digest:null}}function Gu(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function Bc(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var B1=typeof WeakMap=="function"?WeakMap:Map;function xv(t,e,n){n=En(-1,n),n.tag=3,n.payload={element:null};var r=e.value;return n.callback=function(){ol||(ol=!0,Zc=r),Bc(t,e)},n}function Sv(t,e,n){n=En(-1,n),n.tag=3;var r=t.type.getDerivedStateFromError;if(typeof r=="function"){var s=e.value;n.payload=function(){return r(s)},n.callback=function(){Bc(t,e)}}var i=t.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){Bc(t,e),typeof r!="function"&&(sr===null?sr=new Set([this]):sr.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function sm(t,e,n){var r=t.pingCache;if(r===null){r=t.pingCache=new B1;var s=new Set;r.set(e,s)}else s=r.get(e),s===void 0&&(s=new Set,r.set(e,s));s.has(n)||(s.add(n),t=rT.bind(null,t,e,n),e.then(t,t))}function im(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function om(t,e,n,r,s){return t.mode&1?(t.flags|=65536,t.lanes=s,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=En(-1,1),e.tag=2,rr(n,e,1))),n.lanes|=1),t)}var W1=On.ReactCurrentOwner,Tt=!1;function gt(t,e,n,r){e.child=t===null?ev(e,null,n,r):Cs(e,t.child,n,r)}function am(t,e,n,r,s){n=n.render;var i=e.ref;return vs(e,s),r=od(t,e,n,r,i,s),n=ad(),t!==null&&!Tt?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~s,An(t,e,s)):(Ce&&n&&Gh(e),e.flags|=1,gt(t,e,r,s),e.child)}function lm(t,e,n,r,s){if(t===null){var i=n.type;return typeof i=="function"&&!yd(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=i,kv(t,e,i,r,s)):(t=Pa(n.type,null,r,e,e.mode,s),t.ref=e.ref,t.return=e,e.child=t)}if(i=t.child,!(t.lanes&s)){var o=i.memoizedProps;if(n=n.compare,n=n!==null?n:Gi,n(o,r)&&t.ref===e.ref)return An(t,e,s)}return e.flags|=1,t=or(i,r),t.ref=e.ref,t.return=e,e.child=t}function kv(t,e,n,r,s){if(t!==null){var i=t.memoizedProps;if(Gi(i,r)&&t.ref===e.ref)if(Tt=!1,e.pendingProps=r=i,(t.lanes&s)!==0)t.flags&131072&&(Tt=!0);else return e.lanes=t.lanes,An(t,e,s)}return Wc(t,e,n,r,s)}function Av(t,e,n){var r=e.pendingProps,s=r.children,i=t!==null?t.memoizedState:null;if(r.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},xe(ds,Ct),Ct|=n;else{if(!(n&1073741824))return t=i!==null?i.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,xe(ds,Ct),Ct|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,xe(ds,Ct),Ct|=r}else i!==null?(r=i.baseLanes|n,e.memoizedState=null):r=n,xe(ds,Ct),Ct|=r;return gt(t,e,s,n),e.child}function Cv(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function Wc(t,e,n,r,s){var i=xt(n)?Dr:dt.current;return i=ks(e,i),vs(e,s),n=od(t,e,n,r,i,s),r=ad(),t!==null&&!Tt?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~s,An(t,e,s)):(Ce&&r&&Gh(e),e.flags|=1,gt(t,e,n,s),e.child)}function um(t,e,n,r,s){if(xt(n)){var i=!0;Ya(e)}else i=!1;if(vs(e,s),e.stateNode===null)Aa(t,e),Iv(e,n,r),$c(e,n,r,s),r=!0;else if(t===null){var o=e.stateNode,l=e.memoizedProps;o.props=l;var u=o.context,h=n.contextType;typeof h=="object"&&h!==null?h=Ut(h):(h=xt(n)?Dr:dt.current,h=ks(e,h));var p=n.getDerivedStateFromProps,m=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function";m||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==r||u!==h)&&rm(e,o,r,h),Bn=!1;var v=e.memoizedState;o.state=v,tl(e,r,o,s),u=e.memoizedState,l!==r||v!==u||It.current||Bn?(typeof p=="function"&&(zc(e,n,p,r),u=e.memoizedState),(l=Bn||nm(e,n,l,r,v,u,h))?(m||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=u),o.props=r,o.state=u,o.context=h,r=l):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),r=!1)}else{o=e.stateNode,nv(t,e),l=e.memoizedProps,h=e.type===e.elementType?l:qt(e.type,l),o.props=h,m=e.pendingProps,v=o.context,u=n.contextType,typeof u=="object"&&u!==null?u=Ut(u):(u=xt(n)?Dr:dt.current,u=ks(e,u));var _=n.getDerivedStateFromProps;(p=typeof _=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==m||v!==u)&&rm(e,o,r,u),Bn=!1,v=e.memoizedState,o.state=v,tl(e,r,o,s);var C=e.memoizedState;l!==m||v!==C||It.current||Bn?(typeof _=="function"&&(zc(e,n,_,r),C=e.memoizedState),(h=Bn||nm(e,n,h,r,v,C,u)||!1)?(p||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,C,u),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,C,u)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&v===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&v===t.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=C),o.props=r,o.state=C,o.context=u,r=h):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&v===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&v===t.memoizedState||(e.flags|=1024),r=!1)}return Hc(t,e,n,r,i,s)}function Hc(t,e,n,r,s,i){Cv(t,e);var o=(e.flags&128)!==0;if(!r&&!o)return s&&Gp(e,n,!1),An(t,e,i);r=e.stateNode,W1.current=e;var l=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return e.flags|=1,t!==null&&o?(e.child=Cs(e,t.child,null,i),e.child=Cs(e,null,l,i)):gt(t,e,l,i),e.memoizedState=r.state,s&&Gp(e,n,!0),e.child}function Rv(t){var e=t.stateNode;e.pendingContext?Kp(t,e.pendingContext,e.pendingContext!==e.context):e.context&&Kp(t,e.context,!1),nd(t,e.containerInfo)}function cm(t,e,n,r,s){return As(),Yh(s),e.flags|=256,gt(t,e,n,r),e.child}var qc={dehydrated:null,treeContext:null,retryLane:0};function Kc(t){return{baseLanes:t,cachePool:null,transitions:null}}function Pv(t,e,n){var r=e.pendingProps,s=Pe.current,i=!1,o=(e.flags&128)!==0,l;if((l=o)||(l=t!==null&&t.memoizedState===null?!1:(s&2)!==0),l?(i=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(s|=1),xe(Pe,s&1),t===null)return Fc(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=r.children,t=r.fallback,i?(r=e.mode,i=e.child,o={mode:"hidden",children:o},!(r&1)&&i!==null?(i.childLanes=0,i.pendingProps=o):i=Fl(o,r,0,null),t=Pr(t,r,n,null),i.return=e,t.return=e,i.sibling=t,e.child=i,e.child.memoizedState=Kc(n),e.memoizedState=qc,t):cd(e,o));if(s=t.memoizedState,s!==null&&(l=s.dehydrated,l!==null))return H1(t,e,o,r,l,s,n);if(i){i=r.fallback,o=e.mode,s=t.child,l=s.sibling;var u={mode:"hidden",children:r.children};return!(o&1)&&e.child!==s?(r=e.child,r.childLanes=0,r.pendingProps=u,e.deletions=null):(r=or(s,u),r.subtreeFlags=s.subtreeFlags&14680064),l!==null?i=or(l,i):(i=Pr(i,o,n,null),i.flags|=2),i.return=e,r.return=e,r.sibling=i,e.child=r,r=i,i=e.child,o=t.child.memoizedState,o=o===null?Kc(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},i.memoizedState=o,i.childLanes=t.childLanes&~n,e.memoizedState=qc,r}return i=t.child,t=i.sibling,r=or(i,{mode:"visible",children:r.children}),!(e.mode&1)&&(r.lanes=n),r.return=e,r.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=r,e.memoizedState=null,r}function cd(t,e){return e=Fl({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function ua(t,e,n,r){return r!==null&&Yh(r),Cs(e,t.child,null,n),t=cd(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function H1(t,e,n,r,s,i,o){if(n)return e.flags&256?(e.flags&=-257,r=Gu(Error(j(422))),ua(t,e,o,r)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(i=r.fallback,s=e.mode,r=Fl({mode:"visible",children:r.children},s,0,null),i=Pr(i,s,o,null),i.flags|=2,r.return=e,i.return=e,r.sibling=i,e.child=r,e.mode&1&&Cs(e,t.child,null,o),e.child.memoizedState=Kc(o),e.memoizedState=qc,i);if(!(e.mode&1))return ua(t,e,o,null);if(s.data==="$!"){if(r=s.nextSibling&&s.nextSibling.dataset,r)var l=r.dgst;return r=l,i=Error(j(419)),r=Gu(i,r,void 0),ua(t,e,o,r)}if(l=(o&t.childLanes)!==0,Tt||l){if(r=Ge,r!==null){switch(o&-o){case 4:s=2;break;case 16:s=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:s=32;break;case 536870912:s=268435456;break;default:s=0}s=s&(r.suspendedLanes|o)?0:s,s!==0&&s!==i.retryLane&&(i.retryLane=s,kn(t,s),Jt(r,t,s,-1))}return gd(),r=Gu(Error(j(421))),ua(t,e,o,r)}return s.data==="$?"?(e.flags|=128,e.child=t.child,e=sT.bind(null,t),s._reactRetry=e,null):(t=i.treeContext,Rt=nr(s.nextSibling),Pt=e,Ce=!0,Gt=null,t!==null&&(Ot[Vt++]=gn,Ot[Vt++]=yn,Ot[Vt++]=Or,gn=t.id,yn=t.overflow,Or=e),e=cd(e,r.children),e.flags|=4096,e)}function hm(t,e,n){t.lanes|=e;var r=t.alternate;r!==null&&(r.lanes|=e),Uc(t.return,e,n)}function Qu(t,e,n,r,s){var i=t.memoizedState;i===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:s}:(i.isBackwards=e,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=s)}function Nv(t,e,n){var r=e.pendingProps,s=r.revealOrder,i=r.tail;if(gt(t,e,r.children,n),r=Pe.current,r&2)r=r&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&hm(t,n,e);else if(t.tag===19)hm(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}r&=1}if(xe(Pe,r),!(e.mode&1))e.memoizedState=null;else switch(s){case"forwards":for(n=e.child,s=null;n!==null;)t=n.alternate,t!==null&&nl(t)===null&&(s=n),n=n.sibling;n=s,n===null?(s=e.child,e.child=null):(s=n.sibling,n.sibling=null),Qu(e,!1,s,n,i);break;case"backwards":for(n=null,s=e.child,e.child=null;s!==null;){if(t=s.alternate,t!==null&&nl(t)===null){e.child=s;break}t=s.sibling,s.sibling=n,n=s,s=t}Qu(e,!0,n,null,i);break;case"together":Qu(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Aa(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function An(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Lr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(j(153));if(e.child!==null){for(t=e.child,n=or(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=or(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function q1(t,e,n){switch(e.tag){case 3:Rv(e),As();break;case 5:rv(e);break;case 1:xt(e.type)&&Ya(e);break;case 4:nd(e,e.stateNode.containerInfo);break;case 10:var r=e.type._context,s=e.memoizedProps.value;xe(Za,r._currentValue),r._currentValue=s;break;case 13:if(r=e.memoizedState,r!==null)return r.dehydrated!==null?(xe(Pe,Pe.current&1),e.flags|=128,null):n&e.child.childLanes?Pv(t,e,n):(xe(Pe,Pe.current&1),t=An(t,e,n),t!==null?t.sibling:null);xe(Pe,Pe.current&1);break;case 19:if(r=(n&e.childLanes)!==0,t.flags&128){if(r)return Nv(t,e,n);e.flags|=128}if(s=e.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),xe(Pe,Pe.current),r)break;return null;case 22:case 23:return e.lanes=0,Av(t,e,n)}return An(t,e,n)}var bv,Gc,Dv,Ov;bv=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Gc=function(){};Dv=function(t,e,n,r){var s=t.memoizedProps;if(s!==r){t=e.stateNode,Ar(sn.current);var i=null;switch(n){case"input":s=gc(t,s),r=gc(t,r),i=[];break;case"select":s=be({},s,{value:void 0}),r=be({},r,{value:void 0}),i=[];break;case"textarea":s=_c(t,s),r=_c(t,r),i=[];break;default:typeof s.onClick!="function"&&typeof r.onClick=="function"&&(t.onclick=Ga)}Ec(n,r);var o;n=null;for(h in s)if(!r.hasOwnProperty(h)&&s.hasOwnProperty(h)&&s[h]!=null)if(h==="style"){var l=s[h];for(o in l)l.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else h!=="dangerouslySetInnerHTML"&&h!=="children"&&h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&h!=="autoFocus"&&(zi.hasOwnProperty(h)?i||(i=[]):(i=i||[]).push(h,null));for(h in r){var u=r[h];if(l=s!=null?s[h]:void 0,r.hasOwnProperty(h)&&u!==l&&(u!=null||l!=null))if(h==="style")if(l){for(o in l)!l.hasOwnProperty(o)||u&&u.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in u)u.hasOwnProperty(o)&&l[o]!==u[o]&&(n||(n={}),n[o]=u[o])}else n||(i||(i=[]),i.push(h,n)),n=u;else h==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,l=l?l.__html:void 0,u!=null&&l!==u&&(i=i||[]).push(h,u)):h==="children"?typeof u!="string"&&typeof u!="number"||(i=i||[]).push(h,""+u):h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&(zi.hasOwnProperty(h)?(u!=null&&h==="onScroll"&&ke("scroll",t),i||l===u||(i=[])):(i=i||[]).push(h,u))}n&&(i=i||[]).push("style",n);var h=i;(e.updateQueue=h)&&(e.flags|=4)}};Ov=function(t,e,n,r){n!==r&&(e.flags|=4)};function gi(t,e){if(!Ce)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null}}function at(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,r=0;if(e)for(var s=t.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags&14680064,r|=s.flags&14680064,s.return=t,s=s.sibling;else for(s=t.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags,r|=s.flags,s.return=t,s=s.sibling;return t.subtreeFlags|=r,t.childLanes=n,e}function K1(t,e,n){var r=e.pendingProps;switch(Qh(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return at(e),null;case 1:return xt(e.type)&&Qa(),at(e),null;case 3:return r=e.stateNode,Rs(),Ae(It),Ae(dt),sd(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(t===null||t.child===null)&&(aa(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Gt!==null&&(nh(Gt),Gt=null))),Gc(t,e),at(e),null;case 5:rd(e);var s=Ar(Zi.current);if(n=e.type,t!==null&&e.stateNode!=null)Dv(t,e,n,r,s),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!r){if(e.stateNode===null)throw Error(j(166));return at(e),null}if(t=Ar(sn.current),aa(e)){r=e.stateNode,n=e.type;var i=e.memoizedProps;switch(r[tn]=e,r[Ji]=i,t=(e.mode&1)!==0,n){case"dialog":ke("cancel",r),ke("close",r);break;case"iframe":case"object":case"embed":ke("load",r);break;case"video":case"audio":for(s=0;s<Ti.length;s++)ke(Ti[s],r);break;case"source":ke("error",r);break;case"img":case"image":case"link":ke("error",r),ke("load",r);break;case"details":ke("toggle",r);break;case"input":wp(r,i),ke("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},ke("invalid",r);break;case"textarea":Tp(r,i),ke("invalid",r)}Ec(n,i),s=null;for(var o in i)if(i.hasOwnProperty(o)){var l=i[o];o==="children"?typeof l=="string"?r.textContent!==l&&(i.suppressHydrationWarning!==!0&&oa(r.textContent,l,t),s=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(i.suppressHydrationWarning!==!0&&oa(r.textContent,l,t),s=["children",""+l]):zi.hasOwnProperty(o)&&l!=null&&o==="onScroll"&&ke("scroll",r)}switch(n){case"input":Xo(r),Ep(r,i,!0);break;case"textarea":Xo(r),Ip(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=Ga)}r=s,e.updateQueue=r,r!==null&&(e.flags|=4)}else{o=s.nodeType===9?s:s.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=ly(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof r.is=="string"?t=o.createElement(n,{is:r.is}):(t=o.createElement(n),n==="select"&&(o=t,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):t=o.createElementNS(t,n),t[tn]=e,t[Ji]=r,bv(t,e,!1,!1),e.stateNode=t;e:{switch(o=Tc(n,r),n){case"dialog":ke("cancel",t),ke("close",t),s=r;break;case"iframe":case"object":case"embed":ke("load",t),s=r;break;case"video":case"audio":for(s=0;s<Ti.length;s++)ke(Ti[s],t);s=r;break;case"source":ke("error",t),s=r;break;case"img":case"image":case"link":ke("error",t),ke("load",t),s=r;break;case"details":ke("toggle",t),s=r;break;case"input":wp(t,r),s=gc(t,r),ke("invalid",t);break;case"option":s=r;break;case"select":t._wrapperState={wasMultiple:!!r.multiple},s=be({},r,{value:void 0}),ke("invalid",t);break;case"textarea":Tp(t,r),s=_c(t,r),ke("invalid",t);break;default:s=r}Ec(n,s),l=s;for(i in l)if(l.hasOwnProperty(i)){var u=l[i];i==="style"?hy(t,u):i==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&uy(t,u)):i==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&$i(t,u):typeof u=="number"&&$i(t,""+u):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(zi.hasOwnProperty(i)?u!=null&&i==="onScroll"&&ke("scroll",t):u!=null&&Oh(t,i,u,o))}switch(n){case"input":Xo(t),Ep(t,r,!1);break;case"textarea":Xo(t),Ip(t);break;case"option":r.value!=null&&t.setAttribute("value",""+cr(r.value));break;case"select":t.multiple=!!r.multiple,i=r.value,i!=null?ps(t,!!r.multiple,i,!1):r.defaultValue!=null&&ps(t,!!r.multiple,r.defaultValue,!0);break;default:typeof s.onClick=="function"&&(t.onclick=Ga)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return at(e),null;case 6:if(t&&e.stateNode!=null)Ov(t,e,t.memoizedProps,r);else{if(typeof r!="string"&&e.stateNode===null)throw Error(j(166));if(n=Ar(Zi.current),Ar(sn.current),aa(e)){if(r=e.stateNode,n=e.memoizedProps,r[tn]=e,(i=r.nodeValue!==n)&&(t=Pt,t!==null))switch(t.tag){case 3:oa(r.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&oa(r.nodeValue,n,(t.mode&1)!==0)}i&&(e.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[tn]=e,e.stateNode=r}return at(e),null;case 13:if(Ae(Pe),r=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(Ce&&Rt!==null&&e.mode&1&&!(e.flags&128))Xy(),As(),e.flags|=98560,i=!1;else if(i=aa(e),r!==null&&r.dehydrated!==null){if(t===null){if(!i)throw Error(j(318));if(i=e.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(j(317));i[tn]=e}else As(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;at(e),i=!1}else Gt!==null&&(nh(Gt),Gt=null),i=!0;if(!i)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(r=r!==null,r!==(t!==null&&t.memoizedState!==null)&&r&&(e.child.flags|=8192,e.mode&1&&(t===null||Pe.current&1?We===0&&(We=3):gd())),e.updateQueue!==null&&(e.flags|=4),at(e),null);case 4:return Rs(),Gc(t,e),t===null&&Qi(e.stateNode.containerInfo),at(e),null;case 10:return Zh(e.type._context),at(e),null;case 17:return xt(e.type)&&Qa(),at(e),null;case 19:if(Ae(Pe),i=e.memoizedState,i===null)return at(e),null;if(r=(e.flags&128)!==0,o=i.rendering,o===null)if(r)gi(i,!1);else{if(We!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=nl(t),o!==null){for(e.flags|=128,gi(i,!1),r=o.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),e.subtreeFlags=0,r=n,n=e.child;n!==null;)i=n,t=r,i.flags&=14680066,o=i.alternate,o===null?(i.childLanes=0,i.lanes=t,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=o.childLanes,i.lanes=o.lanes,i.child=o.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=o.memoizedProps,i.memoizedState=o.memoizedState,i.updateQueue=o.updateQueue,i.type=o.type,t=o.dependencies,i.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return xe(Pe,Pe.current&1|2),e.child}t=t.sibling}i.tail!==null&&Fe()>Ns&&(e.flags|=128,r=!0,gi(i,!1),e.lanes=4194304)}else{if(!r)if(t=nl(o),t!==null){if(e.flags|=128,r=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),gi(i,!0),i.tail===null&&i.tailMode==="hidden"&&!o.alternate&&!Ce)return at(e),null}else 2*Fe()-i.renderingStartTime>Ns&&n!==1073741824&&(e.flags|=128,r=!0,gi(i,!1),e.lanes=4194304);i.isBackwards?(o.sibling=e.child,e.child=o):(n=i.last,n!==null?n.sibling=o:e.child=o,i.last=o)}return i.tail!==null?(e=i.tail,i.rendering=e,i.tail=e.sibling,i.renderingStartTime=Fe(),e.sibling=null,n=Pe.current,xe(Pe,r?n&1|2:n&1),e):(at(e),null);case 22:case 23:return md(),r=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==r&&(e.flags|=8192),r&&e.mode&1?Ct&1073741824&&(at(e),e.subtreeFlags&6&&(e.flags|=8192)):at(e),null;case 24:return null;case 25:return null}throw Error(j(156,e.tag))}function G1(t,e){switch(Qh(e),e.tag){case 1:return xt(e.type)&&Qa(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Rs(),Ae(It),Ae(dt),sd(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return rd(e),null;case 13:if(Ae(Pe),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(j(340));As()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return Ae(Pe),null;case 4:return Rs(),null;case 10:return Zh(e.type._context),null;case 22:case 23:return md(),null;case 24:return null;default:return null}}var ca=!1,ct=!1,Q1=typeof WeakSet=="function"?WeakSet:Set,H=null;function hs(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Ve(t,e,r)}else n.current=null}function Qc(t,e,n){try{n()}catch(r){Ve(t,e,r)}}var dm=!1;function Y1(t,e){if(bc=Ha,t=Fy(),Kh(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var s=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var o=0,l=-1,u=-1,h=0,p=0,m=t,v=null;t:for(;;){for(var _;m!==n||s!==0&&m.nodeType!==3||(l=o+s),m!==i||r!==0&&m.nodeType!==3||(u=o+r),m.nodeType===3&&(o+=m.nodeValue.length),(_=m.firstChild)!==null;)v=m,m=_;for(;;){if(m===t)break t;if(v===n&&++h===s&&(l=o),v===i&&++p===r&&(u=o),(_=m.nextSibling)!==null)break;m=v,v=m.parentNode}m=_}n=l===-1||u===-1?null:{start:l,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(Dc={focusedElem:t,selectionRange:n},Ha=!1,H=e;H!==null;)if(e=H,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,H=t;else for(;H!==null;){e=H;try{var C=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(C!==null){var P=C.memoizedProps,O=C.memoizedState,S=e.stateNode,T=S.getSnapshotBeforeUpdate(e.elementType===e.type?P:qt(e.type,P),O);S.__reactInternalSnapshotBeforeUpdate=T}break;case 3:var k=e.stateNode.containerInfo;k.nodeType===1?k.textContent="":k.nodeType===9&&k.documentElement&&k.removeChild(k.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(j(163))}}catch(D){Ve(e,e.return,D)}if(t=e.sibling,t!==null){t.return=e.return,H=t;break}H=e.return}return C=dm,dm=!1,C}function Di(t,e,n){var r=e.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var s=r=r.next;do{if((s.tag&t)===t){var i=s.destroy;s.destroy=void 0,i!==void 0&&Qc(e,n,i)}s=s.next}while(s!==r)}}function Ml(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var r=n.create;n.destroy=r()}n=n.next}while(n!==e)}}function Yc(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function Vv(t){var e=t.alternate;e!==null&&(t.alternate=null,Vv(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[tn],delete e[Ji],delete e[Lc],delete e[b1],delete e[D1])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function Lv(t){return t.tag===5||t.tag===3||t.tag===4}function fm(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||Lv(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Jc(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Ga));else if(r!==4&&(t=t.child,t!==null))for(Jc(t,e,n),t=t.sibling;t!==null;)Jc(t,e,n),t=t.sibling}function Xc(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(r!==4&&(t=t.child,t!==null))for(Xc(t,e,n),t=t.sibling;t!==null;)Xc(t,e,n),t=t.sibling}var Ye=null,Kt=!1;function Fn(t,e,n){for(n=n.child;n!==null;)Mv(t,e,n),n=n.sibling}function Mv(t,e,n){if(rn&&typeof rn.onCommitFiberUnmount=="function")try{rn.onCommitFiberUnmount(Rl,n)}catch{}switch(n.tag){case 5:ct||hs(n,e);case 6:var r=Ye,s=Kt;Ye=null,Fn(t,e,n),Ye=r,Kt=s,Ye!==null&&(Kt?(t=Ye,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Ye.removeChild(n.stateNode));break;case 18:Ye!==null&&(Kt?(t=Ye,n=n.stateNode,t.nodeType===8?$u(t.parentNode,n):t.nodeType===1&&$u(t,n),qi(t)):$u(Ye,n.stateNode));break;case 4:r=Ye,s=Kt,Ye=n.stateNode.containerInfo,Kt=!0,Fn(t,e,n),Ye=r,Kt=s;break;case 0:case 11:case 14:case 15:if(!ct&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){s=r=r.next;do{var i=s,o=i.destroy;i=i.tag,o!==void 0&&(i&2||i&4)&&Qc(n,e,o),s=s.next}while(s!==r)}Fn(t,e,n);break;case 1:if(!ct&&(hs(n,e),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){Ve(n,e,l)}Fn(t,e,n);break;case 21:Fn(t,e,n);break;case 22:n.mode&1?(ct=(r=ct)||n.memoizedState!==null,Fn(t,e,n),ct=r):Fn(t,e,n);break;default:Fn(t,e,n)}}function pm(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new Q1),e.forEach(function(r){var s=iT.bind(null,t,r);n.has(r)||(n.add(r),r.then(s,s))})}}function Ht(t,e){var n=e.deletions;if(n!==null)for(var r=0;r<n.length;r++){var s=n[r];try{var i=t,o=e,l=o;e:for(;l!==null;){switch(l.tag){case 5:Ye=l.stateNode,Kt=!1;break e;case 3:Ye=l.stateNode.containerInfo,Kt=!0;break e;case 4:Ye=l.stateNode.containerInfo,Kt=!0;break e}l=l.return}if(Ye===null)throw Error(j(160));Mv(i,o,s),Ye=null,Kt=!1;var u=s.alternate;u!==null&&(u.return=null),s.return=null}catch(h){Ve(s,e,h)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)jv(e,t),e=e.sibling}function jv(t,e){var n=t.alternate,r=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Ht(e,t),Zt(t),r&4){try{Di(3,t,t.return),Ml(3,t)}catch(P){Ve(t,t.return,P)}try{Di(5,t,t.return)}catch(P){Ve(t,t.return,P)}}break;case 1:Ht(e,t),Zt(t),r&512&&n!==null&&hs(n,n.return);break;case 5:if(Ht(e,t),Zt(t),r&512&&n!==null&&hs(n,n.return),t.flags&32){var s=t.stateNode;try{$i(s,"")}catch(P){Ve(t,t.return,P)}}if(r&4&&(s=t.stateNode,s!=null)){var i=t.memoizedProps,o=n!==null?n.memoizedProps:i,l=t.type,u=t.updateQueue;if(t.updateQueue=null,u!==null)try{l==="input"&&i.type==="radio"&&i.name!=null&&oy(s,i),Tc(l,o);var h=Tc(l,i);for(o=0;o<u.length;o+=2){var p=u[o],m=u[o+1];p==="style"?hy(s,m):p==="dangerouslySetInnerHTML"?uy(s,m):p==="children"?$i(s,m):Oh(s,p,m,h)}switch(l){case"input":yc(s,i);break;case"textarea":ay(s,i);break;case"select":var v=s._wrapperState.wasMultiple;s._wrapperState.wasMultiple=!!i.multiple;var _=i.value;_!=null?ps(s,!!i.multiple,_,!1):v!==!!i.multiple&&(i.defaultValue!=null?ps(s,!!i.multiple,i.defaultValue,!0):ps(s,!!i.multiple,i.multiple?[]:"",!1))}s[Ji]=i}catch(P){Ve(t,t.return,P)}}break;case 6:if(Ht(e,t),Zt(t),r&4){if(t.stateNode===null)throw Error(j(162));s=t.stateNode,i=t.memoizedProps;try{s.nodeValue=i}catch(P){Ve(t,t.return,P)}}break;case 3:if(Ht(e,t),Zt(t),r&4&&n!==null&&n.memoizedState.isDehydrated)try{qi(e.containerInfo)}catch(P){Ve(t,t.return,P)}break;case 4:Ht(e,t),Zt(t);break;case 13:Ht(e,t),Zt(t),s=t.child,s.flags&8192&&(i=s.memoizedState!==null,s.stateNode.isHidden=i,!i||s.alternate!==null&&s.alternate.memoizedState!==null||(fd=Fe())),r&4&&pm(t);break;case 22:if(p=n!==null&&n.memoizedState!==null,t.mode&1?(ct=(h=ct)||p,Ht(e,t),ct=h):Ht(e,t),Zt(t),r&8192){if(h=t.memoizedState!==null,(t.stateNode.isHidden=h)&&!p&&t.mode&1)for(H=t,p=t.child;p!==null;){for(m=H=p;H!==null;){switch(v=H,_=v.child,v.tag){case 0:case 11:case 14:case 15:Di(4,v,v.return);break;case 1:hs(v,v.return);var C=v.stateNode;if(typeof C.componentWillUnmount=="function"){r=v,n=v.return;try{e=r,C.props=e.memoizedProps,C.state=e.memoizedState,C.componentWillUnmount()}catch(P){Ve(r,n,P)}}break;case 5:hs(v,v.return);break;case 22:if(v.memoizedState!==null){gm(m);continue}}_!==null?(_.return=v,H=_):gm(m)}p=p.sibling}e:for(p=null,m=t;;){if(m.tag===5){if(p===null){p=m;try{s=m.stateNode,h?(i=s.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(l=m.stateNode,u=m.memoizedProps.style,o=u!=null&&u.hasOwnProperty("display")?u.display:null,l.style.display=cy("display",o))}catch(P){Ve(t,t.return,P)}}}else if(m.tag===6){if(p===null)try{m.stateNode.nodeValue=h?"":m.memoizedProps}catch(P){Ve(t,t.return,P)}}else if((m.tag!==22&&m.tag!==23||m.memoizedState===null||m===t)&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===t)break e;for(;m.sibling===null;){if(m.return===null||m.return===t)break e;p===m&&(p=null),m=m.return}p===m&&(p=null),m.sibling.return=m.return,m=m.sibling}}break;case 19:Ht(e,t),Zt(t),r&4&&pm(t);break;case 21:break;default:Ht(e,t),Zt(t)}}function Zt(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(Lv(n)){var r=n;break e}n=n.return}throw Error(j(160))}switch(r.tag){case 5:var s=r.stateNode;r.flags&32&&($i(s,""),r.flags&=-33);var i=fm(t);Xc(t,i,s);break;case 3:case 4:var o=r.stateNode.containerInfo,l=fm(t);Jc(t,l,o);break;default:throw Error(j(161))}}catch(u){Ve(t,t.return,u)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function J1(t,e,n){H=t,Fv(t)}function Fv(t,e,n){for(var r=(t.mode&1)!==0;H!==null;){var s=H,i=s.child;if(s.tag===22&&r){var o=s.memoizedState!==null||ca;if(!o){var l=s.alternate,u=l!==null&&l.memoizedState!==null||ct;l=ca;var h=ct;if(ca=o,(ct=u)&&!h)for(H=s;H!==null;)o=H,u=o.child,o.tag===22&&o.memoizedState!==null?ym(s):u!==null?(u.return=o,H=u):ym(s);for(;i!==null;)H=i,Fv(i),i=i.sibling;H=s,ca=l,ct=h}mm(t)}else s.subtreeFlags&8772&&i!==null?(i.return=s,H=i):mm(t)}}function mm(t){for(;H!==null;){var e=H;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:ct||Ml(5,e);break;case 1:var r=e.stateNode;if(e.flags&4&&!ct)if(n===null)r.componentDidMount();else{var s=e.elementType===e.type?n.memoizedProps:qt(e.type,n.memoizedProps);r.componentDidUpdate(s,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=e.updateQueue;i!==null&&Zp(e,i,r);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Zp(e,o,n)}break;case 5:var l=e.stateNode;if(n===null&&e.flags&4){n=l;var u=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var h=e.alternate;if(h!==null){var p=h.memoizedState;if(p!==null){var m=p.dehydrated;m!==null&&qi(m)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(j(163))}ct||e.flags&512&&Yc(e)}catch(v){Ve(e,e.return,v)}}if(e===t){H=null;break}if(n=e.sibling,n!==null){n.return=e.return,H=n;break}H=e.return}}function gm(t){for(;H!==null;){var e=H;if(e===t){H=null;break}var n=e.sibling;if(n!==null){n.return=e.return,H=n;break}H=e.return}}function ym(t){for(;H!==null;){var e=H;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Ml(4,e)}catch(u){Ve(e,n,u)}break;case 1:var r=e.stateNode;if(typeof r.componentDidMount=="function"){var s=e.return;try{r.componentDidMount()}catch(u){Ve(e,s,u)}}var i=e.return;try{Yc(e)}catch(u){Ve(e,i,u)}break;case 5:var o=e.return;try{Yc(e)}catch(u){Ve(e,o,u)}}}catch(u){Ve(e,e.return,u)}if(e===t){H=null;break}var l=e.sibling;if(l!==null){l.return=e.return,H=l;break}H=e.return}}var X1=Math.ceil,il=On.ReactCurrentDispatcher,hd=On.ReactCurrentOwner,jt=On.ReactCurrentBatchConfig,ge=0,Ge=null,ze=null,Ze=0,Ct=0,ds=gr(0),We=0,ro=null,Lr=0,jl=0,dd=0,Oi=null,Et=null,fd=0,Ns=1/0,pn=null,ol=!1,Zc=null,sr=null,ha=!1,Jn=null,al=0,Vi=0,eh=null,Ca=-1,Ra=0;function yt(){return ge&6?Fe():Ca!==-1?Ca:Ca=Fe()}function ir(t){return t.mode&1?ge&2&&Ze!==0?Ze&-Ze:V1.transition!==null?(Ra===0&&(Ra=Iy()),Ra):(t=Ee,t!==0||(t=window.event,t=t===void 0?16:Py(t.type)),t):1}function Jt(t,e,n,r){if(50<Vi)throw Vi=0,eh=null,Error(j(185));yo(t,n,r),(!(ge&2)||t!==Ge)&&(t===Ge&&(!(ge&2)&&(jl|=n),We===4&&Hn(t,Ze)),St(t,r),n===1&&ge===0&&!(e.mode&1)&&(Ns=Fe()+500,Ol&&yr()))}function St(t,e){var n=t.callbackNode;VE(t,e);var r=Wa(t,t===Ge?Ze:0);if(r===0)n!==null&&kp(n),t.callbackNode=null,t.callbackPriority=0;else if(e=r&-r,t.callbackPriority!==e){if(n!=null&&kp(n),e===1)t.tag===0?O1(vm.bind(null,t)):Qy(vm.bind(null,t)),P1(function(){!(ge&6)&&yr()}),n=null;else{switch(xy(r)){case 1:n=Fh;break;case 4:n=Ey;break;case 16:n=Ba;break;case 536870912:n=Ty;break;default:n=Ba}n=Kv(n,Uv.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function Uv(t,e){if(Ca=-1,Ra=0,ge&6)throw Error(j(327));var n=t.callbackNode;if(_s()&&t.callbackNode!==n)return null;var r=Wa(t,t===Ge?Ze:0);if(r===0)return null;if(r&30||r&t.expiredLanes||e)e=ll(t,r);else{e=r;var s=ge;ge|=2;var i=$v();(Ge!==t||Ze!==e)&&(pn=null,Ns=Fe()+500,Rr(t,e));do try{tT();break}catch(l){zv(t,l)}while(!0);Xh(),il.current=i,ge=s,ze!==null?e=0:(Ge=null,Ze=0,e=We)}if(e!==0){if(e===2&&(s=Ac(t),s!==0&&(r=s,e=th(t,s))),e===1)throw n=ro,Rr(t,0),Hn(t,r),St(t,Fe()),n;if(e===6)Hn(t,r);else{if(s=t.current.alternate,!(r&30)&&!Z1(s)&&(e=ll(t,r),e===2&&(i=Ac(t),i!==0&&(r=i,e=th(t,i))),e===1))throw n=ro,Rr(t,0),Hn(t,r),St(t,Fe()),n;switch(t.finishedWork=s,t.finishedLanes=r,e){case 0:case 1:throw Error(j(345));case 2:Ir(t,Et,pn);break;case 3:if(Hn(t,r),(r&130023424)===r&&(e=fd+500-Fe(),10<e)){if(Wa(t,0)!==0)break;if(s=t.suspendedLanes,(s&r)!==r){yt(),t.pingedLanes|=t.suspendedLanes&s;break}t.timeoutHandle=Vc(Ir.bind(null,t,Et,pn),e);break}Ir(t,Et,pn);break;case 4:if(Hn(t,r),(r&4194240)===r)break;for(e=t.eventTimes,s=-1;0<r;){var o=31-Yt(r);i=1<<o,o=e[o],o>s&&(s=o),r&=~i}if(r=s,r=Fe()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*X1(r/1960))-r,10<r){t.timeoutHandle=Vc(Ir.bind(null,t,Et,pn),r);break}Ir(t,Et,pn);break;case 5:Ir(t,Et,pn);break;default:throw Error(j(329))}}}return St(t,Fe()),t.callbackNode===n?Uv.bind(null,t):null}function th(t,e){var n=Oi;return t.current.memoizedState.isDehydrated&&(Rr(t,e).flags|=256),t=ll(t,e),t!==2&&(e=Et,Et=n,e!==null&&nh(e)),t}function nh(t){Et===null?Et=t:Et.push.apply(Et,t)}function Z1(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var s=n[r],i=s.getSnapshot;s=s.value;try{if(!Xt(i(),s))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Hn(t,e){for(e&=~dd,e&=~jl,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-Yt(e),r=1<<n;t[n]=-1,e&=~r}}function vm(t){if(ge&6)throw Error(j(327));_s();var e=Wa(t,0);if(!(e&1))return St(t,Fe()),null;var n=ll(t,e);if(t.tag!==0&&n===2){var r=Ac(t);r!==0&&(e=r,n=th(t,r))}if(n===1)throw n=ro,Rr(t,0),Hn(t,e),St(t,Fe()),n;if(n===6)throw Error(j(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Ir(t,Et,pn),St(t,Fe()),null}function pd(t,e){var n=ge;ge|=1;try{return t(e)}finally{ge=n,ge===0&&(Ns=Fe()+500,Ol&&yr())}}function Mr(t){Jn!==null&&Jn.tag===0&&!(ge&6)&&_s();var e=ge;ge|=1;var n=jt.transition,r=Ee;try{if(jt.transition=null,Ee=1,t)return t()}finally{Ee=r,jt.transition=n,ge=e,!(ge&6)&&yr()}}function md(){Ct=ds.current,Ae(ds)}function Rr(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,R1(n)),ze!==null)for(n=ze.return;n!==null;){var r=n;switch(Qh(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Qa();break;case 3:Rs(),Ae(It),Ae(dt),sd();break;case 5:rd(r);break;case 4:Rs();break;case 13:Ae(Pe);break;case 19:Ae(Pe);break;case 10:Zh(r.type._context);break;case 22:case 23:md()}n=n.return}if(Ge=t,ze=t=or(t.current,null),Ze=Ct=e,We=0,ro=null,dd=jl=Lr=0,Et=Oi=null,kr!==null){for(e=0;e<kr.length;e++)if(n=kr[e],r=n.interleaved,r!==null){n.interleaved=null;var s=r.next,i=n.pending;if(i!==null){var o=i.next;i.next=s,r.next=o}n.pending=r}kr=null}return t}function zv(t,e){do{var n=ze;try{if(Xh(),Sa.current=sl,rl){for(var r=Ne.memoizedState;r!==null;){var s=r.queue;s!==null&&(s.pending=null),r=r.next}rl=!1}if(Vr=0,Ke=$e=Ne=null,bi=!1,eo=0,hd.current=null,n===null||n.return===null){We=1,ro=e,ze=null;break}e:{var i=t,o=n.return,l=n,u=e;if(e=Ze,l.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var h=u,p=l,m=p.tag;if(!(p.mode&1)&&(m===0||m===11||m===15)){var v=p.alternate;v?(p.updateQueue=v.updateQueue,p.memoizedState=v.memoizedState,p.lanes=v.lanes):(p.updateQueue=null,p.memoizedState=null)}var _=im(o);if(_!==null){_.flags&=-257,om(_,o,l,i,e),_.mode&1&&sm(i,h,e),e=_,u=h;var C=e.updateQueue;if(C===null){var P=new Set;P.add(u),e.updateQueue=P}else C.add(u);break e}else{if(!(e&1)){sm(i,h,e),gd();break e}u=Error(j(426))}}else if(Ce&&l.mode&1){var O=im(o);if(O!==null){!(O.flags&65536)&&(O.flags|=256),om(O,o,l,i,e),Yh(Ps(u,l));break e}}i=u=Ps(u,l),We!==4&&(We=2),Oi===null?Oi=[i]:Oi.push(i),i=o;do{switch(i.tag){case 3:i.flags|=65536,e&=-e,i.lanes|=e;var S=xv(i,u,e);Xp(i,S);break e;case 1:l=u;var T=i.type,k=i.stateNode;if(!(i.flags&128)&&(typeof T.getDerivedStateFromError=="function"||k!==null&&typeof k.componentDidCatch=="function"&&(sr===null||!sr.has(k)))){i.flags|=65536,e&=-e,i.lanes|=e;var D=Sv(i,l,e);Xp(i,D);break e}}i=i.return}while(i!==null)}Wv(n)}catch(F){e=F,ze===n&&n!==null&&(ze=n=n.return);continue}break}while(!0)}function $v(){var t=il.current;return il.current=sl,t===null?sl:t}function gd(){(We===0||We===3||We===2)&&(We=4),Ge===null||!(Lr&268435455)&&!(jl&268435455)||Hn(Ge,Ze)}function ll(t,e){var n=ge;ge|=2;var r=$v();(Ge!==t||Ze!==e)&&(pn=null,Rr(t,e));do try{eT();break}catch(s){zv(t,s)}while(!0);if(Xh(),ge=n,il.current=r,ze!==null)throw Error(j(261));return Ge=null,Ze=0,We}function eT(){for(;ze!==null;)Bv(ze)}function tT(){for(;ze!==null&&!kE();)Bv(ze)}function Bv(t){var e=qv(t.alternate,t,Ct);t.memoizedProps=t.pendingProps,e===null?Wv(t):ze=e,hd.current=null}function Wv(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=G1(n,e),n!==null){n.flags&=32767,ze=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{We=6,ze=null;return}}else if(n=K1(n,e,Ct),n!==null){ze=n;return}if(e=e.sibling,e!==null){ze=e;return}ze=e=t}while(e!==null);We===0&&(We=5)}function Ir(t,e,n){var r=Ee,s=jt.transition;try{jt.transition=null,Ee=1,nT(t,e,n,r)}finally{jt.transition=s,Ee=r}return null}function nT(t,e,n,r){do _s();while(Jn!==null);if(ge&6)throw Error(j(327));n=t.finishedWork;var s=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(j(177));t.callbackNode=null,t.callbackPriority=0;var i=n.lanes|n.childLanes;if(LE(t,i),t===Ge&&(ze=Ge=null,Ze=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||ha||(ha=!0,Kv(Ba,function(){return _s(),null})),i=(n.flags&15990)!==0,n.subtreeFlags&15990||i){i=jt.transition,jt.transition=null;var o=Ee;Ee=1;var l=ge;ge|=4,hd.current=null,Y1(t,n),jv(n,t),T1(Dc),Ha=!!bc,Dc=bc=null,t.current=n,J1(n),AE(),ge=l,Ee=o,jt.transition=i}else t.current=n;if(ha&&(ha=!1,Jn=t,al=s),i=t.pendingLanes,i===0&&(sr=null),PE(n.stateNode),St(t,Fe()),e!==null)for(r=t.onRecoverableError,n=0;n<e.length;n++)s=e[n],r(s.value,{componentStack:s.stack,digest:s.digest});if(ol)throw ol=!1,t=Zc,Zc=null,t;return al&1&&t.tag!==0&&_s(),i=t.pendingLanes,i&1?t===eh?Vi++:(Vi=0,eh=t):Vi=0,yr(),null}function _s(){if(Jn!==null){var t=xy(al),e=jt.transition,n=Ee;try{if(jt.transition=null,Ee=16>t?16:t,Jn===null)var r=!1;else{if(t=Jn,Jn=null,al=0,ge&6)throw Error(j(331));var s=ge;for(ge|=4,H=t.current;H!==null;){var i=H,o=i.child;if(H.flags&16){var l=i.deletions;if(l!==null){for(var u=0;u<l.length;u++){var h=l[u];for(H=h;H!==null;){var p=H;switch(p.tag){case 0:case 11:case 15:Di(8,p,i)}var m=p.child;if(m!==null)m.return=p,H=m;else for(;H!==null;){p=H;var v=p.sibling,_=p.return;if(Vv(p),p===h){H=null;break}if(v!==null){v.return=_,H=v;break}H=_}}}var C=i.alternate;if(C!==null){var P=C.child;if(P!==null){C.child=null;do{var O=P.sibling;P.sibling=null,P=O}while(P!==null)}}H=i}}if(i.subtreeFlags&2064&&o!==null)o.return=i,H=o;else e:for(;H!==null;){if(i=H,i.flags&2048)switch(i.tag){case 0:case 11:case 15:Di(9,i,i.return)}var S=i.sibling;if(S!==null){S.return=i.return,H=S;break e}H=i.return}}var T=t.current;for(H=T;H!==null;){o=H;var k=o.child;if(o.subtreeFlags&2064&&k!==null)k.return=o,H=k;else e:for(o=T;H!==null;){if(l=H,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:Ml(9,l)}}catch(F){Ve(l,l.return,F)}if(l===o){H=null;break e}var D=l.sibling;if(D!==null){D.return=l.return,H=D;break e}H=l.return}}if(ge=s,yr(),rn&&typeof rn.onPostCommitFiberRoot=="function")try{rn.onPostCommitFiberRoot(Rl,t)}catch{}r=!0}return r}finally{Ee=n,jt.transition=e}}return!1}function _m(t,e,n){e=Ps(n,e),e=xv(t,e,1),t=rr(t,e,1),e=yt(),t!==null&&(yo(t,1,e),St(t,e))}function Ve(t,e,n){if(t.tag===3)_m(t,t,n);else for(;e!==null;){if(e.tag===3){_m(e,t,n);break}else if(e.tag===1){var r=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(sr===null||!sr.has(r))){t=Ps(n,t),t=Sv(e,t,1),e=rr(e,t,1),t=yt(),e!==null&&(yo(e,1,t),St(e,t));break}}e=e.return}}function rT(t,e,n){var r=t.pingCache;r!==null&&r.delete(e),e=yt(),t.pingedLanes|=t.suspendedLanes&n,Ge===t&&(Ze&n)===n&&(We===4||We===3&&(Ze&130023424)===Ze&&500>Fe()-fd?Rr(t,0):dd|=n),St(t,e)}function Hv(t,e){e===0&&(t.mode&1?(e=ta,ta<<=1,!(ta&130023424)&&(ta=4194304)):e=1);var n=yt();t=kn(t,e),t!==null&&(yo(t,e,n),St(t,n))}function sT(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),Hv(t,n)}function iT(t,e){var n=0;switch(t.tag){case 13:var r=t.stateNode,s=t.memoizedState;s!==null&&(n=s.retryLane);break;case 19:r=t.stateNode;break;default:throw Error(j(314))}r!==null&&r.delete(e),Hv(t,n)}var qv;qv=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||It.current)Tt=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return Tt=!1,q1(t,e,n);Tt=!!(t.flags&131072)}else Tt=!1,Ce&&e.flags&1048576&&Yy(e,Xa,e.index);switch(e.lanes=0,e.tag){case 2:var r=e.type;Aa(t,e),t=e.pendingProps;var s=ks(e,dt.current);vs(e,n),s=od(null,e,r,t,s,n);var i=ad();return e.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,xt(r)?(i=!0,Ya(e)):i=!1,e.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,td(e),s.updater=Ll,e.stateNode=s,s._reactInternals=e,$c(e,r,t,n),e=Hc(null,e,r,!0,i,n)):(e.tag=0,Ce&&i&&Gh(e),gt(null,e,s,n),e=e.child),e;case 16:r=e.elementType;e:{switch(Aa(t,e),t=e.pendingProps,s=r._init,r=s(r._payload),e.type=r,s=e.tag=aT(r),t=qt(r,t),s){case 0:e=Wc(null,e,r,t,n);break e;case 1:e=um(null,e,r,t,n);break e;case 11:e=am(null,e,r,t,n);break e;case 14:e=lm(null,e,r,qt(r.type,t),n);break e}throw Error(j(306,r,""))}return e;case 0:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:qt(r,s),Wc(t,e,r,s,n);case 1:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:qt(r,s),um(t,e,r,s,n);case 3:e:{if(Rv(e),t===null)throw Error(j(387));r=e.pendingProps,i=e.memoizedState,s=i.element,nv(t,e),tl(e,r,null,n);var o=e.memoizedState;if(r=o.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=i,e.memoizedState=i,e.flags&256){s=Ps(Error(j(423)),e),e=cm(t,e,r,n,s);break e}else if(r!==s){s=Ps(Error(j(424)),e),e=cm(t,e,r,n,s);break e}else for(Rt=nr(e.stateNode.containerInfo.firstChild),Pt=e,Ce=!0,Gt=null,n=ev(e,null,r,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(As(),r===s){e=An(t,e,n);break e}gt(t,e,r,n)}e=e.child}return e;case 5:return rv(e),t===null&&Fc(e),r=e.type,s=e.pendingProps,i=t!==null?t.memoizedProps:null,o=s.children,Oc(r,s)?o=null:i!==null&&Oc(r,i)&&(e.flags|=32),Cv(t,e),gt(t,e,o,n),e.child;case 6:return t===null&&Fc(e),null;case 13:return Pv(t,e,n);case 4:return nd(e,e.stateNode.containerInfo),r=e.pendingProps,t===null?e.child=Cs(e,null,r,n):gt(t,e,r,n),e.child;case 11:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:qt(r,s),am(t,e,r,s,n);case 7:return gt(t,e,e.pendingProps,n),e.child;case 8:return gt(t,e,e.pendingProps.children,n),e.child;case 12:return gt(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(r=e.type._context,s=e.pendingProps,i=e.memoizedProps,o=s.value,xe(Za,r._currentValue),r._currentValue=o,i!==null)if(Xt(i.value,o)){if(i.children===s.children&&!It.current){e=An(t,e,n);break e}}else for(i=e.child,i!==null&&(i.return=e);i!==null;){var l=i.dependencies;if(l!==null){o=i.child;for(var u=l.firstContext;u!==null;){if(u.context===r){if(i.tag===1){u=En(-1,n&-n),u.tag=2;var h=i.updateQueue;if(h!==null){h=h.shared;var p=h.pending;p===null?u.next=u:(u.next=p.next,p.next=u),h.pending=u}}i.lanes|=n,u=i.alternate,u!==null&&(u.lanes|=n),Uc(i.return,n,e),l.lanes|=n;break}u=u.next}}else if(i.tag===10)o=i.type===e.type?null:i.child;else if(i.tag===18){if(o=i.return,o===null)throw Error(j(341));o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),Uc(o,n,e),o=i.sibling}else o=i.child;if(o!==null)o.return=i;else for(o=i;o!==null;){if(o===e){o=null;break}if(i=o.sibling,i!==null){i.return=o.return,o=i;break}o=o.return}i=o}gt(t,e,s.children,n),e=e.child}return e;case 9:return s=e.type,r=e.pendingProps.children,vs(e,n),s=Ut(s),r=r(s),e.flags|=1,gt(t,e,r,n),e.child;case 14:return r=e.type,s=qt(r,e.pendingProps),s=qt(r.type,s),lm(t,e,r,s,n);case 15:return kv(t,e,e.type,e.pendingProps,n);case 17:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:qt(r,s),Aa(t,e),e.tag=1,xt(r)?(t=!0,Ya(e)):t=!1,vs(e,n),Iv(e,r,s),$c(e,r,s,n),Hc(null,e,r,!0,t,n);case 19:return Nv(t,e,n);case 22:return Av(t,e,n)}throw Error(j(156,e.tag))};function Kv(t,e){return wy(t,e)}function oT(t,e,n,r){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Mt(t,e,n,r){return new oT(t,e,n,r)}function yd(t){return t=t.prototype,!(!t||!t.isReactComponent)}function aT(t){if(typeof t=="function")return yd(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Lh)return 11;if(t===Mh)return 14}return 2}function or(t,e){var n=t.alternate;return n===null?(n=Mt(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Pa(t,e,n,r,s,i){var o=2;if(r=t,typeof t=="function")yd(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case ns:return Pr(n.children,s,i,e);case Vh:o=8,s|=8;break;case dc:return t=Mt(12,n,e,s|2),t.elementType=dc,t.lanes=i,t;case fc:return t=Mt(13,n,e,s),t.elementType=fc,t.lanes=i,t;case pc:return t=Mt(19,n,e,s),t.elementType=pc,t.lanes=i,t;case ry:return Fl(n,s,i,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case ty:o=10;break e;case ny:o=9;break e;case Lh:o=11;break e;case Mh:o=14;break e;case $n:o=16,r=null;break e}throw Error(j(130,t==null?t:typeof t,""))}return e=Mt(o,n,e,s),e.elementType=t,e.type=r,e.lanes=i,e}function Pr(t,e,n,r){return t=Mt(7,t,r,e),t.lanes=n,t}function Fl(t,e,n,r){return t=Mt(22,t,r,e),t.elementType=ry,t.lanes=n,t.stateNode={isHidden:!1},t}function Yu(t,e,n){return t=Mt(6,t,null,e),t.lanes=n,t}function Ju(t,e,n){return e=Mt(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function lT(t,e,n,r,s){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Nu(0),this.expirationTimes=Nu(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Nu(0),this.identifierPrefix=r,this.onRecoverableError=s,this.mutableSourceEagerHydrationData=null}function vd(t,e,n,r,s,i,o,l,u){return t=new lT(t,e,n,l,u),e===1?(e=1,i===!0&&(e|=8)):e=0,i=Mt(3,null,null,e),t.current=i,i.stateNode=t,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},td(i),t}function uT(t,e,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:ts,key:r==null?null:""+r,children:t,containerInfo:e,implementation:n}}function Gv(t){if(!t)return hr;t=t._reactInternals;e:{if(Wr(t)!==t||t.tag!==1)throw Error(j(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(xt(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(j(171))}if(t.tag===1){var n=t.type;if(xt(n))return Gy(t,n,e)}return e}function Qv(t,e,n,r,s,i,o,l,u){return t=vd(n,r,!0,t,s,i,o,l,u),t.context=Gv(null),n=t.current,r=yt(),s=ir(n),i=En(r,s),i.callback=e??null,rr(n,i,s),t.current.lanes=s,yo(t,s,r),St(t,r),t}function Ul(t,e,n,r){var s=e.current,i=yt(),o=ir(s);return n=Gv(n),e.context===null?e.context=n:e.pendingContext=n,e=En(i,o),e.payload={element:t},r=r===void 0?null:r,r!==null&&(e.callback=r),t=rr(s,e,o),t!==null&&(Jt(t,s,o,i),xa(t,s,o)),o}function ul(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function wm(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function _d(t,e){wm(t,e),(t=t.alternate)&&wm(t,e)}function cT(){return null}var Yv=typeof reportError=="function"?reportError:function(t){console.error(t)};function wd(t){this._internalRoot=t}zl.prototype.render=wd.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(j(409));Ul(t,e,null,null)};zl.prototype.unmount=wd.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Mr(function(){Ul(null,t,null,null)}),e[Sn]=null}};function zl(t){this._internalRoot=t}zl.prototype.unstable_scheduleHydration=function(t){if(t){var e=Ay();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Wn.length&&e!==0&&e<Wn[n].priority;n++);Wn.splice(n,0,t),n===0&&Ry(t)}};function Ed(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function $l(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Em(){}function hT(t,e,n,r,s){if(s){if(typeof r=="function"){var i=r;r=function(){var h=ul(o);i.call(h)}}var o=Qv(e,r,t,0,null,!1,!1,"",Em);return t._reactRootContainer=o,t[Sn]=o.current,Qi(t.nodeType===8?t.parentNode:t),Mr(),o}for(;s=t.lastChild;)t.removeChild(s);if(typeof r=="function"){var l=r;r=function(){var h=ul(u);l.call(h)}}var u=vd(t,0,!1,null,null,!1,!1,"",Em);return t._reactRootContainer=u,t[Sn]=u.current,Qi(t.nodeType===8?t.parentNode:t),Mr(function(){Ul(e,u,n,r)}),u}function Bl(t,e,n,r,s){var i=n._reactRootContainer;if(i){var o=i;if(typeof s=="function"){var l=s;s=function(){var u=ul(o);l.call(u)}}Ul(e,o,t,s)}else o=hT(n,e,t,s,r);return ul(o)}Sy=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=Ei(e.pendingLanes);n!==0&&(Uh(e,n|1),St(e,Fe()),!(ge&6)&&(Ns=Fe()+500,yr()))}break;case 13:Mr(function(){var r=kn(t,1);if(r!==null){var s=yt();Jt(r,t,1,s)}}),_d(t,1)}};zh=function(t){if(t.tag===13){var e=kn(t,134217728);if(e!==null){var n=yt();Jt(e,t,134217728,n)}_d(t,134217728)}};ky=function(t){if(t.tag===13){var e=ir(t),n=kn(t,e);if(n!==null){var r=yt();Jt(n,t,e,r)}_d(t,e)}};Ay=function(){return Ee};Cy=function(t,e){var n=Ee;try{return Ee=t,e()}finally{Ee=n}};xc=function(t,e,n){switch(e){case"input":if(yc(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var r=n[e];if(r!==t&&r.form===t.form){var s=Dl(r);if(!s)throw Error(j(90));iy(r),yc(r,s)}}}break;case"textarea":ay(t,n);break;case"select":e=n.value,e!=null&&ps(t,!!n.multiple,e,!1)}};py=pd;my=Mr;var dT={usingClientEntryPoint:!1,Events:[_o,os,Dl,dy,fy,pd]},yi={findFiberByHostInstance:Sr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},fT={bundleType:yi.bundleType,version:yi.version,rendererPackageName:yi.rendererPackageName,rendererConfig:yi.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:On.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=vy(t),t===null?null:t.stateNode},findFiberByHostInstance:yi.findFiberByHostInstance||cT,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var da=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!da.isDisabled&&da.supportsFiber)try{Rl=da.inject(fT),rn=da}catch{}}bt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=dT;bt.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Ed(e))throw Error(j(200));return uT(t,e,null,n)};bt.createRoot=function(t,e){if(!Ed(t))throw Error(j(299));var n=!1,r="",s=Yv;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(r=e.identifierPrefix),e.onRecoverableError!==void 0&&(s=e.onRecoverableError)),e=vd(t,1,!1,null,null,n,!1,r,s),t[Sn]=e.current,Qi(t.nodeType===8?t.parentNode:t),new wd(e)};bt.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(j(188)):(t=Object.keys(t).join(","),Error(j(268,t)));return t=vy(e),t=t===null?null:t.stateNode,t};bt.flushSync=function(t){return Mr(t)};bt.hydrate=function(t,e,n){if(!$l(e))throw Error(j(200));return Bl(null,t,e,!0,n)};bt.hydrateRoot=function(t,e,n){if(!Ed(t))throw Error(j(405));var r=n!=null&&n.hydratedSources||null,s=!1,i="",o=Yv;if(n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=Qv(e,null,t,1,n??null,s,!1,i,o),t[Sn]=e.current,Qi(t),r)for(t=0;t<r.length;t++)n=r[t],s=n._getVersion,s=s(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,s]:e.mutableSourceEagerHydrationData.push(n,s);return new zl(e)};bt.render=function(t,e,n){if(!$l(e))throw Error(j(200));return Bl(null,t,e,!1,n)};bt.unmountComponentAtNode=function(t){if(!$l(t))throw Error(j(40));return t._reactRootContainer?(Mr(function(){Bl(null,null,t,!1,function(){t._reactRootContainer=null,t[Sn]=null})}),!0):!1};bt.unstable_batchedUpdates=pd;bt.unstable_renderSubtreeIntoContainer=function(t,e,n,r){if(!$l(n))throw Error(j(200));if(t==null||t._reactInternals===void 0)throw Error(j(38));return Bl(t,e,n,!1,r)};bt.version="18.3.1-next-f1338f8080-20240426";function Jv(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Jv)}catch(t){console.error(t)}}Jv(),Jg.exports=bt;var pT=Jg.exports,Tm=pT;cc.createRoot=Tm.createRoot,cc.hydrateRoot=Tm.hydrateRoot;var Im={};/**
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
 */const Xv=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},mT=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[n++],o=t[n++],l=t[n++],u=((s&7)<<18|(i&63)<<12|(o&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const i=t[n++],o=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Zv={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const i=t[s],o=s+1<t.length,l=o?t[s+1]:0,u=s+2<t.length,h=u?t[s+2]:0,p=i>>2,m=(i&3)<<4|l>>4;let v=(l&15)<<2|h>>6,_=h&63;u||(_=64,o||(v=64)),r.push(n[p],n[m],n[v],n[_])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Xv(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):mT(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const i=n[t.charAt(s++)],l=s<t.length?n[t.charAt(s)]:0;++s;const h=s<t.length?n[t.charAt(s)]:64;++s;const m=s<t.length?n[t.charAt(s)]:64;if(++s,i==null||l==null||h==null||m==null)throw new gT;const v=i<<2|l>>4;if(r.push(v),h!==64){const _=l<<4&240|h>>2;if(r.push(_),m!==64){const C=h<<6&192|m;r.push(C)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class gT extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const yT=function(t){const e=Xv(t);return Zv.encodeByteArray(e,!0)},cl=function(t){return yT(t).replace(/\./g,"")},e0=function(t){try{return Zv.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function vT(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const _T=()=>vT().__FIREBASE_DEFAULTS__,wT=()=>{if(typeof process>"u"||typeof Im>"u")return;const t=Im.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},ET=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&e0(t[1]);return e&&JSON.parse(e)},Wl=()=>{try{return _T()||wT()||ET()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},t0=t=>{var e,n;return(n=(e=Wl())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},TT=t=>{const e=t0(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},n0=()=>{var t;return(t=Wl())===null||t===void 0?void 0:t.config},r0=t=>{var e;return(e=Wl())===null||e===void 0?void 0:e[`_${t}`]};/**
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
 */class IT{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
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
 */function xT(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",s=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},t);return[cl(JSON.stringify(n)),cl(JSON.stringify(o)),""].join(".")}/**
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
 */function ft(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function ST(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ft())}function kT(){var t;const e=(t=Wl())===null||t===void 0?void 0:t.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function AT(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function CT(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function RT(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function PT(){const t=ft();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function NT(){return!kT()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function bT(){try{return typeof indexedDB=="object"}catch{return!1}}function DT(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){e(n)}})}/**
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
 */const OT="FirebaseError";class Vn extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=OT,Object.setPrototypeOf(this,Vn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Eo.prototype.create)}}class Eo{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?VT(i,r):"Error",l=`${this.serviceName}: ${o} (${s}).`;return new Vn(s,l,r)}}function VT(t,e){return t.replace(LT,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const LT=/\{\$([^}]+)}/g;function MT(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function hl(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const i=t[s],o=e[s];if(xm(i)&&xm(o)){if(!hl(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function xm(t){return t!==null&&typeof t=="object"}/**
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
 */function To(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function jT(t,e){const n=new FT(t,e);return n.subscribe.bind(n)}class FT{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");UT(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=Xu),s.error===void 0&&(s.error=Xu),s.complete===void 0&&(s.complete=Xu);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function UT(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Xu(){}/**
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
 */function $t(t){return t&&t._delegate?t._delegate:t}class jr{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const xr="[DEFAULT]";/**
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
 */class zT{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new IT;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(BT(e))try{this.getOrInitializeService({instanceIdentifier:xr})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=xr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=xr){return this.instances.has(e)}getOptions(e=xr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);r===l&&o.resolve(s)}return s}onInit(e,n){var r;const s=this.normalizeInstanceIdentifier(n),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:$T(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=xr){return this.component?this.component.multipleInstances?e:xr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function $T(t){return t===xr?void 0:t}function BT(t){return t.instantiationMode==="EAGER"}/**
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
 */class WT{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new zT(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var de;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(de||(de={}));const HT={debug:de.DEBUG,verbose:de.VERBOSE,info:de.INFO,warn:de.WARN,error:de.ERROR,silent:de.SILENT},qT=de.INFO,KT={[de.DEBUG]:"log",[de.VERBOSE]:"log",[de.INFO]:"info",[de.WARN]:"warn",[de.ERROR]:"error"},GT=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=KT[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Td{constructor(e){this.name=e,this._logLevel=qT,this._logHandler=GT,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in de))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?HT[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,de.DEBUG,...e),this._logHandler(this,de.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,de.VERBOSE,...e),this._logHandler(this,de.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,de.INFO,...e),this._logHandler(this,de.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,de.WARN,...e),this._logHandler(this,de.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,de.ERROR,...e),this._logHandler(this,de.ERROR,...e)}}const QT=(t,e)=>e.some(n=>t instanceof n);let Sm,km;function YT(){return Sm||(Sm=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function JT(){return km||(km=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const s0=new WeakMap,rh=new WeakMap,i0=new WeakMap,Zu=new WeakMap,Id=new WeakMap;function XT(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(ar(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&s0.set(n,t)}).catch(()=>{}),Id.set(e,t),e}function ZT(t){if(rh.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});rh.set(t,e)}let sh={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return rh.get(t);if(e==="objectStoreNames")return t.objectStoreNames||i0.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return ar(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function eI(t){sh=t(sh)}function tI(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(ec(this),e,...n);return i0.set(r,e.sort?e.sort():[e]),ar(r)}:JT().includes(t)?function(...e){return t.apply(ec(this),e),ar(s0.get(this))}:function(...e){return ar(t.apply(ec(this),e))}}function nI(t){return typeof t=="function"?tI(t):(t instanceof IDBTransaction&&ZT(t),QT(t,YT())?new Proxy(t,sh):t)}function ar(t){if(t instanceof IDBRequest)return XT(t);if(Zu.has(t))return Zu.get(t);const e=nI(t);return e!==t&&(Zu.set(t,e),Id.set(e,t)),e}const ec=t=>Id.get(t);function rI(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),l=ar(o);return r&&o.addEventListener("upgradeneeded",u=>{r(ar(o.result),u.oldVersion,u.newVersion,ar(o.transaction),u)}),n&&o.addEventListener("blocked",u=>n(u.oldVersion,u.newVersion,u)),l.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),l}const sI=["get","getKey","getAll","getAllKeys","count"],iI=["put","add","delete","clear"],tc=new Map;function Am(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(tc.get(e))return tc.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=iI.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||sI.includes(n)))return;const i=async function(o,...l){const u=this.transaction(o,s?"readwrite":"readonly");let h=u.store;return r&&(h=h.index(l.shift())),(await Promise.all([h[n](...l),s&&u.done]))[0]};return tc.set(e,i),i}eI(t=>({...t,get:(e,n,r)=>Am(e,n)||t.get(e,n,r),has:(e,n)=>!!Am(e,n)||t.has(e,n)}));/**
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
 */class oI{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(aI(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function aI(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const ih="@firebase/app",Cm="0.10.13";/**
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
 */const Cn=new Td("@firebase/app"),lI="@firebase/app-compat",uI="@firebase/analytics-compat",cI="@firebase/analytics",hI="@firebase/app-check-compat",dI="@firebase/app-check",fI="@firebase/auth",pI="@firebase/auth-compat",mI="@firebase/database",gI="@firebase/data-connect",yI="@firebase/database-compat",vI="@firebase/functions",_I="@firebase/functions-compat",wI="@firebase/installations",EI="@firebase/installations-compat",TI="@firebase/messaging",II="@firebase/messaging-compat",xI="@firebase/performance",SI="@firebase/performance-compat",kI="@firebase/remote-config",AI="@firebase/remote-config-compat",CI="@firebase/storage",RI="@firebase/storage-compat",PI="@firebase/firestore",NI="@firebase/vertexai-preview",bI="@firebase/firestore-compat",DI="firebase",OI="10.14.1";/**
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
 */const oh="[DEFAULT]",VI={[ih]:"fire-core",[lI]:"fire-core-compat",[cI]:"fire-analytics",[uI]:"fire-analytics-compat",[dI]:"fire-app-check",[hI]:"fire-app-check-compat",[fI]:"fire-auth",[pI]:"fire-auth-compat",[mI]:"fire-rtdb",[gI]:"fire-data-connect",[yI]:"fire-rtdb-compat",[vI]:"fire-fn",[_I]:"fire-fn-compat",[wI]:"fire-iid",[EI]:"fire-iid-compat",[TI]:"fire-fcm",[II]:"fire-fcm-compat",[xI]:"fire-perf",[SI]:"fire-perf-compat",[kI]:"fire-rc",[AI]:"fire-rc-compat",[CI]:"fire-gcs",[RI]:"fire-gcs-compat",[PI]:"fire-fst",[bI]:"fire-fst-compat",[NI]:"fire-vertex","fire-js":"fire-js",[DI]:"fire-js-all"};/**
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
 */const dl=new Map,LI=new Map,ah=new Map;function Rm(t,e){try{t.container.addComponent(e)}catch(n){Cn.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function bs(t){const e=t.name;if(ah.has(e))return Cn.debug(`There were multiple attempts to register component ${e}.`),!1;ah.set(e,t);for(const n of dl.values())Rm(n,t);for(const n of LI.values())Rm(n,t);return!0}function xd(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function nn(t){return t.settings!==void 0}/**
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
 */const MI={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},lr=new Eo("app","Firebase",MI);/**
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
 */class jI{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new jr("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw lr.create("app-deleted",{appName:this._name})}}/**
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
 */const Bs=OI;function o0(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:oh,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw lr.create("bad-app-name",{appName:String(s)});if(n||(n=n0()),!n)throw lr.create("no-options");const i=dl.get(s);if(i){if(hl(n,i.options)&&hl(r,i.config))return i;throw lr.create("duplicate-app",{appName:s})}const o=new WT(s);for(const u of ah.values())o.addComponent(u);const l=new jI(n,r,o);return dl.set(s,l),l}function a0(t=oh){const e=dl.get(t);if(!e&&t===oh&&n0())return o0();if(!e)throw lr.create("no-app",{appName:t});return e}function ur(t,e,n){var r;let s=(r=VI[t])!==null&&r!==void 0?r:t;n&&(s+=`-${n}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const l=[`Unable to register library "${s}" with version "${e}":`];i&&l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&l.push("and"),o&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Cn.warn(l.join(" "));return}bs(new jr(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const FI="firebase-heartbeat-database",UI=1,so="firebase-heartbeat-store";let nc=null;function l0(){return nc||(nc=rI(FI,UI,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(so)}catch(n){console.warn(n)}}}}).catch(t=>{throw lr.create("idb-open",{originalErrorMessage:t.message})})),nc}async function zI(t){try{const n=(await l0()).transaction(so),r=await n.objectStore(so).get(u0(t));return await n.done,r}catch(e){if(e instanceof Vn)Cn.warn(e.message);else{const n=lr.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Cn.warn(n.message)}}}async function Pm(t,e){try{const r=(await l0()).transaction(so,"readwrite");await r.objectStore(so).put(e,u0(t)),await r.done}catch(n){if(n instanceof Vn)Cn.warn(n.message);else{const r=lr.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Cn.warn(r.message)}}}function u0(t){return`${t.name}!${t.options.appId}`}/**
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
 */const $I=1024,BI=30*24*60*60*1e3;class WI{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new qI(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Nm();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i)?void 0:(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const l=new Date(o.date).valueOf();return Date.now()-l<=BI}),this._storage.overwrite(this._heartbeatsCache))}catch(r){Cn.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Nm(),{heartbeatsToSend:r,unsentEntries:s}=HI(this._heartbeatsCache.heartbeats),i=cl(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(n){return Cn.warn(n),""}}}function Nm(){return new Date().toISOString().substring(0,10)}function HI(t,e=$I){const n=[];let r=t.slice();for(const s of t){const i=n.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),bm(n)>e){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),bm(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class qI{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return bT()?DT().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await zI(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return Pm(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return Pm(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function bm(t){return cl(JSON.stringify({version:2,heartbeats:t})).length}/**
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
 */function KI(t){bs(new jr("platform-logger",e=>new oI(e),"PRIVATE")),bs(new jr("heartbeat",e=>new WI(e),"PRIVATE")),ur(ih,Cm,t),ur(ih,Cm,"esm2017"),ur("fire-js","")}KI("");var GI="firebase",QI="10.14.1";/**
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
 */ur(GI,QI,"app");function Sd(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(t);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(t,r[s])&&(n[r[s]]=t[r[s]]);return n}function c0(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const YI=c0,h0=new Eo("auth","Firebase",c0());/**
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
 */const fl=new Td("@firebase/auth");function JI(t,...e){fl.logLevel<=de.WARN&&fl.warn(`Auth (${Bs}): ${t}`,...e)}function Na(t,...e){fl.logLevel<=de.ERROR&&fl.error(`Auth (${Bs}): ${t}`,...e)}/**
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
 */function Rn(t,...e){throw kd(t,...e)}function on(t,...e){return kd(t,...e)}function d0(t,e,n){const r=Object.assign(Object.assign({},YI()),{[e]:n});return new Eo("auth","Firebase",r).create(e,{appName:t.name})}function Tn(t){return d0(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function kd(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return h0.create(t,...e)}function te(t,e,...n){if(!t)throw kd(e,...n)}function vn(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Na(e),new Error(e)}function Pn(t,e){t||vn(e)}/**
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
 */function lh(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function XI(){return Dm()==="http:"||Dm()==="https:"}function Dm(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
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
 */function ZI(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(XI()||CT()||"connection"in navigator)?navigator.onLine:!0}function ex(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
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
 */class Io{constructor(e,n){this.shortDelay=e,this.longDelay=n,Pn(n>e,"Short delay should be less than long delay!"),this.isMobile=ST()||RT()}get(){return ZI()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Ad(t,e){Pn(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
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
 */class f0{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;vn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;vn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;vn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const tx={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const nx=new Io(3e4,6e4);function xo(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function Ws(t,e,n,r,s={}){return p0(t,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const l=To(Object.assign({key:t.config.apiKey},o)).slice(1),u=await t._getAdditionalHeaders();u["Content-Type"]="application/json",t.languageCode&&(u["X-Firebase-Locale"]=t.languageCode);const h=Object.assign({method:e,headers:u},i);return AT()||(h.referrerPolicy="no-referrer"),f0.fetch()(m0(t,t.config.apiHost,n,l),h)})}async function p0(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},tx),e);try{const s=new rx(t),i=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw fa(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const l=i.ok?o.errorMessage:o.error.message,[u,h]=l.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw fa(t,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw fa(t,"email-already-in-use",o);if(u==="USER_DISABLED")throw fa(t,"user-disabled",o);const p=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw d0(t,p,h);Rn(t,p)}}catch(s){if(s instanceof Vn)throw s;Rn(t,"network-request-failed",{message:String(s)})}}async function Cd(t,e,n,r,s={}){const i=await Ws(t,e,n,r,s);return"mfaPendingCredential"in i&&Rn(t,"multi-factor-auth-required",{_serverResponse:i}),i}function m0(t,e,n,r){const s=`${e}${n}?${r}`;return t.config.emulator?Ad(t.config,s):`${t.config.apiScheme}://${s}`}class rx{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(on(this.auth,"network-request-failed")),nx.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function fa(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=on(t,e,r);return s.customData._tokenResponse=n,s}/**
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
 */async function sx(t,e){return Ws(t,"POST","/v1/accounts:delete",e)}async function g0(t,e){return Ws(t,"POST","/v1/accounts:lookup",e)}/**
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
 */function Li(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function ix(t,e=!1){const n=$t(t),r=await n.getIdToken(e),s=Rd(r);te(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:Li(rc(s.auth_time)),issuedAtTime:Li(rc(s.iat)),expirationTime:Li(rc(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function rc(t){return Number(t)*1e3}function Rd(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return Na("JWT malformed, contained fewer than 3 sections"),null;try{const s=e0(n);return s?JSON.parse(s):(Na("Failed to decode base64 JWT payload"),null)}catch(s){return Na("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Om(t){const e=Rd(t);return te(e,"internal-error"),te(typeof e.exp<"u","internal-error"),te(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function io(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof Vn&&ox(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function ox({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
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
 */class ax{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class uh{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Li(this.lastLoginAt),this.creationTime=Li(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function pl(t){var e;const n=t.auth,r=await t.getIdToken(),s=await io(t,g0(n,{idToken:r}));te(s==null?void 0:s.users.length,n,"internal-error");const i=s.users[0];t._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?y0(i.providerUserInfo):[],l=ux(t.providerData,o),u=t.isAnonymous,h=!(t.email&&i.passwordHash)&&!(l!=null&&l.length),p=u?h:!1,m={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:l,metadata:new uh(i.createdAt,i.lastLoginAt),isAnonymous:p};Object.assign(t,m)}async function lx(t){const e=$t(t);await pl(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function ux(t,e){return[...t.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function y0(t){return t.map(e=>{var{providerId:n}=e,r=Sd(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
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
 */async function cx(t,e){const n=await p0(t,{},async()=>{const r=To({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=t.config,o=m0(t,s,"/v1/token",`key=${i}`),l=await t._getAdditionalHeaders();return l["Content-Type"]="application/x-www-form-urlencoded",f0.fetch()(o,{method:"POST",headers:l,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function hx(t,e){return Ws(t,"POST","/v2/accounts:revokeToken",xo(t,e))}/**
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
 */class ws{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){te(e.idToken,"internal-error"),te(typeof e.idToken<"u","internal-error"),te(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Om(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){te(e.length!==0,"internal-error");const n=Om(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(te(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:i}=await cx(e,n);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:i}=n,o=new ws;return r&&(te(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(te(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(te(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ws,this.toJSON())}_performRefresh(){return vn("not implemented")}}/**
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
 */function Un(t,e){te(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class _n{constructor(e){var{uid:n,auth:r,stsTokenManager:s}=e,i=Sd(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new ax(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new uh(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await io(this,this.stsTokenManager.getToken(this.auth,e));return te(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return ix(this,e)}reload(){return lx(this)}_assign(e){this!==e&&(te(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new _n(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){te(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await pl(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(nn(this.auth.app))return Promise.reject(Tn(this.auth));const e=await this.getIdToken();return await io(this,sx(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,s,i,o,l,u,h,p;const m=(r=n.displayName)!==null&&r!==void 0?r:void 0,v=(s=n.email)!==null&&s!==void 0?s:void 0,_=(i=n.phoneNumber)!==null&&i!==void 0?i:void 0,C=(o=n.photoURL)!==null&&o!==void 0?o:void 0,P=(l=n.tenantId)!==null&&l!==void 0?l:void 0,O=(u=n._redirectEventId)!==null&&u!==void 0?u:void 0,S=(h=n.createdAt)!==null&&h!==void 0?h:void 0,T=(p=n.lastLoginAt)!==null&&p!==void 0?p:void 0,{uid:k,emailVerified:D,isAnonymous:F,providerData:U,stsTokenManager:E}=n;te(k&&E,e,"internal-error");const y=ws.fromJSON(this.name,E);te(typeof k=="string",e,"internal-error"),Un(m,e.name),Un(v,e.name),te(typeof D=="boolean",e,"internal-error"),te(typeof F=="boolean",e,"internal-error"),Un(_,e.name),Un(C,e.name),Un(P,e.name),Un(O,e.name),Un(S,e.name),Un(T,e.name);const w=new _n({uid:k,auth:e,email:v,emailVerified:D,displayName:m,isAnonymous:F,photoURL:C,phoneNumber:_,tenantId:P,stsTokenManager:y,createdAt:S,lastLoginAt:T});return U&&Array.isArray(U)&&(w.providerData=U.map(x=>Object.assign({},x))),O&&(w._redirectEventId=O),w}static async _fromIdTokenResponse(e,n,r=!1){const s=new ws;s.updateFromServerResponse(n);const i=new _n({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await pl(i),i}static async _fromGetAccountInfoResponse(e,n,r){const s=n.users[0];te(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?y0(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),l=new ws;l.updateFromIdToken(r);const u=new _n({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:o}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new uh(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(u,h),u}}/**
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
 */const Vm=new Map;function wn(t){Pn(t instanceof Function,"Expected a class definition");let e=Vm.get(t);return e?(Pn(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Vm.set(t,e),e)}/**
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
 */class v0{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}v0.type="NONE";const Lm=v0;/**
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
 */function ba(t,e,n){return`firebase:${t}:${e}:${n}`}class Es{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=ba(this.userKey,s.apiKey,i),this.fullPersistenceKey=ba("persistence",s.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?_n._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new Es(wn(Lm),e,r);const s=(await Promise.all(n.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||wn(Lm);const o=ba(r,e.config.apiKey,e.name);let l=null;for(const h of n)try{const p=await h._get(o);if(p){const m=_n._fromJSON(e,p);h!==i&&(l=m),i=h;break}}catch{}const u=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new Es(i,e,r):(i=u[0],l&&await i._set(o,l.toJSON()),await Promise.all(n.map(async h=>{if(h!==i)try{await h._remove(o)}catch{}})),new Es(i,e,r))}}/**
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
 */function Mm(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(T0(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(_0(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(x0(e))return"Blackberry";if(S0(e))return"Webos";if(w0(e))return"Safari";if((e.includes("chrome/")||E0(e))&&!e.includes("edge/"))return"Chrome";if(I0(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function _0(t=ft()){return/firefox\//i.test(t)}function w0(t=ft()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function E0(t=ft()){return/crios\//i.test(t)}function T0(t=ft()){return/iemobile/i.test(t)}function I0(t=ft()){return/android/i.test(t)}function x0(t=ft()){return/blackberry/i.test(t)}function S0(t=ft()){return/webos/i.test(t)}function Pd(t=ft()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function dx(t=ft()){var e;return Pd(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function fx(){return PT()&&document.documentMode===10}function k0(t=ft()){return Pd(t)||I0(t)||S0(t)||x0(t)||/windows phone/i.test(t)||T0(t)}/**
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
 */function A0(t,e=[]){let n;switch(t){case"Browser":n=Mm(ft());break;case"Worker":n=`${Mm(ft())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Bs}/${r}`}/**
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
 */class px{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=i=>new Promise((o,l)=>{try{const u=e(i);o(u)}catch(u){l(u)}});r.onAbort=n,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function mx(t,e={}){return Ws(t,"GET","/v2/passwordPolicy",xo(t,e))}/**
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
 */const gx=6;class yx{constructor(e){var n,r,s,i;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:gx,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,s,i,o,l;const u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(n=u.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),u.isValid&&(u.isValid=(r=u.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),u.isValid&&(u.isValid=(s=u.containsLowercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(i=u.containsUppercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(o=u.containsNumericCharacter)!==null&&o!==void 0?o:!0),u.isValid&&(u.isValid=(l=u.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),u}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
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
 */class vx{constructor(e,n,r,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new jm(this),this.idTokenSubscription=new jm(this),this.beforeStateQueue=new px(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=h0,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=wn(n)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await Es.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await g0(this,{idToken:e}),r=await _n._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(nn(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(l,l))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,l=s==null?void 0:s._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===l)&&(u!=null&&u.user)&&(s=u.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return te(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await pl(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=ex()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(nn(this.app))return Promise.reject(Tn(this));const n=e?$t(e):null;return n&&te(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&te(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return nn(this.app)?Promise.reject(Tn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return nn(this.app)?Promise.reject(Tn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(wn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await mx(this),n=new yx(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Eo("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await hx(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&wn(e)||this._popupRedirectResolver;te(n,this,"argument-error"),this.redirectPersistenceManager=await Es.create(this,[wn(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let o=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(te(l,this,"internal-error"),l.then(()=>{o||i(this.currentUser)}),typeof n=="function"){const u=e.addObserver(n,r,s);return()=>{o=!0,u()}}else{const u=e.addObserver(n);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return te(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=A0(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(n["X-Firebase-AppCheck"]=s),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&JI(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function So(t){return $t(t)}class jm{constructor(e){this.auth=e,this.observer=null,this.addObserver=jT(n=>this.observer=n)}get next(){return te(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Nd={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function _x(t){Nd=t}function wx(t){return Nd.loadJS(t)}function Ex(){return Nd.gapiScript}function Tx(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
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
 */function Ix(t,e){const n=xd(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),i=n.getOptions();if(hl(i,e??{}))return s;Rn(s,"already-initialized")}return n.initialize({options:e})}function xx(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(wn);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Sx(t,e,n){const r=So(t);te(r._canInitEmulator,r,"emulator-config-failed"),te(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=C0(e),{host:o,port:l}=kx(e),u=l===null?"":`:${l}`;r.config.emulator={url:`${i}//${o}${u}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:l,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),Ax()}function C0(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function kx(t){const e=C0(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Fm(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:Fm(o)}}}function Fm(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function Ax(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
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
 */class R0{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return vn("not implemented")}_getIdTokenResponse(e){return vn("not implemented")}_linkToIdToken(e,n){return vn("not implemented")}_getReauthenticationResolver(e){return vn("not implemented")}}/**
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
 */async function Ts(t,e){return Cd(t,"POST","/v1/accounts:signInWithIdp",xo(t,e))}/**
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
 */const Cx="http://localhost";class Fr extends R0{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Fr(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):Rn("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=n,i=Sd(n,["providerId","signInMethod"]);if(!r||!s)return null;const o=new Fr(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Ts(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,Ts(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Ts(e,n)}buildRequest(){const e={requestUri:Cx,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=To(n)}return e}}/**
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
 */class P0{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class ko extends P0{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class qn extends ko{constructor(){super("facebook.com")}static credential(e){return Fr._fromParams({providerId:qn.PROVIDER_ID,signInMethod:qn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return qn.credentialFromTaggedObject(e)}static credentialFromError(e){return qn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return qn.credential(e.oauthAccessToken)}catch{return null}}}qn.FACEBOOK_SIGN_IN_METHOD="facebook.com";qn.PROVIDER_ID="facebook.com";/**
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
 */class Kn extends ko{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Fr._fromParams({providerId:Kn.PROVIDER_ID,signInMethod:Kn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Kn.credentialFromTaggedObject(e)}static credentialFromError(e){return Kn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return Kn.credential(n,r)}catch{return null}}}Kn.GOOGLE_SIGN_IN_METHOD="google.com";Kn.PROVIDER_ID="google.com";/**
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
 */class Gn extends ko{constructor(){super("github.com")}static credential(e){return Fr._fromParams({providerId:Gn.PROVIDER_ID,signInMethod:Gn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Gn.credentialFromTaggedObject(e)}static credentialFromError(e){return Gn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Gn.credential(e.oauthAccessToken)}catch{return null}}}Gn.GITHUB_SIGN_IN_METHOD="github.com";Gn.PROVIDER_ID="github.com";/**
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
 */class Qn extends ko{constructor(){super("twitter.com")}static credential(e,n){return Fr._fromParams({providerId:Qn.PROVIDER_ID,signInMethod:Qn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Qn.credentialFromTaggedObject(e)}static credentialFromError(e){return Qn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return Qn.credential(n,r)}catch{return null}}}Qn.TWITTER_SIGN_IN_METHOD="twitter.com";Qn.PROVIDER_ID="twitter.com";/**
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
 */async function Rx(t,e){return Cd(t,"POST","/v1/accounts:signUp",xo(t,e))}/**
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
 */class Nn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,s=!1){const i=await _n._fromIdTokenResponse(e,r,s),o=Um(r);return new Nn({user:i,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const s=Um(r);return new Nn({user:e,providerId:s,_tokenResponse:r,operationType:n})}}function Um(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
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
 */async function Px(t){var e;if(nn(t.app))return Promise.reject(Tn(t));const n=So(t);if(await n._initializationPromise,!((e=n.currentUser)===null||e===void 0)&&e.isAnonymous)return new Nn({user:n.currentUser,providerId:null,operationType:"signIn"});const r=await Rx(n,{returnSecureToken:!0}),s=await Nn._fromIdTokenResponse(n,"signIn",r,!0);return await n._updateCurrentUser(s.user),s}/**
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
 */class ml extends Vn{constructor(e,n,r,s){var i;super(n.code,n.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,ml.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,s){return new ml(e,n,r,s)}}function N0(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?ml._fromErrorAndOperation(t,i,e,r):i})}async function Nx(t,e,n=!1){const r=await io(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Nn._forOperation(t,"link",r)}/**
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
 */async function bx(t,e,n=!1){const{auth:r}=t;if(nn(r.app))return Promise.reject(Tn(r));const s="reauthenticate";try{const i=await io(t,N0(r,s,e,t),n);te(i.idToken,r,"internal-error");const o=Rd(i.idToken);te(o,r,"internal-error");const{sub:l}=o;return te(t.uid===l,r,"user-mismatch"),Nn._forOperation(t,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&Rn(r,"user-mismatch"),i}}/**
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
 */async function Dx(t,e,n=!1){if(nn(t.app))return Promise.reject(Tn(t));const r="signIn",s=await N0(t,r,e),i=await Nn._fromIdTokenResponse(t,r,s);return n||await t._updateCurrentUser(i.user),i}/**
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
 */async function Ox(t,e){return Cd(t,"POST","/v1/accounts:signInWithCustomToken",xo(t,e))}/**
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
 */async function Vx(t,e){if(nn(t.app))return Promise.reject(Tn(t));const n=So(t),r=await Ox(n,{token:e,returnSecureToken:!0}),s=await Nn._fromIdTokenResponse(n,"signIn",r);return await n._updateCurrentUser(s.user),s}function Lx(t,e,n,r){return $t(t).onIdTokenChanged(e,n,r)}function Mx(t,e,n){return $t(t).beforeAuthStateChanged(e,n)}function jx(t,e,n,r){return $t(t).onAuthStateChanged(e,n,r)}const gl="__sak";/**
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
 */class b0{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(gl,"1"),this.storage.removeItem(gl),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const Fx=1e3,Ux=10;class D0 extends b0{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=k0(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),s=this.localCache[n];r!==s&&e(n,s,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,l,u)=>{this.notifyListeners(o,u)});return}const r=e.key;n?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);fx()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Ux):s()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},Fx)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}D0.type="LOCAL";const zx=D0;/**
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
 */class O0 extends b0{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}O0.type="SESSION";const V0=O0;/**
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
 */function $x(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
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
 */class Hl{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const r=new Hl(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:s,data:i}=n.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const l=Array.from(o).map(async h=>h(n.origin,i)),u=await $x(l);n.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Hl.receivers=[];/**
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
 */function bd(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
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
 */class Bx{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((l,u)=>{const h=bd("",20);s.port1.start();const p=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(m){const v=m;if(v.data.eventId===h)switch(v.data.status){case"ack":clearTimeout(p),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),l(v.data.response);break;default:clearTimeout(p),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function an(){return window}function Wx(t){an().location.href=t}/**
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
 */function L0(){return typeof an().WorkerGlobalScope<"u"&&typeof an().importScripts=="function"}async function Hx(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function qx(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function Kx(){return L0()?self:null}/**
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
 */const M0="firebaseLocalStorageDb",Gx=1,yl="firebaseLocalStorage",j0="fbase_key";class Ao{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function ql(t,e){return t.transaction([yl],e?"readwrite":"readonly").objectStore(yl)}function Qx(){const t=indexedDB.deleteDatabase(M0);return new Ao(t).toPromise()}function ch(){const t=indexedDB.open(M0,Gx);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(yl,{keyPath:j0})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(yl)?e(r):(r.close(),await Qx(),e(await ch()))})})}async function zm(t,e,n){const r=ql(t,!0).put({[j0]:e,value:n});return new Ao(r).toPromise()}async function Yx(t,e){const n=ql(t,!1).get(e),r=await new Ao(n).toPromise();return r===void 0?null:r.value}function $m(t,e){const n=ql(t,!0).delete(e);return new Ao(n).toPromise()}const Jx=800,Xx=3;class F0{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await ch(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>Xx)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return L0()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Hl._getInstance(Kx()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await Hx(),!this.activeServiceWorker)return;this.sender=new Bx(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||qx()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await ch();return await zm(e,gl,"1"),await $m(e,gl),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>zm(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>Yx(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>$m(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=ql(s,!1).getAll();return new Ao(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Jx)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}F0.type="LOCAL";const Zx=F0;new Io(3e4,6e4);/**
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
 */function eS(t,e){return e?wn(e):(te(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
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
 */class Dd extends R0{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Ts(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Ts(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Ts(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function tS(t){return Dx(t.auth,new Dd(t),t.bypassAuthState)}function nS(t){const{auth:e,user:n}=t;return te(n,e,"internal-error"),bx(n,new Dd(t),t.bypassAuthState)}async function rS(t){const{auth:e,user:n}=t;return te(n,e,"internal-error"),Nx(n,new Dd(t),t.bypassAuthState)}/**
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
 */class U0{constructor(e,n,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:s,tenantId:i,error:o,type:l}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:n,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(u))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return tS;case"linkViaPopup":case"linkViaRedirect":return rS;case"reauthViaPopup":case"reauthViaRedirect":return nS;default:Rn(this.auth,"internal-error")}}resolve(e){Pn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Pn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const sS=new Io(2e3,1e4);class fs extends U0{constructor(e,n,r,s,i){super(e,n,s,i),this.provider=r,this.authWindow=null,this.pollId=null,fs.currentPopupAction&&fs.currentPopupAction.cancel(),fs.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return te(e,this.auth,"internal-error"),e}async onExecution(){Pn(this.filter.length===1,"Popup operations only handle one event");const e=bd();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(on(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(on(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,fs.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(on(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,sS.get())};e()}}fs.currentPopupAction=null;/**
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
 */const iS="pendingRedirect",Da=new Map;class oS extends U0{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=Da.get(this.auth._key());if(!e){try{const r=await aS(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}Da.set(this.auth._key(),e)}return this.bypassAuthState||Da.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function aS(t,e){const n=cS(e),r=uS(t);if(!await r._isAvailable())return!1;const s=await r._get(n)==="true";return await r._remove(n),s}function lS(t,e){Da.set(t._key(),e)}function uS(t){return wn(t._redirectPersistence)}function cS(t){return ba(iS,t.config.apiKey,t.name)}async function hS(t,e,n=!1){if(nn(t.app))return Promise.reject(Tn(t));const r=So(t),s=eS(r,e),o=await new oS(r,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
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
 */const dS=10*60*1e3;class fS{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!pS(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!z0(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(on(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=dS&&this.cachedEventUids.clear(),this.cachedEventUids.has(Bm(e))}saveEventToCache(e){this.cachedEventUids.add(Bm(e)),this.lastProcessedEventTime=Date.now()}}function Bm(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function z0({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function pS(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return z0(t);default:return!1}}/**
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
 */async function mS(t,e={}){return Ws(t,"GET","/v1/projects",e)}/**
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
 */const gS=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,yS=/^https?/;async function vS(t){if(t.config.emulator)return;const{authorizedDomains:e}=await mS(t);for(const n of e)try{if(_S(n))return}catch{}Rn(t,"unauthorized-domain")}function _S(t){const e=lh(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!yS.test(n))return!1;if(gS.test(t))return r===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const wS=new Io(3e4,6e4);function Wm(){const t=an().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function ES(t){return new Promise((e,n)=>{var r,s,i;function o(){Wm(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Wm(),n(on(t,"network-request-failed"))},timeout:wS.get()})}if(!((s=(r=an().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=an().gapi)===null||i===void 0)&&i.load)o();else{const l=Tx("iframefcb");return an()[l]=()=>{gapi.load?o():n(on(t,"network-request-failed"))},wx(`${Ex()}?onload=${l}`).catch(u=>n(u))}}).catch(e=>{throw Oa=null,e})}let Oa=null;function TS(t){return Oa=Oa||ES(t),Oa}/**
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
 */const IS=new Io(5e3,15e3),xS="__/auth/iframe",SS="emulator/auth/iframe",kS={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},AS=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function CS(t){const e=t.config;te(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Ad(e,SS):`https://${t.config.authDomain}/${xS}`,r={apiKey:e.apiKey,appName:t.name,v:Bs},s=AS.get(t.config.apiHost);s&&(r.eid=s);const i=t._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${To(r).slice(1)}`}async function RS(t){const e=await TS(t),n=an().gapi;return te(n,t,"internal-error"),e.open({where:document.body,url:CS(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:kS,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=on(t,"network-request-failed"),l=an().setTimeout(()=>{i(o)},IS.get());function u(){an().clearTimeout(l),s(r)}r.ping(u).then(u,()=>{i(o)})}))}/**
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
 */const PS={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},NS=500,bS=600,DS="_blank",OS="http://localhost";class Hm{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function VS(t,e,n,r=NS,s=bS){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const u=Object.assign(Object.assign({},PS),{width:r.toString(),height:s.toString(),top:i,left:o}),h=ft().toLowerCase();n&&(l=E0(h)?DS:n),_0(h)&&(e=e||OS,u.scrollbars="yes");const p=Object.entries(u).reduce((v,[_,C])=>`${v}${_}=${C},`,"");if(dx(h)&&l!=="_self")return LS(e||"",l),new Hm(null);const m=window.open(e||"",l,p);te(m,t,"popup-blocked");try{m.focus()}catch{}return new Hm(m)}function LS(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
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
 */const MS="__/auth/handler",jS="emulator/auth/handler",FS=encodeURIComponent("fac");async function qm(t,e,n,r,s,i){te(t.config.authDomain,t,"auth-domain-config-required"),te(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:Bs,eventId:s};if(e instanceof P0){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",MT(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[p,m]of Object.entries({}))o[p]=m}if(e instanceof ko){const p=e.getScopes().filter(m=>m!=="");p.length>0&&(o.scopes=p.join(","))}t.tenantId&&(o.tid=t.tenantId);const l=o;for(const p of Object.keys(l))l[p]===void 0&&delete l[p];const u=await t._getAppCheckToken(),h=u?`#${FS}=${encodeURIComponent(u)}`:"";return`${US(t)}?${To(l).slice(1)}${h}`}function US({config:t}){return t.emulator?Ad(t,jS):`https://${t.authDomain}/${MS}`}/**
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
 */const sc="webStorageSupport";class zS{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=V0,this._completeRedirectFn=hS,this._overrideRedirectResult=lS}async _openPopup(e,n,r,s){var i;Pn((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await qm(e,n,r,lh(),s);return VS(e,o,bd())}async _openRedirect(e,n,r,s){await this._originValidation(e);const i=await qm(e,n,r,lh(),s);return Wx(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:i}=this.eventManagers[n];return s?Promise.resolve(s):(Pn(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await RS(e),r=new fS(e);return n.register("authEvent",s=>(te(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(sc,{type:sc},s=>{var i;const o=(i=s==null?void 0:s[0])===null||i===void 0?void 0:i[sc];o!==void 0&&n(!!o),Rn(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=vS(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return k0()||w0()||Pd()}}const $S=zS;var Km="@firebase/auth",Gm="1.7.9";/**
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
 */class BS{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){te(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function WS(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function HS(t){bs(new jr("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:l}=r.options;te(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:o,authDomain:l,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:A0(t)},h=new vx(r,s,i,u);return xx(h,n),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),bs(new jr("auth-internal",e=>{const n=So(e.getProvider("auth").getImmediate());return(r=>new BS(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),ur(Km,Gm,WS(t)),ur(Km,Gm,"esm2017")}/**
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
 */const qS=5*60,KS=r0("authIdTokenMaxAge")||qS;let Qm=null;const GS=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>KS)return;const s=n==null?void 0:n.token;Qm!==s&&(Qm=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function QS(t=a0()){const e=xd(t,"auth");if(e.isInitialized())return e.getImmediate();const n=Ix(t,{popupRedirectResolver:$S,persistence:[Zx,zx,V0]}),r=r0("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=GS(i.toString());Mx(n,o,()=>o(n.currentUser)),Lx(n,l=>o(l))}}const s=t0("auth");return s&&Sx(n,`http://${s}`),n}function YS(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}_x({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=s=>{const i=on("internal-error");i.customData=s,n(i)},r.type="text/javascript",r.charset="UTF-8",YS().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});HS("Browser");var Ym=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Nr,$0;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,y){function w(){}w.prototype=y.prototype,E.D=y.prototype,E.prototype=new w,E.prototype.constructor=E,E.C=function(x,A,R){for(var I=Array(arguments.length-2),G=2;G<arguments.length;G++)I[G-2]=arguments[G];return y.prototype[A].apply(x,I)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(E,y,w){w||(w=0);var x=Array(16);if(typeof y=="string")for(var A=0;16>A;++A)x[A]=y.charCodeAt(w++)|y.charCodeAt(w++)<<8|y.charCodeAt(w++)<<16|y.charCodeAt(w++)<<24;else for(A=0;16>A;++A)x[A]=y[w++]|y[w++]<<8|y[w++]<<16|y[w++]<<24;y=E.g[0],w=E.g[1],A=E.g[2];var R=E.g[3],I=y+(R^w&(A^R))+x[0]+3614090360&4294967295;y=w+(I<<7&4294967295|I>>>25),I=R+(A^y&(w^A))+x[1]+3905402710&4294967295,R=y+(I<<12&4294967295|I>>>20),I=A+(w^R&(y^w))+x[2]+606105819&4294967295,A=R+(I<<17&4294967295|I>>>15),I=w+(y^A&(R^y))+x[3]+3250441966&4294967295,w=A+(I<<22&4294967295|I>>>10),I=y+(R^w&(A^R))+x[4]+4118548399&4294967295,y=w+(I<<7&4294967295|I>>>25),I=R+(A^y&(w^A))+x[5]+1200080426&4294967295,R=y+(I<<12&4294967295|I>>>20),I=A+(w^R&(y^w))+x[6]+2821735955&4294967295,A=R+(I<<17&4294967295|I>>>15),I=w+(y^A&(R^y))+x[7]+4249261313&4294967295,w=A+(I<<22&4294967295|I>>>10),I=y+(R^w&(A^R))+x[8]+1770035416&4294967295,y=w+(I<<7&4294967295|I>>>25),I=R+(A^y&(w^A))+x[9]+2336552879&4294967295,R=y+(I<<12&4294967295|I>>>20),I=A+(w^R&(y^w))+x[10]+4294925233&4294967295,A=R+(I<<17&4294967295|I>>>15),I=w+(y^A&(R^y))+x[11]+2304563134&4294967295,w=A+(I<<22&4294967295|I>>>10),I=y+(R^w&(A^R))+x[12]+1804603682&4294967295,y=w+(I<<7&4294967295|I>>>25),I=R+(A^y&(w^A))+x[13]+4254626195&4294967295,R=y+(I<<12&4294967295|I>>>20),I=A+(w^R&(y^w))+x[14]+2792965006&4294967295,A=R+(I<<17&4294967295|I>>>15),I=w+(y^A&(R^y))+x[15]+1236535329&4294967295,w=A+(I<<22&4294967295|I>>>10),I=y+(A^R&(w^A))+x[1]+4129170786&4294967295,y=w+(I<<5&4294967295|I>>>27),I=R+(w^A&(y^w))+x[6]+3225465664&4294967295,R=y+(I<<9&4294967295|I>>>23),I=A+(y^w&(R^y))+x[11]+643717713&4294967295,A=R+(I<<14&4294967295|I>>>18),I=w+(R^y&(A^R))+x[0]+3921069994&4294967295,w=A+(I<<20&4294967295|I>>>12),I=y+(A^R&(w^A))+x[5]+3593408605&4294967295,y=w+(I<<5&4294967295|I>>>27),I=R+(w^A&(y^w))+x[10]+38016083&4294967295,R=y+(I<<9&4294967295|I>>>23),I=A+(y^w&(R^y))+x[15]+3634488961&4294967295,A=R+(I<<14&4294967295|I>>>18),I=w+(R^y&(A^R))+x[4]+3889429448&4294967295,w=A+(I<<20&4294967295|I>>>12),I=y+(A^R&(w^A))+x[9]+568446438&4294967295,y=w+(I<<5&4294967295|I>>>27),I=R+(w^A&(y^w))+x[14]+3275163606&4294967295,R=y+(I<<9&4294967295|I>>>23),I=A+(y^w&(R^y))+x[3]+4107603335&4294967295,A=R+(I<<14&4294967295|I>>>18),I=w+(R^y&(A^R))+x[8]+1163531501&4294967295,w=A+(I<<20&4294967295|I>>>12),I=y+(A^R&(w^A))+x[13]+2850285829&4294967295,y=w+(I<<5&4294967295|I>>>27),I=R+(w^A&(y^w))+x[2]+4243563512&4294967295,R=y+(I<<9&4294967295|I>>>23),I=A+(y^w&(R^y))+x[7]+1735328473&4294967295,A=R+(I<<14&4294967295|I>>>18),I=w+(R^y&(A^R))+x[12]+2368359562&4294967295,w=A+(I<<20&4294967295|I>>>12),I=y+(w^A^R)+x[5]+4294588738&4294967295,y=w+(I<<4&4294967295|I>>>28),I=R+(y^w^A)+x[8]+2272392833&4294967295,R=y+(I<<11&4294967295|I>>>21),I=A+(R^y^w)+x[11]+1839030562&4294967295,A=R+(I<<16&4294967295|I>>>16),I=w+(A^R^y)+x[14]+4259657740&4294967295,w=A+(I<<23&4294967295|I>>>9),I=y+(w^A^R)+x[1]+2763975236&4294967295,y=w+(I<<4&4294967295|I>>>28),I=R+(y^w^A)+x[4]+1272893353&4294967295,R=y+(I<<11&4294967295|I>>>21),I=A+(R^y^w)+x[7]+4139469664&4294967295,A=R+(I<<16&4294967295|I>>>16),I=w+(A^R^y)+x[10]+3200236656&4294967295,w=A+(I<<23&4294967295|I>>>9),I=y+(w^A^R)+x[13]+681279174&4294967295,y=w+(I<<4&4294967295|I>>>28),I=R+(y^w^A)+x[0]+3936430074&4294967295,R=y+(I<<11&4294967295|I>>>21),I=A+(R^y^w)+x[3]+3572445317&4294967295,A=R+(I<<16&4294967295|I>>>16),I=w+(A^R^y)+x[6]+76029189&4294967295,w=A+(I<<23&4294967295|I>>>9),I=y+(w^A^R)+x[9]+3654602809&4294967295,y=w+(I<<4&4294967295|I>>>28),I=R+(y^w^A)+x[12]+3873151461&4294967295,R=y+(I<<11&4294967295|I>>>21),I=A+(R^y^w)+x[15]+530742520&4294967295,A=R+(I<<16&4294967295|I>>>16),I=w+(A^R^y)+x[2]+3299628645&4294967295,w=A+(I<<23&4294967295|I>>>9),I=y+(A^(w|~R))+x[0]+4096336452&4294967295,y=w+(I<<6&4294967295|I>>>26),I=R+(w^(y|~A))+x[7]+1126891415&4294967295,R=y+(I<<10&4294967295|I>>>22),I=A+(y^(R|~w))+x[14]+2878612391&4294967295,A=R+(I<<15&4294967295|I>>>17),I=w+(R^(A|~y))+x[5]+4237533241&4294967295,w=A+(I<<21&4294967295|I>>>11),I=y+(A^(w|~R))+x[12]+1700485571&4294967295,y=w+(I<<6&4294967295|I>>>26),I=R+(w^(y|~A))+x[3]+2399980690&4294967295,R=y+(I<<10&4294967295|I>>>22),I=A+(y^(R|~w))+x[10]+4293915773&4294967295,A=R+(I<<15&4294967295|I>>>17),I=w+(R^(A|~y))+x[1]+2240044497&4294967295,w=A+(I<<21&4294967295|I>>>11),I=y+(A^(w|~R))+x[8]+1873313359&4294967295,y=w+(I<<6&4294967295|I>>>26),I=R+(w^(y|~A))+x[15]+4264355552&4294967295,R=y+(I<<10&4294967295|I>>>22),I=A+(y^(R|~w))+x[6]+2734768916&4294967295,A=R+(I<<15&4294967295|I>>>17),I=w+(R^(A|~y))+x[13]+1309151649&4294967295,w=A+(I<<21&4294967295|I>>>11),I=y+(A^(w|~R))+x[4]+4149444226&4294967295,y=w+(I<<6&4294967295|I>>>26),I=R+(w^(y|~A))+x[11]+3174756917&4294967295,R=y+(I<<10&4294967295|I>>>22),I=A+(y^(R|~w))+x[2]+718787259&4294967295,A=R+(I<<15&4294967295|I>>>17),I=w+(R^(A|~y))+x[9]+3951481745&4294967295,E.g[0]=E.g[0]+y&4294967295,E.g[1]=E.g[1]+(A+(I<<21&4294967295|I>>>11))&4294967295,E.g[2]=E.g[2]+A&4294967295,E.g[3]=E.g[3]+R&4294967295}r.prototype.u=function(E,y){y===void 0&&(y=E.length);for(var w=y-this.blockSize,x=this.B,A=this.h,R=0;R<y;){if(A==0)for(;R<=w;)s(this,E,R),R+=this.blockSize;if(typeof E=="string"){for(;R<y;)if(x[A++]=E.charCodeAt(R++),A==this.blockSize){s(this,x),A=0;break}}else for(;R<y;)if(x[A++]=E[R++],A==this.blockSize){s(this,x),A=0;break}}this.h=A,this.o+=y},r.prototype.v=function(){var E=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);E[0]=128;for(var y=1;y<E.length-8;++y)E[y]=0;var w=8*this.o;for(y=E.length-8;y<E.length;++y)E[y]=w&255,w/=256;for(this.u(E),E=Array(16),y=w=0;4>y;++y)for(var x=0;32>x;x+=8)E[w++]=this.g[y]>>>x&255;return E};function i(E,y){var w=l;return Object.prototype.hasOwnProperty.call(w,E)?w[E]:w[E]=y(E)}function o(E,y){this.h=y;for(var w=[],x=!0,A=E.length-1;0<=A;A--){var R=E[A]|0;x&&R==y||(w[A]=R,x=!1)}this.g=w}var l={};function u(E){return-128<=E&&128>E?i(E,function(y){return new o([y|0],0>y?-1:0)}):new o([E|0],0>E?-1:0)}function h(E){if(isNaN(E)||!isFinite(E))return m;if(0>E)return O(h(-E));for(var y=[],w=1,x=0;E>=w;x++)y[x]=E/w|0,w*=4294967296;return new o(y,0)}function p(E,y){if(E.length==0)throw Error("number format error: empty string");if(y=y||10,2>y||36<y)throw Error("radix out of range: "+y);if(E.charAt(0)=="-")return O(p(E.substring(1),y));if(0<=E.indexOf("-"))throw Error('number format error: interior "-" character');for(var w=h(Math.pow(y,8)),x=m,A=0;A<E.length;A+=8){var R=Math.min(8,E.length-A),I=parseInt(E.substring(A,A+R),y);8>R?(R=h(Math.pow(y,R)),x=x.j(R).add(h(I))):(x=x.j(w),x=x.add(h(I)))}return x}var m=u(0),v=u(1),_=u(16777216);t=o.prototype,t.m=function(){if(P(this))return-O(this).m();for(var E=0,y=1,w=0;w<this.g.length;w++){var x=this.i(w);E+=(0<=x?x:4294967296+x)*y,y*=4294967296}return E},t.toString=function(E){if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(C(this))return"0";if(P(this))return"-"+O(this).toString(E);for(var y=h(Math.pow(E,6)),w=this,x="";;){var A=D(w,y).g;w=S(w,A.j(y));var R=((0<w.g.length?w.g[0]:w.h)>>>0).toString(E);if(w=A,C(w))return R+x;for(;6>R.length;)R="0"+R;x=R+x}},t.i=function(E){return 0>E?0:E<this.g.length?this.g[E]:this.h};function C(E){if(E.h!=0)return!1;for(var y=0;y<E.g.length;y++)if(E.g[y]!=0)return!1;return!0}function P(E){return E.h==-1}t.l=function(E){return E=S(this,E),P(E)?-1:C(E)?0:1};function O(E){for(var y=E.g.length,w=[],x=0;x<y;x++)w[x]=~E.g[x];return new o(w,~E.h).add(v)}t.abs=function(){return P(this)?O(this):this},t.add=function(E){for(var y=Math.max(this.g.length,E.g.length),w=[],x=0,A=0;A<=y;A++){var R=x+(this.i(A)&65535)+(E.i(A)&65535),I=(R>>>16)+(this.i(A)>>>16)+(E.i(A)>>>16);x=I>>>16,R&=65535,I&=65535,w[A]=I<<16|R}return new o(w,w[w.length-1]&-2147483648?-1:0)};function S(E,y){return E.add(O(y))}t.j=function(E){if(C(this)||C(E))return m;if(P(this))return P(E)?O(this).j(O(E)):O(O(this).j(E));if(P(E))return O(this.j(O(E)));if(0>this.l(_)&&0>E.l(_))return h(this.m()*E.m());for(var y=this.g.length+E.g.length,w=[],x=0;x<2*y;x++)w[x]=0;for(x=0;x<this.g.length;x++)for(var A=0;A<E.g.length;A++){var R=this.i(x)>>>16,I=this.i(x)&65535,G=E.i(A)>>>16,Re=E.i(A)&65535;w[2*x+2*A]+=I*Re,T(w,2*x+2*A),w[2*x+2*A+1]+=R*Re,T(w,2*x+2*A+1),w[2*x+2*A+1]+=I*G,T(w,2*x+2*A+1),w[2*x+2*A+2]+=R*G,T(w,2*x+2*A+2)}for(x=0;x<y;x++)w[x]=w[2*x+1]<<16|w[2*x];for(x=y;x<2*y;x++)w[x]=0;return new o(w,0)};function T(E,y){for(;(E[y]&65535)!=E[y];)E[y+1]+=E[y]>>>16,E[y]&=65535,y++}function k(E,y){this.g=E,this.h=y}function D(E,y){if(C(y))throw Error("division by zero");if(C(E))return new k(m,m);if(P(E))return y=D(O(E),y),new k(O(y.g),O(y.h));if(P(y))return y=D(E,O(y)),new k(O(y.g),y.h);if(30<E.g.length){if(P(E)||P(y))throw Error("slowDivide_ only works with positive integers.");for(var w=v,x=y;0>=x.l(E);)w=F(w),x=F(x);var A=U(w,1),R=U(x,1);for(x=U(x,2),w=U(w,2);!C(x);){var I=R.add(x);0>=I.l(E)&&(A=A.add(w),R=I),x=U(x,1),w=U(w,1)}return y=S(E,A.j(y)),new k(A,y)}for(A=m;0<=E.l(y);){for(w=Math.max(1,Math.floor(E.m()/y.m())),x=Math.ceil(Math.log(w)/Math.LN2),x=48>=x?1:Math.pow(2,x-48),R=h(w),I=R.j(y);P(I)||0<I.l(E);)w-=x,R=h(w),I=R.j(y);C(R)&&(R=v),A=A.add(R),E=S(E,I)}return new k(A,E)}t.A=function(E){return D(this,E).h},t.and=function(E){for(var y=Math.max(this.g.length,E.g.length),w=[],x=0;x<y;x++)w[x]=this.i(x)&E.i(x);return new o(w,this.h&E.h)},t.or=function(E){for(var y=Math.max(this.g.length,E.g.length),w=[],x=0;x<y;x++)w[x]=this.i(x)|E.i(x);return new o(w,this.h|E.h)},t.xor=function(E){for(var y=Math.max(this.g.length,E.g.length),w=[],x=0;x<y;x++)w[x]=this.i(x)^E.i(x);return new o(w,this.h^E.h)};function F(E){for(var y=E.g.length+1,w=[],x=0;x<y;x++)w[x]=E.i(x)<<1|E.i(x-1)>>>31;return new o(w,E.h)}function U(E,y){var w=y>>5;y%=32;for(var x=E.g.length-w,A=[],R=0;R<x;R++)A[R]=0<y?E.i(R+w)>>>y|E.i(R+w+1)<<32-y:E.i(R+w);return new o(A,E.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,$0=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=p,Nr=o}).apply(typeof Ym<"u"?Ym:typeof self<"u"?self:typeof window<"u"?window:{});var pa=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var B0,Ii,W0,Va,hh,H0,q0,K0;(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,c,d){return a==Array.prototype||a==Object.prototype||(a[c]=d.value),a};function n(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof pa=="object"&&pa];for(var c=0;c<a.length;++c){var d=a[c];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=n(this);function s(a,c){if(c)e:{var d=r;a=a.split(".");for(var g=0;g<a.length-1;g++){var N=a[g];if(!(N in d))break e;d=d[N]}a=a[a.length-1],g=d[a],c=c(g),c!=g&&c!=null&&e(d,a,{configurable:!0,writable:!0,value:c})}}function i(a,c){a instanceof String&&(a+="");var d=0,g=!1,N={next:function(){if(!g&&d<a.length){var b=d++;return{value:c(b,a[b]),done:!1}}return g=!0,{done:!0,value:void 0}}};return N[Symbol.iterator]=function(){return N},N}s("Array.prototype.values",function(a){return a||function(){return i(this,function(c,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},l=this||self;function u(a){var c=typeof a;return c=c!="object"?c:a?Array.isArray(a)?"array":c:"null",c=="array"||c=="object"&&typeof a.length=="number"}function h(a){var c=typeof a;return c=="object"&&a!=null||c=="function"}function p(a,c,d){return a.call.apply(a.bind,arguments)}function m(a,c,d){if(!a)throw Error();if(2<arguments.length){var g=Array.prototype.slice.call(arguments,2);return function(){var N=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(N,g),a.apply(c,N)}}return function(){return a.apply(c,arguments)}}function v(a,c,d){return v=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?p:m,v.apply(null,arguments)}function _(a,c){var d=Array.prototype.slice.call(arguments,1);return function(){var g=d.slice();return g.push.apply(g,arguments),a.apply(this,g)}}function C(a,c){function d(){}d.prototype=c.prototype,a.aa=c.prototype,a.prototype=new d,a.prototype.constructor=a,a.Qb=function(g,N,b){for(var z=Array(arguments.length-2),Ie=2;Ie<arguments.length;Ie++)z[Ie-2]=arguments[Ie];return c.prototype[N].apply(g,z)}}function P(a){const c=a.length;if(0<c){const d=Array(c);for(let g=0;g<c;g++)d[g]=a[g];return d}return[]}function O(a,c){for(let d=1;d<arguments.length;d++){const g=arguments[d];if(u(g)){const N=a.length||0,b=g.length||0;a.length=N+b;for(let z=0;z<b;z++)a[N+z]=g[z]}else a.push(g)}}class S{constructor(c,d){this.i=c,this.j=d,this.h=0,this.g=null}get(){let c;return 0<this.h?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function T(a){return/^[\s\xa0]*$/.test(a)}function k(){var a=l.navigator;return a&&(a=a.userAgent)?a:""}function D(a){return D[" "](a),a}D[" "]=function(){};var F=k().indexOf("Gecko")!=-1&&!(k().toLowerCase().indexOf("webkit")!=-1&&k().indexOf("Edge")==-1)&&!(k().indexOf("Trident")!=-1||k().indexOf("MSIE")!=-1)&&k().indexOf("Edge")==-1;function U(a,c,d){for(const g in a)c.call(d,a[g],g,a)}function E(a,c){for(const d in a)c.call(void 0,a[d],d,a)}function y(a){const c={};for(const d in a)c[d]=a[d];return c}const w="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function x(a,c){let d,g;for(let N=1;N<arguments.length;N++){g=arguments[N];for(d in g)a[d]=g[d];for(let b=0;b<w.length;b++)d=w[b],Object.prototype.hasOwnProperty.call(g,d)&&(a[d]=g[d])}}function A(a){var c=1;a=a.split(":");const d=[];for(;0<c&&a.length;)d.push(a.shift()),c--;return a.length&&d.push(a.join(":")),d}function R(a){l.setTimeout(()=>{throw a},0)}function I(){var a=Q;let c=null;return a.g&&(c=a.g,a.g=a.g.next,a.g||(a.h=null),c.next=null),c}class G{constructor(){this.h=this.g=null}add(c,d){const g=Re.get();g.set(c,d),this.h?this.h.next=g:this.g=g,this.h=g}}var Re=new S(()=>new ye,a=>a.reset());class ye{constructor(){this.next=this.g=this.h=null}set(c,d){this.h=c,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let pe,$=!1,Q=new G,J=()=>{const a=l.Promise.resolve(void 0);pe=()=>{a.then(ue)}};var ue=()=>{for(var a;a=I();){try{a.h.call(a.g)}catch(d){R(d)}var c=Re;c.j(a),100>c.h&&(c.h++,a.next=c.g,c.g=a)}$=!1};function ae(){this.s=this.s,this.C=this.C}ae.prototype.s=!1,ae.prototype.ma=function(){this.s||(this.s=!0,this.N())},ae.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function L(a,c){this.type=a,this.g=this.target=c,this.defaultPrevented=!1}L.prototype.h=function(){this.defaultPrevented=!0};var ee=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var a=!1,c=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const d=()=>{};l.addEventListener("test",d,c),l.removeEventListener("test",d,c)}catch{}return a}();function Me(a,c){if(L.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var d=this.type=a.type,g=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=c,c=a.relatedTarget){if(F){e:{try{D(c.nodeName);var N=!0;break e}catch{}N=!1}N||(c=null)}}else d=="mouseover"?c=a.fromElement:d=="mouseout"&&(c=a.toElement);this.relatedTarget=c,g?(this.clientX=g.clientX!==void 0?g.clientX:g.pageX,this.clientY=g.clientY!==void 0?g.clientY:g.pageY,this.screenX=g.screenX||0,this.screenY=g.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:se[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&Me.aa.h.call(this)}}C(Me,L);var se={2:"touch",3:"pen",4:"mouse"};Me.prototype.h=function(){Me.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var ve="closure_listenable_"+(1e6*Math.random()|0),W=0;function K(a,c,d,g,N){this.listener=a,this.proxy=null,this.src=c,this.type=d,this.capture=!!g,this.ha=N,this.key=++W,this.da=this.fa=!1}function Y(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function le(a){this.src=a,this.g={},this.h=0}le.prototype.add=function(a,c,d,g,N){var b=a.toString();a=this.g[b],a||(a=this.g[b]=[],this.h++);var z=me(a,c,g,N);return-1<z?(c=a[z],d||(c.fa=!1)):(c=new K(c,this.src,b,!!g,N),c.fa=d,a.push(c)),c};function kt(a,c){var d=c.type;if(d in a.g){var g=a.g[d],N=Array.prototype.indexOf.call(g,c,void 0),b;(b=0<=N)&&Array.prototype.splice.call(g,N,1),b&&(Y(c),a.g[d].length==0&&(delete a.g[d],a.h--))}}function me(a,c,d,g){for(var N=0;N<a.length;++N){var b=a[N];if(!b.da&&b.listener==c&&b.capture==!!d&&b.ha==g)return N}return-1}var wt="closure_lm_"+(1e6*Math.random()|0),Bt={};function Ys(a,c,d,g,N){if(Array.isArray(c)){for(var b=0;b<c.length;b++)Ys(a,c[b],d,g,N);return null}return d=vf(d),a&&a[ve]?a.K(c,d,h(g)?!!g.capture:!1,N):fw(a,c,d,!1,g,N)}function fw(a,c,d,g,N,b){if(!c)throw Error("Invalid event type");var z=h(N)?!!N.capture:!!N,Ie=lu(a);if(Ie||(a[wt]=Ie=new le(a)),d=Ie.add(c,d,g,z,b),d.proxy)return d;if(g=pw(),d.proxy=g,g.src=a,g.listener=d,a.addEventListener)ee||(N=z),N===void 0&&(N=!1),a.addEventListener(c.toString(),g,N);else if(a.attachEvent)a.attachEvent(yf(c.toString()),g);else if(a.addListener&&a.removeListener)a.addListener(g);else throw Error("addEventListener and attachEvent are unavailable.");return d}function pw(){function a(d){return c.call(a.src,a.listener,d)}const c=mw;return a}function gf(a,c,d,g,N){if(Array.isArray(c))for(var b=0;b<c.length;b++)gf(a,c[b],d,g,N);else g=h(g)?!!g.capture:!!g,d=vf(d),a&&a[ve]?(a=a.i,c=String(c).toString(),c in a.g&&(b=a.g[c],d=me(b,d,g,N),-1<d&&(Y(b[d]),Array.prototype.splice.call(b,d,1),b.length==0&&(delete a.g[c],a.h--)))):a&&(a=lu(a))&&(c=a.g[c.toString()],a=-1,c&&(a=me(c,d,g,N)),(d=-1<a?c[a]:null)&&au(d))}function au(a){if(typeof a!="number"&&a&&!a.da){var c=a.src;if(c&&c[ve])kt(c.i,a);else{var d=a.type,g=a.proxy;c.removeEventListener?c.removeEventListener(d,g,a.capture):c.detachEvent?c.detachEvent(yf(d),g):c.addListener&&c.removeListener&&c.removeListener(g),(d=lu(c))?(kt(d,a),d.h==0&&(d.src=null,c[wt]=null)):Y(a)}}}function yf(a){return a in Bt?Bt[a]:Bt[a]="on"+a}function mw(a,c){if(a.da)a=!0;else{c=new Me(c,this);var d=a.listener,g=a.ha||a.src;a.fa&&au(a),a=d.call(g,c)}return a}function lu(a){return a=a[wt],a instanceof le?a:null}var uu="__closure_events_fn_"+(1e9*Math.random()>>>0);function vf(a){return typeof a=="function"?a:(a[uu]||(a[uu]=function(c){return a.handleEvent(c)}),a[uu])}function rt(){ae.call(this),this.i=new le(this),this.M=this,this.F=null}C(rt,ae),rt.prototype[ve]=!0,rt.prototype.removeEventListener=function(a,c,d,g){gf(this,a,c,d,g)};function pt(a,c){var d,g=a.F;if(g)for(d=[];g;g=g.F)d.push(g);if(a=a.M,g=c.type||c,typeof c=="string")c=new L(c,a);else if(c instanceof L)c.target=c.target||a;else{var N=c;c=new L(g,a),x(c,N)}if(N=!0,d)for(var b=d.length-1;0<=b;b--){var z=c.g=d[b];N=Oo(z,g,!0,c)&&N}if(z=c.g=a,N=Oo(z,g,!0,c)&&N,N=Oo(z,g,!1,c)&&N,d)for(b=0;b<d.length;b++)z=c.g=d[b],N=Oo(z,g,!1,c)&&N}rt.prototype.N=function(){if(rt.aa.N.call(this),this.i){var a=this.i,c;for(c in a.g){for(var d=a.g[c],g=0;g<d.length;g++)Y(d[g]);delete a.g[c],a.h--}}this.F=null},rt.prototype.K=function(a,c,d,g){return this.i.add(String(a),c,!1,d,g)},rt.prototype.L=function(a,c,d,g){return this.i.add(String(a),c,!0,d,g)};function Oo(a,c,d,g){if(c=a.i.g[String(c)],!c)return!0;c=c.concat();for(var N=!0,b=0;b<c.length;++b){var z=c[b];if(z&&!z.da&&z.capture==d){var Ie=z.listener,Qe=z.ha||z.src;z.fa&&kt(a.i,z),N=Ie.call(Qe,g)!==!1&&N}}return N&&!g.defaultPrevented}function _f(a,c,d){if(typeof a=="function")d&&(a=v(a,d));else if(a&&typeof a.handleEvent=="function")a=v(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(c)?-1:l.setTimeout(a,c||0)}function wf(a){a.g=_f(()=>{a.g=null,a.i&&(a.i=!1,wf(a))},a.l);const c=a.h;a.h=null,a.m.apply(null,c)}class gw extends ae{constructor(c,d){super(),this.m=c,this.l=d,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:wf(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Js(a){ae.call(this),this.h=a,this.g={}}C(Js,ae);var Ef=[];function Tf(a){U(a.g,function(c,d){this.g.hasOwnProperty(d)&&au(c)},a),a.g={}}Js.prototype.N=function(){Js.aa.N.call(this),Tf(this)},Js.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var cu=l.JSON.stringify,yw=l.JSON.parse,vw=class{stringify(a){return l.JSON.stringify(a,void 0)}parse(a){return l.JSON.parse(a,void 0)}};function hu(){}hu.prototype.h=null;function If(a){return a.h||(a.h=a.i())}function xf(){}var Xs={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function du(){L.call(this,"d")}C(du,L);function fu(){L.call(this,"c")}C(fu,L);var vr={},Sf=null;function Vo(){return Sf=Sf||new rt}vr.La="serverreachability";function kf(a){L.call(this,vr.La,a)}C(kf,L);function Zs(a){const c=Vo();pt(c,new kf(c))}vr.STAT_EVENT="statevent";function Af(a,c){L.call(this,vr.STAT_EVENT,a),this.stat=c}C(Af,L);function mt(a){const c=Vo();pt(c,new Af(c,a))}vr.Ma="timingevent";function Cf(a,c){L.call(this,vr.Ma,a),this.size=c}C(Cf,L);function ei(a,c){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){a()},c)}function ti(){this.g=!0}ti.prototype.xa=function(){this.g=!1};function _w(a,c,d,g,N,b){a.info(function(){if(a.g)if(b)for(var z="",Ie=b.split("&"),Qe=0;Qe<Ie.length;Qe++){var _e=Ie[Qe].split("=");if(1<_e.length){var st=_e[0];_e=_e[1];var it=st.split("_");z=2<=it.length&&it[1]=="type"?z+(st+"="+_e+"&"):z+(st+"=redacted&")}}else z=null;else z=b;return"XMLHTTP REQ ("+g+") [attempt "+N+"]: "+c+`
`+d+`
`+z})}function ww(a,c,d,g,N,b,z){a.info(function(){return"XMLHTTP RESP ("+g+") [ attempt "+N+"]: "+c+`
`+d+`
`+b+" "+z})}function Kr(a,c,d,g){a.info(function(){return"XMLHTTP TEXT ("+c+"): "+Tw(a,d)+(g?" "+g:"")})}function Ew(a,c){a.info(function(){return"TIMEOUT: "+c})}ti.prototype.info=function(){};function Tw(a,c){if(!a.g)return c;if(!c)return null;try{var d=JSON.parse(c);if(d){for(a=0;a<d.length;a++)if(Array.isArray(d[a])){var g=d[a];if(!(2>g.length)){var N=g[1];if(Array.isArray(N)&&!(1>N.length)){var b=N[0];if(b!="noop"&&b!="stop"&&b!="close")for(var z=1;z<N.length;z++)N[z]=""}}}}return cu(d)}catch{return c}}var Lo={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Rf={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},pu;function Mo(){}C(Mo,hu),Mo.prototype.g=function(){return new XMLHttpRequest},Mo.prototype.i=function(){return{}},pu=new Mo;function Ln(a,c,d,g){this.j=a,this.i=c,this.l=d,this.R=g||1,this.U=new Js(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Pf}function Pf(){this.i=null,this.g="",this.h=!1}var Nf={},mu={};function gu(a,c,d){a.L=1,a.v=zo(dn(c)),a.m=d,a.P=!0,bf(a,null)}function bf(a,c){a.F=Date.now(),jo(a),a.A=dn(a.v);var d=a.A,g=a.R;Array.isArray(g)||(g=[String(g)]),qf(d.i,"t",g),a.C=0,d=a.j.J,a.h=new Pf,a.g=cp(a.j,d?c:null,!a.m),0<a.O&&(a.M=new gw(v(a.Y,a,a.g),a.O)),c=a.U,d=a.g,g=a.ca;var N="readystatechange";Array.isArray(N)||(N&&(Ef[0]=N.toString()),N=Ef);for(var b=0;b<N.length;b++){var z=Ys(d,N[b],g||c.handleEvent,!1,c.h||c);if(!z)break;c.g[z.key]=z}c=a.H?y(a.H):{},a.m?(a.u||(a.u="POST"),c["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,c)):(a.u="GET",a.g.ea(a.A,a.u,null,c)),Zs(),_w(a.i,a.u,a.A,a.l,a.R,a.m)}Ln.prototype.ca=function(a){a=a.target;const c=this.M;c&&fn(a)==3?c.j():this.Y(a)},Ln.prototype.Y=function(a){try{if(a==this.g)e:{const it=fn(this.g);var c=this.g.Ba();const Yr=this.g.Z();if(!(3>it)&&(it!=3||this.g&&(this.h.h||this.g.oa()||Zf(this.g)))){this.J||it!=4||c==7||(c==8||0>=Yr?Zs(3):Zs(2)),yu(this);var d=this.g.Z();this.X=d;t:if(Df(this)){var g=Zf(this.g);a="";var N=g.length,b=fn(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){_r(this),ni(this);var z="";break t}this.h.i=new l.TextDecoder}for(c=0;c<N;c++)this.h.h=!0,a+=this.h.i.decode(g[c],{stream:!(b&&c==N-1)});g.length=0,this.h.g+=a,this.C=0,z=this.h.g}else z=this.g.oa();if(this.o=d==200,ww(this.i,this.u,this.A,this.l,this.R,it,d),this.o){if(this.T&&!this.K){t:{if(this.g){var Ie,Qe=this.g;if((Ie=Qe.g?Qe.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!T(Ie)){var _e=Ie;break t}}_e=null}if(d=_e)Kr(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,vu(this,d);else{this.o=!1,this.s=3,mt(12),_r(this),ni(this);break e}}if(this.P){d=!0;let Wt;for(;!this.J&&this.C<z.length;)if(Wt=Iw(this,z),Wt==mu){it==4&&(this.s=4,mt(14),d=!1),Kr(this.i,this.l,null,"[Incomplete Response]");break}else if(Wt==Nf){this.s=4,mt(15),Kr(this.i,this.l,z,"[Invalid Chunk]"),d=!1;break}else Kr(this.i,this.l,Wt,null),vu(this,Wt);if(Df(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),it!=4||z.length!=0||this.h.h||(this.s=1,mt(16),d=!1),this.o=this.o&&d,!d)Kr(this.i,this.l,z,"[Invalid Chunked Response]"),_r(this),ni(this);else if(0<z.length&&!this.W){this.W=!0;var st=this.j;st.g==this&&st.ba&&!st.M&&(st.j.info("Great, no buffering proxy detected. Bytes received: "+z.length),xu(st),st.M=!0,mt(11))}}else Kr(this.i,this.l,z,null),vu(this,z);it==4&&_r(this),this.o&&!this.J&&(it==4?op(this.j,this):(this.o=!1,jo(this)))}else Uw(this.g),d==400&&0<z.indexOf("Unknown SID")?(this.s=3,mt(12)):(this.s=0,mt(13)),_r(this),ni(this)}}}catch{}finally{}};function Df(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function Iw(a,c){var d=a.C,g=c.indexOf(`
`,d);return g==-1?mu:(d=Number(c.substring(d,g)),isNaN(d)?Nf:(g+=1,g+d>c.length?mu:(c=c.slice(g,g+d),a.C=g+d,c)))}Ln.prototype.cancel=function(){this.J=!0,_r(this)};function jo(a){a.S=Date.now()+a.I,Of(a,a.I)}function Of(a,c){if(a.B!=null)throw Error("WatchDog timer not null");a.B=ei(v(a.ba,a),c)}function yu(a){a.B&&(l.clearTimeout(a.B),a.B=null)}Ln.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(Ew(this.i,this.A),this.L!=2&&(Zs(),mt(17)),_r(this),this.s=2,ni(this)):Of(this,this.S-a)};function ni(a){a.j.G==0||a.J||op(a.j,a)}function _r(a){yu(a);var c=a.M;c&&typeof c.ma=="function"&&c.ma(),a.M=null,Tf(a.U),a.g&&(c=a.g,a.g=null,c.abort(),c.ma())}function vu(a,c){try{var d=a.j;if(d.G!=0&&(d.g==a||_u(d.h,a))){if(!a.K&&_u(d.h,a)&&d.G==3){try{var g=d.Da.g.parse(c)}catch{g=null}if(Array.isArray(g)&&g.length==3){var N=g;if(N[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<a.F)Ko(d),Ho(d);else break e;Iu(d),mt(18)}}else d.za=N[1],0<d.za-d.T&&37500>N[2]&&d.F&&d.v==0&&!d.C&&(d.C=ei(v(d.Za,d),6e3));if(1>=Mf(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else Er(d,11)}else if((a.K||d.g==a)&&Ko(d),!T(c))for(N=d.Da.g.parse(c),c=0;c<N.length;c++){let _e=N[c];if(d.T=_e[0],_e=_e[1],d.G==2)if(_e[0]=="c"){d.K=_e[1],d.ia=_e[2];const st=_e[3];st!=null&&(d.la=st,d.j.info("VER="+d.la));const it=_e[4];it!=null&&(d.Aa=it,d.j.info("SVER="+d.Aa));const Yr=_e[5];Yr!=null&&typeof Yr=="number"&&0<Yr&&(g=1.5*Yr,d.L=g,d.j.info("backChannelRequestTimeoutMs_="+g)),g=d;const Wt=a.g;if(Wt){const Qo=Wt.g?Wt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Qo){var b=g.h;b.g||Qo.indexOf("spdy")==-1&&Qo.indexOf("quic")==-1&&Qo.indexOf("h2")==-1||(b.j=b.l,b.g=new Set,b.h&&(wu(b,b.h),b.h=null))}if(g.D){const Su=Wt.g?Wt.g.getResponseHeader("X-HTTP-Session-Id"):null;Su&&(g.ya=Su,Se(g.I,g.D,Su))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-a.F,d.j.info("Handshake RTT: "+d.R+"ms")),g=d;var z=a;if(g.qa=up(g,g.J?g.ia:null,g.W),z.K){jf(g.h,z);var Ie=z,Qe=g.L;Qe&&(Ie.I=Qe),Ie.B&&(yu(Ie),jo(Ie)),g.g=z}else sp(g);0<d.i.length&&qo(d)}else _e[0]!="stop"&&_e[0]!="close"||Er(d,7);else d.G==3&&(_e[0]=="stop"||_e[0]=="close"?_e[0]=="stop"?Er(d,7):Tu(d):_e[0]!="noop"&&d.l&&d.l.ta(_e),d.v=0)}}Zs(4)}catch{}}var xw=class{constructor(a,c){this.g=a,this.map=c}};function Vf(a){this.l=a||10,l.PerformanceNavigationTiming?(a=l.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Lf(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Mf(a){return a.h?1:a.g?a.g.size:0}function _u(a,c){return a.h?a.h==c:a.g?a.g.has(c):!1}function wu(a,c){a.g?a.g.add(c):a.h=c}function jf(a,c){a.h&&a.h==c?a.h=null:a.g&&a.g.has(c)&&a.g.delete(c)}Vf.prototype.cancel=function(){if(this.i=Ff(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Ff(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let c=a.i;for(const d of a.g.values())c=c.concat(d.D);return c}return P(a.i)}function Sw(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(u(a)){for(var c=[],d=a.length,g=0;g<d;g++)c.push(a[g]);return c}c=[],d=0;for(g in a)c[d++]=a[g];return c}function kw(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(u(a)||typeof a=="string"){var c=[];a=a.length;for(var d=0;d<a;d++)c.push(d);return c}c=[],d=0;for(const g in a)c[d++]=g;return c}}}function Uf(a,c){if(a.forEach&&typeof a.forEach=="function")a.forEach(c,void 0);else if(u(a)||typeof a=="string")Array.prototype.forEach.call(a,c,void 0);else for(var d=kw(a),g=Sw(a),N=g.length,b=0;b<N;b++)c.call(void 0,g[b],d&&d[b],a)}var zf=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Aw(a,c){if(a){a=a.split("&");for(var d=0;d<a.length;d++){var g=a[d].indexOf("="),N=null;if(0<=g){var b=a[d].substring(0,g);N=a[d].substring(g+1)}else b=a[d];c(b,N?decodeURIComponent(N.replace(/\+/g," ")):"")}}}function wr(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof wr){this.h=a.h,Fo(this,a.j),this.o=a.o,this.g=a.g,Uo(this,a.s),this.l=a.l;var c=a.i,d=new ii;d.i=c.i,c.g&&(d.g=new Map(c.g),d.h=c.h),$f(this,d),this.m=a.m}else a&&(c=String(a).match(zf))?(this.h=!1,Fo(this,c[1]||"",!0),this.o=ri(c[2]||""),this.g=ri(c[3]||"",!0),Uo(this,c[4]),this.l=ri(c[5]||"",!0),$f(this,c[6]||"",!0),this.m=ri(c[7]||"")):(this.h=!1,this.i=new ii(null,this.h))}wr.prototype.toString=function(){var a=[],c=this.j;c&&a.push(si(c,Bf,!0),":");var d=this.g;return(d||c=="file")&&(a.push("//"),(c=this.o)&&a.push(si(c,Bf,!0),"@"),a.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&a.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(si(d,d.charAt(0)=="/"?Pw:Rw,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",si(d,bw)),a.join("")};function dn(a){return new wr(a)}function Fo(a,c,d){a.j=d?ri(c,!0):c,a.j&&(a.j=a.j.replace(/:$/,""))}function Uo(a,c){if(c){if(c=Number(c),isNaN(c)||0>c)throw Error("Bad port number "+c);a.s=c}else a.s=null}function $f(a,c,d){c instanceof ii?(a.i=c,Dw(a.i,a.h)):(d||(c=si(c,Nw)),a.i=new ii(c,a.h))}function Se(a,c,d){a.i.set(c,d)}function zo(a){return Se(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function ri(a,c){return a?c?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function si(a,c,d){return typeof a=="string"?(a=encodeURI(a).replace(c,Cw),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function Cw(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Bf=/[#\/\?@]/g,Rw=/[#\?:]/g,Pw=/[#\?]/g,Nw=/[#\?@]/g,bw=/#/g;function ii(a,c){this.h=this.g=null,this.i=a||null,this.j=!!c}function Mn(a){a.g||(a.g=new Map,a.h=0,a.i&&Aw(a.i,function(c,d){a.add(decodeURIComponent(c.replace(/\+/g," ")),d)}))}t=ii.prototype,t.add=function(a,c){Mn(this),this.i=null,a=Gr(this,a);var d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(c),this.h+=1,this};function Wf(a,c){Mn(a),c=Gr(a,c),a.g.has(c)&&(a.i=null,a.h-=a.g.get(c).length,a.g.delete(c))}function Hf(a,c){return Mn(a),c=Gr(a,c),a.g.has(c)}t.forEach=function(a,c){Mn(this),this.g.forEach(function(d,g){d.forEach(function(N){a.call(c,N,g,this)},this)},this)},t.na=function(){Mn(this);const a=Array.from(this.g.values()),c=Array.from(this.g.keys()),d=[];for(let g=0;g<c.length;g++){const N=a[g];for(let b=0;b<N.length;b++)d.push(c[g])}return d},t.V=function(a){Mn(this);let c=[];if(typeof a=="string")Hf(this,a)&&(c=c.concat(this.g.get(Gr(this,a))));else{a=Array.from(this.g.values());for(let d=0;d<a.length;d++)c=c.concat(a[d])}return c},t.set=function(a,c){return Mn(this),this.i=null,a=Gr(this,a),Hf(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[c]),this.h+=1,this},t.get=function(a,c){return a?(a=this.V(a),0<a.length?String(a[0]):c):c};function qf(a,c,d){Wf(a,c),0<d.length&&(a.i=null,a.g.set(Gr(a,c),P(d)),a.h+=d.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],c=Array.from(this.g.keys());for(var d=0;d<c.length;d++){var g=c[d];const b=encodeURIComponent(String(g)),z=this.V(g);for(g=0;g<z.length;g++){var N=b;z[g]!==""&&(N+="="+encodeURIComponent(String(z[g]))),a.push(N)}}return this.i=a.join("&")};function Gr(a,c){return c=String(c),a.j&&(c=c.toLowerCase()),c}function Dw(a,c){c&&!a.j&&(Mn(a),a.i=null,a.g.forEach(function(d,g){var N=g.toLowerCase();g!=N&&(Wf(this,g),qf(this,N,d))},a)),a.j=c}function Ow(a,c){const d=new ti;if(l.Image){const g=new Image;g.onload=_(jn,d,"TestLoadImage: loaded",!0,c,g),g.onerror=_(jn,d,"TestLoadImage: error",!1,c,g),g.onabort=_(jn,d,"TestLoadImage: abort",!1,c,g),g.ontimeout=_(jn,d,"TestLoadImage: timeout",!1,c,g),l.setTimeout(function(){g.ontimeout&&g.ontimeout()},1e4),g.src=a}else c(!1)}function Vw(a,c){const d=new ti,g=new AbortController,N=setTimeout(()=>{g.abort(),jn(d,"TestPingServer: timeout",!1,c)},1e4);fetch(a,{signal:g.signal}).then(b=>{clearTimeout(N),b.ok?jn(d,"TestPingServer: ok",!0,c):jn(d,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(N),jn(d,"TestPingServer: error",!1,c)})}function jn(a,c,d,g,N){try{N&&(N.onload=null,N.onerror=null,N.onabort=null,N.ontimeout=null),g(d)}catch{}}function Lw(){this.g=new vw}function Mw(a,c,d){const g=d||"";try{Uf(a,function(N,b){let z=N;h(N)&&(z=cu(N)),c.push(g+b+"="+encodeURIComponent(z))})}catch(N){throw c.push(g+"type="+encodeURIComponent("_badmap")),N}}function $o(a){this.l=a.Ub||null,this.j=a.eb||!1}C($o,hu),$o.prototype.g=function(){return new Bo(this.l,this.j)},$o.prototype.i=function(a){return function(){return a}}({});function Bo(a,c){rt.call(this),this.D=a,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}C(Bo,rt),t=Bo.prototype,t.open=function(a,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=c,this.readyState=1,ai(this)},t.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const c={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(c.body=a),(this.D||l).fetch(new Request(this.A,c)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,oi(this)),this.readyState=0},t.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,ai(this)),this.g&&(this.readyState=3,ai(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Kf(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function Kf(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}t.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var c=a.value?a.value:new Uint8Array(0);(c=this.v.decode(c,{stream:!a.done}))&&(this.response=this.responseText+=c)}a.done?oi(this):ai(this),this.readyState==3&&Kf(this)}},t.Ra=function(a){this.g&&(this.response=this.responseText=a,oi(this))},t.Qa=function(a){this.g&&(this.response=a,oi(this))},t.ga=function(){this.g&&oi(this)};function oi(a){a.readyState=4,a.l=null,a.j=null,a.v=null,ai(a)}t.setRequestHeader=function(a,c){this.u.append(a,c)},t.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],c=this.h.entries();for(var d=c.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=c.next();return a.join(`\r
`)};function ai(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(Bo.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Gf(a){let c="";return U(a,function(d,g){c+=g,c+=":",c+=d,c+=`\r
`}),c}function Eu(a,c,d){e:{for(g in d){var g=!1;break e}g=!0}g||(d=Gf(d),typeof a=="string"?d!=null&&encodeURIComponent(String(d)):Se(a,c,d))}function Oe(a){rt.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}C(Oe,rt);var jw=/^https?$/i,Fw=["POST","PUT"];t=Oe.prototype,t.Ha=function(a){this.J=a},t.ea=function(a,c,d,g){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);c=c?c.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():pu.g(),this.v=this.o?If(this.o):If(pu),this.g.onreadystatechange=v(this.Ea,this);try{this.B=!0,this.g.open(c,String(a),!0),this.B=!1}catch(b){Qf(this,b);return}if(a=d||"",d=new Map(this.headers),g)if(Object.getPrototypeOf(g)===Object.prototype)for(var N in g)d.set(N,g[N]);else if(typeof g.keys=="function"&&typeof g.get=="function")for(const b of g.keys())d.set(b,g.get(b));else throw Error("Unknown input type for opt_headers: "+String(g));g=Array.from(d.keys()).find(b=>b.toLowerCase()=="content-type"),N=l.FormData&&a instanceof l.FormData,!(0<=Array.prototype.indexOf.call(Fw,c,void 0))||g||N||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[b,z]of d)this.g.setRequestHeader(b,z);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Xf(this),this.u=!0,this.g.send(a),this.u=!1}catch(b){Qf(this,b)}};function Qf(a,c){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=c,a.m=5,Yf(a),Wo(a)}function Yf(a){a.A||(a.A=!0,pt(a,"complete"),pt(a,"error"))}t.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,pt(this,"complete"),pt(this,"abort"),Wo(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Wo(this,!0)),Oe.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?Jf(this):this.bb())},t.bb=function(){Jf(this)};function Jf(a){if(a.h&&typeof o<"u"&&(!a.v[1]||fn(a)!=4||a.Z()!=2)){if(a.u&&fn(a)==4)_f(a.Ea,0,a);else if(pt(a,"readystatechange"),fn(a)==4){a.h=!1;try{const z=a.Z();e:switch(z){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break e;default:c=!1}var d;if(!(d=c)){var g;if(g=z===0){var N=String(a.D).match(zf)[1]||null;!N&&l.self&&l.self.location&&(N=l.self.location.protocol.slice(0,-1)),g=!jw.test(N?N.toLowerCase():"")}d=g}if(d)pt(a,"complete"),pt(a,"success");else{a.m=6;try{var b=2<fn(a)?a.g.statusText:""}catch{b=""}a.l=b+" ["+a.Z()+"]",Yf(a)}}finally{Wo(a)}}}}function Wo(a,c){if(a.g){Xf(a);const d=a.g,g=a.v[0]?()=>{}:null;a.g=null,a.v=null,c||pt(a,"ready");try{d.onreadystatechange=g}catch{}}}function Xf(a){a.I&&(l.clearTimeout(a.I),a.I=null)}t.isActive=function(){return!!this.g};function fn(a){return a.g?a.g.readyState:0}t.Z=function(){try{return 2<fn(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(a){if(this.g){var c=this.g.responseText;return a&&c.indexOf(a)==0&&(c=c.substring(a.length)),yw(c)}};function Zf(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function Uw(a){const c={};a=(a.g&&2<=fn(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let g=0;g<a.length;g++){if(T(a[g]))continue;var d=A(a[g]);const N=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const b=c[N]||[];c[N]=b,b.push(d)}E(c,function(g){return g.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function li(a,c,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||c}function ep(a){this.Aa=0,this.i=[],this.j=new ti,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=li("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=li("baseRetryDelayMs",5e3,a),this.cb=li("retryDelaySeedMs",1e4,a),this.Wa=li("forwardChannelMaxRetries",2,a),this.wa=li("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new Vf(a&&a.concurrentRequestLimit),this.Da=new Lw,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=ep.prototype,t.la=8,t.G=1,t.connect=function(a,c,d,g){mt(0),this.W=a,this.H=c||{},d&&g!==void 0&&(this.H.OSID=d,this.H.OAID=g),this.F=this.X,this.I=up(this,null,this.W),qo(this)};function Tu(a){if(tp(a),a.G==3){var c=a.U++,d=dn(a.I);if(Se(d,"SID",a.K),Se(d,"RID",c),Se(d,"TYPE","terminate"),ui(a,d),c=new Ln(a,a.j,c),c.L=2,c.v=zo(dn(d)),d=!1,l.navigator&&l.navigator.sendBeacon)try{d=l.navigator.sendBeacon(c.v.toString(),"")}catch{}!d&&l.Image&&(new Image().src=c.v,d=!0),d||(c.g=cp(c.j,null),c.g.ea(c.v)),c.F=Date.now(),jo(c)}lp(a)}function Ho(a){a.g&&(xu(a),a.g.cancel(),a.g=null)}function tp(a){Ho(a),a.u&&(l.clearTimeout(a.u),a.u=null),Ko(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&l.clearTimeout(a.s),a.s=null)}function qo(a){if(!Lf(a.h)&&!a.s){a.s=!0;var c=a.Ga;pe||J(),$||(pe(),$=!0),Q.add(c,a),a.B=0}}function zw(a,c){return Mf(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=c.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=ei(v(a.Ga,a,c),ap(a,a.B)),a.B++,!0)}t.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const N=new Ln(this,this.j,a);let b=this.o;if(this.S&&(b?(b=y(b),x(b,this.S)):b=this.S),this.m!==null||this.O||(N.H=b,b=null),this.P)e:{for(var c=0,d=0;d<this.i.length;d++){t:{var g=this.i[d];if("__data__"in g.map&&(g=g.map.__data__,typeof g=="string")){g=g.length;break t}g=void 0}if(g===void 0)break;if(c+=g,4096<c){c=d;break e}if(c===4096||d===this.i.length-1){c=d+1;break e}}c=1e3}else c=1e3;c=rp(this,N,c),d=dn(this.I),Se(d,"RID",a),Se(d,"CVER",22),this.D&&Se(d,"X-HTTP-Session-Id",this.D),ui(this,d),b&&(this.O?c="headers="+encodeURIComponent(String(Gf(b)))+"&"+c:this.m&&Eu(d,this.m,b)),wu(this.h,N),this.Ua&&Se(d,"TYPE","init"),this.P?(Se(d,"$req",c),Se(d,"SID","null"),N.T=!0,gu(N,d,null)):gu(N,d,c),this.G=2}}else this.G==3&&(a?np(this,a):this.i.length==0||Lf(this.h)||np(this))};function np(a,c){var d;c?d=c.l:d=a.U++;const g=dn(a.I);Se(g,"SID",a.K),Se(g,"RID",d),Se(g,"AID",a.T),ui(a,g),a.m&&a.o&&Eu(g,a.m,a.o),d=new Ln(a,a.j,d,a.B+1),a.m===null&&(d.H=a.o),c&&(a.i=c.D.concat(a.i)),c=rp(a,d,1e3),d.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),wu(a.h,d),gu(d,g,c)}function ui(a,c){a.H&&U(a.H,function(d,g){Se(c,g,d)}),a.l&&Uf({},function(d,g){Se(c,g,d)})}function rp(a,c,d){d=Math.min(a.i.length,d);var g=a.l?v(a.l.Na,a.l,a):null;e:{var N=a.i;let b=-1;for(;;){const z=["count="+d];b==-1?0<d?(b=N[0].g,z.push("ofs="+b)):b=0:z.push("ofs="+b);let Ie=!0;for(let Qe=0;Qe<d;Qe++){let _e=N[Qe].g;const st=N[Qe].map;if(_e-=b,0>_e)b=Math.max(0,N[Qe].g-100),Ie=!1;else try{Mw(st,z,"req"+_e+"_")}catch{g&&g(st)}}if(Ie){g=z.join("&");break e}}}return a=a.i.splice(0,d),c.D=a,g}function sp(a){if(!a.g&&!a.u){a.Y=1;var c=a.Fa;pe||J(),$||(pe(),$=!0),Q.add(c,a),a.v=0}}function Iu(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=ei(v(a.Fa,a),ap(a,a.v)),a.v++,!0)}t.Fa=function(){if(this.u=null,ip(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=ei(v(this.ab,this),a)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,mt(10),Ho(this),ip(this))};function xu(a){a.A!=null&&(l.clearTimeout(a.A),a.A=null)}function ip(a){a.g=new Ln(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var c=dn(a.qa);Se(c,"RID","rpc"),Se(c,"SID",a.K),Se(c,"AID",a.T),Se(c,"CI",a.F?"0":"1"),!a.F&&a.ja&&Se(c,"TO",a.ja),Se(c,"TYPE","xmlhttp"),ui(a,c),a.m&&a.o&&Eu(c,a.m,a.o),a.L&&(a.g.I=a.L);var d=a.g;a=a.ia,d.L=1,d.v=zo(dn(c)),d.m=null,d.P=!0,bf(d,a)}t.Za=function(){this.C!=null&&(this.C=null,Ho(this),Iu(this),mt(19))};function Ko(a){a.C!=null&&(l.clearTimeout(a.C),a.C=null)}function op(a,c){var d=null;if(a.g==c){Ko(a),xu(a),a.g=null;var g=2}else if(_u(a.h,c))d=c.D,jf(a.h,c),g=1;else return;if(a.G!=0){if(c.o)if(g==1){d=c.m?c.m.length:0,c=Date.now()-c.F;var N=a.B;g=Vo(),pt(g,new Cf(g,d)),qo(a)}else sp(a);else if(N=c.s,N==3||N==0&&0<c.X||!(g==1&&zw(a,c)||g==2&&Iu(a)))switch(d&&0<d.length&&(c=a.h,c.i=c.i.concat(d)),N){case 1:Er(a,5);break;case 4:Er(a,10);break;case 3:Er(a,6);break;default:Er(a,2)}}}function ap(a,c){let d=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(d*=2),d*c}function Er(a,c){if(a.j.info("Error code "+c),c==2){var d=v(a.fb,a),g=a.Xa;const N=!g;g=new wr(g||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||Fo(g,"https"),zo(g),N?Ow(g.toString(),d):Vw(g.toString(),d)}else mt(2);a.G=0,a.l&&a.l.sa(c),lp(a),tp(a)}t.fb=function(a){a?(this.j.info("Successfully pinged google.com"),mt(2)):(this.j.info("Failed to ping google.com"),mt(1))};function lp(a){if(a.G=0,a.ka=[],a.l){const c=Ff(a.h);(c.length!=0||a.i.length!=0)&&(O(a.ka,c),O(a.ka,a.i),a.h.i.length=0,P(a.i),a.i.length=0),a.l.ra()}}function up(a,c,d){var g=d instanceof wr?dn(d):new wr(d);if(g.g!="")c&&(g.g=c+"."+g.g),Uo(g,g.s);else{var N=l.location;g=N.protocol,c=c?c+"."+N.hostname:N.hostname,N=+N.port;var b=new wr(null);g&&Fo(b,g),c&&(b.g=c),N&&Uo(b,N),d&&(b.l=d),g=b}return d=a.D,c=a.ya,d&&c&&Se(g,d,c),Se(g,"VER",a.la),ui(a,g),g}function cp(a,c,d){if(c&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return c=a.Ca&&!a.pa?new Oe(new $o({eb:d})):new Oe(a.pa),c.Ha(a.J),c}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function hp(){}t=hp.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function Go(){}Go.prototype.g=function(a,c){return new At(a,c)};function At(a,c){rt.call(this),this.g=new ep(c),this.l=a,this.h=c&&c.messageUrlParams||null,a=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(a?a["X-WebChannel-Content-Type"]=c.messageContentType:a={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.va&&(a?a["X-WebChannel-Client-Profile"]=c.va:a={"X-WebChannel-Client-Profile":c.va}),this.g.S=a,(a=c&&c.Sb)&&!T(a)&&(this.g.m=a),this.v=c&&c.supportsCrossDomainXhr||!1,this.u=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!T(c)&&(this.g.D=c,a=this.h,a!==null&&c in a&&(a=this.h,c in a&&delete a[c])),this.j=new Qr(this)}C(At,rt),At.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},At.prototype.close=function(){Tu(this.g)},At.prototype.o=function(a){var c=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.u&&(d={},d.__data__=cu(a),a=d);c.i.push(new xw(c.Ya++,a)),c.G==3&&qo(c)},At.prototype.N=function(){this.g.l=null,delete this.j,Tu(this.g),delete this.g,At.aa.N.call(this)};function dp(a){du.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var c=a.__sm__;if(c){e:{for(const d in c){a=d;break e}a=void 0}(this.i=a)&&(a=this.i,c=c!==null&&a in c?c[a]:void 0),this.data=c}else this.data=a}C(dp,du);function fp(){fu.call(this),this.status=1}C(fp,fu);function Qr(a){this.g=a}C(Qr,hp),Qr.prototype.ua=function(){pt(this.g,"a")},Qr.prototype.ta=function(a){pt(this.g,new dp(a))},Qr.prototype.sa=function(a){pt(this.g,new fp)},Qr.prototype.ra=function(){pt(this.g,"b")},Go.prototype.createWebChannel=Go.prototype.g,At.prototype.send=At.prototype.o,At.prototype.open=At.prototype.m,At.prototype.close=At.prototype.close,K0=function(){return new Go},q0=function(){return Vo()},H0=vr,hh={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Lo.NO_ERROR=0,Lo.TIMEOUT=8,Lo.HTTP_ERROR=6,Va=Lo,Rf.COMPLETE="complete",W0=Rf,xf.EventType=Xs,Xs.OPEN="a",Xs.CLOSE="b",Xs.ERROR="c",Xs.MESSAGE="d",rt.prototype.listen=rt.prototype.K,Ii=xf,Oe.prototype.listenOnce=Oe.prototype.L,Oe.prototype.getLastError=Oe.prototype.Ka,Oe.prototype.getLastErrorCode=Oe.prototype.Ba,Oe.prototype.getStatus=Oe.prototype.Z,Oe.prototype.getResponseJson=Oe.prototype.Oa,Oe.prototype.getResponseText=Oe.prototype.oa,Oe.prototype.send=Oe.prototype.ea,Oe.prototype.setWithCredentials=Oe.prototype.Ha,B0=Oe}).apply(typeof pa<"u"?pa:typeof self<"u"?self:typeof window<"u"?window:{});const Jm="@firebase/firestore";/**
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
 */class ut{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}ut.UNAUTHENTICATED=new ut(null),ut.GOOGLE_CREDENTIALS=new ut("google-credentials-uid"),ut.FIRST_PARTY=new ut("first-party-uid"),ut.MOCK_USER=new ut("mock-user");/**
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
 */let Hs="10.14.0";/**
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
 */const Ur=new Td("@firebase/firestore");function vi(){return Ur.logLevel}function q(t,...e){if(Ur.logLevel<=de.DEBUG){const n=e.map(Od);Ur.debug(`Firestore (${Hs}): ${t}`,...n)}}function bn(t,...e){if(Ur.logLevel<=de.ERROR){const n=e.map(Od);Ur.error(`Firestore (${Hs}): ${t}`,...n)}}function Ds(t,...e){if(Ur.logLevel<=de.WARN){const n=e.map(Od);Ur.warn(`Firestore (${Hs}): ${t}`,...n)}}function Od(t){if(typeof t=="string")return t;try{/**
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
 */function ne(t="Unexpected state"){const e=`FIRESTORE (${Hs}) INTERNAL ASSERTION FAILED: `+t;throw bn(e),new Error(e)}function Te(t,e){t||ne()}function oe(t,e){return t}/**
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
 */const M={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class X extends Vn{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class br{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
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
 */class G0{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class JS{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(ut.UNAUTHENTICATED))}shutdown(){}}class XS{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class ZS{constructor(e){this.t=e,this.currentUser=ut.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){Te(this.o===void 0);let r=this.i;const s=u=>this.i!==r?(r=this.i,n(u)):Promise.resolve();let i=new br;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new br,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const u=i;e.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},l=u=>{q("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(u=>l(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?l(u):(q("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new br)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(q("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Te(typeof r.accessToken=="string"),new G0(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Te(e===null||typeof e=="string"),new ut(e)}}class ek{constructor(e,n,r){this.l=e,this.h=n,this.P=r,this.type="FirstParty",this.user=ut.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class tk{constructor(e,n,r){this.l=e,this.h=n,this.P=r}getToken(){return Promise.resolve(new ek(this.l,this.h,this.P))}start(e,n){e.enqueueRetryable(()=>n(ut.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class nk{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class rk{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,n){Te(this.o===void 0);const r=i=>{i.error!=null&&q("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.R;return this.R=i.token,q("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{q("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?s(i):q("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(Te(typeof n.token=="string"),this.R=n.token,new nk(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function sk(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
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
 */class Q0{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const s=sk(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<n&&(r+=e.charAt(s[i]%e.length))}return r}}function we(t,e){return t<e?-1:t>e?1:0}function Os(t,e,n){return t.length===e.length&&t.every((r,s)=>n(r,e[s]))}/**
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
 */class He{constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new X(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new X(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<-62135596800)throw new X(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new X(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return He.fromMillis(Date.now())}static fromDate(e){return He.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*n));return new He(n,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?we(this.nanoseconds,e.nanoseconds):we(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
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
 */class ie{constructor(e){this.timestamp=e}static fromTimestamp(e){return new ie(e)}static min(){return new ie(new He(0,0))}static max(){return new ie(new He(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */class oo{constructor(e,n,r){n===void 0?n=0:n>e.length&&ne(),r===void 0?r=e.length-n:r>e.length-n&&ne(),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return oo.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof oo?e.forEach(r=>{n.push(r)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let s=0;s<r;s++){const i=e.get(s),o=n.get(s);if(i<o)return-1;if(i>o)return 1}return e.length<n.length?-1:e.length>n.length?1:0}}class Le extends oo{construct(e,n,r){return new Le(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new X(M.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(s=>s.length>0))}return new Le(n)}static emptyPath(){return new Le([])}}const ik=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Xe extends oo{construct(e,n,r){return new Xe(e,n,r)}static isValidIdentifier(e){return ik.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Xe.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new Xe(["__name__"])}static fromServerFormat(e){const n=[];let r="",s=0;const i=()=>{if(r.length===0)throw new X(M.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let o=!1;for(;s<e.length;){const l=e[s];if(l==="\\"){if(s+1===e.length)throw new X(M.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new X(M.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else l==="`"?(o=!o,s++):l!=="."||o?(r+=l,s++):(i(),s++)}if(i(),o)throw new X(M.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Xe(n)}static emptyPath(){return new Xe([])}}/**
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
 */class Z{constructor(e){this.path=e}static fromPath(e){return new Z(Le.fromString(e))}static fromName(e){return new Z(Le.fromString(e).popFirst(5))}static empty(){return new Z(Le.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Le.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return Le.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new Z(new Le(e.slice()))}}function ok(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,s=ie.fromTimestamp(r===1e9?new He(n+1,0):new He(n,r));return new dr(s,Z.empty(),e)}function ak(t){return new dr(t.readTime,t.key,-1)}class dr{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new dr(ie.min(),Z.empty(),-1)}static max(){return new dr(ie.max(),Z.empty(),-1)}}function lk(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=Z.comparator(t.documentKey,e.documentKey),n!==0?n:we(t.largestBatchId,e.largestBatchId))}/**
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
 */const uk="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class ck{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function Co(t){if(t.code!==M.FAILED_PRECONDITION||t.message!==uk)throw t;q("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class V{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&ne(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new V((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(n,i).next(r,s)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof V?n:V.resolve(n)}catch(n){return V.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):V.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):V.reject(n)}static resolve(e){return new V((n,r)=>{n(e)})}static reject(e){return new V((n,r)=>{r(e)})}static waitFor(e){return new V((n,r)=>{let s=0,i=0,o=!1;e.forEach(l=>{++s,l.next(()=>{++i,o&&i===s&&n()},u=>r(u))}),o=!0,i===s&&n()})}static or(e){let n=V.resolve(!1);for(const r of e)n=n.next(s=>s?V.resolve(s):r());return n}static forEach(e,n){const r=[];return e.forEach((s,i)=>{r.push(n.call(this,s,i))}),this.waitFor(r)}static mapArray(e,n){return new V((r,s)=>{const i=e.length,o=new Array(i);let l=0;for(let u=0;u<i;u++){const h=u;n(e[h]).next(p=>{o[h]=p,++l,l===i&&r(o)},p=>s(p))}})}static doWhile(e,n){return new V((r,s)=>{const i=()=>{e()===!0?n().next(()=>{i()},s):r()};i()})}}function hk(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function Ro(t){return t.name==="IndexedDbTransactionError"}/**
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
 */class Vd{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this.ie(r),this.se=r=>n.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}Vd.oe=-1;function Kl(t){return t==null}function vl(t){return t===0&&1/t==-1/0}function dk(t){return typeof t=="number"&&Number.isInteger(t)&&!vl(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
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
 */function Xm(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function qs(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function Y0(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
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
 */class De{constructor(e,n){this.comparator=e,this.root=n||Je.EMPTY}insert(e,n){return new De(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,Je.BLACK,null,null))}remove(e){return new De(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Je.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return n+r.left.size;s<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,r)=>(e(n,r),!1))}toString(){const e=[];return this.inorderTraversal((n,r)=>(e.push(`${n}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new ma(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new ma(this.root,e,this.comparator,!1)}getReverseIterator(){return new ma(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new ma(this.root,e,this.comparator,!0)}}class ma{constructor(e,n,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=n?r(e.key,n):1,n&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Je{constructor(e,n,r,s,i){this.key=e,this.value=n,this.color=r??Je.RED,this.left=s??Je.EMPTY,this.right=i??Je.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,s,i){return new Je(e??this.key,n??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,n,r),null):i===0?s.copy(null,n,null,null,null):s.copy(null,null,null,null,s.right.insert(e,n,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Je.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,s=this;if(n(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),n(e,s.key)===0){if(s.right.isEmpty())return Je.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Je.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Je.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw ne();const e=this.left.check();if(e!==this.right.check())throw ne();return e+(this.isRed()?0:1)}}Je.EMPTY=null,Je.RED=!0,Je.BLACK=!1;Je.EMPTY=new class{constructor(){this.size=0}get key(){throw ne()}get value(){throw ne()}get color(){throw ne()}get left(){throw ne()}get right(){throw ne()}copy(e,n,r,s,i){return this}insert(e,n,r){return new Je(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class et{constructor(e){this.comparator=e,this.data=new De(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,r)=>(e(n),!1))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;n(s.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new Zm(this.data.getIterator())}getIteratorFrom(e){return new Zm(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(r=>{n=n.add(r)}),n}isEqual(e){if(!(e instanceof et)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new et(this.comparator);return n.data=e,n}}class Zm{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class Qt{constructor(e){this.fields=e,e.sort(Xe.comparator)}static empty(){return new Qt([])}unionWith(e){let n=new et(Xe.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new Qt(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return Os(this.fields,e.fields,(n,r)=>n.isEqual(r))}}/**
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
 */class J0 extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class nt{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new J0("Invalid base64 string: "+i):i}}(e);return new nt(n)}static fromUint8Array(e){const n=function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i}(e);return new nt(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return we(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}nt.EMPTY_BYTE_STRING=new nt("");const fk=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function fr(t){if(Te(!!t),typeof t=="string"){let e=0;const n=fk.exec(t);if(Te(!!n),n[1]){let s=n[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:je(t.seconds),nanos:je(t.nanos)}}function je(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function zr(t){return typeof t=="string"?nt.fromBase64String(t):nt.fromUint8Array(t)}/**
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
 */function Ld(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function Md(t){const e=t.mapValue.fields.__previous_value__;return Ld(e)?Md(e):e}function ao(t){const e=fr(t.mapValue.fields.__local_write_time__.timestampValue);return new He(e.seconds,e.nanos)}/**
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
 */class pk{constructor(e,n,r,s,i,o,l,u,h){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=l,this.longPollingOptions=u,this.useFetchStreams=h}}class lo{constructor(e,n){this.projectId=e,this.database=n||"(default)"}static empty(){return new lo("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof lo&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const ga={mapValue:{}};function $r(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?Ld(t)?4:gk(t)?9007199254740991:mk(t)?10:11:ne()}function cn(t,e){if(t===e)return!0;const n=$r(t);if(n!==$r(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return ao(t).isEqual(ao(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=fr(s.timestampValue),l=fr(i.timestampValue);return o.seconds===l.seconds&&o.nanos===l.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(s,i){return zr(s.bytesValue).isEqual(zr(i.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(s,i){return je(s.geoPointValue.latitude)===je(i.geoPointValue.latitude)&&je(s.geoPointValue.longitude)===je(i.geoPointValue.longitude)}(t,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return je(s.integerValue)===je(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=je(s.doubleValue),l=je(i.doubleValue);return o===l?vl(o)===vl(l):isNaN(o)&&isNaN(l)}return!1}(t,e);case 9:return Os(t.arrayValue.values||[],e.arrayValue.values||[],cn);case 10:case 11:return function(s,i){const o=s.mapValue.fields||{},l=i.mapValue.fields||{};if(Xm(o)!==Xm(l))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(l[u]===void 0||!cn(o[u],l[u])))return!1;return!0}(t,e);default:return ne()}}function uo(t,e){return(t.values||[]).find(n=>cn(n,e))!==void 0}function Vs(t,e){if(t===e)return 0;const n=$r(t),r=$r(e);if(n!==r)return we(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return we(t.booleanValue,e.booleanValue);case 2:return function(i,o){const l=je(i.integerValue||i.doubleValue),u=je(o.integerValue||o.doubleValue);return l<u?-1:l>u?1:l===u?0:isNaN(l)?isNaN(u)?0:-1:1}(t,e);case 3:return eg(t.timestampValue,e.timestampValue);case 4:return eg(ao(t),ao(e));case 5:return we(t.stringValue,e.stringValue);case 6:return function(i,o){const l=zr(i),u=zr(o);return l.compareTo(u)}(t.bytesValue,e.bytesValue);case 7:return function(i,o){const l=i.split("/"),u=o.split("/");for(let h=0;h<l.length&&h<u.length;h++){const p=we(l[h],u[h]);if(p!==0)return p}return we(l.length,u.length)}(t.referenceValue,e.referenceValue);case 8:return function(i,o){const l=we(je(i.latitude),je(o.latitude));return l!==0?l:we(je(i.longitude),je(o.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return tg(t.arrayValue,e.arrayValue);case 10:return function(i,o){var l,u,h,p;const m=i.fields||{},v=o.fields||{},_=(l=m.value)===null||l===void 0?void 0:l.arrayValue,C=(u=v.value)===null||u===void 0?void 0:u.arrayValue,P=we(((h=_==null?void 0:_.values)===null||h===void 0?void 0:h.length)||0,((p=C==null?void 0:C.values)===null||p===void 0?void 0:p.length)||0);return P!==0?P:tg(_,C)}(t.mapValue,e.mapValue);case 11:return function(i,o){if(i===ga.mapValue&&o===ga.mapValue)return 0;if(i===ga.mapValue)return 1;if(o===ga.mapValue)return-1;const l=i.fields||{},u=Object.keys(l),h=o.fields||{},p=Object.keys(h);u.sort(),p.sort();for(let m=0;m<u.length&&m<p.length;++m){const v=we(u[m],p[m]);if(v!==0)return v;const _=Vs(l[u[m]],h[p[m]]);if(_!==0)return _}return we(u.length,p.length)}(t.mapValue,e.mapValue);default:throw ne()}}function eg(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return we(t,e);const n=fr(t),r=fr(e),s=we(n.seconds,r.seconds);return s!==0?s:we(n.nanos,r.nanos)}function tg(t,e){const n=t.values||[],r=e.values||[];for(let s=0;s<n.length&&s<r.length;++s){const i=Vs(n[s],r[s]);if(i)return i}return we(n.length,r.length)}function Ls(t){return dh(t)}function dh(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(n){const r=fr(n);return`time(${r.seconds},${r.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?function(n){return zr(n).toBase64()}(t.bytesValue):"referenceValue"in t?function(n){return Z.fromName(n).toString()}(t.referenceValue):"geoPointValue"in t?function(n){return`geo(${n.latitude},${n.longitude})`}(t.geoPointValue):"arrayValue"in t?function(n){let r="[",s=!0;for(const i of n.values||[])s?s=!1:r+=",",r+=dh(i);return r+"]"}(t.arrayValue):"mapValue"in t?function(n){const r=Object.keys(n.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${dh(n.fields[o])}`;return s+"}"}(t.mapValue):ne()}function fh(t){return!!t&&"integerValue"in t}function jd(t){return!!t&&"arrayValue"in t}function ng(t){return!!t&&"nullValue"in t}function rg(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function La(t){return!!t&&"mapValue"in t}function mk(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="__vector__"}function Mi(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return qs(t.mapValue.fields,(n,r)=>e.mapValue.fields[n]=Mi(r)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=Mi(t.arrayValue.values[n]);return e}return Object.assign({},t)}function gk(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
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
 */class Lt{constructor(e){this.value=e}static empty(){return new Lt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!La(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=Mi(n)}setAll(e){let n=Xe.emptyPath(),r={},s=[];e.forEach((o,l)=>{if(!n.isImmediateParentOf(l)){const u=this.getFieldsMap(n);this.applyChanges(u,r,s),r={},s=[],n=l.popLast()}o?r[l.lastSegment()]=Mi(o):s.push(l.lastSegment())});const i=this.getFieldsMap(n);this.applyChanges(i,r,s)}delete(e){const n=this.field(e.popLast());La(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return cn(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=n.mapValue.fields[e.get(r)];La(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=s),n=s}return n.mapValue.fields}applyChanges(e,n,r){qs(n,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new Lt(Mi(this.value))}}function X0(t){const e=[];return qs(t.fields,(n,r)=>{const s=new Xe([n]);if(La(r)){const i=X0(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)}),new Qt(e)}/**
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
 */class ht{constructor(e,n,r,s,i,o,l){this.key=e,this.documentType=n,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=l}static newInvalidDocument(e){return new ht(e,0,ie.min(),ie.min(),ie.min(),Lt.empty(),0)}static newFoundDocument(e,n,r,s){return new ht(e,1,n,ie.min(),r,s,0)}static newNoDocument(e,n){return new ht(e,2,n,ie.min(),ie.min(),Lt.empty(),0)}static newUnknownDocument(e,n){return new ht(e,3,n,ie.min(),ie.min(),Lt.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(ie.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Lt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Lt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=ie.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof ht&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new ht(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class _l{constructor(e,n){this.position=e,this.inclusive=n}}function sg(t,e,n){let r=0;for(let s=0;s<t.position.length;s++){const i=e[s],o=t.position[s];if(i.field.isKeyField()?r=Z.comparator(Z.fromName(o.referenceValue),n.key):r=Vs(o,n.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function ig(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!cn(t.position[n],e.position[n]))return!1;return!0}/**
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
 */class wl{constructor(e,n="asc"){this.field=e,this.dir=n}}function yk(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
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
 */let Z0=class{};class Be extends Z0{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new _k(e,n,r):n==="array-contains"?new Tk(e,r):n==="in"?new Ik(e,r):n==="not-in"?new xk(e,r):n==="array-contains-any"?new Sk(e,r):new Be(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new wk(e,r):new Ek(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&this.matchesComparison(Vs(n,this.value)):n!==null&&$r(this.value)===$r(n)&&this.matchesComparison(Vs(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return ne()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class hn extends Z0{constructor(e,n){super(),this.filters=e,this.op=n,this.ae=null}static create(e,n){return new hn(e,n)}matches(e){return e_(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function e_(t){return t.op==="and"}function t_(t){return vk(t)&&e_(t)}function vk(t){for(const e of t.filters)if(e instanceof hn)return!1;return!0}function ph(t){if(t instanceof Be)return t.field.canonicalString()+t.op.toString()+Ls(t.value);if(t_(t))return t.filters.map(e=>ph(e)).join(",");{const e=t.filters.map(n=>ph(n)).join(",");return`${t.op}(${e})`}}function n_(t,e){return t instanceof Be?function(r,s){return s instanceof Be&&r.op===s.op&&r.field.isEqual(s.field)&&cn(r.value,s.value)}(t,e):t instanceof hn?function(r,s){return s instanceof hn&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,o,l)=>i&&n_(o,s.filters[l]),!0):!1}(t,e):void ne()}function r_(t){return t instanceof Be?function(n){return`${n.field.canonicalString()} ${n.op} ${Ls(n.value)}`}(t):t instanceof hn?function(n){return n.op.toString()+" {"+n.getFilters().map(r_).join(" ,")+"}"}(t):"Filter"}class _k extends Be{constructor(e,n,r){super(e,n,r),this.key=Z.fromName(r.referenceValue)}matches(e){const n=Z.comparator(e.key,this.key);return this.matchesComparison(n)}}class wk extends Be{constructor(e,n){super(e,"in",n),this.keys=s_("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class Ek extends Be{constructor(e,n){super(e,"not-in",n),this.keys=s_("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function s_(t,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(r=>Z.fromName(r.referenceValue))}class Tk extends Be{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return jd(n)&&uo(n.arrayValue,this.value)}}class Ik extends Be{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&uo(this.value.arrayValue,n)}}class xk extends Be{constructor(e,n){super(e,"not-in",n)}matches(e){if(uo(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&!uo(this.value.arrayValue,n)}}class Sk extends Be{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!jd(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>uo(this.value.arrayValue,r))}}/**
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
 */class kk{constructor(e,n=null,r=[],s=[],i=null,o=null,l=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=l,this.ue=null}}function og(t,e=null,n=[],r=[],s=null,i=null,o=null){return new kk(t,e,n,r,s,i,o)}function Fd(t){const e=oe(t);if(e.ue===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(r=>ph(r)).join(","),n+="|ob:",n+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),Kl(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>Ls(r)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>Ls(r)).join(",")),e.ue=n}return e.ue}function Ud(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!yk(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!n_(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!ig(t.startAt,e.startAt)&&ig(t.endAt,e.endAt)}function mh(t){return Z.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
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
 */class Gl{constructor(e,n=null,r=[],s=[],i=null,o="F",l=null,u=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=l,this.endAt=u,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function Ak(t,e,n,r,s,i,o,l){return new Gl(t,e,n,r,s,i,o,l)}function zd(t){return new Gl(t)}function ag(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function Ck(t){return t.collectionGroup!==null}function ji(t){const e=oe(t);if(e.ce===null){e.ce=[];const n=new Set;for(const i of e.explicitOrderBy)e.ce.push(i),n.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let l=new et(Xe.comparator);return o.filters.forEach(u=>{u.getFlattenedFilters().forEach(h=>{h.isInequality()&&(l=l.add(h.field))})}),l})(e).forEach(i=>{n.has(i.canonicalString())||i.isKeyField()||e.ce.push(new wl(i,r))}),n.has(Xe.keyField().canonicalString())||e.ce.push(new wl(Xe.keyField(),r))}return e.ce}function ln(t){const e=oe(t);return e.le||(e.le=Rk(e,ji(t))),e.le}function Rk(t,e){if(t.limitType==="F")return og(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new wl(s.field,i)});const n=t.endAt?new _l(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new _l(t.startAt.position,t.startAt.inclusive):null;return og(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}function gh(t,e,n){return new Gl(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function Ql(t,e){return Ud(ln(t),ln(e))&&t.limitType===e.limitType}function i_(t){return`${Fd(ln(t))}|lt:${t.limitType}`}function Xr(t){return`Query(target=${function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map(s=>r_(s)).join(", ")}]`),Kl(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map(s=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(s)).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map(s=>Ls(s)).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map(s=>Ls(s)).join(",")),`Target(${r})`}(ln(t))}; limitType=${t.limitType})`}function Yl(t,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):Z.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(t,e)&&function(r,s){for(const i of ji(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(t,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(t,e)&&function(r,s){return!(r.startAt&&!function(o,l,u){const h=sg(o,l,u);return o.inclusive?h<=0:h<0}(r.startAt,ji(r),s)||r.endAt&&!function(o,l,u){const h=sg(o,l,u);return o.inclusive?h>=0:h>0}(r.endAt,ji(r),s))}(t,e)}function Pk(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function o_(t){return(e,n)=>{let r=!1;for(const s of ji(t)){const i=Nk(s,e,n);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function Nk(t,e,n){const r=t.field.isKeyField()?Z.comparator(e.key,n.key):function(i,o,l){const u=o.data.field(i),h=l.data.field(i);return u!==null&&h!==null?Vs(u,h):ne()}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return ne()}}/**
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
 */class Ks{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,n]);s.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[n]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){qs(this.inner,(n,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return Y0(this.inner)}size(){return this.innerSize}}/**
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
 */const bk=new De(Z.comparator);function Dn(){return bk}const a_=new De(Z.comparator);function xi(...t){let e=a_;for(const n of t)e=e.insert(n.key,n);return e}function l_(t){let e=a_;return t.forEach((n,r)=>e=e.insert(n,r.overlayedDocument)),e}function Cr(){return Fi()}function u_(){return Fi()}function Fi(){return new Ks(t=>t.toString(),(t,e)=>t.isEqual(e))}const Dk=new De(Z.comparator),Ok=new et(Z.comparator);function he(...t){let e=Ok;for(const n of t)e=e.add(n);return e}const Vk=new et(we);function Lk(){return Vk}/**
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
 */function $d(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:vl(e)?"-0":e}}function c_(t){return{integerValue:""+t}}function Mk(t,e){return dk(e)?c_(e):$d(t,e)}/**
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
 */class Jl{constructor(){this._=void 0}}function jk(t,e,n){return t instanceof co?function(s,i){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Ld(i)&&(i=Md(i)),i&&(o.fields.__previous_value__=i),{mapValue:o}}(n,e):t instanceof ho?d_(t,e):t instanceof fo?f_(t,e):function(s,i){const o=h_(s,i),l=lg(o)+lg(s.Pe);return fh(o)&&fh(s.Pe)?c_(l):$d(s.serializer,l)}(t,e)}function Fk(t,e,n){return t instanceof ho?d_(t,e):t instanceof fo?f_(t,e):n}function h_(t,e){return t instanceof El?function(r){return fh(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class co extends Jl{}class ho extends Jl{constructor(e){super(),this.elements=e}}function d_(t,e){const n=p_(e);for(const r of t.elements)n.some(s=>cn(s,r))||n.push(r);return{arrayValue:{values:n}}}class fo extends Jl{constructor(e){super(),this.elements=e}}function f_(t,e){let n=p_(e);for(const r of t.elements)n=n.filter(s=>!cn(s,r));return{arrayValue:{values:n}}}class El extends Jl{constructor(e,n){super(),this.serializer=e,this.Pe=n}}function lg(t){return je(t.integerValue||t.doubleValue)}function p_(t){return jd(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}/**
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
 */class Uk{constructor(e,n){this.field=e,this.transform=n}}function zk(t,e){return t.field.isEqual(e.field)&&function(r,s){return r instanceof ho&&s instanceof ho||r instanceof fo&&s instanceof fo?Os(r.elements,s.elements,cn):r instanceof El&&s instanceof El?cn(r.Pe,s.Pe):r instanceof co&&s instanceof co}(t.transform,e.transform)}class $k{constructor(e,n){this.version=e,this.transformResults=n}}class In{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new In}static exists(e){return new In(void 0,e)}static updateTime(e){return new In(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Ma(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class Xl{}function m_(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new y_(t.key,In.none()):new Po(t.key,t.data,In.none());{const n=t.data,r=Lt.empty();let s=new et(Xe.comparator);for(let i of e.fields)if(!s.has(i)){let o=n.field(i);o===null&&i.length>1&&(i=i.popLast(),o=n.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new Hr(t.key,r,new Qt(s.toArray()),In.none())}}function Bk(t,e,n){t instanceof Po?function(s,i,o){const l=s.value.clone(),u=cg(s.fieldTransforms,i,o.transformResults);l.setAll(u),i.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(t,e,n):t instanceof Hr?function(s,i,o){if(!Ma(s.precondition,i))return void i.convertToUnknownDocument(o.version);const l=cg(s.fieldTransforms,i,o.transformResults),u=i.data;u.setAll(g_(s)),u.setAll(l),i.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(t,e,n):function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,n)}function Ui(t,e,n,r){return t instanceof Po?function(i,o,l,u){if(!Ma(i.precondition,o))return l;const h=i.value.clone(),p=hg(i.fieldTransforms,u,o);return h.setAll(p),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null}(t,e,n,r):t instanceof Hr?function(i,o,l,u){if(!Ma(i.precondition,o))return l;const h=hg(i.fieldTransforms,u,o),p=o.data;return p.setAll(g_(i)),p.setAll(h),o.convertToFoundDocument(o.version,p).setHasLocalMutations(),l===null?null:l.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(m=>m.field))}(t,e,n,r):function(i,o,l){return Ma(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):l}(t,e,n)}function Wk(t,e){let n=null;for(const r of t.fieldTransforms){const s=e.data.field(r.field),i=h_(r.transform,s||null);i!=null&&(n===null&&(n=Lt.empty()),n.set(r.field,i))}return n||null}function ug(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Os(r,s,(i,o)=>zk(i,o))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class Po extends Xl{constructor(e,n,r,s=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Hr extends Xl{constructor(e,n,r,s,i=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function g_(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function cg(t,e,n){const r=new Map;Te(t.length===n.length);for(let s=0;s<n.length;s++){const i=t[s],o=i.transform,l=e.data.field(i.field);r.set(i.field,Fk(o,l,n[s]))}return r}function hg(t,e,n){const r=new Map;for(const s of t){const i=s.transform,o=n.data.field(s.field);r.set(s.field,jk(i,o,e))}return r}class y_ extends Xl{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Hk extends Xl{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class qk{constructor(e,n,r,s){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&Bk(i,e,r[s])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=Ui(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=Ui(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=u_();return this.mutations.forEach(s=>{const i=e.get(s.key),o=i.overlayedDocument;let l=this.applyToLocalView(o,i.mutatedFields);l=n.has(s.key)?null:l;const u=m_(o,l);u!==null&&r.set(s.key,u),o.isValidDocument()||o.convertToNoDocument(ie.min())}),r}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),he())}isEqual(e){return this.batchId===e.batchId&&Os(this.mutations,e.mutations,(n,r)=>ug(n,r))&&Os(this.baseMutations,e.baseMutations,(n,r)=>ug(n,r))}}class Bd{constructor(e,n,r,s){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=s}static from(e,n,r){Te(e.mutations.length===r.length);let s=function(){return Dk}();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new Bd(e,n,r,s)}}/**
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
 */class Kk{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class Gk{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
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
 */var Ue,fe;function Qk(t){switch(t){default:return ne();case M.CANCELLED:case M.UNKNOWN:case M.DEADLINE_EXCEEDED:case M.RESOURCE_EXHAUSTED:case M.INTERNAL:case M.UNAVAILABLE:case M.UNAUTHENTICATED:return!1;case M.INVALID_ARGUMENT:case M.NOT_FOUND:case M.ALREADY_EXISTS:case M.PERMISSION_DENIED:case M.FAILED_PRECONDITION:case M.ABORTED:case M.OUT_OF_RANGE:case M.UNIMPLEMENTED:case M.DATA_LOSS:return!0}}function v_(t){if(t===void 0)return bn("GRPC error has no .code"),M.UNKNOWN;switch(t){case Ue.OK:return M.OK;case Ue.CANCELLED:return M.CANCELLED;case Ue.UNKNOWN:return M.UNKNOWN;case Ue.DEADLINE_EXCEEDED:return M.DEADLINE_EXCEEDED;case Ue.RESOURCE_EXHAUSTED:return M.RESOURCE_EXHAUSTED;case Ue.INTERNAL:return M.INTERNAL;case Ue.UNAVAILABLE:return M.UNAVAILABLE;case Ue.UNAUTHENTICATED:return M.UNAUTHENTICATED;case Ue.INVALID_ARGUMENT:return M.INVALID_ARGUMENT;case Ue.NOT_FOUND:return M.NOT_FOUND;case Ue.ALREADY_EXISTS:return M.ALREADY_EXISTS;case Ue.PERMISSION_DENIED:return M.PERMISSION_DENIED;case Ue.FAILED_PRECONDITION:return M.FAILED_PRECONDITION;case Ue.ABORTED:return M.ABORTED;case Ue.OUT_OF_RANGE:return M.OUT_OF_RANGE;case Ue.UNIMPLEMENTED:return M.UNIMPLEMENTED;case Ue.DATA_LOSS:return M.DATA_LOSS;default:return ne()}}(fe=Ue||(Ue={}))[fe.OK=0]="OK",fe[fe.CANCELLED=1]="CANCELLED",fe[fe.UNKNOWN=2]="UNKNOWN",fe[fe.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",fe[fe.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",fe[fe.NOT_FOUND=5]="NOT_FOUND",fe[fe.ALREADY_EXISTS=6]="ALREADY_EXISTS",fe[fe.PERMISSION_DENIED=7]="PERMISSION_DENIED",fe[fe.UNAUTHENTICATED=16]="UNAUTHENTICATED",fe[fe.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",fe[fe.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",fe[fe.ABORTED=10]="ABORTED",fe[fe.OUT_OF_RANGE=11]="OUT_OF_RANGE",fe[fe.UNIMPLEMENTED=12]="UNIMPLEMENTED",fe[fe.INTERNAL=13]="INTERNAL",fe[fe.UNAVAILABLE=14]="UNAVAILABLE",fe[fe.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function Yk(){return new TextEncoder}/**
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
 */const Jk=new Nr([4294967295,4294967295],0);function dg(t){const e=Yk().encode(t),n=new $0;return n.update(e),new Uint8Array(n.digest())}function fg(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Nr([n,r],0),new Nr([s,i],0)]}class Wd{constructor(e,n,r){if(this.bitmap=e,this.padding=n,this.hashCount=r,n<0||n>=8)throw new Si(`Invalid padding: ${n}`);if(r<0)throw new Si(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Si(`Invalid hash count: ${r}`);if(e.length===0&&n!==0)throw new Si(`Invalid padding when bitmap length is 0: ${n}`);this.Ie=8*e.length-n,this.Te=Nr.fromNumber(this.Ie)}Ee(e,n,r){let s=e.add(n.multiply(Nr.fromNumber(r)));return s.compare(Jk)===1&&(s=new Nr([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const n=dg(e),[r,s]=fg(n);for(let i=0;i<this.hashCount;i++){const o=this.Ee(r,s,i);if(!this.de(o))return!1}return!0}static create(e,n,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new Wd(i,s,n);return r.forEach(l=>o.insert(l)),o}insert(e){if(this.Ie===0)return;const n=dg(e),[r,s]=fg(n);for(let i=0;i<this.hashCount;i++){const o=this.Ee(r,s,i);this.Ae(o)}}Ae(e){const n=Math.floor(e/8),r=e%8;this.bitmap[n]|=1<<r}}class Si extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class Zl{constructor(e,n,r,s,i){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const s=new Map;return s.set(e,No.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new Zl(ie.min(),s,new De(we),Dn(),he())}}class No{constructor(e,n,r,s,i){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new No(r,n,he(),he(),he())}}/**
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
 */class ja{constructor(e,n,r,s){this.Re=e,this.removedTargetIds=n,this.key=r,this.Ve=s}}class __{constructor(e,n){this.targetId=e,this.me=n}}class w_{constructor(e,n,r=nt.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=s}}class pg{constructor(){this.fe=0,this.ge=gg(),this.pe=nt.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=he(),n=he(),r=he();return this.ge.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:n=n.add(s);break;case 1:r=r.add(s);break;default:ne()}}),new No(this.pe,this.ye,e,n,r)}Ce(){this.we=!1,this.ge=gg()}Fe(e,n){this.we=!0,this.ge=this.ge.insert(e,n)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,Te(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class Xk{constructor(e){this.Le=e,this.Be=new Map,this.ke=Dn(),this.qe=mg(),this.Qe=new De(we)}Ke(e){for(const n of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(n,e.Ve):this.Ue(n,e.key,e.Ve);for(const n of e.removedTargetIds)this.Ue(n,e.key,e.Ve)}We(e){this.forEachTarget(e,n=>{const r=this.Ge(n);switch(e.state){case 0:this.ze(n)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(n);break;case 3:this.ze(n)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(n)&&(this.je(n),r.De(e.resumeToken));break;default:ne()}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.Be.forEach((r,s)=>{this.ze(s)&&n(s)})}He(e){const n=e.targetId,r=e.me.count,s=this.Je(n);if(s){const i=s.target;if(mh(i))if(r===0){const o=new Z(i.path);this.Ue(n,o,ht.newNoDocument(o,ie.min()))}else Te(r===1);else{const o=this.Ye(n);if(o!==r){const l=this.Ze(e),u=l?this.Xe(l,e,o):1;if(u!==0){this.je(n);const h=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(n,h)}}}}}Ze(e){const n=e.me.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=n;let o,l;try{o=zr(r).toUint8Array()}catch(u){if(u instanceof J0)return Ds("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{l=new Wd(o,s,i)}catch(u){return Ds(u instanceof Si?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return l.Ie===0?null:l}Xe(e,n,r){return n.me.count===r-this.nt(e,n.targetId)?0:2}nt(e,n){const r=this.Le.getRemoteKeysForTarget(n);let s=0;return r.forEach(i=>{const o=this.Le.tt(),l=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(l)||(this.Ue(n,i,null),s++)}),s}rt(e){const n=new Map;this.Be.forEach((i,o)=>{const l=this.Je(o);if(l){if(i.current&&mh(l.target)){const u=new Z(l.target.path);this.ke.get(u)!==null||this.it(o,u)||this.Ue(o,u,ht.newNoDocument(u,e))}i.be&&(n.set(o,i.ve()),i.Ce())}});let r=he();this.qe.forEach((i,o)=>{let l=!0;o.forEachWhile(u=>{const h=this.Je(u);return!h||h.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(i))}),this.ke.forEach((i,o)=>o.setReadTime(e));const s=new Zl(e,n,this.Qe,this.ke,r);return this.ke=Dn(),this.qe=mg(),this.Qe=new De(we),s}$e(e,n){if(!this.ze(e))return;const r=this.it(e,n.key)?2:0;this.Ge(e).Fe(n.key,r),this.ke=this.ke.insert(n.key,n),this.qe=this.qe.insert(n.key,this.st(n.key).add(e))}Ue(e,n,r){if(!this.ze(e))return;const s=this.Ge(e);this.it(e,n)?s.Fe(n,1):s.Me(n),this.qe=this.qe.insert(n,this.st(n).delete(e)),r&&(this.ke=this.ke.insert(n,r))}removeTarget(e){this.Be.delete(e)}Ye(e){const n=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let n=this.Be.get(e);return n||(n=new pg,this.Be.set(e,n)),n}st(e){let n=this.qe.get(e);return n||(n=new et(we),this.qe=this.qe.insert(e,n)),n}ze(e){const n=this.Je(e)!==null;return n||q("WatchChangeAggregator","Detected inactive target",e),n}Je(e){const n=this.Be.get(e);return n&&n.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new pg),this.Le.getRemoteKeysForTarget(e).forEach(n=>{this.Ue(e,n,null)})}it(e,n){return this.Le.getRemoteKeysForTarget(e).has(n)}}function mg(){return new De(Z.comparator)}function gg(){return new De(Z.comparator)}const Zk={asc:"ASCENDING",desc:"DESCENDING"},eA={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},tA={and:"AND",or:"OR"};class nA{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function yh(t,e){return t.useProto3Json||Kl(e)?e:{value:e}}function Tl(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function E_(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function rA(t,e){return Tl(t,e.toTimestamp())}function un(t){return Te(!!t),ie.fromTimestamp(function(n){const r=fr(n);return new He(r.seconds,r.nanos)}(t))}function Hd(t,e){return vh(t,e).canonicalString()}function vh(t,e){const n=function(s){return new Le(["projects",s.projectId,"databases",s.database])}(t).child("documents");return e===void 0?n:n.child(e)}function T_(t){const e=Le.fromString(t);return Te(A_(e)),e}function _h(t,e){return Hd(t.databaseId,e.path)}function ic(t,e){const n=T_(e);if(n.get(1)!==t.databaseId.projectId)throw new X(M.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new X(M.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new Z(x_(n))}function I_(t,e){return Hd(t.databaseId,e)}function sA(t){const e=T_(t);return e.length===4?Le.emptyPath():x_(e)}function wh(t){return new Le(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function x_(t){return Te(t.length>4&&t.get(4)==="documents"),t.popFirst(5)}function yg(t,e,n){return{name:_h(t,e),fields:n.value.mapValue.fields}}function iA(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:ne()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(h,p){return h.useProto3Json?(Te(p===void 0||typeof p=="string"),nt.fromBase64String(p||"")):(Te(p===void 0||p instanceof Buffer||p instanceof Uint8Array),nt.fromUint8Array(p||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,l=o&&function(h){const p=h.code===void 0?M.UNKNOWN:v_(h.code);return new X(p,h.message||"")}(o);n=new w_(r,s,i,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=ic(t,r.document.name),i=un(r.document.updateTime),o=r.document.createTime?un(r.document.createTime):ie.min(),l=new Lt({mapValue:{fields:r.document.fields}}),u=ht.newFoundDocument(s,i,o,l),h=r.targetIds||[],p=r.removedTargetIds||[];n=new ja(h,p,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=ic(t,r.document),i=r.readTime?un(r.readTime):ie.min(),o=ht.newNoDocument(s,i),l=r.removedTargetIds||[];n=new ja([],l,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=ic(t,r.document),i=r.removedTargetIds||[];n=new ja([],i,s,null)}else{if(!("filter"in e))return ne();{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new Gk(s,i),l=r.targetId;n=new __(l,o)}}return n}function oA(t,e){let n;if(e instanceof Po)n={update:yg(t,e.key,e.value)};else if(e instanceof y_)n={delete:_h(t,e.key)};else if(e instanceof Hr)n={update:yg(t,e.key,e.data),updateMask:mA(e.fieldMask)};else{if(!(e instanceof Hk))return ne();n={verify:_h(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(r=>function(i,o){const l=o.transform;if(l instanceof co)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof ho)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof fo)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof El)return{fieldPath:o.field.canonicalString(),increment:l.Pe};throw ne()}(0,r))),e.precondition.isNone||(n.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:rA(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:ne()}(t,e.precondition)),n}function aA(t,e){return t&&t.length>0?(Te(e!==void 0),t.map(n=>function(s,i){let o=s.updateTime?un(s.updateTime):un(i);return o.isEqual(ie.min())&&(o=un(i)),new $k(o,s.transformResults||[])}(n,e))):[]}function lA(t,e){return{documents:[I_(t,e.path)]}}function uA(t,e){const n={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=I_(t,s);const i=function(h){if(h.length!==0)return k_(hn.create(h,"and"))}(e.filters);i&&(n.structuredQuery.where=i);const o=function(h){if(h.length!==0)return h.map(p=>function(v){return{field:Zr(v.field),direction:dA(v.dir)}}(p))}(e.orderBy);o&&(n.structuredQuery.orderBy=o);const l=yh(t,e.limit);return l!==null&&(n.structuredQuery.limit=l),e.startAt&&(n.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{_t:n,parent:s}}function cA(t){let e=sA(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){Te(r===1);const p=n.from[0];p.allDescendants?s=p.collectionId:e=e.child(p.collectionId)}let i=[];n.where&&(i=function(m){const v=S_(m);return v instanceof hn&&t_(v)?v.getFilters():[v]}(n.where));let o=[];n.orderBy&&(o=function(m){return m.map(v=>function(C){return new wl(es(C.field),function(O){switch(O){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(C.direction))}(v))}(n.orderBy));let l=null;n.limit&&(l=function(m){let v;return v=typeof m=="object"?m.value:m,Kl(v)?null:v}(n.limit));let u=null;n.startAt&&(u=function(m){const v=!!m.before,_=m.values||[];return new _l(_,v)}(n.startAt));let h=null;return n.endAt&&(h=function(m){const v=!m.before,_=m.values||[];return new _l(_,v)}(n.endAt)),Ak(e,s,o,i,l,"F",u,h)}function hA(t,e){const n=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return ne()}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function S_(t){return t.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=es(n.unaryFilter.field);return Be.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=es(n.unaryFilter.field);return Be.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=es(n.unaryFilter.field);return Be.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=es(n.unaryFilter.field);return Be.create(o,"!=",{nullValue:"NULL_VALUE"});default:return ne()}}(t):t.fieldFilter!==void 0?function(n){return Be.create(es(n.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return ne()}}(n.fieldFilter.op),n.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(n){return hn.create(n.compositeFilter.filters.map(r=>S_(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return ne()}}(n.compositeFilter.op))}(t):ne()}function dA(t){return Zk[t]}function fA(t){return eA[t]}function pA(t){return tA[t]}function Zr(t){return{fieldPath:t.canonicalString()}}function es(t){return Xe.fromServerFormat(t.fieldPath)}function k_(t){return t instanceof Be?function(n){if(n.op==="=="){if(rg(n.value))return{unaryFilter:{field:Zr(n.field),op:"IS_NAN"}};if(ng(n.value))return{unaryFilter:{field:Zr(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(rg(n.value))return{unaryFilter:{field:Zr(n.field),op:"IS_NOT_NAN"}};if(ng(n.value))return{unaryFilter:{field:Zr(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Zr(n.field),op:fA(n.op),value:n.value}}}(t):t instanceof hn?function(n){const r=n.getFilters().map(s=>k_(s));return r.length===1?r[0]:{compositeFilter:{op:pA(n.op),filters:r}}}(t):ne()}function mA(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function A_(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
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
 */class Xn{constructor(e,n,r,s,i=ie.min(),o=ie.min(),l=nt.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=l,this.expectedCount=u}withSequenceNumber(e){return new Xn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new Xn(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Xn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Xn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class gA{constructor(e){this.ct=e}}function yA(t){const e=cA({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?gh(e,e.limit,"L"):e}/**
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
 */class vA{constructor(){this.un=new _A}addToCollectionParentIndex(e,n){return this.un.add(n),V.resolve()}getCollectionParents(e,n){return V.resolve(this.un.getEntries(n))}addFieldIndex(e,n){return V.resolve()}deleteFieldIndex(e,n){return V.resolve()}deleteAllFieldIndexes(e){return V.resolve()}createTargetIndexes(e,n){return V.resolve()}getDocumentsMatchingTarget(e,n){return V.resolve(null)}getIndexType(e,n){return V.resolve(0)}getFieldIndexes(e,n){return V.resolve([])}getNextCollectionGroupToUpdate(e){return V.resolve(null)}getMinOffset(e,n){return V.resolve(dr.min())}getMinOffsetFromCollectionGroup(e,n){return V.resolve(dr.min())}updateCollectionGroup(e,n,r){return V.resolve()}updateIndexEntries(e,n){return V.resolve()}}class _A{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n]||new et(Le.comparator),i=!s.has(r);return this.index[n]=s.add(r),i}has(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n];return s&&s.has(r)}getEntries(e){return(this.index[e]||new et(Le.comparator)).toArray()}}/**
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
 */class Ms{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new Ms(0)}static kn(){return new Ms(-1)}}/**
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
 */class wA{constructor(){this.changes=new Ks(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,ht.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?V.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class EA{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
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
 */class TA{constructor(e,n,r,s){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,n))).next(s=>(r!==null&&Ui(r.mutation,s,Qt.empty(),He.now()),s))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.getLocalViewOfDocuments(e,r,he()).next(()=>r))}getLocalViewOfDocuments(e,n,r=he()){const s=Cr();return this.populateOverlays(e,s,n).next(()=>this.computeViews(e,n,s,r).next(i=>{let o=xi();return i.forEach((l,u)=>{o=o.insert(l,u.overlayedDocument)}),o}))}getOverlayedDocuments(e,n){const r=Cr();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,he()))}populateOverlays(e,n,r){const s=[];return r.forEach(i=>{n.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((o,l)=>{n.set(o,l)})})}computeViews(e,n,r,s){let i=Dn();const o=Fi(),l=function(){return Fi()}();return n.forEach((u,h)=>{const p=r.get(h.key);s.has(h.key)&&(p===void 0||p.mutation instanceof Hr)?i=i.insert(h.key,h):p!==void 0?(o.set(h.key,p.mutation.getFieldMask()),Ui(p.mutation,h,p.mutation.getFieldMask(),He.now())):o.set(h.key,Qt.empty())}),this.recalculateAndSaveOverlays(e,i).next(u=>(u.forEach((h,p)=>o.set(h,p)),n.forEach((h,p)=>{var m;return l.set(h,new EA(p,(m=o.get(h))!==null&&m!==void 0?m:null))}),l))}recalculateAndSaveOverlays(e,n){const r=Fi();let s=new De((o,l)=>o-l),i=he();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(o=>{for(const l of o)l.keys().forEach(u=>{const h=n.get(u);if(h===null)return;let p=r.get(u)||Qt.empty();p=l.applyToLocalView(h,p),r.set(u,p);const m=(s.get(l.batchId)||he()).add(u);s=s.insert(l.batchId,m)})}).next(()=>{const o=[],l=s.getReverseIterator();for(;l.hasNext();){const u=l.getNext(),h=u.key,p=u.value,m=u_();p.forEach(v=>{if(!i.has(v)){const _=m_(n.get(v),r.get(v));_!==null&&m.set(v,_),i=i.add(v)}}),o.push(this.documentOverlayCache.saveOverlays(e,h,m))}return V.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,n,r,s){return function(o){return Z.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):Ck(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r,s):this.getDocumentsMatchingCollectionQuery(e,n,r,s)}getNextDocuments(e,n,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,s).next(i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,s-i.size):V.resolve(Cr());let l=-1,u=i;return o.next(h=>V.forEach(h,(p,m)=>(l<m.largestBatchId&&(l=m.largestBatchId),i.get(p)?V.resolve():this.remoteDocumentCache.getEntry(e,p).next(v=>{u=u.insert(p,v)}))).next(()=>this.populateOverlays(e,h,i)).next(()=>this.computeViews(e,u,h,he())).next(p=>({batchId:l,changes:l_(p)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new Z(n)).next(r=>{let s=xi();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,n,r,s){const i=n.collectionGroup;let o=xi();return this.indexManager.getCollectionParents(e,i).next(l=>V.forEach(l,u=>{const h=function(m,v){return new Gl(v,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)}(n,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,r,s).next(p=>{p.forEach((m,v)=>{o=o.insert(m,v)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,n,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next(o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,i,s))).next(o=>{i.forEach((u,h)=>{const p=h.getKey();o.get(p)===null&&(o=o.insert(p,ht.newInvalidDocument(p)))});let l=xi();return o.forEach((u,h)=>{const p=i.get(u);p!==void 0&&Ui(p.mutation,h,Qt.empty(),He.now()),Yl(n,h)&&(l=l.insert(u,h))}),l})}}/**
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
 */class IA{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,n){return V.resolve(this.hr.get(n))}saveBundleMetadata(e,n){return this.hr.set(n.id,function(s){return{id:s.id,version:s.version,createTime:un(s.createTime)}}(n)),V.resolve()}getNamedQuery(e,n){return V.resolve(this.Pr.get(n))}saveNamedQuery(e,n){return this.Pr.set(n.name,function(s){return{name:s.name,query:yA(s.bundledQuery),readTime:un(s.readTime)}}(n)),V.resolve()}}/**
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
 */class xA{constructor(){this.overlays=new De(Z.comparator),this.Ir=new Map}getOverlay(e,n){return V.resolve(this.overlays.get(n))}getOverlays(e,n){const r=Cr();return V.forEach(n,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,n,r){return r.forEach((s,i)=>{this.ht(e,n,i)}),V.resolve()}removeOverlaysForBatchId(e,n,r){const s=this.Ir.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Ir.delete(r)),V.resolve()}getOverlaysForCollection(e,n,r){const s=Cr(),i=n.length+1,o=new Z(n.child("")),l=this.overlays.getIteratorFrom(o);for(;l.hasNext();){const u=l.getNext().value,h=u.getKey();if(!n.isPrefixOf(h.path))break;h.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return V.resolve(s)}getOverlaysForCollectionGroup(e,n,r,s){let i=new De((h,p)=>h-p);const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===n&&h.largestBatchId>r){let p=i.get(h.largestBatchId);p===null&&(p=Cr(),i=i.insert(h.largestBatchId,p)),p.set(h.getKey(),h)}}const l=Cr(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((h,p)=>l.set(h,p)),!(l.size()>=s)););return V.resolve(l)}ht(e,n,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.Ir.get(s.largestBatchId).delete(r.key);this.Ir.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new Kk(n,r));let i=this.Ir.get(n);i===void 0&&(i=he(),this.Ir.set(n,i)),this.Ir.set(n,i.add(r.key))}}/**
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
 */class SA{constructor(){this.sessionToken=nt.EMPTY_BYTE_STRING}getSessionToken(e){return V.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,V.resolve()}}/**
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
 */class qd{constructor(){this.Tr=new et(qe.Er),this.dr=new et(qe.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,n){const r=new qe(e,n);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,n){e.forEach(r=>this.addReference(r,n))}removeReference(e,n){this.Vr(new qe(e,n))}mr(e,n){e.forEach(r=>this.removeReference(r,n))}gr(e){const n=new Z(new Le([])),r=new qe(n,e),s=new qe(n,e+1),i=[];return this.dr.forEachInRange([r,s],o=>{this.Vr(o),i.push(o.key)}),i}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const n=new Z(new Le([])),r=new qe(n,e),s=new qe(n,e+1);let i=he();return this.dr.forEachInRange([r,s],o=>{i=i.add(o.key)}),i}containsKey(e){const n=new qe(e,0),r=this.Tr.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class qe{constructor(e,n){this.key=e,this.wr=n}static Er(e,n){return Z.comparator(e.key,n.key)||we(e.wr,n.wr)}static Ar(e,n){return we(e.wr,n.wr)||Z.comparator(e.key,n.key)}}/**
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
 */class kA{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.Sr=1,this.br=new et(qe.Er)}checkEmpty(e){return V.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,s){const i=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new qk(i,n,r,s);this.mutationQueue.push(o);for(const l of s)this.br=this.br.add(new qe(l.key,i)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return V.resolve(o)}lookupMutationBatch(e,n){return V.resolve(this.Dr(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,s=this.vr(r),i=s<0?0:s;return V.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return V.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return V.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new qe(n,0),s=new qe(n,Number.POSITIVE_INFINITY),i=[];return this.br.forEachInRange([r,s],o=>{const l=this.Dr(o.wr);i.push(l)}),V.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new et(we);return n.forEach(s=>{const i=new qe(s,0),o=new qe(s,Number.POSITIVE_INFINITY);this.br.forEachInRange([i,o],l=>{r=r.add(l.wr)})}),V.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,s=r.length+1;let i=r;Z.isDocumentKey(i)||(i=i.child(""));const o=new qe(new Z(i),0);let l=new et(we);return this.br.forEachWhile(u=>{const h=u.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(l=l.add(u.wr)),!0)},o),V.resolve(this.Cr(l))}Cr(e){const n=[];return e.forEach(r=>{const s=this.Dr(r);s!==null&&n.push(s)}),n}removeMutationBatch(e,n){Te(this.Fr(n.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return V.forEach(n.mutations,s=>{const i=new qe(s.key,n.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.br=r})}On(e){}containsKey(e,n){const r=new qe(n,0),s=this.br.firstAfterOrEqual(r);return V.resolve(n.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,V.resolve()}Fr(e,n){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const n=this.vr(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
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
 */class AA{constructor(e){this.Mr=e,this.docs=function(){return new De(Z.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,s=this.docs.get(r),i=s?s.size:0,o=this.Mr(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return V.resolve(r?r.document.mutableCopy():ht.newInvalidDocument(n))}getEntries(e,n){let r=Dn();return n.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():ht.newInvalidDocument(s))}),V.resolve(r)}getDocumentsMatchingQuery(e,n,r,s){let i=Dn();const o=n.path,l=new Z(o.child("")),u=this.docs.getIteratorFrom(l);for(;u.hasNext();){const{key:h,value:{document:p}}=u.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||lk(ak(p),r)<=0||(s.has(p.key)||Yl(n,p))&&(i=i.insert(p.key,p.mutableCopy()))}return V.resolve(i)}getAllFromCollectionGroup(e,n,r,s){ne()}Or(e,n){return V.forEach(this.docs,r=>n(r))}newChangeBuffer(e){return new CA(this)}getSize(e){return V.resolve(this.size)}}class CA extends wA{constructor(e){super(),this.cr=e}applyChanges(e){const n=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?n.push(this.cr.addEntry(e,s)):this.cr.removeEntry(r)}),V.waitFor(n)}getFromCache(e,n){return this.cr.getEntry(e,n)}getAllFromCache(e,n){return this.cr.getEntries(e,n)}}/**
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
 */class RA{constructor(e){this.persistence=e,this.Nr=new Ks(n=>Fd(n),Ud),this.lastRemoteSnapshotVersion=ie.min(),this.highestTargetId=0,this.Lr=0,this.Br=new qd,this.targetCount=0,this.kr=Ms.Bn()}forEachTarget(e,n){return this.Nr.forEach((r,s)=>n(s)),V.resolve()}getLastRemoteSnapshotVersion(e){return V.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return V.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),V.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.Lr&&(this.Lr=n),V.resolve()}Kn(e){this.Nr.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.kr=new Ms(n),this.highestTargetId=n),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,n){return this.Kn(n),this.targetCount+=1,V.resolve()}updateTargetData(e,n){return this.Kn(n),V.resolve()}removeTargetData(e,n){return this.Nr.delete(n.target),this.Br.gr(n.targetId),this.targetCount-=1,V.resolve()}removeTargets(e,n,r){let s=0;const i=[];return this.Nr.forEach((o,l)=>{l.sequenceNumber<=n&&r.get(l.targetId)===null&&(this.Nr.delete(o),i.push(this.removeMatchingKeysForTargetId(e,l.targetId)),s++)}),V.waitFor(i).next(()=>s)}getTargetCount(e){return V.resolve(this.targetCount)}getTargetData(e,n){const r=this.Nr.get(n)||null;return V.resolve(r)}addMatchingKeys(e,n,r){return this.Br.Rr(n,r),V.resolve()}removeMatchingKeys(e,n,r){this.Br.mr(n,r);const s=this.persistence.referenceDelegate,i=[];return s&&n.forEach(o=>{i.push(s.markPotentiallyOrphaned(e,o))}),V.waitFor(i)}removeMatchingKeysForTargetId(e,n){return this.Br.gr(n),V.resolve()}getMatchingKeysForTargetId(e,n){const r=this.Br.yr(n);return V.resolve(r)}containsKey(e,n){return V.resolve(this.Br.containsKey(n))}}/**
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
 */class PA{constructor(e,n){this.qr={},this.overlays={},this.Qr=new Vd(0),this.Kr=!1,this.Kr=!0,this.$r=new SA,this.referenceDelegate=e(this),this.Ur=new RA(this),this.indexManager=new vA,this.remoteDocumentCache=function(s){return new AA(s)}(r=>this.referenceDelegate.Wr(r)),this.serializer=new gA(n),this.Gr=new IA(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new xA,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this.qr[e.toKey()];return r||(r=new kA(n,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,n,r){q("MemoryPersistence","Starting transaction:",e);const s=new NA(this.Qr.next());return this.referenceDelegate.zr(),r(s).next(i=>this.referenceDelegate.jr(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Hr(e,n){return V.or(Object.values(this.qr).map(r=>()=>r.containsKey(e,n)))}}class NA extends ck{constructor(e){super(),this.currentSequenceNumber=e}}class Kd{constructor(e){this.persistence=e,this.Jr=new qd,this.Yr=null}static Zr(e){return new Kd(e)}get Xr(){if(this.Yr)return this.Yr;throw ne()}addReference(e,n,r){return this.Jr.addReference(r,n),this.Xr.delete(r.toString()),V.resolve()}removeReference(e,n,r){return this.Jr.removeReference(r,n),this.Xr.add(r.toString()),V.resolve()}markPotentiallyOrphaned(e,n){return this.Xr.add(n.toString()),V.resolve()}removeTarget(e,n){this.Jr.gr(n.targetId).forEach(s=>this.Xr.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next(s=>{s.forEach(i=>this.Xr.add(i.toString()))}).next(()=>r.removeTargetData(e,n))}zr(){this.Yr=new Set}jr(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return V.forEach(this.Xr,r=>{const s=Z.fromPath(r);return this.ei(e,s).next(i=>{i||n.removeEntry(s,ie.min())})}).next(()=>(this.Yr=null,n.apply(e)))}updateLimboDocument(e,n){return this.ei(e,n).next(r=>{r?this.Xr.delete(n.toString()):this.Xr.add(n.toString())})}Wr(e){return 0}ei(e,n){return V.or([()=>V.resolve(this.Jr.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Hr(e,n)])}}/**
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
 */class Gd{constructor(e,n,r,s){this.targetId=e,this.fromCache=n,this.$i=r,this.Ui=s}static Wi(e,n){let r=he(),s=he();for(const i of n.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Gd(e,n.fromCache,r,s)}}/**
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
 */class bA{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class DA{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return NT()?8:hk(ft())>0?6:4}()}initialize(e,n){this.Ji=e,this.indexManager=n,this.Gi=!0}getDocumentsMatchingQuery(e,n,r,s){const i={result:null};return this.Yi(e,n).next(o=>{i.result=o}).next(()=>{if(!i.result)return this.Zi(e,n,s,r).next(o=>{i.result=o})}).next(()=>{if(i.result)return;const o=new bA;return this.Xi(e,n,o).next(l=>{if(i.result=l,this.zi)return this.es(e,n,o,l.size)})}).next(()=>i.result)}es(e,n,r,s){return r.documentReadCount<this.ji?(vi()<=de.DEBUG&&q("QueryEngine","SDK will not create cache indexes for query:",Xr(n),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),V.resolve()):(vi()<=de.DEBUG&&q("QueryEngine","Query:",Xr(n),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Hi*s?(vi()<=de.DEBUG&&q("QueryEngine","The SDK decides to create cache indexes for query:",Xr(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,ln(n))):V.resolve())}Yi(e,n){if(ag(n))return V.resolve(null);let r=ln(n);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(n.limit!==null&&s===1&&(n=gh(n,null,"F"),r=ln(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const o=he(...i);return this.Ji.getDocuments(e,o).next(l=>this.indexManager.getMinOffset(e,r).next(u=>{const h=this.ts(n,l);return this.ns(n,h,o,u.readTime)?this.Yi(e,gh(n,null,"F")):this.rs(e,h,n,u)}))})))}Zi(e,n,r,s){return ag(n)||s.isEqual(ie.min())?V.resolve(null):this.Ji.getDocuments(e,r).next(i=>{const o=this.ts(n,i);return this.ns(n,o,r,s)?V.resolve(null):(vi()<=de.DEBUG&&q("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Xr(n)),this.rs(e,o,n,ok(s,-1)).next(l=>l))})}ts(e,n){let r=new et(o_(e));return n.forEach((s,i)=>{Yl(e,i)&&(r=r.add(i))}),r}ns(e,n,r,s){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const i=e.limitType==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Xi(e,n,r){return vi()<=de.DEBUG&&q("QueryEngine","Using full collection scan to execute query:",Xr(n)),this.Ji.getDocumentsMatchingQuery(e,n,dr.min(),r)}rs(e,n,r,s){return this.Ji.getDocumentsMatchingQuery(e,r,s).next(i=>(n.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
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
 */class OA{constructor(e,n,r,s){this.persistence=e,this.ss=n,this.serializer=s,this.os=new De(we),this._s=new Ks(i=>Fd(i),Ud),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new TA(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.os))}}function VA(t,e,n,r){return new OA(t,e,n,r)}async function C_(t,e){const n=oe(t);return await n.persistence.runTransaction("Handle user change","readonly",r=>{let s;return n.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,n.ls(e),n.mutationQueue.getAllMutationBatches(r))).next(i=>{const o=[],l=[];let u=he();for(const h of s){o.push(h.batchId);for(const p of h.mutations)u=u.add(p.key)}for(const h of i){l.push(h.batchId);for(const p of h.mutations)u=u.add(p.key)}return n.localDocuments.getDocuments(r,u).next(h=>({hs:h,removedBatchIds:o,addedBatchIds:l}))})})}function LA(t,e){const n=oe(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=n.cs.newChangeBuffer({trackRemovals:!0});return function(l,u,h,p){const m=h.batch,v=m.keys();let _=V.resolve();return v.forEach(C=>{_=_.next(()=>p.getEntry(u,C)).next(P=>{const O=h.docVersions.get(C);Te(O!==null),P.version.compareTo(O)<0&&(m.applyToRemoteDocument(P,h),P.isValidDocument()&&(P.setReadTime(h.commitVersion),p.addEntry(P)))})}),_.next(()=>l.mutationQueue.removeMutationBatch(u,m))}(n,r,e,i).next(()=>i.apply(r)).next(()=>n.mutationQueue.performConsistencyCheck(r)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let u=he();for(let h=0;h<l.mutationResults.length;++h)l.mutationResults[h].transformResults.length>0&&(u=u.add(l.batch.mutations[h].key));return u}(e))).next(()=>n.localDocuments.getDocuments(r,s))})}function R_(t){const e=oe(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.Ur.getLastRemoteSnapshotVersion(n))}function MA(t,e){const n=oe(t),r=e.snapshotVersion;let s=n.os;return n.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=n.cs.newChangeBuffer({trackRemovals:!0});s=n.os;const l=[];e.targetChanges.forEach((p,m)=>{const v=s.get(m);if(!v)return;l.push(n.Ur.removeMatchingKeys(i,p.removedDocuments,m).next(()=>n.Ur.addMatchingKeys(i,p.addedDocuments,m)));let _=v.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(m)!==null?_=_.withResumeToken(nt.EMPTY_BYTE_STRING,ie.min()).withLastLimboFreeSnapshotVersion(ie.min()):p.resumeToken.approximateByteSize()>0&&(_=_.withResumeToken(p.resumeToken,r)),s=s.insert(m,_),function(P,O,S){return P.resumeToken.approximateByteSize()===0||O.snapshotVersion.toMicroseconds()-P.snapshotVersion.toMicroseconds()>=3e8?!0:S.addedDocuments.size+S.modifiedDocuments.size+S.removedDocuments.size>0}(v,_,p)&&l.push(n.Ur.updateTargetData(i,_))});let u=Dn(),h=he();if(e.documentUpdates.forEach(p=>{e.resolvedLimboDocuments.has(p)&&l.push(n.persistence.referenceDelegate.updateLimboDocument(i,p))}),l.push(jA(i,o,e.documentUpdates).next(p=>{u=p.Ps,h=p.Is})),!r.isEqual(ie.min())){const p=n.Ur.getLastRemoteSnapshotVersion(i).next(m=>n.Ur.setTargetsMetadata(i,i.currentSequenceNumber,r));l.push(p)}return V.waitFor(l).next(()=>o.apply(i)).next(()=>n.localDocuments.getLocalViewOfDocuments(i,u,h)).next(()=>u)}).then(i=>(n.os=s,i))}function jA(t,e,n){let r=he(),s=he();return n.forEach(i=>r=r.add(i)),e.getEntries(t,r).next(i=>{let o=Dn();return n.forEach((l,u)=>{const h=i.get(l);u.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(l)),u.isNoDocument()&&u.version.isEqual(ie.min())?(e.removeEntry(l,u.readTime),o=o.insert(l,u)):!h.isValidDocument()||u.version.compareTo(h.version)>0||u.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(u),o=o.insert(l,u)):q("LocalStore","Ignoring outdated watch update for ",l,". Current version:",h.version," Watch version:",u.version)}),{Ps:o,Is:s}})}function FA(t,e){const n=oe(t);return n.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function UA(t,e){const n=oe(t);return n.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return n.Ur.getTargetData(r,e).next(i=>i?(s=i,V.resolve(s)):n.Ur.allocateTargetId(r).next(o=>(s=new Xn(e,o,"TargetPurposeListen",r.currentSequenceNumber),n.Ur.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=n.os.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.os=n.os.insert(r.targetId,r),n._s.set(e,r.targetId)),r})}async function Eh(t,e,n){const r=oe(t),s=r.os.get(e),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,o=>r.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!Ro(o))throw o;q("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.os=r.os.remove(e),r._s.delete(s.target)}function vg(t,e,n){const r=oe(t);let s=ie.min(),i=he();return r.persistence.runTransaction("Execute query","readwrite",o=>function(u,h,p){const m=oe(u),v=m._s.get(p);return v!==void 0?V.resolve(m.os.get(v)):m.Ur.getTargetData(h,p)}(r,o,ln(e)).next(l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(o,l.targetId).next(u=>{i=u})}).next(()=>r.ss.getDocumentsMatchingQuery(o,e,n?s:ie.min(),n?i:he())).next(l=>(zA(r,Pk(e),l),{documents:l,Ts:i})))}function zA(t,e,n){let r=t.us.get(e)||ie.min();n.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),t.us.set(e,r)}class _g{constructor(){this.activeTargetIds=Lk()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class $A{constructor(){this.so=new _g,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e,n=!0){return n&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,n,r){this.oo[e]=n}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new _g,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class BA{_o(e){}shutdown(){}}/**
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
 */class wg{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){q("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){q("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let ya=null;function oc(){return ya===null?ya=function(){return 268435456+Math.round(2147483648*Math.random())}():ya++,"0x"+ya.toString(16)}/**
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
 */const WA={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
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
 */class HA{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
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
 */const lt="WebChannelConnection";class qA extends class{constructor(n){this.databaseInfo=n,this.databaseId=n.databaseId;const r=n.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+n.host,this.vo=`projects/${s}/databases/${i}`,this.Co=this.databaseId.database==="(default)"?`project_id=${s}`:`project_id=${s}&database_id=${i}`}get Fo(){return!1}Mo(n,r,s,i,o){const l=oc(),u=this.xo(n,r.toUriEncodedString());q("RestConnection",`Sending RPC '${n}' ${l}:`,u,s);const h={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(h,i,o),this.No(n,u,h,s).then(p=>(q("RestConnection",`Received RPC '${n}' ${l}: `,p),p),p=>{throw Ds("RestConnection",`RPC '${n}' ${l} failed with error: `,p,"url: ",u,"request:",s),p})}Lo(n,r,s,i,o,l){return this.Mo(n,r,s,i,o)}Oo(n,r,s){n["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Hs}(),n["Content-Type"]="text/plain",this.databaseInfo.appId&&(n["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((i,o)=>n[o]=i),s&&s.headers.forEach((i,o)=>n[o]=i)}xo(n,r){const s=WA[n];return`${this.Do}/v1/${r}:${s}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,n,r,s){const i=oc();return new Promise((o,l)=>{const u=new B0;u.setWithCredentials(!0),u.listenOnce(W0.COMPLETE,()=>{try{switch(u.getLastErrorCode()){case Va.NO_ERROR:const p=u.getResponseJson();q(lt,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(p)),o(p);break;case Va.TIMEOUT:q(lt,`RPC '${e}' ${i} timed out`),l(new X(M.DEADLINE_EXCEEDED,"Request time out"));break;case Va.HTTP_ERROR:const m=u.getStatus();if(q(lt,`RPC '${e}' ${i} failed with status:`,m,"response text:",u.getResponseText()),m>0){let v=u.getResponseJson();Array.isArray(v)&&(v=v[0]);const _=v==null?void 0:v.error;if(_&&_.status&&_.message){const C=function(O){const S=O.toLowerCase().replace(/_/g,"-");return Object.values(M).indexOf(S)>=0?S:M.UNKNOWN}(_.status);l(new X(C,_.message))}else l(new X(M.UNKNOWN,"Server responded with status "+u.getStatus()))}else l(new X(M.UNAVAILABLE,"Connection failed."));break;default:ne()}}finally{q(lt,`RPC '${e}' ${i} completed.`)}});const h=JSON.stringify(s);q(lt,`RPC '${e}' ${i} sending request:`,s),u.send(n,"POST",h,r,15)})}Bo(e,n,r){const s=oc(),i=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=K0(),l=q0(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(u.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Oo(u.initMessageHeaders,n,r),u.encodeInitMessageHeaders=!0;const p=i.join("");q(lt,`Creating RPC '${e}' stream ${s}: ${p}`,u);const m=o.createWebChannel(p,u);let v=!1,_=!1;const C=new HA({Io:O=>{_?q(lt,`Not sending because RPC '${e}' stream ${s} is closed:`,O):(v||(q(lt,`Opening RPC '${e}' stream ${s} transport.`),m.open(),v=!0),q(lt,`RPC '${e}' stream ${s} sending:`,O),m.send(O))},To:()=>m.close()}),P=(O,S,T)=>{O.listen(S,k=>{try{T(k)}catch(D){setTimeout(()=>{throw D},0)}})};return P(m,Ii.EventType.OPEN,()=>{_||(q(lt,`RPC '${e}' stream ${s} transport opened.`),C.yo())}),P(m,Ii.EventType.CLOSE,()=>{_||(_=!0,q(lt,`RPC '${e}' stream ${s} transport closed`),C.So())}),P(m,Ii.EventType.ERROR,O=>{_||(_=!0,Ds(lt,`RPC '${e}' stream ${s} transport errored:`,O),C.So(new X(M.UNAVAILABLE,"The operation could not be completed")))}),P(m,Ii.EventType.MESSAGE,O=>{var S;if(!_){const T=O.data[0];Te(!!T);const k=T,D=k.error||((S=k[0])===null||S===void 0?void 0:S.error);if(D){q(lt,`RPC '${e}' stream ${s} received error:`,D);const F=D.status;let U=function(w){const x=Ue[w];if(x!==void 0)return v_(x)}(F),E=D.message;U===void 0&&(U=M.INTERNAL,E="Unknown error status: "+F+" with message "+D.message),_=!0,C.So(new X(U,E)),m.close()}else q(lt,`RPC '${e}' stream ${s} received:`,T),C.bo(T)}}),P(l,H0.STAT_EVENT,O=>{O.stat===hh.PROXY?q(lt,`RPC '${e}' stream ${s} detected buffering proxy`):O.stat===hh.NOPROXY&&q(lt,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{C.wo()},0),C}}function ac(){return typeof document<"u"?document:null}/**
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
 */function eu(t){return new nA(t,!0)}/**
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
 */class P_{constructor(e,n,r=1e3,s=1.5,i=6e4){this.ui=e,this.timerId=n,this.ko=r,this.qo=s,this.Qo=i,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const n=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),s=Math.max(0,n-r);s>0&&q("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ko} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,s,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
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
 */class N_{constructor(e,n,r,s,i,o,l,u){this.ui=e,this.Ho=r,this.Jo=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=l,this.listener=u,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new P_(e,n)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,n){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():n&&n.code===M.RESOURCE_EXHAUSTED?(bn(n.toString()),bn("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):n&&n.code===M.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(n)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),n=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.Yo===n&&this.P_(r,s)},r=>{e(()=>{const s=new X(M.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(s)})})}P_(e,n){const r=this.h_(this.Yo);this.stream=this.T_(e,n),this.stream.Eo(()=>{r(()=>this.listener.Eo())}),this.stream.Ro(()=>{r(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(s=>{r(()=>this.I_(s))}),this.stream.onMessage(s=>{r(()=>++this.e_==1?this.E_(s):this.onNext(s))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return q("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return n=>{this.ui.enqueueAndForget(()=>this.Yo===e?n():(q("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class KA extends N_{constructor(e,n,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}T_(e,n){return this.connection.Bo("Listen",e,n)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const n=iA(this.serializer,e),r=function(i){if(!("targetChange"in i))return ie.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?ie.min():o.readTime?un(o.readTime):ie.min()}(e);return this.listener.d_(n,r)}A_(e){const n={};n.database=wh(this.serializer),n.addTarget=function(i,o){let l;const u=o.target;if(l=mh(u)?{documents:lA(i,u)}:{query:uA(i,u)._t},l.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){l.resumeToken=E_(i,o.resumeToken);const h=yh(i,o.expectedCount);h!==null&&(l.expectedCount=h)}else if(o.snapshotVersion.compareTo(ie.min())>0){l.readTime=Tl(i,o.snapshotVersion.toTimestamp());const h=yh(i,o.expectedCount);h!==null&&(l.expectedCount=h)}return l}(this.serializer,e);const r=hA(this.serializer,e);r&&(n.labels=r),this.a_(n)}R_(e){const n={};n.database=wh(this.serializer),n.removeTarget=e,this.a_(n)}}class GA extends N_{constructor(e,n,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,n){return this.connection.Bo("Write",e,n)}E_(e){return Te(!!e.streamToken),this.lastStreamToken=e.streamToken,Te(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){Te(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const n=aA(e.writeResults,e.commitTime),r=un(e.commitTime);return this.listener.g_(r,n)}p_(){const e={};e.database=wh(this.serializer),this.a_(e)}m_(e){const n={streamToken:this.lastStreamToken,writes:e.map(r=>oA(this.serializer,r))};this.a_(n)}}/**
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
 */class QA extends class{}{constructor(e,n,r,s){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=s,this.y_=!1}w_(){if(this.y_)throw new X(M.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,n,r,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.Mo(e,vh(n,r),s,i,o)).catch(i=>{throw i.name==="FirebaseError"?(i.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new X(M.UNKNOWN,i.toString())})}Lo(e,n,r,s,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,l])=>this.connection.Lo(e,vh(n,r),s,o,l,i)).catch(o=>{throw o.name==="FirebaseError"?(o.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new X(M.UNKNOWN,o.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class YA{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(bn(n),this.D_=!1):q("OnlineStateTracker",n)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
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
 */class JA{constructor(e,n,r,s,i){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=i,this.k_._o(o=>{r.enqueueAndForget(async()=>{qr(this)&&(q("RemoteStore","Restarting streams for network reachability change."),await async function(u){const h=oe(u);h.L_.add(4),await bo(h),h.q_.set("Unknown"),h.L_.delete(4),await tu(h)}(this))})}),this.q_=new YA(r,s)}}async function tu(t){if(qr(t))for(const e of t.B_)await e(!0)}async function bo(t){for(const e of t.B_)await e(!1)}function b_(t,e){const n=oe(t);n.N_.has(e.targetId)||(n.N_.set(e.targetId,e),Xd(n)?Jd(n):Gs(n).r_()&&Yd(n,e))}function Qd(t,e){const n=oe(t),r=Gs(n);n.N_.delete(e),r.r_()&&D_(n,e),n.N_.size===0&&(r.r_()?r.o_():qr(n)&&n.q_.set("Unknown"))}function Yd(t,e){if(t.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(ie.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}Gs(t).A_(e)}function D_(t,e){t.Q_.xe(e),Gs(t).R_(e)}function Jd(t){t.Q_=new Xk({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>t.N_.get(e)||null,tt:()=>t.datastore.serializer.databaseId}),Gs(t).start(),t.q_.v_()}function Xd(t){return qr(t)&&!Gs(t).n_()&&t.N_.size>0}function qr(t){return oe(t).L_.size===0}function O_(t){t.Q_=void 0}async function XA(t){t.q_.set("Online")}async function ZA(t){t.N_.forEach((e,n)=>{Yd(t,e)})}async function eC(t,e){O_(t),Xd(t)?(t.q_.M_(e),Jd(t)):t.q_.set("Unknown")}async function tC(t,e,n){if(t.q_.set("Online"),e instanceof w_&&e.state===2&&e.cause)try{await async function(s,i){const o=i.cause;for(const l of i.targetIds)s.N_.has(l)&&(await s.remoteSyncer.rejectListen(l,o),s.N_.delete(l),s.Q_.removeTarget(l))}(t,e)}catch(r){q("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Il(t,r)}else if(e instanceof ja?t.Q_.Ke(e):e instanceof __?t.Q_.He(e):t.Q_.We(e),!n.isEqual(ie.min()))try{const r=await R_(t.localStore);n.compareTo(r)>=0&&await function(i,o){const l=i.Q_.rt(o);return l.targetChanges.forEach((u,h)=>{if(u.resumeToken.approximateByteSize()>0){const p=i.N_.get(h);p&&i.N_.set(h,p.withResumeToken(u.resumeToken,o))}}),l.targetMismatches.forEach((u,h)=>{const p=i.N_.get(u);if(!p)return;i.N_.set(u,p.withResumeToken(nt.EMPTY_BYTE_STRING,p.snapshotVersion)),D_(i,u);const m=new Xn(p.target,u,h,p.sequenceNumber);Yd(i,m)}),i.remoteSyncer.applyRemoteEvent(l)}(t,n)}catch(r){q("RemoteStore","Failed to raise snapshot:",r),await Il(t,r)}}async function Il(t,e,n){if(!Ro(e))throw e;t.L_.add(1),await bo(t),t.q_.set("Offline"),n||(n=()=>R_(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{q("RemoteStore","Retrying IndexedDB access"),await n(),t.L_.delete(1),await tu(t)})}function V_(t,e){return e().catch(n=>Il(t,n,e))}async function nu(t){const e=oe(t),n=pr(e);let r=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;nC(e);)try{const s=await FA(e.localStore,r);if(s===null){e.O_.length===0&&n.o_();break}r=s.batchId,rC(e,s)}catch(s){await Il(e,s)}L_(e)&&M_(e)}function nC(t){return qr(t)&&t.O_.length<10}function rC(t,e){t.O_.push(e);const n=pr(t);n.r_()&&n.V_&&n.m_(e.mutations)}function L_(t){return qr(t)&&!pr(t).n_()&&t.O_.length>0}function M_(t){pr(t).start()}async function sC(t){pr(t).p_()}async function iC(t){const e=pr(t);for(const n of t.O_)e.m_(n.mutations)}async function oC(t,e,n){const r=t.O_.shift(),s=Bd.from(r,e,n);await V_(t,()=>t.remoteSyncer.applySuccessfulWrite(s)),await nu(t)}async function aC(t,e){e&&pr(t).V_&&await async function(r,s){if(function(o){return Qk(o)&&o!==M.ABORTED}(s.code)){const i=r.O_.shift();pr(r).s_(),await V_(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await nu(r)}}(t,e),L_(t)&&M_(t)}async function Eg(t,e){const n=oe(t);n.asyncQueue.verifyOperationInProgress(),q("RemoteStore","RemoteStore received new credentials");const r=qr(n);n.L_.add(3),await bo(n),r&&n.q_.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.L_.delete(3),await tu(n)}async function lC(t,e){const n=oe(t);e?(n.L_.delete(2),await tu(n)):e||(n.L_.add(2),await bo(n),n.q_.set("Unknown"))}function Gs(t){return t.K_||(t.K_=function(n,r,s){const i=oe(n);return i.w_(),new KA(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(t.datastore,t.asyncQueue,{Eo:XA.bind(null,t),Ro:ZA.bind(null,t),mo:eC.bind(null,t),d_:tC.bind(null,t)}),t.B_.push(async e=>{e?(t.K_.s_(),Xd(t)?Jd(t):t.q_.set("Unknown")):(await t.K_.stop(),O_(t))})),t.K_}function pr(t){return t.U_||(t.U_=function(n,r,s){const i=oe(n);return i.w_(),new GA(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(t.datastore,t.asyncQueue,{Eo:()=>Promise.resolve(),Ro:sC.bind(null,t),mo:aC.bind(null,t),f_:iC.bind(null,t),g_:oC.bind(null,t)}),t.B_.push(async e=>{e?(t.U_.s_(),await nu(t)):(await t.U_.stop(),t.O_.length>0&&(q("RemoteStore",`Stopping write stream with ${t.O_.length} pending writes`),t.O_=[]))})),t.U_}/**
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
 */class Zd{constructor(e,n,r,s,i){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new br,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,s,i){const o=Date.now()+r,l=new Zd(e,n,o,s,i);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new X(M.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function ef(t,e){if(bn("AsyncQueue",`${e}: ${t}`),Ro(t))return new X(M.UNAVAILABLE,`${e}: ${t}`);throw t}/**
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
 */class Is{constructor(e){this.comparator=e?(n,r)=>e(n,r)||Z.comparator(n.key,r.key):(n,r)=>Z.comparator(n.key,r.key),this.keyedMap=xi(),this.sortedSet=new De(this.comparator)}static emptySet(e){return new Is(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,r)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof Is)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new Is;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
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
 */class Tg{constructor(){this.W_=new De(Z.comparator)}track(e){const n=e.doc.key,r=this.W_.get(n);r?e.type!==0&&r.type===3?this.W_=this.W_.insert(n,e):e.type===3&&r.type!==1?this.W_=this.W_.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.W_=this.W_.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.W_=this.W_.remove(n):e.type===1&&r.type===2?this.W_=this.W_.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):ne():this.W_=this.W_.insert(n,e)}G_(){const e=[];return this.W_.inorderTraversal((n,r)=>{e.push(r)}),e}}class js{constructor(e,n,r,s,i,o,l,u,h){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=l,this.excludesMetadataChanges=u,this.hasCachedResults=h}static fromInitialDocuments(e,n,r,s,i){const o=[];return n.forEach(l=>{o.push({type:0,doc:l})}),new js(e,n,Is.emptySet(n),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Ql(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let s=0;s<n.length;s++)if(n[s].type!==r[s].type||!n[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
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
 */class uC{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class cC{constructor(){this.queries=Ig(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(n,r){const s=oe(n),i=s.queries;s.queries=Ig(),i.forEach((o,l)=>{for(const u of l.j_)u.onError(r)})})(this,new X(M.ABORTED,"Firestore shutting down"))}}function Ig(){return new Ks(t=>i_(t),Ql)}async function hC(t,e){const n=oe(t);let r=3;const s=e.query;let i=n.queries.get(s);i?!i.H_()&&e.J_()&&(r=2):(i=new uC,r=e.J_()?0:1);try{switch(r){case 0:i.z_=await n.onListen(s,!0);break;case 1:i.z_=await n.onListen(s,!1);break;case 2:await n.onFirstRemoteStoreListen(s)}}catch(o){const l=ef(o,`Initialization of query '${Xr(e.query)}' failed`);return void e.onError(l)}n.queries.set(s,i),i.j_.push(e),e.Z_(n.onlineState),i.z_&&e.X_(i.z_)&&tf(n)}async function dC(t,e){const n=oe(t),r=e.query;let s=3;const i=n.queries.get(r);if(i){const o=i.j_.indexOf(e);o>=0&&(i.j_.splice(o,1),i.j_.length===0?s=e.J_()?0:1:!i.H_()&&e.J_()&&(s=2))}switch(s){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function fC(t,e){const n=oe(t);let r=!1;for(const s of e){const i=s.query,o=n.queries.get(i);if(o){for(const l of o.j_)l.X_(s)&&(r=!0);o.z_=s}}r&&tf(n)}function pC(t,e,n){const r=oe(t),s=r.queries.get(e);if(s)for(const i of s.j_)i.onError(n);r.queries.delete(e)}function tf(t){t.Y_.forEach(e=>{e.next()})}var Th,xg;(xg=Th||(Th={})).ea="default",xg.Cache="cache";class mC{constructor(e,n,r){this.query=e,this.ta=n,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new js(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.na?this.ia(e)&&(this.ta.next(e),n=!0):this.sa(e,this.onlineState)&&(this.oa(e),n=!0),this.ra=e,n}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let n=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),n=!0),n}sa(e,n){if(!e.fromCache||!this.J_())return!0;const r=n!=="Offline";return(!this.options._a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const n=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}oa(e){e=js.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==Th.Cache}}/**
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
 */class j_{constructor(e){this.key=e}}class F_{constructor(e){this.key=e}}class gC{constructor(e,n){this.query=e,this.Ta=n,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=he(),this.mutatedKeys=he(),this.Aa=o_(e),this.Ra=new Is(this.Aa)}get Va(){return this.Ta}ma(e,n){const r=n?n.fa:new Tg,s=n?n.Ra:this.Ra;let i=n?n.mutatedKeys:this.mutatedKeys,o=s,l=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((p,m)=>{const v=s.get(p),_=Yl(this.query,m)?m:null,C=!!v&&this.mutatedKeys.has(v.key),P=!!_&&(_.hasLocalMutations||this.mutatedKeys.has(_.key)&&_.hasCommittedMutations);let O=!1;v&&_?v.data.isEqual(_.data)?C!==P&&(r.track({type:3,doc:_}),O=!0):this.ga(v,_)||(r.track({type:2,doc:_}),O=!0,(u&&this.Aa(_,u)>0||h&&this.Aa(_,h)<0)&&(l=!0)):!v&&_?(r.track({type:0,doc:_}),O=!0):v&&!_&&(r.track({type:1,doc:v}),O=!0,(u||h)&&(l=!0)),O&&(_?(o=o.add(_),i=P?i.add(p):i.delete(p)):(o=o.delete(p),i=i.delete(p)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const p=this.query.limitType==="F"?o.last():o.first();o=o.delete(p.key),i=i.delete(p.key),r.track({type:1,doc:p})}return{Ra:o,fa:r,ns:l,mutatedKeys:i}}ga(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r,s){const i=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const o=e.fa.G_();o.sort((p,m)=>function(_,C){const P=O=>{switch(O){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return ne()}};return P(_)-P(C)}(p.type,m.type)||this.Aa(p.doc,m.doc)),this.pa(r),s=s!=null&&s;const l=n&&!s?this.ya():[],u=this.da.size===0&&this.current&&!s?1:0,h=u!==this.Ea;return this.Ea=u,o.length!==0||h?{snapshot:new js(this.query,e.Ra,i,o,e.mutatedKeys,u===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:l}:{wa:l}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new Tg,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(n=>this.Ta=this.Ta.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Ta=this.Ta.delete(n)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=he(),this.Ra.forEach(r=>{this.Sa(r.key)&&(this.da=this.da.add(r.key))});const n=[];return e.forEach(r=>{this.da.has(r)||n.push(new F_(r))}),this.da.forEach(r=>{e.has(r)||n.push(new j_(r))}),n}ba(e){this.Ta=e.Ts,this.da=he();const n=this.ma(e.documents);return this.applyChanges(n,!0)}Da(){return js.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class yC{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class vC{constructor(e){this.key=e,this.va=!1}}class _C{constructor(e,n,r,s,i,o){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Ca={},this.Fa=new Ks(l=>i_(l),Ql),this.Ma=new Map,this.xa=new Set,this.Oa=new De(Z.comparator),this.Na=new Map,this.La=new qd,this.Ba={},this.ka=new Map,this.qa=Ms.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function wC(t,e,n=!0){const r=H_(t);let s;const i=r.Fa.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Da()):s=await U_(r,e,n,!0),s}async function EC(t,e){const n=H_(t);await U_(n,e,!0,!1)}async function U_(t,e,n,r){const s=await UA(t.localStore,ln(e)),i=s.targetId,o=t.sharedClientState.addLocalQueryTarget(i,n);let l;return r&&(l=await TC(t,e,i,o==="current",s.resumeToken)),t.isPrimaryClient&&n&&b_(t.remoteStore,s),l}async function TC(t,e,n,r,s){t.Ka=(m,v,_)=>async function(P,O,S,T){let k=O.view.ma(S);k.ns&&(k=await vg(P.localStore,O.query,!1).then(({documents:E})=>O.view.ma(E,k)));const D=T&&T.targetChanges.get(O.targetId),F=T&&T.targetMismatches.get(O.targetId)!=null,U=O.view.applyChanges(k,P.isPrimaryClient,D,F);return kg(P,O.targetId,U.wa),U.snapshot}(t,m,v,_);const i=await vg(t.localStore,e,!0),o=new gC(e,i.Ts),l=o.ma(i.documents),u=No.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",s),h=o.applyChanges(l,t.isPrimaryClient,u);kg(t,n,h.wa);const p=new yC(e,n,o);return t.Fa.set(e,p),t.Ma.has(n)?t.Ma.get(n).push(e):t.Ma.set(n,[e]),h.snapshot}async function IC(t,e,n){const r=oe(t),s=r.Fa.get(e),i=r.Ma.get(s.targetId);if(i.length>1)return r.Ma.set(s.targetId,i.filter(o=>!Ql(o,e))),void r.Fa.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Eh(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),n&&Qd(r.remoteStore,s.targetId),Ih(r,s.targetId)}).catch(Co)):(Ih(r,s.targetId),await Eh(r.localStore,s.targetId,!0))}async function xC(t,e){const n=oe(t),r=n.Fa.get(e),s=n.Ma.get(r.targetId);n.isPrimaryClient&&s.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),Qd(n.remoteStore,r.targetId))}async function SC(t,e,n){const r=bC(t);try{const s=await function(o,l){const u=oe(o),h=He.now(),p=l.reduce((_,C)=>_.add(C.key),he());let m,v;return u.persistence.runTransaction("Locally write mutations","readwrite",_=>{let C=Dn(),P=he();return u.cs.getEntries(_,p).next(O=>{C=O,C.forEach((S,T)=>{T.isValidDocument()||(P=P.add(S))})}).next(()=>u.localDocuments.getOverlayedDocuments(_,C)).next(O=>{m=O;const S=[];for(const T of l){const k=Wk(T,m.get(T.key).overlayedDocument);k!=null&&S.push(new Hr(T.key,k,X0(k.value.mapValue),In.exists(!0)))}return u.mutationQueue.addMutationBatch(_,h,S,l)}).next(O=>{v=O;const S=O.applyToLocalDocumentSet(m,P);return u.documentOverlayCache.saveOverlays(_,O.batchId,S)})}).then(()=>({batchId:v.batchId,changes:l_(m)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(o,l,u){let h=o.Ba[o.currentUser.toKey()];h||(h=new De(we)),h=h.insert(l,u),o.Ba[o.currentUser.toKey()]=h}(r,s.batchId,n),await Do(r,s.changes),await nu(r.remoteStore)}catch(s){const i=ef(s,"Failed to persist write");n.reject(i)}}async function z_(t,e){const n=oe(t);try{const r=await MA(n.localStore,e);e.targetChanges.forEach((s,i)=>{const o=n.Na.get(i);o&&(Te(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?o.va=!0:s.modifiedDocuments.size>0?Te(o.va):s.removedDocuments.size>0&&(Te(o.va),o.va=!1))}),await Do(n,r,e)}catch(r){await Co(r)}}function Sg(t,e,n){const r=oe(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const s=[];r.Fa.forEach((i,o)=>{const l=o.view.Z_(e);l.snapshot&&s.push(l.snapshot)}),function(o,l){const u=oe(o);u.onlineState=l;let h=!1;u.queries.forEach((p,m)=>{for(const v of m.j_)v.Z_(l)&&(h=!0)}),h&&tf(u)}(r.eventManager,e),s.length&&r.Ca.d_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function kC(t,e,n){const r=oe(t);r.sharedClientState.updateQueryState(e,"rejected",n);const s=r.Na.get(e),i=s&&s.key;if(i){let o=new De(Z.comparator);o=o.insert(i,ht.newNoDocument(i,ie.min()));const l=he().add(i),u=new Zl(ie.min(),new Map,new De(we),o,l);await z_(r,u),r.Oa=r.Oa.remove(i),r.Na.delete(e),nf(r)}else await Eh(r.localStore,e,!1).then(()=>Ih(r,e,n)).catch(Co)}async function AC(t,e){const n=oe(t),r=e.batch.batchId;try{const s=await LA(n.localStore,e);B_(n,r,null),$_(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Do(n,s)}catch(s){await Co(s)}}async function CC(t,e,n){const r=oe(t);try{const s=await function(o,l){const u=oe(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let p;return u.mutationQueue.lookupMutationBatch(h,l).next(m=>(Te(m!==null),p=m.keys(),u.mutationQueue.removeMutationBatch(h,m))).next(()=>u.mutationQueue.performConsistencyCheck(h)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(h,p,l)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,p)).next(()=>u.localDocuments.getDocuments(h,p))})}(r.localStore,e);B_(r,e,n),$_(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await Do(r,s)}catch(s){await Co(s)}}function $_(t,e){(t.ka.get(e)||[]).forEach(n=>{n.resolve()}),t.ka.delete(e)}function B_(t,e,n){const r=oe(t);let s=r.Ba[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(n?i.reject(n):i.resolve(),s=s.remove(e)),r.Ba[r.currentUser.toKey()]=s}}function Ih(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Ma.get(e))t.Fa.delete(r),n&&t.Ca.$a(r,n);t.Ma.delete(e),t.isPrimaryClient&&t.La.gr(e).forEach(r=>{t.La.containsKey(r)||W_(t,r)})}function W_(t,e){t.xa.delete(e.path.canonicalString());const n=t.Oa.get(e);n!==null&&(Qd(t.remoteStore,n),t.Oa=t.Oa.remove(e),t.Na.delete(n),nf(t))}function kg(t,e,n){for(const r of n)r instanceof j_?(t.La.addReference(r.key,e),RC(t,r)):r instanceof F_?(q("SyncEngine","Document no longer in limbo: "+r.key),t.La.removeReference(r.key,e),t.La.containsKey(r.key)||W_(t,r.key)):ne()}function RC(t,e){const n=e.key,r=n.path.canonicalString();t.Oa.get(n)||t.xa.has(r)||(q("SyncEngine","New document in limbo: "+n),t.xa.add(r),nf(t))}function nf(t){for(;t.xa.size>0&&t.Oa.size<t.maxConcurrentLimboResolutions;){const e=t.xa.values().next().value;t.xa.delete(e);const n=new Z(Le.fromString(e)),r=t.qa.next();t.Na.set(r,new vC(n)),t.Oa=t.Oa.insert(n,r),b_(t.remoteStore,new Xn(ln(zd(n.path)),r,"TargetPurposeLimboResolution",Vd.oe))}}async function Do(t,e,n){const r=oe(t),s=[],i=[],o=[];r.Fa.isEmpty()||(r.Fa.forEach((l,u)=>{o.push(r.Ka(u,e,n).then(h=>{var p;if((h||n)&&r.isPrimaryClient){const m=h?!h.fromCache:(p=n==null?void 0:n.targetChanges.get(u.targetId))===null||p===void 0?void 0:p.current;r.sharedClientState.updateQueryState(u.targetId,m?"current":"not-current")}if(h){s.push(h);const m=Gd.Wi(u.targetId,h);i.push(m)}}))}),await Promise.all(o),r.Ca.d_(s),await async function(u,h){const p=oe(u);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",m=>V.forEach(h,v=>V.forEach(v.$i,_=>p.persistence.referenceDelegate.addReference(m,v.targetId,_)).next(()=>V.forEach(v.Ui,_=>p.persistence.referenceDelegate.removeReference(m,v.targetId,_)))))}catch(m){if(!Ro(m))throw m;q("LocalStore","Failed to update sequence numbers: "+m)}for(const m of h){const v=m.targetId;if(!m.fromCache){const _=p.os.get(v),C=_.snapshotVersion,P=_.withLastLimboFreeSnapshotVersion(C);p.os=p.os.insert(v,P)}}}(r.localStore,i))}async function PC(t,e){const n=oe(t);if(!n.currentUser.isEqual(e)){q("SyncEngine","User change. New user:",e.toKey());const r=await C_(n.localStore,e);n.currentUser=e,function(i,o){i.ka.forEach(l=>{l.forEach(u=>{u.reject(new X(M.CANCELLED,o))})}),i.ka.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Do(n,r.hs)}}function NC(t,e){const n=oe(t),r=n.Na.get(e);if(r&&r.va)return he().add(r.key);{let s=he();const i=n.Ma.get(e);if(!i)return s;for(const o of i){const l=n.Fa.get(o);s=s.unionWith(l.view.Va)}return s}}function H_(t){const e=oe(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=z_.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=NC.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=kC.bind(null,e),e.Ca.d_=fC.bind(null,e.eventManager),e.Ca.$a=pC.bind(null,e.eventManager),e}function bC(t){const e=oe(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=AC.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=CC.bind(null,e),e}class xl{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=eu(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,n){return null}Ha(e,n){return null}za(e){return VA(this.persistence,new DA,e.initialUser,this.serializer)}Ga(e){return new PA(Kd.Zr,this.serializer)}Wa(e){return new $A}async terminate(){var e,n;(e=this.gcScheduler)===null||e===void 0||e.stop(),(n=this.indexBackfillerScheduler)===null||n===void 0||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}xl.provider={build:()=>new xl};class xh{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Sg(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=PC.bind(null,this.syncEngine),await lC(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new cC}()}createDatastore(e){const n=eu(e.databaseInfo.databaseId),r=function(i){return new qA(i)}(e.databaseInfo);return function(i,o,l,u){return new QA(i,o,l,u)}(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return function(r,s,i,o,l){return new JA(r,s,i,o,l)}(this.localStore,this.datastore,e.asyncQueue,n=>Sg(this.syncEngine,n,0),function(){return wg.D()?new wg:new BA}())}createSyncEngine(e,n){return function(s,i,o,l,u,h,p){const m=new _C(s,i,o,l,u,h);return p&&(m.Qa=!0),m}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){var e,n;await async function(s){const i=oe(s);q("RemoteStore","RemoteStore shutting down."),i.L_.add(5),await bo(i),i.k_.shutdown(),i.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(n=this.eventManager)===null||n===void 0||n.terminate()}}xh.provider={build:()=>new xh};/**
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
 */class DC{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):bn("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,n){setTimeout(()=>{this.muted||e(n)},0)}}/**
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
 */class OC{constructor(e,n,r,s,i){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=s,this.user=ut.UNAUTHENTICATED,this.clientId=Q0.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async o=>{q("FirestoreClient","Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(q("FirestoreClient","Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new br;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=ef(n,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function lc(t,e){t.asyncQueue.verifyOperationInProgress(),q("FirestoreClient","Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(async s=>{r.isEqual(s)||(await C_(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function Ag(t,e){t.asyncQueue.verifyOperationInProgress();const n=await VC(t);q("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(r=>Eg(e.remoteStore,r)),t.setAppCheckTokenChangeListener((r,s)=>Eg(e.remoteStore,s)),t._onlineComponents=e}async function VC(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){q("FirestoreClient","Using user provided OfflineComponentProvider");try{await lc(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!function(s){return s.name==="FirebaseError"?s.code===M.FAILED_PRECONDITION||s.code===M.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(n))throw n;Ds("Error using user provided cache. Falling back to memory cache: "+n),await lc(t,new xl)}}else q("FirestoreClient","Using default OfflineComponentProvider"),await lc(t,new xl);return t._offlineComponents}async function q_(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(q("FirestoreClient","Using user provided OnlineComponentProvider"),await Ag(t,t._uninitializedComponentsProvider._online)):(q("FirestoreClient","Using default OnlineComponentProvider"),await Ag(t,new xh))),t._onlineComponents}function LC(t){return q_(t).then(e=>e.syncEngine)}async function Cg(t){const e=await q_(t),n=e.eventManager;return n.onListen=wC.bind(null,e.syncEngine),n.onUnlisten=IC.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=EC.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=xC.bind(null,e.syncEngine),n}/**
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
 */function K_(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
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
 */const Rg=new Map;/**
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
 */function MC(t,e,n){if(!n)throw new X(M.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function jC(t,e,n,r){if(e===!0&&r===!0)throw new X(M.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function Pg(t){if(!Z.isDocumentKey(t))throw new X(M.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function rf(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":ne()}function xs(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new X(M.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=rf(t);throw new X(M.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
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
 */class Ng{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new X(M.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new X(M.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}jC("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=K_((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new X(M.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new X(M.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new X(M.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class sf{constructor(e,n,r,s){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Ng({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new X(M.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new X(M.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Ng(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new JS;switch(r.type){case"firstParty":return new tk(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new X(M.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=Rg.get(n);r&&(q("ComponentProvider","Removing Datastore"),Rg.delete(n),r.terminate())}(this),Promise.resolve()}}function FC(t,e,n,r={}){var s;const i=(t=xs(t,sf))._getSettings(),o=`${e}:${n}`;if(i.host!=="firestore.googleapis.com"&&i.host!==o&&Ds("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),t._setSettings(Object.assign(Object.assign({},i),{host:o,ssl:!1})),r.mockUserToken){let l,u;if(typeof r.mockUserToken=="string")l=r.mockUserToken,u=ut.MOCK_USER;else{l=xT(r.mockUserToken,(s=t._app)===null||s===void 0?void 0:s.options.projectId);const h=r.mockUserToken.sub||r.mockUserToken.user_id;if(!h)throw new X(M.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");u=new ut(h)}t._authCredentials=new XS(new G0(l,u))}}/**
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
 */class ru{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new ru(this.firestore,e,this._query)}}class Ft{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new po(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Ft(this.firestore,e,this._key)}}class po extends ru{constructor(e,n,r){super(e,n,zd(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Ft(this.firestore,null,new Z(e))}withConverter(e){return new po(this.firestore,e,this._path)}}function bg(t,e,...n){if(t=$t(t),arguments.length===1&&(e=Q0.newId()),MC("doc","path",e),t instanceof sf){const r=Le.fromString(e,...n);return Pg(r),new Ft(t,null,new Z(r))}{if(!(t instanceof Ft||t instanceof po))throw new X(M.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Le.fromString(e,...n));return Pg(r),new Ft(t.firestore,t instanceof po?t.converter:null,new Z(r))}}/**
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
 */class Dg{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new P_(this,"async_queue_retry"),this.Vu=()=>{const r=ac();r&&q("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const n=ac();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const n=ac();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const n=new br;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!Ro(e))throw e;q("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const n=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;const s=function(o){let l=o.message||"";return o.stack&&(l=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),l}(r);throw bn("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.du=!1,r))));return this.mu=n,n}enqueueAfterDelay(e,n,r){this.fu(),this.Ru.indexOf(e)>-1&&(n=0);const s=Zd.createAndSchedule(this,e,n,r,i=>this.yu(i));return this.Tu.push(s),s}fu(){this.Eu&&ne()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const n of this.Tu)if(n.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.Tu)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const n=this.Tu.indexOf(e);this.Tu.splice(n,1)}}function Og(t){return function(n,r){if(typeof n!="object"||n===null)return!1;const s=n;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1}(t,["next","error","complete"])}class Sl extends sf{constructor(e,n,r,s){super(e,n,r,s),this.type="firestore",this._queue=new Dg,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Dg(e),this._firestoreClient=void 0,await e}}}function UC(t,e){const n=typeof t=="object"?t:a0(),r=typeof t=="string"?t:"(default)",s=xd(n,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=TT("firestore");i&&FC(s,...i)}return s}function G_(t){if(t._terminated)throw new X(M.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||zC(t),t._firestoreClient}function zC(t){var e,n,r;const s=t._freezeSettings(),i=function(l,u,h,p){return new pk(l,u,h,p.host,p.ssl,p.experimentalForceLongPolling,p.experimentalAutoDetectLongPolling,K_(p.experimentalLongPollingOptions),p.useFetchStreams)}(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,s);t._componentsProvider||!((n=s.localCache)===null||n===void 0)&&n._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(t._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),t._firestoreClient=new OC(t._authCredentials,t._appCheckCredentials,t._queue,i,t._componentsProvider&&function(l){const u=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(u),_online:u}}(t._componentsProvider))}/**
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
 */class Fs{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Fs(nt.fromBase64String(e))}catch(n){throw new X(M.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new Fs(nt.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
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
 */class of{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new X(M.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Xe(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class af{constructor(e){this._methodName=e}}/**
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
 */class lf{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new X(M.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new X(M.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return we(this._lat,e._lat)||we(this._long,e._long)}}/**
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
 */class uf{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}}/**
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
 */const $C=/^__.*__$/;class BC{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new Hr(e,this.data,this.fieldMask,n,this.fieldTransforms):new Po(e,this.data,n,this.fieldTransforms)}}function Q_(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw ne()}}class cf{constructor(e,n,r,s,i,o){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.vu(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new cf(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.Fu({path:r,xu:!1});return s.Ou(e),s}Nu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.Fu({path:r,xu:!1});return s.vu(),s}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return kl(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(Q_(this.Cu)&&$C.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class WC{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||eu(e)}Qu(e,n,r,s=!1){return new cf({Cu:e,methodName:n,qu:r,path:Xe.emptyPath(),xu:!1,ku:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function HC(t){const e=t._freezeSettings(),n=eu(t._databaseId);return new WC(t._databaseId,!!e.ignoreUndefinedProperties,n)}function qC(t,e,n,r,s,i={}){const o=t.Qu(i.merge||i.mergeFields?2:0,e,n,s);Z_("Data must be an object, but it was:",o,r);const l=J_(r,o);let u,h;if(i.merge)u=new Qt(o.fieldMask),h=o.fieldTransforms;else if(i.mergeFields){const p=[];for(const m of i.mergeFields){const v=KC(e,m,n);if(!o.contains(v))throw new X(M.INVALID_ARGUMENT,`Field '${v}' is specified in your field mask but missing from your input data.`);QC(p,v)||p.push(v)}u=new Qt(p),h=o.fieldTransforms.filter(m=>u.covers(m.field))}else u=null,h=o.fieldTransforms;return new BC(new Lt(l),u,h)}class hf extends af{_toFieldTransform(e){return new Uk(e.path,new co)}isEqual(e){return e instanceof hf}}function Y_(t,e){if(X_(t=$t(t)))return Z_("Unsupported field value:",e,t),J_(t,e);if(t instanceof af)return function(r,s){if(!Q_(s.Cu))throw s.Bu(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Bu(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(r,s){const i=[];let o=0;for(const l of r){let u=Y_(l,s.Lu(o));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),o++}return{arrayValue:{values:i}}}(t,e)}return function(r,s){if((r=$t(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Mk(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=He.fromDate(r);return{timestampValue:Tl(s.serializer,i)}}if(r instanceof He){const i=new He(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Tl(s.serializer,i)}}if(r instanceof lf)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Fs)return{bytesValue:E_(s.serializer,r._byteString)};if(r instanceof Ft){const i=s.databaseId,o=r.firestore._databaseId;if(!o.isEqual(i))throw s.Bu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Hd(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof uf)return function(o,l){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:o.toArray().map(u=>{if(typeof u!="number")throw l.Bu("VectorValues must only contain numeric values.");return $d(l.serializer,u)})}}}}}}(r,s);throw s.Bu(`Unsupported field value: ${rf(r)}`)}(t,e)}function J_(t,e){const n={};return Y0(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):qs(t,(r,s)=>{const i=Y_(s,e.Mu(r));i!=null&&(n[r]=i)}),{mapValue:{fields:n}}}function X_(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof He||t instanceof lf||t instanceof Fs||t instanceof Ft||t instanceof af||t instanceof uf)}function Z_(t,e,n){if(!X_(n)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(n)){const r=rf(n);throw r==="an object"?e.Bu(t+" a custom object"):e.Bu(t+" "+r)}}function KC(t,e,n){if((e=$t(e))instanceof of)return e._internalPath;if(typeof e=="string")return ew(t,e);throw kl("Field path arguments must be of type string or ",t,!1,void 0,n)}const GC=new RegExp("[~\\*/\\[\\]]");function ew(t,e,n){if(e.search(GC)>=0)throw kl(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new of(...e.split("."))._internalPath}catch{throw kl(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function kl(t,e,n,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let l=`Function ${e}() called with invalid data`;n&&(l+=" (via `toFirestore()`)"),l+=". ";let u="";return(i||o)&&(u+=" (found",i&&(u+=` in field ${r}`),o&&(u+=` in document ${s}`),u+=")"),new X(M.INVALID_ARGUMENT,l+t+u)}function QC(t,e){return t.some(n=>n.isEqual(e))}/**
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
 */class tw{constructor(e,n,r,s,i){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Ft(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new YC(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(nw("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class YC extends tw{data(){return super.data()}}function nw(t,e){return typeof e=="string"?ew(t,e):e instanceof of?e._internalPath:e._delegate._internalPath}/**
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
 */function JC(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new X(M.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class XC{convertValue(e,n="none"){switch($r(e)){case 0:return null;case 1:return e.booleanValue;case 2:return je(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(zr(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw ne()}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const r={};return qs(e,(s,i)=>{r[s]=this.convertValue(i,n)}),r}convertVectorValue(e){var n,r,s;const i=(s=(r=(n=e.fields)===null||n===void 0?void 0:n.value.arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map(o=>je(o.doubleValue));return new uf(i)}convertGeoPoint(e){return new lf(je(e.latitude),je(e.longitude))}convertArray(e,n){return(e.values||[]).map(r=>this.convertValue(r,n))}convertServerTimestamp(e,n){switch(n){case"previous":const r=Md(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(ao(e));default:return null}}convertTimestamp(e){const n=fr(e);return new He(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=Le.fromString(e);Te(A_(r));const s=new lo(r.get(1),r.get(3)),i=new Z(r.popFirst(5));return s.isEqual(n)||bn(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
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
 */function ZC(t,e,n){let r;return r=t?t.toFirestore(e):e,r}/**
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
 */class ki{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class rw extends tw{constructor(e,n,r,s,i,o){super(e,n,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new Fa(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(nw("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}}class Fa extends rw{data(e={}){return super.data(e)}}class e2{constructor(e,n,r,s){this._firestore=e,this._userDataWriter=n,this._snapshot=s,this.metadata=new ki(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(r=>{e.call(n,new Fa(this._firestore,this._userDataWriter,r.key,r,new ki(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new X(M.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map(l=>{const u=new Fa(s._firestore,s._userDataWriter,l.doc.key,l.doc,new ki(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}})}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(l=>i||l.type!==3).map(l=>{const u=new Fa(s._firestore,s._userDataWriter,l.doc.key,l.doc,new ki(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,p=-1;return l.type!==0&&(h=o.indexOf(l.doc.key),o=o.delete(l.doc.key)),l.type!==1&&(o=o.add(l.doc),p=o.indexOf(l.doc.key)),{type:t2(l.type),doc:u,oldIndex:h,newIndex:p}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}}function t2(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return ne()}}class sw extends XC{constructor(e){super(),this.firestore=e}convertBytes(e){return new Fs(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new Ft(this.firestore,null,n)}}function n2(t,e,n){t=xs(t,Ft);const r=xs(t.firestore,Sl),s=ZC(t.converter,e);return s2(r,[qC(HC(r),"setDoc",t._key,s,t.converter!==null,n).toMutation(t._key,In.none())])}function r2(t,...e){var n,r,s;t=$t(t);let i={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||Og(e[o])||(i=e[o],o++);const l={includeMetadataChanges:i.includeMetadataChanges,source:i.source};if(Og(e[o])){const m=e[o];e[o]=(n=m.next)===null||n===void 0?void 0:n.bind(m),e[o+1]=(r=m.error)===null||r===void 0?void 0:r.bind(m),e[o+2]=(s=m.complete)===null||s===void 0?void 0:s.bind(m)}let u,h,p;if(t instanceof Ft)h=xs(t.firestore,Sl),p=zd(t._key.path),u={next:m=>{e[o]&&e[o](i2(h,t,m))},error:e[o+1],complete:e[o+2]};else{const m=xs(t,ru);h=xs(m.firestore,Sl),p=m._query;const v=new sw(h);u={next:_=>{e[o]&&e[o](new e2(h,v,m,_))},error:e[o+1],complete:e[o+2]},JC(t._query)}return function(v,_,C,P){const O=new DC(P),S=new mC(_,O,C);return v.asyncQueue.enqueueAndForget(async()=>hC(await Cg(v),S)),()=>{O.Za(),v.asyncQueue.enqueueAndForget(async()=>dC(await Cg(v),S))}}(G_(h),p,l,u)}function s2(t,e){return function(r,s){const i=new br;return r.asyncQueue.enqueueAndForget(async()=>SC(await LC(r),s,i)),i.promise}(G_(t),e)}function i2(t,e,n){const r=n.docs.get(e._key),s=new sw(t);return new rw(t,s,e._key,r,new ki(n.hasPendingWrites,n.fromCache),e.converter)}function o2(){return new hf("serverTimestamp")}(function(e,n=!0){(function(s){Hs=s})(Bs),bs(new jr("firestore",(r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),l=new Sl(new ZS(r.getProvider("auth-internal")),new rk(r.getProvider("app-check-internal")),function(h,p){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new X(M.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new lo(h.options.projectId,p)}(o,s),o);return i=Object.assign({useFetchStreams:n},i),l._setSettings(i),l},"PUBLIC").setMultipleInstances(!0)),ur(Jm,"4.7.3",e),ur(Jm,"4.7.3","esm2017")})();/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var a2={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l2=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),re=(t,e)=>{const n=B.forwardRef(({color:r="currentColor",size:s=24,strokeWidth:i=2,absoluteStrokeWidth:o,className:l="",children:u,...h},p)=>B.createElement("svg",{ref:p,...a2,width:s,height:s,stroke:r,strokeWidth:o?Number(i)*24/Number(s):i,className:["lucide",`lucide-${l2(t)}`,l].join(" "),...h},[...e.map(([m,v])=>B.createElement(m,v)),...Array.isArray(u)?u:[u]]));return n.displayName=`${t}`,n};/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const su=re("AlertCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u2=re("ArrowRightCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 12h8",key:"1wcyev"}],["path",{d:"m12 16 4-4-4-4",key:"1i9zcv"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c2=re("BarChart2",[["line",{x1:"18",x2:"18",y1:"20",y2:"10",key:"1xfpm4"}],["line",{x1:"12",x2:"12",y1:"20",y2:"4",key:"be30l9"}],["line",{x1:"6",x2:"6",y1:"20",y2:"14",key:"1r4le6"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h2=re("BookOpen",[["path",{d:"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z",key:"vv98re"}],["path",{d:"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",key:"1cyq3y"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iw=re("BrainCircuit",[["path",{d:"M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08 2.5 2.5 0 0 0 4.91.05L12 20V4.5Z",key:"ixwj2a"}],["path",{d:"M16 8V5c0-1.1.9-2 2-2",key:"13dx7u"}],["path",{d:"M12 13h4",key:"1ku699"}],["path",{d:"M12 18h6a2 2 0 0 1 2 2v1",key:"105ag5"}],["path",{d:"M12 8h8",key:"1lhi5i"}],["path",{d:"M20.5 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z",key:"1s25gz"}],["path",{d:"M16.5 13a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z",key:"127460"}],["path",{d:"M20.5 21a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z",key:"fys062"}],["path",{d:"M18.5 3a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z",key:"1vib61"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d2=re("Calendar",[["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",ry:"2",key:"eu3xkr"}],["line",{x1:"16",x2:"16",y1:"2",y2:"6",key:"m3sa8f"}],["line",{x1:"8",x2:"8",y1:"2",y2:"6",key:"18kwsl"}],["line",{x1:"3",x2:"21",y1:"10",y2:"10",key:"xt86sb"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const df=re("CheckCircle2",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ow=re("CheckSquare",[["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}],["path",{d:"M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",key:"1jnkn4"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Al=re("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f2=re("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const aw=re("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ff=re("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p2=re("CloudOff",[["path",{d:"m2 2 20 20",key:"1ooewy"}],["path",{d:"M5.782 5.782A7 7 0 0 0 9 19h8.5a4.5 4.5 0 0 0 1.307-.193",key:"yfwify"}],["path",{d:"M21.532 16.5A4.5 4.5 0 0 0 17.5 10h-1.79A7.008 7.008 0 0 0 10 5.07",key:"jlfiyv"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m2=re("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g2=re("EyeOff",[["path",{d:"M9.88 9.88a3 3 0 1 0 4.24 4.24",key:"1jxqfv"}],["path",{d:"M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68",key:"9wicm4"}],["path",{d:"M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61",key:"1jreej"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vg=re("Eye",[["path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z",key:"rwhkz3"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y2=re("FileJson",[["path",{d:"M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z",key:"1nnpy2"}],["polyline",{points:"14 2 14 8 20 8",key:"1ew0cm"}],["path",{d:"M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1",key:"1oajmo"}],["path",{d:"M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1",key:"mpwhp6"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v2=re("Filter",[["polygon",{points:"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3",key:"1yg77f"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iu=re("Flag",[["path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z",key:"i9b6wo"}],["line",{x1:"4",x2:"4",y1:"22",y2:"15",key:"1cm3nv"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _2=re("GraduationCap",[["path",{d:"M22 10v6M2 10l10-5 10 5-10 5z",key:"1ef52a"}],["path",{d:"M6 12v5c3 3 9 3 12 0v-5",key:"1f75yj"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w2=re("History",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M12 7v5l4 2",key:"1fdv2h"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lw=re("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pf=re("LayoutGrid",[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1",key:"1g98yp"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1",key:"6d4xhi"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1",key:"nxv5o0"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1",key:"1bb6yr"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mf=re("Library",[["path",{d:"m16 6 4 14",key:"ji33uf"}],["path",{d:"M12 6v14",key:"1n7gus"}],["path",{d:"M8 8v12",key:"1gg7y9"}],["path",{d:"M4 4v16",key:"6qkkli"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qs=re("Loader2",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E2=re("Moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uw=re("MousePointer2",[["path",{d:"m4 4 7.07 17 2.51-7.39L21 11.07z",key:"1vqm48"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T2=re("PanelRightClose",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M15 3v18",key:"14nvp0"}],["path",{d:"m8 9 3 3-3 3",key:"12hl5m"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I2=re("PanelRightOpen",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M15 3v18",key:"14nvp0"}],["path",{d:"m10 15-3-3 3-3",key:"1pgupc"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x2=re("PieChart",[["path",{d:"M21.21 15.89A10 10 0 1 1 8 2.83",key:"k2fpak"}],["path",{d:"M22 12A10 10 0 0 0 12 2v10z",key:"1rfc4y"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S2=re("Play",[["polygon",{points:"5 3 19 12 5 21 5 3",key:"191637"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cw=re("PlusCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 12h8",key:"1wcyev"}],["path",{d:"M12 8v8",key:"napkw2"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uc=re("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hw=re("RotateCcw",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dw=re("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k2=re("Shuffle",[["path",{d:"M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22",key:"1wmou1"}],["path",{d:"m18 2 4 4-4 4",key:"pucp1d"}],["path",{d:"M2 6h1.9c1.5 0 2.9.9 3.6 2.2",key:"10bdb2"}],["path",{d:"M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8",key:"vgxac0"}],["path",{d:"m18 14 4 4-4 4",key:"10pe0f"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mo=re("Sparkles",[["path",{d:"m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z",key:"17u4zn"}],["path",{d:"M5 3v4",key:"bklmnn"}],["path",{d:"M19 17v4",key:"iiml17"}],["path",{d:"M3 5h4",key:"nem4j1"}],["path",{d:"M17 19h4",key:"lbex7p"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A2=re("SquarePen",[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z",key:"1lpok0"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C2=re("StickyNote",[["path",{d:"M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z",key:"1wis1t"}],["path",{d:"M15 3v6h6",key:"edgan2"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R2=re("Sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sh=re("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kh=re("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P2=re("Volume2",[["polygon",{points:"11 5 6 9 2 9 2 15 6 15 11 19 11 5",key:"16drj5"}],["path",{d:"M15.54 8.46a5 5 0 0 1 0 7.07",key:"ltjumu"}],["path",{d:"M19.07 4.93a10 10 0 0 1 0 14.14",key:"1kegas"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N2=re("VolumeX",[["polygon",{points:"11 5 6 9 2 9 2 15 6 15 11 19 11 5",key:"16drj5"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15",key:"1ewh16"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15",key:"5ykzw1"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b2=re("Wifi",[["path",{d:"M5 13a10 10 0 0 1 14 0",key:"6v8j51"}],["path",{d:"M8.5 16.5a5 5 0 0 1 7 0",key:"sej527"}],["path",{d:"M2 8.82a15 15 0 0 1 20 0",key:"dnpr2z"}],["line",{x1:"12",x2:"12.01",y1:"20",y2:"20",key:"of4bc4"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D2=re("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),Lg="icu_resident_master_v2",O2="AIzaSyD9wy-5wZToEmGiWM6CooJh4te48YpU-iw",Mg=[];class V2 extends Nh.Component{constructor(e){super(e),this.state={hasError:!1,error:null}}static getDerivedStateFromError(e){return{hasError:!0,error:e}}componentDidCatch(e,n){console.error("ErrorBoundary caught an error",e,n)}render(){var e;return this.state.hasError?f.jsxs("div",{className:"p-8 text-center flex flex-col items-center justify-center h-full bg-red-50 rounded-xl border border-red-100 m-4",children:[f.jsx(su,{className:"w-12 h-12 text-red-800 mb-4"}),f.jsx("h2",{className:"text-xl font-bold text-red-800 mb-2",children:"Something went wrong"}),f.jsx("p",{className:"text-red-600 mb-6 max-w-md text-sm font-mono bg-white p-3 rounded border border-red-200",children:((e=this.state.error)==null?void 0:e.toString())||"Unknown Error"}),f.jsx("button",{onClick:()=>this.setState({hasError:!1}),className:"px-6 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors shadow-sm",children:"Reload Component"})]}):this.props.children}}const L2=t=>{const e=[...t];for(let n=e.length-1;n>0;n--){const r=Math.floor(Math.random()*(n+1));[e[n],e[r]]=[e[r],e[n]]}return e},jg=t=>JSON.parse(JSON.stringify(t)),Fg=t=>{if(!t)return"N/A";const e=t.toDate?t.toDate():new Date(t);return isNaN(e)?"N/A":e.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",second:"2-digit"})+" "+e.toLocaleDateString("en-US",{month:"short",day:"numeric"})};async function ou(t,e="tutor"){var l,u,h,p,m;const n={fix:"You are a JSON syntax correction bot. Your ONLY job is to fix the provided invalid JSON string and return ONLY the corrected JSON array. Do not include markdown formatting, explanations, or extra text.",tutor:"You are an expert medical tutor and analyst. Your knowledge base and recommendations must be strictly derived from 'Irwin & Rippe's Intensive Care Medicine (9th Edition)'. Provide concise, high-yield, board-relevant explanations and study plans.",chat:"You are 'Professor Irwin', a senior ICU attending. You are answering a resident's specific follow-up question about a clinical case. Be Socratic, concise, and friendly. Do not lecture; answer the specific question directly using evidence-based ICU principles.",mnemonic:"You are a creative visual artist. Create a vivid, surreal, and memorable visual description (prompt) that represents a mnemonic for the provided medical concept. The output should be a single paragraph describing an image that, if painted, would help a student remember the fact. Do not explain the mnemonic, just describe the visual scene."},r=n[e]||n.tutor,s=`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${O2}`,i=v=>new Promise(_=>setTimeout(_,v)),o={contents:[{parts:[{text:t}]}],systemInstruction:{parts:[{text:r}]}};for(let v=0;v<3;v++)try{const _=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)});if(!_.ok)throw new Error("API Error");const P=(m=(p=(h=(u=(l=(await _.json()).candidates)==null?void 0:l[0])==null?void 0:u.content)==null?void 0:h.parts)==null?void 0:p[0])==null?void 0:m.text;if(!P)throw new Error("No text returned");return P}catch(_){if(v===2)return"Connection Error: "+_.message;await i(1e3*(v+1))}return"Failed to connect to AI."}function M2({notification:t,onClose:e}){return t?f.jsxs("div",{className:`fixed bottom-6 right-6 z-50 p-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300 border ${t.type==="error"?"bg-rose-50 border-rose-200 text-rose-800":"bg-emerald-50 border-emerald-200 text-emerald-800"}`,children:[f.jsx("div",{className:`p-2 rounded-full ${t.type==="error"?"bg-rose-100 text-rose-600":"bg-emerald-100 text-emerald-600"}`,children:t.type==="error"?f.jsx(su,{size:20}):f.jsx(df,{size:20})}),f.jsxs("div",{children:[f.jsx("h4",{className:"font-bold text-sm",children:t.type==="error"?"Action Failed":"Success"}),f.jsx("p",{className:"text-xs opacity-90 font-medium",children:t.message})]}),f.jsx("button",{onClick:e,className:"ml-4 p-1 rounded-full hover:bg-black/5 transition-colors",children:f.jsx(D2,{size:16})})]}):null}function j2({options:t,selected:e,onChange:n,placeholder:r,darkMode:s}){const[i,o]=B.useState(!1),l=B.useRef(null);B.useEffect(()=>{const m=v=>{l.current&&!l.current.contains(v.target)&&o(!1)};return document.addEventListener("mousedown",m),()=>document.removeEventListener("mousedown",m)},[]);const u=m=>{e.includes(m)?n(e.filter(v=>v!==m)):n([...e,m])},h=()=>n(t),p=()=>n([]);return f.jsxs("div",{className:"relative",ref:l,children:[f.jsxs("button",{onClick:()=>o(!i),className:`w-full md:w-auto p-2 rounded-lg border text-sm flex items-center justify-between gap-2 min-w-[150px] ${s?"bg-slate-950 border-slate-700 text-white":"bg-white border-slate-200 text-slate-700"}`,children:[f.jsx("span",{className:"truncate max-w-[150px]",children:e.length===0?r:`${e.length} Selected`}),f.jsx(f2,{size:14})]}),i&&f.jsxs("div",{className:`absolute top-full left-0 mt-1 w-64 max-h-80 overflow-y-auto rounded-xl border shadow-xl z-50 ${s?"bg-slate-900 border-slate-700":"bg-white border-slate-200"}`,children:[f.jsxs("div",{className:`p-2 border-b flex justify-between ${s?"border-slate-800":"border-slate-100"}`,children:[f.jsx("button",{onClick:h,className:"text-xs font-bold text-indigo-500 hover:underline",children:"All"}),f.jsx("button",{onClick:p,className:"text-xs font-bold text-slate-400 hover:underline",children:"Clear"})]}),t.map(m=>f.jsxs("div",{onClick:()=>u(m),className:`p-2 text-xs flex items-center gap-2 cursor-pointer hover:bg-opacity-50 ${e.includes(m)?"bg-indigo-50 dark:bg-indigo-900/30":""} ${s?"hover:bg-slate-800 text-slate-300":"hover:bg-slate-50 text-slate-700"}`,children:[f.jsx("div",{className:`w-4 h-4 rounded border flex items-center justify-center ${e.includes(m)?"bg-indigo-600 border-indigo-600":"border-slate-400"}`,children:e.includes(m)&&f.jsx(Al,{size:10,className:"text-white"})}),f.jsx("span",{className:"truncate",children:m})]},m))]})]})}const zn=({active:t,onClick:e,icon:n,label:r})=>f.jsxs("button",{onClick:e,className:`w-12 h-12 rounded-xl flex items-center justify-center transition-all mb-4 relative group ${t?"bg-indigo-600 text-white shadow-lg":"text-slate-400 hover:bg-slate-800 hover:text-white"}`,children:[Nh.cloneElement(n,{size:24}),f.jsx("span",{className:"absolute left-14 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 font-bold shadow-lg",children:r})]});function va({label:t,value:e,icon:n,darkMode:r}){return f.jsxs("div",{className:`p-4 rounded-xl border flex items-center gap-4 ${r?"bg-slate-900 border-slate-800":"bg-white border-slate-200 shadow-sm"}`,children:[f.jsx("div",{className:`p-3 rounded-lg ${r?"bg-slate-800":"bg-slate-50"}`,children:n}),f.jsxs("div",{children:[f.jsx("div",{className:"text-2xl font-bold",children:e}),f.jsx("div",{className:"text-xs text-slate-500 uppercase tracking-wider font-medium",children:t})]})]})}function F2({syncStatus:t,activeView:e,darkMode:n,fallbackMode:r,lastCloudUpdate:s,sessionStartTime:i,onManualSync:o}){const l=Fg(s),u=Fg(i);return f.jsxs("header",{className:`pt-[env(safe-area-inset-top)] border-b flex items-center justify-between px-6 shrink-0 z-30 sticky top-0 transition-all ${n?"bg-slate-950 border-slate-800":"bg-white border-slate-200"} h-auto min-h-[4rem]`,children:[f.jsxs("h2",{className:"font-bold text-lg capitalize flex items-center gap-2 py-3",children:[e==="control"?"Command Center":e==="generator"?"AI Generator":e,t==="syncing"&&f.jsx(Qs,{size:14,className:"animate-spin text-indigo-500"}),t==="saved"&&f.jsx(df,{size:14,className:"text-emerald-500"}),t==="error"&&f.jsx(p2,{size:14,className:"text-rose-500"})]}),f.jsxs("div",{className:"flex items-center gap-3 text-right",children:[f.jsxs("div",{className:"flex flex-col text-xs space-y-0.5 hidden md:flex",children:[f.jsxs("span",{className:`font-bold ${n?"text-slate-300":"text-slate-700"}`,children:["Last Cloud Sync: ",l]}),f.jsxs("span",{className:`text-slate-500 ${r?"text-rose-500":""}`,children:["Session Started: ",u]})]}),f.jsx("button",{onClick:o,className:"p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-indigo-500 transition-colors",title:"Force Sync",children:f.jsx(hw,{size:16})}),f.jsxs("div",{className:`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono border ${n?"border-slate-800 text-slate-400":"border-slate-200 text-slate-500 bg-slate-100"}`,children:[f.jsx(b2,{size:14,className:r?"text-slate-400":"text-emerald-500"})," ",r?"Local":"Online"]})]})]})}function U2({onAdd:t,darkMode:e,notify:n}){const[r,s]=B.useState(""),[i,o]=B.useState(5),[l,u]=B.useState("Resident"),[h,p]=B.useState(!1),m=async()=>{if(!r.trim())return;p(!0);const v=`Create a JSON array of ${i} multiple choice questions about "${r}" for a ${l} level ICU practitioner based on Irwin & Rippe's Intensive Care Medicine (9th Ed). Output purely the JSON array. No markdown. No intro text. Format: [{"package": "AI: ${r}", "question": "...", "options": ["A", "B", "C", "D"], "correctIndex": 0, "explanation": "..."}]`;try{const _=await ou(v,"tutor");t(_),s(""),n(`${i} Questions generated successfully!`,"success")}catch(_){n("Generation failed: "+_.message,"error")}finally{p(!1)}};return f.jsxs("div",{className:"p-8 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4",children:[f.jsxs("div",{className:"text-center mb-12",children:[f.jsx("div",{className:"w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/30",children:f.jsx(mo,{className:"text-white w-8 h-8"})}),f.jsx("h1",{className:`text-4xl font-bold mb-4 ${e?"text-white":"text-slate-900"}`,children:"Magic Quiz Generator"}),f.jsx("p",{className:`text-lg max-w-lg mx-auto ${e?"text-slate-400":"text-slate-600"}`,children:"Enter any medical topic, and our AI will instantly create a high-yield board review package for you."})]}),f.jsx("div",{className:`p-6 rounded-3xl border ${e?"bg-slate-900 border-slate-800":"bg-white border-slate-200 shadow-xl shadow-slate-200/50"}`,children:f.jsxs("div",{className:"space-y-6",children:[f.jsxs("div",{children:[f.jsx("label",{className:`block text-sm font-bold uppercase tracking-wider mb-2 ${e?"text-slate-400":"text-slate-500"}`,children:"Topic / Clinical Condition"}),f.jsx("input",{value:r,onChange:v=>s(v.target.value),placeholder:"e.g., Sepsis Bundle, Ventilator Waveforms, Hyponatremia",className:`w-full p-4 rounded-xl text-lg font-medium outline-none border-2 transition-all ${e?"bg-slate-950 border-slate-800 focus:border-indigo-500 text-white":"bg-slate-50 border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-900"}`})]}),f.jsxs("div",{className:"grid grid-cols-2 gap-6",children:[f.jsxs("div",{children:[f.jsx("label",{className:`block text-sm font-bold uppercase tracking-wider mb-2 ${e?"text-slate-400":"text-slate-500"}`,children:"Difficulty"}),f.jsxs("select",{value:l,onChange:v=>u(v.target.value),className:`w-full p-4 rounded-xl outline-none border-2 appearance-none ${e?"bg-slate-950 border-slate-800 text-white":"bg-slate-50 border-slate-200 text-slate-900"}`,children:[f.jsx("option",{children:"Medical Student"}),f.jsx("option",{children:"Resident"}),f.jsx("option",{children:"Fellow"}),f.jsx("option",{children:"Attending"})]})]}),f.jsxs("div",{children:[f.jsx("label",{className:`block text-sm font-bold uppercase tracking-wider mb-2 ${e?"text-slate-400":"text-slate-500"}`,children:"Questions"}),f.jsxs("select",{value:i,onChange:v=>o(Number(v.target.value)),className:`w-full p-4 rounded-xl outline-none border-2 appearance-none ${e?"bg-slate-950 border-slate-800 text-white":"bg-slate-50 border-slate-200 text-slate-900"}`,children:[f.jsx("option",{value:3,children:"3 Questions"}),f.jsx("option",{value:5,children:"5 Questions"}),f.jsx("option",{value:10,children:"10 Questions"})]})]})]}),f.jsxs("button",{onClick:m,disabled:h||!r,className:"w-full py-5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold shadow-lg shadow-indigo-500/30 transition-all active:scale-95 flex items-center justify-center gap-3 text-lg",children:[h?f.jsx(Qs,{className:"animate-spin"}):f.jsx(mo,{}),h?"Generating Content...":"Generate Quiz Package"]})]})})]})}function z2({library:t,onCreate:e,darkMode:n,notify:r}){const[s,i]=B.useState("all"),[o,l]=B.useState(!1),[u,h]=B.useState([]),[p,m]=B.useState(""),[v,_]=B.useState(null),[C,P]=B.useState(!1),[O,S]=B.useState(!1),T=B.useRef(!1),k=B.useRef(!0),D=B.useMemo(()=>[...new Set(t.map(G=>G.package))],[t]);B.useEffect(()=>{h(D)},[t]);const F=G=>{if(!O&&window.matchMedia("(hover: none)").matches)return;T.current=!0;const Re=u.includes(G);k.current=!Re,w(G,k.current)},U=G=>{T.current&&w(G,k.current)},E=()=>{T.current=!1},y=G=>{w(G,!u.includes(G))},w=(G,Re)=>{h(ye=>Re&&!ye.includes(G)?[...ye,G]:!Re&&ye.includes(G)?ye.filter(pe=>pe!==G):ye)};B.useEffect(()=>(window.addEventListener("mouseup",E),()=>window.removeEventListener("mouseup",E)),[]);const x=()=>h(D),A=()=>h([]),R=t.filter(G=>u.includes(G.package)?s==="wrong"?G.globalState.status==="wrong":s==="flagged"?G.globalState.flagged:s==="unanswered"?G.globalState.status==="unanswered":!0:!1).length,I=async()=>{if(!p.trim()||C)return;P(!0);const G=D.map(pe=>{const $=t.filter(ae=>ae.package===pe).length,Q=t.filter(ae=>ae.package===pe&&ae.globalState.status!=="unanswered").length,J=t.filter(ae=>ae.package===pe&&ae.globalState.status==="correct").length,ue=Q>0?J/Q*100:0;return{name:pe,total:$,answered:Q,accuracy:ue.toFixed(0)}}).filter(pe=>pe.total>0),Re=`
      USER GOAL: "${p}"
      AVAILABLE PACKAGES:
      ${G.map(pe=>`${pe.name}: ${pe.total} / ${pe.answered} / ${pe.accuracy}%`).join(`
`)}

      Generate a highly actionable study plan based on Irwin & Rippe (9th Ed.) structured into 3 prioritized steps. Suggest specific packages/modes. Output using Markdown.
    `,ye=await ou(Re,"tutor");_(ye),P(!1)};return f.jsxs("div",{className:"p-8 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4",children:[f.jsx("div",{className:"flex justify-between items-end mb-8",children:f.jsxs("div",{children:[f.jsx("h1",{className:`text-3xl font-bold mb-2 ${n?"text-white":"text-slate-900"}`,children:"Command Center"}),f.jsx("p",{className:`${n?"text-slate-400":"text-slate-500"}`,children:"Auto-Sync Active. Ready to study."})]})}),f.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:[f.jsxs("div",{className:`p-6 rounded-2xl border flex flex-col ${n?"bg-slate-900 border-slate-800":"bg-white border-slate-200 shadow-sm"}`,children:[f.jsxs("div",{className:"flex items-center justify-between mb-4",children:[f.jsxs("div",{className:"flex items-center gap-2 text-indigo-500 font-bold uppercase text-xs tracking-wider",children:[f.jsx(mf,{size:14})," Sources"]}),f.jsxs("div",{className:"flex items-center gap-2",children:[f.jsxs("button",{onClick:()=>S(!O),className:`p-1.5 rounded-lg text-xs font-bold transition-all ${O?"bg-indigo-600 text-white":"bg-slate-200 text-slate-500"}`,title:"Toggle Selection Mode (Fixes Scroll)",children:[f.jsx(uw,{size:14})," ",O?"Paint ON":"Paint OFF"]}),f.jsxs("div",{className:"flex gap-2 text-xs font-bold",children:[f.jsx("button",{onClick:x,className:"hover:text-indigo-500",children:"All"}),f.jsx("span",{className:"text-slate-300",children:"|"}),f.jsx("button",{onClick:A,className:"hover:text-indigo-500",children:"None"})]})]})]}),f.jsxs("div",{className:"space-y-2 max-h-60 overflow-y-auto custom-scrollbar select-none flex-1 touch-pan-y",style:{touchAction:O?"none":"auto"},children:[D.map(G=>f.jsxs("div",{onMouseDown:()=>F(G),onMouseEnter:()=>U(G),onClick:()=>y(G),onTouchStart:()=>F(G),onTouchMove:Re=>{if(O&&T.current){const ye=Re.touches[0],pe=document.elementFromPoint(ye.clientX,ye.clientY),$=pe==null?void 0:pe.closest("[data-pkg]");$&&w($.dataset.pkg,k.current)}},"data-pkg":G,className:`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${u.includes(G)?"border-indigo-500 bg-indigo-50 text-indigo-900":n?"border-slate-700 text-slate-400 hover:bg-slate-800":"border-slate-100 text-slate-600 hover:bg-slate-50"}`,children:[f.jsx("span",{className:"text-sm font-medium truncate pr-2",children:G}),u.includes(G)&&f.jsx(df,{size:16,className:"text-indigo-600 shrink-0"})]},G)),D.length===0&&f.jsx("div",{className:"text-center text-slate-400 text-sm py-8",children:"Library empty. Import data or use AI Gen."})]}),f.jsx("div",{className:"text-xs text-center text-slate-400 mt-2",children:O?"Slide finger to select multiple":"Click to select or Toggle Paint Mode"})]}),f.jsxs("div",{className:`p-6 rounded-2xl border ${n?"bg-slate-900 border-slate-800":"bg-white border-slate-200 shadow-sm"}`,children:[f.jsxs("div",{className:"flex items-center gap-2 mb-4 text-rose-500 font-bold uppercase text-xs tracking-wider",children:[f.jsx(v2,{size:14})," Mode"]}),f.jsx("div",{className:"space-y-2",children:[{id:"all",l:"All Questions",i:f.jsx(pf,{size:16})},{id:"unanswered",l:"Unanswered Only",i:f.jsx(ow,{size:16})},{id:"wrong",l:"Mistakes Only",i:f.jsx(su,{size:16})},{id:"flagged",l:"Flagged Only",i:f.jsx(iu,{size:16})}].map(G=>f.jsxs("button",{onClick:()=>i(G.id),className:`w-full flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-all ${s===G.id?"bg-slate-800 text-white":n?"hover:bg-slate-800 text-slate-400":"hover:bg-slate-100 text-slate-600"}`,children:[G.i," ",G.l]},G.id))}),f.jsx("div",{className:"mt-6 pt-6 border-t border-slate-100 dark:border-slate-800",children:f.jsxs("button",{onClick:()=>l(!o),className:`w-full flex items-center justify-between p-3 rounded-xl text-sm font-medium ${o?"bg-emerald-50 text-emerald-700 border border-emerald-200":n?"bg-slate-800 text-slate-400":"bg-slate-50 text-slate-500"}`,children:[f.jsxs("span",{className:"flex items-center gap-2",children:[f.jsx(k2,{size:16})," Shuffle Deck"]}),f.jsx("div",{className:`w-4 h-4 rounded-full border ${o?"bg-emerald-500 border-emerald-500":"border-slate-400"}`})]})})]}),f.jsxs("div",{className:`p-6 rounded-2xl border flex flex-col justify-between ${n?"bg-slate-900 border-slate-800":"bg-white border-slate-200 shadow-sm"}`,children:[f.jsxs("div",{children:[f.jsxs("div",{className:"flex items-center gap-2 mb-4 text-emerald-500 font-bold uppercase text-xs tracking-wider",children:[f.jsx(S2,{size:14})," Launch"]}),f.jsxs("div",{className:"text-center py-8",children:[f.jsx("div",{className:`text-5xl font-bold mb-2 ${n?"text-white":"text-slate-900"}`,children:R}),f.jsx("div",{className:"text-sm text-slate-500",children:"Questions Selected"})]})]}),f.jsx("button",{onClick:()=>{e({mode:s,shuffle:o,packages:u}),r(`Session started with ${R} questions.`,"success")},disabled:R===0,className:"w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/30 transition-all active:scale-95 disabled:opacity-50",children:"Start Session"})]})]}),f.jsxs("div",{className:`mt-6 p-6 rounded-2xl border ${n?"bg-slate-900 border-slate-700":"bg-white border-slate-200 shadow-lg"}`,children:[f.jsxs("h2",{className:`text-xl font-bold mb-3 flex items-center gap-2 ${n?"text-white":"text-slate-800"}`,children:[f.jsx(iw,{className:"text-teal-500"})," AI Study Plan Generator"]}),f.jsx("input",{type:"text",value:p,onChange:G=>m(G.target.value),placeholder:"e.g., Master all CVC/Arterial line topics before my next shift.",className:`w-full p-3 rounded-lg border-2 mb-3 outline-none ${n?"bg-slate-950 border-slate-800 text-white":"bg-slate-50 border-slate-200 text-slate-900"}`}),f.jsxs("button",{onClick:I,disabled:C||!p.trim()||D.length===0,className:"px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-bold transition-all disabled:opacity-50 flex items-center gap-2 text-sm",children:[C?f.jsx(Qs,{className:"animate-spin",size:16}):f.jsx(mo,{size:16}),C?"Generating Plan...":"Generate Plan"]}),v&&f.jsxs("div",{className:`mt-4 p-4 rounded-xl text-sm ${n?"bg-slate-800 text-slate-300":"bg-slate-50 text-slate-700"}`,children:[f.jsx("h3",{className:"font-bold text-teal-500 mb-2",children:"Recommended Study Strategy:"}),f.jsx("div",{className:"prose dark:prose-invert",dangerouslySetInnerHTML:{__html:v}})]})]})]})}function $2({sessions:t,onResume:e,onDelete:n,activeId:r,darkMode:s,notify:i}){return f.jsxs("div",{className:"p-8 max-w-5xl mx-auto",children:[f.jsx("h1",{className:`text-3xl font-bold mb-6 ${s?"text-white":"text-slate-900"}`,children:"Session Manager"}),f.jsxs("div",{className:"grid gap-4",children:[t.map(o=>{var _;const l=o.questions.length,u=o.questions.filter(C=>C.sessionState.status!=="unanswered").length,h=o.questions.filter(C=>C.sessionState.status==="wrong").length,p=o.questions.filter(C=>C.globalState.flagged).length,m=Math.round(u/Math.max(1,l)*100),v=o.id===r;return f.jsxs("div",{className:`p-6 rounded-2xl border flex items-center justify-between transition-all ${v?"border-indigo-500 ring-1 ring-indigo-500 bg-indigo-50/10":s?"bg-slate-900 border-slate-800":"bg-white border-slate-200 shadow-sm"}`,children:[f.jsxs("div",{className:"flex items-center gap-6",children:[f.jsx("div",{className:`w-16 h-16 rounded-xl flex flex-col items-center justify-center border ${s?"bg-slate-700 bg-slate-800":"bg-slate-200 bg-slate-50"}`,children:f.jsxs("span",{className:`text-xl font-bold ${s?"text-white":"text-slate-700"}`,children:[m,"%"]})}),f.jsxs("div",{children:[f.jsxs("div",{className:"flex items-center gap-3 mb-1",children:[f.jsx("h3",{className:`font-bold text-lg ${s?"text-white":"text-slate-800"}`,children:o.name}),v&&f.jsx("span",{className:"bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase",children:"Active"})]}),f.jsxs("div",{className:"flex items-center gap-4 text-xs text-slate-500",children:[f.jsxs("span",{className:"flex items-center gap-1",children:[f.jsx(d2,{size:12})," ",new Date(o.createdAt).toLocaleDateString()]}),f.jsxs("span",{className:"flex items-center gap-1",children:[f.jsx(pf,{size:12})," ",l," Qs"]}),f.jsxs("span",{className:"flex items-center gap-1",children:[f.jsx(su,{size:12})," ",h," Wrong"]}),f.jsxs("span",{className:"flex items-center gap-1",children:[f.jsx(iu,{size:12})," ",p," Flagged"]})]}),f.jsxs("div",{className:"text-xs text-slate-400 mt-1",children:["Filters: ",(_=o.config)==null?void 0:_.mode]})]})]}),f.jsxs("div",{className:"flex gap-3",children:[f.jsx("button",{onClick:()=>{n(o.id),i("Session deleted.","success")},className:"p-3 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors",children:f.jsx(Sh,{size:20})}),f.jsxs("button",{onClick:()=>e(o.id),className:"px-6 py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg",children:[v?"Continue":"Resume"," ",f.jsx(u2,{size:18})]})]})]},o.id)}),t.length===0&&f.jsx("div",{className:"text-center py-20 text-slate-400",children:"No active sessions. Start one in Command Center."})]})]})}function B2({session:t,onNavigate:e,darkMode:n}){const{questions:r,currentIndex:s}=t;return f.jsxs("div",{className:"h-full flex flex-col",children:[f.jsx("div",{className:`p-4 border-b ${n?"border-slate-800":"bg-slate-200 bg-slate-50"}`,children:f.jsx("h3",{className:"text-xs font-bold uppercase tracking-wider opacity-50",children:"Session Map"})}),f.jsx("div",{className:"flex-1 overflow-y-auto p-3 custom-scrollbar",children:f.jsx("div",{className:"grid grid-cols-5 gap-2",children:r.map((i,o)=>{var h;let l=n?"bg-slate-800 text-slate-500":"bg-slate-100 text-slate-400";i.sessionState.status==="correct"&&(l="bg-emerald-500 text-white"),i.sessionState.status==="wrong"&&(l="bg-rose-500 text-white");const u=o===s;return f.jsxs("button",{onClick:()=>e(o),className:`h-8 rounded-md text-xs font-bold relative ${l} ${u?"ring-2 ring-indigo-500 ring-offset-1":""}`,children:[o+1,((h=i.globalState)==null?void 0:h.flagged)&&f.jsx("div",{className:"absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full border border-white"})]},i.id)})})})]})}function W2({session:t,onUpdate:e,onNavigate:n,darkMode:r}){const{questions:s,currentIndex:i}=t,o=s[i];return f.jsxs("div",{className:"max-w-3xl mx-auto p-6 pb-32",children:[f.jsxs("div",{className:"mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider opacity-50",children:[f.jsx("span",{children:o.package||"General"}),f.jsx(ff,{size:12}),f.jsxs("span",{children:["Question ",i+1," of ",s.length]})]}),f.jsx(H2,{data:o,sessionId:t.id,onUpdate:e,darkMode:r,total:s.length,index:i,onNext:()=>n(Math.min(s.length-1,i+1)),onPrev:()=>n(Math.max(0,i-1))},o.id)]})}function H2({data:t,sessionId:e,onUpdate:n,darkMode:r,total:s,index:i,onNext:o,onPrev:l}){var se;const[u,h]=B.useState(t.sessionState.selectedIndex),[p,m]=B.useState(t.sessionState.status!=="unanswered"),[v,_]=B.useState(t.sessionState.notes||""),[C,P]=B.useState(!1),[O,S]=B.useState(!1),[T,k]=B.useState(null),[D,F]=B.useState(!1),[U,E]=B.useState(null),[y,w]=B.useState(!1),[x,A]=B.useState([]),[R,I]=B.useState(""),[G,Re]=B.useState(!1),[ye,pe]=B.useState(null),[$,Q]=B.useState(!1),[J,ue]=B.useState(!1);B.useEffect(()=>{h(t.sessionState.selectedIndex),m(t.sessionState.status!=="unanswered"),_(t.sessionState.notes||""),k(null),E(null),A([]),w(!1),pe(null),window.speechSynthesis.cancel(),ue(!1),S(!1)},[t.id]);const ae=ve=>{if(p)return;const W=ve===t.correctIndex;h(ve),m(!0),n(e,t.id,{status:W?"correct":"wrong",selectedIndex:ve,notes:v})},L=()=>n(e,t.id,{notes:v}),ee=()=>{var ve;return n(e,t.id,{flagged:!((ve=t.globalState)!=null&&ve.flagged)})},Me=()=>{if(J)window.speechSynthesis.cancel(),ue(!1);else{const ve=`${t.question}. Option A: ${t.options[0]}. Option B: ${t.options[1]}. Option C: ${t.options[2]}. Option D: ${t.options[3]}.`,W=new SpeechSynthesisUtterance(ve);W.onend=()=>ue(!1),window.speechSynthesis.speak(W),ue(!0)}};return f.jsxs("div",{className:"animate-in fade-in slide-in-from-bottom-4 duration-500",children:[f.jsxs("div",{className:"flex justify-between items-start mb-6",children:[f.jsx("h2",{className:"text-xl md:text-2xl font-serif font-medium leading-relaxed flex-1 mr-4",children:t.question}),f.jsxs("div",{className:"flex gap-2",children:[f.jsx("button",{onClick:()=>P(!C),className:`transition-all p-2 rounded-full hover:bg-slate-100 ${C?"text-indigo-600 bg-indigo-50":"text-slate-300"}`,title:"Flashcard Mode",children:C?f.jsx(g2,{size:20}):f.jsx(Vg,{size:20})}),f.jsx("button",{onClick:Me,className:`transition-all p-2 rounded-full hover:bg-slate-100 ${J?"text-indigo-600 bg-indigo-50 animate-pulse":"text-slate-300"}`,children:J?f.jsx(P2,{size:20}):f.jsx(N2,{size:20})}),f.jsx("button",{onClick:ee,className:`transition-all active:scale-90 ${(se=t.globalState)!=null&&se.flagged?"text-amber-500 fill-amber-500":"text-slate-300 hover:text-slate-400"}`,children:f.jsx(iu,{})})]})]}),f.jsx("div",{className:`p-8 rounded-2xl border mb-6 ${r?"bg-slate-900 border-slate-800":"bg-white border-slate-200 shadow-sm"}`,children:f.jsx("div",{className:"space-y-3",children:C&&!O&&!p?f.jsxs("div",{onClick:()=>S(!0),className:"h-40 flex flex-col items-center justify-center cursor-pointer opacity-50 hover:opacity-100 transition-opacity",children:[f.jsx(Vg,{size:48,className:"mb-2"}),f.jsx("p",{className:"font-bold text-sm",children:"Tap to Reveal Options"})]}):t.options.map((ve,W)=>{const K=u===W,Y=W===t.correctIndex;let le="w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3 ";return p?Y?le+="border-emerald-500 bg-emerald-500/10 text-emerald-600":K?le+="border-rose-500 bg-rose-500/10 text-rose-600":le+="opacity-50 border-transparent":le+=r?"border-slate-800 hover:bg-slate-800":"border-slate-100 hover:border-indigo-200 hover:bg-indigo-50",f.jsxs("button",{onClick:()=>ae(W),disabled:p,className:le,children:[f.jsx("div",{className:`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold ${p?Y?"bg-emerald-500 border-emerald-500 text-white":K?"bg-rose-500 border-rose-500 text-white":"border-slate-300":"border-slate-300"}`,children:String.fromCharCode(65+W)}),f.jsx("span",{children:ve})]},W)})})}),f.jsxs("div",{className:"flex justify-between items-center py-4 mb-6",children:[f.jsxs("button",{onClick:l,disabled:i===0,className:"flex items-center gap-2 font-bold opacity-50 hover:opacity-100 disabled:opacity-20",children:[f.jsx(aw,{})," Prev"]}),f.jsxs("button",{onClick:o,disabled:i===s-1,className:"px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/30 transition-all active:scale-95 flex items-center gap-2",children:["Next Question ",f.jsx(ff,{})]})]}),p&&f.jsx("div",{className:"space-y-6 animate-in slide-in-from-bottom-8 border-t pt-8 dark:border-slate-800",children:f.jsxs("div",{className:`p-8 rounded-2xl border ${r?"bg-indigo-900/10 border-slate-800":"bg-indigo-50/50 border-indigo-100"}`,children:[f.jsxs("h3",{className:"text-xs font-bold uppercase text-indigo-500 mb-2 flex items-center gap-2",children:[f.jsx(lw,{size:14})," Explanation"]}),f.jsx("p",{className:"leading-relaxed opacity-90 mb-6 whitespace-pre-line",children:t.explanation}),f.jsxs("div",{className:`p-6 rounded-2xl border ${r?"bg-amber-900/10 border-slate-800":"bg-amber-50 border-amber-100"}`,children:[f.jsxs("h3",{className:"text-xs font-bold uppercase text-amber-600 mb-2 flex items-center gap-2",children:[f.jsx(C2,{size:14})," My Notes"]}),f.jsx("textarea",{className:`w-full p-3 rounded-lg text-sm bg-transparent border focus:ring-2 focus:ring-amber-400 outline-none ${r?"border-slate-700":"border-amber-200"}`,rows:2,placeholder:"Add clinical note...",value:v,onChange:ve=>_(ve.target.value),onBlur:L})]})]})})]})}function q2({library:t,darkMode:e}){const[n,r]=B.useState(null),[s,i]=B.useState(!1),o=t.length,l=t.filter(_=>_.globalState.status!=="unanswered").length,u=t.filter(_=>_.globalState.status==="correct").length;t.filter(_=>_.globalState.status==="wrong").length;const h=t.filter(_=>_.globalState.flagged).length,p=l>0?Math.round(u/l*100):0,m=B.useMemo(()=>{const _={};return t.forEach(C=>{C.globalState.status!=="unanswered"&&(_[C.package]||(_[C.package]={total:0,correct:0,timesWrong:0}),_[C.package].total++,C.globalState.status==="correct"?_[C.package].correct++:_[C.package].timesWrong++)}),Object.entries(_).map(([C,P])=>({name:C,total:P.total,timesWrong:P.timesWrong,accuracy:P.total>0?Math.round(P.correct/P.total*100):0})).sort((C,P)=>C.accuracy-P.accuracy).filter(C=>C.total>0&&C.total>=3)},[t]),v=async()=>{if(s)return;if(m.length===0){r("Start studying first! We need at least three answered questions in three different packages to perform a meaningful analysis.");return}i(!0);const C=`
      Analyze the following user performance data:
      
      --- USER WEAKNESS DATA ---
      ${m.slice(0,3).map(O=>`Topic: ${O.name}, Accuracy: ${O.accuracy}%, Total Attempts: ${O.total}`).join(`
`)}
      --- END DATA ---

      Based on this data, provide a single, high-yield conceptual weakness for the user to focus on next. Frame your answer as a concise, single paragraph response. Do not use bullet points or lists. Identify the specific knowledge gap (e.g., 'Hemodynamic Management Principles' or 'Pathophysiology of CIM vs CIP') rather than just naming the weakest chapter.
    `,P=await ou(C,"tutor");r(P),i(!1)};return f.jsxs("div",{className:"p-8 max-w-5xl mx-auto animate-in fade-in",children:[f.jsx("h1",{className:`text-3xl font-bold mb-6 ${e?"text-white":"text-slate-900"}`,children:"Performance Stats"}),f.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-4 mb-8",children:[f.jsx(va,{label:"Total Questions",value:o,icon:f.jsx(mf,{className:"text-indigo-500"}),darkMode:e}),f.jsx(va,{label:"Questions Answered",value:l,icon:f.jsx(ow,{className:"text-blue-500"}),darkMode:e}),f.jsx(va,{label:"Overall Accuracy",value:`${p}%`,icon:f.jsx(x2,{className:p>=70?"text-emerald-500":"text-amber-500"}),darkMode:e}),f.jsx(va,{label:"Flagged Items",value:h,icon:f.jsx(iu,{className:"text-red-500"}),darkMode:e})]}),f.jsxs("div",{className:`p-6 rounded-2xl border mb-8 ${e?"bg-slate-900 border-slate-700":"bg-white border-slate-200 shadow-lg"}`,children:[f.jsxs("h2",{className:`text-xl font-bold mb-4 flex items-center gap-2 ${e?"text-white":"text-slate-800"}`,children:[f.jsx(iw,{className:"text-indigo-500"})," AI Weakness Analyzer"]}),f.jsxs("button",{onClick:v,disabled:s||m.length<1,className:"px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold transition-all disabled:opacity-50 flex items-center gap-2",children:[s?f.jsx(Qs,{className:"animate-spin",size:16}):f.jsx(mo,{size:16}),s?"Analyzing Data...":"Generate Study Focus"]}),(n||!l)&&f.jsx("div",{className:`mt-4 p-4 rounded-xl text-sm ${e?"bg-slate-800 text-slate-300":"bg-slate-50 text-slate-700"}`,children:n?f.jsx("p",{children:n}):f.jsx("p",{children:"Answer a few questions in different chapters to generate your personalized study recommendation!"})})]}),f.jsxs("div",{className:`p-6 rounded-2xl border ${e?"bg-slate-900 border-slate-800":"bg-white border-slate-200"}`,children:[f.jsx("h2",{className:`text-lg font-bold mb-4 ${e?"text-white":"text-slate-800"}`,children:"Chapter Breakdown"}),f.jsxs("div",{className:"space-y-4",children:[m.map(_=>f.jsxs("div",{children:[f.jsxs("div",{className:"flex justify-between text-sm mb-1",children:[f.jsx("span",{className:e?"text-slate-300":"text-slate-700",children:_.name}),f.jsxs("span",{className:e?"text-slate-400":"text-slate-500",children:[_.accuracy,"% (",_.total," Qs)"]})]}),f.jsx("div",{className:"h-2 bg-slate-100 rounded-full overflow-hidden dark:bg-slate-800",children:f.jsx("div",{className:`h-full rounded-full ${_.accuracy>=70?"bg-emerald-500":_.accuracy>=50?"bg-amber-500":"bg-red-500"}`,style:{width:`${_.accuracy}%`}})})]},_.name)),m.length===0&&f.jsx("p",{className:"text-slate-400 italic",children:"No data available yet."})]})]})]})}function K2({library:t,darkMode:e,onUpdate:n}){const[r,s]=B.useState(""),[i,o]=B.useState(new Set),[l,u]=B.useState(null),[h,p]=B.useState({}),[m,v]=B.useState(!1),[_,C]=B.useState([]),[P,O]=B.useState("All"),[S,T]=B.useState("All"),[k,D]=B.useState(1),[F,U]=B.useState(20),E=B.useRef(!1),y=B.useRef(!0),w=B.useMemo(()=>[...new Set(t.map(L=>L.package))],[t]),x=B.useMemo(()=>{let L=t;if(r){const ee=r.toLowerCase();L=L.filter(Me=>Me.question.toLowerCase().includes(ee))}return _.length>0&&(L=L.filter(ee=>_.includes(ee.package))),P!=="All"&&(P==="Correct"&&(L=L.filter(ee=>ee.globalState.status==="correct")),P==="Wrong"&&(L=L.filter(ee=>ee.globalState.status==="wrong")),P==="Unanswered"&&(L=L.filter(ee=>ee.globalState.status==="unanswered"))),S!=="All"&&(L=L.filter(ee=>ee.globalState.flagged===(S==="Flagged"))),L},[t,r,_,P,S]),A=Math.ceil(x.length/F),R=x.slice((k-1)*F,k*F);B.useEffect(()=>D(1),[r,_,P,S]);const I=L=>{if(!m&&window.matchMedia("(hover: none)").matches)return;E.current=!0;const ee=i.has(L);y.current=!ee,ye(L,y.current)},G=L=>{E.current&&ye(L,y.current)},Re=()=>E.current=!1,ye=(L,ee)=>{o(Me=>{const se=new Set(Me);return ee?se.add(L):se.delete(L),se})},pe=(L,ee)=>{ee.stopPropagation(),ye(L,!i.has(L))};B.useEffect(()=>(window.addEventListener("mouseup",Re),()=>window.removeEventListener("mouseup",Re)),[]);const $=()=>o(new Set),Q=()=>{if(confirm(`Delete ${i.size} questions?`)){const L=t.filter(ee=>!i.has(ee.id));n(L),o(new Set)}},J=L=>{u(L.id),p({...L})},ue=L=>{let ee=new Set;if(L==="all"?t.forEach(se=>ee.add(se.id)):L==="filtered"?x.forEach(se=>ee.add(se.id)):L==="selected"&&i.forEach(se=>ee.add(se)),ee.size===0||!window.confirm(`Reset ${ee.size} question(s) to unsolved?`))return;const Me=t.map(se=>ee.has(se.id)?{...se,globalState:{...se.globalState||{},status:"unanswered",timesWrong:0,solvedOnce:!1}}:se);n(Me),L==="selected"&&o(new Set)},ae=()=>{const L=t.map(ee=>ee.id===l?h:ee);n(L),u(null)};return f.jsxs("div",{className:"p-6 md:p-8 max-w-7xl mx-auto h-full flex flex-col overflow-hidden relative",children:[f.jsxs("div",{className:"flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4",children:[f.jsxs("div",{children:[f.jsx("h2",{className:`text-2xl font-bold ${e?"text-white":"text-slate-900"}`,children:"Question Library"}),f.jsxs("p",{className:"text-xs opacity-50",children:[t.length," Total Questions • ",x.length," Shown"]})]}),f.jsxs("div",{className:"flex gap-2 flex-wrap",children:[f.jsxs("button",{onClick:()=>ue("all"),className:"px-3 py-2 rounded-lg font-bold text-xs flex items-center gap-2 bg-slate-900 text-white hover:bg-slate-800",children:[f.jsx(uc,{size:16})," Reset All"]}),f.jsxs("button",{onClick:()=>ue("filtered"),className:"px-3 py-2 rounded-lg font-bold text-xs flex items-center gap-2 bg-slate-200 text-slate-700 hover:bg-slate-300",children:[f.jsx(uc,{size:16})," Reset Filtered"]}),f.jsxs("button",{onClick:()=>ue("selected"),disabled:i.size===0,className:"px-3 py-2 rounded-lg font-bold text-xs flex items-center gap-2 border border-slate-300 text-slate-600 hover:bg-slate-100 disabled:opacity-40",children:[f.jsx(uc,{size:16})," Reset Selected"]}),f.jsxs("button",{onClick:()=>v(!m),className:`px-3 py-2 rounded-lg font-bold text-xs flex items-center gap-2 transition-all ${m?"bg-indigo-600 text-white":"bg-slate-200 text-slate-600"}`,children:[f.jsx(uw,{size:16})," ",m?"Painting ON":"Paint Select"]}),i.size>0&&f.jsxs("button",{onClick:Q,className:"px-3 py-2 bg-rose-600 text-white rounded-lg font-bold text-xs flex items-center gap-2 hover:bg-rose-700",children:[f.jsx(Sh,{size:16})," Delete (",i.size,")"]})]})]}),f.jsxs("div",{className:`p-4 rounded-xl mb-4 border flex flex-col md:flex-row gap-4 items-center ${e?"bg-slate-900 border-slate-800":"bg-white border-slate-200 shadow-sm"}`,children:[f.jsxs("div",{className:"relative flex-1 w-full",children:[f.jsx(dw,{className:"absolute left-3 top-2.5 text-slate-400",size:18}),f.jsx("input",{className:`w-full pl-9 p-2 rounded-lg border text-sm ${e?"bg-slate-950 border-slate-700 text-white":"bg-slate-50 border-slate-200"}`,placeholder:"Search...",value:r,onChange:L=>s(L.target.value)})]}),f.jsx(j2,{options:w,selected:_,onChange:C,placeholder:"All Chapters",darkMode:e}),f.jsxs("select",{value:P,onChange:L=>O(L.target.value),className:`p-2 rounded-lg border text-sm w-full md:w-auto ${e?"bg-slate-950 border-slate-700 text-white":"bg-white border-slate-200"}`,children:[f.jsx("option",{value:"All",children:"All Status"}),f.jsx("option",{value:"Correct",children:"Correct"}),f.jsx("option",{value:"Wrong",children:"Wrong"}),f.jsx("option",{value:"Unanswered",children:"Unanswered"})]}),f.jsxs("select",{value:S,onChange:L=>T(L.target.value),className:`p-2 rounded-lg border text-sm w-full md:w-auto ${e?"bg-slate-950 border-slate-700 text-white":"bg-white border-slate-200"}`,children:[f.jsx("option",{value:"All",children:"Any Flag"}),f.jsx("option",{value:"Flagged",children:"Flagged Only"}),f.jsx("option",{value:"Unflagged",children:"No Flag"})]})]}),f.jsxs("div",{className:`flex-1 overflow-hidden rounded-xl border flex flex-col ${e?"bg-slate-900 border-slate-800":"bg-white border-slate-200 shadow-sm"}`,children:[f.jsxs("div",{className:`grid grid-cols-12 gap-4 p-3 border-b text-xs font-bold uppercase tracking-wider sticky top-0 z-10 ${e?"bg-slate-950 border-slate-800 text-slate-400":"bg-slate-50 border-slate-200 text-slate-500"}`,children:[f.jsx("div",{className:"col-span-1 text-center",children:"Sel"}),f.jsx("div",{className:"col-span-1 text-center",children:"#"}),f.jsx("div",{className:"col-span-1 text-center",children:"Stat"}),f.jsx("div",{className:"col-span-2",children:"Chapter"}),f.jsx("div",{className:"col-span-6",children:"Question"}),f.jsx("div",{className:"col-span-1 text-right",children:"Edit"})]}),f.jsxs("div",{className:"flex-1 overflow-y-auto custom-scrollbar touch-pan-y pb-20",style:{touchAction:m?"none":"auto"},children:[R.map((L,ee)=>{const Me=(k-1)*F+ee+1;return f.jsx("div",{onMouseDown:()=>I(L.id),onMouseEnter:()=>G(L.id),onTouchStart:()=>I(L.id),onTouchMove:se=>{if(m&&E.current){const ve=se.touches[0],W=document.elementFromPoint(ve.clientX,ve.clientY),K=W==null?void 0:W.closest("[data-qid]");K&&ye(K.dataset.qid,y.current)}},"data-qid":L.id,className:`grid grid-cols-12 gap-4 p-3 border-b items-start text-sm transition-colors cursor-pointer animate-in fade-in duration-300 ${i.has(L.id)?"bg-indigo-500/20 border-indigo-500":e?"border-slate-800 hover:bg-slate-800":"border-slate-100 hover:bg-slate-50"}`,children:l===L.id?f.jsx("div",{className:"col-span-12",onClick:se=>se.stopPropagation(),children:f.jsxs("div",{className:"space-y-4 bg-white dark:bg-slate-900 p-4 rounded-xl border shadow-lg",children:[f.jsx("h4",{className:"font-bold text-indigo-500 uppercase text-xs",children:"Editing Question"}),f.jsxs("div",{children:[f.jsx("label",{className:"text-xs font-bold opacity-50 block mb-1",children:"Question Text"}),f.jsx("textarea",{className:"w-full p-2 border rounded text-sm h-20",value:h.question,onChange:se=>p({...h,question:se.target.value})})]}),f.jsxs("div",{children:[f.jsx("label",{className:"text-xs font-bold opacity-50 block mb-1",children:"Package / Chapter"}),f.jsx("input",{className:"w-full p-2 border rounded text-sm",value:h.package,onChange:se=>p({...h,package:se.target.value})})]}),f.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:h.options.map((se,ve)=>f.jsxs("div",{className:"flex items-center gap-2",children:[f.jsx("input",{type:"radio",name:"correct_edit",checked:h.correctIndex===ve,onChange:()=>p({...h,correctIndex:ve}),className:"w-4 h-4 text-emerald-600"}),f.jsx("input",{className:"flex-1 p-2 border rounded text-sm",value:se,onChange:W=>{const K=[...h.options];K[ve]=W.target.value,p({...h,options:K})}})]},ve))}),f.jsxs("div",{children:[f.jsx("label",{className:"text-xs font-bold opacity-50 block mb-1",children:"Explanation"}),f.jsx("textarea",{className:"w-full p-2 border rounded text-sm h-24",value:h.explanation,onChange:se=>p({...h,explanation:se.target.value})})]}),f.jsxs("div",{className:"flex justify-end gap-2 pt-2",children:[f.jsx("button",{onClick:()=>u(null),className:"px-4 py-2 text-sm bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 font-bold",children:"Cancel"}),f.jsxs("button",{onClick:ae,className:"px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-bold flex items-center gap-2",children:[f.jsx(Al,{size:16})," Save Changes"]})]})]})}):f.jsxs(f.Fragment,{children:[f.jsx("div",{className:"col-span-1 text-center flex justify-center pt-1",children:f.jsx("div",{onClick:se=>pe(L.id,se),className:`w-5 h-5 rounded border flex items-center justify-center transition-all ${i.has(L.id)?"bg-indigo-600 border-indigo-600":"border-slate-300 bg-white dark:bg-transparent"}`,children:i.has(L.id)&&f.jsx(Al,{size:12,className:"text-white"})})}),f.jsx("div",{className:"col-span-1 text-center opacity-50 font-mono text-xs pt-1.5",children:Me}),f.jsxs("div",{className:"col-span-1 text-center flex justify-center pt-1",children:[L.globalState.status==="correct"&&f.jsx("span",{className:"bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full",children:"OK"}),L.globalState.status==="wrong"&&f.jsx("span",{className:"bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full",children:"ERR"}),L.globalState.status==="unanswered"&&f.jsx("span",{className:"bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-full",children:"-"})]}),f.jsx("div",{className:"col-span-2 text-xs opacity-70 font-medium pt-1.5 break-words",children:L.package}),f.jsx("div",{className:"col-span-6 font-medium pr-4 pt-1.5",children:L.question}),f.jsx("div",{className:"col-span-1 text-right pt-1",children:f.jsx("button",{onClick:se=>{se.stopPropagation(),J(L)},className:"p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-indigo-500 transition-colors",children:f.jsx(A2,{size:16})})})]})},L.id)}),R.length===0&&f.jsx("div",{className:"p-8 text-center opacity-50",children:"No questions found."})]}),i.size>0&&f.jsxs("div",{className:"absolute bottom-16 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom-10 z-50",children:[f.jsxs("span",{className:"font-bold text-sm",children:[i.size," Selected"]}),f.jsx("div",{className:"h-4 w-px bg-slate-700"}),f.jsx("button",{onClick:$,className:"text-xs font-bold hover:text-slate-300",children:"Unselect All"}),f.jsxs("button",{onClick:Q,className:"text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1",children:[f.jsx(Sh,{size:14})," Delete"]})]}),f.jsxs("div",{className:`p-3 border-t flex justify-between items-center text-xs ${e?"bg-slate-950 border-slate-800":"bg-slate-50 border-slate-200"}`,children:[f.jsxs("div",{className:"flex items-center gap-2",children:[f.jsx("span",{children:"Rows:"}),f.jsxs("select",{value:F,onChange:L=>U(Number(L.target.value)),className:`p-1 rounded border ${e?"bg-slate-900 border-slate-700":"bg-white"}`,children:[f.jsx("option",{value:10,children:"10"}),f.jsx("option",{value:20,children:"20"}),f.jsx("option",{value:50,children:"50"}),f.jsx("option",{value:100,children:"100"})]})]}),f.jsxs("div",{className:"flex items-center gap-2",children:[f.jsx("button",{onClick:()=>D(Math.max(1,k-1)),disabled:k===1,className:"p-1 rounded hover:bg-black/5 disabled:opacity-30",children:f.jsx(aw,{size:16})}),f.jsxs("span",{children:["Page ",k," of ",A||1]}),f.jsx("button",{onClick:()=>D(Math.min(A,k+1)),disabled:k===A,className:"p-1 rounded hover:bg-black/5 disabled:opacity-30",children:f.jsx(ff,{size:16})})]})]})]})]})}function G2({onImport:t,darkMode:e,onRestore:n,notify:r}){const[s,i]=B.useState(""),[o,l]=B.useState(!1),u=B.useRef(null),h=_=>{const C=_.target.files[0];n(C),_.target.value=null},p=_=>{const C=_.target.files[0];if(!C)return;const P=new FileReader;P.onload=O=>{const S=O.target.result;try{JSON.parse(S),t(S),r("Questions imported from file!","success")}catch{i(S),r("File has syntax errors. Loaded into editor for AI Repair.","warning")}},P.readAsText(C),_.target.value=null},m=()=>{u.current.click()},v=async()=>{if(s.trim()){l(!0);try{const _=JSON.parse(s);t(JSON.stringify(_)),i(""),r("Manual import successful!","success")}catch{console.warn("JSON Parse failed, attempting AI repair..."),r("Detecting corruption. Attempting AI repair...","error");try{const C=`The following JSON string has syntax errors. Correct it to be valid JSON. Output ONLY the corrected JSON with no markdown or explanation: 

${s}`,P=await ou(C,"fix");t(P),r("AI repaired and imported data!","success"),i("")}catch{r("Data too corrupted for repair.","error")}}finally{l(!1)}}};return f.jsxs("div",{className:"p-8 max-w-4xl mx-auto",children:[f.jsx("h2",{className:"text-2xl font-bold mb-6",children:"Data Management"}),f.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[f.jsxs("div",{className:`p-6 rounded-2xl border flex flex-col ${e?"bg-slate-900 border-slate-800":"bg-white border-slate-200 shadow-sm"}`,children:[f.jsxs("h3",{className:"font-bold mb-3 text-lg flex items-center gap-2",children:[f.jsx(cw,{size:18})," Import Questions"]}),f.jsx("p",{className:"text-xs text-slate-500 mb-4",children:"Add new questions to your library. Use the text box for raw JSON or upload a JSON file."}),f.jsx("textarea",{className:`w-full flex-1 min-h-[150px] p-3 rounded-lg border font-mono text-xs mb-4 ${e?"bg-slate-950 border-slate-700":"bg-slate-50 border-slate-200"}`,value:s,onChange:_=>i(_.target.value),placeholder:"Paste JSON array here..."}),f.jsxs("div",{className:"flex gap-2",children:[f.jsxs("button",{onClick:v,disabled:!s||o,className:"flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 flex items-center justify-center gap-2 disabled:opacity-50 text-sm",children:[o?f.jsx(Qs,{className:"animate-spin",size:16}):f.jsx(Al,{size:16}),o?"Processing...":"Add Text"]}),f.jsx("input",{type:"file",accept:".json",ref:u,onChange:p,className:"hidden"}),f.jsxs("button",{onClick:m,className:`px-4 py-3 rounded-xl font-bold border flex items-center gap-2 text-sm ${e?"border-slate-700 hover:bg-slate-800":"border-slate-200 hover:bg-slate-50"}`,title:"Upload JSON File",children:[f.jsx(y2,{size:18})," Upload File"]})]})]}),f.jsxs("div",{className:"space-y-6",children:[f.jsxs("div",{className:`p-6 rounded-2xl border ${e?"bg-slate-900 border-slate-800":"bg-white border-slate-200 shadow-sm"}`,children:[f.jsxs("h3",{className:"font-bold mb-3 text-lg flex items-center gap-2",children:[f.jsx(kh,{size:18})," Restore Full Backup"]}),f.jsx("p",{className:"text-xs text-slate-500 mb-4",children:"Danger Zone: This will overwrite your current library and sessions with the backup file."}),f.jsxs("label",{className:"w-full flex items-center justify-center gap-2 bg-rose-600 text-white p-3 rounded-xl text-sm font-bold hover:bg-rose-700 cursor-pointer transition-colors",children:[f.jsx(kh,{size:16})," Restore System Backup",f.jsx("input",{type:"file",accept:".json",onChange:h,className:"hidden"})]})]}),f.jsxs("div",{className:`p-6 rounded-2xl border ${e?"bg-slate-900 border-slate-800":"bg-white border-slate-200 shadow-sm"}`,children:[f.jsxs("h3",{className:"font-bold mb-3 text-lg flex items-center gap-2",children:[f.jsx(lw,{size:18})," Data Integrity"]}),f.jsxs("p",{className:"text-xs text-slate-500",children:[f.jsx("strong",{children:"Auto-Repair:"}),' If your uploaded JSON is broken, the text will appear in the editor on the left. Click "Add Text" to let AI fix it.']})]})]})]})]})}function Q2(){const[t,e]=B.useState(null),[n,r]=B.useState("connecting"),[s,i]=B.useState(!1),[o,l]=B.useState(null),[u]=B.useState(Date.now()),[h,p]=B.useState("control"),[m,v]=B.useState(!0),[_,C]=B.useState(!1),[P,O]=B.useState([]),[S,T]=B.useState([]),[k,D]=B.useState(null),[F,U]=B.useState(null),E=B.useRef(null),y=JSON.parse(__firebase_config),w=o0(y),x=QS(w),A=UC(w),R=typeof __app_id<"u"?__app_id:"default-app-id",I=(W,K="success")=>{U({message:W,type:K,id:Date.now()}),setTimeout(()=>U(null),3e3)};B.useEffect(()=>((async()=>{typeof __initial_auth_token<"u"&&__initial_auth_token?await Vx(x,__initial_auth_token):await Px(x)})(),jx(x,e)),[]),B.useEffect(()=>{if(!t)return;const W=bg(A,"artifacts",R,"public","data","shared_study_data",Lg),K=r2(W,Y=>{if(Y.exists()){const le=Y.data();O(le.masterLibrary||[]),T(le.sessions||[]),D(le.activeSessionId),l(le.lastUpdated),r("idle"),i(!1),console.log("Firestore Data Synced: Master Library size",(le.masterLibrary||[]).length)}else Mg.length>0?Re():r("idle"),console.log("Firestore Initialized (Clean State)")},Y=>{console.error("Cloud Sync Error:",Y),i(!0),r("error"),G()});return()=>K()},[t]);const G=()=>{try{const W=localStorage.getItem("ICU_PRO_FALLBACK");if(W){const K=JSON.parse(W);O(K.masterLibrary||[]),T(K.sessions||[]),D(K.activeSessionId),console.log("Local Fallback Loaded: Master Library size",(K.masterLibrary||[]).length)}else Re(!0)}catch{}},Re=async(W=!1)=>{const K=Mg.map(Y=>({...Y,importedAt:Date.now(),globalState:{status:"unanswered",timesWrong:0,flagged:!1,solvedOnce:!1}}));if(W){O(K);return}await ye({masterLibrary:K,sessions:[],activeSessionId:null,view:"control"})},ye=async W=>{const K={masterLibrary:W.masterLibrary||P,sessions:W.sessions||S,activeSessionId:W.activeSessionId!==void 0?W.activeSessionId:k,view:W.view||h,lastUpdated:o2()};if(W.masterLibrary&&O(W.masterLibrary),W.sessions&&T(W.sessions),W.activeSessionId!==void 0&&D(W.activeSessionId),localStorage.setItem("ICU_PRO_FALLBACK",JSON.stringify(jg(K))),!(s||!t)){r("syncing");try{const Y=bg(A,"artifacts",R,"public","data","shared_study_data",Lg);await n2(Y,jg(K)),r("saved"),setTimeout(()=>r("idle"),1500)}catch(Y){console.error("Save failed",Y),r("error"),i(!0)}}},pe=W=>{let K=[...P];W.packages.length>0&&(K=K.filter(me=>W.packages.includes(me.package))),W.mode==="wrong"&&(K=K.filter(me=>me.globalState.status==="wrong")),W.mode==="flagged"&&(K=K.filter(me=>me.globalState.flagged)),W.mode==="unanswered"&&(K=K.filter(me=>me.globalState.status==="unanswered")),W.shuffle&&(K=L2(K));const Y=K.map(me=>({...me,sessionState:{status:"unanswered",selectedIndex:null,notes:""}})),le={id:`sess_${Date.now()}`,name:`Session ${S.length+1}`,createdAt:Date.now(),config:W,questions:Y,currentIndex:0},kt=[le,...S];ye({sessions:kt,activeSessionId:le.id,view:"study"}),p("study")},$=W=>{const K=S.filter(le=>le.id!==W),Y=k===W?null:k;ye({sessions:K,activeSessionId:Y}),Y||p("sessions")},Q=(W,K,Y)=>{const le=S.map(me=>{if(me.id!==W)return me;const wt=me.questions.map(Bt=>{if(Bt.id!==K)return Bt;let Ys={...Bt,sessionState:{...Bt.sessionState,...Y}};return Y.flagged!==void 0&&(Ys.globalState={...Bt.globalState,flagged:Y.flagged}),Ys});return{...me,questions:wt}});let kt=P;Y.status&&Y.status!=="unanswered"&&(kt=P.map(me=>{var wt;return me.id!==K?me:{...me,globalState:{...me.globalState,status:Y.status,timesWrong:Y.status==="wrong"?(me.globalState.timesWrong||0)+1:me.globalState.timesWrong,solvedOnce:Y.status!=="unanswered"?!0:((wt=me.globalState)==null?void 0:wt.solvedOnce)||!1}}})),Y.flagged!==void 0&&(kt=P.map(me=>me.id===K?{...me,globalState:{...me.globalState,flagged:Y.flagged}}:me)),ye({sessions:le,masterLibrary:kt})},J=()=>{const W={masterLibrary:P,sessions:S,activeSessionId:k},K=new Blob([JSON.stringify(W,null,2)],{type:"application/json"}),Y=URL.createObjectURL(K),le=document.createElement("a");le.href=Y,le.download=`icu_local_backup_${new Date().toISOString().slice(0,10)}_${new Date().toLocaleTimeString("en-US",{hour12:!1,hour:"2-digit",minute:"2-digit",second:"2-digit"}).replace(/:/g,"-")}.json`,document.body.appendChild(le),le.click(),document.body.removeChild(le),URL.revokeObjectURL(Y),I("Local backup saved!","success")},ue=W=>{if(!W)return;const K=new FileReader;K.readAsText(W,"UTF-8"),K.onload=Y=>{try{const le=JSON.parse(Y.target.result);if(!le.masterLibrary||!Array.isArray(le.sessions))throw new Error("Invalid backup file format.");ye({masterLibrary:le.masterLibrary,sessions:le.sessions,activeSessionId:le.activeSessionId}),I("Data restored & synced!","success")}catch{I("Restore failed: Invalid file.","error")}}},ae=async()=>{window.confirm("Are you sure you want to overwrite current data with the last cloud backup? This guarantees the latest online data is pulled.")&&(r("connecting"),setTimeout(()=>{I("Cloud data refreshed.","success"),r("idle")},2e3))},L=B.useMemo(()=>S.find(W=>W.id===k),[S,k]),ee=W=>{try{const K=W.replace(/```json/g,"").replace(/```/g,"").trim();let Y=JSON.parse(K);Array.isArray(Y)||(Y=[Y]);const le=new Set(P.map(wt=>wt.question)),kt=Y.filter(wt=>!le.has(wt.question)).map((wt,Bt)=>({...wt,id:`imp_${Date.now()}_${Bt}`,globalState:{status:"unanswered",timesWrong:0,flagged:!1,solvedOnce:!1},importedAt:Date.now()}));if(kt.length===0){I("No new questions (duplicates skipped).","error");return}const me=[...P,...kt];ye({masterLibrary:me}),I(`Imported ${kt.length} questions!`,"success"),p("library")}catch{I("Import failed: Invalid JSON.","error")}},Me=W=>{ye({masterLibrary:W})},se=()=>{E.current.click()},ve=W=>{const K=W.target.files[0];ue(K),W.target.value=null};return t?f.jsxs("div",{className:`flex h-screen font-sans overflow-hidden transition-colors duration-300 ${_?"bg-slate-950 text-slate-100":"bg-slate-50 text-slate-900"}`,children:[f.jsxs("nav",{className:`w-20 flex flex-col items-center py-6 z-50 shrink-0 border-r ${_?"bg-slate-900 border-slate-800":"bg-white border-slate-200"}`,children:[f.jsx("div",{className:"mb-8 p-2 bg-indigo-600 rounded-xl text-white shadow-lg",children:f.jsx(h2,{size:24})}),f.jsxs("div",{className:"space-y-6 w-full flex flex-col items-center",children:[f.jsx(zn,{active:h==="control",onClick:()=>p("control"),icon:f.jsx(pf,{}),label:"Control"}),f.jsx(zn,{active:h==="stats",onClick:()=>p("stats"),icon:f.jsx(c2,{}),label:"Stats"}),f.jsx(zn,{active:h==="sessions",onClick:()=>p("sessions"),icon:f.jsx(w2,{}),label:"Sessions"}),f.jsx(zn,{active:h==="study",onClick:()=>{p(k?"study":"sessions")},icon:f.jsx(_2,{}),label:"Study"}),f.jsx(zn,{active:h==="generator",onClick:()=>p("generator"),icon:f.jsx(mo,{}),label:"AI Gen"}),f.jsx(zn,{active:h==="library",onClick:()=>p("library"),icon:f.jsx(mf,{}),label:"Library"}),f.jsx(zn,{active:h==="import",onClick:()=>p("import"),icon:f.jsx(cw,{}),label:"Import"})]}),f.jsxs("div",{className:"mt-auto space-y-4 w-full flex flex-col items-center pb-4",children:[f.jsx("button",{onClick:ae,className:"text-slate-400 hover:text-indigo-500 p-2 rounded-lg hover:bg-slate-100",title:"Manual Cloud Sync/Restore",children:f.jsx(hw,{size:24})}),f.jsx("input",{type:"file",accept:".json",ref:E,onChange:ve,className:"hidden"}),f.jsx("button",{onClick:se,className:"text-slate-400 hover:text-indigo-500 p-2 rounded-lg hover:bg-slate-100",title:"Restore Local Backup",children:f.jsx(kh,{size:24})}),f.jsx("button",{onClick:J,className:"text-slate-400 hover:text-emerald-500 p-2 rounded-lg hover:bg-slate-100",title:"Download Local Backup",children:f.jsx(m2,{size:24})}),f.jsx(zn,{active:_,onClick:()=>C(!_),icon:_?f.jsx(R2,{}):f.jsx(E2,{}),label:"Theme"})]})]}),f.jsxs("main",{className:"flex-1 flex flex-col min-w-0 relative overflow-hidden",children:[f.jsx(F2,{syncStatus:n,activeView:h,darkMode:_,fallbackMode:s,lastCloudUpdate:o,sessionStartTime:u,onManualSync:ae}),f.jsx(M2,{notification:F,onClose:()=>U(null)}),f.jsx(V2,{children:f.jsxs("div",{className:"flex-1 overflow-y-auto scroll-smooth custom-scrollbar relative",children:[h==="control"&&f.jsx(z2,{library:P,onCreate:pe,darkMode:_,notify:I}),h==="stats"&&f.jsx(q2,{library:P,darkMode:_}),h==="sessions"&&f.jsx($2,{sessions:S,onResume:W=>{D(W),p("study")},onDelete:$,activeId:k,darkMode:_,notify:I}),h==="study"&&L&&f.jsxs("div",{className:"flex h-full",children:[f.jsxs("div",{className:"flex-1 overflow-y-auto relative",children:[f.jsx("button",{onClick:()=>v(!m),className:`absolute top-4 right-4 z-20 p-2 rounded-lg ${_?"bg-slate-800 text-slate-400 hover:text-white":"bg-white text-slate-500 shadow-sm border border-slate-200 hover:text-slate-800"}`,children:m?f.jsx(T2,{size:18}):f.jsx(I2,{size:18})}),f.jsx(W2,{session:L,onUpdate:Q,onNavigate:W=>{const K=S.map(Y=>Y.id===L.id?{...Y,currentIndex:W}:Y);T(K),ye({sessions:K})},darkMode:_})]}),f.jsx("div",{className:`${m?"w-80":"w-0"} border-l transition-all duration-300 flex flex-col ${_?"bg-slate-900 border-slate-800":"bg-white border-slate-200"}`,children:f.jsx(B2,{session:L,onNavigate:W=>{const K=S.map(Y=>Y.id===L.id?{...Y,currentIndex:W}:Y);T(K),ye({sessions:K})},darkMode:_})})]}),h==="study"&&!L&&f.jsxs("div",{className:"h-full flex flex-col items-center justify-center opacity-50",children:[f.jsx(dw,{size:48,className:"mb-4"}),f.jsx("p",{children:"No active session."}),f.jsx("button",{onClick:()=>p("control"),className:"mt-4 text-indigo-500 font-bold",children:"Start New Session"})]}),h==="generator"&&f.jsx(U2,{onAdd:ee,darkMode:_,notify:I}),h==="library"&&f.jsx(K2,{library:P,darkMode:_,onUpdate:Me}),h==="import"&&f.jsx(G2,{onImport:ee,darkMode:_,onRestore:ue,notify:I})]})})]})]}):f.jsxs("div",{className:"h-screen flex items-center justify-center bg-slate-50 text-slate-500",children:[f.jsx(Qs,{className:"animate-spin mr-2"})," Secure Connecting..."]})}typeof window<"u"&&!window.__firebase_config&&(window.__firebase_config=JSON.stringify({apiKey:"AIzaSyD9wy-5wZToEmGiWM6CooJh4te48YpU-iw",authDomain:"icu-mcq.firebaseapp.com",projectId:"icu-mcq",storageBucket:"icu-mcq.firebasestorage.app",messagingSenderId:"",appId:"1:373977621930:web:7b7721dcd9341bf1fdb7d3"}));cc.createRoot(document.getElementById("root")).render(f.jsx(Nh.StrictMode,{children:f.jsx(Q2,{})}));
