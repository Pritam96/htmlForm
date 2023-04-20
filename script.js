var form = document.getElementById('my-form');
var msg = document.querySelector('.msg');
var items = document.querySelector('.items');

var count = 0;

form.addEventListener('submit', savetoLocalStorage);

function savetoLocalStorage(e) {
  e.preventDefault();

  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;

  let person = { name, email };

  var keyName = 'person' + count;

  if (name === '' || email === '') {
    msg.classList.add('error');
    msg.innerHTML = 'Please enter all fields';
    setTimeout(() => msg.remove(), 3000);
  } else {
    localStorage.setItem(keyName, JSON.stringify(person));
    addToList();
    form.reset();
    count++;
    msg.classList.add('success');
    msg.innerHTML = 'Successfully saved your information';
    setTimeout(() => msg.remove(), 3000);
  }
}

function addToList() {
  var per = JSON.parse(localStorage.getItem('person' + count));

  // creating list item
  var li = document.createElement('li');
  li.className = 'item';
  li.appendChild(document.createTextNode(per.name + ' - ' + per.email));
  items.appendChild(li);
}
