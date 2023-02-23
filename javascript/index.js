// obtengo el div que funcionara como padre para las tarjetas

const shopContent = document.getElementById ("shopContent");

const modalContainer = document.getElementById ("modalContainer");

// contador del carrito 

const cantidadCarrito = document.getElementById ("cantidadCarrito");

//array importado

import {productos} from "./productos.js"

// obtengo en una variable el id del icono que funcionara como carrito

const verCarrito = document.getElementById ("verCarrito");

// array vacio que funcionara como carrito

let carrito = JSON.parse (localStorage.getItem ("carrito")) || [];

// recorro el array y en cada recorrido creo un div con las siguientes propiedades

productos.forEach((product) => {
    let content = document.createElement ("div");
    content.className = "card";
    content.innerHTML = `
    <img src="${product.img}">
    <h3>${product.nombre}</h3>
    <span>${product.precio} $</span>
    `;
    shopContent.append (content);

    let comprar = document.createElement ("button")
    comprar.innerText = "Comprar";
    comprar.className = "comprar";

    content.append (comprar);

// agrego los productos seleccionados al carrito 

    comprar.addEventListener ("click", () => {
        const repeat = carrito.some ((repeatProduct) => repeatProduct.id === product.id); // voy a buscar dentro del carrito si hay algun id que se repita
        
        if (repeat) {
            carrito.map ((prod) => {
                if (prod.id === product.id) {  // si el id que se encuentra en el carrito es true, entonces suma 1.
                    prod.cantidad++;
                }
            });
        } else {
            carrito.push ({
                id: product.id,
                img: product.img,
                nombre: product.nombre,
                precio: product.precio,
                cantidad: product.cantidad,
            });
        }
        console.log (carrito);
        carritoCounter ();
        saveLocal ();
    });
});

// creo el mensaje donde se mostrara al usuario los productos a comprar.

const pintarCarrito = () => {
    modalContainer.innerHTML = ""; // evita que el carrito acumule los mismos productos
    modalContainer.style.display = "flex"; // hace que el carrito se pueda volver a visualizar una vez cerrado
    const modalHeader = document.createElement ("div"); //creo el header
    modalHeader.className = "modalHeader";
    modalHeader.innerHTML = `
        <h3 class = "modal-header-tittle">Carrito</h3>
    `;
    modalContainer.append (modalHeader);

    const modalButton = document.createElement ("h1"); //creo el boton del header
    modalButton.innerText = "x";
    modalButton.className = "modal-header-button";

    modalButton.addEventListener ("click" , () => {  // agrego la funcion para que al darle a la x el carrito se cierre
        modalContainer.style.display = "none";
    })

    modalHeader.append (modalButton);

    // creo un funcion para recorrer el array y poder mostrarle al usuario los elementos que selecciono para comprar
    
    carrito.forEach ((product)  => {
        let carritoContent = document.createElement ("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
            <img src="${product.img}">
            <h3>${product.nombre}</h3>
            <span>${product.precio} $</span>
            <span>Cantidad: ${product.cantidad} </span>
            <span>Cantidad: ${product.cantidad * product.precio} </span>
            <span class = "delete-product"> ✖️ </span>
        `;

    modalContainer.append (carritoContent);

    // creo boton para eliminar preducto del carrito 
    
    let eliminar = carritoContent.querySelector (".delete-product");

    eliminar.addEventListener ("click" , () => {
        eliminarProducto(product.id);
    });

    });

    // saco el precio total de los productos

    const total = carrito.reduce ((acc, el) => acc + el.precio * el.cantidad, 0); 

    const totalBuying = document.createElement ("div");
    totalBuying.className = "total-content"
    totalBuying.innerHTML = `Total a pagar: ${total} $`
    modalContainer.append (totalBuying);
};

verCarrito.addEventListener ("click", pintarCarrito);

// eliminando productos del carrito

const eliminarProducto = (id) => {
    const foundId = carrito.find ((element) => element.id === id );

    console.log (foundId)

    carrito = carrito.filter ((carritoId) => {
        return carritoId !== foundId;
    });

    carritoCounter ();

    saveLocal ();

    pintarCarrito ();
};

// contador del carrito

const carritoCounter = () => {
    cantidadCarrito.style.display = "block";

    const carritoLength = carrito.length;

    localStorage.setItem ("carritoLength", JSON.stringify (carritoLength));

    cantidadCarrito.innerText = JSON.parse (localStorage.getItem ("carritoLength"));
};

carritoCounter ();

// Localstorage ---------------------------------------------


const saveLocal = () => {
    localStorage.setItem ("carrito", JSON.stringify (carrito));
};















