

db = db.getSiblingDB("chirp");
db.users.drop();
db.posts.drop();

TOT_USERS = 100;
MAX_POSTS_PER_USER = 100;
MAX_FOLLOWERS = 10;
MAX_FOLLOWING = 20;

function randomString(min, max) { 
	if (typeof min === 'undefined') { min = 10; }
	if (typeof max === 'undefined') { max = min; }
	var chars = 
		"abcdefghiklmnopqrstuvwxyz"; 
	var randomstring = ''; 
	var string_length = min+Math.floor(Math.random()*(max-min)); 
	for (var i=0; i<string_length; i++) { 
		var rnum = Math.floor(Math.random() * chars.length); 
		randomstring += chars.substring(rnum,rnum+1); 
	} 
	return randomstring; 
} 

function randomPost() {
	MIN_WORDS = 5;
	EXTRA_WORDS = 30;
	post = "";
	
	num_words = MIN_WORDS + Math.floor(Math.random()*EXTRA_WORDS);

	for (var i=0; i<num_words;i++) {
		post += randomString(1,10) + ' '; 
	}

	return post;
}

function randomDate(start, end) {
	return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}


/*

   date2 = ISODate("2015-09-13T16:35:00Z").toISOString();

   {
   "_id": post2Id,
   "username": "userdemo1",
   "targetusers": [user1Id,user2Id],
   "displayname": "I'm not a bot :)",
   "image":"default.png",
   "timestamp": date2,
   "text": "Are you ready for production?"
   }
*/

// insert random users
for (var i = 0; i < TOT_USERS; i++) {
	name = randomString(3,10);
	surname = randomString(4,15);
	username = name.toLowerCase() + '.' + surname.toLowerCase();
	password = randomString(6,20);
	displayname = name + ' ' + surname;
	email = name + '.' + surname + '@' + randomString(5,12) + '.' + randomString(2,4);
	image = "default.png";
	following = [];
	followers = [];
	record = {'_id':i, 'username':username, 'displayname':displayname, 'password':password, 'email':email, 'image':image, 'following':following, 'followers':followers};
	db.users.insert(record);

    // insert posts for this user	
	post_per_user = 1 + Math.floor(Math.random() * MAX_POSTS_PER_USER);
	for(p = 0; p < post_per_user; p++){
		post = {'username':username, 'targetusers':[], 'displayname':displayname, 'timestamp':randomDate(new Date(2005,0,1), new Date()).toISOString(), 'text':randomPost()};
		db.posts.insert(post);
	} 
	
}

// insert random following and followers for the users 

ids = db.users.find({},{_id:1});

for (var i = 0; i < TOT_USERS; i++) {
		
	following = [];
	followers = [];
	following_num = 1 + Math.floor(Math.random() * MAX_FOLLOWING);
	followers_num = 1 + Math.floor(Math.random() * MAX_FOLLOWERS);		
 
	for (var j = 0; j < following_num; j++) {
		following.push(ids[Math.floor(Math.random()*TOT_USERS)]._id);
	}

	db.users.update(ids[i],{$set:{'following':following}});
	
	for (var j = 0; j < followers_num; j++) {
		followers.push(ids[Math.floor(Math.random()*TOT_USERS)]._id);
	}

	db.users.update(ids[i], {$set:{'followers':followers}});

}


