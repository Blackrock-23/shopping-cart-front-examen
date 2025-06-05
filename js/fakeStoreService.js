// Servicio para interactuar con FakeStoreAPI
const BASE_URL = 'https://fakestoreapi.com';

async function addProduct(productData) {
    try {
        const response = await fetch(`${BASE_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });
        
        if (!response.ok) {
            throw new Error('Error al agregar el producto');
        }
        
        return await response.json();
    } catch (error) {
        throw new Error(`Error al agregar el producto: ${error.message}`);
    }
}

async function addCart(cartData) {
    try {
        const response = await fetch(`${BASE_URL}/carts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cartData)
        });
        
        if (!response.ok) {
            throw new Error('Error al agregar el carrito');
        }
        
        return await response.json();
    } catch (error) {
        throw new Error(`Error al agregar el carrito: ${error.message}`);
    }
}

async function addUser(userData) {
    try {
        const response = await fetch(`${BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        if (!response.ok) {
            throw new Error('Error al agregar el usuario');
        }
        
        return await response.json();
    } catch (error) {
        throw new Error(`Error al agregar el usuario: ${error.message}`);
    }
}

export { addProduct, addCart, addUser };
