//类型过滤
myApp.filter('typeFilter', function () {
    return function (typedata) {
        var changed = '';
        switch (typedata) {
            case 0: changed = '首页banner'; break;
            case 1: changed = '找职位banner'; break;
            case 2: changed = '找精英banner'; break;
            case 3: changed = '行业大图'; break;
        }
        return changed;
    }
})
//状态过滤
myApp.filter('statusFilter', function () {
    return function (statusdata) {
        var changed = '';
        switch (statusdata) {
            case 1: changed = '上线'; break;
            case 2: changed = '草稿'; break;
        }
        return changed;
    }
})
//按钮过滤
myApp.filter('buttonFilter', function () {
    return function (statusdata) {
        var changed = '';
        switch (statusdata) {
            case 2: changed = '上线'; break;
            case 1: changed = '下线'; break;
        }
        return changed;
    }
})


myApp.controller('ArticleController', function ($scope, $http, $state, $stateParams) {
    //日历组件
    $scope.today = function () {
        $scope.dt = new Date();
    };

    $scope.clear = function () {
        $scope.dt1 = null;
        $scope.dt2 = null;
    };
    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };
    $scope.$watch("dt1", function (designate, ddd) {
        $scope.dateOptions2.minDate = designate;
    })
    $scope.$watch("dt2", function (designate, ddd) {
        $scope.dateOptions1.maxDate = designate;
    })

    $scope.dateOptions1 = {
        dateDisabled: disabled,
        formatYear: 'yy',
        minDate: $scope.dt1,
        startingDay: 1
    };
    $scope.dateOptions2 = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: $scope.dt2,
        startingDay: 1
    };

    // Disable weekend selection
    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        // return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function () {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions1.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.dt1 = new Date(year, month, day);
        $scope.dt2 = new Date(year, month, day);
        console.log($scope.dt1)
    };
    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
        {
            date: tomorrow,
            status: 'full'
        },
        {
            date: afterTomorrow,
            status: 'partially'
        }
    ];

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }
        return '';
    }
    //搜索下拉菜单
    //类型
    $scope.typeselect = [
        { id: null, name: "全部" },
        { id: 0, name: "首页banner" },
        { id: 1, name: "找职位banner" },
        { id: 2, name: "找精英banner" },
        { id: 3, name: "行业大图" }
    ]
    $scope.type = $scope.typeselect[0].id;
    //状态
    $scope.statusselect = [
        { id: null, name: "全部" },
        { id: 1, name: "上线" },
        { id: 2, name: "草稿" }
    ]
    $scope.status = $scope.statusselect[0].id;
    //日期状态保存
    if ($stateParams.startAt) {
        $scope.dt1 = parseInt($stateParams.startAt)
    }
    if ($stateParams.endAt) {
        $scope.dt2 = parseInt($stateParams.endAt)
    }
    //类型状态保存
    if($stateParams.type) {
        $scope.type = parseInt($stateParams.type)
    }
    //状态状态保存
    if($stateParams.status) {
        $scope.status = parseInt($stateParams.status)
    }
     //搜索及分页请求
    $http({
        method: 'get',
        url: '/carrots-admin-ajax/a/article/search',
        params: {
            page: $stateParams.page,
            size: $stateParams.size,
            title: $stateParams.title,
            author: $stateParams.author,
            type: $stateParams.type,
            status: $stateParams.status,
            startAt: $stateParams.startAt,
            endAt: $stateParams.endAt
        }

    }).then(function (res) {
        console.log(res);
        //总数据
        $scope.listes = res.data.data.articleList;
        //搜索相关
        $scope.title = $stateParams.title;
        $scope.author = $stateParams.author;
        //分页相关
        $scope.bigCurrentPage = $stateParams.page;
        $scope.page = $stateParams.page;
        $scope.size = res.data.data.size;
        $scope.size1 = res.data.data.size;
        $scope.bigTotalItems = res.data.data.total;
        $scope.maxSize = 5;

    }, function (res) {
        alert('没得')
    })
    //分页
    $scope.pageChanged = function () {
        //console.log($scope.bigCurrentPage)
        $state.go("organ.Article", {
            page: $scope.bigCurrentPage
        }, {
                reload: true
            })
    };
    //跳转和显示
    $scope.inputChanged = function () {
        $state.go("organ.Article", {
            page: $scope.page,
            size: $scope.size1
        }, {
                reload: true
            })
    }
    //搜索
    $scope.searchbutton = function () {
        var date1,time1,date2,time2
        //时间转换
        if ($scope.dt1) {
            date1 = new Date($scope.dt1)
            time1 = date1.valueOf()
        }
        if ($scope.dt2) {
            date2 = new Date($scope.dt2)
            if(time1 == date2.valueOf()){
                time2 = date1.valueOf() + 86399000
            }else if(date2.valueOf() - time1 <= 86400000){
                time2 = date2.valueOf() + 86399000
            }else{
                time2 = date2.valueOf()
            }
        }
        //传参
        $state.go("organ.Article", {
            title: $scope.title,
            author: $scope.author,
            type: $scope.type,
            status: $scope.status,
            startAt: time1,
            endAt: time2,
            page: 1
        }, {
                reload: true
            })
    }
    //清空搜索
    $scope.emptybutton = function () {

        $state.go("organ.Article", {
            title: "",
            author: "",
            type: "",
            status: "",
            startAt: "",
            endAt: "",
            page: 1
        }, {
                reload: true
            })
    }
    
    
    //上下线点击事件
    $scope.statusbutton = function (id) {
        var id = this.list.id;
        var s
        var m
        if (this.list.status == 1) {
            s = 2;
            m = "是否进行下线操作？"
        } else {
            s = 1;
            m = "是否进行上线操作？"
        }
        bootbox.confirm({
            message: m,
            buttons: {
                confirm: {
                    label: 'Yes',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'No',
                    className: 'btn-danger'
                }
            },
            callback: function () {
                $http({
                    method: 'PUT',
                    url: '/carrots-admin-ajax/a/u/article/status',
                    params: {
                        id: id,
                        status: s
                    }
                }).then(function () {
                    $state.reload()
                })
            }
        });
    }
    //删除
    $scope.deletebutton = function () {
        var id = this.list.id;
        bootbox.confirm({
            message: "确定删除此条消息？",
            buttons: {
                confirm: {
                    label: 'Yes',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'No',
                    className: 'btn-danger'
                }
            },
            callback: function () {
                $http({
                    method: 'delete',
                    url: '/carrots-admin-ajax/a/u/article/' + id,
                }).then(function () {
                    $state.reload()
                })
            }
        });
    }
    //点击编辑
    $scope.compilebutton = function () {
        var id = this.list.id;
        $state.go("organ.Added", {
            id: id
        })
    }
    //新增及编辑
    //下拉菜单
    $scope.addedtypeselect = [
        { id: null, name: "请选择" },
        { id: 0, name: "首页banner" },
        { id: 1, name: "找职位banner" },
        { id: 2, name: "找精英banner" },
        { id: 3, name: "行业大图" }
    ]
    $scope.addedtype = $scope.addedtypeselect[0].id;
    $scope.addedindustryselect = [
        { id: null, name: "请选择" },
        { id: 0, name: "移动互联网" },
        { id: 1, name: "电子商务" },
        { id: 2, name: "企业服务" },
        { id: 3, name: "O2O" },
        { id: 4, name: "教育" },
        { id: 5, name: "金融" },
        { id: 6, name: "游戏" },
    ]
    $scope.addedindustry = $scope.addedindustryselect[0].id;
    //富文本组件
    var E = window.wangEditor;
    var editor = new E("#editor");
    editor.customConfig.uploadImgShowBase64 = true;
    editor.customConfig.zIndex = 10;
    editor.create();

    //图片预览
    $scope.addedinputchange = function () {
        var file = $("#fileid").get(0).files[0];
        $scope.file = file;
        $scope.picturename = file.name;
        $scope.picturesize = file.size / 1024 / 1024;
        var size = $scope.picturesize.toFixed(2);
        $scope.picturesize = size + "MB";
        if (window.FileReader) {
            var fr = new FileReader();
            fr.onloadend = function (e) {
                document.getElementById("portrait").src = e.target.result;
            };
            fr.readAsDataURL(file);
        }
        $scope.defeated = false;
        $scope.succeed = false;
        $scope.uploadDD = false;
        $("#progress").css("width", "0%");
        $scope.$apply();
    }
    //图片上传
    $scope.addedbutton = function () {
        var fr = new FormData();
        fr.append("file", $scope.file);
        $("#progress").css("width", "60%");
        $http({
            method: "POST",
            url: "/carrots-admin-ajax/a/u/img/task",
            data: fr,
            headers: {
                'Content-Type': undefined
            }
        }).then(function (res) {
            console.log(res)
            $scope.imgurl = res.data.data.url;
            $("#progress").css("width", "100%");
            $scope.uploadDD = true;
            $scope.succeed = true;
        }, function () {
            alert("上传失败")
            $scope.defeated = true;
        })
    }
    
    //删除
    $scope.delbutton = function () {
        document.getElementById("portrait").src = "";
        document.getElementById("fileid").value = null;
        $("#progress").css("width", "0%");
        $scope.uploadDD = false;
        $scope.picturename = undefined;
        $scope.picturesize = undefined;
        $scope.defeated = false;
        $scope.succeed = false;
        $scope.imgurl =undefined;
    }
    //编辑页面渲染
    if ($stateParams.id) {
        $scope.addedtoptitle = "编辑Article"
        $http({
            method: "get",
            url: "/carrots-admin-ajax/a/article/" + $stateParams.id
        }).then(function (res) {
            console.log(res)
            $scope.addedtitlemodel = res.data.data.article.title,
                $scope.addedtype = res.data.data.article.type,
                $scope.imgurl = res.data.data.article.img,
                editor.txt.html(res.data.data.article.content),
                $scope.addedurl = res.data.data.article.url,
                $scope.addedindustry = res.data.data.article.industry,
                $scope.createAt = res.data.data.article.createAt,
                document.getElementById("portrait").src = $scope.imgurl
        })
        $scope.onlineclick = function ($event) {
            var z = $event.target.innerText;
            var x
            if (z == "立即上线") {
                x = 1
            } else {
                x = 2
            }
            $http({
                method: "put",
                url: "/carrots-admin-ajax/a/u/article/" + $stateParams.id,
                params: {
                    title: $scope.addedtitlemodel,
                    type: $scope.addedtype,
                    status: x,
                    img: $scope.imgurl,
                    content: editor.txt.html(),
                    url: $scope.addedurl,
                    industry: $scope.addedindustry,
                    createAt: $scope.createAt
                }
            }).then(function (res) {
                console.log(res)
                if (res.data.code == 0) {
                    $state.go("organ.Article")
                }
            })
        }
    } else {
        $scope.addedtoptitle = "新增Article"
        //立即上线及存为草稿
        $scope.onlineclick = function ($event) {
            var z = $event.target.innerText;
            var x
            if (z == "立即上线") {
                x = 1
            } else {
                x = 2
            }
            $http({
                method: "POST",
                url: "/carrots-admin-ajax/a/u/article",
                params: {
                    title: $scope.addedtitlemodel,
                    type: $scope.addedtype,
                    status: x,
                    img: $scope.imgurl,
                    content: editor.txt.html(),
                    url: $scope.addedurl,
                    industry: $scope.addedindustry
                }
            }).then(function (res) {
                console.log(res)
                if (res.data.code == 0) {
                    $state.go("organ.Article")
                }
            })
        }
    }
    //取消
    $scope.cancel = function () {
        $state.go("organ.Article")
    }
});


