!function(e){"use strict";function t(e){return Object(e)===e}if(!e.WeakMap){var r=Object.prototype.hasOwnProperty,i=function(e,t,r){Object.defineProperty?Object.defineProperty(e,t,{configurable:!0,writable:!0,value:r}):e[t]=r};e.WeakMap=function(){function e(){if(void 0===this)throw new TypeError("Constructor WeakMap requires 'new'");if(i(this,"_id",o("_WeakMap")),arguments.length>0)throw new TypeError("WeakMap iterable is not supported")}function n(e,i){if(!t(e)||!r.call(e,"_id"))throw new TypeError(i+" method called on incompatible receiver "+typeof e)}function o(e){return e+"_"+a()+"."+a()}function a(){return Math.random().toString().substring(2)}return i(e.prototype,"delete",function(e){if(n(this,"delete"),!t(e))return!1;var r=e[this._id];return!(!r||r[0]!==e)&&(delete e[this._id],!0)}),i(e.prototype,"get",function(e){if(n(this,"get"),t(e)){var r=e[this._id];return r&&r[0]===e?r[1]:void 0}}),i(e.prototype,"has",function(e){if(n(this,"has"),!t(e))return!1;var r=e[this._id];return!(!r||r[0]!==e)}),i(e.prototype,"set",function(e,r){if(n(this,"set"),!t(e))throw new TypeError("Invalid value used as weak map key");var o=e[this._id];return o&&o[0]===e?(o[1]=r,this):(i(e,this._id,[e,r]),this)}),i(e,"_polyfill",!0),e}()}}("undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:this);