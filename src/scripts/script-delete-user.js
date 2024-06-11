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
        return;
    }

    try {
        const response = await fetch('https://sistema-estoque-nsv6.onrender.com/users', requestOptions);

        if (response.ok) {
            if (response.status === 204) {
                alert('Produto excluído com sucesso!');
                document.getElementById('serverResponse').value = 'Produto excluído com sucesso!';
            } else {
                const data = await response.json();
                alert('Produto excluído com sucesso!');
                document.getElementById('serverResponse').value = data.message;
            }
        } else {
            const contentType = response.headers.get('Content-Type');
            let errorMessage = 'Erro ao apagar o produto';

            if (contentType && contentType.indexOf('application/json') !== -1) {
                const data = await response.json();
                errorMessage = data.message || errorMessage;
            } else {
                const text = await response.text();
                errorMessage = `Unexpected response: ${text}`;
            }

            throw new Error(errorMessage);
        }
    } catch (error) {
        alert('Erro ao apagar usuário: ' + error.message);
        document.getElementById('serverResponse').value = error.message;
    }
});
