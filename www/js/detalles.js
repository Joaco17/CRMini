var detalles= {


initialize: function(){
     //Enlazamos con la base de datos
        this.db= window.openDatabase("jugadores", "1.0","Base de datos SQL",2*1024*1024);
        this.cargaDetalles();
    },

cargaDetalles: function(){
        console.log("CARGAMOS LOS DETALLES");
        //Metodo transaction
        this.db.transaction(this.mostrarDetalles, this.mostrarDBError);
    },

 mostrarDetalles: function(tx){
        var sql = "SELECT * FROM jugadores;";
        console.log("Lanzamos la consulta");
        tx.executeSql(
            sql,
            [],
            function(tx,result){
                console.log("Se ha lanzado tu padre con exito");
                if(result.rows.length>0){
                    for(i=0;i<result.rows.length;i++){
                        var fila=result.rows.item(i);

                        //METEMOS LOS DATOS RELACIONANDO CON EL HTML(JQUERY)
                        $("#detalles ul").append("<li><img src='img/profile1.png' class='imagen'/>"+
                          "<div class='nombre'><strong>"+fila.nombre+"</strong></div><br>"+
                          "<div class='posicion'>Posicion: "+fila.posicion+"</div>"+
                          "<div class='edad'>Edad: "+fila.edad+"</div>"+
                          "<div class='dorsal'>Dorsal: "+fila.dorsal+"</div>"+
                          "</li>"+
                          "<li><img src='img/info.png' class='imagen'/>"+
                          "<div class='email'>"+fila.email+"</div>"+
                          "<div class='telefono'>"+fila.telefono+"</div>"+
                          "</li>"+
                          "<li><img src='img/balon.png' class='imagen'/>"+
                          "<div class='goles'>Goles: "+fila.goles+"</div>"+
                          "<div class='asistencias'>Asistencias: "+fila.asistencias+"</div>"+
                          "</li>").listview('refresh');

                        

                        console.log("PaginaDetalles jugador cargado");
                    }
                }
            },
            function(tx,error){
                this.mostrarDBError(error);
            }

            );


    },

    mostrarDBError: function(err){
        console.log("ERROR AL MOSTRAR DATOS"+err.code);
        console.log("Mensaje de error"+ err.message);
    }

   

     

};