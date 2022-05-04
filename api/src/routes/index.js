const { Router } = require('express');
const axios = require('axios');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
 
const { Country, Activity} = require('../db');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
	const { data } = await axios.get('https://restcountries.com/v3/all');
	const apiInfo = await data.map((country) => {
		return {
			id: country.cca3,
			name: country.name.common,
			img: country.flags[0],
			continents: country.continents[0],
			capital: country.capital?.[0], //?.[0] por alguna razon pregunto y accedo
			subregion: country.subregion, // de lo contrario no accedo
			area: country.area,
			population: country.population,
		};
	});
	const countryResul = await Country.bulkCreate(apiInfo);
	return countryResul;
};
const getDb = async () => {
	//traer db e incluir una actividad
	return await Country.findAll({
		include: {
			model: Activity,
			attribute: ["name", "difficulty", "duration", "season"],
			through: {
				attributes: [],
			},
		},
	});
};

const getDbActivity = async () => {
	return await Activity.findAll({
		include: {
			model: Country,
			attribute: ["name:", "img", "continents", "capital"],
			through: {
				attributes: [],
			},
		},
	});
};

router.get('/activity', async (req,res) => {
        let activities = await getDbActivity();
        res.status(200).send(activities)
})

router.get('/countries', async (req, res) => {
	// /countries?name=argentina
	const { name } = req.query;
	//countries = await getApiInfo();
	let countries;
	const countryDB = await Country.count();
	countries =countryDB === 0? await getApiInfo() // asi que si la db esta bacia llamo a la api
			: await getDb(); // si no saco de la bd
	if (name) {
		console.log('este es el name', name);
		const byName = countries.filter((n) =>
			n.name.toLowerCase().includes(name.toLowerCase())
		);
		byName.length ? res.status(200).send(byName) : res.status(404).send('no se encontro ningun pais' );
	} else {
		res.status(200).send(countries);
	}
});

router.get('/countries/:id', async function (req, res) {
	const id = req.params.id.toUpperCase();
	const allCountries = await getDb();
	if (id) {
		const idCountries = allCountries.filter((i) => i.id === id);
		idCountries.length? res.status(200).send(idCountries)
			: res.status(404).send('id no valido');
	}
});


router.post('/activity',async(req,res)=>{
	const {countries,name,dificulty,duration,season} =req.body;
    
		const activity = await Activity.create({
			name,
			dificulty,
			duration,
			season,
		})
		console.log("CREATED ACTIVITY ",activity.name)
		

		countries.forEach(async country => {
        
			let countryDb = await Country.findOne({
				where:{
				name:country
				}
			})
		
		
		await countryDb.addActivity(activity)
		

})
res.status(200).send(activity) 
 res.status(404).send('error')

})
module.exports = router;
