document.getElementById('cadastroForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const formObject = {};

    formData.forEach((value, key) => {
        formObject[key] = value;
    });


    const token = localStorage.getItem('token');

    if (!token) {
        alert('Necessário realizar o login para entrar no sistema.');
        window.location.href = './index.html';
        return;
    }

    localStorage.setItem('profissao_id', data.usuario.profissao);

    if(data.usuario.profissao !== 'administrador') {
        alert('Necessário realizar o login para entrar no sistema.');
        window.location.href = './login-user.html';
        return
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formObject)
    };

    try {
        const response = await fetch('https://sistema-estoque-nsv6.onrender.com/users', requestOptions);

        if (!response.ok) {
            const contentType = response.headers.get('Content-Type');
            let errorMessage = 'Erro ao cadastrar o usuário';

            if (contentType && contentType.indexOf('application/json') !== -1) {
                const data = await response.json();
                errorMessage = data.message || errorMessage;
            } else {
                const text = await response.text();
                errorMessage = `Unexpected response: ${text}`;
            }

            throw new Error(errorMessage);
        }

        const data = await response.json();

        if (data && data.usuario) {
            const user = data.usuario;
            const userText = `Codigo: ${user.id},\nNome: ${user.nome},\nUsername: ${user.username},\nEmail: ${user.email},\nProfissao: ${user.profissao},\nStatus_da_conta: ${user.ativo}`;
            alert('Usuário criado com sucesso!');
            document.getElementById('serverResponse').value = userText;
        }
    } catch (error) {
        console.error('Erro ao cadastrar o usuário:', error);
        alert('Erro ao cadastrar o usuário: ' + error.message);
        document.getElementById('serverResponse').value = 'Erro: ' + error.message;
    }
});
