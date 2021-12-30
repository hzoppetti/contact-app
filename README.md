# Contact App Description

This is a sample API project that allows the user to create a simple contact list.

### Prerequisites
This app needs:

* [Node](https://nodejs.org/en/download/)
* The client application [contact-client](https://github.com/hzoppetti/contact-client)
* A PostgreSQL database connection

## Quick Setup

To get started, clone or fork this project.
Then run `npm install`.

### Install PostgreSQL
Use Homebrew. If you don't have it, install it from the terminal with the following command:
``` shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Then use brew to install PostgreSQL:
``` shell
brew install postgresql
```

Start the postgresql service:
``` shell
brew services start postgresql
```

### Setup the PostgreSQL User
Enter PostgreSQL to create the user for the application:
``` shell
psql postgres
```

The prompt changes to `postgres=>` indicating that you have entered the default
database, `postgres` as the default user, `<yourusername>`.

#### Create a New Role
You will create a new role for the contact application with a password with the command below.

But first, add your new user and password into the .env file replacing the values `me` and
`password` in the fields `API_PG_USER` and `API_PG_PASSWORD` respectively.

Both default values are used here for illustration purposes:

``` shell
CREATE ROLE me WITH LOGIN PASSWORD 'password';
ALTER ROLE me CREATEDB;
\q
```

Now you're set, the Makefile will continue with the PostSQL setup.

Load the dev db with the make script:
``` shell
make load_dev_db
```

## Running the Application

In the project directory, run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## API Docs
Swagger documentation is generated on dev: `npm start`
Once the local server is running, check them out at
[http://localhost:3000/docs](http://localhost:3000/docs).

## TO DO
This project is still a work in progress. Like many, if not all things
in life, its status will probably always be: complete but not finished.

Next up:

* Tests - yes, I know this should have been done all along.
* Better error handling.
* Authentication.
* Convert to Typescript.
