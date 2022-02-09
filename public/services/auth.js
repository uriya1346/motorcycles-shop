import { doApiGet } from "./apiService.js";

export const authUser = async() => {
  let url = "https://project1346.herokuapp.com/users/checkToken";
  let data = await doApiGet(url) 
  if(data.status != "ok"){
    alert("You need login again to be here");
    window.location.href = "login.html";
  }
}