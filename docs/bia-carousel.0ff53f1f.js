parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"+tka":[function(require,module,exports) {
var e,t,n,r=document.querySelector(".carousel"),o=r.querySelectorAll(".carousel__cell"),a=0,c=r.offsetWidth,l=r.offsetHeight,u=!0,i=u?"rotateY":"rotateX";function d(){var e=n*a*-1;r.style.transform="translateZ("+-t+"px) "+i+"("+e+"deg)"}var s=document.querySelector(".previous-button");s.addEventListener("click",function(){a--,d()});var v=document.querySelector(".next-button");v.addEventListener("click",function(){a++,d()});var f=document.querySelector(".cells-range");function y(){n=360/(e=9);var r=u?c:l;t=Math.round(r/2/Math.tan(Math.PI/e));for(var a=0;a<o.length;a++){var s=o[a];if(a<e){s.style.opacity=1;var v=n*a;s.style.transform=i+"("+v+"deg) translateZ("+t+"px)"}else s.style.opacity=0,s.style.transform="none"}d()}f.addEventListener("change",y),f.addEventListener("input",y);var m=document.querySelectorAll('input[name="orientation"]');function h(){var e=document.querySelector('input[name="orientation"]:checked');u="horizontal"===e.value,i=u?"rotateY":"rotateX",y()}!function(){for(var e=0;e<m.length;e++){m[e].addEventListener("change",h)}}(),h(),window.onload=function(){document.getElementById("my_audio").play()};
},{}]},{},["+tka"], null)
//# sourceMappingURL=bia-carousel.0ff53f1f.js.map