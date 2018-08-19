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