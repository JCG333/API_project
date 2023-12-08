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
            //console.log(data);
            let users = '<table>';
            users += '<tr><th>ID</th><th>Username</th><th>Email</th></tr>'; // table headers
            data.users.forEach(user => {
                users += `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.username}</td>
                        <td>${user.email}</td>
                    </tr>
                `;
            });
            users += '</table>';
            document.getElementById('data_display').innerHTML = users;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation of users:', error);
        });
}
//document.getElementById('get_users_button').addEventListener('click', get_users_data);

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
/*
document.getElementById('get_user_button').addEventListener('click', function () {
    var user_id = document.getElementById('user_id_input').value;
    get_user_data(user_id);
});
*/

// ====== create user ====== 
function create_user(user_name, user_email) {
    fetch('api/users',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user_email, username: user_name })
        })
        // check if response is OK
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => Promise.reject(error));
            }
            return response.json();
        })
        // if OK
        .then(data => {
            document.getElementById('create_user_action_response').textContent = 'User created successfully!';
            get_users_data();
        })
        // Error handling
        .catch(error => {
            document.getElementById('create_user_action_response').textContent = error.message;
        });
}
// event lisnter for CREATE user button
document.getElementById('create_user_button').addEventListener('click', function () {
    var user_name = document.getElementById('user_name_input-post').value;
    var user_email = document.getElementById('user_email_input-post').value;
    create_user(user_name, user_email);
});

// ====== update user ====== 
function update_user(user_name, user_email, user_id) {
    fetch(`api/users/${user_id}`,
        {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user_email, username: user_name })
        })
        // check if response is OK
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => Promise.reject(error));
            }
            return response.json();
        })
        // if OK
        .then(data => {
            document.getElementById('update_user_action_response').textContent = 'User updated successfully!';
            get_users_data();
        })
        // Error handling
        .catch(error => {
            document.getElementById('update_user_action_response').textContent = error.message;
        });
}
// event lisnter for UPDATE user button
document.getElementById('update_user_button').addEventListener('click', function () {
    var user_name = document.getElementById('user_name_input-put').value;
    var user_email = document.getElementById('user_email_input-put').value;
    var user_id = document.getElementById('user_id_input-put').value;
    update_user(user_name, user_email, user_id);
});

// ====== delete user ====== 
function delete_user(user_id) {
    fetch(`api/users/${user_id}`, { method: 'DELETE' })
        // check if response is OK
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => Promise.reject(error));
            }
            return response.json();
        })
        // if OK
        .then(data => {
            document.getElementById('delete_user_action_response').textContent = 'User deleted successfully!';
            get_users_data();
        })
        // Error handling
        .catch(error => {
            document.getElementById('delete_user_action_response').textContent = error.message;
        });

}
// event lisnter for get user button
document.getElementById('delete_user_button').addEventListener('click', function () {
    var user_id = document.getElementById('user_id_input-delete').value;
    delete_user(user_id);
});

// get all users on page load
get_users_data();