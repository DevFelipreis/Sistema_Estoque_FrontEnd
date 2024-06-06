document.getElementById('listaForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const id = document.getElementById('id').value;
    const nome = document.getElementById('nome').value;
    const categoria_id = document.getElementById('categoria_id').value;
    console.log(id, nome, categoria_id);

    const queryParams = new URLSearchParams();
    if (id) queryParams.append('id', id);
    if (nome) queryParams.append('nome', nome);
    if (categoria_id) queryParams.append('categoria_id', categoria_id);

    try {
        document.getElementById('serverMessage').innerText = '';
        const response = await fetch(`https://sistema-estoque-nsv6.onrender.com/products${queryParams.toString()}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        const data = await response.json();

        if (response.ok) {
            if (Array.isArray(data) && data.length > 0) {
                const productsText = data.map(product => {
                    return `ID: ${product.id},\nNome: ${product.nome},\nPreço: ${product.preco},\nQuantidade: ${product.quantidade},
                    \nCategoria: ${product.categoria_nome},\nDescrição: ${product.descricao}`;
                }).join('\n\n');
                document.getElementById('serverResponse').value = productsText;
            } else if (data.id) {
                const productText = `ID: ${data.id},\nNome: ${data.nome},\nPreço: ${data.preco},\nQuantidade: ${data.quantidade},
                \nCategoria: ${data.categoria_nome},\nDescrição: ${data.descricao}`;
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
