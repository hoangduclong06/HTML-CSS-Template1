let carts = JSON.parse(localStorage.getItem('cart') || "[]");
let products = [{
        id: 1,
        name: 'Nilon RS-X Bold 1',
        img: 'Image/productshoes1.png',
        rating: '4.00',
        price: 150,
        discount: 128,
        inCart: 0,
    },
    {
        id: 2,
        name: 'Nilon RS-X Bold 2',
        img: 'Image/productshoes2.png',
        rating: '4.00',
        price: 150,
        discount: 138,
        inCart: 0,
    },
    {
        id: 3,
        name: 'Nilon RS-X Bold 3',
        img: 'Image/productshoes3.png',
        rating: '4.00',
        price: 170,
        discount: 148,
        inCart: 0,
    },
    {
        id: 4,
        name: 'Nilon RS-X Bold 4',
        img: 'Image/productshoes4.png',
        rating: 4.5,
        price: 180,
        discount: 158,
        inCart: 0,
    }
]

const removeCart = document.querySelector(".detele_cart_item")
const renderProduct = document.querySelector(".product_wrap_slide")
const renderCart = document.querySelector(".cart_body")
const totalCost = document.querySelector(".cart_footer")
const numberinCart = document.querySelector(".cart_number")

function renderProducts() {
    products.forEach((product) => {
        renderProduct.innerHTML += `
        <div class="product_wrap_event product_wrap_event_${product.id}">
                            <div class="product_wrap_item">
                                <div class="product_wrap_slide_img">
                                    <img src="${product.img}" alt="Shoes" class="product_wrap_img_shoes" />
                                </div>
                                <div class="product_wrap_item_rating">
                                    <i class="fa fa-star"></i>
                                    <p class="point_rating">${product.rating}</p>
                                </div>
                                <ul class="product_options">
                                    <li class="product_options_li">
                                        <button class="product_options_btn">
                                            <i class="fa fa-eye"></i>
                                        </button>
                                    </li>
                                    <li class="product_options_li">
                                        <button class="product_options_btn btn_add_to_cart" data-id="${product.id}">
                                            <i class="fa fa-shopping-cart" data-id="${product.id}"></i>
                                        </button>
                                    </li>
                                    <li class="product_options_li">
                                        <button class="product_options_btn">
                                            <i class="fa fa-heart"></i>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            <div class="product_wrap_info">
                                <h3 class="product_wrap_info_text1">${product.name}</h3>
                                <p class="product_wrap_info_text2">
                                    $${product.discount}.00
                                    <span class="product_wrap_info_text3">$${product.price}.00</span>
                                </p>
                            </div>
                        </div>
        `
    })
}

function setOpenCart(isOpen) {
    document.querySelector(".cart").style.display = isOpen ? "block" : "none";
}



function addProductToCart(id, qty = 1) {
    const isProductInCart = carts.some((item) => item.id === id);
    if (isProductInCart) {
        // update
        carts = carts.map((cartItem) => {
            if (id === cartItem.id) {
                return {
                    ...cartItem,
                    inCart: cartItem.inCart + qty,
                }
            }
            return cartItem;
        })


    } else {
        const item = products.find((product) => product.id === id);
        carts.push({
            ...item,
            inCart: qty,
        })
    }
    carts = carts.filter(i => i.inCart !== 0)


    updateCart();
    setOpenCart(true);
}



function updateCart() {
    renderCartItems()
    localStorage.setItem('cart', JSON.stringify(carts))
}

function renderTotalCost() {
    let totalPrice = 0
    carts.forEach((item) => {
        totalPrice += item.discount * item.inCart;

    })
    totalCost.innerHTML = `
     <div class="total_pay">
                <h5 class="cart_item_info_content">Total Payable</h5>
                <h5 class="cart_item_info_content">$${totalPrice}.00</h5>
            </div> 
    `
    numberinCart.innerHTML = `
    ${carts.length}`
}

function renderCartItems() {
    renderCart.innerHTML = "";
    carts.forEach((item) => {
        renderCart.innerHTML += `
        <div class="cart_item">
                <div class="cart_item_action">
                    <div type="button" onclick="removeItemsfromCart(${item.id})" class="detele_cart_item_${item.id}">
                        <p style="font-size: 16px; font-weight: 300; color: #fff; text-align: center;">x</p>
                    </div>
                </div>
                <div class="cart_item_img">
                    <img class="cart_item_img_img" src="${item.img}" alt="img">
                </div>
                <div class="cart_item_info">

                    <h5><a class="cart_item_info_content">${item.name}</a></h5>

                    <p class="cart_item_info_p">$${item.discount}.00</p>
                </div>
                <div class="unitofcart">
                <div class="btn_qty"><i class="fa fa-minus" id="minus_${item.id}"></i></div>
                <span>${item.inCart}</span>
                <div class="btn_qty"><i class="fa fa-plus" id="plus_${item.id}"></i></div>
                </div>`
    })
    const calculate = document.querySelectorAll(".btn_qty")
    if (calculate) {
        calculate.forEach(function(btn) {
            btn.addEventListener("click", function(event) {
                const type = event.target.id.split("_")[0];
                const id = parseInt(event.target.id.split("_")[1]);
                if (type === "plus") {
                    addProductToCart(id, 1);
                } else if (type === "minus") {
                    addProductToCart(id, -1);
                }
            });
        })

    }

    renderTotalCost();
}

function removeItemsfromCart(id) {

    carts = carts.filter((item) => item.id !== id)
    updateCart()
}

function listenEvents() {
    const open = document.querySelector(".nav_btn_shop")
    open.addEventListener("click", function(event) {
        setOpenCart(true);
    })

    const close = document.querySelector(".close_cart")
    close.addEventListener("click", function(event) {
        setOpenCart(false);
    })

}

function main() {
    renderProducts();
    updateCart();
    listenEvents();
}

main();

const addCart = document.querySelectorAll(".btn_add_to_cart")
console.log(addCart);
if (addCart.length > 0) {
    console.log(111)
    addCart.forEach(function(btn) {
        btn.addEventListener("click", function(e) {
            console.log(e.target)
            const id = parseInt(e.target.getAttribute("data-id"));
            console.log(id)
            if (id) {
                addProductToCart(id);
            }
        })
    })
}