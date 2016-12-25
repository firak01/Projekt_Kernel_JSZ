//Ableiten der Testklasse von Testcase:
function CgiZZZTest(name){
		TestCase.call(this, name);
}
CgiZZZTest.prototype = new TestCase();
//Wie bei den Java Tests auch hier im Setup die globalen Kernel Klassen initialisieren
//Das Setup braucht diese Namenskonvention
function CgiZZZTest_setUp(){
	TestCase.prototype.setUp.apply(this, arguments);
	
	//1. KernelKernelZZZ - Objekt erstellen
	var objKernel=new KernelKernelZZZ(this.document);
	this.objKernel = objKernel;
	
	//2. Spezielles ValidationZZZ - Objekt erstellen
	var objCgi = new CgiVIA(objKernel);
	this.objCgi = objCgi;
}
//Testfunktion braucht diese Namenskonvention
function CgiZZZTest_testDivideByZero(){
	var zero = 0;
	this.assertEquals("Infinity", 8/zero);
	//this.assertNull(objSearch);
}
function CgiZZZTest_testGetDebugString(){
	var objCgi = this.objCgi;
	this.assertNotNull("Cgi Objekt ist null", objCgi);
	
	var sDebug = objCgi.getDebugString();
	this.assertNotNull("Debug string ist null", sDebug);
	alert("CgiZZZTest_testGetDebugString()#\n"+sDebug);
}
function CgiZZZTest_testExistsFlag(){
	var objCgi = this.objCgi;
	this.assertNotNull("Cgi Objekt ist null", objCgi);
	
	var bExists = objCgi.existsFlag("nixda");
	this.assertFalse("Flag 'nixda' sollte nicht existieren", bExists);
	
	//bExists = objCgi.existsFlag("updated");
	//this.assertTrue("Flag 'updated' sollte existieren", bExists);
	
	//TODO: testen auf ein Flag, das auf Elternklassenebenen existeren sollte
	// TODO: ObjectZZZ Klasse erstellen und hier verwenden	
}
function CgiZZZTest_testGetFieldnameByCgiVariable(){
	var objCgi = this.objCgi;
	this.assertNotNull("Cgi Objekt ist null", objCgi);
	
	var sCgi = "Query_String";
	var sField = objCgi.getFieldnameByCgiVariable(sCgi);
	this.assertEquals("Feldname falsch", "objQueryStringZZZ", sField);
}
//Explizites Hinzufügen der Testfunktion zur Testklasse per glue() [Methode kommt aus dem JsUnit Framework]
CgiZZZTest.glue();
//############################
//Aufbau der Testsuite
//Mit dieser Namenskonvention wird die TestSuite gefunden durch den Aufruf:    var result = TextTestRunner.prototype.main( "SearchZZZTest" );
function CgiZZZTestSuite(){
	TestSuite.call(this, "CgiZZZTestSuite");
	this.addTestSuite(CgiZZZTest); //hinzufügen der Testklasse zur Suite
}
CgiZZZTestSuite.prototype = new TestSuite();
CgiZZZTestSuite.prototype.suite = function(){
	return new CgiZZZTestSuite();
}

//Ende des Verbergens vor nicht javascript fähigen Browsern --></script>
//</head>
//</html>