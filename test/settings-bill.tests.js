const assert = require("assert");
const settingsBill = require("../function/settings-bill.js");


describe('Settings-bill tests', function () {
    it('This tests should be able to set the call cost', function () {
        let settingsInstance = settingsBill();
        settingsInstance.setCallCost(3.50)
        assert.equal(3.50, settingsInstance.getCallCost());
    });

    it('This tests should be able to set the sms cost', function () {
        let settingsInstance = settingsBill();
        settingsInstance.setSmsCost(2.45)
        assert.equal(2.45, settingsInstance.getSmsCost());
    });

    it('This tests should be able to set the call and sms cost', function () {
        let settingsInstance = settingsBill();
        settingsInstance.setCallCost(3.50)
        settingsInstance.setSmsCost(0.85)
        assert.equal(3.50, settingsInstance.getCallCost());
        assert.equal(0.85, settingsInstance.getSmsCost());
    });

    it('This tests should be able to set the warning level', function () {
        let settingsInstance = settingsBill();
        settingsInstance.setWarningLevel(20);
        assert.equal(20, settingsInstance.getWarningLevel());
    });

    it('This tests should be able to set the critical level', function () {
        let settingsInstance = settingsBill();
        settingsInstance.setCriticalLevel(35);
        assert.equal(35, settingsInstance.getCriticalLevel());
    });

    it('This tests should be able to set the critical and warning level', function () {
        let settingsInstance = settingsBill();
        settingsInstance.setWarningLevel(50)
        settingsInstance.setCriticalLevel(83)
        assert.equal(50, settingsInstance.getWarningLevel());
        assert.equal(83, settingsInstance.getCriticalLevel());
    });
    describe("Use values", function () {
        it('This tests should be able to use the call cost set at R3.8', function () {
            let settingsInstance = settingsBill();

            settingsInstance.setCriticalLevel(10);
            settingsInstance.setCallCost(3.8);
            settingsInstance.setSmsCost(2.5);

            settingsInstance.makeCall();
            settingsInstance.makeCall();

            assert.equal(7.6, settingsInstance.getTotalCost());
            assert.equal(7.6, settingsInstance.getTotalCallCost());
            assert.equal(0.0, settingsInstance.getTotalSmsCost());
        });

        it('This tests should be able to use the call cost set at R2.50', function () {
            let settingsInstance = settingsBill();

            settingsInstance.setCriticalLevel(10);
            settingsInstance.setCallCost(3.8);
            settingsInstance.setSmsCost(2.5);

            settingsInstance.sendSms();
            settingsInstance.sendSms();

            assert.equal(5.0, settingsInstance.getTotalCost());
            assert.equal(0.0, settingsInstance.getTotalCallCost());
            assert.equal(5.0, settingsInstance.getTotalSmsCost());
        });
    });
    describe('warning & crititcal levels', function () {
        it("it should return a class name of 'warning' if the warning level is reached", function () {
            let settingsInstance = settingsBill();

            settingsInstance.setCallCost(3.8);
            settingsInstance.setSmsCost(2.5);
            settingsInstance.setWarningLevel(10);
            settingsInstance.setCriticalLevel(20);

            settingsInstance.makeCall();
            settingsInstance.makeCall();
            settingsInstance.makeCall();
            settingsInstance.makeCall();
            settingsInstance.makeCall();

            assert.equal("warning", settingsInstance.totalClassName())
        });

        it("it should return a class name of 'critical' when the critical level has been reached", function () {
            let settingsInstance = settingsBill();

            settingsInstance.setCallCost(3.8);
            settingsInstance.setSmsCost(2.5);
            settingsInstance.setWarningLevel(10);
       
            settingsInstance.makeCall();
            settingsInstance.makeCall();
            settingsInstance.makeCall();
            settingsInstance.makeCall();
            settingsInstance.makeCall();

            assert.equal("critical", settingsInstance.totalClassName())
        });

        it("it should stop the Total Callcost from increasing when the critical level has been reached", function () {
            let settingsInstance = settingsBill();

            settingsInstance.setCallCost(3.8);
            settingsInstance.setSmsCost(2.5);
            settingsInstance.setCriticalLevel(10);
       
            settingsInstance.makeCall();
            settingsInstance.makeCall();
            settingsInstance.makeCall();
            settingsInstance.makeCall();
            settingsInstance.makeCall();

            assert.equal("critical", settingsInstance.totalClassName());
            assert.equal(11.4, settingsInstance.getTotalCallCost())
        });

        it("it should stop the Total Call cost to increase after reaching the critical level & then upping the critical level", function () {
            let settingsInstance = settingsBill();

            settingsInstance.setCallCost(3.8);
            settingsInstance.setSmsCost(2.5);
            settingsInstance.setCriticalLevel(8);
            settingsInstance.setCriticalLevel(10);
       
            settingsInstance.makeCall();
            settingsInstance.makeCall();
            settingsInstance.makeCall();
            settingsInstance.makeCall();
            
            assert.equal("critical", settingsInstance.totalClassName());
            assert.equal(11.4, settingsInstance.getTotalCallCost());

            settingsInstance.setCriticalLevel(20);  
            
            assert.equal("warning", settingsInstance.totalClassName());
            settingsInstance.makeCall();
            settingsInstance.makeCall();
        });
    });
});
