
$("form").on("submit", function() {
    var url = '/carrots-admin-ajax/a/login';
    var formdata = $(this).serialize();
    var timer = null;
    $.post(url, formdata,
        function(data) {
            console.log(formdata);
            console.log(data);
            if (data.code === 0) {
                window.location.href = "http://dev.admin.carrots.ptteng.com/#/dashboard";
            } else {
                clearInterval(timer);
                $('#msg').html(data.message);
                timer = setTimeout(function() {
                    $('#msg').html('');
                }, 3000)
            }
        }, 'json');
    return false;//阻止表单默认提交行为
})