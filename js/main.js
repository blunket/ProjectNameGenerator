$( document ).ready(function() {
randomAdj();
randomName();
ga('send', {
hitType: 'event',
eventCategory: 'RandomName',
eventAction: 'FirstTime'
});
randomMsg();

  $( "#makeName" ).click(function() {
    randomMsg();
    randomName();
    randomAdj();
    ga('send', {
  hitType: 'event',
  eventCategory: 'RandomName',
  eventAction: 'TryAgain'
});
      });
});

function randomMsg() {
  // Insert text into button
  $.get('txt/buttons.txt', function(txt) {
    var buttons = txt.split("\n");
    var randButton = Math.floor(Math.random() * buttons.length - 1);
    console.log(randButton);
  $("#makeName").html(buttons[randButton]);
  });
  // Insert text into waiting message
  $.get('txt/hold.txt', function(txt) {
    var holdon = txt.split("\n");
    var randHold = Math.floor(Math.random() * holdon.length - 1);
    console.log(randHold);
  $("#hold").html(holdon[randHold]);
  });
};

function randomAdj() {
    $.get('txt/adjectives.txt', function(txt) {
    //$.get('txt/test.txt', function(txt) {
      // extract a adjective
        var adj = txt.split("\n");
        var randAdj = Math.floor(Math.random() * adj.length);
        // load definition
        $.ajax({
          url: "https://api.datamuse.com/words?sp="+adj[randAdj]+"&md=d"
        }).done(function(data) {
          var randDef = Math.floor(Math.random() * data[0].defs.length);
          var str=data[0].defs[randDef].substring(data[0].defs[randDef].indexOf('	')+1);
          $("#definition").html(str);
        });

        // display the noun and show everything again
        $("#theAdj").html(adj[randAdj]);
});
}

function randomName() {
    $.get('txt/nounlist.txt', function(txt) {
      // Hide the latest name and the button
      $("#frameworkname").hide(0);
      $("#makeName").hide(0);
      // generate a random time for the delay
       var delay = Math.floor(Math.random() * 2000) + 1500
      // show the animation for some time
       $("#trnt").fadeIn(200).delay(delay).slideUp(300);
      // extract a noun
        var lines = txt.split("\n");
        var randLineNum = Math.floor(Math.random() * lines.length);
        // load definition
        $.ajax({
          url: "https://api.datamuse.com/words?sp="+lines[randLineNum]+"&md=d"
        }).done(function(data) {
          var randDef = Math.floor(Math.random() * data[0].defs.length);
          var str=data[0].defs[randDef].substring(data[0].defs[randDef].indexOf('	')+1);
          $("#description").html(str);
        });

        // display the noun and show everything again
        $("#theNoun").html(lines[randLineNum]);
        $("#frameworkname").delay(delay).slideDown(200); // random line from the text file
        $("#makeName").delay(delay).slideDown(200);
    });
}
