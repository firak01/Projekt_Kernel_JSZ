
/*____________________________________________________________________________*/

function section_hide( section_id )
	/* 
		used to hide a HTML-DIV(-section) with it's ID-attribute set to parameter "section_id" 
		if the DIV-object doesn't exist a pop up message is given to the user
	*/

/*____________________________________________________________________________*/
{
	if ( document.getElementById( section_id ) )
	{
		document.getElementById( section_id ).style.visibility = 'hidden';
		document.getElementById( section_id ).style.display = 'none';
	}
	else
	{
		alert( 	"function \"section_hide\" in JavaScript library \"DPAG_CommonValidierungJavaScript.js\": " + 
				"\n\n" + 
				"Could not find object with id \""+ section_id + "\"." 
		);	}

} // END of function section_hide( section_id )


/*____________________________________________________________________________*/

function section_show( section_id )

	/* 
		used to show a (hidden) HTML-DIV(-section) with it's ID-attribute set to parameter "section_id" 
		if the DIV-object doesn't exist a pop up message is given to the user
	*/

/*____________________________________________________________________________*/
{
	if ( document.getElementById( section_id ) )
	{
		document.getElementById( section_id ).style.visibility = 'visible';
		document.getElementById( section_id ).style.display = 'block';
	}
	else
	{
		alert( 	"function \"section_show\" in JavaScript library \"DPAG_CommonValidierungJavaScript.js\": " + 
				"\n\n" + 
				"Could not find object with id \""+ section_id + "\"." 
		);
	}

	
} // END of function section_hide( section_id )

//Ende des Verbergens vor nicht javascript fähigen Browsern --></script>
//</head>
//</html>