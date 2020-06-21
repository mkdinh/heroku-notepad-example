from flask import Flask, render_template, jsonify
# from flask_sqlalchemy import SQLAlchemy
from flask_pymongo import PyMongo
from os import environ

app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DATABASE_URL') or "sqlite:///notepad.sqlite"
# db = SQLAlchemy(app)

app.config['MONGO_URI'] = environ.get('MONGODB_URI') or "mongodb://localhost:27017/notepad"
mongo = PyMongo(app)

# class Task(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     description = db.Column(db.String)

@app.route('/')
def index():
    return render_template('index.html', name="Michael")


# @app.route('/tasks')
# def tasks():
#     tasks = db.session.query(Task)
#     data = []

#     for task in tasks:
#         item = {
#             "id": task.id,
#             "description": task.description
#         }
#         data.append(item)

#     return jsonify(data)

@app.route('/tasks')
def tasks():
    tasks = mongo.db.tasks.find()
    data = []

    for task in tasks:
        print(task)
        item = {
            "id": str(task['_id']),
            "description": task['description']
        }
        data.append(item)

    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)