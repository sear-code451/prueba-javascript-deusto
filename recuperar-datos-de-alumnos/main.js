
// Creación de un sencillo formulario que recupere los datos de un alumno.

let registerSchool = [
    { fullName: 'Keiry', surname: 'Mendoza Chavez', course: '4º secundaria', birth: 'May 23 2006' },
    { fullName: 'Pablo Andres', surname: 'Aguilar', course: '5º primaria', birth: 'May 23 2014' },
    { fullName: 'Blanca Paredes', surname: 'Garcia Castillo', course: '2º secundaria', birth: 'May 23 2008' },
    { fullName: 'Marcelo Leonardo', surname: 'Seoane Lopez', course: '4º primaria', birth: 'May 23 2015' },
    { fullName: 'Blanca Paredes', surname: 'Garcia Choquez', course: '4º primaria', birth: 'May 23 2008' },
    { fullName: 'Pedro Murillo', surname: 'Garcia Solanch', course: '4º secundaria', birth: 'May 23 2008' },
    { fullName: 'Carmen', surname: 'Lopez Villarroel', course: '4º primaria', birth: 'May 23 2008' }
];


let courseStudentData = [
    { fullName: 'Keiry', surname: 'Mendoza Chavez', course: '4º primaria', birth: 'May 23 2013' },
    { fullName: 'Pablo Andres', surname: 'Aguilar', course: '4º primaria', birth: 'May 23 2014' }
];


// Esta función "searchStudent" va filtrar al alumno

function searchStudent( nombre, apellido, curso, array ) {
    let fillterStudentData = array.filter( element => {
        if( element.fullName === nombre && element.surname === apellido && element.course === curso) return element;
    });
    return fillterStudentData[0];
};


    /* 
    - Esta función "getStudentData" va añadir al estudiante al curso, si es que no existe en la lista del curso  ( es decir "courseStudentData" ).
    - Si no existe tal alumno pregunta si existe tal alumno en el registro del colegio.
    - si existe tal alumno en el colegio añade este alumno al curso.
    */

function getStudentData( nombre, apellido, curso ) {
    let courseFilter = searchStudent( nombre, apellido, curso, courseStudentData );

    // console.log(courseFilter);

    let revision = courseFilter ?? 'No existe';

    if( revision !== 'No existe' ) {
        console.log( ` El alumno ${nombre} ${apellido} está ya en la lista del curso ${curso} ` );
        return courseStudentData;
    }
    let schoolFilter = searchStudent( nombre, apellido, curso, registerSchool );
    let revision2 = schoolFilter ?? 'No existe';

    if( revision2 === 'No existe' ) {
        return ` No existe ${ nombre } ${ apellido } del curso ${ curso } en el registro del colegio. `
    } else {
        courseStudentData.push( revision2 );
        console.log( ` Hemos añadido a ${ nombre } ${ apellido }, del curso ${ curso } ` );
        return courseStudentData;
    }

}

console.log(getStudentData( 'Keiry', 'Mendoza Chavez', '4º secundaria' ));

// Creación de una clase para instanciar alumnos.

class Alumnos {
    constructor( pastRegister ) {
        this.lista = pastRegister;
    }
    // "getAlumno" me indicara los nombres de los alumnos del curso que me pasen como parámetro, de la lista del colegio
    getAlumno( curso ) {
        let nuevaLista = this.lista;
        let alumnosDelCurso = nuevaLista.filter( element => {
            if( element.course === curso  ) return element;
        }).map( ( value => `${value.fullName} ${ value.surname } `));
        return alumnosDelCurso;
    }
}

let alumnosDelColegio = new Alumnos( registerSchool );
console.log( alumnosDelColegio );

console.log( alumnosDelColegio.getAlumno('4º secundaria') );



// Creación de una función que devuelva una promesa con un objeto de alumno.

    /* 
        Esta es la promesa function que retorna una promesa.
        También tiene 3 parametros, nombre appelido y arreglo ( este parámetro tiene que ser un array, los array que tenemos en los primeros lineas de codigo  ).
        Esta function es para saber si tal persona existe en el array( osea la lista )
        Promete 2 cosas:
        1.- resolve: acá solo va entrar si dicha persona existe en la lista ( array ), y nos va pasar un objeto con las propiedades del dato del alumno.
        2. reject : nos va entrar 2 respuesta diferente pero no simúltaneamente en 2 posibles casos:
            - Una que si los parametros nombre y apellido nos pasa como argumento que no sean string, le pasáremos diciendo que: " El nombre o apellido no son string ".
            - Dos que tal nombre no existe en la lista

    */

function learnerData(nombre, apellido, arreglo) {
    return new Promise( ( resolve, reject ) => {

        if( typeof nombre === 'string' && typeof apellido === 'string' ) {
            let dataFilter = arreglo.filter( element => {
                if( element.fullName === nombre && element.surname === apellido ) return element;
            })

            if( dataFilter <= 0 ){
                reject( ` ${ nombre } ${ apellido } no existe en la lista. ` );
            } else {
                resolve( (dataFilter[0]) );
            }

        } else {
            reject( 'El nombre o apellido no son string' );
        }

    });
};

console.log(learnerData( 'Pablo', 'Aguilar', registerSchool ).then( (mensaje => console.log(mensaje) ) ).catch( (mensaje => console.log(mensaje) ) ))



// Creación de una función con el patrón "async-await" que invoque la anterior para ser disparada desde el formulario.
// Consumo de la promesa en patrón "async-await".
// Consumo de error en patrón "async-await".


    /*  
        - Esta es la funcion con el patrón "async-await" esta invocando la function "learnerDate".
        - Usa 3 parámetros, lo obvia son el nombre y apellido, ya el arreglo es la lista o registro del curso o colegio, que esta en las primeras lineas de codigo.
        - " resolve ": se usa resolve, va invocar e imprimir en consola un objeto con las propiedades de los datos del alumno que se específico, sólo si existe en la lista.
        - " reject " : va invocar reject, en dos formas diferentes pero ninguna chocan en ser llamada a la vez, son la siguientes:

            1.- si el nombre no existe en la lista, entonces mandara error, diciendo que dicho nombre no existe en la lista.

            2.- Si al primer y segundo parametro de la funcion le pasamos argumentos que no sean string, entonces nos mandara error, diciendo que "El nombre o apellido no son string ".

    */
async function getLearnerData( nombre, apellido, arreglo ) {
    try {
        let result = await learnerData( nombre, apellido, arreglo );
        console.log( result );
        return result;
    } catch ( error ) {
        console.error( error );
        throw Error( ` ${error} ` );
    }
}

console.log(getLearnerData('Pablo Andres' , 'Aguilar', registerSchool));




// significado de instanciar...( creo yo sobre programación ):
// Enlace:  https://javiergarciaescobedo.es/programacion-en-java/2-clases-y-objetos/218-instanciacion-de-objetos#:~:text=Por%20ejemplo%2C%20al%20instanciar%20los%20objetos%20s%C3%B3lo%20hay,new%20Random%20%28%29%3B%20Calendar%20fechaActual%20%3D%20Calendar.getInstance%20%28%29%3B

