//<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
//<html>
//<head>
//<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
//<script language="JavaScript" type="text/javascript">
//<!-- Vor nicht Javascript fähigen Browsern verbergen 

/* Funktion gibt den übergebenen Testnamen aus PLUS dem aktuellen Datum/Uhrzeit.
    Datum und Uhrzeit kann wichtig sein, um "caching" auszuschliessen.
*/
function AlertTest(sTestName){
	d=new Date();
	alert("Test '" + sTestName + "'. Now it is:" + d.toLocaleString());
}


//Ende des Verbergens vor nicht javascript fähigen Browsern --></script>
//</head>
//</html>