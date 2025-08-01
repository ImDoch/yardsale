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
        productPrice.textContent = `$${product.price}`
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

        const figure = document.createElement('figure')

        const productImg = document.createElement('img')
        productImg.classList.add('product-img')
        productImg.src = product.img
        productImg.alt = 'product image'

        const productName = document.createElement('p')
        productName.textContent = product.name
        const productPrice = document.createElement('p')
        productPrice.textContent = `$${product.price}`
        const removeIcon = document.createElement('img')
        removeIcon.classList.add('remove-item')
        removeIcon.src = './assets/icons/icon_close.png'
        removeIcon.alt = 'remove product from cart'

        figure.append(productImg)
        shoppingCart.append(figure, productName, productPrice, removeIcon)
        fragment.append(shoppingCart)
    })
    element.append(fragment)
}

export { createProductCard, createAddProduct }

