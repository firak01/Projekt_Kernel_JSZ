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



function getDateDifferenceZZZ(d1, d2, sFlag){
/* gibt den Datumsunterschied zwischen den beiden Datumsobjekten an
    sFlag="minute" oder "second" oder "day", d.h. der Rückgabewert sind die Sekunden/Minuten oder Tage mit 'day' als default
    */
    var sReturn = "";
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

function getDateLong(saMonatsName, sSeparator){
	var sReturn = "";

    //TODO: Prüfen der Parameter
    //TODO: Einbau einer try... catch Error Behandlung
    getMonthAll(saMonatsName);
    
	var d= new Date();
	var sDate = d.getDate();
	if(sSeparator.charAt(0)==" " & sSeparator.length==1) sDate+=".";  //Hinter dem Tagesdatum soll der Punkt kommen
	
	sDate+=sSeparator+saMonatsName[d.getMonth()];
	
	var sJahr = getYearY2K(d);//d.getYear();
	//if(sJahr < 999) sJahr+=1900;
	sDate+=sSeparator+sJahr
	
	sReturn =sDate;
	return sReturn;
}



function getMonthAll(saMonatsName){
	//var saMonatsName = new MakeArray(12);
	saMonatsName.length=12;
    saMonatsName[0]="Januar";
   saMonatsName[1] ="Februar";
   saMonatsName[2] ="März";
   saMonatsName[3] ="April";
   saMonatsName[4] ="Mai";
   saMonatsName[5] ="Juni";
   saMonatsName[6] ="Juli";
   saMonatsName[7] ="August";
   saMonatsName[8] ="September"
   saMonatsName[9] ="Oktober"
   saMonatsName[10] ="November"
   saMonatsName[11] ="Dezember"
}

function getYearY2K(d){
/* Einfache Methode die Jahr 2000 Problematik in Javascript zu umgehen.
    d = JSDate-Objekt
    
    ggf. ist eine Alternative date.getFullYear()
*/
   var y = d.getYear();
   if(y<200)
      return y+1900;
    else
      return y;
}



/*____________________________________________________________________________*/

function areDatesInSameRange( date1, date2, range )
/*____________________________________________________________________________*/
{
	//Diese Funktion ermittelt, ob die beiden angegebenen Datumswerte im gleichen Intervall liegen.
	//Parameter:
	//1. Datumswert 1
	//2. Datumswert 2
	//3. Intervall in Monaten (z.B. 6 für Halbjahr, 3 für Quartal etc.)
	//Rückgabewert: True, falls beiden Datumswerte im gleichen Intervall liegen, sonst False
	var rtnValue = false;
	var jahr1 = date1.getYear();
	var monat1 = date1.getMonth();
	var jahr2 = date2.getYear();
	var monat2 = date2.getMonth();
	// Jahr überprüfen
	if( jahr1 == jahr2 )
	{
		// Im gleichen Jahr => Monat überprüfen
		if( parseInt(monat1 / range) == parseInt(monat2 / range) )
		{
			// Monat 1 und Monat 2 im gleichen Intervall
			rtnValue = true;
		}
	}
	
	// Wert zurückgeben	
	return rtnValue;
}



/*____________________________________________________________________________*/

function dateNextDay( date )
/*____________________________________________________________________________*/
{
	//Diese Funktion liefert den Tag nach dem angegebenen Datum zurück.
	//Parameter:
	//1. Ausgangsdatum
	//Rückgabewert: Neues Datum (einen Tag später)
	var rtnValue = new Date(date);
	var tag = date.getDate();
	var monat = date.getMonth() + 1;
	var jahr = date.getYear();
	var maxTag = 0;
	if( monat == 1 || monat == 3 || monat == 5 || monat == 7 || monat == 8 || monat == 10 || monat == 12 )
	{
		// Tage für den Monate mit 31 Tagen überprüfen
          maxTag = 31
	} // Monate mit 31 Tagen
	else if( monat == 4 || monat == 6 || monat == 9 || monat == 11 )
	{
		// Tage für den Monate mit 30 Tagen überprüfen
		maxTag = 30
	} // Monate mit 30 Tagen
	else if( monat == 2 )
	{
		// für den Februar
		if( jahr % 1000 == 0 )
		{
			// dann Schaltjahr
			maxTag = 29
		}
		else if( jahr % 100 == 0 )
		{
			// kein Schaltjahr
			maxTag = 28
		}
		else if( jahr % 4 == 0 )
		{
			// dann Schaltjahr
			maxTag = 29
		}
		else
		{
			// kein Schaltjahr
			maxTag = 28
		}
	} // Monat Februar
	// Tag überprüfen
	if( tag + 1 > maxTag )
	{
		// Tag fällt in den nächsten Monat
		rtnValue.setDate(1)
		// Monat überprüfen
		if( monat + 1 > 12 )
		{
			// Monat fällt ins nächste Jahr
			rtnValue.setMonth(0)
			rtnValue.setYear(jahr + 1)			
		}
		else
		{
			// Monat noch im aktuellen Jahr
			//monat ist bereits +1
			rtnValue.setMonth(monat)
		}
	}
	else
	{
		// Tag noch im aktuellen Monat
		rtnValue.setDate(tag + 1)
	}

	// Neues Datum zurückgeben	
	return rtnValue;
}

/*____________________________________________________________________________*/

function datePreviousDay( date )
/*____________________________________________________________________________*/
{
	//Diese Funktion liefert den Tag vor dem angegebenen Datum zurück.
	//Parameter:
	//1. Ausgangsdatum
	//Rückgabewert: Neues Datum (einen Tag früher)
	var rtnValue = new Date(date);
	var tag = date.getDate();
	var monat = date.getMonth(); // Vormonat (Monat 0=Dezember, 1=Januar ... 11=November)!
	var jahr = date.getYear();	
	var maxTag = 0;
	
	if( monat == 1 || monat == 3 || monat == 5 || monat == 7 || monat == 8 || monat == 10 || monat == 0 )
	{
		// Anzahl Tage dieser Monate: 31
          maxTag = 31
	}
	else if( monat == 4 || monat == 6 || monat == 9 || monat == 11 )
	{
		// Anzahl Tage dieser Monate: 30
		maxTag = 30
	} 
	else if( monat == 2 )
	{
		// für den Februar
		if( jahr % 1000 == 0 )
		{
			// dann Schaltjahr
			maxTag = 29
		}
		else if( jahr % 100 == 0 )
		{
			// kein Schaltjahr
			maxTag = 28
		}
		else if( jahr % 4 == 0 )
		{
			// dann Schaltjahr
			maxTag = 29
		}
		else
		{
			// kein Schaltjahr
			maxTag = 28
		}
	} // Monat Februar
	// Tag überprüfen
	if( tag - 1 == 0 )
	{
		// Monat überprüfen
		if( monat == 0 )
		{
			// Monat fällt ins vorherige Jahr
			rtnValue.setMonth(11)
			rtnValue.setYear(jahr-1)			
		}
		else
		{
			// Monat noch im aktuellen Jahr
			// setze Monatskomponente auf Vormonat
			rtnValue.setMonth(monat-1)
		}
		// Tag fällt in den vorherigen Monat
		rtnValue.setDate(maxTag)		
	}
	else
	{
		// Tag noch im aktuellen Monat
		rtnValue.setDate(tag - 1)
	}

	// Neues Datum zurückgeben	
	return rtnValue;
}


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


/*____________________________________________________________________________*/

function validateDate( vDate )
/*____________________________________________________________________________*/
{
   // TSe, 2006-12-04: Erweiterung: statt des Felds kann nun auch direkt das Datum als String übergeben werden
	
   var rtnValue = "";
   var ARY; // = ObjField.value.split( "." );
   
	if( vDate == null ) { return false; }														
	if( vDate.value == null ) {
		ARY = vDate.split(".");									// get string value
 	} else {
		if( vDate.value != '' ) {
			ARY = vDate.value.split(".");							// get field value
		} else { 
			return false;
		}								
	}
   
   if( ARY.length != 3 ){  // Abfrage, ob 3 Positionen im Datum
      rtnValue = "Bitte geben Sie das Datum in der Form TT.MM.JJJJ ein.";
      return rtnValue;
   }else{
      var tag = Number( ARY[0] );
      var monat = Number( ARY[1] );
      var jahr = Number( ARY[2] );
      if(ARY[2].length != 4){
         rtnValue = "Bitte geben Sie das Datum in der Form TT.MM.JJJJ ein.";
         return rtnValue;
      }
      if( monat < 1 || monat > 12 ){
         rtnValue = "Bitte geben Sie f\u00FCr den Monat nur Zahlen von 1 .. 12 ein.";
         return rtnValue;
      }
      if( monat == 1 || monat == 3 || monat == 5 || monat == 7 || monat == 8 || monat == 10 || monat == 12 ){
          if( tag < 1 || tag > 31 ){  // Tage für den Monate mit 31 Tagen überprüfen
              rtnValue = "Bitte geben Sie f\u00FCr den Monat " + monat + " nur Tage von 1 .. 31 ein.";
              return rtnValue;
          }
      }  // monate mit 31 Tagen
      else if( monat == 4 || monat == 6 || monat == 9 || monat == 11 ){
          if( tag < 1 || tag > 30 ){  // Tage für den Monate mit 30 Tagen überprüfen
              rtnValue = "Bitte geben Sie f\u00FCr den Monat " + monat + " nur Tage von 1 .. 30 ein.";
              return rtnValue;
          }      
      } // monaten mit 30 tagen
      else if( monat == 2 ){ // für den Februar
         if( jahr % 1000 == 0 ){  // dann schaltjahr
            if(tag < 1 || tag > 29){
                rtnValue = "Bitte geben Sie f\u00FCr den Februar nur Tage von 1 .. 29 ein.";
                return rtnValue;            
            }
         }
         else if( jahr % 100 == 0 ){ // kein schaltjahr
            if(tag < 1 || tag > 28){
                rtnValue = "Bitte geben Sie f\u00FCr den Tag Februar nur Tage von 1 .. 28 ein.";
                return rtnValue;            
            }         
         }
         else if( jahr % 4 == 0 ){ // dann schaltjahr
            if(tag < 1 || tag > 29){
                rtnValue = "Bitte geben Sie f\u00FCr den Tag Februar nur Tage von 1 .. 29 ein.";
                return rtnValue;            
            }         
         }
      } // monat februar
   }
   return rtnValue;
}



/*____________________________________________________________________________*/

function isDateToday( ObjField )
/*____________________________________________________________________________*/
{
	// Diese Funktion überprüft, ob das angegebene Datum dem heutigen Datum entspricht.
	// Parameter: Datum (Feld-Objekt)
	// Rückgabewert: True falls Heute, sonst False
   var rtnValue = false;
   var ARY = ObjField.value.split( "." );
   var tag = Number( ARY[0] );
   var monat = Number( ARY[1] );
   var jahr = Number( ARY[2] );
   var Datum = new Date( jahr, monat-1, tag );
   var Now = new Date();
   var tDatum = Datum.getTime() / 1000;
   Now.getTime()
   var NowDatum = new Date( Now.getFullYear(), Now.getMonth(), Now.getDate() );
   var tNowDatum = NowDatum.getTime() / 1000;
   if( tDatum == tNowDatum  ) {
      rtnValue = true;
   }
   return rtnValue;            
}



/*____________________________________________________________________________*/

function isPastDate( vDate )
/*____________________________________________________________________________*/
{
   var rtnValue = "";
   // var ARY = ObjField.value.split( "." );
   
   if( vDate == null ) { return "Sie haben kein Datum übergeben."; }	
													
   if( vDate.value == null ) {
		ARY = vDate.split( "." );									// get string value
   } else {
		if( vDate.value != '' ) {
			ARY = vDate.value.split( "." );							// get field value
		} else { 
			return "Das übergebene Datumsfeld ist leer.";
		}								
   }		
	
   var tag = Number( ARY[0] );
   var monat = Number( ARY[1] );
   var jahr = Number( ARY[2] );
   var Datum = new Date( jahr, monat-1, tag );
   var Now = new Date();
   var tDatum = Datum.getTime() / 1000;
   Now.getTime()
   var NowDatum = new Date( Now.getFullYear(), Now.getMonth(), Now.getDate() );
   var tNowDatum = NowDatum.getTime() / 1000;
   if( tDatum < tNowDatum  ) {
      rtnValue = "Sie haben ein vergangenes Datum eingegeben.";
   }
   return rtnValue;            
}



/*____________________________________________________________________________*/

function isFutureDate( ObjField )
/*____________________________________________________________________________*/
{
   var rtnValue = "";
   var ARY = ObjField.value.split( "." );
   var tag = Number( ARY[0] );
   var monat = Number( ARY[1] );
   var jahr = Number( ARY[2] );
   var Datum = new Date( jahr, monat-1, tag );
   var Now = new Date();
   var tDatum = Datum.getTime() / 1000;
   Now.getTime()
   var NowDatum = new Date( Now.getFullYear(), Now.getMonth(), Now.getDate() );
   var tNowDatum = NowDatum.getTime() / 1000;
   if( tDatum > tNowDatum  ) {
      rtnValue = "Sie haben ein zuk\u00fcnftiges Datum eingegeben.";
   }
   return rtnValue;            
}



/*____________________________________________________________________________*/

function isWeekendDate( ObjField )
/*____________________________________________________________________________*/
{
   var rtnValue = "";
   var ARY = ObjField.value.split( "." );
   var tag = Number( ARY[0] );
   var monat = Number( ARY[1] );
   var jahr = Number( ARY[2] );
   var Datum = new Date( jahr, monat-1, tag );
   if( Datum.getDay() == 0 || Datum.getDay() == 6 ) {
      rtnValue = "Das von Ihnen eingegebene Datum f\u00e4llt auf ein Wochenende.";
   }
   return rtnValue;            
}



/*____________________________________________________________________________*/

function isHolidayDate( ObjField )
/*____________________________________________________________________________*/
{
	// Hinweis wir kümmern uns zunächst hier nur um die Feiertage, welche für alle Bundesländer arbeitsfrei sind
	var rtnValue = "";
	var hh = ObjField.value.split(".");				// Datum inBestandteile zerlegen
	//Aus dem übergebenen Datum ein Datumsobjekt ohne Zeitangaben machen machen
	try
	{
		var Datum = new Date(Number(hh[2]),		// Jahr
	                                          Number(hh[1]-1),		// Monat (Zählung muß mit 0 beginnen)
									  Number(hh[0]) );		// Tag

		if (  isHolidayDateDV(Datum) )
		{
			rtnValue = "Das Datum f\u00e4llt auf einen bundesweiten Feiertag.";
		}

	}
	catch (e)
	{
		// Falls Fehler aufgetreten werfen wir eine eigene Exception, die dann in Catch von rufender Einheit
		// behandelt wird.	
		throw new Error("Fehler in isHollydayDate : " + e.message);
	}
	return  rtnValue;
}



/*____________________________________________________________________________*/

function isHolidayDateDV( DateValue )
/*____________________________________________________________________________*/
{
	// Hinweis wir kümmern uns zunächst hier nur um die Feiertage, welche für alle Bundesländer arbeitsfrei sind
	var rtnValue = false;
	try
	{
		var Datum = DateValue;
		// Berechne OsterSonntag für das Jahr, in welches das Datum fällt							  
		// Anlegen einer Tabelle mit Feiertagen für das Jahr, in welches das Datum fällt	
		var OS =  getEasterDate( Datum.getYear() );
		var OT = OS.getDate();		//liefert den tag
		
		var FeiertagsTab = new Array(11);
		var einTag = 1000 * 24* 60 *60;
		FeiertagsTab[0]	= new Date( Datum.getYear(), 1-1,1);								//Neujahr
		FeiertagsTab[1] = new Date( OS.getYear(), OS.getMonth(),  OT -2);		//Karftreitag
		
		FeiertagsTab[2] = OS;																	//Ostersonntag
		FeiertagsTab[3]	= new Date( OS.getYear(), OS.getMonth(),  OT +1);		//Ostermontag
		
		FeiertagsTab[4]	= new Date( Datum.getYear(), 5-1,1);								//1.Mai
		FeiertagsTab[5]	= new Date( OS.getYear(), OS.getMonth(),  OT +39);		//Himmelfahrt											
		FeiertagsTab[6]	= new Date( OS.getYear(), OS.getMonth(),  OT +49);		//PfingstSonntag
		FeiertagsTab[7]	= new Date( OS.getYear(), OS.getMonth(),  OT +50);		//Pfingstmontag
										  
		FeiertagsTab[8] = new Date( Datum.getYear(), 10-1,3);						//Tag der Einheit
		FeiertagsTab[9] = new Date( Datum.getYear(), 12-1,25);						//1.Weihnachtsfeiertag
		FeiertagsTab[10] = new Date( Datum.getYear(), 12-1,26);						//2.Weihnachtsfeiertag
		 for (i=0; i<11;i++) 
		{
			// Hinweis : der Vergleich zweier "gleicher Datum ging nicht, darum über die Differenz
			//alert(FeiertagsTab[i]);
			var dd = FeiertagsTab[i] - Datum;
			if (  dd > -1 &  dd < +1)
			{
					rtnValue = true;	
					break;
			}
		}
	}
	catch (e)
	{
		// Falls Fehler aufgetreten werfen wir eine eigene Exception, die dann in Catch von rufender Einheit
		// behandelt wird.	
		throw new Error("Fehler in isHolidayDate : " + e.message);
	}
	return  rtnValue;
}



/*____________________________________________________________________________*/

function getEasterDate( iJahr )
/*____________________________________________________________________________*/
{	// Liefert das Osterdatum des angegebenen Jahres zurück
	// Stammt von Herrn Oltmann   (Quelle = PC Magazin)
	/*Der Algorithmus dazu ist auch beschrieben in "Das C# Codebook" von Jürgen Bayer*/
      var dateA = new Date();
      var iA = 0;
      var iB = 0;
      var iC = 0;
      var iD = 0;
      var iE = 0;
      var iTag = 0;
      var iMonat = 0;
      iA = iJahr % 19;
      iB = iJahr % 4;
      iC = iJahr % 7;
      iD = (19 * iA + 24) % 30;
      iE = (2 * iB + 4 * iC + 6 * iD + 5) % 7;
      iTag = 22 + iD + iE;
      iMonat = 2;
      if (iTag > 31)
        {
        iTag = iD + iE - 9;
        iMonat = 3;
        }
      if (iTag == 26 && iMonat == 3)
        {
        iTag = 19;
        }
      if (iTag == 25 && iMonat == 3 && iD == 28 && iE == 6 && iMonat > 9)
        {
        iTag = 18;
        }
      dateA.setDate(iTag);
      dateA.setMonth(iMonat);
      dateA.setYear(iJahr);
      return dateA;
}



/*____________________________________________________________________________*/

function getDaysTillDate( vDate )
/*____________________________________________________________________________*/
{	// Liefert die Anzahl der Tage von Heute bis zum angegebenen Datum zurück
	// Berücksichtigt keine Wochenenden und/oder Feiertage
	//****** Stand vom 23.11.2004 *****	
	// TSe, 2006-12-04: Erweiterung: statt des Felds kann nun auch direkt das Datum als String übergeben werden
	
	var rtnValue = "";
	// Übergabeobjekt ist Feld und kein Datum - darum in Date Objekt verwandeln
	try
	{	
		var hh;			
		// Datum inBestandteile zerlegen		
		if( vDate == null ) { return false; }														
		if( vDate.value == null ) {
			hh = vDate.split(".");									// get string value
	 	} else {
			if( vDate.value != '' ) {
				hh = vDate.value.split(".");							// get field value
			} else { 
				return false;
			}								
	 	}
		
		var Datum = new Date(Number(hh[2]),		// Jahr
	                                          Number(hh[1]-1),		// Monat (Zählung muß mit 0 beginnen)
									  Number(hh[0]) );		// Tag
     	var Diff = Datum - new Date();					// Differenz übergebenes Datum - heutige	
		rtnValue = Diff / (1000 * 60 *60 *24);			// Differenz in Tagen gebrochene Dezimalzahl
	}
	catch (e)
	{
		// Falls Fehler aufgetreten werfen wir eine eigene Exception, die dann in Catch von rufender Einheit
		// behandelt wird.	
		throw new Error("Fehler in getDaysTillDate : " + e.message);
	}
	//isHollydayDate( ObjField );
	return  rtnValue;
}



