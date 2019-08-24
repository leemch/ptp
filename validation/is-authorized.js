const Trainer = require("../models/User");



module.exports = function isAuthorized(client_id, trainer_id) {
	let error = "";
	let isAuth = false;

	//data.email = !isEmpty(data.email) ? data.email : "";
	//data.password = !isEmpty(data.password) ? data.password : "";

	if(client_id == trainer_id){
		isAuth = true;
	}
	else {
		Trainer.findById(trainer_id)
		.then(trainer => {
	
			if(trainer.client_list.filter(trainersClient => trainersClient.client == client_id).length > 0){
				isAuth = true;
			}
			else{
				isAuth =  false;
				error = "This is not a client of this trainer.";
			}
		})
		.catch(err => {
			isAuth = false;
			error = "This trainer does not exist."
		});
	}


	return{
		error,
		isAuth
	}
}