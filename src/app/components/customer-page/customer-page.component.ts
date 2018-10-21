import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: [
    './customer-page.component.css',
    '../../../assets/styles/global.css'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerPageComponent implements OnInit {
  complaints: Array<any>;
  complaintObject: any;
  newComment: String;
  isRecordsFound: Boolean = false;

  constructor(
    private _restService: RestApiService,
    private _changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this._restService.getCustomerComplaints().subscribe(
      data => {
        this.complaints = data;
        if (this.complaints.length === 0) {
          this.isRecordsFound = false;
        } else {
          this.isRecordsFound = true;
        }
        this._changeDetection.markForCheck();
      },
      err => {
        console.log(err);
      }
    );
  }
  viewComplaintDetails(id) {
    this.complaintObject = {};
    for (const complaint of this.complaints) {
      if (complaint.id === id) {
        this.complaintObject['id'] = complaint.id;
        this.complaintObject['status'] = complaint.status;
        this.complaintObject['date_created'] = complaint.date_created;
        this.complaintObject['date_updated'] = complaint.date_updated;
        this.complaintObject['description'] = complaint.description;
        this.complaintObject['heading'] = complaint.heading;
        this.complaintObject['comments'] = complaint.comments;
      }
      break;
    }
  }
  closeComplaintDetails() {
    this.complaintObject = null;
  }
  addComment() {
    const commentTime = new Date();
    const payload = {
      complaintId: this.complaintObject.id,
      newComment: this.newComment,
      commentTime: commentTime
    };
    this._restService.addCustomerComment(payload).subscribe(data => {
      this.complaints = data;
      this.viewComplaintDetails(payload.complaintId);
      this._changeDetection.markForCheck();
    });
  }
}
