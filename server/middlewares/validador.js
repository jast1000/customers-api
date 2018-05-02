let validarCliente = (req, res, next) => {
    let cliente = req.body;
    if (!cliente.nombre || !cliente.correo || !cliente.telefono) {
        return res.status(400).json({
            response: 'Estructura de cliente inválida'
        });
    }
    next();
};

module.exports = {
    validarCliente
};