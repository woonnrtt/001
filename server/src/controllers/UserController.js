const {User} = require('../models')

module.exports = {
    // get all user
    async index (req, res) {
        try {
            let users = null
            const search = req.query.search
            if (search) {
                users = await User.findAll({
                    where: {
                        $or: [
                            'name', 'lastname', 'email'
                        ].map(key => ({
                            [key]: {
                                $like: `%${search}%`,
                            }
                        })),
                    },
                    order: [['createdAt', 'ASC']]
                })
            } else {
                users = await User.findAll({
                    order: [['createdAt', 'ASC']]
                })
            }
            res.send(users)
        } catch (err){
            res.status(500).send({
                error: 'The users information was incorrect'
            })
        }
    },

    // create user
    async create (req, res) {
        try {
            const user = await User.create(req.body)
            res.send(user.toJSON())
        } catch (err) {
            res.status(500).send({
                error: 'User already in system'
            })
        }
    },

    // edit user, suspend, active
    async put (req, res) {
        try {
            await User.update(req.body, {
                where: {
                    id: req.params.userId
                }
            })
            res.send(req.body)
            } catch (err) {
                res.status(500).send({
                    error: 'Update user incorrect'
                })
            }
    },

    // delete user
    async remove (req, res) {
        try {
            const user = await User.findOne({
                where: {
                    id: req.params.userId
                }
            })

            if(!user){
                return res.status(403).send({
                    error: 'The user information was incorrect'
                })
            }

            await user.destroy()
            res.send(user)
            } catch (err) {
                res.status(500).send({
                     error: 'The user information was incorrect'
                })
        }
    },

    // get user by id
    async show (req, res) {
        try {
            const user = await User.findById(req.params.userId)
            res.send(user)
        } catch (err) {
            req.status(500).send({
                error: 'The user information was incorrect'
            })
        }
    },
    // get last user 
    async lastuser (req, res) {
        try {
            const users = await User.findAll()
            res.send(users[users.length-1])   
        } catch (err) {
            req.status(500).send({
                error: 'The user information was incorrect'
            })
        }
    },
    async getFront (req, res) {
        try {
            const users = await User.findAll()
            let listNames = []
            users.forEach(user => {
                let name = {
                    "id":user.id,
                    "name":`${user.name} ${user.lastname}`
                }
                listNames.push(name)
            })
            res.send(listNames)
        } catch (err){
            res.status(500).send({
                error: 'The users information was incorrect'
            })
        }
    },
}