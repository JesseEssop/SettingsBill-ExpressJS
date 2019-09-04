module.exports = function SettingsFactory(){

    var smsCost = 0; 
    var callCost = 0;
    var warningLevel = 0;
    var criticalLevel = 0;
    var totalCost = 0;
    var totalCall = 0;
    var totalSms = 0;



    function setCallCost (call){
        callCost = call;
    }

    function getCallCost(){
        return callCost;
    }

    function setSmsCost(sms){
        smsCost = sms;
    }

    function getSmsCost (){
        return smsCost
    }

    function setWarningLevel(level){
        warningLevel = level;
    }

    function getWarningLevel (){
        return warningLevel;
    }

    function setCriticalLevel(lvl){
        criticalLevel = lvl;
    }

    function getCriticalLevel (){
        return criticalLevel;
    }

    function makeCall(){
        totalCall += callCost
    }

    function makeSms(){
        totalSms += smsCost;

    }

    function totalCellCost(){
        totalCost = totalCall + totalSms;
        return totalCost;
    }

    return{
        setCallCost,
        getCallCost,
        setSmsCost,
        getSmsCost,
        setWarningLevel,
        getWarningLevel,
        setCriticalLevel,
        getCriticalLevel,
        makeCall,
        makeSms,
        totalCellCost
    }
}