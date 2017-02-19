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
    console.log(reps);
    reps.forEach(function(rep) {
      var thisTerm = rep.terms[rep.terms.length - 1];
      $('<div class="card col-sm-3 ' + thisTerm.party + '"></div>')
        .append('<h4 class="name">' + rep.name.first + " " + rep.name.last + '</h4>')
        .append('<h5 class="state">' + thisTerm.type + ", " + thisTerm.state + '</h5>')
        .append('<div class="party ' + thisTerm.party + '">' + thisTerm.party + '</div>')
        .append('<div class="terms">' + ordinalSuffix(rep.terms.length) + " term ends in " + thisTerm.end.substring(0,4) + '</div>')
        .appendTo('ul#dreams');
    });
  });

  $('form').submit(function(event) {
    event.preventDefault();
    var dream = $('input').val();
    $.post('/dreams?' + $.param({dream: dream}), function() {
      $('<li></li>').text(dream).appendTo('ul#dreams');
      $('input').val('');
      $('input').focus();
    });
  });

});
