$(document).ready(function(){
    var itens = localStorage.getItem('cart_itens')
    if(itens){
        $('#shopping-list').empty()
        $('#shopping-list').text(localStorage.getItem('cart_itens'))
    }
    $('.banners').slick({
        dots:true,
        arrows:false
    })
    $('.prateleira').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
    })

    $.getJSON("https://corebiz-test.herokuapp.com/api/v1/products",
    function(resp){
        $.each(resp, function(index, prop) {
            var card =
              "<div class='prateleira-itens' id='prateleira-itens" + index + "'>";
    
            card += "<img src='" + prop.imageUrl + "' alt='' width='100%'>";
            card += "<div class='prateleira-itens-info'style='background-color:#E6E8EA;'> "
            card += "<p>" + prop.productName + "</p>";
          
            var preco = prop.price.toString();
            preco =
              preco.substring(0, preco.length - 2) +
              "," +
              preco.substring(preco.length - 2);
    
            card += "<h3><b>por R$ " + preco + "</b></h3>";
            card += "<a style='background-color: black;color: white;padding: 8px 40px;text-decoration: none;margin-top: -5px;text-transform: uppercase;border-radius: 5px;margin-bottom:25px;'id='buy-button' href='#'>Comprar</a>";
            card += "</div>";
            card += "</div>";
    
            $(".prateleira").slick("slickAdd", card);
        });
    })
    $('#news-button').on('click', function(e){
        if($('#news-email').val() == '' ){
            alert('Erro')    
            $('.news-erro1').css('display','block')
            e.preventDefault()
        }
        else if($('#news-nome').val() == '' ){
            alert('Erro')    
            $('.news-erro2').css('display','block')
            e.preventDefault()
        }
        else{
            $.post('https://corebiz-test.herokuapp.com/api/v1/newsletter', {
                email: $('#news-email').val(),
                name: $('#news-nome').val()
            }).done(function(data){
                console.log(data)
                $('.newsletter').css('display','none')
                $('.newsletter-sucess').css('display','flex')
            }).error(function(data){
                console.log(data)

            })
            e.preventDefault()
        } 
    })
    $(document).on('click','#buy-button', function(e){
        e.preventDefault()
        var cart_itens =  parseInt($('#shopping-list').text())
        cart_itens += 1
        localStorage.setItem('cart_itens', cart_itens)
        $('#shopping-list').empty()
        $('#shopping-list').text(cart_itens)
    })
})