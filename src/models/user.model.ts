import { Model } from "@vuex-orm/core";
import { Notifications } from "@cznethub/cznet-vue-core";
import schemaIn from '@/schemas/schema.json'
import uiSchemaIn from '@/schemas/ui-schema.json'
import schemaDefaultsIn from '@/schemas/schema-defaults.json'

export interface ICzCurrentUserState {
  accessToken: string;
}

export interface IUserState {
  schema: any;
  uiSchema: any;
  schemaDefaults: any;
}

export default class User extends Model {
  static entity = "users";

  static fields() {
    return {};
  }

  static get $state(): IUserState {
    return this.store().state.entities[this.entity];
  }

  static state(): IUserState {
    return {
      schema: null,
      uiSchema: null,
      schemaDefaults: null,
    };
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
