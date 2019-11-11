function inserimento(lungh){
  //LEGGO L'INPUT COORDINATA
  var stringaId = "input_g" + giocatore + "_" + lungh; 
  var coord = document.getElementById(stringaId).value.toUpperCase();
  var scacchiera;
  giocatore==1? scacchiera=scacchiera1 : scacchiera=scacchiera2;

  //CONTROLLO CORDINATA VALIDA
  if(checkCoord(coord, lungh, scacchiera) == 0){
    alert("Coordinata non valida");
    document.getElementById(stringaId).value="";
    return;
  }

  //POSIZIONAMENTO
  var vettCoord = coord.split("-");
  posiziona(vettCoord, lungh);

  //SE HO FINITO QUEL TIPO DI PEDINA NASCONDO L'OPZIONE DI AGGIUNGERNE ALTRE
  document.getElementById(stringaId).value="";
  if((document.getElementById("num_g" + giocatore + "_" + lungh).innerHTML -= 1) == "0"){
    document.getElementById("scelta" + lungh + "_g" + giocatore).style.display = "none";

    if(document.getElementById("scelta" + "2" + "_g" + giocatore).style.display == "none" &&
       document.getElementById("scelta" + "3" + "_g" + giocatore).style.display == "none" &&
       document.getElementById("scelta" + "4" + "_g" + giocatore).style.display == "none"){

      document.getElementById("passaTurno").style.display = "block";
    }
  }
}






function checkCoord(coord, lungh, scacchiera){
//CONTROLLO SE L'INPUT E' VALIDO //ATTENTO CHE IL 10 NON E' SELEZIONABILE COSI
  if(coord.length != 5){
    alert("Non rispetta il formato XN-XN (Lunghezza)");
    return 0;
  }
  if(coord.charAt(0) < "A" || coord.charAt(0) > "J"){
    alert("Non rispetta il formato XN-XN (0)");
    return 0;
  }
  if(coord.charAt(1) < "0" || coord.charAt(1) > "9"){
    alert("Non rispetta il formato XN-XN (1)");
    return 0;
  }
  if(coord.charAt(2) != "-"){
    alert("Non rispetta il formato XN-XN (2)");
    return 0;
  }
  if(coord.charAt(3) < "A" || coord.charAt(3) > "J"){
    alert("Non rispetta il formato XN-XN (3)");
    return 0;
  }
  if(coord.charAt(4) < "0" || coord.charAt(4) > "9"){
    alert("Non rispetta il formato XN-XN (4)");
    return 0;
  }

//CONTROLLO SE E' ORIZZONTALE O VERTICALE
  if(coord.charAt(0)!=coord.charAt(3) && coord.charAt(1)!=coord.charAt(4)){
    alert("Non è nè verticale nè orizzontale");
    return 0;
  }

//CONTROLLO LUNGHEZZA DIVERSA DALLA PEDINA
  var orientation = getOrientation(coord.split("-"), lungh);
  if(orientation == "horizontal"){
    if(coord.charCodeAt(3)-coord.charCodeAt(0)+1 != lungh){
      alert("Orizzontale ma la dimensione non combacia con la pedina");
      return 0;
    }
  }
  else if(orientation == "vertical"){
    if(coord.charAt(4)-coord.charAt(1)+1 != lungh){
      alert("Vericale ma la dimensione non combacia con la pedina");
      return 0;
    }
  }

//CONTROLLO SE NON SI SOVRAPPONE AD ALTRO
  var a="A";
  if(orientation == "horizontal"){
    for(var i=0; i<lungh; i++){
      if(scacchiera[coord.charAt(1)][coord.charCodeAt(0)-a.charCodeAt(0)+i] == 1){
        alert("Si sovrappone ad un' altra pedina");
        return 0;
      }
    }
  }
  else if(orientation == "vertical"){
    for(var i=0; i<lungh; i++){
      if(scacchiera[parseInt(coord.charAt(1))+i][coord.charCodeAt(0)-a.charCodeAt(0)] == 1){
        alert("Si sovrappone ad un' altra pedina");
        return 0;
      }
    }
  }
}






function posiziona(vettCoord, lungh){
//TODO
  var coordCasella; //CASELLA CORRENTE(ES. B2)
  var elementCasella;
  var lettera = vettCoord[0].charAt(0);
  var orient = getOrientation(vettCoord);
  var a = "A";
  var scacchiera;
  giocatore==1? scacchiera=scacchiera1 : scacchiera=scacchiera2;

  if(orient == "horizontal"){
    for(var i=0; i<lungh; i++){
      coordCasella = lettera + (parseInt(vettCoord[0].charAt(1)));
      getElementFromCoord(coordCasella).style.backgroundImage = 'url("img/horizontal/' + lungh + "_"+(i+1)+ '.jpg")';
      scacchiera[coordCasella.charAt(1)][coordCasella.charCodeAt(0)-a.charCodeAt(0)] = 1;
      lettera = nextLetter(lettera);
    }
  }
  if(orient == "vertical"){
    for(var i=0; i<lungh; i++){
      coordCasella = lettera + (parseInt(vettCoord[0].charAt(1)) + i);
      getElementFromCoord(coordCasella).style.backgroundImage = 'url("img/vertical/' + lungh + "_"+(i+1)+ '.jpg")';
      scacchiera[coordCasella.charAt(1)][coordCasella.charCodeAt(0)-a.charCodeAt(0)] = 1;
    }
  }
  giocatore==1? scacchiera1=scacchiera : scacchiera2=scacchiera;
}






function getOrientation(vettCoord){
 if(vettCoord[0].charAt(0) == vettCoord[1].charAt(0))
   return "vertical";
 if(vettCoord[0].charAt(1) == vettCoord[1].charAt(1))
   return "horizontal";
 return null;
}






function getElementFromCoord(casella){
  var id;
  giocatore==1? id="tabella1" : id="tabella2";
  var tabella = document.getElementById(id);
  var colonna;
  var a="A";
  colonna = casella.charCodeAt(0)-a.charCodeAt(0)+1;

  return tabella.children[parseInt( casella.charAt(1) ) + 1].children[colonna];
}






function nextLetter(carattere){
  switch(carattere){
    case "A":
    return "B";
    break;

    case "B":
    return "C";
    break;

    case "C":
    return "D";
    break;

    case "D":
    return "E";
    break;

    case "E":
    return "F";
    break;

    case "F":
    return "G";
    break;

    case "G":
    return "H";
    break;

    case "H":
    return "I";
    break;

    case "I":
    return "J";
    break;

  }
 return null;
}






function passo(){
  contatore++;
  if(contatore >= 2){
    document.getElementById("risultato").innerHTML = "";
    document.getElementById("attack").style.display = "block";
  }
  if(giocatore == 1){
    document.getElementById("giocatore1").style.display = "none";
    document.getElementById("giocatore2").style.display = "block";
    giocatore = 2;
  }
  else{
    document.getElementById("giocatore2").style.display = "none";
    document.getElementById("giocatore1").style.display = "block";
    giocatore = 1;
  }
  document.getElementById("passaTurno").style.display = "none";
}






function creaScacchiera(id){
  var scacchiera = new Array(10);
  var stringa= "";

  for (var i = 0; i < scacchiera.length; i++) {
    scacchiera[i] = new Array(10);   
    for(var j=0; j<10; j++)
      scacchiera[i][j] = 0;
  }

  for(var i=0; i<10; i++){ //SI POTREBBERO UNIRE I FOR RISPARMIANDO CICLI, MA PER LEGGIBILITA' LASCIO COSI'
    stringa = "";
    stringa += "<th>" + i + "</th>";
    for(var j=0; j<10; j++){
      stringa += '<td ondrop="drop(event)" ondragover="allowDrop(event)" ></td>';
    }
    document.getElementById(id).children[i+1].innerHTML = stringa;
  }
  return scacchiera;
}





function allowDrop(event) {
  event.preventDefault();
}





function drop(event) {
  event.preventDefault();

  //SCACCHIERA E' LA TABELLA DI 1 E 0, TABLE E' L'ELEMENTO TABELLA
  var scacchieraAvvers;
  var scacchieraMia;
  var hisTable;
  var myTable2 = document.getElementById("tabella" + giocatore + "B"); //E' LA TABELLA DI DESTRA

  if(giocatore==1){
    scacchieraMia = scacchiera1;
    scacchieraAvvers = scacchiera2;
    hisTable = document.getElementById("tabella2");
  }
  else{
    scacchieraMia = scacchiera2;
    scacchieraAvvers = scacchiera1;
    hisTable = document.getElementById("tabella1");
  }

  var coord = fromElementToCoord(event.target, myTable2);
  if(coord == null){
    alert("Usa la tabella a destra");
    return;
  }
  if(scacchieraAvvers[coord[0]][coord[1]] == 1){
    myTable2.children[coord[0]+1].children[coord[1]+1].style.backgroundImage = 'url("img/hit.png")';
    document.getElementById("risultato").innerHTML = "COLPITO!";
    if(giocatore == 1){
      hits1++
      if(hits1 ==  hitsToWin){
        alert("VITTORIA GIOCATORE 1");
          document.getElementById("attack").style.display = "none";
        return;
      }
    }
    else{
      hits2++;
      if(hits2 ==  hitsToWin){
        alert("VITTORIA GIOCATORE 2");
        document.getElementById("attack").style.display = "none";
        return;
      }
    }
  }
  else{
    myTable2.children[coord[0]+1].children[coord[1]+1].style.backgroundImage = 'url("img/miss.png")';
    document.getElementById("risultato").innerHTML = "MANCATO!";
  }
  document.getElementById("attack").style.display = "none";
  document.getElementById("passaTurno").style.display = "block";
}






function fromElementToCoord(target, myTable){
  var i, j;

  for(i=1; i<11; i++){
    for(j=1; j<11; j++){
      if(myTable.children[i].children[j] == target){
        return [i-1, j-1];
      }
    }
  }
  return null;
}




function submitOnEnterButton(fieldID,buttonID){
  var input = document.getElementById(fieldID);
  input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
     event.preventDefault();
     document.getElementById(buttonID).click();
    }
  });
}




function numBarche(id){
  if(document.getElementById(id).style.display == "none")
    return 0;
  return document.getElementById(id).innerHTML;
}



var contatore = 0;
var giocatore = 1;
var scacchiera1 = creaScacchiera("tabella1");
var scacchiera2 = creaScacchiera("tabella2");
creaScacchiera("tabella1B");
creaScacchiera("tabella2B");
var hitsToWin = 2*numBarche("num_g1_2") + 3*numBarche("num_g1_3") + 4*numBarche("num_g1_4");
var hits1 = 0;
var hits2 = 0;

submitOnEnterButton("input_g1_4","input_g1_4B");
submitOnEnterButton("input_g1_3","input_g1_3B");
submitOnEnterButton("input_g1_2","input_g1_2B");

submitOnEnterButton("input_g2_4","input_g2_4B");
submitOnEnterButton("input_g2_3","input_g2_3B");
submitOnEnterButton("input_g2_2","input_g2_2B");