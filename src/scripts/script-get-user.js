document.getElementById('listaForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const id = document.getElementById('id').value.trim();
    const nome = document.getElementById('nome').value.trim().toLowerCase();
    const username = document.getElementById('username').value.trim().toLowerCase();
    const profissao_id = document.getElementById('profissao_id').value.trim();

    const queryParams = new URLSearchParams();
    if (id) queryParams.append('id', id);
    if (nome) queryParams.append('nome', nome);
    if (username) queryParams.append('username', username);
    if (profissao_id) queryParams.append('profissao_id', profissao_id);

    const token = localStorage.getItem('token');

    try {
        document.getElementById('serverMessage').innerText = '';
        if (!token) {
            alert('Necessário realizar o login para entrar no sistema.');
            window.location.href = './login-user.html';
            return;
        };

        const response = await fetch(`https://sistema-estoque-nsv6.onrender.com/users?${queryParams.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            if (Array.isArray(data) && data.length > 0) {
                const usersText = data.map(user => {
                    const ultimoLogin = user.ultimo_login ? new Date(user.ultimo_login).toLocaleString() : 'N/A'; // Converte para formato local ou mostra 'N/A' se undefined
                    return `ID: ${user.id},\nNome: ${user.nome},\nEmail: ${user.email},\nCargo: ${user.profissao},\nStatus_Conta: ${user.ativo},\nUltimo_login: ${ultimoLogin}`;
                }).join('\n______________________________\n');
                document.getElementById('serverResponse').value = usersText;
            } else {
                document.getElementById('serverResponse').value = 'Nenhum usuário encontrado.';
            };
        } else {
            throw new Error(data.message || 'Erro ao listar os usuários');
        };
    } catch (error) {
        alert('Erro ao listar os usuários: ' + error.message);
        document.getElementById('serverResponse').value = 'Erro: ' + error.message;
    };
});
