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
//oracledb.initOracleClient({libDir: '/Users/ekin/Downloads/instantclient_19_8'}); 
oracledb.initOracleClient({libDir: '/Users/shannonharrison/Downloads/instantclient_19_8'}); 
//oracledb.initOracleClient({libDir: '/Users/audreywiggles/Downloads/instantclient_19_8'});

app.options('/getQuery1', function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.end();
});
app.options('/getQuery2', function (req, res) {
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
app.options('/getQuery4', function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.end();
});
app.options('/getQuery5', function (req, res) {
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


app.get("/query1", (req, res) => {
    async function fetchQuery1() {
      let connection;
      try {
        const { street } = req.query;
        connection = await oracledb.getConnection(constr);
        const result = await connection.execute(
          `SELECT ANDREAMORENO1.CONSTRUCTIONCLOSURES.onStreet, EKINATAY.TRAFFICVOLCOUNT.yr, EKINATAY.TRAFFICVOLCOUNT.m, EKINATAY.TRAFFICVOLCOUNT.d, AVG(EKINATAY.TRAFFICVOLCOUNT.vol) AS avg_daily_vol_count
          FROM ANDREAMORENO1.CONSTRUCTIONCLOSURES
          INNER JOIN EKINATAY.TRAFFICVOLCOUNT
          ON ANDREAMORENO1.CONSTRUCTIONCLOSURES.onStreet = EKINATAY.TRAFFICVOLCOUNT.street
          WHERE ANDREAMORENO1.CONSTRUCTIONCLOSURES.onStreet = :street
            AND EKINATAY.TRAFFICVOLCOUNT.yr = ANDREAMORENO1.CONSTRUCTIONCLOSURES.workStartYear
            AND EKINATAY.TRAFFICVOLCOUNT.m = ANDREAMORENO1.CONSTRUCTIONCLOSURES.workStartMonth
            AND EKINATAY.TRAFFICVOLCOUNT.d >= ANDREAMORENO1.CONSTRUCTIONCLOSURES.workStartDay
            AND EKINATAY.TRAFFICVOLCOUNT.d <= ANDREAMORENO1.CONSTRUCTIONCLOSURES.workEndDay
            AND EKINATAY.TRAFFICVOLCOUNT.hh >= 9 AND EKINATAY.TRAFFICVOLCOUNT.hh <= 16
          GROUP BY ANDREAMORENO1.CONSTRUCTIONCLOSURES.onStreet, EKINATAY.TRAFFICVOLCOUNT.yr, EKINATAY.TRAFFICVOLCOUNT.m, EKINATAY.TRAFFICVOLCOUNT.d
          ORDER BY EKINATAY.TRAFFICVOLCOUNT.d`,
          { street: req.query.street }
        );
        const avgTraffic = result.rows.map(row => ({ street: row[0], year: row[1], month: row[2], day: row[3], avg_traffic: row[4] }));
        res.json(avgTraffic);
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
    fetchQuery1();
});

app.get("/query2", (req, res) => {
    async function fetchQuery2() {
        let connection;
        try {
            const { street } = req.query;
            connection = await oracledb.getConnection(constr);
            const result = await connection.execute(
                /* `SELECT ANDREAMORENO1.DIRECTIONCHANGESFIXED.onStreet,
                ANDREAMORENO1.DIRECTIONCHANGESFIXED.newdirection,
                ANDREAMORENO1.DIRECTIONCHANGESFIXED.changeday,
                ANDREAMORENO1.DIRECTIONCHANGESFIXED.changemonth,
                ANDREAMORENO1.DIRECTIONCHANGESFIXED.changeyear,
                EKINATAY.TRAFFICVOLCOUNT.yr,
                EKINATAY.TRAFFICVOLCOUNT.m,
                EKINATAY.TRAFFICVOLCOUNT.d,
                EKINATAY.TRAFFICVOLCOUNT.hh,
                SUM(EKINATAY.TRAFFICVOLCOUNT.vol) as sum_vol_dir 
                FROM ANDREAMORENO1.DIRECTIONCHANGESFIXED
                INNER JOIN EKINATAY.TRAFFICVOLCOUNT
                ON ANDREAMORENO1.DIRECTIONCHANGESFIXED.onStreet = EKINATAY.TRAFFICVOLCOUNT.street
                WHERE EKINATAY.TRAFFICVOLCOUNT.yr = ANDREAMORENO1.DIRECTIONCHANGESFIXED.changeyear
                    AND EKINATAY.TRAFFICVOLCOUNT.m = ANDREAMORENO1.DIRECTIONCHANGESFIXED.changemonth 
                    AND EKINATAY.TRAFFICVOLCOUNT.d >= (ANDREAMORENO1.DIRECTIONCHANGESFIXED.changeday - 5)
                    AND EKINATAY.TRAFFICVOLCOUNT.d <= (ANDREAMORENO1.DIRECTIONCHANGESFIXED.changeday + 5)
                    AND ANDREAMORENO1.DIRECTIONCHANGESFIXED.onStreet = :street
                GROUP BY ANDREAMORENO1.DIRECTIONCHANGESFIXED.onStreet, 
                    ANDREAMORENO1.DIRECTIONCHANGESFIXED.newdirection,
                    ANDREAMORENO1.DIRECTIONCHANGESFIXED.changeday,
                    ANDREAMORENO1.DIRECTIONCHANGESFIXED.changemonth,
                    ANDREAMORENO1.DIRECTIONCHANGESFIXED.changeyear,
                    EKINATAY.TRAFFICVOLCOUNT.yr,
                    EKINATAY.TRAFFICVOLCOUNT.m,
                    EKINATAY.TRAFFICVOLCOUNT.d,
                    EKINATAY.TRAFFICVOLCOUNT.hh`, */
              `SELECT ANDREAMORENO1.DIRECTIONCHANGESFIXED.onStreet,
                ANDREAMORENO1.DIRECTIONCHANGESFIXED.newdirection,
                ANDREAMORENO1.DIRECTIONCHANGESFIXED.changeday,
                ANDREAMORENO1.DIRECTIONCHANGESFIXED.changemonth,
                ANDREAMORENO1.DIRECTIONCHANGESFIXED.changeyear,
                EKINATAY.TRAFFICVOLCOUNT.yr,
                EKINATAY.TRAFFICVOLCOUNT.m,
                EKINATAY.TRAFFICVOLCOUNT.d,
                SUM(EKINATAY.TRAFFICVOLCOUNT.vol) as sum_vol_dir,
                AVG(EKINATAY.TRAFFICVOLCOUNT.vol) as avg_volume 
              FROM 
                ANDREAMORENO1.DIRECTIONCHANGESFIXED
              INNER JOIN EKINATAY.TRAFFICVOLCOUNT
              ON ANDREAMORENO1.DIRECTIONCHANGESFIXED.onStreet = EKINATAY.TRAFFICVOLCOUNT.street
            WHERE 
              EKINATAY.TRAFFICVOLCOUNT.yr = ANDREAMORENO1.DIRECTIONCHANGESFIXED.changeyear
              AND EKINATAY.TRAFFICVOLCOUNT.m = ANDREAMORENO1.DIRECTIONCHANGESFIXED.changemonth 
              AND EKINATAY.TRAFFICVOLCOUNT.d >= (ANDREAMORENO1.DIRECTIONCHANGESFIXED.changeday - 5)
              AND EKINATAY.TRAFFICVOLCOUNT.d <= (ANDREAMORENO1.DIRECTIONCHANGESFIXED.changeday + 5)
              AND ANDREAMORENO1.DIRECTIONCHANGESFIXED.onStreet = :street
            GROUP BY 
              ANDREAMORENO1.DIRECTIONCHANGESFIXED.onStreet,
              ANDREAMORENO1.DIRECTIONCHANGESFIXED.newdirection,
              ANDREAMORENO1.DIRECTIONCHANGESFIXED.changeday,
              ANDREAMORENO1.DIRECTIONCHANGESFIXED.changemonth,
              ANDREAMORENO1.DIRECTIONCHANGESFIXED.changeyear,
              EKINATAY.TRAFFICVOLCOUNT.yr,
              EKINATAY.TRAFFICVOLCOUNT.m,
              EKINATAY.TRAFFICVOLCOUNT.d
            ORDER BY 
              ANDREAMORENO1.DIRECTIONCHANGESFIXED.onStreet,
              EKINATAY.TRAFFICVOLCOUNT.d`,
            { street: req.query.street }
            );
            const streetChange = result.rows.map(row => ({ onStreet: row[0], newdirection: row[1], changeday: row[2], changemonth: row[3], changeyear: row[4],
                yr: row[5], m: row[6], d: row[7], hh: row[8], sum_vol_dir: row[9] }));
            res.json(streetChange);
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
    fetchQuery2();
});

app.get("/query3", (req, res) => {
    async function fetchQuery3() {
      let connection;
      try {
        const { borough } = req.query;
        connection = await oracledb.getConnection(constr);
        const result = await connection.execute(
          `WITH collisions_by_month AS (
            SELECT
                borough,
                TO_CHAR(crashDate, 'YYYY-MM') AS month,
                COUNT(*) AS num_collisions
            FROM SHANNONHARRISON.VEHICLECOLLISIONS
            WHERE crashDate BETWEEN TO_DATE('2019-01-01', 'YYYY-MM-DD') AND TO_DATE('2019-12-31', 'YYYY-MM-DD') AND borough = :borough
            GROUP BY borough, TO_CHAR(crashDate, 'YYYY-MM')
        ),
        traffic_volume_by_month AS (
            SELECT
                boro,
                TO_CHAR(TO_DATE(YR || '-' || M || '-01', 'YYYY-MM-DD'), 'YYYY-MM') AS month,
                AVG(VOL) AS avg_volume
            FROM EKINATAY.TRAFFICVOLCOUNT
            WHERE YR BETWEEN 2019 AND 2019
            GROUP BY boro, TO_CHAR(TO_DATE(YR || '-' || M || '-01', 'YYYY-MM-DD'), 'YYYY-MM')
        )
        SELECT
            c.borough,
            c.month,
            c.num_collisions,
            t.avg_volume
        FROM collisions_by_month c
        LEFT JOIN traffic_volume_by_month t
            ON c.borough = t.boro AND c.month = t.month
        ORDER BY c.borough, c.month`,
          { borough: req.query.borough }
        );
        const mostDanger = result.rows.map(row => ({ borough: row[0], month: row[1], num_collisions: row[2]}));
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
        SELECT BORO AS borough, HH AS hour, avg_cars
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
