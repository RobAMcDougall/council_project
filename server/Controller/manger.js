const Managers = require('../Models/Manager')
const Project = require('../Models/Manager')

async function index (req, res){
    try{
        let name = req.params.name
        const manager = await Managers.organisationInfo()
        res.status(200).json(manager) 
    }catch(error){
        res.status(404).json({error:error.message})
    }
}

async function showByType(req, res){
    try{
        let type = req.params.type
        const post = await Project.getByType(type)
        res.status(200).json(post)
    }catch(error){
        res.status(404).json({error: error.message})
    }
}
async function showByName(req, res){
    try{
        let name = req.params.name
        const post = await Project.getByName(name)
        res.status(200).json(post)
    }catch(error){
        res.status(404).json({error: error.message})
    }
}
async function showByDate(req, res){
    try{
        let date = parseInt(req.params.date)
        const post = await Project.getByDate(date)
        res.status(200).json(post)

    }catch(error){
        res.status(404).json({error: error.message})
    }
}

async function showById(req, res){
    try{
        let id =  parseInt(req.params.date)
        const post = await Project.getById(id)
        res.status(200).json(post)
    }catch(error){
        res.status(404).json({error: error.message})
    }
}

async function create( req, res){
    try{

    }catch(err){

    } 
}
async function destroy(req, res){
    try{

    }catch(err){

    }
}
async function update(req, res){
    try{

    }catch(err){

    }
}
module.exports = {index, showByDate, showByName, showByType, showById, create, destroy, update}