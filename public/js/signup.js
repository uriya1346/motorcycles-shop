import { doApiMethod } from "../services/apiService.js";

window.onload = () => {
  declareEvents();
  AOS.init();
}
 window.addEventListener("scroll",function(){
    let header=document.querySelector("header");
    header.classList.toggle("sticky",window.scrollY > 0);
   })
  window.addEventListener("pageshow",function(){
    let counter=0;
   let sign =  document.querySelector("#id_sign");
    const colors = ['#30CFD0', '#41e0e0','#30CFD0','#14ffff'];
  this.setInterval(()=>{
    sign.style.color=colors[counter];
    if(counter==5) counter=0;
    else counter++;
  },300)
  })

const declareEvents = () => {
    let id_form = document.querySelector("#id_form");
    id_form.addEventListener("submit", (e) => {
      e.preventDefault();
      let email = document.querySelector("#id_email").value;
      let pass = document.querySelector("#id_password").value
      if(pass.length < 3 || email.length < 3 || !email.includes("@") || !email.includes(".")){
        alert("fix mail or password, and try again");
        return
      }
      doApi();
    })
  }

  
  const doApi = async() => {
      let url = "https://project1346.herokuapp.com/users";
      let bodyObj = {
        name: document.querySelector("#id_name").value,
        email: document.querySelector("#id_email").value,
        password: document.querySelector("#id_password").value
      }
      try{
      let data = await doApiMethod(url,"POST",bodyObj);
      if(data._id){
        alert("Your sign up success, please log in")
        window.location.href= "login.html";
      }
      else if(data.msg){
          alert("User already in system, try login");
      }
      else alert("there is problem, come back later");
      }
      catch(err){
        console.log(err)
        alert("there is a problem, please come back later");
      }

  }
 