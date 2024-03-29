const Posts = require('../Models/Posts');

// getAll
// getByDate
// getByType
// getByName
// getById

async function index (req, res){
    try{
        const data = await Posts.getAll()

        res.status(200).json(data)
    }catch(error){
        res.status(500).json({error: error.message})
    }
}
async function getUpcoming(req, res) {
    try {
      const upcoming = await Posts.upcomingVolunteering();
      res.status(200).json(upcoming);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

async function showByType(req, res){
    try{
        console.log(21)
        let type = req.params.type
        console.log(type)
        const post = await Posts.getByType(type)
        res.status(200).json(post)
    }catch(error){
        res.status(404).json({error: error.message})
    }
}
async function showByName(req, res){
    try{
        let name = req.params.name
        const post = await Posts.getByName(name)
        res.status(200).json(post)
    }catch(error){
        res.status(404).json({error: error.message})
    }
}
async function showByDate(req, res){
    try{
        let date = parseInt(req.params.date)
        const post = await Posts.getByDate(date)
        res.status(200).json(post)

    }catch(error){
        res.status(404).json({error: error.message})
    }
}

async function showById(req, res){
    try{
        let id =  parseInt(req.params.id)
        const post = await Posts.getById(id)
        res.status(200).json(post)
    }catch(error){
        res.status(404).json({error: error.message})
    }
}

async function volunteer(req, res) {
    try {
        console.log(req.body)
        const  data  = req.body; 
        console.log(data)
        const newProject = await Posts.volunteer(data);
        res.status(200).json(newProject);
    } catch(error) {
        res.status(400).json({ error: error.message });
    }
}


module.exports = {index, showByDate, showByType, showByName, showById, getUpcoming, volunteer}