const submit = document.querySelector('.submit');
var querystring="video_HTML5_M.html?";


var aBalio= [];
var i=0;
var perts=true;
var jasotakoa = '{"izenak":["AJ_01", "AJ_02", "AJ_03", "AJ_04", "AJ_05", "AJ_06", "AJ_07", "AJ_08", "AJ_09", "AJ_10", "AJ_11", "AJ_12", "AJ_13", "AJ_14", "AJ_15", "AJ_16", "AJ_17", "AJ_18", "AJ_19", "AJ_20", "AJ_21", "AJ_22", "AJ_23", "AJ_24", "AJ_25", "AJ_26", "AJ_27", "AJ_28", "AJ_29", "AJ_30", "AJ_31", "AJ_32", "AJ_33", "AP_01", "AP_02", "AP_03", "AP_04", "AP_05", "AP_06", "AP_07", "AP_08", "AP_09", "AP_10", "AP_11", "AP_12", "AP_13", "AP_14", "AP_15", "AP_16", "AP_17", "AP_18", "AP_19", "AP_20", "AP_21", "AP_22", "BJ_01", "BJ_02", "BJ_03", "BJ_04", "BJ_05", "BJ_06", "BJ_07", "BJ_08", "BJ_09", "BJ_10", "BJ_11", "BJ_12", "BJ_13", "BJ_14", "BJ_15", "BJ_16", "BJ_18", "BJ_19", "BP_01", "BP_02", "BP_03", "BP_04", "BP_05", "BP_06", "BP_07", "BP_08", "BP_09", "BP_10", "BP_11", "BP_12", "BP_13", "BP_14", "BP_15", "BP_16", "CJ_01", "CJ_02", "CJ_03", "CJ_04", "CJ_05", "CJ_06", "CJ_07", "CJ_08", "CJ_09", "CJ_10", "CJ_11", "CJ_12", "CJ_13", "CJ_14", "CJ_15", "CJ_16", "CJ_17", "CJ_18", "CJ_19", "CJ_20", "CJ_21", "CJ_22", "CJ_23", "CJ_24", "CJ_25", "CJ_Bikotean_01", "CJ_Bikotean_02", "CJ_Bikotean_03", "CJ_Bikotean_04", "CJ_Bikotean_05", "CP_01", "CP_02", "CP_03", "CP_04", "CP_05", "CP_06", "CP_07", "CP_08", "CP_09", "CP_10", "CP_11", "CP_Bikotean_01", "CP_Bikotean_02", "CP_Bikotean_03"]}'
var lehenengoak = ['A','B','C'];
var a_aukera="J";
var b_aukera="J";
var c_aukera="J"
//fetch("./data.json")
//.then(response => jsondata = response.json())
//.then(jsondata => jasotakoa = console.log(jsondata));

var balioa_json=JSON.parse(jasotakoa);
var pausuak=balioa_json.izenak;
console.log(pausuak);


//document.body.onloadstart=divBistaratu('bideoAukeratu','audioAukeratu');
//document.addEventListener('DOMContentLoaded', divBistaratu('bideoAukeratu','audioAukeratu'), false);


//orrialdea kargatzerakoan aukeratutako guztiak destxekeatu
window.onload =function (){
	checkAll(false);
	aukerakHasieratu();
	notiEzkutatu();
	tab_hasiera();
	perts=true;
}

function egiaztatu (balioa){
	var testua= document.getElementById(balioa+'b').innerHTML;
	if(testua==null||testua==""){
		gehitu(balioa);
	}else{
		kendu(balioa);
	}
	
}

function gehitu(balioa){
	if(!perts){
		konprobatuBalioa=konprobatu(balioa.charAt(0));
		if(konprobatuBalioa!=null){
			inputak=document.getElementsByClassName(balioa.charAt(0));
			for(var i=0;i<inputak.length;i++){
				inputak[i].checked=false;
			}
			console.log("id arraroa: "+balioa.substr(0,5));
			document.getElementById(balioa.substr(0,5)).checked=true;
			kendu(konprobatuBalioa);
		}
	}
	gehituHurrengoa(balioa);	
}

function konprobatu(balioa){
	var bueltatu=null;
	for(var v=0;v<aBalio.length;v++){
		console.log(v+""+aBalio[v]);
		if(aBalio[v].charAt(0)==balioa){
			bueltatu=aBalio[v];
		}
	}
	console.log("Konprobatu:"+bueltatu);
	return bueltatu;
}

function gehituHurrengoa(balioa){
	i++;
	aBalio.push(balioa);
	document.getElementById(balioa+'b').innerHTML=i;
	pantailara(aBalio);
	console.log("gehitu"+aBalio);
}

function kendu(balioa){
	i--;
	aBalio=arrayRemove(aBalio,balioa);
	if((balioa.substring(0,2)=="A"+a_aukera)||(balioa.substring(0,2)=="B"+b_aukera)||(balioa.substring(0,2)=="C"+c_aukera)){		
		document.getElementById(balioa+'b').innerHTML=null;
	}
	pantailara(aBalio);
	console.log("kendu:"+aBalio);
}

function arrayRemove(arr, value) { 
    
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}

function pantailara(array){
	for(var v=0; v<array.length;v++){
		if((array[v].substring(0,2)=="A"+a_aukera)||(array[v].substring(0,2)=="B"+b_aukera)||(array[v].substring(0,2)=="C"+c_aukera)){
			document.getElementById(array[v]+'b').innerHTML=v+1;
		}
	}
	var bideo_lista=document.getElementById("bideo_lista");
	bideo_lista.innerHTML=array;
	checkeatu();
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
	if((aBalio.length==0)||(!perts && aBalio.length<3)){
		//document.getElementById("alerta").innerHTML="Gogoratu ikusi nahi duzun bidea aukeratu behar duzula!";
		document.getElementById("notifikazioa").setAttribute('style', 'display:block;');
	}else{
		document.getElementById("alerta").innerHTML=null;
		aldatu();
		console.log(querystring);
		window.location.href = querystring;
	}
	
}

function aldatu(){
	aBalio.sort();
	querystring=querystring+"balioa="+aBalio[0];
	for(var a=1;a<aBalio.length;a++){
		querystring=querystring+"&balioa="+aBalio[a];
	}
	querystring=querystring+"&perts="+perts;
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
	
	bideoLi.className='naranja-bordea';
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
	audioLi.className='naranja-bordea';
}

function audioAldatu(){
	var value =document.getElementById("audioSelect").value;
	var audioPlayer=document.getElementById("audioPlayer")
	console.log("audiselect: "+value);
	
	audioPlayer.src="video/J_"+value+".mp3";	
	audioPlayer.load();
	console.log("Audioa:"+value+"   ixildu:"+ixildu);
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

function aukerakHasieratu(){
	while(aBalio[0]!=null){
		kendu(aBalio[0]);
	}
}
function notiEzkutatu(){
	document.getElementById("notifikazioa").setAttribute('style', 'display:none;');
}






function pertsonalizatuaDiv(){
	perts=true;
	document.getElementById("pertsonalizatua").classList="is-active";
	document.getElementById("jota").classList="";
	document.getElementById("pertsonalizatuaA").classList="title is-active";
	document.getElementById("jotaA").classList="naranja-kolorea";
	document.getElementById("aukerarurakoDesk").innerHTML="Nahi dituzun pausuak aukeratu eta dantza pertsonalizatu bat eraiki!";
	checkAll(false);
	aukerakHasieratu();
	notiEzkutatu();
}

function jotaDiv(){
	perts=false;
	document.getElementById("pertsonalizatua").classList="";
	document.getElementById("jota").classList="is-active";
	document.getElementById("pertsonalizatuaA").classList="naranja-kolorea";
	document.getElementById("jotaA").classList="title is-active";
	document.getElementById("aukerarurakoDesk").innerHTML="Pausu talde bakoitzetik (A-B-C) aukera bat aukeratu eta dantzan hasi!";
	checkAll(false);
	aukerakHasieratu();
	notiEzkutatu();
}



function erakutsi(aukeratutakoak){
	var n=0;	  
	var listaIzena=[];
	  var nextDiv=[];
	  var inputDiv=[];
	  var pDiv=[];
	  var pDivB=[];
	  
	  reset_tab();
	  for(var v=0;v<aukeratutakoak.length;v++){
		  var currentDiv = document.getElementById(aukeratutakoak[v][0]+'_blokea');
		  nextDiv[v]=document.createElement("label");
		  nextDiv[v].className="panel-block px-4 py-4";
		  nextDiv[v].setAttribute("for",aukeratutakoak[v][0]+'_blokea');
		  //lista izena gehitu dokumentura 
		  inputDiv[v]=document.createElement("input");
		  inputDiv[v].type="checkbox";
		  inputDiv[v].className=aukeratutakoak[v][0];
		  inputDiv[v].setAttribute("onclick","egiaztatu(value)");
		  inputDiv[v].id=aukeratutakoak[v].substring(0,5);
		  inputDiv[v].value=aukeratutakoak[v];
		  pDiv[v]=document.createElement('p');
		  pDiv[v].innerHTML=aukeratutakoak[v];
		  pDivB[v]=document.createElement('p');
		  pDivB[v].className="pl-3";
		  pDivB[v].id=aukeratutakoak[v]+"b";
		  nextDiv[v].appendChild(inputDiv[v]);
		  nextDiv[v].appendChild(pDiv[v]); 	
		  nextDiv[v].appendChild(pDivB[v]);		  	  
		  currentDiv.appendChild(nextDiv[v]);
	  }
	  pantailara(aBalio);
}

function checkeatu(){
	console.log(perts+aBalio);
	if(perts){
		for(v=0;v<aBalio.length;v++){
			if((aBalio[v].substring(0,2)=="A"+a_aukera)||(aBalio[v].substring(0,2)=="B"+b_aukera)||(aBalio[v].substring(0,2)=="C"+c_aukera)){			
				var elementua= document.getElementById(aBalio[v]);
				elementua.checked=true;
				console.log(aBalio[v]);
			}
		}
	}
}

function reset_tab(){
	for(var v=0;v<lehenengoak.length;v++){
		var currentDiv = document.getElementById(lehenengoak[v]+'_blokea');
		currentDiv.innerHTML = '';
	}
}


function tab_hasiera(){
	var aukeratutakoak=[];
	for (var v=0; v<pausuak.length;v++){
		if((pausuak[v].substring(0,2)=="A"+a_aukera)||(pausuak[v].substring(0,2)=="B"+b_aukera)||(pausuak[v].substring(0,2)=="C"+c_aukera)){
			aukeratutakoak.push(pausuak[v]);
			
		}
	}
	erakutsi(aukeratutakoak);
}


 function tab_erakutsi(id){
	 console.log(id);
	if(id[0]=="A"){
		a_aukera=id[1];
	}else if(id[0]=="B"){
		b_aukera=id[1];
	}else if(id[0]=="C"){
		c_aukera=id[1];
	}
	var elementua_tab = document.getElementById(id);
	var bestea;
	elementua_tab.className="is-active";
	if(id[1]=="P"){
		bestea = document.getElementById(id[0]+"J_tab");
		console.log(id[0]+"J_tab");
		bestea.className="naranja-kolorea";
	}else{
		bestea= document.getElementById(id[0]+"P_tab");
		console.log(id[0]+"P_tab");
		bestea.className="naranja-kolorea";
	}
	tab_hasiera();
 }
 


