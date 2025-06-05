// Función para mostrar el formulario de añadir usuario
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

// Función para añadir un nuevo usuario
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
