// Stock
let stockProductos = [
    { id: 1, nombre: "Peluson Of Milk", cantidad: 1, desc: "1991", precio: 1000, img: 'https://i.scdn.co/image/ab67616d00001e02217ce66ac32c161c7516228c' },
    { id: 2, nombre: "A 18' Del Sol", cantidad: 1, desc: "1977", precio: 1500, img: 'https://i.scdn.co/image/ab67616d00001e027dc0c6b05888e538fd53489c' },
    { id: 3, nombre: "La Grasa de las Capitales", cantidad: 1, desc: "1979", precio: 2000, img: 'https://i.scdn.co/image/ab67616d00001e02d9172a63ab39eae0bcafcb14' },
    { id: 4, nombre: "Bicicleta", cantidad: 1, desc: "1980", precio: 800, img: 'https://i.scdn.co/image/ab67616d00001e0291334daa58be7ede30e4b603' },
    { id: 5, nombre: "Comfort y Musica Para Volar", cantidad: 1, desc: "1996", precio: 1700, img: 'https://i.scdn.co/image/ab67616d00001e023875f29a2a8234ac7ef2706a' },
    { id: 6, nombre: "Soda Stereo", cantidad: 1, desc: "1984", precio: 1300, img: 'https://i.scdn.co/image/ab67616d00001e028fd9b16eb6bdd20c95717258' },

]

// Modal
const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const botonAbrir = document.getElementById('boton-carrito')
const botonCerrar = document.getElementById('carritoCerrar')
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]

botonAbrir.addEventListener('click', () => {
    contenedorModal.classList.toggle('modal-active')
})
botonCerrar.addEventListener('click', () => {
    contenedorModal.classList.toggle('modal-active')
})

contenedorModal.addEventListener('click', (event) => {
    contenedorModal.classList.toggle('modal-active')

})
modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation()
})

// Carrito

const contenedorProductos = document.getElementById('contenedor-productos')

const contenedorCarrito = document.getElementById('carrito-contenedor')

const botonVaciar = document.getElementById('vaciar-carrito')

const contadorCarrito = document.getElementById('contadorCarrito')

const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})


stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p>${producto.desc}</p>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
    `
    contenedorProductos.appendChild(div)


    const boton = document.getElementById(`agregar${producto.id}`)

    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)

    })
})


const agregarAlCarrito = (prodId) => {
    const existe = carrito.some(prod => prod.id === prodId) 

    if (existe) {
        const prod = carrito.map(prod => { 
            if (prod.id === prodId) {
                prod.cantidad++
            }
        })
    } else { 
        const item = stockProductos.find((prod) => prod.id === prodId)
        carrito.push(item)
    }
    actualizarCarrito() 
}

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item) 

    carrito.splice(indice, 1) 

    actualizarCarrito() 
}

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)

        localStorage.setItem('carrito', JSON.stringify(carrito))

    })

    contadorCarrito.innerText = carrito.length

    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)

}

// Contador

const content = ofertasTime.innerHTML;

ofertasTime.innerHTML = moment("20230501", "YYYYMMDD").endOf('day').fromNow();

