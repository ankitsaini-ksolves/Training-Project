$(document).ready(function() {
    const input = $('#Input');
    const list = $('#List');
    const addButton = $('#addButton');

    const loadItems = () => {
        const items = JSON.parse(sessionStorage.getItem('items')) || [];
        items.forEach(task => updateDOM(task));
    };

    const saveItems = () => {
        const items = [];
        list.find('li').each(function() {
            items.push($(this).text().replace('Delete', '').trim());
        });
        sessionStorage.setItem('items', JSON.stringify(items));
    };

    const updateDOM = (task) => {
        const li = $('<li>')
            .addClass('list-group-item d-flex justify-content-between align-items-center mb-2 border')
            .text(task + ' ');

        const deleteButton = $('<button>').addClass('btn btn-danger btn-sm delete-button').text('Delete');
        li.append(deleteButton);

        list.append(li);
    };

    addButton.click(function() {
        addItem();
    });

    input.keypress(function(event) {
        if (event.which === 13) {
            addItem();
        }
    });

    const addItem = () => {
        const task = input.val().trim();
        if (task !== '') {
            updateDOM(task);
            saveItems();
            input.val('');
        }
    };

    list.on('click', '.delete-button', function() {
        $(this).parent().remove();
        saveItems();
    });

    loadItems();
});
