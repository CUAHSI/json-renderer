import { ISubmission } from "@/components/submissions/types";
import { Model } from "@vuex-orm/core";
import {
  EnumSubmissionSorts,
  EnumSortDirections,
} from "@/components/submissions/types";
import { itemsPerPageArray } from "@/components/submissions/constants";

export interface ISubmisionState {
  sortBy: { key: string; label: string };
  sortDirection: { key: string; label: string };
  itemsPerPage: number;
  isFetching: boolean;
}

export default class Submission extends Model implements ISubmission {
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
      sortBy: { key: "date", label: EnumSubmissionSorts.date },
      sortDirection: { key: "desc", label: EnumSortDirections.desc },
      itemsPerPage: itemsPerPageArray[0],
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

  /** Used to transform submission data that comes from the repository API and was transformed to our schema */
  static getInsertData(apiSubmission): ISubmission | Partial<Submission> {
    return {
      title: apiSubmission.name,
      authors: apiSubmission.creator.map((c) => c.name),
      date: new Date(apiSubmission.dateCreated).getTime(),
      identifier: Array.isArray(apiSubmission.identifier)
        ? apiSubmission.identifier[0]
        : apiSubmission.identifier,
      url: apiSubmission.url,
      id: apiSubmission._id,
    };
  }
}
