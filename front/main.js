console.log("INICIO JS");

const tablePadre = document.querySelector("#tablePadre");

const consultarApi = async (url) => {
    const api = await fetch(url);
    const rspApi = await api.json();
    return rspApi;
};

const crearProducto = (nombre, etiqueta, precio, stock) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
        <td>${nombre}</td>
        <td><span class="badge bg-primary">${etiqueta}</span></td>
        <td>${precio}</td>
        <td>${stock}</td>
        <td>
            <button class="btn btn-sm btn-success">Comprar</button>
            <button class="btn btn-sm btn-danger">Cancelar</button>
        </td>
    `;

    return fila;
};

const inyectarProductosAlHtml = async () => {
    console.log("ENTRO A LA FUNCION");

    const rspApi = await consultarApi("http://localhost:3000/api/traer-productos");

    console.log("API:", rspApi);

    rspApi.productos.forEach(producto => {
        const etiqueta = producto.etiquetas?.[0]?.tipo || "Sin etiqueta";

        const fila = crearProducto(
            producto.nombre,
            etiqueta,
            producto.precio,
            producto.stock
        );

        tablePadre.appendChild(fila);
    });
};

inyectarProductosAlHtml();