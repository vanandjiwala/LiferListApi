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

//TODO: Get rid of UnhandledPromiseRejectionWarning: ReferenceError: id is not defined
const getLifer = async function(req, res){
 var liferId = req.params.lifer_id;
    Liferlist.findOne({
        where:{ id : liferId },
        include: [
            {model: Birds,as: 'birdId',attributes: ['name','scientificName','status']}
        ]
    }).then(function(lifer){
        if(lifer){
            //resolve();
            return res.json(lifer);
        }else{
            //reject();
            return res.json({"msg":"No lifer with the id " + liferId + " present in the database"}); 
        }
        
    }).catch(function(){
        return res.json({"msg":"Something unexpected occured","error":"err1"});
    });
}
module.exports.getLifer = getLifer; 