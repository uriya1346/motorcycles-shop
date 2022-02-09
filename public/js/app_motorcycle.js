import Motorcycle from "./motorcycleClass.js"


let page=1;

window.onload = () => {
  AOS.init();
  init();
}

const init = () => {
  doApi();
  declareEvents();
}

window.addEventListener("scroll",function(){
  let header=document.querySelector("header");
  header.classList.toggle("sticky",window.scrollY > 0);
 })
 window.addEventListener("pageshow",function(){
   let counter=0;
  let shop =  document.querySelector("#id_shop");
   const colors = ['#30CFD0', '#41e0e0','#30CFD0','#14ffff'];
 this.setInterval(()=>{
   shop.style.color=colors[counter];
   if(counter==5) counter=0;
   else counter++;
 },300)
})

const doApi = async() => {
  let url = "https://project1346.herokuapp.com/motorcycle/?page="+page;
  let resp = await fetch(url);
  let data = await resp.json();
  createAllMotorcycles(data);
}

const createAllMotorcycles = (_arJson) => {
  let row= document.querySelector("#id_row");
  row.innerHTML="";
  _arJson.forEach(item => {
    let motorcycle = new Motorcycle("#id_row",item);
    motorcycle.render();
  })
}

const declareEvents = () => {
  let backbtn= document.querySelector("#id_bbtn");
  let nextbtn= document.querySelector("#id_nbtn");

  backbtn.addEventListener("click",()=>{
    if(page!=1){
    page--;
    doApi();
    window.location.href="#"
    }
    else alert("this is the first page")
  })
  nextbtn.addEventListener("click",()=>{
    page++;
    doApi();
    window.location.href="#"
  })

}




