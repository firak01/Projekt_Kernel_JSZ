//<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
//<html>
//<head>
//<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
//<script language="JavaScript" type="text/javascript">
//<!-- Vor nicht Javascript fähigen Browsern verbergen 

/* Grundliegendes Kernel Objekt, das mit der gleichnamigen Subform in Verbindung steht.
 * Darüber kann die in Notes-Profildokumenten eingetragene Konfiguration ausgelesen werden.
 *  Verwendet wird das "Prototype" - Framework.
 */
var KernelKernelZZZ = Class.create({
	initialize : function(objDocument){
		this.sKernelKey="";
		this.saApplicationKeyAll=$A();
		this.sApplicationKeyDefault="";
		this.sApplicationKey="";
		this.sSystemNumber="";
		this.sFileConfigPath="";
		this.sFileConfigName="";
		this.sResultContentType="";
		this.objDocument = objDocument;  //DAS DOM-Object, kein NotesDocument
	},
	
	/**
	 * 
	 */
	getApplicationKey: function(){
		var sReturn = this.sApplicationKey;
		try{
			//Falls es schon einmal ermittelt worden ist, den Wert zurückgeben
			if(! isEmpty(sReturn)){
				return sReturn;	
			}
			
			//Wert neu einlesen
			var sKernelKey = this.getKernelKey();
			sReturn = $F("objApplicationKey"+sKernelKey);
			if(isEmpty(sReturn)){
				sReturn = this.getApplicationKeyDefault();
			}
			this.sApplicationKey = sReturn;
			return sReturn;
		}catch(e){
			throw handleErrorZZZ(e, "");
		}
	},
	
	getSystemNumber: function(){
		var sReturn = this.sSystemNumber;
		try{
			//Falls es schon einmal ermittelt worden ist, den Wert zurückgeben
			if(! isEmpty(sReturn)){
				return sReturn;	
			}
			
			//Wert neu einlesen
			var sKernelKey = this.getKernelKey();
			sReturn = $F("objSystemNumber"+sKernelKey);
			if(isEmpty(sReturn)){
				sReturn = this.getSystemNumberDefault();
			}
			this.sSystemNumber = sReturn;
			return sReturn;
		}catch(e){
			throw handleErrorZZZ(e, "");
		}
	},
	
	getFileConfigPath: function(){
		var sReturn = this.sFileConfigPath;
		try{
			//Falls es schon einmal ermittelt worden ist, den Wert zurückgeben
			if(! isEmpty(sReturn)){
				return sReturn;	
			}
			
			//Wert neu einlesen
			var sKernelKey = this.getKernelKey();
			sReturn = $F("objFileConfigPath"+sKernelKey);
			if(isEmpty(sReturn)){
				sReturn = this.getFileConfigPathDefault();
			}
			this.sFileConfigPath = sReturn;
			return sReturn;
		}catch(e){
			throw handleErrorZZZ(e, "");
		}
	},
	
	getFileConfigPathDefault: function(){
		return "c:\\fglkernel\\kernelconfig";
	},
	
	getFileConfigName: function(){
		var sReturn = this.sFileConfigName;
		try{
			//Falls es schon einmal ermittelt worden ist, den Wert zurückgeben
			if(! isEmpty(sReturn)){
				return sReturn;	
			}
			
			//Wert neu einlesen
			var sKernelKey = this.getKernelKey();
			sReturn = $F("objFileConfigName"+sKernelKey);
			if(isEmpty(sReturn)){
				sReturn = this.getFileConfigNameDefault();
			}
			this.sFileConfigName = sReturn;
			return sReturn;
		}catch(e){
			throw handleErrorZZZ(e, "");
		}
	},
	
	getFileConfigNameDefault: function(){
		return "ZKernelConfigKernel_default.ini";
	},
	
	getResultContentType: function(){
		var sReturn = this.sResultContentType;
		try{
			//Falls es schon einmal ermittelt worden ist, den Wert zurückgeben
			if(! isEmpty(sReturn)){
				return sReturn;	
			}
			
			//Wert neu einlesen
			var sKernelKey = this.getKernelKey();
			sReturn = $F("objResultContentType"+sKernelKey);
			if(isEmpty(sReturn)){
				sReturn = this.getResultContentTypeDefault();
			}
			this.sResultContentType = sReturn;
			return sReturn;
		}catch(e){
			throw handleErrorZZZ(e, "");
		}
	},
	
	getResultContentTypeDefault: function(){
		return "text/html";
	},
	
	
	/**
	 * 
	 */
	getApplicationKeyAll: function(){
		var saReturn = this.saApplicationKeyAll;
		try{
			//Falls es schon einmal ermittelt worden ist, den Wert zurückgeben
			if(! isEmpty(saReturn)){
				return saReturn;	
			}
			
			//Wert neu einlesen
			var sKernelKey = this.getKernelKey();
			var sTemp = $F("objApplicationKeyAll"+sKernelKey);
			saReturn = sTemp.evalJSON();
			this.saApplicationKeyAll = saReturn;
			return saReturn;
		}catch(e){
			throw handleErrorZZZ(e, "");
		}
	},
	
	/**
	 * 
	 */
	getApplicationKeyDefault: function(){
		var sReturn = this.sApplicationKeyDefault;
		try{
			//Falls es schon einmal ermittelt worden ist, den Wert zurückgeben
			if(! isEmpty(sReturn)){
				return sReturn;	
			}
			
			//Wert neu einlesen
			var sKernelKey = this.getKernelKey();
			var stemp = $F("objApplicationKeyDefault"+sKernelKey);
			if(isEmpty(stemp)){
				//Als Default wird der erste Wert aus der Liste der Applikation-Keys genommen;
				stemp = $F("objApplicationKeyAll"+sKernelKey);
				sReturn = stemp.evalJSON();
			}else{
				sReturn = stemp;
			}
			this.sApplicationKeyDefault = sReturn;
			return sReturn;
		}catch(e){
			throw handleErrorZZZ(e, "");
		}
	},
	
	getSystemNumberDefault: function(){
		return "01";
	},
	
	/* Über diese Url sollen Desingelemente, Dokumente, etc. erreicht werden.
	 * 
	 */
	getConfigurationUrlCurrent: function(){
		//Merke: Die Konfigurationsdb ist so essentiell, dass ein Fehler geworfen wird, wenn sie nicht existiert.
		var sReturn = "";
		try{
			sReturn = this.getUrlByAlias("Configuration");
			return sReturn;
		}catch(e){
			throw handleErrorZZZ(e, "");
		}
	},
	
	/**
	 * 
	 */
	getDbPathByAlias: function(sAlias){
		//PathDb ... Alias ... ApplicationKey
		var sReturn = "";
		try{
			if(isEmpty(sAlias)){
				throw "getDbPathByAlias: Kein Aliasstring übergeben.";
			}
			
			var sKeyApplication = this.getApplicationKey();
			sReturn = $F("PathDb"+ sAlias + sKeyApplication);
			return sReturn;
		}catch(e){
			throw handleErrorZZZ(e, "");
		}
	},
	
	/**
	 * 
	 */
	getDbServerByAlias: function(sAlias){
		//Server ... Alias ... ApplicationKey
		var sReturn = "";
		try{
			if(isEmpty(sAlias)){
				throw "getDbServerByAlias: Kein Aliasstring übergeben.";
			}
			
			var sKeyApplication = this.getApplicationKey();
			sReturn = $F("Server"+ sAlias + sKeyApplication);
			return sReturn;
		}catch(e){
			throw handleErrorZZZ(e, "");
		}
	},
	
	/**
	 * 
	 */
	getKernelKey: function(){
		var sReturn = this.sKernelKey;
		try{
			//Falls es schon einmal ermittelt worden ist, den Wert zurückgeben
			if(! isEmpty(sReturn)){
				return sReturn;	
			}
			
			sReturn = $F("objKernelKey");
			this.sKernelKey=sReturn;
			return sReturn;
		}catch(e){
			throw handleErrorZZZ(e, "");
		}
	},
	
	/**
	 * 
	 */
	getUrlByAlias: function(sAlias){
		//Merke: Fehlen einer Datenbankkonfiguration ist so essentiell, dass ein Fehler geworfen wird.
		var sReturn = "";
		try{
			if(isEmpty(sAlias)){
				throw("getUrlByAlias(...): Kein Alias übergeben.");
			};
			
			/*
			var sServer = this.getDbServerByAlias("Configuration");
			if(isEmpty(sServer)){
				throw("Kein Server für die Configurations-Db gepflegt.");
			};
			*/
			var sDbPath = this.getDbPathByAlias(sAlias);
			if(isEmpty(sDbPath)){
				throw("getUrlByAlias(...): Kein Pfad für die Configurations-Db gepflegt.");
			};
			
			//Aus dem üergebenen Notes - Pfad nun eine URL machen.
			//1. Backslash durch Slash ersetzen (verwendet wird eine Methode aus dem Prototype-Framework)
			var sPattern = "[/\\\\/]";  //Dadurch wird der Backslash im Regulären Ausdruck (RegEx) ausmaskiert
			sDbPath = sDbPath.gsub(sPattern,'/');
			
			//2. Falls kein Slash am Anfang steht, dann einen hinzufügen. Ziel: Mit dieser URL soll die Datenbank geöffnet werden können.
			if(getStrLeft(sDbPath, 1)!="/"){
				sDbPath = "/" + sDbPath;
			}
			
			//3: Encoden
			sDbPath=encodeURI(sDbPath);			
			sReturn = sDbPath;
			return sReturn;
		}catch(e){
			throw handleErrorZZZ(e, "");
		}
	},
	
	/** Wurde im Konstruktor übergeben
	 * 
	 */
	getDocumentCurrent:function(){
		return this.objDocument;
	},
	
	getDocumentUniqueId:function(){
		return $F("objDocumentUniqueId" + this.getKernelKey());
	},
	
	/** Die Ansicht für alle Refernzen (Feld objRef)
	 * 
	 */
	getViewLookupReference:function(){
		return "viwLookupRef"+this.getApplicationKey();
	},
	
	/**Feldnamen Präfix für die ReferenzId. Normalerweise die universalid des Documents.
 	* <BR> z.B. objRefVIA
 	* 
 	*/
	 getFieldnameReference: function (){
	 	return "objRef"+this.getApplicationKey();
	 },
	 
	 /**Name des Dokumenttyps
	 *<BR>Z.B. als Feldname: AliasVIA = "carrier" 
	 */
	 getFieldnameAlias: function(){
 		return "objAlias"+this.getApplicationKey();
	 },
	 
	 /**Die wichtigen Apllikationsspezifischen/Kernelspezifiischen IDs werden hier definert und können hier abgefragt werden.
	  *  Merke: Andere "Craft"-Klassen (z.B. DimUI) nutzen diesen "Pool" an Ids.
	  */
	 getDomIdByAlias: function(sDomIdAlias){
	 	var sReturn="";
	 	main:{
	 		try{
		 		if(isEmpty(sDomIdAlias)) break main;
		 		
			 	var sAlias = sDomIdAlias.toLowerCase();
			 	if(sAlias="wait"){
			 		sReturn="waitText" + this.getApplicationKey(); //Div, enthält einen "Bitte Warten" Text und ggf. auch ein Bild. Befindet sich in der Applikationsspezifischen ja-Teilmaske
			 	}else{
			 		throw "No Dom Id for the alias '" + sDomIdAlias + "' is configured.";
			 	}
		 	}catch(e){
		  		 throw handleErrorZZZ(e, "");
	    	}
	 	}//end main
	 	return sReturn;
	 },
	
	/**
	 * 
	 */
	getMultivalueByJsonTest: function(sId){
		try{
			var sValue=$F(sId);		
			var saReturn = sValue.evalJSON();
			return saReturn;
		}catch(e){
				throw handleErrorZZZ(e, "");
		}
	}
}); //End class KernelKernelZZZ

//Ende des Verbergens vor nicht javascript fähigen Browsern --></script>
//</head>
//</html>