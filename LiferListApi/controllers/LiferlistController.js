const Liferlist = require('../models').liferlist;
const Species = require('../models').species;
const Category = require('../models').category;

const getAllLifers = async function (req, res) {
    res.setHeader("Content-Type", "application/json");
    var categoryQry = req.query.category;
    var speciesQry = req.query.species;
    console.log(categoryQry);
    console.log(speciesQry);
    try {

        var myLifers;

        if (categoryQry && speciesQry) {
            console.log("both");
            myLifers = await Liferlist.findAll({
                include: [
                    {
                        model: Species, as: 'speciesId', required: true, attributes: ['name', 'scientificName', 'status'], where: { name: speciesQry },
                        include: [{ model: Category, as: 'categoryId', required: true, attributes: ['categoryName'], where: { categoryName: categoryQry } }]
                    }
                ]
            });

            return res.status(200).json(myLifers);

        } else if (categoryQry) {

            myLifers = await Liferlist.findAll({
                include: [
                    {
                        model: Species, as: 'speciesId', required: true, attributes: ['name', 'scientificName', 'status'],
                        include: [{ model: Category, as: 'categoryId', required: true, attributes: ['categoryName'], where: { categoryName: categoryQry } }]
                    }
                ]
            });

            return res.status(200).json(myLifers);

        } else if (speciesQry) {
            myLifers = await Liferlist.findAll({
                include: [
                    {
                        model: Species, as: 'speciesId', required: true, attributes: ['name', 'scientificName', 'status'], where: { name: speciesQry },
                        include: [{ model: Category, as: 'categoryId', required: true, attributes: ['categoryName'] }]
                    }
                ]
            });

            return res.status(200).json(myLifers);
        } else {
            myLifers = await Liferlist.findAll({
                include: [
                    {
                        model: Species, as: 'speciesId', required: true, attributes: ['name', 'scientificName', 'status'],
                        include: [{ model: Category, as: 'categoryId', required: true, attributes: ['categoryName'] }]
                    }
                ]
            });

            return res.status(200).json(myLifers);
        }

    } catch (error) {
        return res.status(500).json({ "msg": "Something unexpected occured", "error": error });
    }
}
module.exports.getAllLifers = getAllLifers;