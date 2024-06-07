document.getElementById('atualizarForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {};

    formData.forEach((value, key) => {
        if (value) {
            data[key] = value;
        }
    });

    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

    };

    try {
        document.getElementById('serverMessage').innerText = '';
        const response = await fetch('https://sistema-estoque-nsv6.onrender.com/products', requestOptions);
        const responseData = await response.json();

        if (response.ok) {
            alert('Produto criado com sucesso!');
            document.getElementById('serverResponse').value = responseData.message;

        } else {
            throw new Error(responseData.message || 'Erro ao atualizar produto');
        }
    } catch (error) {
        alert('Erro ao atualizar produto: ' + error.message);
        document.getElementById('serverResponse').value = 'Erro: ' + error.message;
    }
});
