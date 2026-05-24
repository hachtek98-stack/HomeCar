class Expo {
  static isExpoPushToken(token) { return true; }
  chunkPushNotifications(messages) { return [messages]; }
  async sendPushNotificationsAsync(chunk) { return []; }
}
module.exports = { Expo };
