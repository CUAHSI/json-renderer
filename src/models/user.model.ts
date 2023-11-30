import { Model } from "@vuex-orm/core";
import { Subject } from "rxjs";
import { getQueryString } from "@/util";
import { APP_URL, ENDPOINTS, LOGIN_URL, CLIENT_ID } from "@/constants";
import { Notifications } from "@cznethub/cznet-vue-core";
import schemaIn from '@/schemas/schema.json'
import uiSchemaIn from '@/schemas/ui-schema.json'
import schemaDefaultsIn from '@/schemas/schema-defaults.json'

export interface ICzCurrentUserState {
  accessToken: string;
}

export interface IUserState {
  isLoggedIn: boolean;
  accessToken: string;
  next: string;
  hasUnsavedChanges: boolean;
  schema: any;
  uiSchema: any;
  schemaDefaults: any;
}

export default class User extends Model {
  static entity = "users";
  static isLoginListenerSet = false;
  static loggedIn$ = new Subject<void>();

  static fields() {
    return {};
  }

  static get $state(): IUserState {
    return this.store().state.entities[this.entity];
  }

  static get next() {
    return;
  }

  static get accessToken() {
    return this.$state?.accessToken;
  }

  static state(): IUserState {
    return {
      isLoggedIn: false,
      accessToken: "",
      next: "",
      hasUnsavedChanges: false,
      schema: null,
      uiSchema: null,
      schemaDefaults: null,
    };
  }

  static async logIn(callback?: () => any) {
    const params = {
      response_type: "token",
      client_id: `${CLIENT_ID}`,
      redirect_uri: `${APP_URL}/auth-redirect`,
      window_close: "True",
      scope: "openid",
    };

    window.open(
      `${LOGIN_URL}?${getQueryString(params)}`,
      "_blank",
      "location=1, status=1, scrollbars=1, width=800, height=800"
    );

    if (!this.isLoginListenerSet) {
      this.isLoginListenerSet = true; // Prevents registering the listener more than once
      console.info(`User: listening to login window...`);
      window.addEventListener("message", async (event: MessageEvent) => {
        if (
          event.origin !== APP_URL ||
          !event.data.hasOwnProperty("accessToken")
        ) {
          return;
        }

        if (event.data.accessToken) {
          Notifications.toast({
            message: "You have logged in!",
            type: "success",
          });
          await User.commit((state) => {
            state.isLoggedIn = true;
            state.accessToken = event.data.accessToken;
          });
          this.loggedIn$.next();
          this.isLoginListenerSet = false;
          callback?.();
        } else {
          Notifications.toast({
            message: "Failed to Log In",
            type: "error",
          });
        }
      });
    }
  }

  static async logOut() {
    this._logOut();
  }

  private static async _logOut() {
    await User.commit((state) => {
      (state.isLoggedIn = false), (state.accessToken = "");
    });
    this.isLoginListenerSet = false;

    Notifications.toast({
      message: "You have logged out!",
      type: "info",
    });

  }

  static async fetchSchemas() {
    if (!schemaIn || !uiSchemaIn || !schemaDefaultsIn){
      alert("Missing schemas")
      return
    }

    let schema = schemaIn;
    let uiSchema = uiSchemaIn;
    let schemaDefaults = schemaDefaultsIn;
    User.commit((state) => {
      state.schema = schema;
    });
    User.commit((state) => {
      state.uiSchema = uiSchema;
    });
    User.commit((state) => {
      state.schemaDefaults = schemaDefaults;
    });
  }

  static async fetchDataset(id: string) {
    // @ts-ignore
    if (dataset) {
      // @ts-ignore
      return dataset
    } else {
      Notifications.toast({
        message: "Failed to load dataset",
        type: "error",
      });
    }
  }
}
