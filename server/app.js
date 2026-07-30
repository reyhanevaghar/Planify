// Load environment variables from the .env file into process.env
require('dotenv').config();

// Import Express and create the app
var express = require('express');
var app = express();

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// --------------------------------------------------------
// bcrypt is used for hashing passwords and comparing them during login
const bcrypt = require("bcrypt");

// --------------------------------------------------------
// jsonwebtoken is used to create and verify JWT tokens
const jwt = require('jsonwebtoken');

// --------------------------------------------------------
// This section is only for debugging dotenv and JWT_SECRET
// It checks whether the .env file exists and whether JWT_SECRET is loaded correctly
const fs = require('fs');
const path = require('path');
const envPath = path.join(__dirname, '.env');

console.log("--- Debugging Dotenv ---");
console.log("Checking if .env file exists at:", envPath);
console.log("Does file exist?:", fs.existsSync(envPath));

if (fs.existsSync(envPath)) {
    // Read and print the raw content of the .env file
    // Useful for debugging, but should be removed in production
    console.log("File Content raw:", fs.readFileSync(envPath, 'utf8'));
}

// Print JWT_SECRET from process.env to confirm dotenv worked
console.log("JWT_SECRET from process.env:", process.env.JWT_SECRET);
console.log("------------------------");

// --------------------------------------------------------
// Middleware function to verify JWT token from Authorization header
function verifyToken(req, res, next) {
    // Get Authorization header from the request
    const authHeader = req.headers.authorization;

    // If no Authorization header exists, deny access
    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }

    // Split "Bearer token_here" and take only the token part
    const token = authHeader.split(" ")[1];

    // If token is missing after split, format is invalid
    if (!token) {
        return res.status(401).json({ message: "Invalid token format" });
    }

    try {
        // Verify token using the secret key from .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Save decoded user data inside req.user for later use in protected routes
        req.user = decoded;

        // Move to the next middleware or route handler
        next();
    } catch (error) {
        // If token is invalid or expired, deny access
        return res.status(403).json({ message: "Invalid token" });
    }
}

// ----------------------------------------------------------------------------------------------
// This middleware enables CORS so the frontend can access the backend from another origin/port
app.use(function (req, res, next) {
    // Allow requests from any origin
    res.header('Access-Control-Allow-Origin', "*");

    // Allow these headers in incoming requests
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,Content-Type, Accept, Authorization');

    // Allow these HTTP methods
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // Continue to the next middleware
    next();
});

// --------------------------------------------------------
// Import SQL Server driver
var sql = require('mssql/msnodesqlv8');

// This line imports NVarChar type directly, but it is optional if you use sql.NVarChar
const { NVarChar } = require('msnodesqlv8');

// --------------------------------------------------------
// Connect to SQL Server database
sql.connect({
    // '.' means local SQL Server instance
    server: '.',

    // Name of the database to connect to
    database: 'DB_TaskManager',

    // SQL Server driver
    driver: 'msnodesqlv8',

    // Use Windows Authentication
    options: { trustedConnection: true }
});


//----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------
// insert info of tasks from react to sql
app.post('/addtask', verifyToken, (req, res) => {
    console.log('**add task**')
    var { title, details, month, day } = req.body
    console.log(title, details, month, day)
    const userId = req.user.id;
    const request = new sql.Request();

    request.input('userId', sql.Int, userId);
    request.input('title', sql.NVarChar, title);
    request.input('details', sql.NVarChar, details);
    request.input('month', sql.NVarChar, month);
    request.input('day', sql.Int, day);

    request.query(`INSERT INTO Table_AddTask(title,details,month,day, userId)VALUES(@title,@details,@month,@day,@userId)SELECT
 @@IDENTITY as Id`, (err, data) => {
        if (err) {
            console.error(err)
            return res.send({ result: false })
        } else {
            var id = data.recordset[0].Id
            console.log('inserted id is:', id)
            return res.send({ result: true, id: id })
        }

    })

})
//----------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------
app.get("/mytasks", verifyToken, (req, res) => {
    console.log('****get my tasks****')
    const userId = req.user.id
    const request = new sql.Request()
    request.input('uId', sql.Int, userId)

    request.query(
        `SELECT * FROM Table_AddTask WHERE userId = @uId`,
        (err, data) => {

            if (err) {
                console.error(err);
                return res.status(500).send({ result: false, message: "SERVER_ERROR" });
            }

            return res.send({
                result: true,
                tasks: data.recordset,
            });
        }
    );
});
//----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------
//deleting task from table addtask by id 
//we use verifyToken to check token before perfoming function and if it was true our function will perform
app.delete('/deleteTask/:id', verifyToken, async (req, res) => {
    console.log('***deleting task***');

    try {
        const { id } = req.params;
        const userId = req.user.id;

        console.log('ID:', id);

        const request = new sql.Request();
        request.input('id', sql.Int, id);
        request.input('userId', sql.Int, userId);

        await request.query(`
            DELETE FROM Table_AddTask
            WHERE Id = @id AND userId = @userId
        `);

        return res.send({ result: true });
    } catch (err) {
        console.error(err);
        return res.send({ result: false });
    }
});

//----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------
//getting all task by id to show in home page
app.get('/gettaskbyid/:id', verifyToken, async (req, res) => {
    console.log('*****gettaskbyid*****');

    try {
        const { id } = req.params;
        const userId = req.user.id;

        console.log('id:', id);

        const request = new sql.Request();
        request.input('id', sql.Int, id);
        request.input('userId', sql.Int, userId);

        const data = await request.query(`
            SELECT * 
            FROM Table_AddTask 
            WHERE id = @id AND userId = @userId
        `);

        if (data.recordset.length > 0) {
            return res.send({ result: data.recordset[0] });
        } else {
            return res.send({ result: {} });
        }
    } catch (err) {
        console.error(err);
        return res.send({ result: false });
    }
});

//----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------
//upadating task through edit button
app.put('/updatetask', verifyToken, (req, res) => { // verifyToken اضافه شد
    console.log('***update task***')
    var { id, title, details, month, day, completed } = req.body // completed اضافه شد
    const userId = req.user.id; // گرفتن userId از توکن
    console.log(id, title, details, month, day, completed)
    sql.query(`UPDATE  Table_AddTask SET title='${title}',details='${details}',month='${month}',day='${day}', completed=${completed ? 1 : 0} WHERE id=${id} AND userId=${userId}`, (err, data) => { // userId و completed اضافه شد
        if (err) {
            console.error(err)
            return res.send({ result: false })
        } else {
            return res.send({ result: true })
        }
    })
})
//----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------
//upadate tasks by id 
app.put('/tasks/:id', verifyToken, async (req, res) => {
    console.log('***tasks***');

    try {
        const taskId = req.params.id;
        const { title, details, month, day, completed } = req.body;
        const userId = req.user.id;

        console.log(taskId, title, details, month, day, completed);

        const request = new sql.Request();

        request.input('id', sql.Int, taskId);
        request.input('userId', sql.Int, userId);
        request.input('title', sql.NVarChar, title);
        request.input('details', sql.NVarChar, details);
        request.input('month', sql.NVarChar, month);
        request.input('day', sql.Int, day);
        request.input('completed', sql.Bit, completed);

        const result = await request.query(`
            UPDATE Table_AddTask
            SET 
                title = @title,
                details = @details,
                month = @month,
                day = @day,
                completed = @completed
            WHERE id = @id AND userId = @userId
        `);

        return res.send({ result: true, data: result });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ result: false, error: err.message });
    }
});

//----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------
// getting tasks for each month to show it in calender
app.get('/tasksmonth/:month', verifyToken, (req, res) => {
    console.log('***tasksmonth***');

    const { month } = req.params;
    const userId = req.user.id;

    console.log('month:', month, 'userId:', userId);

    const request = new sql.Request();
    request.input('month', sql.NVarChar, month);
    request.input('uId', sql.Int, userId);

    request.query(
        `SELECT * FROM Table_AddTask WHERE month = @month AND userId = @uId`,
        (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).send({ result: false });
            } else {
                return res.send({ result: data.recordset });
            }
        }
    );
});

//----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------
//getting each task by month and put it in the calander 
//we use verifyToken to check if our token is true and match
app.get('/gettasksbymonth/:month', verifyToken, (req, res) => {
    console.log('###gettasksbymonth###');

    const { month } = req.params;
    const userId = req.user.id;

    console.log('month:', month);

    const request = new sql.Request();
    request.input('uId', sql.Int, userId);
    request.input('umonth', sql.NVarChar, month);

    request.query(
        `SELECT * FROM Table_AddTask WHERE month = @umonth AND userId = @uId`,
        (err, data) => {
            if (err) {
                console.error(err);
                return res.send({ result: false });
            } else {
                return res.send({ result: data.recordset });
            }
        }
    );
});

//----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------
//adding users--signup
app.post('/addusers', async (req, res) => {
    try {
        let { username, password, email } = req.body;

        username = username?.trim();
        email = email?.trim().toLowerCase();

        if (!username || !password || !email) {
            return res.send({ result: false, message: 'MISSING_FIELDS' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const checkRequest = new sql.Request();
        checkRequest.input('email', sql.NVarChar, email);

        const existingUser = await checkRequest.query(`
            SELECT * FROM Table_Users
            WHERE email = @email
        `);

        console.log('existing users:', existingUser.recordset);

        if (existingUser.recordset.length > 0) {
            return res.send({ result: false, message: 'EMAIL_ALREADY_EXISTS' });
        }

        const insertRequest = new sql.Request();
        insertRequest.input('username', sql.NVarChar, username);
        insertRequest.input('password', sql.NVarChar, hashedPassword);
        insertRequest.input('email', sql.NVarChar, email);

        await insertRequest.query(`
            INSERT INTO Table_Users (username, password, email)
            VALUES (@username, @password, @email)
        `);

        return res.send({ result: true });
    } catch (err) {
        console.error('addusers error:', err);
        return res.send({ result: false, message: 'SERVER_ERROR' });
    }
});

//----------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------
//this part is for login into the acccount
app.post('/signin', (req, res) => {
    var { email, password } = req.body
    console.log(email, password)
    sql.query(`SELECT * From Table_Users WHERE email = '${email}'`, async (err, data) => {
        if (err) {
            console.error(err)
            return res.send({ result: false })
        }

        if (data.recordset.length === 0) {
            return res.send({ result: false, message: 'User not found' })
        }

        const user = data.recordset[0]
        const ismatch = await bcrypt.compare(password, user.password)

        if (!ismatch) {
            return res.send({ result: false, message: "password is wrong" })
        }
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'

            }
        )

        return res.send({
            result: true,
            message: "you loged in ",
            token: token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email

            }
        })
    })
})
//----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------
// get profile info for logged-in user
app.get('/profile', verifyToken, async (req, res) => {
    console.log('get profileeeeeeeee')
    try {
        const userId = req.user.id;

        const request = new sql.Request();
        request.input('userId', sql.Int, userId);

        // اصلاح شد: استفاده از نام دقیق ستون‌ها (FullName, PhoneNumber, Bio)
        const data = await request.query(`
            SELECT id, username, email, FullName, PhoneNumber, Bio
            FROM Table_Users
            WHERE id = @userId
        `);

        if (data.recordset.length === 0) {
            return res.status(404).send({ result: false, message: 'USER_NOT_FOUND' });
        }

        return res.send({
            result: true,
            user: data.recordset[0]
        });
    } catch (err) {
        console.error('get profile error:', err);
        return res.status(500).send({ result: false, message: 'SERVER_ERROR' });
    }
});

// ----------------------------------------------------------------------------------------------
// update profile info for logged-in user
app.put('/profile', verifyToken, async (req, res) => {
    console.log('putttt profile ')
    try {
        const userId = req.user.id;
        // اصلاح شد: گرفتن PhoneNumber از بدنه درخواست
        var { FullName, Bio, PhoneNumber } = req.body;

        FullName = (FullName ?? "").trim();
        Bio = (Bio ?? "").trim();
        PhoneNumber = (PhoneNumber ?? "").trim();

        if (FullName.length > 80) {
            return res.status(400).send({ result: false, message: "FULLNAME_TOO_LONG" });
        }
        if (Bio.length > 250) {
            return res.status(400).send({ result: false, message: "BIO_TOO_LONG" });
        }

        const request = new sql.Request();
        request.input('userId', sql.Int, userId);
        request.input('FullName', sql.NVarChar, FullName || null);
        request.input('Bio', sql.NVarChar, Bio || null);
        request.input('PhoneNumber', sql.NVarChar, PhoneNumber || null); // اضافه شدن پارامتر تلفن

        // اصلاح شد: اضافه شدن PhoneNumber به کوئری آپدیت دیتابیس
        await request.query(`
            UPDATE Table_Users
            SET FullName = @FullName,
                Bio = @Bio,
                PhoneNumber = @PhoneNumber
            WHERE id = @userId
        `);

        // برگرداندن پروفایل آپدیت شده با نام‌های صحیح
        const data = await request.query(`
            SELECT id, username, email, FullName, PhoneNumber, Bio
            FROM Table_Users
            WHERE id = @userId
        `);

        return res.send({ result: true, user: data.recordset[0] });
    } catch (err) {
        console.error('update profile error:', err);
        return res.status(500).send({ result: false, message: 'SERVER_ERROR' });
    }
});




//----------------------------------------------------------------------------------------------
// this code is for checking back end to see if we are connect or not
app.get('/check', (req, res) => {
    console.log('**checked**')
    return res.send('checking connection')


})
//----------------------------------------------------------------------------------------------
//connecting to the desire port===>
app.listen(5000, () => { console.log('app connected to port 5000') })
