import { doApiMethod } from "../services/apiService.js";
import { authUser } from "../services/auth.js";

window.onload = () => {
  AOS.init();
  authUser();
  declareEvents();
}
 window.addEventListener("pageshow",function(){
     let counter=0;
    let add =  document.querySelector("#id_add");
     const colors = ['#30CFD0', '#41e0e0','#30CFD0','#14ffff'];
   this.setInterval(()=>{
       add.style.color=colors[counter];
       if(counter==5) counter=0;
       else counter++;
     },300)
     })
     window.addEventListener("scroll",function(){
      let header=document.querySelector("header");
      header.classList.toggle("sticky",window.scrollY > 0);
     })
     const declareEvents = () => {
       let id_form = document.querySelector("#id_form");
       id_form.addEventListener("submit", (e) => {
         e.preventDefault();
         doApi();
       })
     }
const doApi = async () => {
  let select= document.querySelector("#id_select");
  let url = "https://project1346.herokuapp.com/motorcycle";
  let img = document.querySelector("#id_img").value;
  let bodyObj = {};
  if(img){
    bodyObj = {
      name: document.querySelector("#id_name").value,
      price: document.querySelector("#id_price").value,
      cat: select.options[select.selectedIndex].value,
      img: document.querySelector("#id_img").value,
      info: document.querySelector("#id_info").value,
    }
  }
    else{
       bodyObj = {
        name: document.querySelector("#id_name").value,
        price: document.querySelector("#id_price").value,
        cat: select.options[select.selectedIndex].value,
        info: document.querySelector("#id_info").value,
      }
    }
  

  try{
  let data = await doApiMethod(url,"POST",bodyObj);
  if(data._id){
    alert("motorcycle add successfuly");
    window.location.href="myMotorcycle.html";
  }
  }
  catch{
    console.log(err);
    alert("There problem, come back later")
  }


}
