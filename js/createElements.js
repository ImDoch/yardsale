function createProductCard(arrayProducts, element) {
    const fragment = document.createDocumentFragment();
    arrayProducts.forEach(product => {
        const productCard = document.createElement('article')
        productCard.classList.add('product-card')
        productCard.dataset.id = product.id

        const productImg = document.createElement('img')
        productImg.classList.add('product-img')
        productImg.src = product.img
        productImg.alt = 'product image'
        productImg.loading = 'lazy'

        const productInfo = document.createElement('div')
        productInfo.classList.add('product-info')

        const divInfo = document.createElement('div')
        const productPrice = document.createElement('p')
        productPrice.textContent = `$${product.price},00`
        const productName = document.createElement('p')
        productName.textContent = product.name

        const figureAddCart = document.createElement('figure')
        const cartIcon = document.createElement('img')
        cartIcon.src = './assets/icons/bt_add_to_cart.svg'
        cartIcon.classList.add('add-to-cart-button')
        cartIcon.alt = 'add product to cart'

        figureAddCart.append(cartIcon)
        divInfo.append(productPrice, productName)
        productInfo.append(divInfo, figureAddCart)
        productCard.append(productImg, productInfo)
        fragment.appendChild(productCard)
    })
    element.appendChild(fragment)
}

function createAddProduct(arrayProducts, element) {
    element.innerHTML = ''
    const fragment = document.createDocumentFragment();
    arrayProducts.forEach(product => {
        const shoppingCart = document.createElement('div')
        shoppingCart.classList.add('shopping-cart')
        shoppingCart.dataset.id = product.id

        const figure = document.createElement('figure')

        const productImg = document.createElement('img')
        productImg.classList.add('product-img')
        productImg.src = product.img
        productImg.alt = 'product image'
        productImg.loading = 'lazy'

        const productName = document.createElement('p')
        productName.textContent = product.name

        const productQuantityDiv = document.createElement('div')
        const increaseProductQuantity = document.createElement('img')
        increaseProductQuantity.classList.add('increase-quantity')
        increaseProductQuantity.src = './assets/icons/increase-icon.svg'
        increaseProductQuantity.alt = 'increase quantity of same product'
        increaseProductQuantity.loading = 'lazy'
        const productQuantity = document.createElement('p')
        productQuantity.classList.add('product-quantity')
        productQuantity.textContent = `x${product.quantity}`
        const decreaseProductQuantity = document.createElement('img')
        decreaseProductQuantity.classList.add('decrease-quantity')
        decreaseProductQuantity.src = './assets/icons/decrease-icon.svg'
        decreaseProductQuantity.alt = 'decrease quantity of same product'
        decreaseProductQuantity.loading = 'lazy'

        const productPrice = document.createElement('p')
        productPrice.classList.add('product-cart-price')
        productPrice.textContent = `$${product.price * product.quantity},00`
        const removeIcon = document.createElement('img')
        removeIcon.classList.add('remove-item')
        removeIcon.src = './assets/icons/icon_close.png'
        removeIcon.alt = 'remove product from cart'

        figure.append(productImg)
        productQuantityDiv.append(increaseProductQuantity, productQuantity, decreaseProductQuantity)
        shoppingCart.append(figure, productName, productQuantityDiv, productPrice, removeIcon)
        fragment.append(shoppingCart)
    })
    element.append(fragment)
}

export { createProductCard, createAddProduct }

