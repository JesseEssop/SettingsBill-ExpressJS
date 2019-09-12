let moment = require('moment');

module.exports = function SettingsFactory() {

    var smsCost = 0;
    var callCost = 0;
    var warningLevel = 0;
    var criticalLevel = 0;
    var callCostTotal = 0;
    var smsCostTotal = 0;

    var actionList = [];



    function setCallCost(call) {
        callCost = call;
    }

    function getCallCost() {
        return callCost;
    }

    function setSmsCost(sms) {
        smsCost = sms;
    }

    function getSmsCost() {
        return smsCost;
    }

    function setWarningLevel(level) {
        warningLevel = level;
    }

    function getWarningLevel() {
        return warningLevel;
    }

    function setCriticalLevel(lvl) {
        criticalLevel = lvl;
    }

    function getCriticalLevel() {
        return criticalLevel;
    }

    function makeCall() {
        if (!CriticalLevelReached()) {
            callCostTotal += callCost;
        }
    }

    function getTotalCost() {
        return (callCostTotal + smsCostTotal).toFixed(2);
    }

    function getTotalCallCost() {
        return callCostTotal.toFixed(2);
    }

    function getTotalSmsCost() {
        return smsCostTotal.toFixed(2);
    }

    function sendSms() {
        if (!CriticalLevelReached()) {
            smsCostTotal += smsCost;
        }
    }

    function CriticalLevelReached() {
        return getTotalCost() >= getCriticalLevel()
    }

    function totalClassName() {
        if (getCriticalLevel() !== 0) {
            if (CriticalLevelReached()) {
                return "danger"
            }

            else if (getTotalCost() >= getWarningLevel()) {
                return "warning"
            }
            else {
                return "safe"
            }
        }
    }

    function recordAction(action) {
        var cost = 0;
        if (action === 'call') {
            makeCall();
            cost = callCost.toFixed(2)
        } else if (action === 'sms') {
            sendSms();
            cost = smsCost.toFixed(2);
        }

        actionList.push({
            type: action,
            price: 'R' + cost,
            timestamp: moment().fromNow()
        })
    }

    function Actions() {
        return actionList;
    }

    function ActionType(type) {
        return actionList.filter((action) => action.type === type);
    }

    return {
        setCallCost,
        getCallCost,
        setSmsCost,
        getSmsCost,
        getTotalSmsCost,
        setWarningLevel,
        getWarningLevel,
        setCriticalLevel,
        getCriticalLevel,
        makeCall,
        sendSms,
        getTotalCallCost,
        getTotalCost,
        totalClassName,
        CriticalLevelReached,
        recordAction,
        Actions,
        ActionType
    }
}