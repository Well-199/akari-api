const akariService = require('../services/akariService')

module.exports = {
    ping: (req, res) => {
        res.json({pong: true})
    },
    all: async (req, res) => {
        let json = {error: '', result: []}

        let pedidos = await akariService.getAll()

        for(let i in pedidos){
            json.result.push({
                id: pedidos[i].id,
                cliente: pedidos[i].cliente,
                produto: pedidos[i].produto,
                quantidade: pedidos[i].quantidade,
                trocas: pedidos[i].trocas,
                valor: pedidos[i].valor,
                data_emissao: pedidos[i].data_emissao,
                data_entrega: pedidos[i].data_entrega,
                vendedor: pedidos[i].vendedor,
                total: pedidos[i].total
            })
        }

        res.json(json)
    },
    one: async (req, res) => {
        let json = {error: '', result: {}}

        let id = req.params.id
        let pedido = await akariService.findById(id)

        if(pedido){
            json.result = pedido
        }

        res.json(json)
    },
    new: async (req, res) => {
        let json = {error: '', result: {}}

        let cliente = req.body.cliente
        let produto = req.body.produto
        let quantidade = req.body.quantidade
        let trocas = req.body.trocas
        let valor = req.body.valor
        let data_emissao = req.body.data_emissao
        let data_entrega = req.body.data_entrega
        let vendedor = req.body.vendedor
        let total = req.body.total

        if(cliente && produto){
            let produtoId = await akariService.add(cliente, produto, quantidade, trocas, valor, data_emissao, data_entrega, vendedor, total)

            json.result = {
                id: produtoId,
                cliente,
                produto,  
                quantidade,
                trocas,
                valor,
                data_emissao,
                data_entrega,
                vendedor
            }
        }
        else{
            json.error = 'Campos não enviados'
        }

        res.json(json)
    },
    teste: async (req, res) => {
        let json = {error: '', result: {}}

        let nome = req.body.nome
        let email = req.body.email

        if(nome, email){

            let usuarioId = await akariService.addUser(nome, email)

            json.result = {
                id: usuarioId,
                nome: nome,
                email: email
            }
        }

        res.json(json)
    },
    edit: async (req, res) => {
        let json = {error: '', result: {}}

        let id = req.params.id
        let cliente = req.body.cliente

        if(id && cliente){
            await akariService.update(id, cliente)

            json.result = {
                id,
                cliente
            }
        }
        else{
            json.error = 'Campos não enviados'
        }

        res.json(json)
    },
    delete: async (req, res) => {
        let json = {error: '', result: {}}

        await akariService.delete(req.params.id)

        res.json(json)
    }
}