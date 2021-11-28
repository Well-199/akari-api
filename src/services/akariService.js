// const { query } = require('../db');
const db = require('../db')

module.exports = {
    getAll: () => {
        return new Promise((resolve, reject) => {

            db.query('SELECT * FROM pedidos', (error, results) => {
                if(error) { reject(error); return;}
                resolve(results)
            })

        })
    },
    findById: (id) => {
        return new Promise((resolve, reject) => {

            db.query('SELECT * FROM pedidos WHERE id = ?', [id], (error, results) => {
                if(error) { reject(error); return; }
                if(results.length > 0){
                    resolve(results[0]);
                }
                else{
                    resolve(false)
                }
            })

        })
    },
    add: (cliente, produto, quantidade, trocas, valor, data_emissao, data_entrega, vendedor, total) => {
        return new Promise((resolve, reject) => {

            db.query('INSERT INTO pedidos (cliente, produto, quantidade, trocas, valor, data_emissao, data_entrega, vendedor, total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [cliente, produto, quantidade, trocas, valor, data_emissao, data_entrega, vendedor, total], (error, results) => {
                if(error) { reject(error); return; }
                resolve(results.insertId)
            })
        })
    },
    addUser: (nome, email) => {
        return new Promise((resolve, reject) => {

            db.query('INSERT INTO usuarios (nome, email) VALUES (?, ?)', 
            [nome, email], (error, results) => {
                if(error) { reject(error); return; }
                resolve(results.insertId)
            })
        })
    },
    update: (id, produto) => {
        return new Promise((resolve, reject) => {
   
            db.query('UPDATE pedidos SET produto = ? WHERE id = ? ',
                [produto, id],
                (error, results) => {
                    if(error) { reject(error); return; }
                    resolve(results)
                }
            )
        })
    },
    delete: (id) => {
        return new Promise((resolve, reject) => {

            db.query('DELETE FROM pedidos WHERE id = ?', 
                [id], 
                (error, results) => {
                    if(error) { reject(error); return; }
                    resolve(results)
            })
        })
    }
}