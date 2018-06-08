var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var neo4j = require('neo4j-driver').v1;

var app = express();

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'id49co4h'));
//var driver1 = neo4j.driver('default://localhost', neo4j.auth.basic('neo4j', 'id49co4h') );
var session = driver.session();
//var session = driver1.session();



app.get('/show', function(req, res) {
	var title = "List of Bank Accounts";
	var title1 = "List of Credit Accounts";
	var title2 = "List of Unsecured Loans";
	
	session
	.run('MATCH (a:AccountHolder) OPTIONAL MATCH (a)-[:HAS_ADDRESS]->(add:Address) OPTIONAL MATCH (a)<-[:HAS_PHONENUMBER]->(p:PhoneNumber) OPTIONAL MATCH (a)<-[:HAS_BANKACCOUNT]->(b:BankAccount) OPTIONAL MATCH (a)<-[:HAS_SSN]->(s:SSN) OPTIONAL MATCH (a)<-[:HAS_CREDITCARD]->(cc:CreditCard) OPTIONAL MATCH (a)<-[:HAS_UNSECUREDLOAN]->(u:UnsecuredLoan) RETURN DISTINCT a, add, p, b, s, cc, u')
	.then(function(result) {
		var allArr = [];

		result.records.forEach(function(record){
				allArr.push({
				
					id: record._fields[0].identity.low,
					uid: record._fields[0].properties.UniqueId,

					state: record._fields[1].properties.State,
					city: record._fields[1].properties.City,

					phone: record._fields[2].properties.PhoneNumber,

					accn: record._fields[3].properties.AccountNumber,
					balance: record._fields[3].properties.Balance,

					ssn: record._fields[4].properties.SSN	
				});


			});
	session

	.run('MATCH (a:AccountHolder)-[:HAS_CREDITCARD]->(cc:CreditCard) RETURN DISTINCT a, cc')
	.then(function(result2) {
		var ccArr = [];
		result2.records.forEach(function(record){
				ccArr.push({

					uid: record._fields[0].properties.UniqueId,
					id: record._fields[1].identity.low,
					caccn: record._fields[1].properties.AccountNumber,
					cbalance: record._fields[1].properties.Balance,
					exp: record._fields[1].properties.ExpirationDate,
					climit: record._fields[1].properties.Limit,
					scode: record._fields[1].properties.SecurityCode
				});
			});
			

	session

	.run('MATCH (a:AccountHolder)-[:HAS_UNSECUREDLOAN]->(u:UnsecuredLoan) RETURN DISTINCT a, u')
	.then(function(result3) {
		var uArr = [];
		result3.records.forEach(function(record){
				uArr.push({
					uid: record._fields[0].properties.UniqueId,
					id: record._fields[1].identity.low,
					apr: record._fields[1].properties.APR,
					laccn: record._fields[1].properties.AccountNumber,
					lbalance: record._fields[1].properties.Balance,
					lamount: record._fields[1].properties.LoanAmount
					
				});
			});
			
		res.render('show', {
			showAll: allArr, 
			title: title, 
			ccAll: ccArr, 
			title1: title1,
			uAll: uArr,
			title2: title2
		});

	})
	.catch(function(err){
		console.log(err);
	});
})
	.catch(function(err){
		console.log(err);
	});

})
		
	.catch(function(err){
				console.log(err);
			});
});


app.get('/credit', function(req,res){
   var title = "Create Credit Account";
   session
   .run('MATCH (a:AccountHolder) RETURN a, a.UniqueId')
   .then(function(result){
   		var dropArr = [];
   		result.records.forEach(function(record){
   			dropArr.push({
   				id: record._fields[0].identity.low,
				uid: record._fields[0].properties.UniqueId
   			});
   		});
   

   session
   .run('Match (c:CreditCard) RETURN c, ID(c), c.AccountNumber')
   .then(function(result1){
   		var dropdArr = [];
   		result1.records.forEach(function(record){
   			dropdArr.push({
   				id: record._fields[0].identity.low,
   				caccn: record._fields[0].properties.AccountNumber
   			});
   	});

   	session
   .run('Match (c:CreditCard) RETURN c')
   .then(function(result2){
   		var cArr = [];
   		result2.records.forEach(function(record){
   			cArr.push({
   				id: record._fields[0].identity.low,
   				caccn: record._fields[0].properties.AccountNumber,
   				balanace: record._fields[0].properties.Balance,
   				exp: record._fields[0].properties.ExpirationDate,
   				limit: record._fields[0].properties.Limit,
   				scode: record._fields[0].properties.SecurityCode

   			});
   	});
   	
   	res.render('credit' , {title : title, dropdownAC: dropArr, dropdownCC: dropdArr, show: cArr });
   })

   .catch(function(err){
		console.log(err);
	});
  })

   .catch(function(err){
		console.log(err);
	});
  })

	.catch(function(err){
		console.log(err);
	});

});


app.get('/analys', function(req,res){
	var title = "Fraud Rings";

	session
   .run('MATCH (a:AccountHolder)-[]->(contactInformation) WITH contactInformation, count(a) AS RingSize MATCH (contactInformation)<-[]-(a) WITH collect(a.UniqueId) AS AccountHolders, contactInformation, RingSize WHERE RingSize > 1 RETURN AccountHolders AS FraudRing, labels(contactInformation) AS ContactType, RingSize ORDER BY RingSize DESC')
   
   .then(function(result){
   		
   		var qArr = [];
   		
   		
   		result.records.forEach(function(record){
   			qArr.push({
   				
   				rs: record.get('RingSize'), 
   				fr: record.get('FraudRing'),
   				ct: record.get('ContactType')
   				
   			});
   			
   		});

   res.render('analys', {title: title, query: qArr}); 
})
   .catch(function(err){
		console.log(err);
	});
 });


app.get('/account', function(req,res){
   //res.sendFile(__dirname + '/index.html');
   var title = "Create Bank Account";
   res.render('account' , {title : title});
 });


app.get('/unsloan', function(req,res){
   //res.sendFile(__dirname + '/index.html');
   var title = "Unsecured Loan";
   res.render('unsloan' , {title : title});
 });

/*app.get('/edit', function(req,res){
   //res.sendFile(__dirname + '/index.html');
   var title = "Edit your datas";
   var id = req.params.id;
   res.render('edit' , {title: title, doc: id});
 });
 */

app.get('/edit/:id', function(req, res) {
	var title = "Edit your datas";
	var data = req.body;
	var id = req.params.id;
	session
	.run("MATCH (a:AccountHolder) WHERE ID(a)="+id+" RETURN a")
	 
	.then(function(result) {
		res.render('edit', {title: title, doc: result, data: data})
	}) 
	.catch(function(err){
		console.log(err);
	})
});



app.post('/update/:id', function(req, res) {
	//var data = req.body;
	//var id = req.params.id;
	var id = req.body.id;
	var caccn = req.body.caccn;
	var balance = req.body.balance;
	var exp = req.body.exp;
	var limit = req.body.limit;
	var scode = req.body.scode;
 	//var fname = req.body.fname;
	//var lname = req.body.lname;
	//var uid = req.body.uid;
	//var phone = req.body.phone; 
	//var street = req.body.street;
	//var state = req.body.state;
	//var city = req.body.city;
	//var zipcode = req.body.zipcode;
	//var accn = req.body.accn;
	//var balance = req.body.balance;
	//var ssn = req.body.ssn;

	session
	.run("MATCH (c:CreditCard) WHERE ID(c)="+id+" SET c.AccountNumber="+caccn+" SET c.Balance="+balance+" SET c.ExpirationDate="+exp+" SET c.Limit="+limit+" SET c.SecurityCode="+scode+" RETURN c") //pyetesori per update
	//.run("MATCH (c:CreditCard) WHERE ID(c)="+id+" SET c.AccountNumber = "+caccn+" ")
	.then(function(result) {

		res.redirect('/credit');

			session.close();
	  })
		
		.catch(function(err){
			console.log(err);
		});

		res.redirect('/show');

});

app.get('/editCredit/:id', function(req, res) {
	var title = "Edit your datas";
	var data = req.body;
	var id = req.params.id;
	session
	.run("MATCH (c:CreditCard) WHERE ID(c)="+id+" RETURN c")
	 
	.then(function(result) {
		res.render('editC', {title: title, doc: result, data: data})
	}) 
	.catch(function(err){
		console.log(err);
	})
});


app.get('/delete/:id', function(req, res) {
	var id = req.params.id;
	session
	.run("MATCH (a:AccountHolder) WHERE ID(a)="+id+" DETACH DELETE a")
	 
	.then(function(result) {
		
		res.redirect('/show')


		})
		.catch(function(err){
			console.log(err);
		});
});

app.get('/deletecc/:id', function(req, res) {
	var id = req.params.id;
	session
	.run("MATCH (cc:CreditCard) WHERE ID(cc)="+id+" DETACH DELETE cc")
	 
	.then(function(result) {
		
		res.redirect('/show')


		})
		.catch(function(err){
			console.log(err);
		});
});

app.get('/udelete/:id', function(req, res) {
	var id = req.params.id;
	session
	.run("MATCH (u:UnsecuredLoan) WHERE ID(u)="+id+" DETACH DELETE u")
	 
	.then(function(result) {
		
		res.redirect('/show')


		})
		.catch(function(err){
			console.log(err);
		});
});


app.get('/', function(req,res){
   //res.sendFile(__dirname + '/index.html');
   var title = "Bank Fraud";
   res.render('index' , {title : title});
 });


/*app.post('/acc/add',function(req, res){
	var fname = req.body.fname;
	var lname = req.body.lname;
	var uid = req.body.uid;

	session
		.run('CREATE(n:AccountHolder {FirstName:{fnameParam},LastName:{lnameParam},UniqueId:{uidParam}}) RETURN n.FirstName',
			{fnameParam:fname, lnameParam:lname, uidParam:uid})
		.then(function(result){
			res.redirect('/');

			session.close();
		})
		.catch(function(err){
			console.log(err);
		});

		res.redirect('/');

});
*/

/*app.post('/bcc/add',function(req, res){
	var accn = req.body.accn;
	var balance = req.body.balance;
	

	session
		.run('CREATE(b:BankAccount {AccountNumber:{accParam},Balance:{bParam}}) RETURN b.AccountNumber',
			{accParam:accn, bParam:balance})
		.then(function(result){
			res.redirect('/');

			session.close();
		})
		.catch(function(err){
			console.log(err);
		});

		res.redirect('/');

});
*/

app.post('/add', function(req, res){
	//var title = "Create Bank Account";
	var fname = req.body.fname;
	var lname = req.body.lname;
	var uid = req.body.uid;
	var phone = req.body.phone;
	var street = req.body.street;
	var state = req.body.state;
	var city = req.body.city;
	var zipcode = req.body.zipcode;
	var accn = req.body.accn;
	var balance = req.body.balance;
	var ssn = req.body.ssn;


	session
		.run('CREATE(a:AccountHolder {FirstName:{fnameParam},LastName:{lnameParam}, UniqueId:{uidParam}}), (p:PhoneNumber {PhoneNumber:{phoneParam}}), (add:Address {Street:{streetParam}, State:{stateParam}, City:{cityParam}, ZipCode:{zipParam}}), (b:BankAccount {AccountNumber:{accnParam}, Balance:{balanceParam}}), (s:SSN {SSN:{ssnParam}}), (a)-[:HAS_BANKACCOUNT]->(b), (a)-[:HAS_PHONENUMBER]->(p), (a)-[:HAS_ADDRESS]->(add), (a)-[:HAS_SSN]->(s)',
			{fnameParam:fname, lnameParam:lname, uidParam:uid, phoneParam:phone, streetParam:street, stateParam:state, cityParam:city, zipParam:zipcode, accnParam:accn, balanceParam:balance, ssnParam:ssn} )
		.then(function(result){
			res.redirect('/show');

			session.close();
		})
		.catch(function(err){
			console.log(err);
		});

		res.redirect('/show');

});

app.post('/addunsl', function(req, res){

	var title = "Unsecured Loan";

	var apr = req.body.apr;
	var laccn = req.body.laccn;
	var lbalance = req.body.lbalance;
	var lamount = req.body.lamount;
	
	session
		.run('CREATE(u:UnsecuredLoan {APR:{aprParam}, AccountNumber:{laccnParam}, Balance:{lbalanceParam}, LoanAmount:{lamountParam}}) RETURN u',
			{ aprParam:apr, laccnParam:laccn, lbalanceParam:lbalance, lamountParam:lamount } )
		.then(function(result){
			res.redirect('/unsloan');

			session.close();
		})
		.catch(function(err){
			console.log(err);
		});

		res.redirect('/unsloan');

});

app.post('/urelation', function(req, res){
	
	var laccn = req.body.laccn;
	var uid = req.body.uid;
	
	session
		//.run("MATCH (a:AccountHolder {UniqueId:{"+uid+"}}), (cc:CreditCard {AccountNumber:{"+caccn+"}}) MERGE (a)-[:HAS_CREDITCARD]->(cc) RETURN DISTINCT a, cc")
		.run("MATCH (a:AccountHolder {UniqueId:{uidParam}}), (u:UnsecuredLoan {AccountNumber:{laccnParam}}) MERGE (a)-[:HAS_UNSECUREDLOAN]->(u) RETURN a, u",
		{ uidParam: uid, laccnParam:laccn })
			
		.then(function(result){
			res.redirect('/show');

			session.close();
		})
		.catch(function(err){
			console.log(err);
		});

		res.redirect('/show');

});

app.post('/delrelation', function(req, res) {
	var laccn = req.body.laccn;
	var uid = req.body.uid;
	session
	.run('MATCH (a:AccountHolder {UniqueId:{uidParam}}) OPTIONAL MATCH (u:UnsecuredLoan {AccountNumber:{laccnParam}}), (a)-[r:HAS_UNSECUREDLOAN]->(u) delete r',
		{ uidParam: uid, laccnParam: laccn})
	 
	.then(function(result) {
		
		res.redirect('/show')


		})
		.catch(function(err){
			console.log(err);
		});
});

app.post('/addcc', function(req, res){
	var title = "Create Credit Account";
	var caccn = req.body.caccn;
	var cbalance = req.body.cbalance;
	var exp = req.body.exp;
	var limit = req.body.limit;
	var scode = req.body.scode;


	session
		.run('CREATE(cc:CreditCard {AccountNumber:{caccnParam}, Balance:{balanceParam}, ExpirationDate:{dateParam}, Limit:{limitParam}, SecurityCode:{scodeParam}}) RETURN cc',
			{ caccnParam:caccn, balanceParam:cbalance, dateParam:exp, limitParam:limit, scodeParam:scode} )
		.then(function(result){
			res.redirect('/credit');

			session.close();
		})
		.catch(function(err){
			console.log(err);
		});

		res.redirect('/credit');

});

app.post('/ccrelation', function(req, res){
	
	var caccn = req.body.caccn;
	var uid = req.body.uid;
	


	session
		//.run("MATCH (a:AccountHolder {UniqueId:{"+uid+"}}), (cc:CreditCard {AccountNumber:{"+caccn+"}}) MERGE (a)-[:HAS_CREDITCARD]->(cc) RETURN DISTINCT a, cc")
		.run("MATCH (a:AccountHolder {UniqueId:{uidParam}}), (cc:CreditCard {AccountNumber:{caccnParam}}) MERGE (a)-[:HAS_CREDITCARD]->(cc) RETURN a, cc",
		{ uidParam: uid, caccnParam:caccn })
			
		.then(function(result){
			res.redirect('/show');

			session.close();
		})
		.catch(function(err){
			console.log(err);
		});

		res.redirect('/show');

});

app.post('/delccrel', function(req, res) {
	var caccn = req.body.caccn;
	var uid = req.body.uid;
	session
	.run('MATCH (a:AccountHolder {UniqueId:{uidParam}}) OPTIONAL MATCH (c:CreditCard {AccountNumber:{caccnParam}}), (a)-[r:HAS_CREDITCARD]->(c) delete r',
		{ uidParam: uid, caccnParam: caccn})
	 
	.then(function(result) {
		
		res.redirect('/show')


		})
		.catch(function(err){
			console.log(err);
		});
});



/*app.post('acc/bcc/add',function(req, res){
	var fname = req.body.fname;
	var accn = req.body.accn;

	session
		.run('MATCH(n:AccountHolder {FirstName:{fnameParam}}), (b:BankAccount {AccountNumber:{accParam}}) MERGE(n)-[:HAS_BANKACCOUNT]->(b) RETURN n,b',
			{fnameParam: fname, accParam: accn})
		.then(function(result){
			res.redirect('/');

			session.close();
		})
		.catch(function(err){
			console.log(err);
		});

		res.redirect('/');

});
*/
app.get('/analysis', function(req,res){
   //res.sendFile(__dirname + '/index.html');
   var title = "Link Analysis";
   res.render('analysis' , {title : title});
 });

app.listen(3000);
console.log('Server started on port 3000');

module.exports = app;