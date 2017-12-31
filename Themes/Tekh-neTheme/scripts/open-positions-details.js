var applyModal = "#apply-form";
var errorModal = "#error-form";
var successModal = "#success-form";

$(document).ready(function () {
    clickShowTitle();
    getCaptcha();
    refreshModal();
    closeApplyModal();
    closeSuccessModal();
    closeErrorModal();
    addDivLoading();
    closeApplyModal();
    centeringModalPositionAtFirst(applyModal);
    centeringModalPositionAtFirst(errorModal);
    centeringModalPositionAtFirst(successModal);

    centeringModalPositionShow(applyModal);
    centeringModalPositionShow(errorModal);
    centeringModalPositionShow(successModal);

    $(window).resize(function () {
        if ($(applyModal).hasClass('in')) {
            centeringModalPosition(applyModal);
        }

        centeringModalPosition(errorModal);
        centeringModalPosition(successModal);
    });

    $("#job-heading").sticky({
        topSpacing: 0,
        zIndex: 1023,
        getWidthForm: '.wrapper',
        responsiveWidth: true
    });
});


function sendApplyEmail() {
    var email = $("#txtEmail").val().replace(/^\s+|\s+$/g, '');
    var subject = $("#hdfSubject").val();
    var rcmPstId = $("#hdfRcmPstID").val();
    var jobCode = $("#hdfJobCode").val();
    var captcha = $("#txtCaptcha").val();
    var dataPost = {};
    dataPost.Email = email;
    dataPost.Subject = subject;
    dataPost.RcmPstId = rcmPstId;
    dataPost.JobCode = jobCode;
    dataPost.Captcha = captcha;
    showDelayDialog();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "/api/OSDService/applyemail",
        data: JSON.stringify(dataPost),
        dataType: "text",
        timeout: 30000,
        success: function (data, status, xhr) {
            var result = '';
            var headers = JSON.parse(data).headers;
            for (var i = 0; i < headers.length; i++) {
                var item = headers[i];
                if (item.key === 'result') {
                    result = item.value[0];
                    break;
                }
            }
            if (result == "1") {
                $("#ercaptcha").css("display", "none");
                closeModalDiaglog(applyModal);
                //getCaptcha();
                hideDelayDialog();
                showModalDialog(successModal);
            } else if (result == "0") {
                hideDelayDialog();
                $("#ercaptcha").text("Incorrect code(*)");
                $("#ercaptcha").css({ display: 'block', color: 'red' });
            }
        },
        error: function () {
            closeModalDiaglog(applyModal);
            hideDelayDialog();
            showModalDialog(errorModal);
        }
    });
}

function getPositionDetailForApply(id) {
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: "/api/OSDService/OpenPositions/?id=" + id,//fix later
        dataType: "json",
        timeout: 10000,
        success: function (data) {
            var positionDetail = data.positionDetail;
            var dataApply = "<div class='app-email-data'>"
                + "<input type='hidden' id='hdfSubject' value='Apply for " + positionDetail.JobTitle + " position'>"
                + "<input type='hidden' id='hdfRcmPstID' value='" + positionDetail.RcmPstId + "'>"
                + "<input type='hidden' id='hdfJobCode' value='" + positionDetail.JobCode + "'>"
                + "<input type='hidden' id='hdfJobTitle' value='" + positionDetail.JobTitle + "'></div>";
                + "<input type='hidden' id='txtCaptcha' />";
            $('article#content').append(dataApply);
        }
    });
}

function checkEmail() {
    var email = $("#txtEmail").val().replace(/^\s+|\s+$/g, '');
    if (email == "") {
        $("#txtEmail").css("border-color", "red");
        return false;
    }
    var pattern = '^[a-z0-9][a-z0-9_\.-]{0,}[a-z0-9]@[a-z0-9][a-z0-9_\.-]{0,}[a-z0-9][\.][a-z0-9]{2,4}$';
    if (email.match(pattern) == null) {
        $("#eremail").text("Invalid email format!");
        $("#eremail").css({ display: "block", color: "red" });
        return false;
    }
    $("#eremail").css("display", "none");
    $("#txtEmail").css("border-color", "#cccccc");
    return true;
}


function checkCaptcha() {
    var captcha = $("#txtCaptcha").val();
    if (captcha == "") {
        $("#ercaptcha").text("Required(*)");
        $("#txtCaptcha").css("border-color", "red");
        $("#ercaptcha").css({ display: "block", color: "red" });
        return false;
    }
    else {
        return true;
    }
}

function getCaptcha() {

    var captChaCode;
    var captchaElement = $('#imgCaptcha');

    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: "/api/OSDService/Captcha",
        dataType: "Text",
        timeout: 30000,
        success: function (data, status, xhr) {
            captChaCode = xhr.getResponseHeader("key");
            captchaElement.attr("src", "data:image/png;base64," + data.replace(/"/gi, ""));
            localStorage.setItem("captchaCode", captChaCode);
        },
        error: function (xhr) {
            var result = xhr;
        }
    });
}

function checkAll() {
    var result = true;

    if (!checkEmail()) {
        result = false;
    }

    if (!checkCaptcha()) {
        result = false;
    }

    if (result) {
        sendApplyEmail();
    }
}

function addDivLoading() {
    $('<div class="loading"> <img class="img-loader" src="../../Themes/OrientSoftwareTheme/Content/Images/loader.gif"/></div>').insertAfter('#content');
}

function showModalDialog(modal) {
    $(modal).modal('show');
}

function showDelayDialog() {
    $('div.loading').css('display', 'block');
};

function closeModalDiaglog(modal) {
    $(modal).modal('hide');
};

function hideDelayDialog() {
    $('div.loading').css('display', 'none');
};

function fixPlaceHolderForIe() {
    //Assign to those input elements that have 'placeholder' attribute
    $('input[placeholder]').each(function () {
        var input = $(this);
        $(input).val(input.attr('placeholder'));

        $(input).focus(function () {
            if (input.val() == input.attr('placeholder')) {
                input.val('');
            }
        });

        $(input).blur(function () {
            if (input.val() == '' || input.val() == input.attr('placeholder')) {
                input.val(input.attr('placeholder'));
            }
        });
    });
}

function refreshModal() {
    $('#apply-form').on('hidden.bs.modal', function () {
        $(this).children('div.modal-dialog').css('margin-top', '');
        $(this).find('input').val('').css("border-color", "").end();
        $('.modal-body').children('p.eremail').css("display", "none");
        $('.modal-body').children('p.ercaptcha').css("display", "none");
    });
}

function centeringModalPositionAtFirst(modal) {
    $(modal).
        css({
            visibility: 'hidden',
            display: 'block',
        });

    var $self = $(modal).children('div.modal-dialog');
    $self.css('margin-top', "");
    var userScreenHeight = $(window).height();
    var initModalHeight = $self.outerHeight();
    var maginTop = (userScreenHeight - initModalHeight) / 2;
    if ((initModalHeight > userScreenHeight)) {
        $self.css('overflow', 'auto');
    } else {
        $self.css('margin-top', maginTop);
    }

    $(modal).
        css({
            visibility: 'visible',
            display: 'none',
        });
}

function centeringModalPositionShow(modal) {
    $(modal).on('shown.bs.modal', function () {
        var $self = $(modal).children('div.modal-dialog');
        $self.css('margin-top', "");
        var userScreenHeight = $(window).height();
        var initModalHeight = $self.outerHeight();
        var marginTop = (userScreenHeight - initModalHeight) / 2;
        if ((initModalHeight > userScreenHeight)) {
            $self.css('overflow', 'auto');
            $self.stop().animate({
                "opacity": "1",
                marginTop: "30px",
            }, 450, "linear");
        } else {
            $self.stop().animate({
                "opacity": "1",
                marginTop: marginTop,
            }, 450, "linear");
        }
    });
}

function closeApplyPositionModal() {
    $('#apply-form').children('div.modal-dialog').stop().animate({
        "opacity": "0",
        "margin-top": "0",
    }, 450, function () {
        $('#apply-form').modal('hide');
        $('article#content > div.app-email-data').remove();
    });
}

function closeSuccessPositionModal() {
    $('#success-form').children('div.modal-dialog').stop().animate({
        "opacity": "0",
        "margin-top": "0",
    }, 450, function () {
        $('#success-form').modal('hide');
        $('body').removeClass('modal-open');
        $('body > div.modal-backdrop').remove();
        $('article#content > div.app-email-data').remove();
    });
}

function closeErrorPositionModal() {
    $('#error-form').children('div.modal-dialog').stop().animate({
        "opacity": "0",
        "margin-top": "0",
    }, 450, function () {
        $('#error-form').modal('hide');
        $('body').removeClass('modal-open');
        $('body > div.modal-backdrop').remove();
        $('article#content > div.app-email-data').remove();
    });
}

function closeApplyModal() {
    $('#apply-form').children('div.modal-dialog').stop().animate({
        "opacity": "0",
        "margin-top": "0",
    }, 450, function () {
        $('#apply-form').modal('hide');
    });
}

function closeSuccessModal() {
    $('#success-form').children('div.modal-dialog').stop().animate({
        "opacity": "0",
        "margin-top": "0",
    }, 450, function () {
        $('#success-form').modal('hide');
        $('body').removeClass('modal-open');
        $('body > div.modal-backdrop').remove();
    });
}

function closeErrorModal() {
    $('#error-form').children('div.modal-dialog').stop().animate({
        "opacity": "0",
        "margin-top": "0",
    }, 450, function () {
        $('#error-form').modal('hide');
        $('body').removeClass('modal-open');
        $('body > div.modal-backdrop').remove();
    });
}


function centeringModalPosition(modal) {
    var $self = $(modal).children('div.modal-dialog');
    $self.css('margin-top', "");
    var userScreenHeight = $(window).height();
    var initModalHeight = $self.outerHeight();
    var maginTop = (userScreenHeight - initModalHeight) / 2;
    if ((initModalHeight > userScreenHeight)) {
        $self.css('overflow', 'auto');
    } else {
        $self.css('margin-top', maginTop);
    }
}

function clickShowTitle() {
    $('a#apply-click').on('click', function () {
        var title = $(this).parents('li').children('div.job-info').children('a').text();
        var posId = $(this).data('id');
        $('#apply-form').find('.modal-title').text('Apply for ' + title + ' position');
        getPositionDetailForApply(posId);
    });
}

var recaptcha_callback = function (response) {
    //debugger;
    $("#txtCaptcha").val(response);
    console.log('g-recaptcha-response: ' + response);
};