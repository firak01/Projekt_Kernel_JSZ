//<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
//<html>
//<head>
//<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
//<script language="JavaScript" type="text/javascript">
//<!-- Vor nicht Javascript fähigen Browsern verbergen 

/*Greife auf die CGI-Variablen (insbesondere Query_String) zu, die in der Teilmaske subCraftCgiWebZZZ zur Verfügung gestellt werden.
   Damit können dann verschiedene OPerationend durchgeführt werden.
   -- GoBack()-Funktionalität: 
                #hole den Namen der Ansicht von der aus man gestartet ist.
   -- GetQueryStringPermanent()-Funktionalität
			 #hole den QueryString - Bestandteil, der bei Folge URL-Aufrufen auch mit übergeben werden soll
			 
			 
	Fritz Lindhauer: 2008-10-19
*/
function goBackZZZ(objCgi, sTargetName, sDivNameOnError){
	var bReturn = false;
	main:{
		try{
				if(objCgi==null) throw "Cgi-Objekt nicht übergeben";				
				if(!isEmpty(sDivNameOnError)) objCgi.setDivNameOnError=sDivNameOnError;
				
				if(isEmpty(sTargetName)) throw "Kein Action Name übergeben, ewartet z.B. 'StartView'"
				
				//var sDebug = objCgi.getDebugString();
				//alert("goBackZZZ()#\n" + sDebug);
				
				//+++ Name im Query String ermitteln, der für diese Aktion wichtig ist.
				var sV = objCgi.getQueryParameterNameByAlias(sTargetName);
				if(isEmpty(sV)) throw "Kein Query Parameter mit dem Alias '" + sTargetName + "' gepflegt";
			
			    var objHash = objCgi.getQueryHash()
				var sView = objHash.get(sV);
				
				
				//Aber: Nun geht in der goBack()-Funktion der Bezug auf "this" verloren, darum binden.
				var boundGoBack = objCgi.goBackToView.bind(objCgi);
				var bReturn = boundGoBack(sView);
				//Merke: Aufgrund der Asynchronität bei Ajax-Aufrufen bekommt man über den Rückgabeparameter nicht mit, ob sie erfolgreich waren !!!
			
	}catch(e){
			handleErrorZZZ(e, "");			
		}	  
     }//end main:
    //return bReturn;
}
/*Statt eines einfachen @Command([EditDcoument]) wird diese Funktion aufgerufen.
 * Sie bewirkt, dass das aktuelle Dokument im Bearbeiten-Modus geöffnet wird UND darüber hinaus wird ein permatenter Parameterteil an die URL angehängt,
 * der dann als CGI Variable Query_String auch im Bearbeiten Modus zur Verfügung steht.
 * 
 */
function editDocumentCurrentZZZ(objCgi, sQueryStringAdditional, sDivNameOnError){
	var bReturn = false;
	main:{
		try{
			if(objCgi==null) throw "Cgi-Objekt nicht übergeben";				
				if(!isEmpty(sDivNameOnError)) objCgi.setDivNameOnError=sDivNameOnError;
				
			
				var objKernel = objCgi.getKernelObject();
				var sDocId = objKernel.getDocumentUniqueId();
				bReturn = objCgi.editDocument(sDocId);
			
				
		}catch(e){
			handleErrorZZZ(e, "");			
		}	 
	}//END main:
	return bReturn;
}

//#################################################################
/*Klasse bietet die Funktionalität zur Verwaltung von Kategorieeinträgen.
 *MERKE: Methoden Überladung (d.h. Verwendung des gleichen Methodennamens mit unterschiedlichen Parametern) scheint nicht zu funktionieren.
 */
var KernelCgiZZZ = Class.create(KernelUseObjectZZZ, {
		initialize : function($super, objKernel){
		try{
			$super(objKernel);                //Aufruf des Konstruktors der Elternklasse
			this.sDivNameOnError="divErrorOnCgiZZZ";
			this.sMessageOnError='';
			this.sQueryStringAdditional=""; //ggf. ein zusätzlicher QueryString, der immer angehängt wird.
		}catch(e){
	  		 throw handleErrorZZZ(e, "");
    	}
	},
	
	/* Berechne aus dem  übergebenen Query - Strings den permaneten.
	  * Dazu muss ein Array-angegeben worden sein (als zu customizende Funktion:  s. getArrayParameterQueryStringPermanent(); )
	  */
	 computeQueryStringPermanent: function(sQueryStringIn){
	 		var sReturn = "";
	 			main:{
			 	try{
			 		if(isEmpty(sQueryStringIn)) break main;
			 		
			 		var objHash = this.computeQueryHashPermanent(sQueryStringIn);
			 		if(objHash.keys().size()==0){			 		
			 			sReturn = sQueryStringIn; //!! Falls also nichts definert ist, wird der ganze Query - String weitervererbt.	
			 			break main;
			 		}
			 		
			 		//nun aus dem Hash einen String machen
			 		sReturn = objHash.toQueryStringUTF();		 		
			 		
			 	}catch(e){
			  		 throw handleErrorZZZ(e, "");
		    	}
		 	}//End main:
	 	return sReturn;
	 },
	 
	 computeQueryHashPermanent: function(sQueryStringIn){
	 	var hashReturn = new Hash();
	 	main:{
	 		try{
	 			if(isEmpty(sQueryStringIn)) break main;
	 	
	 		//1. Array holen (wird in einer custom-Funktion überschrieben)
			var saParam = this.getArrayParameterQueryStringPermanent();
			if(saParam.size()==0) break main; 		
			
			//2. Aus dem übergebenen QueryString einen Hash machen
			var obj4hash = sQueryStringIn.parseQuery(); //unbestimmtes Objekt
			var hashQueryIn = $H(obj4hash);   //... aus dem man erst einmal ein Hash machen muss
			 		
			//3. Für alle Elemente des Arrays den aktuellen Hash-Wert ermitteln und dem Return Hash hinzufügen
			hashQueryIn.each(function(pair){
						//alert("computeQueryHashPermanent(): " + pair.key +  ' =  "' + pair.value + '"');
						
						if(saParam.indexOf(pair.key)>=0){
							//alert("computeQueryHashPermanent(): Es wird übernommen -  " + pair.key +  ' =  "' + pair.value + '"');
							hashReturn.set(pair.key, pair.value);
						}
						
					}
				); //end each
			
	 		 	}catch(e){
			  		 throw handleErrorZZZ(e, "");
		    	}
	 	}//End main;
	 	return hashReturn;
	 },
	
	 editDocument: function(sDocUniqueId){
	 	var bReturn = false;
	 		 	main:{
		 	try{
		 		if(isEmpty(sDocUniqueId)) throw "Keine DocumentUniqueId übergeben. Damit ist das als 'zu bearbeitende' Dokument unbestimmt..";
		 		
		 		var objKernel = this.getKernelObject();
			 	var sUrl = objKernel.getUrlByAlias("Application");  //!!! sollte das nicht globaler als "Aktuelle Datenbank" definert sein
			 	if(isEmpty(sUrl)) throw "Keine URL für den Alias 'Application' gefunden.";
			 	//alert(sUrl);
			
			 	sUrl = sUrl + "/0/" + sDocUniqueId + "?EditDocument";
			 	//alert(sUrl);
			 	
			 	//+++ Namen der permanenten Bestandteile im Query String ermitteln, der für diese Aktion wichtig ist.
				var sQueryStringPermanent = this.getQueryStringPermanent();
				//alert(sQueryStringPermanent);
			 	if(!isEmpty(sQueryStringPermanent)){
			 		sUrl = sUrl + "&" +  sQueryStringPermanent; //.escapeHTML();
			 	}
			 	//alert(sUrl);
			 	
			 	var sQueryStringAdditional = this.getQueryStringAdditional();
			 	if(!isEmpty(sQueryStringAdditional)){
			 		sUrl = sUrl + "&" + sQueryStringAdditional; //.escapeHTML();
			 	}
			 	//alert(sUrl);
				
			 	//FGL 20081030 location.replace( sUrl );
			 	//location.href = sUrl;
			 	//self.location.href = sUrl;
			 	self.location.replace(sUrl);
	 	 	}catch(e){
		  		 throw handleErrorZZZ(e, "");
	    	}
	 	}//End main:
	 	return bReturn;	 
	 },
	
	//### GETTER / SETTER
	 /* Funktion sollte gecustomized werden, d.h. es gibt Applikationsspezifische Unterschiede
	  */
	  getArrayParameterQueryStringPermanent: function(){
	  	return []; //Merke: Werte werden als String in einfachem Hochkomma gesezt. Mehrere Werte werden mit Komma voneinander getrennt
	  },
	  
	getDebugString: function($super){
		return "KernelCgiZZZ: #" + $super(); //damit wir die Methode der Superklasse aufgerufen. Merke nur super$ würde den Code der Methode zurückgeben
	},
	
	 getFieldnameByCgiVariable: function(sCgiNameIn){
	 	var sReturn = "";
	 	main:{
		 	try{
		 			if(isEmpty(sCgiNameIn)) break main;
		 			var sCgiName = sCgiNameIn.toLowerCase();
		 			
		 			var sKernelKey = this.getKernelObject().getKernelKey();
		 			var sPrefix = "obj";
		 			if(sCgiName=="query_string" ){
		 				sReturn = sPrefix + "QueryString" + sKernelKey;
		 				break main;
		 			}
		 	}catch(e){
		  		 throw handleErrorZZZ(e, "");
	    	}
	 	}//End main:
	 	return sReturn;
	 },
	 
	 /* Default gilt es, dass die Namen URL + Parametername lauten.
	  * Merke:
	  * URL-Parameter != CGI-Variablen
	  * 
	  * (z.B. enthält der Query_String zwar die URL-Parameter, ist aber eine CGI-Variable)
	  * 
	  */
	 getFieldnameByQueryParameter: function(sQueryParameter){
	 	var sReturn = "";
	 		main:{
		 	try{
		 		if(isEmpty(sQueryParameter)) break main;
		 		
		 		sReturn = "URL" + sQueryParameter;	
		 	}catch(e){
		  		 throw handleErrorZZZ(e, "");
	    	}
	 	}//End main:
	 	return sReturn;
	 },
	 
	 /* Die hier defnierten Aliasse sind in der Methode .getQueryParameterNameByAlias(...) konfiguriert.
	  * 
	  */
	 getFieldnameByQueryParameterAlias: function(sQueryParameterAlias){
	 	var sReturn = "";
	 		main:{
		 	try{
				if(isEmpty(sQueryParameterAlias)) break main;

			 	//1. den zu prüfenden URL-Parameter herausfinden
	  			var sParam = this.getQueryParameterNameByAlias(sQueryParameterAlias);
	  			if(isEmpty(sParam)) break main;
	  			
	  			//2. den Feldnamen ermitteln
	  			sReturn = this.getFieldnameByQueryParameter(sParam);
	  			
	 		}catch(e){
		  		 throw handleErrorZZZ(e, "");
	    	}
	 	}//End main:
	 	return sReturn;
	 },
	
	getFlag: function($super, sFlagIn){
		var bReturn = false;
		main:{
			try{
				if(isEmpty(sFlagIn)) break main;
				bReturn = $super(sFlagIn);
				if(bReturn==true) break main;
				
				/*
				var sFlag = sFlagIn.toLowerCase();
				if(sFlag=="updated"){
					bReturn = this.flagUpdated;
				}*/
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
			
			/*
			if(sFlag=="updated"){
				this.flagUpdated=bValue;
				bReturn = true;  
			}	*/		
		}catch(e){
	  		 throw handleErrorZZZ(e, "");
    	}
		}//End main:
    	return bReturn;
	},
	
	 
	  /* Dies hat auch den ersten Bestandteil des Query Strings (die Aktion) an erster Position
	  * 
	  */
	 getQueryHash: function(){
	 	try{
	 			//+++ Feld entgegennehmen
				var sField = this.getFieldnameByCgiVariable("Query_String");
				if(isEmpty(sField)) throw "Kein Feld für die CGI Variable 'Query_String' gepflegt'."
				
				var sFieldvalue = $F(sField); //$F sucht nach der Id und gibt den Wert zurück
				//alert(sFieldvalue);
				//sFieldvalue="?"+sFieldvalue;
				//sFieldvalue=getStrRightBack(sFieldvalue, '?');
				//alert(sFieldvalue);
				//NEIN, das ist an dieser Stelle schon escaped, d.h. Leerzeichen z.B. ist %20     sFieldvalue = sFieldvalue.escapeHTML();
				
				//sFieldvalue="opendocument"+sFieldvalue;
				//sFieldvalue = getStrRightBack(sFieldvalue.toLowerCase(), 'opendocument')
				//alert(sFieldvalue);
				
				//sFieldvalue="&"+sFieldvalue;
				//sFieldvalue = getStrRightBack(sFieldvalue, '&')	
					
				//sFieldvalue = "?"+sFieldvalue;
				//so geht´s:         sFieldvalue = "?login=tdd&age=29&country=FR";
				//wenn % Zeichen darin sind, dann scheint es nicht zu gehen, darum unescapeHTML()
				sFieldvalue = sFieldvalue.unescapeHTML();
				//alert(sFieldvalue);
				
				//+++ Feld parsen
				var obj4hash = sFieldvalue.toQueryParams('&');  //unbestimmtes Objekt
				var objHash = $H(obj4hash);		               //... aus dem man erst einmal ein Hash machen muss
				
				return objHash;
		 	}catch(e){
		  		 throw handleErrorZZZ(e, "");
	    	}					
	 },
	 
	 
	 	 /* Name des Parameters im Query String anhand einer Alias-Bezeichnung
	  * Mögliche Aliasbezeichnungen sind:
	  * - StartView
	  * 
	  */
	 getQueryParameterNameByAlias: function(sParameterAliasIn){
	 	var sReturn = "";
	 	main:{
		 	try{
		 		if(isEmpty(sParameterAliasIn)) break main;
		 			var sParameterAlias = sParameterAliasIn.toLowerCase();
		 			if(sParameterAlias=="startview" ){
		 				sReturn = "viw";
		 				break main;
		 			}else if(sParameterAlias=="documenttitle"){
		 				sReturn = "doctitle";
		 				break main;
		 			}else if(sParameterAlias=="documentprevious"){
		 				sReturn = "docframe";
		 			}else if(sParameterAlias=="isframesetreloaded"){
		 				sReturn = "flagfrsreload";
		 			}else{
		 				throw "An URL Parameter with the name '" + sParameterAliasIn + "' is not configured.";
		 			}
		 	}catch(e){
		  		 throw handleErrorZZZ(e, "");
	    	}
	 	}//End main:
	 	return sReturn;
	 },
	 
	 
	 /*Ein Hash, wie getQueryHash(), aber ohne den "Aktions"-Teil
	  * 
	  */
	 getQueryParamHash: function(){
	 	try{
	 			var objHash = this.getQueryHash();
	 			var saKey = objHash.keys();
	 			var saValue = objHash.values();
	 			//+++ Aus der Hash nun ein neues Hash-Objekt machen, ohne das erste (in dem die Aktion, z.B. OpenDocument, drinsteht) !!!	 			
	 			var objHashReturn = new Hash();	 			
	 			for (var icount = 1;icount<=saKey.size()-1; icount++){
	 				
	 				//weil es Problem gab mit den Codierungen. Hier schon HTML ecsapen.
	 				var stemp = saValue[icount];
	 				var sescaped = stemp.escapeHTML();
	 				objHashReturn.set(saKey[icount], sescaped);
	 			}
	 			return objHashReturn;
	 	 	}catch(e){
		  		 throw handleErrorZZZ(e, "");
	    	}			
	 },
	 

	 
	 getQueryStringAdditional: function(){
	 	return this.sQueryStringAdditional;
	 }, 
	 setQueryStringAdditional: function(sQueryStringAdditional){
	 	this.sQueryStringAdditional=sQueryStringAdditional;
	 },
	 
	 getQueryStringPermanent: function(){
	 	var sReturn = "";
	 			main:{
			 	try{
			 		var sQueryStringParam = this.readQueryStringParam();
			 		if(isEmpty(sQueryStringParam)) break main;
			 			
			 		sReturn = this.computeQueryStringPermanent(sQueryStringParam);	
			 	}catch(e){
			  		 throw handleErrorZZZ(e, "");
		    	}
		 	}//End main:
	 	return sReturn;
	 },
	 
	 goBackToView: function(sView){
	 	var bReturn = false;
	 	//alert("in der go back methode: Zielansicht ist '" + sView + "'");
	 	main:{
		 	try{
		 		if(isEmpty(sView)) throw "Keine Ansicht zum zurückgehen übergeben. Ggfs. sollte in eine Default Ansicht zurückgegangen werden.";
		 		
		 		var objKernel = this.getKernelObject();
			 	var sUrl = objKernel.getUrlByAlias("Application");  //!!! sollte das nicht globaler als "Aktuelle Datenbank" definert sein
			 	if(isEmpty(sUrl)) throw "Keine URL für den Alias 'Application' gefunden.";
			 
			 	//Falls der Titel im Browser nicht dem default - Titel des Framesets entspricht (nämlich dem DatenbankTitel)
			 	//wird differnziert verfahren. Ziel ist es das permanente "Laden des ganzen Framesets zu vermeiden." 
			 	//Es wird also nur das Frameset neu geladen, wenn zuvor z.B. ein Dokument in einem Neuen Fenster/Tab des Browsers geladen worden ist.
			 	var sTitle = window.document.title; //objFrameSearched.document.title;
			 	//alert("Aktueller Titel: " + sTitle); 
			 	
			 	//!!! Man kann per Javascript nicht auf den Titel des Framesets zugreifen.
			 	//TODO GOON: URL-PARAMETER flagFrsReload auwerten, um herauszufinden, ob ein Reload des Framesets stattgefunden hat.
			 	//            Falls kein Reload stattgefunden hat, braucht auch das Frameset nicht neu geladen zu werden.
			 	
			 	
			 	//Leider kann man noch nicht mal auf den Titel des Framesets zugreifen.... Er eignet sich nicht zur Abfrage.
			 	//if(sTitle == "Dokumentationen (FGL)"){   //s. pagFrsStartWebVIA -  hier wird er fest vorgegeben.
			 	var bIsFrsReloaded = this.isFramesetReloaded();
			 	if(bIsFrsReloaded==false){
			 		//FALL A) Das ist  der direkte Weg.
					//Dabei ist es allerdings zwingend notwendig den Titel des Browserfensters auch direkt zu setzen. Was im Frameset nicht geht.
					//Darum wird dieser Weg nur in diesem Fall verwendet.
									
					sUrl = sUrl + "/" + sView + "?OpenView";
			 	}else{
			 		//FALL B) Frameset komplett neu laden
			 		//Damit der Title im Browser wieder geändert wird, muss ich das ganze Frameset wieder austauschen
			 		sUrl = sUrl + "/pagFrsStartWebVIA?OpenPage";  //Das funktioniert nur, weil darin der viw - Parameter ausgewertet wird und dann das Frameset reloaded wird.
			 	
			 		var sQueryStringPermanent = this.getQueryStringPermanent();
					sUrl = sUrl + "&" + sQueryStringPermanent; 	
			 	}
				
				
				var sQueryStringAdditional = this.getQueryStringAdditional();
			 	if(!isEmpty(sQueryStringAdditional)){
			 		sUrl = sUrl + sQueryStringAdditional;
			 	}
			 	 	
				//alert("ZCraft.Cgi.js#location.replace mit: '" + sUrl +"'");
			 	//aber das öffnet die View ggf. in einen anderen Frame als gewünscht (z.B. wenn man sich im SuchFrameset befindet) location.replace( sUrl );
			 	
			 	//3. Den Frame suchen. Er braucht nicht im aktuellen Frameset zu sein, sondern kann auch noch Ebenen höher liegen
			 	//ALSO: fm_main suche:
			 	//Merke: Geht nicht: parent.fm_main.location.replace(sUrl);
			 	var sNameFrame2Search = "fm_Main";
				var objFrameSearched = searchFrameTopAll(parent, sNameFrame2Search);		
				if (objFrameSearched==null) throw "Kann den Frame " & sNameFrame2Search & " nicht finden.";
			 
			 	//3a) Title ändern
			 	/* Geht aber nicht, wenn er im Frameset definiert ist: Zitat ...
			 	Der Titel (<title>...</title>), den Sie in der Datei mit der Frameset-Definition angeben, 
				wird während der gesamten Dauer des Frame-Sets angezeigt, auch wenn andere Dateien innerhalb des Frame-Sets aufgerufen werden. 
				Leider gibt es bislang keine Möglichkeit, den Titel zu aktualisieren. 
				Wählen Sie in der Datei mit der Frame-Set-Definition, deshalb einen allgemeinen, aussagekräftigen Titel, der für das gesamte Projekt Gültigkeit hat.
				
				window.document.title="TEST";
				*/
							
			 	//3b. Location austauschen
			 	//alert("goBackToView: " + sUrl);
			 	objFrameSearched.location.replace(sUrl);
			 	
	 	 	}catch(e){
		  		 throw handleErrorZZZ(e, "");
	    	}
	 	}//End main:
	 	return bReturn;	 	
	 },
	 
	 /* Über den URL-Parameter (und dem entsprechend in der CGI-Subform eingebautem Feld) kann man auslesen, 
	  * ob das Dokument, bzw. das Frameset in dem das Dokument eingebunden worden ist,
	  * "nachgeladen" wurde, oder das Dokument direkt in dem Frame geöffnet worden ist 
	  * (Merke: In der Page des Framesets wird beim Nachladen explizit der URL-Parameter '&FrsReload=n'  gesetzt).
	  */
	  isFramesetReloaded: function(){
	  	var bReturn = false;
	  	main:{
	  		try{
	  			var sFieldname = this.getFieldnameByQueryParameterAlias("isFramesetReloaded");
	  			if(isEmpty(sFieldname)) break main;
	  			
				var sFieldvalue = $F(sFieldname); //$F sucht nach der Id und gibt den Wert zurück
				sFieldvalue = sFieldvalue.strip().unescapeHTML();  //Aber eigentlich braucht man den Wert hier nicht.
				
				if(isEmpty(sFieldvalue)){
					bReturn = false;
				}else{
					bReturn = true;									
				}

	  		}catch(e){
		  		 throw handleErrorZZZ(e, "");
	    	}
	  	}//End main:
	  	return bReturn;
	  },
	  
	 /* Aus dem Query_String-Feld der SubForm (CGI-Variable) den Wert auslesen.
	  *
	  * 
	  */
	 readQueryStringParam: function(){
	 		var sReturn = "";
	 		main:{
			 	try{
			 		var hashQuery = this.getQueryParamHash();
			 		//sReturn = hashQuery.toQueryString();
			 		sReturn = hashQuery.toQueryStringUTF();
			 	}catch(e){
			  		 throw handleErrorZZZ(e, "");
		    	}
		 	}//End main:
	 	return sReturn;
	 },
	 
	
}); //End class KernelCgiZZZ
		
//Ende des Verbergens vor nicht javascript fähigen Browsern --></script>
//</head>
//</html>