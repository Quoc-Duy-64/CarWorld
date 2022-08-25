$(document).ready( function() {
    $(window).scroll(function() {
        let _this = $(this).scrollTop()
        let header = $('header')
        if (_this > 100)
            $("a.go").css("display", "block")
        if (_this <= 10) {
            $("a.go").css("display", "none")
           header.removeClass('bx-sd')
        }   
        if (_this > 10)
           header.addClass('bx-sd')
    })

    $("a.go").click(function(){
        $("html, body").animate({
            scrollTop: 0
        }, 500)
    })

    function addAnimationElementInWindow(element) {
        setTimeout(function() {
            let rect = element.getBoundingClientRect();
            let heightScreen = window.innerHeight
            if (!(rect.bottom < 0 || rect.top > heightScreen)) {
                element.classList.add('start')
            }
        },100)
    }

    function startAnimationScroll () {
        document.querySelectorAll('.title-field').forEach(function (element) {
            addAnimationElementInWindow(element)
        })
        document.querySelectorAll('.scroll__right-to-left').forEach(function (element) {
            addAnimationElementInWindow(element)
        })
        document.querySelectorAll('.scroll__bot-to-top').forEach(function (element) {
            addAnimationElementInWindow(element)
        })
        document.querySelectorAll('.scroll__left-to-right').forEach(function (element) {
            addAnimationElementInWindow(element)
        })
        console.log('duy')
    }
    startAnimationScroll()

    var previousScroll = 0
    header = $('header');
    $(window).scroll(function() {
        var currentScroll = $(this).scrollTop();
        // console.log(previousScroll + " and " + currentScroll)
        if(currentScroll > header.height()) {
            if (currentScroll > previousScroll) {
                header.css('top', - header.height() + 'px')
                header.removeClass('bx-sd')
            } else {
                header.css('top', 0 )
            }
        }
        previousScroll = currentScroll;
        
        startAnimationScroll()
    })

    function handleResponsiveNav() {
        $('.nav-responsive').click(() => {
            $('nav .menu').toggleClass('show')
            $('.nav-responsive .close-btn').toggleClass('show-btn')
            $('.nav-responsive .list-btn').toggleClass('hide-btn')
        })
    } handleResponsiveNav()

    function handleClickInNews() {
        var titles = document.querySelectorAll('.title .title__selection div')
        var panes = document.querySelectorAll('section.panes')
        
        titles.forEach(function (item, index) {
            let pane = panes[index]
            item.onclick = function () {
                console.log(pane)
                document.querySelector('.title .title__selection div.active').classList.remove('active')
                document.querySelector('.panes.active').classList.remove('active')
                this.classList.add('active')
                pane.classList.add('active')
            }
        })
    } handleClickInNews()
    
    $('.autoplay').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrow: false,
        dots: true,
        infinite: true,
        prevArrow:`<button type='button' class='slick-prev pull-left'><i class="fa-solid fa-angle-left arrow-left"></i></button>`,
        nextArrow:`<button type='button' class='slick-next pull-right'><i class="fa-solid fa-angle-right arrow-right"></button>`
    })

    function handleClickInShop() {
        $.each($('.brand'), function(idx, item) {
            item.onclick = function(e) {
                $('.brand.active').removeClass('active');
                item.classList.add('active');
                $('.cars-list.active').removeClass('active');
                $('.cars-list')[idx].classList.add('active');
            }
        })
    }handleClickInShop()

    function handleSearchProduct () {
        let input = $('#search__product')
        let carNames = $('.car h3')
        input.on('input', function() {
            if (input.val().trim() !== '') {
                $.each(carNames, function(idx, carName) {
                    carName.parentElement.style.display = 'none'
                    if (carName.innerText.includes(input.val().toUpperCase())) {
                        // console.log(carName.innerText, input.val())
                        carName.parentElement.style.display = 'block'
                    }
                })
            }
            else {
                $.each(carNames, function(idx, carName) {
                    carName.parentElement.style.display = 'block'
                })
            }
        })

        $('.container .search__box button').on('click', function () {
            this.previousElementSibling.classList.toggle('active')
            this.previousElementSibling.focus()
        })
    }
    handleSearchProduct()

    // render cars
    let carBtns = document.querySelectorAll('.contact_to_buy')
    carBtns.forEach(function(item, idx) {
        item.addEventListener('click', function (){
            console.log(idx)
            let parent = this.parentElement
            document.querySelector('.car-render__box').innerHTML = 
            `<div class="description">
                <h1>${parent.querySelector('h3').innerText}</h1>
            </div>
            <div class="ga">
                <div class="main_ga flex">
                    <img src="${parent.querySelector('img').src}" id="main_Img" alt="Cher1"/>
                </div>
            </div>`

            //tạo một mảng chứa 'carBtns.length' phần tử, mỗi phần tử là một object chứa 8 thông tin cần render 
            //của 'described-render__box' sau đo mỗi lần 'click' thì 'chọc' vào mảng lấy phần tử ra render.
        
            document.querySelector('.described').innerHTML = `
                <div class="feature">
                    <h3>${vehicleInfomation[idx].price}</h3>
                    <p>Starting MSRP</p>
                </div>
                <div class="feature">
                    <h3>${vehicleInfomation[idx].MPG}</h3>
                    <p>MPG city/hwy</p>
                </div>
                <div class="feature"> 
                    <h3>${vehicleInfomation[idx].maxAvailableHp}</h3>
                    <p>Max Available hp</p>
                </div>
                <div class="feature">
                    <h3>${vehicleInfomation[idx].maxCargoVolume}</h3>
                    <p>Max cargo volume</p>
                </div>
            `
        })
    })

    let vehicleInfomation =[    
        // CHEVROLET
        {
            price: '1.279.000.000 VNĐ',
            MPG: '14/20',
            maxAvailableHp: 120,
            maxCargoVolume: 144.7
        },
        {
            price: '775.000.000 VNĐ',
            MPG: '18/20',
            maxAvailableHp: 98.2,
            maxCargoVolume: 140.2
        },
        {
            price: '749.000.000 VNĐ',
            MPG: '16/20',
            maxAvailableHp: 112.9,
            maxCargoVolume: 145
        },
        {
            price: '499.000.000 VNĐ',
            MPG: '16/20',
            maxAvailableHp: 120.9,
            maxCargoVolume: 152.8
        },
        {
            price: '509.000.000 VNĐ',
            MPG: '16/20',
            maxAvailableHp: 133.4,
            maxCargoVolume: 152.5
        },
        {
            price: '599.000.000 VNĐ',
            MPG: '17/20',
            maxAvailableHp: 111.1,
            maxCargoVolume: 150
        },
        {
            price: '1.215.000.000 VNĐ',
            MPG: '12/20',
            maxAvailableHp: 101.1,
            maxCargoVolume: 140
        },
        {
            price: '779.000.000 VNĐ',
            MPG: '14/20',
            maxAvailableHp: 132.6,
            maxCargoVolume: 154.5
        },
        {
            price: '1.499.000.000 VNĐ',
            MPG: '18/20',
            maxAvailableHp: 142.2,
            maxCargoVolume: 136.8
        },
        {
            price: '711.000.000 VNĐ',
            MPG: '15/20',
            maxAvailableHp: 132.8,
            maxCargoVolume: 150.2
        },
        {
            price: '318.000.000 VNĐ',
            MPG: '10/20',
            maxAvailableHp: 100.6,
            maxCargoVolume: 112
        },
        // MER
        {
            price: '11.590.000.000 VNĐ',
            MPG: '20/20',
            maxAvailableHp: 160,
            maxCargoVolume: 160
        },
        {
            price: '2.828.000.000 VNĐ',
            MPG: '19/20',
            maxAvailableHp: 155.6,
            maxCargoVolume: 152.5
        },
        {
            price: '8.399.000.000 VNĐ',
            MPG: '17/20',
            maxAvailableHp: 122.6,
            maxCargoVolume: 144.2
        },
        {
            price: '2.429.000.000 VNĐ',
            MPG: '18/20',
            maxAvailableHp: 130.2,
            maxCargoVolume: 145.2
        },
        {
            price: '1.669.000.000 VNĐ',
            MPG: '16/20',
            maxAvailableHp: 140.6,
            maxCargoVolume: 154.2
        },
        {
            price: '2.050.000.000 VNĐ',
            MPG: '16/20',
            maxAvailableHp: 140.6,
            maxCargoVolume: 149.7
        },
        {
            price: '5.499.000.000 VNĐ',
            MPG: '16/20',
            maxAvailableHp: 150.6,
            maxCargoVolume: 152.4
        },
        {
            price: '3.099.000.000 VNĐ',
            MPG: '17/20',
            maxAvailableHp: 132.2,
            maxCargoVolume: 150.5
        },
        {
            price: '1.859.000.000 VNĐ',
            MPG: '16/20',
            maxAvailableHp: 140.6,
            maxCargoVolume: 145.5
        },
        {
            price: '8.199.000.000 VNĐ',
            MPG: '18/20',
            maxAvailableHp: 145.6,
            maxCargoVolume: 154
        },
        {
            price: '5.059.000.000 VNĐ',
            MPG: '16/20',
            maxAvailableHp: 145.6,
            maxCargoVolume: 150
        },
        // BMW
        {
            price: '4.359.000.000 VNĐ',
            MPG: '18/20',
            maxAvailableHp: 132.6,
            maxCargoVolume: 154.5
        },
        {
            price: '4.609.000.000 VNĐ',
            MPG: '18/20',
            maxAvailableHp: 140,
            maxCargoVolume: 152.8
        },
        {
            price: '3.409.000.000 VNĐ',
            MPG: '15/20',
            maxAvailableHp: 150.6,
            maxCargoVolume: 154.5
        },
        {
            price: '5.179.000.000 VNĐ',
            MPG: '18/20',
            maxAvailableHp: 152.6,
            maxCargoVolume: 130.5
        },
        {
            price: '2.499.000.000 VNĐ',
            MPG: '14/20',
            maxAvailableHp: 132.6,
            maxCargoVolume: 130.5
        },
        {
            price: '1.779.000.000 VNĐ',
            MPG: '15/20',
            maxAvailableHp: 140.8,
            maxCargoVolume: 152.5
        },
        {
            price: '3.399.000.000 VNĐ',
            MPG: '17/20',
            maxAvailableHp: 132.6,
            maxCargoVolume: 150.8
        },
        // POR
        {
            price: '3.600.000.000 VNĐ',
            MPG: '17/20',
            maxAvailableHp: 150.2,
            maxCargoVolume: 132
        },
        {
            price: '4.090.000.000 VNĐ',
            MPG: '18/20',
            maxAvailableHp: 144.9,
            maxCargoVolume: 130.8
        },
        {
            price: '4.650.000.000 VNĐ',
            MPG: '17/20',
            maxAvailableHp: 139.9,
            maxCargoVolume: 122.8
        },
        {
            price: '3.817.000.000 VNĐ',
            MPG: '16/20',
            maxAvailableHp: 133.5,
            maxCargoVolume: 154.2
        },
        {
            price: '2.992.000.000 VNĐ',
            MPG: '17/20',
            maxAvailableHp: 136.5,
            maxCargoVolume: 147.2
        },
    ]


    
    
}) 


