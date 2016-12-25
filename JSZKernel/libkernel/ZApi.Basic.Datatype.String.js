//<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
//<html>
//<head>
//<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
//<script language="JavaScript" type="text/javascript">
//<!-- Vor nicht Javascript fähigen Browsern verbergen 

/*____________________________________________________________________________*/

function encodeMyHtml(htmlToEncode) {
		 var encodedHtml = escape(htmlToEncode);
		 encodedHtml = encodedHtml.replace(/\//g,"%2F");
		 encodedHtml = encodedHtml.replace(/\?/g,"%3F");
		 encodedHtml = encodedHtml.replace(/=/g,"%3D");
		 encodedHtml = encodedHtml.replace(/&/g,"%26");
		 encodedHtml = encodedHtml.replace(/@/g,"%40");
		 return encodedHtml;
		 //merke: mit unescape(...) bekommt man den korrekten String wieder zurück.
	   }


function fulltrim(inputString)
/*____________________________________________________________________________*/
{
   // Removes leading and trailing spaces from the passed string. 
   // Also removesconsecutive spaces and replaces it with one space. If something besides
   // a string is passed in (null, custom object, etc.) then return the input.
   if (typeof inputString != "string") { return inputString; }
   var retValue = inputString;
   var ch = retValue.substring(0, 1);
   while (ch == " ") { // Check for spaces at the beginning of the string
      retValue = retValue.substring(1, retValue.length);
      ch = retValue.substring(0, 1);
   }
   ch = retValue.substring(retValue.length-1, retValue.length);
   while (ch == " ") { // Check for spaces at the end of the string
      retValue = retValue.substring(0, retValue.length-1);
      ch = retValue.substring(retValue.length-1, retValue.length);
   }
   while (retValue.indexOf("  ") != -1) { // Note that there are two spaces in the string - look for multiple spaces within the string
      retValue = retValue.substring(0, retValue.indexOf("  ")) + retValue.substring(retValue.indexOf("  ")+1, retValue.length); // Again, there are two spaces in each of the strings
   }
   return retValue; // Return the trimmed string back to the user
} // Ends the "trim" function


// ==========================================================
function getStrLeft(str, n){
	//	 gets left n characters of string str
	//	 Autor:	http://www.devx.com/tips/Tip/15222
	//	return: left n characters of string str
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 		 
	if (n <= 0)
	    return "";
	else if (n > String(str).length)
	    return str;
	else
	    return String(str).substring(0,n);
}
// ==========================================================
function getStrRight(str, n){
	//	 gets right n characters of string str
	//	 Autor:	http://www.devx.com/tips/Tip/15222
	//	return: right n characters of string str
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 		 
    if (n <= 0)
       return "";
    else if (n > String(str).length)
       return str;
    else {
       var iLen = String(str).length;
       return String(str).substring(iLen, iLen - n);
    }
}
//@Left equivalent, !!! casesensitive
function getStrLeftStr(sourceStr, keyStr){
return (sourceStr.indexOf(keyStr) == -1 | keyStr=='') ? '' : sourceStr.split(keyStr)[0];
}
//@Right equivalent, !!! casesensitive
   function getStrRightStr(sourceStr, keyStr){
				idx = sourceStr.indexOf(keyStr);
				return (idx == -1 | keyStr=='') ? '' : sourceStr.substr(idx+ keyStr.length);
	}

//@Right equivalent, !!! casesensitive
function getStrRightStrEncoded(sourceStr, keyStr){
	
	 //! FEHLER, Z.B. BEI EINEM BEGINNENDEN BACKSLASH, darum encoden.
	   var matchToEncode=keyStr;
	   var matchEncoded = encodeMyHtml(matchToEncode);
	   //print("encoded matchstring=" + matchEncoded);
	   
	  var textToEncode=sourceStr;
	   var textEncoded = encodeMyHtml(textToEncode);
	   //print("encoded textstring=" + textEncoded);   
	
	  return unescape(getStrRightStr(textEncoded, matchEncoded));
}

//@RightBack equivalent, !!! casesensitive
function getStrRightBack(sourceStr, keyStr){
arr = sourceStr.split(keyStr);
return (sourceStr.indexOf(keyStr) == -1 | keyStr=='') ? '' : arr.pop()
}
//@LeftBack equivalent, !!! casesensitive
function getStrLeftBack(sourceStr, keyStr){
arr = sourceStr.split(keyStr)
arr.pop();
//arr.shift();		//entfernt das erste Element aus dem Array
//!! 20160105: so unterschlaegt man aber keyStr: return (keyStr==null | keyStr=='') ? '' : arr.join();		
//                     Darum in einer Schleife zusammenbauen		
		var sReturn="";
		if(arr.length>=2){
		for (index = 0; index < arr.length-1; ++index) {
			sReturn=sReturn+arr[index]+keyStr;
		}
		}
		sReturn=sReturn+arr[arr.length-1];
		return sReturn;
}
//@Middle equivalent, !!! casesensitive
function getStrMiddleStr(sourceStr, keyStrLeft, keyStrRight){
return getStrLeftStr(getStrRightStr(sourceStr,keyStrLeft), keyStrRight);
}


function isStrEmpty(sProof){
	if( ! is(sProof)){
		return true;
	}
	if ( sProof == ""){
		return true	
	}
	return false;
}


/*____________________________________________________________________________*/

function trim(inputString)
/*____________________________________________________________________________*/
{
   // Removes leading and trailing spaces from the passed string. 
   // If something besides a string is passed in (null, custom object, etc.) then return the input.
   if (typeof inputString != "string") { return inputString; }
   var retValue = inputString;
   var ch = retValue.substring(0, 1);
   while (ch == " ") { // Check for spaces at the beginning of the string
      retValue = retValue.substring(1, retValue.length);
      ch = retValue.substring(0, 1);
   }
   ch = retValue.substring(retValue.length-1, retValue.length);
   while (ch == " ") { // Check for spaces at the end of the string
      retValue = retValue.substring(0, retValue.length-1);
      ch = retValue.substring(retValue.length-1, retValue.length);
   }
   return retValue; // Return the trimmed string back to the user
} // Ends the "trim" function


/*Alternative Trim funktion
 */
function trimByRegEx(zeichenkette) {
  // Erst führende, dann Abschließende Whitespaces entfernen
  // und das Ergebnis dieser Operationen zurückliefern
  return zeichenkette.replace (/^\s+/, '').replace (/\s+$/, '');
}


/*wird auch die Möglichkeit implementiert, andere Zeichen als Whitespaces aus der Zeichenkette zu löschen, wenn diese am Anfang der Zeichenkette stehen.
 * clist ist also die Liste der zu trimmenden Zeichen
 * 
 */
String.prototype.ltrim = function (clist) {
  // Wurde eine Zeichenkette mit den zu entfernenden
  // Zeichen übergeben?
  if (clist)
    // In diesem Fall sollen nicht Whitespaces, sondern
    // alle Zeichen aus dieser Liste gelöscht werden,
    // die am Anfang des Strings stehen.
    return this.replace (new RegExp ('^[' + clist + ']+'), '');
  // Führende Whitespaces aus dem String entfernen
  // und das resultierende String zurückgeben.
  return this.replace (/^\s+/, '');
}

/*wird auch die Möglichkeit implementiert, andere Zeichen als Whitespaces aus der Zeichenkette zu löschen, wenn diese am ENDE der Zeichenkette stehen.
 * clist ist also die Liste der zu trimmenden Zeichen
 * 
 */
String.prototype.rtrim = function (clist) {
  // Zeichenkette mit den zu entfernenden Zeichen angegeben?
  if (clist)
    // Zeichen aus der Liste, die am Ende des String stehen
    // löschen.
    return this.replace (new RegExp ('[' + clist + ']+$'), '');
  // Whitespaces am Ende des Strings ertfernen und dann das Ergebnis
  // dieser Operation zurückgeben.
  return this.replace (/\s+$/, '');
}

/*Alternative Trim - Version
 */
String.prototype.trim = function (clist) {
  // Wird der Parameter clist angegeben, so werden statt der Whitespaces
  // die in dieser Variablen angegebenen Zeichen "getrimmt".
  if (clist)
    // Führende und abschließende Zeichen aus der Liste entfernen.
    return this.ltrim (clist).rtrim (clist);
  // Whitespaces vom Anfang und am Ende entfernen
  return this.ltrim ().rtrim ();
};

String.prototype.stripNumericRight = function () {
  // Wurde eine Zeichenkette übergeben?
  var sReturn = this;
  main:{
  	var sValue = this;
  	//TESTWERTE:
  	//sValue = "abcde";
  	//sValue= "0123456";

    var iLength = sValue.length;
  	var iCount = iLength-1;
  	//alert("3 in prototyp" + sValue);
  	for (iCount; iCount>=0;iCount--) {  //also der erste Buchstabe wird ausgespart.
  		//alert("4 in prototyp");
  		var sTemp = sValue.substr(iCount, 1);
  		//alert ("'" + sValue + "'es gilt: " + iCount + " Stelle='" + sTemp + "'");
  		if(isNumericZZZ(sTemp)){
  			//alert("ist eine Zahl");
  		}else{
  			//alert("ist keine Zahl");
  			sReturn = sValue.substr(0,iCount+1);
  			break; //for Schleife verlassen
  		}
  	} //end for
   }//end main
  return sReturn;
}

String.prototype.getNumericRightStr = function () {
	  // Wurde eine Zeichenkette übergeben?
  var sReturn = "";
  main:{
  	var sValue=this;
  	
  	var sLetter = sValue.stripNumericRight();
  	if(sLetter==""){
  		 sReturn = sValue; //ich gehe davon aus, dass dann eine komplette zahl übergeben wurde.
  		 break main;
  	}
  	//hole den Zahlenstring rechts von den Buchstaben
	sReturn = getStrRightStr(sValue, sLetter);  	
  	
  }//end main:
  return sReturn;	
}

String.prototype.startsWith = function(str)
{return (this.match("^"+str)==str)}

String.prototype.endsWith = function(str)
{return (this.match(str+"$")==str)}

//Ende des Verbergens vor nicht javascript fähigen Browsern --></script>
//</head>
//</html>




