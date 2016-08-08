var allStudents = $('.student-item').toArray();
console.log(allStudents);
var pageSize = 10;
var searchText;
var pageNumber;
var currentPage;

  //  initial state of the page
var onPageLoad = function() {
$(allStudents).hide();
$('.student-item:nth-child(-n+10)').show(); //shows only the first 10 students
currentPage = 1;
};

//  custom .hide() and .show() event handlers for showArray2() animations
var fadeOut = function() {
  $(this).animate({opacity: '0'}, '3s');
}

var fadeIn = function() {
  $(this).animate({opacity: '1'}, '.3s');
}


      // displays students (10 per page) whose name or email contains what user types into input
    var showArray = function() {
      if (allStudents.length > 0) {  
      var tenPerPage = $(allStudents).hide().slice((currentPage - 1) * pageSize, ((currentPage - 1) * pageSize) + pageSize).show();
      } else {
        var sorryMessage = '<li class="sorry">Sorry, we were unable to find a result</li>';
        $('.student-list').append(sorryMessage);
      }
    }
    
    
    // a second showArray method for use with the pagination buttons (so that animations only happen when pagination buttons are clicked, not when the search bar is used).
    var showArray2 = function() {
        var tenPerPage2 = $(allStudents).hide(fadeOut).slice((currentPage - 1) * pageSize, ((currentPage - 1) * pageSize) + pageSize).show(fadeIn);
    }


    // adds dynamic page buttons based on number of search results
    var dynamicPageButtons = function() {
      $('.pagination ul li').remove();
        var pageNumber = Math.ceil( allStudents.length / pageSize)
        for (var i = 0; i < pageNumber; i++) {
          $('.pagination ul').append('<li><a href ="#">' + (i+1) + '</a></li>')
        }
      $('.pagination ul li a').eq(0).addClass('active');
    }

    
  //  appends search bar
$('.page-header').append('<div class="student-search"><input placeholder="Search for students..."><button>Search</button></div>');
  //  appends pagination button div
$('.student-list').after('<div class="pagination"><ul></ul></div>');

  //sets beginning state of page (hides all students, shows 10)
onPageLoad();
  //paginates first initial round of all students upon page first loading
dynamicPageButtons();    

    
    //  dynamic search function
    var search = $('.page-header input').keyup(function() {
      searchText = $('.page-header input').val().toLowerCase();
      console.log(searchText);
      $(allStudents).animate({opacity: '1'}, '1');      //  crucial reset of the visibility state of allStudents (otherwise search function visually breaks after clicking a pagination button)
      $(allStudents).hide();
      $('.sorry').remove();   // removes any 'Sorry, we were unable to find a result' messages
      allStudents = [];   // empties the allStudents array, making room for only matched students to be included in array
      $('.student-item').each(function () {
        var namesAndEmails = $(this).find('.student-details').text().toLowerCase();
        if ( namesAndEmails.indexOf(searchText) !== -1) {
          var pushed = $(this)[0];  
          allStudents.push(pushed);
          console.log(allStudents);
          };
        })
      currentPage = 1;
      showArray();
      dynamicPageButtons();
      })



  //  makes dyanmic page buttons functional
$(document).on('click', '.pagination > ul > li > a', function () {   
  $('a').removeClass('active');
  $(this).addClass('active');
  currentPage = $(this).text();
  showArray2();
});
     
