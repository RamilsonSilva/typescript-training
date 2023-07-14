var _a;
function getItems() {
    var actualItems = localStorage.getItem('groceryList') || '';
    return actualItems;
}
function addItem(name) {
    var itemsIncluded = getItems();
    if (itemsIncluded.length == 0) {
        localStorage.setItem('groceryList', "".concat(name));
    }
    else {
        localStorage.setItem('groceryList', "".concat(itemsIncluded.trim(), ",").concat(name));
    }
    listItems();
}
function listItems() {
    var allItems = getItems();
    var htmlCards = '';
    allItems.split(',').forEach(function (el, index) {
        if (el.length > 0) {
            htmlCards += "\n                <section>\n                    <h2>".concat(el, "</h2>\n                    <div>\n                        <Input class=\"hidden\" id=\"edit").concat(el.trim(), "\" type=\"text\" placeholder=\"\" />\n                        <button type=\"button\" class=\"submitEdition\">Concluir edi\u00E7\u00E3o</button>\n                    </div>\n                    <button type=\"button\" onclick=\"editItem('").concat(el.trim(), "')\">Editar</button>\n                    <button type=\"button\" onclick=\"removeItem('").concat(el.trim(), "')\">Excluir</button>\n                </section>\n            ");
        }
    });
    var target = document.querySelector('article');
    target.textContent = '';
    target === null || target === void 0 ? void 0 : target.insertAdjacentHTML('afterbegin', htmlCards);
}
listItems();
(_a = document.querySelector('#sendItem')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    var _a;
    var item = ((_a = document.querySelector('input')) === null || _a === void 0 ? void 0 : _a.value) || '';
    if (item != '') {
        addItem(item);
    }
});
function removeItem(id) {
    var allItems = getItems();
    var allItemsSplit = allItems.split(',');
    var position = allItemsSplit.indexOf(id);
    if (position != -1) {
        allItemsSplit.splice(position, 1);
    }
    localStorage.setItem('groceryList', "".concat(allItemsSplit));
    listItems();
}
function editItem(id) {
    var allItems = getItems();
    var allItemsSplit = allItems.split(',');
    var position = allItemsSplit.indexOf(id);
    if (position != -1) {
        document.querySelectorAll('article section input')[position].classList.remove('hidden');
        document.querySelectorAll('article section .submitEdition')[position].addEventListener('click', function () {
            var text = document.getElementById("edit".concat(id)).value;
            allItemsSplit[position] = text;
            localStorage.setItem('groceryList', "".concat(allItemsSplit));
            listItems();
            document.querySelectorAll('article section input')[position].classList.add('hidden');
        });
    }
}
