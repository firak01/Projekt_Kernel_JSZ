//#############################
/* wenn man explizit eine Search-Suite ansteuert, braucht man diese Suite nicht */
AllTestZZZ.prototype=new TestSuite();
AllTestZZZ.prototype.suite=AllTestZZZ_suite;

//Testsuite über den Namen der Ausführungsklasse bekannt machen
function AllTestZZZ(){
	TestSuite.call(this, "AllTestZZZ");
}

function AllTestZZZ_suite(){
	var suite = new AllTestZZZ();
	suite.addTest(CategoryZZZTestSuite.prototype.suite());
	suite.addTest(CgiZZZTestSuite.prototype.suite());
	suite.addTest(SearchZZZTestSuite.prototype.suite());
	suite.addTest(ValidationZZZTestSuite.prototype.suite());
	//weitere Tests und Test suites
	
	return suite;
}

//Ende des Verbergens vor nicht javascript fähigen Browsern --></script>
//</head>
//</html>
