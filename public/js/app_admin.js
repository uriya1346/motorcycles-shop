import TdMotorcycle from "./tdMotorcycle.js";

let page=1;

window.onload = () => {
  init();
}

const init = () => {
  doApi();
  declareEvents();
}

const doApi = async() => {

  let url = "https://project1346.herokuapp.com/motorcycle/?page="+page;
  let resp = await fetch(url);
  let data = await resp.json();
  createTable(data);
}

const createTable = (_arJson) => {
  document.querySelector("#id_tbody").innerHTML = ""
  _arJson.forEach((item,i) => {
    let tr = new TdMotorcycle("#id_tbody",item,i, delMotorcycle);
    tr.render()
  })
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
      doApi();
    }

  }
  catch(err){
    console.log(err)
    alert("There problem, come back later!");
  }
}




const declareEvents = () => {
  let backbtn= document.querySelector("#id_bbtn");
  let nextbtn= document.querySelector("#id_nbtn");

  backbtn.addEventListener("click",()=>{
    if(page!=1){
    page--;
    doApi();
    }
    else alert("this is first page..")
  })
  nextbtn.addEventListener("click",()=>{
    page++;
    doApi();
  })

}