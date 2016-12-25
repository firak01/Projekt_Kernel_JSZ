//<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
//<html>
//<head>
//<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
//<script language="JavaScript" type="text/javascript">
//<!-- Vor nicht Javascript fähigen Browsern verbergen 

/* Bibliothek enthält grundlegende Funktionen zum:
*  - Errorhandling
*  - Zur Reflection (Prefixe von Divs)
* 
*  FGL 2008-05-29: erstellt
* 
*/

/* Funktion zur einheitlichen Fehlerbehandlung, wenn ein Fehler mit try ... catch ... behandelt wird
 * - e: der geworfene Error. Dabei ist es Browserspezifisch welche Eigenschaften das Error-Objekt hat.
 * - sDivNameOnErrorCatchZZZ. Ein Div, in dem dieser Fehler angzeigt werden soll.
 *                                            Ohne eine Angabe wird eine alert-Box angezeigt.
 * 
 * Rückgabewert ist der spezifische Error String.
 * Dieser kann dann erneut "gethrowed" werden.
 * Also lautet der Methodenaufruf
 * try{
 *    ... irgendein Fehler
 * 
 * }catch(e){
 * 	throw handleErrorZZZ(e, "") //falls kein spezielles Div angegeben werden soll
 * }
 */
function handleErrorZZZ(e, sDivNameOnErrorCatchZZZ){
		var sReturn = "";
		
		//TODO: Ggf. bestehende einträge nicht überschreiben, sondern erweitern
	   // check if error is TypeError	           
        var sDiv="";
        if(sDivNameOnErrorCatchZZZ=="unavailable" | sDivNameOnErrorCatchZZZ==null){
        	sDiv=getPrefixDivError() + "ZZZ";
        }else{
        	sDiv=sDivNameOnErrorCatchZZZ;
        }//end if sDivNameOnErrorCatchZZZ =="unavailable"		
        
        //1. Versuch: Error-Div direkt übergeben
	   var elem = document.getElementById(sDiv);
	   if(elem != "unavailable" && elem !=null){
		  //Fehlermeldung an die gwünschte Stelle ausgeben 
		  sReturn =computeErrorStringZZZ(e);		  
		  elem.innerHTML= sReturn;
		}else{      
			//2. Versuch: Ggf. wurde ein Feldname übergeben. Dann hierzu den Error-Tag ermitteln
			sDiv = getPrefixDivError() + sDiv;
			elem = document.getElementById(sDiv);
			 if(elem != "unavailable" && elem !=null){
				 //Fehlermeldung an der spezifischen Stelle ausgeben
				  sReturn =computeErrorStringZZZ(e);
				 elem.innerHTML=sReturn;
			 }else{
			 	//3. Versuch: Default-Error Tag
		 		elem = document.getElementById(getPrefixDivError() + "ZZZ");
		 		if(elem!="unavailable" && elem != null){
		 			 //Fehlermeldung an die default Stelle ausgeben
		 			 sReturn =computeErrorStringZZZ(e);
				  	elem.innerHTML=sReturn;	  
		  		}else{
			 	   //Falls die default stelle für die Fehlermeldung nicht existiert, Fehlermeldung ans ende anhängen und messagebox
      			   var p=document.createElement('p');
      			   sReturn = computeErrorStringZZZ(e);
     			   p.appendChild(document.createTextNode(sReturn));
    			   document.body.appendChild(p);    		   
    		   } //end if 3. Versuch       
   		    }//end if 2. Versuch
		}//end if 1. Versuch
		alert("An error happend: \n" + "'" + sReturn + "'");
		return sReturn;
}

/*Browserabhängige Errorstrings (Todo: Browswerweiche einbauen, da die Browser unterschiedliche Eigenschaften für das Error - Objekt haben)
* - e: der geworfene Error. Dabei ist es Browserspezifisch welche Eigenschaften das Error-Objekt hat.
*/
function computeErrorStringZZZ(e){
		var sReturn = ""; 
		  //Merke: stack, fileName, lineNumber sind für den Firefox
		  //            description, number sind für den ie
		  //            alle browser unterstützen message, name of the exception 
		  //Todo: Generelle Javascript Browserweiche einbauen
		var sMessage ="";
        if(e instanceof TypeError){
            sMessage='Variable type is not correct!';
            sReturn = "Error " + sMessage + " '"+e.message+"' at line '"+e.lineNumber +"' of '" +e.filename + "'";
        }else if(e instanceof ReferenceError){
        // check if error is ReferenceError
            sMessage='Incorrect reference!';
             sReturn = "Error " + sMessage + " '"+e.message+"' at line '"+e.lineNumber +"' of '" +e.filename + "'";
        }else if(e instanceof RangeError){
        // check if error is RangeError        
            sMessage='Value is out of range!';
            sReturn = "Error " + sMessage + " '"+e.message+"' at line '"+e.lineNumber +"' of '" +e.filename + "'";
        }  else{
        	if(typeof e == "string"){
        		//Error is thrown by user or is thrown by a previous errorhandler
        		sReturn = "X Level " + e;
        	}else{
       		 	// error is unknown      
            	sMessage='Unknown error!';
            	sReturn = "Error " + sMessage + " '"+e.message+"' at line '"+e.lineNumber +"' of '" +e.filename + "'";
        	}
        }
		return sReturn; 
}

/*Prefix der divs um ein Feld
*/
function getPrefixDivField(){
	return new String("divField");	
}
/*Prefix der divs um einen Button
*/
function getPrefixDivButton(){
	return new String("divButton");	
}
/*Prefix der div um einen Fehler
*/
function getPrefixDivError(){
	return new String("divError");
} 

//Ende des Verbergens vor nicht javascript fähigen Browsern --></script>
//</head>
//</html>