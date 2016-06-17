console.log("script.js working");

$(document).ready(function(){

  updateDOM();

  $('#newAnimalButton').on('click', function(){
    console.log("newAnimalButton clicked with input: " + $('#newAnimalIn').val());
    var objectToSend = {
      "name": $('#newAnimalIn').val()
    }

    $.ajax({
      type: 'POST',
      url: '/createAnimal',
      data: objectToSend,
      success: function(){
        console.log("in /postRoute success");
        updateDOM();
      },
      error: function(err, exc){
        alert("POST error: " + err.status);
      }
    });
  });

});

var updateDOM = function(){
  $.ajax({
    type: 'GET',
    url: '/update',
    success: function(animalTable){
      console.log("in /update success");
      createTable(animalTable);
    }
  });
};

var createTable = function(data){
  console.log("Making a table.");

  $('#animalTableOut').empty().append('<tr><th>Animal</th><th>Quantity</th></tr>');

  for (var i = 0; i<data.length; i++) {
    $('#animalTableOut').append('<tr><td>' + data[i].animal_name + '</td><td>' + data[i].animal_quantity + '</td></tr>');
  }
};
