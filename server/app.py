from flask import Flask,request,jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
import pickle
import json
import pandas as pd
from bson import ObjectId
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
        "email":data["email"],
        "cropname":data["cropname"],
        "status":"pending"
    }
    insert=db.post.insert_one(data)
    if insert.inserted_id:
        response = {'message': 'Data added successfully','data':response_data}
        existing_data = pd.read_csv('./test.csv')
        new_data = {
            'N': [response_data['nitrogen']],
            'P': [response_data['phosphrus']],
            'K': [response_data['potassium']],
            'temperature': [response_data['temp']],
            'humidity': [response_data['humidity']],
            'ph': [response_data['ph']],
            'rainfall': [response_data['rainfall']],
            'label': [response_data['cropname']]
        }
        new_data_df=pd.DataFrame(new_data)
        combined_data = pd.concat([existing_data, new_data_df], ignore_index=True)
        combined_data.to_csv('./test.csv', index=False)
        return (response), 201

#for getting all posts from databases --user
@app.route('/get-all-posts',methods=['Get'])
def getPosts():
    allData=db.post.find({"status":"active"})
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
            "email":email,
            "cropname":cropname
        }
        dataJson.append(dataDict)
    return jsonify(dataJson),200


#for getting all posts from databases --admin
@app.route('/get-all-posts-admin',methods=['Get'])
def getPostsAll():
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
        email=data['email']
        cropname=data['cropname']
        status=data['status']

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
            "email":email,
            "cropname":cropname,
            "status":status
        }
        dataJson.append(dataDict)
    return jsonify(dataJson),200

#for updating status of post --admin

@app.route('/update_status/<object_id>', methods=['PUT'])
def update_status(object_id):
    new_status = request.json.get('status')  # Assuming 'status' is sent in the JSON payload
    
    # Update the status in MongoDB
    result =db.post.update_one(
        {'_id': ObjectId(object_id)},
        {'$set': {'status': new_status}}
    )
    
    if result.modified_count > 0:
        return jsonify({'message': 'Status updated successfully'}), 200
    else:
        return jsonify({'message': 'Failed to update status'}), 500


if __name__ == '__main__':
    app.run(debug=True)
