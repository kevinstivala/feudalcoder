
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://feudalcoder:progra3@feudalcoder.0rq2xv0.mongodb.net/?retryWrites=true&w=majority&appName=Feudalcoder";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

async function getPuntos(email: string) {
    try {
      await run();
      const db = client.db('GameValdenses');
      const collection = db.collection('Usuarios');
      const query = { email: email }; // Filtro para el campo "email"
      const cursor = collection.find(query, { projection: { puntos: 1 } }); // Obtener solo el campo "puntos" de los documentos que cumplan con el filtro
      const puntosArray = await cursor.toArray();
      const puntos = puntosArray.map((doc: { puntos: any; }) => doc.puntos); // Extraer el campo "puntos" de cada documento y crear un array
      return puntos; // Devuelve el array con los valores de "puntos"
    } catch (error) {
      console.error('Error al obtener los puntos', error);
      return null;
    }
  }

  async function actualizarPuntos(email:string, nuevosPuntos:number) {
    try {
      await run();
      const db = client.db('nombre_de_tu_base_de_datos');
      const collection = db.collection('nombre_de_tu_coleccion');
      const filtro = { email: email }; // Filtro para encontrar el documento con el email específico
      const updateDocument = {
        $set: { puntos: nuevosPuntos } // Actualizar el campo "puntos" con el nuevo valor
      };
      await collection.updateOne(filtro, updateDocument); // Actualizar el documento en la base de datos
      console.log('Puntos actualizados correctamente');
    } catch (error) {
      console.error('Error al actualizar los puntos', error);
    }
  }

export { client, run, actualizarPuntos, getPuntos };
