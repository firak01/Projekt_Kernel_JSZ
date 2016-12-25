/* Bibliothek enthält alle Klassen, die für die Validierung der verschiedenen Objekte / Masken benötigt werden.
 * Merke: Die Funktion proofValidationVIA() ist in jeder Maske enthalten und nicht in einer Teilmaske eingebunden, da in jeder Maske eine andere Validierungsklasse verwendet wird.  
 * 
 * 
 *
 * Folgender Code zeigt die Vererbung als Beispiel
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
		//Diese Funktion muss überschrieben werden
		//Todo: Exception werfen, wenn nicht überschreiben wird
		return true;
	},
	getDebugString: function($super){
		return "Alias=" + this.getAlias() + $super(); //damit wir die Methode der Superklasse aufgerufen. Merke nur super$ würde den Code der Methode zurückgeben
	}
}); //End class ValidationZZZ
 */
	var ValidationMovieVIA = Class.create(KernelValidationZZZ, {
		   initialize: function($super, objKernel){
			   	try{
			   		$super(objKernel, "Movie");
			   	}catch(e){
		  		 	throw handleErrorZZZ(e, "");
	    		}
		   },
		   	//überschreiben der isValid-Methode
			isValid: function(){
				var bReturn = true;
				try{
				
					//1. Voraussetzung Feld MovieTitle soll muss der hinterlegten Category entsprechen
					//    Falls das nicht der Fall ist, wurde der Button <Aktualisieren> nicht gedrückt.
					var sFieldname = "MovieTitle";
					
					//Merke: document.forms["Formularname"].elements["Elementname"].Eigenschaft
					var _fieldOld=getPrefixCategoryValue() + sFieldname;      //Kategoriefeld
					var _valueOld=document.forms[0].elements["" + _fieldOld +""].value; 
					var _valueNew=document.forms[0].elements["" + sFieldname + ""].value;  //Der neue Feldname. Dies entspricht der id, die im Reiter der Feldeigenschaft (für HTML) eingestellt ist
					
					//alert("isValid() für ValueNew='" + _valueNew + "' und ValueOld='" + _valueOld + "'");
					if(_valueNew != _valueOld){
						this.setMessageOnError('Die Aktualisierung bitte vornehmen');
						this.setDivNameOnError(getPrefixDivError() + sFieldname);       //Das ist ein div unter dem erwähnten Button
						bReturn = false;
					}
		 		}catch(e){
					 	throw handleErrorZZZ(e, "");
			    }
				return bReturn;
			},
			getDebugString: function($super){
				return "ValidationMovieVIA: #" + "#" + $super(); //damit wir die Methode der Superklasse aufgerufen. Merke nur super$ würde den Code der Methode zurückgeben
			}	
	});

	var ValidationSerieVIA = Class.create(KernelValidationZZZ, {
		   //überschreiben der initialize-Methode
		   initialize : function($super, objKernel){
		   		$super(objKernel, "Serie");
		   },
		   	//überschreiben der isValid-Methode
			isValid: function(){
				var bReturn = true;
				try{
					//1. Voraussetzung Feld SerieTitle soll muss der hinterlegten Category entsprechen
					//    Falls das nicht der Fall ist, wurde der Button <Aktualisieren> nicht gedrückt.
					var sFieldname = "SerieTitle";
					
					//Merke: document.forms["Formularname"].elements["Elementname"].Eigenschaft
					var _fieldOld=getPrefixCategoryValue() + sFieldname;      //Kategoriefeld
					var _valueOld=document.forms[0].elements["" + _fieldOld +""].value; 
					var _valueNew=document.forms[0].elements["" + sFieldname + ""].value;  //Der neue Feldname. Dies entspricht der id, die im Reiter der Feldeigenschaft (für HTML) eingestellt ist
					
					//alert("isValid() für ValueNew='" + _valueNew + "' und ValueOld='" + _valueOld + "'");
					if(_valueNew != _valueOld){
						this.setMessageOnError('Die Aktualisierung bitte vornehmen');
						this.setDivNameOnError(getPrefixDivError() + sFieldname);       //Das ist ein div unter dem erwähnten Button
						bReturn = false;
					}
				}catch(e){
		  		 	throw handleErrorZZZ(e, "");
	    		}
				return bReturn;
			},
			getDebugString: function($super){
				return "ValidationSerieVIA: #" + "#" + $super(); //damit wir die Methode der Superklasse aufgerufen. Merke nur super$ würde den Code der Methode zurückgeben
			}		
	});

	var ValidationFileVIA = Class.create(KernelValidationZZZ, {
		   //überschreiben der initialize-Methode
		   initialize : function($super, objKernel){
		   		$super(objKernel, "File");
		   },
		   	//überschreiben der isValid-Methode
			isValid: function(){
				var bReturn = true;
				try{
					//1. Voraussetzung Feld SerieTitle soll muss der hinterlegten Category entsprechen
					//    Falls das nicht der Fall ist, wurde der Button <Aktualisieren> nicht gedrückt.
					var sFieldname = "FileName";
					
					//Merke: document.forms["Formularname"].elements["Elementname"].Eigenschaft
					var _fieldOld=getPrefixCategoryValue() + sFieldname;      //Kategoriefeld
				
					var objDoc = this.getKernelObject().getDocumentCurrent();
					//var _valueNew=document.forms[0].elements["" + sFieldname + ""].value;  //Der neue Feldname. Dies entspricht der id, die im Reiter der Feldeigenschaft (für HTML) eingestellt ist
					//var _valueNew=$F(sFieldname);  //Der neue Feldname. Dies entspricht der id, die im Reiter der Feldeigenschaft (für HTML) eingestellt ist
					var _valueNew=objDoc.forms[0].elements["" + sFieldname + ""].value;  //Der neue Feldname. Dies entspricht der id, die im Reiter der Feldeigenschaft (für HTML) eingestellt ist
				
					//var _valueOld=document.forms[0].elements["" + _fieldOld +""].value; 
					//var _valueOld=$F(_fieldOld); 
					var _valueOld=objDoc.forms[0].elements["" + _fieldOld +""].value; 
					
					//alert("isValid() für ValueNew='" + _valueNew + "' und ValueOld='" + _valueOld + "'");
					if(_valueNew != _valueOld){
						this.setMessageOnError('Die Aktualisierung bitte vornehmen');
						this.setDivNameOnError(getPrefixDivError() + sFieldname);       //Das ist ein div unter dem erwähnten Button
						bReturn = false;
					}
	 			}catch(e){
		  		 	throw handleErrorZZZ(e, "");
	    		}
				return bReturn;
			},
			getDebugString: function($super){
				return "ValidationFileVIA: #" + "#" + $super(); //damit wir die Methode der Superklasse aufgerufen. Merke nur super$ würde den Code der Methode zurückgeben
			}		
	});
	
	var ValidationCarrierVIA = Class.create(KernelValidationZZZ, {
		   //überschreiben der initialize-Methode
		   initialize : function($super, objKernel){
		   		$super(objKernel, "Carrier");
		   },
		   	//überschreiben der isValid-Methode
			isValid: function(){
				var bReturn = true;
				try{
					//1. Voraussetzung Feld CarrierTitle soll muss der hinterlegten Category entsprechen
					//    Falls das nicht der Fall ist, wurde der Button <Aktualisieren> nicht gedrückt.
					var sFieldname = "CarrierTitle";
					
					//Merke: document.forms["Formularname"].elements["Elementname"].Eigenschaft
					var _fieldOld=getPrefixCategoryValue() + sFieldname;      //Kategoriefeld
					var _valueOld=document.forms[0].elements["" + _fieldOld +""].value; 
					var _valueNew=document.forms[0].elements["" + sFieldname + ""].value;  //Der neue Feldname. Dies entspricht der id, die im Reiter der Feldeigenschaft (für HTML) eingestellt ist
					
					//alert("isValid() für ValueNew='" + _valueNew + "' und ValueOld='" + _valueOld + "'");
					if(_valueNew != _valueOld){
						this.setMessageOnError('Die Aktualisierung bitte vornehmen');
						this.setDivNameOnError(getPrefixDivError() + sFieldname);       //Das ist ein div unter dem erwähnten Button
						bReturn = false;
					}
	 			}catch(e){
		  		 	throw handleErrorZZZ(e, "");
	    		}
				return bReturn;
			},
			getDebugString: function($super){
				return "ValidationCarrierVIA: #" + "#" + $super(); //damit wir die Methode der Superklasse aufgerufen. Merke nur super$ würde den Code der Methode zurückgeben
			}	
	});
	