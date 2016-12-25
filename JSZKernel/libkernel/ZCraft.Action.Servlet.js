//<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
//<html>
//<head>
//<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
//<script language="JavaScript" type="text/javascript">
//<!-- Vor nicht Javascript fähigen Browsern verbergen 

/*Funktionen rufen ein Servlet auf, das dann die gewünschte Aktion durchführt.
   Die Java Klasse heisst momentan use.via.server.module.action.ServletActionExecuteVIA.class und ist in der Datei servlet.properties auf diesen URL Namen gemappt: "VIAExecuteAction"
   * 
   * TODO:
   * 
   * 
*/
/*Startet ein Servlet, das neben den Namen der auszuführenden Aktion auch den Alias des Dokuments und den Category-Wert benötigt
*/
function executeActionByCategory(sActionName, sDocumentAlias, sCategoryValue, bOpenNewWindow){
	//Merke: docUnid ist das Feld objRefVIA
	//alert("Test: action, alias und value ='" + sActionName + "', '" + sDocumentAlias + "', '" + sCategoryValue + "'");
	var _servletUrl = "/servlet/VIAExecuteAction?";
	var objKernel=new KernelKernelZZZ(this.document);
	var _systemnumber=objKernel.getSystemNumber();
	var _fileconfig = objKernel.getFileConfigName(); //"ZKernelConfigVideoArchiveServlet.ini";
	var _pathconfig = objKernel.getFileConfigPath(); //"";
	var _resultcontent = objKernel.getResultContentType(); //"text/html";
	
	var  h = new Hash();//s. Prototype Framework
	h.set('Systemnumber', _systemnumber.escapeHTML());
	h.set('Configurationfile', _fileconfig.escapeHTML());
	h.set('Configurationpath', _pathconfig.escapeHTML());
	h.set('ResultContentType', _resultcontent.escapeHTML());
	h.set('action', sActionName.escapeHTML());
	h.set('alias', sDocumentAlias.escapeHTML());
	h.set('value', sCategoryValue.escapeHTML());
	
	//FGL 20081030: var stemp = h.toQueryString();
	var stemp = h.toQueryStringISO();
	_servletUrl += stemp;
	
		//Das Servelt führt nun die Aktion durch und gibt im Erfolgsfall eine Seite/einen Link zurück. 
	if(bOpenNewWindow==true){
		viewerWindow = window.open(_servletUrl, "VIAExecuteAction", "width=600,height=400,menubar=no,toolbar=no,location=no,status=yes,resizable=yes,scrollbars=yes");
     	viewerWindow.focus();
     }else{
   		 //Das Fenster im selben frame/öffnen
  		 window.location.href = _servletUrl;
     }
}
/* Startet ein Servlet, das neben den Namen der auszuführenden Aktion auch die docid des Documents benötigt
*/
function executeActionByDocId(sActionName, sDocUnid){
	//Merke: docUnid ist das Feld objRefVIA
	//alert("Test: action und docid ='" + actionName + "', '" + docUnid + "'");
	var _servletUrl = "/servlet/VIAExecuteAction?";
	
	var objKernel=new KernelKernelZZZ(this.document);
	var _systemnumber=objKernel.getSystemNumber();
	var _fileconfig = objKernel.getFileConfigName(); //"ZKernelConfigVideoArchiveServlet.ini";
	var _pathconfig = objKernel.getFileConfigPath(); //"";
	var _resultcontent = objKernel.getResultContentType(); //"text/html";
	
	var  h = new Hash();//s. Prototype Framework
	h.set('Systemnumber', _systemnumber.escapeHTML());
	h.set('Configurationfile', _fileconfig.escapeHTML());
	h.set('Configurationpath', _pathconfig.escapeHTML());
	h.set('ResultContentType', _resultcontent.escapeHTML());
	h.set('action', sActionName.escapeHTML());
	h.set('docid', sDocUnid.escapeHTML());
	
	//FGL 20081030 var stemp = h.toQueryString();
	var stemp = h.toQueryStringISO();
	_servletUrl += stemp;
	
	//REM die Java Klasse heisst momentan use.via.server.module.action.ServletActionExecuteVIA.class und ist in der Datei servlet.properties auf diesen URL Namen gemappt.
	//alert("Test: Document.Url='" + document.URL + "'");
	
	//alert("TEST: servletURL gesamt =  '" + _servletUrl + "'");
	
	//ZIEL: Die view aktualisieren, da nun ein Dokument weniger in ihr vorhanden ist
	//damit wird die view auch nicht um das gelöschte Dokument reduziert angezeigt window.location.reload();
	//Idee: Wenn schon die view nicht automatisch aktualisiert wird, dann soll wenigstens der Aktualisierungs - Button rot werden UND blinken
	//alert('executeAction: ' + actionName);
	if(document.getElementById){ //IE 5.x und NN 6
		elem = document.getElementById("divReloadCellVIA");
		if(elem!=null){
			elem.style.backgroundColor="red";
		}else{
			alert("Kein Element 'divReloadCellVIA' gefunden!");
		}
		
		elem2 = document.getElementById("divReloadTextVIA");
		if(elem2!=null){
			elem2.className="LinkTextReloadZZZ"; //!!!Dadurch fäng es an zu blinken 
			elem2.style.color="green";
	
		/* das Umsetzen der textDecoration funktioniert nicht, nun statt dessen den Classname austauschen
			//Damit das funktioniert muss das text-decoration: blink als Style schon im HTML Code definiert sein.
			//Nun kann das Blinken entfernt werden. Aufgrund der Deklaration kann es dann an beliebiger Stelle durch JavaScript wieder angeschaltet werden.
			//geht nicht  elem.style.textDecorationBlink=false;
			//das geht, wenn das Attribut schon zuvor im HTML-Text definert war mit    "<.... STYLE=...;Text-Decoration: blink ... >"    -----  elem.setAttribute("Style", "textDecorationBlink", false);
			elem2.setAttribute("Style", "textDecoration:Blink", false);  
			//elem2.style.textDecorationBlink=true;
			alert(elem2.getAttribute("Style"));
			*/
			
		}else{
			alert("Kein Element 'divReloadTextVIA' gefunden!");
		}
	}else{
		alert("Die Methoded .getElementByID(...) steht für diesen Browser nicht zur Verfügung");
	}
	
	//Meke: Das Servlet führt einen Redirekt auf eine Page in der Datenbank durch. Im Erfolgsfall "pagActionDeleteSuccessVIA"
	viewerWindow = window.open(_servletUrl, "VIAExecuteAction", "width=600,height=400,menubar=no,toolbar=no,location=no,status=yes,resizable=yes,scrollbars=yes");
     viewerWindow.focus();
}
/* Startet ein Servlet, das neben den Namen der auszuführenden Aktion auch die docid des Documents benötigt
    sowie:
    Feldname
    Feldwert
*/
function executeActionByDocIdWithFieldValue(sActionName, sDocUnid, sFieldname, sValue){
	//alert("Test: action und docid ='" + sActionName + "', '" + sDocUnid + "'");
	_servletUrl = getUrl4ActionByDocIdWithFieldValue(sActionName, sDocUnid, sFieldname, sValue);
	
	//Meke: Das Servlet führt einen Redirekt auf eine Page in der Datenbank durch. Im Erfolgsfall "pagActionDeleteSuccessVIA"
	viewerWindow = window.open(_servletUrl, "VIAExecuteAction", "width=600,height=400,menubar=no,toolbar=no,location=no,status=yes,resizable=yes,scrollbars=yes");
     viewerWindow.focus();
}
function getUrl4ActionByDocIdWithFieldValue(sActionName, sDocUnid, sFieldname, sValue){
	var _servletUrl = "/servlet/VIAExecuteAction?";
	
	var objKernel=new KernelKernelZZZ(this.document);
	var _systemnumber=objKernel.getSystemNumber();
	var _fileconfig = objKernel.getFileConfigName(); //"ZKernelConfigVideoArchiveServlet.ini";
	var _pathconfig = objKernel.getFileConfigPath(); //"";
	var _resultcontent = objKernel.getResultContentType(); //"text/html";
	
	var  h = new Hash(); //s. Prototype Framework
	h.set('Systemnumber', _systemnumber.escapeHTML());
	h.set('Configurationfile',  _fileconfig.escapeHTML());
	h.set('Configurationpath', _pathconfig.escapeHTML());
	h.set('ResultContentType', _resultcontent.escapeHTML());
	h.set('action', sActionName.escapeHTML());
	h.set('docid', sDocUnid.escapeHTML());
	h.set('field', sFieldname.escapeHTML());
	h.set('value', sCategoryValue.escapeHTML());
	
	//FGL 20081030 var stemp = h.toQueryString();
	var stemp = h.toQueryStringISO();
	_servletUrl += stemp;
	
	//REM die Java Klasse heisst momentan use.via.server.module.action.ServletActionExecuteVIA.class und ist in der Datei servlet.properties auf diesen URL Namen gemappt.
	//alert("Test: Document.Url='" + document.URL + "'");
	//alert("Test: Document.Url='" + document.URL + "'");	
	
	//alert("TEST: servletURL gesamt =  '" + _servletUrl + "'");
	
	return _servletUrl;
}

//Ende des Verbergens vor nicht javascript fähigen Browsern --></script>
//</head>
//</html>
