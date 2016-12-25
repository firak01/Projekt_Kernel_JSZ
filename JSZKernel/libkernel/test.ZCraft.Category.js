//Ableiten der Testklasse von Testcase:
function CategoryZZZTest(name){
		TestCase.call(this, name);
}
CategoryZZZTest.prototype = new TestCase();

//Wie bei den Java Tests auch hier im Setup die globalen Kernel Klassen initialisieren
//Das Setup braucht diese Namenskonvention
function CategoryZZZTest_setUp(){
	TestCase.prototype.setUp.apply(this, arguments);
	
	//1. KernelKernelZZZ - Objekt erstellen
	var objKernel=new KernelKernelZZZ(this.document);
	this.objKernel = objKernel;
	
	//2. Spezielles ValidationZZZ - Objekt erstellen
	var objCategory = new CategoryMovieVIA(objKernel);
	this.objCategory = objCategory;
}

//Testfunktion braucht diese Namenskonvention
function CategoryZZZTest_testDivideByZero(){
	var zero = 0;
	this.assertEquals("Infinity", 8/zero);
	//this.assertNull(objSearch);
}

function CategoryZZZTest_testGetDebugString(){
	var objCategory = this.objCategory;
	this.assertNotNull("Category Objekt ist null", objCategory);
	
	var sDebug = objCategory.getDebugString();
	this.assertNotNull("Debug string ist null", sDebug);
	alert("CategoryZZZTest_testGetDebugString()#\n"+sDebug);
}

function CategoryZZZTest_testExistsFlag(){
	var objCategory = this.objCategory;
	this.assertNotNull("Category Objekt ist null", objCategory);
	
	var bExists = objCategory.existsFlag("nixda");
	this.assertFalse("Flag 'nixda' sollte nicht existieren", bExists);
	
	bExists = objCategory.existsFlag("updated");
	this.assertTrue("Flag 'updated' sollte existierene", bExists);
	
	
	//TODO: testen auf ein Flag, das auf Elternklassenebenen existeren sollte
	// TODO: ObjectZZZ Klasse erstellen und hier verwenden	
}

//Explizites Hinzufügen der Testfunktion zur Testklasse per glue() [Methode kommt aus dem JsUnit Framework]
CategoryZZZTest.glue();


//############################
//Aufbau der Testsuite
//Mit dieser Namenskonvention wird die TestSuite gefunden durch den Aufruf:    var result = TextTestRunner.prototype.main( "SearchZZZTest" );
function CategoryZZZTestSuite(){
	TestSuite.call(this, "CategoryZZZTestSuite");
	this.addTestSuite(CategoryZZZTest); //hinzufügen der Testklasse zur Suite
}
CategoryZZZTestSuite.prototype = new TestSuite();
CategoryZZZTestSuite.prototype.suite = function(){
	return new CategoryZZZTestSuite();
}

//Ende des Verbergens vor nicht javascript fähigen Browsern --></script>
//</head>
//</html>