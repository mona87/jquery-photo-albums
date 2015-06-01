$(document).ready(function() {


    var $album1 = $('#1');
    var $album2 = $('#2');
    var $album3 = $('#3');
    var $album4 = $('#4');
    var $album5 = $('#5');
    var $album6 = $('#6');
    var $photo = $('.photo');
    var $backBtn = $('#back-btn');
    var $albumBtn = $('.album')
    var bool = true;

    var albumArray = [$album1, $album2, $album3, $album4, $album5, $album6];

    //show home page images
    getImg('main');


    //loads album
    $albumBtn.on('click', function(e) {
        getImg($(this).attr('id'));
    });

    //gets the images from the server
    function getImg(category) {
        $.get('http://tiny-pizza-server.herokuapp.com/collections/mona', function(info) {
            var array = []
            for (var i = 0; i < info.length; i++) {
                if (info[i].album === category) {
                    // console.log(info[i].album );
                    array.push(info[i]);
                }
            }
            console.log('array ' + array);
            for (var i = 0; i < array.length; i++) {
                $(albumArray[i]).css('background-image', 'url(' + array[i].url + ')');

                $(albumArray[i]).css('background-size', 'cover');

            }
        }, 'json');

    }



    //changes the layout to show side-nav
    $photo.on('click', function(e) {

        if (bool) {

            $('.title').hide();
            $('#wrapper').css('padding-left', '150px');
            // $('#wrapper').css('margin-right' );
            var category = $(this).attr('class').split(' ')[1];
            getImg(category);
            bool = false;
        } else {
           
            //shows full image
            // $('.side-nav').hide();
           
            $('#wrapper').css('padding-left', '0');
             console.log('true');
            $target = $(e.target);

            var url = $target.css('background-image');
            console.log($target.css('background-image'));

            $('.full-img').css('background-image', url);
            $('.full-img').css('background-size', 'cover');
            $('.full-img').css('background-repeat', 'no-repeat');
            $('.full-img').css('width', '80%');
            $('.full-img').css('height', '0');
            $('.full-img').css('padding-bottom', '50%');
            $('.full-img').css('margin', '0 auto');
            $('.full-img').css('border', '1px solid black');
            $('.full-img').css('box-shadow', '0 0 5px black');
            $('.full-title').html('Photo ' + $target.attr('id'));
            //hide and show
            $('.main-view').hide();
            $('.full-title').show();
            $('.full-img-holder').show();
            $('.full-img').show();
        }

    })

    $backBtn.on('click', function(e) {
    	$('#wrapper').css('padding-left', '150px');
        $('.main-view').show();
        $('.full-title').hide();
        $('.full-img-holder').hide();
    })








})