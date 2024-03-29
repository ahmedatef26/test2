function toggleRootColors(toDark) {
    document.documentElement.style.setProperty(
        "--color-primary-container",
        toDark ? "var(--color-dark-0)" : "var(--color-white)"
    );

    document.documentElement.style.setProperty(
        "--color-secondary-container",
        toDark ? "var(--color-dark-2)" : "var(--color-grey-2)"
    );
    document.documentElement.style.setProperty(
        "--color-third-container",
        toDark ? "var(--color-dark-1)" : "var(--color-grey-1)"
    );
    document.documentElement.style.setProperty(
        "--color-outer-container",
        toDark ? "var(--color-dark-0)" : "var(--color-grey-1)"
    );
    document.documentElement.style.setProperty(
        "--color-inner-container",
        toDark ? "var(--color-dark-2)" : "var(--color-white)"
    );
    document.documentElement.style.setProperty(
        "--color-middle-container",
        toDark ? "var(--color-dark-1)" : "var(--color-grey-1)"
    );

    document.documentElement.style.setProperty(
        "--color-text-primary",
        toDark ? "var(--color-white)" : "var(--color-dark-1)"
    );
    document.documentElement.style.setProperty(
        "--color-text-secondary",
        toDark ? "var(--color-grey-3)" : "var(--color-dark-4)"
    );
}
function toggleDarkmode(toDark) {
    localStorage.setItem("darkmode", toDark ? 1 : 0);

    $("#dark-mode-button__checkbox1").attr("checked", toDark ? true : false);
    $("#dark-mode-button__checkbox2").attr("checked", toDark ? true : false);
    if (toDark) {
        $("body").addClass("darkmode");
        $("html").addClass("darkmode");
        $(".navbar-brand img").attr("src", "assets/images/brand-light.png");
    } else {
        $("body").removeClass("darkmode");
        $("html").removeClass("darkmode");
        $(".navbar-brand img").attr("src", "assets/images/brand-dark.png");
    }
    toggleRootColors(toDark);
}
function storeDarkMode(toDark) {
    todark = toDark ? 1 : 0;
    $.ajax({
        url: "aj/darkmode.php",
        type: "POST",
        data: {
            todark,
        },
        success: function (r) {
            //console.log("toDark");
        },
        error: (e) => {
            console.log("error");
        },
    });
}
function initDarkmode() {
    toggleDarkmode(parseInt(localStorage.getItem("darkmode")));
    storeDarkMode(parseInt(localStorage.getItem("darkmode")));

    $("#dark-mode-button__checkbox1").on("click", function () {
        const toDark = $("#dark-mode-button__checkbox1").is(":checked");
        toggleDarkmode(toDark);
        storeDarkMode(toDark);
    });
    $("#dark-mode-button__checkbox2").on("click", function () {
        const toDark = $("#dark-mode-button__checkbox2").is(":checked");
        toggleDarkmode(toDark);
        storeDarkMode(toDark);
    });    
}

function addButtomShadowNavbar(classAdded) {
    if ($(window).scrollTop() > 1) {
        $("nav.navbar").addClass("scrolled");
        classAdded = !classAdded;
    }
    $(window).on("scroll", () => {
        let scrollTop = $(window).scrollTop();

        if (scrollTop > 1 && !classAdded) {
            $("nav.navbar").addClass("scrolled");
            classAdded = !classAdded;
        } else if (scrollTop <= 1 && classAdded) {
            $("nav.navbar").removeClass("scrolled");
            classAdded = !classAdded;
        }
    });
}

function mouseMainSection() {
    $(".main-section").on("mousemove", (mouse) => {
        let offY = mouse.pageY * 0.05;
        let offX = mouse.pageX * 0.02;

        // $("#bottom2").css("transform", `translateX(${offX}px) translateY(${offY}px)`);
        $("#bottom1").css("transform", `translateX(${offX * 1}px) translateY(${offY * 1}px)`);
        $("#top").css("transform", `translateX(${offX * 1.6}px) translateY(${offY * 1.6}px)`);
        $(".main__image").css(
            "transform",
            `translateX(${offX * 0.5}px) translateY(${offY * 0.5}px)`
        );
    });
}
function autoMainSection() {
    let i = 2;
    let directionUp = true;
    let translatingx = 0;
    let translatingy = 0;
    let dirx = true;
    let diry = true;
    let lengthxy = 3;

    const resizing = setInterval(() => {
        const length = 500;

        let percent = i / length;
        let cubic = easeInOutCubic(percent);

        let translate = 150 + 200 * cubic;
        let translate2 = -200 + 100 * cubic;
        $("#Shape_130_").css("transform", `translateY(${translate}px)`);
        $("#Shape_142_").css("transform", `translateX(${translate2}px)`);
        directionUp = setDirection(i, length, directionUp);
        directionUp ? i++ : i--;
    }, 10);
}
function mainAnimation() {
    if ($(window).width() < 768) {
        autoMainSection();
    } else {
        mouseMainSection();
    }
}
function writing() {
    const text = $(".main__title__first").text().trim();
    $(".main__title__first").text("");
    let i = 0;
    //toWriteAnimation();
    const writing = setInterval(() => {
        let word = $(".main__title__first").text();
        if (i < text.length) {
            $(".main__title__first").text(word + text[i]);
            return i++;
        }
        i++;
        if (i === text.length + 5) {
            return clearInterval(writing);
            $(".main__title__first").text(word.slice(0, -4));
            i = text.length - 4;
        }
    }, 600);
}
function toWriteAnimation() {
    let visible = true;
    const writingAnimation = setInterval(() => {
        const cursor = $(".main__title__first");
        visible ? cursor.addClass("writing") : cursor.removeClass("writing");
        visible = !visible;
    }, 400);
}

function easeInOutCubic(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}
function easeInCubic(x) {
    return x * x * x;
}

function setDirection(x, length, direction, start = 1) {
    if (x > start && x < length) {
        return direction;
    } else {
        direction = !direction;
        return direction;
    }
}

function hexAnimation() {
    let i = 2;
    let directionUp = true;
    let translatingx = 0;
    let translatingy = 0;
    let dirx = true;
    let diry = true;
    let lengthxy = 3;

    const resizing = setInterval(() => {
        const length = 1000;

        let percent = (length - i) / length;
        let cubic = easeInOutCubic(percent);

        let y2 = 175 + 615 * cubic;

        $(".main__hex-wrapper #line").attr("y2", y2 + "px");
        directionUp = setDirection(i, length, directionUp);
        directionUp ? i++ : i--;

        let x = Math.random() * 0.1;
        let y = 0.1 - x;

        dirx = setDirection(translatingx, lengthxy, dirx, -lengthxy);
        translatingx = dirx ? translatingx + x : translatingx - x;
        diry = setDirection(translatingy, lengthxy, diry, -lengthxy);
        translatingy = diry ? translatingy + y : translatingy - y;
        $(".main__hex-wrapper #path2453").css(
            "transform",
            `translate(${translatingx}px , ${translatingy}px)`
        );
    }, 10);
}

function moveButton(button, rem, deg) {
    button.css("transform", `translatey(${rem}rem) rotate(${deg}deg)`);
}
function toggleButtonClasse(button, toAdd) {
    toAdd ? button.addClass("stable") : button.removeClass("stable");
    const image = button.parent().siblings(".mid__img__wrapper");
    !toAdd ? image.addClass("shake") : image.removeClass("shake");
}

function midButtonsAnimation() {
    // if (typeof isMain !== undefined) {
    //     return;
    // }
    const midSection = $(".mid-section");
    const offsetTopS = midSection.offset().top;
    let by = (offsetTopS + midSection.height() - offsetTopS) / $(window).height();
    by = 2 - by > 1 ? 2 - by : 1;
    const offsetTopE = offsetTopS + midSection.height() * by;
    const translate = -20;
    const movable = [
        { degree: 30, button: $(".mid__card:nth-child(3) .mid__text") },
        { degree: -20, button: $(".mid__card:nth-child(2) .mid__text") },
        { degree: 20, button: $(".mid__card:nth-child(1) .mid__text") },
    ];

    $(window).on("scroll", () => {
        const scroll = $(window).scrollTop() + $(window).height();

        if (scroll > offsetTopS && scroll < offsetTopE) {
            let percentage = 1 - (scroll - offsetTopS) / (offsetTopE - offsetTopS);
            // console.log(percentage);
            movable.forEach((button, index) => {
                percentageAfter = percentage - index * 0.1;

                if (percentageAfter <= 0) {
                    percentageAfter = 0;
                    toggleButtonClasse(button.button, false);
                } else {
                    toggleButtonClasse(button.button, true);
                }
                moveButton(
                    button.button,
                    translate * percentageAfter,
                    button.degree * percentageAfter
                );
            });
        }

        if (scroll < offsetTopS) {
            movable.forEach((button) => {
                moveButton(button.button, translate, button.degree);
            });
        }
        if (scroll > offsetTopE) {
            movable.forEach((button) => {
                moveButton(button.button, 0, 0);
                toggleButtonClasse(button.button, false);
            });
        }
    });
}
function progressBar() {
    
    let scroll = $(window).scrollTop();
    const height = $(window).height();
    const width = $(window).width();
    let percentage = scroll / ($(document).height() - height);
    $(".progress-bar__moving").width(percentage * width);

    $(window).on("scroll", () => {
        //alert("ppppppppppppppp");
        scroll = $(window).scrollTop();
        percentage = scroll / ($(document).height() - height);
        $(".progress-bar__moving").width(percentage * width);
    });
}
function loadingAnimate() {
    setTimeout(() => {
        $(".loading-bar").slideUp(100);
    }, 1000);
}
function navbarToggle() {
    $("#nav-icon").click(function () {
        $(this).toggleClass("open");
        $("#nav-links-toggle").toggleClass("open");
    });
}
function toSideBar() {
    if ($(window).width() > 768) {
        $("body").removeClass("collapsed-side-nav");
    }
    $(".side-nav__head").on("click", function () {
        $("body").toggleClass("collapsed-side-nav");
    });
}
function toTop() {
    $(window).scrollTop(0);
}
$(function () {
    if (typeof isMain !== "undefined" || typeof isCourses !== "undefined") {
        hexAnimation();
        if (typeof isCourses === "undefined") {
            mainAnimation();
            writing();
            midButtonsAnimation();
        }
    }
    if (typeof isAdmin !== "undefined") {
        toSideBar();
        toTop();
    }
    let classAdded = false;
    addButtomShadowNavbar(classAdded);
    initDarkmode();
    navbarToggle();
    progressBar();
    loadingAnimate();
});
