
function changeOtherCheckBoxValuesByGroup(objParent, bValue){
	var bReturn=false;
	main:{
		//Der 1. Parameter ist das Selektierte Checkbox-item....
		//Der 2. Paramter gibt an, wie die anderen verarbeitet werden sollen.
		//      true=alle selektieren.
		//      false=alle deselektieren.
		
		//TODO: Der 2. Parameter sollte optional sein, so dass ohne diesen Parameter die Werte ins Gegenteil geändert werden.
		//       
		//TODO: Momentan funktioniert das nur für Checkboxen, die lediglich ein Item haben.....   
		
		if(objParent==null) break main;
		
		var sCheckboxName = objParent.name;
		//alert ("onChange: " + sCheckboxName);
		
		//nun davon den Numeric Teil strippen. 
		var strCheckboxName = new String(sCheckboxName);
		//alert("Objekt fertig");
		var sBasicName = strCheckboxName.stripNumericRight(strCheckboxName);
		//alert("Basis: " + sBasicName);
		
		var iCount = 9;
		for(iCount;iCount>=0; iCount--){ //TODO: mehrerer Ziffern, ggf. mit 0 aufgefüllt verarbeiten
		    //alert("1.  changeOtherCheckBoxValuesByGroup");
			//Auf diesen Basisnamen aufbauend die Itemwerte ändern.
			//Merke: falls bValue nix ist, invertieren....
			var sName = sBasicName + "0" + iCount;
			//alert("Errechneter Name: " + sName);
			if(strCheckboxName==sName){  //Es gibt in der Standardklasse kein .equals(...)
				//nix machen....
				//alert("lasse das gleiche Item aus.");
			}else{
				var element = window.document.forms[0].elements[sName];
				if(element!=null){
					//alert("Ändere das Item.");
					if(bValue==true || bValue ==false){
						//element.value= //spielt hier keine Rolle
						element.checked = bValue;				
					}else{
						//Fall: bValue wurde als Parameter nicht übergeben. Er soll ja optional sein.
						 if(element.checked){
						 	element.checked= false;
						 }else{
						 	element.checked=true;
						 }
					} //end if if(bValue==true || bValue ==false){
				}else{
					//alert("Element nicht vorhanden");
				}//end if element
			}//end Vergleich mit aufrufendem Item...
		}//end for
		bReturn = true;
		}//end main:
		
		return bReturn;
}