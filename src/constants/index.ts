export const BLOCKCHAIN_ENV = process.env.BLOCKCHAIN_ENV;

export const IS_DEVNET = process.env.BLOCKCHAIN_ENV === 'devnet';
export const IS_MAINNET = process.env.BLOCKCHAIN_ENV === 'mainnet';

export const IS_LOCAL = process.env.IS_LOCAL === 'true';
export const DISABLE_CRON = process.env.DISABLE_CRON === 'true';

export const SLACK_WEBHOOK_DEVNET = process.env.SLACK_WEBHOOK_DEVNET;
export const SLACK_WEBHOOK_MAINNET = process.env.SLACK_WEBHOOK_MAINNET;
export const SLACK_WEBHOOK_DEV_NOTIFICATION = process.env.SLACK_WEBHOOK_DEV_NOTIFICATION;
export const SLACK_WEBHOOK_PROD_NOTIFICATION = process.env.SLACK_WEBHOOK_PROD_NOTIFICATION;
