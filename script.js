var form = document.getElementById('my-form');
var msg = document.querySelector('.msg');

const person = {};
var count = 0;

form.addEventListener('submit', savetoLocalStorage);

function savetoLocalStorage(e) {
  e.preventDefault();

  var name = document.getElementById('name');
  var email = document.getElementById('email');

  person.name = name.value;
  person.email = email.value;

  var keyName = 'person' + count;

  if (name.value === '' || email.value === '') {
    msg.classList.add('error');
    msg.innerHTML = 'Please enter all fields';
    setTimeout(() => msg.remove(), 3000);
  } else {
    msg.classList.add('success');
    msg.innerHTML = 'Successfully saved your information';
    setTimeout(() => msg.remove(), 3000);
    localStorage.setItem(keyName, JSON.stringify(person));
    count++;
    name.value = '';
    email.value = '';
  }
}
