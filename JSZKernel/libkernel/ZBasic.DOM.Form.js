//<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
//<html>
//<head>
//<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
//<script language="JavaScript" type="text/javascript">
//<!-- Vor nicht Javascript fähigen Browsern verbergen 

var frmCurrent=window.document.forms[0]; //Globale Variable, in die in einigen Funktionen das aktuelle Formular gesetzt wird.


function getFieldValue(objField) {

var sSeparator = '';
var sReturn    = '';
var bUIDoc     = (getFieldValue.arguments[1] != null) ? (getFieldValue.arguments[1] == true) : false;
var bAllValues = (getFieldValue.arguments[2] != null) ? (getFieldValue.arguments[2] == true) : false;

if (typeof(objField) == 'string')
objField = getObjectPtr((frmCurrent != null && typeof(frmCurrent) == 'object') ? frmCurrent : window.document.forms[0],objField);

if ((typeof(objField) != 'object') || (objField == null))
return '';

switch (((objField.length == null) || (objField.length == 0) || (typeof(objField[0].type) == 'undefined')) ? objField.type : objField[0].type) {
case "select-one" :
	if (bAllValues) {
for (var i=0; i<objField.length; i++) {
sReturn   += sSeparator;
sReturn   += (bUIDoc == true) ? objField.options[i].text : objField.options[i].value ;
sSeparator = '~';
}
	} else {
if (objField.selectedIndex > -1)
sReturn = (bUIDoc == true) ? objField.options[objField.selectedIndex].text : objField.options[objField.selectedIndex].value;
}


break;
case "radio" :
for (var i=0; i<objField.length; i++) {
if (objField[i].checked || bAllValues) {
sReturn   += sSeparator;
sReturn   += (bUIDoc == true) ? objField[i].text : objField[i].value; 
sSeparator = '~';
}
}
break;
case "checkbox" : 
if (objField.length == null) {
if (objField.checked)
sReturn = (bUIDoc == true) ? objField.text : objField.value;
} else {
for (var i=0; i<objField.length; i++) {
if (objField[i].checked || bAllValues) {
sReturn   += sSeparator;
sReturn   += (bUIDoc == true) ? objField.text : objField[i].value ;
sSeparator = '~';
}
}
}
break;
case "textarea" :
default:
sReturn = objField.value;
}

return sReturn;
}


function setFieldValue(objField,sNewValue) {

var bUIDoc = (setFieldValue.arguments[2] != null) ? (setFieldValue.arguments[2] == true) : false;

if (typeof(objField) == 'string')
objField = getObjectPtr(window.document.forms[0],objField);

if ((typeof(objField) != 'object') || (objField == null))
return false;

switch ((objField.length == null || typeof(objField.type) != 'undefined') ? objField.type : objField[0].type) {
case "radio" :
case "checkbox" :
for (var i=0 ; i<objField.length; i++) {
objField[i].checked = (bUIDoc == true) ? (objField[i].text == sNewValue) : (objField[i].value == sNewValue);
}
break;

case "select-one" :
for (var i=0 ; i<objField.length; i++) {
objField[i].selected = (bUIDoc == true) ? (objField[i].text == sNewValue) : (objField[i].value == sNewValue);
}
break;

case "textarea" :
default:
objField.value = sNewValue;
}

return true;
}

function getObjectPtr(frmCurrent,sObjectName) {

sObjectName = (typeof(sObjectName) != 'string') ? '' : sObjectName;
if ((typeof(frmCurrent) != 'object') || (frmCurrent == null) || (sObjectName == ''))
return null;
return frmCurrent.elements[sObjectName];

}

//Ende des Verbergens vor nicht javascript fähigen Browsern --></script>
//</head>
//</html>