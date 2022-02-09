import {doApiGet} from "../services/apiService.js" ;
import {authUser} from "../services/auth.js";
window.onload = () =>{
  AOS.init();
    authUser();
    createMotorcycle();
}
window.addEventListener("scroll",function(){
  let header=document.querySelector("header");
  header.classList.toggle("sticky",window.scrollY > 0);
 })
 window.addEventListener("pageshow",function(){
  let counter=0;
 let prod =  document.querySelector("#id_prod");
  const colors = ['#30CFD0', '#41e0e0','#30CFD0','#14ffff'];
this.setInterval(()=>{
  prod.style.color=colors[counter];
  if(counter==5) counter=0;
  else counter++;
},300)
})
const createMotorcycle = async() =>{
    let url = "https://project1346.herokuapp.com/motorcycle/myData";
    let data = await doApiGet(url);
    if(data.length!=0){
      data.forEach(item => {
          addMotorcycle(item.name,item.price,item.cat,item.img,item.info,item._id)
      })
    }
      else {
        let div = document.createElement("div");
        div.style.background="linear-gradient(rgba(73, 73, 73, 0.18),rgba(0, 0, 0, 0.18))"
        div.style.height="300px"
        div.style.maxWidth="600px"
        div.style.display="flex"
        div.style.justifyContent="center"
        div.style.alignItems="center"
        div.style.textAlign="center"
        div.style.margin="0 auto"
        document.querySelector("#id_row").append(div);
        div.innerHTML = `
        <h3>Your basket Is currently empty</h3>
        `
      }
 }
    
const delMotorcycle = async(_id) => {
  try {
    let urlDel = "https://project1346.herokuapp.com/motorcycle/" + _id;
    let resp = await fetch(urlDel, {
      method: "DELETE",
      body: JSON.stringify({}),
      headers: {
        "x-api-key": localStorage["tok"],
        'content-type': "application/json"
      }
    })
    let data = await resp.json();
    if(data.deletedCount == 1){
      alert("deleted success");
      window.location.assign("myMotorcycle.html");
    }

  }
  catch(err){
    console.log(err)
    alert("There problem, come back later!");
  }
}
const addMotorcycle = (_name,_price,_cat,_img,_info,_id) => {
  let div = document.createElement("div");
  div.style.marginTop="50px"
  div.className="col-lg-12";
  document.querySelector("#id_row").append(div);

  div.innerHTML = `
  <div class="border" style="background: url(${_img}); background-size: cover;
  background-position: center; border-radius: 26px;   margin:"28px"; >
  <img src="${_img}" class="float-end w-25 me-2" style="border-radius: 35px;" alt='${_name}'>
  <div class="p-5" style="  position: relative;">
  <h3 class="mt-3">${_name}</h3>
  <br>
  <div class="float-start">Price: ${_price}</div>
  <br>
  <div class="float-start">Category: ${_cat}</div>
  <br>
  <div class="float-start">${_info}</div>
  <br>
  <button class="hero-btn del_btn">X</button>
  </div>
  </div>
  `
    let del_btn = div.querySelector(".del_btn");
    del_btn.addEventListener("click", () => {
      if (confirm(`are you sure you want delete ${_name} ?`)) {
        delMotorcycle(_id);
      }
    })
}