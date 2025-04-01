import {Component, OnDestroy, OnInit} from '@angular/core';
import {Bill} from "../../models/models";
import {AuthenticationService} from "../../service/authentication.service";


@Component({
  selector: 'app-upcoming-bills',
  templateUrl: './upcoming-bills.component.html',
  styleUrl: './upcoming-bills.component.css'
})
export class UpcomingBillsComponent implements OnInit {
  bills: any[] = []

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.getData('expense');
    console.log("Bills ", this.bills)
  }


  markPaid(id: string) {
    this.deleteData('expense', id);
    this.getData('expense');
    // this.bills = this.bills.filter(b => b !== bill);
  }

  getData(collectionName: string) {
    this.authenticationService.getData(collectionName).subscribe(data => {
      console.log('Les donnees: ', data);

      this.bills = data
    });
  }

  deleteData(collectionName: string, id: string) {
    this.authenticationService.deleteData(collectionName, id).then(r => console.log('Data deleted successfully! ', r));
  }
}
