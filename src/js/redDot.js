// set little red dot above icons nav
const addRedDot = () => {
  window.addEventListener("load", () => {
    let checkboxes = document.getElementsByTagName("input");
    let notif = document.getElementById("nav-not");

    // check if at least one of the checkboxes on the DOM is checked
    const checkboxCheck = () => {
      for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
          return true;
        }
      }
      return false;
    };

    // set red dot
    const setNotif = () => {
      if (checkboxCheck()) {
        notif.style.visibility = "visible";
        notif.style.opacity = "1";
      } else {
        notif.style.visibility = "hidden";
        notif.style.opacity = "0";
      }
    };

    // check once if red dot is needed
    setNotif();

    // watch any change
    document.addEventListener("click", setNotif);
  });
};

export default addRedDot;
