document.getElementById('deleteForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    const token = localStorage.getItem('token');

    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(Object.fromEntries(formData))
    };

    if (!token) {
        alert('Necessário realizar o login para entrar no sistema.');
        window.location.href = './login-user.html';
    };

    try {
        const response = await fetch('https://sistema-estoque-nsv6.onrender.com/products', requestOptions);
        const data = await response.json();

        if (response.ok) {
            alert('Produto excluído com sucesso!');
            document.getElementById('serverResponse').value = data.message;
        } else {
            throw new Error(data.message || 'Erro ao adicionar o produto');
        };
    } catch (error) {
        alert('Erro ao adicionar o produto: ' + error.message);
        document.getElementById('serverResponse').value = error.message;
    };
});

