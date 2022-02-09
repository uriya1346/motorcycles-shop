import { doApiGet } from "../services/apiService.js";
import { authUser } from "../services/auth.js";

window.onload = () => {
  AOS.init();
  init();
}
window.addEventListener("scroll",function(){
  let header=document.querySelector("header");
  header.classList.toggle("sticky",window.scrollY > 0);
 })
 window.addEventListener("pageshow",function(){
  let counter=0;
 let info =  document.querySelector("#id_info");
  const colors = ['#30CFD0', '#41e0e0','#30CFD0','#14ffff'];
this.setInterval(()=>{
  info.style.color=colors[counter];
  if(counter==5) counter=0;
  else counter++;
},300)
})
const init = async() => {
  authUser();
    
  let url = "https://project1346.herokuapp.com/users/userInfo";
  let data = await doApiGet(url);
  let day = (data.date_created).substr(8, 2);
  let mounth = (data.date_created).substr(5, 2);
  let year = (data.date_created).substr(0, 4);
  let newDate = `${day}-${mounth}-${year}`

  document.querySelector("#id_name").innerHTML = data.name;
  document.querySelector("#id_email").innerHTML = data.email;
  document.querySelector("#id_date").innerHTML =newDate;
}
