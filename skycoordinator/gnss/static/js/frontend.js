let csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();

$(document).ready(function() {

    $("#satellites").change( function(event) {
        // alert("You clicked the button using JQuery!");
        $("#coordinates").empty();
        var nosats = $("#satellites").val();
        var field = document.createElement("input");
        console.log(nosats);
        $("#coordinates").append('<h4>Paramètres des satellites</h4>')
        $("#coordinates").append('<form class="mainform">\
          </form>'
          );
        //$("#coordinates").append(new Array(++nosats).join('<div class="appendedDivs"><br/>X: <input id="X" type="float"> Y: <input id="Y" type="float"> Z: <input id="Z" type="float"> T: <input id="T" type="float"> <br/> </div>'));
        for(var i=0; i<nosats; i++){
            $(".mainform")
            .append('<div class="row params">\
            <div class="form-outline col">\
            <input type="number" step="0.01" id="X'+i+'" class="form-control form-control-lg" />\
            <label class="form-label" for="X'+i+'">X</label>\
          </div>\
          <div class="col form-outline">\
            <input type="number" step="0.01" id="Y'+i+'" class="form-control form-control-lg" />\
            <label class="form-label" for="Y'+i+'">Y</label>\
          </div>\
          <div class="col form-outline">\
            <input type="number" id="Z'+i+'" class="form-control form-control-lg" />\
            <label class="form-label" for="Z'+i+'">Z</label>\
          </div>\
          <div class="col form-outline">\
            <input type="number" id="T'+i+'" class="form-control form-control-lg" />\
            <label class="form-label" for="T'+i+'">t</label>\
          </div></div>\
          ')
        }
        $("#coordinates").append('<button type="button" id="subbutton">Submit</button>');
        $("#subbutton").click(function(e){
            getCoordinates();
        })
    });
    function getCoordinates(){
        var nosats = $("#satellites").val();
        var data = {}
        for(var i=0; i<nosats; i++){
            Xval = $("#X"+ i.toString()).val();
            Yval = $("#Y"+ i.toString()).val();
            Zval = $("#Z"+ i.toString()).val();
            Tval = $("#T"+ i.toString()).val();
            data[i.toString()] = {X:Xval,
            Y:Yval,
            Z:Zval,
            T:Tval};         
        }
        var coordinates = {"data": data, "nosats": nosats};
        // $.get(URL, data, function(res){
        //     if(response === 'success'){ alert('Yay!'); }
        //     else{ alert('Error! :('); }
        // })
        $.ajax({
            type: "POST",
            url: "/sendData",
            data: coordinates,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-CSRFToken', csrftoken);
            },
            dataType: "json",
            success: function (data) {
                // any process in data
                alert("successfull")
            },
            failure: function () {
                alert("failure");
            }
        });
        
    }
    

    
    // JQuery code to be added in here.

});