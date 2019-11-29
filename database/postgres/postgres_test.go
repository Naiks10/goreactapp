package postgres

import (
	"testing"

	_ "github.com/jackc/pgx/stdlib"
	_ "github.com/lib/pq"
)

//#--TESTS--#//
func TestPostgreSQLConnection_GetConnectionString(t *testing.T) {
	tests := []struct {
		name string
		con  *PostgreSQLConnection
		want string
	}{
		{ //#=> Test №1 - | correct connection |
			name: "test1",
			con: &PostgreSQLConnection{
				ConnectionString: "host=localhost port=5432 password=12345",
			},
			want: "host=localhost port=5432 password=12345",
		},
		{ //#=> Test №2 - | non-correct connection |
			name: "test2",
			con: &PostgreSQLConnection{
				ConnectionString: "host=localhost user=admin password=123",
			},
			want: "host=localhost user=admin password=123",
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got, _ := tt.con.GetConnectionString(); got != tt.want {
				t.Errorf("PostgreSQLConnection.GetConnectionString() = %v, want %v", got, tt.want)
			}
		})
	}
}
