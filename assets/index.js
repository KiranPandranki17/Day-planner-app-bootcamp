$(document).ready(function () {
    var $scheduleContainer = $("#schedule-container");
  
    // Define the range of hours
    var startHour = 0;
    var endHour = 24;
  
    // Use a loop to dynamically create time blocks
    for (var hour = startHour; hour <= endHour; hour++) {
      createAndAppendTimeBlock(hour);
    }
  
    function createAndAppendTimeBlock(hour) {
      var $timeBlock = $("<div>").addClass("row time-block").attr("id", "hour-" + hour);
      var $hourCol = $("<div>").addClass("col-1 hour").text(formatHour(hour));
      var $descriptionTextarea = $("<textarea>").addClass("col-10 description").css({
        color: "Red",
        fontFamily: "cursive"
      });
      var $saveBtn = $("<button>")
        .addClass("btn saveBtn col-1")
        .append('<span class="fa fa-floppy-o" aria-hidden="true"></span>')
        .on("click", handleSaveBtnClick);
  
      $timeBlock.append($hourCol, $descriptionTextarea, $saveBtn);
      $scheduleContainer.append($timeBlock);
    }
  
    function formatHour(hour) {
      if (hour < 12) {
        return hour + ":00 AM";
      } else if (hour === 12) {
        return "12:00 PM";
      } else {
        return (hour - 12) + ":00 PM";
      }
    }
  
    function handleSaveBtnClick() {
      var $clickedBlock = $(this).parent();
      var key = $clickedBlock.attr("id").split("-")[1];
      var value = $clickedBlock.find(".description").val();
  
      // Save key and value to Local Storage
      localStorage.setItem(key, value);
    }
  });
  
  
$(document).ready(function () {
    var $currentDay = $("#currentDay");
    var $timeBlocks = $(".time-block");
  
    // Use dayjs to display the date
    var currentDate = dayjs().format("dddd, MMMM DD, YYYY");
    $currentDay.text(currentDate);
  
    function updateHourly() {
      // Find the current hour
      var currentHour = dayjs().hour();
  
      $timeBlocks.each(function () {
        var $currentBlock = $(this);
        var blockHour = parseInt($currentBlock.attr("id").split("-")[1]);
        var $description = $currentBlock.find(".description");
  
        // Get text entry from local storage
        var textEntry = localStorage.getItem(blockHour);
        $description.val(textEntry);
  
        // Compare blockHour and currentHour to assign the right class
        if (blockHour < currentHour) {
          $description.addClass("past");
        } else if (blockHour === currentHour) {
          $description.addClass("present");
        } else {
          $description.addClass("future");
        }
      });
    }
  
    // Call the function on document ready
    updateHourly();
  
    // Event listener on the saveBtn class when clicked will save the key and value
    $(".saveBtn").on("click", function () {
      var $clickedBlock = $(this).parent();
      var key = $clickedBlock.attr("id").split("-")[1];
      var value = $clickedBlock.find(".description").val();
  
      // Save key and value to Local Storage
      localStorage.setItem(key, value);
    });
  });
  