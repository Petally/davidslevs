window.addEventListener("load", () => {
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

    //resizing
    canvas.height = window.innerHeight * 0.75;
    canvas.width = window.innerWidth * 0.75;

    //variables
    let painting = false;
    let brushSize = 2;

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    function startPosition(e) {
        painting = true;
        draw(e)
    }
    function finishedPosition() {
        painting = false;
        ctx.beginPath();
    }

    function draw(event) {
        var e = getMousePos(canvas, event);

        if (!painting) return;
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.lineTo(e.x, e.y)
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.x, e.y);
    }

    function changeSize(e) {
        if (e.deltaY < 0) {
            brushSize = clamp(brushSize - 2, 2, 20)
        } else {
            brushSize = clamp(brushSize + 2, 2, 20)
        }
    }
    //EventListeners
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishedPosition);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('wheel', function(e){
        changeSize(e);
        return false; 
    }, false);
});

