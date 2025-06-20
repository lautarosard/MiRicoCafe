document.addEventListener('DOMContentLoaded', function() {
    let productsArray = JSON.parse(localStorage.getItem('cartProducts')) || [];

    // --- SELECTORES ---
    const listProducts = document.querySelector('#listProducts');
    const contenedorProductosCarrito = document.querySelector('#contenedor-productos-carrito');
    const emptyCartButton = document.querySelector('#emptyCart');
    const cantidadProductosResumen = document.querySelector('#cantidad-productos-resumen');
    const subtotalResumen = document.querySelector('#subtotal-resumen');
    const totalResumen = document.querySelector('#total-resumen');

    // --- LÓGICA GENERAL ---
    function saveProductsToLocalStorage() {
        localStorage.setItem('cartProducts', JSON.stringify(productsArray));
    }

    // --- LÓGICA PARA LA PÁGINA DE PRODUCTOS ---
    if (listProducts) {
        listProducts.addEventListener('click', e => {
            if (e.target.classList.contains('btn-anadir-carrito')) {
                const productCard = e.target.closest('.producto-card');
                addProductToCart(productCard);
            }
        });
    }

    function addProductToCart(productCard) {
        const quantityToAdd = parseInt(productCard.querySelector('input[type="number"]').value, 10);
        if (isNaN(quantityToAdd) || quantityToAdd <= 0) {
            alert('Por favor, ingresa una cantidad válida.');
            return;
        }

        const infoProduct = {
            image: productCard.querySelector('img').src, // Aún lo guardamos por si lo necesitas en otro lado
            title: productCard.querySelector('h2').textContent,
            price: parseFloat(productCard.querySelector('.producto-precio').textContent.replace('$', '')),
            id: parseInt(productCard.querySelector('button').dataset.id, 10),
            quantity: quantityToAdd
        };

        const existingProduct = productsArray.find(product => product.id === infoProduct.id);
        if (existingProduct) {
            existingProduct.quantity += infoProduct.quantity;
        } else {
            productsArray.push(infoProduct);
        }
        
        alert(`Se añadieron ${infoProduct.quantity} x ${infoProduct.title} al carrito.`);
        saveProductsToLocalStorage();
    }

    // --- LÓGICA PARA LA PÁGINA DEL CARRITO ---
    if (contenedorProductosCarrito) {
        contenedorProductosCarrito.addEventListener('click', e => {
            if (e.target.classList.contains('btn-eliminar-producto')) {
                const productId = parseInt(e.target.dataset.id, 10);
                removeProduct(productId);
            }
        });

        contenedorProductosCarrito.addEventListener('change', e => {
            if (e.target.classList.contains('cantidad-input')) {
                const productId = parseInt(e.target.dataset.id, 10);
                const newQuantity = parseInt(e.target.value, 10);
                updateQuantity(productId, newQuantity);
            }
        });

        if (emptyCartButton) {
            emptyCartButton.addEventListener('click', emptyCart);
        }
        renderCart();
    }

    function renderCart() {
        contenedorProductosCarrito.innerHTML = '';

        if (productsArray.length === 0) {
            contenedorProductosCarrito.innerHTML = '<p class="carrito-vacio-mensaje">Tu bolsa de compras está vacía.</p>';
        } else {
            productsArray.forEach(product => {
                const subtotal = product.price * product.quantity;
                const productElement = document.createElement('div');
                productElement.classList.add('producto-card-carrito');
                
                // --- CAMBIO PRINCIPAL AQUÍ ---
                // Se eliminó la etiqueta <img> de la siguiente plantilla.
                productElement.innerHTML = `
                    <div class="producto-info">
                        <h3>${product.title}</h3>
                        <p>Precio unitario: $${product.price.toFixed(2)}</p>
                        <div class="producto-controles">
                            <span>Cantidad:</span>
                            <input type="number" value="${product.quantity}" min="1" class="cantidad-input" data-id="${product.id}">
                        </div>
                    </div>
                    <div class="producto-precio-subtotal">
                        $${subtotal.toFixed(2)}
                    </div>
                    <button class="btn-eliminar-producto" data-id="${product.id}">
                        &times;
                    </button>
                `;
                contenedorProductosCarrito.appendChild(productElement);
            });
        }
        updateSummary();
    }
    
    function updateSummary() {
        const totalItems = productsArray.reduce((sum, product) => sum + product.quantity, 0);
        const totalPrice = productsArray.reduce((sum, product) => sum + (product.price * product.quantity), 0);
        
        if (cantidadProductosResumen) {
            cantidadProductosResumen.textContent = totalItems;
        }
        if (subtotalResumen) {
            subtotalResumen.textContent = `$${totalPrice.toFixed(2)}`;
        }
        if (totalResumen) {
            totalResumen.textContent = `$${totalPrice.toFixed(2)}`;
        }
    }

    function removeProduct(productId) {
        productsArray = productsArray.filter(product => product.id !== productId);
        saveProductsToLocalStorage();
        renderCart();
    }

    function updateQuantity(productId, newQuantity) {
        const productToUpdate = productsArray.find(product => product.id === productId);
        if (productToUpdate) {
            if (newQuantity < 1) {
                removeProduct(productId);
            } else {
                productToUpdate.quantity = newQuantity;
                saveProductsToLocalStorage();
                renderCart();
            }
        }
    }

    function emptyCart() {
        if (confirm('¿Estás seguro de que quieres vaciar todo el carrito?')) {
            productsArray = [];
            saveProductsToLocalStorage();
            renderCart();
        }
    }
});