import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConfigService, UtilService } from '@sunbird/shared';
import { PublicDataService } from '@sunbird/core';
import * as _ from 'lodash-es';

@Component({
  selector: 'app-textbook-list',
  templateUrl: './textbook-list.component.html',
  styleUrls: ['./textbook-list.component.scss']
})
export class TextbookListComponent implements OnInit {
  @Input() config: any;
  @Input() selectedAttributes: any;
  @Output() selectedTextbookEvent = new EventEmitter<any>();
  public textbookList;
  constructor(private configService: ConfigService, public publicDataService: PublicDataService,
     public utilService: UtilService) { }

  ngOnInit() {
    const req = {
      url: `${this.configService.urlConFig.URLS.COMPOSITE.SEARCH}`,
      data: {
        'request': {
          'filters': {
            'objectType': 'content',
            'board': this.selectedAttributes.board,
            'framework': this.selectedAttributes.framework,
            'gradeLevel': this.selectedAttributes.gradeLevel,
            'subject': this.selectedAttributes.subject,
            'medium': this.selectedAttributes.medium,
            'programId': this.selectedAttributes.programId,
            'status': ['Draft']
          }
        }
      }
    };
    this.publicDataService.post(req).subscribe((res) => {
      const { constantData, metaData, dynamicFields } = this.configService.appConfig.LibrarySearch;
      this.textbookList = this.utilService.getDataForCard(res.result.content, constantData, dynamicFields, metaData);
    });
  }

  showTopics(event) {
    this.selectedTextbookEvent.emit(event.data.metaData.identifier);
  }

}
