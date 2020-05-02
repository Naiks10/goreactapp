DATABASE( "plan_active_db",
    TABLE( "table1",
        COLUMN("id",
            PRIMARY,
            SERIAL,
        ),
        COLUMN("name",
            STRING(50),
            UNIQUE,
            )
    ),
)


DATABASE("plan_active_db",
    TABLE("table1",
        COLUMN("id", PRIMARY, SERIAL), //json:"id"
        COLUMN("name", STRING(50), UNIQUE) //json:"name"
    ),
    TABLE("table2",
        COLUMN("id", PRIMARY, SERIAL),
        COLUMN("name", STRING(50), UNIQUE)
        COLUMN("table_id", INTEGER).REF("table_1", "id")
    ), 
).CREATE()

GET("table1").
    WITH("id", "name")

GET(table).
    WITH(id, name)

DATABASE("plan_active_db").DROP()













GET("table1",
    WITH("id", "name"))

GET("table1").
    WITH("id", "name")

GET(table1).
    WITH(id, name)

GET (table) WITH (id, name)

INCLUDE (table) : (id == table2.id)
    GET (table2) WITH (id, name) => TABLE(table.id, table2.name)able2.id)able2.id)
