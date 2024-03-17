const productCard = document.querySelector("#productCard");
const cartBtn = document.querySelector("#cartBtn");

const cart = [];

fetch("https://fakestoreapi.com/products")
  .then((data) => {
    return data.json();
  })
  .then((fullData) => {
    // console.log(fullData);
    let myData = "";
    fullData.map((item, index) => {
      // console.log(item.title);

      myData += `<div class="col-md-3">
                             <div class="productCard" >
                                <img src="${item.image}" class="" alt="...">
                                <div class="productCard-body">
                                    <h6>${item.title}</h6>
                                    <h4>₹${item.price}</h4>
                                    <div class="d-flex justify-content-between my-3">
                                          <button class="btn btn-success rounded-pill">${item.rating.rate} <i class="bi bi-star-fill"></i></button>
                                          <button class="btn btn-warning">${item.category}</button>
                                    </div>
                                    <div class="d-flex justify-content-between pt-3">
                                          <button class="btn btn-outline-primary" onclick="addCart(${index})">Add To Cart <i class="bi bi-cart3"></i></button>
                                    </div>
                                </div>
                             </div>
                      </div>`;
    });

    productCard.innerHTML = myData;
  });

// add to cart ===========
const addCart = (index) => {
  console.log(index);
  // cart.push()
};
