const { log } = require('console');
const { json } = require('express');
const fs = require('fs');
const path = require('path');
const { send } = require('process');

//const productsFilePath = path.join(__dirname,'../data/productsDataBase.json');
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
//const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productos = fs.readFileSync("./data/productsDatabase.json", "utf-8");
let products = JSON.parse(productos);







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
	
	update: (req, res, next) => {

		let productos_parse = fs.readFileSync("./data/productsDataBase.json", {encoding: "utf-8"})

		console.log(productos_parse)
		let productos = JSON.parse(productos_parse);
		console.log("aASDFDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
		console.log(productos)
		
		for (var i = 0; i < productos.length; i++){
			if(productos[i].id == req.params.id){
				productos[i].name = req.body.name;
				productos[i].price = req.body.price;
				productos[i].discount = req.body.discount;
				productos[i].category = req.body.category;
				productos[i].description = req.body.description;
				console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
				console.log(productos[i])
			}
		}
	


			
			const products_json = JSON.stringify(productos)
			
			fs.writeFileSync(products, products_json, "utf-8");

			products = JSON.parse(products);

			
			
		

		
			

			
			res.render("products", {products});
		


	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {

		products = products.filter(borrado => borrado.id != req.params.id);
		
		products = JSON.stringify(products)

		console.log(products)
		
		fs.writeFileSync('./data/productsDataBase.json', products, 'utf-8')

		res.redirect("/")


	}
};

module.exports = controller;