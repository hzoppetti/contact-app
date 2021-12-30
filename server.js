require('dotenv').config();
const port = process.env.APP_PORT;

var express = require('express');
//bodyParser = require('body-parser'),
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();

const db = require('./contacts');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// routes
app.get('/', (req, res) => {
  res.json({ info: 'Contact App' });
});
app.get('/users', db.getUsers);
app.get('/users/:id', db.getUserById);
app.post('/users', db.createUser);
app.put('/users/:id', db.updateUser);
app.delete('/users/:id', db.deleteUser);
app.delete('/users', db.deleteAllUsers);

app.use(cors({
  origin: '*'
}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});


const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Contact App API",
        version: "1.0.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Heather Zoppetti",
          email: "hzoppetti@gmail.com",
        },
      },
      servers: [
        {
          url: "http://localhost:3000/users",
        },
      ],
    },
    apis: ["contacts.js"],
  };

  const specs = swaggerJsdoc(options);
  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
  );

  app.listen(port, () => {
    console.log(`App running on port ${port}.`);
  });

module.exports = app;