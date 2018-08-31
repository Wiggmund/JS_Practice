var lvl1 = document.querySelector('.figure'),
    lvl2 = lvl1.children[0],
    lvl3 = lvl2.children[0];

    function handler(event, context) {
        var event = event || window.event;

        if (context.classList.contains('lvl2')) {
            event.stopPropagation();
            console.log('Hello from div.figure.lvl2');
            return;
        }

        if (context.classList.contains('lvl3')) {
            console.log('Hello from div.figure.lvl3');
            return;

        } else {
            console.log('Hello from div.figure');
            return;
        }

    }
    
    lvl1.addEventListener('click', function (event) {
        handler(event, this);
    });
    lvl2.addEventListener('click', function (event) {
        handler(event, this);
    });
    lvl2.addEventListener('click', function (event) {
        console.log('Second --- Handler');
    });
    lvl3.addEventListener('click', function (event) {
        handler(event, this);
    });

