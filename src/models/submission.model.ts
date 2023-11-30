import { Model } from "@vuex-orm/core";

export interface ISubmisionState {
  sortBy: { key: string; label: string };
  sortDirection: { key: string; label: string };
  itemsPerPage: number;
  isFetching: boolean;
}

export default class Submission extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = "submissions";
  static primaryKey = ["id"];
  public title!: string;
  public authors!: string[];
  public date!: number;
  public identifier!: string;
  public repoIdentifier?: string;
  public url!: string;
  public id!: string;
  // public metadata!: any;

  static get $state(): ISubmisionState {
    return this.store().state.entities[this.entity];
  }

  static state() {
    return {
      isFetching: false,
    };
  }

  // List of all fields (schema) of the post model. `this.attr` is used
  // for the generic field type. The argument is the default value.
  static fields() {
    return {
      title: this.attr(""),
      authors: this.attr([]),
      // @ts-ignore
      date: this.number(0),
      identifier: this.attr(""),
      repoIdentifier: this.attr(""),
      url: this.attr(""),
      id: this.attr(""),
      // metadata: this.attr({}),
    };
  }

  static getInsertDataFromDb(dbSubmission) {
    return {
      title: dbSubmission.title,
      authors: dbSubmission.authors,
      date: new Date(dbSubmission.submitted).getTime(),
      identifier: dbSubmission.identifier, // TODO: we should call this something else. It is not the same as the schema's identifier
      repoIdentifier: dbSubmission.repository_identifier,
      url: dbSubmission.url,
      id: dbSubmission._id,
    };
  }

}
