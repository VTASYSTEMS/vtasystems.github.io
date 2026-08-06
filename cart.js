const cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cart-items");
const subtotal = document.getElementById("subtotal");
const total = document.getElementById("total");

function formatPrice(price){
    return price.toLocaleString("vi-VN") + "đ";
}

function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart(){

    cartItems.innerHTML = "";

    if(cart.length===0){

        cartItems.innerHTML=`
        <div class="empty">
            <i class="fa-solid fa-cart-shopping" style="font-size:60px;color:#ff6600;"></i>
            <h2>Giỏ hàng đang trống</h2>
            <p>Hãy thêm sản phẩm để bắt đầu mua sắm.</p>
        </div>
        `;

        subtotal.innerHTML="0đ";
        total.innerHTML="0đ";
        return;
    }

    let sum=0;

    cart.forEach((item,index)=>{

        sum += item.price*item.qty;

        cartItems.innerHTML +=`

        <div class="cart-item">

            <div class="left">

                <img src="${item.image}">

                <div class="info">

                    <h2>${item.name}</h2>

                    <div class="price">

                        ${formatPrice(item.price)}

                    </div>

                    <div class="qty">

                        <button onclick="decrease(${index})">-</button>

                        <span>${item.qty}</span>

                        <button onclick="increase(${index})">+</button>

                    </div>

                </div>

            </div>

            <button class="remove" onclick="removeItem(${index})">

                Xóa

            </button>

        </div>

        `;

    });

    subtotal.innerHTML=formatPrice(sum);
    total.innerHTML=formatPrice(sum);

}

function increase(index){

    cart[index].qty++;

    saveCart();

    renderCart();

}

function decrease(index){

    if(cart[index].qty>1){

        cart[index].qty--;

    }else{

        cart.splice(index,1);

    }

    saveCart();

    renderCart();

}

function removeItem(index){

    cart.splice(index,1);

    saveCart();

    renderCart();

}

renderCart();
