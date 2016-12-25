/*Hierzu wird die Page pagTryoutPrototypeEventsZZZ benötigt.
 * In der PAge wird das Prototype Framework eingebunden.
 * Es gibt Textbereiche, in denen die Listener zuerst aktiviert werden müssen.
 * Danach funktionieren andere Textbereiche, denen durch die Aktivierung der onClick-Event quasi hinzugefügt worden ist.
 * 
 * Frei nach dem Beispiel siehe Buch "Prototype & Script.aculo.us", Seite 102ff
*/
function doObserve(){
//braucht Prototype-Framework
var divClickable = $('tryoutEvent1');
if(divClickable==null){
	alert("KEIN Handle auf div mit der id 'tryoutEvent1': Es wird kein Observer angestellt.");
}else{
	alert("Handle auf div mit der id 'tryoutEvent1' gefunden: Der Observer wird nun angestellt.");
	//MERKE: Erst mit dem bind(Displayer) wird es wirksam
	divClickable.observe('click', Displayer.display.bind(Displayer));   //funktioniert !!!
	divClickable.observe('click', Displayer.display.bind(Displayer, 42));   //funktioniert !!!
}
}//end function

function doObserve2(){
//braucht Prototype-Framework
var divClickable = $('tryoutEvent2');
if(divClickable==null){
	alert("KEIN Handle auf div mit der id 'tryoutEvent2': Es wird kein Observer angestellt.");
}else{
	alert("Handle auf div mit der id 'tryoutEvent2' gefunden: Der Observer wird nun angestellt.");
	//MERKE: Erst mit dem bind(Displayer) wird es wirksam
	divClickable.observe('click', Displayer.display.bindAsEventListener(Displayer));	 //funktioniert !!!
	divClickable.observe('click', Displayer.display.bindAsEventListener(Displayer,42));	 //funktioniert !!!
}
}//end function

//+++++++++ Beispiele mit der Analyse der Paraemterliste
function doObserve3(){
//braucht Prototype-Framework
var divClickable = $('tryoutEvent3');
if(divClickable==null){
	alert("KEIN Handle auf div mit der id 'tryoutEvent3': Es wird kein Observer angestellt.");
}else{
	alert("Handle auf div mit der id 'tryoutEvent3' gefunden: Der Observer wird nun angestellt.");
	//MERKE: Erst mit dem bind(Displayer) wird es wirksam
	divClickable.observe('click', Displayer.displayArgument.bind(Displayer));   //funktioniert !!!
	divClickable.observe('click', Displayer.displayArgument.bind(Displayer, 42));   //funktioniert !!!
}
}//end function


function doObserve4(){
//braucht Prototype-Framework
var divClickable = $('tryoutEvent4');
if(divClickable==null){
	alert("KEIN Handle auf div mit der id 'tryoutEvent4': Es wird kein Observer angestellt.");
}else{
	alert("Handle auf div mit der id 'tryoutEvent4' gefunden: Der Observer wird nun angestellt.");
	//MERKE: Erst mit dem bind(Displayer) wird es wirksam
	divClickable.observe('click', Displayer.displayArgument.bindAsEventListener(Displayer));	 //funktioniert !!!
	divClickable.observe('click', Displayer.displayArgument.bindAsEventListener(Displayer,42));	 //funktioniert !!!
}
}//end function	

//++++++++++++++++++++++++++++++++++++++++++++++++++
//Eine Klasse definieren, die auf den click dann reagieren soll

//Diese Version ist allerdings nicht so nicht stoppbar und die counter-Variable ist nicht initialisiert in den Beispielen 1-4 !!!
var Displayer ={
	count: 0,
	clickcount: ' (' + this.icount + ')',
	intro: 'Received click event:', 
	display: function(e){
		this.icount++;
		if(this.count >= 3) document.stopObserving('click', this.display.bind(this));
		alert(this.intro + e + this.clickcount);
		},
	displayArgument: function(){
		alert($A(arguments).inspect());
		}
}





/*Frei nach dem Beispiel siehe Buch "Prototype & Script.aculo.us", Seite 102ff

Hier die Lösung mit der erzeugten Klasse !!!
*/

//#######################################################################
//++++++++++ Beispiel mit dem versuch Displayer als Objekt zu erzeugen
function doObserve5(){
//braucht Prototype-Framework
var divClickable = $('tryoutEvent5');
if(divClickable==null){
	alert("KEIN Handle auf div mit der id 'tryoutEvent5': Es wird kein Observer angestellt.");
}else{
	alert("Handle auf div mit der id 'tryoutEvent5' gefunden: Der Observer wird nun angestellt.");
	
	//MERKE: Erst mit dem bind(Displayer) in der Displayer2 - Klasse wird es wirksam
	var objDisplayer=new Displayer2(divClickable);
	divClickable.observe('click', objDisplayer.display); 
}
}//end function

//Diese Version ist stoppbar und wird als eigenes Objekt initialisert im Besipiel 5
var Displayer2 = Class.create({
	initialize : function(objDiv){
		this.divObserving = objDiv;
		this.display = this._display.bind(this);
		this.icount= 0;
	},
	clickcount: function(){
		return ' (' + this.icount + ')';
		},
	intro: function(){
		return 'Received click event:';
	},
	_display: function(e){
		this.icount++;
		alert(this.intro() + e + this.clickcount()); // wichtig sind hier die () hinter den Funktionen !!!
		
		if(this.icount >= 3){
			alert("Versuche nun den Listener zu stoppen");
			if(this.divObserving==null){
				alert("DOM Element nicht gefunden");
			}else{
				 this.divObserving.stopObserving('click', this.display);
				 alert("Listener erfolgreich gestoppt ? Dann darf jetzt beim Clicken keine Ausgabe mehr erfolgen (bis zum Start).");
			}
		}		
	},
	displayArgument: function(){
		alert($A(arguments).inspect());
	}
});

//Ende des Verbergens vor nicht javascript fähigen Browsern --></script>
//</head>
//</html>