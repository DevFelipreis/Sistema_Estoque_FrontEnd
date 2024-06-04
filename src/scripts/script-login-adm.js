document.getElementById('loginForm').addEventListener('submit', async function (event) {
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
        document.getElementById('serverMessageLogin').innerText = '';
        const response = await fetch('https://sistema-estoque-nsv6.onrender.com/login/admin', requestOptions);
        const data = await response.json();

        if (response.ok) {
            alert('Login efetuado com sucesso!');
            document.getElementById('serverMessageLogin').innerText = data.message;
            window.location.href = './choose-user.html';
        } else {
            throw new Error(data.message || 'Erro ao fazer login');
        }
    } catch (error) {
        alert('Erro fazer login: ' + error.message);
    }
});
