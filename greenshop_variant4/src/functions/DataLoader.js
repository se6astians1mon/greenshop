// images.js
import items from '../data/products.json';
import mapping from '../data/category_mapping2.json';
function products () {
    //Raw structure:        Array of objects where each object equals one product.
    //Target structure:     Array of categories containing the products.
    //Steps:                Adding an id to each product
    const result = [];
    mapping.forEach(element => {
        //create categories
        result.push({id: element.column0, name: element.column1, products: []});
    });
    //modify image paths and add products to categories
    items.forEach(product => {
        //read and find category...
        const found = result.find(category => category.id === product.Rayon);
        product["Lien fichier"] = product["Lien fichier"].replace("\\Fichiers","./images");
        product["Lien fichier"] = product["Lien fichier"].replaceAll("\\","/");
		console.log(found)
        found.products.push(product);
    });
    return(result);
}


export default products;

/* exported structure:
[
    {
        id: "5",
        name: "Charcuterie",
        products: [
            {
                "id": 91,
                "Descriptif Produit": "Sauce provençale Bio Casino  200 g\r\n\r\n",
                "Prix initial": 0.99,
                "Prix/quantité (euro/kg) baseline": 4.95,
                "Rayon": 5,
                "Lien fichier": "\\Fichiers\\Rayon5\\Sauce provençale Bio Casino.jpg",
                "Grammes": 200,
                "Empreinte CO2 (g par 100 g)": 140,
                "kg CO2 / kg": 1.4,
                "Traffic light intra (green = vert, orange orange, red rouge)": "green",
                "Traffic light inter": "green",
                "Prix final  BM80 - calculé": 0.91,
                "Prix/quantité (euro/kg) BM80": 4.55,
                "BM 80 - arrondi": 0.08,
                "Prix final   BM250 - calculé": 0.75,
                "Prix/quantité (euro/kg) BM250": 3.75,
                "BM 250 - arrondi": 0.24,
                "BM 80 - Malus amount (carbon tax, 80euros attributed to 1ton of co2) - Subsidy amount (7.63% of initial price, when 80euros to per ton of co2)": 0.08,
                "BM 250 - Malus amount (carbon tax, 250euros attributed to 1ton of co2) - Subsidy amount(23.86% of initial prices, when 250euros per ton of co2)": 0.24,
                "Prix final  BM80": 0.91,
                "Prix final   BM250": 0.75
            },
        ]
            
    }
  ] */