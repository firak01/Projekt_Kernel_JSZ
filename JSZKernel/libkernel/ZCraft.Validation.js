//<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
//<html>
//<head>
//<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
//<script language="JavaScript" type="text/javascript">
//<!-- Vor nicht Javascript f�higen Browsern verbergen 

/* Grundliegendes Kernel Objekt, von dem alle anderen Validierungsobjekte der jeweiligen Maske erben.
 *  Verwendet wird das "Prototype" - Framework.
 */

 
 /*var KernelValidationZZZ = Class.create(KernelObjectZZZ, {
	initialize : function($super, objKernel, sAlias){
	*/
 var KernelValidationZZZ = Class.create( KernelUseObjectZZZ, {
	initialize : function($super, objKernel, sAlias){
		try{
			$super(objKernel);
		
			this.sAlias = sAlias;		
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
		return false;
	},
	getDebugString: function($super){
		return "KernelValidationZZZ: #Alias=" + this.getAlias() + "#" + $super(); //damit wir die Methode der Superklasse aufgerufen. Merke nur super$ w�rde den Code der Methode zur�ckgeben
	}
}); //End class ValidationZZZ



/* Funktion wird im onSubmit() einer Maske, zw. in der proofValidation-Funktion der jeweiligen Applikation/Maske aufgerufen.
 * 
 * objValidation = jeweiliges Validation-Objekt. Wichtig ist nur, dass es die Methode .isValid() besitzt
 * sFieldnameOnError = div-Section, die bei einem Fehler angezeigt werden soll
 * 
 */
function proofValidationZZZ(objValidation, sDivNameOnError){
	var bReturn = false;
	try{
		bReturn = objValidation.isValid();
		if(bReturn==false){
			var btemp = objValidation.showError();
		}
		return bReturn;
	}catch(e){
	   throw handleErrorZZZ(e, "");
    }
}
 
 

//Ende des Verbergens vor nicht javascript f�higen Browsern --></script>
//</head>
//</html> 
		