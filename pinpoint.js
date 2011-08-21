function highlight(el){
	var body = document.body,
		highlight = document.createElement('pinpoint'),
		rect = el.getBoundingClientRect(),
		offset = 5;
	
	highlight.style.top = (rect.top-offset+body.scrollTop) + 'px';
	highlight.style.left = (rect.left-offset+body.scrollLeft) + 'px';
	highlight.style.width = (rect.width+offset*2) + 'px';
	highlight.style.height = (rect.height+offset*2) + 'px';
	
	body.appendChild(highlight);
	highlight.addEventListener('webkitAnimationEnd', function(){
		body.removeChild(highlight);
	}, false);
};

function Pinpoint(){
	var m = decodeURIComponent(location.hash).match(/css\((.+)\)/);
	if (!m) return;
	var selector = m[1];
	var el = document.querySelector(selector);
	if (!el) return;
	el.scrollIntoViewIfNeeded();
	highlight(el);
};

window.addEventListener('load', Pinpoint, false);
window.addEventListener('hashchange', Pinpoint, false);

var target;
document.addEventListener('contextmenu', function(e){
	target = e.target;
}, false);

// https://github.com/cheeaun/getSelector.js
var getSelector=function(a){function c(b,c){return a.querySelector(b)===c}function b(a){var b=a.charAt(0),c="";if(/^-+$/.test(a))return"\\-"+a.slice(1);/\d/.test(b)&&(c="\\3"+b+" ",a=a.slice(1)),c+=a.split("").map(function(a){return/[\t\n\v\f]/.test(a)?"\\"+a.charCodeAt().toString(16)+" ":(/[ !"#$%&'()*+,./:;<=>?@\[\\\]^_`{|}~]/.test(a)?"\\":"")+a}).join("");return c}return a.querySelector?function(d){if(d){a!==d.ownerDocument&&(a=d.ownerDocument);var e=d,g="";do{var h=d.tagName;if(!h||/html|body|head/i.test(h))return"";var h=h.toLowerCase(),i=d.id,k=d.className.trim(),l=d.classList||k.split(/\s+/);if(i){var i=b(i),m="#"+i+g;if(c(m,e))return m;m=h+"[id='"+i+"']"+g;if(c(m,e))return m}var n;if(k){for(var p=Infinity,m=0,k=l.length;m<k;m++){var q=l[m],r=a.getElementsByClassName(q).length;r<p&&(p=r,n=b(q))}m=h+"."+n+g;if(c(m,e))return m;if(i&&(m=h+"[id='"+i+"']."+n+g,c(m,e)))return m}switch(h){case"a":d.getAttribute("href");if(m=d.hash)if(m=h+"[href='"+m+"']"+g,c(m,e))return m;k=d.pathname||"";if(m=(k.match(/\/([^\/]+\.[^\/\.]+)$/i)||[,""])[1])if(m=h+"[href*='"+m+"']"+g,c(m,e))return m;if(m=d.hostname)if(m=h+"[href*='"+m+"']"+g,c(m,e))return m;if(k&&k.length<=50&&(m=h+"[href*='"+k+"']"+g,c(m,e)))return m;break;case"img":k=function(b){var c=a.createElement("a");c.href=b;return c.pathname}(d.getAttribute("src"));if(m=(k.match(/\/([^\/]+\.[^\/\.]+)$/i)||[,""])[1])if(m=h+"[src*='"+m+"']"+g,c(m,e))return m;break;case"input":case"button":case"select":case"textarea":if(m=d.getAttribute("name"))if(m=h+"[name='"+m+"']"+g,c(m,e))return m;break;case"label":if(m=d.getAttribute("for"))if(m=h+"[for='"+m+"']"+g,c(m,e))return m}l=d.parentNode.children,p=l.length,q=0,r=!0,m=0;for(k=l.length;m<k;m++){var s=l[m];s===d?q=m+1:s.tagName.toLowerCase()==h&&(r=!1)}if(p>1&&!r){if(g=h+(q==1?":first-child":q==p?":last-child":":nth-child("+q+")")+g,c(g,e))break}else if(i)g=h+"[id='"+i+"']"+g;else if(n)g=h+"."+n+g;else if(g=h+g,c(g,e))break}while((d=d.parentNode)&&(g=">"+g));return g}}:function(){}}(document)

chrome.extension.onRequest.addListener(function(request, sender, sendResponse){
	if (!target) return;
	sendResponse({
		location: location.href,
		selector: getSelector(target)
	});
	highlight(target);
});