//<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
//<html>
//<head>
//<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
//<script language="JavaScript" type="text/javascript">
//<!-- Vor nicht Javascript fähigen Browsern verbergen 

function is(object){
 if(object!="unavailable"){
	 return true;
  }else{
	 return false;
 }
}
function isEmpty( objIn ) {
	if ( null == objIn || "" == objIn ) {
		 return true;
		  }
		  
	 if(isArray(objIn)){
	 	if(objIn.length<= -1 ){
	 		return true;
	 	}
	 }	  
	 return false;
 }
/* Erzeuge ein Array OBJEKT
Beispiel:
var myArray=new MakeArray(3);
*/
function MakeArray(n){
	for(var i=0;i<n;i++){
		this[i]=0;
		this.length=n;	
	}
}
/*Prüft, ob etwas ein Array ist
 */
function isArray(obj) {
   if (obj.constructor.toString().indexOf("Array") == -1)
      return false;
   else
      return true;
}

/*Prüft, ob etwas ein Array ist, bzgl. der Länge
 * FGL 2010-04-09
 * 
 * !!! String hat aber auch eine Länge !!!
 */
function isArrayByLength(obj){
	if(typeof(obj.length)=="undefined"){
		return false;
	}else{
		if(obj.length=="undefined"){
			return false;
		}else{
			if(obj.length==0){
				return false;
			}else{
				return true;
			}
		}
	}
}

function isArrayDefinedZZZ(obj){
	var bReturn = false;
	main:{
		if(! is(obj)) break main;
		if(! isArray(obj)) break main;
		if(! isArrayByLength(obj)) break main;
		bReturn = true;
	};
	return bReturn;
}


/*FGL 20150616*/
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

/*FLi 2010-11-22: Falls es eine Zahl ist, wird die Zahl zurückgegeben, sonst 0. 
 * Z.B. für den Leerstring wird auch 0 zurückgegeben.
 */
function getNumericZZZ(sNumber){
	var fReturn = 0;
	main:{
		if(sNumber==null) break main;
		if(typeof(sNumber)=='string'){
			if(isNumericZZZ(sNumber)){
				fReturn = parseFloat(sNumber);
			}else{
				break main;
			}
		}else if(typeof(sNumber)=='number'){
			fReturn = sNumber;
		}else{
			fReturn = 0;				
		}	
	}//end main:
	return fReturn;
}


function isNumericZZZ(sNumber){
//Eingebaut von FLi 20090304
 return checkIntegerZZZ(sNumber);
}
function checkIntegerZZZ(obj) {
//Eingebaut von FLi 20090304

//regular expression should match number with commas or not
//1. ^-? <-- '-' is optional at the beginning
//2. \d{1,3} <-- with or without comma, first 3 digits
//3. \d{1,3}(\,\d{3})* <-- with comma, at least one digit with max of three before repeating like ',ddd'
//4. \d+ <-- without comma, match any number of integer(shouldn't be though)
/*
re = /^-?(\d{1,3}|\d{1,3}(\,\d{3})*|\d*)$/g;
*/



//regular expression should match number with commas or not
//1. (^-? <-- '-' is optional at the beginning
//2. [1-9] <-- first digit should be between 1~9; 090 shouldn't be allowed
//3. (\d{1,2}(\,\d{3})* | <-- with comma, at least one digit with max of three before repeating like ',ddd' 
//3. \d*) | <-- without comma, match any number of integer(shouldn't be though)
//4. ^0{1})$ <-- allow only one zero and no minus zero

//var re = /(^-?[1-9](\d{1,2}(\,\d{3})*|\d*)|^0{1})$/;  //Scheint mit komma nicht zurecht zu kommen

//FLi das funktioniert 7 Zahlen vor dem Komma und 2 zahlen dahinter ....
var re = /(^\d{1,7}$)|(^\d{1,7}\,\d{1,2}$)|(^\d{1,7}\.\d{1,2}$)/;

if ( ! re.test(obj) ) {
//if ( ! re.test(obj.value) ) {  //FLi obj.value ist "undefined"
//alert("checkIntegerZZZ: '" + obj + "'");
return false;
}
//alert("true checkIntegerZZZ: '" + obj + "'");
return true;
} 

//FGL20160704
function convertBoolToInt()
			{
				var testBool = true;
				result = (testBool)?1:0;
				//alert(result);
				return result;
			}		


//Ende des Verbergens vor nicht javascript fähigen Browsern --></script>
//</head>
//</html>