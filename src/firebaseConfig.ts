import { initializeApp } from "firebase/app";

export const environment = {
  production: false,
  firebase: {
    //firebase sdk
  }
};

export const app = initializeApp(environment.firebase);