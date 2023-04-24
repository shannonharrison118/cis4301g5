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

app.options('/getQuery3', function (req, res) {
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

app.get("/query3", (req, res) => {
    async function fetchQuery3() {
      let connection;
      try {
        const { borough } = req.query;
        connection = await oracledb.getConnection(constr);
        const result = await connection.execute(
          `WITH collisions_and_volume AS (
            SELECT
                sh.borough,
                sh.onStreet,
                sh.crashDate,
                sh.crashTime,
                ek.YR AS year,
                ek.VOL AS volume
            FROM SHANNONHARRISON.VEHICLECOLLISIONS sh
            JOIN EKINATAY.TRAFFICVOLCOUNT ek
                ON UPPER(sh.borough) = UPPER(ek.BORO) AND UPPER(sh.onStreet) = UPPER(ek.STREET)
            WHERE ek.YR BETWEEN 2018 AND 2020 AND ek.VOL > 30 AND sh.borough = :borough
        ),
        collisions_count AS (
            SELECT
                borough,
                onStreet,
                year,
                COUNT(*) AS num_collisions,
                AVG(volume) AS avg_volume
            FROM collisions_and_volume
            WHERE borough = :borough
            GROUP BY borough, onStreet, year
        )
        SELECT
            c.borough,
            c.onStreet,
            c.year,
            c.num_collisions,
            c.avg_volume
        FROM collisions_count c
        JOIN (
            SELECT
                borough,
                year,
                MAX(num_collisions) AS max_collisions
            FROM collisions_count
            WHERE borough = :borough
            GROUP BY borough, year
        ) max_c
        ON c.borough = max_c.borough AND c.num_collisions = max_c.max_collisions AND c.year = max_c.year
        WHERE c.borough = :borough AND max_c.borough = :borough
        ORDER BY c.borough, c.year, c.num_collisions DESC`,
          { borough: req.query.borough }
        );
        const mostDanger = result.rows.map(row => ({ borough: row[0], onStreet: row[1], year: row[2], num_collisions: row[3], avg_volume: row[4] }));
        res.json(mostDanger);
      } catch (err) {
        console.log(err);
        // Send an error response if something goes wrong
        res.status(500).json({ error: "An error occurred while fetching data." });
      } finally {
        if (connection) {
          try {
            await connection.close();
          } catch (err) {
            console.log(err);
          }
        }
      }
    }
    fetchQuery3();
  });

  app.get("/query4", (req, res) => {
    async function fetchQuery4() {
      let connection;
      try {
        const { borough } = req.query;
        connection = await oracledb.getConnection(constr);
        const result = await connection.execute(
          `WITH hourly_avg AS (
            SELECT BORO, HH, AVG(VOL) AS avg_cars
            FROM EKINATAY.trafficVolCount
            WHERE YR = 2019 AND M BETWEEN 6 AND 8 AND BORO = :borough
            GROUP BY BORO, HH
        )
        SELECT BORO AS bsorough, HH AS hour, avg_cars
        FROM hourly_avg
        WHERE (BORO, HH, avg_cars) IN (
            SELECT BORO, HH, MAX(avg_cars)
            FROM hourly_avg
            GROUP BY BORO, HH
        ) OR (BORO, HH, avg_cars) IN (
            SELECT BORO, HH, MIN(avg_cars)
            FROM hourly_avg
            GROUP BY BORO, HH
        )
        ORDER BY borough, hour`,
        { borough: req.query.borough }
        );
        const mostBusy = result.rows.map(row => ({ borough: row[0], hour: row[1], avg_cars: row[2] }));
        res.json(mostBusy);
      } catch (err) {
        console.log(err);
        // Send an error response if something goes wrong
        res.status(500).json({ error: "An error occurred while fetching data." });
      } finally {
        if (connection) {
          try {
            await connection.close();
          } catch (err) {
            console.log(err);
          }
        }
      }
    }
    fetchQuery4();
  });

  app.get("/query5", (req, res) => {
    async function fetchQuery5() {
      let connection;
      try {
        //const { borough } = req.query;
        connection = await oracledb.getConnection(constr);
        const result = await connection.execute(
          `WITH yearly_volume AS (
            SELECT
              YR,
              SUM(VOL) AS total_volume
            FROM EKINATAY.TRAFFICVOLCOUNT
            WHERE YR BETWEEN 2018 AND 2020
            GROUP BY YR
          ),
          monthly_collisions AS (
            SELECT
              EXTRACT(YEAR FROM CRASHDATE) AS collision_year,
              EXTRACT(MONTH FROM CRASHDATE) AS collision_month,
              COUNT(*) AS collision_count
            FROM SHANNONHARRISON.VEHICLECOLLISIONS
            WHERE EXTRACT(YEAR FROM CRASHDATE) BETWEEN 2016 AND 2020
            GROUP BY EXTRACT(YEAR FROM CRASHDATE), EXTRACT(MONTH FROM CRASHDATE)
          ),
          average_monthly_collisions AS (
            SELECT
              collision_year,
              AVG(collision_count) AS avg_monthly_collisions
            FROM monthly_collisions
            GROUP BY collision_year
          )
          SELECT
            e."year",
            e.REGISTRATIONS,
            y.total_volume,
            m.MEDIANGROSSINCOME,
            a.avg_monthly_collisions
          FROM EKINATAY.evRegistrations e
          JOIN EKINATAY.medianIncome m ON e."year" = m."year"
          LEFT JOIN yearly_volume y ON e."year" = y.YR
          LEFT JOIN average_monthly_collisions a ON e."year" = a.collision_year
          WHERE e."year" BETWEEN 2011 AND 2020
          ORDER BY e."year"`,
        //{ borough: req.query.borough }
        );
        const taxElectric = result.rows.map(row => ({ year: row[0], registrations: row[1], total_volume: row[2], mediangrossincome: row[3], avg_montly_collisions: row[4] }));
        res.json(taxElectric);
      } catch (err) {
        console.log(err);
        // Send an error response if something goes wrong
        res.status(500).json({ error: "An error occurred while fetching data." });
      } finally {
        if (connection) {
          try {
            await connection.close();
          } catch (err) {
            console.log(err);
          }
        }
      }
    }
    fetchQuery5();
  });
  

app.listen(5000, ()=> console.log("app is running"));
