class Motorcycle{
  constructor(_parent,_item){
    this.parent = _parent;
    this.name = _item.name;
    this.price = _item.price;
    this.cat = _item.cat;
    this.img = _item.img;
    this.info = _item.info;
  }

  render(){
    let div = document.createElement("div");
    div.style.marginTop="50px"
    div.className="col-lg-4";
    document.querySelector(this.parent).append(div);


    div.innerHTML = `
    <div class="border" style="background: url(${this.img}); background-size: cover;
    background-position: center; border-radius: 35px;   margin:"28px"; >
    <img src="${this.img}" class="float-end w-25 me-2 mt-1" style="border-radius: 35px;" alt='${this.name}'>
    <div class="p-5">
    <h3>${this.name}</h3>
    <br>
    <div class="float-start">Price: ${this.price}</div>
    <br>
    <div class="float-start">Category: ${this.cat}</div>
    <br>
    <div class="float-start">${this.info}</div>
    </div>
    </div>
    `
  }
}

export default Motorcycle;
