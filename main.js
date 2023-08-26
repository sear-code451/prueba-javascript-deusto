
// ? 2 variables que contiene a los alumnos y sus datos.
let primaria = {
        keiry: {
            name: "Keiry",
            surname: "Mendoza Chavez",
            birthday: "May 23 2006"
        },

        pablo: {
            name: "Pablo Andres",
            surname: "Rueda Aguilar",
            birthday: "02 August 2003"
        },

        blanca: {
            name: "Blanca",
            surname: "Paredes Castillo",
            birthday: "24 June 1972"
        }
};

let secundaria = {   
    marcelo: {
        name: "Marcelo",
        surname: "Villarroel",
        birthday: "May 12 2001"
    },

    hernan: {
        name: "Hernan",
        surname: "Lopez Lopez",
        birthday: "03 July 2002"
    },

    pedro: {
        name: "Pedro",
        surname: "Visancio",
        birthday: "08 October 2005"
    },
};


// ? Registro de la escuela que contiene los 2 cursos de arriba.
let registerSchool = {
    course: {
        primaria,
        secundaria
    }
};


// ? Creacion de una clase con 2 métodos
class Register {
    constructor() {
        registerSchool;
    }

// ? El método o función que devuelve una promesa con un objeto estudiante
/* 
    * resolve: mostrará el dato del estudiante en específico que se busca.
    * reject: 2 posibles respuesta:
    * Primera: el curso no existe.
    * Segunda: el estudiante no existe. 
*/
    searchStudent(curso, nombre) {
        return new Promise((resolve, reject) => {
            if( registerSchool.course.hasOwnProperty(curso) ) {
                if(registerSchool.course[curso][nombre]){
                    let student = registerSchool.course[curso][nombre];
                    let { name, surname, birthday } = student;
                    resolve(`datos del alumno: ${name} ${surname} ${birthday}`);
                }else {
                    reject( "This student not exist." );
                }
            } else {
                reject("This course not exist.");
            }
        });
    }
    
};


// ? Función con patrón "async-await", que invoca al anterior método de la clase.
/* 
    * Con esto hacemos manejos del DOM.
    * Primer argumento de colocar del método anterior: Curso,
    * Segundo argumento: nombre del alumno.

    * AVISO: estos argumentos que se habla es del método "searchStudent"
*/
const reviewDataStudent = async() => {
    let inputCourse = document.getElementById("tag-course").value;
    let inputName = document.getElementById("tag-name").value;
    let inputTextarea = document.getElementById("result");
    const estudiante = new Register();

    try {
        inputTextarea.value = await estudiante.searchStudent(inputCourse, inputName);
    } catch (error) {
        inputTextarea.value = `${error}`;
    }
};

//? Invoacación del addEventListener al dar click.
let boton = document.getElementById( "buttonClick" );
boton.addEventListener( "click", reviewDataStudent );


