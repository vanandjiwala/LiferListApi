const Species = require('../models').species;
const Category = require('../models').category;

const getAllSpecies = async function (req, res) {
    res.setHeader("Content-Type", "application/json");
    var categoryQry = req.query.category;
    console.log(categoryQry);
    var selectedCategory;
    try {
        var category = await Category.findOne({
            where: { categoryName: categoryQry },
            attributes: ['id']
        });
        if (category) {
            console.log(category.dataValues.id);
            selectedCategory = category.dataValues.id;
        } else {
            return res.status(400).json({ "msg": "Something unexpected occured" });
        }
    } catch (error) {
        return res.status(400).json({ "msg": "Something unexpected occured", "error": error });
    }

    try {
        var species = await Species.findAll({
            where: { category_id: selectedCategory }
        });
        if (species) {
            return res.status(200).json(species);
        } else {
            return res.status(200).json({ "msg": "No species present in the database" });
        }
    } catch (error) {
        return res.status(500).json({ "msg": "Something unexpected occured", "error": error });
    }
};
module.exports.getAllSpecies = getAllSpecies;

const addSpecies = async function (req, res) {
    res.setHeader("Content-Type", "application/json");
    const body = req.body;
    console.log(body.name);
    //Validating required field.
    if (!body.name) {
        console.log("Name must be given")
    } else {
        try {
            const species = await Species.findOne({
                where: { name: body.name }
            });
            if (species) {
                return res.status(409).json({ "msg": "species already present in the database" });
            } else {
                const categoryId = await Category.findOne({
                    where: {
                        categoryName: body.categoryName
                    },
                    attributes: ['id']
                });

                if (categoryId) {
                    delete body.categoryName;
                    body.category_id = categoryId.dataValues.id;
                    var newSpecies = await Species.create(body);
                    if (newSpecies) {
                        return res.status(201).json({ "msg": "Species with name " + body.name + " created in the database" });
                    }
                } else {
                    return res.status(404).json({ "msg": "Specified Category Not present in the Database" });
                }
            }
        } catch (error) {
            return res.status(500).json({ "msg": "Something unexpected occured", "error": error });
        }

    }
};
module.exports.addSpecies = addSpecies;

const updateSpecies = async function(req, res){
    res.setHeader("Content-Type", "application/json");
    console.log(req.params.speciesName);
    const body = req.body;
    try {
        var updateSpecies = await Species.findOne({
            where : { 
                name : req.params.speciesName
            }
        });

        if(updateSpecies){
            console.log("update record");
            console.log(updateSpecies.dataValues.category_id);

            var category = await Category.findOne({
                where : {
                    id: updateSpecies.dataValues.category_id
                },
                attributes: ['categoryName']
            });

            if(category){
                console.log(category.dataValues.categoryName);
                console.log(body.categoryName);
                if(category.dataValues.categoryName == body.categoryName){
                    console.log("Just species table");
                    updateSpecies.updateAttributes(body);
                    return res.status(200).json({ "msg": "Species with name " + req.params.speciesName + " Updated in the database" });
                }else{
                    console.log("species table plus categories table");
                    category = await Category.findOne({
                        where : {
                            categoryName: body.categoryName
                        },
                        attributes: ['id']
                    });

                    body.category_id = category.dataValues.id;
                    updateSpecies.updateAttributes(body);
                    return res.status(200).json({ "msg": "Species with name " + req.params.speciesName + " Updated in the database" });
                }
            }else{
                return res.status(404).json({ "msg": "Specified Category Not present in the Database" }); 
            }

        }else{
            return res.status(404).json({ "msg": "Specified Species Not present in the Database" });
        }

    } catch (error) {
        return res.status(500).json({ "msg": "Something unexpected occured", "error": error });
    }
};
module.exports.updateSpecies = updateSpecies;

const deleteSpecies = async function(req, res){
    res.setHeader("Content-Type", "application/json");
    console.log(req.params.speciesName);
    try {
        var deleteSpecies = await Species.destroy({
            where: {
                name: req.params.speciesName
            }
        });

        if (deleteSpecies == 1) {
            return res.status(200).json({ "msg": "Species with name " + req.params.speciesName + " deleted in the database" });
        } else {
            return res.status(200).json({ "msg": "Species with name " + req.params.speciesName + " could not be deleted in the database" });
        }
        
    } catch (error) {
        return res.status(400).json({ "msg": "Something unexpected occured", "error": error });
    }

};
module.exports.deleteSpecies = deleteSpecies;