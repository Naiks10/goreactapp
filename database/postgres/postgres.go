package postgres

import (
	"database/sql"

	_ "github.com/lib/pq"

	"github.com/jmoiron/sqlx"

	"fmt"

	_ "github.com/jackc/pgx/stdlib"
)

//#--PostgreSQL-connection-struct--#//

type PostgreSQLConnection struct {
	ConnectionString string
	DriverName       string
	DB               *sqlx.DB
}

type Error struct {
	What string
}

func (err *Error) Error() string {
	return fmt.Sprintf(err.What)
}

//#--PostgreSQL-get-connection-string--#//

func (con *PostgreSQLConnection) GetConnectionString() (string, error) {
	if con.ConnectionString != "" {
		return con.ConnectionString, nil
	} else {
		return con.ConnectionString, &Error{What: "ConnectionString is empty"}
	}
}

//#--PostgreSQL-show-all-drivers-for this-db--#//

func (con *PostgreSQLConnection) ShowDrivers() {
	fmt.Println(sql.Drivers())
}

//#--PostgreSQL-open-connection--#//

func (con *PostgreSQLConnection) OpenConnection() (bool, error) {
	var isError bool
	var what error

	db, err := sqlx.Open(con.DriverName, con.ConnectionString)

	if err != nil {
		isError, what = true, err
		fmt.Println(err)
		defer func() {
			con.DB = db
			fmt.Println("database opened")
		}()
	} else {
		isError, what = false, err
		con.DB = db
		fmt.Println("database opened")
	}

	return isError, what
}

//#--PostgreSQL-execute-query-without-returning-any-result--#//

func (con *PostgreSQLConnection) ExecuteQueryNonResult(query string, args ...interface{}) (sql.Result, error) {
	return con.DB.Exec(query, args...)
}

//#--PostgreSQL-return-row--#//

func (con *PostgreSQLConnection) ExecuteQueryRow(query string, args ...interface{}) *sql.Row {
	return con.DB.QueryRow(query, args...)
}

//#--PostgreSQL-put-selected-data-to-struct--#//

func (con *PostgreSQLConnection) ScanStruct(i interface{}, query string) {
	err := con.DB.Select(&i, query)
	fmt.Println(err)
}

//#--PostgreSQL-close--#//

func (con *PostgreSQLConnection) CloseConnection() {
	con.DB.Close()
}

//#--PostgreSQL-return-rowS--#//

func (con *PostgreSQLConnection) ExecuteQueryRows(query string, args ...interface{}) (*sql.Rows, error) {
	return con.DB.Query(query, args...)
}
