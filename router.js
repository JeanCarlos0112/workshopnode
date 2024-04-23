const express = require('express');
//const db_produtos = require('./produtos')
const Produtos = require('./produtos');

const router = express.Router();


router.get('/', async(req,res) => {
    const produtos = await Produtos.findAll()
    res.status(200).json(produtos);
})

router.get('/:id', async (req, res ) => {
    const { id } = req.params;
    const produto = await Produtos.findByPk(id);
    res.status(200).json(produto);
})

router.post('/', async (req, res) => {
    const { descricao, valor, marca } = req.body;
    const novoProduto = await Produtos.create({
        descricao,
        valor,
        marca
    })
    res.status(201).json(novoProduto);
})


router.put('/:id', async(req, res ) => {
    const { id } = req.params;
    const { descricao, valor, marca } = req.body;

    if(!descricao || !valor || !marca){
        res.status(400).json({
            error: "Campos obrigatorios não preenchidos"
        })
    }
    try{
        const [updateRows] = await Produtos.update({
            descricao,
            marca,
            valor
        },{
        where: {id}
        }) 
        if (updateRows==0){
            res.status(401).json({
                error: "Produto não encontrado"
            })
        }
        const atualizadoProduto = await Produtos.findByPk(id);
        res.status(200).json(atualizadoProduto);
    } catch(err){
        console.error(err);
    }
})

//if (!descricao || !valor)

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    await Produtos.destroy({
        where: {id}
    });
    res.status(200).json({
        message: "Produto deletado com sucesso."
    })
})

module.exports = router;