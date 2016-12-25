//<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
//<html>
//<head>
//<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
//<script language="JavaScript" type="text/javascript">
//<!-- Vor nicht Javascript fähigen Browsern verbergen 

/**Sucht ausgehend von der aktuellen Seite alle Frames durch. D.h. bettet man in einen Seite mit Frameset einen andere Seite mit Frameset ein, so sind 
für diese Funktion alle Frames des äusseren Framesets nicht sichtbar. (Wenn man in einem Frame des inneren Framesets startet*/
function searchFrameTop(objFrameStart, sNameFrame2Search){
	var objReturn = null;
	main:{
		try{
			if(isEmpty(sNameFrame2Search)){
				throw "searchFrameTop: Kein Name für den zu suchenden Frame übergeben.";
			}
			if(objFrameStart==null){
				throw "searchFrameTop: Kein Ausgangsframe übergeben.";
			}
			
			//Merke: So geht man alle Frames durch !!!!	
			var icount = 0; 
			var bFound = false;			
			objReturn = objFrameStart;
			do{		
				for (var i = 0; i < objReturn.frames.length; i++){
					//alert(objFrameParent.frames[i].name);	
					if(objReturn.frames[i].name == sNameFrame2Search) {
						bFound = true;
						break;
					}
				}
				if (bFound == false){
					objReturn = objReturn.parent;  //Merke: Mit top kommt man sofort zum höchsten frameset.
				}
				icount++;
			}while(objReturn!=null & bFound == false & icount <= 10);				
		}catch(e){
			throw handleErrorZZZ(e, "");
		}	  
	}//end main
	return objReturn;
}

/**Sucht ausgehend vom Fenster alle Frames durch */
function searchFrameTopAll(objFrameStart, sNameFrame2Search){
	var objReturn = null;
	main:{
		try{
			if(isEmpty(sNameFrame2Search)){
				throw "searchFrameTop: Kein Name für den zu suchenden Frame übergeben.";
			}
			if(objFrameStart==null){
				throw "searchFrameTop: Kein Ausgangsframe übergeben.";
			}
			
			//Merke: So geht man alle Frames durch !!!!	
			var icount = 0; 
			var bFound = false;			
			
			var objWindow = objFrameStart.top;
			if(objWindow!=null){		
					for (var i = 0; i < objWindow.frames.length; i++){
						//alert(objFrameParent.frames[i].name);	
						var objFrame = objWindow.frames[i];
						if(objFrame!=null){
							if(objFrame.name == sNameFrame2Search) {
								objReturn = objFrame;
								bFound = true;
							}else{
								//TODO Rekursion, erst mal ausprogrammieren
								for (var ii = 0 ; ii < objFrame.frames.length; ii++){
									var objFrame2 = objFrame.getFrame[ii];
									if(objFrame2 != null){
										if(objFrame2.name == sNameFrame2Search) {
											objReturn = objFrame2;
											bFound = true;
											break;
										}
									}//end if objFrame2 != null
								}//end for 2								
							}
							if(bFound==true) break;
						}//end if objFrame != null
					}
					
					if (bFound == false){
						objReturn = objFrameStart.top;  //Merke: Mit top kommt man sofort zum höchsten frameset. Mit Parent zu dem der Seite.
					}
			}//end if objWindow != null		
		}catch(e){
			throw handleErrorZZZ(e, "");
		}	  
	}//end main
	return objReturn;
}

//Ende des Verbergens vor nicht javascript fähigen Browsern --></script>
//</head>
//</html>