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
        bodyClassName = window.location.pathname.replace('/', '');

    if (bodyClassName === '') bodyClassName = 'homepage';
    document.body.className = bodyClassName;

    pageTitleH1.innerText = pageTitle.innerText;
    pageTitle.remove();

    pageSubTitlePara.innerHTML = pageSubTitle.innerText;
    pageSubTitle.remove();

    header.className = '';
    header.innerHTML = pageTitleH1.outerHTML + pageSubTitlePara.outerHTML;

    ocelot.fadeContent(1);

    setTimeout(() => {
        document.querySelector('header').className = 'in';

        if (window.location.pathname !== "/") {
            scrollPage(750);
        }
    }, 200);
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

const scrollPage = scrollDuration => {
    let view = document.querySelector('#total'),
        bottom = view.scrollHeight - view.clientHeight,
        scrollStep = bottom / (scrollDuration / 15),
        header = document.querySelector('header'),
        scrollInterval = setInterval(() => {
        if (view.scrollTop !== bottom && view.scrollTop < header.offsetTop - 40) {
            view.scrollTop += scrollStep;
        } else {
            clearInterval(scrollInterval);
        }
    }, 15);
};
//# sourceMappingURL=main.js.map
