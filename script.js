document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const box = document.getElementById('box');
    const dog = document.getElementById('dog');
    const dogClosed = document.getElementById('dog-closed');
    const resultOverlay = document.getElementById('result-overlay');
    const closeBtn = document.getElementById('close-btn');
    const ticketValue = document.getElementById('ticket-value');
    const confettiContainer = document.getElementById('confetti');

    let isAnimating = false;
    let blinkInterval = null;

    // Audio Objects
    const audioDrumroll = new Audio('ドラムロール.mp3');
    const audioLevelUp = new Audio('レベルアップ.mp3');
    const audioDogBark = new Audio('犬の鳴き声4.mp3');

    // Configure Audio
    audioDrumroll.loop = true;

    // Chain Dog Bark after Level Up
    audioLevelUp.addEventListener('ended', () => {
        audioDogBark.currentTime = 0;
        audioDogBark.play().catch(e => console.log('Audio play failed:', e));
        // Add a happy jump when barking
        animateDogWin();
    });

    // Blinking Logic
    function blink() {
        if (isAnimating) return; // Don't blink during animation to avoid glitching
        dog.style.display = 'none';
        dogClosed.style.display = 'block';
        setTimeout(() => {
            if (!isAnimating) {
                dog.style.display = 'block';
                dogClosed.style.display = 'none';
            }
        }, 150);
    }

    function startBlinking() {
        blinkInterval = setInterval(() => {
            if (Math.random() < 0.3) blink();
        }, 1000);
    }

    startBlinking();

    // Dog Animations using anime.js
    function animateDogIdle() {
        anime({
            targets: '.dog-container',
            translateY: [-5, 5],
            duration: 2000,
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutQuad'
        });
    }

    function animateDogExcited() {
        anime.remove('.dog-container');
        anime({
            targets: '.dog-container',
            translateY: [0, -40, 0],
            scaleY: [1, 1.1, 0.9, 1],
            duration: 500,
            loop: true,
            easing: 'easeOutQuad'
        });
    }

    function animateDogWin() {
        anime.remove('.dog-container');
        anime({
            targets: '.dog-container',
            translateY: [0, -50],
            rotate: [0, 360],
            scale: [1, 1.2],
            duration: 800,
            easing: 'easeOutElastic(1, .5)',
            complete: () => {
                anime({
                    targets: '.dog-container',
                    translateY: 0,
                    rotate: 0,
                    scale: 1,
                    duration: 500
                });
            }
        });
    }

    animateDogIdle();

    startBtn.addEventListener('click', () => {
        if (isAnimating) return;
        startDraw();
    });

    closeBtn.addEventListener('click', () => {
        hideResult();
    });

    function startDraw() {
        isAnimating = true;

        // Reset and Play Drumroll
        audioDrumroll.currentTime = 0;
        audioDrumroll.play().catch(e => console.log('Audio play failed:', e));

        // UI Updates
        box.classList.add('box-shaking');
        animateDogExcited();
        startBtn.style.transform = 'scale(0.95)';
        startBtn.disabled = true;

        // Ensure correct image is shown
        dog.style.display = 'block';
        dogClosed.style.display = 'none';

        // Determine prize
        const rand = Math.random();
        let prize = 0;

        // 40% 2000, 40% 2500, 20% 3000
        if (rand < 0.4) {
            prize = 2000;
        } else if (rand < 0.8) {
            prize = 2500;
        } else {
            prize = 3000;
        }

        // Wait for animation (2.5 seconds)
        setTimeout(() => {
            // Stop Drumroll
            audioDrumroll.pause();
            audioDrumroll.currentTime = 0;

            // Play Level Up (Dog bark will follow automatically via 'ended' event)
            audioLevelUp.currentTime = 0;
            audioLevelUp.play().catch(e => console.log('Audio play failed:', e));

            showResult(prize);

            // Stop animations
            box.classList.remove('box-shaking');
            animateDogWin();

            startBtn.style.transform = '';
            startBtn.disabled = false;
            isAnimating = false;
        }, 2500);
    }

    function showResult(amount) {
        ticketValue.textContent = amount;
        resultOverlay.classList.add('visible');
        createConfetti();
    }

    function hideResult() {
        resultOverlay.classList.remove('visible');
        confettiContainer.innerHTML = '';
        animateDogIdle();
    }

    function createConfetti() {
        const colors = ['#ff6b6b', '#ffbe0b', '#4ecdc4', '#a29bfe', '#fd79a8'];
        const confettiCount = 50;

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');

            const left = Math.random() * 100;
            const animDuration = Math.random() * 3 + 2;
            const animDelay = Math.random() * 0.5;
            const color = colors[Math.floor(Math.random() * colors.length)];

            confetti.style.left = `${left}%`;
            confetti.style.top = '-10px';
            confetti.style.backgroundColor = color;
            confetti.style.animationDuration = `${animDuration}s`;
            confetti.style.animationDelay = `${animDelay}s`;

            confettiContainer.appendChild(confetti);
        }
    }
});
