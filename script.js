
document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('#hero');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    });

    const title = document.querySelector('.title');
    setInterval(() => {
        if (Math.random() < 0.1) {
            title.style.textShadow = `
                2px 2px 10px rgba(229, 9, 20, 0.8),
                -2px -2px 10px rgba(229, 9, 20, 0.8)
            `;
            setTimeout(() => {
                title.style.textShadow = '2px 2px 4px rgba(0,0,0,0.5)';
            }, 100);
        }
    }, 500);

    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });


    const cards = document.querySelectorAll('.character-card');
    cards.forEach(card => {
        let floatY = 0;
        let floatDirection = 1;

        setInterval(() => {
            floatY += (0.2 * floatDirection);
            if (floatY > 5) floatDirection = -1;
            if (floatY < 0) floatDirection = 1;
            card.style.transform = `translateY(${floatY}px)`;
        }, 50);
    });


    const upsideDown = document.querySelector('#upside-down');
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    upsideDown.addEventListener('mouseenter', () => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(50, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);

        oscillator.start();

        upsideDown.addEventListener('mouseleave', () => {
            oscillator.stop();
        }, { once: true });
    });
});