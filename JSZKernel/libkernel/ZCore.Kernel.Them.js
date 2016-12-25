//<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
//<html>
//<head>
//<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
//<script language="JavaScript" type="text/javascript">
//<!-- Vor nicht Javascript fähigen Browsern verbergen 

/* Klasse bindet Kernel-Objekt ein. 
 * Diese Klasse soll dann die Elternklasse aller Klassen sein, die das KernelObjekt nutzen.
 */
 var KernelUseObjectZZZ = Class.create(KernelObjectZZZ, {
	initialize : function(objKernel){
		try{
			if(objKernel==null){
					throw("No kernel object provided");
			}
			this.objKernel = objKernel;
		}catch(e){
	  		 throw handleErrorZZZ(e, "");
    	}
	},
	getKernelObject: function(){
		return this.objKernel;
	},
	setKernelObject: function(objKernel){
		this.objKernel = objKernel;
	},

	getFlag: function($super, sFlagIn){  //hier kein $super im Methodenaufruf, da oberste Ebene, sonst schon.
		var bReturn = false;
		main:{
			try{
				if(isEmpty(sFlagIn)) break main;
				bReturn = $super(); //Aufruf der Funktion der Elternklasse
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
	
	/*Merke: true wird zurückgeliefert, wenn das Flag irgendwo gefunden wird. so kann man ermitteln, ob es das flag überhaupt gibt.
	 * 
	 */
	setFlag: function($super, sFlagIn, bValue){ //hier kein $super im Methodenaufruf, da oberste Ebene, sonst schon.
		var bReturn = false;
		main:{
			try{
				if(isEmpty(sFlagIn)) break main;
				bReturn = $super(sFlagIn, bValue);
				if(bReturn==true) break main;
				
				var sFlag = sFlagIn.toLowerCase();
				/*
			
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
	
	getDebugString: function(){
		return "KernelUseObjectZZZ: # sDivNameOnError='" + this.getDivNameOnError() + "'# sMessageOnError= '" + this.getMessageOnError() + "'";
	}
}); //End class KernelUseObjectZZZ
 
 
 //Ende des Verbergens vor nicht javascript fähigen Browsern --></script>
//</head>
//</html>
