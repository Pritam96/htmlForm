var BASE_URL = 'https://crudcrud.com/api/e4fc702cd3bc49d7938041c219860ae1';

var form = document.getElementById('my-form');
var msg = document.querySelector('.msg');
var items = document.querySelector('.items');

form.addEventListener('submit', saveData);

function saveData(e) {
  e.preventDefault();

  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;

  let person = { name, email };

  if (name === '' || email === '') {
    msg.classList.add('error');
    msg.innerHTML = 'Please enter all fields';
    setTimeout(() => msg.remove(), 3000);
  } else {
    // localStorage.setItem(email, JSON.stringify(person));

    // Network Calling using axios

    axios
      .post(`${BASE_URL}/appointmnetData`, person)
      .then((res) => {
        console.log(res);
        addToList(res.data);
        form.reset();
        msg.classList.add('success');
        msg.innerHTML = 'Successfully saved your information';
        setTimeout(() => msg.remove(), 3000);
      })
      .catch((err) => {
        console.log(err);
        msg.classList.add('error');
        msg.innerHTML = `Something went wrong! Error: ${err}`;
        setTimeout(() => msg.remove(), 3000);
      });

    // addToList(person);
  }
}

function addToList(person) {
  // creating new li element
  var li = document.createElement('li');
  li.className = 'item';
  li.appendChild(document.createTextNode(person.name + ' - ' + person.email));

  var deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('type', 'button');
  deleteBtn.id = 'delete';
  deleteBtn.className = 'delete';
  deleteBtn.setAttribute('style', 'float:right');
  deleteBtn.appendChild(document.createTextNode('Delete'));

  deleteBtn.onclick = () => {
    // localStorage.removeItem(person.email);

    axios
      .delete(`${BASE_URL}/appointmnetData/${person._id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    items.removeChild(li);
  };

  var editBtn = document.createElement('button');
  editBtn.setAttribute('type', 'button');
  editBtn.id = 'edit';
  editBtn.className = 'edit';
  editBtn.setAttribute('style', 'float:right');
  editBtn.appendChild(document.createTextNode('Edit'));

  editBtn.onclick = () => {
    // localStorage.removeItem(person.email);

    document.getElementById('name').value = person.name;
    document.getElementById('email').value = person.email;

    axios
      .delete(`${BASE_URL}/appointmnetData/${person._id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    items.removeChild(li);
  };

  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  items.appendChild(li);
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance
  .get('/appointmnetData')
  .then((res) => {
    console.log(res);
    res.data.forEach((data) => addToList(data));
  })
  .catch((err) => {
    if (res.data.length < 1) {
      console.log('Empty user list');
    }
    console.log(err);
  });
