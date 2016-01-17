db = db.getSiblingDB("chirp");
db.posts.dropIndexes();
db.users.dropIndexes();
db.posts.createIndex({'timestamp':-1, 'ownerid':1});
db.users.createIndex({'username':1});


