    /* Slider */
{

    /* 
        Не могу понять как вычесляются координаты для перемещения ползунка в слайдере
    */
    
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
    //         );
            
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
    /* End of SLIDER */