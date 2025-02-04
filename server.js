const mongoose = require('mongoose');
const fs = require('fs');
const Equipe = require('./models/equipeModel');
const Match = require('./models/matchModel');
const User = require('./models/userModel'); // Ajout du modèle User
const dotenv = require('dotenv');
const catchAsync = require('./utils/catchAsync');

process.on('uncaughtException', err => {
	console.log(err);
	console.log(err.name, err.message);
	console.log('UNCAUGHT EXCEPTION! Shutting down1...');
	process.exit(1);
})


dotenv.config({ path: './config.env' });
const app = require('./app');

const db = process.env.DATABASE_mongodb

mongoose.set('strictQuery', true);

mongoose.connect(db, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => console.log("Connected to database"));


const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
	console.log(`Server is running on port http://localhost:${port}/`);
});


process.on('unhandledRejection', err => {
	console.log(err.name, err.message);
	console.log('UNHANDLED REJECTION! Shutting down...');
	server.close(() => {
		process.exit(1);
	})
})


/*-----------------------------------------------------------------------------------*/
/* -------------------- Importing data if the database is empty -------------------- */
/*-----------------------------------------------------------------------------------*/

// Importation des équipes
const Equipes = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/equipes.json`, 'UTF-8'));
const importEquipes = catchAsync(async () => {
	const equipes = await Equipe.find();
	if (equipes.length === 0) {
		try {
			await Equipe.create(Equipes);
			console.log("✅ Equipes imported successfully");
		} catch (e) {
			console.error("❌ Error importing equipes:", e);
		}
	}
});
importEquipes();

// Importation des matchs
const Matchs = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/matchs.json`, 'UTF-8'));
const importMatchs = catchAsync(async () => {
	const matchs = await Match.find();
	if (matchs.length === 0) {
		try {
			await Match.create(Matchs);
			console.log("✅ Matchs imported successfully");
		} catch (e) {
			console.error("❌ Error importing matchs:", e);
		}
	}
});
importMatchs();

// Importation des utilisateurs
const Users = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/users.json`, 'UTF-8'));
const importUsers = catchAsync(async () => {
	const users = await User.find();
	if (users.length === 0) {
		try {
			await User.create(Users);
			console.log("✅ Users imported successfully");
		} catch (e) {
			console.error("❌ Error importing users:", e);
		}
	}
});
importUsers();