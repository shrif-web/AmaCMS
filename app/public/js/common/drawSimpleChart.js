const drawSimpleChart = (ctx, key, val) => {
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: key,
            datasets: [{
                label: 'Total Views',
                data: val,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}