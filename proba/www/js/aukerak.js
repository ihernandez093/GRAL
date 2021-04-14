const submit = document.querySelector('.submit');
var querystring="video_HTML5_M.html?";


var aBalio= [];
var i=0;

//document.body.onloadstart=divBistaratu('bideoAukeratu','audioAukeratu');
//document.addEventListener('DOMContentLoaded', divBistaratu('bideoAukeratu','audioAukeratu'), false);




function gehituAukerak(balioa){
	i++;
	aBalio.push(balioa);
	document.getElementById(balioa).innerHTML=i;
	pantailara(aBalio);
	console.log("gehitu"+aBalio);
}

function kendu(balioa){
	i--;
	aBalio=arrayRemove(aBalio,balioa);
	document.getElementById(balioa).innerHTML=null;
	pantailara(aBalio);
	console.log("kendu:"+aBalio);
}

function egiaztatu (balioa){
	var testua= document.getElementById(balioa).innerHTML;
	if(testua==null||testua==""){
		gehituAukerak(balioa);
	}else{
		kendu(balioa);
	}
	
}

function arrayRemove(arr, value) { 
    
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}

function pantailara(array){
	for(var v=0; v<array.length;v++){
		document.getElementById(array[v]).innerHTML=v+1;
	}
}


function ugariAukeratu(balioa){
	var elementuak=document.getElementsByClassName(balioa);
	console.log("balioa: "+balioa+"  allchecked:"+document.getElementById(balioa).checked);
	if(document.getElementById(balioa).checked==true){
		for(var v=0; v<elementuak.length;v++){
			if(elementuak[v].checked==false){
			elementuak[v].click();
			}
		}
	}else{
		for(var v=0; v<elementuak.length;v++){
			if(elementuak[v].checked==true){
				elementuak[v].click();
			}
		}
	}
}



//QueryString-a bidali
function queryh(){
	if(aBalio.length==0){
		document.getElementById("notifikazioa").setAttribute('style', 'display:block;');
	}
	else{
		document.getElementById("alerta").innerHTML=null;
		//aldatu();
		console.log(querystring);
		erreproduktorePantailara();
	}
	
}


function divBistaratu(bistaratu,ezkutatu){
	console.log("bistaratu:"+bistaratu+" Ezkutatu:"+ezkutatu)
	var bistaratuDiv=document.getElementById(bistaratu);
	var ezkutatuDiv=document.getElementById(ezkutatu);
	bistaratuDiv.className="bistaratu";
	ezkutatuDiv.className="ezkutatu";
	
}

function divBideo(){
	console.log("bistaratu: bideoAukeratu  Ezkutatu:audioAukeratu");
	var bideo=document.getElementById('bideoAukeratu');
	var audio=document.getElementById('audioAukeratu');
	var bideoLi=document.getElementById('bideoLi');
	var audiioLi=document.getElementById('audioLi');
	
	bideo.className="bistaratu";
	audio.className="ezkutatu";	
	
	bideoLi.className='is-active';
	audioLi.className='';
}

function divAudio(){
	console.log("bistaratu:audioAukeratu   Ezkutatu:bideoAukeratu");
	var bideo=document.getElementById('bideoAukeratu');
	var audio=document.getElementById('audioAukeratu');
	var bideoLi=document.getElementById('bideoLi');
	var audiioLi=document.getElementById('audioLi');
	
	audio.className="bistaratu";
	bideo.className="ezkutatu";	
	
	bideoLi.className='';
	audioLi.className='is-active';
}

function audioAldatuAukera(){
	var value =document.getElementById("audioSelectAukera").value;
	var audioPlayer=document.getElementById("audioPlayerAukera");
	
	audioPlayer.src="audio/J_"+value+".mp3";	
	audioPlayer.load();
	console.log("Audioa:"+value);
}

function getBalio(){
	return aBalio;
}
function balioZero(){
	aBalio=[];
}


function notiEzkutatu(){
	document.getElementById("notifikazioa").setAttribute('style', 'display:none;');
}


function aukerakHasieratu(){
	while(aBalio[0]!=null){
		kendu(aBalio[0]);
	}
}



function audioaGelditu(){
	var audioPlayer=document.getElementById("audioPlayerAukera");
	audioPlayer.pause();
	audioPlayer.currentTime=0;
}

function checkAll(checktoggle){
  var checkboxes = new Array(); 
  checkboxes = document.getElementsByTagName('input');
 
  for (var i=0; i<checkboxes.length; i++)  {
    if (checkboxes[i].type == 'checkbox')   {
      checkboxes[i].checked = checktoggle;
    }
  }
}



