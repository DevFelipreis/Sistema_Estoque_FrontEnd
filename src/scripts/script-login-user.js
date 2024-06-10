document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const token = localStorage.getItem('token');

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(Object.fromEntries(formData))
    };

    try {
        const response = await fetch('https://sistema-estoque-nsv6.onrender.com/login', requestOptions);
        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('profissao_id', data.usuario.profissao);

            if (!data.usuario.ativo) {
                alert('Conta inativa, entre em contato com o administrador');
            } else {
                switch (data.usuario.profissao) {
                    case 'administrador':
                        window.location.href = './choose-admin.html';
                        break;
                    case 'gerente':
                        window.location.href = './choose-manager.html';
                        break;
                    case 'vendedor':
                        window.location.href = './choose-seller.html';
                        break;
                    case 'conferente':
                        window.location.href = './choose-seller.html';
                        break;
                    case 'separador':
                        window.location.href = './choose-separator.html';
                        break;
                    case 'encarregado':
                        window.location.href = './choose-in-charge.html';
                        break;
                    default:
                        alert('Profissão desconhecida.');
                }
            }
        } else {
            document.getElementById('serverMessageLogin').innerText = data.message || 'Erro ao fazer login.';
        }

    } catch (error) {
        alert('Erro ao fazer login: ' + error.message);
    }
});
