from flask import Flask, request, jsonify, make_response, render_template
from flask_sqlalchemy import SQLAlchemy
from os import environ
import xmltodict # for xml convert
from flask_cors import CORS #cross origin resource sharing


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DB_URL')
db = SQLAlchemy(app)
CORS(app) #cross origin resource sharing for flask app

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def json(self):
        return {'id': self.id, 'username': self.username, 'email': self.email}

    
def create_tables():
    with app.app_context():
        db.create_all()

create_tables()

#test route
@app.route('/test', methods=['GET'])
def test():
    return make_response(jsonify({'message': 'test route'}), 200)

#create user
@app.route('/api/users', methods=['POST'])
def create_user():
    try:
        data = request.get_json()
        existing_user = User.query.filter_by(username=data['username']).first() # check if user exists
        if existing_user:
            return make_response(jsonify({'message': 'username already exists'}), 400)
        existing_email = User.query.filter_by(email=data['email']).first() # check if email exists
        if existing_email:
            return make_response(jsonify({'message': 'email already exists'}), 400)
        new_user = User(username=data['username'], email=data['email'])
        db.session.add(new_user) # add user
        db.session.commit() # commit changes
        return make_response(jsonify({'message': 'user created'}), 201)
    except Exception as e:
        return make_response(jsonify({'message': 'error creating user', 'error': str(e)}), 500)
    
#get all users
@app.route('/api/users', methods=['GET'])
def get_users():
    try:
        users = User.query.all() # query users
        return make_response(jsonify({'users': [user.json() for user in users]}), 200)
    except Exception as e:
        return make_response(jsonify({'message': 'error getting users'}), 500)
    
#get a user by id
@app.route('/api/users/<int:id>', methods=['GET'])
def get_user(id):
    try:
        user = User.query.filter_by(id=id).first() # query user filtered by id
        if user:
            return make_response(jsonify({'users': user.json()}), 200)
        return make_response(jsonify({'message': 'user not found'}), 404)
    except Exception as e:
        return make_response(jsonify({'message': 'error getting user'}), 500)
    
#update a user
@app.route('/api/users/<int:id>', methods=['PUT'])
def update_user(id):
    try:
        user = User.query.filter_by(id=id).first() # get user
        if user:
            data = request.get_json() # get new info
            user.username = data['username'] # update username
            user.email = data['email'] # update email
            db.session.commit()
            return make_response(jsonify({'message': 'user updated'}), 200)
        return make_response(jsonify({'message': 'user not found'}), 404) # user not in db
    except Exception as e:
        return make_response(jsonify({'message': 'error updating user'}), 500)
    
#delete user
@app.route('/api/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    try:
        user = User.query.filter_by(id=id).first() # get user
        if user:
            db.session.delete(user) # delete user
            db.session.commit()
            return make_response(jsonify({'message': 'user deleted'}), 200)
        return make_response(jsonify({'message': 'user not found'}), 404)
    except Exception as e:
        return make_response(jsonify({'message': 'error deleting user'}), 500)
    

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000)