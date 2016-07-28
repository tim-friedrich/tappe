var dates;
var user = { username: "", password: "" }

window.onbeforeunload = function(){
  return "Alle nicht gespeicherten Änderungen gehen verloren wenn Sie die Seite verlassen. Sind Sie sicher, dass Sie die Seite verlassen wollen?"
};
init = function(){
  drawDates(dates);
  $("#add-date").click(function(){
    date = {
      date: $('#date').val(),
      time: $('#time').val(),
      location: $('#location').val(),
      town: $('#town').val(),
      program: $('#program').val(),
      tickets: $('#tickets').val()
      }
    dates.push(date);
    orderByDate();
    drawDates(dates);
    $('#date').val("")
    $('#time').val("")
    $('#location').val("")
    $('#town').val("")
    $('#program').val("")
    $('#tickets').val("")
  })
  
  $("#save-btn").click(function(e){
    saveDates();
  })
};

removeDate = function(dateId){
  if (dateId > -1) {
    dates.splice(dateId, 1);
  }
  drawDates(dates);
}

saveDates = function(){
  //var tmp = JSON.stringify($('.dd').nestable('serialize'));
  $.ajax({
    type: 'POST',
    url: 'save_dates.php',
    data: {
      'dates': dates,
      'user': user
    },
    success: function(msg) {
      alert("Ihre Termine wurden erfolgreich gespeichert.");
    }
  });
};

loadDates = function(){
  $.getJSON( "dates.json", function( data ) {
    if (data == null){
      dates = []
    }
    else{
      dates = data;
    }
    init();
  });
};

drawDates = function(dates){
  $("#dates-table tbody").children().remove()
  $.each(dates, function(index, date){
    appendDate(date, index);
  })
  $(".delete-date").click(function(e){
    removeDate($(e.target.parentElement.parentElement).attr('id'));
  })
};

appendDate = function(date, index){
  $('#dates-table tbody').append("\
        <tr id="+index+">\
          <td>\
            <strong>"+ date.date +"</strong>\
          </td>\
          <td>"+ date.time +"</td>\
          <td><strong>"+ date.location +"</strong></td>\
          <td>"+ date.town +"</td>\
          <td>"+date.program+"</td>\
          <td><a href='"+date.tickets+"' class='btn btn-default'>Tickets</a></td>\
          <td>\
            <a href='#' class='btn btn-default delete-date'>löschen</a>\
          </td>\
        </tr>\
      ")
};

$().ready(function(){
  $('#login-modal .alert').hide();
  $('#login-modal').modal('show');
  $('#login-btn').click(function(){
    if(checkLogin($('#username').val(), $('#password').val())){
      $("#login-modal").modal('hide');
      loadDates();    
    }
    else{
      $('#login-modal .alert').show();
    }
  });
  
});

checkLogin = function(username, password){
  if(username == "boerchers" && password.hashCode() == -906953738){
    user.username = username;
    user.password = password;
    return true;
  }
  else{
    return false;
  }
}
orderByDate = function(){
  for(n = dates.length; n>1; n=n-1){
    for(i=0; i<n-1; i=i+1){
      if(stringToDate(dates[i].date) > stringToDate(dates[i+1].date)){
        date = dates[i];
        dates[i] = dates[i+1];
        dates[i+1] = date; 
      }
    }
  }
}

stringToDate = function(string){
  string = string.split(" ")[1];
  string = string.split(".")
  return new Date(string[1]+"/"+string[0]+"/"+string[2])
}

String.prototype.hashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length == 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

