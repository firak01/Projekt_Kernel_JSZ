//<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
//<html>
//<head>
//<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
//<script language="JavaScript" type="text/javascript">
//<!-- Vor nicht Javascript fähigen Browsern verbergen 

/** TODO: Verwende die CategoryZZZ - Klasse und ersetze damit die Konstanten
 *               und die globalen funktionen durch eine art "static" Methode
 */

/*Aktualisiere per Servlet - Aktion (s. ZKernel) alle Dokumente, die diese Kategorisierung verwenden.
 *Die zahlreichen Prefix-Werte stammen aus dem Java Interface 'ICategoryConstantZZZ'.
 * TODO: Verwende die CategoryZZZ - Klasse und ersetze damit die Konstanten
*/
function updateCategoryZZZ(objCategory, sDivNameOnError){
	var bReturn = false;
	main:{
		try{
				if(objCategory==null) throw "Kategory-Objekt nicht übergeben";				
				if(!isEmpty(sDivNameOnError)) objCategory.setDivNameOnError=sDivNameOnError;
				
				var sDebug = objCategory.getDebugString();
				//alert("updateCategoryZZZ()#\n" + sDebug);
				
				//Aber: Nun geht in der Update()-Funktion der Bezug auf "this" verloren, darum binden.
				//var bReturn = objCategory.update();
				var boundUpdate = objCategory.update.bind(objCategory);
				var bReturn = boundUpdate();
				//Merke: Aufgrund der Asynchronität der Ajax-Aufrufe bekommt man über den Rückgabeparameter nicht mit, ob sie erfolgreich waren !!!
			
	}catch(e){
			handleErrorZZZ(e, "");			
		}	  
     }//end main:
    //return bReturn;
}

/*Klasse bietet die Funktionalität zur Verwaltung von Kategorieeinträgen.
 *MERKE: Methoden Überladung (d.h. Verwendung des gleichen Methodennamens mit unterschiedlichen Parametern) scheint nicht zu funktionieren.
 */
var KernelCategoryZZZ = Class.create(KernelUseObjectZZZ, {
		initialize : function($super, objKernel, sDocReferenceId, sFieldalias){
		try{
			$super(objKernel);                //Aufruf des Konstruktors der Elternklasse
			this.sFieldalias=sFieldalias;  //Alias des Kategorie-Feldes
			this.sDocReferenceId=sDocReferenceId;          //DocId/RefernceId des aktuellen Dokuments
			this.sDivNameOnError="divErrorOnCategoryZZZ";
			this.sMessageOnError='';
			this.flagUpdated = false;
				this.sValueNew = null;  //neuer Wert für die Kategorisierung wird aus der Maske gelesen
			this.sValueOld = null;    //bisheriger Wert für die Kategorisierung, wird aus der Maske gelesen. Ist wichtig, um die abhängigen Dokumente zu finden.
		}catch(e){
	  		 throw handleErrorZZZ(e, "");
    	}
	},
	
	getFlag: function($super, sFlagIn){
		var bReturn = false;
		main:{
			try{
				if(isEmpty(sFlagIn)) break main;
				bReturn = $super(sFlagIn);
				if(bReturn==true) break main;
				
				var sFlag = sFlagIn.toLowerCase();
				if(sFlag=="updated"){
					bReturn = this.flagUpdated;
				}
			}catch(e){
		  		 throw handleErrorZZZ(e, "");
	    	}
		}//end main:
    	return bReturn;
	},
	
	setFlag: function($super, sFlagIn, bValue){
		var bReturn = false;
		main:{
		try{
			if(isEmpty(sFlagIn)) break main;
			var sFlag = sFlagIn.toLowerCase();
			bReturn = $super(sFlagIn);
			if(bReturn==true) break main;
			
			if(sFlag=="updated"){
				this.flagUpdated=bValue;
				bReturn = true;  
			}			
		}catch(e){
	  		 throw handleErrorZZZ(e, "");
    	}
		}//End main:
    	return bReturn;
	},
		
	getValueNew: function(){
		return this.sValueNew;
	},
	setValueNew: function(sValue){
		this.sValueNew = sValue;
	},	
	getValueOld: function(){
		return this.sValueOld;
	},
	setValueOld: function(sValue){
		this.sValueOld = sValue
	},
	
	/*Id des Ausgangsdokuments (Feld objRef..., normalerweise enthält das den documentUniqueId -Wert)
	 *Dieser Wert wird im Konstruktor übergeben.
	 */
	 getDocumentReferenceId: function(){
	 	return this.sDocReferenceId;
	 },
	 setDocumentReferenceId: function(sDocReferenceId){
	 	this.sDocReferenceId=sDocReferenceId;
	 },
	 
	
	/*Alias eines Feldes, dieser Wert wird im Konstruktor übergeben
	 * 
	 */
	getFieldalias: function(){
		return this.sFieldalias;
	},
	setFieldalias: function(sFieldalias){
		this.sFieldalias = sFieldalias;
	},

	/* Entspricht momentan dem Feldalias, jedoch ist eine Erweiterung z.B. um den ApplikationKey denkbar
	 * 
	 */
	getFieldname: function(){
		return this.getFieldalias();
	},
	
	/**Wert des Dokuments, der herangezogen werden soll, zum Kategoriesieren anderer Dokumente
 	* <BR>Z.B. als Feldname: CatValCarrierTitle = "Film 1" (Merke: Das gilt für ein Dokument des Typs 'Carrier')
	 */
	getFieldnameCategoryValue: function(){
		return "CatVal"+this.getFieldname();
	},
	
	/*Id des Feldes mit dem neuen Wert.
	 * Merke: mit der Prototype-Framework Funktion $F wird auf die Id des Feldes und nicht den Namen zugegriffen.
	 * Merke: Bei Notes-Maskenfeldern muss die ID im HTML-Reiter der Feldeigenschaften eingestellt werden
	 */
	getFieldidNew: function(){
		return this.getFieldname() + "New";
	},
	
	/** Wird beim Update() verwendet.
	 *   Merke: Es wird über die URL ?SaveDocument upgedatet.
	 *              Dabei können nur Items, die schon im document existieren als Parameter mitgegeben werden.
	 *              Hier werden jeweils name und Wert des Parameters in Form einer Liste ( Prototype Framework nennt das Hash) übergeben
	 * 			 Liste(Name) = Wert
	 */
	getHashParameter4Submit: function(){
		var saReturn={};
		try{
		//Werte werden über die URL - Syntax ...SaveDocument... gespeichert
		saReturn[this.getFieldname()]=$(this.getFieldidNew()).value;
		saReturn[this.getFieldnameCategoryValue()]=$(this.getFieldidNew()).value;
		}catch(e){
				handleErrorZZZ(e, "");			
		}	 
		return saReturn;
	},
	
	/** Wird beim Update() verwendet.
	 *   Merke: Es wird über ein Servlet upgedatet. 
	 *              Die hier übergebenen Parameter werden vom Servlet im HTTPRequest-Objekt (Java) erwartet.
	 *              Hier werden jeweils name und Wert des Parameters in Form einer Liste ( Prototype Framework nennt das Hash) übergeben
	 * 			 Liste(Name) = Wert
	 */
	getHashParameter4ServletAction: function (sValue){
		//alert ("getHashParameter4ServletAction");	
		var saReturn={}; //new Array(8); //!!! nicht als explizites Array definieren, sonst liefert die $H - Methode auch noch bei .each() alle Methoden der Array Klasse zurück
		try{						
			saReturn['Systemnumber']="02";
			saReturn['Configurationfile']="ZKernelConfigVideoArchiveServlet.ini";
			saReturn['Configurationpath']="";
			saReturn['ResultContentType']= "text/html";
			saReturn['action']= "updateDocument";  //s. Java: servlet IActionConstantZZZ Klasse des ZKernels
			saReturn['docid']=this.getDocumentReferenceId();
			saReturn['field']=this.getFieldname();
			saReturn['value']=sValue;		
		}catch(e){
				handleErrorZZZ(e, "");			
		}	 	
		//alert("Action-Wert in der Funktion: " + saReturn['action']);
		return saReturn;
	},
	
	/** Relative URL des Servlets, mit dem bestimmte Aktionen (u.a. das Updaten der Kategorieen) durchgeführt werden.
	 * 
	 */
	getUrl4ServletAction: function(){
		var sReturn = "/servlet/VIAExecuteAction";	 //Merke: Es scheint wichtig zu sein dies nicht als Konstante zurückzugeben.
		return sReturn;
	},
	
	
	hideButtonUpdate: function(){
		var bReturn = false;	
		try{
			main:{			
				var section_id=getPrefixDivButton()+this.getFieldname()+"UpdateCategory";
				//alert("hide button: " + section_id);
				section_hide( section_id )
				bReturn = true;		
			}//end main;			
		}catch(e){
		   handleErrorZZZ(e, "");		 
	    }	
	    return bReturn;
	},
	
	hideError: function(){
		var bReturn = false;	
		try{
			main:{			
				var section_id=getPrefixDivError()+this.getFieldname();
				//alert("hide button: " + section_id);
				section_hide( section_id )
				bReturn = true;						
			}//end main;			
		}catch(e){
			handleErrorZZZ(e, "");
	    }	
	    return bReturn;
	},
	
	
	/** Aktualisiert das gerade geöffnete Dokument und alle davon abhängigen Dokumente.
	 *   Zunächst werden die Kategoriewerte im Dokument gespeichert (und nur die, z.B. der Inhalt des Bemerkungsfelds wird nicht gespeichert) (1)
	 *   Danach werden die abhängigen Dokumente gesucht und aktualisiert. Dazu wird ein Servlet über die URL mit den entsprechenden Parametern gestartet. (2)
	 *   Als Technik wird AJAX verwendet (Ajax Aufrufe (1) + (2))
	 * 
	 *  MERKE: Die this-Refernce funktioniert nur, wenn diese Funktion mit bind() an das Objekt gebunden wird
	 *  z.B. var funcUpdateBound = obj.update.bind(obj);
	 *         var bReturn = funcUpdateBound();
	 * 
	 */
	update: function (){
		var bReturn = false;
	main:{
		try{			
			//+++ Bitte Warten einblenden ++++++++++++++++++++++++++
			//Den <aktualisieren> Button wieder verbergen
			this.hideButtonUpdate();
	
			//Eine ggf. zuvor ausgegebene Fehlermeldung wieder verbergen (wird z.B. angezeigt, wenn verscuht wird zu Speichern ohne die Aktualisierung durchgeführt zu haben)
			this.hideError();	
			
			//Die div-Section für das "Bitte Warten" einblenden
			var objKernel = this.getKernelObject();
			var objDomUi = new KernelDomUiZZZ(objKernel);
			var btemp = objDomUi.showAnimationWaitCentral();
			
			//+++++++++++++++++++++++++++++++++++++++++++++
			var _fieldOld= this.getFieldnameCategoryValue();
			var _fieldNew=this.getFieldname(); //Der neue Feldname. Dies entspricht der id, die im Reiter der Feldeigenschaft (für HTML) eingestellt ist
			
			// Todo: Ersetzen durch einen $Ausdruck des Prototype-Frameworks			
			//document.forms["Formularname"].elements["Elementname"].Eigenschaft
			var _valueNew=document.forms[0].elements["" + _fieldNew + ""].value;  
			this.setValueNew(_valueNew);
			var _valueOld=document.forms[0].elements["" + _fieldOld +""].value; 
			//alert("ValueOld= " + _valueOld + "#" + "ValueNew=" + _valueNew);
			this.setValueOld(_valueOld);
			//Merke: Der entsprechende Button/Hotspot sollte verborgen sein, wenn es keine Wertänderung gibt.
			if(_valueNew=="undefined"){
				alert("Keine neuer Wert. Breche ab");
		 		break main;
		 	}
			if(_valueNew==_valueOld){
				alert("Keine Veränderung. Breche ab.");
		 		break main;  //abbrechen, falls es keinen neuen Wert gibt
			};
			
			
			//Für das ggf. gewünschte "reopen" des Dokuments die URL festhalten und in ein "im Lesemodus Öffnen" ändern.
			//Merke: wird momentan nicht mehr gewünscht !!!
			var _Url4Edit = location.href;  //Todo: Alternativ datzu im Kernel-Objekt eine Methode getUrl4DocumentEdit() bereitstellen,
													    			//die dies Url zusammenrechnet mit Server / Datenbank / 0(als View) / docuniqueid 
													    //Todo: Methoden, die location.href mit den dann entstehnden ergebnissen von getUrl4DocumentEdit() etc. vergeleicht
													       			//z.B. isLocationCurrentDocumentEdit()         oder isLocationCurrentDocumentOpen()
													       			
			var _UrlBasis = getUrlWithoutQueryZZZ(_Url4Edit); 
			
			/*TODO: dies in eine Methode des Kernel-Objekts bringen: getUrl4DocumentOpen(), oder so
			if(isStrEmpty(_UrlBasis)) throw "Unexpected: Unable to compute URL-String without Query"						
			var _Url4Open=_UrlBasis + "?OpenDocument";
			*/
			
			
			//Das geht nicht 	document.forms[0].submit(); //Es wird immer "Form Processed" angezeigt oder ggf. der Inhalt von $$Return - Feld
			//Also: Lösung über die URL und AJAX
			var _Url4Submit = _UrlBasis+"?SaveDocument";  //Merke: Damit scheint es so als könne man nur Items speichern, die schon im Dokument vorhanden sind, sprich in der Maske.
			//alert("speichere mit POST - Daten\n" + _Url4Submit);
			
			var saParam4Submit = this.getHashParameter4Submit();
			if( saParam4Submit== null) break main;
			
			//Die Kategoriesierungsfelder werden nun per AJAX-Request gespeichert.
			//Wenn der Request erfolgreich ist, kann der zweite Ajax Request gestartet werden, der das Servlet startet, um die Kategorisierung zu aktualisieren !!!!						
			//Merke: Replaktationskonflikte werden nur dadurch ausgeschlossen, dass in dem Servlet das aktuelle Dokument nicht gespeichert wird.
			
			new Ajax.Request(_Url4Submit, { 
								method: 'post',   //!!! Für die Submit URL MUSS POST verwendet werden			
								contentType:'application/x-www-form-urlencoded',  
								encoding: 'ISO-8859-1',    //!!! um dies in der GET-MEthode verwenden zu können, ist prototype.js anzupassen (s. prototypeZZZ.js, Strichwort ecscape()). Dann muss bei den POST MEthoden aber auch ISO verwendet werden			
								parameters: saParam4Submit, //'MovieTitle=Risiken der Nanotechnologie für  Mausi 32&CatValMovieTitle=Risiken der Nanotechnologie für Mausi 32', //Merke: Hart codierter Text, hier wird der Umlaut ü im Web encoded. Was aber, wenn der Wert berechnet wird ???
								onSuccess: this._onAjaxSubmitSuccess.bind(this)				
								}
					); //end new Ajax.Request	
				bReturn = true;
				//alert("continue asynchron");			
			/* erst mal nur submit() hinbekommen !!!			
			
			//TODO: TESTEN, ob auch einträge z.B. in das Bemerkungsfeld übernommen werden, oder ob explizit ein Submit() notwendig ist
			
			//TODO: "Bitte Warten Zahnräder einblenden"
			//Dialogfenster mit Erfolgsmeldung öffnen und überhaupt erst das servlet (mit der berechneten URL) starten !!!
		   	//ohne AJAX viewerWindow = window.open(_Url4Action, "VIAExecuteAction", "width=600,height=400,menubar=no,toolbar=no,location=no,status=yes,resizable=yes,scrollbars=yes");
		   	//viewerWindow.setTimeout('this.close()',5000); //5000 = 5 Sekunden, das Fenster wird auch geschlossen, wenn es den Fokus behält !!!
		   	 
		   	 //Dadurch soll die embedded view angezeigt werden und die "Bitte Warten Zahnräder" wieder verschwinden.
		   	//alert("Groesse des arrays: '"+ saParam4Action + "'");
		   	//alert("Groesse des arrays: '"+ saParam4Action.size() + "'");
		   	//alert("Action als Parameter ausserhalb der Funktion: '"+ saParam4Action['action'] + "'");
		   	//alert("Url: " + _Url4Action);
		   	new Ajax.Request(_Url4Action, { 
						method: 'get',
						parameters: saParam4Action,
						onSuccess: function(){
							location.replace(_Url4Open);  //Damit soll dann die neue Maske mit dem geänderten Kategoriewert und der aktualisierten embedded View geladen werden.
							}						
						}
			);
		   	  
		    //Merke: Es zu Replizierkonflikten, wenn nach dem Ablauf des Servlets aus dem Web heraus der Button "Speichern" gedrückt wird.
			//Versuch dies zu lösen, indem man das Dokument zuvor mit submit() speichert und danach erneut öffnet. Merke: Das passiert hinter dem Dialogfenster, damit der Bildschirm nicht so leer aussieht
			//!!! WENN MAN NUN ABER "SPEICHERN" ANCLICKT, GIBT ES TROTZDEM EINEN SPEICHERKONFLIKT !!!
			//VERSUCHE DIES NUN DURCH ÖFFNEN IM LESEMODUS ABZUFANGEN !!! 
		   //	alert(_Url4Open);
			//location.replace(_Url4Open);//location.href = _Url4Open;
			
		    //viewerWindow.focus();
		    */
		}catch(e){
			handleErrorZZZ(e, "");
		}	  
     }//end main:
     return bReturn;  //wird erst true, wenn auch der 2. Ajax - Request erfolgreich war.
	},
	
	_onAjaxSubmitSuccess: function(){
		main:{
			bReturn = true;
			//alert("...?SaveDocument... POST, done with success. In '_onAjaxSubmitSuccess'");
			
			//####################################
			//Nun das Servlet aufrufen, das die Kategorisierungsänderung durchführt, ohne das Originaldokument zu speichern.																					
			 var _Url4Action = this.getUrl4ServletAction(); 
		     //alert('Url4Action=' + _Url4Action);
		     if(isStrEmpty(_Url4Action)) throw "Keine URL für das aufzurufende Servlet vorhanden.";
	 	
	 		var _valueNew = this.getValueNew();
			var saParam4Action = this.getHashParameter4ServletAction(_valueNew);
			if( saParam4Action== null) break main;
			//alert("inspect array:" + $H(saParam4Action).inspect() + " | length = " + $H(saParam4Action).length);
			
			/*damit wird alles durchlaufen, aber auch methoden, die die klasse array bietet !!!
			$H(saParam4Action)..each(function(e, i){
				alert(i +": " + e + "...1");
			}); */
			
			/* so bekommt man einen Query String hin, aber es geht auch mit der übergabe als 'parameters' im Ajax.Request !!!
			var sQuery = $H(saParam4Action).toQueryString();
			alert(sQuery); */
			
			 //Dadurch soll die embedded view angezeigt werden und die "Bitte Warten Zahnräder" wieder verschwinden.
			//alert("Groesse des arrays: '"+ saParam4Action + "'");
		 	//alert("Groesse des arrays: '"+ saParam4Action.size() + "'");
		   	//alert("Action als Parameter ausserhalb der Funktion: '"+ saParam4Action['action'] + "'");
		   	new Ajax.Request(_Url4Action, { 
						method: 'get', 	 //!!! das muss 'get' sein, bei POST kommen keine Parameter im Servlet an, obwohl sie im Request korrekt vorhanden sind.
													 //MErke: Wenn die Methode durch das Servlet nicht implementiert ist, gibt es z.B. bei fehlernder doPost() - Methode die Fehlermeldung: POST is not supported by this URL. !!!							
					   	contentType:'application/x-www-form-urlencoded',  
						encoding: 'ISO-8859-1',    //!!! um dies in der GET-MEthode verwenden zu können, ist prototype.js anzupassen (s. prototypeZZZ.js, Strichwort ecscape()). Dann muss bei den POST MEthoden aber auch ISO verwendet werden
						parameters: saParam4Action,
						onSuccess: this._onAjaxUpdateSuccess.bind(this) 
						}
			);
			
		}//end main:
	},//end function _onAjaxSubmittSuccess
	
	_onAjaxUpdateSuccess : function(transport){
			//alert("...ServletAction... GET, done. transport.status: " + transport.status);												
			//alert(transport.responseText);
			main:{
				var _fieldOld=this.getFieldnameCategoryValue();      //Kategoriefeld, den Wert im versteckten Feld ändern
				document.forms[0].elements["" + _fieldOld +""].value = this.getValueNew(); //_valueNew;  //damit die Validierung nicht meckert
	
				//TODO: Die Verwendung von "Bitte Warten Konfigurierbar machen und eigene Methoden
				//           "Bitte Warten" soll zu einer KernelCraftDomUiZZZ - Klasse gehören
				//Die div-Section für das "Bitte Warten" wieder ausblenden
				var objKernel = this.getKernelObject();
				var objDomUi = new KernelDomUiZZZ(objKernel);
				var btemp = objDomUi.hideAnimationWaitCentral();
					
				//Wird nicht benötigt....																						
				//location.replace(_Url4Open);  //Damit soll dann die neue Maske mit dem geänderten Kategoriewert und der aktualisierten embedded View geladen werden.
				bReturn = true;
				this.setFlag("updated", true); //Versuch über diese Variable der Klasse die aufrufende Funktion zu steuern.
			}//End main
	},		//End Function _onAjaxUpdateSuccess				
	
	getDebugString: function($super){
		return "KernelCategoryZZZ: #Fieldname=" + this.getFieldname() + "# DocumentReferenceId=" + this.getDocumentReferenceId() + "#" + $super(); //damit wir die Methode der Superklasse aufgerufen. Merke nur super$ würde den Code der Methode zurückgeben
	}
}); //End class KernelCategoryZZZ
		
			//Dialogfenster mit Erfolgsmeldung öffnen und überhaupt erst das servlet (mit der berechneten URL) starten !!!
		   //	  viewerWindow = window.open(_Url4Action, "VIAExecuteAction", "width=600,height=400,menubar=no,toolbar=no,location=no,status=yes,resizable=yes,scrollbars=yes");
		   //	  viewerWindow.setTimeout('this.close()',5000); //5000 = 5 Sekunden, das Fenster wird auch geschlossen, wenn es den Fokus behält !!!

/*Funktion überprüft den aktuellen feldwert mit dem Wert, der im Kategorie-Wert-Feld gespeichert ist.
 * True wird zurückgegeben, wenn sich die beiden Werte voneinander unterscheiden.
 */
function proofCategoryValueChanged(sFieldname){
	var bReturn = false;
	try{
		if(isStrEmpty(sFieldname)){
			 e = new Error("Kein Feldname übergeben");
		  	 throw e;
		}
		var sProofFieldname = getPrefixCategoryValue() + sFieldname;	
		var sProofValue = document.forms[0].elements["" + sProofFieldname + ""].value; 
		var sValue = document.forms[0].elements["" + sFieldname + ""].value; 
		if(sProofValue==sValue){
			bReturn= false;
		}else{
			bReturn = true;
		}				
		return bReturn;
	}catch(e){
		handleErrorZZZ(e, "");
		return false;
	}	  
}

function switchButtonUpdateCategory(sFieldname){
	var bReturn = false;	
	try{
		main:{
			bReturn = proofCategoryValueChanged(sFieldname);
			if(bReturn==false){
				hideButtonUpdateCategory(sFieldname);
				
				//Eine ggf. zuvor ausgegebene Fehlermeldung wieder verbergen (wird z.B. angezeigt, wenn verscuht wird zu Speichern ohne die Aktualisierung durchgeführt zu haben)
				hideError(sFieldname);
			}else{
				showButtonUpdateCategory(sFieldname);
			}		
		}//end main;
		return bReturn;
	}catch(e){
	   handleErrorZZZ(e, "");
	   return false;
    }	
}

function showButtonUpdateCategory(sFieldname){
	var bReturn = false;	
	try{
		main:{
	
		var section_id=getPrefixDivButton()+sFieldname+"UpdateCategory";
		//alert("show button: " + section_id);
		section_show( section_id )
				
		}//end main;
		return bReturn;
	}catch(e){
	  handleErrorZZZ(e, "");
	   return false;
    }	
}


function hideButtonUpdateCategory(sFieldname){
	var bReturn = false;	
	try{
		main:{
		
		var section_id=getPrefixDivButton()+sFieldname+"UpdateCategory";
		//alert("hide button: " + section_id);
		section_hide( section_id )
				
		}//end main;
		return bReturn;
	}catch(e){
	   handleErrorZZZ(e, "");
	   return false;
    }	
}

function hideError(sFieldname){
	var bReturn = false;	
	try{
		main:{
		
		var section_id=getPrefixDivError()+sFieldname;
		//alert("hide button: " + section_id);
		section_hide( section_id )
				
		}//end main;
		return bReturn;
	}catch(e){
		handleErrorZZZ(e, "");
	    return false;
    }	
}

//#### Prefixe und Konstanten gemäß des JavaInterfaces ICategoryConstantZZZ
//TODO: Diese in die Klasse Packen (static ???? ) Aber achtung: Werden auch an anderer Stelle verwendet !!!
/**Mehrfachwertefeld in dem dokument, dass die Kategorisierung übernimmt 
	     <BR>Besteht aus: 
	     <BR>Aliasname (s. Feld objAlias) des Dokuments aus dem ein Kategorierfeld kommt.
	     #
	 	UniversalId
	  	# 
	 	Feldname (s. Feld objCatRef... ) in dem Dokument für die Kategoriesierung
 		<BR> z.B.: "Carrier# 097849794... #CarrierTitle" : "Carrier#08080... # CarrierId"
	 */
function getPrefixCategorySourceMeta(){
	return "objCatRefSource"; 
}

/**Wert eines anderen Dokuments, unter dem dieses Dokument auch kategoriesierbar sein soll
 *  <BR>Z.B. als Feldname: 'objCatValCarrierTitle' mit dem Inhalt des Feldes 'CarrierTitle'
 *  <BR>                              
 *  <BR>Merke: Feldname 'objCatValVIA' (also mit dem ApplicationKey as Suffix). Mit dem Inhalt dieses Felds werden  alle Feldnamen eines Dokuments, die zur Kategorisierung herangezogen werden, beschrieben.
 */
 function getPrefixCategoryMeta(){
 	return "objCatVal";
 }
 
 function  getPrefixCategoryValue(){
 	return "CatVal";
 }

/**Das ist also in dem dokument der Wert, der für eine Kategorisierung eines Dokuments benutzt werden wird.
 *  <BR>z.B. "CatRefCarrierTitle" als Feldname, um das Dokument nach CarrierTitle zu kategorisieren (Merke: Das Dokumetn ist nicht vom Typ Carrier)
 */
 function getPrefixCategory(){
 	return "CatRef";   
 }
			
/*		
function getViewLookupCategoryValue(){
	return "viwLookupCatVal";
}

function getViewLookupCategoyReference(){
	return "viwLookupCatRefSource";
}
*/

//Ende des Verbergens vor nicht javascript fähigen Browsern --></script>
//</head>
//</html>