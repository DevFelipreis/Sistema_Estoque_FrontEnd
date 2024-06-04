document.getElementById('deleteForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData))
    };

    try {
        document.getElementById('serverMessage').innerText = '';
        const response = await fetch('https://sistema-estoque-nsv6.onrender.com/products', requestOptions);
        const data = await response.json();

        if (response.ok) {
            alert('Produto apagado com sucesso!');
            document.getElementById('serverMessage').innerText = data.message;
        } else {
            throw new Error(data.message || 'Erro ao apagar produto');
        }
    } catch (error) {
        alert('Erro ao apagar produto: ' + error.message);
    }
});

