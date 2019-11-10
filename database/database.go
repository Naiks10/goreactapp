package database

import (
	"fmt"
	"goreactapp/database/postgres"
)

var mySiteDataBaseConnection postgres.PostgreSQLConnection

func Inizialize(connection, driver string) {

	if connection != "" && driver != "" {
		mySiteDataBaseConnection = postgres.PostgreSQLConnection{
			ConnectionString: connection,
			DriverName:       driver,
		}
	} else {
		mySiteDataBaseConnection = postgres.PostgreSQLConnection{
			ConnectionString: "user=postgres password=09102000 host=localhost port=5432 database=active_db sslmode=disable",
			DriverName:       "pgx",
		}
	}
	isConnectedSuccessfully, err := mySiteDataBaseConnection.OpenConnection()
	fmt.Println(isConnectedSuccessfully)
	fmt.Println(err)
}

func DB() *postgres.PostgreSQLConnection {
	Inizialize("", "")
	return &mySiteDataBaseConnection
}

func DBexist() *postgres.PostgreSQLConnection {
	return &mySiteDataBaseConnection
}
