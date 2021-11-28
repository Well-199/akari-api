const express = require('express')
const router = express.Router()

const akariController = require('./controllers/akariController')

router.get('/ping', akariController.ping)

router.get('/pedidos', akariController.all)
router.get('/pedido/:id', akariController.one)
router.post('/usuario', akariController.teste)
router.post('/pedido', akariController.new)
router.put('/pedido/:id', akariController.edit)
router.delete('/pedido/:id', akariController.delete)

module.exports = router