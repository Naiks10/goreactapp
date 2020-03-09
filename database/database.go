package database

import (
	"fmt"
	"goreactapp/database/postgres"
)

var mySiteDataBaseConnection postgres.PostgreSQLConnection

//#--Inizialize--#//

func Inizialize(connection, driver string) (bool, error) {

	if connection != "" && driver != "" {
		mySiteDataBaseConnection = postgres.PostgreSQLConnection{
			ConnectionString: connection,
			DriverName:       driver,
		}
	} else {
		mySiteDataBaseConnection = postgres.PostgreSQLConnection{
			ConnectionString: "user=postgres password=09102000 host=localhost port=5432 database=plan_active_db sslmode=disable",
			DriverName:       "pgx",
		}
	}

	isConnectedSuccessfully, err := mySiteDataBaseConnection.OpenConnection()
	fmt.Println(isConnectedSuccessfully)
	fmt.Println(err)
	return isConnectedSuccessfully, err
}

//#--return-db--#//

func DB() *postgres.PostgreSQLConnection {
	Inizialize("", "")
	return &mySiteDataBaseConnection
}

//#--return-existed-db--#//

func DBexist() *postgres.PostgreSQLConnection {
	return &mySiteDataBaseConnection
}
