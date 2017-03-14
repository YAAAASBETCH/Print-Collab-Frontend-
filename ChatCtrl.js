/* global angular */
'use strict'

angular.module('public.helpchat')
    .controller('HelpChatController', HelpChatController)

HelpChatController.$inject = ['ChatService', '$state', '$scope', '$timeout']

function HelpChatController(ChatService, $state, $scope, $timeout) {
    var vm = this
    if ($state.current.name === 'public.adminchat') {
        vm.archived = true
        return
    }

    var socket = ChatService.socket
    vm.messages = []

    socket.on('message', function(data) {
        vm.messages.push(data)
        $scope.$apply()
    })

    socket.on('archived', function(data) {
        vm.archived = true
    })

    vm.message = {
        rep: false
    }

    ChatService.getCurrentConversation()
        .then(res => {
            vm.messages = res.data.item ? res.data.item.messages : []
            if (vm.messages.length === 0) {
                $timeout(function() {
                    vm.messages = [{
                        '_id': 'default_welcome',
                        'updated_at': '2017-02-26T22:32:47.937Z',
                        'created_at': '2017-02-26T22:32:47.937Z',
                        'rep': true,
                        'body': 'Hello! Welcome to Print Collab! Let me know if I can help with anything :)',
                        'user_id': '58b3574cd30b1cac2f56be24',
                        '__v': 0
                    }]
                }, 5000)
            }
        })

    vm.sendMessage = function() {
        ChatService.sendMessage(vm.message).then((res) => {
            vm.message.body = ''
        })
    }
}
