app.directive('myPage', function () {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: {
            title: "=pageTitle"
        },
        template: [
            '<div class="panel panel-info">',
            '<div class="panel-heading" ng-click="toggle();">',
            '<h3 class="panel-title" >{{title}}</h3>',
            '</div>',
            '<div class="panel-body" ng-show="showMe" ng-transclude></div>',
            '</div>'
        ].join(""),
        link: function (scope, element, attrs) {
            scope.showMe = false;
            scope.$parent.addExpander(scope);
            scope.toggle = function toggle() {
                scope.showMe = !scope.showMe;
                scope.$parent.goToExpander(scope);
            }
        }
    };
});
app.controller('myCtrl', ['$scope','$http',function ($scope,$http) {
    $scope.expanders = [{
        title: '人力资源部',
        text: '人力资源部'
    }, {
        title: '财务部',
        text: '财务部'
    }, {
        title: '行政部',
        text: '行政部'
    }];
    var expanders = []; //记录所有菜单
    $scope.addExpander = function (expander) {
        expanders.push(expander);
    };
    $scope.goToExpander = function (selectedExpander) {
        expanders.forEach(function (item, index) {//隐藏非当前选项卡,实现切换功能
            if (item != selectedExpander) {
                item.showMe = false;
            }
        })
    };
}]);