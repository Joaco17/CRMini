var nombre="";
var edad="";
var dorsal="";
var posicion="";
var email="";
var telefono="";
var goles="";
var asistencias="";
var db="";


    function insertarDatos(tx){
     //Enlazamos con la base de datos
        var sql ="INSERT INTO jugadores(nombre,edad,dorsal,posicion,email,telefono,goles,asistencias)"+
        "VALUES('"+nombre+"','"+edad+"','"+dorsal+"','"+posicion+"','"+email+"','"+telefono+"','"+goles+"','"+asistencias+"');";
        tx.executeSql(sql);
        console.log("Row Insert: "+sql);
    };


     function mostrarGuardarError(err){
        console.log("ERROR AL GUARDAR"+err.code);
        console.log("Mensaje de error"+ err.message);
    };
   

   $("#guardar").click(function(event){
        console.log("NUEVO JUGADOR GUARDADO");
        nombre = $("#fnombre").val();
        edad = $("#fedad").val();
        dorsal = $("#fdorsal").val();
        posicion = $("#fposicion").val();
        email = $("#femail").val();
        telefono = $("#ftelefono").val();
        goles = $("#fgoles").val();
        asistencias = $("#fasistencias").val();


        //conexion con bbdd
        this.db=window.openDatabase("jugadores", "1.0","Base de datos SQL",2*1024*1024);
        this.db.transaction(insertarDatos,mostrarGuardarError);
        console.log("HA INSERTADO DATOS");
       
    });

  function mostrarImagen(imageURI){
    console.log("IMAGEN URI: "+imageURI);

    $("#perfil").attr("src", imageURI);
    console.log(imageURI);
  };

  function errorImagen(message){
    console.log("ERROR CON LA IMAGEN "+message);
  };

  $("#perfil").click(function(event){
        navigator.camera.getPicture(mostrarImagen,errorImagen, { quality:100, targetWidth:250, targetHeight:250,
            destinationType: Camera.DestinationType.FILE_URI
        });

  });

