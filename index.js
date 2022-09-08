document.addEventListener("DOMContentLoaded",(e)=>{
    const cart = document.querySelector('#cart');
    const cartModalOverlay = document.querySelector('.cart-modal-overlay')
    cart.addEventListener('click', () => {
    if(cartModalOverlay.style.transform === 'translateX(-200%)') {
        cartModalOverlay.style.transform = 'translateX(0)';
    }
    else{
        cartModalOverlay.style.transform = 'translateX(-200)';
    }
    })
    const closeBtn = document.querySelector('#close-btn');
    closeBtn.addEventListener('click', () =>{
        cartModalOverlay.style.transform = 'translateX(-200%)';
    })
    cartModalOverlay.addEventListener('click', (e) =>{
        if(e.target.classList.contains('cart-modal-overlay')){
            cartModalOverlay.style.transform = 'translateX(-200%)';
        }
    })
    const addToCart = document.getElementsByClassName('add-to-cart');
    const productRow = document.getElementsByClassName('product-row')
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(data => {
                let data1 = ""
                data.map((product)=>{
                    let {id, title, description, price, image, category} = product
                    data1 += `<div id="${id}" class="card">
                    <img src="${image}" alt= "img" class="product-image">
                    <p>${description}</p>
                    <p class="category">${category}</p>
                    <div class="price-quantity">
                        <div>
                            <h1 class="title">${title}</h1>
                        </div>
                        <h2 class="product-price">Ksh ${price}</h2>
                        <button type="button" class="add-to-cart">Add to cart</button>
                        </div>
                    </div>
                    
                </div>`
                })
                document.querySelector('.container').innerHTML = data1;
                for(let i=0; i< addToCart.length; i++){
                    button = addToCart[i];
                    button.addEventListener('click',addToCartClicked)
                }
                function addToCartClicked(event){
                     button = event.target;
                     let cartItem = button.parentElement;
                     let price = cartItem.getElementsByClassName('product-price')
                     [0].innerText;
                     //let imageSrc = cartItem.getElementsByClassName('product-image')
                     //[0].src;
                     let product1 = cartItem.getElementsByClassName('title')[0].innerText;
                    //console.log(product1);
                    addItemToCart(price, product1);
                    updateCartPrice()
                }
                function addItemToCart(price, product1) {
                    let productRow = document.createElement('div');
                    productRow.classList.add('product-rows')
                    //[0];
                    let cartTitle = document.getElementsByClassName('title')[0];
                    for (let i = 0; i < cartTitle.length; i++) {
                        //console.log(cartTitle[i])
                        if(cartTitle[i] === product1) {
                            alert('This item is already in the cart')
                            return;
                        }
                    }
                    let cartRowItems =`
                    <div class="product-row">
                    <span class="title">${product1}</span>
                    <span class ="cart-price">${price}</span>
                    <input class="product-quantity" type="number" value="1">
                    <button class="remove-btn">Remove</button>
                    </div>
                    `
                    const productRows = document.querySelector('.product-rows')
                    productRow.innerHTML = cartRowItems;
                    productRows.append(productRow);
                    productRow.getElementsByClassName('remove-btn')
                    [0].addEventListener('click', removeItem)
                    productRow.getElementsByClassName('product-quantity')
                    updateCartPrice()
                }
                const removeBtn = document.getElementsByClassName('remove-btn');
                for(let i = 0; i<removeBtn.length; i++) {
                    button = removeBtn[i]
                    button.addEventListener('click', removeItem)
                }
                function removeItem(event){
                    btnClicked = event.target
                    btnClicked.parentElement.parentElement.remove()
                    updateCartPrice()
                }
                let quantityInput = document.getElementsByClassName('product-quantity')
                [0];
                for (let i = 0; i < quantityInput; i++){
                    input = quantityInput[i]
                    input.addEventListener('change', changeQuantity)
                }
      
                function changeQuantity(event) {
                    let input = event.target
                    if (isNaN(input.value) || input.value <= 0){
                    input.value = 1
                    }
                    updateCartPrice()
                }
                function updateCartPrice() {
                    let total = 0
                    for (let i = 0; i < productRow.length; i += 2) {
                      cartRow = productRow[i]
                        let priceElement = cartRow.getElementsByClassName('cart-price')[0]
                        let quantityElement = cartRow.getElementsByClassName('product-quantity')[0]
                        let price = parseFloat(priceElement.innerText.replace('Ksh', ''))
                        let quantity = quantityElement.value
                        total = total + (price * quantity )
                        document.getElementsByClassName('total-price')[0].innerText =  'Ksh' + total
                  
                        document.getElementsByClassName('cart-quantity')[0].textContent = i += 1
                      
                    }
                    
                }

            })
            const purchaseBtn = document.querySelector('.purchase-btn');

            const closeCartModal = document.querySelector('.cart-modal');

            purchaseBtn.addEventListener('click', purchaseBtnClicked)

            function purchaseBtnClicked () {
                alert ('Thank you for your purchase');
                cartModalOverlay.style.transform= 'translateX(-100%)'
                let cartItems = document.getElementsByClassName('product-rows')[0]
                while (cartItems.hasChildNodes()) {
                cartItems.removeChild(cartItems.firstChild)
   
                }
                updateCartPrice()
            }

})