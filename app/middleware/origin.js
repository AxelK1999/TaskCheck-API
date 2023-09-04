
const checkOrigin = (req, res, next) => {
    try {

        console.log(req.headers.origin);

        //const token = req.headers.authorization.split(' ').pop()
        const rutas = req.headers.origin;

      // if (token === '123456') {
            next()
      /*  } else {
            res.status(409)
            res.send({ error: 'Tu por aqui no pasas!' })
        }*/

    } catch (e) {
        next()
    }

}

module.exports = checkOrigin