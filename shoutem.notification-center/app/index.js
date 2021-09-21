import NotificationDailySettingsScreen from './screens/NotificationDailySettingsScreen';
import NotificationDetailsScreen from './screens/NotificationDetailsScreen';
import NotificationSettingsScreen from './screens/NotificationSettingsScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import PushGroupsScreen from './screens/PushGroupsScreen';
import ReminderSettingsScreen from './screens/ReminderSettingsScreen';
import enTranslations from './translations/en.json';
import { registerBackgroundMessageHandler } from './notificationHandlers';
import reducer, { middleware } from './redux';

// Android only. Handles push notifications when the app is killed.
// Has to be defined outside app lifecycle
registerBackgroundMessageHandler();

const screens = {
  NotificationDailySettingsScreen,
  NotificationDetailsScreen,
  NotificationSettingsScreen,
  NotificationsScreen,
  PushGroupsScreen,
  ReminderSettingsScreen,
};

export const shoutem = {
  i18n: {
    translations: {
      en: enTranslations,
    },
  },
};

export { middleware, screens, reducer };

export { appDidMount } from './app';
