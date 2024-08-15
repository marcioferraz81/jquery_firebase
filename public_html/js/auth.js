// Configuração do Firebase
var firebaseConfig = {
    apiKey: "AIzaSyCdbpkmfscLRr9B0C6L1LyKlLfHeXORHR8",
    authDomain: "projetohtml-38b2c.firebaseapp.com",
    databaseURL: "https://projetohtml-38b2c-default-rtdb.firebaseio.com/",
    projectId: "projetohtml-38b2c",
    storageBucket: "projetohtml-38b2c.appspot.com",
    messagingSenderId: "240692919421",
    appId: "1:240692919421:web:948ccec9980e5ea9000514"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Referência à autenticação
var auth = firebase.auth();



// Registro de usuário
$('#register-btn').click(function () {
    var email = $('#login-email').val();
    var password = $('#login-password').val();
    auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                alert("Usuário registrado com sucesso!");
            })
            .catch((error) => {
                alert(error.message);
            });
});

// Login de usuário
$('#login-btn').click(function () {
    var email = $('#login-email').val();
    var password = $('#login-password').val();
    auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                alert("Login realizado com sucesso!");
            })
            .catch((error) => {
                alert(error.message);
            });
});

// Logout de usuário
$('#logout-btn').click(function () {
    auth.signOut().then(() => {
        alert("Logout realizado com sucesso!");
    });
});

// Função de autenticação
function autenticacao() {
    auth.onAuthStateChanged(function (user) {
        if (user) {
            $('#auth-container').hide();
            $('#app').show();
            listarDados();
        } else {
            $('#auth-container').show();
            $('#app').hide();
        }
    });
}
// Chama a função para verificar o estado da autenticação
autenticacao();