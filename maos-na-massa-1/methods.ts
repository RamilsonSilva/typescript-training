function getItems(): string {
    let actualItems:string = localStorage.getItem('groceryList') || '';
    return actualItems;
}

function addItem(name: string) {
    let itemsIncluded = getItems();

    if(itemsIncluded.length == 0) {
        localStorage.setItem('groceryList', `${name}`);
    }else{
        localStorage.setItem('groceryList', `${itemsIncluded.trim()},${name}`);
    }

    listItems();
}

function listItems() {
    let allItems = getItems();
    let htmlCards: string = '';

    allItems.split(',').forEach((el, index) => {
        if(el.length > 0){
            htmlCards += `
                <section>
                    <h2>${el}</h2>
                    <div>
                        <Input class="hidden" id="edit${el.trim()}" type="text" placeholder="" />
                        <button type="button" class="submitEdition">Concluir edição</button>
                    </div>
                    <button type="button" onclick="editItem('${el.trim()}')">Editar</button>
                    <button type="button" onclick="removeItem('${el.trim()}')">Excluir</button>
                </section>
            `;
        }
    });

    let target = document.querySelector('article') as HTMLElement;
    target.textContent = '';
    target?.insertAdjacentHTML('afterbegin', htmlCards);
}

listItems();

document.querySelector('#sendItem')?.addEventListener('click', () => {
    let item:string = document.querySelector('input')?.value || '';

    if(item != '') {
        addItem(item);
    }
})

function removeItem(id: string) {
    let allItems = getItems();
    let allItemsSplit:string[] = allItems.split(',');

    let position:number = allItemsSplit.indexOf(id);
    if(position != -1){
        allItemsSplit.splice(position, 1);
    }

    localStorage.setItem('groceryList', `${allItemsSplit}`);
    listItems();
}

function editItem(id: string) {
    let allItems = getItems();
    let allItemsSplit:string[] = allItems.split(',');

    let position:number = allItemsSplit.indexOf(id);
    if(position != -1){
        document.querySelectorAll('article section input')[position].classList.remove('hidden');

        document.querySelectorAll('article section .submitEdition')[position].addEventListener('click', () => {
            let text = (<HTMLInputElement>document.getElementById(`edit${id}`)).value;
            allItemsSplit[position] = text;

            localStorage.setItem('groceryList', `${allItemsSplit}`);
            listItems();

            document.querySelectorAll('article section input')[position].classList.add('hidden');
        });
    }
}