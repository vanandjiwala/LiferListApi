const Category = require('../models').category;

const getAllCategories = async function(req, res) {
    res.setHeader("Content-Type", "application/json");
    let body = [];
    Category.findAll({
    }).then(function(categories){
        //console.log(lifers[0].dataValues);
        for(var i = 0; i < categories.length ; i++){
            body.push(categories[i].dataValues);
        }
        return res.json(JSON.stringify(body));
    }).catch(function(err){
        return res.json({"msg":"Something unexpected occured","error":err})
    });
}
module.exports.getAllCategories = getAllCategories;