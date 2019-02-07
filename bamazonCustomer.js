var inquirer = ("inquirer"); //Install inquirer npm
var mysql = require("mysql"); //Install mysql npm

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
    // findItem();
    showList();
    afterConnection();
});

//===========================================================================//\
// inquirer.prompt is not a function??
function findItem(){
    function search(){
        inquirer
        .prompt({
            name: "find_id",
            type: "input",
            message: "What is the ID number of the item you'd like to purchase?"
        }).then(function(user){
            console.log("You've selected " + user.find_id + " ...");
        })
    }
search();
}

//===========================================================================//
function showList(){
    console.log("Showing List.... ");
    var query = connection.query(
        "SELECT * FROM products",
        function(err, res) {
            // console.log(res);
            for(var i = 0; i < res.length; i++){
                console.log("\n" + res[i].itemID + " | " + res[i].productName + " -- " + res[i].deptName + " -- " + "$" + res[i].price + " -- (" + res[i].stockQuantity + " Left in Stock!)");
            }
        }
);
};

//===========================================================================//
function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        connection.end();
    });
}


