function myAliasByRangeNumericZZZ(){
	main:{
	var objChoice = document.getElementById('choice');
	if (objChoice==null | objChoice=="undefined"){
		alert("Node 'choice' not found");
		break main;
	}
	
	var objValue = document.getElementById('value');
	if (objValue==null | objValue=="undefined"){
		alert("Node 'value' not found");
		break main;
	}
	
	var sChoice = objChoice.value;
	var sValue = objValue.value;
	
	var arrAlias = findAliasFromRangeNumericZZZ(sChoice, sValue, ";", "|", "#");
	
	/* Analyse mit Bordmitteln, wir haben aber eine tolle Funktion
	alert("Ist typeof: " + typeof arrAlias);
	if(isArray(arrAlias)){
		alert("Es ist ein Array mit der Länge:" + arrAlias.lenght);
	}else{
		alert("Es ist noch kein Array!");
	}
	alert("stop: " + arrAlias);
	*/
	
	if(isArrayDefinedZZZ(arrAlias)){
		//alert("definiertes Array");
		var objAlias = document.getElementById('alias');
		if (objAlias==null | objAlias=="undefined"){
			alert("Node 'alias' not found");
			break main;
		}else{
			objAlias.firstChild.nodeValue = arrAlias;
		}
	}else{
		alert("nicht als Array definiert, bzw. leer.");		
	}
	
	/* das geht nicht, da die Variable auf jeden Fall definiert sein muss
	if(isArrayDefinedZZZ(nix)){
		alert("definiertes Array");
	}else{
		alert("nicht als Array definiert, bzw. leer.");		
	}*/
	
	/* das geht, da die Variable definiert ist
	var nix;
	if(isArrayDefinedZZZ(arrAlias)){
		alert("definiertes Array");
	}else{
		alert("nicht als Array definiert, bzw. leer.");		
	}*/
	
	
	}//end main
}
