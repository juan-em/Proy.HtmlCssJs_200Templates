var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function(solicitud, respuesta) {
    var filePath = '.' + solicitud.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    var extname = path.extname(filePath);
    var contentType = 'text/html';
    if (extname === '.css') {
        contentType = 'text/css';
    }

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if (error.code == 'ENOENT') {
                respuesta.writeHead(404);
                respuesta.end('Archivo no encontrado');
            }
            else {
                respuesta.writeHead(500);
                respuesta.end('Error interno del servidor');
            }
        }
        else {
            respuesta.writeHead(200, { 'Content-Type': contentType });
            respuesta.end(content, 'utf-8');
        }
    });

}).listen(8080);