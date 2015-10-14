var app = require('express')()


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

var server = app.listen(1337, function() {
  var host = server.address().address
  var port = server.address().port
  console.log('listening at http://%s:%s', host, port)
})
