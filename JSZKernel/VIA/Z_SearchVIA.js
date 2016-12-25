/* Bibliothek enth�lt alle Klassen, die f�r die Suche in der Applikation VIA ben�tigt werden
 * 
 */
	var SearchVIA = Class.create(KernelSearchZZZ, {
		   //�berschreiben der initialize-Methode & �bergabe des Kernel Objekts !!!
		   initialize: function($super, objKernel){
		   		$super(objKernel);
		   },
		   /*Als Beispiel wie man die Ausgabe von Felermeldungen steuern kann .... 
		   	//�berschreiben der isValid-Methode
			isValid: function(){
				var bReturn = true;
				
				//1. Voraussetzung Feld MovieTitle soll muss der hinterlegten Category entsprechen
				//    Falls das nicht der Fall ist, wurde der Button <Aktualisieren> nicht gedr�ckt.
				var sFieldname = "MovieTitle";
				
				//Merke: document.forms["Formularname"].elements["Elementname"].Eigenschaft
				var _fieldOld=getPrefixCategoryValue() + sFieldname;      //Kategoriefeld
				var _valueOld=document.forms[0].elements["" + _fieldOld +""].value; 
				var _valueNew=document.forms[0].elements["" + sFieldname + ""].value;  //Der neue Feldname. Dies entspricht der id, die im Reiter der Feldeigenschaft (f�r HTML) eingestellt ist
				
				//alert("isValid() f�r ValueNew='" + _valueNew + "' und ValueOld='" + _valueOld + "'");
				if(_valueNew != _valueOld){
					this.setMessageOnError('Die Aktualisierung bitte vornehmen');
					this.setDivNameOnError(getPrefixDivError() + sFieldname);       //Das ist ein div unter dem erw�hnten Button
					bReturn = false;
				}
	
				return bReturn;
			},
			*/
			getFramesetSearch: function(){
				try{
					var objKernel = this.getKernelObject();
					//FGL 20081114 nun statt des richtigen Framesets eine Page verwenden, die dann ein Frameset enth�lt 
					//return "frsSearch" + objKernel.getApplicationKey();
					
					//                        Somit k�nnen URL Parameter weitergegeben werden
					return "pagFrsSearchWeb" + objKernel.getApplicationKey();
				}catch(e){
	  				throw handleErrorZZZ(e, "");
    			}
			}, 
			getFrameTargetName: function(){
				//Der Name des Frame, in dem das Suchframeset ge�ffnet werden soll.
				try{
					return "fm_Main";
				}catch(e){
	  				throw handleErrorZZZ(e, "");
    			}
			},
			getViewSearch: function(){
				try{
					var objKernel = this.getKernelObject();
					return "viwSearchAllWeb" + objKernel.getApplicationKey();
				}catch(e){
	  				throw handleErrorZZZ(e, "");
    			}
			},
			
			/** Lies das Feld f�r den Volltextsuchstring aus
			 * 
			 */
			 readQueryFulltextString:function(){
			 	var sReturn = "";
			 	try{
			 		var docSearch = this.getDocumentSearch();
					sReturn = docSearch.forms[0].elements["searchQueryFulltext"].value; //Der Notes-Feldname wird zum Input-Namen	     
				}catch(e){
	  				throw handleErrorZZZ(e, "");
    			}
    			return sReturn;
			 },
			getDebugString: function($super){
				return "SearchVIA: #" + "#" + $super(); //damit wir die Methode der Superklasse aufgerufen. Merke nur super$ w�rde den Code der Methode zur�ckgeben
			}	
	})
