const { json } = require('express');
const fs = require('fs');
const path = require('path');
const { send } = require('process');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
let prod = require("../data/productsDataBase.JSON")
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");




const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render("../views/products",{

			products

		});




	},
	detail: (req, res) => { 

		let detalle =  products.find(function (determinado) {
			return determinado.id == req.params.id

})
	if(detalle){res.render("../views/detail", {detalle})};
},



	// Create - Form to create
	create: (req, res) => {

		res.render("../views/product-create-form")
		
	},
	
	// Create -  Method to store
	store: (req, res, next) => {

		let datos = fs.readFileSync("./data/productsDataBase.json", {encoding: "utf-8"})

		datos = JSON.parse(datos);

		
		
		
		
		//console.log(nuevoProducto)




		datos.push({
			...req.body,
			id: datos[datos.length-1].id+1,
			image: req.files[0].filename
		});
			
			console.log(req.body)

		datos = JSON.stringify(datos)

		fs.writeFileSync("./data/productsDataBase.json", datos)

		
		res.redirect("/products")
	},

	// Update - Form to edit
	edit: (req, res) => {

		let editar = products.find(function(item){
			return item.id == req.params.id
		})
		if (editar) 
		{res.render("../views/product-edit-form",{editar})}

	},
	// Update - Method to update
	update: (req, res) => {
	let edicion =	products.forEach(element => {
			if(element.id == req.params.id){
				element.name == req.body.name;
				element.price == req.body.price;
				element.discount == req.body.discount;
				element.category == req.body.category;
				element.description == req.body.description;
			}
			
			res.redirect("../views/products", {edicion})});
		


	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;