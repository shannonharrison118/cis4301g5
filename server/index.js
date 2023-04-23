import express from "express"
import cors from "cors"
import oracledb from "oracledb"

const app=express();
//app.use(cors());
app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

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
oracledb.initOracleClient({libDir: '/Users/shannonharrison/Downloads/instantclient_19_8'}); 
//oracledb.initOracleClient({libDir: 'C:/Users/trist/Oracle/instantclient_21_9'});    

app.options('/getTrafficVolCount', function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.end();
  });

// get data for traffic volume count
app.get("/trafficVolCount", (req, res)=> {
    async function fetchTrafficVolCount() {
        let connection;
        try {
            const { streetName } = req.query;
            connection = await oracledb.getConnection(constr);
            const result = await connection.execute(
                `SELECT street, vol
                FROM EKINATAY.TRAFFICVOLCOUNT
                WHERE street = :streetName`,
                { streetName: req.query.streetName }
              );
          
            const trafficVolumeData = result.rows.map(row => ({ streetName: row[0], volume: row[1] }));
            res.json(trafficVolumeData);
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


app.listen(5000, ()=> console.log("app is running"));
