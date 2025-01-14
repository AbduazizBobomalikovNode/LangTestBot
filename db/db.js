const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.DATE_URL;
const client = new MongoClient(uri);

if(client)
  console.log('DataBesega ulanish hosil qilindi!')

let col = null;
let col2 = null;
let db = null;
let flag = false;
class Data{
	constructor(){
		(async  function() {
        await client.connect()
		db = client.db('quizbot');

		col = await db.collection("users")
		if(col)
			console.log('USERS jadvaliga ulanish hosil qilindi!');
		// col2 = await db.collection("result")
		// if(col2)
		// 	console.log('results jadvaliga ulanish hosil qilindi!');
        })();
	}
    async is_user(id){
        if (col){
            return await col.findOne({id:id},{_id:0})
                .then(result => {
                    return result;
                }).catch(err =>{
                    console.log('foydalanuvchi haqida malumot kelmadi!')
                    return null;
                })
        }else{
              await sleep(1000);
              return this.is_user(id);
        }
    }

    async add_user(user){
        if (!(await this.is_user(user.id))) {
            await col.insertOne(user);
           }else{
            await this.update_user(user);
           }
           //console.log(await this.is_user(user));
    }
    
    async update_user(user){
		return await col.updateOne(		    
			    { id : user.id},{ 
			    $set : user,
			    $currentDate: { lastModified: true }
			})
	}
	async getGroup(gr){
		var k = [];
		let x =  await col.find({group:gr}, { projection: { _id: 0,id:1,name:1} })
		await x.forEach(
			function(dir){
				k.push(dir)
			}
		);
		return k;
	}
	async getAllUsers(gr){
		var k = [];
		let x =  await col.find({}, { projection: {id:1} })
		await x.forEach(
			function(dir){
				k.push(dir)
			}
		);
		return k;
	}
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = new Data();

/*
	async addUser(user,lang,botn){
			if (!(await this.getUser(user))) {
			 await col.insertOne({user_id:user,user_lang:lang,bot:botn});
			}else{
			 await this.updateUser(user,lang,botn);
			}
			console.log(await this.getUser(user));
	}


	async getAllUsers(botn){
		let flag = false;
		  let result = await col.find({bot:botn}, { projection: { _id: 0, user_id: 1 } }).toArray(function(err, result) {
					    if (err) throw err;
					    set(result);		    
					  });
		  function set(r){
		  	result = r;
		  	console.log('worked')
		  	flag = true;
		  }
		  while(!flag){
		  	await sleep(1000);
		  }
		 	let users = []
			if (result.length > 1) {
				for (var i = result.length - 1; i >= 0; i--) {
				 		users.push(result[i].user_id)
				  }
				}
			return users;
	}
	async getUser(user){
		if (col)
		  return await col.findOne({user_id:user},{_id:0})
				  .then(result => {
				  	return result.user_lang;
				  }).catch(err =>{
				  	console.log('foydalanuvchi haqida malumot kelmadi!')
				  	return null;
				  })
			else{
				await sleep(1000);
				return this.getUser(user);
				}
	}
	async getUserResult(user){
		if (col2)
		return col2.findOne({user_id:user},{_id:0})
				  .then(result => {
				  	return result.data;
				  }).catch(err =>{
				  	console.log('foydalanuvchi natijalari haqida malumot kelmadi!')
				  	return null;
				  })
	}
	async addUserResult(user,datax){
			 		await col2.insertOne({user_id:user,data:datax});
	}
	async updateUserResult(user,datax){
			await col2.updateOne(		    
			    { user_id : user},{ 
			    $set : {user_id:user,data:datax},
			    $currentDate: { lastModified: true }
			}).then(result => {
				   console.log('foydalanuvchi natijalari saqlandi!')
				  }).catch(err =>{
				  	console.log('foydalanuvchi natijalari saqlab bo\'lamadi!')
				  })
	}
	async deleteUserResult(user){
		 let delResults =  await col2.deleteOne({user_id:user})
		 return delResults;
	}
*/