import { Platform } from 'react-native';
import { PERMISSIONS, RESULTS } from 'react-native-permissions';
import pack from './package.json';

// defines scope for the current extension state within the global app's state
export function ext(resourceName) {
  return resourceName ? `${pack.name}.${resourceName}` : pack.name;
}

export const PERMISSION_RESULT_TYPES = {
  BLOCKED: RESULTS.BLOCKED,
  DENIED: RESULTS.DENIED,
  GRANTED: RESULTS.GRANTED,
  UNAVAILABLE: RESULTS.UNAVAILABLE,
};

export const PERMISSION_TYPES = {
  MICROPHONE: Platform.select({
    ios: PERMISSIONS.IOS.MICROPHONE,
    default: PERMISSIONS.ANDROID.RECORD_AUDIO,
  }),
  CAMERA: Platform.select({
    ios: PERMISSIONS.IOS.CAMERA,
    default: PERMISSIONS.ANDROID.CAMERA,
  }),
  ANDROID_ACCEPT_HANDOVER: PERMISSIONS.ANDROID.ACCEPT_HANDOVER,
  ANDROID_ACCESS_BACKGROUND_LOCATION: PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
  ANDROID_ACCESS_COARSE_LOCATION: PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
  ANDROID_ACCESS_FINE_LOCATION: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  ANDROID_ACTIVITY_RECOGNITION: PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION,
  ANDROID_ADD_VOICEMAIL: PERMISSIONS.ANDROID.ADD_VOICEMAIL,
  ANDROID_ANSWER_PHONE_CALLS: PERMISSIONS.ANDROID.ANSWER_PHONE_CALLS,
  ANDROID_BODY_SENSORS: PERMISSIONS.ANDROID.BODY_SENSORS,
  ANDROID_CALL_PHONE: PERMISSIONS.ANDROID.CALL_PHONE,
  ANDROID_GET_ACCOUNTS: PERMISSIONS.ANDROID.GET_ACCOUNTS,
  ANDROID_PROCESS_OUTGOING_CALLS: PERMISSIONS.ANDROID.PROCESS_OUTGOING_CALLS,
  ANDROID_READ_CALENDAR: PERMISSIONS.ANDROID.READ_CALENDAR,
  ANDROID_READ_CALL_LOG: PERMISSIONS.ANDROID.READ_CALL_LOG,
  ANDROID_READ_CONTACTS: PERMISSIONS.ANDROID.READ_CONTACTS,
  ANDROID_READ_EXTERNAL_STORAGE: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  ANDROID_READ_PHONE_NUMBERS: PERMISSIONS.ANDROID.READ_PHONE_NUMBERS,
  ANDROID_READ_PHONE_STATE: PERMISSIONS.ANDROID.READ_PHONE_STATE,
  ANDROID_READ_SMS: PERMISSIONS.ANDROID.READ_SMS,
  ANDROID_RECEIVE_MMS: PERMISSIONS.ANDROID.RECEIVE_MMS,
  ANDROID_RECEIVE_SMS: PERMISSIONS.ANDROID.RECEIVE_SMS,
  ANDROID_RECEIVE_WAP_PUSH: PERMISSIONS.ANDROID.RECEIVE_WAP_PUSH,
  ANDROID_SEND_SMS: PERMISSIONS.ANDROID.SEND_SMS,
  ANDROID_USE_SIP: PERMISSIONS.ANDROID.USE_SIP,
  ANDROID_WRITE_CALENDAR: PERMISSIONS.ANDROID.WRITE_CALENDAR,
  ANDROID_WRITE_CALL_LOG: PERMISSIONS.ANDROID.WRITE_CALL_LOG,
  ANDROID_WRITE_CONTACTS: PERMISSIONS.ANDROID.WRITE_CONTACTS,
  ANDROID_WRITE_EXTERNAL_STORAGE: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  IOS_APP_TRACKING_TRANSPARENCY: PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY,
  IOS_BLUETOOTH_PERIPHERAL: PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL,
  IOS_CALENDARS: PERMISSIONS.IOS.CALENDARS,
  IOS_CONTACTS: PERMISSIONS.IOS.CONTACTS,
  IOS_FACE_ID: PERMISSIONS.IOS.FACE_ID,
  IOS_LOCATION_ALWAYS: PERMISSIONS.IOS.LOCATION_ALWAYS,
  IOS_LOCATION_WHEN_IN_USE: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  IOS_MEDIA_LIBRARY: PERMISSIONS.IOS.MEDIA_LIBRARY,
  IOS_MOTION: PERMISSIONS.IOS.MOTION,
  IOS_PHOTO_LIBRARY: PERMISSIONS.IOS.PHOTO_LIBRARY,
  IOS_PHOTO_LIBRARY_ADD_ONLY: PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
  IOS_REMINDERS: PERMISSIONS.IOS.REMINDERS,
  IOS_SIRI: PERMISSIONS.IOS.SIRI,
  IOS_SPEECH_RECOGNITION: PERMISSIONS.IOS.SPEECH_RECOGNITION,
  IOS_STOREKIT: PERMISSIONS.IOS.STOREKIT,
};
