import sqlite3 from "sqlite3";

const db = new sqlite3.Database(
    "./data.db",
    sqlite3.OPEN_READWRITE,
    (err: Error | null) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log("Connected to the SQLite database");
        }
    }
)

export default db