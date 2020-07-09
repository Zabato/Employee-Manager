var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3000,
    user: "root",
    password: "Garzaboyz33",
    database: "employee_managerDB"
});

connection.connect(function(err){
    if (err) throw err;
    runSearch();
});

function runSearch() {
    inquirer
        .prompt({
            name:"action",
            type:"list",
            message: "What would you like to do?",
            choices: [
                "Would you like to create a new employee?",
                "Would you like to update an employee's role?",
                "Would you like to change an employee's department?",
                "Would you like to add a new department?",
                "Would you like to view all employees?",
                "exit"
            ]
        })
        .then(function(answer){
            switch(answer.action){
                case"Would you like to create a new employee?":
                    newEmployee();
                    break;
                
                case "Would you like to update an employee's role?":
                    updateRoll();
                    break;
                
                case "Would you like to change an employee's department?":
                    updateDepartment();
                    break;
                
                case "Would you like to add a new department?":
                    newDepartment();
                    break;
                
                case "Would you like to view all employees":
                    viewAll();
                    break;

                case "exit":
                    connection.end();
                    break;
            }
        });
}

function newEmployee() {
    inquirer
        .prompt({
            name: "first",
            type: "input",
            message: "Please enter employee's first name"
        },
        {
            name: "last",
            type: "input",
            message: "Please enter employee's last name"
        },
        {
            name: "role",
            type: "input",
            message: "Please enter role"
        })
        .then(function(answer) {
            connection.query(
                "INSERT INTO employee SET",
                {   
                    first_name: answer.first,
                    last_name: answer.last,
                    role_id: answer.role
                },
                function(err) {
                    if (err) throw err; 
                    console.log("New employee created");
                    start();
                }
            ); 
        });
}
//need help here 
function updateRoll() { 
    inquirer 
        .prompt({
            name: "title",
            type: "list",
            message: "Who's role would you like to update?",
            //choices: []
        })
        .then(function(answer){
            connection.query(
                "INSERT INTO role SET",
                {
                    title: answer.title
                },
                function (err) {
                    if (err) throw err; 
                    console.log("New employee created");
                    //what function should be used to update?
                }
            );
        });
}

function updateDepartment() {
    inquirer 
    .prompt({
        name: "employee",
        type: "list",
        message: "Who would you like to change departments?",
        //choices: []
    },
    {
        name: "department",
        type: "list",
        message: "what department would you like to move to?"
        //choice of department here 
    })
    .then(function(answer){
        connection.query(
            "INSERT INTO role SET",
            {
                department_id: answer.department
            },
            function (err) {
                if (err) throw err; 
                console.log("Department has been updated");
                //what function should be used to update?
            }
        );
    });
}

function newDepartment() {
    inquirer
    .prompt({
        name: "department",
        type: "input",
        message: "Please enter new department"
    })
    .then(function(answer) {
        connection.query(
            "INSERT INTO department SET",
            {   
                name: answer.department
            },
            function(err) {
                if (err) throw err; 
                console.log("New department created");
                start();
            }
        ); 
    });
}

function viewAll() {
    connection.query(
        "SELECT * FROM employee", 
        function(err,res) {
            if(err) throw err; 
            console.log(res);
            connection.end();
        });
}

