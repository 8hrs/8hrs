// Start Chart js
jQuery.fn.getCircleLength = function () {
    console.log('gcl');
    var r = this.attr('r');
    var lng = 2 * Math.PI * r;
    return lng;
};

function makePie(mold) {
    $(mold).html('<svg class="pie" viewBox="0 0 200 200"><circle cx="100" cy="100" r="20" class="pie-trail"/><circle cx="100" cy="100" r="20" class="pie-stuffing"/></svg><span class="counter"></span>'); //put some sweet svg dough to the mold

    var stuffing = $(mold + ' .pie-stuffing'),
        lineWidth = parseInt(stuffing.css("stroke-width"), 10);
    totalLength = $(stuffing).getCircleLength() + lineWidth; //  lineWidth needed to hide linecap
    console.log(stuffing.get(0));
    $(mold + " span").data("current", 0);

    //hide line using setting gap in dashed line to full line's length
    $(stuffing).css({
        'stroke-dashoffset': totalLength,
        'stroke-dasharray': totalLength + ' ' + totalLength
    })
} // END: makePie()


function bakePie(mold, options) {
    var defaults = {
        percentage: $(mold).data("percentage"),
        duration: $(mold).data("baking-time"),
        counter: $(mold + " span").data("current"),
        frame: 100 //how long to display single value when counting
    };
    $.extend(true, defaults, options);
    options = defaults;

    var stuffing = $(mold + ' .pie-stuffing'),
        lineWidth = parseInt(stuffing.css("stroke-width"), 10),
        totalLength = $(stuffing).getCircleLength() + lineWidth, // lineWidth needed to hide linecaps            
        counter = options.counter,
        toCount = options.percentage - counter,
        pieChunk = toCount / (options.duration / options.frame), //percentage chunks to be iterated by
        almostDone = options.percentage - pieChunk,
        iterate = setTimeout(count, options.frame); //turn on counting 

    function count() { //counting function. 
        counter += pieChunk;
        $(mold + " span").data("current", counter).text(Math.round(counter) + "%");

        if (counter < almostDone & pieChunk > 0) { //stop iterating
            iterate = setTimeout(count, options.frame);
        }
        else if (counter > almostDone & pieChunk < 0) {
            iterate = setTimeout(count, options.frame);
        }
        else {
            iterate = setTimeout(function () {
                $(mold + " span").data("current", options.percentage).text(options.percentage + "%");
                clearTimeout(iterate);
            }, options.frame);
        }
    }

    //Animate chart
    $(stuffing).animate({
        'stroke-dashoffset': totalLength * (100 - options.percentage) / 100
    }, options.duration);
}  // END: bakePie()

//Pie time!
makePie('#pie-mold');

setTimeout(function () { bakePie('#pie-mold'); }, 2000);

