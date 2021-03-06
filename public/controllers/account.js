angular.module('yxaquant.account', [])

.controller('AccountListController', ['$scope','accounts','$location', function ($scope, accounts, $location) {
	$scope.accounts = accounts;

	// 从后端获得分页参数示例，请求支持使用skip和limit来分页，limit默认20
	// 对于数据量不大的account, user, config也可使用前端分页
	$scope.list = {
		start: +accounts.$response.headers('items-start'),
		end: +accounts.$response.headers('items-end'),
		total: +accounts.$response.headers('items-total')
	}
	$scope.goto = function (id) {
		$location.path('/account/'+id)
	}

}])

.controller('AccountDetailController', ['$scope','account',function ($scope, account) {
	$scope.account = $scope.i = account
	
}])
.controller('AccountEditController', ['$scope','account','Account',function ($scope, account, Account) {
	$scope.account = $scope.i = account
	$scope.typeName = '修改'

	$scope.save = function () {
        Account.update(account, function (data) {
            console.log(data)
            location.reload()
        })
    }

}])
.controller('AccountCreateController', ['$scope', 'Account','$location',function ($scope, Account, $location) {
	$scope.typeName = '创建'
	$scope.account = $scope.i = {}
	$scope.save = function () {
        Account.create($scope.account, function (data) {
            console.log(data)
            $location.path('/account/'+data.id+'/edit')
        })
    }

}])
