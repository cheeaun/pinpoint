var Pinpoint = function(){
	var m = decodeURIComponent(window.location.hash).match(/css\((.+)\)/);
	if (!m) return;
	var selector = m[1];
	var elem = document.querySelector(selector);
	if (!elem) return;
	elem.scrollIntoView();
	elem.focus();
};

Pinpoint(); // Chrome runs this on domready
window.addEventListener('hashchange', Pinpoint, false);

var target;
document.addEventListener('contextmenu', function(e){
	target = e.target;
}, false);

// https://github.com/cheeaun/getSelector.js
var getSelector=function(a){if(!a.querySelector)return function(){};var b=function(b,c){return a.querySelector(b)===c};return function(c){if(c){a!==c.ownerDocument&&(a=c.ownerDocument);var d=c,e="";do{var g=c.tagName;if(!g||/html|body|head/i.test(g))return"";var g=g.toLowerCase(),h=c.id,i=c.className.trim(),k=c.classList||i.split(/\s+/);if(h){var l="#"+h+e;if(b(l,d))return l;l=g+"[id='"+h+"']"+e;if(b(l,d))return l}var m;if(i){for(var n=Infinity,l=0,i=k.length;l<i;l++){var o=k[l],p=a.getElementsByClassName(o).length;p<n&&(n=p,m=o)}l=g+"."+m+e;if(b(l,d))return l;if(h&&(l=g+"[id='"+h+"']."+m+e,b(l,d)))return l}switch(g){case"a":c.getAttribute("href");if(l=c.hash)if(l=g+"[href='"+l+"']"+e,b(l,d))return l;i=c.pathname||"";if(l=(i.match(/\/([^\/]+\.[^\/\.]+)$/i)||[,""])[1])if(l=g+"[href*='"+l+"']"+e,b(l,d))return l;if(l=c.hostname)if(l=g+"[href*='"+l+"']"+e,b(l,d))return l;if(i&&i.length<=50&&(l=g+"[href*='"+i+"']"+e,b(l,d)))return l;break;case"img":i=function(b){var c=a.createElement("a");c.href=b,b=c.pathname,delete c;return b}(c.getAttribute("src"));if(l=(i.match(/\/([^\/]+\.[^\/\.]+)$/i)||[,""])[1])if(l=g+"[src*='"+l+"']"+e,b(l,d))return l;break;case"input":case"button":case"select":case"textarea":if(l=c.getAttribute("name"))if(l=g+"[name='"+l+"']"+e,b(l,d))return l;break;case"label":if(l=c.getAttribute("for"))if(l=g+"[for='"+l+"']"+e,b(l,d))return l}k=c.parentNode.children,n=k.length,o=0,p=!0,l=0;for(i=k.length;l<i;l++){var q=k[l];q===c?o=l+1:q.tagName.toLowerCase()==g&&(p=!1)}if(n>1&&!p){if(e=g+(o==1?":first-child":o==n?":last-child":":nth-child("+o+")")+e,b(e,d))break}else if(h)e=g+"[id='"+h+"']"+e;else if(m)e=g+"."+m+e;else if(e=g+e,b(e,d))break}while((c=c.parentNode)&&(e=">"+e));return e}}}(document)

chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
	if (!target) return;
	sendResponse({
		location: location.href,
		selector: getSelector(target)
	});
});