document.getElementById('cadastroForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    console.log('Formulário enviado');

    const formData = new FormData(this);
    const formObject = {};

    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    const token = localStorage.getItem('token');

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formObject)
    };

    if (!token) {
        alert('Necessário realizar o login para entrar no sistema.');
        window.location.href = './index.html';
        return;
    }

    try {
        const response = await fetch('https://sistema-estoque-nsv6.onrender.com/user', requestOptions);
        const data = await response.json();

        if (response.ok) {
            if (data) {
                const userText = `ID: ${data.id},\nNome: ${data.nome},\nUsername: ${data.username},\nEmail: ${data.email},\nProfissao: ${data.profissao_id},\nAtivo: ${data.status_conta}`;
                alert('Usuário criado com sucesso!');
                document.getElementById('serverResponse').value = userText;
            }
        } else {
            throw new Error(data.message || 'Erro ao cadastrar o usuário');
        }
    } catch (error) {
        alert('Erro ao cadastrar o usuário: ' + error.message);
        document.getElementById('serverResponse').value = 'Erro: ' + error.message;
        window.location.href = './index.html';
        return;
    }
});
