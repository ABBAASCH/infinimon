# Getting started

Clone the repository:

```
git clone git@github.com:ABBAASCH/infinimon.git
```

Navigate to the root of the project:

```
cd infinimon
```

# Infinimon - project

## Dependencies:

Running `npm install` should take care of all the dependencies needed. If not, then look at the added packages below:
```
# For database connection
npm install pg

npm install ejs

npm install dotenv

npm install bcrypt passport express-session

```

Remember to run `npm` install after for other dependencies:

```
npm install
```

From the root of the project, please run the following command to set up the database and load the dataset as well:

```
psql -U your_username -f pokemon_db.sql
```

Replace the `your_username` with your own username.

After the above you will have to change the path in the load.sql file. This has to be the absolute path to the .csv file in the data directory. Replace this path in load.sql with your own absolute path, depending on your system.

```
/absolute/path/infinimon/data/archive/pokemonDB_dataset.csv

# For example on mac/linux
/Users/username/infinimon/project/infinimon/data/archive/pokemonDB_dataset.csv

# Or on windows it could be something like the following
C:\Users\UserName\Desktop\infinimon\data\archive\pokemonDB_dataset.csv
```
After the path is updated, run the following:

```
psql -U your_username -f load.sql
```

On Linux and Mac this can be done with the `pwd` command.

## Establish database connection

To establish a database connect, open at `.env_example` which should look like this:

```
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=
DB_DATABASE=infinimon
DB_PORT=5432
```

Replace the username, password and the database port to the correct values.
The username is the username for your `psql` database.
The password is the password for your `psql` database (if you have not set one, just leave empty).
The database port is set to a default 5432, change if needed (could change based on your system).

Finally, rename the file to .env from .env_example, and you should be good to go.

To serve the project on localhost on the port given in app.js:
```
npm run start
```

## How to use the web page

At the front page you will see a database connection test button. This button sends a query to the database to the `querytest` table.

If successful, you will see a success message with green colour.

If not, rewind to the previous steps about the .env file and make sure you have inserted the correct credentials.

Now you can register a user on the page by pressing 'Register'. After that you will be redirected to the login screen where you will reenter the credentials.

From here you can see your current team of 6 pokemon. From here you can remove and add pokemon to your team as well as pressing the 'Info' button to see stats of the different pokemon.

When you are ready, press the battle button to go to battle.


In the battle screen you will face 6 random pokemon where a pokemon from each team will go head to head. The current pokemons who are fighting can bee seen in the 'Battle Summary' box.

From here you will need to scroll down and in the input box type the exact name of the current pokemons ability. After you have done this and pressed submit, you will attack the opponent.

If a pokemons `HP` reaches 0 then it is swapped with a new one from their team. This is reapeated until one of the teams are empty and we have found a winner.

You can repeat this over and over. You and also go back to `/users/profile` to modify your team.


## Dataset

The dataset is found [here](https://www.kaggle.com/datasets/divyanshusingh369/complete-pokemon-library-32k-images-and-csv).

It is free and can be downloaded on `kaggle`.
