$(document).ready(function() {
    "user strict";
    // Menu List

    if ($(".menu-list").length) {
        $(".menu-list").slimScroll({
            height: "100%",
        });
    }
    // header

    if ($(".header").length) {
        $(window).scroll(function() {
            if ($(".header").offset().top > 200) {
                $(".header").addClass("header-collapse");
            } else {
                $(".header").removeClass("header-collapse");
            }
        });
    }

    /* menu js **/

    if ($(".dropdown-menu a.dropdown-toggle").length) {
        $(".dropdown-menu a.dropdown-toggle").on("click", function(e) {
            if (!$(this)
                .next()
                .hasClass("show")
            ) {
                $(this)
                    .parents(".dropdown-menu")
                    .first()
                    .find(".show")
                    .removeClass("show");
            }
            var $subMenu = $(this).next(".dropdown-menu");
            $subMenu.toggleClass("show");

            $(this)
                .parents("li.nav-item.dropdown.show")
                .on("hidden.bs.dropdown", function(e) {
                    $(".dropdown-submenu .show").removeClass("show");
                });

            return false;
        });
    }

    /* scroll nav js **/

    if ($("#scroll-nav a ").length) {
        $("#scroll-nav a").on("click", function() {
            if (
                location.pathname.replace(/^\//, "") ==
                this.pathname.replace(/^\//, "") &&
                location.hostname == this.hostname
            ) {
                var target = $(this.hash);
                target = target.length ?
                    target :
                    $("[name=" + this.hash.slice(1) + "]");
                if (target.length) {
                    $("html, body").animate({
                            scrollTop: target.offset().top - 0,
                        },
                        1500
                    );
                    return false;
                }
            }
        });
    }
    // sidenav

    if ($(".sidebar-nav-fixed a").length) {
        $(".sidebar-nav-fixed a")
            // Remove links that don't actually link to anything

        .click(function(event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top - 90
                    }, 1000, function() {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        };
                    });
                }
            };
            $('.sidebar-nav-fixed a').each(function() {
                $(this).removeClass('active');
            })
            $(this).addClass('active');



        });
    }

    // datepicker js

    if ($("#program-date").length) {
        const picker = new Litepicker({
            element: document.getElementById('program-date')
        });
    }

    // leaflet

    if ($("#mapid").length) {
        var mymap = L.map("mapid").setView([51.505, -0.09], 13);

        L.tileLayer(
            "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw", {
                maxZoom: 18,
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                id: "mapbox/streets-v11",
                tileSize: 512,
                zoomOffset: -1,
            }
        ).addTo(mymap);
    }

    // magnific popup

    if ($(".popup-youtube").length) {
        $(".popup-youtube").magnificPopup({
            disableOn: 700,
            type: "iframe",
            mainClass: "mfp-fade",
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false,
        });
    }

    // Tooltip
    if ($('[data-bs-toggle="tooltip"]').length) {
        $('[data-bs-toggle="tooltip"]').tooltip();
    }

    // Popover

    if ($('[data-bs-toggle="popover"]').length) {
        $('[data-bs-toggle="popover"]').popover();
    }
    // Price ranger
    if ($('#price_ranger').length) {
        $("#price_ranger").ionRangeSlider({
            type: "double",
            grid: true,
            min: 0,
            max: 40,
            from: 5,
            to: 32,
            prefix: "$"
        });
    }
    if ($(".cc-inputmask").length) {
        $(".cc-inputmask").inputmask("9999 9999 9999 9999")
    }

    if ($(".cvv").length) {
        $(".cvv").inputmask("999")


    }
    if ($('[href="#"]').length) {
        document.querySelectorAll('[href="#"]').forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault()
            })
        })
    }

    if ($('#liveAlertPlaceholder').length){
        var alertPlaceholder = document.getElementById('liveAlertPlaceholder')
        var alertTrigger = document.getElementById('liveAlertBtn')

        function alert(message, type) {
          var wrapper = document.createElement('div')
          wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

          alertPlaceholder.append(wrapper)
        }

        if (alertTrigger) {
          alertTrigger.addEventListener('click', function () {
            alert('Nice, you triggered this alert message!', 'success')
          })
        }
        }
});

const pageLinks = document.querySelectorAll('.page-link[id^="page-"]');
const prevPageLink = document.getElementById('prev-page');
const nextPageLink = document.getElementById('next-page');
let currentPageIndex = 0;

// Função para atualizar a visibilidade dos links "Anterior" e "Próxima"
function updatePageLinks() {
    prevPageLink.classList.toggle('disabled', currentPageIndex === 0);
    nextPageLink.classList.toggle('disabled', currentPageIndex === pageLinks.length - 1);
}

// Função para navegar para a próxima página
function nextPage() {
    if (currentPageIndex < pageLinks.length - 1) {
        currentPageIndex++;
        pageLinks[currentPageIndex].click();
        updatePageLinks();
    }
}

// Função para navegar para a página anterior
function prevPage() {
    if (currentPageIndex > 0) {
        currentPageIndex--;
        pageLinks[currentPageIndex].click();
        updatePageLinks();
    }
}

// Ouvintes de evento para avançar e retroceder
nextPageLink.addEventListener('click', nextPage);
prevPageLink.addEventListener('click', prevPage);

// Atualiza a visibilidade dos links quando a página carregar
updatePageLinks();

// ACESSO AO LOGIN....
function validateLogin() {
    const username = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    // Simulação de credenciais válidas
    const validUsername = "testealuno@teste.com";
    const validPassword = "12345";
  
    if (username === validUsername && password === validPassword) {
      // Define a URL completa para a página 'nome.html'
      const targetURL = "page-customer/dashboard-page.html";
      window.location.href = targetURL;
    } else {
      document.getElementById("response-message").textContent = "Credenciais inválidas.";
    }
  }
  
// VIDEOS DA SALA DE AULA
var videoPlayer = document.getElementById("videoPlayer");
var controlesVideo = document.getElementById("controlesVideo");
var progressBar = document.getElementById("progressBar");
var btnFullscreen = document.getElementById("btn-fullscreen");
var btnPause = document.getElementById("btn-pause");
var btnStop = document.getElementById("btn-stop");
var btnForward = document.getElementById("btn-forward");
var btnBackward = document.getElementById("btn-backward");


const btnPlay = document.getElementById('btn-play');
btnPlay.addEventListener("click", function () { console.log('h') });


btnPlay.addEventListener("click", function () {
  videoPlayer.play();
});

btnStop.addEventListener("click", function () {
  videoPlayer.pause();
  videoPlayer.currentTime = 0;
});

btnPause.addEventListener("click", function () {
  videoPlayer.pause();
});

btnForward.addEventListener("click", function () {
  videoPlayer.currentTime += 10;
});

btnBackward.addEventListener("click", function () {
  videoPlayer.currentTime -= 10;
});

videoPlayer.addEventListener("timeupdate", function () {
  var progress = (videoPlayer.currentTime / videoPlayer.duration) * 100;
  progressBar.value = progress;
});

progressBar.addEventListener("input", function () {
  var time = (progressBar.value / 100) * videoPlayer.duration;
  videoPlayer.currentTime = time;
});

btnFullscreen.addEventListener("click", function () {
  if (videoPlayer.requestFullscreen) {
    videoPlayer.requestFullscreen();
  } else if (videoPlayer.mozRequestFullScreen) {
    videoPlayer.mozRequestFullScreen();
  } else if (videoPlayer.webkitRequestFullscreen) {
    videoPlayer.webkitRequestFullscreen();
  } else if (videoPlayer.msRequestFullscreen) {
    videoPlayer.msRequestFullscreen();
  }
});

volumeBar.addEventListener("input", function () {
  videoPlayer.volume = volumeBar.value;
});

function changeVideo(videoSrc) {
  videoPlayer.getElementsByTagName("source")[0].src = videoSrc;
  videoPlayer.load()
  videoPlayer.play();
}

// VALIDAR CREDENCIAIS DE TESTE

function validateLogin() {
    const username = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Simulação de credenciais válidas
    const validUsername = "testealuno@teste.com";
    const validPassword = "12345";

    if (username === validUsername && password === validPassword) {
        // Define a URL completa para a página 'nome.html'
        // const targetURL = "page-customer/dashboard-profile.html";
        window.location.href = "./page-customer/dashboard-profile.html";
    } else {
        document.getElementById("response-message").textContent = "Credenciais inválidas.";
    }
}


