(function () {

    // let div = document.getElementById('divX'),
    //     p = document.querySelector('p');

    /* By className property */
    {
        // console.log(div.getAttribute('class'));
        // div.className = 'modifedDiv';
        // console.log(div.getAttribute('class'));
    }

    /* By classList object (IE10+) */
    {
        // console.log(`-----------classList.contains-----------`);
        // console.log(div.classList.contains('div'));
        // console.log(div.classList.contains('modifedDiv'));
        
        // console.log(`-----------classList.add/remove/toggle-----------`);
        // div.classList.toggle('class');
        // console.log(div.className);
        // div.classList.toggle('class');
        // console.log(div.className);
    }   

    /* Deleting all classes of element by classList */
    {
        // console.log('\n', div.classList, '\n', div.className)

        // while (div.classList.length !== 0) {
        //     div.classList.remove(div.classList[0]);
        // }
        
        // console.log('\n', div.classList, '\n', (div.className === '') ? 'Empty string' : div.className );
    }

    /* Dataset attributes */
    {
        // console.log(p.dataset.pExited);
    }

    /* Inserting many copied div */
    {
        // let newDiv = document.createElement('div'),
        //     copiedDiv = document.createElement('div'),
        //     newP = document.createElement('p'),
        //     textContent = document.createTextNode('Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab ratione animi perspiciatis consectetur aut? Qui neque, cumque sunt unde, nam consequatur itaque dignissimos consectetur corporis nihil sed, quaerat quia ea!');
        
        // newP.appendChild(textContent);
        // newDiv.appendChild(newP);

        // for (let i = 10; i > 0; i--) {
        //     copiedDiv = newDiv.cloneNode(true);
        //     document.body.appendChild(copiedDiv);
        // }
    }

    {
        // let div = document.querySelector('.figure'),
        //     childDiv = div.children[0];


        // console.log(div.getBoundingClientRect());
        // setTimeout(function anonym() {
        //     // console.log(Math.round(Math.random() * 1));
        //     console.log(flag);
        //     div.scrollIntoView(flag);

        //     flag = (flag) ? false : true;

        //     setTimeout(anonym, 1000);
        // }, 1000);

        // setTimeout(function recurs([check, flag]) {
        //     var counter = check || null,
        //         switcher = flag || 'forward';

        //     if (counter === div.scrollTop) {
        //         return;
        //     }

        //     counter = div.scrollTop;

        //     if (switcher === 'forward') {
        //         div.scrollTop += 1;
        //     } else {
        //         div.scrollTop -= 1;
        //     }
            

        //     console.log(div.scrollTop);
        //     setTimeout(recurs, 100, [counter, switcher])
        // }, 100);


        function changePosition(counter) {
            counter = counter || 0;
            console.log(counter);

            setTimeout(function ([counter]) {
                counter += 100;
                console.log(div);
                div.offsetWidth += counter;
                console.log(counter);

                if (counter === 1000) return;
                
                setTimeout(function ([counter]) {
                    changePosition(counter);
                    console.log(counter);
                }, 100, [counter]);

            }, 100, [counter]);
        }


    }

})();