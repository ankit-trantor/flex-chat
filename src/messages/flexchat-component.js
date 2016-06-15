/*
 * Flexchat
 * --------------
 * element: <flexchat></flexchat>
 * dependencies: $firebaseArray
 */

export function flexchatComponent() {
  return {
    bindings: { messages: '<' },
    controller: function (messageBlob) {
      this.messageText = '';
      this.fileUpload = null;
      
      this.messages.listenToLatest(latestMessage => {
        const messageElement = document.getElementById(`flexchat-message-${latestMessage.$id}`);
        messageElement.scrollIntoView();
      });

      this.addMessage = (event) => {
        if (event.keyCode && event.keyCode !== 13) { return; }
        
        messageBlob.addBlobMessage({
          text: this.messageText,
          file: this.fileUpload
        });

        this.messageText = '';
        this.fileUpload = null;
      };

      this.onChange = (fileList) => {
        this.fileUpload = fileList[0];
      };      
    },
    templateUrl: 'chat.html'
  };
}