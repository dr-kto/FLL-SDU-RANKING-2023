async function fetchWithTimeout(resource, options = {}) {
    const { timeout = 5000 } = options;
    
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal  
    });
    clearTimeout(id);
    return response;
  }

  function sleep(ms)
  {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(ms);
        }, ms);
    })
  }
  function scrollTo(element, output)
  {
    output.scroll({
        left: 0,
        top: element.offsetTop,
        behavior: 'smooth'
    })
  }
  

  window.requestAnimFrame = function(){
    return (
        window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(/* function */ callback){
            window.setTimeout(callback, 1000 / 60);
        }
    );
}();

async function getData() 
{
    try {
        const base = 'https://docs.google.com/spreadsheets/d/1Z5sTrMvQPhDwGg50ALi-v9hXXTXL9Km-h7eI_vf1sRM'+'/gviz/tq?'+'tqx=out:txt&sheet='+'Ranking'
        const output = document.querySelector('.output')
        const query = encodeURIComponent('Select A,B,C LIMIT 22 ')
        const url = base + '&tq=' + query;
        let data;
        const response = await fetchWithTimeout(url,{
            timeout: 10000
        })
        .then(res => res.text())
        .then(rep =>{
            data = JSON.parse(rep.substr(47).slice(0,-2));
            output.innerHTML='<thead><tr><th>Rank</th><th>Teams</th><th>Highest Score</th></tr></thead>';
        });

        
            const row = document.createElement('tr');
            // const thead = document.createElement('thead')
            // output.append(thead);
            // thead.append(row)
            console.log(data.table.rows)
            // data.table.cols.forEach((heading)=>{
            //     const cell = document.createElement('th');W
            //     cell.textContent = heading.label;
            //     row.append(cell);
            // })
            const tbody = document.createElement('tbody')
            if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent))) {
                tbody.classList.add('scrolling')
            }
            output.append(tbody)
            output.append(tbody)
            data.table.rows.forEach((main)=>
            {
                const container = document.createElement('tr');

                tbody.append(container);
                main.c.forEach((ele)=>
                {
                    const cell = document.createElement('th');
                    cell.textContent = ele?.v;
                    container.append(cell);
                    
                })
            })
            // output.style.transform = "translateY(-100%)";
            await sleep(35000);

            getData();

        // })
        
    } catch (error) {
        console.log(error.name === 'AbortError');
        
    }
}
window.requestAnimFrame
getData()

window.addEventListener('keypress', function (e) 
{
    if (e.key === 'Enter') 
    {
    }  
    if (e.code === 'Space')
    {
        getData()
    } 
    if (e.code === 'KeyS')
    {
        this.document.querySelector('.logo').classList.add('score_anima')
        this.document.querySelector('.timer').classList.add('score_anima')
    }
    if (e.code === 'KeyA')
    {
        this.document.querySelector('.scroll').classList.toggle('tbody_anima')
    }

})




