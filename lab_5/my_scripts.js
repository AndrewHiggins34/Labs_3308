function viewStudentStats(id, toggle)
{
  element = document.getElementById(id);
  if(toggle ==1)
  {
    element.style.visibility = "visible";
    element.style.heigh = "auto"
  }
  else
  {
    element.style.visibility = "hidden";
    element.style.height = "0";
  }
}
