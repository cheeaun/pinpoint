function offsetXY(elem)
{
	var x = y = 0;
	if (elem.offsetParent)
	{
		do {
			x += elem.offsetLeft;
			y += elem.offsetTop;
		} while (elem = elem.offsetParent);
	};
	return {'x':x,'y':y};
};

function CSSFrag() // does not support fallbacks
{
	var m;
	if (m = decodeURIComponent(window.location.hash).match(/css\((.+)\)/))
	{
		var selector = m[1];
		var elem = document.querySelector(selector);
		var offset = offsetXY(elem);
		window.scrollTo(offset.x, offset.y);
		elem.focus();
	};
};

// window.addEventListener('load', CSSFrag, false);
CSSFrag(); // Chrome runs this on domready
window.addEventListener('hashchange', CSSFrag, false);