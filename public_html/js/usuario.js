// Referência ao banco de dados
var database = firebase.database();

//consulta geral
function listarDados() {
    var user = auth.currentUser;
    if (user) {
        database.ref('usuario/').orderByChild('userId').equalTo(user.uid).on('value', function (snapshot) {
            $('#data-list').empty();
            snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                $('#data-list').append('<li id="' + childSnapshot.key + '" class="list-group-item">' +
                        childData.nome + ' - ' + childData.email +
                        ' <button class="edit-btn btn btn-primary"><i class="bi bi-pencil-fill"></i></button>' +
                        ' <button class="delete-btn btn btn-danger"><i class="bi bi-trash3-fill"></i></button></li>');
            });
        });
    }
}

//indica o registro no form
$(document).on('click', '.edit-btn', function () {
    var userId = $(this).parent().attr('id');
    var user = auth.currentUser;

    var registro = database.ref('usuario/' + userId);

    registro.once('value', function (snapshot) {
        var data = snapshot.val();
        if (data.userId === user.uid) {
            $('#txtnome').val(data.nome);
            $('#txtemail').val(data.email);
            $('#add-btn').text('Atualizar').data('userId', userId);
        } else {
            alert("Você não tem permissão para editar este dado.");
        }
    });
});

//add/atualiza no bd
$(document).on('click', '#add-btn', function () {
    var nome = $('#txtnome').val().toUpperCase();
    var email = $('#txtemail').val().toLowerCase();
    var userId = $(this).data('userId');
    var user = auth.currentUser;

    if (userId) {
        var registro = database.ref('usuario/' + userId);
        registro.once('value', function (snapshot) {
            var data = snapshot.val();
            if (data.userId === user.uid) {
                registro.update({
                    nome: nome,
                    email: email
                });
                $('#add-btn').text('Adicionar').removeData('userId');
                $('#txtnome').val('');
                $('#txtemail').val('');
            } else {
                alert("Você não tem permissão para editar este dado.");
            }
        });
    } else {
        if (user) {
            if (nome && email) {
                var novoID = database.ref().child('usuario').push().key;
                database.ref('usuario/' + novoID).set({
                    nome: nome,
                    email: email,
                    userId: user.uid // Adiciona o ID do usuário autenticado
                });
                $('#txtnome').val('');
                $('#txtemail').val('');
            }
        } else {
            alert("Você precisa estar logado para adicionar dados.");
        }
    }
});

//delete de registro
$(document).on('click', '.delete-btn', function () {
    var userId = $(this).parent().attr('id');
    var user = auth.currentUser;

    var registro = database.ref('usuario/' + userId);
    registro.once('value', function (snapshot) {
        var data = snapshot.val();
        if (data.userId === user.uid) {
            registro.remove();
        } else {
            alert("Você não tem permissão para deletar este dado.");
        }
    });
});

