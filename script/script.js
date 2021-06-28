let app = document.querySelector('#app')
app.style.display = 'flex'
app.style.flexDirection = 'row'
app.style.flexWrap = 'wrap'
app.style.justifyContent = 'space-evenly'

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

fetch("https://ghibliapi.herokuapp.com/films", requestOptions)
    .then(response => response.json())
    .then(response => {
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "__cfduid=d325594aba2236130df68fbb486923db71616077799");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://picsum.photos/v2/list", requestOptions)
            .then(result => result.json())
            .then(result => {
                console.log(result)
                let load = document.querySelector('#load')
                load.style.display = 'none'
                app.style.backgroundColor = 'white'
                app.style.height = 'unset'
                for (i = 0; i < response.length; i++) {
                    let div = document.createElement('div')
                    div.style.width = 'calc(90vw / 3)'
                    div.style.height = 'calc(90vh / 2)'
                    div.style.backgroundColor = '#F0F0F0'
                    div.style.borderRadius = '12px'
                    div.style.padding = '16px'
                    div.style.marginTop = 'calc(4vw /4)'
                    app.appendChild(div)
                    let img = document.createElement('img')
                    img.src = result[i].download_url
                    img.style.width = '50px'
                    img.style.height = '50px'
                    img.style.borderRadius = "25px"
                    img.style.objectFit = "cover"
                    div.appendChild(img)
                    let h1 = document.createElement('h1')
                    h1.innerText = response[i].title
                    div.appendChild(h1)
                    let h6 = document.createElement('h3')
                    h6.innerText = response[i].original_title
                    div.appendChild(h6)
                    let p = document.createElement('p')
                    p.innerText = response[i].description
                    div.appendChild(p)
                }
            })
            .catch(error => console.log('error', error));
    }
)
    .catch(error => console.log('error', error));