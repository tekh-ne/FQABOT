var panelShare = "<div class=\"panelShare clearfix\"><div class=\"panelShare-header\"><h3 class=\"panelShare-header-text\">SHARE</h3></div>"+
                    "  <div class=\"ShareIcon-area ShareIcon-area-twiter\"><a class =\"panelShare-twiterIcon panelShare-Icon clear clearfix\" ></a></div>"+
                    "  <div class=\"ShareIcon-area\"><a class =\"panelShare-linkedinIcon panelShare-Icon clear clearfix\"></a></div>"+
                    "  <div class=\"ShareIcon-area\"><a class =\"panelShare-facebookIcon panelShare-Icon clear clearfix\"></a></div>"+
                 " </div>"                 
; 

var pageTitle ;
var pageDesc;
var pageUrl = document.location.href;

jQuery(document).ready(function () {
    var currentUrl = window.location.pathname;
    if (currentUrl.indexOf("/...") > - 1) {
        pageTitle = "....";
        pageDesc = "....t.";
    } else {
        pageTitle = $('title').html();
        pageDesc = $('meta[name="description"]').attr('content');
    }
    $("#modalPanelShareBlog").css("display", "block");
    var isShowPanelShare = $("#modalSharingPanel");
    if (isShowPanelShare.length > 0) {
        isShowPanelShare.html(panelShare);
        fixedSharePanel(); 
    }


    $(".panelShare-facebookIcon").click(function popupShareFb() {
        fbShare(pageUrl, pageTitle, pageDesc, '../../Themes/Tekh-neTheme/Content/Images/logo_osd.jpg', 600, 400);
    });

    $(".panelShare-twiterIcon").click(function popupShareTwitter() {
        TwitterShare(pageUrl, pageTitle, 'OrientInfo ', 600, 400);
    });

    $(".panelShare-linkedinIcon").click(function popupShareTwitter() {
        var source = "Tekh-ne Soluciones de NEgocio";
        LinkedInShare(pageUrl, pageTitle, pageDesc, source, 600, 600);
    });

    $("#blog-panel-share-facebook").click(function popupShareFb() {

        fbShare(pageUrl, pageTitle, pageDesc, '../../Themes/Tekh-neTheme/Content/Images/logo_tekh-ne.png', 600, 400);
    });

    $("#blog-panel-share-twitter").click(function popupShareTwitter() {
        TwitterShare(pageUrl, pageTitle, 'Tekh-ne ', 600, 400);
    });

    $("#blog-panel-share-linkedin").click(function popupShareTwitter() {
        var source = "Tekh-ne Soluciones de Negocio";
        LinkedInShare(pageUrl, pageTitle, pageDesc, source, 600, 600);
    });

    $(".panelShare-twiterIcon").hover(function () {
        $(this).css('background', 'url("../../Themes/Tekh-neTheme/Content/Images/icon_twiiter.png") no-repeat center center');
        $(this).css('background-size', '100% 100%');
        $(this).animate({
            width: "36px",
            marginTop: '7px',
            height: "36px"
        }, 200);
    }, function () {
        $(this).css('background-size', '31px 31px');
        $(this).animate({
            width: "30px",
            marginTop: '10px',
            height: "30px"
        }, 100).promise().done(function () {
            $(".panelShare-twiterIcon").css('background', 'url("../../Themes/Tekh-neTheme/Content/Images/twiter-icon.png") no-repeat center center');
        });
    }
    );

    $(".panelShare-linkedinIcon").hover(function () {
        $(this).css('background', 'url("../../Themes/Tekh-neTheme/Content/Images/icon_linkedin.png") no-repeat center center');
        $(this).css('background-size', '100% 100%');
        $(this).animate({
            width: "36px",
            marginTop: '7px',
            height: "36px"
        }, 200);
    }, function () {
        $(this).css('background-size', '31px 31px');
        $(this).animate({
            width: "30px",
            marginTop: '10px',
            height: "30px"
        }, 100).promise().done(function () {
            $(".panelShare-linkedinIcon").css('background', 'url("../../Themes/Tekh-neTheme/Content/Images/linkedin-icon.png") no-repeat center center');
        });
    }
    );

    $(".panelShare-facebookIcon").hover(function () {
        $(this).css('background', 'url("../../Themes/Tekh-neTheme/Content/Images/icon_facebook.png") no-repeat center center');
        $(this).css('background-size', '100% 100%');
        $(this).animate({
            width: "36px",
            marginTop: '7px',
            height: "36px"
        }, 200);
    }, function () {
        $(this).css('background-size', '31px 31px');
        $(this).animate({
            width: "30px",
            marginTop: '10px',
            height: "30px"
        }, 100).promise().done(function () {
            $(".panelShare-facebookIcon").css('background', 'url("../../Themes/Tekh-neTheme/Content/Images/facebook-icon.png") no-repeat center center');
        });
    }
    );
});
function fbShare(url, title, descr, image, winWidth, winHeight) {
    var winTop = (screen.height / 2) - (winHeight / 2);
    var winLeft = (screen.width / 2) - (winWidth / 2);
    window.open('http://www.facebook.com/sharer.php?s=100&p[title]=' + title + '&p[summary]=' + descr + '&p[url]=' + url + '&p[images][0]=' + image, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
};

function TwitterShare(url, text, via, winWidth, winHeight) {
    var winTop = (screen.height / 2) - (winHeight / 2);
    var winLeft = (screen.width / 2) - (winWidth / 2);
    window.open('http://twitter.com/share?url=' + url + '&text=' + text + '&via=' + via, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
};

function LinkedInShare(url, title, summary, source, winWidth, winHeight) {
    var winTop = (screen.height / 2) - (winHeight / 2);
    var winLeft = (screen.width / 2) - (winWidth / 2);
    window.open('https://www.linkedin.com/shareArticle?mini=true&url=' + url + '&title=' + title + '&summary=' + summary + '&source=' + source, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
};

function fixedSharePanel() {
    $(window).bind('scroll', function() {
        if ($(window).scrollTop() > 10) {
            $(".panelShare ").css("position", "fixed");
            $(".panelShare ").css("top", "4%");
        } else {
            $(".panelShare ").css("position", "absolute");
            $(".panelShare ").css("top", "inherit");
        }
    });
}; 

//function shareGmail() {
//    var pageUrl = document.location.href;
//    var urlOpenSentGmail = "https://mail.google.com/mail/?view=cm&fs=1&to&su=" + pageTitle + "&body=" + pageUrl + "--" + pageDesc;
//    window.open(urlOpenSentGmail, '_blank');
//};

//function shareHotmail() {
//    var pageUrl = document.location.href;
//    var urlOpenSentGmail = "http://www.hotmail.msn.com/secure/start?action=compose&to&subject=" + pageTitle + "&body=" + pageUrl + "--" + pageDesc;
//    window.open(urlOpenSentGmail, '_blank');
//};

