var ball = document.getElementById('ball');

    /* Slider */
{
    // var slider = document.getElementById('slider'),
    //     switcher = document.getElementById('switcher');

    // switcher.ondragstart = function () {
    //     return false;
    // };

    // switcher.onmousedown = function (event) {
    //     let boundary = getCoords(switcher);
    //     // console.log(boundary)

    //     let switcherCoords = getCoords(switcher),
    //         sliderCoords = getCoords(slider),
    //         shiftX = event.pageX - switcherCoords.left;

    //     console.log('switcherCoords: ', switcherCoords);
    //     console.log('sliderCoords: ', sliderCoords);
    //     console.log(
    //         '\n -----------------',
    //         '\n shiftX: ', shiftX,
    //         '\n event.pageX: ', event.pageX,
    //         '\n switcherCoords: ', switcherCoords
    //     );

    //     // console.log(slider);

    //     document.onmousemove = function (event) {
    //         console.log(
    //             '\n event.pageX: ', event.pageX,
    //             '\n shiftX: ', shiftX,
    //             '\n sliderCoords.left: ', sliderCoords.left
    //         );
    //         let newLeft = event.pageX - shiftX - sliderCoords.left;

    //         console.log(
    //             '\n -----------------',
    //             '\n newLeft: ', newLeft
    //         )

    //         if (newLeft < 0) {
    //             newLeft = 0;
    //         }

    //         let rightEdge = slider.offsetWidth - switcher.offsetWidth;

    //         console.log(
    //             '\n -----------------',
    //             '\n rightEdge: ', rightEdge
    //         )
            
    //         if (newLeft > rightEdge) {
    //             newLeft = rightEdge;
    //         }

    //         switcher.style.left = newLeft + 'px';
    //     };

        
        
    //     document.onmouseup = endDragging;
    //     switcher.onmouseup = endDragging;
        
    //     function endDragging() {
    //         document.onmouseup = null;
    //         document.onmousemove = null;
    //         switcher.onmouseup = null;
    //     }

    //     function getCoords(element) {
    //         let box = element.getBoundingClientRect();

    //         return {
    //             name: element.id,
    //             left: box.left
    //         };
    //     } 
        
    // };
        
}
    /* END OF Slider */

    /* ---------------------------------------------------------------- */

    /* Dragging Ball - Drag'n'Drop basic */
{
    // ball.ondragstart = function () {
    //     return false;
    // };
    
    // ball.onmousedown = function (event) {
    
    //     var coords = getCoords(ball),
    //         shiftX = event.pageX - coords.left,
    //         shiftY = event.pageY - coords.top;
    
    //     ball.style.position = 'absolute';
    //     moveAt(event);
    
    //     document.body.appendChild(ball);
    
    //     ball.style.zIndex = 1000;
    
    //     function moveAt(event) {
    //         ball.style.left = event.pageX - shiftX + 'px';
    //         ball.style.top = event.pageY - shiftY + 'px';
    //     }
    
    //     document.onmousemove = function (event) {
    //         moveAt(event);
    //     };
    
    //     ball.onmouseup = function (event) {
    //         document.onmousemove = null;
    //         ball.onmouseup = null;
    //     };
    // };
    
    // function getCoords(element) {
    //     var box = element.getBoundingClientRect();
    
    //     return {
    //         top: box.top - pageYOffset,
    //         left: box.left - pageXOffset,
    //     };
    // }
}
    /* END OF - Dragging Ball - Drag'n'Drop basic */

    /* ---------------------------------------------------------------- */
