//<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
//<html>
//<head>
//<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
//<script language="JavaScript" type="text/javascript">
//<!-- Vor nicht Javascript fähigen Browsern verbergen 

/*____________________________________________________________________________*/
function findAliasFromRangeNumericZZZ(sChoiceString, sValue, sSeparatorEntry, sSeparatorChoice, sSeparatorRange){
	var arrReturn = new Array();
	main:{

	if(isStrEmpty(sChoiceString)) break main;
	if(isStrEmpty(sValue)) break main;
	if(! isNumericZZZ(sValue)) break main;
	
	if(isStrEmpty(sSeparatorEntry)){
		sSeparatorEntry = ";";	
	}
	if(isStrEmpty(sSeparatorChoice)){
		sSeparatorChoice = "|";	
	}
	if(isStrEmpty(sSeparatorRange)){
		sSeparatorRange = "-";	
	}

	//++++++++++++++++++++
	var iValue = getNumericZZZ(sValue);
	
	//++++++++++++++++++++	
	//var elem = arrReturn.push("test");
	
	//1. Splitte die Werte am Eintrags-Separator
	var arrEntry = sChoiceString.split(sSeparatorEntry);
	if(! isArrayDefinedZZZ(arrEntry)) break main;
	
	for(var i = 0; i <= arrEntry.length-1; i++){
		//2. Splitte die Werte am Choice-Separator
		var sEntry = arrEntry[i];
		var sLeft = getStrLeftStr(sEntry, sSeparatorChoice);     //Der angegebene Wertebereich
		var sRight = getStrRightStr(sEntry, sSeparatorChoice); //Der Alias
		if(!isStrEmpty(sLeft) & !isStrEmpty(sRight)){
			
			//3. Splitte die Werte am Range-Separator
			var sLow = getStrLeftStr(sLeft, sSeparatorRange);
			var sHigh = getStrRightStr(sLeft, sSeparatorRange);
			if(!isStrEmpty(sLow) & ! isStrEmpty(sHigh)){
				if(isNumericZZZ(sLow) & isNumericZZZ(sHigh)){
					var iLow = getNumericZZZ(sLow);
					var iHigh = getNumericZZZ(sHigh);
					
					//4. Prüfe, ob der Zahlwert in den Bereich fällt.
					if((iValue >= iLow) && (iValue <= iHigh)){
						arrReturn.push(sRight);							
					}						
				}else{
					//Nur ein Wert definiert oder falsches Trennzeichen übergeben.				
				}
			}else{
				//Nur ein Wert definiert oder falsches Trennzeichen übergeben.				
			}
			
			
		}//!isStrempty...
	}//end for
		
	}//end main
	return arrReturn;
}


function getValueFromFieldByAlias(sFieldname, sAlias, sEntrySeparator){
    var sReturn = "";
    var sListSeparator="|";
    main:{
		var sValue = getFieldValue(sFieldname);
		//alert("getValueFromTextlistByAlias(): Fieldname=" + sFieldname + " | alias=" + sAlias + " | EntrySep=" + sEntrySeparator + " | Wert = " + sValue);
	
		var saValue = sValue.split(";");
		for(var i = 0; i<saValue.length;i++){
			var stemp = saValue[i];
			//alert("getValueFromTextlistByAlias():" + stemp);
			var iIndex = stemp.lastIndexOf(sListSeparator);
			//alert("getValueFromTextlistByAlias():" + "Index: " + iIndex);
			if(iIndex>=-1){
				var sproof = getStrRight(stemp, stemp.length-sListSeparator.length - iIndex);
				//alert("getValueFromTextlistByAlias():" + "sproof1=" + sproof);
				if(sproof==sAlias){
					sReturn = getStrLeft(stemp, stemp.length-sAlias.length-sListSeparator.length);
					break main;
				}
			}else{
				//TODO: Testen dieses Falls.....
				var sproof = getStrRightBack(stemp, sAlias.length);
				//alert("getValueFromTextlistByAlias(): sproof2=" + sproof);
				if(sproof==sAlias){
					sReturn = getStrLeft(stemp, stemp.length-sAlias.length);
					break main;
				}
			}
		}					
	}//end main:
	return sReturn;
}




//Ende des Verbergens vor nicht javascript fähigen Browsern --></script>
//</head>
//</html>