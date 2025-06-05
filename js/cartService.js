// Contador para el dashboard
let cartCount = 0;

// Función para obtener y mostrar carritos
function getCarts() {
    document.getElementById('cardHeader').innerHTML = '<h4 class="mb-0"><i class="bi bi-cart me-2"></i>Listado de carritos</h4>';
    
    // Mostrar indicador de carga
    document.getElementById('info').innerHTML = `
        <div class="d-flex justify-content-center my-5">
            <div class="spinner-border text-warning" role="status">
                <span class="visually-hidden">Cargando...</span>
            </div>
        </div>
    `;
    
    // Actualizar contador en el dashboard
    updateCartCount();
    
    // Obtener carritos desde la API
        fetch(`${API_URL}/carts`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener carritos');
        }
        return response.json();
    })
    .then(users => {
        // Generar carritos simulados basados en usuarios
        const carts = users.map(user => {
            // Generar entre 1 y 5 items aleatorios para cada carrito
            const itemCount = Math.floor(Math.random() * 5) + 1;
            const items = [];
            let totalPrice = 0;
            
            for (let i = 0; i < itemCount; i++) {
                const price = Math.floor(Math.random() * 100) + 10;
                const quantity = Math.floor(Math.random() * 3) + 1;
                totalPrice += price * quantity;
                
                items.push({
                    productId: Math.floor(Math.random() * 100) + 1,
                    title: `Producto ${Math.floor(Math.random() * 100) + 1}`,
                    price: price,
                    quantity: quantity,
                    total: price * quantity
                });
            }
            
            return {
                id: user.id,
                userId: user.id,
                date: new Date().toISOString(),
                items: items,
                totalPrice: totalPrice
            };
        });
        
        // Actualizar contador global
        cartCount = carts.length;
        
        if (!carts || carts.length === 0) {
            document.getElementById('info').innerHTML = `
                <div class="alert alert-warning" role="alert">
                    <h4 class="alert-heading">No se encontraron carritos</h4>
                    <p>No hay carritos disponibles en este momento.</p>
                    <button class="btn btn-sm btn-outline-secondary" onclick="showWelcomeMessage()">Volver</button>
                </div>
            `;
            return;
        }
        
        let cartsHtml = `
            <div class="d-flex justify-content-between mb-3">
                <h5>Total carritos: ${carts.length}</h5>
                <div>
                    <button class="btn btn-warning me-2" onclick="showAddCartForm()"><i class='bi bi-cart-plus'></i> Agregar carrito</button>
                    <button class="btn btn-sm btn-outline-secondary" onclick="showWelcomeMessage()">
                        <i class="bi bi-arrow-left me-1"></i>Volver
                    </button>
                </div>
            </div>
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        `;
        
        carts.forEach(cart => {
            // Calcular el total del carrito
            let totalItems = 0;
            let totalPrice = 0;
            
            if (cart.items && cart.items.length > 0) {
                cart.items.forEach(item => {
                    totalItems += item.quantity || 0;
                    totalPrice += (item.price * item.quantity) || 0;
                });
            }
            
            cartsHtml += `
                <div class="col">
                    <div class="card h-100">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <h6 class="mb-0">Carrito #${cart.id}</h6>
                            <span class="badge bg-warning text-dark">${totalItems} productos</span>
                        </div>
                        <div class="card-body">
                            <p class="card-text mb-1">
                                <i class="bi bi-person me-2 text-primary"></i>Usuario: ${cart.userId || 'No disponible'}
                            </p>
                            <p class="card-text mb-1">
                                <i class="bi bi-calendar me-2 text-primary"></i>Fecha: ${new Date(cart.date || Date.now()).toLocaleDateString()}
                            </p>
                            <p class="card-text">
                                <i class="bi bi-currency-dollar me-2 text-success"></i>Total: $${totalPrice.toFixed(2)}
                            </p>
                        </div>
                        <div class="card-footer bg-transparent border-top-0 text-center">
                            <button class="btn btn-sm btn-primary" onclick="showCartDetails(${cart.id})">
                                <i class="bi bi-eye me-1"></i>Ver detalles
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        cartsHtml += `
            </div>
        `;
        
        document.getElementById('info').innerHTML = cartsHtml;
    })
    .catch(error => {
        document.getElementById('info').innerHTML = `
            <div class="alert alert-danger" role="alert">
                <h4 class="alert-heading">Error al cargar carritos</h4>
                <p>${error.message || 'Ocurrió un error inesperado'}</p>
                <button class="btn btn-primary" onclick="showWelcomeMessage()">Volver al inicio</button>
            </div>
        `;
    });
}

// Función para mostrar detalles de un carrito en modal
function showCartDetails(cartId) {
    // Mostrar indicador de carga en el modal
    document.getElementById('detailsModalLabel').textContent = 'Detalles del Carrito';
    document.getElementById('detailsModalBody').innerHTML = `
        <div class="d-flex justify-content-center my-4">
            <div class="spinner-border text-warning" role="status">
                <span class="visually-hidden">Cargando...</span>
            </div>
        </div>
    `;
    
    // Mostrar el modal
    const detailsModal = new bootstrap.Modal(document.getElementById('detailsModal'));
    detailsModal.show();
    
    // Obtener detalles del usuario para simular un carrito
    fetch(`${API_URL}/users/${cartId}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener detalles del carrito');
        }
        return response.json();
    })
    .then(user => {
        // Generar un carrito simulado para este usuario
        const itemCount = Math.floor(Math.random() * 5) + 1;
        const items = [];
        let cartTotal = 0;
        
        for (let i = 0; i < itemCount; i++) {
            const price = Math.floor(Math.random() * 100) + 10;
            const quantity = Math.floor(Math.random() * 3) + 1;
            cartTotal += price * quantity;
            
            items.push({
                productId: Math.floor(Math.random() * 100) + 1,
                title: `Producto ${Math.floor(Math.random() * 100) + 1}`,
                price: price,
                quantity: quantity,
                total: price * quantity
            });
        }
        
        const cart = {
            id: user.id,
            userId: user.id,
            date: new Date().toISOString(),
            items: items,
            totalPrice: cartTotal
        };
        
        // Variables para mostrar en la UI
        let totalItems = 0;
        let totalPrice = 0;
        
        if (cart.items && cart.items.length > 0) {
            cart.items.forEach(item => {
                totalItems += item.quantity || 0;
                totalPrice += (item.price * item.quantity) || 0;
            });
        }
        
        // Mostrar detalles del carrito en el modal
        let modalContent = `
            <div class="row mb-3">
                <div class="col-md-6">
                    <h5>Información del carrito</h5>
                    <div class="d-flex align-items-center mb-2">
                        <i class="bi bi-cart-check me-2 text-warning"></i>
                        <span>ID: ${cart.id}</span>
                    </div>
                    <div class="d-flex align-items-center mb-2">
                        <i class="bi bi-person me-2 text-primary"></i>
                        <span>Usuario: ${cart.userId || 'No disponible'}</span>
                    </div>
                    <div class="d-flex align-items-center mb-2">
                        <i class="bi bi-calendar me-2 text-primary"></i>
                        <span>Fecha: ${new Date(cart.date || Date.now()).toLocaleDateString()}</span>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card bg-light">
                        <div class="card-body">
                            <h5 class="card-title">Resumen</h5>
                            <div class="d-flex justify-content-between mb-2">
                                <span>Total productos:</span>
                                <span class="fw-bold">${totalItems}</span>
                            </div>
                            <div class="d-flex justify-content-between">
                                <span>Importe total:</span>
                                <span class="fw-bold text-success">$${totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Mostrar items del carrito
        if (cart.items && cart.items.length > 0) {
            modalContent += `
                <h5>Productos en el carrito</h5>
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead class="table-light">
                            <tr>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
            `;
            
            cart.items.forEach(item => {
                const subtotal = (item.price * item.quantity) || 0;
                modalContent += `
                    <tr>
                        <td>${item.title || 'Producto ' + item.productId}</td>
                        <td>$${item.price?.toFixed(2) || '0.00'}</td>
                        <td>${item.quantity || 0}</td>
                        <td>$${subtotal.toFixed(2)}</td>
                    </tr>
                `;
            });
            
            modalContent += `
                        </tbody>
                        <tfoot class="table-light">
                            <tr>
                                <td colspan="3" class="text-end fw-bold">Total:</td>
                                <td class="fw-bold">$${totalPrice.toFixed(2)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            `;
        } else {
            modalContent += `
                <div class="alert alert-info">
                    <i class="bi bi-info-circle me-2"></i>
                    Este carrito no contiene productos.
                </div>
            `;
        }
        
        document.getElementById('detailsModalBody').innerHTML = modalContent;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('detailsModalBody').innerHTML = `
            <div class="alert alert-danger" role="alert">
                <h5 class="alert-heading">Error al cargar detalles</h5>
                <p>${error.message || 'Ocurrió un error inesperado'}</p>
            </div>
        `;
    });
}

// Función para actualizar el contador de carritos en el dashboard
function updateCartCount() {
    // Como la API no tiene un endpoint específico para contar carritos,
    // usamos el contador que actualizamos al cargar los carritos
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
    
    // También podemos intentar obtener el conteo de la API
    fetch(`${API_URL}/carts`)
    .then(response => response.json())
    .then(carts => {
        if (Array.isArray(carts)) {
            cartCount = carts.length;
            if (cartCountElement) {
                cartCountElement.textContent = cartCount;
            }
        }
    })
    .catch(error => {
        console.error('Error al actualizar contador de carritos:', error);
    });
}

// Función para mostrar el formulario de agregar carrito
function showAddCartForm() {
    document.getElementById('info').innerHTML = `
        <div class="card shadow">
            <div class="card-header bg-warning text-dark">
                <h5 class="mb-0">Agregar nuevo carrito</h5>
            </div>
            <div class="card-body">
                <form id="addCartForm">
                    <div class="mb-3">
                        <label for="cartUserId" class="form-label">ID de Usuario</label>
                        <input type="number" class="form-control" id="cartUserId" required>
                        <div class="form-text">Ingrese el ID del usuario dueño del carrito.</div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Productos</label>
                        <div id="cartItems">
                            <div class="card mb-2">
                                <div class="card-body">
                                    <div class="row g-3">
                                        <div class="col-md-5">
                                            <label class="form-label">ID del Producto</label>
                                            <input type="number" class="form-control product-id" required>
                                        </div>
                                        <div class="col-md-5">
                                            <label class="form-label">Cantidad</label>
                                            <input type="number" class="form-control product-quantity" value="1" min="1" required>
                                        </div>
                                        <div class="col-md-2 d-flex align-items-end">
                                            <button type="button" class="btn btn-danger btn-sm w-100" onclick="removeCartItem(this)">
                                                <i class="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="button" class="btn btn-sm btn-outline-primary mt-2" onclick="addCartItem()">
                            <i class="bi bi-plus-circle"></i> Agregar producto
                        </button>
                    </div>
                    <div class="d-flex justify-content-between">
                        <button type="button" class="btn btn-secondary" onclick="getCarts()">
                            <i class="bi bi-arrow-left me-1"></i>Cancelar
                        </button>
                        <button type="submit" class="btn btn-warning text-dark">
                            <i class="bi bi-save me-1"></i>Guardar Carrito
                        </button>
                    </div>
                </form>
                <div id="formMessage" class="mt-3"></div>
            </div>
        </div>
    `;

    // Agregar manejador de eventos al formulario
    document.getElementById('addCartForm').addEventListener('submit', function(e) {
        e.preventDefault();
        addCart();
    });
}

// Función para agregar un nuevo campo de producto al carrito
function addCartItem() {
    const itemsContainer = document.getElementById('cartItems');
    const itemCount = itemsContainer.querySelectorAll('.card').length;
    
    if (itemCount >= 10) {
        document.getElementById('formMessage').innerHTML = `
            <div class="alert alert-warning">
                <i class="bi bi-exclamation-triangle-fill me-2"></i>Máximo 10 productos por carrito.
            </div>
        `;
        return;
    }
    
    const newItem = document.createElement('div');
    newItem.className = 'card mb-2';
    newItem.innerHTML = `
        <div class="card-body">
            <div class="row g-3">
                <div class="col-md-5">
                    <label class="form-label">ID del Producto</label>
                    <input type="number" class="form-control product-id" required>
                </div>
                <div class="col-md-5">
                    <label class="form-label">Cantidad</label>
                    <input type="number" class="form-control product-quantity" value="1" min="1" required>
                </div>
                <div class="col-md-2 d-flex align-items-end">
                    <button type="button" class="btn btn-danger btn-sm w-100" onclick="removeCartItem(this)">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    itemsContainer.appendChild(newItem);
}

// Función para eliminar un producto del formulario de carrito
function removeCartItem(button) {
    const itemCard = button.closest('.card');
    if (itemCard && document.querySelectorAll('#cartItems .card').length > 1) {
        itemCard.remove();
    } else if (itemCard) {
        // No permitir eliminar el último producto
        document.getElementById('formMessage').innerHTML = `
            <div class="alert alert-warning">
                <i class="bi bi-exclamation-triangle-fill me-2"></i>El carrito debe tener al menos un producto.
            </div>
        `;
    }
}

// Función para agregar un nuevo carrito
function addCart() {
    const formMessage = document.getElementById('formMessage');
    formMessage.innerHTML = '';
    
    const userId = parseInt(document.getElementById('cartUserId').value);
    const productInputs = document.querySelectorAll('#cartItems .card');
    
    // Validaciones básicas
    if (isNaN(userId) || userId <= 0) {
        formMessage.innerHTML = `
            <div class="alert alert-danger">
                <i class="bi bi-exclamation-triangle-fill me-2"></i>Ingrese un ID de usuario válido.
            </div>
        `;
        return;
    }
    
    if (productInputs.length === 0) {
        formMessage.innerHTML = `
            <div class="alert alert-danger">
                <i class="bi bi-exclamation-triangle-fill me-2"></i>Agregue al menos un producto al carrito.
            </div>
        `;
        return;
    }
    
    // Recolectar productos
    const products = [];
    let hasError = false;
    
    productInputs.forEach((card, index) => {
        const productId = parseInt(card.querySelector('.product-id').value);
        const quantity = parseInt(card.querySelector('.product-quantity').value);
        
        if (isNaN(productId) || productId <= 0 || isNaN(quantity) || quantity <= 0) {
            formMessage.innerHTML = `
                <div class="alert alert-danger">
                    <i class="bi bi-exclamation-triangle-fill me-2"></i>Verifique los datos del producto ${index + 1}.
                </div>
            `;
            hasError = true;
            return;
        }
        
        products.push({
            productId: productId,
            quantity: quantity
        });
    });
    
    if (hasError) return;
    
    // Mostrar indicador de carga
    const submitBtn = document.querySelector('#addCartForm button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Guardando...';
    
    // Crear el objeto carrito según la estructura de la API
    const newCart = {
        userId: userId,
        date: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
        products: products
    };
    
    // Enviar la petición a la API
    fetch('https://fakestoreapi.com/carts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCart)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al guardar el carrito');
        }
        return response.json();
    })
    .then(data => {
        // Mostrar mensaje de éxito
        formMessage.innerHTML = `
            <div class="alert alert-success">
                <i class="bi bi-check-circle-fill me-2"></i>Carrito guardado exitosamente.
            </div>
        `;
        
        // Limpiar el formulario
        document.getElementById('addCartForm').reset();
        
        // Actualizar la lista de carritos después de 1.5 segundos
        setTimeout(() => {
            getCarts();
        }, 1500);
    })
    .catch(error => {
        console.error('Error:', error);
        formMessage.innerHTML = `
            <div class="alert alert-danger">
                <i class="bi bi-exclamation-triangle-fill me-2"></i>Error al guardar el carrito: ${error.message}
            </div>
        `;
    })
    .finally(() => {
        // Restaurar el botón
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    });
}
