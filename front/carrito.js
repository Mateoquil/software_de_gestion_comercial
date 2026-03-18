console.log("INICIO JS - Carrito");

const tablaCarrito = document.getElementById('tablaCarrito');
const totalCarrito = document.getElementById('totalCarrito');
const carritoVacio = document.getElementById('carritoVacio');
const carritoContenido = document.getElementById('carritoContenido');
const totalContainer = document.getElementById('totalContainer');
const botonesContainer = document.getElementById('botonesContainer');

// Obtener carrito
const obtenerCarrito = () => {
    const carrito = localStorage.getItem('carrito');
    return carrito ? JSON.parse(carrito) : [];
};

// Guardar carrito
const guardarCarrito = (carrito) => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
};

// Actualizar contador
const actualizarContadorCarrito = () => {
    const carrito = obtenerCarrito();
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const badge = document.getElementById('carritoCount');
    if (badge) {
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'inline' : 'none';
    }
};

// Color del badge
const getBadgeClass = (etiqueta) => {
    const colores = {
        "Alimentos": "bg-primary",
        "Bebidas": "bg-secondary", 
        "gaseosas": "bg-info",
        "Sin etiqueta": "bg-danger"
    };
    return colores[etiqueta] || "bg-secondary";
};

// Calcular total
const calcularTotal = (carrito) => {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
};

// Renderizar carrito
const renderizarCarrito = () => {
    const carrito = obtenerCarrito();
    
    if (carrito.length === 0) {
        // Mostrar mensaje de carrito vacío
        carritoVacio.style.display = 'block';
        carritoContenido.style.display = 'none';
        totalContainer.style.display = 'none';
        botonesContainer.style.display = 'none';
        return;
    }
    
    // Mostrar carrito con productos
    carritoVacio.style.display = 'none';
    carritoContenido.style.display = 'block';
    totalContainer.style.display = 'flex';
    botonesContainer.style.display = 'flex';
    
    tablaCarrito.innerHTML = '';
    
    carrito.forEach((item, index) => {
        const badgeClass = getBadgeClass(item.etiqueta);
        const subtotal = item.precio * item.cantidad;
        
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${item.nombre}</td>
            <td><span class="badge ${badgeClass}">${item.etiqueta}</span></td>
            <td>$ ${item.precio}</td>
            <td>
                <div class="d-flex align-items-center gap-2">
                    <button class="btn btn-sm btn-outline-secondary" onclick="cambiarCantidad(${index}, -1)">
                        <i class="bi bi-dash"></i>
                    </button>
                    <span class="mx-2">${item.cantidad}</span>
                    <button class="btn btn-sm btn-outline-secondary" onclick="cambiarCantidad(${index}, 1)">
                        <i class="bi bi-plus"></i>
                    </button>
                </div>
            </td>
            <td>$ ${subtotal.toFixed(2)}</td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito(${index})">
                    <i class="bi bi-trash"></i> Eliminar
                </button>
            </td>
        `;
        tablaCarrito.appendChild(fila);
    });
    
    // Actualizar total
    const total = calcularTotal(carrito);
    totalCarrito.textContent = total.toFixed(2);
    
    actualizarContadorCarrito();
};

// Cambiar cantidad
const cambiarCantidad = (index, cambio) => {
    let carrito = obtenerCarrito();
    const item = carrito[index];
    
    const nuevaCantidad = item.cantidad + cambio;
    
    if (nuevaCantidad <= 0) {
        eliminarDelCarrito(index);
        return;
    }
    
    if (nuevaCantidad > item.stock) {
        alert(`Stock máximo: ${item.stock}`);
        return;
    }
    
    item.cantidad = nuevaCantidad;
    guardarCarrito(carrito);
    renderizarCarrito();
};

// Eliminar del carrito
const eliminarDelCarrito = (index) => {
    let carrito = obtenerCarrito();
    const item = carrito[index];
    
    if (confirm(`¿Eliminar ${item.nombre} del carrito?`)) {
        carrito.splice(index, 1);
        guardarCarrito(carrito);
        renderizarCarrito();
    }
};

// Vaciar carrito
const vaciarCarrito = () => {
    if (confirm('¿Vaciar todo el carrito?')) {
        localStorage.removeItem('carrito');
        renderizarCarrito();
    }
};

// Finalizar compra
const finalizarCompra = () => {
    const carrito = obtenerCarrito();
    const total = calcularTotal(carrito);
    
    alert(`Compra finalizada!\nTotal: $${total.toFixed(2)}\n\n(Aquí iría la integración con el sistema de pagos)`);
    
    // Vaciar carrito después de comprar
    localStorage.removeItem('carrito');
    renderizarCarrito();
};

// Cargar carrito al iniciar
renderizarCarrito();