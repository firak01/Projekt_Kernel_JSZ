//<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
//<html>
//<head>
//<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
//<script language="JavaScript" type="text/javascript">
//<!-- Vor nicht Javascript fähigen Browsern verbergen 

/*Klasse bietet die Funktionalität zur Verwaltung von UI Ereignissen.
 *MERKE: Methoden Überladung (d.h. Verwendung des gleichen Methodennamens mit unterschiedlichen Parametern) scheint nicht zu funktionieren.
 * - TODO: "Bitte Warten" Meldung 
 *                a) Zentral über der Maske
 *                b) Unter der benanneten Aktion
 */
var KernelDomUiZZZ = Class.create(KernelUseObjectZZZ, {
		initialize : function($super, objKernel){
		try{
			$super(objKernel);                //Aufruf des Konstruktors der Elternklasse
		}catch(e){
	  		 throw handleErrorZZZ(e, "");
    	}
	},
		
	getFlag: function($super, sFlagIn){
		var bReturn = false;
		main:{
			try{
				if(isEmpty(sFlagIn)) break main;
				bReturn = $super(sFlagIn); //Aufruf der Funktion der Elternklasse
				if(bReturn ==true) break main;
				
				var sFlag = sFlagIn.toLowerCase();
				/*
				if(sFlag=="updated"){
					bReturn = this.flagUpdated;
				}
				* */
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
				bReturn = $super(sFlagIn, bValue);
				if(bReturn==true) break main;
				
				var sFlag = sFlagIn.toLowerCase();
				/*
				}
				if(sFlag=="updated"){
					this.flagUpdated=bValue;
					bReturn = true;
				}
		     	* */
			}catch(e){
		  		 throw handleErrorZZZ(e, "");
	    	}
	    	return bReturn;
		}//end main:
	},
	
	getDomIdWaitCentral: function(){
		var sReturn = "";
		try{
			var objKernel = this.getKernelObject();
			sReturn = objKernel.getDomIdByAlias("wait");
		}catch(e){
	  		 throw handleErrorZZZ(e, "");
    	}
    	return sReturn;
	},
	
	showAnimationWaitCentral: function(){
		var bReturn = false;
		main:{
			try{
				var sDomIdWait = this.getDomIdWaitCentral();
				var _divWait = $(sDomIdWait)
				if(_divWait=="undefined" | _divWait==null){
					 throw "Div Section '" + sDomIdWait + "' not found."
				}else{
					if(_divWait.visible()){
						//mach nix
					}else{
						_divWait.show();				
					}
				}
				bReturn = true;
			}catch(e){
	  		 	throw handleErrorZZZ(e, "");
	    	}
		}//end main:
    	return bReturn;
	},
	
	hideAnimationWaitCentral: function(){
		var bReturn = false;
		main:{
			try{
				var sDomIdWait = this.getDomIdWaitCentral();
				var _divWait = $(sDomIdWait)
				if(_divWait=="undefined" | _divWait==null){
					 throw "Div Section '" + sDomIdWait + "' not found."
				}else{
					if(_divWait.visible()){
						_divWait.hide();
					}else{
						//mach nix
					}
				}
				bReturn = true;
			}catch(e){
	  		 	throw handleErrorZZZ(e, "");
	    	}
		}//end main:
    	return bReturn;
	}
}); //End class KernelDomUI


//Ende des Verbergens vor nicht javascript fähigen Browsern --></script>
//</head>
//</html>