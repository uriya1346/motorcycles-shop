import { doApiMethod } from "../services/apiService.js";

window.onload = () => {
  AOS.init();
  declareEvents();
}

const declareEvents = () => {
  let id_form = document.querySelector("#id_form");
  id_form.addEventListener("submit", (e) => {
    e.preventDefault();
    let email = document.querySelector("#id_email").value;
    let pass = document.querySelector("#id_password").value
    if(pass.length < 3 || email.length < 3 || !email.includes("@") || !email.includes(".")){
      alert("check password or email");
      return
    }
    doApiLogin()
    
  })
}

window.addEventListener("scroll",function(){
  let header=document.querySelector("header");
  header.classList.toggle("sticky",window.scrollY > 0);
})
window.addEventListener("pageshow",function(){
  let counter=0;
 let log =  document.querySelector("#id_log");
  const colors = ['#30CFD0', '#41e0e0','#30CFD0','#14ffff'];
this.setInterval(()=>{
  log.style.color=colors[counter];
  if(counter==5) counter=0;
  else counter++;
},300)
})

const doApiLogin = async() => {
  let body = {
    email:document.querySelector("#id_email").value,
    password: document.querySelector("#id_password").value
  }
  let url = "https://project1346.herokuapp.com/users/login";
  let data = await doApiMethod(url,"POST",body);
  console.log(data);
  if(data.token){
    localStorage.setItem("tok",data.token);
    window.location.href = "myMotorcycle.html";
  }
  else{
    alert("Email or password worng, or come back later!")
  }
} 