/*
 *
 *  declantyson/2017/main
 *  Declan Tyson
 *  v0.0.1
 *  23/03/2017
 *
 */

/* jshint esversion: 6 */
const Ocelot = require('ocelot-pjax');
let ocelot = new Ocelot.Pjax();

const ocelotCallback = () => {
    let header = document.querySelector('header'),
        pageTitle = document.querySelector('#ocelot-content h1'),
        pageTitleH1 = document.createElement('h1'),
        pageTitlePara = document.createElement('p');

    pageTitleH1.innerText = pageTitle.innerText;
    pageTitle.remove();

    pageTitlePara.innerHTML = '&nbsp;';

    header.className = '';
    header.innerHTML = pageTitleH1.outerHTML + pageTitlePara.outerHTML;

    ocelot.fadeContent(1);

    setTimeout(function () {
        document.querySelector('header').className = 'in';
    },200);
};

ocelot.prePopCallback = () => {
    document.querySelector('header').className = 'out';
    ocelot.fadeContent(0);
};

ocelot.all({
    timeout: 500,
    callbackTimeout: 550,
    callback: ocelotCallback
});

window.onload = () => {
    ocelotCallback();
};
