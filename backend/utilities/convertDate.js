const {format, addMinutes} = require ("date-fns");


// Funcion para convertir la fecha UTC en fecha date para que lo acepte la base de datos

function formatDateToDB(date){
    let internalDate;

    console.log(date)

    if(typeof date === "string"){
        internalDate = new Date(date);
    }else{
        internalDate = date;
    }

    const adjustedDate = addMinutes(
        internalDate,
        internalDate.getTimezoneOffset() 
    );

    return format(adjustedDate,"yyyy-MM-dd")
}



module.exports ={
    formatDateToDB
}


