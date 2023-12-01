// get users
function get_users_data() {
    fetch('api/users')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('get_users_data').textContent = JSON.stringify(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation of users:', error);
        });
}
document.getElementById('get_users_button').addEventListener('click', get_users_data);

// get user
function get_user_data(user_id) {
    fetch(`api/users/${user_id}`)
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    throw new Error(error.message);
                });
            }
            document.getElementById('get_user_data').textContent = JSON.stringify(data);
        })
        .catch(error => {
            document.getElementById('get_user_data').textContent = error.message;
        });
}
// event lisnter for get user button
document.getElementById('get_user_button').addEventListener('click', function () {
    var user_id = document.getElementById('user_id_input').value;
    get_user_data(user_id);
});

// post user
function post_user(user_name, user_email) {
    fetch('api/users',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user_email, username: user_name })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return document.getElementById('post_user-creation_action_response').textContent = 'User created successfully!';
        })
        .catch(error => {
            error.json().then(error => {
                document.getElementById('post_user-creation_action_response').textContent = error.message;
            })
        });
}
// event lisnter for post user button
document.getElementById('create_user_button').addEventListener('click', function () {
    var user_name = document.getElementById('user_name_input-post').value;
    var user_email = document.getElementById('user_email_input-post').value;
    post_user(user_name, user_email);
});

// update user
function put_user(user_name, user_email, user_id) {
    fetch(`api/users/${user_id}`,
        {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user_email, username: user_name })
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    throw new Error(error.message);
                });
            }
            return document.getElementById('put_user-update_action_response').textContent = 'User updated successfully!';
        })
        .catch(error => {
            document.getElementById('put_user-update_action_response').textContent = error.message;
        });
}
// event lisnter for put user button
document.getElementById('update_user_button').addEventListener('click', function () {
    var user_name = document.getElementById('user_name_input-put').value;
    var user_email = document.getElementById('user_email_input-put').value;
    var user_id = document.getElementById('user_id_input-put').value;
    put_user(user_name, user_email, user_id);
});

// delete user
function delete_user(user_id) {
    fetch(`api/users/${user_id}`, { method: 'DELETE' })
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    throw new Error(error.message);
                });
            }
            document.getElementById('delete_user_action_response').textContent = 'User deleted successfully!';
        })
        .catch(error => {
            document.getElementById('delete_user_action_response').textContent = error.message;
        });

}
// event lisnter for get user button
document.getElementById('delete_user_button').addEventListener('click', function () {
    var user_id = document.getElementById('user_id_input-delete').value;
    delete_user(user_id);
});