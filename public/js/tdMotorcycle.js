class TdMotorcycle {
  constructor(_parent, _item, _index, delMotorcycle) {
    this.parent = _parent;
    this.name = _item.name;
    this.price = _item.price;
    this.info = _item.info;
    this.cat = _item.cat;
    this.img = _item.img;
    this.index = _index;
    this._id = _item._id;
    this.delMotorcycle = delMotorcycle;
  }

  render() {
    let tr = document.createElement("tr");
    tr.className="mb-3";
    document.querySelector(this.parent).append(tr);

    tr.innerHTML = `
    <td>${this.index + 1}</td>
    <td>${this.name}</td>
    <td>${this.price}₪</td>
    <td>${this.info}</td>
    <td>${this.cat}</td>
    <td colspan="23"><img src="${this.img}" width="220" height="115"></td>
    <td class="my-2">
      <button class="btn btn-danger del_btn" style="margin-top: 16px ;">Del</button>
    </td>
    `
    let del_btn = tr.querySelector(".del_btn");
    del_btn.addEventListener("click", () => {
      if (confirm(`are you sure you want delete ${this.name} ?`)) {
        this.delMotorcycle(this._id);
      }
    })
  }

}

export default TdMotorcycle;