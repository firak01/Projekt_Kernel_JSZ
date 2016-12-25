//<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
//<html>
//<head>
//<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
//<script language="JavaScript" type="text/javascript">
//<!-- Vor nicht Javascript fähigen Browsern verbergen 

/* Aus einem Tag (z.B. dem umgebenen div) wird der Name des eingentlichen InputFelds ermittelt
 * So kann z.B. onclick=executeZZZ(this, xyz) ausgeführt werden, wobei xyz der Name eine Funktion ist 
 * und die anderen Informationen (z.B. Name des Eingabefelds) dynamisch "per Reflection" (oder eher per Namens-Konvention) ausgerechnet werden.
 * 
Input: objekt this (der Tag von dem z.B. der Event ausgeht.
*/
function getFieldname(objTag, sFunctionname){
	
	try{
		main:{
		  sReturn = "";
		  btemp = is(objTag);
		  if(! btemp){
		  	 e = new Error("Kein Tag-Objekt übergeben");
		  	 throw e;
		  }	   
		  
		  sTagId = objTag.id;
		  if(isStrEmpty(sTagId)){
		  	 e = new Error("Tag-Objekt besitzt keine Id");
		  	 throw e;
		  }
		  var strTagId = new String(sTagId);
		  var iLengthTag = strTagId.length;
		  
		  //###########
		 var sPrefix = getPrefixDivField();
		 var iLength = sPrefix.length;		 
		 if(iLengthTag > iLength){
			 sProof = strTagId.substring(0,iLength)
			 if(sProof==sPrefix){
			 	sReturn = new String(strTagId.substring(iLength, iLengthTag));
			 	break main;
			 }
		 }
		 //++++++++++++++++++++++++++++++++		 
	   	 sPrefix = getPrefixDivError();
	      iLength = sPrefix.length();
	      if(iLengthTag > iLength){
			 sProof = sTagId.substring(0,iLength)
			 if(sProof==sPrefix){
			 	sReturn = new String(strTagId.substring(iLength, iLengthTag));
				 	break main;
				 }
			 }
			 
		 //++++++++++++++++++++++++++++++++
		  sPrefix = getPrefixDivButton();
	      iLength = sPrefix.length();	      
	      if(iLengthTag > iLength){
			 sProof = sTagId.substring(0,iLength)
			 if(sProof==sPrefix){
			 	     //Erst jetzt wird ggf. die übergebenen Methode wichtig
		 			btemp = isStrEmpty(sFunctionname);
					  if(! btemp){
						  	var strFunc = new String(sFunctionname);
						  	var iLengthFunc = strFunc.length;
		  	
		  					var stemp = getStrRight(strTagId, iLengthFunc);		  	
						  	if(stemp!=strFunc){
						  		e = new Error("Tag stimmt nicht mit dem übergebenen Funktionsnamen überein.");
						  		throw e;
						  	}
						  }else{
						  		e = new Error("Kein Funktionsname übergeben, obwohl es sich um ein Tag mit einem Button-Prefix handelt.");
						  		throw e;
						  }
			 	
			 		sReturn = new String(strTagId.substring(iLength, iLengthTag));
				 	break main;
				 }				 
			 }
		}//end main:
	   	return sReturn;
	}catch(e){
		throw handleErrorZZZ(e,"");
    }	
}
/*Führe eine Funktion aus. Zusätzliche Informationen können aus dem übergebenen Tag geholt werden.
 * So erreicht man für die Funktionen "generische" Einsatzumöglichkeiten.
 * 
 */
function executeZZZ(objTag, sFunctionName){
	try{
	    bReturn = false;
	    btemp = is(objTag);
	   if(! btemp){
	  	 e = new Error("Kein Tag-Objekt übergeben");
	  	 throw e;
	   }	   
	   btemp = isStrEmpty(sFunctionName);
	   if(btemp){
	  	 e = new Error("Kein Funktionsname übergeben");
	  	 throw e;
	   }
	   
	   //Den betroffenen Feldnamen aus dem Tag auslesen
	   var sFieldname = getFieldname(objTag);
	   
	   bReturn = eval(sFunctionName+ "('" + sFieldname +"')");
	   //zum Debuggen: bReturn = switchButtonUpdateCategory('MovieTitle');
	 
	   return bReturn;
	}catch(e){
	   throw handleErrorZZZ(e, "");	   
    }	
}

//Ende des Verbergens vor nicht javascript fähigen Browsern --></script>
//</head>
//</html>