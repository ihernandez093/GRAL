const urlParams = new URLSearchParams(window.location.search);
const balioa=urlParams.get("balioa");
const media = document.querySelector('audio');
const textuan="video/J_"+balioa+".wav";

document.getElementById("izena").innerHTML ="J_"+balioa;
console.log(textuan);
media.src=textuan;
