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

const addCategory = async function(req, res) {
    res.setHeader("Content-Type", "application/json");
    const body = req.body;
    console.log(body);
    Category.findOne({
        where:{
            categoryName : body.categoryName
        }
    }).then(function(category){
        if(category){
            return res.json({"msg":"category with name " + body.categoryName + " already present in the database"});
        }else{
            console.log("Null");
            Category
            .create(body)
            .then(newCat => {
                return res.json({"msg":"category with name " + body.categoryName + " created in the database"});
            });
        }
    }).catch(function(err){
        return res.json({"msg":"Something unexpected occured","error":err});
        console.log(err);
    });
    //res.json(body);
}
module.exports.addCategory = addCategory;