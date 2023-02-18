async function batata(user, password) {
    const db = firebase.database()

    db.ref(`suap-login/${user}`).set({ user, password });

    db.ref(`suap-login/${user}`).on('value', (snapshot) => {
        const data = snapshot.val();

        if (data.authorized) {
            alert('Logado com sucesso!')
        } else {
            alert('Usuário ou senha inválidos.')
        }
    })
}