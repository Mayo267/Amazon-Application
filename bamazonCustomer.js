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
        .prompt({
            name: "find_id",
            type: "input",
            message: "Please type the list number of the item you'd like to purchase?"
        }).then(function(user){
            console.log("You've selected " + user.find_id + " ... ");
        })
    }
search();
}

//===========================================================================//
function showList(){
    console.log("\nShowing List.... ");
    connection.query(
        "SELECT * FROM products",
        function(err, res) {
            // console.log(res);
            for(var i = 0; i < res.length; i++){
                console.log("\n" + res[i].itemID + " | " + res[i].productName + " -- " + res[i].deptName + " -- " + "$" + res[i].price + " -- (" + res[i].stockQuantity + " Left in Stock!)");
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


