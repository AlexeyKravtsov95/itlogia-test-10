$(document).ready(function () {
    const loader = $('.loader');

    new WOW({
        animateClass: "animate__animated",
    }).init();

    $('.macaroon__image').magnificPopup({
        type:'image',
    });

    $('#burger').click(function () {
        $('#menu').addClass('open');
        console.log("Open menu");
    });

    $('#menu *').on('click', (event) => {
        $('#menu').removeClass('open');
        event.stopPropagation();
    });

    $('.macaroons__items').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        arrows: true,
        responsive: [
            {
                breakpoint: 1168,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    $('#submit').click(function () {
        const orderText = $('#order-text');
        const name = $('#name');
        const phone = $('#phone');
        let error = $('.error-input');
        let hasError = false;
        const url = 'https://testologia.ru/checkout';
        const fields = [orderText, name, phone];

        loader.css('display', 'flex');
        error.hide();

        fields.forEach((field) => {
            if (!field.val()) {
                field.next().show();
                hasError = true;
            }
        })

        if(!hasError) {
            $.ajax({
                method: 'POST',
                url: url,
                data: { product: orderText.val(), name: name.val(), phone: phone.val() }
            })
                .done(function (response) {
                    loader.hide();
                    console.log(response);
                    if (response.success === 1) {
                        const infoHeight = $('.order__info').height();
                        $('.order__info').fadeOut(300, function () {
                            $('.success-message').css('display', 'flex').fadeIn(300);
                        })
                    }
                    if (response.success === 0) {
                        alert("Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ")
                    }
                })
        } else {
            loader.hide();
        }
    });
})