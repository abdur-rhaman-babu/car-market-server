require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5500;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6avkk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  
    const carCollection = client.db("carsDB").collection("cars");

    // create or post car on database
    app.post("/cars", async (req, res) => {
      const newCar = req.body;
      const result = await carCollection.insertOne(newCar);
      res.send(result);
    });

    // get or read car on the ui
    app.get('/cars', async (req, res)=>{
        const cursor = carCollection.find()
        const result = await cursor.toArray() 
        res.send(result)    
    })

    // delete data
    app.delete('/cars/:id', async (req, res)=>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const result = await carCollection.deleteOne(query)
        res.send(result)    
    })

    // get car for update
    app.get('/cars/:id', async (req, res)=>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const result = await carCollection.findOne(query)
        res.send(result)
    })

    // put car for update
    app.put('/cars/:id', async (req, res)=>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const options = {upsert: true}
        const car = req.body;
        const updateCar = {
            $set:{
                name: car.name,
                price: car.price,
                brand: car.brand,
                photo: car.photo
            }
        }
        const result = await carCollection.updateOne(query, updateCar, options)
        res.send(result)
    })
 
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Car Server is running.......");
});
app.listen(port, () => {
  console.log(`Car Server is Running on port ${port}`);
});
