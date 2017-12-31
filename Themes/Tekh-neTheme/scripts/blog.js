$(document).ready(function () {
    addSearch();
    addCategories();
    addTagsCloud();
    addShortLineCategories();
    addShortLineTagsCloud();
    centeringBlogLogo();

    $(window).resize(function () {
        if ($(window).width() > 1200) {
            var screenSize = $(window).width();
            var bannerTextSize = $('div.blog-banner-container').width();
            var widthLogo = (screenSize - bannerTextSize) / 2;
            $('div.blog-logo').width(widthLogo);
        }
    });

    $("#author").insertAfter("#combo");
})  

function addShortLineCategories() {
   $('<div class="short-line"></div>').insertBefore($('aside#blog-categories > ul'));
};

function addShortLineTagsCloud() {
    $('<div class="short-line"></div>').insertBefore($('aside#tags-cloud > ul'));
};

function centeringBlogLogo() {
    var screenSize = $(window).width();
    var bannerTextSize = $('div.blog-banner-container').width();
    var widthLogo = (screenSize - bannerTextSize) / 2;
    $('div.blog-logo').width(widthLogo);
}

function addSearch() {
    var $blogSer = $('#blog-search');
    if ($blogSer.length) {
        var $divSer = $('div.blog-container');
        if ($divSer.length > 0) {
            $divSer.append($blogSer);
        }
        else {
            $blogSer.remove();
        }
    }
};

function addCategories() {
    var $blogSer = $('#blog-categories');
    if ($blogSer.length) {
        var $divSer = $('div.blog-container');
        if ($divSer.length > 0) {
            $divSer.append($blogSer);
        }
        else {
            $blogSer.remove();
        }
    }
};

function addTagsCloud() {
    var $blogSer = $('#tags-cloud');
    if ($blogSer.length) {
        var $divSer = $('div.blog-container');
        if ($divSer.length > 0) {
            $divSer.append($blogSer);
        }
        else {
            $blogSer.remove();
        }
    }
};  