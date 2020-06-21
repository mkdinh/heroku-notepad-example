from flask import Flask, render_template, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from os import environ
import json

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DATABASE_URL') or "sqlite:///notepad.sqlite"
db = SQLAlchemy(app)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/tasks')
def tasks():
    tasks = db.session.query(Task)
    data = []

    for task in tasks:
        item = {
            "id": task.id,
            "description": task.description
        }
        data.append(item)

    return jsonify(data)

@app.route('/task', methods=('POST',))
def add_task():
    data = json.loads(request.data)

    task = Task(description=data['task'])
    db.session.add(task)
    db.session.commit()
    return data

if __name__ == '__main__':
    app.run(debug=True)