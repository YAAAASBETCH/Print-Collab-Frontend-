angular.module('public.helpchat').directive('socketFileUpload', socketFileUpload)

function socketFileUpload() {
    return {
        restrict: 'E',
        template:
        `<div class="fileUpload btn btn-primary" style="margin-left: 100px">
        <span>Upload Image</span>
        <input type="file" class="upload"    />
        </div>`,
        controller: socketFileUploadController,
        controllerAs: 'vm',
        link: socketFileUploadLink, // used for dom manipulation
        scope: {},
        replace: true,
        bindToController: true
    }
}

socketFileUploadController.$inject = ['ChatService']

function socketFileUploadController(ChatService) {
    var vm = this
    vm.uploadFile = function(file) {
        var reader = new window.FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = function() {
            var base64data = reader.result
            ChatService.sendMessage({
                body: base64data,
                rep: false,
                image: true
            }).then((res) => {
                console.log(res)
            })
        }
    }
}

function socketFileUploadLink($scope, $element, $attrs, ctrl) {
    $element.on('change', function(event) {
        ctrl.uploadFile(event.target.files[0])
    })
}
