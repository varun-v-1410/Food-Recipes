import * as Device from 'expo-device';

export const nweb = ["Android","iOS"].includes(Device.osName) && Device.manufacturer !== null;