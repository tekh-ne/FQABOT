var numOfEmployees = $('#num-people').text();

$(document).ready(function () {
    var positionY = 0;
    var positionX = 800;
    for (var i = 1; i < numOfEmployees; i++) {
        var rand = makeUniqueRandom();
        var classDiv = ".osd-staff-" + rand;
        $(classDiv).attr('style', 'background-position:' + positionX + 'px ' + positionY + 'px');
        if (positionX == 100) {
            positionX = 800;
            positionY = positionY - 150;
        } else {
            positionX = positionX - 100;
        } 
    }    
   
    $('ul.osd-staff-container > li').cycle(50, 'staff-display');
    $('ul.osd-staff-container > li').secondCycle('staff-display');

    $('ul.osd-staff-container > li.staff').hover(function () {
        $(this).addClass("hover-layer");
    }, function () {
        $(this).removeClass("hover-layer");
    })

    $('ul.osd-staff-container > li.osd-staff-you').hover(function () {
        $(this).children('a').children('p').text("Join Us!");
    }, function () {
        $(this).children('a').children('p').text("You?");
    })

    $('li.osd-staff-you').removeClass("hover-layer");
})

var uniqueRandoms = [];
var numRandoms = numOfEmployees;
function makeUniqueRandom() {
    // refill the array if needed
    if (!uniqueRandoms.length) {
        for (var i =1; i < numRandoms; i++) {
            uniqueRandoms.push(i);
        }
    }
    var index = Math.floor(random() * uniqueRandoms.length);
    var val = uniqueRandoms[index];

    // now remove that value from the array
    uniqueRandoms.splice(index, 1);

    return val;
}

var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
var date = day.toString() + month.toString() + year.toString();
var seed = parseInt(date); //"3012015" as number

function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

$.fn.cycle = function (timeout, acls) {
    var l = this.length,
        current = 0,
        elements = this;   

    function next() {
        elements.eq(current).addClass(acls);
        current = (current + 1) % l;
        if (current < 40) {
            setTimeout(next, timeout);
        }
    }
    setTimeout(next, timeout);

    return this;
};

$.fn.secondCycle = function (acls) {
    var numOfPeo = this.length;
    elements = this;

    for (var current = 40; current < numOfPeo; current++) {
        elements.eq(current).addClass(acls);
    }
    return this;
}