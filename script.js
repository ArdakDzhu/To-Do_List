window.addEventListener('load', loadWindow);

const myArr = [];
let iterator = 0

function loadWindow() {
    const card = document.querySelector('.task-container');
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
    });

    const btnDel = document.querySelector('.btnDel');
  
    deleteTaskArr(btnDel)
    console.log(btnDel);
    
};

function taskAdd() {
    const crtInput = document.createElement('input');
    const crtDiv = document.createElement('div');
    crtDiv.classList.add('wrapper')
    crtDiv.append(crtInput);
    const btnDel = document.createElement('button');
    btnDel.classList.add('btnDel');
    crtDiv.id = iterator;
    iterator++;
    crtDiv.append(btnDel);

    deleteTaskArr(btnDel, crtDiv);

    return crtDiv;
};


function deleteTaskArr(btnDel, crtDiv){   
    btnDel.addEventListener('click', (event) => {
        myArr.splice(myArr.indexOf(event.target.parentElement),1)
        crtDiv.remove()
    });
}