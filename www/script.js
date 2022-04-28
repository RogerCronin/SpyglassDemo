function openNav() {
    document.getElementById("mySidepanel").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
  }

//   blurs background
  function blurToggle() {
    let blur = document.getElementById('blur');
    blur.classList.toggle('active');
  }
