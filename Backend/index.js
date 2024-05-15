'use strict'
var mongoose=require('mongoose');
var app=require('./app');
var port=3900;

mongoose.Promise=global.Promise;
mongoose.connect('mongodb+srv://danielperezal:1234@cluster0.fyfb18d.mongodb.net/prueba1?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true })
        .then(() => {
            console.log('Conexión a la base de datos correctass !!!');

            // Crear servidor y ponerme a escuchar peticiones HTTP
            app.listen(port, () => {
                console.log('Servidor corriendo en http://localhost:'+port);
            });

});