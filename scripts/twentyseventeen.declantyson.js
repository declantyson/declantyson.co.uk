/* 
  * 
  *  twentyseventeen.declantyson 
  *  Declan Tyson 
  *  v0.0.1 
  *  27/03/2017 
  * 
  */


(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.twentyseventeen || (g.twentyseventeen = {})).declantyson = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
/* 
  * 
  *  Ocelot 
  *  Declan Tyson 
  *  v0.3.7 
  *  24/03/2017 
  * 
  */

!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.Ocelot=a()}}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){"use strict";function d(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(c,"__esModule",{value:!0});var e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},f=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),g=function(){function a(){var b=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"ocelot-content";d(this,a),this.el=b,this.events={},this.defaultOpts={endpoint:!1,method:"GET",timeout:0,callback:null,callbackTimeout:0,push:!0},this.prePopCallback=function(){},this.postPopCallback=null,this.registerPop()}return f(a,[{key:"registerPop",value:function(){var a=this,b=this;history.pushState?window.onpopstate=function(){var c={endpoint:window.location.pathname,push:!1};b.prePopCallback&&a.prePopCallback(),b.postPopCallback&&(c.callback=a.postPopCallback),b.changePage(c)}:console.warn("Ocelot: this browser does not support history.pushState. Hash changing is coming soon.")}},{key:"setEvent",value:function(a,b){this.events[a]=b}},{key:"changePage",value:function(){var a=this,b=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},c=this.defaultOpts;Object.keys(b).forEach(function(a){c[a]=b[a]}),c.endpoint||console.warn("Ocelot: a PJAX endpoint is required.");var d=new XMLHttpRequest;d.open(c.method,c.endpoint,!0),d.send(),d.onreadystatechange=function(){if(4===d.readyState){if(200!==d.status)return void console.warn("Ocelot: "+c.method+" "+c.endpoint+" returned "+d.status+".");setTimeout(function(){var b=document.createElement("div");b.innerHTML=d.responseText,document.querySelector("#"+a.el).innerHTML=b.querySelector("#"+a.el).innerHTML;var f=a.events[c.endpoint];if(f){if("function"!=typeof f)return void console.warn("Ocelot: "+c.endpoint+" event must be a function, instead found "+("undefined"==typeof f?"undefined":e(f))+".");f()}},c.timeout),setTimeout(function(){if(null!==c.callback)return"function"!=typeof c.callback?void console.warn("Ocelot: Callback must be a function, instead found "+e(c.callback)+"."):void c.callback(d.responseText)},c.callbackTimeout),c.push&&history.pushState("","New URL: "+c.endpoint,c.endpoint)}}}},{key:"all",value:function(){var a=this,b=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};document.addEventListener("click",function(c){c=c||window.event;for(var d=c.target||c.srcElement;d;){if(d instanceof HTMLAnchorElement){b.endpoint=d.attributes.href.value;var e=b.endpoint.split(":")[0];if(["mailto","tel"].indexOf(e)!==-1)break;c.preventDefault(),"function"!=typeof b.prePopCallback?a.prePopCallback():b.prePopCallback(),a.changePage(b);break}d=d.parentNode}})}},{key:"fadeAll",value:function(){var a=this,b=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};b.timeout||(b.timeout=250),b.callbackTimeout||(b.callbackTimeout=250),b.fadeTo||(b.fadeTo=0),b.prePopCallback||(this.prePopCallback=function(){a.fadeContent(b.fadeTo)}),document.getElementById(this.el).style.transition="opacity "+b.timeout/1e3+"s ease-out",document.addEventListener("click",function(c){c=c||window.event;for(var d=c.target||c.srcElement;d;){if(d instanceof HTMLAnchorElement){var e=function(){b.endpoint=d.attributes.href.value;var e=b.endpoint.split(":")[0];if(["mailto","tel"].indexOf(e)!==-1)return"break";c.preventDefault(),a.fadeContent(b.fadeTo);var f=b.callback;return b.callback=function(b){a.fadeContent(1),f&&f(b)},a.postPopCallback=b.callback,a.changePage(b),"break"}();if("break"===e)break}d=d.parentNode}})}},{key:"fadeContent",value:function(a){document.getElementById(this.el).style.opacity=a}}]),a}();c.Pjax=g},{}]},{},[1])(1)});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
/*
 *
 *  2017.declantyson/home
 *  Declan Tyson
 *  v0.0.1
 *  23/03/2017
 *
 */

/* jshint esversion: 6 */
window.onload = () => {
  console.log("loaded");
  document.querySelector('header').className = 'in';
};


},{}],3:[function(require,module,exports){
/*
 *
 *  declantyson/2017/main
 *  Declan Tyson
 *  v0.0.2
 *  24/03/2017
 *
 */

/* jshint esversion: 6 */
const Ocelot = require('ocelot-pjax');
let ocelot = new Ocelot.Pjax();

const ocelotCallback = () => {
    let header = document.querySelector('header'),
        pageTitle = document.querySelector('#ocelot-content h1'),
        pageSubTitle = document.querySelector('#ocelot-content h6'),
        pageTitleH1 = document.createElement('h1'),
        pageSubTitlePara = document.createElement('p'),
        bodyClassName = window.location.pathname.replace('/', ''),
        featuredImg = document.getElementById('featured');

    if (bodyClassName === '') bodyClassName = 'homepage';
    document.body.className = bodyClassName;

    featuredImg.setAttribute("src", "assets/" + bodyClassName + ".png");
    featuredImg.style.opacity = 1;

    pageTitleH1.innerText = pageTitle.innerText;
    pageTitle.remove();

    pageSubTitlePara.innerHTML = pageSubTitle.innerText;
    pageSubTitle.remove();

    header.className = '';
    header.innerHTML = pageTitleH1.outerHTML + pageSubTitlePara.outerHTML;

    ocelot.fadeContent(1);

    setTimeout(() => {
        header.className = 'in';

        if (window.location.pathname !== "/") {
            scrollPage(500);
        } else {
            document.querySelector('#total').scrollTop = 0;
        }
    }, 200);
};

ocelot.prePopCallback = () => {
    document.querySelector('header').className = 'out';
    ocelot.fadeContent(0);
    document.getElementById('featured').style.opacity = 0;
};

ocelot.all({
    timeout: 500,
    callbackTimeout: 550,
    callback: ocelotCallback
});

window.onload = () => {
    ocelotCallback();
};

const scrollPage = scrollDuration => {
    let view = document.querySelector('#total'),
        header = document.querySelector('header'),
        bottom = view.scrollHeight - view.clientHeight,
        stopPoint = bottom < header.offsetTop - 40 ? bottom : header.offsetTop - 40,
        scrollStep = stopPoint / (scrollDuration / 15),
        scrollInterval = setInterval(() => {
        if (view.scrollTop < stopPoint) {
            view.scrollTop += scrollStep;
        } else {
            clearInterval(scrollInterval);
        }
    }, 15);
};


},{"ocelot-pjax":1}]},{},[2,3])(3)
});