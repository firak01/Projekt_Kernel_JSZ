//<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
//<html>
//<head>
//<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
//<script language="JavaScript" type="text/javascript">
//<!-- Vor nicht Javascript fähigen Browsern verbergen 
function testIsDateValid(){
	alert("TEST Started");
	
	var sDate = getFieldValue('date01');
	var btemp = isDate(sDate); 
	if(btemp){
		alert("Ist Datum: "+sDate);
	}else{
		alert("Kein Datum: "+sDate);
	}
	alert("TEST Ended");
}

function testIsDatePrevious(){
	alert("TEST Started");
	
	var sDate1 = getFieldValue('date01');
	var sDate2 = getFieldValue('date02');
	var btemp = isDatePrevious(sDate1, sDate2);
	if(btemp){
		alert("Datum 2 liegt vor Datum 1");
	}else{
		alert("Datum 2 liegt nicht vor Datum 1 (oder einer der beiden Strings ist kein Datum!)");
	}
	
		
}

//Ende des Verbergens vor nicht javascript fähigen Browsern --></script>
//</head>
//</html>