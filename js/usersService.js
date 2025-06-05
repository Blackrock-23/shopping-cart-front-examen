document.addEventListener('DOMContentLoaded', function() {
    loadUsers();
    
    // Evento para guardar nuevo usuario
    document.getElementById('saveUser').addEventListener('click', function() {
        const userData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            role: document.getElementById('role').value
        };

        // Aquí iría la lógica para guardar el usuario en la API
        console.log('Nuevo usuario:', userData);
        
        // Cerrar el modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('addUserModal'));
        modal.hide();
        
        // Recargar la lista de usuarios
        loadUsers();
    });
});

function loadUsers() {
    // Usar productos como ejemplo ya que la API no tiene endpoint de usuarios
    fetch(`${API_URL}/products`)
        .then(response => response.json())
        .then(products => {
            const table = document.getElementById('usersTable');
            
            // Construir la tabla de productos (usando productos como ejemplo)
            const tableHtml = `
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Categoría</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${products.map(product => `
                            <tr>
                                <td>${product.title}</td>
                                <td>$${product.price}</td>
                                <td>${product.category}</td>
                                <td>
                                    <div class="btn-group">
                                        <button class="btn btn-sm btn-outline-primary" title="Ver detalles">
                                            <i class="bi bi-eye"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
            
            table.innerHTML = tableHtml;
        })
        .catch(error => {
            console.error('Error al cargar productos:', error);
            const table = document.getElementById('usersTable');
            table.innerHTML = '<div class="alert alert-danger">Error al cargar la lista de productos.</div>';
        });
}
