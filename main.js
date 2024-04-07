const productCard = document.querySelector("#productCard");
const cartBtn = document.querySelector("#cartBtn");
const cartDiv = document.querySelector(".cartDiv");
const shopCard = document.querySelector(".shopCard");
const cartCount = document.querySelector(".cartCount");
const btnPlus = document.querySelector("#btnPlus");
const btnMinus = document.querySelector("#btnMinus");
const numberInput = document.querySelector("#numberInput");

const cart = [];
const cartData = { total: 0, data: [] };
// let data = [];
let data = JSON.parse(localStorage.getItem("todos")) || [];

//  cart button toggle ===========
const cart_Btn = () => {
  shopCard.classList.toggle("shopCard");
};

// fetch api data ===============
const fetchData = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const result = await res.json();
    data = result;
    let myData = "";

    result.map((item, index) => {
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
  } catch (error) {
    console.log("error", error);
  }
};
fetchData();

// fetch("https://fakestoreapi.com/products")
//     .then((data) => {
//         return data.json();
//     })
//     .then((fullData) => {
//         // console.log(fullData);
//     });

const bindCart = () => {
  let shoppingCart = "";

  cartData.data.forEach((item, index) => {
    shoppingCart += `
                         <div class="cart-div">
                              <div class="prod-card">
                                   <div class="prod-img"><img src="${
                                     item.image
                                   }">
                                   <div class="d-flex my-2">
                                   <button class="btn-plusMinus" id="btnPlus" onclick="decrement(${index})">-</button>
                                   <p class="pro-count">${item.count}</p>
                                   <button class="btn-plusMinus" id="btnMinus" onclick="increment(${index})">+</button>
                                </div>
                                   </div>
                                   <div class="prod-content">
                                     <p>${item.title}</p>
                                            <h6>₹${
                                              Number(item.price) *
                                              Number(item.count)
                                            }</h6>
                                  </div>
                                 <div class="d-flex align-items-center"> <button class="btn btn-outline-danger" onclick=delCart(${index})><i class="bi bi-x-lg"></i></button> </div>
                             </div>
                            
                         </div>
                        `;
    // localStorage.setItem("todos", JSON.stringify(data));
  });
  cartCount.innerHTML = cartData.data.length;
  cartDiv.innerHTML =
    shoppingCart +
    `<div class="text-black my-3"><h6>Total Price : ${cartData.total}</h6></div>`;
};
bindCart();

// add to cart ===========
const addCart = (index) => {
  const existData = cartData.data.findIndex(
    (item) => item.id === data[index].id
  );

  console.log("existData", existData);
  if (existData >= 0) {
    cartData.total = cartData.total + cartData.data[existData].price;
    cartData.data[existData].count++;
    console.log("dddddddd");
  } else {
    cartData.data.push({ ...data[index], count: 1 });
    cartData.total = cartData.total + data[index].price;
  }
  bindCart();
};

// =========  delete cart data ===
const delCart = (ind) => {
  cartData.total =
    cartData.total.toFixed(2) -
    cartData.data[ind].price.toFixed(2) * cartData.data[ind].count;

  cartData.data.splice(ind, 1);
  bindCart();
};

//  input number value increment & decrement ============
const increment = (ind) => {
  cartData.data[ind].count++;
  cartData.total += cartData.data[ind].price;
  bindCart();
};

const decrement = (ind) => {
  if (cartData.data[ind].count !== 1) {
    cartData.data[ind].count--;
    cartData.total -= cartData.data[ind].price;
    bindCart();
  }
};
