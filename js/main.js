var allStudents = $('.student-item').toArray();
console.log(allStudents);
var pageSize = 10;
var searchText;
var currentPage;

  // initial state of the page
var onPageLoad = function() {
  $(allStudents).hide();
  $('.student-item:nth-child(-n+10)').show();  // shows only the first ten students
  currentPage = 1;
};

  // displays students (ten per page) whose name or email contains what the user types into the search input
var showArray = function() {
  if (allStudents.length > 0) {  
    $(allStudents).hide().slice((currentPage - 1) * pageSize, ((currentPage - 1) * pageSize) + pageSize).show();  // shows ten students per page
    } else {
    var sorryMessage = '<li class="sorry">Sorry, we were unable to find a result</li>';
    $('.student-list').append(sorryMessage);
  }
};
    
    
  // a second showArray expression for use with the pagination buttons (so that animations only happen when pagination buttons are clicked, not when the search bar is used)
var showArray2 = function() {
  $(allStudents).css('opacity', '0').slice((currentPage - 1) * pageSize, ((currentPage - 1) * pageSize) + pageSize).css('opacity', '1');  // broken .css() fade-in :(
};


  // adds dynamic page buttons based on number of search results
var dynamicPageButtons = function() {
  $('.pagination ul li').remove();
  var pageNumber = Math.ceil( allStudents.length / pageSize);
  for (var i = 0; i < pageNumber; i++) {
    $('.pagination ul').append('<li><a href ="#">' + (i+1) + '</a></li>');
  }
  $('.pagination ul li a').eq(0).addClass('active');
};

    
  // appends search bar
$('.page-header').append('<div class="student-search"><input placeholder="Search for students..."><button>Search</button></div>');
  // appends pagination button div
$('.student-list').after('<div class="pagination"><ul></ul></div>');

  // sets beginning state of page (hides all students then shows the first ten)
onPageLoad();
  // paginates first initial round of all students upon page first loading
dynamicPageButtons();    

    
  // dynamic search function
$('.page-header input').keyup(function() {
  searchText = $('.page-header input').val().toLowerCase().trim();
  console.log(searchText);
  $(allStudents).animate({opacity: '1'}, '1');  // crucial reset of the visibility state of allStudents (otherwise search function visually breaks after clicking a pagination button)
  $(allStudents).hide();
  $('.sorry').remove();   // removes any 'Sorry, we were unable to find a result' messages
  allStudents = [];   // empties the allStudents array, making room for only matched students to be included in array
  $('.student-item').each(function () {
    var namesAndEmails = $(this).find('.student-details').text().toLowerCase();
    if ( namesAndEmails.indexOf(searchText) !== -1) {
      var pushed = $(this)[0];  
      allStudents.push(pushed);
      console.log(allStudents);
    }
  });
  currentPage = 1;
  showArray();
  dynamicPageButtons();
  if (allStudents.length <11) {   // if ten or less students are matched through the search, don't display any page buttons
    $('.pagination ul').hide();
  } else {
    $('.pagination ul').show();
  }
});



  // makes dynamic page buttons functional
$(document).on('click', '.pagination > ul > li > a', function () {   
  $('a').removeClass('active');
  $(this).addClass('active');
  currentPage = $(this).text();
  showArray2();
});
     
