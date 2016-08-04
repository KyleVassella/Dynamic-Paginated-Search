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

  //  appends search bar
$('.page-header').append('<div class="student-search"><input placeholder="Search for students..."><button>Search</button></div>');
  //  appends pagination button div
$('.student-list').after('<div class="pagination"><ul></ul></div>');

onPageLoad();





      // displays students (10 per page) whose name or email contains what user types into input
    var showArray = function() {
      if (allStudents.length > 0) {  
      var tenPerPage = $(allStudents).hide().slice((currentPage - 1) * pageSize, ((currentPage - 1) * pageSize) + pageSize).show(); 
      } else {
        var sorryMessage = '<li class="sorry">Sorry, we were unable to find a result</li>';
        $('.student-list').append(sorryMessage);
      }
    }


    // adds dynamic page buttons based on number of search results
var dynamicPageButtons = function() {
  $('.pagination ul li').remove();
    var pageNumber = Math.ceil( allStudents.length / pageSize)
    for (var i = 0; i < pageNumber; i++) {
      $('.pagination ul').append('<li><a href ="#">' + (i+1) + '</a></li>')
    }
  showArray();
}

dynamicPageButtons();






  //  dynamic search function (Search button doesn't work yet. But index bar returns dynamic results as you type)
var search = $('.page-header input').keyup(function() {
  searchText = $('.page-header input').val().toLowerCase();
  console.log(searchText);
  $(allStudents).hide();
  $('.sorry').remove(); 
  allStudents = [];
  $('.student-item').each(function () {
    var namesAndEmails = $(this).find('.student-details').text().toLowerCase();
    if ( namesAndEmails.indexOf(searchText) !== -1) {
      var pushed = $(this)[0];  
      allStudents.push(pushed);
      console.log(allStudents);
      };
    })
  currentPage = 1;
  dynamicPageButtons();
  })





  //  makes dyanmic page buttons functional
$(document).on('click', '.pagination > ul > li > a', function () {    
  currentPage = $(this).text();
  showArray();

});
     
