const validateDireccion = (origen) => {
    return origen && origen.length >= 2;
  };
  
const validateTime = (hora) => {
    const currentTime = new Date();
    const suggestedTime = new Date(hora);
    return hora && suggestedTime > currentTime;
    };

const validateCupos = (cupos) => {
    return cupos && parseInt(cupos) >= 1;
    };

const validateAddViajeInput = (body) => {
    return (
        validateDireccion(body.origen) &&
        validateDireccion(body.destino) &&
        validateTime(body.hora_inicio) &&

        validateCupos(body.cupos)
    );
  };
    
module.exports = { validateAddViajeInput };