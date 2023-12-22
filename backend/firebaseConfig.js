const { initializeApp, cert } = require("firebase-admin/app");
const { getStorage } = require("firebase-admin/storage");
require("dotenv").config();
const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDv0zoMRH/I+Clw\n6wzzsY4TTKRYv4eTKXpPUl5sPa8FUrOwvGd5XosDEFhaB0h4HdqAnVcfyQSmu0Cp\nWYsSQqvrA5/C7ZVcUQ7USTvoO1Pa0UihX/nCN6yu0jp9vR1QJ1evuvh3eASjNIUJ\nA1a7f9pi96abwiUorY2XCEnepimxrquItS2K/J1H7nkYRWmLC7Izkwg/fbkGJICo\nKtCXd4tzEy+oEhdueeW1+D7j5MY7oTMAMlu2qsGHDtXpZPUmoKVJ1QV40LcHBn8W\n4CM6/xExM8nunD7mBQ//YnknVlxf2fL/Rys5qBu7rIQq87Xtag1Xxjl1YP4Pwqf3\ny97+oxoHAgMBAAECggEANJbJ/NSsfMJGPBee4HVH5V2CEF/3d8K5qlkykWO5VF59\nPr0hp5CexQ45gYxlTMmnF1rpNvQajAE1vaz//QIXttI1n0X/4Z14tf5VH6iay7nm\nxlRIbVlOCYvZ/aaRnfjylntWbsQnqC4lGgPcagMwPVF2/GLHSTM9gCf2Item/uoU\n0hhwDhrliC7TRdLWmprxsjdibacrfQTra2hry1hJMsVCAsmIzi/Is6NdEJFVRZ3V\nILz4r63C20M/3w1Z9sHLmpnCaxBlVrKgZSYuIq0Hq9eIP8OtDLkMzwWAfNpKX+Hh\ntapmlf5ox1z5z01SO4IRbngVl3Fr7tQjWLfewO4qCQKBgQD3yMlivxeC1YhoLIbK\n+Zx9R47Mtkbn6ILcJlhizAj9ENlNTSXwSZRkI9xG2cjLXCllBghcwx9HOIFEUEFJ\nzTQ1Zh0KewlcfYG4CdDrtE/1k3xfNfNU6RHxyS7I/XeMprfWhAdoVCkY9gJkuX9n\niMnnV/JCMZTZj+nNAGELbZ5QLQKBgQD3xuGwbC7buTy69VysHcvVFOW97mcf/cFq\nEo+NhmJ8ljvdi2/o8Z5KBS8tZIGpxKyk+lKV7aP61PkSXiL03URHVq53tTWPPwE4\n2T9BWBAPuAYLctl1o9gRQoqOZn6Bu1+KPUqNScTu96duDMTr2doUWq+tqtBExfXa\nU+bj3pk/gwKBgQCSxpBseu+NY7myo7WQ5H1LRKkVIGAuHW/uwpQWqfAlH+bowGtZ\nw+wvyYJBQd6Mf+JRYlpvwHF1ucXw1m1mLzTe8McBH1KzQ/EkOERWau/2c0/4AjhK\nsukbRWX+Tw6S9WrumjTdGwVhMNDII42RodifvlvV1BLtMS94bOIPZ/agXQKBgQCa\ncyqz4nvDE1C76b5+u4QXqxMatcUqt+8cw70gJyi1KKDglM6JkjNtSJYD4abBwIst\nu6xHMP8KmD86J9v6bwLkxS+0Bwz/4fJNEX7QqKg6ZCfAczMClcNV3vink1RAYiBH\n97TFJbrQiyee/e6yZfX+whjIVLXGaO+7zJkcaeF1KQKBgHgv8llgGs29AktyATEk\nFizNVA5JNj+BiJhTBHIh3SoJ2G8/ebLMc0rwAX4Xe27hSvzeM5lVXKxOoaQwNt14\nMBRuRSW0+1JUE/8ml5x+fGJtCJinTbO/NHirkDM9x3vvz8VaDm+rmDWq+V4DdzTS\nHmPWMVJZz5Dm8GBJy0LDu2+m\n-----END PRIVATE KEY-----\n",
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
};

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

const bucket = getStorage().bucket();

module.exports = bucket;
