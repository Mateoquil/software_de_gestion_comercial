console.log("INICIO JS - Tienda");

const tablePadre = document.querySelector("#tablePadre");
let todosLosProductos = [];
let todasLasEtiquetas = [];

// Consultar API
const consultarApi = async (url) => {
    try {
        console.log("Llamando a API:", url);
        const api = await fetch(url);
        const rspApi = await api.json();
        console.log("Respuesta de API:", rspApi);
        return rspApi;
    } catch (error) {
        console.error("ERROR consultando API:", error);
        return { productos: [], etiquetas: [] };
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
        "alimentos": "bg-primary",
        "bebidas": "bg-secondary",
        "gaseosas": "bg-info",
        "jugos": "bg-secondary",
        "snacks": "bg-warning",   
        "golosinas": "bg-warning",
        "lacteos": "bg-primary",
        "limpieza": "bg-success",
        "higiene": "bg-success",
        "carnes": "bg-danger",
        "panaderia": "bg-warning",
        "verduras": "bg-success",
        "yogur": "bg-primary",
        "otros": "bg-danger",
        "sin etiqueta": "bg-danger"
    };
    
    const etiquetaLower = etiqueta.toLowerCase();
    return colores[etiquetaLower] || "bg-secondary";
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
    
    const productoExistente = carrito.find(item => item.id === producto.id);
    
    if (productoExistente) {
        if (productoExistente.cantidad < producto.stock) {
            productoExistente.cantidad++;
            mostrarNotificacion(`${producto.nombre} - Cantidad actualizada`, 'success');
        } else {
            mostrarNotificacion(`No hay más stock de ${producto.nombre}`, 'warning');
            return;
        }
    } else {
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
                <td colspan="5" class="text-center text-muted py-4">
                    <i class="bi bi-search fs-1 d-block mb-2"></i>
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

// Buscar productos (por nombre Y categoría)
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
    
    // Filtrar por categoría
    if (tipo) {
        productosFiltrados = productosFiltrados.filter(producto => {
            const etiqueta = producto.etiquetas?.[0]?.tipo || "";
            return etiqueta.toLowerCase() === tipo.toLowerCase();
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

// Actualizar sugerencias de autocompletado
const actualizarSugerencias = () => {
    const datalist = document.getElementById("sugerencias");
    if (!datalist) return;

    datalist.innerHTML = "";

    const nombresUnicos = [...new Set(todosLosProductos.map(p => p.nombre))];

    nombresUnicos.forEach(nombre => {
        const option = document.createElement("option");
        option.value = nombre;
        datalist.appendChild(option);
    });
};

// Cargar etiquetas en el select
const cargarEtiquetasEnSelect = async () => {
    console.log("🔵 INICIO - cargarEtiquetasEnSelect");
    
    try {
        const rspApi = await consultarApi("http://localhost:3000/api/traer-etiquetas");
        console.log("🔵 Respuesta etiquetas:", rspApi);
        
        todasLasEtiquetas = rspApi.etiquetas || [];
        console.log("🔵 Total etiquetas:", todasLasEtiquetas.length);
        console.log("🔵 Etiquetas array:", todasLasEtiquetas);
        
        const select = document.getElementById("tipoProducto");
        console.log("🔵 Select encontrado:", select ? "SÍ" : "NO");
        
        if (!select) {
            console.error("❌ ERROR: No se encontró el select #tipoProducto");
            return;
        }
        
        // Limpiar select
        select.innerHTML = '<option value="">Todas las categorías</option>';
        console.log("🔵 Select limpiado");
        
        // Agregar cada etiqueta
        todasLasEtiquetas.forEach((etiqueta, index) => {
            console.log(`🔵 Agregando etiqueta ${index + 1}:`, etiqueta.tipo);
            const option = document.createElement("option");
            option.value = etiqueta.tipo;
            option.textContent = etiqueta.tipo.charAt(0).toUpperCase() + etiqueta.tipo.slice(1);
            select.appendChild(option);
        });
        
        console.log(`✅ ${todasLasEtiquetas.length} etiquetas cargadas en el select`);
        console.log("🔵 Opciones en select:", select.options.length);
        
    } catch (error) {
        console.error("❌ ERROR en cargarEtiquetasEnSelect:", error);
    }
};

// Cargar todos los productos
const inyectarProductosAlHtml = async () => {
    console.log("🟢 INICIO - inyectarProductosAlHtml");

    const rspApi = await consultarApi("http://localhost:3000/api/traer-productos");
    
    todosLosProductos = rspApi.productos || [];
    console.log("🟢 Total productos:", todosLosProductos.length);
    
    renderizarProductos(todosLosProductos);
    actualizarContadorCarrito();
    actualizarSugerencias();
    
    console.log("✅ Productos cargados");
};

// Inicializar todo
const inicializar = async () => {
    console.log("🚀 INICIO - Inicializar");
    
    try {
        await cargarEtiquetasEnSelect();
        await inyectarProductosAlHtml();
        console.log("✅ Inicialización completa");
    } catch (error) {
        console.error("❌ ERROR en inicializar:", error);
    }
};

// Enter para buscar
document.addEventListener('DOMContentLoaded', () => {
    console.log("📄 DOM Cargado");
    
    const inputNombre = document.getElementById('nombreProducto');
    if (inputNombre) {
        inputNombre.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                buscarProductos();
            }
        });
        
        inputNombre.addEventListener('input', () => {
            buscarProductos();
        });
    }
    
    // Inicializar
    inicializar();
});
