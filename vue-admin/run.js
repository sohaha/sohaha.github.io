!function(a,b){"object"==typeof module&&"object"==typeof exports?module.exports=b():"function"==typeof define&&define.amd?define([],b):a.VueRun=b()}(this,function(){"use strict";function j(a,b){return typeof a===b}function k(){var a=g.version;return j(a,"object")?1:+g.version}function l(a){this.name=a,this.isPre=!1,this.styles=[],this._scopeId="",this.template=this.script=null}function n(a,b){this.component=a,this.elt=b,this.module={exports:{}}}function o(a,b,c){y(b,"name",c),this.component=a,this.elt=b}function p(a,b){this.component=a,this.elt=b}function q(a){return a}function r(a,b){if(a){if(Array.isArray(a)||(a=[a]),b)for(var c in a)b(a[c]);return a}}function s(a){var b=a.match(/(.*?)([^\/]+?)\/?(\.vue)?(\?.*|#.*|$)/);return{name:b[2],url:b[1]+b[2]+(void 0===b[3]?"data:"!==b[1].substr(0,5)?".vue":"":b[3])+b[4]}}function t(a,b){return"./"===b.substr(0,2)||"../"===b.substr(0,3)?a+b:b}function u(a,b,c){var d=s(a);return u.load(d.url,b,c)}function v(a){return g.cdn+"/lib/"+a}function w(a,c){return new Promise(function(d){a=r(a)||[];var g=function(){var h,i,e=a.length;return e?(h=a.shift(),i=c(h,function(){e--,e?g():d(),f[h]=h}),i&&b.head.appendChild(i),void 0):(d(),void 0)};g()})}function x(a,c,d,e){var g,f=b.createElement(a);if(j(e,"object"))for(g in e)f[g]=e[g];return f.onload=function(){c&&c(e)},f.onerror=function(){d&&d(e)},f}function y(a,b,c){return b="data-"+b,null===c?a.getAttribute(b):(void 0!==c&&a.setAttribute(b,c),void 0)}function z(){return b.head||b.getElementsByTagName("head")[0]}function A(a){return"data:"===a.substr(0,5)}function B(a){return A(a)?"":(i.href=a,i.host!==location.host?i.href:i.pathname)}function C(a){try{return new Function(a)(),!0}catch(b){return!1}}function D(a,b){var c=u.debug;c&&c.reload&&(c.createRecord(a,b),c.reload(a,b))}function E(a){return"$$"+a.replace(/[\\.\/:|?]/g,"_")}function F(b,c){var d=a.Babel&&j(a.Babel.transform,"function");return b?d?Babel.transform(b,{moduleId:c,presets:["es2015","stage-3"],plugins:["transform-es2015-modules-umd"]}).code:b:d}function G(b){var e,c=1,d=function(){c--,c||b()};"Promise"in a||(c++,z().appendChild(x("script",d,d,{src:v("promise.js")}))),"regeneratorRuntime"in a||(c++,z().appendChild(x("script",d,d,{src:v("regenerator-runtime.js")}))),e=x("script",function(){F()&&!h&&(u.langProcessor.js=function(a){return F(a,this.name)},u.scriptExportsHandler=function(){return this.component.script.module.exports.default}),d()},0,{src:v("babel.js")}),z().appendChild(e)}var J,H,I,K,L,a=window,b=document,c={},d={},e=0,f={},g={debug:!1,version:0,cdn:"./static",babel:!0,js:[],css:[],global:{}},h=C("export const a=1"),i=b.createElement("a");return u.version="1.0.0",o.prototype={withBase:function(a){var c,d;this.component.baseURI&&(c=b.createElement("base"),c.href=this.component.baseURI,d=z(),d.insertBefore(c,d.firstChild)),a.call(this),c&&z().removeChild(c)},scopeStyles:function(a,b){function c(){var e,f,g,h,c=a.sheet,d=c.cssRules;for(e=0;e<d.length;++e)f=d[e],1===f.type&&(g=[],f.selectorText.split(/\s*,\s*/).forEach(function(a){g.push(b+" "+a);var c=a.match(/([^ :]+)(.+)?/);g.push(c[1]+b+(c[2]||""))}),h=g.join(",")+f.cssText.substr(f.selectorText.length),c.deleteRule(e),c.insertRule(h,e))}try{c()}catch(d){if(d instanceof DOMException&&d.code===DOMException.INVALID_ACCESS_ERR)return a.sheet.disabled=!0,a.addEventListener("load",function e(){a.removeEventListener("load",e),setTimeout(function(){c(),a.sheet.disabled=!1})}),void 0;throw d}},compile:function(){var d,e,f,a=null!==this.template,c=b.querySelector("[data-name='"+y(this.elt,"name",null)+"']");if(!this.elt.innerText.replace(/(^\s*)|(\s*$)/g,""))return c&&z().removeChild(c),void 0;if(e=this.elt.hasAttribute("scoped")){if(!a)return;this.elt.removeAttribute("scoped")}return this.withBase(function(){if(c){d=y(c,"scopeId",null);for(var a=0;a<c.sheet.cssRules.length;++a)c.sheet.removeRule(a);c.innerHTML=this.elt.innerHTML}else z().appendChild(this.elt)}),e&&(f=this.component.getScopeId(d),y(this.elt,"scopeId",f),this.scopeStyles(c||this.elt,"["+f+"]",!!c)),Promise.resolve()},getContent:function(){return this.elt.textContent},setContent:function(a){this.withBase(function(){this.elt.textContent=a})}},n.prototype={getContent:function(){return this.elt.textContent},setContent:function(a){this.elt.textContent=a},load:function(a){var c,d,e,b=Promise.resolve(null);return j(a,"object")&&(c=[],d=[],e=[],r(a.js,function(a){c.push(u.loadjs(a))}),r(a.css,function(a){d.push(u.loadcss(a))}),(c.length>0||d.length>0||e.length>0)&&(b=Promise.all(Array.prototype.concat(d,c,e)))),b.catch(function(){}).then(function(){return this}.bind(this))},compile:function(){var d,e,a=function(a){var b=E(t("",a));return u.loadEs(a,b)}.bind(this),b=this.getContent();try{Function("exports","get","VueRun","load","module",b).call(this.module.exports,this.module.exports,a,u,this.load,this.module)}catch(c){if(!("lineNumber"in c))return console.log(b),Promise.reject(j(c,"object")?c.message||c:c);throw d=responseText.replace(/\r?\n/g,"\n"),e=d.substr(0,d.indexOf(script)).split("\n").length+c.lineNumber-1,new c.constructor(c.message,url,e)}return Promise.resolve(this.module.exports).then(u.scriptExportsHandler.bind(this)).then(function(a){this.module.exports=a}.bind(this))}},p.prototype={getContent:function(){return this.elt.innerHTML},setContent:function(a){this.elt.innerHTML=a},getRootElt:function(){var a=this.elt.content||this.elt;if("firstElementChild"in a)return a.firstElementChild;for(a=a.firstChild;null!==a;a=a.nextSibling)if(a.nodeType===Node.ELEMENT_NODE)return a;return null},compile:function(){return Promise.resolve()}},l.prototype={getScopeId:function(a){return""===this._scopeId&&(a||(a="data-s-"+(e++).toString(36)),this._scopeId=a),this.template&&this.template.getRootElt().setAttribute(this._scopeId,""),this._scopeId},load:function(a,e){var f;return!e&&j(d[a],"string")?(this.isPre=!0,f=new Promise(function(b){b(d[a])})):f=new Promise(function(b,d){return!e&&c[a]?(b(c[a]),void 0):(u.httpRequest(a).then(function(d){b(d),c[a]=d}).catch(d),void 0)}),f.then(function(c){var d,e;for(this.baseURI=A(a)?"":a.substr(0,a.lastIndexOf("/")+1),d=b.implementation.createHTMLDocument(""),d.body.innerHTML=(this.baseURI?'<base href="'+this.baseURI+'">':"")+c,e=d.body.firstChild;e;e=e.nextSibling)switch(e.nodeName){case"TEMPLATE":this.template=new p(this,e);break;case"SCRIPT":this.script=new n(this,e);break;case"STYLE":this.styles.push(new o(this,e,B(a)))}return this}.bind(this))},_normalizeSection:function(a){var c;return c=null!==a&&a.elt.hasAttribute("src")?u.httpRequest(a.elt.getAttribute("src")).then(function(b){return a.elt.removeAttribute("src"),b}):Promise.resolve(null),c.then(function(b){var c,d;return b||!a?b:(b=a.getContent(),c=a.elt.hasAttribute("lang"),c?(d=a.elt.getAttribute("lang"),a.elt.removeAttribute("lang"),(u.langProcessor[d]||q).call(this,b)):!c&&a.module?u.langProcessor.js.call(this,b):b)}.bind(this)).then(function(b){return null!==b&&a.setContent(b),b})},normalize:function(b){return this.isPre?new Promise(function(a){a(this)}.bind(this)):Promise.all(Array.prototype.concat(this._normalizeSection(this.template,b),this._normalizeSection(this.script,b),this.styles.map(this._normalizeSection))).then(function(c){return!this.isPre&&"VueRunDeal"in a&&a.VueRunDeal(b,c,this),this}.bind(this))},compile:function(){return Promise.all(Array.prototype.concat(this.styles.map(function(a){return a.compile()}),this.template&&this.template.compile(),this.script&&this.script.compile())).then(function(){return this}.bind(this))}},u.preLoad=function(a){for(var b in a)d[b]=a[b]},u.hotReload=function(a){return this.load(a,null,!0)()},u.load=function(a,b,c){return function(){var e,d=B(a);return d&&(a=d),e=new l(b).load(a,c).then(function(b){return b.normalize(a)}).then(function(a){return a.compile()}).then(function(b){var c=null!==b.script?b.script.module.exports:{};return null!==b.template&&(c.template=b.template.getContent()),void 0===c.name&&void 0!==b.name&&(c.name=b.name),c._baseURI=b.baseURI,D(a,c),c}).catch(function(b){404===b&&j(g["notExist"],"function")?g["notExist"](a):b&&console.error(a,b)})}},u.httpRequest=function(a){return new Promise(function(b,c){var d=new XMLHttpRequest;d.open("GET",a),d.responseType="text",g.version&&d.setRequestHeader("Cache-Control","no-cache"),d.onreadystatechange=function(){4===d.readyState&&(d.status>=200&&d.status<300?b(d.responseText):c(d.status))},d.send(null)})},u.langProcessor={html:q,js:q,css:q},u.scriptExportsHandler=q,u.loadEs=function(b,c,e){var g,h,i,j;return b?(b=B(b),!e&&f[c]?g=Promise.resolve(a[c]):(i=E(t("",b)),!e&&f[i]?g=Promise.resolve(a[i]):(j=function(d,e){return Function(d).call(a),f[i]=f[c]=b,e&&L(i,d,"j"),c!==i&&(a[i]=a[c]),a[c]},g=d[i]?Promise.resolve(j(d[i],!1)):u.httpRequest(b).then(function(a){return j(F(a,c),!0)}).catch(function(a){console.warn(a,b,h)}))),g):Promise.resolve("")},u.loadcss=function(a){return w(a,function(a,b){return f[a]?(b(),void 0):x("link",b,b,{href:a,rel:"stylesheet"})})},u.loadjs=function(a){return w(a,function(a,b){return f[a]?(b(),void 0):(f[a]=a,x("script",b,b,{src:a}))})},u.debug=null,u.isSupportEs6=C,u.staticState=f,u.lib=function(a){return g.cdn+a},u.config=function(a){if(j(a,"object"))for(var b in a)a.hasOwnProperty(b)&&(g[b]=a[b])},u.init=function(c,d){var e,f,i;u.config(d),function(){var a,b;if(H&&k()){a=[],K(function(b,c){try{var d=b.split("|");4===d.length&&(k()===+d[1]?(c[d[3]]=JSON.parse(H.getItem(b)||""),u.preLoad(c,d[2])):a.push(b))}catch(e){console.warn(e)}});for(b in a)H.removeItem(a[b])}}(),e=function(){var f,h,b=Object.keys(g.global),d=b.length,e=function(){d--,0>=d&&c&&c()};if(d>0)for(f in g.global)h=g.global[f],j(h,"string")?u.loadEs(h,f).then(e):(a[f]=h,e());else e()},f=function(){var h,i,k,l,a=g.js.length,c=g.css.length,d=a+c,f=function(){d--,0>=d&&setTimeout(function(){e()})};if(d>0){for(h=b.createDocumentFragment(),i=0;a>i;i++)k=g.js[i],l={},k?(j(k,"object")&&(l=k[1],k=k[0]),l.src=k,h.appendChild(x("script",f,f,l))):d--;for(i=0;c>i;i++)k=g.css[i],l={rel:"stylesheet"},k?(j(k,"object")&&(l=k[1],k=k[0]),l.href=k,h.appendChild(x("link",f,f,l))):d--;z().appendChild(h)}else f()},i=function(){h?f():g.babel?G(f):f()},a.Vue||a.vue?i():z().appendChild(x("script",i,null,{src:v(g.debug?"vue.js":"vue.min.js")}))},H=localStorage,I="VueRun_Cache|",K=function(a){var b,c,d;for(b=0;b<H.length;b++)c=H.key(b),d={},0===c.indexOf(I)&&a(c,d)},L=function(a,b,c){H&&k()&&setTimeout(function(){a=I+k()+"|"+c+"|"+a;try{H.setItem(a,JSON.stringify(b))}catch(d){J=!0,console.warn(d)}},1e3)},u.clearCache=function(){var a,b;if(H){a=[],K(function(b){a.push(b)});for(b in a)H.removeItem(a[b])}},a.VueRunDeal=function(a,b,c){var e,d="<template>"+b[0]+"</template>";d+="<script>"+b[1]+"</script>",e=c&&c.styles.length>0?c.styles[0].elt.hasAttribute("data-scopeid")?"scoped":"":"",d+="<style "+e+">"+b[2]+"</style>",L(a,d,"v")},u});
