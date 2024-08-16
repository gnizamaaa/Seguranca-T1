document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    const clickCounts = {};

    buttons.forEach(button => {
        clickCounts[button.dataset.value] = 0;

        button.addEventListener('click', function () {
            const value = this.dataset.value;

            if (value === undefined) {
                if (this.id === 'clear') {
                    display.value = '';
                } else if (this.id === 'equals') {
                    sendOperation(display.value);
                }
            } else {
                display.value += value;
            }

            clickCounts[value] += 1;
            console.log(`Button ${value} clicked ${clickCounts[value]} times.`);
        });
    });

    function sendOperation(operation) {
        fetch('http://localhost:3000/compute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ operation })
        })
        .then(response => response.json())
        .then(data => {
            if (data.result !== undefined) {
                display.value = data.result;
            } else {
                display.value = 'Error';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            display.value = 'Error';
        });
    }
});
