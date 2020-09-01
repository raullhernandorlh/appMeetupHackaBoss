import jwt from 'jwt-decode'
import axios from 'axios'


// TOKEN

export function getAuthToken(){
    return localStorage.getItem('AUTH_TOKEN_KEY')
}

//Function to get the expiratio date of the token

export function tokenExpiration(encodedToken){
    let token = jwt(encodedToken)
    if(!token.exp){
        return null
    }
    let date = new Date(0)
    date.setUTCSeconds(token.exp)
    return date
}

// Function to check if the token is operational or not 

export function isExpired(token){
    let expirationDate = tokenExpiration(token)
    return expirationDate < new Date()
}


//¿ESTA LOGEADO O NO?

export function isLoggedIn(){
    // Conseguimos el token de la funcion anterior
    let authToken = getAuthToken();
    // Si tienes token y este no esta espirado puedes pasar si no retuen
    return !!authToken && !isExpired(authToken)
}

// TYPE_USER
//Funcion para recuperar el tipo de usuario ("user","organizer","admin")
export function getTypeUser(){
    
    return localStorage.getItem('TYPE_USER')
}


// ORGANIZER
// Metodo utilizado para saber si el usuario esta logeado como "organizer"

export function checkIsOrganizer(){
    let role = null
    let organizer = getTypeUser()
    if(organizer === 'organizer'){
        role = true
    }else{
        role=false
    }
    return role
}

// USER
// Metodo utilizado para saber si el usuario esta logeado como "user"
export function checkIsUser(){
    let role = null
    let user = getTypeUser()
    console.log(user)

    if(user === 'user'){
        role = true
    }else{
        role=false
    }

    return role
}

// ADMIN
// Metodo utilizado para saber si el usuario esta logeado como "admin"


export function checkIsAdmin(){
    let role = null
    let admin = getTypeUser()
    console.log(admin)
    if(admin === 'undefined'){
        role = true
    }else{
        role=false
    }
    return role
}

// Funcion para cerrar la sesion del usuario con el que estemos (admin, organizer, user)
export function logout(){
    axios.defaults.headers.common['Authorization'] = ''
    localStorage.removeItem('AUTH_TOKEN_KEY')
    localStorage.removeItem('TYPE_USER')
    localStorage.removeItem('NAME')
    localStorage.removeItem('MESSAGE')
    localStorage.removeItem('USER')
}


// Funcion para establecer el nombre del usuario en el localstorage
export function setName(user){
    localStorage.setItem('NAME',user)
}


// FUNCION DE RECUPERAR EL NOMBRE DE USER EN LOCALSTORAGE

export function getName(){
    return localStorage.getItem('NAME')
}


