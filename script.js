// =========================================
// BACKGROUND MUSIC - ALL PAGES
// =========================================

const backgroundMusic = new Audio(
    "assets/audio/Magic-Valentines-.mp3"
);

backgroundMusic.loop = true;
backgroundMusic.volume = 0.30;
backgroundMusic.preload = "auto";


// Old mute setting no longer needed
sessionStorage.removeItem(
    "birthdayMusicMuted"
);


// Restore previous music position
const savedMusicTime =
    sessionStorage.getItem(
        "birthdayMusicTime"
    );


backgroundMusic.addEventListener(
    "loadedmetadata",
    () => {

        if (!savedMusicTime) return;

        const savedTime =
            Number(savedMusicTime);

        if (
            !Number.isNaN(savedTime) &&
            savedTime >= 0 &&
            savedTime < backgroundMusic.duration
        ) {
            backgroundMusic.currentTime =
                savedTime;
        }
    }
);


// Start background music
function startBackgroundMusic() {

    backgroundMusic
        .play()
        .catch(() => {

            // Some browsers block unmuted autoplay.
            // First user interaction will start it automatically.

        });
}


// Try to start immediately when website opens
startBackgroundMusic();


// If browser blocks autoplay,
// first click/tap anywhere will start it automatically
function unlockBackgroundMusic() {

    startBackgroundMusic();

    document.removeEventListener(
        "pointerdown",
        unlockBackgroundMusic
    );

    document.removeEventListener(
        "keydown",
        unlockBackgroundMusic
    );
}


document.addEventListener(
    "pointerdown",
    unlockBackgroundMusic
);


document.addEventListener(
    "keydown",
    unlockBackgroundMusic
);


// Save music position continuously
setInterval(() => {

    if (!backgroundMusic.paused) {

        sessionStorage.setItem(
            "birthdayMusicTime",
            backgroundMusic.currentTime
        );
    }

}, 300);


// Save position when changing pages
window.addEventListener(
    "pagehide",
    () => {

        sessionStorage.setItem(
            "birthdayMusicTime",
            backgroundMusic.currentTime
        );
    }
); 

// =========================================
// PAGE 1 - CUT THE CAKE
// =========================================

const cakeButton =
    document.getElementById("cakeButton");

const cakeWrapper =
    document.getElementById("cakeWrapper");

const pressButton =
    document.getElementById("pressButton");

const welcomePage =
    document.getElementById("welcomePage");

let opening = false;


function cutCakeAndOpen() {
    if (opening) return;

    opening = true;

    startBackgroundMusic();


    if (cakeWrapper) {
        cakeWrapper.classList.add(
            "cutting"
        );
    }


    if (cakeButton) {
        cakeButton.disabled = true;
    }


    if (pressButton) {
        pressButton.disabled = true;

        pressButton.innerHTML =
            'Something Special... <span>✨</span>';
    } 


    setTimeout(() => {
        if (welcomePage) {
            welcomePage.classList.add(
                "leaving"
            );
        }
    }, 800);


    setTimeout(() => {
        sessionStorage.setItem(
            "birthdayMusicTime",
            backgroundMusic.currentTime
        );

        window.location.href =
            "wish.html";

    }, 1300);
}


if (cakeButton) {
    cakeButton.addEventListener(
        "click",
        cutCakeAndOpen
    );
}


if (pressButton) {
    pressButton.addEventListener(
        "click",
        cutCakeAndOpen
    );
}



// =========================================
// PAGE 2 - ONE TIME CONFETTI
// =========================================

if (
    document.body.classList.contains(
        "wish-body"
    )
) {
    const confettiLayer =
        document.createElement("div");

    confettiLayer.className =
        "confetti-layer";

    document.body.appendChild(
        confettiLayer
    );


    const confettiColors = [
        "#ff6fae",
        "#ffd84d",
        "#6fd3ff",
        "#9d7cff",
        "#ff8f70",
        "#73e2a7",
        "#ffffff"
    ];


    for (let i = 0; i < 70; i++) {
        const piece =
            document.createElement("span");

        piece.className =
            "confetti-piece";


        piece.style.left =
            `${Math.random() * 100}%`;


        piece.style.background =
            confettiColors[
                Math.floor(
                    Math.random() *
                    confettiColors.length
                )
            ];


        piece.style.setProperty(
            "--fall-time",
            `${2.8 + Math.random() * 1.8}s`
        );


        piece.style.setProperty(
            "--rotation",
            `${360 + Math.random() * 720}deg`
        );


        piece.style.animationDelay =
            `${Math.random() * 0.8}s`;


        piece.style.width =
            `${7 + Math.random() * 7}px`;


        piece.style.height =
            `${10 + Math.random() * 12}px`;


        confettiLayer.appendChild(
            piece
        );
    }


    setTimeout(() => {
        confettiLayer.remove();
    }, 5500);
}



// =========================================
// PAGE 2 - 5 SECOND COUNTDOWN
// =========================================

const specialButton =
    document.getElementById(
        "specialButton"
    );

const countdownBadge =
    document.getElementById(
        "countdownBadge"
    );


if (
    specialButton &&
    countdownBadge
) {
    let timeLeft = 5;


    countdownBadge.textContent =
        timeLeft;


    const countdown =
        setInterval(() => {
            timeLeft--;


            countdownBadge.textContent =
                timeLeft;


            if (timeLeft <= 0) {
                clearInterval(
                    countdown
                );


                specialButton.disabled =
                    false;


                specialButton.classList.add(
                    "special-ready"
                );


                countdownBadge.classList.add(
                    "countdown-ready"
                );


                setTimeout(() => {
                    specialButton.classList.add(
                        "ready-shake"
                    );


                    setTimeout(() => {
                        specialButton.classList.remove(
                            "ready-shake"
                        );
                    }, 900);

                }, 2000);
            }

        }, 1000);



    // =========================================
    // PAGE 2 -> PAGE 3 CINEMATIC TRANSITION
    // =========================================

    specialButton.addEventListener(
        "click",
        () => {
            if (specialButton.disabled) {
                return;
            }


            // Prevent double click
            specialButton.disabled = true;


            // Save music position
            sessionStorage.setItem(
                "birthdayMusicTime",
                backgroundMusic.currentTime
            );


            // Tell Page 3 that transition came from Page 2
            sessionStorage.setItem(
                "cinematicEntry",
                "true"
            );


            // Create cinematic overlay
            const cinematicOverlay =
                document.createElement("div");

            cinematicOverlay.className =
                "cinematic-transition";


            cinematicOverlay.innerHTML = `
                <div class="cinematic-light"></div>

                <div class="cinematic-sparkles">
                    <span>✦</span>
                    <span>✨</span>
                    <span>✦</span>
                </div>
            `;


            document.body.appendChild(
                cinematicOverlay
            );


            // Fade current page
            document.body.classList.add(
                "cinematic-leaving"
            );


            // Start overlay animation
            requestAnimationFrame(() => {
                cinematicOverlay.classList.add(
                    "active"
                );
            });


            // Open Page 3
            setTimeout(() => {
                window.location.href =
                    "memories.html";
            }, 1150);
        }
    );
}



// =========================================
// PAGE 3 - CINEMATIC ENTRY
// =========================================

if (
    document.body.classList.contains(
        "memories-body"
    )
) {
    const cinematicEntry =
        sessionStorage.getItem(
            "cinematicEntry"
        );

    if (cinematicEntry === "true") {

        sessionStorage.removeItem(
            "cinematicEntry"
        );

        document.body.classList.add(
            "cinematic-enter"
        );
    }
} 



// =========================================
// PAGE 3 - MEMORY CARDS
// =========================================

const memoryCards =
    document.querySelectorAll(
        ".memory-card"
    );


if (memoryCards.length > 0) {
    memoryCards.forEach(
        (card) => {
            card.classList.add(
                "memory-visible"
            );
        }
    );
}

// =========================================
// PAGE 3 - SCROLL INDICATOR FINAL FIX
// =========================================

if (document.body.classList.contains("memories-body")) {

    let scrollIndicator =
        document.getElementById("scrollIndicator");


    // Create indicator if it is missing
    if (!scrollIndicator) {

        scrollIndicator =
            document.createElement("div");

        scrollIndicator.id =
            "scrollIndicator";

        scrollIndicator.innerHTML = `
            <span class="scroll-text">SCROLL</span>
            <span class="scroll-arrow">↓</span>
        `;

        document.body.appendChild(
            scrollIndicator
        );
    }


    const scrollText =
        scrollIndicator.querySelector(
            ".scroll-text"
        );

    const scrollArrow =
        scrollIndicator.querySelector(
            ".scroll-arrow"
        ); 


    // -----------------------------------------
    // FORCE INDICATOR STYLE
    // -----------------------------------------

    scrollIndicator.style.setProperty(
        "position",
        "fixed",
        "important"
    );

    scrollIndicator.style.setProperty(
        "left",
        "50%",
        "important"
    );

    scrollIndicator.style.setProperty(
        "bottom",
        "20px",
        "important"
    );

    scrollIndicator.style.setProperty(
        "top",
        "auto",
        "important"
    );

    scrollIndicator.style.setProperty(
        "transform",
        "translateX(-50%)",
        "important"
    );

    scrollIndicator.style.setProperty(
        "z-index",
        "2147483647",
        "important"
    );

    scrollIndicator.style.setProperty(
        "display",
        "flex",
        "important"
    );

    scrollIndicator.style.setProperty(
        "flex-direction",
        "column",
        "important"
    );

    scrollIndicator.style.setProperty(
        "align-items",
        "center",
        "important"
    );

    scrollIndicator.style.setProperty(
        "gap",
        "5px",
        "important"
    );

    scrollIndicator.style.setProperty(
        "opacity",
        "1",
        "important"
    );

    scrollIndicator.style.setProperty(
        "visibility",
        "visible",
        "important"
    );

    scrollIndicator.style.setProperty(
        "pointer-events",
        "none",
        "important"
    );


    // -----------------------------------------
    // SCROLL TEXT STYLE
    // -----------------------------------------

    if (scrollText) {

        scrollText.style.setProperty(
            "color",
            "rgba(255,255,255,0.75)",
            "important"
        );

        scrollText.style.setProperty(
            "font-family",
            "Manrope, sans-serif",
            "important"
        );

        scrollText.style.setProperty(
            "font-size",
            "9px",
            "important"
        );

        scrollText.style.setProperty(
            "font-weight",
            "700",
            "important"
        );

        scrollText.style.setProperty(
            "letter-spacing",
            "2.5px",
            "important"
        );
    }


    // -----------------------------------------
    // ARROW STYLE
    // -----------------------------------------

    if (scrollArrow) {

        scrollArrow.style.setProperty(
            "width",
            "40px",
            "important"
        );

        scrollArrow.style.setProperty(
            "height",
            "40px",
            "important"
        );

        scrollArrow.style.setProperty(
            "display",
            "flex",
            "important"
        );

        scrollArrow.style.setProperty(
            "align-items",
            "center",
            "important"
        );

        scrollArrow.style.setProperty(
            "justify-content",
            "center",
            "important"
        );

        scrollArrow.style.setProperty(
            "border-radius",
            "50%",
            "important"
        );

        scrollArrow.style.setProperty(
            "border",
            "1px solid rgba(255,255,255,0.30)",
            "important"
        );

        scrollArrow.style.setProperty(
            "background",
            "rgba(255,150,205,0.20)",
            "important"
        );

        scrollArrow.style.setProperty(
            "color",
            "#ffc4e2",
            "important"
        );

        scrollArrow.style.setProperty(
            "font-size",
            "22px",
            "important"
        );

        scrollArrow.style.setProperty(
            "box-shadow",
            "0 8px 22px rgba(15,0,25,0.28)",
            "important"
        );


        // Smooth up/down animation
        scrollArrow.animate(
            [
                {
                    transform: "translateY(0)"
                },

                {
                    transform: "translateY(8px)"
                },

                {
                    transform: "translateY(0)"
                }
            ],
            {
                duration: 1400,
                iterations: Infinity,
                easing: "ease-in-out"
            }
        );
    }


    // -----------------------------------------
    // ALWAYS START PAGE FROM TOP
    // -----------------------------------------

    if ("scrollRestoration" in history) {
        history.scrollRestoration =
            "manual";
    }


    setTimeout(() => {

        window.scrollTo(
            0,
            0
        );

        scrollIndicator.style.setProperty(
            "opacity",
            "1",
            "important"
        );

        scrollIndicator.style.setProperty(
            "visibility",
            "visible",
            "important"
        );

    }, 80);


    // -----------------------------------------
    // HIDE AFTER USER SCROLLS
    // -----------------------------------------

    function updateScrollIndicator() {

        if (window.scrollY > 25) {

            scrollIndicator.style.setProperty(
                "opacity",
                "0",
                "important"
            );

            scrollIndicator.style.setProperty(
                "visibility",
                "hidden",
                "important"
            );

        } else {

            scrollIndicator.style.setProperty(
                "opacity",
                "1",
                "important"
            );

            scrollIndicator.style.setProperty(
                "visibility",
                "visible",
                "important"
            );
        }
    }


    window.addEventListener(
        "scroll",
        updateScrollIndicator,
        {
            passive: true
        }
    );


    window.addEventListener(
        "pageshow",
        () => {

            window.scrollTo(
                0,
                0
            );

            updateScrollIndicator();
        }
    );
} 

// =========================================
// PAGE 3 - SCROLL DOWN CUE
// =========================================

const pageScrollCue =
    document.getElementById("pageScrollCue");

if (pageScrollCue) {

    function updatePageScrollCue() {

        if (window.scrollY > 8) {

            pageScrollCue.classList.add(
                "scroll-cue-hidden"
            );

        } else {

            pageScrollCue.classList.remove(
                "scroll-cue-hidden"
            );
        }
    }


    window.addEventListener(
        "scroll",
        updatePageScrollCue,
        { passive: true }
    );


    window.addEventListener(
        "pageshow",
        updatePageScrollCue
    );


    updatePageScrollCue();
} 

// =========================================
// FIX BROWSER BACK / FORWARD BLANK PAGE
// =========================================

window.addEventListener("pageshow", (event) => {

    const navigation =
        performance.getEntriesByType("navigation")[0];

    const cameFromHistory =
        event.persisted ||
        navigation?.type === "back_forward";

    if (cameFromHistory) {
        window.location.reload();
    }
}); 