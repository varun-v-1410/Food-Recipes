import * as Device from 'expo-device';

export const nweb = ["Android","iOS","iPadOS"].includes(Device.osName != null ? Device.osName : "Web");