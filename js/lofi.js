// Lo-fi player
document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('lofi-select');
    const toggleBtn = document.getElementById('lofi-toggle');
    const statusSpan = document.getElementById('lofi-status');
    let audio = null;
    let isPlaying = false;

    // Sample lo-fi tracks (free MP3 from Pixabay or similar)
    const tracks = [
        { name: 'Chillhop Essentials - Summer', url: 'https://cdn.pixabay.com/download/audio/2022/03/07/audio_6f5f2a2e3b.mp3?filename=summer-breeze-12047.mp3' },
        { name: 'Lo-fi Study Beats', url: 'https://cdn.pixabay.com/download/audio/2022/03/07/audio_5e5b5a2e3b.mp3?filename=lofi-study-beats-12046.mp3' },
        { name: 'Jazz Hop', url: 'https://cdn.pixabay.com/download/audio/2022/03/07/audio_3c5b5a2e3b.mp3?filename=jazz-hop-12045.mp3' },
        { name: 'Rainy Day Vibes', url: 'https://cdn.pixabay.com/download/audio/2022/03/07/audio_1a5b5a2e3b.mp3?filename=rainy-day-vibes-12044.mp3' }
    ];

    // Populate select
    tracks.forEach(track => {
        const option = document.createElement('option');
        option.value = track.url;
        option.textContent = track.name;
        select.appendChild(option);
    });

    function updateStatus() {
        statusSpan.textContent = isPlaying ? 'Playing' : 'Stopped';
        toggleBtn.innerHTML = isPlaying ? '⏸️ Pause' : '▶️ Play';
    }

    toggleBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
        } else {
            const url = select.value;
            if (!url) {
                alert('Please select a track first');
                return;
            }
            if (audio) {
                audio.pause();
            }
            audio = new Audio(url);
            audio.loop = true;
            audio.play().catch(err => {
                console.error('Audio play failed:', err);
                alert('Could not play audio. Maybe browser restrictions.');
            });
            isPlaying = true;
        }
        updateStatus();
    });

    // If user changes track while playing, restart
    select.addEventListener('change', () => {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
            updateStatus();
        }
    });
});