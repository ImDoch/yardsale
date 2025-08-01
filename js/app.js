import { createProductCard, createAddProduct } from "./createElements.js"
import { products } from "./data.js"

//Accediendo a elementos en el DOM
const navbar = document.querySelector('nav')
const shoppingCartContainer = document.querySelector('.cart-container')
const produtsContainer = document.querySelector('.cards-container')
const mobileMenu = document.querySelector('.mobile-menu')
const productDetails = document.querySelector('.product-detail')
const productsCartItem= document.querySelector('.cart-items')

//creando 'directorio' para acceder al objecto de cada producto
const directory = new Map(products.map(product => [product.id, product]))

//renderizando los productos en el DOM
createProductCard(products, produtsContainer)

//agregando array de productos en el carrito al localStorage
if (!localStorage.getItem('productsInCart')) {
  localStorage.setItem('productsInCart', JSON.stringify([]));
}

//Eventos
navbar.addEventListener('click', (event) => {
    if(event.target.closest('.shopping-cart-icon')){
        shoppingCartContainer.classList.toggle('hidden')
        mobileMenu.classList.add('hidden')
    }
    else if(event.target.closest('.menu')) {
        mobileMenu.classList.toggle('hidden')
        shoppingCartContainer.classList.add('hidden')
    }
})
produtsContainer.addEventListener('click', (event) => {
    if(event.target.closest('.product-img')) {
        productDetails.classList.remove('hidden')
    }
    else if (event.target.closest('.add-to-cart-button')) {
        const productsInCart = JSON.parse(localStorage.getItem('productsInCart') || [])
        const idOfSelectedProduct = Number(event.target.closest('.product-card').dataset.id)
        const selectedProduct = directory.get(idOfSelectedProduct)
        productsInCart.push(selectedProduct)
        localStorage.setItem('productsInCart', JSON.stringify(productsInCart))
        createAddProduct(productsInCart, productsCartItem)
    }
})

shoppingCartContainer.addEventListener('click', (event) => {
    if(event.target.closest('.close-cart')) {
        shoppingCartContainer.classList.add('hidden')
    }
})
productDetails.addEventListener('click', (event) => {
    if(event.target.closest('.product-detail-close')) {
        productDetails.classList.add('hidden')
    }
})
