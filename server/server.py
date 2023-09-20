from flask import Flask,request,jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
CORS(app, resources={r"/*": {"origins": "*"}})
@app.route('/predict',methods=['POST'])
def predict():
    data=request.get_json()
    print(data)
    return jsonify(data), 201

if __name__ == '__main__':
    app.run(debug=True)
