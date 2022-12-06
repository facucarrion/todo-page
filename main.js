// * DOM ELEMENTS
const form = document.querySelector('.header__form');
const newTaskInput = document.querySelector('#new-task');
const main = document.querySelector('main');

// * TOOLS AND SECONDARY FUNCTIONS

const localVerify = () => {
  if (!localStorage.getItem('tasks')) localStorage.setItem('tasks', JSON.stringify([]));
}

const getId = (arr) => {
  let maxId = 0;
  let currentId = 0;
  if (!localStorage.getItem('tasks')) return 1;
  arr.forEach(note => {
    currentId = note.id;
    if (currentId > maxId) maxId = currentId;
  })
  return maxId + 1;
}

const isChecked = (check) => {
  if (check === true) return 'checked';
  else return
}

const modInput = () => {

}

// * MAIN FUNCTIONS

const createNotes = (body) => {
  let arr = JSON.parse(localStorage.getItem('tasks'));
  let newTask = {
    id: getId(arr),
    body: body,
    checked: false
  };
  // console.log(newTask);
  arr.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(arr));

  main.innerHTML = "";
  readNotes(JSON.parse(localStorage.getItem('tasks')));

}

const readNotes = (arr) => {
  localVerify()
  if (arr) {
    arr.forEach(el => {
      let { id, body, checked } = el;
      let newNote = document.createElement('div');

      newNote.classList.add('main__note');
      newNote.innerHTML += `
          <input 
            value="${body}"
            class="main__text"
            readonly
          />
          <span class='main__actions'>
            <i
              class='main__edit bx bxs-edit-alt'
              onclick=''>
            </i>
            <i
              class='main__save bx bxs-save'
              style='display: none'
              onclick=''>
            </i>
            <input
              type="checkbox"
              class='main__check'
              onclick="updateNotes('checked', ${id}, ${!checked})"
              ${isChecked(checked)}
            />
            <i
              class='main__delete bx bx-x'
              onclick='deleteNotes(${id})'>
            </i>
          </span>
        `
      main.appendChild(newNote);

    })
  }
}

const updateNotes = (prop, id, newValue = true) => {
  let arr = JSON.parse(localStorage.getItem('tasks'));
  let newArr = [];

  arr.forEach((el) => {
    if (el.id === id) el[prop] = newValue;
    newArr.push(el);
  })

  localStorage.setItem('tasks', JSON.stringify(newArr))

  main.innerHTML = "";
  readNotes(JSON.parse(localStorage.getItem('tasks')));
}

const deleteNotes = (id) => {
  let arr = JSON.parse(localStorage.getItem('tasks'));
  newArr = arr.filter((e) => e.id !== id);

  localStorage.setItem('tasks', JSON.stringify(newArr));

  main.innerHTML = "";
  readNotes(JSON.parse(localStorage.getItem('tasks')));
}

// * EVENTS

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let taskValue = newTaskInput.value;
  createNotes(taskValue);
  form.reset();
});

readNotes(JSON.parse(localStorage.getItem('tasks')));
console.log(JSON.parse(localStorage.getItem('tasks')));

// http://localhost:5173/