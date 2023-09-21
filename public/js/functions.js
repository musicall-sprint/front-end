function closeFilter() {
    var divFilter = document.getElementsByClassName("box_filter")[0];
    var blurOverlay = document.getElementsByClassName("blur-overlay")[0];
    divFilter.classList.remove("visible");
    blurOverlay.classList.remove("visible");
    
    var checkboxes = divFilter.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function (checkbox) {
      checkbox.checked = false;
    });
  }
  
  function showFilter() {
    var divFilter = document.getElementsByClassName("box_filter")[0];
    var blurOverlay = document.getElementsByClassName("blur-overlay")[0];
    divFilter.classList.add("visible");
    blurOverlay.classList.add("visible");
  }