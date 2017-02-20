// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

function ordinalSuffix(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}



$(function() {
  console.log('hello world :o');


  
  $.get('/reps', function(reps) {
    console.log(reps[0]);
    reps.forEach(function(rep) {
      var thisTerm = rep.terms[rep.terms.length - 1];
      $('<div class="card-2 col-md-3 col-sm-4' + thisTerm.party + '"></div>')
        .append('<a href="' + thisTerm.url + '" target="blank">' + '<h4 class="name">' + rep.name.first + ' ' + rep.name.last + '</h4></a>')
        .append('<h5 class="state">' + thisTerm.type + ", " + thisTerm.state + '</h5>')
        .append('<div class="party ' + thisTerm.party + '">' + thisTerm.party + '</div>')
        .append('<div class="terms">' + ordinalSuffix(rep.terms.length) + " term ends " + thisTerm.end.substring(0,4) + '</div>')
        .append('<a class="phone" href="tel:' + thisTerm.phone+  '">' + thisTerm.phone + '</a>')
        .appendTo('ul#dreams');
    });

  });

});
