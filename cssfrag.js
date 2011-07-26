function CSSFrag(){
	var m = decodeURIComponent(window.location.hash).match(/css\((.+)\)/);
	if (!m) return;
	var selector = m[1];
	var elem = document.querySelector(selector);
	if (!elem) return;
	elem.scrollIntoView();
	elem.focus();
};

// window.addEventListener('load', CSSFrag, false);
CSSFrag(); // Chrome runs this on domready
window.addEventListener('hashchange', CSSFrag, false);