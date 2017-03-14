/* global angular io */
'use strict'

angular.module('public.helpchat')
    .factory('ChatService', ChatServiceFactory)

ChatServiceFactory.$inject = ['$http', '$rootScope']

function ChatServiceFactory($http, $rootScope) {
    var socket = io()
    var room = $rootScope.user.username

    socket.on('connect', function() {
        joinRoom(room)
    })

    return {
        socket,
        sendMessage,
        getCurrentConversation,
        getAllConversations,
        getConversationById,
        joinRoom,
        leaveRoom,
        archiveConversation,
        getPagedConversations,
        getPagedArchiveConversations,
        searchConversations
    }

    function sendMessage(message) {
        if (!message.rep) message.room = room
        return $http.post('/api/chat', message)
    }

    function joinRoom(room) {
        socket.emit('room', room)
    }

    function leaveRoom(room) {
        socket.emit('leaveRoom', room)
    }

    function getCurrentConversation() {
        return $http.get('/api/chat/user/current')
    }

    function getAllConversations() {
        return $http.get('/api/chat')
    }

    function getPagedConversations(date, limit = 20, direction = 'after', read = false) {
        return $http.get(`/api/chat/${date}/${limit}/${direction}/${read}`)
    }

    function getPagedArchiveConversations(date, limit = 20, direction = 'after', read = false) {
        return $http.get(`/api/chat/archive/${date}/${limit}/${direction}`)
    }

    function getConversationById(id) {
        return $http.get('/api/chat/' + id)
    }

    function archiveConversation(id, data) {
        return $http.post('/api/chat/archive/' + id, data)
    }

    function searchConversations(str) {
        return $http.get('api/chat/search/' + str)
    }
}
