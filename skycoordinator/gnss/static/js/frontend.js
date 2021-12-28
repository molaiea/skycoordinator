let csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();

$(document).ready(function() {

    $("#satellites").change( function(event) {
        // alert("You clicked the button using JQuery!");
        $("#coordinates").empty();
        var nosats = $("#satellites").val();
        var field = document.createElement("input");
        console.log(nosats);
        $("#coordinates").append('<div class="but"><h4 class="parsat">Paramètres des satellites</h4></div>')
        $("#coordinates").append('<form class="mainform">\
          </form>'
          );
        //$("#coordinates").append(new Array(++nosats).join('<div class="appendedDivs"><br/>X: <input id="X" type="float"> Y: <input id="Y" type="float"> Z: <input id="Z" type="float"> T: <input id="T" type="float"> <br/> </div>'));
        for(var i=0; i<nosats; i++){
            $(".mainform")
            .append('  <div class="form-group row params">\
            <label for="X'+i+'" class="col-sm-1 col-form-label texte everything">X</label>\
            <div class="col-sm-2">\
              <input type="number" step=0.01 class="form-control parameters everything" id="X'+i+'" placeholder="X">\
            </div>\
            <label for="Y'+i+'" class="col-sm-1 col-form-label texte everything">Y</label>\
            <div class="col-sm-2">\
              <input type="number" step=0.01 class="form-control parameters everything" id="Y'+i+'" placeholder="Y">\
            </div>\
            <label for="Z'+i+'" class="col-sm-1 col-form-label texte everything">Z</label>\
            <div class="col-sm-2">\
              <input type="number" step=0.01 class="form-control parameters everything" id="Z'+i+'" placeholder="Z">\
            </div>\
            <label for="T'+i+'" class="col-sm-1 col-form-label texte everything">Temps</label>\
            <div class="col-sm-2">\
              <input type="number" step=0.01 class="form-control parameters everything" id="T'+i+'" placeholder="T">\
            </div>\
          </div>\
          ')
        }
        $("#coordinates").append('<div class="but everything"><button type="button" id="subbutton" class="btn btn-light">Calculer</button></div>');
        $("#subbutton").click(function(e){
            if ( !$(".parameters").val()){
              alert("Veuillez entre les paramètres des satellites!")
            }
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
        console.log(nosats)
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