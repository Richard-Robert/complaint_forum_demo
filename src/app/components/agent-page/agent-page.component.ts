import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { RestApiService } from '../../services/rest-api.service';

@Component({
  selector: 'app-agent-page',
  templateUrl: './agent-page.component.html',
  styleUrls: [
    './agent-page.component.css',
    '../../../assets/styles/global.css'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgentPageComponent implements OnInit {
  complaints: Array<any>;
  complaintObject: any;
  newComment: String;
  isRecordsFound: Boolean = false;
  complaintStatus: Number;

  statusValues = [
    { key: 1, value: 'Not Started' },
    { key: 2, value: 'In Progress' },
    { key: 3, value: 'Completed' }
  ];

  constructor(
    private _restService: RestApiService,
    private _changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this._restService.getAllCustomerComplaints().subscribe(
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
        this.complaintStatus = complaint.status;
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
    this._restService.addAgentComment(payload).subscribe(data => {
      if (data) {
        this.complaints = data;
        this.viewComplaintDetails(payload.complaintId);
        this.newComment = '';
        this._changeDetection.markForCheck();
      }
    });
  }
  saveStatus() {
    if (this.complaintStatus !== this.complaintObject.status) {
      const updatedTime = new Date();
      const payload = {
        complaintId: this.complaintObject.id,
        newStatus: this.complaintStatus,
        updatedTime: updatedTime
      };
      console.log(this.complaintStatus);
      this._restService.updateComplaintStatus(payload).subscribe(data => {
        if (data) {
          this.complaints = data;
          this.closeComplaintDetails();
          this.newComment = '';
          this._changeDetection.markForCheck();
        }
      });
    } else {
      alert('Status has not been modified');
    }
  }
}
