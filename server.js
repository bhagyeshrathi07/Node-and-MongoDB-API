var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const { response } = require('express');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

var ingredients = [
    {
        "id" : "sds45r",
        "text" : "Eggs" 
    },
    {
        "id" : "ffs75d",
        "text" : "Milk"
    },
    {
        "id" : "dgh44d",
        "text" : "Pasta"
    },
    {
        "id" : "gfd44f",
        "text" : "Cheese"
    }
];

app.get('/ingredients', function(request, response) {
    response.send(ingredients)
});

app.post('/ingredients', function(request, response) {
    var ingredient = request.body;
    if (!ingredient || ingredient.text === "") {
        response.status(500).send({error: "Your ingredient must contain text!"});
    } else {
        ingredients.push(ingredient);
        response.status(200).send(ingredients);
    }
});

app.delete('/ingredients', function(request, response) {
    var ingredientId = request.body.id;

    if (!ingredientId || ingredientId === "") {
        response.status(500).send({error: "ingredientId must contain a valid id"})
    } else {
        var objectToDelete_found = false;
        for (var x = 0; x < ingredients.length; x++) {
            var ing = ingredients[x];
            
            if (ing.id === request.body.id) {
                ingredients.splice(x, 1);
                objectToDelete_found = true;
                break;
            }
        }
        if (!objectToDelete_found) {
            response.status(500).send({error: "Ingredient id not found"})
        } else {
            response.send(ingredients);
        }
        response.send(ingredients);
    }
});

app.put('/ingredients/:ingredientId', function(request, response) {             //ingredientID is a url parameter can be give inside as well 

    var newText = request.body.text;

    if (!newText || newText === "") {
        response.status(500).send({erron: "You must provide ingredint text!"})
    } else {
        var objectFound = false;
        for (var x = 0; x < ingredients.length; x++) {
            var ing = ingredients[x];

            if (ing.id === request.params.ingredientId) {
                ingredients[x].text = newText;
                objectFound = true;
                break;
            }
        }
        if (!objectFound) {
            response.status(500).send({error: "Ingredient id not found"})
        } else {
            response.send(ingredients);
        }
        response.status(200).send(ingredients);
    }
});

app.listen(3000, function() {
    console.log("First API running on the port 3000!");
});