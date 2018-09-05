$(function(){
    // login tab switch
    $('.tab-way .tab').each(function(i) {
        $(this).click(function(){
            $(this).addClass('on').siblings().removeClass('on');
            $('.login-div .tabdiv').eq(i).removeClass('hide').addClass('show').siblings().removeClass('show').addClass('hide');
        });
    });

    // clear input text
    $('#loginAc .ipt input').each(function(){
        $(this).focus(function(){
            $(this).siblings('span').css('visibility','visible');
            $(this).siblings('span').click(function(){
                $(this).siblings('input').val('');
            });
        });
        $(this).blur(function(){
            $(this).siblings('span').css('visibility','hidden');
        });
    });

    // login check
    $('#loginBtn').click(function(){
        var loginUser = $('#loginUser'),
            loginPwd  = $('#loginPwd'),
            autologin = $('#autologin');
        if( $.trim(loginUser.val()) == '' || $.trim(loginPwd.val()) == '' ){
            $('#loginAc .error').show().text('账号或密码输入错误');
            return false;
        }
        if( $('#loginCode').val() == '' )  /* || 错误 */
        {
            $('#loginCode').siblings('.vcode-note').removeClass('hide').addClass('show');
            return false;
        }

        /*$.ajax({
            type: "POST",
            url: "",
            data: "name=John&location=Boston",
            success: function(msg){
                alert( "Data Saved: " + msg );
            }
        });*/
    });


    // register
    var phoneRegExp = /^1[34578]\d{9}$/;
    var phone = $('#tel'),
        pwd = $('#pwd'),
        pwdRe = $('#pwdRe');

    function ipt_err_note(ele,txt){
        ele.parent('.ipt-text').addClass('ipt-err');
        ele.siblings('.ipt-note').text(txt);
    }
    function ipt_right_note(ele){
        ele.parent('.ipt-text').removeClass('ipt-err').addClass('ipt-right');
        ele.siblings('.ipt-note').text('');
    }
        
    phone.blur(function(){
        if( !(phoneRegExp.test($(this).val())) ){
            ipt_err_note($(this),'不是正确的号码格式');
            return false;
        }else {
            ipt_right_note($(this));
            return true;
        }
    });
    pwd.blur(function(){
        if ( $.trim($(this).val()) == '') {
            ipt_err_note($(this),'请输入密码');
            return false;
        }else {
            ipt_right_note($(this));
            return true;
        }
    });
    pwdRe.blur(function(){
        if($.trim($(this).val()) == ''){
            ipt_err_note($(this),'请输入密码');
            return false;
        }else
        if( $(this).val() != pwd.val() ){
            ipt_err_note($(this),'密码不一致');
            return false;
        }else {
            ipt_right_note($(this));
            return true;
        }
    });
    // 验证码 --待
    var code = $('#code');

    var regisFormData = $('#regiForm').serialize();

    $('#subBtn').click(function(){
        if( $.trim(pwd.val()) == '' ){
            ipt_err_note(phone,'请输入手机号');
            return false;
        }else 
        if ( $.trim(pwd.val()) == '') {
            ipt_err_note(pwd,'请输入密码');
            return false;
        }else {
            // 提交
            $('#regiForm').submit();
        }

    });
});