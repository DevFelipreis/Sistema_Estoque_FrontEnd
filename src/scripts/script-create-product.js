document.getElementById('cadastroForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    console.log('Formulário enviado');

    const formData = new FormData(this);
    const formObject = {};

    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formObject)
    };

    try {
        const response = await fetch('https://sistema-estoque-nsv6.onrender.com/products', requestOptions);

        const data = await response.json();

        if (response.ok) {
            if (data) {
                const product = JSON.parse(data);
                const productText = `ID: ${product.id},\nNome: ${product.nome},\nPreço: ${product.preco},\nQuantidade: ${product.quantidade},
                \nCategoria: ${product.categoria_id},\nDescrição: ${product.descricao}`;
                alert('Produto criado com sucesso!');
                document.getElementById('serverResponse').value = productText;
            }
        } else {
            throw new Error(data.message || 'Erro ao cadastrar o produto');
        }
    } catch (error) {
        console.error('Erro ao cadastrar o produto:', error);
        alert('Erro ao cadastrar o produto: ' + error.message);
        document.getElementById('serverResponse').value = 'Erro: ' + error.message;
    }
});
