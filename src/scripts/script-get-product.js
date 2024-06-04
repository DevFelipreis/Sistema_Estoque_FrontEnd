document.getElementById('listaForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData))
    };

    try {
        document.getElementById('serverMessage').innerText = '';
        const response = await fetch('http://localhost:3000/products', requestOptions);
        const data = await response.json();

        if (response.ok) {
            alert('Sucesso!');
            document.getElementById('serverMessage').innerText = data.message;
        } else {
            throw new Error(data.message || 'Erro ao listar o produto');
        }
    } catch (error) {
        alert('Erro ao listar o produto: ' + error.message);
    }
});

