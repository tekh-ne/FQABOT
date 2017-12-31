$(document).ready(function() {
    // getCaptcha();
    getCategory();
    // getDate();
    hiddenComments();
    $(".who #Comments_Author").val("");
    $(".who #Comments_Email").val("");
    $(".who #Comments_SiteName").val("");
    $(".what #Comments_CommentText").val("");
    $(".what #captcha").val("");

    $(".who #Comments_Author").focusin(function() {
        $(".comment-author-val").css("display", "none");
    });

    $(".who #Comments_Email").focusin(function() {
        $(".comment-email-val").css("display", "none");
    });

    $(".what #captcha").focusin(function() {
        $("#comment-captcha-val").css("display", "none");
    });

    $('h2.blogpost-comment-count').click(function() {
        $('ul.comments').toggleClass('comments-show');
    });

    $('h2.add-comment').click(function() {
        $('fieldset.who').toggleClass('add-comment-show');
        $('fieldset.what').toggleClass('add-comment-show');
        $('button.btn-add-comment').toggleClass('add-comment-show');
    });

    $('a.comment-reply-button').click(function () {
        $('fieldset.who').toggleClass('add-comment-show');
        $('fieldset.what').toggleClass('add-comment-show');
        $('button.btn-add-comment').toggleClass('add-comment-show');
    });

    $('h2#commenter').click(function() {
        $('fieldset.what').toggleClass('add-comment-show');
        $('button.btn-add-comment').toggleClass('add-comment-show');
    });

    $("<div class='blog-home-mobile'><a href='/blog'><img class='img-responsive' src='/Themes/OrientSoftwareTheme/Content/Images/blog-home-btn.jpg'/></a></div>").insertAfter($("aside#tags-cloud"));

});

function validateInfo() {
    var result = true;
    if (!commmentCheckName()) {
        result = false;
    }
    if (!commmentCheckEmail()) {
        result = false;
    }
    if (!commmentCheckComment()) {
        result = false;
    }
    if (!checkCaptcha()) {
        result = false;
    }
    if (result) {        
        ContectCenteringModal("#success-form");
        $("#success-form").modal('show');
    }
}

function commmentCheckName() {
    var name = $(".who #Comments_Author").val().replace(/^\s+|\s+$/g, '');
    if (name == "") {
        $('.comment-author-val').text("Required(*)");
        $('.comment-author-val').css("display", "block");
        return false;
    }
    return true;
}

function commmentCheckEmail() {
    var email = $(".who #Comments_Email").val().replace(/^\s+|\s+$/g, '');
    if (email == "") {
        $('.comment-email-val').text("Required(*)");
        $('.comment-email-val').css("display", "block");
        return false;
    }
    var pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,63})?$/;
    if (!pattern.test(email)) {
        $(".comment-email-val").text("Invalid email format!");
        $(".comment-email-val").css("display", "block");
        return false;
    } else {
        $(".comment-email-val").text("");
        $(".comment-email-val").css("display", "none");
    }
    return true;
}

function commmentCheckComment() {
    var message = $(".what #Comments_CommentText").val().replace(/^\s+|\s+$/g, '');
    if (message == "") {
        $('.comment-val').text("Required(*)");
        $('.comment-val').css("display", "block");
        return false;
    }
    return true;
}

function checkCaptcha() {
    var captcha = $(".what #captcha").val().replace(/^\s+|\s+$/g, '');
    if (captcha == "") {
        $(".what #comment-captcha-val").text("Required(*)");
        $(".what #comment-captcha-val").css("display", "block");
        return false;
    }
    else {
        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            url: "/api/OSDService/Captcha",
            data: {captchaKey: captcha},
            dataType: "Text",
            timeout: 3000,
            success: function (data, status, xhr) {
                var result = xhr.getResponseHeader("result");
                if (result == "1") {
                    $(".what #comment-captcha-val").css("display", "none");
                    return true;
                }
                else if (result == "0") {
                    $(".what #comment-captcha-val").text("Incorrect code!");
                    $(".what #comment-captcha-val").css("display", "block");
                    return false;
                }
            }

        })
       
        return true;
    }
}


// function getCaptcha() {
//     var captchaElement = $('.what #comment-imgcaptcha');
//     $.ajax({
//         type: "GET",
//         contentType: "application/json; charset=utf-8",
//         url: "/api/OSDService/Captcha",
//         dataType: "Text",
//         timeout: 3000,
//         success: function (data, status, xhr) {
//             captchaElement.attr("src", "data:image/png;base64," + data.replace(/"/gi, ""));
//         },
//         error: function (xhr) {
//             var result = xhr;
//         }
//     });
// }

function ContectCenteringModal(modal) {
    $(modal).
        css({
            visibility: 'hidden',
            display: 'block'
        });

    var $self = $(modal).children('div.modal-dialog');
    $self.css('margin-top', "");
    $self.css('margin-left', "");
    var userScreenHeight = $(window).height();
    var userScreenWidth = $(window).width();
    var initModalHeight = $self.outerHeight();
    var initModalWidth = $self.outerWidth();
    var maginTop = (userScreenHeight - initModalHeight) / 2;
    var marginLeft = (userScreenWidth - initModalWidth) / 2;
    if ((initModalHeight > userScreenHeight) || (initModalWidth > userScreenWidth)) {
        $self.css('overflow', 'auto');
    } else {
        $self.css('margin-top', maginTop);
        $self.css('margin-left', marginLeft);
    }

    $(modal).
       css({
           visibility: 'visible',
           display: 'none'
       });
}

function closeModal() {
    $("#success-form").modal('hide');
}

function getCategory() {
    var caName = $("p.taxonomy-field").children('a').text();
    var inCaName = "in <b>" + caName + "</b>";
    $('div.header-info').children('span.in-category').html(inCaName);
}

// function getDate() {
//     var daTitle = $('div.blog-banner-container').children('p.date').text();
//     $('div.header-info').children('span.date-post').text(daTitle);
//     $('div.blog-banner-container').children('p.date').remove();
// }

function hiddenComments() {
    $('div.blog-content ul.comments li').each(function() {
        if ($(this).children('article').hasClass('comment-hidden')) {
            $(this).addClass('comment-hidden');
        }
   })
}
