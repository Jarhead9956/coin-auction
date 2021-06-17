const models = require('../models');

module.exports = {
    get: {
        getAll: (req, res, next) => {
            models.Coin.find()
                .populate('sallesman')
                .then((coins) => {
                    res.send(coins)
                })
                .catch(next);
        },

        getOne: (req, res, next) => {
            const id = req.params.id;
            
            models.Coin.findById(id)
            .populate('sallesman')
            .then((coin) => {
                res.send(coin)
            })
            .catch(next);
        }
    },

    post: {
        buy: (req, res, next) => {
            const { coinId } = req.params
            
            models.Coin
                .findById({ _id: coinId})
                .populate('buyers')
                .then((coin) => {
                    const user = req.user._id
                    
                    coin.buyers.push(user);
                    coin.save()
                    console.log(coin)
                    res.send(coin)
                })
                .catch((e) => console.log(e));
        },

        create: (req, res, next) => {
            const { name, price, imageUrl, description} = req.body
            const { _id } = req.user;
    
            models.Coin.create({ name, price, imageUrl, description, sallesman: _id })
                .then((createdCoin) => {
                    return Promise.all([
                        models.User.updateOne({ _id }, { $push: { myCoins: createdCoin } }),
                        models.Coin.findOne({ _id: createdCoin._id })
                    ]);
                })
                .then(([modifiedObj, coinObj]) => {
                    res.send(coinObj);
                })
                .catch(next);
        }
    },

    put: (req, res, next) => {
        const id = req.params.id;
        
        models.Coin.updateOne({ _id: id },{ $set: { ...req.body }})
            .then((updatedCoin) => res.send(updatedCoin))
            .catch(next)
    },

    delete: (req, res, next) => {
        const id = req.params.id;

        models.Coin.deleteOne({ _id: id })
            .then((removedCoin) => res.send(removedCoin))
            .catch(next)
    }
};