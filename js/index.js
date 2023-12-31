// URL de la API
const apiUrl = 'https://dolarapi.com/v1/dolares/oficial';

// Función para obtener el valor del dólar oficial
async function obtenerDolarOficial() {
    try {

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Error al obtener el valor del dólar oficial. Código de error: ${response.status}`);
        }

        const data = await response.json();

        const valorDolarOficial = data.venta;

        // Agregamos el valor al html
        const valorDolarOficialElement = document.getElementById('valorDolarOficial');
        if (valorDolarOficialElement) {
            valorDolarOficialElement.textContent = `$${valorDolarOficial}`;
        }
    } catch (error) {
        console.error('Error al obtener el valor del dólar oficial:', error.message);
    }
}

obtenerDolarOficial();

function mostrarFormulario() {
    Swal.fire({
        title: 'Ingresá tus datos para la factura',
        html:
            '<input id="nombre" class="swal2-input" placeholder="Nombre">' +
            '<input id="apellido" class="swal2-input" placeholder="Apellido">' +
            '<input id="dni" class="swal2-input" placeholder="DNI">',
        showCancelButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonText: 'Enviar',
        focusConfirm: false,
        preConfirm: () => {
            const nombre = Swal.getPopup().querySelector('#nombre').value;
            const apellido = Swal.getPopup().querySelector('#apellido').value;
            const dni = Swal.getPopup().querySelector('#dni').value;

            if (!nombre || !apellido || !dni) {
                Swal.showValidationMessage('Por favor, completá todos los campos');
            }

            return { nombre, apellido, dni };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const { nombre, apellido, dni } = result.value;
            localStorage.setItem('nombre', nombre);
            localStorage.setItem('apellido', apellido);
            localStorage.setItem('dni', dni);

        }
    });
}

window.onload = function () {
    const nombre = localStorage.getItem('nombre');
    const apellido = localStorage.getItem('apellido');
    const dni = localStorage.getItem('dni');

    if (nombre && apellido && dni) {
        // Verificamos si es o no un nuevo cliente
        Swal.fire({
            title: 'Hola de nuevo!',
            text: `Sos un cliente nuevo o sos \n ${nombre}\n ${apellido}?`,
            showCancelButton: true,
            confirmButtonText: 'Soy un nuevo cliente!',
            cancelButtonText: 'Soy yo!',
        }).then((result) => {
            if (result.isConfirmed) {
                // Si es un nuevo cliente, mostrar el formulario y limpiamos el carrito
                mostrarFormulario();
                carrito = [];
                localStorage.removeItem('carrito');
            }
        });
    } else {
        mostrarFormulario();
    }
};


// Definir el objeto PRODUCTOS
const PRODUCTOS = {
    nombre: "",
    categoria: "",
    precio: "",
    id: "",
    imagen: "",
    cantidad: 0,
};

// Definir la función Producto
function Producto(nombre, categoria, precio, id, imagen) {
    this.nombre = nombre,
        this.categoria = categoria,
        this.precio = precio,
        this.id = id,
        this.imagen = imagen
}

// Inicializar el carrito
let carrito = [];

// Definir el catálogo de productos
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
];

// Obtener el contenedor de las tarjetas
const cardsContainer = document.getElementById('cards');

// Crear las tarjetas para cada producto en el catálogo
CATALOGO.forEach(producto => {
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

    addToCartButton.addEventListener('mouseover', () => {
        addToCartButton.style.backgroundColor = '#87CEEB';
    });
    addToCartButton.addEventListener('mouseout', () => {
        addToCartButton.style.backgroundColor = '';
    });

    addToCartButton.addEventListener('click', () => {
        const productoEnCarrito = carrito.find(item => item.id === producto.id);

        if (productoEnCarrito) {
            productoEnCarrito.cantidad += 1;
        } else {
            carrito.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                imagen: producto.imagen,
                cantidad: 1,
            });
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
        // Pop up de tostify(Se agrego un producto al carrito)
        Toastify({
            text: `El producto "${producto.nombre}" fue agregado al carrito`,
            duration: 3000,
            position: 'right',
            gravity: "bottom",
            backgroundColor: 'green',
        }).showToast();

    });

    card.appendChild(addToCartButton);
    cardsContainer.appendChild(card);
});



// Obtener el elemento del carrito
let shoppingCart = document.getElementById('shopping-cart');

// Recuperar el carrito almacenado en localStorage al cargar la página
if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'));
}

// Función para actualizar y mostrar el carrito
function actualizarYMostrarCarrito() {
    const nombre = localStorage.getItem('nombre');
    const apellido = localStorage.getItem('apellido');
    const documento = localStorage.getItem('dni');

    let facturaCompra = `
    <div style="text-align: left;">
        <h2>Datos de facturación:</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Apellido:</strong> ${apellido}</p>
        <p><strong>DNI:</strong> ${documento}</p>
        <h2>Factura de compra:</h2>
    `;

    let totalCarrito = 0;

    carrito.forEach(producto => {

        facturaCompra += `
            <div style="margin-bottom: 10px;">
                <img src="${producto.imagen}" alt="${producto.nombre}" style="max-width: 50px; max-height: 50px; margin-right: 10px;">
                <span><strong>Cantidad:</strong> ${producto.cantidad} x ${producto.nombre} - Precio unitario: ${producto.precio} u$d</span>
            </div>
        `;

        // Calcular el precio total del producto
        totalCarrito += producto.precio * producto.cantidad;
    });


    facturaCompra += `
        <div style="margin-top: 20px;">
            <h3>Total: ${totalCarrito} u$d</h3>
        </div>
    </div>
    `;

    // Mostrar la factura con SweetAlert
    Swal.fire({
        title: 'Factura de Compra',
        html: facturaCompra,
        icon: 'info', 
        confirmButtonText: 'Aceptar',
        width: 'auto', 
    }).then(() => {
        // Limpiar el carrito una vez que se imprime la factura
        carrito = [];
        localStorage.removeItem('carrito');
    });

    // Guardar el carrito en localStorage después de actualizarlo
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

shoppingCart.addEventListener('click', actualizarYMostrarCarrito);


shoppingCart.addEventListener('click', actualizarYMostrarCarrito);
