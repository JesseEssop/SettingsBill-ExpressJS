const assert = require("assert");
const settingsBill = require("../function/settings-bill.js");
let settingsInstance = settingsBill();

describe('Settings-bill tests', function () {
    it('This tests should be able to set the call cost', function () {
        settingsInstance.setCallCost(3.50)
        assert.equal( 3.50, settingsInstance.getCallCost());
    });

    it('This tests should be able to set the sms cost', function () {
        settingsInstance.setSmsCost(2.45)
        assert.equal(2.45, settingsInstance.getSmsCost());
    });

    it('This tests should be able to set the call and sms cost', function () {
        settingsInstance.setCallCost(3.50)
        settingsInstance.setSmsCost(0.85)
        assert.equal(3.50, settingsInstance.getCallCost());
        assert.equal(0.85, settingsInstance.getSmsCost());
    });

    it('This tests should be able to set the warning level', function () {
        settingsInstance.setWarningLevel(20); 
        assert.equal(20, settingsInstance.getWarningLevel());
    });

    it('This tests should be able to set the critical level', function () {
        settingsInstance.setCriticalLevel(35);
        assert.equal(35, settingsInstance.getCriticalLevel());
    });

    it('This tests should be able to set the critical and warning level', function () {
        settingsInstance.setWarningLevel(50)
        settingsInstance.setCriticalLevel(83)
        assert.equal(50, settingsInstance.getWarningLevel());
        assert.equal(83, settingsInstance.getCriticalLevel());
    });

    it('This tests should be able to calculate the total call amount', function () {

        settingsInstance.setCallCost(3.8);
        settingsInstance.setCallCost(2.5);
        settingsInstance.setCallCost(5.8);
        settingsInstance.getCallCost();
        settingsInstance.getCallCost()
        settingsInstance.getCallCost()
       
        
        assert.equal(settingsInstance.makeCall(), 12.1);
    });

});
