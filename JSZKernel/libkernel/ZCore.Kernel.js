//<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
//<html>
//<head>
//<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
//<script language="JavaScript" type="text/javascript">
//<!-- Vor nicht Javascript f�higen Browsern verbergen 

/* Grundliegendes Kernel Objekt, das mit der gleichnamigen Subform in Verbindung steht.
 * Dar�ber kann die in Notes-Profildokumenten eingetragene Konfiguration ausgelesen werden.
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
			//Falls es schon einmal ermittelt worden ist, den Wert zur�ckgeben
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
			//Falls es schon einmal ermittelt worden ist, den Wert zur�ckgeben
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
			//Falls es schon einmal ermittelt worden ist, den Wert zur�ckgeben
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
			//Falls es schon einmal ermittelt worden ist, den Wert zur�ckgeben
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
			//Falls es schon einmal ermittelt worden ist, den Wert zur�ckgeben
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
			//Falls es schon einmal ermittelt worden ist, den Wert zur�ckgeben
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
			//Falls es schon einmal ermittelt worden ist, den Wert zur�ckgeben
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
	
	/* �ber diese Url sollen Desingelemente, Dokumente, etc. erreicht werden.
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
				throw "getDbPathByAlias: Kein Aliasstring �bergeben.";
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
				throw "getDbServerByAlias: Kein Aliasstring �bergeben.";
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
			//Falls es schon einmal ermittelt worden ist, den Wert zur�ckgeben
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
				throw("getUrlByAlias(...): Kein Alias �bergeben.");
			};
			
			/*
			var sServer = this.getDbServerByAlias("Configuration");
			if(isEmpty(sServer)){
				throw("Kein Server f�r die Configurations-Db gepflegt.");
			};
			*/
			var sDbPath = this.getDbPathByAlias(sAlias);
			if(isEmpty(sDbPath)){
				throw("getUrlByAlias(...): Kein Pfad f�r die Configurations-Db gepflegt.");
			};
			
			//Aus dem �ergebenen Notes - Pfad nun eine URL machen.
			//1. Backslash durch Slash ersetzen (verwendet wird eine Methode aus dem Prototype-Framework)
			var sPattern = "[/\\\\/]";  //Dadurch wird der Backslash im Regul�ren Ausdruck (RegEx) ausmaskiert
			sDbPath = sDbPath.gsub(sPattern,'/');
			
			//2. Falls kein Slash am Anfang steht, dann einen hinzuf�gen. Ziel: Mit dieser URL soll die Datenbank ge�ffnet werden k�nnen.
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
	
	/** Wurde im Konstruktor �bergeben
	 * 
	 */
	getDocumentCurrent:function(){
		return this.objDocument;
	},
	
	getDocumentUniqueId:function(){
		return $F("objDocumentUniqueId" + this.getKernelKey());
	},
	
	/** Die Ansicht f�r alle Refernzen (Feld objRef)
	 * 
	 */
	getViewLookupReference:function(){
		return "viwLookupRef"+this.getApplicationKey();
	},
	
	/**Feldnamen Pr�fix f�r die ReferenzId. Normalerweise die universalid des Documents.
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
	 
	 /**Die wichtigen Apllikationsspezifischen/Kernelspezifiischen IDs werden hier definert und k�nnen hier abgefragt werden.
	  *  Merke: Andere "Craft"-Klassen (z.B. DimUI) nutzen diesen "Pool" an Ids.
	  */
	 getDomIdByAlias: function(sDomIdAlias){
	 	var sReturn="";
	 	main:{
	 		try{
		 		if(isEmpty(sDomIdAlias)) break main;
		 		
			 	var sAlias = sDomIdAlias.toLowerCase();
			 	if(sAlias="wait"){
			 		sReturn="waitText" + this.getApplicationKey(); //Div, enth�lt einen "Bitte Warten" Text und ggf. auch ein Bild. Befindet sich in der Applikationsspezifischen ja-Teilmaske
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

//Ende des Verbergens vor nicht javascript f�higen Browsern --></script>
//</head>
//</html>