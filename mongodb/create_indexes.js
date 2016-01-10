db = db.getSiblingDB("chirp");
db.posts.createIndex({'timestamp':-1});

