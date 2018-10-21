import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { REST_API_CONFIG, ENDPOINTS } from '../constants/rest-api.constants';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  constructor(private http: HttpClient) {}

  registerCustomer(customerDetails): Observable<any> {
    return this.http.post(
      `${REST_API_CONFIG.restAPIUrl}${ENDPOINTS._registerCustomer}`,
      customerDetails
    );
  }

  userLogin(userDetails): Observable<any> {
    return this.http.post(
      `${REST_API_CONFIG.restAPIUrl}${ENDPOINTS._userLogin}`,
      userDetails
    );
  }

  getAllCustomerComplaints(): Observable<any> {
    return this.http.get(
      `${REST_API_CONFIG.restAPIUrl}${ENDPOINTS._getAllCustomerComplaints}`
    );
  }

  getCustomerComplaints(): Observable<any> {
    return this.http.get(
      `${REST_API_CONFIG.restAPIUrl}${ENDPOINTS._getCustomerComplaints}`
    );
  }

  addCustomerComment(commentObject): Observable<any> {
    return this.http.put(
      `${REST_API_CONFIG.restAPIUrl}${ENDPOINTS._addCustomerComment}`,
      commentObject
    );
  }

  addAgentComment(commentObject): Observable<any> {
    return this.http.put(
      `${REST_API_CONFIG.restAPIUrl}${ENDPOINTS._addAgentComment}`,
      commentObject
    );
  }

  updateComplaintStatus(statusObject): Observable<any> {
    return this.http.put(
      `${REST_API_CONFIG.restAPIUrl}${ENDPOINTS._updateComplaintStatus}`,
      statusObject
    );
  }
  logComplaint(complaintObject): Observable<any> {
    return this.http.put(
      `${REST_API_CONFIG.restAPIUrl}${ENDPOINTS._logComplaint}`,
      complaintObject
    );
  }
}
