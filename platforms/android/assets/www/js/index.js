/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */



var cargarDB = {
db:"",

    initialize: function(){
     //Enlazamos con la base de datos
        this.db= window.openDatabase("jugadores", "1.0","Base de datos SQL",2*1024*1024);
        this.cargaDetalles();
    },

    cargaDetalles: function(){
        console.log("CARGAMOS DETALLES");
        //Metodo transaction
        this.db.transaction(this.mostrarDetalles, this.mostrarDetallesError);
    },

    mostrarDetalles: function(tx){
        var sql = "SELECT * FROM jugadores;";
        console.log("Lanzamos la consulta");
        tx.executeSql(
            sql,
            [],
            function(tx,result){
                console.log("Se ha lanzado la consulta con exito");
                if(result.rows.length>0){
                    for(i=0;i<result.rows.length;i++){
                        var fila=result.rows.item(i);
                        //METEMOS LOS DATOS RELACIONANDO CON EL HTML(JQUERY)
                        $("#listaJugadores ul").append("<li id='jug"+i+"'><a href='JugadorDetalles.html' data-ajax='false'><img src='img/profile1.png'/>"+fila.nombre+"<br><br>"+fila.posicion+"</a></li>").listview('refresh');
                        /*console.log("Fila "+i+" Nombre: "+fila.nombre);
                        console.log("Fila "+i+" Posicion: "+fila.posicion);
                        console.log("Fila "+i+" Dorsal: "+fila.dorsal);
                        console.log("Fila "+i+" Goles: "+fila.goles);
                        /* var li = document.getElementsByTagName("li");
                         console.log("hemos capturado los elementos list");

                            for(var i = 0;i<li.length;i++){
                                li[i].addEventListener("click", this.myScript);
                                console.log("hemos llamado a la funcion myScript"+i);
                            }*/


                    }
                }
            },
            function(tx,error){
                this.mostrarDetallesError(error);
            }

            );


    },

    myScript: function(e){
         alert(e.target.attributes.id.value);       
    },

    mostrarDetallesError: function(err){
        console.log("ERROR AL CARGAR LA BBDD"+err.code);
        console.log("Mensaje de error"+ err.message);
    }
 
};

var confDB = {
   //Variable de comprobacion existencia bd
    existe_db:"",
    db:"",

    //CONSTRUCTOR
    initialize: function(){
        //Declaracion de la variable existe_db
        this.existe_db= window.localStorage.getItem("existe_db");
        //ENLAZAMOS CON LA BBDD
        //Abrimos bbdd
        this.db= window.openDatabase("jugadores", "1.0","Base de datos SQL",2*1024*1024);
        //COMPROBAMOS SI ES NECESARIO CREAR LA BBDD
         if(this.existe_db == null || this.existe_db == false){
            //Log de ruptura
            console.log("LA BBDD NO EXISTE");
             //Enlazamos con la base de datos
            
            this.createDB();
        }else{
            console.log("LA BBDD YA EXISTE");
            //cargarDB.initialize();
        }
    },


    createDB: function(){
        console.log("CREAMOS LA BBDD");
        //Metodo transaction
        this.db.transaction(this.createLocalDB, this.createDBError, this.createDBSuccess);
    },

    createLocalDB: function(tx){
               // tx.executeSql("DROP TABLE IF EXISTS jugadores;")

        var sql = "CREATE TABLE IF NOT EXISTS jugadores ("+
                  "id           INTEGER         primary key autoincrement,"+
                  "nombre       VARCHAR(50)     not null,"+
                  "posicion     VARCHAR(250)    not null,"+
                  "dorsal       INTEGER         not null,"+
                  "edad         INTEGER         not null,"+
                  "goles        INTEGER         not null,"+
                  "asistencias  INTEGER         not null,"+
                  "telefono     VARCHAR(9)      not null,"+
                  "email        VARCHAR(250)    not null );"
                ;

            tx.executeSql(sql);
            console.log("TABLA CREADA CORRECTAMENTE");

            //Inserción de datos en la tabla creada anteriormente
            console.log("INTRODUCIMOS DATOS EN LA TABLA");

            sql = "INSERT INTO jugadores(id, nombre, posicion, dorsal, edad, goles, asistencias, telefono, email)"+
                  "VALUES(1, 'Joaquin Bahamonde', 'Delantero', 17, 21, 25, 12, 664638150, 'joballo.17@gmail.com')";
            tx.executeSql(sql);

            sql = "INSERT INTO jugadores(id, nombre, posicion, dorsal, edad, goles, asistencias, telefono, email)"+
                  "VALUES(2, 'Ivan Estruch', 'Extremo', 18, 20, 12, 19, 655874131, 'estruch95.b@gmail.com')";
            tx.executeSql(sql);

            sql = "INSERT INTO jugadores(id, nombre, posicion, dorsal, edad, goles, asistencias, telefono, email)"+
                  "VALUES(3, 'Jose Igualada', 'MedioCentro', 8, 21, 9, 22, 699555878, 'igualada@hotmail.com')";
            tx.executeSql(sql);

            sql = "INSERT INTO jugadores(id, nombre, posicion, dorsal, edad, goles, asistencias, telefono, email)"+
                  "VALUES(4, 'Alvaro Banyo', 'Portero', 1, 26, 0, 0, 633222147, 'albafo@hotmail.com')";
            tx.executeSql(sql);

            sql = "INSERT INTO jugadores(id, nombre, posicion, dorsal, edad, goles, asistencias, telefono, email)"+
                  "VALUES(5, 'Fran Primo', 'Defensa', 8, 31, 3, 5, 699823000, 'franpri@gmail.com')";
            tx.executeSql(sql);

            sql = "INSERT INTO jugadores(id, nombre, posicion, dorsal, edad, goles, asistencias, telefono, email)"+
                  "VALUES(6, 'David Alos', 'Defensa', 22, 21, 5, 8, 666779966, 'alos@gmail.com')";
            tx.executeSql(sql);

            sql = "INSERT INTO jugadores(id, nombre, posicion, dorsal, edad, goles, asistencias, telefono, email)"+
                  "VALUES(7, 'Nico Pons', 'Defensa', 44, 21, 3, 3, 677455111, 'nicopons24@gmail.com')";
            tx.executeSql(sql);
            console.log("INSERCION DE DATOS REALIZADA CORRECTAMENTE");
    },

    createDBError: function(err){
        console.log("ERROR DE CREACION DE BBDD"+err.code);
    },

    createDBSuccess: function(){
        console.log("BBDD GENERADA CORRECTAMENTE");
        window.localStorage.setItem("existe_db",1);
    }

};


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
       
        /*var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;'); */

        console.log('Received Event: ' + id);

        //SE INICIA LA COMPROBACION DE EXISTENCIA DE db
        confDB.initialize();
    }
};
