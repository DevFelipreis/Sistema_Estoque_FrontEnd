document.getElementById('cadastroForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData))
    };
    try {
        const response = await fetch('https://sistema-estoque-nsv6.onrender.com/products', requestOptions);
        const data = await response.json();

        if (response.ok) {
            alert('Produto cadastrado com sucesso!');
            document.getElementById('serverResponse').value = data.message;
        } else {
            throw new Error(data.message || 'Erro ao adicionar o produto');
        }
    } catch (error) {
        alert('Erro ao adicionar o produto: ' + error.message);
        document.getElementById('serverResponse').value = error.message;
    }

});


