import { ApplicationConfig, ApplicationRun, initializeFirebaseApp } from './config';
import { MessagesList, messageComponent, MessageBlobService, flexchatComponent } from './messages';
import { FirebaseStorage, FirebaseStorageDirective, blobify } from './storage';
import { LoginDirective } from './login';
import { FileUploadDirective } from './common';
import { appComponent } from './app-component';

/*
 * Flexchat
 * ----------
 * An angular app demonstrating Firebase & Flexbox.
 */
const config = initializeFirebaseApp();

angular
  .module('flexchat', [
    'firebase',
    'ngRoute',
    'flexchat.templates'
  ])
  .constant('FirebaseUrl', config.databaseURL)
  .component('app', appComponent())
  .component('flexchat', flexchatComponent())
  .component('flexchatMessage', messageComponent())
  .factory('messagesList', MessagesList)
  .service('messageBlob', MessageBlobService)
  .factory('$firebaseStorage', FirebaseStorage)
  .directive('login', LoginDirective)
  .directive('fileUpload', FileUploadDirective)
  .directive('gsUrl', FirebaseStorageDirective)
  .config(ApplicationConfig)
  .run(ApplicationRun);

