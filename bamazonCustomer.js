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
    showList();
});

//===========================================================================//\


//===========================================================================//
function showList(){
    console.log("\n"  +  "\nShowing List.... ");
    connection.query(
        "SELECT * FROM products",
        function(err, res) {
            for(var i = 0; i < res.length; i++){
                console.log("\n" + res[i].itemID + " | " + res[i].productName + " -- " + res[i].deptName + " -- " + "$" + res[i].price + " -- (" + res[i].stockQuantity + " Left in Stock!)" + "\n");
            }
            search();
        }
)
};

//====================================================================//


    function search(){
        inquirer
        .prompt([
            {
            name: "find_id",
            type: "input",
            message: "Please type the list number of the item you'd like to purchase?",
            // filter: number
            },
            {
            name: "quantity",
            type: "input",
            message: "How many will you be purchasing?",
            // filter: number
            },
            {
            name:"confirm",
            type: "confirm",
            message: "Is this information correct?"
            }
        ]).then(function(user, res){
            // Check if there is available stock for order amount...
                //==Add connection to database.
                var userQuantity = user.quantity;
                connection.query("SELECT * FROM products", function(err, res){
                    
                    var orderNum = user.find_id;
                    var chosenItem = res[(orderNum - 1)];
                    var chosenQuantity = userQuantity; 
                    var availableStock = chosenItem.stockQuantity;
                    var priceOfItem = chosenItem.price;
                    
                    // console.log(orderNum);
            //If there is enough, complete order...
            if(chosenQuantity <= availableStock){ //Reverting to insufficient no matter the quantity?? ^^
                //==Log success.
                console.log("Success!");
                //==Remove ordered quantity from stock.
                var newStock = availableStock - chosenQuantity;
                //==Multiply quantity of order and price of single item ordered.
                var total = chosenQuantity * priceOfItem;
                //==Display order and order total.
                console.log("Your order total is $" + total);
                //==Display the new stock quantity.
                console.log(newStock + " Left in Stock!");
                // function deleteStock(){
                //     connection.query("UPDATE product SET ? WHERE ?",
                //         {
                //             stockQuantity: -chosenQuantity
                //         },
                //         {
                //             itemID: orderNum
                //         },
                //             function(err, res){
                //                 console.log(res.affectedRows + " products deleted!\n");
                //             }
                //         )}
                //     deleteStock();
                //==End connection.
                
                // console.log(res.affectedRows + " products deleted!\n");
                afterConnection();
            }
            
            //If not, go back go search...
            else{
                //==Log insufficient stock.
                console.log("Insufficient Stock! Please make another selection.");
                console.log("You've ordered " + chosenQuantity + " with only " + availableStock + " available.");
                //==Go back to search.
                search();
            }
        })

        })
    }


function deleteStock(chosenQuantity, chosenItem, orderNum, availableStock){
    // console.log(chosenQuantity);
    connection.query("UPDATE products SET ? WHERE ?", 
    {
        stockQuantity: (availableStock - chosenQuantity)
    },
    {
        itemID: chosenItem.itemID
    },
    function(err, res){
        console.log(res.affectedRows + " products deleted!\n");
        
    });
}
//===========================================================================//

function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res) {
        
        if (err) throw err;
        
        connection.end();
    })
};


// Check stock for the order, if not enough "Insufficient Stock", prevent order from going through.
// If order is good to go, reflect the order amount on the stock availability and show total cost of order


