function generateStats(i) {
    let box = document.getElementById('lower-info-div');
    document.getElementById('evolve-btn').classList.remove('highlight');
    document.getElementById('stat-btn').classList.add('highlight');

    box.innerHTML = /*html*/`
    <div class="lower-info">
        <div class="chart-div">
        <canvas id="myChart"></canvas></div>
        </div>`
    let ctx = document.getElementById('myChart');
    Chart.defaults.color = 'white';
    Chart.defaults.font.size = 14;
    Chart.defaults.backgroundColor = '#9BD0F5';
    let statName = allPokemon[i].stats.map(stat => stat.stat.name);
    let baseStat = allPokemon[i].stats.map(stat => stat.base_stat);
    new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: statName,
            datasets: [{
                data: baseStat,
                borderWidth: 1,
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
            }]
        },
        options: {
            responsive: true,
            aspectRatio: false,
           
        }
    });
}