"use strict"
// import configs from the .env file
const config = require('./utils/config')
// Import express and store in a constant.
const express = require("express")

// Create an express application by running express as a function, and storing it to a constant.
const app = express();

// Import the database connection file.
const db = require("./database/db")
const Special = require("./database/models/Special")
const Bone = require("./database/models/Bone")
const Cadet = require("./database/models/Cadet")

// import cors, router, and middleware components
const cors = require('cors')
const SpecialRouter = require('./controllers/SpecialRouter');
const BoneRouter = require('./controllers/BoneRouter');
const cadetRouter = require("./controllers/cadetRouter");
const middleware = require('./utils/middleware')

db.sequelize.authenticate()
    .then(() => {
        console.log('Connected to postgressql')
    })
    .catch((error) => {
        console.error('Error connecting to postgressql:', error.message)
    })

Special.sync({ alter: true });
Bone.sync({ alter: true });
Cadet.sync({ alter: true });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use('/api/Specials', SpecialRouter)
app.use('/api/Bones', BoneRouter)
app.use('/api/Cadets', cadetRouter);
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
app.listen(config.PORT, () => {
    console.info(`Server running on port ${config.PORT}`)
})