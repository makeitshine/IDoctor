import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Browser } from '@syncfusion/ej2-base';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';

import { Router } from '@angular/router';
import { AuthenticationService } from '../_services';
import { User } from '../_models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements AfterViewInit {
  @ViewChild('sideBar')
  public sideBar: SidebarComponent;
  public showBackdrop: Boolean = false;
  public closeOnDocumentClick: Boolean = false;
  currentUser: User;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    document.body.classList.add('main-page');
    if (Browser.isDevice) {
      this.showBackdrop = true;
      this.closeOnDocumentClick = true;
    }
    
  }


  ngAfterViewInit() {
    if (Browser.isDevice) {
      document.querySelector('.planner-header').classList.add('device-header');
      document.querySelector('.planner-wrapper').classList.add('device-wrapper');
    }
  }

  btnClick() {
    this.sideBar.show();
  }

  onItemClick(args: any) {
    if (Browser.isDevice) {
      this.sideBar.hide();
    }
    const elements: HTMLElement[] = args.currentTarget.parentElement.querySelectorAll('.active-item');
    elements.forEach(element => {
      if (element.classList.contains('active-item')) { element.classList.remove('active-item'); }
    });
    args.currentTarget.classList.add('active-item');
  }
  public logOut() {
    localStorage.removeItem("jwt");
 }
}
