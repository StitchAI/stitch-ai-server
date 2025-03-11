import CryptoJS from 'crypto-js';

import { IS_DEMO } from '~/constants';

export const generateApiKey = (walletAddress: string) => {
  if (IS_DEMO) return `demo-${walletAddress}`;

  const randomBytes = CryptoJS.lib.WordArray.random(16).toString();

  const seed = `${walletAddress}-${Date.now()}-${randomBytes}`;
  const hash = CryptoJS.SHA256(seed).toString();

  const apiKey = hash.match(/.{1,8}/g).join('-');
  return apiKey;
};
