import express from "express"
import cors from "cors"
import oracledb from "oracledb"

const app=express();
app.use(cors());

const constr = {
    user: "audreyweigel",
    password: "5QC8eJJ3zDBMv72DudP1rVzV",
    connectString: "oracle.cise.ufl.edu/orcl"
}

/* 
Instructions for Oracle Library:
Download instantclient_19_8
Copy path into initOracleClient and replace it
*/         

//oracledb.initOracleClient({libDir: 'C:/oracle/instantclient-basic-windows.x64-19.18.0.0.0dbru/instantclient_19_18'});            
//oracledb.initOracleClient({libDir: '/Users/rachelpeterson/Downloads/instantclient_19_8'}); 
//oracledb.initOracleClient({libDir: 'C:/Users/trist/Oracle/instantclient_21_9'});    

// get data for traffic volume count
app.get("/getTrafficVolCount", (req, res)=> {
    async function fetchTrafficVolCount() {
        let connection;
        try {
            connection = await oracledb.getConnection(constr);
            const sql = "SELECT * FROM trafficVolCount WHERE direction = :dir AND borough = :boro";
            const result = await connection.execute(sql)(sql, {
                dir: req.query.direction,
                boro: req.query.borough
              });
        }
        catch (err) {
            console.log(err);
        }
        finally {
            if (connection) {
                try {
                  await connection.close();
                } catch (err) {
                    console.log(err);
                }
              }
        }
    }
    fetchTrafficVolCount();
});

app.listen(1521, ()=> console.log("app is running"));
