//<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
//<html>
//<head>
//<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
//<script language="JavaScript" type="text/javascript">
//<!-- Vor nicht Javascript fähigen Browsern verbergen 


/*Fli 20080616 Viele dieser Funktionen kann man auch einfach mit dem Prototype-Framework lösen.
 * 
 * 
 */
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


/*____________________________________________________________________________*/

function radio_get_selected_index( fieldname )
/*____________________________________________________________________________*/
{
	var index = -1;
	var counter = 0;
	var elements = document.forms[0].elements;
		
	for ( i = 0; i < elements.length; i++ )
	{
			if ( elements[i].name == fieldname )
			{
				counter++;
				if ( elements[i].checked )
				{
						index = counter;
						break;
				}	
			}
	}
	
	return index;
	
} // END of function radio_get_selected_index( fieldname )

/*____________________________________________________________________________*/


function is_field_empty( field )
/*
	purpose:
		checks if the field value of 'field' is an empty string

	parameters:
		field - an object reference of type field
	
	return value:
		returns boolean true if the field value is an empty string otherwise boolean false
______________________________________________________________________________*/
{
	return (field.value == '');
	
} // END of function is_empty( field )

/*____________________________________________________________________________*/

function is_field_longer_than( field, maxchars )
/*
	purpose:
		checks if the field value of 'field' is longer than defined in parameter 'maxchars'

	parameters:
		field 			- an object reference of type field
		maxchars 	- a number, indicating the maximum of characters the user is allowed to enter into the field 'field'
	
	return value:
		returns boolean true if the field value is to long otherwise boolean false
______________________________________________________________________________*/
{
	return (field.value.length > maxchars);
	
} // END of function is_empty( field )


/*____________________________________________________________________________*/

function focus_set( field )
/*
	purpose:
		tries to set the input focus to field 'field'

	parameters:
		field 			- an object reference of type field
	
	return value:
		returns nothing
______________________________________________________________________________*/
{
	try 
	{ 
		field.focus(); 
	} 
	catch( e ) 
	{ 
		;
	} 
	finally 
	{ 
		;
	}
	
} // END of function focus_set( field )


/*____________________________________________________________________________*/
 

function field_get( field_id )
/*
	purpose:
		this function tries to get a field object with HTML ID 'field_id'.
		if this fails the function tries to find a field object with HTML NAME 'field_id'.
		in case the field is not found a message box will pop up with an error text.

	parameters:
		field_id 	- an HTML ID of an HTML field
	
	return value:
		returns the corresponding field object  if existing otherwise 'undefined'
______________________________________________________________________________*/
{
	var field;
	
/*	
	return (document.getElementById( field_id ))
*/

	field = document.getElementById( field_id );

/*
	N. Hess, 04.12.2006  code has moved downwards
	field.name = field_id;
	field.id = field_id;
*/	
	if ( !field ) 
	{
		field = document.getElementsByName( field_id )[0];
	}

/*	
	if ( !field ) 
	{ 
		alert( 'Fehler: Ein Feld mit ID / NAME "' + field_id + '" existiert nicht ...' );
	}
*/

	//N. Hess, 04.12.2006
	if(field)
	{
		field.name = field_id;
		field.id = field_id;
	}
	return field;
}


//Ende des Verbergens vor nicht javascript fähigen Browsern --></script>
//</head>
//</html>

