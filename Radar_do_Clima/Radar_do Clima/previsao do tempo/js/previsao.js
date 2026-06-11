document
.querySelector('.buscaPrevisao')
.addEventListener('submit', async (event)=>{

    event.preventDefault();

    let cidade =
    document.querySelector('#cidade').value;

    if(cidade === ''){
        return;
    }

    let url =
    `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURI(cidade)}&appid=ef60a79c9c3ca99f2edfad01fd9badb3&units=metric&lang=pt_br`;

    try{

        let resultado = await fetch(url);
        let json = await resultado.json();

        if(json.cod !== "200"){

            document.querySelector('.dias').innerHTML =
            '<p>Cidade não encontrada.</p>';

            return;
        }

        mostrarPrevisao(json);

    }catch(error){

        document.querySelector('.dias').innerHTML =
        '<p>Erro ao buscar previsão.</p>';

        console.error(error);
    }
});

function mostrarPrevisao(json){

    let dias =
    document.querySelector('.dias');

    dias.innerHTML = '';

    for(let i = 0; i < json.list.length; i += 8){

        let item = json.list[i];

        let data =
        new Date(item.dt_txt);

        dias.innerHTML += `
        <div class="dia">

            <h3>
                ${data.toLocaleDateString('pt-BR')}
            </h3>

            <img
            src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png"
            alt="Clima">

            <p class="temp">
                ${Math.round(item.main.temp)}°C
            </p>

            <p class="descricao">
                ${item.weather[0].description}
            </p>

        </div>
        `;
    }
}