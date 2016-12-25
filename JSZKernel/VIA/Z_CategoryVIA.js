/* Bibliothek enthält alle Klassen, die für die Validierung der verschiedenen Objekte / Masken benötigt werden
 * Folgender Code zeigt die Vererbung als Beispiel
 * MERKE: Methoden Überladung (d.h. Verwendung des gleichen Methodennamens mit unterschiedlichen Parametern) scheint nicht zu funktionieren.
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
 
 	var CategoryFileVIA = Class.create(KernelCategoryZZZ, {
		    initialize: function($super, objKernel, sReferenceId, sFieldalias){
			   	try{
			   		$super(objKernel, sReferenceId, "FileName");
			   	}catch(e){
		  		 	throw handleErrorZZZ(e, "");
	    		}
		   },		   
			getDebugString: function($super){
				return "CategoryFileVIA: #" + "#" + $super(); //damit wir die Methode der Superklasse aufgerufen. Merke nur super$ würde den Code der Methode zurückgeben
			}	
	});
	var CategoryMovieVIA = Class.create(KernelCategoryZZZ, {
		    initialize: function($super, objKernel, sReferenceId, sFieldalias){
			   	try{
			   		$super(objKernel, sReferenceId, "MovieTitle");
			   	}catch(e){
		  		 	throw handleErrorZZZ(e, "");
	    		}
		   },		   
			getDebugString: function($super){
				return "CategoryMovieVIA: #" + "#" + $super(); //damit wir die Methode der Superklasse aufgerufen. Merke nur super$ würde den Code der Methode zurückgeben
			}	
	});

	var CategorySerieVIA = Class.create(KernelCategoryZZZ, {
		    initialize: function($super, objKernel, sReferenceId, sFieldalias){
			   	try{
			   		$super(objKernel, sReferenceId, "SerieTitle");
			   	}catch(e){
		  		 	throw handleErrorZZZ(e, "");
	    		}
		   },		   
			getDebugString: function($super){
				return "CategorySerieVIA: #" + "#" + $super(); //damit wir die Methode der Superklasse aufgerufen. Merke nur super$ würde den Code der Methode zurückgeben
			}	
	});

	var CategoryCarrierVIA = Class.create(KernelCategoryZZZ, {
		    initialize: function($super, objKernel, sReferenceId, sFieldalias){
			   	try{
			   		$super(objKernel, sReferenceId, "CarrierTitle");
			   	}catch(e){
		  		 	throw handleErrorZZZ(e, "");
	    		}
		   },		   
			getDebugString: function($super){
				return "CategoryCarrierVIA: #" + "#" + $super(); //damit wir die Methode der Superklasse aufgerufen. Merke nur super$ würde den Code der Methode zurückgeben
			}	
	});