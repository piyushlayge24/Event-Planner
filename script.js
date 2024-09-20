$(document).ready(function() {
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        $('#taskList').empty();
        tasks.forEach(task => {
            $('#taskList').append(`
                <li data-id="${task.id}">
                   ${task.title}
                    ${task.description}
                    <button class="remove">Remove</button>
                </li>
            `);
        });
    }

    
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

   
    $('#addTaskButton').click(function() {
        const title = $('#taskTitle').val();
        const description = $('#taskDescription').val();

        if (title && description) {
            const newTask = {
                id: new Date().getTime(),
                title: title,
                description: description
            };

            let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.push(newTask);
            saveTasks(tasks);
            loadTasks();

           
            $('#taskTitle').val('');
            $('#taskDescription').val('');
        }
    });

    
    $('#taskList').on('click', '.remove', function() {
        const taskId = $(this).parent().data('id');
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.id !== taskId);
        saveTasks(tasks);
        loadTasks();
    });

   
    $('#taskDescription').keypress(function(event) {
        if (event.which === 13) { 
            $('#addTaskButton').click();
        }
    });

    
    loadTasks();
});
