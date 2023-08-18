import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      "Start Text":
        "There are many types of underwater creatures that you may have catched, so what are you waiting for lets save them in “fishtrack”! With fishtrack you can save all your precious pictures of your catches in special folders. Then you will be able to add locations dates etc. to your catches and keep them sorted for ever!",
      "Start Heading 1": "Save Your",
      "Start Heading 2": "Unterwater",
      "Start Heading 3": "Memories",
      "Start Button Get Started": "Get Started",
      "Start Button See More": "See More",
      "Start Users": "Users",
      "Start Locations": "Users",
      "Start Images": "Images",
      "Form Password": "Password",
      "Form Password Confirm": "Confirm Password",
      "Form Forgot Password": "Forgot Password?",
      "Login to Signup": "Don't have an account?",
      "Signup to Login": "Already have an account?",
      "Welcome back": "Welcome back",
      "Your Folders": "Your Folders",
      Upload: "Upload",
      "Catch Date": "Catch Date",
      "Catch Location": "Catch Location",
      "Fish Type": "Fish Type",
      "Fish Weight": "Fish Weight",
      "Fish Length": "Fish Length",
      Folder: "Folder",
      "Browse Files": "Browse Files to upload",
      "No file selected": "No file selected",
      Signup: "Signup",
      "Enter valid Email!": "Enter valid Email!",
      "Successful!": "Successful!",
      "Email not verified": "Email not verified",
      "Verify Email Sent!": "Verify Email Sent!",
      "Password Reset Email Sent!": "Password Reset Email Sent!",
      "Successfully logged out!": "Successfully logged out!",
      "See you next time :)": "See you next time :)",
      "Return Home": "Return Home",
      "Passwords do not match!": "Passwords do not match!",
      Home: "Home",
      Invite: "Invite",
      "Your Tracks": "Your Tracks",
      Search: "Search",
      Reset: "Reset",
      "You don't have any Folders.": "You don't have any Folders.",
      Delete: "Delete",
    },
  },
  de: {
    translation: {
      "Start Heading 1": "Speicher Deine",
      "Start Heading 2": "Unterwasser",
      "Start Heading 3": "Erinnerungen",
      "Start Text":
        "Es gibt viele Arten von Unterwasserlebewesen, die du gefangen haben könntest, also worauf wartest du noch, speichere sie in fishtrack! Mit fishtrack können Sie alle Ihre wertvollen Bilder von Ihren Fängen in speziellen Ordnern speichern. Dann können Sie Ihren Fängen Ortsdaten usw. hinzufügen und sie für immer sortiert halten!",
      "Start Button Get Started": "Los geht's",
      "Start Button See More": "Mehr",
      "Start Users": "Benutzer",
      "Start Locations": "Orte",
      "Start Images": "Bilder",
      "Form Password": "Passwort",
      "Form Password Confirm": "Passwort Bestätigen",
      "Form Forgot Password": "Passwort vergessen?",
      "Login to Signup": "Hast keinen Account?",
      "Signup to Login": "Hast schon einen Account?",
      "Welcome back": "Willkommen",
      "Your Folders": "Deine Ordner",
      Upload: "Hochladen",
      "Catch Date": "Fang Datum",
      "Catch Location": "Fang Ort",
      "Fish Type": "Fischart",
      "Fish Weight": "Fisch Gewicht",
      "Fish Length": "Fisch Länge",
      Folder: "Ordner",
      "Browse Files": "Durchsuche Dateien",
      "No file selected": "Keine Datei ausgewählt",
      Signup: "Registrieren",
      "Enter valid Email!": "Gebe eine Email an!",
      "Successful!": "Erfolgreich!",
      "Email not verified": "Email not verifiziert",
      "Verify Email Sent!": "Verifizierungs Email gesendet!",
      "Password Reset Email Sent!": "Passwort Vergessen Email gesendet!",
      "Successfully logged out!": "Erfolgreich ausgeloggt!",
      "See you next time :)": "Bis zum nächsten mal :)",
      "Return Home": "Zur Startseite",
      "Passwords do not match!": "Passwörter sind nicht gleich",
      Home: "Start",
      Invite: "Einladen",
      "Your Tracks": "Deine Tracks",
      Search: "Suchen",
      Reset: "Zurücksetzen",
      "You don't have any Folders.": "Du hast noch keine Ordner",
      Delete: "Löschen",
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    resources,
    fallBackLng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
