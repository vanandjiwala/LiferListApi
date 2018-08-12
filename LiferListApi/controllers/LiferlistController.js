const Liferlist = require('../models').liferlist;
const Birds = require('../models').birds;

const getAllLifers = async function(req, res) {
    res.setHeader("Content-Type", "application/json");
    // res.json({"res":"Got all lifers"});
    let body = [];
    Liferlist.findAll({
        include: [
            {model: Birds,as: 'birdId',attributes: ['name','scientificName','status']}
        ]
    }).then(function(lifers){
        //console.log(lifers[0].dataValues);
        for(var i = 0; i < lifers.length ; i++){
            console.log(lifers[i].dataValues.birdId.dataValues);
            body.push(lifers[i].dataValues);
        }
        return res.json(JSON.stringify(body));
    }).catch(function(err){
        return res.json({"msg":"Something unexpected occured","error":err})
    });
}
module.exports.getAllLifers = getAllLifers;