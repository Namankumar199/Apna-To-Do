const all_status = document.querySelectorAll(".status");
const btns = document.querySelectorAll('[data-target]');
const close_btns = document.querySelectorAll('.modal-btn');
const overlay = document.querySelector('#overlay');
const todo_submit = document.getElementById('todo_submit');

let draggableTodo = null;
// dragging operation 
function myDragStart() {
    console.log("dragstart");
    draggableTodo = this;
}

function myDragEnd() {
    draggableTodo = null;
    console.log("dragend");
}

all_status.forEach((status) => {
    status.addEventListener("dragover", myDragOver);
    status.addEventListener("dragenter", myDragEnter);
    status.addEventListener("dragleave", myDragLeave);
    status.addEventListener("drop", myDragDrop);
});

function myDragEnter() {
    this.style.border = "3px dashed #fff";
    console.log("drag enter");
}

function myDragOver(e) {
    e.preventDefault();
    console.log("drag over");
}

function myDragLeave() {
    this.style.border = "none";
    console.log("drag leave");
}

function myDragDrop() {
    this.style.border = "none";
    this.appendChild(draggableTodo);
    console.log("drop here");

}

// modal operation

btns.forEach((btn) => {
    btn.addEventListener('click', () => {
        //    console.log('workkkk');
        document.querySelector(btn.dataset.target).classList.add('active');
        overlay.classList.add('active');
    });

});

close_btns.forEach((btn) => {
    btn.addEventListener('click', () => {
        btn.closest('.modal').classList.remove('active');
        overlay.classList.remove('active');
    });

});

window.onclick = (e) => {
    if (e.target == overlay) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach((modal) => modal.classList.remove('active'));
        overlay.classList.remove('active');
    }
};


// todo_submit

todo_submit.addEventListener('click', () => {

    // create div
    const todo_div = document.createElement('div');
    const input_val = document.getElementById('todo_item').value;
    const txt = document.createTextNode(input_val);

    todo_div.appendChild(txt);
    todo_div.classList.add('todo');
    todo_div.setAttribute('draggable', 'true');

    //  create span

    const span1 = document.createElement('span');
    const span_txt = document.createTextNode('✖️');
    span1.classList.add('close');
    span1.appendChild(span_txt);

    todo_div.appendChild(span1);

    // console.log(todo_div);

    document.querySelector('.status').appendChild(todo_div);

    todo_div.addEventListener("dragstart", myDragStart);
    todo_div.addEventListener("dragend", myDragEnd);

    // remove modal 

    const modal = document.querySelector('.modal');
    modal.classList.remove('active');
    overlay.classList.remove('active');

    document.getElementById('todo_item').value = "";
    // remove added item by clicking on cross symbol

    const all_close = document.querySelectorAll(".close");

    all_close.forEach((close) => {
        close.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        });
    });

});
