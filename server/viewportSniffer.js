/*! modernizr 3.5.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-mq !*/
!function(e,n,t){function o(e,n){return typeof e===n}function a(){var e,n,t,a,i,s,r;for(var d in l)if(l.hasOwnProperty(d)){if(e=[],n=l[d],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(a=o(n.fn,"function")?n.fn():n.fn,i=0;i<e.length;i++)s=e[i],r=s.split("."),1===r.length?Modernizr[r[0]]=a:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=a),f.push((a?"":"no-")+r.join("-"))}}function i(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):c?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function s(){var e=n.body;return e||(e=i(c?"svg":"body"),e.fake=!0),e}function r(e,t,o,a){var r,l,d,f,c="modernizr",p=i("div"),h=s();if(parseInt(o,10))for(;o--;)d=i("div"),d.id=a?a[o]:c+(o+1),p.appendChild(d);return r=i("style"),r.type="text/css",r.id="s"+c,(h.fake?h:p).appendChild(r),h.appendChild(p),r.styleSheet?r.styleSheet.cssText=e:r.appendChild(n.createTextNode(e)),p.id=c,h.fake&&(h.style.background="",h.style.overflow="hidden",f=u.style.overflow,u.style.overflow="hidden",u.appendChild(h)),l=t(p,e),h.fake?(h.parentNode.removeChild(h),u.style.overflow=f,u.offsetHeight):p.parentNode.removeChild(p),!!l}var l=[],d={_version:"3.5.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){l.push({name:e,fn:n,options:t})},addAsyncTest:function(e){l.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=d,Modernizr=new Modernizr;var f=[],u=n.documentElement,c="svg"===u.nodeName.toLowerCase(),p=function(){var n=e.matchMedia||e.msMatchMedia;return n?function(e){var t=n(e);return t&&t.matches||!1}:function(n){var t=!1;return r("@media "+n+" { #modernizr { position: absolute; } }",function(n){t="absolute"==(e.getComputedStyle?e.getComputedStyle(n,null):n.currentStyle).position}),t}}();d.mq=p,a(),delete d.addTest,delete d.addAsyncTest;for(var h=0;h<Modernizr._q.length;h++)Modernizr._q[h]();e.Modernizr=Modernizr}(window,document);            

/* Hello X logic */
(function () {
  var mediaQueryFunction = function mediaQueryFunction() {
    if (Modernizr.mq('(min-device-width: 1001px) and (min-width: 1001px)')) {
      document.documentElement.className += 
        document.documentElement.className ?
          ' monitor' :
          'monitor';
    }
  }

  /* Fire once when loading. */
  mediaQueryFunction();

  /* Fire again every time the window is resized. */
  window.addEventListener('resize', mediaQueryFunction);
})();