/*
 *
 *  declantyson/2017/main
 *  Declan Tyson
 *  v0.1.1
 *  30/03/2017
 *
 */

/* jshint esversion: 6 */
const Ocelot = require('ocelot-pjax');
let ocelot = new Ocelot.Pjax();

const ocelotCallback = () => {

    document.querySelector('#total').scrollTop = 0;

    let header = document.querySelector('header'),
        navigation = document.querySelector('.navigation'),
        pageTitle = document.querySelector('#ocelot-content h1'),
        pageSubTitle = document.querySelector('#ocelot-content h6'),
        pageTitleH1 = document.createElement('h1'),
        pageSubTitlePara = document.createElement('p'),
        bodyClassName = window.location.pathname.replace('/', ''),
        featuredImg = document.getElementById('featured');

    if (bodyClassName === '') bodyClassName = 'homepage';
    document.body.className = bodyClassName;

    featuredImg.setAttribute("src", "/assets/" + bodyClassName + ".png");
    featuredImg.style.opacity = 1;

    let titlePrefix = "Declan Tyson | ";
    if (bodyClassName === 'homepage') {
        titlePrefix = "";
    }
    document.title = titlePrefix + pageTitle.innerText;
    pageTitleH1.innerText = pageTitle.innerText;
    pageTitle.remove();

    pageSubTitlePara.innerHTML = pageSubTitle.innerText;
    pageSubTitle.remove();

    header.className = '';
    header.innerHTML = pageTitleH1.outerHTML + pageSubTitlePara.outerHTML;

    ocelot.fadeContent(1);

    setTimeout(() => {
        header.className = 'in';
        header.style.marginTop = "calc(100vh - " + (header.clientHeight + navigation.clientHeight + 20) + "px)";

        let scrollPoint = document.querySelector('#total').clientHeight / 4;

        if (window.location.pathname === "/") {} else if (document.querySelector('#total').scrollTop <= scrollPoint) {
            //scrollPage(500, scrollPoint);
            document.querySelector('.drop').className = "drop in";
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
    if (typeof ocelot.events[window.location.pathname] !== "undefined") ocelot.events[window.location.pathname]();
};

document.querySelector('#total').onscroll = () => {
    let scrollPoint = document.querySelector('#total').clientHeight / 4;
    if (document.querySelector('#total').scrollTop <= scrollPoint + 10) {
        document.querySelector('.drop').className = "drop in";
    } else {
        document.querySelector('.drop').className = "drop";
    }
};

document.querySelector('.drop').onclick = () => {
    let scrollPoint = document.querySelector('#total').clientHeight / 4;
    if (document.body.clientWidth < 640) {
        scrollPoint = false;
    }

    scrollPage(500, scrollPoint);
};

const scrollPage = (scrollDuration, stopPoint = false) => {
    let view = document.querySelector('#total'),
        header = document.querySelector('header'),
        bottom = view.scrollHeight - view.clientHeight;

    if (!stopPoint) stopPoint = bottom < header.offsetTop - 40 ? bottom : header.offsetTop - 40;

    let scrollStep = stopPoint / (scrollDuration / 15),
        scrollInterval = setInterval(() => {
        if (view.scrollTop < stopPoint) {
            view.scrollTop += scrollStep;
        } else {
            clearInterval(scrollInterval);
        }
    }, 15);
};
//# sourceMappingURL=main.js.map
