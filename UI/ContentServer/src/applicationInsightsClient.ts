import Cookies from 'js-cookie';

export const APPLICATIONINSIGHTS_CONNECTION_STRING_COOKIE = "APPLICATIONINSIGHTS_CONNECTION_STRING";

export const getApplicationInsightsConnectionString = (): string | undefined => Cookies.get(APPLICATIONINSIGHTS_CONNECTION_STRING_COOKIE);
