function myDateOfDay(){
	var saMonatsname = new MakeArray(12);
	var sSeperator = " ";
	getMonthAll(saMonatsname);
	var sDate = getDateLong(saMonatsname, sSeperator);
	//alert(sDate);
	var objDatum = document.getElementById('datum');
	if (objDatum==null | objDatum=="undefined"){
		alert("Node 'datum' not found");
	}else{
		objDatum.firstChild.nodeValue = sDate;
	}
}

function myDateDifference(){
	main:{
		var sDateInput = document.forms[0].dateCompare.value;
		//alert(sDateInput);
		var sValidationHint = validateDate(sDateInput);
		if(sValidationHint != ""){
			alert(sValidationHint);
			break main;
		}
		var objDate = new DateZZZ(sDateInput);
		var sDay = objDate.getDay();
		//alert("Day: " + sDay);
		var sMonth = objDate.getMonth();
		var sYear = objDate.getYear();
		//alert("Year: " + sYear);
		//TODO GetDateDifference als eine Methode der DateZZZ-Klasse
		var dateCurrent = new Date();
		var dateInput = new Date(sYear, sMonth, sDay, dateCurrent.getHours(), dateCurrent.getMinutes(), dateCurrent.getSeconds());
		//alert("Month: " + dateInput.getMonth());
		
		//TODO Die Ausgabe per Radio-Button steuern
		var sScale = document.forms[0].listResultScale.value;  //Die values der Liste entsprechen den Steuerungsflags der Funktion.
		var iIndex = document.forms[0].listResultScale.selectedIndex;
		var sScaleText = document.forms[0].listResultScale.options[iIndex].text;
		
		var sDifference = getDateDifferenceZZZ(dateCurrent, dateInput, sScale);
		var objDatum = document.getElementById('dayComputed');
		if(objDatum==null | objDatum=="undefined"){
			alert("Node 'dayComputed' not found");
		}else{
			objDatum.firstChild.nodeValue = sDifference + " " + sScaleText;
		}
	}//End main:
}