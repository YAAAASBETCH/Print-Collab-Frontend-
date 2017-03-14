/* global angular */
'use strict'

angular.module('public.helpchat', ['ui.router'])
    .config(function($stateProvider) {
        $stateProvider
                .state('public.chatFront', {
                    url: '/',
                    data: {
                        title: 'Chat'
                    },
                    views: {
                        'helpchat@public': {
                            templateUrl: 'public/chatFront/views/chat.html',
                            controller: 'HelpChatController as ChatCtrl'
                        }
                    }
                })
    })
