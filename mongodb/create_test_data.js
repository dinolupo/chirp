

db = db.getSiblingDB("chirp");
db.users.drop();
db.posts.drop();


var MAX_INT = 9007199254740992;
var MIN_INT = -MAX_INT;
TOT_USERS = 1000;
MAX_POSTS_PER_USER = 100;
MAX_FOLLOWING = 50;


// encrypted bcrypt password 'test'
password = "$2a$10$nn4S7KMtT8GzQhNBLnToJuBs.M3crz77X87b/ixKVmD7Y/Q/U1j1.";

var firstNames = ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Charles", "Thomas", "Christopher", "Daniel", "Matthew", "George", "Donald", "Anthony", "Paul", "Mark", "Edward", "Steven", "Kenneth", "Andrew", "Brian", "Joshua", "Kevin", "Ronald", "Timothy", "Jason", "Jeffrey", "Frank", "Gary", "Ryan", "Nicholas", "Eric", "Stephen", "Jacob", "Larry", "Jonathan", "Scott", "Raymond", "Justin", "Brandon", "Gregory", "Samuel", "Benjamin", "Patrick", "Jack", "Henry", "Walter", "Dennis", "Jerry", "Alexander", "Peter", "Tyler", "Douglas", "Harold", "Aaron", "Jose", "Adam", "Arthur", "Zachary", "Carl", "Nathan", "Albert", "Kyle", "Lawrence", "Joe", "Willie", "Gerald", "Roger", "Keith", "Jeremy", "Terry", "Harry", "Ralph", "Sean", "Jesse", "Roy", "Louis", "Billy", "Austin", "Bruce", "Eugene", "Christian", "Bryan", "Wayne", "Russell", "Howard", "Fred", "Ethan", "Jordan", "Philip", "Alan", "Juan", "Randy", "Vincent", "Bobby", "Dylan", "Johnny", "Phillip", "Victor", "Clarence", "Ernest", "Martin", "Craig", "Stanley", "Shawn", "Travis", "Bradley", "Leonard", "Earl", "Gabriel", "Jimmy", "Francis", "Todd", "Noah", "Danny", "Dale", "Cody", "Carlos", "Allen", "Frederick", "Logan", "Curtis", "Alex", "Joel", "Luis", "Norman", "Marvin", "Glenn", "Tony", "Nathaniel", "Rodney", "Melvin", "Alfred", "Steve", "Cameron", "Chad", "Edwin", "Caleb", "Evan", "Antonio", "Lee", "Herbert", "Jeffery", "Isaac", "Derek", "Ricky", "Marcus", "Theodore", "Elijah", "Luke", "Jesus", "Eddie", "Troy", "Mike", "Dustin", "Ray", "Adrian", "Bernard", "Leroy", "Angel", "Randall", "Wesley", "Ian", "Jared", "Mason", "Hunter", "Calvin", "Oscar", "Clifford", "Jay", "Shane", "Ronnie", "Barry", "Lucas", "Corey", "Manuel", "Leo", "Tommy", "Warren", "Jackson", "Isaiah", "Connor", "Don", "Dean", "Jon", "Julian", "Miguel", "Bill", "Lloyd", "Charlie", "Mitchell", "Leon", "Jerome", "Darrell", "Jeremiah", "Alvin", "Brett", "Seth", "Floyd", "Jim", "Blake", "Micheal", "Gordon", "Trevor", "Lewis", "Erik", "Edgar", "Vernon", "Devin", "Gavin", "Jayden", "Chris", "Clyde", "Tom", "Derrick", "Mario", "Brent", "Marc", "Herman", "Chase", "Dominic", "Ricardo", "Franklin", "Maurice", "Max", "Aiden", "Owen", "Lester", "Gilbert", "Elmer", "Gene", "Francisco", "Glen", "Cory", "Garrett", "Clayton", "Sam", "Jorge", "Chester", "Alejandro", "Jeff", "Harvey", "Milton", "Cole", "Ivan", "Andre", "Duane", "Landon","Francesco", "Alessandro", "Lorenzo", "Andrea", "Marco", "Leonardo", "Matteo", "Federico", "Mattia", "Riccardo", "Luca", "Davide", "Gabriele", "Edoardo", "Tommaso", "Giacomo", "Simone", "Christian", "Stefano", "Diego", "Filippo", "Giuseppe", "Mary", "Emma", "Elizabeth", "Minnie", "Margaret", "Ida", "Alice", "Bertha", "Sarah", "Annie", "Clara", "Ella", "Florence", "Cora", "Martha", "Laura", "Nellie", "Grace", "Carrie", "Maude", "Mabel", "Bessie", "Jennie", "Gertrude", "Julia", "Hattie", "Edith", "Mattie", "Rose", "Catherine", "Lillian", "Ada", "Lillie", "Helen", "Jessie", "Louise", "Ethel", "Lula", "Myrtle", "Eva", "Frances", "Lena", "Lucy", "Edna", "Maggie", "Pearl", "Daisy", "Fannie", "Josephine", "Dora", "Rosa", "Katherine", "Agnes", "Marie", "Nora", "May", "Mamie", "Blanche", "Stella", "Ellen", "Nancy", "Effie", "Sallie", "Nettie", "Della", "Lizzie", "Flora", "Susie", "Maud", "Mae", "Etta", "Harriet", "Sadie", "Caroline", "Katie", "Lydia", "Elsie", "Kate", "Susan", "Mollie", "Alma", "Addie", "Georgia", "Eliza", "Lulu", "Nannie", "Lottie", "Amanda", "Belle", "Charlotte", "Rebecca", "Ruth", "Viola", "Olive", "Amelia", "Hannah", "Jane", "Virginia", "Emily", "Matilda", "Irene", "Kathryn", "Esther", "Willie", "Henrietta", "Ollie", "Amy", "Rachel", "Sara", "Estella", "Theresa", "Augusta", "Ora", "Pauline", "Josie", "Lola", "Sophia", "Leona", "Anne", "Mildred", "Ann", "Beulah", "Callie", "Lou", "Delia", "Eleanor", "Barbara", "Iva", "Louisa", "Maria", "Mayme", "Evelyn", "Estelle", "Nina", "Betty", "Marion", "Bettie", "Dorothy", "Luella", "Inez", "Lela", "Rosie", "Allie", "Millie", "Janie", "Cornelia", "Victoria", "Ruby", "Winifred", "Alta", "Celia", "Christine", "Beatrice", "Birdie", "Harriett", "Mable", "Myra", "Sophie", "Tillie", "Isabel", "Sylvia", "Carolyn", "Isabelle", "Leila", "Sally", "Ina", "Essie", "Bertie", "Nell", "Alberta", "Katharine", "Lora", "Rena", "Mina", "Rhoda", "Mathilda", "Abbie", "Eula", "Dollie", "Hettie", "Eunice", "Fanny", "Ola", "Lenora", "Adelaide", "Christina", "Lelia", "Nelle", "Sue", "Johanna", "Lilly", "Lucinda", "Minerva", "Lettie", "Roxie", "Cynthia", "Helena", "Hilda", "Hulda", "Bernice", "Genevieve", "Jean", "Cordelia", "Marian", "Francis", "Jeanette", "Adeline", "Gussie", "Leah", "Lois", "Lura", "Mittie", "Hallie", "Isabella", "Olga", "Phoebe", "Teresa", "Hester", "Lida", "Lina", "Winnie", "Claudia", "Marguerite", "Vera", "Cecelia", "Bess", "Emilie", "John", "Rosetta", "Verna", "Myrtie", "Cecilia", "Elva", "Olivia", "Ophelia", "Georgie", "Elnora", "Violet", "Adele", "Lily", "Linnie", "Loretta", "Madge", "Polly", "Virgie", "Eugenia", "Lucile", "Lucille", "Mabelle", "Rosalie","Sofia", "Giulia", "Martina", "Giorgia", "Emma", "Chiara", "Aurora", "Sara", "Alice", "Beatrice", "Ginevra", "Elena", "Alessia", "Greta", "Francesca", "Eleonora", "Viola", "Anna", "Elisa", "Giada", "Matilde", "Laura", "Nicole", "Asia", "Camilla", "Arianna", "Rachele", "Rebecca", "Gaia"];
var	lastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson', 'Clark', 'Rodriguez', 'Lewis', 'Lee', 'Walker', 'Hall', 'Allen', 'Young', 'Hernandez', 'King', 'Wright', 'Lopez', 'Hill', 'Scott', 'Green', 'Adams', 'Baker', 'Gonzalez', 'Nelson', 'Carter', 'Mitchell', 'Perez', 'Roberts', 'Turner', 'Phillips', 'Campbell', 'Parker', 'Evans', 'Edwards', 'Collins', 'Stewart', 'Sanchez', 'Morris', 'Rogers', 'Reed', 'Cook', 'Morgan', 'Bell', 'Murphy', 'Bailey', 'Rivera', 'Cooper', 'Richardson', 'Cox', 'Howard', 'Ward', 'Torres', 'Peterson', 'Gray', 'Ramirez', 'James', 'Watson', 'Brooks', 'Kelly', 'Sanders', 'Price', 'Bennett', 'Wood', 'Barnes', 'Ross', 'Henderson', 'Coleman', 'Jenkins', 'Perry', 'Powell', 'Long', 'Patterson', 'Hughes', 'Flores', 'Washington', 'Butler', 'Simmons', 'Foster', 'Gonzales', 'Bryant', 'Alexander', 'Russell', 'Griffin', 'Diaz', 'Hayes', 'Myers', 'Ford', 'Hamilton', 'Graham', 'Sullivan', 'Wallace', 'Woods', 'Cole', 'West', 'Jordan', 'Owens', 'Reynolds', 'Fisher', 'Ellis', 'Harrison', 'Gibson', 'McDonald', 'Cruz', 'Marshall', 'Ortiz', 'Gomez', 'Murray', 'Freeman', 'Wells', 'Webb', 'Simpson', 'Stevens', 'Tucker', 'Porter', 'Hunter', 'Hicks', 'Crawford', 'Henry', 'Boyd', 'Mason', 'Morales', 'Kennedy', 'Warren', 'Dixon', 'Ramos', 'Reyes', 'Burns', 'Gordon', 'Shaw', 'Holmes', 'Rice', 'Robertson', 'Hunt', 'Black', 'Daniels', 'Palmer', 'Mills', 'Nichols', 'Grant', 'Knight', 'Ferguson', 'Rose', 'Stone', 'Hawkins', 'Dunn', 'Perkins', 'Hudson', 'Spencer', 'Gardner', 'Stephens', 'Payne', 'Pierce', 'Berry', 'Matthews', 'Arnold', 'Wagner', 'Willis', 'Ray', 'Watkins', 'Olson', 'Carroll', 'Duncan', 'Snyder', 'Hart', 'Cunningham', 'Bradley', 'Lane', 'Andrews', 'Ruiz', 'Harper', 'Fox', 'Riley', 'Armstrong', 'Carpenter', 'Weaver', 'Greene', 'Lawrence', 'Elliott', 'Chavez', 'Sims', 'Austin', 'Peters', 'Kelley', 'Franklin', 'Lawson', 'Fields', 'Gutierrez', 'Ryan', 'Schmidt', 'Carr', 'Vasquez', 'Castillo', 'Wheeler', 'Chapman', 'Oliver', 'Montgomery', 'Richards', 'Williamson', 'Johnston', 'Banks', 'Meyer', 'Bishop', 'McCoy', 'Howell', 'Alvarez', 'Morrison', 'Hansen', 'Fernandez', 'Garza', 'Harvey', 'Little', 'Burton', 'Stanley', 'Nguyen', 'George', 'Jacobs', 'Reid', 'Kim', 'Fuller', 'Lynch', 'Dean', 'Gilbert', 'Garrett', 'Romero', 'Welch', 'Larson', 'Frazier', 'Burke', 'Hanson', 'Day', 'Mendoza', 'Moreno', 'Bowman', 'Medina', 'Fowler', 'Brewer', 'Hoffman', 'Carlson', 'Silva', 'Pearson', 'Holland', 'Douglas', 'Fleming', 'Jensen', 'Vargas', 'Byrd', 'Davidson', 'Hopkins', 'May', 'Terry', 'Herrera', 'Wade', 'Soto', 'Walters', 'Curtis', 'Neal', 'Caldwell', 'Lowe', 'Jennings', 'Barnett', 'Graves', 'Jimenez', 'Horton', 'Shelton', 'Barrett', 'Obrien', 'Castro', 'Sutton', 'Gregory', 'McKinney', 'Lucas', 'Miles', 'Craig', 'Rodriquez', 'Chambers', 'Holt', 'Lambert', 'Fletcher', 'Watts', 'Bates', 'Hale', 'Rhodes', 'Pena', 'Beck', 'Newman', 'Haynes', 'McDaniel', 'Mendez', 'Bush', 'Vaughn', 'Parks', 'Dawson', 'Santiago', 'Norris', 'Hardy', 'Love', 'Steele', 'Curry', 'Powers', 'Schultz', 'Barker', 'Guzman', 'Page', 'Munoz', 'Ball', 'Keller', 'Chandler', 'Weber', 'Leonard', 'Walsh', 'Lyons', 'Ramsey', 'Wolfe', 'Schneider', 'Mullins', 'Benson', 'Sharp', 'Bowen', 'Daniel', 'Barber', 'Cummings', 'Hines', 'Baldwin', 'Griffith', 'Valdez', 'Hubbard', 'Salazar', 'Reeves', 'Warner', 'Stevenson', 'Burgess', 'Santos', 'Tate', 'Cross', 'Garner', 'Mann', 'Mack', 'Moss', 'Thornton', 'Dennis', 'McGee', 'Farmer', 'Delgado', 'Aguilar', 'Vega', 'Glover', 'Manning', 'Cohen', 'Harmon', 'Rodgers', 'Robbins', 'Newton', 'Todd', 'Blair', 'Higgins', 'Ingram', 'Reese', 'Cannon', 'Strickland', 'Townsend', 'Potter', 'Goodwin', 'Walton', 'Rowe', 'Hampton', 'Ortega', 'Patton', 'Swanson', 'Joseph', 'Francis', 'Goodman', 'Maldonado', 'Yates', 'Becker', 'Erickson', 'Hodges', 'Rios', 'Conner', 'Adkins', 'Webster', 'Norman', 'Malone', 'Hammond', 'Flowers', 'Cobb', 'Moody', 'Quinn', 'Blake', 'Maxwell', 'Pope', 'Floyd', 'Osborne', 'Paul', 'McCarthy', 'Guerrero', 'Lindsey', 'Estrada', 'Sandoval', 'Gibbs', 'Tyler', 'Gross', 'Fitzgerald', 'Stokes', 'Doyle', 'Sherman', 'Saunders', 'Wise', 'Colon', 'Gill', 'Alvarado', 'Greer', 'Padilla', 'Simon', 'Waters', 'Nunez', 'Ballard', 'Schwartz', 'McBride', 'Houston', 'Christensen', 'Klein', 'Pratt', 'Briggs', 'Parsons', 'McLaughlin', 'Zimmerman', 'French', 'Buchanan', 'Moran', 'Copeland', 'Roy', 'Pittman', 'Brady', 'McCormick', 'Holloway', 'Brock', 'Poole', 'Frank', 'Logan', 'Owen', 'Bass', 'Marsh', 'Drake', 'Wong', 'Jefferson', 'Park', 'Morton', 'Abbott', 'Sparks', 'Patrick', 'Norton', 'Huff', 'Clayton', 'Massey', 'Lloyd', 'Figueroa', 'Carson', 'Bowers', 'Roberson', 'Barton', 'Tran', 'Lamb', 'Harrington', 'Casey', 'Boone', 'Cortez', 'Clarke', 'Mathis', 'Singleton', 'Wilkins', 'Cain', 'Bryan', 'Underwood', 'Hogan', 'McKenzie', 'Collier', 'Luna', 'Phelps', 'McGuire', 'Allison', 'Bridges', 'Wilkerson', 'Nash', 'Summers', 'Atkins','Rossi', 'Ferrari', 'Russo', 'Bianchi', 'Esposito', 'Colombo', 'Romano', 'Ricci', 'Gallo', 'Greco', 'Conti', 'Marino', 'De Luca', 'Bruno', 'Costa', 'Giordano', 'Mancini', 'Lombardi', 'Barbieri', 'Moretti', 'Fontana', 'Rizzo', 'Santoro', 'Caruso', 'Mariani', 'Martini', 'Ferrara', 'Galli', 'Rinaldi', 'Leone', 'Serra', 'Conte', 'Villa', 'Marini', 'Ferri', 'Bianco', 'Monti', 'De Santis', 'Parisi', 'Fiore', 'De Angelis', 'Longo', 'Sanna', 'Sala', 'Romeo', 'Martinelli', 'Grassi', 'Neri', 'Marchetti', 'Vitale', 'Mari', 'Gentile', 'Viola', 'Marchi', 'Rossetti', 'Bellini', 'Grasso', 'Fabbri', 'Franco', 'Messina', 'Rosso', 'Rizzi', 'D\'Angelo', 'Morelli', 'Giorgi', 'Riva', 'Mazza', 'De Rosa', 'Testa', 'Coppola', 'Amato', 'Donati', 'Palumbo', 'Ferro', 'Basile', 'Ferraro', 'Franchi', 'Castelli', 'Lombardo', 'Farina', 'Carli', 'Bruni', 'Piras', 'Giuliani', 'Martino', 'Poli', 'Gasparini', 'Montanari', 'Orlando', 'Alberti', 'Bernardi', 'Silvestri', 'Ferretti', 'Pellegrino', 'Sartori', 'Palmieri', 'Cattaneo', 'Benedetti', 'Valenti', 'Bassi', 'Verdi'];



// Random helper functions
  function initOptions(options, defaults) {
      options || (options = {});

      if (defaults) {
          for (var i in defaults) {
              if (typeof options[i] === 'undefined') {
                  options[i] = defaults[i];
              }
          }
      }

      return options;
  }

  function testRange(test, errorMessage) {
      if (test) {
          throw new RangeError(errorMessage);
      }
  }


/**
 *  Return a random integer
 *
 *  NOTE the max and min are INCLUDED in the range. So:
 *  chance.integer({min: 1, max: 3});
 *  would return either 1, 2, or 3.
 *
 *  @param {Object} [options={}] can specify a min and/or max
 *  @returns {Number} a single random integer number
 *  @throws {RangeError} min cannot be greater than max
 */
function integer(options) {
    // 9007199254740992 (2^53) is the max integer number in JavaScript
    // See: http://vq.io/132sa2j
    options = initOptions(options, {min: MIN_INT, max: MAX_INT});
    testRange(options.min > options.max, "Chance: Min cannot be greater than Max.");

    return Math.floor(Math.random() * (options.max - options.min + 1) + options.min);
};

/**
 *  Return a random natural
 *
 *  NOTE the max and min are INCLUDED in the range. So:
 *  chance.natural({min: 1, max: 3});
 *  would return either 1, 2, or 3.
 *
 *  @param {Object} [options={}] can specify a min and/or max
 *  @returns {Number} a single random integer number
 *  @throws {RangeError} min cannot be greater than max
 */
function natural(options) {
    options = initOptions(options, {min: 0, max: MAX_INT});
    testRange(options.min < 0, "Chance: Min cannot be less than zero.");
    return integer(options);
};


// Given an array, returns a single random element
function pickone (arr) {
    if (arr.length === 0) {
      throw new RangeError("Chance: Cannot pickone() from an empty array");
    }
    return arr[natural({max: arr.length - 1})];
};


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


// insert random users
for (var i = 0; i < TOT_USERS; i++) {
	//name = randomString(3,10);
	//surname = randomString(4,15);
	name = pickone(firstNames);
	surname = pickone(lastNames);
	username = name.toLowerCase() + '.' + surname.toLowerCase();
	//password = randomString(6,20);
	displayname = name + ' ' + surname;
	email = name + '.' + surname + '@' + randomString(5,12) + '.' + randomString(2,4);
	image = "default.png";
	following = [];
	followers = [];
	// for testing purpouse use i for identity
	// otherwise remove _id to create automatically ObjectId
	//userid = ObjectId();
	userid = i;
	record = {'_id':userid, 'username':username, 'displayname':displayname, 'password':password, 'email':email, 'image':image, 'following':following, 'followers':followers};
	db.users.insert(record);

	// insert posts for this user
	post_per_user = 1 + Math.floor(Math.random() * MAX_POSTS_PER_USER);
	for(p = 0; p < post_per_user; p++){
		post = {'username':username, 'ownerid':userid, 'displayname':displayname, 'timestamp':randomDate(new Date(2005,0,1), new Date()).toISOString(), 'text':randomPost()};
		db.posts.insert(post);
	}

}

// insert random following and followers for the users
ids = db.users.find({},{_id:1});

for (var i = 0; i < TOT_USERS; i++) {

	following = [];
	//followers = [];
	following_num = 1 + Math.floor(Math.random() * MAX_FOLLOWING);

	for (var j = 0; j < following_num; j++) {
		following_user_id = Math.floor(Math.random()*TOT_USERS);
		following.push(ids[following_user_id]._id);
		// update the followers collection of the following user
		db.users.update(ids[following_user_id],{$push:{'followers':i}});
	}
	db.users.update(ids[i],{$set:{'following':following}});

}

// for testing set user and password of the first user to 'test'
db.users.update({_id:1},{$set:{username:'test',password:password}});
