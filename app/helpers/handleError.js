const httpError = (res, err) => {
    res.status(500);
    res.send({ error: 'Se a producido un error en el servidor' });
}

module.exports = { httpError }