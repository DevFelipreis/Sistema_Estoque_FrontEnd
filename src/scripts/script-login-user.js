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
            window.location.href = './choose-user.html';
        } else {
            throw new Error(data.message || 'Erro ao fazer login');
        };
    } catch (error) {
        alert('Erro ao fazer login: ' + error.message);
    };
});
