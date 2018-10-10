
'use strict';

angular.module('serviceDeskApp')
    .controller('IncidentPriorityReportCtrl', function ($scope, $http, $location, $window, socket, Auth) {

        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.issues = [];
        var data = [];
        $scope.currentUser = Auth.getCurrentUser();
        anychart.onDocumentReady(function () {
            $http.get('/api/users').success(function (users) {
                $scope.users = users;
                socket.syncUpdates('user', $scope.users, function (event, user, users) {
                });
            });

            $http.get('/api/issue-status').success(function (issuestatuses) {
                issuestatuses.unshift({
                    issueStatusName: 'All',
                    _id: -1
                });
                $scope.issuestatuses = issuestatuses;
            });

            $http.get('/api/category').success(function (categories) {
                categories.unshift({
                    categoryName: 'All',
                    _id: -1
                });

                $scope.categories = categories;
            });

            $http.get('/api/issues/prioritisation/59673b1434c441b43f3995b4').success(function (issues) {
                data = issues;
                // create the chart
                var chart = anychart.pie();

                // set the chart title
                chart.title("Incident Prioritisation Report");

                // add the data
                chart.data(data);

                // display the chart in the container
                chart.container('container2');

                chart.draw();
                //download chart in pdf
                $scope.PrioritisationReportPdf = function () {
                    chart.saveAsPdf();
                };

                $scope.PrioritisationReportCsv = function () {
                    chart.saveAsXlsx();
                };
            });


            //create data
            $http.get('/api/issues/data').success(function (issues) {

                data = issues;

                // create the chart
                var chart = anychart.area();
                // set the chart title
                chart.animation(true);
                chart.title("Closed Incidents by Status ");

                // add the data
                chart.data(data);
                // display the chart in the container

                chart.container('container1');

                chart.draw();

                //download chart in pdf
                $scope.StatusPdf = function () {

                    chart.saveAsPdf();

                };

                $scope.StatusCsv = function () {
                    chart.saveAsXlsx();
                };

            });


        })


        //Export table data to excel file.
        $scope.exportData = function () {
            var blob = new Blob([document.getElementById('exportable').innerHTML], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
            });
            saveAs(blob, "Report.xls");
        };




        $scope.data = [];
        $scope.counts = {};

        $http.get('/api/issues/' + '59673b1434c441b43f3995b4' + '/statuses').success(function (issues) {
            $scope.issues = issues;

            var itemsArray = [];
            var itemIds = issues

            for (var i = 0; i < issues.length; i++) {
                var status = itemIds[i].issueStatus.issueStatusName


                $scope.issues[i].duration = $scope.resolutionTime($scope.issues[i].added, $scope.issues[i].modified).toFixed(2) + ' Hours';
                //$scope.issues[i].duration = Math.round($scope.resolutionTime($scope.issues[i].added),5) +' Hours';
                console.log($scope.issues[i].modified);

                itemsArray.push(status);

                if (itemIds.length === itemsArray.length) {
                    console.log(itemsArray)

                    $scope.counts = {}, i, $scope.value;
                    for (i = 0; i < itemsArray.length; i++) {
                        $scope.value = itemsArray[i];
                        if (typeof $scope.counts[$scope.value] === "undefined") {
                            $scope.counts[$scope.value] = 1;
                        } else {
                            $scope.counts[$scope.value]++;
                        }
                    }
                    console.log($scope.counts);
                }
            };
            socket.syncUpdates('issue', $scope.issues, function (event, issue, issues) {
            });
        });


        // testing duretion 

        $http.get('/api/issues').success(function (issues) {
            // $scope.issues = issues;


            socket.syncUpdates('issue', $scope.issues, function (event, issue, issues) {
            });
        });













        $http.get('/api/rfc-calls').success(function (rfccalls) {
            $scope.rfccalls = rfccalls;

        });


        $http.get('/api/issues/issuedata').success(function (data) {
            console.log(data);
            console.log('Report Created!!')
        })

        $scope.searchIssues = function (category, startDate, endDate) {
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            if (!angular.isUndefined(category) || !angular.isUndefined(startDate) || !angular.isUndefined(endDate)) {
                // Category On All
                if (category == "-1") {
                    // when date is defined
                    if (!angular.isUndefined(startDate) && !angular.isUndefined(endDate)) {
                        $scope.dateR = {};
                        $scope.dateArray = [];
                        $scope.dateArray.push(startDate);
                        $scope.dateArray.push(endDate);

                        $scope.dateR = JSON.stringify($scope.dateArray);

                        $http.get('/api/issues/date/' + $scope.dateR + '/' + '59673b1434c441b43f3995b4').success(function (issues) {
                            $scope.issues = issues; // Display filtered Date difference                                                         
                            console.log("Date filter: ", $scope.issues);
                        });
                    } else if (angular.isUndefined(startDate) || angular.isUndefined(endDate)) { //Display all closed incidents when date is undefined
                        $http.get('/api/issues/' + '59673b1434c441b43f3995b4' + '/statuses').success(function (issues) {

                            $scope.issues = issues;
                            console.log('All closed incidents')

                        });
                    }
                    // Category not All
                } else if (category != "-1") {
                    // when date is defined
                    if (!angular.isUndefined(startDate) && !angular.isUndefined(endDate)) {

                        $scope.dateR = {};
                        $scope.dateArray = [];
                        $scope.dateArray.push(startDate);
                        $scope.dateArray.push(endDate);

                        $scope.dateR = JSON.stringify($scope.dateArray);


                        $http.get('/api/issues/date/' + $scope.dateR + '/' + category + '/' + '59673b1434c441b43f3995b4').success(function (issues) {


                            $scope.issues = issues;
                            console.log("category, date Filter: ", $scope.issues);


                        });
                    } else if (angular.isUndefined(startDate) || angular.isUndefined(endDate)) {
                        $http.get('/api/issues/' + category + '/' + '59673b1434c441b43f3995b4').success(function (issues) {
                            $scope.issues = issues; // Display filtered Category
                            console.log('category filter', $scope.issues);

                        });
                    }
                } 
            } else if (angular.isUndefined(category) && !angular.isUndefined(startDate) && !angular.isUndefined(endDate)) {
                $scope.dateR = {};
                $scope.dateArray = [];
                $scope.dateArray.push(startDate);
                $scope.dateArray.push(endDate);

                $scope.dateR = JSON.stringify($scope.dateArray);

                $http.get('/api/issues/date/' + $scope.dateR + '/' + '59673b1434c441b43f3995b4').success(function (issues) {
                    $scope.issues = issues; // Display filtered Date difference                                                         
                    console.log("Date filter: ", $scope.issues);
                });
            }

        };//end searchIssue

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        $scope.data1 = [];

        $http.get('/api/issues/data').success(function (issues) {
            $scope.data1 = issues;
        });

        $scope.getValues = function () {
            var labs = ['New', 'Approved', 'Rejected', 'clossed'];
            var ourData = [];

            for (var i = 0; i < labs.length; i++) {
                ourData.push({
                    label: labs[i],
                    value: $scope.counts.New
                })
            }
        }

        $scope.open = function (issue) {

            var modalInstance = $modal.open({
                templateUrl: 'app/issues/partials/issue-details.modal.html',
                controller: 'IssueModalInstanceCtrl',
                //size: size,
                resolve: {
                    issue: function () {
                        return issue;
                    }
                }

            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.comments = function (issue) {
            var modalInstance = $modal.open({
                templateUrl: 'app/issues/partials/issue-comments.modal.html',
                controller: 'IssueCommentsModalInstanceCtrl',
                //size: size,
                resolve: {
                    issue: function () {
                        return issue;
                    }
                }
            });
        };

        $http.get('/api/priority').success(function (priorities) {
            $scope.priorities = priorities;
        });

        $scope.issues = {};
        $scope.issue = {};
        $scope.priority = {};

        $scope.resolutionTime = function (dateCaptured, modified) {

            var now = moment(modified); //todays date
            console.log('modified', modified);
            var duration = moment.duration(now.diff(dateCaptured));
            duration = duration.asHours();
            console.log('see hours', duration);
            return duration;
        }

        $scope.cancel = function () {
            $window.history.back();
        };

        $scope.delete = function (issue) {
            $http.delete('/api/issues/' + issue._id);
        };

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('issue');
        });
    });

