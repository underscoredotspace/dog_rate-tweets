var express = require('express');
var app = express();
app.use(express.static('public'));

app.get('/', (req, res) => {
  
})

var listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
