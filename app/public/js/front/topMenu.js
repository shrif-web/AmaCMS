if($('.current_page_item').length){
    var $el, leftPos, newWidth;
    $("#header_menu").append("<li id='magic-line'></li>");
    var $magicLine = $("#magic-line");
    $magicLine
        .width($(".current_page_item").width())
        .css("left", $(".current_page_item a").position().left)
        .data("origLeft", $magicLine.position().left)
        .data("origWidth", $magicLine.width());

    $("#header_menu li")
        .find("a")
        .hover(
            function() {
                $el = $(this);
                leftPos = $el.position().left;
                newWidth = $el.parent().width();

                $magicLine.stop().animate({
                    left: leftPos,
                    width: newWidth
                });
            },
            function() {
                $magicLine.stop().animate({
                    left: $magicLine.data("origLeft"),
                    width: $magicLine.data("origWidth"),
                });
            }
        );
}