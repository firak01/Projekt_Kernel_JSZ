//Ableiten der Testklasse von Testcase:
function ValidationZZZTest(name){
		TestCase.call(this, name);
}
ValidationZZZTest.prototype = new TestCase();

//Wie bei den Java Tests auch hier im Setup die globalen Kernel Klassen initialisieren
//Das Setup braucht diese Namenskonvention
function ValidationZZZTest_setUp(){
	TestCase.prototype.setUp.apply(this, arguments);
	
	//1. KernelKernelZZZ - Objekt erstellen
	var objKernel=new KernelKernelZZZ(this.document);
	this.objKernel = objKernel;
	
	//2. Spezielles ValidationZZZ - Objekt erstellen
	var objValidation = new ValidationMovieVIA(objKernel);
	this.objValidation = objValidation;
}

//Testfunktion braucht diese Namenskonvention
function ValidationZZZTest_testDivideByZero(){
	var zero = 0;
	this.assertEquals("Infinity", 8/zero);
	//this.assertNull(objSearch);
}

function ValidationZZZTest_testGetDebugString(){
	var objValidation = this.objValidation;
	this.assertNotNull("Validation Objekt ist null", objValidation);
	
	var sDebug = objValidation.getDebugString();
	this.assertNotNull("Debug string ist null", sDebug);
	alert("ValidationZZZTest_testGetDebugString()#\n"+sDebug);
}

//Explizites Hinzufügen der Testfunktion zur Testklasse per glue() [Methode kommt aus dem JsUnit Framework]
ValidationZZZTest.glue();


//############################
//Aufbau der Testsuite
//Mit dieser Namenskonvention wird die TestSuite gefunden durch den Aufruf:    var result = TextTestRunner.prototype.main( "SearchZZZTest" );
function ValidationZZZTestSuite(){
	TestSuite.call(this, "ValidationZZZTestSuite");
	this.addTestSuite(ValidationZZZTest); //hinzufügen der Testklasse zur Suite
}
ValidationZZZTestSuite.prototype = new TestSuite();
ValidationZZZTestSuite.prototype.suite = function(){
	return new ValidationZZZTestSuite();
}
	
//Ende des Verbergens vor nicht javascript fähigen Browsern --></script>
//</head>
//</html>	