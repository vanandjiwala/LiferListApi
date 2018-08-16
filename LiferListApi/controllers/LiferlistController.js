const Liferlist = require('../models').liferlist;
const Species = require('../models').species;
const Category = require('../models').category;

const getAllLifers = async function(req, res) {
    res.setHeader("Content-Type", "application/json");
    // res.json({"res":"Got all lifers"});
    let body = [];
    Liferlist.findAll({
        include: [
            {
                model: Species,as: 'speciesId',attributes: ['name','scientificName','status'],
                include:[{model: Category,as: 'categoryId',attributes: ['categoryName']}]
            }
        ]
    }).then(function(lifers){
        //console.log(lifers[0].dataValues);
        for(var i = 0; i < lifers.length ; i++){
            // console.log(lifers[i].dataValues.birdId.dataValues);
            body.push(lifers[i].dataValues);
        }
        return res.json(JSON.stringify(body));
    }).catch(function(err){
        return res.json({"msg":"Something unexpected occured","error":err})
    });
}
module.exports.getAllLifers = getAllLifers;