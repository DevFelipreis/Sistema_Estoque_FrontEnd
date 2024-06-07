document.getElementById('entradaForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const formObject = {};

    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formObject)
    };

    try {
        const response = await fetch('https://sistema-estoque-nsv6.onrender.com/products', requestOptions);
        const data = await response.json();

        if (response.ok) {
            if (data.productEntry) {
                const product = JSON.parse(data.productEntry);
                const productText = `ID: ${product.id},\nNome: ${product.nome},\nPreço: ${product.preco},\nQuantidade: ${product.quantidade},
                \nCategoria: ${product.categoria_id},\nDescrição: ${product.descricao}`;
                alert('Entrada de produto realizada com sucesso!');
                document.getElementById('serverResponse').value = productText;
            } else {
                document.getElementById('serverResponse').value = 'Nenhum produto encontrado.';
            }
        } else {
            throw new Error(data.message || 'Erro ao listar os produtos');
        }
    } catch (error) {
        alert('Erro ao listar os produtos: ' + error.message);
        document.getElementById('serverResponse').value = 'Erro: ' + error.message;
    }
});
