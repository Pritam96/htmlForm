var form = document.getElementById('my-form');
var msg = document.querySelector('.msg');
var items = document.querySelector('.items');

form.addEventListener('submit', savetoLocalStorage);

function savetoLocalStorage(e) {
  e.preventDefault();

  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;

  let person = { name, email };

  if (name === '' || email === '') {
    msg.classList.add('error');
    msg.innerHTML = 'Please enter all fields';
    setTimeout(() => msg.remove(), 3000);
  } else {
    localStorage.setItem(email, JSON.stringify(person));
    addToList(email);
    form.reset();
    msg.classList.add('success');
    msg.innerHTML = 'Successfully saved your information';
    setTimeout(() => msg.remove(), 3000);
  }
}

function addToList(email) {
  var per = JSON.parse(localStorage.getItem(email));

  // creating list item
  var li = document.createElement('li');
  var btn = document.createElement('button');

  li.className = 'item';
  btn.setAttribute('type', 'button');
  btn.id = 'delete';
  btn.className = 'delete';
  btn.setAttribute('style', 'float:right');
  btn.appendChild(document.createTextNode('Delete'));
  li.appendChild(document.createTextNode(per.name + ' - ' + per.email));
  li.appendChild(btn);
  items.appendChild(li);
}

items.addEventListener('click', deleteElement);

function deleteElement(e) {
  if (e.target.classList.contains('delete')) {
    var text = e.target.parentElement.textContent.replace('Delete', '');
    // console.log(text);
    var key = text.split(' ')[2];
    // console.log(key);
    localStorage.removeItem(key);
    var li = e.target.parentElement;
    items.removeChild(li);
  }
}
