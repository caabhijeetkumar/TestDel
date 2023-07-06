import {Component, Inject, OnInit} from '@angular/core';
import {TestCaseResult} from "../../models/test-case-result.model";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {TestCasePrioritiesService} from "../../services/test-case-priorities.service";
import {TestCaseTypesService} from "../../services/test-case-types.service";
import {TestDataService} from "../../services/test-data.service";
import {TestDataSetService} from "../../services/test-data-set.service";

@Component({
  selector: 'app-test-case-result-summary',
  templateUrl: './test-case-result-summary.component.html',
  styles: []
})
export class TestCaseResultSummaryComponent implements OnInit {
  public testcaseResult: TestCaseResult;

  constructor(
    @Inject(MAT_DIALOG_DATA) public options: { testcaseResult: TestCaseResult },
    private testCasePriorityService: TestCasePrioritiesService,
    private testCaseTypeService: TestCaseTypesService,
    private testDataService: TestDataService,
    private testDataSetService : TestDataSetService) {
    this.testcaseResult = options.testcaseResult;
  }

  ngOnInit() {
    this.testCasePriorityService.show(this.testcaseResult.priorityId).subscribe(res => {
      this.testcaseResult.testCasePriority = res;
    })
    this.testCaseTypeService.show(this.testcaseResult.testCaseTypeId).subscribe(res => {
      this.testcaseResult.testCaseType = res;
    })
    // this.userService.show(this.testcaseResult.testDeviceResult.testPlanResult.executedById).subscribe(user => this.testcaseResult.testDeviceResult.testPlanResult.executedBy = user);
    if (this.testcaseResult.testDataId)
      this.testDataService.show(this.testcaseResult.testDataId).subscribe(testData => {
        if(testData.isMigrated) {
          this.testDataSetService.findAll("testDataProfileId:" + this.testcaseResult.testDataId, 'position').subscribe(res => {
            testData.data = res.content;
            this.testcaseResult.testDataProfile = testData;
          })
        }else{
          this.testcaseResult.testDataProfile = testData;
        }
      })
  }

  get showFailedPercentage(){
    return this.testcaseResult.failedPercentage !== 0;
  }
  get showPassedPercentage(){
    return this.testcaseResult.passedPercentage !== 0;
  }
  get showAbortedPercentage(){
    return this.testcaseResult.abortedPercentage !== 0;
  }
  get showNotExecutedPercentage(){
    return this.testcaseResult.notExecutedPercentage !== 0;
  }
  get showQueuedPercentage(){
    return this.testcaseResult.queuedPercentage !== 0;
  }

}
