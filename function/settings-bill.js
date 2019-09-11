module.exports = function SettingsFactory() {

    var smsCost = 0;
    var callCost = 0;
    var warningLevel = 0;
    var criticalLevel = 0;
    var callCostTotal = 0;
    var smsCostTotal = 0;



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
        if (CriticalLevelReached()) {
            return "critical"
        }

        if (getTotalCost() >= getWarningLevel()) {
            return "warning"
        }
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
        recordAction
    }
}