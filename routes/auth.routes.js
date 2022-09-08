//1 Importamos Express
const express = require("express");
const User = require("../models/User.model");
const bcryptjs = require("bcryptjs");
//2 Inicializamos el router
const router = express.Router();

//3 Creamos las rutas

//localhost:3000/auth/signup
router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

//Ruta para recibir los datos de req.body y guardarlos
// get route is skipped
//localhost:3000/auth/signup
// POST route ==> to process form data
router.post("/signup", (req, res, next) => {
  // console.log("The form data: ", req.body);
  // Tomar los datos del form
  const { username, email, password } = req.body;
  const saltRounds = 10;
  bcryptjs
    .genSalt(saltRounds) //Generamos la primera parte del hash $2$10lknasniafsoinfa.OIAONDASONDASOINSAOINSAD
    .then((salt) => bcryptjs.hash(password, salt)) //Gracias al metodo hash creamos la contraseña encriptada
    .then((hashedPassword) => {
      return User.create({
        // username: username
        username,
        email,
        // passwordHash => this is the key from the User model
        //     ^
        //     |            |--> this is placeholder (how we named returning value from the previous method (.hash()))
        passwordHash: hashedPassword,
      });
    })
    .then((userFromDB) => {
      console.log("Newly created user is: ", userFromDB);
    })
    .catch((error) => next(error));
});

module.exports = router;

//
//Cuenta de usuario/cuenta de repartidor/cuenta de restaurante --> rol
//Categorias
//  const pizzas = [{
// imagenes: [url,url .png/jpeg],descripcion: "sdasd", precio
//}]
//almenos 2 documentos de su asignacion
/*
  ---Categorias
  Pizzas  -- Majo --> imagenes, descripcion, precio
  China  --> Jo 
  Hamburguesa Dany --> imagenes, descripcion, 
  Sushi --> Gus
  Mexa --> Rodrigo
  Boliviana  --> jose Rios
  Cubana --> Nayi

  ---Restaurantes --> Ivan
    -Categoria
    -Menu  --> Toño
     
  ---Pedidos --> Mauro/Carlos
*/
