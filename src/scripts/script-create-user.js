document.getElementById('cadastroForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const formObject = {};

    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    console.log("Form Data:", formObject); // Debugging statement

    const token = localStorage.getItem('token');

    if (!token) {
        alert('Necessário realizar o login para entrar no sistema.');
        window.location.href = './index.html';
        return;
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

        if (data) {
            const userText = `ID: ${data.id},\nNome: ${data.nome},\nUsername: ${data.username},\nEmail: ${data.email},\nProfissao: ${data.profissao_id},\nAtivo: ${data.status_conta}`;
            alert('Usuário criado com sucesso!');
            document.getElementById('serverResponse').value = userText;
        }
    } catch (error) {
        console.error('Erro ao cadastrar o usuário:', error);
        alert('Erro ao cadastrar o usuário: ' + error.message);
        document.getElementById('serverResponse').value = 'Erro: ' + error.message;
    }
});
