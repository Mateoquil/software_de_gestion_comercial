console.log("INICIO JS - Tienda");

const tablePadre = document.querySelector("#tablePadre");
let todosLosProductos = []; // Guardar todos los productos para filtrar

// Consultar API
const consultarApi = async (url) => {
    try {
        const api = await fetch(url);
        const rspApi = await api.json();
        return rspApi;
    } catch (error) {
        console.error("Error consultando API:", error);
        return { productos: [] };
    }
};

// Obtener carrito de localStorage
const obtenerCarrito = () => {
    const carrito = localStorage.getItem('carrito');
    return carrito ? JSON.parse(carrito) : [];
};

// Guardar carrito en localStorage
const guardarCarrito = (carrito) => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
};

// Actualizar contador del carrito
const actualizarContadorCarrito = () => {
    const carrito = obtenerCarrito();
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const badge = document.getElementById('carritoCount');
    if (badge) {
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'inline' : 'none';
    }
};

// Colores para badges
const getBadgeClass = (etiqueta) => {
    const colores = {
        "Alimentos": "bg-primary",
        "Bebidas": "bg-secondary", 
        "gaseosas": "bg-info",
        "Sin etiqueta": "bg-danger"
    };
    return colores[etiqueta] || "bg-secondary";
};

// Crear fila de producto
const crearProducto = (producto) => {
    const fila = document.createElement("tr");
    const etiqueta = producto.etiquetas?.[0]?.tipo || "Sin etiqueta";
    const badgeClass = getBadgeClass(etiqueta);

    fila.innerHTML = `
        <td>${producto.nombre}</td>
        <td><span class="badge ${badgeClass}">${etiqueta}</span></td>
        <td>$ ${producto.precio}</td>
        <td>${producto.stock}</td>
        <td>
            <button class="btn btn-sm btn-success" onclick='agregarAlCarrito(${JSON.stringify(producto).replace(/'/g, "&apos;")})'>
                <i class="bi bi-cart-plus"></i> Agregar
            </button>
        </td>
    `;

    return fila;
};

// Agregar producto al carrito
const agregarAlCarrito = (producto) => {
    let carrito = obtenerCarrito();
    
    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.id === producto.id);
    
    if (productoExistente) {
        // Incrementar cantidad
        if (productoExistente.cantidad < producto.stock) {
            productoExistente.cantidad++;
            mostrarNotificacion(`${producto.nombre} - Cantidad actualizada`, 'success');
        } else {
            mostrarNotificacion(`No hay más stock de ${producto.nombre}`, 'warning');
            return;
        }
    } else {
        // Agregar nuevo producto
        const etiqueta = producto.etiquetas?.[0]?.tipo || "Sin etiqueta";
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            etiqueta: etiqueta,
            cantidad: 1,
            stock: producto.stock
        });
        mostrarNotificacion(`${producto.nombre} agregado al carrito`, 'success');
    }
    
    guardarCarrito(carrito);
};

// Mostrar notificación
const mostrarNotificacion = (mensaje, tipo = 'success') => {
    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
    alerta.style.zIndex = '9999';
    alerta.innerHTML = `
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(alerta);
    
    setTimeout(() => {
        alerta.remove();
    }, 3000);
};

// Renderizar productos en la tabla
const renderizarProductos = (productos) => {
    tablePadre.innerHTML = '';
    
    if (productos.length === 0) {
        tablePadre.innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-muted">
                    No se encontraron productos
                </td>
            </tr>
        `;
        return;
    }
    
    productos.forEach(producto => {
        const fila = crearProducto(producto);
        tablePadre.appendChild(fila);
    });
};

// Cargar todos los productos
const inyectarProductosAlHtml = async () => {
    console.log("Cargando productos...");

    const rspApi = await consultarApi("http://localhost:3000/api/traer-productos");
    
    todosLosProductos = rspApi.productos || [];
    renderizarProductos(todosLosProductos);
    actualizarContadorCarrito();
};

// Buscar productos (filtrado local)
const buscarProductos = () => {
    const nombre = document.getElementById("nombreProducto").value.toLowerCase().trim();
    const tipo = document.getElementById("tipoProducto").value;
    
    let productosFiltrados = todosLosProductos;
    
    // Filtrar por nombre
    if (nombre) {
        productosFiltrados = productosFiltrados.filter(producto => 
            producto.nombre.toLowerCase().includes(nombre)
        );
    }
    
    // Filtrar por tipo
    if (tipo) {
        productosFiltrados = productosFiltrados.filter(producto => {
            const etiqueta = producto.etiquetas?.[0]?.tipo || "";
            return etiqueta === tipo;
        });
    }
    
    renderizarProductos(productosFiltrados);
};

// Limpiar búsqueda
const limpiarBusqueda = () => {
    document.getElementById("nombreProducto").value = '';
    document.getElementById("tipoProducto").value = '';
    renderizarProductos(todosLosProductos);
};

// Enter para buscar
document.addEventListener('DOMContentLoaded', () => {
    const inputNombre = document.getElementById('nombreProducto');
    if (inputNombre) {
        inputNombre.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                buscarProductos();
            }
        });
    }
});

// Cargar productos al iniciar
inyectarProductosAlHtml();