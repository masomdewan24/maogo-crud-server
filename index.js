const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

// user: dbuser2
// password: 7luyW0jNGromyvwj

const uri = "mongodb+srv://dbuser2:8Fs1LUJDFzMJPFN8@cluster0.6scmlus.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try {
        const userCollection = client.db('nodeMongoCrud').collection('users');

        app.get('/users', async(req, res) =>{
            const quary = {};
            const cursor = userCollection.find(quary);
            const users = await cursor.toArray();
            res.send(users); 
        });


        app.get('/users/:id', async(req, res) =>{
            const id = req.params.id;
            const query = { _id: ObjectId(id)};
            const user = await userCollection.findOne(query);
            res.send(user)
        })

       app.post('/users', async(req, res) =>{
        const user = req.body;
        console.log(user);
        const result = await userCollection.insertOne(user);
        res.send(result);

    });
    app.delete('/users/:id', async(req, res) => {
        const id = req.params.id;
        // console.log('trying to delete', id);
        const quary = { _id: ObjectId(id)}
        const result =await userCollection.deleteOne(quary);
        console.log(result);
        res.send(result);
        
    });
}
    finally{

    }
}
run().catch(err => console.log(err))

app.get('/',(req, res) => {
   res.send('hello from node mongo crud server');

});
 app.listen(port, () =>{
    console.log(`Listening to port ${port}`)
 })