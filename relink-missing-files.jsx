(function(thisObj){//based on  RelinkLinksOfBookDocs2NewPath_inSubfolder2.js
// found on http://www.hilfdirselbst.ch/foren/Nach_fehlenden_Verkn%FCpfungen_suchen_ersetzen_-_auch_in_Unterordner_P255698.html

// if (app.books.length > 1){
//   myBook = myBookSelect();
// }
// else {
//   // Wiederholung des Öffnen-Dialogs so lange keine Buchdatei geöffnet ist
//   while (app.books.length <1){
//     var myBookFile = File.openDialog("Wähle eine Buchdatei");
//     var myBook = app.open(File(myBookFile));
//   }
//   myBook = app.books[0];
// }
main();
function main (){
var topFolder = Folder.selectDialog ("Choose a Folder...");

var fileandfolderAr = scanSubFolders(topFolder);


// var myDocs=myBook.bookContents;

// for (oneDoc=0; oneDoc<myBook.bookContents.length; oneDoc++){

  // öffne Dokument "oneBook" des Buches
  myDoc = app.activeDocument;

  if(!myDoc) {
    alert("please open a document");
    return;
}

var missedones = 0;

  myLinks = myDoc.links;
  for (oneLink=myLinks.length-1;oneLink>-1;oneLink--) {
    myLink = myLinks[oneLink];
  if(myLink.status == LinkStatus.LINK_MISSING){
    myName = String(File.encode(myLink.name));
    missedones++;
for (var c = 0; c < fileandfolderAr[1].length; c++){
var myNewLink = File(fileandfolderAr[1][c]+ "/" + myName);

try{

myLink.relink(myNewLink);
      myLink.update();

    }
    catch(e){
    }
  }
  }
}
  // Dokument schließen - Sichern ohne zu fragen
  // myDoc.save();
//  myDoc.close(SaveOptions.yes);
// }
alert("Ready.\nRelinked "+missedones+" Files.");
}



function scanSubFolders(tFolder)
{
   var sFolders = [];
   var allFiles = [];
   sFolders[0] = tFolder;
   for (var j = 0; j < sFolders.length; j++) // loop through folders
   {
        var procFiles = sFolders[j].getFiles();
        for (var k=0;k<procFiles.length;k++) // loop through this folder contents
        {
         if (procFiles[k] instanceof File) allFiles.push(procFiles[k]);
         else if (procFiles[k] instanceof Folder) sFolders.push(procFiles[k]);
      }
   }
   return [allFiles,sFolders];
}})(this);