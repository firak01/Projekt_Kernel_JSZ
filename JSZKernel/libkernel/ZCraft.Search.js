//<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
//<html>
//<head>
//<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
//<script language="JavaScript" type="text/javascript">
//<!-- Vor nicht Javascript f�higen Browsern verbergen 

/* Grundliegendes Kernel Objekt, von dem alle anderen Suchobjekte der jeweiligen Applikation erben.
 *  Verwendet wird das "Prototype" - Framework.
 */
var KernelSearchZZZ = Class.create(KernelUseObjectZZZ, {
	//�berschreibe die intitialize-Methode & �bergabe des kernel Objekts !!!
	initialize : function($super, objKernel){
		try{
			$super(objKernel); //Aufruf der Methode der Elternklasse

			//Initialisieren der privaten Properties dieses Objekts
			this.sDbSearchAlias = "";		
			this.docSearch = null; //Die Suchmaske, normalerweise das aktuele Dokument im Kernel-objekt.
		}catch(e){
	  		 throw handleErrorZZZ(e, "");
    	}
	},
	getDbSearchAlias: function(){
		var sReturn= this.sDbSearchAlias;
		try{
			if(isEmpty(sReturn)){
				sReturn = this.readDbSearchAlias();
				if(isEmpty(sReturn)){
					throw("unable to read alias of search database from document");
				}
				this.sDbSearchAlias = sReturn;
			}
			return sReturn;
		}catch(e){
	  		 throw handleErrorZZZ(e, "");
    	}
	},
	setDbSearchAlias: function(sAlias){
		this.sDbSearchAlias = sAlias;
	},
	readDbSearchAlias:function(){
		var sReturn = "";
		try{
			var objKernel = this.getKernelObject();
			var sKey = objKernel.getApplicationKey();			
			sReturn = $F("objAliasDbSearch" + sKey);
			return sReturn;	
		}catch(e){
	  		throw handleErrorZZZ(e, "");
    	}
	},
	getDbSearchUrl:function(){
		var sReturn = "";
		try{
			var sSearchAlias = this.getDbSearchAlias();
			if(isEmpty(sSearchAlias)) throw "no alias for the search db provided";
			
			var objKernel = this.getKernelObject();
			sReturn = objKernel.getUrlByAlias(sSearchAlias);
			return sReturn;
		}catch(e){
	  		throw handleErrorZZZ(e, "");
    	}
	},
	getFramesetSearch: function(){
		try{
			throw "getFramesetSearch(): This method has to be overwritten by the custom-application-object";
		}catch(e){
	  		throw handleErrorZZZ(e, "");
    	}
	},
	getFramesetSearchUrl:function(){
		var sReturn = "";
		try{
			var sFrameset = this.getFramesetSearch();
			sReturn = this.getDbSearchUrl() + "/" + sFrameset;
			return sReturn;
		}catch(e){
	  		throw handleErrorZZZ(e, "");
    	}
	},
	getFrameTargetName:function(){
		//Der Name des Frame, in dem das Suchframeset ge�ffnet werden soll
		try{
			throw "getFrameTargetName(): This method has to be overwritten by the custom-application-object";
		}catch(e){
	  		throw handleErrorZZZ(e, "");
    	}		
	},
	getViewSearch: function(){
		try{
			throw "getViewSearch(): This method has to be overwritten by the custom-application-object";
		}catch(e){
	  		throw handleErrorZZZ(e, "");
    	}
	},
	getViewSearchUrl: function(){
		var sReturn = "";
		try{
			var sView = this.getViewSearch();
			sReturn = this.getDbSearchUrl() + "/" + sView;
			return sReturn;
		}catch(e){
	  		throw handleErrorZZZ(e, "");
    	}
	},
	/** �ffnet das Suchframeset
	 * 
	 */
	openSearch:function(){
		var bReturn = false;
		try{
			//1. Name des Suchframeworks ermitteln
			var sFramesetUrl = this.getFramesetSearchUrl();
			var sUrl = sFramesetUrl + "?OpenFrameset";  //Domino Url, um das Frameset zu �ffnen
			
			
			//2. Name des Frames in dem das Suchframework ge�ffnet werden soll
			var sNameFrame2Search = this.getFrameTargetName();
				
			//3. Den Frame suchen. Er braucht nicht im aktuellen Frameset zu sein, sondern kann auch noch Ebenen h�her liegen
			var objFrameParent = searchFrameTop(parent, sNameFrame2Search);		
			if (objFrameParent==null) throw "Kann den Frame " & sNameFrame2Search & " nicht finden.";
			
			//4. letztendlich die Url im Frame �ffnen
			objFrameParent.frames[sNameFrame2Search].location.href = sUrl;
			bReturn = true;
		}catch(e){
			throw handleErrorZZZ(e, "");
		}
		return bReturn;
	},
	
	/**�ffnet das Suchframeset
	 *  und �bergibt dabei einen zus�tzlichen QueryString.
	 * Dieser QueryString ist z.B. der Alias der gerade ge�ffneten View.
	 * Annahme: es sind nur die reinen Parameter
	 */
		openSearch:function(sQueryStringAdditional){
		var bReturn = false;
		try{
			//1. Name des Suchframeworks ermitteln
			var sFramesetUrl = this.getFramesetSearchUrl();
			var sUrl = "";
			if(isEmpty(sQueryStringAdditional)){
				//Will man an dieses Frameset noch QueryStrings �bergeben, so muss man eine Page �ffenen, die diese enth�lt 
				//sUrl = sFramesetUrl + "?OpenFrameset";  //Domino Url, um das Frameset zu �ffnen
				sUrl = sFramesetUrl + "?OpenPage";  //Domino Url, um die Page zu �ffnen in der das Frameset enthalten ist
			}else{
				//sUrl = sFramesetUrl + "?OpenFrameset" + sQueryStringAdditional;  //Domino Url, um das Frameset zu �ffnen
				sUrl = sFramesetUrl + "?OpenPage" + sQueryStringAdditional;  //Domino Url, um die Page zu �ffnen in der das Frameset enthalten ist
			}
			
			
			//2. Name des Frames in dem das Suchframework ge�ffnet werden soll
			var sNameFrame2Search = this.getFrameTargetName();
				
			//3. Den Frame suchen. Er braucht nicht im aktuellen Frameset zu sein, sondern kann auch noch Ebenen h�her liegen
			var objFrameParent = searchFrameTopAll(parent, sNameFrame2Search);		
			if (objFrameParent==null) throw "Kann den Frame " & sNameFrame2Search & " nicht finden.";
			
			//4. letztendlich die Url im Frame �ffnen
			//objFrameParent.frames[sNameFrame2Search].location.href = sUrl;
			objFrameParent.location.href = sUrl;
			bReturn = true;
		}catch(e){
			throw handleErrorZZZ(e, "");
		}
		return bReturn;
	},
	
	
	/** Handle auf das Suchformular
	 * 
	 */
	 getDocumentSearch:function(){
	 	var docReturn = this.docSearch;
	 	try{
	 		if(docReturn==null){
	 			docReturn = this.getKernelObject().getDocumentCurrent();
	 			if(docReturn==null) throw "Kein handle auf das aktuelle Suchformular";
	 		}
	 	}catch(e){
			throw handleErrorZZZ(e, "");
		}
		return docReturn;
	 },
	 
	 /**
	  * 
	  */
	  setDocumentSearch:function(docSearchIn){
	  	this.docSearch = docSearchIn;
	  },
	 
	/** f�hre die Suche durch 
	 * 
	 */
	 doSearch:function(){
	 	var bReturn = false;
	 	try{
	 		var docSearch = this.getDocumentSearch();
			if (docSearch == null) throw "No handle on search document formular.";
			
	 		//######################################
	 		//1 . Zusammenbau der Suche
			//A) Volltextsuche
			var sQueryFulltext = this.readQueryFulltextString();
			var sQueryTotal = "";
			if( sQueryFulltext !="" ) {
				sQueryTotal =  sQueryFulltext;
		 	 }
			if(sQueryTotal == "") return bReturn;
	 		
	 		//2. Die URL der Suchdatenbank auslesen
			var sUrlDbSearch = this.getDbSearchUrl();
	 		
	 		//3. Die Url der Suchansicht auslesen
	 		var sViewSearchUrl = this.getViewSearchUrl();
	 		
	 		//4. Die Suche durchf�hren, d.h. eine Domino URL �ffnen
	 	  	var sTempURL = sViewSearchUrl + "?SearchView&Query=" + sQueryTotal + "&Count=300&SearchFuzzy=FALSE&SearchWV=TRUE";
	    	 if(parent.SearchResult!=null){ //Falls die Maske ausserhalb des Framesets ge�ffnet wird
                        parent.SearchResult.location.replace(sTempURL);
	   		  }else{
				         location.replace( sTempURL );
			}    
	 	}catch(e){
			throw handleErrorZZZ(e, "");
		}
	 },
	 
	 	/** f�hre die Suche durch 
	 * 
	 */
	 doSearch:function(sQueryStringAdditional){
	 	var bReturn = false;
	 	try{
	 		var docSearch = this.getDocumentSearch();
			if (docSearch == null) throw "No handle on search document formular.";
			
	 		//######################################
	 		//1 . Zusammenbau der Suche
			//A) Volltextsuche
			var sQueryFulltext = this.readQueryFulltextString();
			var sQueryTotal = "";
			if( sQueryFulltext !="" ) {
				sQueryTotal =  sQueryFulltext;
		 	 }
			if(sQueryTotal == "") return bReturn;
	 		
	 		//2. Die URL der Suchdatenbank auslesen
			var sUrlDbSearch = this.getDbSearchUrl();
	 		
	 		//3. Die Url der Suchansicht auslesen
	 		var sViewSearchUrl = this.getViewSearchUrl();
	 		
	 		//4. Die Suche durchf�hren, d.h. eine Domino URL �ffnen
	 	  	var sTempURL = sViewSearchUrl + "?SearchView&Query=" + sQueryTotal + "&Count=300&SearchFuzzy=FALSE&SearchWV=TRUE" + sQueryStringAdditional;
	    	 if(parent.SearchResult!=null){ //Falls die Maske ausserhalb des Framesets ge�ffnet wird
                        parent.SearchResult.location.replace(sTempURL);
	   		  }else{
				         location.replace( sTempURL );
			}    
	 	}catch(e){
			throw handleErrorZZZ(e, "");
		}
	 },
	 
	 /**
	  * 
	  */
	 readQueryFulltextString:function(){
	 	try{
			throw "readQueryFulltextString(): This method has to be overwritten by the custom-application-object";
		}catch(e){
	  		throw handleErrorZZZ(e, "");
    	}	
	 },
	 getDebugString: function($super){
		return "KernelSearchZZZ: #DbSearchAlias="+this.sDbSearchAlias + "#" + $super(); //damit wir die Methode der Superklasse aufgerufen. Merke nur super$ w�rde den Code der Methode zur�ckgeben
	}
}); //End class KernelSearchZZZ


//Ende des Verbergens vor nicht javascript f�higen Browsern --></script>
//</head>
//</html>


 