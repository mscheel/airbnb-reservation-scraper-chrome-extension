var clean = false;
if($('td.payout-table-cell-left')[1].innerText.indexOf("Cleaning Fees") > -1) {
        clean = true; 
}
//TODO: Bug waiting to happen, uses computer current year, but what if booking in December for January of next year?
var checkInDate = eval($('div.col-3').children('span')[0]).innerText + ", " + new Date().getFullYear();
var checkInMonthYear = ((new Date(checkInDate)).getMonth() + 1) + "" + ((new Date(checkInDate)).getYear() + 1900);
var checkOutDate = eval($('div.col-3').children('span')[2]).innerText + ", " + new Date().getFullYear();
var regExNumberAtStart = new RegExp("\\d+");
var nights = regExNumberAtStart.exec(eval($('div.col-4.hide-overflow').children('span')[0]).innerText);
var guests = regExNumberAtStart.exec(eval($('div.cotraveler-section-header.space-2.hide-overflow')[0]).innerText);

var regExPrice = new RegExp("\\$[0-9]+");
var nightlyPayout = regExPrice.exec($('td.payout-table-cell-left')[0].innerHTML);

var payout = regExPrice.exec($('td.payout-table-cell-right')[0].innerHTML);
if(clean) {
    var cleaningFee = regExPrice.exec($('td.payout-table-cell-right')[1].innerText);
    var creditCardFee = regExPrice.exec($('td.payout-table-cell-right')[2].innerHTML);
    var totalPayout = regExPrice.exec($('td.payout-table-cell-right')[3].innerHTML);
} else {
    var cleaningFee = 0;
    var creditCardFee = regExPrice.exec($('td.payout-table-cell-right')[2].innerHTML);
    var totalPayout = regExPrice.exec($('td.payout-table-cell-right')[3].innerHTML);
}

try {
    var securityDeposit = $('.receipt td')[0].innerText;
} catch(err) {
    securityDeposit = 0;
}
var property = $('div.col-5.hide-overflow')[0].innerText.replace(/\n/g, " ");
var regExGuestName = new RegExp("(.*)\\n");
var guestName = regExGuestName.exec($('div.space-top-sm-4.space-top-lg-4')[0].innerText)[1];
var confirmationCode = eval($('div.col-9.text-center-on-sm').children('span')[2]).innerText;
var regExPhone = new RegExp("(\\+(.\+\\d\\d\\d\\d))");
var phoneNumber = "";
try {
    var phoneNumber = regExPhone.exec($('div.space-top-4')[2].innerText)[2];
} catch(err) {
    phonenumber = "";
}

copy(printTabDelim(checkInDate, checkInMonthYear, checkOutDate, nights, guests, nightlyPayout, payout, cleaningFee, creditCardFee, totalPayout, securityDeposit, property, guestName, confirmationCode, phoneNumber));



function printTabDelim() {
    var output = "";
    for (var i = 0; i < arguments.length; i++) {
        output += arguments[i] + "\t";
    }
    return output;
}

//works in combination with background.js
function copy (val) {
    chrome.runtime.sendMessage({
        type: 'copy',
        text: val
    });
}      