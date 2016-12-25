//<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
//<html>
//<head>
//<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
//<script language="JavaScript" type="text/javascript">
//<!-- Vor nicht Javascript fähigen Browsern verbergen 
function getIndex4AliasMet(){
	alert("TEST Started");
	
	
	//Merke: 00 ist der Aliaswert für "- Kein Zähler -"
	var saIndex = getFieldIndicesWithAnyValueByGroupname("metCurOutType", "00");
	alert ("Größe des empfangenen Arrays: " + saIndex.length);
	
	var sIndexAll=""; //Todo: Aus dem saIndex einen String machen
	for(var i = 0; i<=saIndex.length-1; i++){
		if(sIndexAll!=""){
			sIndexAll = sIndexAll + " ";
		}
		sIndexAll = sIndexAll + saIndex[i];	
	}
	alert("getFieldIndicesWithAnyValueByGroupname... = " + sIndexAll);
	
	//Nun muss als Komfortfunktion für die Validierung die Wertbelegung an diesen Indexpositionen geprüft werden
	//Merke: In diesem Testszenario werden dann weiter mit dem Indexarry Werte gefiltert.
	var sFieldValues = getFieldValuesByGroupname("metCurOutNumber", saIndex);
	alert("getFieldValuesByGroupname mit 2. Parameter ... = " + sFieldValues);	
	
	//Ziel: Hat jeder Zähler eine dazugehörende Zählernummer....	
	//Damit das in einer Validierungsformel, in einer Zeile passt, verwendet man diese Komfortfunktion. 
    var bCheck = areCorrespondingFieldValuesFilledByGroupname("metCurOutType", "00", "metCurOutNumber","");
	if(bCheck){
		alert("Jeder Ausbauzähler hat auch eine Zählernummer");		
	}else{
		alert("Nicht jeder Ausbauzähler hat auch eine dazugehörende Zählernummer");				
	}
	alert("Test Ended");
}

function getIndex4AliasMetFiltered(){
	alert("Test started");
	
	//Merke: 00 ist der Aliaswert für "- Kein Zähler -"
	//Der 3. Paramter ist neu und ist ein Array mit den gültigen "Zählern", d.h. der "Leading-Spalte"
	var saLeadingValueFilter = new Array("2T_MET", "3T_MET");
	var bCheck = areCorrespondingFieldValuesFilledByGroupname("metCurInType", "00", "metCurInTime", "", saLeadingValueFilter);
	if(bCheck){
		alert("Jeder Doppeltarifzähler hat auch eine dazugehörende Schaltzeit");		
	}else{
		alert("Nicht jeder Doppeltarifzähler hat auch eine dazugehörende Schaltzeit");				
	}
	alert("Test Ended");
}

/* Komfortfunktion, z.B. für die Validierung, ob für jeden Zähler auch eine dazugehörende(!) Zählernummer vorhanden ist.
    Optionaler 5. Parameter: Fungiert als Filter, über den nur noch die "Felder" der GroupLeadingName-"Spalte" berücksichtigt werden, deren Wert in dem Filterarray stehen.*/
function areCorrespondingFieldValuesFilledByGroupname(sGroupLeadingName, sEmptyStringLeadingAlternative, sGroupCorrespondingName, sEmptyStringCorrespondingAlternative){
	var bReturn = false;
	main:{
		if(isStrEmpty(sGroupLeadingName)) break main;
		if(isStrEmpty(sGroupCorrespondingName)) break main;
		
		var sEmptyStringLeading = "";
		if(!isStrEmpty(sEmptyStringLeadingAlternative)){
			sEmptyStringLeading = sEmptyStringLeadingAlternative;
		}
		
		var sEmptyStringCorresponding = "";
		if(!isStrEmpty(sEmptyStringCorrespondingAlternative)){
			sEmptyStringCorresponding = sEmptyStringCorrespondingAlternative;
		}
		
		var saIndex = getFieldIndicesWithAnyValueByGroupname(sGroupLeadingName, sEmptyStringLeading);
	
		
		//Hier den "Filter" der Werte aus der "Leading-Gruppenspalte" ansetzen
		//und nur die Indices übriglassen, in denen der Wert vorhanden ist.
		if(arguments.length>=5){
			//das Indexarray clonen. Aus dem Clone werden die nicht relevanten Indizes entfernt.
			var saIndexClone = saIndex.slice();
			var iCloneCounter = 0;
			var saLeadingValueFilter = arguments[4];
			if(isArrayByLength(saLeadingValueFilter)){
				//Durchlaufe die Gruppe, anhand der Indexwerte
				for(var i=0; i<=saIndex.length-1; i++){					
					var sFieldname = sGroupLeadingName + saIndex[i];
					var stemp = getFieldValue(sFieldname);
					var bFound = false;
					
					for(var j=0; j<=saLeadingValueFilter.length-1; j++){
						var sLeadingValueFilter = saLeadingValueFilter[j];
						if(!isStrEmpty(sLeadingValueFilter)){
							
							if(stemp == sLeadingValueFilter)	{
								bFound = true;
								break;
							}
								
						}//end if(!strIsEmpty...
					}//end for j				
					
					if(bFound==false){ //Wenn also keiner der Filterwerte in dem Feld gefunden wurde.
							saIndexClone.splice(i-iCloneCounter,1); //entferne den Wert
							iCloneCounter++;  //damit die Indizes auch passen beim 2. Entfernen
					}					
				}//end for i
			}else{
				var sLeadingValueFilter = saLeadingValueFilter;
				if(!isStrEmpty(sLeadingValueFilter)){
					//Durchlaufe die Gruppe, anhand der Indexwerte
					for(var i=0; i<=saIndex.length-1; i++){
						var sFieldname = sGroupLeadingName + saIndex[i];
						var stemp = getFieldValue(sFieldname);
						
						if(stemp != sLeadingValueFilter){
							saIndexClone.splice(i-iCloneCounter,1); //entferne den Wert
							iCloneCounter++;  //damit die Indizes auch passen beim 2. Entfernen
						}
					}//end for i
				}
			}		
			saIndex = saIndexClone; 
		}//End if(argument.length>=5)

		//############################################################
		//#### Nun prüfen: Stimmt das mit den korrespondierenden Werten?
 		var iVergleichsanzahl     = 0;
		if (isArrayByLength(saIndex)){
			iVergleichsanzahl     = 	   saIndex.length;
	    	if(iVergleichsanzahl==1 && saIndex[0]=="") iVergleichsanzahl=0; //notwendige Korrektur
		}else{
			if(saIndex!=""){
				iVergleichsanzahl     = 	   1;
			}
		}

		//Merke: GetFieldValuesByGroupname hat extra einen 2. Paramter um zu filtern. Dadurch bekommt man den "korrespondierenden" Wert.	
		var saGemeinsameWerte  = 	 getFieldValuesByGroupname(sGroupCorrespondingName, saIndex).split('~');
		var iGemeinsameWerte = 0;
	    if (isArrayByLength(saGemeinsameWerte)){
	    	iGemeinsameWerte = saGemeinsameWerte.length;
	    	if(iGemeinsameWerte==1 && saGemeinsameWerte[0]=="") iGemeinsameWerte=0; //notwendige Korrektur
		}else{
			if(saGemeinsameWerte!=""){
				iGemeinsameWerte = 1;
			}
		}
	
		bReturn = (iGemeinsameWerte==iVergleichsanzahl);
	}//end main
	return bReturn;
}

/*Hiermit holt man sich die Nummern=Keys der Gruppe von Feldern, die einen Wert haben....*/
function getFieldIndicesWithAnyValueByGroupname(sFieldGroupName, sEmptyStringAlternative){
    var saReturn = new Array();
    main:{
    	var sEmptyString = "";
    	if(sEmptyStringAlternative!=null){
    		sEmptyString = sEmptyStringAlternative;
    	}
    	
    	//alert("Es wurden " + arguments.length + " Parameter / Argumente an die Funktion übergeben.");
    	var objaFld  = getObjectPtrByGroupname(sFieldGroupName); //getObjectPtr(window.document.forms[0],sCheckboxGroupName+"01");
		if (typeof(objaFld) != 'object') break main;
		//alert("getFieldValuesByGroupname: Länge " + objaFld.length);
		
		if(isArrayByLength(objaFld)){
		//alert("getFieldValuesByGroupname: Array vorhanden.");
		for (var i = 0; i <= objaFld.length-1; i++) {
			var sValue = objaFld[i].value;
		     //alert("getFieldValuesByGroupname: " + i + ". Wert=" + sValue);
			if(sValue!="" && sValue!=sEmptyString){
				//!!! Den Indexnamen ermitteln
				var sName = objaFld[i].name;
				//alert("getFieldIndicesWithAnyValue(): sName= " + sName );
				var sIndex = sName.getNumericRightStr();
				//alert("getFieldIndicesWithAnyValue(): sIndex= " + sIndex );
							
				saReturn = saReturn.concat(sIndex);
			}
		}
		}					
	}//end main:
	//alert ("Größe des zurückgegebenen Arrays: " + saReturn.length);
	return saReturn;
}

/*FLi 2010-06-08 Falls eine Feldgruppe nicht aus Checkboxen sondern Eingabefeldern besteht .
   Optionaler 2. Parameter ist ein Filter: D.h. es sind nur diejenigen "Felder" zu berücksichtigen, die einen der Filterwerte als numerischen Endwert haben!!!*/
function getFieldValuesByGroupname(sFieldGroupName){
	//alert("getFieldValuesByGroupname: Mit Feldgruppe=" + sFieldGroupName);
	var sReturn = "";
	main:{		
		var objaFld  = getObjectPtrByGroupname(sFieldGroupName); //getObjectPtr(window.document.forms[0],sCheckboxGroupName+"01");
		if (typeof(objaFld) != 'object') break main;
		//alert("getFieldValuesByGroupname: Länge " + objaFld.length);

	   //Optionaler 2. Paramter ist ein Filter: D.h. es sind nur diejenigen zu berücksichtigen, die einen der Filterwerte als numerischen Endwert haben!!!
    	//alert("Es wurden " + arguments.length + " Parameter / Argumente an die Funktion übergeben.");
		if(arguments.length>=2){
			//###############################################
			//Fall: Filter
			var saFilter = arguments[1];
			
			if(isArrayByLength(objaFld)){
				//alert("getFieldValuesByGroupname: Array vorhanden.");
				var saReturn = new Array();			
				for (var i = 0; i <= objaFld.length-1; i++) {
					//!!! den Namen filtern...
					var sName = objaFld[i].name;
					var sNameKey = sName.getNumericRightStr();
					var bGoon = false;
					for(var j = 0; j <= saFilter.length; j++){
						if(saFilter[j]==sNameKey){
							bGoon = true;
							break;
						}
					}
					
					if(bGoon){ //Falls der Filter gefunden wurde....
						var sValue = objaFld[i].value;
					     //alert("getFieldValuesByGroupname: " + i + ". Wert=" + sValue);
						if(sValue!=""){
							saReturn = saReturn.concat(sValue);
						}
					}
				}//end for
				if(saReturn.length>=2){
					sReturn = saReturn.join("~");
				}else if(saReturn.length==1){
					sReturn = saReturn[0];
				}else{
					sReturn = "";
				}
			}else{
				//!!! den Namen filtern
				var sName = objaFld.name;
				var sNameKey = sName.getNumericRightStr();
				for(var j = 0; j <= saFilter.length; j++){
						if(saFilter[j]==sNameKey){
							bGoon = true;
							break;
						}
				}
					
				if(bGoon){ //Falls der Filter gefunden wurde....
					var sValue = objaFld.value;
					//alert("getFieldValuesByGroupname: Einzelner Wert=" + sValue);
					if(sValue!=""){
						sReturn = objaFld.value;			
					}
				}
			}//end if: isArrayByLength						
		}else{
			//###############################################
			//+++ Fall: Kein Filter
			if(isArrayByLength(objaFld)){
				//alert("getFieldValuesByGroupname: Array vorhanden.");
				var saReturn = new Array();			
				for (var i = 0; i <= objaFld.length-1; i++) {
					var sValue = objaFld[i].value;
				     //alert("getFieldValuesByGroupname: " + i + ". Wert=" + sValue);
					if(sValue!=""){
						saReturn = saReturn.concat(sValue);
					}
				}//end for
				if(saReturn.length>=2){
					sReturn = saReturn.join("~");
				}else if(saReturn.length==1){
					sReturn = saReturn[0];
				}else{
					sReturn = "";
				}
			}else{
				var sValue = objaFld.value;
				//alert("getFieldValuesByGroupname: Einzelner Wert=" + sValue);
				if(sValue!=""){
					sReturn = objaFld.value;			
				}
			}//end if: isArrayByLength
	} //end if: Filter
	}//end main:
	return sReturn;
}

/*FLi 2010-04-09
*  Falls Checkboxen mit 01 ... nn erweitert wurden, bekommt man über den gleichen Namensbestandteil ein Objektarray
*/
function getObjectPtrByGroupname(sCheckboxGroupName){
	var objaReturn=new Array();
	main:{
		if(sCheckboxGroupName==null) break main;
		if(sCheckboxGroupName=="") break main;

		var sBasicName = sCheckboxGroupName; //TODO: Lösung dafür, wenn z.B. das Parentobjekt (also eine Checkbox selbst) übergeben wird.
		var iCount = 0;
		var sFill = "0";
		for(iCount;iCount<=10; iCount++){ //TODO: mehrerer Ziffern, ggf. mit 0 aufgefüllt verarbeiten
			if(iCount >= 10) sFill = "";
			var sName = sBasicName +sFill + iCount;
			//alert("getObjectPtrByGroupname(): sName= " + sName); 
			
			var objFld = getObjectPtr(window.document.forms[0],sName);
			if (typeof(objFld) == 'object'){
				//alert("getObjectPtrByGroupname(): sName= " + sName); 
				if(isArrayByLength(objFld)){	
					//alert("getObjectPtrByGroupname(): Ist als Array gefunden worden ... sName= " + sName);
					objaReturn = objaReturn.concat(objFld);					
				}else{
					//alert("getObjectPtrByGroupname(): Ist nur als einzelnes Feld gefunden und kein Array ... sName= " + sName);
					objaReturn = objaReturn.concat(objFld);
				}
			}else{
				//alert("getObjectPtrByGroupname(): Feld nicht gefunden ... sName= " + sName);
			}
		}
	
	}//end main:
	return objaReturn;
}
//Ende des Verbergens vor nicht javascript fähigen Browsern --></script>
//</head>
//</html>