//<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
//<html>
//<head>
//<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
//<script language="JavaScript" type="text/javascript">
//<!-- Vor nicht Javascript f�higen Browsern verbergen 

/* Aus einem Tag (z.B. dem umgebenen div) wird der Name des eingentlichen InputFelds ermittelt
 * So kann z.B. onclick=executeZZZ(this, xyz) ausgef�hrt werden, wobei xyz der Name eine Funktion ist 
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
		  	 e = new Error("Kein Tag-Objekt �bergeben");
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
			 	     //Erst jetzt wird ggf. die �bergebenen Methode wichtig
		 			btemp = isStrEmpty(sFunctionname);
					  if(! btemp){
						  	var strFunc = new String(sFunctionname);
						  	var iLengthFunc = strFunc.length;
		  	
		  					var stemp = getStrRight(strTagId, iLengthFunc);		  	
						  	if(stemp!=strFunc){
						  		e = new Error("Tag stimmt nicht mit dem �bergebenen Funktionsnamen �berein.");
						  		throw e;
						  	}
						  }else{
						  		e = new Error("Kein Funktionsname �bergeben, obwohl es sich um ein Tag mit einem Button-Prefix handelt.");
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
/*F�hre eine Funktion aus. Zus�tzliche Informationen k�nnen aus dem �bergebenen Tag geholt werden.
 * So erreicht man f�r die Funktionen "generische" Einsatzum�glichkeiten.
 * 
 */
function executeZZZ(objTag, sFunctionName){
	try{
	    bReturn = false;
	    btemp = is(objTag);
	   if(! btemp){
	  	 e = new Error("Kein Tag-Objekt �bergeben");
	  	 throw e;
	   }	   
	   btemp = isStrEmpty(sFunctionName);
	   if(btemp){
	  	 e = new Error("Kein Funktionsname �bergeben");
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

//Ende des Verbergens vor nicht javascript f�higen Browsern --></script>
//</head>
//</html>