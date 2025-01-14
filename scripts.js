const cards = document.querySelectorAll('.card');
let isDragging = false;
let startY;
let threshold = 50; // Minimum distance to trigger a scroll
let hasScrolled = false; // Flag to prevent multiple scrolls per drag
let currentCardIndex = 0; // Start with the first card
// Function to show the correct card based on index
function showCard(index) {
    const cardCount = cards.length;
    
    // Ensure the index wraps around
    index = (index + cardCount) % cardCount;

    cards.forEach((card, i) => {
        const offset = i - index;

        // Apply smooth transition and position cards off-screen as needed
        card.style.transition = 'transform 0.5s ease-in-out, opacity 0.3s ease-in-out';

        if (offset === 0) {
            // Center the current card
            card.style.opacity = 1;
            card.style.transform = 'translateY(0%) scale(1)';
            card.style.pointerEvents = 'auto'; // Enable interaction
        } 
        else if (offset === 1 || (offset === -cards.length + 1)) {
            // Card next to current (down scroll direction)
            card.style.opacity = 0.4;
            card.style.transform = 'translateY(100%) scale(0.7)';
            card.style.pointerEvents = 'none'; // Disable interaction
        } 
        else if (offset === -1 || (offset === cards.length - 1)) {
            // Card previous to current (up scroll direction)
            card.style.opacity = 0.4;
            card.style.transform = 'translateY(-100%) scale(0.7)';
            card.style.pointerEvents = 'none'; // Disable interaction
        } 
        else {
            // Other cards out of the view
            card.style.opacity = 0;
            card.style.transform = 'translateY(0%) scale(0.7)';
            card.style.pointerEvents = 'none'; // Disable interaction
        }
    });
}

// Initially show the first card when the page loads
showCard(currentCardIndex);

// Function to calculate the next card index (in a cycle)
function getNextIndex(current, direction) {
    const cardCount = cards.length;
    if (direction === 'down') {
        return (current + 1) % cardCount;  // Cycle to the next card
    } else if (direction === 'up') {
        return (current - 1 + cardCount) % cardCount;  // Cycle to the previous card
    }
    return current;
}

// Mouse and touch event listeners to handle dragging
document.addEventListener('mousedown', (e) => {
    isDragging = true;
    startY = e.clientY;
    hasScrolled = false;
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging || hasScrolled) return;

    const diff = e.clientY - startY;
    if (diff > threshold) {
        // Scroll down: Show the next card
        currentCardIndex = getNextIndex(currentCardIndex, 'up');
        showCard(currentCardIndex);
        hasScrolled = true;
    } else if (diff < -threshold) {
        // Scroll up: Show the previous card
        currentCardIndex = getNextIndex(currentCardIndex, 'down');
        showCard(currentCardIndex);
        hasScrolled = true;
    }
});

// Touch events for mobile users
document.addEventListener('touchstart', (e) => {
    isDragging = true;
    startY = e.touches[0].clientY;
    hasScrolled = false;
});

document.addEventListener('touchend', () => {
    isDragging = false;
});

document.addEventListener('touchmove', (e) => {
    if (!isDragging || hasScrolled) return;

    const diff = e.touches[0].clientY - startY;
    if (diff > threshold) {
        // Scroll down: Show the next card
        currentCardIndex = getNextIndex(currentCardIndex, 'up');
        showCard(currentCardIndex);
        hasScrolled = true;
    } else if (diff < -threshold) {
        // Scroll up: Show the previous card
        currentCardIndex = getNextIndex(currentCardIndex, 'down');
        showCard(currentCardIndex);
        hasScrolled = true;
    }
});
