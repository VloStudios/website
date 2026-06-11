// Cookie Clicker with Japanese cherry vibes
document.addEventListener('DOMContentLoaded', () => {
    const cookieCountEl = document.getElementById('cookie-count');
    const cookieButton = document.getElementById('cookie-button');
    const cpsEl = document.getElementById('cps');
    const cookieDisplay = document.getElementById('cookie-display');
    const container = document.querySelector('.cookie-clicker-container');

    let cookies = 0;
    let cps = 0;
    let clickValue = 1;

    // Auto-clicker upgrade
    let autoClickerCost = 10;
    let autoClickerCount = 0;
    const autoClickerBtn = document.createElement('button');
    autoClickerBtn.id = 'auto-clicker-btn';
    autoClickerBtn.textContent = `Buy Auto-clicker (${autoClickerCost})`;
    autoClickerBtn.style.display = 'block';
    autoClickerBtn.style.margin = '10px auto';
    autoClickerBtn.style.padding = '8px 12px';
    autoClickerBtn.style.background = '#98fb98';
    autoClickerBtn.style.color = '#006400';
    autoClickerBtn.style.border = 'none';
    autoClickerBtn.style.borderRadius = '4px';
    autoClickerBtn.style.cursor = 'pointer';
    container.appendChild(autoClickerBtn);

    function updateDisplay() {
        cookieCountEl.textContent = Math.floor(cookies);
        cpsEl.textContent = cps.toFixed(2);
        autoClickerBtn.textContent = `Buy Auto-clicker (${autoClickerCost})`;
        // Disable if not enough cookies
        autoClickerBtn.disabled = cookies < autoClickerCost;
    }

    function createPetal() {
        const petal = document.createElement('div');
        petal.className = 'petal';
        // Random size between 10-20px
        const size = Math.random() * 10 + 10;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        // Random horizontal position within button
        const rect = cookieButton.getBoundingClientRect();
        const x = rect.left + Math.random() * rect.width - size/2;
        const y = rect.top + Math.random() * rect.height - size/2;
        petal.style.left = `${x}px`;
        petal.style.top = `${y}px`;
        // Random fall duration 2-4 seconds
        const duration = Math.random() * 2 + 2;
        petal.style.animationDuration = `${duration}s`;
        // Random rotation
        petal.style.transform = `rotate(${Math.random() * 360}deg`;
        document.body.appendChild(petal);
        // Remove after animation ends
        petal.addEventListener('animationend', () => {
            petal.remove();
        });
    }

    cookieButton.addEventListener('click', () => {
        cookies += clickValue;
        // Create a few petals on click
        for (let i = 0; i < 3; i++) {
            createPetal();
        }
        updateDisplay();
    });

    autoClickerBtn.addEventListener('click', () => {
        if (cookies >= autoClickerCost) {
            cookies -= autoClickerCost;
            autoClickerCount++;
            cps += 0.1; // each auto-clicker adds 0.1 cookies per second
            // Increase cost for next
            autoClickerCost = Math.floor(autoClickerCost * 1.15);
            updateDisplay();
        }
    });

    // Auto-collect loop
    setInterval(() => {
        cookies += cps;
        updateDisplay();
    }, 1000);

    // Initial display
    updateDisplay();
});