var cargarDB = {
    db:"",

    initialize: function(){
     //Enlazamos con la base de datos
        this.db= window.openDatabase("jugadores", "1.0","Base de datos SQL",2*1024*1024);
        this.cargaLista();
    },

    cargaLista: function(){
        console.log("CARGAMOS LISTA");
        //Metodo transaction
        this.db.transaction(this.mostrarLista, this.mostrarListaError);
    },

    mostrarListaError: function(err){
        console.log("ERROR AL CARGAR LA BBDD"+err.code);
        console.log("Mensaje de error"+ err.message);
    },

    mostrarLista: function(tx){
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
                        $("#listaJugadores ul").append("<li><a href='JugadorDetalles.html' data-ajax='false' data-id='"+fila.id+"'><img src='img/profile1.png'/>"+fila.nombre+"<br><br>"+fila.posicion+"</a></li>").listview('refresh');
                       

                    }
                }
            },
            function(tx,error){
                this.mostrarListaError(error);
            }

            );
        
            $('body').on('click','#listaJugadores a', function(){
                window.localStorage.setItem("jugador_id",$(this).attr('data-id'));
            });

       /* $("#listaJugadores a").click(function(event){
        window.localStorage.setItem("jugador_id",$(this).attr('data-id'));
        });*/

    }
};

/*var cargaDetalles ={

    lanzarMostrarDetalles: function(){
        this.db= window.openDatabase("jugadores", "1.0","Base de datos SQL",2*1024*1024);
        this.db.transaction(this.mostrarDetallesJugador, this.mostrarListaError);
    },

    mostrarDetallesJugador: function(tx){
        var jugador_id = window.localStorage.getItem("jugador_id");
        if(jugador_id != null){
            var sql = "SELECT * FROM jugadores where id = "+jugador_id;
            tx.executeSql(
                sql,
                [],
                function(tx,result){
                    console.log("Se ha lanzado la consulta con exito");
                    if(result.rows.length > 0) {
                        var item = result.rows.item(// AQUI HABRIA QUE METER EL ID CLICKADOjugador_id);
                        console.log("NOMBRE DEL ITEM: "+item.nombre);
                        $('#nombreDetalles').text(item.nombre);
                        $('#posicionDetalles').text(item.posicion);
                        $('#edadDetalles').text(item.edad);
                        $('#dorsalDetalles').text(item.dorsal);
                    }
                },
            function(tx,error){
                this.mostrarListaError(error);
            }

            );
        }
    }

    /*showProfile:function(tx, result){

        if(result.rows.length > 0) {
            var item = result.rows.item(0);

            $('#nombreDetalles').text(item.nombre);
            $('#posicionDetalles').text(item.posicion);
            $('#edadDetalles').text(item.edad);
            $('#dorsalDetalles').text(item.dorsal);
        }
    }


};*/