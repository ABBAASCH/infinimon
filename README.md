# Infinimon

Dependencies:
```
# For database connection
npm install pg

npm install ejs

npm install dotenv

npm install bcrypt passport express-session
```

To serve the project on localhost on the port given in app.js:
```
npm run start
```

Run the following to execute the SQL which sets up the database:

```
psql -d infinimon -U <username> -f <path>
```

Replace the <username> with the correct username and <path> with the path to the "pokemon_db.sql" file.
