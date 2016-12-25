/*wird im onload der Makse aufgerufen.
   Falls die angezeigte HTML-Seite nach dem Aufruf nicht Bestandteil eines Framesets ist, wird das Frameset geladen.
   Merke: Die Page (mit dem Frameset) besitzt eine entsprechende Erweiterung im Header-Bereich.
*/
function reloadFramesetVIA(){
//TODO: Dies in eine Lib - Packen, verallgemeinern und auch in alle anderen Masken einbauen
	if ( top.location == self.location ){
		//alert(self.location.pathname);
		//alert(self.location.href); //hier ist auch der QueryString vorhanden
		var sPath = getStrLeftStr(self.location.href, '.nsf/0/');
		//alert(sPath);
		var sPath2 = sPath.concat(".nsf/pagFrsStartWebVIA?OpenPage"); //.concat( self.location.href);
		//alert(sPath2);
		
		//Versuch die bisherigen QueryString-Informationen rüberzuretten.
		var sQuery = "";
		var sQueryAll = getStrRightStr(self.location.href, sPath + '.nsf/0/');
		//alert(sQueryAll);
		if(sQueryAll != ""){
			var sDocId = getStrLeftStr(sQueryAll + '?', '?');
			//alert(sDocId);
			
			var sQueryOld = getStrRightStr(sQueryAll, '?OpenDocument&');  //!!! DAS IST CASESENSITIV !!!
			//alert("QueryOld: '" + sQueryOld + "'");
			if(sQueryOld!="") sQueryOld = "&" + sQueryOld;
			
			sQuery = "docframe=" + sDocId + sQueryOld;
			
			//!!! alle ggfs. mitgegebenen sonstigen URL-Parameter auch mitgeben
		}
		
		var sPath3 = "";
		if(sQuery == "" ){
			sPath3 = sPath2;
		}else{
			sPath3 = sPath2 +"&" + sQuery;
		}
		
		//Aber wie krieg ich die Seite jetzt in den Frame ???
 		top.location.href = sPath3;
 	}
}

/*FGL 20081201 Werden wohl nicht mehr gebraucht ?
 * 	FramesetNachladen und FramesetUeberpruefen sind die Vorlagen für realoadFramesetVIA-Funktionalität
 */
 /*
function FramesetNachladen(){
	if(top.location.search != ""){
		var Adresse = top.location.search.substring(1, top.location.search.length);
		
		if(document.images){
			top.Inhalt.location.replace(Adresse);
		}else{
			top.Inhalt.location.href = Adresse;
		}
	}
}

function FramesetUeberpruefen(){
	var Adresse = "http://fgl02/db/fgl/Project/VideoArchive/via_Application.nsf/db%5Cfgl%5CProject%5CVideoArchive%5Cvia_Application.nsf/0/076995E1D0AC0F9DC12574C800276FBB?OpenDocument&viw=$ByCreationDateWeb";
	
	if(tip.frames.lenght == 0){
		if(document.images){
			top.location.replace(Adresse);
		}else{
			top.location.href=Adresse;
		}
	}
}
*/