// Lovingly stolen from Jane Hoffswell (https://homes.cs.washington.edu/~jhoffs/)

var nameToTab = {"Publications": "pubs", "Home": "home", "CV": "cv"}

function init() {
  if(location.hash == '') location.hash = '#' + 'home'; 
  showTab();
}

function openTab(evt, tab) {
    console.log(tab)
  location.hash = '#' + tab;
  showTab();
}

function showTab(){
    var tab = location.hash.replace('#', '');

	var tabs = document.getElementsByClassName('menu');
	for(var i = 0; i < tabs.length; i++) {
		if(nameToTab[tabs[i].innerText.trim()] === tab) {
			tabs[i].className = 'menu selected';
		} else {
			tabs[i].className = 'menu';
		}
	}

	var content = document.getElementsByClassName('tabContent');
	for(var i = 0; i < content.length; i++) {
		 content[i].style.display = 'none';
	}

	document.getElementById(tab+"Div").style.display = 'block';

}