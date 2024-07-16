(function(){
   const data = [
    { year: 2010, count: 10},
    { year: 2011, count: 15},
    { year: 2012, count: 17},
    { year: 2013, count: 10},
    { year: 2014, count: 11},
    { year: 2015, count: 22},
    { year: 2016, count: 19},
    { year: 2017, count: 18},
    { year: 2018, count: 10},
    { year: 2019, count: 13},
    { year: 2020, count: 11},
    { year: 2021, count: 15},
    { year: 2022, count: 16},
    { year: 2023, count: 28},
    { year: 2024, count: 18},
   ];

   new Chart(
    document.getElementById('acquisitions'),
    {
        type: 'bar',
        data: {
            labels: data.map(row => row.year),
            datasets: [
                {
                    label: 'Acquisitions by year',
                    data: data.map(row => row.count),
                }
            ]
        }
    }
   );
})();