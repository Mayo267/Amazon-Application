var inquirer = require("inquirer"); 
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "Amelia309",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    findItem();
    showList();
    afterConnection();
});

//===========================================================================//\
function findItem(){
    function search(){
        inquirer
        .prompt([
            {
            name: "find_id",
            type: "input",
            message: "Please type the list number of the item you'd like to purchase?"
            },
            {
            name: "quantity",
            type: "input",
            message: "How many will you be purchasing?"
            },
            {
            name:"confirm",
            type: "confirm",
            message: "Is this information correct?"
            }
        ]
        
        ).then(function(user){
            if(user.confirm === true){
            console.log("\nYou've selected number " + user.find_id + ".");
            console.log("\nYou're purchasing " + user.quantity + " units.");
            }else{
                search();
            }
        })
    }
search();
}

//===========================================================================//
function showList(){
    console.log("\n"  +  "\nShowing List.... ");
    connection.query(
        "SELECT * FROM products",
        function(err, res) {
            for(var i = 0; i < res.length; i++){
                console.log("\n" + res[i].itemID + " | " + res[i].productName + " -- " + res[i].deptName + " -- " + "$" + res[i].price + " -- (" + res[i].stockQuantity + " Left in Stock!)" + "\n");
            }
        }
)
};

//===========================================================================//
function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        connection.end();
    });
}


