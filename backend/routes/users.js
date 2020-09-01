//Imports
const database = require('../database');
const express = require('express');
const userService = require('../service/userService');
const validation = require('../validations/validations')
const jwt = require('jsonwebtoken');
const { userExist } = require('../service/userService');
const processImage = require('../utilities/processImage');

// Defining Router
const router = express.Router();

const { isAuthenticated, isAdmin } = require('../middlewares/auth');
const { token } = require('morgan');


// Registro de usuarios
router.post('/', async function (req, res) {

    console.log("Hola llego al register");
    const register = {
        'first_name': req.body.first_name,
        'last_name': req.body.last_name,
        'user_image':'',
        'email': req.body.email,
        'phone': req.body.phone,
        'user_type': req.body.user_type,
        'user_autonomous_community': req.body.user_autonomous_community,
        'user_province': req.body.user_province,
        'user_city': req.body.user_city,
        'organizer_name': req.body.organizer_name,
        'organizer_autonomous_community': req.body.organizer_autonomous_community,
        'organizer_province': req.body.organizer_province,
        'organizer_city': req.body.organizer_city,
        'description_text': req.body.description_text,
        'pass': req.body.pass
    };

    console.log("Loque llega al metodo register")
    console.log(register);


    console.log(req.files.user_image)
    if (req.files) {
        try {
            if (req.files.user_image) {
                register.user_image = await processImage(req.files.user_image);
                console.log("Esta es la foto que llega")
                console.log(req.files.user_image)
            }

        } catch (error) {
            return res.status(500).send('No se pudieron procesar las imágenes');
        }
    }

    console.log(register)

    let responseDTO;
    if (await userService.userExist(req.body.email)) {
        const responseDTO = {
            'code': 200,
            'description': 'El usuario (email) ya existe'
        };
        res.status(responseDTO.code).json(responseDTO);
        return;
    }

    try {
        validation.registerValidation(register);


    } catch (e) {
        res.status(400).send();
        return
    }

    if (await userService.registerUser(register)) {
        responseDTO = {
            'code': 200,
            'description': 'Usuario creado correctamente',
            'data': register
        };
    } else {
        responseDTO = {
            'code': 404,
            'description': 'No se ha podido registrar el usuario',
        };
    }

    return res.status(responseDTO.code).json(responseDTO);
});

// Login de usuarios
router.post('/login', async function (req, res) {
    const email = req.body.email;
    const pass = req.body.pass;
    

    // Logearse with Admin (Only one on the appmeetup)

    const sqlUserTypeAdmin = "SELECT  * FROM users WHERE email = ?"
    const connection = await database.connection();
    const [rows] = await connection.execute(sqlUserTypeAdmin, [email]);
    const user = rows[0].first_name;
    if (rows[0].user_type === 'admin') {
        const tokenPayload = 
        { role:rows[0].user_type };
        try {
            const token = await jwt.sign(tokenPayload, process.env.SECRET, {
                expiresIn: '7d'
            });
            res.json({
                'token':token,
                'user':user,
                'name':'name'
            })
        }
        catch (e) {
            console.log(e)
        }

    }


    // Login with other type_user (User or Organizer)
    if (rows[0].user_type !== 'admin') {

        const user = userExist(email);

        if (!user) {
            res.status(404).send();
            return;
        }

        const sqlUserAttributesForToken = "SELECT  id, first_name ,email ,user_type FROM users WHERE email = ?"
        const [rows] = await connection.execute(sqlUserAttributesForToken, [email]);
        rows.forEach(row => {

            const tokenPayload = {
                id: row.id,
                email: row.email,
                role: row.user_type,
                name: row.first_name
            }
        console.log(tokenPayload);

            try {
                const token = jwt.sign(tokenPayload, process.env.SECRET, {
                    expiresIn: '7d'
                });

                res.json({
                    'token':token,
                    'email':row.email,
                    'role':row.user_type,
                    'name':row.first_name

                    
                })
            }
            catch (e) {
                console.log(e);
            }
        })

    }

    const responseDTO = await userService.loginUser(email, pass)
    res.status(responseDTO.code).json(responseDTO);
});



// Eliminar usuarios
//Se ha quitado el "isAdmin" luego habra que meterlo
//Se ha quitado el "isAuthenticated" luego habra que meterlo

router.delete('/:usertype/:id', async function (req, res) {

    const id = parseInt(req.params.id);
    const usertype = req.params.usertype

    if (id === undefined || usertype === undefined) {
        res.status(402).send();
        return
    }

    const result = userService.deleteUser(id, usertype);
    res.send();
})


// Detail User

//Se ha quitado el "isAdmin" luego habra que meterlo
// Se ha quitado el "isAuthenticated" luego habra que meterlo

router.get('/user/:id',  async function (req, res) {

    const id = parseInt(req.params.id);

    const responseDTO = await userService.userList(id);
    res.status(responseDTO.code).json(responseDTO);
})


// List Users 
//Se ha quitado el "isAdmin" luego habra que meterlo
// Se ha quitado el "isAuthenticated" luego habra que meterlo

router.get('/listusers', async function (req, res) {
    const listUsers = await userService.listUsers();
    const responseDTO = {
        'code': 200,
        'data': listUsers
    };

    return res.status(responseDTO.code).json(responseDTO);
})

module.exports = router;
