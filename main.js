let form = document.forms[`form`];
form.onsubmit = (e) => {
    e.preventDefault();
}

const pairList = [];
let buttonAdd = document.getElementById(`add`);
let list = document.getElementById(`list`);
let ul = list.getElementsByTagName('ul')[0];


// button add
buttonAdd.addEventListener("click", () => {
    let nameValue = form.elements[`nameValue`].value.trim();
    const regex = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9]+\s*=\s*[a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9]+$/;
    if (regex.test(nameValue)) {
        const [name, value] = nameValue.split(`=`);
        let pairObj = {name: name, value: value};
        pairList.push(pairObj);

        let li = document.createElement("li")
        li.innerText = `${name} = ${value}`
        ul.appendChild(li);
        form.elements[`nameValue`].value = ''
    } else {
        alert(`enter data in the format name=value`)
    }
});

// sorting function
function sortList(key) {
    pairList.sort((pair1, pair2) => {
        if (pair1[key] > pair2[key]) return 1
        if (pair1[key] < pair2[key]) return -1
        return 0
    });
    ul.innerText = '';
    pairList.forEach((pair) => {
        let li = document.createElement("li")
        li.innerText = `${pair.name} = ${pair.value}`
        ul.appendChild(li);
    });
}

//button sort by name
let buttonSortName = document.getElementById(`sortName`);
buttonSortName.addEventListener("click", () => {
    sortList(`name`);
});

//button sort by value
let buttonSortValue = document.getElementById(`sortValue`);
buttonSortValue.addEventListener("click", () => {
    sortList(`value`);
});

// button delete
let deleteMode = false;

let buttonDelete = document.getElementById(`delete`);
buttonDelete.addEventListener("click", () => {
    if (!deleteMode) {
        deleteMode = true;
        for (const li of ul.children) {
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            li.prepend(checkbox);
        }
    } else {
        deleteMode = false;
        for (const li of ul.children) {
            let checkbox = li.querySelector("input[type='checkbox']");
            if (checkbox && checkbox.checked) {
                let index = pairList.indexOf(checkbox);
                if (index !== -1) {
                    pairList.splice(index, 1);
                }
                li.remove();
            } else {
                checkbox.remove()
            }
        }
    }
});
