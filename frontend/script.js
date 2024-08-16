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
                    try {
                        display.value = eval(display.value);
                    } catch (e) {
                        display.value = 'Error';
                    }
                }
            } else {
                display.value += value;
            }

            // Count button clicks
            clickCounts[value] += 1;
            console.log(`Button ${value} clicked ${clickCounts[value]} times.`);
        });
    });
});
