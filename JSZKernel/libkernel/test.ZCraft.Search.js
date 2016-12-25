//Ableiten der Testklasse von Testcase:
function SearchZZZTest(name){
		TestCase.call(this, name);
}
SearchZZZTest.prototype = new TestCase();

//Wie bei den Java Tests auch hier im Setup die globalen Kernel Klassen initialisieren
//Das Setup braucht diese Namenskonvention
function SearchZZZTest_setUp(){
	TestCase.prototype.setUp.apply(this, arguments);
	
	//1. KernelKernelZZZ - Objekt erstellen
	var objKernel=new KernelKernelZZZ(this.document);
	this.objKernel = objKernel;
	
	//2. SearchZZZ - Objekt erstellen
	var objSearch = new SearchVIA(objKernel);
	this.objSearch = objSearch;
}

//Testfunktion braucht diese Namenskonvention
function SearchZZZTest_testDivideByZero(){
	var zero = 0;
	this.assertEquals("Infinity", 8/zero);
	//this.assertNull(objSearch);
}

function SearchZZZTest_testDesignElementCustomName(){
	var objSearch = this.objSearch;
	this.assertNotNull("Search Objekt ist null", objSearch);
	
	var sFrameset = objSearch.getFramesetSearch();
	this.assertNotNull("Frameset string ist null", sFrameset);
	this.assertEquals( "frsSearchVIA", sFrameset);
	
	var sFrameTargetName = objSearch.getFrameTargetName();
	this.assertNotNull("TargetFrameName ist null", sFrameTargetName);
	this.assertEquals("fm_Main", sFrameTargetName);
	
	var sViewSearch = objSearch.getViewSearch();
	this.assertNotNull("ViewSearch ist null", sViewSearch);
	this.assertEquals("viwSearchAllWebVIA", sViewSearch);
}

//Explizites Hinzufügen der Testfunktion zur Testklasse per glue() [Methode kommt aus dem JsUnit Framework]
SearchZZZTest.glue();


//############################
//Aufbau der Testsuite
//Mit dieser Namenskonvention wird die TestSuite gefunden durch den Aufruf:    var result = TextTestRunner.prototype.main( "SearchZZZTest" );
function SearchZZZTestSuite(){
	TestSuite.call(this, "SearchZZZTestSuite");
	this.addTestSuite(SearchZZZTest); //hinzufügen der Testklasse zur Suite
}
SearchZZZTestSuite.prototype = new TestSuite();
SearchZZZTestSuite.prototype.suite = function(){
	return new SearchZZZTestSuite();
}

/*
alert("TEST Kernel");
	//var sKeyKernel = document.forms[0].elements["objKernelKey"].value;
	//var sKeyAll = document.forms[0].elements["ApplicationKeyAll"+sKeyKernel].value;
	//var saKeyAll = sKeyAll.evalJSON();
	
	var objKernel=new KernelKernelZZZ(this.document);
	//!!! TODO GOON: Das geht noch nicht ... Warum ???? assertNull("test auf Fehlermessage", objKernel); //Test, das sollte dann einen Fehler auswerfen
	assertNotNull(objKernel);
	
	var sKeyKernel = $F("objKernelKey");
	assertNotNull(sKeyKernel);
	var sTemp = objKernel.getKernelKey();
	assertEquals(sKeyKernel, sTemp);
	
	var sKeyAll = $F("objApplicationKeyAll"+sKeyKernel);	
	//alert("objApplicationKeyAll="+ sKeyAll);
	assertNotNull(sKeyAll);
	var saKeyAll = sKeyAll.evalJSON();
	assertNotNull(saKeyAll);
	
	var saTemp = objKernel.getApplicationKeyAll();
	//DAS GEHT NICHT !!! assertEquals(saKeyAll, saTemp);
	saTemp.each(function(s, index){	
		//Testausgabe der ApplicationKeys
	   alert("Index: " + index + " | Wert1: " + s + " | Wert2: " + saKeyAll[index]);
		assertEquals(s, saKeyAll[index]);
		}
	);
	
	var sKeyDefault = saTemp[0];
	assertFalse(sKeyDefault=="");
	stemp = objKernel.getApplicationKeyDefault();
	assertEquals(sKeyDefault, stemp);
	
	
	var sKeyApplication = $F("objApplicationKey" + sKeyKernel);
	assertNotNull(sKeyApplication);	
	stemp =  objKernel.getApplicationKey();
	assertEquals(sKeyApplication, stemp);
	
	var sUrlConfig = objKernel.getConfigurationUrlCurrent();
	assertNotNull(sUrlConfig);
	
	//Das Fenster mit der Configurations-DB wird geöffnet und automatisch wieder geschlossen
	var viewerWindow = window.open(sUrlConfig, "VIAExecuteAction", "width=600,height=400,menubar=no,toolbar=no,location=no,status=yes,resizable=yes,scrollbars=yes");
	viewerWindow.setTimeout('this.close()',40000); //40000 = 40 Sekunden, das Fenster wird auch geschlossen, wenn es den Fokus behält !!!
	viewerWindow.focus();
	
	alert("TEST Kernel END");
	*/

//Ende des Verbergens vor nicht javascript fähigen Browsern --></script>
//</head>
//</html>	