//<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
//<html>
//<head>
//<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
//<script language="JavaScript" type="text/javascript">
//<!-- Vor nicht Javascript f�higen Browsern verbergen 

/* Klasse bindet Kernel-Objekt ein. 
 * Diese Klasse soll dann die Elternklasse aller Klassen sein, die ein Objekt sind.
 * Es werden grundlegende Funktionen und Flags zur Verf�gung gestellt
 */
 var KernelObjectZZZ = Class.create({
	initialize : function(){
		try{
			this.sFlagInit = false;
			this.sDivNameOnError="divErrorZZZ"; //Kann nat�rlich �berschreiben werden
			this.sMessageOnError='';
		}catch(e){
	  		 throw handleErrorZZZ(e, "");
    	}
	},
	showError: function(){
		var sDivName = this.getDivNameOnError();
		var sMessage = this.getMessageOnError();
		var elem = document.getElementById(sDivName);
	 	if(elem != "unavailable"){
	 		elem.innerHTML=sMessage;	
	 		section_show(sDivName); 		
	 	}else{
			alert("sDivName="+ sDivName + '# sMessage=' + sMessage + "'");
	 	}
		return true;
	},
	setDivNameOnError:  function(sDivNameOnError){
		this.sDivNameOnError = sDivNameOnError;
	},
	getDivNameOnError: function(){
		return this.sDivNameOnError;
	},
	setMessageOnError: function(sMessageOnError){
		this.sMessageOnError = sMessageOnError;
	},
	getMessageOnError: function(){
		return this.sMessageOnError;
	},
	getFlag: function(sFlagIn){  //hier kein $super im Methodenaufruf, da oberste Ebene, sonst schon.
		var bReturn = false;
		main:{
			try{
				if(isEmpty(sFlagIn)) break main;
				//TODO: ObjectZZZ als oberste Ebene einf�hren
				//hier nicht, da momentan die obersten Ebene erreicht ist
				//bReturn = $super(); //Aufruf der Funktion der Elternklasse
				//if(bReturn ==true) break main;
				
				var sFlag = sFlagIn.toLowerCase();
				if(sFlag=="init"){
					bReturn = this.flagInit;
				}
			}catch(e){
		  		 throw handleErrorZZZ(e, "");
	    	}
		}//end main:
    	return bReturn;
	},
	
	/*Merke: true wird zur�ckgeliefert, wenn das Flag irgendwo gefunden wird. so kann man ermitteln, ob es das flag �berhaupt gibt.
	 * 
	 */
	setFlag: function(sFlagIn, bValue){ //hier kein $super im Methodenaufruf, da oberste Ebene, sonst schon.
		var bReturn = false;
		main:{
			try{
				//TODO: ObjectZZZ als oberste Ebene einf�hren
				//hier nicht, da momentan die obersten Ebene erreicht ist
				//bReturn = $super(sFlag, bValue);
				//if(bReturn==true) break main;
				var sFlag = sFlagIn.toLowerCase();
				if(sFlag=="init"){
					this.flagInit=bValue;
					bReturn = true;
				}
			}catch(e){
		  		 throw handleErrorZZZ(e, "");
	    	}
	    	return bReturn;
		}//end main:
	},
	
	/*Pr�ft, ob das Flag existiert, d.h. in der Klasse oder einer der Elternklassen verwendet wird.
	 * 
	 */
	existsFlag: function(sFlagIn){ //hier kein $super im Methodenaufruf, da oberste Ebene, sonst schon.
		var bReturn = false;
		main:{
			try{
				if(isEmpty(sFlagIn)) break main;
				var sFlag = sFlagIn.toLowerCase();
				
				//1. den Aktuellen Wert holen				
				var bBackup = this.getFlag(sFlag)		
				if(bBackup==true){   //dann ist das flag gesetzt, folglich gibt es das Flag
					bReturn = true;
					break main;
				}else{
				//2. nun Testweise den Wert setzen
					bReturn = this.setFlag(sFlag, true);
					if (bReturn == true){
						//den Wert wieder zur�cksetzen, das Flag gibt es
						this.setFlag(sFlag, bBackup);
						break main;
					}
				}
			}catch(e){
		  		 throw handleErrorZZZ(e, "");
	    	}
		}//end main:
		return bReturn;
	},
	
	getDebugString: function(){
		return "KernelUseObjectZZZ: # sDivNameOnError='" + this.getDivNameOnError() + "'# sMessageOnError= '" + this.getMessageOnError() + "'";
	}
}); //End class KernelUseObjectZZZ
 
//Ende des Verbergens vor nicht javascript f�higen Browsern --></script>
//</head>
//</html>