const mongoose = require('mongoose');
const express = require('express');
const UserModel = require('../utils/models/user');
const config  = require('../config');

userPetition = (app) => {
    const URI = `mongodb://${config.dbUser}:${config.dbPassword}@cluster0-shard-00-00.og6lz.mongodb.net:27017,cluster0-shard-00-01.og6lz.mongodb.net:27017,cluster0-shard-00-02.og6lz.mongodb.net:27017/${config.dbname}?ssl=true&replicaSet=atlas-13giey-shard-0&authSource=admin&retryWrites=true&w=majority`;
    mongoose.connect(URI ,{ useNewUrlParser:true, useUnifiedTopology:true });
    mongoose.connection.once('open', () => console.log('Connected succesfully to mongo') );
    const router = express.Router()

    app.use('/api', router);

    router.get('/',  async (req, res, next) => {
        try{
            const users = await UserModel.find();
            users 
            ? res.status(200).json(users) 
            : res.status(404).json({'message': 'we can`t find any user'})
        }catch(e){
            next(e)
        }
    })

    router.get('/:id', async (req, res, next) => {
        const id = req.params.id;
        try{
            const user = await UserModel.findById(id);
            user ? res.status(200).json(user) : res.status(404).json({'message': 'user not found'})
        }catch(e){
            next(e) 
        }
    })

    router.post('/', async( req, res , next) => {
        const  { firstName, lastName, nationality, type, email } = req.body;
        const userData = new UserModel({ firstName, lastName, nationality, type, email });
        try{
            await userData.save((err) => { err 
                ? res.status(404).json({'message': 'error in post data'})
                :res.status(201).json({'message': 'user post it succsessfully', 'id': userData._id } ) })
        }catch(e){
            next(e)
        }
        
    })

    router.put('/:id',async (req, res, next) => {
        const { name, origin, plan, type } = req.body;
        const params = { name, origin, plan, specie }
        origin ? origin : delete params.origin;
        name ? name : delete params.name;
        plan ? plan : delete params.plan;
        type ? type : delete params.type;
        try{
            await UserModel.findByIdAndUpdate(id,params);
            res.status(204).json({'message': 'user updated succsesufuly'})
        }catch(e) {
            res.status(404).json({'message': 'user wasn`t found'})
            next(e)
        }
        
    } )

    router.delete('/:id', async (req, res, next) => {
        const id = re.params.id;
        try{
            await UserModel.findByIdAndDelete(id);
            res.status(204).json({'message': 'user deleted succsesufuly'})
        }catch(e){
            res.status(404).json({'message': 'user wasn`t found'})
        }
    } )
}

module.exports = userPetition