"use strict";

const ajax = () => {

	if (window.XMLHttpRequest) {
		return new XMLHttpRequest();
	} else {
		return new ActiveXObject("Microsoft.XMLHTTP");
	}

};

export default ajax;