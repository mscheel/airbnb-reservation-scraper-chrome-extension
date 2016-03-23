var clean = false;
var els = $('.receipt-label')
for(i = 0; i < els.length; i++) {
    if(els[i].innerHTML.indexOf("Cleaning Fees") > -1) {
        clean = true;
    }
}

var checkInDate = eval("$('.h4')[0]").innerText;
var checkInMonthYear = ((new Date(checkInDate)).getMonth() + 1) + "" + ((new Date(checkInDate)).getYear() + 1900);
var checkOutDate = eval("$('.h4')[1]").innerText;
var nights = eval("$('.h4')[2]").innerText;
var guests = eval("$('.h4')[3]").innerText;

var regExPrice = new RegExp("\\$[0-9]+");
var nightlyPayout = regExPrice.exec($('.receipt-label')[0].innerHTML);

var payout = regExPrice.exec($('.receipt-amount')[0].innerHTML);
if(clean) {
    var cleaningFee = regExPrice.exec($('.receipt-amount')[1].innerHTML);
    var creditCardFee = regExPrice.exec($('.receipt-amount')[2].innerHTML);
    var totalPayout = regExPrice.exec($('.receipt-amount')[3].innerHTML);
} else {
    var cleaningFee = 0;
    var creditCardFee = regExPrice.exec($('.receipt-amount')[1].innerHTML);
    var totalPayout = regExPrice.exec($('.receipt-amount')[2].innerHTML);
}

try {
    var securityDeposit = $('.receipt td')[0].innerText;
} catch(err) {
    securityDeposit = 0;
}
var property = $('.col-6')[2].innerText.replace(/\n/g, " ");
var guestName = $('.media-body a')[0].innerText;
var regExConfirmationCode = new RegExp("Confirmation Code: ([^ ]+)");
var confirmationCode = regExConfirmationCode.exec($('.col-6.col-top')[0].innerText)[1];
var regExPhone = new RegExp("(\\+(.\+\\d\\d\\d\\d))");
try {
    var phoneNumber = regExPhone.exec($('div.media-body')[0].innerText)[2];
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