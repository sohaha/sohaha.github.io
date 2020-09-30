/*!
  * vue-router v3.4.3
  * (c) 2020 Evan You
  * @license MIT
  */
var t,e;t=this,e=function(){"use strict";function t(t,e){for(var r in e)t[r]=e[r];return t}var e={name:"RouterView",functional:!0,props:{name:{type:String,default:"default"}},render:function(e,n){var o=n.props,i=n.children,a=n.parent,u=n.data;u.routerView=!0;for(var s=a.$createElement,c=o.name,p=a.$route,f=a._routerViewCache||(a._routerViewCache={}),h=0,l=!1;a&&a._routerRoot!==a;){var d=a.$vnode?a.$vnode.data:{};d.routerView&&h++,d.keepAlive&&a._directInactive&&a._inactive&&(l=!0),a=a.$parent}if(u.routerViewDepth=h,l){var v=f[c],y=v&&v.component;return y?(v.configProps&&r(y,u,v.route,v.configProps),s(y,u,i)):s()}var m=p.matched[h],g=m&&m.components[c];if(!m||!g)return f[c]=null,s();f[c]={component:g},u.registerRouteInstance=function(t,e){var r=m.instances[c];(e&&r!==t||!e&&r===t)&&(m.instances[c]=e)},(u.hook||(u.hook={})).prepatch=function(t,e){m.instances[c]=e.componentInstance},u.hook.init=function(t){t.data.keepAlive&&t.componentInstance&&t.componentInstance!==m.instances[c]&&(m.instances[c]=t.componentInstance)};var w=m.props&&m.props[c];return w&&(t(f[c],{route:p,configProps:w}),r(g,u,p,w)),s(g,u,i)}};function r(e,r,n,o){var i=r.props=function(t,e){switch(typeof e){case"undefined":return;case"object":return e;case"function":return e(t);case"boolean":return e?t.params:void 0}}(n,o);if(i){i=r.props=t({},i);var a=r.attrs=r.attrs||{};for(var u in i)e.props&&u in e.props||(a[u]=i[u],delete i[u])}}var n=/[!'()*]/g,o=function(t){return"%"+t.charCodeAt(0).toString(16)},i=/%2C/g,a=function(t){return encodeURIComponent(t).replace(n,o).replace(i,",")},u=decodeURIComponent,s=function(t){return null==t||"object"==typeof t?t:String(t)};function c(t){var e={};return(t=t.trim().replace(/^(\?|#|&)/,""))?(t.split("&").forEach(function(t){var r=t.replace(/\+/g," ").split("="),n=u(r.shift()),o=r.length>0?u(r.join("=")):null;void 0===e[n]?e[n]=o:Array.isArray(e[n])?e[n].push(o):e[n]=[e[n],o]}),e):e}function p(t){var e=t?Object.keys(t).map(function(e){var r=t[e];if(void 0===r)return"";if(null===r)return a(e);if(Array.isArray(r)){var n=[];return r.forEach(function(t){void 0!==t&&(null===t?n.push(a(e)):n.push(a(e)+"="+a(t)))}),n.join("&")}return a(e)+"="+a(r)}).filter(function(t){return t.length>0}).join("&"):null;return e?"?"+e:""}var f=/\/?$/;function h(t,e,r,n){var o=n&&n.options.stringifyQuery,i=e.query||{};try{i=l(i)}catch(t){}var a={name:e.name||t&&t.name,meta:t&&t.meta||{},path:e.path||"/",hash:e.hash||"",query:i,params:e.params||{},fullPath:y(e,o),matched:t?v(t):[]};return r&&(a.redirectedFrom=y(r,o)),Object.freeze(a)}function l(t){if(Array.isArray(t))return t.map(l);if(t&&"object"==typeof t){var e={};for(var r in t)e[r]=l(t[r]);return e}return t}var d=h(null,{path:"/"});function v(t){for(var e=[];t;)e.unshift(t),t=t.parent;return e}function y(t,e){var r=t.path,n=t.query;void 0===n&&(n={});var o=t.hash;return void 0===o&&(o=""),(r||"/")+(e||p)(n)+o}function m(t,e){return e===d?t===e:!!e&&(t.path&&e.path?t.path.replace(f,"")===e.path.replace(f,"")&&t.hash===e.hash&&g(t.query,e.query):!(!t.name||!e.name)&&t.name===e.name&&t.hash===e.hash&&g(t.query,e.query)&&g(t.params,e.params))}function g(t,e){if(void 0===t&&(t={}),void 0===e&&(e={}),!t||!e)return t===e;var r=Object.keys(t),n=Object.keys(e);return r.length===n.length&&r.every(function(r){var n=t[r],o=e[r];return null==n||null==o?n===o:"object"==typeof n&&"object"==typeof o?g(n,o):String(n)===String(o)})}function w(t,e,r){var n=t.charAt(0);if("/"===n)return t;if("?"===n||"#"===n)return e+t;var o=e.split("/");r&&o[o.length-1]||o.pop();for(var i=t.replace(/^\//,"").split("/"),a=0;a<i.length;a++){var u=i[a];".."===u?o.pop():"."!==u&&o.push(u)}return""!==o[0]&&o.unshift(""),o.join("/")}function b(t){return t.replace(/\/\//g,"/")}var x=Array.isArray||function(t){return"[object Array]"==Object.prototype.toString.call(t)},R=U,k=_,E=function(t,e){return S(_(t,e),e)},A=S,O=q,C=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g");function _(t,e){for(var r,n=[],o=0,i=0,a="",u=e&&e.delimiter||"/";null!=(r=C.exec(t));){var s=r[0],c=r[1],p=r.index;if(a+=t.slice(i,p),i=p+s.length,c)a+=c[1];else{var f=t[i],h=r[2],l=r[3],d=r[4],v=r[5],y=r[6],m=r[7];a&&(n.push(a),a="");var g=null!=h&&null!=f&&f!==h,w="+"===y||"*"===y,b="?"===y||"*"===y,x=r[2]||u,R=d||v;n.push({name:l||o++,prefix:h||"",delimiter:x,optional:b,repeat:w,partial:g,asterisk:!!m,pattern:R?$(R):m?".*":"[^"+L(x)+"]+?"})}}return i<t.length&&(a+=t.substr(i)),a&&n.push(a),n}function j(t){return encodeURI(t).replace(/[\/?#]/g,function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()})}function S(t,e){for(var r=new Array(t.length),n=0;n<t.length;n++)"object"==typeof t[n]&&(r[n]=new RegExp("^(?:"+t[n].pattern+")$",T(e)));return function(e,n){for(var o="",i=e||{},a=(n||{}).pretty?j:encodeURIComponent,u=0;u<t.length;u++){var s=t[u];if("string"!=typeof s){var c,p=i[s.name];if(null==p){if(s.optional){s.partial&&(o+=s.prefix);continue}throw new TypeError('Expected "'+s.name+'" to be defined')}if(x(p)){if(!s.repeat)throw new TypeError('Expected "'+s.name+'" to not repeat, but received `'+JSON.stringify(p)+"`");if(0===p.length){if(s.optional)continue;throw new TypeError('Expected "'+s.name+'" to not be empty')}for(var f=0;f<p.length;f++){if(c=a(p[f]),!r[u].test(c))throw new TypeError('Expected all "'+s.name+'" to match "'+s.pattern+'", but received `'+JSON.stringify(c)+"`");o+=(0===f?s.prefix:s.delimiter)+c}}else{if(c=s.asterisk?encodeURI(p).replace(/[?#]/g,function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()}):a(p),!r[u].test(c))throw new TypeError('Expected "'+s.name+'" to match "'+s.pattern+'", but received "'+c+'"');o+=s.prefix+c}}else o+=s}return o}}function L(t){return t.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function $(t){return t.replace(/([=!:$\/()])/g,"\\$1")}function P(t,e){return t.keys=e,t}function T(t){return t&&t.sensitive?"":"i"}function q(t,e,r){x(e)||(r=e||r,e=[]);for(var n=(r=r||{}).strict,o=!1!==r.end,i="",a=0;a<t.length;a++){var u=t[a];if("string"==typeof u)i+=L(u);else{var s=L(u.prefix),c="(?:"+u.pattern+")";e.push(u),u.repeat&&(c+="(?:"+s+c+")*"),i+=c=u.optional?u.partial?s+"("+c+")?":"(?:"+s+"("+c+"))?":s+"("+c+")"}}var p=L(r.delimiter||"/"),f=i.slice(-p.length)===p;return n||(i=(f?i.slice(0,-p.length):i)+"(?:"+p+"(?=$))?"),i+=o?"$":n&&f?"":"(?="+p+"|$)",P(new RegExp("^"+i,T(r)),e)}function U(t,e,r){return x(e)||(r=e||r,e=[]),r=r||{},t instanceof RegExp?function(t,e){var r=t.source.match(/\((?!\?)/g);if(r)for(var n=0;n<r.length;n++)e.push({name:n,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return P(t,e)}(t,e):x(t)?function(t,e,r){for(var n=[],o=0;o<t.length;o++)n.push(U(t[o],e,r).source);return P(new RegExp("(?:"+n.join("|")+")",T(r)),e)}(t,e,r):function(t,e,r){return q(_(t,r),e,r)}(t,e,r)}R.parse=k,R.compile=E,R.tokensToFunction=A,R.tokensToRegExp=O;var I=Object.create(null);function M(t,e,r){e=e||{};try{var n=I[t]||(I[t]=R.compile(t));return"string"==typeof e.pathMatch&&(e[0]=e.pathMatch),n(e,{pretty:!0})}catch(t){return""}finally{delete e[0]}}function V(e,r,n,o){var i="string"==typeof e?{path:e}:e;if(i._normalized)return i;if(i.name){var a=(i=t({},e)).params;return a&&"object"==typeof a&&(i.params=t({},a)),i}if(!i.path&&i.params&&r){(i=t({},i))._normalized=!0;var u=t(t({},r.params),i.params);if(r.name)i.name=r.name,i.params=u;else if(r.matched.length){var p=r.matched[r.matched.length-1].path;i.path=M(p,u,r.path)}return i}var f=function(t){var e="",r="",n=t.indexOf("#");n>=0&&(e=t.slice(n),t=t.slice(0,n));var o=t.indexOf("?");return o>=0&&(r=t.slice(o+1),t=t.slice(0,o)),{path:t,query:r,hash:e}}(i.path||""),h=r&&r.path||"/",l=f.path?w(f.path,h,n||i.append):h,d=function(t,e,r){void 0===e&&(e={});var n,o=r||c;try{n=o(t||"")}catch(t){n={}}for(var i in e){var a=e[i];n[i]=Array.isArray(a)?a.map(s):s(a)}return n}(f.query,i.query,o&&o.options.parseQuery),v=i.hash||f.hash;return v&&"#"!==v.charAt(0)&&(v="#"+v),{_normalized:!0,path:l,query:d,hash:v}}var B,F=[String,Object],H=[String,Array],N=function(){},z={name:"RouterLink",props:{to:{type:F,required:!0},tag:{type:String,default:"a"},exact:Boolean,append:Boolean,replace:Boolean,activeClass:String,exactActiveClass:String,ariaCurrentValue:{type:String,default:"page"},event:{type:H,default:"click"}},render:function(e){var r=this,n=this.$router,o=this.$route,i=n.resolve(this.to,o,this.append),a=i.location,u=i.route,s=i.href,c={},p=n.options.linkActiveClass,l=n.options.linkExactActiveClass,d=null==p?"router-link-active":p,v=null==l?"router-link-exact-active":l,y=null==this.activeClass?d:this.activeClass,g=null==this.exactActiveClass?v:this.exactActiveClass,w=u.redirectedFrom?h(null,V(u.redirectedFrom),null,n):u;c[g]=m(o,w),c[y]=this.exact?c[g]:function(t,e){return 0===t.path.replace(f,"/").indexOf(e.path.replace(f,"/"))&&(!e.hash||t.hash===e.hash)&&function(t,e){for(var r in e)if(!(r in t))return!1;return!0}(t.query,e.query)}(o,w);var b=c[g]?this.ariaCurrentValue:null,x=function(t){D(t)&&(r.replace?n.replace(a,N):n.push(a,N))},R={click:D};Array.isArray(this.event)?this.event.forEach(function(t){R[t]=x}):R[this.event]=x;var k={class:c},E=!this.$scopedSlots.$hasNormal&&this.$scopedSlots.default&&this.$scopedSlots.default({href:s,route:u,navigate:x,isActive:c[y],isExactActive:c[g]});if(E){if(1===E.length)return E[0];if(E.length>1||!E.length)return 0===E.length?e():e("span",{},E)}if("a"===this.tag)k.on=R,k.attrs={href:s,"aria-current":b};else{var A=function t(e){if(e)for(var r,n=0;n<e.length;n++){if("a"===(r=e[n]).tag)return r;if(r.children&&(r=t(r.children)))return r}}(this.$slots.default);if(A){A.isStatic=!1;var O=A.data=t({},A.data);for(var C in O.on=O.on||{},O.on){var _=O.on[C];C in R&&(O.on[C]=Array.isArray(_)?_:[_])}for(var j in R)j in O.on?O.on[j].push(R[j]):O.on[j]=x;var S=A.data.attrs=t({},A.data.attrs);S.href=s,S["aria-current"]=b}else k.on=R}return e(this.tag,k,this.$slots.default)}};function D(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey||t.defaultPrevented||void 0!==t.button&&0!==t.button)){if(t.currentTarget&&t.currentTarget.getAttribute){var e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}var K="undefined"!=typeof window;function J(t,e,r,n){var o=e||[],i=r||Object.create(null),a=n||Object.create(null);t.forEach(function(t){!function t(e,r,n,o,i,a){var u=o.path,s=o.name,c=o.pathToRegexpOptions||{},p=function(t,e,r){return r||(t=t.replace(/\/$/,"")),"/"===t[0]?t:null==e?t:b(e.path+"/"+t)}(u,i,c.strict);"boolean"==typeof o.caseSensitive&&(c.sensitive=o.caseSensitive);var f={path:p,regex:Q(p,c),components:o.components||{default:o.component},instances:{},name:s,parent:i,matchAs:a,redirect:o.redirect,beforeEnter:o.beforeEnter,meta:o.meta||{},props:null==o.props?{}:o.components?o.props:{default:o.props}};if(o.children&&o.children.forEach(function(o){var i=a?b(a+"/"+o.path):void 0;t(e,r,n,o,f,i)}),r[f.path]||(e.push(f.path),r[f.path]=f),void 0!==o.alias)for(var h=Array.isArray(o.alias)?o.alias:[o.alias],l=0;l<h.length;++l){var d=h[l],v={path:d,children:o.children};t(e,r,n,v,i,f.path||"/")}s&&(n[s]||(n[s]=f))}(o,i,a,t)});for(var u=0,s=o.length;u<s;u++)"*"===o[u]&&(o.push(o.splice(u,1)[0]),s--,u--);return{pathList:o,pathMap:i,nameMap:a}}function Q(t,e){return R(t,[],e)}function X(t,e){var r=J(t),n=r.pathList,o=r.pathMap,i=r.nameMap;function a(t,r,a){var u=V(t,r,!1,e),c=u.name;if(c){var p=i[c];if(!p)return s(null,u);var f=p.regex.keys.filter(function(t){return!t.optional}).map(function(t){return t.name});if("object"!=typeof u.params&&(u.params={}),r&&"object"==typeof r.params)for(var h in r.params)!(h in u.params)&&f.indexOf(h)>-1&&(u.params[h]=r.params[h]);return u.path=M(p.path,u.params),s(p,u,a)}if(u.path){u.params={};for(var l=0;l<n.length;l++){var d=n[l],v=o[d];if(Y(v.regex,u.path,u.params))return s(v,u,a)}}return s(null,u)}function u(t,r){var n=t.redirect,o="function"==typeof n?n(h(t,r,null,e)):n;if("string"==typeof o&&(o={path:o}),!o||"object"!=typeof o)return s(null,r);var u=o,c=u.name,p=u.path,f=r.query,l=r.hash,d=r.params;return f=u.hasOwnProperty("query")?u.query:f,l=u.hasOwnProperty("hash")?u.hash:l,d=u.hasOwnProperty("params")?u.params:d,c?(i[c],a({_normalized:!0,name:c,query:f,hash:l,params:d},void 0,r)):p?a({_normalized:!0,path:M(function(t,e){return w(t,e.parent?e.parent.path:"/",!0)}(p,t),d),query:f,hash:l},void 0,r):s(null,r)}function s(t,r,n){return t&&t.redirect?u(t,n||r):t&&t.matchAs?function(t,e,r){var n=a({_normalized:!0,path:M(r,e.params)});if(n){var o=n.matched,i=o[o.length-1];return e.params=n.params,s(i,e)}return s(null,e)}(0,r,t.matchAs):h(t,r,n,e)}return{match:a,addRoutes:function(t){J(t,n,o,i)}}}function Y(t,e,r){var n=e.match(t);if(!n)return!1;if(!r)return!0;for(var o=1,i=n.length;o<i;++o){var a=t.keys[o-1],u="string"==typeof n[o]?decodeURIComponent(n[o]):n[o];a&&(r[a.name||"pathMatch"]=u)}return!0}var W=K&&window.performance&&window.performance.now?window.performance:Date;function G(){return W.now().toFixed(3)}var Z=G();function tt(){return Z}function et(t){return Z=t}var rt=Object.create(null);function nt(){"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual");var e=window.location.protocol+"//"+window.location.host,r=window.location.href.replace(e,""),n=t({},window.history.state);return n.key=tt(),window.history.replaceState(n,"",r),window.addEventListener("popstate",at),function(){window.removeEventListener("popstate",at)}}function ot(t,e,r,n){if(t.app){var o=t.options.scrollBehavior;o&&t.app.$nextTick(function(){var i=function(){var t=tt();if(t)return rt[t]}(),a=o.call(t,e,r,n?i:null);a&&("function"==typeof a.then?a.then(function(t){ft(t,i)}).catch(function(t){}):ft(a,i))})}}function it(){var t=tt();t&&(rt[t]={x:window.pageXOffset,y:window.pageYOffset})}function at(t){it(),t.state&&t.state.key&&et(t.state.key)}function ut(t){return ct(t.x)||ct(t.y)}function st(t){return{x:ct(t.x)?t.x:window.pageXOffset,y:ct(t.y)?t.y:window.pageYOffset}}function ct(t){return"number"==typeof t}var pt=/^#\d/;function ft(t,e){var r,n="object"==typeof t;if(n&&"string"==typeof t.selector){var o=pt.test(t.selector)?document.getElementById(t.selector.slice(1)):document.querySelector(t.selector);if(o){var i=t.offset&&"object"==typeof t.offset?t.offset:{};e=function(t,e){var r=document.documentElement.getBoundingClientRect(),n=t.getBoundingClientRect();return{x:n.left-r.left-e.x,y:n.top-r.top-e.y}}(o,i={x:ct((r=i).x)?r.x:0,y:ct(r.y)?r.y:0})}else ut(t)&&(e=st(t))}else n&&ut(t)&&(e=st(t));e&&window.scrollTo(e.x,e.y)}var ht,lt=K&&(-1===(ht=window.navigator.userAgent).indexOf("Android 2.")&&-1===ht.indexOf("Android 4.0")||-1===ht.indexOf("Mobile Safari")||-1!==ht.indexOf("Chrome")||-1!==ht.indexOf("Windows Phone"))&&window.history&&"function"==typeof window.history.pushState;function dt(e,r){it();var n=window.history;try{if(r){var o=t({},n.state);o.key=tt(),n.replaceState(o,"",e)}else n.pushState({key:et(G())},"",e)}catch(t){window.location[r?"replace":"assign"](e)}}function vt(t){dt(t,!0)}function yt(t,e,r){var n=function(o){o>=t.length?r():t[o]?e(t[o],function(){n(o+1)}):n(o+1)};n(0)}var mt={redirected:2,aborted:4,cancelled:8,duplicated:16};function gt(t,e){return bt(t,e,mt.redirected,'Redirected when going from "'+t.fullPath+'" to "'+function(t){if("string"==typeof t)return t;if("path"in t)return t.path;var e={};return xt.forEach(function(r){r in t&&(e[r]=t[r])}),JSON.stringify(e,null,2)}(e)+'" via a navigation guard.')}function wt(t,e){return bt(t,e,mt.cancelled,'Navigation cancelled from "'+t.fullPath+'" to "'+e.fullPath+'" with a new navigation.')}function bt(t,e,r,n){var o=new Error(n);return o._isRouter=!0,o.from=t,o.to=e,o.type=r,o}var xt=["params","query","hash"];function Rt(t){return Object.prototype.toString.call(t).indexOf("Error")>-1}function kt(t,e){return Rt(t)&&t._isRouter&&(null==e||t.type===e)}function Et(t){return function(e,r,n){var o=!1,i=0,a=null;At(t,function(t,e,r,u){if("function"==typeof t&&void 0===t.cid){o=!0,i++;var s,c=_t(function(e){var o;((o=e).__esModule||Ct&&"Module"===o[Symbol.toStringTag])&&(e=e.default),t.resolved="function"==typeof e?e:B.extend(e),r.components[u]=e,--i<=0&&n()}),p=_t(function(t){var e="Failed to resolve async component "+u+": "+t;a||(a=Rt(t)?t:new Error(e),n(a))});try{s=t(c,p)}catch(t){p(t)}if(s)if("function"==typeof s.then)s.then(c,p);else{var f=s.component;f&&"function"==typeof f.then&&f.then(c,p)}}}),o||n()}}function At(t,e){return Ot(t.map(function(t){return Object.keys(t.components).map(function(r){return e(t.components[r],t.instances[r],t,r)})}))}function Ot(t){return Array.prototype.concat.apply([],t)}var Ct="function"==typeof Symbol&&"symbol"==typeof Symbol.toStringTag;function _t(t){var e=!1;return function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];if(!e)return e=!0,t.apply(this,r)}}var jt=function(t,e){this.router=t,this.base=function(t){if(!t)if(K){var e=document.querySelector("base");t=(t=e&&e.getAttribute("href")||"/").replace(/^https?:\/\/[^\/]+/,"")}else t="/";return"/"!==t.charAt(0)&&(t="/"+t),t.replace(/\/$/,"")}(e),this.current=d,this.pending=null,this.ready=!1,this.readyCbs=[],this.readyErrorCbs=[],this.errorCbs=[],this.listeners=[]};function St(t,e,r,n){var o=At(t,function(t,n,o,i){var a=function(t,e){return"function"!=typeof t&&(t=B.extend(t)),t.options[e]}(t,e);if(a)return Array.isArray(a)?a.map(function(t){return r(t,n,o,i)}):r(a,n,o,i)});return Ot(n?o.reverse():o)}function Lt(t,e){if(e)return function(){return t.apply(e,arguments)}}jt.prototype.listen=function(t){this.cb=t},jt.prototype.onReady=function(t,e){this.ready?t():(this.readyCbs.push(t),e&&this.readyErrorCbs.push(e))},jt.prototype.onError=function(t){this.errorCbs.push(t)},jt.prototype.transitionTo=function(t,e,r){var n,o=this;try{n=this.router.match(t,this.current)}catch(t){throw this.errorCbs.forEach(function(e){e(t)}),t}this.confirmTransition(n,function(){var t=o.current;o.updateRoute(n),e&&e(n),o.ensureURL(),o.router.afterHooks.forEach(function(e){e&&e(n,t)}),o.ready||(o.ready=!0,o.readyCbs.forEach(function(t){t(n)}))},function(t){r&&r(t),t&&!o.ready&&(o.ready=!0,kt(t,mt.redirected)?o.readyCbs.forEach(function(t){t(n)}):o.readyErrorCbs.forEach(function(e){e(t)}))})},jt.prototype.confirmTransition=function(t,e,r){var n,o,i=this,a=this.current,u=function(t){!kt(t)&&Rt(t)&&(i.errorCbs.length?i.errorCbs.forEach(function(e){e(t)}):console.error(t)),r&&r(t)},s=t.matched.length-1,c=a.matched.length-1;if(m(t,a)&&s===c&&t.matched[s]===a.matched[c])return this.ensureURL(),u(((o=bt(n=a,t,mt.duplicated,'Avoided redundant navigation to current location: "'+n.fullPath+'".')).name="NavigationDuplicated",o));var p=function(t,e){var r,n=Math.max(t.length,e.length);for(r=0;r<n&&t[r]===e[r];r++);return{updated:e.slice(0,r),activated:e.slice(r),deactivated:t.slice(r)}}(this.current.matched,t.matched),f=p.updated,h=p.deactivated,l=p.activated,d=[].concat(function(t){return St(t,"beforeRouteLeave",Lt,!0)}(h),this.router.beforeHooks,function(t){return St(t,"beforeRouteUpdate",Lt)}(f),l.map(function(t){return t.beforeEnter}),Et(l));this.pending=t;var v=function(e,r){if(i.pending!==t)return u(wt(a,t));try{e(t,a,function(e){!1===e?(i.ensureURL(!0),u(function(t,e){return bt(t,e,mt.aborted,'Navigation aborted from "'+t.fullPath+'" to "'+e.fullPath+'" via a navigation guard.')}(a,t))):Rt(e)?(i.ensureURL(!0),u(e)):"string"==typeof e||"object"==typeof e&&("string"==typeof e.path||"string"==typeof e.name)?(u(gt(a,t)),"object"==typeof e&&e.replace?i.replace(e):i.push(e)):r(e)})}catch(t){u(t)}};yt(d,v,function(){var r=[];yt(function(t,e,r){return St(t,"beforeRouteEnter",function(t,n,o,i){return function(t,e,r,n,o){return function(i,a,u){return t(i,a,function(t){"function"==typeof t&&n.push(function(){!function t(e,r,n,o){r[n]&&!r[n]._isBeingDestroyed?e(r[n]):o()&&setTimeout(function(){t(e,r,n,o)},16)}(t,e.instances,r,o)}),u(t)})}}(t,o,i,e,r)})}(l,r,function(){return i.current===t}).concat(i.router.resolveHooks),v,function(){if(i.pending!==t)return u(wt(a,t));i.pending=null,e(t),i.router.app&&i.router.app.$nextTick(function(){r.forEach(function(t){t()})})})})},jt.prototype.updateRoute=function(t){this.current=t,this.cb&&this.cb(t)},jt.prototype.setupListeners=function(){},jt.prototype.teardownListeners=function(){this.listeners.forEach(function(t){t()}),this.listeners=[]};var $t=function(t){function e(e,r){t.call(this,e,r),this._startLocation=Pt(this.base)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.setupListeners=function(){var t=this;if(!(this.listeners.length>0)){var e=this.router,r=e.options.scrollBehavior,n=lt&&r;n&&this.listeners.push(nt());var o=function(){var r=t.current,o=Pt(t.base);t.current===d&&o===t._startLocation||t.transitionTo(o,function(t){n&&ot(e,t,r,!0)})};window.addEventListener("popstate",o),this.listeners.push(function(){window.removeEventListener("popstate",o)})}},e.prototype.go=function(t){window.history.go(t)},e.prototype.push=function(t,e,r){var n=this,o=this.current;this.transitionTo(t,function(t){dt(b(n.base+t.fullPath)),ot(n.router,t,o,!1),e&&e(t)},r)},e.prototype.replace=function(t,e,r){var n=this,o=this.current;this.transitionTo(t,function(t){vt(b(n.base+t.fullPath)),ot(n.router,t,o,!1),e&&e(t)},r)},e.prototype.ensureURL=function(t){if(Pt(this.base)!==this.current.fullPath){var e=b(this.base+this.current.fullPath);t?dt(e):vt(e)}},e.prototype.getCurrentLocation=function(){return Pt(this.base)},e}(jt);function Pt(t){var e=decodeURI(window.location.pathname);return t&&0===e.toLowerCase().indexOf(t.toLowerCase())&&(e=e.slice(t.length)),(e||"/")+window.location.search+window.location.hash}var Tt=function(t){function e(e,r,n){t.call(this,e,r),n&&function(t){var e=Pt(t);if(!/^\/#/.test(e))return window.location.replace(b(t+"/#"+e)),!0}(this.base)||qt()}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.setupListeners=function(){var t=this;if(!(this.listeners.length>0)){var e=this.router.options.scrollBehavior,r=lt&&e;r&&this.listeners.push(nt());var n=function(){var e=t.current;qt()&&t.transitionTo(Ut(),function(n){r&&ot(t.router,n,e,!0),lt||Vt(n.fullPath)})},o=lt?"popstate":"hashchange";window.addEventListener(o,n),this.listeners.push(function(){window.removeEventListener(o,n)})}},e.prototype.push=function(t,e,r){var n=this,o=this.current;this.transitionTo(t,function(t){Mt(t.fullPath),ot(n.router,t,o,!1),e&&e(t)},r)},e.prototype.replace=function(t,e,r){var n=this,o=this.current;this.transitionTo(t,function(t){Vt(t.fullPath),ot(n.router,t,o,!1),e&&e(t)},r)},e.prototype.go=function(t){window.history.go(t)},e.prototype.ensureURL=function(t){var e=this.current.fullPath;Ut()!==e&&(t?Mt(e):Vt(e))},e.prototype.getCurrentLocation=function(){return Ut()},e}(jt);function qt(){var t=Ut();return"/"===t.charAt(0)||(Vt("/"+t),!1)}function Ut(){var t=window.location.href,e=t.indexOf("#");if(e<0)return"";var r=(t=t.slice(e+1)).indexOf("?");if(r<0){var n=t.indexOf("#");t=n>-1?decodeURI(t.slice(0,n))+t.slice(n):decodeURI(t)}else t=decodeURI(t.slice(0,r))+t.slice(r);return t}function It(t){var e=window.location.href,r=e.indexOf("#");return(r>=0?e.slice(0,r):e)+"#"+t}function Mt(t){lt?dt(It(t)):window.location.hash=t}function Vt(t){lt?vt(It(t)):window.location.replace(It(t))}var Bt=function(t){function e(e,r){t.call(this,e,r),this.stack=[],this.index=-1}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.push=function(t,e,r){var n=this;this.transitionTo(t,function(t){n.stack=n.stack.slice(0,n.index+1).concat(t),n.index++,e&&e(t)},r)},e.prototype.replace=function(t,e,r){var n=this;this.transitionTo(t,function(t){n.stack=n.stack.slice(0,n.index).concat(t),e&&e(t)},r)},e.prototype.go=function(t){var e=this,r=this.index+t;if(!(r<0||r>=this.stack.length)){var n=this.stack[r];this.confirmTransition(n,function(){e.index=r,e.updateRoute(n)},function(t){kt(t,mt.duplicated)&&(e.index=r)})}},e.prototype.getCurrentLocation=function(){var t=this.stack[this.stack.length-1];return t?t.fullPath:"/"},e.prototype.ensureURL=function(){},e}(jt),Ft=function(t){void 0===t&&(t={}),this.app=null,this.apps=[],this.options=t,this.beforeHooks=[],this.resolveHooks=[],this.afterHooks=[],this.matcher=X(t.routes||[],this);var e=t.mode||"hash";switch(this.fallback="history"===e&&!lt&&!1!==t.fallback,this.fallback&&(e="hash"),K||(e="abstract"),this.mode=e,e){case"history":this.history=new $t(this,t.base);break;case"hash":this.history=new Tt(this,t.base,this.fallback);break;case"abstract":this.history=new Bt(this,t.base)}},Ht={currentRoute:{configurable:!0}};function Nt(t,e){return t.push(e),function(){var r=t.indexOf(e);r>-1&&t.splice(r,1)}}return Ft.prototype.match=function(t,e,r){return this.matcher.match(t,e,r)},Ht.currentRoute.get=function(){return this.history&&this.history.current},Ft.prototype.init=function(t){var e=this;if(this.apps.push(t),t.$once("hook:destroyed",function(){var r=e.apps.indexOf(t);r>-1&&e.apps.splice(r,1),e.app===t&&(e.app=e.apps[0]||null),e.app||e.history.teardownListeners()}),!this.app){this.app=t;var r=this.history;if(r instanceof $t||r instanceof Tt){var n=function(t){r.setupListeners(),function(t){var n=r.current,o=e.options.scrollBehavior;lt&&o&&"fullPath"in t&&ot(e,t,n,!1)}(t)};r.transitionTo(r.getCurrentLocation(),n,n)}r.listen(function(t){e.apps.forEach(function(e){e._route=t})})}},Ft.prototype.beforeEach=function(t){return Nt(this.beforeHooks,t)},Ft.prototype.beforeResolve=function(t){return Nt(this.resolveHooks,t)},Ft.prototype.afterEach=function(t){return Nt(this.afterHooks,t)},Ft.prototype.onReady=function(t,e){this.history.onReady(t,e)},Ft.prototype.onError=function(t){this.history.onError(t)},Ft.prototype.push=function(t,e,r){var n=this;if(!e&&!r&&"undefined"!=typeof Promise)return new Promise(function(e,r){n.history.push(t,e,r)});this.history.push(t,e,r)},Ft.prototype.replace=function(t,e,r){var n=this;if(!e&&!r&&"undefined"!=typeof Promise)return new Promise(function(e,r){n.history.replace(t,e,r)});this.history.replace(t,e,r)},Ft.prototype.go=function(t){this.history.go(t)},Ft.prototype.back=function(){this.go(-1)},Ft.prototype.forward=function(){this.go(1)},Ft.prototype.getMatchedComponents=function(t){var e=t?t.matched?t:this.resolve(t).route:this.currentRoute;return e?[].concat.apply([],e.matched.map(function(t){return Object.keys(t.components).map(function(e){return t.components[e]})})):[]},Ft.prototype.resolve=function(t,e,r){var n=V(t,e=e||this.history.current,r,this),o=this.match(n,e),i=o.redirectedFrom||o.fullPath;return{location:n,route:o,href:function(t,e,r){var n="hash"===r?"#"+e:e;return t?b(t+"/"+n):n}(this.history.base,i,this.mode),normalizedTo:n,resolved:o}},Ft.prototype.addRoutes=function(t){this.matcher.addRoutes(t),this.history.current!==d&&this.history.transitionTo(this.history.getCurrentLocation())},Object.defineProperties(Ft.prototype,Ht),Ft.install=function t(r){if(!t.installed||B!==r){t.installed=!0,B=r;var n=function(t){return void 0!==t},o=function(t,e){var r=t.$options._parentVnode;n(r)&&n(r=r.data)&&n(r=r.registerRouteInstance)&&r(t,e)};r.mixin({beforeCreate:function(){n(this.$options.router)?(this._routerRoot=this,this._router=this.$options.router,this._router.init(this),r.util.defineReactive(this,"_route",this._router.history.current)):this._routerRoot=this.$parent&&this.$parent._routerRoot||this,o(this,this)},destroyed:function(){o(this)}}),Object.defineProperty(r.prototype,"$router",{get:function(){return this._routerRoot._router}}),Object.defineProperty(r.prototype,"$route",{get:function(){return this._routerRoot._route}}),r.component("RouterView",e),r.component("RouterLink",z);var i=r.config.optionMergeStrategies;i.beforeRouteEnter=i.beforeRouteLeave=i.beforeRouteUpdate=i.created}},Ft.version="3.4.3",Ft.isNavigationFailure=kt,Ft.NavigationFailureType=mt,K&&window.Vue&&window.Vue.use(Ft),Ft},"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).VueRouter=e();