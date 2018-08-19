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
            return res.status(400).json({ "msg": "Something unexpected occured"});
        }
    } catch (error) {
        return res.status(400).json({ "msg": "Something unexpected occured", "error": error });
    }

    try {
        var species = await Species.findAll({
            where: { category_id: selectedCategory}
        });
        if (species) {
            return res.status(200).json(species);
        } else {
            return res.status(200).json({ "msg": "No species present in the database" });
        }
    } catch (error) {
        return res.status(400).json({ "msg": "Something unexpected occured", "error": error });
    }
};
module.exports.getAllSpecies = getAllSpecies;

const addSpecies = async function(req,res){

};
module.exports.addSpecies = addSpecies;