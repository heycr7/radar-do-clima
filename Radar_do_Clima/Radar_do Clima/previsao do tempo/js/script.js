// Evento do formulário
document.querySelector('.busca').addEventListener('submit', async (event) => {

    event.preventDefault();

    let input = document.querySelector('#searchInput').value.trim();

    if (input !== '') {
        buscarCidade(input);
    }

});

// Função principal para buscar uma cidade
async function buscarCidade(input) {

    clearInfo();
    showWarning('Carregando...');

    let url =
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=ef60a79c9c3ca99f2edfad01fd9badb3&units=metric&lang=pt_br`;

    try {

        let results = await fetch(url);
        let json = await results.json();

        if (json.cod == 200) {

            // Salva a cidade pesquisada
            localStorage.setItem('cidade', json.name);

            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                descri: json.weather[0].description
            });

        } else {

            clearInfo();
            showWarning('Não encontramos essa localização');

        }

    } catch (erro) {

        clearInfo();
        showWarning('Erro ao consultar a API');
        console.error(erro);

    }
}

// Mostra as informações do clima
function showInfo(json) {

    showWarning('');

    document.querySelector('.resultado').style.display = 'block';

    document.querySelector('.titulo').innerHTML =
        `${json.name}, ${json.country}`;

    document.querySelector('.temperatura').innerHTML =
        `${Math.round(json.temp)} <sup>°C</sup>`;

    document.querySelector('.ventoInfo').innerHTML =
        `${json.windSpeed} <span>km/h</span>`;

    document.querySelector('.tempInfo').innerHTML =
        json.descri;

    document.querySelector('.informacoes img')
        .setAttribute(
            'src',
            `https://openweathermap.org/img/wn/${json.tempIcon}@4x.png`
        );
}

// Mostra avisos
function showWarning(msg) {

    document.querySelector('.aviso').innerHTML = msg;

}

// Limpa as informações
function clearInfo() {

    showWarning('');

    document.querySelector('.resultado').style.display = 'none';

}

// Executa ao abrir a página
window.onload = () => {

    let cidadeSalva = localStorage.getItem('cidade');

    if (cidadeSalva) {

        buscarCidade(cidadeSalva);

    } else {

        buscarCidade('Curitiba');

    }

};