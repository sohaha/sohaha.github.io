!function(a,b){"object"==typeof module&&"object"==typeof exports?module.exports=b():"function"==typeof define&&define.amd?define([],b):a.VueRun=b()}(this,function(){function a(a){if(".vue"===a.slice(-4))return u(a);if(window[a])return window[a];var b=B(a),c=E(t("",b));return window[c]?window[c]:void 0}function k(a,b){return typeof a===b}function l(){var a=h.version;return k(a,"object")?1:+h.version}function m(a){this.name=a,this.isPre=!1,this.styles=[],this._scopeId="",this.template=this.script=null}function n(a,b){this.component=a,this.elt=b,this.module={exports:{}}}function o(a,b,c){y(b,"name",c),this.component=a,this.elt=b}function p(a,b){this.component=a,this.elt=b}function q(a){return a}function r(a,b){if(a){if(Array.isArray(a)||(a=[a]),b)for(var c in a)b(a[c]);return a}}function s(a){var b=a.match(/(.*?)([^\/]+?)\/?(\.vue)?(\?.*|#.*|$)/);return{name:b[2],url:b[1]+b[2]+(void 0===b[3]?"data:"!==b[1].substr(0,5)?".vue":"":b[3])+b[4]}}function t(a,b){return"./"===b.substr(0,2)||"../"===b.substr(0,3)?a+b:b}function u(a,b,c){h.public&&0!==a.indexOf("http")&&0!==a.indexOf("https")&&(a=h.public+a);var d=s(a);return u.load(d.url,b,c)}function v(a){return h.cdn+"/lib/"+a}function w(a,b){return new Promise(function(d){a=r(a)||[];var f=function(){var h,i,e=a.length;return e?(h=a.shift(),i=b(h,function(){e--,e?f():d(),g[h]=h}),i&&c.head.appendChild(i),void 0):(d(),void 0)};f()})}function x(a,b,d,e){var g,f=c.createElement(a);if(k(e,"object"))for(g in e)f[g]=e[g];return f.onload=function(){b&&b(e)},f.onerror=function(){d&&d(e)},f}function y(a,b,c){return b="data-"+b,null===c?a.getAttribute(b):(void 0!==c&&a.setAttribute(b,c),void 0)}function z(){return c.head||c.getElementsByTagName("head")[0]}function A(a){return"data:"===a.substr(0,5)}function B(a){return A(a)?"":(j.href=a,j.host!==location.host?j.href:j.pathname)}function C(a){try{return new Function(a)(),!0}catch(b){return!1}}function D(a,b){var c=u.debug;c&&c.reload&&(c.createRecord(a,b),c.reload(a,b))}function E(a){return"$$"+a.replace(/[\\.\/:|?]/g,"_")}function F(a,c){var d=b.Babel&&k(b.Babel.transform,"function");return a?d?Babel.transform(a,{moduleId:c,presets:["es2015","stage-3"],plugins:h.babelPlugins}).code:a:d}function G(){return new Promise(function(a){return F()?a():(z().appendChild(x("script",function(){F()&&!i&&(u.langProcessor.babel=function(a){return F(a,this.name)},h.babel&&(u.langProcessor.js=u.langProcessor.babel)),a()},0,{src:v("babel.js")})),void 0)})}function H(a){var c=1,d=function(){c--,!c&&a&&a()};return"Promise"in b||(c++,z().appendChild(x("script",d,d,{src:v("promise.js")}))),"regeneratorRuntime"in b||(c++,z().appendChild(x("script",d,d,{src:v("regenerator-runtime.js")}))),G().then(function(){d()})}var b,c,d,e,f,g,h,i,j,K,I,J,L,M;return b=window,c=document,d={},e={},f=0,g={},h={debug:!1,vue:"",version:0,cdn:"./static",babel:!0,babelPlugins:["transform-es2015-modules-umd"],js:[],css:[],global:{}},i=C("export const a=1"),j=c.createElement("a"),u.version="1.1.1",o.prototype={withBase:function(a){var b,d;this.component.baseURI&&(b=c.createElement("base"),b.href=this.component.baseURI,d=z(),d.insertBefore(b,d.firstChild)),a.call(this),b&&z().removeChild(b)},scopeStyles:function(a,b){function c(){var e,f,g,h,c=a.sheet,d=c.cssRules;for(e=0;e<d.length;++e)f=d[e],1===f.type&&(g=[],f.selectorText.split(/\s*,\s*/).forEach(function(a){g.push(b+" "+a);var c=a.match(/([^ :]+)(.+)?/);g.push(c[1]+b+(c[2]||""))}),h=g.join(",")+f.cssText.substr(f.selectorText.length),c.deleteRule(e),c.insertRule(h,e))}try{c()}catch(d){if(d instanceof DOMException&&d.code===DOMException.INVALID_ACCESS_ERR)return a.sheet.disabled=!0,a.addEventListener("load",function e(){a.removeEventListener("load",e),setTimeout(function(){c(),a.sheet.disabled=!1})}),void 0;throw d}},compile:function(){var d,e,f,a=null!==this.template,b=c.querySelector("[data-name='"+y(this.elt,"name",null)+"']");if(!this.elt.innerText.replace(/(^\s*)|(\s*$)/g,""))return b&&z().removeChild(b),void 0;if(e=this.elt.hasAttribute("scoped")){if(!a)return;this.elt.removeAttribute("scoped")}return this.withBase(function(){if(b){d=y(b,"scopeId",null);for(var a=0;a<b.sheet.cssRules.length;++a)b.sheet.removeRule(a);b.innerHTML=this.elt.innerHTML}else z().appendChild(this.elt)}),e&&(f=this.component.getScopeId(d),y(this.elt,"scopeId",f),this.scopeStyles(b||this.elt,"["+f+"]",!!b)),Promise.resolve()},getContent:function(){return this.elt.textContent},setContent:function(a){this.withBase(function(){this.elt.textContent=a})}},n.prototype={getContent:function(){return this.elt.textContent},setContent:function(a){this.elt.textContent=a},load:function(a){var c,d,e,b=Promise.resolve(null);return a&&k(a,"object")&&(c=[],d=[],e=[],r(a.js||[],function(a){return".es6"!==a.slice(-4)?(c.push(u.loadjs(a)),void 0):(g[a]||e.push(u.loadEs(a)),void 0)}),r(a.css||[],function(a){d.push(u.loadcss(a))}),(c.length>0||d.length>0||e.length>0)&&(b=Promise.all(Array.prototype.concat(d,c,e)))),b.catch(function(){}).then(function(){return this}.bind(this))},compile:function(){var e,f,b=function(a){var b=E(t("",a));return u.loadEs(a,b)}.bind(this),c=this.getContent();try{Function("exports","get","VueRun","load","module","require",c).call(this.module.exports,this.module.exports,b,u,this.load,this.module,a)}catch(d){if(!("lineNumber"in d))return console.log(c),Promise.reject(k(d,"object")?d.message||d:d);throw e=responseText.replace(/\r?\n/g,"\n"),f=e.substr(0,e.indexOf(script)).split("\n").length+d.lineNumber-1,new d.constructor(d.message,url,f)}return Promise.resolve(this.module.exports).then(u.scriptExportsHandler.bind(this)).then(function(a){this.module.exports=a}.bind(this))}},p.prototype={getContent:function(){return this.elt.innerHTML},setContent:function(a){this.elt.innerHTML=a},getRootElt:function(){var a=this.elt.content||this.elt;if("firstElementChild"in a)return a.firstElementChild;for(a=a.firstChild;null!==a;a=a.nextSibling)if(a.nodeType===Node.ELEMENT_NODE)return a;return null},compile:function(){return Promise.resolve()}},m.prototype={getScopeId:function(a){return""===this._scopeId&&(a||(a="data-s-"+(f++).toString(36)),this._scopeId=a),this.template&&this.template.getRootElt().setAttribute(this._scopeId,""),this._scopeId},load:function(a,b,f){var g=n.prototype.load(f);return!b&&k(e[a],"string")?(this.isPre=!0,g=g.then(function(){return e[a]})):g=g.then(function(){return!b&&d[a]?d[a]:u.httpRequest(a).then(function(b){return d[a]=b,b})}),g.then(function(b){var d,e;for(this.baseURI=A(a)?"":a.substr(0,a.lastIndexOf("/")+1),d=c.implementation.createHTMLDocument(""),d.body.innerHTML=(this.baseURI?'<base href="'+this.baseURI+'">':"")+b,e=d.body.firstChild;e;e=e.nextSibling)switch(e.nodeName){case"TEMPLATE":this.template=new p(this,e);break;case"SCRIPT":this.script=new n(this,e);break;case"STYLE":this.styles.push(new o(this,e,B(a)))}return this}.bind(this))},_normalizeSection:function(a){var c;return c=null!==a&&a.elt.hasAttribute("src")?u.httpRequest(a.elt.getAttribute("src")).then(function(b){return a.elt.removeAttribute("src"),b}):Promise.resolve(null),c.then(function(b){var c,d;return b||!a?b:(b=a.getContent(),c=a.elt.hasAttribute("lang"),c?(d=a.elt.getAttribute("lang"),a.elt.removeAttribute("lang"),"babel"===d?H().then(function(){return(u.langProcessor[d]||q).call(this,b)}.bind(this)):(u.langProcessor[d]||q).call(this,b)):!c&&a.module?u.langProcessor.js.call(this,b):b)}.bind(this)).then(function(b){return null!==b&&a.setContent(b),b})},normalize:function(a){return this.isPre?new Promise(function(a){a(this)}.bind(this)):Promise.all(Array.prototype.concat(this._normalizeSection(this.template,a),this._normalizeSection(this.script,a),this.styles.map(this._normalizeSection))).then(function(c){return!this.isPre&&"VueRunDeal"in b&&b.VueRunDeal(a,c,this),this}.bind(this))},compile:function(){return Promise.all(Array.prototype.concat(this.styles.map(function(a){return a.compile()}),this.template&&this.template.compile(),this.script&&this.script.compile())).then(function(){return this}.bind(this))}},u.preLoad=function(a){for(var b in a)e[b]=a[b]},u.hotReload=function(a){return this.load(a,null,!0)()},u.load=function(a,b,c){return function(){var e,f,d=B(a);return d&&(a=d),e={},k(b,"object")&&(e=b,b=""),f=new m(b).load(a,c,e).then(function(b){return b.normalize(a)}).then(function(a){return a.compile()}).then(function(b){var c=null!==b.script?b.script.module.exports:{};return null!==b.template&&(c.template=b.template.getContent()),void 0===c.name&&void 0!==b.name&&(c.name=b.name),c._baseURI=b.baseURI,D(a,c),c}).catch(function(b){404===b&&k(h["notExist"],"function")?h["notExist"](a):b&&console.error(a,b)})}},u.httpRequest=function(a){return new Promise(function(b,c){var d=new XMLHttpRequest;d.open("GET",a),d.responseType="text",h.version&&d.setRequestHeader("Cache-Control","no-cache"),d.onreadystatechange=function(){4===d.readyState&&(d.status>=200&&d.status<300?b(d.responseText):c(d.status))},d.send(null)})},u.langProcessor={html:q,js:q,javascript:q,css:q},u.scriptExportsHandler=function(a){var b=this.component.script.module;return b?b.exports.default||b.exports:a},u.loadEs=function(a,c,d){var h,i,f,j;return a?(a=B(a),f=E(t("",a)),c||(c=f),!d&&g[c]?h=Promise.resolve(b[c]):!d&&g[f]?h=Promise.resolve(b[f]):(j=function(d,e){return Function(d).call(b),g[f]=g[c]=a,e&&M(f,d,"j"),c!==f&&(b[f]=b[c]),b[c]},h=e[f]?Promise.resolve(j(e[f],!1)):u.httpRequest(a).then(function(a){return j(F(a,c),!0)}).catch(function(b){console.warn(b,a,i)})),h):Promise.resolve("")},u.loadcss=function(a){return w(a,function(a,b){return g[a]?(b(),void 0):x("link",b,b,{href:a,rel:"stylesheet"})})},u.loadjs=function(a){return w(a,function(a,b){return g[a]?(b(),void 0):(g[a]=a,x("script",b,b,{src:a}))})},u.debug=null,u.isSupportEs6=C,u.staticState=g,u.lib=function(a){return h.cdn+a},u.config=function(a){if(k(a,"object"))for(var b in a)a.hasOwnProperty(b)&&(h[b]=a[b])},u.init=function(a,d){var e,f,g;u.config(d),function(){var a,b;if(I&&l()){a=[],L(function(b,c){try{var d=b.split("|");4===d.length&&(l()===+d[1]?(c[d[3]]=JSON.parse(I.getItem(b)||""),u.preLoad(c,d[2])):a.push(b))}catch(e){console.warn(e)}});for(b in a)I.removeItem(a[b])}}(),e=function(){var f,g,c=Object.keys(h.global),d=c.length,e=function(){d--,0>=d&&a&&a()};if(d>0)for(f in h.global)g=h.global[f],k(g,"string")?u.loadEs(g,f).then(e):(b[f]=g,e());else e()},f=function(){var g,i,j,l,a=h.js.length,b=h.css.length,d=a+b,f=function(){d--,0>=d&&setTimeout(function(){e()})};if(d>0){for(g=c.createDocumentFragment(),i=0;a>i;i++)j=h.js[i],l={},j?(k(j,"object")&&(l=j[1],j=j[0]),l.src=j,g.appendChild(x("script",f,f,l))):d--;for(i=0;b>i;i++)j=h.css[i],l={rel:"stylesheet"},j?(k(j,"object")&&(l=j[1],j=j[0]),l.href=j,g.appendChild(x("link",f,f,l))):d--;z().appendChild(g)}else f()},g=function(){i?f():h.babel?H(f):f()},b.Vue||b.vue?g():z().appendChild(x("script",g,null,{src:h.vue||v(h.debug?"vue.js":"vue.min.js")}))},I=localStorage,J="VueRun_Cache|",L=function(a){var b,c,d;for(b=0;b<I.length;b++)c=I.key(b),d={},0===c.indexOf(J)&&a(c,d)},M=function(a,b,c){I&&l()&&setTimeout(function(){a=J+l()+"|"+c+"|"+a;try{I.setItem(a,JSON.stringify(b))}catch(d){K=!0,console.warn(d)}},1e3)},u.clearCache=function(){var a,b;if(I){a=[],L(function(b){a.push(b)});for(b in a)I.removeItem(a[b])}},b.VueRunDeal=function(a,b,c){var e,d="<template>"+b[0]+"</template>";d+="<script>"+b[1]+"</script>",e=c&&c.styles.length>0?c.styles[0].elt.hasAttribute("data-scopeid")?"scoped":"":"",d+="<style "+e+">"+b[2]+"</style>",M(a,d,"v")},u});
