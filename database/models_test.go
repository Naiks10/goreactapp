package database

import (
	"database/sql/driver"
	"encoding/json"
	"reflect"
	"testing"
)

//#--TESTS--#//

func TestOrganisationData_Value(t *testing.T) {

	a1 := OrganisationData{ //first struct
		"first": "1st",
		"second": OrganisationData{
			"second.first":  "anything",
			"second.second": "something",
		},
	}
	a2 := OrganisationData{ //second struct
		"first": "1st",
		"second": OrganisationData{
			"second.fisrts": "something",
		},
	}

	a3 := OrganisationData{ //third struct
		"first": "1st",
		"second": OrganisationData{
			"second.first": OrganisationData{
				"second.first.first": "anything",
			},
			"second.second": "something",
		},
	}

	w1, _ := json.Marshal(a1)
	w2, _ := json.Marshal(a2)
	w3, _ := json.Marshal(a3)

	tests := []struct {
		name    string
		a       OrganisationData
		want    driver.Value
		wantErr bool
	}{
		{ //#=> Test №1
			name: "test1",
			a:    a1,
			want: w1,
		},
		{ //#=> Test №2
			name: "test2",
			a:    a2,
			want: w2,
		},
		{ //#=> Test №3
			name: "test3",
			a:    a3,
			want: w3,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := tt.a.Value()
			if (err != nil) != tt.wantErr {
				t.Errorf("OrganisationData.Value() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("OrganisationData.Value() = %v, want %v", got, tt.want)
			}
		})
	}
}
