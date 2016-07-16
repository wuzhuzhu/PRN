import * as env from '../../env';
import Auth0Lock from 'react-native-lock';
import * as AuthStateActions from '../modules/auth/AuthState';
import store from '../redux/store';
const {Platform} = require('react-native');

const clientId = env.AUTH0_CLIENT_ID;
const domain = env.AUTH0_DOMAIN;
const authenticationEnabled = clientId && domain;

let lock = null;
if (authenticationEnabled) {
  lock = new Auth0Lock({
    clientId,
    domain
  });
} else {
  console.warn('Authentication not enabled: Auth0 configuration not provided');
}

export function showLogin() {
  if (!authenticationEnabled) {
    return;
  }

  const options = {
    closable: true,
    dict: {
      "loadingTitle":                  "Please wait...",
      "close":                         "Close",
      "windowsAuthTitle":              "Windows Authentication",
      "invalid":                       "Invalid",
      "mustMatch":                     "Must match",
      "loginSocialButton":             "Login with {connection:title}",
      "signupSocialButton":            "Signup with {connection:title}",
      "networkError":                  "We could not reach the server.<br/>Please try again.",
      "noConnectionError":             "No valid connection could be found.",
      "signin": {
        "title":                            "登陆",
        "action":                           "Access",
        "actionDomain":                     "Log in to {domain}",
        "all":                              "Not your account?",
        "strategyEmailEmpty":               "The email is empty.",
        "strategyEmailInvalid":             "The email is invalid.",
        "strategyDomainInvalid":            "The domain {domain} has not been set up.",
        "signinText":                       "Log In",
        "signupText":                       "Sign Up",
        "forgotText":                       "Don't remember your password?",
        "cancelAction":                     "Cancel",
        "footerText":                       "",
        "emailPlaceholder":                 "Email",
        "usernamePlaceholder":              "Username",
        "passwordPlaceholder":              "Password",
        "separatorText":                    "or",
        "serverErrorText":                  "There was an error processing the login.",
        "returnUserLabel":                  "Last time you signed in using...",
        "domainUserLabel":                  "You are connected from your corporate network...",
        "wrongEmailPasswordErrorText":      "Wrong email or password.",
        "passwordChangeRequiredErrorText":  "You need to update your password because this is the first time you are signing in, or because your password has expired.",
        "passwordLeakedErrorText":          "This login attempt has been blocked because your password has been leaked in a third party website. We've sent you an email with instructions on how to unblock it.",
        "unauthorizedErrorText":            "Access denied.",
        "userBlockedErrorText":             "",
        "or":                               "... or log in using",
        "loadingMessage":                   "Logging In with {connection}...",
        "popupCredentials":                 "Enter your credentials in the pop-up window",
        "userClosedPopup":                  "Popup window closed. Try again.",
        "userConsentFailed":                "Permissions were not granted. Try again."
      },
      "signup": {
        "description":                 "",
        "title":                       "Sign Up",
        "action":                      "Sign Up",
        "signinText":                  "Log In",
        "signupText":                  "Sign Up",
        "emailPlaceholder":            "Email",
        "usernamePlaceholder":         "Username",
        "passwordPlaceholder":         "Create a Password",
        "cancelAction":                "Cancel",
        "headerText":                  "Please enter your email and password",
        "footerText":                  "",
        "serverErrorText":             "There was an error processing the signup.",
        "userExistsErrorText":         "The user already exists.",
        "signupOnSSODomainErrorText":  "This domain {domain} has been configured for Single Sign On and you can't create an account. Try signing in instead.",
        "usernameInUseErrorText":      "The username is already in use.",
        "invalidPassword":             "Password is too weak.",

        "passwordStrength": {
          "nonEmpty": "Non-empty password required",
          "lengthAtLeast": "At least %d characters in length",
          "shouldContain": "Should contain:",
          "containsAtLeast" : "Contain at least %d of the following %d types of characters:",
          "lowerCase": "Lower case letters (a-z)",
          "upperCase": "Upper case letters (A-Z)",
          "numbers": "Numbers (i.e. 0-9)",
          "specialCharacters" : "Special characters (e.g. !@#$%^&*)",
          "identicalChars": "No more than %d identical characters in a row (e.g., \"%s\" not allowed)"
        }

      },
      "newReset": {
        "title":                       "Password Reset",
        "action":                      "Send",
        "emailPlaceholder":            "Email",
        "cancelAction":                "Cancel",
        "footerText":                  "",
        "successText":                 "We've just sent you an email to reset your password.",
        "headerText":                  "Please enter your email address. We will send you an email to reset your password.",
        "serverErrorText":             "There was an error processing the password reset.",
        "userDoesNotExistErrorText":   "User does not exist.",
        "tooManyRequestsErrorText":    "You have reached the limit on password reset attempts.  Please wait before trying again."
      },
      "reset": {
        "title":                       "Password Change",
        "action":                      "Send",
        "emailPlaceholder":            "Email",
        "passwordPlaceholder":         "New Password",
        "repeatPasswordPlaceholder":   "Confirm New Password",
        "cancelAction":                "Cancel",
        "footerText":                  "",
        "successText":                 "We've just sent you an email to reset your password.",
        "enterSamePasswordText":       "Please enter the same password.",
        "headerText":                  "Please enter your email and the new password. We will send you an email to confirm the password change.",
        "serverErrorText":             "There was an error processing the password reset.",
        "userDoesNotExistErrorText":   "User does not exist.",
        "tooManyRequestsErrorText":    "You have reached the limit on password reset attempts.  Please wait before trying again.",
        "invalidPassword":             "Password is too weak."
      }
    }
  };

  if (Platform.OS === 'ios') {
    lock.customizeTheme({
      A0ThemePrimaryButtonNormalColor: '#39babd',
      A0ThemePrimaryButtonHighlightedColor: '#08AFB3',
      A0ThemeSecondaryButtonTextColor: '#ffffff',
      A0ThemeTextFieldTextColor: '#ffffff',
      A0ThemeTextFieldPlaceholderTextColor: '#ffffff',
      A0ThemeTextFieldIconColor: '#ffffff',
      A0ThemeTitleTextColor: '#ffffff',
      A0ThemeDescriptionTextColor: '#ffffff',
      A0ThemeSeparatorTextColor: '#ffffff',
      A0ThemeScreenBackgroundColor: '#39babd',
      A0ThemeIconImageName: 'pepperoni',
      A0ThemeCredentialBoxBorderColor: '' //transparent
    });
  }

  lock.show(options, (err, profile, token) => {
    if (err) {
      store.dispatch(AuthStateActions.onUserLoginError(err));
      return;
    }

    // Authentication worked!
    store.dispatch(AuthStateActions.onUserLoginSuccess(profile, token));
  });
}
