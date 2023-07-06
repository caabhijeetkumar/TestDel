import {PageObject} from "app/shared/models/page-object";
import {custom, deserialize, object, serializable, SKIP, optional} from 'serializr';
import {TestDevice} from "./test-device.model";
import {TestPlanResult} from "./test-plan-result.model";
import {StatusConstant} from "../enums/status-constant.enum";
import {TestDeviceSettings} from "./test-device-settings.model";
import {ResultBase} from "./result-base.model";
import {ReRunType} from "../enums/re-run-type.enum";

export class TestDeviceResult extends ResultBase implements PageObject {

  @serializable
  public id: number;
  @serializable
  public testPlanLabType: string;
  @serializable
  public environmentId: number;
  @serializable(object(TestDevice))
  public testDevice: TestDevice;
  @serializable(custom((v) => SKIP, v => {
    if(v)
      return new TestPlanResult().deserialize(v);
  }))
  public testPlanResult: TestPlanResult;

  @serializable(object(TestDeviceSettings))
  public testDeviceSettings: TestDeviceSettings;

  @serializable
  public message: String;
  @serializable
  public browserVersion: String;
  @serializable
  public status: StatusConstant;
  @serializable
  public sessionCreatedOn: Date;
  @serializable
  public sessionCompletedOn: Date;
  @serializable
  public deviceAllocatedOn: Date;
  @serializable
  public executionInitiatedOn: Date;
  @serializable
  public agentPickedOn: Date;
  @serializable
  public videoURL: URL;
  @serializable(custom(v => SKIP, v => v))
  public logURLS: Map<String, URL>;
  @serializable(optional(object(TestDeviceResult)))
  public childResult: TestDeviceResult;
  @serializable
  public reRunParentId: number;
  @serializable
  public isVisuallyPassed: boolean;
  @serializable(custom(v => SKIP, v => v))
  public appUploadVersionId: Number;
  public lastChildResult: TestDeviceResult;
  @serializable
  public reRunType: ReRunType;


  deserialize(input: any): this {
    return Object.assign(this, deserialize(TestDeviceResult, input));
  }

  get lastRun(){
    if(this.lastChildResult == null)
      this.lastChildResult = this.getLastChildResult(this);
    return this.lastChildResult;
  }

  getLastChildResult(environmentResult: TestDeviceResult){
    if(environmentResult.childResult == null)
      return environmentResult
    return this.getLastChildResult(environmentResult.childResult);
  }


}
