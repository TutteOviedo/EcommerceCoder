carrito = [];

const PRODUCTOS = {
    nombre: "",
    categoria: "",
    precio:"" ,
    id:"",
    imagen:"",
}

function Producto(nombre,categoria,precio, id, imagen){
    this.nombre = nombre,
    this.categoria = categoria,
    this.precio = precio,
    this.id = id,
    this.imagen = imagen
}

//Cargamos el catalogo
const CATALOGO = [
    new Producto("Intel I3", "Microprocesadores", 100, 1, "./assets/I3.jpg"),
    new Producto("Intel I5", "Microprocesadores", 150, 2,"./assets/I5.png"),
    new Producto("Intel I7", "Microprocesadores", 200, 3,"./assets/I7.jpg"),
    new Producto("Ryzen 3", "Microprocesadores", 80, 4,"./assets/RYZEN3.jpeg"),
    new Producto("Ryzen 5", "Microprocesadores", 130, 5,"./assets/RYZEN5.jpg"),
    new Producto("Ryzen 7", "Microprocesadores", 180, 6,"./assets/RYZEN7.jpg"),
    new Producto("Kingston Fury 16GB", "Memoria", 50, 7,"./assets/FURY16GB.jpg"),
    new Producto("Kingston Fury 8GB", "Memoria", 30, 8,"./assets/FURY8GB.jpg"),
    new Producto("Gigabyte Ga H310", "Motherboard", 90, 9,"./assets/MOTHERGIGABYTE.png"),
    new Producto("Asus A320m-k", "Motherboard", 80, 10,"./assets/MOTHERASUS.jpg"),
    new Producto("MSI RTX 30 Series 3080ti", "Placa de video", 800, 11,"./assets/GRAFICA.webp"),
]

const cardsContainer = document.getElementById('cards');



CATALOGO.forEach(producto => {
    //Creamos las cards

    const card = document.createElement('div');
    card.className = 'card';

    const img = document.createElement('img');
    img.className = 'card-img-top';
    img.src = producto.imagen;
    card.appendChild(img);

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const TITULO = document.createElement('h2');
    TITULO.className = 'card-title';
    TITULO.textContent = producto.nombre;
    cardBody.appendChild(TITULO);

    const SUBTITULO = document.createElement('h5');
    SUBTITULO.className = 'card-subtitle mb-2 text-muted';
    SUBTITULO.textContent = `Precio: u$d ${producto.precio}`;
    cardBody.appendChild(SUBTITULO);

    card.appendChild(cardBody);

    const addToCartButton = document.createElement('button');
    addToCartButton.className = 'btn btn-primary'; 
    addToCartButton.textContent = 'Agregar al carrito';
    
    //Cambiamos de color el boton cuando el mouse pasa por encima y lo reestablecemos cuando lo saca para crea el efecto de hover
    addToCartButton.addEventListener('mouseover', () => {
        addToCartButton.style.backgroundColor = '#87CEEB'; 
        });
    addToCartButton.addEventListener('mouseout', () => {
        addToCartButton.style.backgroundColor = '';
        });
    
    //Guardamos el producto en el carrito
    addToCartButton.addEventListener('click', () => {
        carrito.push({
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen
            })
            alert(`Producto ${producto.nombre} agregado al carrito`);
            console.log("Carrito:", carrito);
        }
        );
    
    card.appendChild(addToCartButton);
    cardsContainer.appendChild(card);
});

//Carrito de compras

let shoppingCart = document.getElementById('shopping-cart');
shoppingCart.addEventListener('click', () => {
    let facturaCompra = "Factura de compra\n";
    let totalCarrito = 0;

    carrito.forEach(producto => {
        facturaCompra += `Producto: ${producto.nombre} | Precio: ${producto.precio} u$d\n`;
        totalCarrito += producto.precio;
    });

    facturaCompra += `\nTotal: ${totalCarrito} u$d`;

    alert(facturaCompra);
});