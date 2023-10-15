from flask import Flask,request,jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
import pickle
import json

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb+srv://admin:admin@cluster0.9ng3z20.mongodb.net/mern-app?retryWrites=true&w=majority'
db = PyMongo(app).db
CORS(app)
CORS(app, resources={r"/*": {"origins": "*"}})

# Load the pickled model
# with open('model.pkl', 'rb') as model_file:
#     model = pickle.load(model_file)

@app.route('/')
def hello_world():
    return "We are live"

@app.route('/predict',methods=['POST'])
def predict():
    data=request.get_json()
    print(data)
    data['nitrogen'] = float(data['nitrogen'])
    data['phosphorus'] = float(data['phosphorus'])
    data['potassium'] = float(data['potassium'])
    data['temperature'] = float(data['temperature'])
    data['humidity'] = float(data['humidity'])
    data['ph'] = float(data['ph'])
    data['rainfall'] = float(data['rainfall'])
    with open('./model_pickle.unknown', 'rb') as f:
        mp = pickle.load(f)
    crop_val = mp.predict([[data['nitrogen'],data['phosphorus'],data['potassium'],data['temperature'],data['humidity'],data['ph'],data['rainfall']]])[0]
    result = {"crop_id": str(crop_val)}
    return jsonify(result),201
    

#for creating community post
@app.route('/create-post',methods=['POST'])
def createPost():
    data=request.get_json()
    response_data={
        "nitrogen":data['nitrogen'],
        "phosphrus":data['phosphrus'],
        "potassium":data['potassium'],
        "temp":data['temp'],
        "humidity":data['humidity'],
        "ph":data['ph'],
        "rainfall":data['rainfall'],
        "city":data['city'],
        "district":data['district'],
        "state":data["state"],
        "country":data["country"],
        "phone":data["phone"],
        "email":data["email"],
        "cropname":data["cropname"]
    }
    insert=db.post.insert_one(data)
    if insert.inserted_id:
        response = {'message': 'Data added successfully','data':response_data}
        return (response), 201

#for getting all posts from databases
@app.route('/get-all-posts',methods=['Get'])
def getPosts():
    allData=db.post.find()
    dataJson=[]
    
    for data in allData:
        id=data['_id']
        nitrogen=data['nitrogen']
        phosphrus=data['phosphrus']
        potassium=data['potassium']
        temp=data['temp']
        humidity=data['humidity']
        ph=data['ph']
        rainfall=data['rainfall']
        city=data['city']
        district=data['district']
        state=data['state']
        country=data['country']
        phone=data['phone']
        email=data['email']
        cropname=data['cropname']

        dataDict={
            "id":str(id),
            "nitrogen":nitrogen,
            "phosphrus":phosphrus,
            "potassium":potassium,
            "temp":temp,
            "humidity":humidity,
            "ph":ph,
            "rainfall":rainfall,
            "city":city,
            "district":district,
            "state":state,
            "country":country,
            "phone":phone,
            "email":email,
            "cropname":cropname
        }
        dataJson.append(dataDict)
    return jsonify(dataJson),200

if __name__ == '__main__':
    app.run(debug=True)
