//<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
//<html>
//<head>
//<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
//<script language="JavaScript" type="text/javascript">
//<!-- Vor nicht Javascript fähigen Browsern verbergen 



//-------------------------------------------------------------------------------------------------------------------------------
//(c) http://www.smartwebby.com/DHTML/date_validation.asp :: überarbeitet
/**
 * DHTML date validation script. Courtesy of SmartWebby.com (http://www.smartwebby.com/dhtml/)
 */
// Declaring valid date character, minimum year and maximum year
var dtCh= ".";
var minYear=1900;
var maxYear=2099;
function isInteger(s){
	var i;
    for (i = 0; i < s.length; i++){   
        // Check that current character is number.
        var c = s.charAt(i);
        if (((c < "0") || (c > "9"))) return false;
    }
    // All characters are numbers.
    return true;
}
function stripCharsInBag(s, bag){
	var i;
    var returnString = "";
    // Search through string's characters one by one.
    // If character is not in bag, append to returnString.
    for (i = 0; i < s.length; i++){   
        var c = s.charAt(i);
        if (bag.indexOf(c) == -1) returnString += c;
    }
    return returnString;
}
function daysInFebruary (year){
	// February has 29 days in any year evenly divisible by four,
    // EXCEPT for centurial years which are not also divisible by 400.
    return (((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28 );
}
function DaysArray(n) {
	for (var i = 1; i <= n; i++) {
		this[i] = 31
		if (i==4 || i==6 || i==9 || i==11) {this[i] = 30}
		if (i==2) {this[i] = 29}
   } 
   return this
}

function isDate(dtStr){
	var daysInMonth = DaysArray(12)
	var pos1=dtStr.indexOf(dtCh)
	var pos2=dtStr.indexOf(dtCh,pos1+1)
	var strDay=dtStr.substring(0,pos1)
	var strMonth=dtStr.substring(pos1+1,pos2)
	var strYear=dtStr.substring(pos2+1)
	strYr=strYear
	if (strDay.charAt(0)=="0" && strDay.length>1) strDay=strDay.substring(1)
	if (strMonth.charAt(0)=="0" && strMonth.length>1) strMonth=strMonth.substring(1)
	for (var i = 1; i <= 3; i++) {
		if (strYr.charAt(0)=="0" && strYr.length>1) strYr=strYr.substring(1)
	}
	month=parseInt(strMonth)
	day=parseInt(strDay)
	year=parseInt(strYr)
	if (pos1==-1 || pos2==-1){
		//alert("The date format should be : mm/dd/yyyy")
		return false
	}
	if (strMonth.length<1 || month<1 || month>12){
		//alert("Please enter a valid month")
		return false
	}
	if (strDay.length<1 || day<1 || day>31 || (month==2 && day>daysInFebruary(year)) || day > daysInMonth[month]){
		//alert("Please enter a valid day")
		return false
	}
	if (strYear.length != 4 || year==0 || year<minYear || year>maxYear){
		//alert("Please enter a valid 4 digit year between "+minYear+" and "+maxYear)
		return false
	}
	if (dtStr.indexOf(dtCh,pos2+1)!=-1 || isInteger(stripCharsInBag(dtStr, dtCh))==false){
		//alert("Please enter a valid date")
		return false
	}
return true
}
//------------------------------------------------------------------------------------------------------

function DateZZZ(sDateString){
    this.sDate = sDateString;
    this.getSeparatorDefault = function(){
       return ".";
    };
    this.getDateString = function(){
      return this.sDate;
    };
    this.getDay = function(){
       return getDayFromStringDateZZZ(this.getDateString(), this.getSeparatorDefault());
    };
    this.getMonth = function(){
       return getMonthFromStringDateZZZ(this.getDateString(), this.getSeparatorDefault());
    };
    this.getYear = function(){
       return getYearFromStringDateZZZ(this.getDateString(), this.getSeparatorDefault());
    };
    this.getDateObject = function(){
    	var objReturn = null;
    	main:{
    	var sYear = this.getYear();
    	var sMonth = this.getMonth();
    	var sDay = this.getDay();
    	if(isStrEmpty(sYear) || isStrEmpty(sMonth) || isStrEmpty(sDay)) break main;
    	
    	objReturn = new Date(sYear, sMonth, sDay);
    	}
    	return objReturn;
    }
}

function getDayFromStringDateZZZ(sDateString, sSeparator){
   var sReturn = "";

    //TODO Goon: Wie kann ich sSeperator als Property der Klasse hier zugänglich machen ????
    var saDate = sDateString.split(sSeparator);
    
    //Es wird vom Format DD.MM.JJJJ ausgegangen.
    sReturn = saDate[0];
    return sReturn;
}
function getMonthFromStringDateZZZ(sDateString, sSeparator){
   var sReturn = "";

    //TODO Goon: Wie kann ich sSeperator als Property der Klasse hier zugänglich machen ????
    var saDate = sDateString.split(sSeparator);
    
    //Es wird vom Format DD.MM.JJJJ ausgegangen.
    sReturn = saDate[1];
    return sReturn;
}
function getYearFromStringDateZZZ(sDateString, sSeparator){
   var sReturn = "";

    //TODO Goon: Wie kann ich sSeperator als Property der Klasse hier zugänglich machen ????
    var saDate = sDateString.split(sSeparator);
    
    //Es wird vom Format DD.MM.JJJJ ausgegangen.
    sReturn = saDate[2];
    return sReturn;
}


/* gibt den Datumsunterschied zwischen den beiden Javascript-Datumsobjekten an
    sFlag="minute" oder "second" oder "day", d.h. der Rückgabewert sind die Sekunden/Minuten oder Tage mit 'day' als default
    */
function getDateDifferenceZZZ(objDate1, objDate2, sFlag){
    var sReturn = "";
    
    var d1 = objDate1.getTime();
    var d2 = objDate2.getTime();
    
    var dif = d1 - d2;
    if(dif < 0){
       dif = d2 - d1;
    }
    
    //!!! RECHENDFEHLER BEIM GLEICHEN DATUM NACHWEISBAR !!!
    if(sFlag==null | sFlag==undefined | sFlag=="" | sFlag == "day"){
         sReturn = dif/(1000*60*60*24)  -29;
          sReturn = parseInt(sReturn);
    }else if(sFlag=="minute"){
         sReturn = dif/(1000*60*60) -719;
         sReturn = parseInt(sReturn);
    }else if(sFlag=="second"){
         sReturn = dif/(1000*60);
         sReturn = parseInt(sReturn);
    }else if(sFlag=="year"){
         sReturn = dif/(1000*60*60*24*365);
         sReturn = parseInt(sReturn);
    }else{
       //TODO Parameter Fehler werfen. sFlag hatte unerwarteten Wert
    }
    
    return sReturn;
}

/* Eingabeparameter sind Datumsstrings, mit '.' getrennte Werte in der Form 'TT.MM.JJJJ'*/
function isDatePrevious(sDate1, sDate2){
	var bReturn = false;
	main:{
	var bIsDate1 = isDate(sDate1);
	var bIsDate2 = isDate(sDate2);
	if(! bIsDate1 && bIsDate2) break main; //false, Wenn einer der beiden Werte kein Datum ist.
	
	var objZDate1 = new DateZZZ(sDate1);
	var objZDate2 = new DateZZZ(sDate2);
	
	var objDate1 = objZDate1.getDateObject();
	var objDate2 = objZDate2.getDateObject();

	var d1 = objDate1.getTime();
	var d2 = objDate2.getTime();
	
	var lDiffMillis = d1 - d2;	

	//alert("isDatePrevious(): Differenz in Millisekunden="  + lDiffMillis);
	if(lDiffMillis < 0) bReturn = true;
	}//end main:
	return bReturn;
}

/* Eingabeparameter sind Datumsstrings, mit '.' getrennte Werte in der Form 'TT.MM.JJJJ'*/
function isDateEqual(sDate1, sDate2){
	var bReturn = false;
	main:{
	var bIsDate1 = isDate(sDate1);
	var bIsDate2 = isDate(sDate2);
	if(! bIsDate1 && bIsDate2) break main; //false, Wenn einer der beiden Werte kein Datum ist.
	
	var objZDate1 = new DateZZZ(sDate1);
	var objZDate2 = new DateZZZ(sDate2);
	
	var objDate1 = objZDate1.getDateObject();
	var objDate2 = objZDate2.getDateObject();

	var d1 = objDate1.getTime();
	var d2 = objDate2.getTime();
	
	var lDiffMillis = d1 - d2;	

	//alert("isDateEqual(): Differenz in Millisekunden="  + lDiffMillis);
	if(lDiffMillis == 0) bReturn = true;
	}//end main:
	return bReturn;
}

/* Eingabeparameter sind Datumsstrings, mit '.' getrennte Werte in der Form 'TT.MM.JJJJ'*/
function isDateLater(sDate1, sDate2){
	var bReturn = false;
	main:{
	var bIsDate1 = isDate(sDate1);
	var bIsDate2 = isDate(sDate2);
	if(! bIsDate1 && bIsDate2) break main; //false, Wenn einer der beiden Werte kein Datum ist.
	
	var objZDate1 = new DateZZZ(sDate1);
	var objZDate2 = new DateZZZ(sDate2);
	
	var objDate1 = objZDate1.getDateObject();
	var objDate2 = objZDate2.getDateObject();

	var d1 = objDate1.getTime();
	var d2 = objDate2.getTime();
	
	var lDiffMillis = d1 - d2;	

	//alert("isDateLater(): Differenz in Millisekunden="  + lDiffMillis);
	if(lDiffMillis > 0) bReturn = true;
	}//end main:
	return bReturn;
}


//Ende des Verbergens vor nicht javascript fähigen Browsern --></script>
//</head>
//</html>

