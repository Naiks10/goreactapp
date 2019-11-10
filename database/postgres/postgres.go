package postgres

import (
	"database/sql"

	"github.com/jmoiron/sqlx"

	"fmt"

	_ "github.com/jackc/pgx/stdlib"
)

type PostgreSQLConnection struct {
	ConnectionString string
	DriverName       string
	DB               *sqlx.DB
}

func (con *PostgreSQLConnection) GetConnectionString() string {
	return con.ConnectionString
}

func (con *PostgreSQLConnection) ShowDrivers() {
	fmt.Println(sql.Drivers())
}

func (con *PostgreSQLConnection) OpenConnection() (bool, error) {
	var isnError bool
	var what error

	db, err := sqlx.Open(con.DriverName, con.ConnectionString)

	if err != nil {
		isnError, what = false, err
		fmt.Println(err)
		defer func() {
			con.DB = db
			fmt.Println("database opened")
		}()
	} else {
		isnError, what = true, err
		con.DB = db
		fmt.Println("database opened")
	}

	return isnError, what
}

func (con *PostgreSQLConnection) ExecuteQueryNonResult(query string, args ...interface{}) (sql.Result, error) {
	return con.DB.Exec(query, args...)
}

func (con *PostgreSQLConnection) ExecuteQueryRow(query string, args ...interface{}) *sql.Row {
	return con.DB.QueryRow(query, args...)
}

func (con *PostgreSQLConnection) ScanStruct(i interface{}, query string) {
	err := con.DB.Select(&i, query)
	fmt.Println(err)
}

func (con *PostgreSQLConnection) CloseConnection() {
	con.DB.Close()
}

func (con *PostgreSQLConnection) ExecuteQueryRows(query string, args ...interface{}) (*sql.Rows, error) {
	return con.DB.Query(query, args...)
}
