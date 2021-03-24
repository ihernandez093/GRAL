const submit = document.querySelector('.submit');
var querystring="video_HTML5_M.html?";


var aBalio= [];
var i=0;

//document.body.onloadstart=divBistaratu('bideoAukeratu','audioAukeratu');
//document.addEventListener('DOMContentLoaded', divBistaratu('bideoAukeratu','audioAukeratu'), false);


//orrialdea kargatzerakoan aukeratutako guztiak destxekeatu
$().ready(function() {
    //on page load uncheck any ticked checkboxes
    $("input:checkbox:checked").attr("checked", "");
});

function egiaztatu (balioa){
	var testua= document.getElementById(balioa).innerHTML;
	if(testua==null||testua==""){
		gehitu(balioa);
	}else{
		kendu(balioa);
	}
	
}

function gehitu(balioa){
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
	console.log("elementua:"+elementuak.length);
	console.log("balioa:"+balioa);
	for(var v=0; v<elementuak.length;v++){
		elementuak[v].click();
	}
}



//QueryString-a bidali
function queryh(){
	if(aBalio.length==0){
		document.getElementById("alerta").innerHTML="Gogoratu ikusi nahi duzun bidea aukeratu behar duzula!";
	}
	else{
		document.getElementById("alerta").innerHTML=null;
		aldatu();
		console.log(querystring);
		window.location.href = querystring;
	}
	
}

function aldatu(){
	querystring=querystring+"balioa="+aBalio[0];
	for(var a=1;a<aBalio.length;a++){
		querystring=querystring+"&balioa="+aBalio[a];
	}
}

function divBistaratu(bistaratu,ezkutatu){
	console.log("bistaratu:"+bistaratu+" Ezkutatu:"+ezkutatu)
	var bistaratuDiv=document.getElementById(bistaratu);
	var ezkutatuDiv=document.getElementById(ezkutatu);
	bistaratuDiv.className="bistaratu";
	ezkutatuDiv.className="ezkutatu";
	
}






