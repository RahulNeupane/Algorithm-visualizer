const cmp = document.getElementById('cmp')
const beep = document.getElementById('beep')
let cmpVal = 0

let arr = []
let n = 5
for(let i = 0;i<130;i++){
    arr.push(n)
    n+=3.8
}

function draw(n,color){
    if(canvas.getContext){
        let ctx = canvas.getContext('2d')
        let width = 5
        let curX = 10
        ctx.clearRect(0,0,canvas.width,canvas.height)
        for(let i = 0; i<n.length;i++){
            if(i==color){
                ctx.fillStyle = 'red'
            }else{
                ctx.fillStyle = 'lightblue'
            }
            let h = n[i]
            ctx.fillRect(curX,canvas.height - h ,width,h)
            curX += width + 1
        }
    }
}

function* bubbleSort(array, b){
    let swapped
    let step = 0
    let pass = 1
    if(b==1){ //reverse sort
        do{
            swapped = false
            for(let i = array.length;i>=0;i--){
                if (array[i] < array[i + 1]) {
                    let temp = array[i];
                    array[i] = array[i + 1];
                    array[i + 1] = temp;
                    swapped = true;
                    step++;
                    draw(array, i);
                    yield swapped;
                    cmpVal++
                    cmp.innerHTML=`Comparision: ${cmpVal}`
                    beep.play()
                }
            }
            pass++
        }while(swapped)
        cmpVal=0
    }else{
        do{ //forward sort
            swapped = false;
            for (let i = 0; i < array.length - 1; i++) {
                if (array[i] > array[i + 1]) {
                    let temp = array[i];
                    array[i] = array[i + 1];
                    array[i + 1] = temp;
                    swapped = true;
                    step++;
                    draw(array, i);
                    yield swapped;
                    cmpVal++
                    cmp.innerHTML=`Comparision: ${cmpVal}`
                    beep.play()
                }
            }
            
            pass++   
        }while(swapped)
        cmpVal=0
    }
}

function start(option){
    canvas = document.getElementById('myCanvas')
    let sort = bubbleSort(arr,option)
    function anim(ar){
        requestAnimationFrame(anim)
        sort.next()
    }
    setTimeout(anim(arr),7000)
}

function ref(){
    shuffle(arr)
    draw(arr,0)
}

function shuffle(array){
    let currentIndex = array.length,temporaryValue,randomIndex
    while(0!=currentIndex){
        randomIndex = Math.floor(Math.random()*currentIndex)
        currentIndex--

        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
    }
    return array
}

window.onload = function(){
    canvas = document.getElementById('myCanvas')
    draw(arr,0)
}

document.getElementById('sort').onclick = function() {start(2)}
document.getElementById('ref').onclick = function() {ref()}
document.getElementById('rev').onclick = function() {start(1)}
