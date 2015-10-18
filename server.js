var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
  if (req.method == 'GET') {
    res.set('Access-Control-Allow-Origin', '*')
  }
  next();
})

var spellCodes = {
	"grault": "1",
	"baz": "2",
	"quux": "3",
}

var counterSpellCode = {
	"1": "baz",
	"2": "quux",
	"3": "grault",
}

function codifySpell(spellText, mapping) {
  if(spellText.length == 0) return [];
  var codes = []
	var startingIndex = 0;
  for(var i = 0; i <= spellText.length; i++) {
    var spellKey = spellText.substr(startingIndex, i-startingIndex)
    if(spellCodes[spellKey]) {
      codes.push(spellCodes[spellKey])
      startingIndex = i
    }
  }
  return codes
}

function decodifySpell(spellCode, mapping) {
  var spell = "";
  for(var i = 0; i < spellCode.length; i++) {
    spell += mapping[spellCode[i]];
  }
  return spell;
}


app.get('/weeby/magic', function(req, res) {
  var spellText = req.query.spell
  var codifiedSpell = codifySpell(spellText, spellCodes)
  var counterSpell = decodifySpell(codifiedSpell, counterSpellCode)

  
  res.send(counterSpell)
})


app.get('/', function(request, response) {
  response.render('index');
});


app.set('port', (process.env.PORT || 1337))
app.set('view engine', 'ejs');
var server = app.listen(app.get('port'), function() {
  var host = server.address().address
  var port = server.address().port
  console.log('listening at http://%s:%s', host, port)
})
