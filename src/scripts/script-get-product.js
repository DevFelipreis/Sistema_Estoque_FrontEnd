document.getElementById('listaForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    try {
        document.getElementById('serverMessage').innerText = '';
        const response = await fetch('http://localhost:3000/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        if (response.ok) {
            if (data.length > 0) {
                const productsText = data.map(product => {
                    return `ID: ${product.id},\nNome: ${product.nome},\nPreço: ${product.preco},\nQuantidade: ${product.quantidade},\nCategoria_nome: ${product.categoria_nome},\nDescrição: ${product.descricao}`;
                });
                document.getElementById('serverResponse').innerText = productsText;
            } else {
                document.getElementById('serverResponse').innerText = 'Nenhum produto encontrado.';
            }

        } else {
            throw new Error(data.message || 'Erro ao listar os produtos');
        }
    } catch (error) {
        alert('Erro ao listar os produtos: ' + error.message);
    }
});