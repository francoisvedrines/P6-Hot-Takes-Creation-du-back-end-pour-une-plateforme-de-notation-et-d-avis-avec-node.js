/************************************************************/
/*********************** server *****************************/
/************************************************************/
const http = require('http')
const https = require('https')
const fs = require('fs')
const app = require('./app')

//importation du module de variable d'environnement
require('dotenv').config();

//normalisation du port
const normalizePort= val =>{
    const port= parseInt(val,10)
    if (isNaN(port)) {
      return val
    }
    if (port >=0){
      return port
    }
    return False
  }

const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

// gestion des erreurs de port
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address()
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.')
      process.exit(1)
      break
    default:
      throw error
  }
}

  /*******serveur https non utilisé car frontend non prévu pour ****************/
  // const options= {
  //   key: fs.readFileSync('./key.perm'),
  //   cert: fs.readFileSync('./cert.perm')
  // }
  // const server = https.createServer(options, app)

//création du serveur http  
const server = http.createServer(app)

//affichage de l'erreur ou du bon fonctionnement du server
server.on('error', errorHandler)
server.on('listening', () => {
  const address = server.address()
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port
  console.log('Listening on ' + bind)
})

server.listen(port)