var gServer       = location.protocol + '//' + location.hostname;
var isNS          = (navigator.appName == "Netscape");
var isDom		= (document.getElementById);
var gdbApp        = '/<Computed Value>';

var menu; 
var frmCurrent;
var layerRef      = (isNS) ? "document.layers" : "document.all";
var docRef        = (isNS) ? "document" : "document.all";
var styleRef      = (isNS) ? "" : ".style";
var topRef        = (isNS) ? ".top"  : ".top";
var leftRef       = (isNS) ? ".left" : ".left";
var eventX        = (isNS) ? "event.pageX" : "event.clientX";
var eventY        = (isNS) ? "event.pageY" : "event.y";
var offsetX       = (isNS) ? "0" : "event.offsetX - 4";
var offsetY       = (isNS) ? "0" : "event.offsetY - 2";

var cValidError   = 'Bei der Datenüberprüfung sind folgende Fehler aufgetreten:\n\n%1\n\nVersuchen Sie es bitte nach Fehlerbeseitigung erneut!'
var cValidWarning = '%1\n\nZur Fortsetzung der Aktion drücken Sie bitte <Ok>.'
var cFormatD0S0   = 'DD.MM.YYYY'
var cFormatT0S1   = 'HH:NN:SS'
var cFormatT1S1   = 'HH:NN'


function checkContext (bInvalid) {
var sOptions = (typeof(checkContext.arguments[1]) == 'string') ? checkContext.arguments[1] : ''; 
if ((bInvalid == null) && (parent != null)) {bInvalid = (parent.name != 'Application')}
if ((bInvalid == true) || (top.frames.length == 0))
{openURL(top,'ADMIN','home','?OpenFrameset&Login' + sOptions,true)} else {return true}
}


function showActions (bVisible) {
var arrActions = document.getElementsByName('Action')
for (var i = 0; i<arrActions.length; i++)
arrActions[i].disabled = (bVisible == false);
}


function showLayer(nameLayer, bVisible) {
/*
      if ((nameLayer.substring(0,6)=="metCur" 
      |nameLayer.substring(0,6)=="metGas"
      |nameLayer.substring(0,6)=="metWat")& nameLayer.substring(6)=="01"){
	   alert("showLayer(...)");
}*/

	//FLI 20091215 alte Version, basierte auf boolean Variable
var iInline  = (showLayer.arguments[2] != null) ? showLayer.arguments[2] : true;
var sInline="inline";
var bInline = false;
if(iInline<=0){
   bInline = true;
   sInline="";
}

/*
if ((nameLayer.substring(0,6)=="metCur" 
      |nameLayer.substring(0,6)=="metGas"
      |nameLayer.substring(0,6)=="metWat")& nameLayer.substring(6)=="01"){
	   alert("Für Layer " + nameLayer + " ist bVisible: " + bVisible + " und iInline=" + iInline);
}*/

   /*Zur Debugausgabe. Merke: im onclick-Event steht 'picker.close()', ohne diese Einschränkung würde die alert-box also bei jedem click angezeigt.
if(nameLayer!='Picker'){
	alert("domcfg.nsf, showLayer(): nameLayer='" + nameLayer + "'; bVisible='" + bVisible + "'");
}*/
	
if (isNS) {
//alert("Netscape");
	/*if ((nameLayer.substring(0,6)=="metCur" 
      |nameLayer.substring(0,6)=="metGas"
      |nameLayer.substring(0,6)=="metWat")& nameLayer.substring(6)=="01"){
		  alert("Für Layer " + nameLayer + " Style-Attribut: " + sInline);
	}*/
      
var objLayer = document.getElementById(nameLayer);
if (typeof(objLayer) != 'object' || objLayer == null){
   /*if ((nameLayer.substring(0,6)=="metCur" 
      |nameLayer.substring(0,6)=="metGas"
      |nameLayer.substring(0,6)=="metWat")& nameLayer.substring(6)=="01"){
		  alert("Fall: Mach Nix");
	   }*/
return;
}

if (bVisible == true) { 
		/*if ((nameLayer.substring(0,6)=="metCur" 
        	|nameLayer.substring(0,6)=="metGas"
         |nameLayer.substring(0,6)=="metWat")& nameLayer.substring(6)=="01"){
	      	  alert("Fall: Mach visible: " + sInline);
	      }*/

objLayer.style.visibility = "visible";
objLayer.style.display    = (bInline == false) ? "block" : sInline;
} else {
   /*if ((nameLayer.substring(0,6)=="metCur" 
        	|nameLayer.substring(0,6)=="metGas"
         |nameLayer.substring(0,6)=="metWat")& nameLayer.substring(6)=="01"){
	      	  alert("Fall: Mach hidden, else Fall");
	      }*/

objLayer.style.visibility = "hidden";
objLayer.style.display    = "none";
}
return objLayer;

}
else {
   //alert("Kein Netscape");
	var iInline  = (showLayer.arguments[2] != null) ? showLayer.arguments[2] : true;
var objLayer = document.all[nameLayer];

	/*Zur Debugausgabe. Merke: im onclick-Event steht 'picker.close()', ohne diese Einschränkung würde die alert-box also bei jedem click angezeigt.
	if(nameLayer!='Picker'){
		alert("domcfg.nsf, showLayer(): bInline='" + bInline + "', objLayer='" + objLayer + "'");
	}*/

	
if (typeof(objLayer) != 'object' || objLayer == null) return;
//{
//	alert("domcfg.nsf. showLayer(): nameLayer='" + nameLayer + "'; objLayer=document.all[nameLayer] ==> typeof(objLayer)='" + typeof(objLayer) + "' ==> will do return.");
//	return;
//}

if (bVisible == null)
bVisible = (objLayer.style.visibility == "hidden")

if (bVisible >= true) { //geändert von == zu >=
objLayer.style.visibility = "visible";

objLayer.style.display    = (bInline == false) ? "block" : "inline";
} else {
objLayer.style.visibility = "hidden";
objLayer.style.display    = "none";
}
return objLayer;
}
}


function showTab(newTab) {

// Hilfsvariablen
var objTab;

if (window.document.layers) {  // Abfrage, ob Netscape
// Code für Netscape
}
else {

// Aktuellen Reiter verstecken
if (curTab != '') { 
objTab = document.all['TAB_' + curTab]; // Reiter
(objTab == null) ? '' : objTab.style.backgroundColor   = "#dddddd";
(objTab == null) ? '' : objTab.style.borderBottomWidth = "2px";
(objTab == null) ? '' : objTab.style.marginTop         = "3px";
(objTab == null) ? '' : objTab.style.height            = "20px";
objTab = document.all[curTab];           // Inhalt
(objTab == null) ? '' : objTab.style.visibility        = "hidden";
(objTab == null) ? '' : objTab.style.display           = "none";
}

// Neuen Reiter anzeigen
if (newTab != '') { 
objTab = document.all['TAB_' + newTab]; // Reiter
(objTab == null) ? '' : objTab.style.backgroundColor   = "#ffffff";
(objTab == null) ? '' : objTab.style.borderBottomWidth = "0px"; 
(objTab == null) ? '' : objTab.style.marginTop         = "1px";
(objTab == null) ? '' : objTab.style.height            = "22px";
objTab = document.all[newTab];           // Inhalt
(objTab == null) ? '' : objTab.style.visibility        = "visible";
(objTab == null) ? '' : objTab.style.display           = "block";
}
}

// Aktuellen Reiter merken
curTab = newTab;

} // showTab


function showCategory(sInput) {
var bCatExpand = (showCategory.arguments[1] != null) ? showCategory.arguments[1] : null;
var iMaxLevel  = (showCategory.arguments[2] != null) ? showCategory.arguments[2] : 0 ;
iMaxLevel      = (typeof(iMaxLevel) == 'number' &&  iMaxLevel > 0) ? iMaxLevel + sInput.split('.').length : 0;

// get and check table rows
var sCategory  = (sInput == '@ALL') ? '' : sInput + '.';
var objArrLines = document.getElementsByTagName('tr');
for(var i=0; i < objArrLines.length; i++) {	

// category match ?
if (sCategory == '' || objArrLines[i].id.indexOf(sCategory) == 0) {
if (bCatExpand != true && objArrLines[i].style.visibility == "visible") {
bCatExpand = false;
objArrLines[i].style.visibility="hidden";
objArrLines[i].style.display   ="none";
} else if (bCatExpand != false && objArrLines[i].style.visibility == "hidden") {
if (iMaxLevel == 0 || objArrLines[i].id.split('.').length <= iMaxLevel) {
bCatExpand = true;
objArrLines[i].style.visibility="visible";
objArrLines[i].style.display   ="inline";
}
}
}

}
}



function makeStatic() {
var dInterval = (makeStatic.arguments[0] != null) ? makeStatic.arguments[0] : 0;
if (document.all) {
docHeader.style.pixelTop=document.body.scrollTop;
if (typeof(tblHeader) == 'object') {
tblHeader.style.pixelTop = docHeader.offsetTop + docHeader.offsetHeight;
docHeader.style.width    = tblHeader.offsetWidth;
}
} else {
eval(document.docHeader.top=eval(window.pageYOffset));
}
if (isNaN(dInterval) || (dInterval < 0))
return;
setTimeout("makeStatic()",dInterval);
}



function getObjectPtr(frmCurrent,sObjectName) {

sObjectName = (typeof(sObjectName) != 'string') ? '' : sObjectName;
if ((typeof(frmCurrent) != 'object') || (frmCurrent == null) || (sObjectName == ''))
return null;
return frmCurrent.elements[sObjectName];

}


function checkFieldContent (sFieldName) {

  // Get field and content
  var objField = getObjectPtr(window.document.forms[0],sFieldName);
  if (typeof(objField) != 'object')
    return false;
  var sContent = getFieldValue(objField);

  // Check content
  if (checkFieldContent.arguments.length < 2)
    return (sContent == '');
  for (var i=1; i<checkFieldContent.arguments.length; i++)
    if (checkFieldContent.arguments[i] == sContent) 
      return true;

  return false;

}


function restrictFieldValues (objField, sOld) {

	// Get current field value
	var sCur   = getFieldValue(objField); 
	var sDiff1 = getDiff (sOld,sCur,'~');
	var sDiff2 = getDiff (sCur,sOld,'~');
	var bEmpty = (restrictFieldValues.arguments[2] != null) ? restrictFieldValues.arguments[2] == true : false ;
	
	if (bEmpty && sCur == '') {
		setFieldValue(objField,'');return false;
	}
	if (sDiff1 != '') {
		setFieldValue(objField,sDiff1);return false;
	} else {
		setFieldValue(objField,sDiff2);return true;
	}
	
}


function getDiff (sInput1, sInput2, sSeparator) {

	// check arguments
	if (typeof(sInput1) != 'string' || typeof(sInput2) != 'string' || typeof(sSeparator) != 'string')
		return null;
	
	// initialize variables
	var sTemp   = '';
	var sReturn = '';
	var sSearch = sSeparator + sInput2 + sSeparator;
	
	// loop through values 1
	var sArr = sInput1.split(sSeparator)
	for (var i=0; i < sArr.length; i++) {
		if (sSearch.indexOf(sSeparator + sArr[i] + sSeparator) == -1) {
			sReturn += sTemp + sArr[i];
			sTemp    = sSeparator;
		}
	}
	
	// 
	return sReturn;
}


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


function setFields (bReset,bChange) {

// Declaration
var vField;
var vValue;
var bValid;
var iCount = 2;
var objField = null;

// Evaluate arguments
do {

// Get argument values
vField = setFields.arguments[iCount++];
vValue = setFields.arguments[iCount++];
bValid = (vField != null && vValue != null);

// Valid arguments
if (bValid) {
objField = getObjectPtr(window.document.forms[0],vField);
if (bChange == true && ((bReset == true) ? getFieldValue(objField) != '' : getFieldValue(objField) == ''))
setFieldValue(objField,vValue);
}
   
} while (bValid)

}


function setDTFields(bReset,vField) {

// Declaration
var sField;

// Prepare field name
sField = vField.name.replace(/Date|Time/,'%1')
if (sField.search(/%1/) != -1) {
setFields(bReset,vField.value == '',
sField.replace(/%1/,'Date'),((bReset == true) ? '' : formatDateTime(new Date(),cFormatD0S0)),
sField.replace(/%1/,'Time'),((bReset == true) ? '' : formatDateTime(new Date(),cFormatT1S1))
)
}

// Prepare field name
sField = vField.name.replace(/DATE|TIME/,'%1')
if (sField.search(/%1/) != -1) {
setFields(bReset,vField.value == '',
sField.replace(/%1/,'DATE'),((bReset == true) ? '' : formatDateTime(new Date(),cFormatD0S0)),
sField.replace(/%1/,'TIME'),((bReset == true) ? '' : formatDateTime(new Date(),cFormatT1S1))
)
}

// Select field
if (bReset == false) vField.select()
}


function getDatabase (sDatabase) {

// parameter valid
if (typeof(sDatabase) != 'string')
return null;

// init return value
var sReturn = sDatabase.toLowerCase();

// parameter is database key
if (sDatabase.toLowerCase().indexOf('.nsf') == -1) {
var sKeyName = 'gdb' + sDatabase.toUpperCase();
var sMacro   = "(typeof(" + sKeyName + ") == 'string') ? " + sKeyName + " : null;";
var sResult  = eval(sMacro);
if (typeof(sResult) != 'string')
return '';
sReturn = sResult.toLowerCase();
} else {
sReturn = sDatabase.toLowerCase().split('.nsf')[0] + '.nsf'
}


if (sReturn.indexOf('://') == -1)
sReturn = location.protocol + '//' + location.hostname + '/' + sReturn

return sReturn;

}



function openControl(objControl,sStyle,bMultiValue,sTrigger,sarrMapping) {

var sURL    = '';
var bReopen = true;

// check arguments
if (objControl == null || typeof(objControl) != 'object') 
return false;

// set mapping
window.mapControl = sarrMapping;

// is initialized?
if (objControl.location.href.toLowerCase().indexOf(sTrigger.toLowerCase()) == -1) {

// new url
bReopen = false;

// initialize url => remove old content
objControl.document.open();
objControl.document.write('');
objControl.document.close();

// get control url

switch (sStyle.toUpperCase()) {
case "PICK_CITY" :
sURL = (openControl.arguments[5] != null) ? openControl.arguments[5] : '';
sURL = getDatabase('REP_SITE') + '/pick_CITY$All?OpenView&Count=10000' + sURL;break;
case "PICK_STREET" :
sURL = (openControl.arguments[5] != null) ? openControl.arguments[5] : '';
sURL = getDatabase('REP_SITE') + '/pick_STREET$All?OpenView&Count=10000' + sURL;break;
case "PICK_STREET_IN_CITY" :  
sURL = (openControl.arguments[5] != null) ? openControl.arguments[5] : '';
sURL = getDatabase('REP_SITE') + '/pick_STREET$AllByCity?OpenView&Count=99999&RestrictToCategory=' + sURL;break;
case "PICK_FLC" :
sURL = (openControl.arguments[5] != null) ? openControl.arguments[5] : '';
sURL = getDatabase('REP_SAP') + '/pick_FLC$ALL?OpenView&Count=10000&RestrictToCategory=' + sURL;break;
case "PICK_NDB" :
sURL = (openControl.arguments[5] != null) ? openControl.arguments[5] : '';
sURL = getDatabase('APP_SSM') + '/pick_NETDATA$Select?OpenView&Count=10000&RestrictToCategory=' + sURL;break;
case "PICK_MSG" :
sURL = (openControl.arguments[5] != null) ? openControl.arguments[5] : '';
sURL = getDatabase('REP_SAP') + '/pick_MSG$ALL?OpenView&Count=10000&RestrictToCategory=' + sURL;break;
case "PICK_MSGSYS" :
sURL = (openControl.arguments[5] != null) ? openControl.arguments[5] : '';
sURL = getDatabase('REP_SAP') + '/pick_MSG$SYS?OpenView&Count=10000&RestrictToCategory=' + sURL;break;
case "PICK_CCTR" :
sURL = getDatabase('REP_SAP') + '/pick_CCTR$ALL?OpenView&Count=10000';break;
case "PICK_COSTCTR" :
sURL = getDatabase('REP_SAP') + '/pick_COSTCTR$ALL?OpenView&Count=10000';break;
case "PICK_UTILITIES" :
sURL = (openControl.arguments[5] != null) ? openControl.arguments[5] : '';
sURL = getDatabase('REP_SAP') + '/pick_UTILITIES$ALL?OpenView&Count=10000&RestrictToCategory=' + sURL;break;
// MWG 12/2006. Zur Auswahl von Ressourcen aus Admin.DB
case "PICK_RESRC" :  
sURL = (openControl.arguments[5] != null) ? openControl.arguments[5] : '';
sURL = getDatabase('ADMIN') + '/pick_RESRC$ByID?OpenView&Count=10000&RestrictToCategory=' + sURL; break;
}

}

// show control
showLayer('layer' + objControl.name,true);

// load frame content
if (sURL != '')
objControl.location.href = sURL;

// set focus for 'onBlur' event
objControl.focus();

// reinit control ?
if (bReopen)
if (objControl.initControl != null)
objControl.initControl();

}


function openDialog (sStyle, sDatabase, sArgument) {

var sURL   = "";
var sDocID = "";

sURL = getDatabase(sDatabase);

switch (sStyle.toUpperCase()) {
case "PICK_STREET" :
sURL = sURL + '/pick_STREET$All?OpenView&Count=10000'
	top.winDialog = openWindow(top.winDialog,sURL,'Dialog','width=275,height=310,scrollbars=no',true);
top.winDialog.onOkay = new Function ("onOkay","gtblReturn.restore();gtblReturn.display()");
break;
case "OPENDOC" :
sURL         += (arguments[1] == null) ? '' : arguments[1] + '?OpenDocument';
top.winNewDoc = openWindow(top.winNewDoc,sURL,'NewDoc','left=50,top=20,width=680,height=550,scrollbars=yes, menubar=no',true);
break;
case "OPEN" :
	sURL		 += '/' + sArgument;
top.winNewDoc = openWindow(top.winNewDoc,sURL,'NewDoc','left=50,top=20,width=680,height=550,scrollbars=yes, menubar=no',true);
break;
  }
}



function openWindow (objWin,sURL,sTitle,sStyle,bFocus)  {
// Fenster noch offen => schliessen
if (objWin != null)
if (objWin.closed != true)
objWin.close(); 

// Fenster öffnen
objWin = window.open(sURL,sTitle,sStyle);

// Fokus dem Fenster zuweisen
if (bFocus == true)
objWin.focus();
return objWin;
}


function openMenu(menuID,event) {

  // Correction coordinates defined?
  var corrX = (typeof(arguments[2]) == 'number') ? arguments[2] : 0;
  var corrY = (typeof(arguments[3]) == 'number') ? arguments[3] : 0;

  // Set layer attributes
  eval(docRef + '["' + menuID + '"]' + styleRef +  topRef + ' = ' + eventY + "-" + offsetY + "+" + corrY);
  eval(docRef + '["' + menuID + '"]' + styleRef + leftRef + ' = ' + eventX + "-" + offsetX + "+" + corrX);
  eval(docRef + '["' + menuID + '"]' + styleRef + '.visibility = "visible"');

  // Workaround Netscape
  if (isNS)
    eval (docRef + '.' + menuID + '.onmouseout = function (event) {this.visibility = "hide";};');
  return true;

}



function openURL (objTarget, sDatabase, sObject, sArguments) {

// check arguments
var sURL 	= getDatabase(sDatabase);
var bReplace   = openURL.arguments[4];
if (sURL 	== null || sURL == '') return false;
if (objTarget 	== null || typeof(objTarget) != 'object') return false;

// compute url
sURL += '/' + sObject;
sURL += sArguments;

// check document domain
if (objTarget.document.domain != window.document.domain) 
alert('Dokument-Domains zwischen Ursprung und Ziel sind unterschiedlich')

// encode special characters
//if (encodeURI != null) {
//sURL = encodeURI(sURL)
//}

// load frame content
if (bReplace == true) {
	objTarget.location.replace(sURL);
} else {
objTarget.location.href = sURL
}
}



function setHTML(docCurrent,sName,sHTML) {

// Create HTML code
if (isNS == true) {
// Get layer object
var i = docCurrent.lastIndexOf('document');

var objLayer = eval('window.document.getElementById("'+sName+'")');

// Insert HTML code
if (typeof(objLayer) == 'object' && objLayer != null)
objLayer.innerHTML = (sHTML == '') ? null : sHTML ;
}
else {
// Get layer object
var objLayer = eval(docCurrent + ".all." + sName);

// Insert HTML code
if (typeof(objLayer) == 'object')
objLayer.innerHTML = sHTML;
  }
}


function prepareRegExp (sInput) {

// Declaration
var cRegChars = '+?.*^$()[]{}|\\';
var sReturn   = '';

// valid argument
if (typeof(sInput) == 'string') {	
for (i=0; i < sInput.length; i++) {
sReturn += (cRegChars.indexOf(sInput.charAt(i)) < 0) ? sInput.charAt(i) : '\\' + sInput.charAt(i);
}
}

// result
return sReturn;
}


function replaceData (sTag,sData,sReplace) {

// Check arguments
sTag     = (typeof(sTag)     == 'string') ? sTag     : '';
sData    = (typeof(sData)    == 'string') ? sData    : '';
sReplace = (typeof(sReplace) == 'string') ? sReplace : '';

// Invalid data tag => exit 
if (sTag == '')
return sData;

// Prepare variables
var sFormat = (replaceData.arguments[3] != null) ? replaceData.arguments[3] : '||ID#';
var sEndTag = sFormat.slice(0,sFormat.indexOf('ID'));
var sSearch = sFormat.replace(/ID/,sTag.toUpperCase());
var iPos    = sData.indexOf(sSearch);
var sReturn = sData;
var sTemp   = '';

// Search succeed => replace data value
if (iPos >= 0) {
sReturn  = sData.slice(0,iPos + sSearch.length);
sTemp    = sData.slice(iPos + sSearch.length);
iPos     = sTemp.indexOf(sEndTag);
sReturn += sReplace;
sReturn += (iPos < 0) ? '' : sTemp.slice(iPos);
}
else { // Else => append data value
sReturn += (sData == '') ? sSearch : (sTag.toUpperCase() + '#');
sReturn += sReplace + sEndTag;
}

// Return new data value;
return sReturn;
}


function getData (sTag,sData) {

// Check arguments
sTag  = (typeof(sTag)  == 'string') ? sTag  : '';
sData = (typeof(sData) == 'string') ? sData : '';

// Invalid data tag => exit 
if (sTag == '')
return sData;

// Get data format and prepare data tag 
var sFormat  = (getData.arguments[2] != null) ? getData.arguments[2] : '||ID#';
var sEndTag  = sFormat.slice(0,sFormat.indexOf('ID'));
var sSearch  = sFormat.replace(/ID/,sTag.toUpperCase());
var iPos     = sData.indexOf(sSearch);
var sReturn  = '';

// Data tag found => get data value
if (iPos >= 0) {
sReturn = sData.slice(iPos + sSearch.length)+sEndTag;
iPos    = sReturn.indexOf(sEndTag);
sReturn = sReturn.slice(0,iPos);
}
return sReturn;
}



function CDat (vInput) {

// check parameter type
switch (typeof(vInput)) {
case 'string' :

// initialize variables
var datNow = new Date();
var vResult;
var vArrValue = new Array(false,1900,1,1,0,0,0);
    
// search date components
vResult = vInput.match(/^(\d{1,2})(\/|-|\.)(\d{1,2})\2(\d{2,4})/);
if (vResult != null) {
vArrValue[0] = true;
vArrValue[1] = Math.abs(parseInt(vResult[4],10));
vArrValue[2] = Math.abs(parseInt(vResult[3],10));
vArrValue[3] = Math.abs(parseInt(vResult[1],10));
} else {
vResult = vInput.match(/^(\d{1,2})(\/|-|\.)(\d{1,2})/);
if (vResult != null) {
vArrValue[0] = true;
vArrValue[1] = datNow.getFullYear();;
vArrValue[2] = Math.abs(parseInt(vResult[3],10));
vArrValue[3] = Math.abs(parseInt(vResult[1],10));
}
}

// search time components
vResult = vInput.match(/(\d{1,2})(:)(\d{1,2})(:)(\d{1,2})/);
if (vResult == null) vResult = vInput.match(/(\d{1,2})(:)(\d{1,2})/);
if (vResult != null) {
vArrValue[0] = true;
vArrValue[4] = Math.abs(parseInt(vResult[1],10));
vArrValue[5] = Math.abs(parseInt(vResult[3],10));
if (isNaN(vResult[5]) == false) vArrValue[6] = Math.abs(parseInt(vResult[5],10));
} else {
vResult = vInput.match(/^(\d{1,4})$/);
if (vResult != null) {
vArrValue[0] = true;
vArrValue[4] = Math.floor(parseInt(vResult[1],10) / 100);
vArrValue[5] = Math.abs  (parseInt(vResult[1],10) % 100);
}

}

// correct year and month value
vArrValue[1] += (vArrValue[1] < 100) ? 2000 : 0;
vArrValue[2] += (vArrValue[2] >   0) ?   -1 : 0;

// return result date
return (vArrValue[0] == false) ? null : new Date(vArrValue[1],vArrValue[2],vArrValue[3],vArrValue[4],vArrValue[5],vArrValue[6]);
break;

case 'object' :
if (vInput.toLocaleString != null)
return vInput;
break;
}

}


function formatNumber(vValue,sFormat) {

// Declaration
var sZero    = '0000000000000000000000000000000000000000';
var sCross   = '########################################';
var sSearch  = /(#*0*)(\.)(0*#*)|(#*0+|#+)/g;
var sValue   = vValue + '';
var dValue   = parseFloat(sValue.replace(/,/,'.'));
var sDefault = (arguments.length > 1) ? arguments[2] + '' : '';
var dDefault = parseFloat(sDefault.replace(/,/,'.'));
var vFormat  = sSearch.exec(sFormat);

// Workaround für Netscape Bug
vFormat = (vFormat == null) ? sSearch.exec(sFormat) : vFormat;
dValue  = (isNaN(dValue)) ? dDefault : dValue;
if ((vFormat != null) && (isNaN(dValue) == false)) {

var sInteger = (vFormat[4] == null || vFormat[4] == '') ? vFormat[1] : vFormat[4]; 
var sPoint   = (vFormat[2] == null) ? '' : vFormat[2]; 
var sFractal = (vFormat[3] == null) ? '' : vFormat[3];

var dReturn  = Math.round(dValue * Math.pow(10,sFractal.length));
var sSign    = (dReturn < 0) ? '-' : '';
var sReturn  = (dReturn < 0) ? -1*dReturn+'' : dReturn+'';

var iDiff    = sInteger.length + sFractal.length - sReturn.length;
if (iDiff < 0) 
return sCross.slice(0,sInteger.length) + sPoint + sCross.slice(0,sFractal.length);

sReturn = sZero.slice(0,iDiff) + sReturn; 
sReturn = sReturn.slice(0,sInteger.length) + sPoint + sReturn.slice(sInteger.length);
for (var iStart=0; iStart<sInteger.length; iStart++)

if ((sInteger.charAt(iStart) == '0') || (sReturn.charAt(iStart) != '0'))
break; 

for (var iEnd=1; iEnd<sFractal.length; iEnd++) {
if ((sFractal.charAt(sFractal.length-iEnd) == '0') || (sReturn.charAt(sReturn.length-iEnd) != '0'))
break;
}

return sSign + sReturn.slice(iStart,sReturn.length-iEnd+1);

}

return '';

}


function formatDateTime (vInput,sFormat) {

// initialize variables
var sReturn   = sFormat;
var vArrParts = new Array ();
var vDateTime = CDat(vInput);

// convert failure
if (vDateTime == null) 
return '';  

// get date/time components
vArrParts[0] = vDateTime.getYear() + ((vDateTime.getYear()<100) ? 1900 : 0);
vArrParts[1] = vDateTime.getMonth()+1;
vArrParts[2] = vDateTime.getDate();
vArrParts[3] = vDateTime.getHours();
vArrParts[4] = vDateTime.getMinutes();
vArrParts[5] = vDateTime.getSeconds();

// format date/time components
sReturn = sReturn.replace(/YYYY/g,vArrParts[0]);
sReturn = sReturn.replace(/MM/g,((vArrParts[1] < 10) ? '0' : '') + vArrParts[1]);
sReturn = sReturn.replace(/DD/g,((vArrParts[2] < 10) ? '0' : '') + vArrParts[2]);
sReturn = sReturn.replace(/HH/g,((vArrParts[3] < 10) ? '0' : '') + vArrParts[3]);
sReturn = sReturn.replace(/NN/g,((vArrParts[4] < 10) ? '0' : '') + vArrParts[4]);
sReturn = sReturn.replace(/SS/g,((vArrParts[5] < 10) ? '0' : '') + vArrParts[5]);

// return value 
return sReturn;
 
}


function getWindowSize (objWin) {
var vReturn = new Array(0,0)
if (typeof(objWin) == 'object' && objWin != null)  {
if (objWin.innerWidth) {
vReturn[0] = objWin.innerWidth;
vReturn[1] = objWin.innerHeight;
} else { 
if (objWin.document.body && objWin.document.body.offsetHeight) {
vReturn[0] = objWin.document.body.offsetWidth;
vReturn[1] = objWin.document.body.offsetHeight;
}
}

}
return vReturn;
}


function getObjectPos (objElemRef) {
var objElem = objElemRef;
var vCoord  = new Array(0,0);
while (typeof(objElem) == 'object' && objElem != null) {
vCoord[0] += (objElem.offsetLeft != null) ? objElem.offsetLeft : 0 ;
vCoord[1] += (objElem.offsetTop  != null) ? objElem.offsetTop  : 0 ;
objElem = objElem.offsetParent;
}
return vCoord;
}


function applyMapping(arrMapping,sData,vTarget) {

// Declaration
var sSource;
var sTarget;
var sAction;
var iPosition;

// Parameter check
if ((typeof(arrMapping) != 'object') && (typeof(sData) != 'string'))
return false;

// Loop all mapping definitions
for (var i=0; i<arrMapping.length; i++) {
	// Search first blank => if unavailable, continue with next loop  
	iPosition = arrMapping[i].indexOf(cSeparatorTag);
	if (iPosition < 0)
	continue;

	// Get source and target
	sSource = arrMapping[i].slice(0,iPosition);
	sTarget = arrMapping[i].slice(iPosition+1);
	iPosition = sTarget.indexOf(cSeparatorTag);
	if (iPosition < 0) {
		sSource = getData(sSource,sData)
	} else {
		sSource = eval(sTarget.slice(iPosition+1))
		sTarget = sTarget.slice(0,iPosition)
	}
	if(sSource!= '&nbsp;' ){
		setFieldValue(vTarget,sTarget,sSource);
	}
}
}


function applyFieldExchange(arrMapping,vSourceRef,vTargetRef) {

// Declaration
var sArrData;
var sSource;
var sTarget;
var sAction;
var iPosition;

// Parameter check
if ((typeof(arrMapping) != 'object') || (typeof(vSourceRef) != 'object') || (typeof(vTargetRef) != 'object'))
return false;

// Loop all mapping definitions
for (var i=0; i<arrMapping.length; i++) {
// split exchange definition
sArrData = arrMapping[i].split(' ');

// get direction
switch (sArrData[0]) {
case '=>' : vSource = vSourceRef; vTarget = vTargetRef; break;
case '<=' : vSource = vTargetRef; vTarget = vSourceRef; break;
default   : continue;
}

// Get source and target
sTarget = sArrData[1];
sSource = sArrData.slice(2,sArrData.length).join(' ');

// Set current form and result
frmCurrent = vSource;
setFieldValue(getObjectPtr(vTarget,sTarget),eval(sSource))
}
}



function setCookie (name, value, expires, path, domain, secure) {

var curCookie = "";

// Define cookie
curCookie += name + "=" + escape(value);
curCookie += (expires) ? "; expires=" + expires.toGMTString() : "";
curCookie += (path)    ? "; path=" + path : "";
curCookie += (domain)  ? "; domain=" + domain : "";
curCookie += (secure)  ? "; secure" : "";

// Set cookie
document.cookie = curCookie;

}


function getCookie (sName) {

// Prepare cookie name
var sPrefix = sName + "=";

// Search start position
var iPosStart = document.cookie.indexOf(sPrefix);
if (iPosStart == -1) 
return null;

// Search end position
var iPosEnd = document.cookie.indexOf(";", iPosStart + sPrefix.length);
if (iPosEnd == -1)
iPosEnd = document.cookie.length;

return unescape(document.cookie.substring(iPosStart + sPrefix.length, iPosEnd));

}


function getText(sTextKey) {

// Declaration
var sArrText = null;
var sReturn  = sTextKey; 

// Search current document and header frame if necessary
sArrText = window.gsArrText;
if ((parent.Header != null) && (typeof(sArrText) != 'object'))
sArrText = parent.Header.gsArrText;
if ((opener != null) && (typeof(sArrText) != 'object'))
if (opener.parent.Header != null)
sArrText = opener.parent.Header.gsArrText;

// Array available
if (typeof(sArrText) != 'object') {
sReturn = sTextKey;
} else {
sReturn = (sArrText[sTextKey] == null) ? 'Unbekannter Fehler ('+sTextKey+')' : sArrText[sTextKey];
}

// Search message and insert values if necessary 
for (var i=1; i<getText.arguments.length; i++)
if (typeof(getText.arguments[i]) == 'string')
sReturn = sReturn.replace(eval('/%'+i+'/g'),getText.arguments[i]);

return sReturn;

}


function validateDocument () {
  
// Declaration
var sRule = '';
var sText = '';
var sType = '';
var sMsg  = '';
var sID   = '';
var iLvl  =  0;

// Rules available
if (typeof(gsArrRules) != 'object')
return true;

// Activity Complete in progress
var ActivityComplete = (getFieldValue('WebQueryOS').search(/&action=Complete/) != -1);

// Process all validation rules
for (var i=0; i<gsArrRules.length; i++) {

// Expand definition string
sRule = getData('RULEJS',gsArrRules[i],'|||ID#');
sText = getData('TEXT',  gsArrRules[i],'|||ID#');
sType = getData('TYPE',  gsArrRules[i],'|||ID#');
sID   = getData('ID',    gsArrRules[i],'|||ID#')
if ((sRule != '') && (sType != '') && (sText != '')) {

// Evaluate condition
if (eval(sRule) == true) {

// Append message text
sText = (sID == '') ? sText : getText(sID);
if (sType == 'C') {
   //FLi 20081107 alert("C:"+sRule);
sMsg  = sText;
iLvl  = 3;
break;
} 
else if ((sType == 'E') && (iLvl <= 2)) {
   //FLi 20081107 alert("E:"+sRule);
sMsg += ((iLvl == 2) ? '\n' : '') + '- ' + sText;
iLvl  = 2;
}
else if ((sType == 'W') && (iLvl <= 1)) {
   //FLi 20081107 alert("W:"+sRule);
sMsg += ((iLvl == 1) ? '\n' : '') + sText;
iLvl  = 1;
}
}
}
}

// Display message
switch (iLvl) {
case 1 :
sMsg = getText(cValidWarning,sMsg);
return confirm(sMsg);
break;
case 2 :
sMsg = getText(cValidError,sMsg);    
case 3 : 
alert(sMsg);
return false;
}

// Document without errors
return true;

}



// Allgemeine Feldvalidierung über Java Script
// Global Variablen
var checkObjects    = new Array();
var errors          = "";
var returnVal       = false;
var note1           = "You have to fill in ";
var note2           = " the following fields:\n";
var language        = new Array();

language["header"]  = "False entry:"
language["start"]   = "->";
language["field"]   = " Field '";
language["require"] = "' has to be filled in";
language["min"]     = " and should contain ";
language["max"]     = " to ";
language["minmax"]  = " to ";
language["chars"]   = " character.";
language["num"]     = " a numerical value";
language["email"]   = "' a mail address";

// -----------------------------------------------------------------------------
// define   - Diese Funktion am Anfang der Seite aufrufen. Beispiel : onLoad.
//            Darf nur einmal pro Feld aufgerufen werden, da sonst doppelte Einträge erscheinen !
// n        = name des Eingabefelds(Erforderlich)
// type     = string, num, email, select (Erforderlich)
// HTMLname = Name, der in der Fehlermeldung angezeigt werden soll
// min      = der Wert muss mindestens  [min] Zeichen enthalten (Optional)
// max      = der Wert kann maximal [max] Zeichen enthalten (Optional)
// d        = (Optional) (Context, z.B. document)
// opt      = 'optional' bei Kann-Feldern, 'mandatory' bei Muss-Feldern
// -----------------------------------------------------------------------------

function test() {alert("Test"); return true;}

function define(n, type, HTMLname, min, max, d, opt) {
var p;
var i;
var x;
if (!d) d = document;
if ((p=n.indexOf("?"))>0&&parent.frames.length) {
d = parent.frames[n.substring(p+1)].document;
n = n.substring(0,p);
}
if (!(x = d[n]) && d.all) x = d.all[n];
for (i = 0; !x && i < d.forms.length; i++) {
x = d.forms[i][n];
}
for (i = 0; !x && d.layers && i < d.layers.length; i++) {
x = define(n, type, HTMLname, min, max, d.layers[i].document);
return x;
}
eval("V_"+n+" = new formResult(x, type, HTMLname, min, max, opt);");
checkObjects[eval(checkObjects.length)] = eval("V_"+n);
}

function formResult(form, type, HTMLname, min, max, opt) {
this.form = form;
this.type = type;
this.HTMLname = HTMLname;
this.opt = opt;
this.min  = min;
this.max  = max;
}

function validate(MaxErrors) {
var iErr = 0;
var sTemp = "";
if (!MaxErrors) {MaxErrors = 0;}
if (checkObjects.length > 0) {
errorObject = "";
for (i = 0; i < checkObjects.length; i++) {
validateObject = new Object();
validateObject.form = checkObjects[i].form;
validateObject.HTMLname = checkObjects[i].HTMLname;
validateObject.val = checkObjects[i].form.value;
validateObject.len = checkObjects[i].form.value.length;
validateObject.min = checkObjects[i].min;
validateObject.max = checkObjects[i].max;
validateObject.type = checkObjects[i].type;
validateObject.opt = checkObjects[i].opt;
if (validateObject.type == "num" || validateObject.type == "string") {
if (validateObject.opt == "optional") { bCheckObject = false || validateObject.len > 0} else {bCheckObject = true};
if ((validateObject.type == "num" && validateObject.len <= 0 && bCheckObject) || (validateObject.type == "num" && isNaN(validateObject.val))) 
  { ++iErr; errors += language['start'] + language['field'] + validateObject.HTMLname + language['require'] + language['num'] + "\n";
  } else if (validateObject.min && validateObject.max && (validateObject.len < validateObject.min || validateObject.len > validateObject.max) && bCheckObject) 
  { ++iErr; errors += language['start'] + language['field'] + validateObject.HTMLname + language['require'] + language['min'] + validateObject.min + language['minmax'] + validateObject.max+language['chars'] + "\n";
  } else if (validateObject.min && !validateObject.max && (validateObject.len < validateObject.min)) 
  { ++iErr; errors += language['start'] + language['field'] + validateObject.HTMLname + language['require'] + language['min'] + validateObject.min + language['chars'] + "\n";
  } else if (validateObject.max && !validateObject.min &&(validateObject.len > validateObject.max)) 
  { ++iErr; errors += language['start'] + language['field'] + validateObject.HTMLname + language['require'] + language['max'] + validateObject.max + language['chars'] + "\n";
  } else if (!validateObject.min && !validateObject.max && validateObject.len <= 0 && bCheckObject) 
  {++iErr; errors += language['start'] + language['field'] + validateObject.HTMLname + language['require'] + "\n";
  }
  } else if(validateObject.type == "email") {
// Prüft die Existenz von "@" und ".".
// Länge von min >= 5 und der "."
if ((validateObject.val.indexOf("@") == -1) || (validateObject.val.charAt(0) == ".") || (validateObject.val.charAt(0) == "@") || (validateObject.len < 6) || (validateObject.val.indexOf(".") == -1) || (validateObject.val.charAt(validateObject.val.indexOf("@")+1) == ".") || (validateObject.val.charAt(validateObject.val.indexOf("@")-1) == ".")) 
  { ++iErr; errors += language['start'] + language['field'] + validateObject.HTMLname + language['email'] + "\n"; }
 } else if(validateObject.type == "select") {
nIndex = validateObject.form.options.selectedIndex;
if (nIndex < 0)
  { ++iErr; errors += language['start'] + language['field'] + validateObject.HTMLname + language['require'] + "\n"; }
else if (validateObject.form.options[nIndex].text == "")
 {++iErr; errors += language['start'] + language['field'] + validateObject.HTMLname + language['require'] + "\n"; }
 }
}
}
if (iErr > MaxErrors) 
   {if (errors) 
     {  
     if (MaxErrors) 
	{sTemp = note1 + String(MaxErrors) + note2;
 	 for (i = 0; i < checkObjects.length; i++) {sTemp+= checkObjects[i].HTMLname + "\n";}
	 sTemp += "\n";
	}
     alert(sTemp + language["header"].concat("\n" + errors));
     errors = "";
     returnVal = false;
     return false;} 
   else 
    {returnVal = true;
     return true;}
  }
else 
  {returnVal = true;
   return true;
  }
}

// Script by Thomas Stich
// http://www.stichpunkt.de/beitrag/popup.html
// use it if you like it
// 
// <a href="html-or.jpg" onclick="return popup(this,123,456)" title="..."
// or
// <a href="html-or.jpg" onclick="return popup(this)" title="..."

/* Deaktiviert, weil nicht debuggbar
var pop = null;

function popdown() {
  if (pop && !pop.closed) pop.close();
}

function popup(obj,w,h) {
  var url = (obj.getAttribute) ? obj.getAttribute('href') : obj.href;
  if (!url) return true;
  w = (w) ? w += 20 : 150;  // 150px*150px is the default size
  h = (h) ? h += 25 : 150;
  var args = 'width='+w+',height='+h+',resizable, scrollbars';
  popdown();
  pop = window.open(url,'',args);
  return (pop) ? false : true;
}

window.onunload = popdown;
window.onfocus = popdown;
*/
