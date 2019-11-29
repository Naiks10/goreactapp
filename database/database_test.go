package database

import (
	"goreactapp/database/postgres"
	"reflect"
	"testing"
)

//#--TEST-EXIST--#//

func TestDBexist(t *testing.T) {
	tests := []struct {
		name string
		want *postgres.PostgreSQLConnection
	}{
		{ //#=> Test №1 - | PGX |
			name: "TestPGX",
			want: &postgres.PostgreSQLConnection{
				ConnectionString: "user=postgres password=09102000 host=localhost port=5432 database=active_db sslmode=disable",
				DriverName:       "pgx",
			},
		},
		{ //#=> Test №2 - | PQ |
			name: "TestPostgres",
			want: &postgres.PostgreSQLConnection{
				ConnectionString: "user=postgres password=09102000 host=localhost port=5432 database=active_db sslmode=disable",
				DriverName:       "postgres",
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			Inizialize(tt.want.ConnectionString, tt.want.DriverName)
			if got_cs := DBexist().ConnectionString; !reflect.DeepEqual(got_cs, tt.want.ConnectionString) {
				t.Errorf("DBexist() = %v, want %v", got_cs, tt.want.ConnectionString)
			}
			if got_dn := DBexist().DriverName; !reflect.DeepEqual(got_dn, tt.want.DriverName) {
				t.Errorf("DBexist() = %v, want %v", got_dn, tt.want.DriverName)
			}
		})
	}
}

//#--TEST-FOR_INIZ--#//

func TestInizialize(t *testing.T) {
	type args struct {
		connection string
		driver     string
	}
	tests := []struct {
		name    string
		args    args
		want    bool
		wantErr bool
	}{
		{ //#=> Test №1 - | PGX |
			name: "PGX",
			args: args{
				connection: "localhost",
				driver:     "pgx",
			},
		},
		{ //#=> Test №1 - | PQ |
			name: "Postgres",
			args: args{
				connection: "localhost",
				driver:     "postgres",
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := Inizialize(tt.args.connection, tt.args.driver)
			if (err != nil) != tt.wantErr {
				t.Errorf("Inizialize() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if got != tt.want {
				t.Errorf("Inizialize() = %v, want %v", got, tt.want)
			}
		})
	}
}
