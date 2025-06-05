// Ejecutar validación de token al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    tokenValidate();
    // Mostrar mensaje de bienvenida con animación
    showWelcomeMessage();
    // Inicializar contadores del dashboard
    updateDashboardCounters();
});

// URL base de la API (sin barra al final)
const API_URL = 'https://fakestoreapi.com';

// Función para actualizar los contadores del dashboard
function updateDashboardCounters() {
    // Actualizar contador de usuarios
    fetch(`${API_URL}/users`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(response => response.json())
        .then(users => {
            const userCount = users.length;
            document.getElementById('userCount').textContent = userCount || '0';
        })
        .catch(() => {
            document.getElementById('userCount').textContent = '0';
        });

    // Actualizar contador de productos
    fetch(`${API_URL}/products`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(response => response.json())
        .then(products => {
            const productCount = products.length;
            document.getElementById('productCount').textContent = productCount || '0';
            // Simular contadores de favoritos y actividad
            document.getElementById('favoriteCount').textContent = Math.floor(productCount / 3);
            document.getElementById('activityCount').textContent = Math.floor(Math.random() * 100);
        })
        .catch(() => {
            document.getElementById('productCount').textContent = '0';
            document.getElementById('favoriteCount').textContent = '0';
            document.getElementById('activityCount').textContent = '0';
        });

    // Actualizar fecha y hora
    document.getElementById('lastUpdate').textContent = new Date().toLocaleString();
}

// Función para mostrar mensaje de bienvenida
function showWelcomeMessage() {
    const infoElement = document.getElementById('info');
    infoElement.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <h4 class="alert-heading">¡Bienvenido al panel de administración!</h4>
            <p>Selecciona una opción del menú para comenzar a trabajar.</p>
            <hr>
            <p class="mb-0">Tienes acceso a la gestión de usuarios y productos.</p>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        
        <div class="row mt-4">
            <div class="col-md-6">
                <div class="card mb-4 h-100">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="mb-0"><i class="bi bi-people me-2"></i>Usuarios</h5>
                        <span class="badge bg-primary rounded-pill" id="userBadge">0</span>
                    </div>
                    <div class="card-body">
                        <p class="card-text">Gestiona los usuarios del sistema. Puedes ver, editar y administrar todos los usuarios registrados.</p>
                        <div class="d-grid">
                            <button class="btn btn-primary" onclick="getUsers()">
                                <i class="bi bi-list-ul me-2"></i>Ver usuarios
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card mb-4 h-100">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="mb-0"><i class="bi bi-box-seam me-2"></i>Productos</h5>
                        <span class="badge bg-success rounded-pill" id="productBadge">0</span>
                    </div>
                    <div class="card-body">
                        <p class="card-text">Administra el catálogo de productos. Puedes visualizar, modificar y gestionar el inventario completo.</p>
                        <div class="d-grid">
                            <button class="btn btn-success" onclick="getProducts()">
                                <i class="bi bi-grid-3x3-gap me-2"></i>Ver productos
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row mt-2">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0"><i class="bi bi-activity me-2"></i>Actividad reciente</h5>
                    </div>
                    <div class="card-body p-0">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <i class="bi bi-person-plus text-success me-2"></i>
                                    <span>Nuevo usuario registrado</span>
                                </div>
                                <span class="text-muted small">Hace 5 minutos</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <i class="bi bi-box-seam text-primary me-2"></i>
                                    <span>Producto actualizado</span>
                                </div>
                                <span class="text-muted small">Hace 2 horas</span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <i class="bi bi-heart text-danger me-2"></i>
                                    <span>Nuevo producto añadido a favoritos</span>
                                </div>
                                <span class="text-muted small">Hace 1 día</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Actualizar los badges de usuarios y productos
    fetch(`${API_URL}/users`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(response => response.json())
        .then(users => {
            document.getElementById('userBadge').textContent = users.length || '0';
        });

    fetch(`${API_URL}/products`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(response => response.json())
        .then(products => {
            document.getElementById('productBadge').textContent = products.length || '0';
        });

    // Actualizar los contadores del dashboard
    updateDashboardCounters();
}

// Función para obtener y mostrar usuarios
function getUsers() {
    document.getElementById('cardHeader').innerHTML = '<h4 class="mb-0"><i class="bi bi-people me-2"></i>Listado de usuarios</h4>';

    // Mostrar indicador de carga
    document.getElementById('info').innerHTML = `
        <div class="d-flex justify-content-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Cargando...</span>
            </div>
        </div>
    `;

    fetch(`${API_URL}/users`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener usuarios');
            }
            return response.json();
        })
        .then(users => {
            if (!users || users.length === 0) {
                document.getElementById('info').innerHTML = `
                <div class="alert alert-warning" role="alert">
                    <h4 class="alert-heading">No se encontraron usuarios</h4>
                    <p>No hay usuarios disponibles en este momento.</p>
                    <button class="btn btn-sm btn-outline-secondary" onclick="showWelcomeMessage()">Volver</button>
                </div>
            `;
                return;
            }

            let listUsers = `
        <div class="d-flex justify-content-between mb-3">
            <h5>Total usuarios: ${users.length}</h5>
            <button class="btn btn-sm btn-primary" onclick="showAddUserForm()">
                <i class="bi bi-plus-circle me-1"></i>Añadir usuario
            </button>
            <button class="btn btn-sm btn-outline-secondary" onclick="showWelcomeMessage()">Volver</button>
        </div>
        <div class="table-responsive">
            <table class="table table-hover table-striped">
                <thead class="table-light">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Email</th>
                        <th scope="col">Rol</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
        `;

            users.forEach(user => {
                // Formatear el nombre completo del usuario
                const fullName = user.name ? 
                    (user.name.firstname && user.name.lastname ? 
                        `${user.name.firstname} ${user.name.lastname}` : 
                        (typeof user.name === 'string' ? user.name : 'Usuario sin nombre')
                    ) : 'Usuario sin nombre';
                
                // Formatear el nombre para mostrar con la primera letra en mayúscula
                const formattedName = fullName
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
                
                listUsers += `
                <tr>
                    <td>${user.id}</td>
                    <td>
                        <div class="d-flex align-items-center">
                            <div class="avatar-circle me-2 bg-light d-flex align-items-center justify-content-center" style="width: 32px; height: 32px; border-radius: 50%;">
                                <span class="initials text-primary">${formattedName.charAt(0)}</span>
                            </div>
                            <span>${formattedName}</span>
                        </div>
                    </td>
                    <td>${user.email}</td>
                    <td><span class="badge bg-primary">${user.role || 'Usuario'}</span></td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary" onclick="showUserDetails(${user.id})">
                            <i class="bi bi-eye me-1"></i>Ver
                        </button>
                    </td>
                </tr>
            `;
            });

            listUsers += `
                </tbody>
            </table>
        </div>
        `;

            document.getElementById('info').innerHTML = listUsers;
        })
        .catch(error => {
            document.getElementById('info').innerHTML = `
            <div class="alert alert-danger" role="alert">
                <h4 class="alert-heading">Error al cargar usuarios</h4>
                <p>${error.message || 'Ocurrió un error inesperado'}</p>
                <button class="btn btn-sm btn-outline-secondary" onclick="showWelcomeMessage()">Volver</button>
            </div>
        `;
        });
}

// Función para cargar una página específica de usuarios
function loadUserPage(page) {
    document.getElementById('info').innerHTML = `
        <div class="d-flex justify-content-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Cargando...</span>
            </div>
        </div>
    `;

    fetch(`${API_URL}/users?offset=${(page - 1) * 10}&limit=10`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener usuarios');
            }
            return response.json();
        })
        .then(users => {
            // Obtener el total de usuarios para calcular la paginación
            fetch(`${API_URL}/users`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            })
                .then(response => response.json())
                .then(allUsers => {
                    const totalUsers = allUsers.length;
                    const totalPages = Math.ceil(totalUsers / 10);

                    let listUsers = `
            <div class="d-flex justify-content-between mb-3">
                <div>
                    <h5>Total usuarios: ${totalUsers}</h5>
                    <button class="btn btn-sm btn-primary" onclick="showAddUserForm()">
                        <i class="bi bi-plus-circle me-1"></i>Añadir usuario
                    </button>
                </div>
                <button class="btn btn-sm btn-outline-secondary" onclick="showWelcomeMessage()">Volver</button>
            </div>
            <div class="table-responsive">
                <table class="table table-hover table-striped">
                    <thead class="table-light">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Email</th>
                            <th scope="col">Rol</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

                    users.forEach(user => {
                        listUsers += `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td><span class="badge bg-primary">${user.role || 'Usuario'}</span></td>
                        <td>
                            <button class="btn btn-sm btn-outline-primary" onclick="showUserDetails(${user.id})">
                                <i class="bi bi-eye me-1"></i>Ver
                            </button>
                        </td>
                    </tr>
                `;
                    });

                    listUsers += `
                    </tbody>
                </table>
            </div>
            <nav aria-label="Page navigation" class="mt-3">
                <ul class="pagination justify-content-center">
                    <li class="page-item ${page === 1 ? 'disabled' : ''}">
                        <a class="page-link" href="#" onclick="loadUserPage(${page - 1})">Anterior</a>
                    </li>
                    <li class="page-item active"><a class="page-link" href="#">${page}</a></li>
                    <li class="page-item ${page === totalPages ? 'disabled' : ''}">
                        <a class="page-link" href="#" onclick="loadUserPage(${page + 1})">Siguiente</a>
                    </li>
                </ul>
            </nav>
            `;

                    document.getElementById('info').innerHTML = listUsers;
                });
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('info').innerHTML = `
            <div class="alert alert-danger" role="alert">
                <h4 class="alert-heading">Error al cargar usuarios</h4>
                <p>${error.message || 'Ocurrió un error inesperado'}</p>
                <button class="btn btn-sm btn-outline-secondary" onclick="showWelcomeMessage()">Volver</button>
            </div>
        `;
    });

// Función para agregar un nuevo usuario
function showAddUserForm() {
    document.getElementById('info').innerHTML = `
        <div class="card shadow">
            <div class="card-header bg-success text-white">
                <h5 class="mb-0">Añadir nuevo usuario</h5>
            </div>
            <div class="card-body">
                <form id="addUserForm">
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="newFirstName" class="form-label">Nombre</label>
                            <input type="text" class="form-control" id="newFirstName" required>
                        </div>
                        <div class="col-md-6">
                            <label for="newLastName" class="form-label">Apellido</label>
                            <input type="text" class="form-control" id="newLastName" required>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="newEmail" class="form-label">Email</label>
                        <input type="email" class="form-control" id="newEmail" required>
                    </div>
                    <div class="mb-3">
                        <label for="newUsername" class="form-label">Nombre de usuario</label>
                        <input type="text" class="form-control" id="newUsername" required>
                    </div>
                    <div class="mb-3">
                        <label for="newPassword" class="form-label">Contraseña</label>
                        <input type="password" class="form-control" id="newPassword" required>
                    </div>
                    <div class="d-flex justify-content-between">
                        <button type="button" class="btn btn-secondary" onclick="getUsers()">Cancelar</button>
                        <button type="button" class="btn btn-success" onclick="addUser()">Crear usuario</button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

// Función para crear un nuevo usuario
function addUser() {
    const firstName = document.getElementById('newFirstName').value;
    const lastName = document.getElementById('newLastName').value;
    const email = document.getElementById('newEmail').value;
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;
    
    document.getElementById('info').innerHTML = `
        <div class="d-flex justify-content-center">
            <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Creando usuario...</span>
            </div>
        </div>
    `;
    
    fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            name: `${firstName} ${lastName}`,
            username: username,
            email: email,
            password: password,
            phone: "",
            address: {
                street: "",
                suite: "",
                city: "",
                zipcode: "",
                geo: {
                    lat: "0",
                    lng: "0"
                }
            },
            company: {
                name: "",
                catchPhrase: "",
                bs: ""
            }
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al crear el usuario');
        }
        return response.json();
    })
    .then(data => {
        // Mostrar mensaje de éxito
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-success alert-dismissible fade show position-fixed top-0 end-0 m-3';
        alertDiv.setAttribute('role', 'alert');
        alertDiv.innerHTML = `
            <strong>¡Éxito!</strong> Usuario creado correctamente con ID: ${data.id}.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        document.body.appendChild(alertDiv);
        
        // Eliminar alerta después de 3 segundos
        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
        
        // Volver a la lista de usuarios
        getUsers();
    })
    .catch(error => {
        document.getElementById('info').innerHTML = `
            <div class="alert alert-danger" role="alert">
                <h4 class="alert-heading">Error al crear el usuario</h4>
                <p>${error.message || 'Ocurrió un error inesperado'}</p>
                <button class="btn btn-primary" onclick="getUsers()">Volver a la lista</button>
            </div>
        `;
    });
}

    // Mostrar formulario para agregar nuevo usuario
    const addUserForm = `
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <h4 class="mb-3">Agregar nuevo usuario</h4>
                <form id="addUserForm">
                    <div class="mb-3">
                        <label for="name" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="name" name="name" required>
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Correo electrónico</label>
                        <input type="email" class="form-control" id="email" name="email" required>
                    </div>
                    <div class="mb-3">
                        <label for="role" class="form-label">Rol</label>
                        <select class="form-select" id="role" name="role" required>
                            <option value="">Seleccione un rol</option>
                            <option value="admin">Administrador</option>
                            <option value="user">Usuario</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary">Agregar usuario</button>
                    <button type="button" class="btn btn-secondary" onclick="showWelcomeMessage()">Cancelar</button>
                </form>
            </div>
        </div>
    `;

    document.getElementById('info').innerHTML = addUserForm;

    // Agregar evento de envío del formulario
    document.getElementById('addUserForm').addEventListener('submit', (e) => {
        e.preventDefault();

        // Obtener datos del formulario
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const role = document.getElementById('role').value;

        // Enviar solicitud para agregar nuevo usuario
        fetch(`${API_URL}/users`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                role
            })
                listProducts += createProductCard(product);
            });

            listProducts += `
        </div>
        <nav aria-label="Page navigation" class="mt-3">
            <ul class="pagination justify-content-center">
                <li class="page-item ${page === 1 ? 'disabled' : ''}">
                    <a class="page-link" href="#" onclick="loadProductPage(${page - 1})">Anterior</a>
                </li>
                <li class="page-item active"><a class="page-link" href="#">${page}</a></li>
                <li class="page-item ${page === totalPages ? 'disabled' : ''}">
                    <a class="page-link" href="#" onclick="loadProductPage(${page + 1})">Siguiente</a>
                </li>
            </ul>
        </nav>
        `;

            document.getElementById('info').innerHTML = listProducts;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('info').innerHTML = `
            <div class="alert alert-danger" role="alert">
                <h4 class="alert-heading">Error al cargar productos</h4>
                <p>${error.message || 'Ocurrió un error inesperado'}</p>
                <button class="btn btn-sm btn-outline-secondary" onclick="showWelcomeMessage()">Volver</button>
            </div>
        `;
        });
}

// Función para filtrar productos
function filterProducts() {
    // Obtener valores de filtro
    const searchText = document.getElementById('searchProductInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const sortOption = document.getElementById('sortProducts').value;

    // Obtener todos los productos
    const products = window.allProducts || [];

    // Filtrar productos
    let filteredProducts = products.filter(product => {
        // Filtrar por texto de búsqueda
        const matchesSearch = searchText === '' ||
            product.title.toLowerCase().includes(searchText) ||
            (product.description && product.description.toLowerCase().includes(searchText));

        // Filtrar por categoría (en fakestoreapi.com la categoría es un string)
        const matchesCategory = categoryFilter === '' || product.category === categoryFilter;

        return matchesSearch && matchesCategory;
    });

    // Ordenar productos
    if (sortOption !== 'default') {
        filteredProducts.sort((a, b) => {
            switch (sortOption) {
                case 'price-asc':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                case 'name-asc':
                    return a.title.localeCompare(b.title);
                case 'name-desc':
                    return b.title.localeCompare(a.title);
                default:
                    return 0;
            }
        });
    }

    // Actualizar contenedor de productos
    const productsContainer = document.getElementById('productsContainer');
    if (productsContainer) {
        if (filteredProducts.length === 0) {
            productsContainer.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-info" role="alert">
                        <i class="bi bi-info-circle me-2"></i>
                        No se encontraron productos que coincidan con los criterios de búsqueda.
                    </div>
                </div>
            `;
        } else {
            let productsHTML = '';
            filteredProducts.forEach(product => {
                productsHTML += createProductCard(product);
            });
    // Mostrar indicador de carga en el modal
    document.getElementById('detailsModalLabel').textContent = 'Detalles del Usuario';
    document.getElementById('detailsModalBody').innerHTML = `
        <div class="d-flex justify-content-center my-4">
            <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Cargando...</span>
            </div>
        </div>
    `;

    // Mostrar el modal
    const detailsModal = new bootstrap.Modal(document.getElementById('detailsModal'));
    detailsModal.show();

    // Obtener detalles del producto desde la API
    fetch(`${API_URL}/products/${productId}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener detalles del producto');
            }
            return response.json();
        })
        .then(product => {
            // Generar estrellas de calificación basadas en el rating del producto o un valor aleatorio
            const rating = product.rating ? Math.round(product.rating.rate) : Math.floor(Math.random() * 5) + 1;
            let starsHtml = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= rating) {
                    starsHtml += '<i class="bi bi-star-fill text-warning"></i>';
                } else {
                    starsHtml += '<i class="bi bi-star text-warning"></i>';
                }
            }

            // Obtener la imagen o usar una imagen por defecto
            const imageUrl = product.image || 'https://via.placeholder.com/300';

            // Generar un color para la categoría
            const categoryColors = ['primary', 'success', 'info', 'warning', 'danger'];
            const colorIndex = Math.floor(Math.random() * categoryColors.length);
            const badgeColor = categoryColors[colorIndex];

            // Mostrar detalles del producto en el modal
            document.getElementById('detailsModalBody').innerHTML = `
            <div class="row">
                <div class="col-md-5">
                    <div class="text-center mb-3">
                        <img id="mainProductImage" src="${imageUrl}" class="img-fluid rounded shadow-sm" 
                             style="max-height: 250px; object-fit: contain;" alt="${product.title}">
                    </div>
                    <div class="d-flex justify-content-center align-items-center gap-2 mb-3">
                        <span class="badge bg-${badgeColor}">${product.category}</span>
                        <span class="badge bg-success">$${product.price}</span>
                    </div>
                    <div class="d-flex justify-content-center mb-3">
                        ${starsHtml} <span class="ms-2 text-muted">(${product.rating ? product.rating.count : Math.floor(Math.random() * 100) + 1} opiniones)</span>
                    </div>
                </div>
                <div class="col-md-7">
                    <h4 class="mb-3">${product.title}</h4>
                    <div class="mb-3">
                        <h6 class="text-muted mb-2">Descripción</h6>
                        <p class="text-justify">${product.description}</p>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <h6 class="text-muted mb-2">Información del producto</h6>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item d-flex justify-content-between px-0">
                                    <span>ID:</span>
                                    <span class="text-muted">${product.id}</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between px-0">
                                    <span>Categoría:</span>
                                    <span class="text-muted">${product.category}</span>
                                </li>
                                <li class="list-group-item d-flex justify-content-between px-0">
                                    <span>Precio:</span>
                                    <span class="text-success fw-bold">$${product.price}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <h6 class="text-muted mb-2">Disponibilidad</h6>
                            <div class="d-flex align-items-center mb-2">
                                <i class="bi bi-check-circle-fill me-2 text-success"></i>
                                <span>En stock</span>
                            </div>
                            <div class="d-flex align-items-center mb-2">
                                <i class="bi bi-truck me-2 text-primary"></i>
                                <span>Envío gratis</span>
                            </div>
                            <div class="d-flex align-items-center">
                                <i class="bi bi-shield-check me-2 text-primary"></i>
                                <span>Garantía de 12 meses</span>
                            </div>
                        </div>
                    </div>
                    <div class="mt-4 d-flex gap-2">
                        <div class="input-group me-3" style="max-width: 130px;">
                            <button class="btn btn-outline-secondary" type="button" onclick="decrementQuantity()">-</button>
                            <input type="number" class="form-control text-center" id="productQuantity" value="1" min="1" max="10">
                            <button class="btn btn-outline-secondary" type="button" onclick="incrementQuantity()">+</button>
                        </div>
                        <button class="btn btn-success flex-grow-1" onclick="addToCart(${product.id})">
                            <i class="bi bi-cart-plus me-1"></i>Agregar al carrito
                        </button>
                    </div>
                    <button class="btn btn-outline-secondary w-100 mt-3" data-bs-dismiss="modal">
                        <i class="bi bi-x-circle me-1"></i>Cerrar
                    </button>
                </div>
            </div>
        `;
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

// Esta función ya no es necesaria porque la hemos integrado directamente en getProducts

// Función para filtrar y ordenar productos
function filterProducts() {
    const searchTerm = document.getElementById('searchProductInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const sortOption = document.getElementById('sortProducts').value;

    // Obtener todos los productos
    const products = window.allProducts || [];

    // Filtrar productos
    let filteredProducts = products.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm);
        const matchesCategory = categoryFilter === '' || product.category === categoryFilter;

        return matchesSearch && matchesCategory;
    });

    // Ordenar productos
    switch (sortOption) {
        case 'price-asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'name-desc':
            filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
            break;
        default:
            // No ordenar
            break;
    }

    // Actualizar la vista
    const container = document.getElementById('productsContainer');
    if (container) {
        if (filteredProducts.length === 0) {
            container.innerHTML = `
            <div class="col-12 text-center py-5">
                <div class="alert alert-info">
                    <i class="bi bi-info-circle me-2"></i>
                    No se encontraron productos que coincidan con los criterios de búsqueda.
                </div>
            </div>
            `;
        } else {
            // Generar tarjetas de producto directamente
            container.innerHTML = filteredProducts.map(product => {
                // Asegurarse de que la descripción no sea demasiado larga
                const shortDescription = product.description ?
                    (product.description.length > 60 ? product.description.substring(0, 60) + '...' : product.description) :
                    'Sin descripción';
                
                // Obtener la imagen o usar una imagen por defecto
                const imageUrl = product.image || 'https://via.placeholder.com/150';
                
                // Generar un color aleatorio para el badge de categoría
                const badgeColor = getRandomColor();
                
                return `
                <div class="col">
                    <div class="card h-100 shadow-sm product-card">
                        <div class="position-relative">
                            <img src="${imageUrl}" class="card-img-top p-3" style="height: 200px; object-fit: contain;" alt="${product.title}">
                            <span class="position-absolute top-0 end-0 badge bg-${badgeColor} m-2">${product.category}</span>
                        </div>
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title mb-2">${product.title}</h5>
                            <p class="card-text text-muted small mb-3">${shortDescription}</p>
                            <div class="d-flex justify-content-between align-items-center mt-auto">
                                <span class="fw-bold text-success">$${product.price}</span>
                                <button class="btn btn-sm btn-outline-primary" onclick="showProductDetails(${product.id})">
                                    <i class="bi bi-eye me-1"></i>Ver detalles
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            }).join('');
        }
    }
}

// Funciones para incrementar y decrementar la cantidad de productos
function incrementQuantity() {
    const quantityInput = document.getElementById('productQuantity');
    const currentValue = parseInt(quantityInput.value);
    if (currentValue < 10) { // Establecemos un límite máximo de 10 unidades
        quantityInput.value = currentValue + 1;
    }
}

function decrementQuantity() {
    const quantityInput = document.getElementById('productQuantity');
    const currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) { // No permitimos valores menores a 1
        quantityInput.value = currentValue - 1;
    }
}

// Función simulada para agregar al carrito
function addToCart(productId) {
    // Obtener la cantidad seleccionada (si está disponible)
    let quantity = 1;
    const quantityInput = document.getElementById('productQuantity');
    if (quantityInput) {
        quantity = parseInt(quantityInput.value) || 1;
    }

    // Obtener información del producto (si está disponible en la ventana global)
    let productInfo = '';
    if (window.allProducts) {
        // Buscar el producto por ID en la lista global de productos
        // FakeStoreAPI devuelve IDs como números, asegurarse de convertir para la comparación
        const product = window.allProducts.find(p => p.id === productId || p.id === Number(productId));
        if (product) {
            productInfo = `<strong>${product.title}</strong>`;
        }
    }

    // Mostrar notificación de éxito
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success alert-dismissible fade show position-fixed bottom-0 end-0 m-3';
    alertDiv.setAttribute('role', 'alert');
    alertDiv.style.maxWidth = '350px';
    alertDiv.style.zIndex = '9999';
    alertDiv.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="bi bi-check-circle-fill me-2 fs-4"></i>
            <div>
                <div class="fw-bold">Producto agregado al carrito</div>
                <div class="small">${productInfo ? productInfo : `Producto #${productId}`} (${quantity} unidad${quantity > 1 ? 'es' : ''})</div>
            </div>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    document.body.appendChild(alertDiv);

    // Eliminar la alerta después de 3 segundos
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);

    // Actualizar el contador del carrito en el navbar (si existe)
    const cartCountBadge = document.getElementById('cartCountBadge');
    if (cartCountBadge) {
        const currentCount = parseInt(cartCountBadge.textContent) || 0;
        cartCountBadge.textContent = currentCount + quantity;
        cartCountBadge.classList.remove('d-none');
    }

    // Opcional: Guardar el carrito en localStorage para persistencia
    try {
        // Obtener el carrito actual o crear uno nuevo
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Buscar si el producto ya está en el carrito
        const existingItem = cart.find(item => item.productId === productId);
        
        if (existingItem) {
            // Si ya existe, incrementar la cantidad
            existingItem.quantity += quantity;
        } else {
            // Si no existe, agregar el nuevo item
            cart.push({
                productId: productId,
                quantity: quantity,
                dateAdded: new Date().toISOString()
            });
        }
        
        // Guardar el carrito actualizado
        localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
        console.error('Error al guardar el carrito:', error);
    }
}

// Función para determinar si un color es oscuro (para elegir texto blanco o negro)
function isColorDark(color) {
    // Convertir el color hexadecimal a RGB
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    // Calcular la luminosidad (fórmula estándar)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Si la luminosidad es menor a 0.5, el color es oscuro
    return luminance < 0.5;
}

// Función para mostrar favoritos
function showFavorites() {
    document.getElementById('cardHeader').innerHTML = '<h4 class="mb-0"><i class="bi bi-heart me-2"></i>Mis favoritos</h4>';
    document.getElementById('info').innerHTML = `
        <div class="card mb-4">
            <div class="card-body text-center py-5">
                <i class="bi bi-heart text-danger" style="font-size: 3rem;"></i>
                <h4 class="mt-3">¡Próximamente!</h4>
                <p class="text-muted">Estamos trabajando en esta funcionalidad para futuras actualizaciones.</p>
                <p class="text-muted">Pronto podrás guardar tus usuarios y productos favoritos para acceder rápidamente a ellos.</p>
                <button class="btn btn-primary mt-3" onclick="showWelcomeMessage()">
                    <i class="bi bi-arrow-left me-2"></i>Volver al inicio
                </button>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h5 class="mb-0">Características próximas</h5>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-4 mb-3">
                        <div class="d-flex align-items-center">
                            <i class="bi bi-bookmark-star text-primary me-3" style="font-size: 1.5rem;"></i>
                            <div>
                                <h6>Marcadores personalizados</h6>
                                <p class="text-muted small mb-0">Guarda tus elementos más utilizados</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-3">
                        <div class="d-flex align-items-center">
                            <i class="bi bi-bell text-warning me-3" style="font-size: 1.5rem;"></i>
                            <div>
                                <h6>Notificaciones</h6>
                                <p class="text-muted small mb-0">Recibe alertas de cambios importantes</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-3">
                        <div class="d-flex align-items-center">
                            <i class="bi bi-graph-up-arrow text-success me-3" style="font-size: 1.5rem;"></i>
                            <div>
                                <h6>Estadísticas avanzadas</h6>
                                <p class="text-muted small mb-0">Visualiza datos de rendimiento</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Función para cerrar sesión
function logout() {
    // Añadir confirmación antes de cerrar sesión
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        localStorage.removeItem('token');
        location.href = '../index.html';
    }
}

// Función para validar el token
function tokenValidate() {
    const TOKEN = localStorage.getItem('token');
    if (!TOKEN) {
        location.href = '../index.html';
        return;
    }
    console.log('Autenticado ', TOKEN);

    // Mostrar información del usuario en el dashboard si está disponible
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (userData && userData.name) {
        // Aquí podrías actualizar elementos de la UI con la información del usuario
        console.log('Usuario autenticado:', userData.name);
    }
}