function CustomForm(form) {
	this.document = $(document);
	this.form = $(form);
    this.inputs = this.form.find('input');
	this.selects = this.form.find('select');
	this.options = this.form.find('option');
	this.customInputs = [];
	this.customSelects = [];
	this.customizeInputs();
	this.customizeSelects();
	this.document.bind('mouseup', $.proxy(this.clear, this));
}
CustomForm.prototype.clear = function () {
	var i = 0,
		len = this.customInputs.length,
		eClass;
	for (i = 0; i < len; i += 1) {
		if (this.inputs[i].checked === true) {
			eClass = this.customInputs[i].className.replace(/checked/g, '');
			eClass = eClass.trim();
			eClass += ' checked';
			eClass = eClass.trim();
			this.customInputs[i].className = eClass;
		} else {
			eClass = this.customInputs[i].className.replace(/checked/g, '');
			eClass = eClass.trim();
			this.customInputs[i].className = eClass;
		}
	}
}
CustomForm.prototype.check = function (e) {
	var element = e.currentTarget.nextSibling,
		eClass = '',
		group = '',
		i,
		inputsLength = this.inputs.length;
	if (element.checked === true) {
		eClass = e.currentTarget.className.replace(/checked/g, '');
		eClass.replace('click', '');
		e.currentTarget.className = eClass;
		element.checked = false;
	} else {
		if (element.type === "checkbox") {
			eClass = e.currentTarget.className.replace(/checked/g, '');
			eClass = eClass.trim();
			e.currentTarget.className = eClass + ' checked';
		} else {
			eClass = e.currentTarget.className.replace(/checked/g, '');
			eClass = eClass.trim();
			e.currentTarget.className = eClass + ' checked';
			group = element.name;
			for (i = 0; i < inputsLength; i += 1) {
				if (this.inputs[i].name === group && this.inputs[i] !== element) {
					eClass = this.customInputs[i].className.replace(/checked/g, '');
					eClass = eClass.trim();
					this.customInputs[i].className = eClass;
				}
			}  
		}
		element.checked = true;
	}
	eClass = e.currentTarget.className.replace(/click/g, '');
	eClass = eClass.trim();
	e.currentTarget.className = eClass;
};
CustomForm.prototype.customPushed = function (e) {
	var element = e.currentTarget.nextSibling,
		eClass = '';
	if (element.checked === true) {
		eClass = e.currentTarget.className.replace(/checked/g, '');
		eClass = eClass.trim();
		eClass += ' click';
		eClass = eClass.trim();
		e.currentTarget.className = eClass;
	} else {
		eClass = e.currentTarget.className.replace(/checked/g, '');
		eClass = eClass.trim();
		eClass += ' click checked';
		eClass = eClass.trim();
		e.currentTarget.className = eClass 
	}
}
CustomForm.prototype.choose = function (e) {
	var element = e.currentTarget,
		options = element.getElementsByTagName('option'),
		i = 0,
		len = 0,
		name = '',
		value = '',
		id = '',
		select = null;
	for (i = 0, len = options.length; i < len; i += 1) {
		if (options[i].selected === true) {
			name = e.currentTarget.name.replace(/\[/g, '_').replace(/\]/g, '_');
			value = options[i].text;
			id = 'select-' + name;
			select = document.getElementById(id);
			select.innerHTML = value;
		}
	}
};
CustomForm.prototype.customizeInputs = function () {
	var i = 0,
		len = 0,
		type = '',
		parent = null;
	for (i = 0, len = this.inputs.length; i < len; i += 1) {
		type = this.inputs[i].type;
		if (type === 'checkbox' || type === 'radio') {
			this.inputs[i].style.display='none';
			this.customInputs[i] = document.createElement('span');
			this.customInputs[i].className = type;
			if (this.inputs[i].checked === true) {
				this.customInputs[i].className += ' checked';
			}
			parent = this.inputs[i].parentElement;
			parent.insertBefore(this.customInputs[i], this.inputs[i]);
			this.inputs[i].onchange = $.proxy(this.clear, this);
			if (this.inputs[i].disabled === false) {
				/*$(this.inputs[i]).bind('mousedown', $.proxy(this.pushed, this));*/
				$(this.inputs[i]).bind('mouseup', $.proxy(this.check, this));
				$(this.customInputs[i]).bind('mousedown', $.proxy(this.customPushed, this));
				$(this.customInputs[i]).bind('mouseup', $.proxy(this.check, this));
			} else {
				this.customInputs[i].className += ' disabled';
			}
		}
	}
}
CustomForm.prototype.customizeSelects = function () {
	var i = 0,
		len = 0,
		option = null,
		label = '',
		cont = 0,
		contLen = 0,
		name = '',
		parent = null,
		height = 0,
		width = 0;
	for (i = 0, len = this.selects.length; i < len; i += 1) {
		this.selects[i].style.opacity = 0;
		this.selects[i].style.filter = 'alpha(opacity=0)';
		options = this.selects[i].getElementsByTagName('option');
		label = options[0].childNodes[0].nodeValue;
		textnode = document.createTextNode(label);
		for (cont = 0, contLen = options.length; cont < contLen; cont += 1) {
			if (options[cont].selected === true) {
				textnode = document.createTextNode(options[cont].childNodes[0].nodeValue);
			}
		}
		this.customSelects[i] = document.createElement('span');
		this.customSelects[i].className = 'select';
		name = this.selects[i].name.replace(/\[/g, '_').replace(/\]/g, '_');
		this.customSelects[i].id = 'select-' + name;
		this.customSelects[i].appendChild(textnode);
		parent = this.selects[i].parentElement;
		parent.insertBefore(this.customSelects[i], this.selects[i]);
		height = this.selects[i].offsetHeight;
		width = this.selects[i].offsetWidth;
		parent.style.position = 'relative';
		this.selects[i].style.position = 'absolute';
		this.selects[i].style.top = '0px';
		this.selects[i].style.left = '0px';
		this.customSelects[i].style.display = 'block';
		this.customSelects[i].style.height = height + 'px';
		this.customSelects[i].style.width = width + 'px';
		if (this.selects[i].disabled === false) {
			$(this.selects[i]).bind('change', $.proxy(this.choose, this));
		} else {
			this.selects[i].previousSibling.className += ' disabled';
		}
	}
}