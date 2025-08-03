import { createProductCard, createAddProduct } from "./createElements.js"
import { products } from "./data.js"

//accediendo a elementos en el DOM
const navbar = document.querySelector('nav')
const allButton = document.querySelector('.all')
const clothesButton = document.querySelector('.clothes')
const eletronicsButton = document.querySelector('.eletronics')
const fornituresButton = document.querySelector('.fornitures')
const othersButton = document.querySelector('.others')
const shoppingCartContainer = document.querySelector('.cart-container')
const cartCounter = document.querySelector('.count-items')
const productsCartItem = document.querySelector('.cart-items')
const mobileMenu = document.querySelector('.mobile-menu')
const productDetails = document.querySelector('.product-detail')
const produtsContainer = document.querySelector('.cards-container')
const totalInCart = document.querySelector('.total-cart')


//creando 'directorio' para acceder al objecto de cada producto
const directoryOfProducts = new Map(products.map(product => [product.id, product]))

//renderizando los productos en el DOM
createProductCard(products, produtsContainer)

//Eventos
navbar.addEventListener('click', (event) => {
    if (event.target.matches('.shopping-cart-icon') || event.target.matches('.count-items')) {
        shoppingCartContainer.classList.toggle('hidden')
        mobileMenu.classList.add('hidden')
        productDetails.classList.add('hidden')
        if (window.matchMedia('(max-width: 768px)').matches) {
            produtsContainer.classList.remove('hidden')
        }
    }
    else if (event.target.matches('.menu')) {
        mobileMenu.classList.toggle('hidden')
        shoppingCartContainer.classList.add('hidden')
        productDetails.classList.add('hidden')
        if (window.matchMedia('(max-width: 768px)').matches) {
            produtsContainer.classList.remove('hidden')
        }
    }
    else if (event.target.closest('.all')) {
        event.preventDefault()
        produtsContainer.innerHTML = ''
        createProductCard(products, produtsContainer)
    }
    else if (event.target.closest('.clothes')) {
        filterByCategory(event,'clothes')
    }
    else if (event.target.closest('.electronics')) {
        filterByCategory(event,'electronics')
    }
    else if (event.target.closest('.furnitures')) {
        filterByCategory(event,'furnitures')
    }
    else if (event.target.closest('.others')) {
        filterByCategory(event,'others')
    }
})
produtsContainer.addEventListener('click', (event) => {
    if (event.target.matches('.product-img')) {
        setToProductDetail(event)
        productDetails.classList.remove('hidden')
        shoppingCartContainer.classList.add('hidden')
        if (window.matchMedia('(max-width: 768px)').matches) {
            produtsContainer.classList.add('hidden')
        }
        mobileMenu.classList.add('hidden')
    }
    else if (event.target.matches('.add-to-cart-button')) {
        createProductOnCart(event.target.closest('.product-card'))
    }
})
shoppingCartContainer.addEventListener('click', (event) => {
    if (event.target.matches('.close-cart')) {
        shoppingCartContainer.classList.add('hidden')
    }
    else if (event.target.matches('.remove-item')) {
        removeProductFromCart(event)
    }
    else if (event.target.closest('.increase-quantity')) {
        increaseProductQuantityInCart(event)
    }
    else if (event.target.closest('.decrease-quantity')) {
        decreaseProductQuantityInCart(event)
    }
})
productDetails.addEventListener('click', (event) => {
    if (event.target.closest('.product-detail-close')) {
        productDetails.classList.add('hidden')
        if (window.matchMedia('(max-width: 768px)').matches) {
            produtsContainer.classList.remove('hidden')
        }
    }
    else if (event.target.closest('.add-to-cart-button')) {
        createProductOnCart(event.target.closest('.product-detail'))       
    }
})
mobileMenu.addEventListener('click', (event) => {
    if (event.target.closest('.all')) {
        event.preventDefault()
        produtsContainer.innerHTML = ''
        createProductCard(products, produtsContainer)
    }
    else if (event.target.closest('.clothes')) {
        filterByCategory(event,'clothes')
    }
    else if (event.target.closest('.electronics')) {
        filterByCategory(event,'electronics')
    }
    else if (event.target.closest('.furnitures')) {
        filterByCategory(event,'furnitures')
    }
    else if (event.target.closest('.others')) {
        filterByCategory(event,'others')
    }
})

//funciones
//obtener los productos en el carrito del localstorage
function getCart() {
    const cart = localStorage.getItem('productsInCart');
    if (!cart) {
        localStorage.setItem('productsInCart', JSON.stringify([]));
        return [];
    }
    return JSON.parse(cart);
}
//guardar los productos en el carrito en localstorage
function saveCart(cart) {
    localStorage.setItem('productsInCart', JSON.stringify(cart));
}
//contador del carrito dinamico
function updateCartCounter() {
    const productsInCart = JSON.parse(localStorage.getItem('productsInCart')) || '[]';
    cartCounter.textContent = productsInCart.map(product => product.quantity).reduce((sum, quantity) => sum + quantity, 0)
}
//crear un producto dentro del carrito 
function createProductOnCart(target) {
    const productsInCart = getCart()
    const idOfSelectedProduct = Number(target.dataset.id) 
    const selectedProduct = { ...directoryOfProducts.get(idOfSelectedProduct), quantity: 1 }
    const itsInCart = productsInCart.findIndex(product => product.id === idOfSelectedProduct)
    if (itsInCart !== -1) {
        productsInCart[itsInCart].quantity += 1
    }
    else {
        productsInCart.push(selectedProduct)
    }
    saveCart(productsInCart)
    createAddProduct(productsInCart, productsCartItem)
    updateCartCounter()
    totalToPay()
}
//eliminar un producto del carrito
function removeProductFromCart(event) {
    const productsInCart = getCart()
    const productToRemove = event.target.closest('.shopping-cart')
    const indexOfProductToRemove = productsInCart.findIndex(product => product.id === productToRemove.dataset.id)

    productsInCart.splice(indexOfProductToRemove, 1)

    saveCart(productsInCart)
    productToRemove.remove()
    totalToPay()
    updateCartCounter()

}
//incrementar la cantidad de un producto en el carrito
function increaseProductQuantityInCart(event) {
    const shoppingCart = event.target.closest('.shopping-cart')
    const numberOfProductInCart = shoppingCart.querySelector('.product-quantity')
    const totalToPayForProduct = shoppingCart.querySelector('.product-cart-price')
    const productsInCart = getCart()
    const productToIncreaseQuantity = event.target.closest('.shopping-cart').dataset.id
    const indexOfProductToIncreaseQuantity = productsInCart.findIndex(product => product.id == productToIncreaseQuantity)
    const actualProduct = productsInCart[indexOfProductToIncreaseQuantity]
    actualProduct.quantity += 1
    numberOfProductInCart.textContent = `x${actualProduct.quantity}`
    totalToPayForProduct.textContent = `$${actualProduct.price * actualProduct.quantity},00`
    saveCart(productsInCart)
    updateCartCounter()
    totalToPay()
}
//disminuir la cantidad del producto en el carrito
function decreaseProductQuantityInCart(event) {
    const shoppingCart = event.target.closest('.shopping-cart')
    const numberOfProductInCart = shoppingCart.querySelector('.product-quantity')
    const totalToPayForProduct = shoppingCart.querySelector('.product-cart-price')
    const productsInCart = getCart()
    const productToDecreaseQuantity = event.target.closest('.shopping-cart').dataset.id
    const indexOfProductToDecreaseQuantity = productsInCart.findIndex(product => product.id == productToDecreaseQuantity)
    const actualProduct = productsInCart[indexOfProductToDecreaseQuantity]
    if (actualProduct.quantity !== 1) {
        actualProduct.quantity -= 1
        numberOfProductInCart.textContent = `x${actualProduct.quantity}`
    }
    totalToPayForProduct.textContent = `$${actualProduct.price * actualProduct.quantity},00`
    saveCart(productsInCart)
    updateCartCounter()
    totalToPay()
}
//sumar el total a pagar en el carrito
function totalToPay() {
    const productsInCart = getCart()
    if (productsInCart.length) {
        const total = productsInCart.reduce((sum, product) => sum + (product.price * product.quantity), 0)
        totalInCart.textContent = `$${total},00`
    } else {
        totalInCart.textContent = '0,00'
    }
}
//pasar los detalles del producto al aside
function setToProductDetail(event) {
    const productDetailImg = document.querySelector('.product-img')
    const productPrice = document.querySelector('.product-info').firstElementChild
    const productName = document.querySelector('.product-info').children[1]
    const productDescription = document.querySelector('.product-info').children[2]
    const idOfSelectedProduct = Number(event.target.closest('.product-card').dataset.id)
    const selectedProduct = directoryOfProducts.get(idOfSelectedProduct)

    productDetailImg.src = selectedProduct.img
    productPrice.textContent = `$${selectedProduct.price},00`
    productName.textContent = selectedProduct.name
    productDescription.textContent = selectedProduct.description
    productDetails.dataset.id = idOfSelectedProduct
}
//funcion para filtrar por categoria
function filterByCategory(event,category) {
    event.preventDefault()
    produtsContainer.innerHTML = ''
    const filteredProducts = products.filter(product => product.type === category)
    createProductCard(filteredProducts, produtsContainer)
}




// Renderizar productos guardados en el carrito al cargar la página
const productsInCart = getCart();
if (productsInCart.length) {
    createAddProduct(productsInCart, productsCartItem);
    updateCartCounter();
    totalToPay();
}