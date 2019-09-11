const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const SettingsBill = require('./function/settings-bill')

const app = express();
const settingsBill = SettingsBill();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.render('index', {
        sms: settingsBill.getTotalSmsCost(),
        call: settingsBill.getTotalCallCost(),
        total: settingsBill.getTotalCost()
    });
});

app.post('/settings', function (req, res) {
    settingsBill.setCallCost(Number(req.body.callCost));
    settingsBill.setSmsCost(Number(req.body.smsCost));
    settingsBill.setWarningLevel(Number(req.body.warningLevel));
    settingsBill.setCriticalLevel(Number(req.body.criticalLevel));

    res.redirect('/');
});

app.post('/action', function (req, res) {
    // settingsBill.recordAction(req.body.billItemTypeWithSettings);
    const typeChosen = req.body.billItemTypeWithSettings;
    if (typeChosen === 'call') {
        settingsBill.makeCall();
    } else if (typeChosen === 'sms') {
        settingsBill.sendSms();
    }
    res.redirect('/');
});

app.get('/actions', function (req, res) {

});

app.get('/actions/:type', function (req, res) {

});

const PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
    console.log("App started at port:", PORT)
})