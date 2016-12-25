//<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
//<html>
//<head>
//<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
//<script language="JavaScript" type="text/javascript">
//<!-- Vor nicht Javascript fähigen Browsern verbergen 

/* Diese Bilbiothek stellt Funktionen zur Verfügung, die sich grundliegend mit der Verarbeitung von URL-Strings beschäftigen.
 * 
 *  Dabei gibt es folgende Mögliche Elemente einer URL
 * 
 http://hans:geheim@www.example.org:80/demo/example.cgi?land=de&stadt=aa#abschnitt1
|     		 | 			|    		  |              				|  |  				              |         				       |
|    		 |    		|     		 Host            			|  Pfad         				  Query           				Anker
|    		 |    		Passwort                              Port
|     		 Benutzer
Protokoll
* 
* 
* Merke;  Im Standard Java gibt es eine Klasse URL. Von deren Methoden kann man sich inspirieren lassen.
* 
* Methoden sind:  x=wurde schon ausprogrammiert
* -getUrlHostZZZ(sUrl)
* -getUrlAuthorityZZZ(sUrl)
* -getUrlDefaultPortZZZ(sUrl)
* -getUrlPathZZZ(sUrl)
* -getUrlPortZZZ(sUrl)
* -getUrlProtocolZZZ(sUrl)
* -getUrlQueryZZZ(sUrl)                 X
*- getUrlRefZZZ(sUrl)
* -getUrlUserInfoZZZ(sUrl)
* -getUrlWithoutQueryZZZ(sUrl)          X
*/

/*Gets the host name of this URL, if applicable.
 */
function getUrlHostZZZ(sUrl){
	var sReturn = "";
	main:{
		try{
			if(isStrEmpty(sUrl)) throw "Keine Url übergeben";
			
		}catch(e){
			throw handleErrorZZZ(e, "");
		}	  
	}//end main
	return sReturn;
}


/* Gets the authority part of this URL
 */
function getUrlAuthorityZZZ(sUrl){
	var sReturn = "";
	main:{
		try{
			if(isStrEmpty(sUrl)) throw "Keine Url übergeben";
			
			
		}catch(e){
			throw handleErrorZZZ(e, "");
		}	  
	}//end main
	return sReturn;
}

/*Gets the default port number of the protocol associated with this URL.
 */
function getUrlDefaultPortZZZ(sUrl){
	var sReturn = "";
	main:{
		try{
			if(isStrEmpty(sUrl)) throw "Keine Url übergeben";
			
			
		}catch(e){
			throw handleErrorZZZ(e, "");
		}	  
	}//end main
	return sReturn;
}

/*Gets the path part of this URL.
 */
function getUrlPathZZZ(sUrl){
	var sReturn = "";
	main:{
		try{
			if(isStrEmpty(sUrl)) throw "Keine Url übergeben";
			
			
		}catch(e){
			throw handleErrorZZZ(e, "");
		}	  
	}//end main
	return sReturn;
}

/*Gets the port number of this URL.
 */
function getUrlPortZZZ(sUrl){
	var sReturn = "";
	main:{
		try{
			if(isStrEmpty(sUrl)) throw "Keine Url übergeben";
			
			
		}catch(e){
			throw handleErrorZZZ(e, "");
		}	  
	}//end main
	return sReturn;
}

/*Gets the protocol name of this URL.
 */
function getUrlProtocolZZZ(sUrl){
	var sReturn = "";
	main:{
		try{
			if(isStrEmpty(sUrl)) throw "Keine Url übergeben";
			
			
		}catch(e){
			throw handleErrorZZZ(e, "");
		}	  
	}//end main
	return sReturn;
}

/*Gets the query part of this URL.
 */
function getUrlQueryZZZ(sUrl){
	var sReturn = "";
	main:{
		try{
			if(isStrEmpty(sUrl)) throw "Keine Url übergeben";
			
			sReturn = getStrRightStr(sUrl, "?");			
			
		}catch(e){
			throw handleErrorZZZ(e, "");
		}	  
	}//end main
	return sReturn;
}

/*Gets the anchor (also known as the "reference") of this URL.
 */
function getUrlRefZZZ(sUrl){
	var sReturn = "";
	main:{
		try{
			if(isStrEmpty(sUrl)) throw "Keine Url übergeben";
			
			
		}catch(e){
			throw handleErrorZZZ(e, "");
		}	  
	}//end main
	return sReturn;
}

/*Gets the userInfo part of this URL.
 */
function getUrlUserInfoZZZ(sUrl){
	var sReturn = "";
	main:{
		try{
			if(isStrEmpty(sUrl)) throw "Keine Url übergeben";
			
			
		}catch(e){
			throw handleErrorZZZ(e, "");
		}	  
	}//end main
	return sReturn;
} 

function getUrlWithoutQueryZZZ(sUrl){
	var sReturn = "";
	main:{
		try{
			if(isStrEmpty(sUrl)) throw "Keine Url übergeben";
			
			var stemp = getUrlQueryZZZ(sUrl);
			if(isStrEmpty(stemp)){
				sReturn = sUrl;
			}else{
				sReturn = getStrLeftStr(sUrl, "?" + stemp)
			}
			
		}catch(e){
			throw handleErrorZZZ(e, "");
		}	  
	}//end main
	return sReturn;
}

//FLi: 2009-05-19 Aufbereiten des Dateipfads für den Ausdruck. Uns interessieren nur die Dateinamen.
function getFileFromPathZZZ( sPath ) {
	var pos = sPath.lastIndexOf( "\\" );
	return sPath.substring( pos+1, sPath.length );
}

//Ende des Verbergens vor nicht javascript fähigen Browsern --></script>
//</head>
//</html>