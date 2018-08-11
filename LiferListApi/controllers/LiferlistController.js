const Liferlist = require('../models').liferlist;

const getAllLifers = async function(req, res) {
    res.setHeader("Content-Type", "application/json");
    // res.json({"res":"Got all lifers"});
    let body = [];
    Liferlist.findAll({
        order:[
            ['Name','DESC']
        ]
    }).then(function(lifers){
        //console.log(lifers[0].dataValues);
        for(var i = 0; i < lifers.length ; i++){
            body.push(lifers[i].dataValues);
        }
        
        res.json(JSON.parse(JSON.stringify(body)));
    });
}
module.exports.getAllLifers = getAllLifers;