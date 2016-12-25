 /* Bibliothek enth�lt eine Klasse, die f�r die Auswertung der CGI-Variablen per Javascript ben�tigt werden.
  * Die Funktion goBackVIA() wird aus dem Button aufgerufen.
  * Diese Funktion ist hier zentral abgelegt, da in ihr immer die gleiche CgiVIA-Klasse verwendet wird (anders als z.B. bei der Validierung, bei der die zentrale Funktion in jeder Maske hinterlegt ist.
 
 * Folgender Code zeigt die Vererbung der Klassen als Beispiel
 * MERKE: Methoden �berladung (d.h. Verwendung des gleichen Methodennamens mit unterschiedlichen Parametern) scheint nicht zu funktionieren.
 var ValidationMovieVIA = Class.create(KernelValidationZZZ, {
	initialize : function($super, objKernel){
			try{
				$super(objKernel, "movie");
		}catch(e){
	  		 throw handleErrorZZZ(e, "");
    		}
	},
	getAlias: function(){
		return this.sAlias;
	},
	setAlias: function(sAlias){
		this.sAlias = sAlias;
	},
	isValid: function(objDocument){
		//Diese Funktion muss �berschrieben werden
		//Todo: Exception werfen, wenn nicht �berschreiben wird
		return true;
	},
	getDebugString: function($super){
		return "Alias=" + this.getAlias() + $super(); //damit wir die Methode der Superklasse aufgerufen. Merke nur super$ w�rde den Code der Methode zur�ckgeben
	}
}); //End class ValidationZZZ
 */
function goBackVIA(){
	//Erstelle das Cgi-Objekt speziell f�r die VIA-Applikation
	var bReturn = false;
	try{
		//alert("running 'proofValidationVIA' onSubmit() for the form alias 'movie'."); 
		//alert("das gibt einen Runtime - Fehler:" + _nixda);//Zum Fehlertest VOR Aufruf der Funktion
		
		var objKernel=new KernelKernelZZZ(this.document);
		var objCgi = new CgiVIA(objKernel);			//Ist halt die frmFile-Maske, Klasse ist in Z_ValidationVIA.js definiert
		var sDivNameOnError = 'divErrorOnCgiZZZ';	//Stelle f�r globale Fehler, CodeFehler.
		bReturn = goBackZZZ(objCgi,"StartView", sDivNameOnError);           //Ist in ZCraft.Cgi.js definiert
		return bReturn;
	}catch(e){
		throw handleErrorZZZ(e, "");
	}
}
function editDocumentCurrentVIA(){
	//Erstelle das Cgi-Objekt speziell f�r die VIA-Applikation
	var bReturn = false;
	try{
		//alert("running 'proofValidationVIA' onSubmit() for the form alias 'movie'."); 
		//alert("das gibt einen Runtime - Fehler:" + _nixda);//Zum Fehlertest VOR Aufruf der Funktion
		
		var objKernel=new KernelKernelZZZ(this.document);
		var objCgi = new CgiVIA(objKernel);			//Ist halt die frmFile-Maske, Klasse ist in Z_ValidationVIA.js definiert
		var sDivNameOnError = 'divErrorOnCgiZZZ';	//Stelle f�r globale Fehler, CodeFehler.
		var sQueryStringAdditional = "";
		bReturn = editDocumentCurrentZZZ(objCgi,sQueryStringAdditional, sDivNameOnError);           //Ist in ZCraft.Cgi.js definiert
		return bReturn;
	}catch(e){
		throw handleErrorZZZ(e, "");
	}
}
var CgiVIA = Class.create(KernelCgiZZZ, {
		    initialize: function($super, objKernel){
			   	try{
			   		$super(objKernel);
			   	}catch(e){
		  		 	throw handleErrorZZZ(e, "");
	    		}
		   },		 
		   
		   	 /* Funktion sollte gecustomized werden, d.h. es gibt Applikationsspezifische Unterschiede
			  */
			  getArrayParameterQueryStringPermanent: function(){
	  			return ['viw', 'frsFlagReload' ];  //Merke: Werte werden als String in einfachem Hochkomma gesezt. Mehrere Werte werden mit Komma voneinander getrennt.
			  },  
			getDebugString: function($super){
				return "CgiVIA: #" + "#" + $super(); //damit wir die Methode der Superklasse aufgerufen. Merke nur super$ w�rde den Code der Methode zur�ckgeben
			}	
	});