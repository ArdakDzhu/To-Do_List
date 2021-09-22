window.addEventListener('load', loadWindow);
const myArr = [];
let iterator = 0;
let container;

function loadWindow() {
    const card = document.querySelector('.task-container');
    container = card;
    const div = taskAdd();
    card.append(div);
    myArr.push(div);
    const clickBtn = document.querySelector('.btn');
    clickBtn.addEventListener('click', () => {
        const div = taskAdd();
        card.append(div);
        myArr.push(div);
    });

    const sortB = document.querySelector('.button-sort');
    sortB.addEventListener('click', (event) => {
        if (sortB.classList.contains('first')) {
            sortB.classList.remove('first');
            sortB.classList.add('second');
        } else {
            sortB.classList.remove('second');
            sortB.classList.add('first');
        }

        myArr.sort( function (div1, div2) {
            const input1 = div1.querySelector('input');
            const input2 = div2.querySelector('input');
            if (sortB.classList.contains('first')) {
                return input1.value - input2.value;
            } else {
                return input2.value - input1.value;
            }
        })

        myArr.forEach(function(div) {
            div.parentElement.append(div);
        })
    })
}

function taskAdd() {
    const crtDiv = document.createElement('div');
    const crtInput = document.createElement('input');
    crtDiv.draggable = true;
    crtDiv.addEventListener('dragstart', eventHandler);
    crtDiv.addEventListener('dragend', eventHandler);
    crtDiv.addEventListener('dragenter', eventHandler);
    crtDiv.classList.add('wrapper');
    crtDiv.append(crtInput);
    const btnDel = document.createElement('button');
    btnDel.classList.add('btnDel');
    crtDiv.id = iterator;
    iterator++;
    crtDiv.append(btnDel);

    deleteTaskArr(btnDel, crtDiv);

    return crtDiv;
}

let activDrag = null;

function eventHandler(event) {
    switch(event.type) {
        case 'dragstart':
            activDrag = event.currentTarget;

            activDrag.classList.add('select');
            break;
        
        case 'dragend': 
            activDrag.classList.remove('select');
            activDrag = null;
            break;

        case 'dragenter':
            if (!event.currentTarget.classList.contains('select')) {
                changeCards(activDrag, event.currentTarget);
            } 
        break;
    }
}

function changeCards(card1, card2) {

    const list = container.querySelectorAll('.wrapper');
    const listArr = [...list];
    const cardIndex1 = listArr.indexOf(card1);
    const cardIndex2 = listArr.indexOf(card2);
    if (cardIndex1 > cardIndex2) {
        container.insertBefore(card1, card2);
    } else {
        container.insertBefore(card2, card1);
    }
}

function deleteTaskArr(btnDel, crtDiv) {   

    btnDel.addEventListener('click', (event) => {
        myArr.splice(myArr.indexOf(event.target.parentElement),1)
        crtDiv.remove();
    })
}