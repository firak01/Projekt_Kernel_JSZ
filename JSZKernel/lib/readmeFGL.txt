/* Diese Bibliotheken lassen sich nicht in LotusNotes einbinden.
ggf. falsche Javascript Version unter Notes, die diese Syntax noch nicht kennt.

Als Alternative sie auf den Server in ein Verzeichnis zu legen, 
kann man sie auch in einer Notes-Datenbank unter "Shared Resources\Files" ablegen.
Will man dann den Pfad beibehalten, sollte man lib/ vor den Resourcennamen setzen
also z.B. lib/prototype.js


- prototype.js
- prototypeZZZ.js (ist eine abgewandelte Form von prototype.js
                               - Alle ecodeUriComponent() Aufrufe mit excape() ersetzt.
                                 Hintergrund: ÜüAäÖö werden nicht richtig an das Servlet übergeben. UTF-8 codiert statt ISO-8859-1 codiert.
*/

