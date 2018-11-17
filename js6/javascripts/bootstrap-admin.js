angular.module('x-admin', []).
controller('x-controller', function ($scope, $http) {
    $scope.currentUser="admin";
    $scope.content = '/welcome.html';
    // $scope.oneAtATime = false;

    $scope.menus = [
        {
            text: "系统管理",
            enabled: true,
            subMenus:[
                {
                    text: "用户管理",
                    enabled: true,
                    action:"/login.html"
                },
                {
                    text: "角色管理",
                    enabled: true,
                    action:"/added.html"
                },
                {
                    text: "权限管理",
                    enabled: true,
                    action:"/app.html"
                }
            ]
        },
        {
            text: "内容管理",
            enabled: true,
            subMenus:[
                {
                    text: "直播监控",
                    enabled: true,
                    action:"/Article.html"
                },
                {
                    text: "预约管理",
                    enabled: true,
                    action:"/book-mgr"
                }
            ]
        },
        {
            text: "推送管理",
            enabled: true,
            subMenus:[
                {
                    text: "推送列表",
                    enabled: true,
                    action:"/push-list"
                },
                {
                    text: "新增推送",
                    enabled: true,
                    action:"/add-push"
                }
            ]
        }
    ];

    $scope.setContent = function(action){
        console.log(action);
        $scope.content=action;
    };
});
