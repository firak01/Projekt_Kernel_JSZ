/* Bibliothek enth�lt alle Klassen, die f�r die Validierung der verschiedenen Objekte / Masken ben�tigt werden
 * Folgender Code zeigt die Vererbung als Beispiel
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
 
 	var CategoryFileVIA = Class.create(KernelCategoryZZZ, {
		    initialize: function($super, objKernel, sReferenceId, sFieldalias){
			   	try{
			   		$super(objKernel, sReferenceId, "FileName");
			   	}catch(e){
		  		 	throw handleErrorZZZ(e, "");
	    		}
		   },		   
			getDebugString: function($super){
				return "CategoryFileVIA: #" + "#" + $super(); //damit wir die Methode der Superklasse aufgerufen. Merke nur super$ w�rde den Code der Methode zur�ckgeben
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
				return "CategoryMovieVIA: #" + "#" + $super(); //damit wir die Methode der Superklasse aufgerufen. Merke nur super$ w�rde den Code der Methode zur�ckgeben
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
				return "CategorySerieVIA: #" + "#" + $super(); //damit wir die Methode der Superklasse aufgerufen. Merke nur super$ w�rde den Code der Methode zur�ckgeben
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
				return "CategoryCarrierVIA: #" + "#" + $super(); //damit wir die Methode der Superklasse aufgerufen. Merke nur super$ w�rde den Code der Methode zur�ckgeben
			}	
	});